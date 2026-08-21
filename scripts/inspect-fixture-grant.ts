/**
 * Diagnostic: list the session policies the gateway holds for the MA v2 funded
 * e2e runner, so an operator can see at a glance whether the fixture can still
 * sign — and if not, why.
 *
 * STRICTLY READ-ONLY. It resolves the runner from `wallets.list()` rather than
 * `getFundedWallet()`: that helper is an ensure-helper, and when the salt-0 row
 * is missing it falls through to `wallets.create()`, which would consume one of
 * the owner's three production wallet slots. A tool you reach for when
 * something already looks wrong must not change what it is inspecting.
 *
 * Run: TEST_ENV=railway npx tsx scripts/inspect-fixture-grant.ts
 */
import { getFundedClient } from "../tests/utils/client";
import {
  FUNDED_FIXTURE_FACTORY,
  FUNDED_FIXTURE_SALT,
  describePolicy,
  isUsableNow,
} from "../tests/utils/fixtureGrantDisplay";

const CHAIN_ID = Number(process.env.CHAIN_ID || 11155111);

async function main(): Promise<void> {
  const { client, owner } = await getFundedClient();

  const wallets = await client.wallets.list({ chainId: CHAIN_ID });
  const runner = wallets.data.find(
    (w) =>
      w.salt === FUNDED_FIXTURE_SALT &&
      w.factoryAddress?.toLowerCase() === FUNDED_FIXTURE_FACTORY.toLowerCase(),
  );

  console.log(`owner:  ${owner}`);
  if (!runner) {
    console.log(
      `runner: NOT FOUND (salt ${FUNDED_FIXTURE_SALT}, factory ${FUNDED_FIXTURE_FACTORY})\n` +
        `        Not creating it — this script is read-only. Run the e2e suite or\n` +
        `        refresh-fixture-grant.ts if the fixture needs provisioning.`,
    );
    return;
  }
  console.log(`runner: ${runner.address} (salt ${runner.salt}, factory ${runner.factoryAddress})\n`);

  const listed = await client.policies.list(runner.address, { chainId: CHAIN_ID });
  console.log(`policies on this runner: ${listed.items.length}`);
  const now = Date.now();
  for (const policy of listed.items) {
    console.log("  " + describePolicy(policy, now));
  }

  const usable = listed.items.filter((p) => isUsableNow(p, now));
  console.log(`\nusable right now: ${usable.length}`);
  if (usable.length === 0) {
    console.log("  -> the fixture cannot sign; run refresh-fixture-grant.ts");
  } else if (usable.length > 1) {
    // The gateway refuses to pick between them (SESSION_POLICY_AMBIGUOUS).
    console.log("  -> MORE THAN ONE usable grant; the send path will refuse as ambiguous");
  }
}

main().catch((err) => {
  console.error("failed:", err);
  process.exit(1);
});
