import type { v4 } from "@avaprotocol/types";

/**
 * Thrown when the server returns a 4xx/5xx response. The aggregator
 * speaks RFC 7807 problem+json (`application/problem+json`); this
 * class surfaces every field plus the underlying HTTP status so SDK
 * callers can pattern-match without re-parsing the body.
 */
export class APIError extends Error {
  /** HTTP status code (echoed from the response). */
  readonly status: number;
  /** Machine-readable error code (Problem.code), e.g. `AUTH_INVALID_TOKEN`. */
  readonly code?: string;
  /** Short human-readable summary (Problem.title). */
  readonly title?: string;
  /** Per-request identifier — also surfaced via X-Request-ID header. */
  readonly requestId?: string;
  /** The full parsed Problem body, when the server returned one. */
  readonly problem?: v4.Problem;

  constructor(
    status: number,
    init: { code?: string; title?: string; detail?: string; requestId?: string; problem?: v4.Problem }
  ) {
    super(init.detail || init.title || `HTTP ${status}`);
    this.name = "APIError";
    this.status = status;
    this.code = init.code;
    this.title = init.title;
    this.requestId = init.requestId;
    this.problem = init.problem;
  }
}

/** Thrown when the SDK can't reach the server (DNS failure, fetch threw). */
export class NetworkError extends Error {
  readonly cause?: unknown;
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "NetworkError";
    this.cause = cause;
  }
}

/** Thrown when the auth credential is missing or expired before a call. */
export class AuthRequiredError extends Error {
  constructor(message = "Authentication required — call client.auth.exchange() first") {
    super(message);
    this.name = "AuthRequiredError";
  }
}
