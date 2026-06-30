import type { v4 } from "@avaprotocol/types";
import { APIError, NetworkError } from "./errors";

/**
 * Minimal fetch wrapper used by every v4 sub-client. Owns the
 * baseURL, the Bearer JWT, default timeouts, and the
 * problem+json → APIError translation.
 *
 * Built on top of `globalThis.fetch` so it works in Node 20+ and in
 * the browser without bundling node-fetch. Streaming endpoints
 * (executions:stream) bypass `request()` and use `stream()` instead so
 * the response body can be read incrementally.
 */
export interface TransportOptions {
  /** Base URL including the `/api/v1` prefix, no trailing slash. */
  readonly baseUrl: string;
  /** Bearer JWT minted via POST /auth:exchange. */
  token?: string;
  /** Default request timeout in milliseconds (per request). */
  defaultTimeoutMs?: number;
  /** Optional fetch implementation override (tests / non-Node runtimes). */
  fetchImpl?: typeof fetch;
  /**
   * Default headers applied to every request, below per-request headers
   * and below the Bearer Authorization header. Used to carry non-Bearer
   * credentials such as a partner assertion (`X-Partner-Assertion`).
   */
  headers?: Record<string, string>;
}

export interface RequestOptions {
  /** Path appended to baseUrl, e.g. `/workflows/01ABC`. */
  path: string;
  /** HTTP method — defaults to GET. */
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /**
   * Query parameters; arrays repeat the key
   * (`?status=enabled&status=disabled`). Typed as `object` so
   * resource handlers can pass through their own param interfaces
   * without adding index signatures.
   */
  query?: object;
  /** Body payload — JSON-serialized before send. */
  body?: unknown;
  /** Per-request timeout override. */
  timeoutMs?: number;
  /** Extra headers merged on top of the transport defaults. */
  headers?: Record<string, string>;
  /** Pre-resolved AbortSignal for cancellation. */
  signal?: AbortSignal;
}

export class Transport {
  private readonly baseUrl: string;
  private readonly defaultTimeoutMs: number;
  private readonly fetchImpl: typeof fetch;
  private bearerToken?: string;
  private defaultHeaders: Record<string, string>;

  constructor(opts: TransportOptions) {
    this.baseUrl = opts.baseUrl.replace(/\/$/, "");
    this.defaultTimeoutMs = opts.defaultTimeoutMs ?? 30_000;
    this.fetchImpl = opts.fetchImpl ?? globalThis.fetch.bind(globalThis);
    this.bearerToken = opts.token;
    this.defaultHeaders = { ...opts.headers };
  }

  /** Replace the Bearer token. Used after `client.auth.exchange()`. */
  setToken(token: string | undefined): void {
    this.bearerToken = token;
  }

  /** Read the current Bearer token (for tests / debugging). */
  getToken(): string | undefined {
    return this.bearerToken;
  }

  /**
   * Replace the default headers applied to every request. Used to refresh a
   * short-lived non-Bearer credential (e.g. a rotated partner assertion)
   * without reconstructing the client.
   */
  setDefaultHeaders(headers: Record<string, string> | undefined): void {
    this.defaultHeaders = { ...headers };
  }

  /** Issue a JSON request and decode the response body. */
  async request<T>(opts: RequestOptions): Promise<T> {
    const response = await this.send(opts);
    if (response.status === 204) {
      // 204 No Content — used by DELETE / PUT acks. Callers should
      // type T as `void`.
      return undefined as T;
    }
    const text = await response.text();
    if (!text) return undefined as T;
    try {
      return JSON.parse(text) as T;
    } catch (err) {
      throw new NetworkError(
        `Failed to parse JSON response from ${opts.path}: ${(err as Error).message}`,
        err,
      );
    }
  }

  /**
   * Issue a request and return the raw Response so the caller can
   * read it incrementally. Used by the executions:stream SSE handler.
   * Throws APIError on non-2xx exactly like `request()` does.
   */
  async stream(opts: RequestOptions): Promise<Response> {
    return this.send(opts);
  }

  private async send(opts: RequestOptions): Promise<Response> {
    const url = this.buildUrl(opts.path, opts.query);
    const controller = new AbortController();
    const timeoutMs = opts.timeoutMs ?? this.defaultTimeoutMs;
    // timeoutMs <= 0 means "no timeout" (used by SSE streams). With
    // a positive value we schedule an abort; otherwise the only
    // cancellation channel is the caller-supplied signal.
    const timeoutId =
      timeoutMs > 0
        ? setTimeout(() => controller.abort(), timeoutMs)
        : undefined;
    if (opts.signal) {
      opts.signal.addEventListener("abort", () => controller.abort(), { once: true });
    }

    // Precedence: defaultHeaders (lowest) < SDK invariants < per-request
    // headers < Authorization. `Accept` is defaulted between defaultHeaders
    // and opts.headers so a stray default can't corrupt JSON decode, while a
    // per-request override (e.g. the SSE stream's text/event-stream) still
    // wins.
    const headers: Record<string, string> = {
      ...this.defaultHeaders,
      Accept: "application/json",
      ...opts.headers,
    };
    if (this.bearerToken) {
      headers.Authorization = `Bearer ${this.bearerToken}`;
    }
    let body: BodyInit | undefined;
    if (opts.body !== undefined && opts.body !== null) {
      // The transport always JSON-serializes the body, so Content-Type is an
      // invariant — set it after the spreads so a defaultHeaders/per-request
      // value can't mislabel the payload.
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(opts.body);
    }

    let response: Response;
    try {
      response = await this.fetchImpl(url, {
        method: opts.method ?? "GET",
        headers,
        body,
        signal: controller.signal,
      });
    } catch (err) {
      throw new NetworkError(`fetch ${opts.path}: ${(err as Error).message}`, err);
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      throw await this.toAPIError(response);
    }
    return response;
  }

  private async toAPIError(response: Response): Promise<APIError> {
    const requestId = response.headers.get("X-Request-ID") ?? undefined;
    const contentType = response.headers.get("Content-Type") ?? "";
    const isProblem = contentType.includes("problem+json") || contentType.includes("application/json");
    let problem: v4.Problem | undefined;
    let code: string | undefined;
    let title: string | undefined;
    let detail: string | undefined;
    if (isProblem) {
      try {
        const text = await response.text();
        if (text) {
          const parsed = JSON.parse(text) as v4.Problem;
          problem = parsed;
          code = parsed.code ?? undefined;
          title = parsed.title;
          detail = parsed.detail ?? undefined;
        }
      } catch {
        // fall through — APIError still carries status + requestId.
      }
    }
    return new APIError(response.status, { code, title, detail, requestId, problem });
  }

  private buildUrl(path: string, query?: object): string {
    const url = new URL(this.baseUrl + (path.startsWith("/") ? path : "/" + path));
    if (query) {
      for (const [key, value] of Object.entries(query as Record<string, unknown>)) {
        if (value === undefined || value === null || value === "") continue;
        if (Array.isArray(value)) {
          for (const v of value) {
            if (v === undefined || v === null || v === "") continue;
            url.searchParams.append(key, String(v));
          }
        } else {
          url.searchParams.append(key, String(value));
        }
      }
    }
    return url.toString();
  }
}
