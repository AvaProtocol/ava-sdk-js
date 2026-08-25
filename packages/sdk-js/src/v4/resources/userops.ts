import type { v4 } from "@avaprotocol/types";

import { Transport } from "../internal/transport";

/**
 * `client.userops.*` — status lookup for UserOps **this user submitted**.
 * Inverse of the `nodes.run` send path (N14.a). Not a public AA explorer:
 * the gateway 404s unknown hashes and hashes whose sender is not one of
 * the caller's smart wallets.
 *
 * **Auth:** user Bearer JWT only (same gate as `nodes.run`). Partner
 * assertion alone is not enough.
 */
export class UserOpsResource {
  constructor(private readonly transport: Transport) {}

  /**
   * GET /userops/{userOpHash} — re-poll a pending or mined UserOp.
   *
   * Pending is not failed. Inner `calls` are unpacked from the submitted
   * execute / executeBatch calldata (including `executeUserOp`-wrapped
   * grant UserOps). `failedCall` is present only on an observed inner
   * revert of a single call.
   *
   * Pass `opts.chainId` to pin the bundler chain (JWT `aud` then gateway
   * default otherwise). An unsupported chain is 400.
   */
  retrieve(
    userOpHash: string,
    opts?: { chainId?: number },
  ): Promise<v4.UserOpStatusResponse> {
    return this.transport.request<v4.UserOpStatusResponse>({
      path: `/userops/${encodeURIComponent(userOpHash)}`,
      query: opts,
    });
  }
}
