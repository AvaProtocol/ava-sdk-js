/**
 * Shared display + classification for the fixture session-grant scripts.
 *
 * Lives here rather than in either script so the two cannot drift into
 * disagreeing about what "live" means — the whole point of these tools is to
 * tell an operator, at a glance, whether the fixture is usable.
 */
import type { v4 } from "@avaprotocol/types";

/** Salt + factory of the MA v2 funded e2e runner. */
export const FUNDED_FIXTURE_SALT = "0";
export const FUNDED_FIXTURE_FACTORY =
  "0x00000000000017c61b5bEe81050EC8eFc9c6fecd";

/**
 * Whether a policy can actually authorize a UserOp right now.
 *
 * BOTH conditions matter and reporting either alone is misleading:
 *
 *  - `status` must be pending/active. A revoked grant authorizes nothing no
 *    matter how far in the future its window runs — and `refresh-fixture-grant`
 *    deliberately leaves exactly that behind, so labelling on `validUntil`
 *    alone prints "revoked ... LIVE" on the rows it just retired.
 *  - the window must still be open. `SESSION_POLICY_EXPIRED` (EigenLayer-AVS
 *    `cc19bec4`) refuses a grant whose `validUntil` has passed.
 */
export function isUsableNow(policy: v4.SessionPolicy, now = Date.now()): boolean {
  const status = policy.status;
  const inStatus = status === "pending" || status === "active";
  return inStatus && Number(policy.validUntil) > now;
}

/** One aligned console line describing a policy. */
export function describePolicy(policy: v4.SessionPolicy, now = Date.now()): string {
  const until = Number(policy.validUntil);
  const window = Number.isFinite(until) ? new Date(until).toISOString() : "-";
  const expired = Number.isFinite(until) && until <= now;

  // Report the two axes separately: an operator needs to know WHY a row is
  // unusable, and "EXPIRED" on a revoked row hides that revocation was the
  // reason. USABLE is the only label that means "this can sign right now".
  const verdict = isUsableNow(policy, now)
    ? "USABLE"
    : expired
      ? "unusable(expired)"
      : `unusable(${policy.status})`;

  return [
    `id=${policy.id}`,
    `status=${policy.status}`,
    `entity=${policy.entityId ?? "-"}`,
    `label=${policy.agentLabel ?? "-"}`,
    `validUntil=${window}`,
    verdict,
    `actions=${(policy.allowedActions ?? []).length}`,
  ].join("  ");
}
