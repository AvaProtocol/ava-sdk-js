/**
 * Move the MA v2 funded e2e fixture grant onto a CLEAN validation entity.
 *
 * Why moving entity, rather than just re-granting: the gateway's DB record and
 * the account's on-chain hooks can drift. Entity 2 once held a stored grant
 * valid to 2027 while the account's installed TimeRangeValidationHook for that
 * same entity still carried validUntil 2026-08-13, so every UserOp was rejected
 * as expired no matter what storage said. NextSessionEntityID picks
 * max(stored entity)+1, so revoking every stored grant first pushes the next
 * one past all of them, onto an entity the account has never had installed.
 *
 * This is a WORKAROUND for EigenLayer-AVS #763, not a fix.
 *
 * Run: TEST_ENV=railway npx tsx scripts/refresh-fixture-grant.ts
 */
import type { v4 } from "@avaprotocol/types";

import { getFundedClient, getFundedWallet } from "../tests/utils/client";
import { ensureE2eSessionGrant } from "../tests/utils/sessionGrant";
import { describePolicy, isUsableNow } from "../tests/utils/fixtureGrantDisplay";

const CHAIN_ID = Number(process.env.CHAIN_ID || 11155111);

interface OnChainCleanup {
  readonly entityId?: number;
  readonly target?: string;
  readonly callData?: string;
  readonly chainId?: number;
}

/**
 * Report what revoking left behind on chain.
 *
 * A revoke is only a storage change. When the grant was already applied the
 * account KEEPS its installed validation until the owner sends
 * `uninstallValidation` — the gateway controller cannot self-uninstall, because
 * production grants are policied.
 *
 * This script does not send that call. Cleanup is NOT idempotent (re-sending
 * after the entity is already clear reverts on chain, see EigenLayer-AVS
 * #731/#717), so firing it blind from an operator script is the wrong trade:
 * a mistaken send costs a reverted transaction and a confusing state, while
 * leaving it uninstalled costs nothing as long as the operator knows.
 *
 * So: print the payload, and be explicit about whether the leftover still has
 * authority. An entity whose window has already closed is inert — it is what
 * the drift incident left behind, and it is harmless. An entity whose window is
 * still OPEN retains real signing authority and must be cleaned up.
 */
function reportCleanup(policy: v4.SessionPolicy, response: unknown): void {
  const res = response as { status?: string; onChainCleanupRequired?: boolean; onChainCleanup?: OnChainCleanup };
  if (!res?.onChainCleanupRequired) {
    console.log(`    nothing installed on chain for this grant (status=${res?.status})`);
    return;
  }

  const until = Number(policy.validUntil);
  const stillOpen = Number.isFinite(until) && until > Date.now();
  const cleanup = res.onChainCleanup;

  if (stillOpen) {
    console.log(
      `    ⚠  entity ${policy.entityId} REMAINS INSTALLED and its window is still open ` +
        `(until ${new Date(until).toISOString()}).\n` +
        `       It keeps on-chain signing authority until the OWNER sends uninstallValidation.\n` +
        `       Send this once (not idempotent — re-sending after it is clear reverts):`,
    );
  } else {
    console.log(
      `    entity ${policy.entityId} remains installed but its window already closed ` +
        `(${Number.isFinite(until) ? new Date(until).toISOString() : "unknown"}), so it is inert.\n` +
        `    Optional cleanup payload:`,
    );
  }
  console.log(`       ${JSON.stringify(cleanup ?? {})}`);
}

async function main(): Promise<void> {
  const { client, owner, privateKey } = await getFundedClient();
  const wallet = await getFundedWallet(client);
  if (!wallet) throw new Error("no funded wallet resolved for the fixture owner");

  console.log(`owner:  ${owner}`);
  console.log(`runner: ${wallet.address}\n`);

  const before = await client.policies.list(wallet.address, { chainId: CHAIN_ID });
  console.log("before:");
  before.items.forEach((p) => console.log("  " + describePolicy(p)));

  // Revoke everything still usable so ensureE2eSessionGrant cannot reuse one
  // and NextSessionEntityID moves above them all.
  //
  // Each revoke is guarded: aborting the loop midway would leave the fixture
  // PARTIALLY revoked — strictly worse than before this ran, since a surviving
  // usable grant both keeps its entity low and can collide with the new one.
  // Revoke as many as possible, then report the failures loudly.
  const failures: string[] = [];
  for (const policy of before.items) {
    if (!isUsableNow(policy)) continue;
    console.log(`\n  revoking ${policy.id} (entity ${policy.entityId})`);
    try {
      const res = await client.policies.revoke(wallet.address, policy.id, { chainId: CHAIN_ID });
      reportCleanup(policy, res);
    } catch (err) {
      const message = (err as Error).message;
      console.log(`    ✗ revoke FAILED: ${message}`);
      failures.push(`${policy.id}: ${message}`);
    }
  }

  if (failures.length > 0) {
    // Granting now could land on an entity that a surviving grant still holds,
    // which is the very collision this script exists to escape.
    console.error(
      `\n${failures.length} grant(s) could not be revoked; NOT granting a replacement:\n  ` +
        failures.join("\n  ") +
        `\n\nRe-run once the gateway is reachable, or revoke these by hand first.`,
    );
    process.exitCode = 1;
    return;
  }

  const fresh = await ensureE2eSessionGrant(client, wallet.address, privateKey, owner, CHAIN_ID);
  console.log("\nfresh grant:");
  console.log("  " + describePolicy(fresh));

  const after = await client.policies.list(wallet.address, { chainId: CHAIN_ID });
  console.log("\nafter:");
  after.items.forEach((p) => console.log("  " + describePolicy(p)));

  const usable = after.items.filter((p) => isUsableNow(p));
  if (usable.length !== 1) {
    console.error(`\nexpected exactly one usable grant, found ${usable.length}`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("failed:", err);
  process.exit(1);
});
