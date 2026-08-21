/**
 * Refresh the MA v2 funded e2e fixture grant onto a CLEAN validation entity.
 *
 * Why this is needed rather than just re-granting: the gateway's DB record and
 * the account's on-chain hooks had drifted. Entity 2 held a stored grant with
 * validUntil 2027, while the account's installed TimeRangeValidationHook for
 * that entity still carried validUntil 2026-08-13 — so every UserOp signed for
 * entity 2 was rejected by the chain as expired no matter what the DB said.
 * NextSessionEntityID picks max(stored entity)+1, so revoking the current grant
 * and granting again moves the fixture to the next entity, which the account
 * has never had installed.
 *
 * Run: TEST_ENV=railway npx tsx scripts/refresh-fixture-grant.ts
 */
import { getFundedClient, getFundedWallet } from "../tests/utils/client";
import { ensureE2eSessionGrant } from "../tests/utils/sessionGrant";

const CHAIN_ID = Number(process.env.CHAIN_ID || 11155111);

function describe(p: { id: string; status?: string; entityId?: unknown; agentLabel?: string; validUntil?: unknown }) {
  const until = Number(p.validUntil);
  return `id=${p.id} status=${p.status} entity=${p.entityId ?? "-"} label=${p.agentLabel ?? "-"} validUntil=${
    Number.isFinite(until) ? new Date(until).toISOString() : "-"
  }`;
}

async function main() {
  const { client, owner, privateKey } = await getFundedClient();
  const wallet = await getFundedWallet(client);
  if (!wallet) throw new Error("no funded wallet resolved");

  console.log(`owner:  ${owner}`);
  console.log(`runner: ${wallet.address}\n`);

  const before = await client.policies.list(wallet.address, { chainId: CHAIN_ID });
  console.log("before:");
  before.items.forEach((p) => console.log("  " + describe(p as never)));

  // Revoke every non-revoked grant so ensureE2eSessionGrant cannot reuse one,
  // and so NextSessionEntityID hands out an entity above all of them.
  for (const p of before.items) {
    if (p.status === "revoked") continue;
    const res = await client.policies.revoke(wallet.address, p.id, { chainId: CHAIN_ID });
    console.log(
      `\nrevoked ${p.id} -> status=${res.status} onChainCleanupRequired=${
        (res as { onChainCleanupRequired?: boolean }).onChainCleanupRequired ?? false
      }`,
    );
  }

  const fresh = await ensureE2eSessionGrant(
    client,
    wallet.address,
    privateKey,
    owner,
    CHAIN_ID,
  );
  console.log("\nfresh grant:");
  console.log("  " + describe(fresh as never));

  const after = await client.policies.list(wallet.address, { chainId: CHAIN_ID });
  console.log("\nafter:");
  after.items.forEach((p) => console.log("  " + describe(p as never)));
}

main().catch((err) => {
  console.error("failed:", err);
  process.exit(1);
});
