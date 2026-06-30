import { Transport, type TransportOptions } from "./internal/transport";
import { AuthResource } from "./resources/auth";
import { ExecutionsResource } from "./resources/executions";
import { HealthResource } from "./resources/health";
import { NodesResource } from "./resources/nodes";
import { OperatorsResource } from "./resources/operators";
import { SecretsResource } from "./resources/secrets";
import { TokensResource } from "./resources/tokens";
import { TriggersResource } from "./resources/triggers";
import { WalletsResource } from "./resources/wallets";
import { WorkflowsResource } from "./resources/workflows";

export interface ClientOptions {
  /**
   * Base URL of the REST API including the `/api/v1` prefix. Example:
   * `https://gateway.avaprotocol.org/api/v1`. The SDK does not append
   * `/api/v1` for you; partners running their own aggregator instance
   * can point baseUrl elsewhere if their reverse proxy strips the prefix.
   */
  baseUrl: string;
  /**
   * Optional pre-minted JWT. Skip if you'll call
   * `client.auth.exchange()` after construction.
   */
  token?: string;
  /** Default request timeout in milliseconds. Defaults to 30s. */
  defaultTimeoutMs?: number;
  /** Override the fetch impl. Useful for tests and non-Node runtimes. */
  fetchImpl?: typeof fetch;
  /**
   * Default headers sent on every request. Use this to carry a non-Bearer
   * credential — notably a partner assertion in `X-Partner-Assertion` for the
   * no-fund simulate / wallet-derivation flow, where the end user has no
   * wallet signature. Construct a dedicated client for that flow (no `token`)
   * and put the short-lived assertion here. Fund-moving calls still require a
   * Bearer token from `auth.exchange()`.
   */
  headers?: Record<string, string>;
}

/**
 * v4 SDK entry point. Resource-grouped sub-clients (Stripe / OpenAI
 * convention). Construct one Client per aggregator endpoint; all
 * requests share the same transport (and therefore the same Bearer
 * token + timeout + fetch impl).
 *
 * @example
 *   import { Client } from "@avaprotocol/sdk-js";
 *   const client = new Client({ baseUrl: process.env.AVS_REST_URL! });
 *   await client.auth.exchangeWithKey(process.env.TEST_PRIVATE_KEY!);
 *   const wf = await client.workflows.create({ ... });
 *   await client.workflows.cancel(wf.id);
 */
export class Client {
  readonly auth: AuthResource;
  readonly executions: ExecutionsResource;
  readonly health: HealthResource;
  readonly nodes: NodesResource;
  readonly operators: OperatorsResource;
  readonly secrets: SecretsResource;
  readonly tokens: TokensResource;
  readonly triggers: TriggersResource;
  readonly wallets: WalletsResource;
  readonly workflows: WorkflowsResource;

  private readonly transport: Transport;

  constructor(opts: ClientOptions) {
    const transportOpts: TransportOptions = {
      baseUrl: opts.baseUrl,
      token: opts.token,
      defaultTimeoutMs: opts.defaultTimeoutMs,
      fetchImpl: opts.fetchImpl,
      headers: opts.headers,
    };
    this.transport = new Transport(transportOpts);

    this.auth = new AuthResource(this.transport);
    this.executions = new ExecutionsResource(this.transport);
    this.health = new HealthResource(this.transport);
    this.nodes = new NodesResource(this.transport);
    this.operators = new OperatorsResource(this.transport);
    this.secrets = new SecretsResource(this.transport);
    this.tokens = new TokensResource(this.transport);
    this.triggers = new TriggersResource(this.transport);
    this.wallets = new WalletsResource(this.transport);
    this.workflows = new WorkflowsResource(this.transport);
  }

  /** Replace the current Bearer token. */
  setToken(token: string | undefined): void {
    this.transport.setToken(token);
  }

  /** Current Bearer token. Returns undefined when anonymous. */
  get token(): string | undefined {
    return this.transport.getToken();
  }

  /**
   * Replace the default headers (e.g. refresh a short-lived
   * `X-Partner-Assertion`) without reconstructing the client.
   */
  setHeaders(headers: Record<string, string> | undefined): void {
    this.transport.setDefaultHeaders(headers);
  }
}
