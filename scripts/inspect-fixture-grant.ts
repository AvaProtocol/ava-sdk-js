/**
 * Diagnostic: list the session policies the gateway holds for the MA v2
 * funded e2e runner, so we can see why a UserOp is being signed with an
 * expired grant.
 *
 * Read-only. Run with: TEST_ENV=railway npx tsx scripts/inspect-fixture-grant.ts
 */
import { getFundedClient, getFundedWallet } from "../tests/utils/client";

const CHAIN_ID = Number(process.env.CHAIN_ID || 11155111);

async function main() {
  const { client, owner } = await getFundedClient();
  const wallet = await getFundedWallet(client);
  if (!wallet) {
    console.log("no funded wallet resolved for owner", owner);
    return;
  }
  console.log(`owner:  ${owner}`);
  console.log(`runner: ${wallet.address} (salt ${wallet.salt}, factory ${wallet.factoryAddress})`);
  console.log("");

  const listed = await client.policies.list(wallet.address, { chainId: CHAIN_ID });
  console.log(`policies on this runner: ${listed.items.length}`);
  const now = Date.now();
  for (const p of listed.items) {
    const until = Number(p.validUntil);
    const live = until > now;
    console.log(
      [
        `  id=${p.id}`,
        `status=${p.status}`,
        `entity=${p.entityId ?? "-"}`,
        `label=${p.agentLabel ?? "-"}`,
        `validUntil=${new Date(until).toISOString()}`,
        live ? "LIVE" : "EXPIRED",
        `actions=${(p.allowedActions ?? []).length}`,
      ].join("  "),
    );
  }
}

main().catch((err) => {
  console.error("failed:", err);
  process.exit(1);
});
