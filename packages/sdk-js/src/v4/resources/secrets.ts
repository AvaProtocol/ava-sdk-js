import type { v4 } from "@avaprotocol/types";

import { Transport } from "../internal/transport";

export interface ListSecretsParams {
  workflowId?: string;
  orgId?: string;
  before?: string;
  after?: string;
  limit?: number;
}

export interface DeleteSecretParams {
  workflowId?: string;
  orgId?: string;
}

/**
 * `client.secrets.*` — write-only secret store, scoped to the
 * authenticated user. Values are referenced from workflow nodes via
 * `{{secrets.NAME}}` template variables and are decrypted server-side
 * at execution time; the SDK never receives the plaintext value back.
 *
 * `put` is a single idempotent endpoint replacing v3's create + update
 * split — sending the same name twice rotates the value silently
 * rather than erroring.
 */
export class SecretsResource {
  constructor(private readonly transport: Transport) {}

  /** GET /secrets — metadata only; values are write-only. */
  list(params?: ListSecretsParams): Promise<v4.SecretList> {
    return this.transport.request<v4.SecretList>({
      path: "/secrets",
      query: params,
    });
  }

  /** PUT /secrets/{name} — idempotent create-or-replace. */
  put(name: string, body: v4.PutSecretRequest): Promise<void> {
    return this.transport.request<void>({
      path: `/secrets/${encodeURIComponent(name)}`,
      method: "PUT",
      body,
    });
  }

  /** DELETE /secrets/{name} */
  delete(name: string, params?: DeleteSecretParams): Promise<void> {
    return this.transport.request<void>({
      path: `/secrets/${encodeURIComponent(name)}`,
      method: "DELETE",
      query: params,
    });
  }
}
