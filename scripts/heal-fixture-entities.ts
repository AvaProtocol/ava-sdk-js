/**
 * Clear leftover validation entities off a runner so new grants can install.
 *
 * Revoking a grant is a storage change only. An applied grant's validation
 * stays installed on the account until the OWNER sends uninstallValidation —
 * the gateway controller cannot self-uninstall a policied grant. Leftovers are
 * not merely untidy: the next grant's deferred install is an install/replace
 * BATCH that tries to tear the old entities down, and when that teardown
 * reverts the whole batch reverts. The gateway reports it exactly:
 *
 *   SESSION_GRANT_INSTALL_FAILED: deferred grant install/replace did not land
 *   (new entity not installed; prior entities not torn down): ... AA23 reverted
 *
 * At that point every new grant on the runner fails, and the only way out is
 * for the owner to clear the leftovers. That is what this does.
 *
 * KNOWN BLOCKER (2026-08-22): on a runner whose entity was only PARTIALLY
 * installed, the payload the gateway hands back is itself malformed and the
 * send reverts with ArrayLengthMismatch() (0xa24a13a6) at gas estimation.
 * BuildOnChainRevokeCleanup derives hookUninstallData from the STORED grant, so
 * it lists one entry per hook the grant believes it installed. The Sepolia
 * fixture's entity 3 has the signer and allowlist hooks on chain but no
 * TimeRange hook, so storage says three and the account has two.
 *
 * That is self-perpetuating: teardown can never succeed, and because every
 * later grant's install/replace batch includes that teardown, the whole batch
 * reverts and no new grant can install on the runner either. Until the payload
 * is reconciled against chain state, this script can identify the leftovers but
 * not clear them.
 *
 * SENDS ON-CHAIN TRANSACTIONS from the owner EOA. Dry-run by default.
 *
 *   TEST_ENV=railway npx tsx scripts/heal-fixture-entities.ts
 *   TEST_ENV=railway npx tsx scripts/heal-fixture-entities.ts --confirm
 *
 * Set SEPOLIA_RPC to a working endpoint; CHAIN_ENDPOINT in .env may be stale.
 */
import { JsonRpcProvider, Wallet as EthersWallet } from "ethers";

import { getFundedClient, getFundedWallet } from "../tests/utils/client";

const CHAIN_ID = Number(process.env.CHAIN_ID || 11155111);
const RPC = process.env.SEPOLIA_RPC || "https://ethereum-sepolia-rpc.publicnode.com";
const CONFIRM = process.argv.includes("--confirm");

// SingleSignerValidationModule.signers(uint32,address) — non-zero means the
// entity is still installed. The uninstall is NOT idempotent (re-sending after
// it is clear reverts), so this is the gate before every send.
const SIGNERS_SELECTOR = "0x217178fb"; // keccak("signers(uint32,address)")[:4]
// aa.SingleSignerValidationModuleAddressHex in EigenLayer-AVS.
const SINGLE_SIGNER_MODULE = "0x00000000000099DE0BF6fA90dEB851E2A2df7d83";

interface CleanupPayload {
  readonly entityId?: number;
  readonly target?: string;
  readonly callData?: string;
  readonly chainId?: number;
}

async function entityInstalled(
  provider: JsonRpcProvider,
  moduleAddr: string,
  account: string,
  entity: number,
): Promise<boolean> {
  const data =
    SIGNERS_SELECTOR +
    entity.toString(16).padStart(64, "0") +
    account.toLowerCase().replace(/^0x/, "").padStart(64, "0");
  const out = await provider.call({ to: moduleAddr, data });
  return out !== "0x" && BigInt(out) !== 0n;
}

async function main(): Promise<void> {
  const { client, owner, privateKey } = await getFundedClient();
  const wallet = await getFundedWallet(client);
  if (!wallet) throw new Error("no funded wallet resolved");

  const provider = new JsonRpcProvider(RPC);
  const signer = new EthersWallet(privateKey, provider);
  if (signer.address.toLowerCase() !== owner.toLowerCase()) {
    throw new Error(`key is ${signer.address}, expected owner ${owner}`);
  }

  console.log(`owner:  ${owner}`);
  console.log(`runner: ${wallet.address}`);
  console.log(`rpc:    ${RPC}`);
  console.log(CONFIRM ? "mode:   APPLY (sends transactions)\n" : "mode:   dry-run (pass --confirm to send)\n");

  const listed = await client.policies.list(wallet.address, { chainId: CHAIN_ID });
  const pending: Array<{ id: string; cleanup: CleanupPayload }> = [];
  for (const policy of listed.items) {
    const cleanup = (policy as { onChainCleanup?: CleanupPayload }).onChainCleanup;
    if (!cleanup?.callData || !cleanup.target) continue;
    pending.push({ id: policy.id, cleanup });
  }

  if (pending.length === 0) {
    console.log("no policies report an on-chain cleanup payload; nothing to clear");
    return;
  }

  for (const { id, cleanup } of pending) {
    const entity = cleanup.entityId ?? -1;
    // Storage's belief that cleanup is required can outlive the actual
    // teardown (the gateway only learns on the next prepare), so trust the
    // chain, not the flag.
    const installed = await entityInstalled(provider, SINGLE_SIGNER_MODULE, wallet.address, entity);
    if (!installed) {
      console.log(`  entity ${entity} (${id}): already clear on chain — skipping`);
      continue;
    }
    if (!CONFIRM) {
      console.log(`  entity ${entity} (${id}): WOULD send uninstallValidation to ${cleanup.target}`);
      continue;
    }
    console.log(`  entity ${entity} (${id}): sending uninstallValidation...`);
    const tx = await signer.sendTransaction({ to: cleanup.target, data: cleanup.callData });
    const receipt = await tx.wait();
    const ok = receipt?.status === 1;
    console.log(`    tx ${tx.hash} status=${ok ? "success" : "REVERTED"}`);
    if (!ok) {
      console.error("    stopping: a reverted teardown means the rest is guesswork");
      process.exitCode = 1;
      return;
    }
    const stillThere = await entityInstalled(provider, SINGLE_SIGNER_MODULE, wallet.address, entity);
    console.log(`    entity ${entity} installed after: ${stillThere}`);
  }

  if (CONFIRM) {
    console.log("\nleftovers cleared. Re-grant with scripts/refresh-fixture-grant.ts,");
    console.log("then confirm the new entity has a NON-ZERO timeRanges window, not just a signer.");
  }
}

main().catch((err) => {
  console.error("failed:", err);
  process.exit(1);
});
