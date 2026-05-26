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
