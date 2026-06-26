/**
 * Per-part multi-chain wire-contract test.
 *
 * Locks the contract defined in EigenLayer-AVS PLAN_CHAIN_DECOUPLING.md:
 * chainId is a property of the *parts that touch a chain* (event/block
 * triggers, contract/transfer nodes), NOT of the workflow. A workflow
 * can watch chain X and act on chain Y; each chain-aware part carries
 * its own explicit chainId, and that value must survive the REST →
 * proto → REST round-trip intact (the protojson round-trip the backend
 * already supports — plan "What already works", G1/G3).
 *
 * Two tiers:
 *   1. Single-stack (runs everywhere, incl. the Sepolia-only CI stack):
 *      every chain-aware part names its chain *explicitly* (no reliance
 *      on workflow-level `chainId` inheritance). Asserts the explicit
 *      chain round-trips through create → retrieve. This is the forward-
 *      compatible shape G5 will make mandatory — writing it now is
 *      no-regret.
 *   2. Cross-chain (gated on a multi-chain stack — Railway, or
 *      MULTICHAIN_TEST=1): trigger on Sepolia, contract read on Base
 *      Sepolia, in ONE workflow. Proves the two-axis model (watch X /
 *      act Y) survives the wire. A Sepolia-only stack rejects the Base
 *      Sepolia part (backend G4 — unconfigured explicit chain), so this
 *      case only runs where both chains are configured.
 *
 * NOTE (intentional, per the renovation plan): this suite sets an
 * explicit `chainId` on every chain-aware part and sends NO
 * workflow-level `chainId` (removed from CreateWorkflowRequest in
 * EigenLayer-AVS #634). This is the post-renovation shape — it stays
 * type-clean after `yarn types-gen` regenerates against #634's spec.
 */

import { Chains, Client, Nodes, Protocols, Tokens, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  createSmartWallet,
  removeCreatedWorkflows,
  settingsForChain,
} from "../../utils/client";

jest.setTimeout(60_000);

// READINESS GATE — the deployed server must honor an explicit per-node
// `chainId` on the *persisted* create() path (backend G3). The current
// `avs-dev:latest` image does NOT: a per-node `chainId` on contractRead
// is rejected at create() in every representation —
//   `cannot unmarshal string into ... ContractReadNodeConfig.chainId of
//    type int64`
// — because the node-config decode mixes protojson (int64 → quoted
// string) with plain encoding/json (rejects the quotes). Verified
// 2026-06-26; see docs/changes/chain-decoupling-sdk-tracking.md. Set
// PER_NODE_CHAIN_READY=1 once the renovated backend (G3, incl. the
// persisted create() path) is deployed to the target stack — then these
// assertions lock the wire contract for real.
const PER_NODE_CHAIN_READY = process.env.PER_NODE_CHAIN_READY === "1";

// A multi-chain stack (Railway deploys worker-sepolia + worker-base-
// sepolia + mainnet/base) is required for the genuine cross-chain case;
// the local CI compose wires Sepolia only. Gate on an explicit opt-in.
const MULTICHAIN_STACK =
  process.env.MULTICHAIN_TEST === "1" || process.env.TEST_ENV === "railway";

const contractTest = PER_NODE_CHAIN_READY ? test : test.skip;
const crossChainTest = PER_NODE_CHAIN_READY && MULTICHAIN_STACK ? test : test.skip;

const USDC_SEPOLIA = Tokens.USDC[Chains.Sepolia]!.address;
const USDC_BASE_SEPOLIA = Tokens.USDC[Chains.BaseSepolia]!.address;
const SYMBOL_ABI = Protocols.erc20.symbolAbi;

// A non-anonymous ERC-20 Transfer signature for the event trigger's
// topic filter — value is irrelevant to the round-trip assertion, we
// only need a well-formed event query so create() accepts it.
const TRANSFER_TOPIC =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

/** Read a part's `config.chainId` off a retrieved workflow (union cast). */
function partChainId(part: unknown): number | undefined {
  return (part as { config?: { chainId?: number } } | undefined)?.config?.chainId;
}

describe("Template: per-part multi-chain wire contract", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  contractTest("explicit per-part chainId round-trips through create → retrieve", async () => {
    const wallet = await createSmartWallet(client);

    const created = await client.workflows.create({
      smartWalletAddress: wallet.address,
      name: "Per-part chain round-trip",
      // No workflow-level chainId — removed from CreateWorkflowRequest in
      // EigenLayer-AVS #634. The chain lives only on the parts below.
      trigger: Triggers.event({
        id: "evt",
        name: "evt",
        chainId: Chains.Sepolia,
        queries: [{ addresses: [USDC_SEPOLIA], topics: [TRANSFER_TOPIC] }],
      }),
      nodes: [
        Nodes.contractRead({
          id: "read",
          name: "read",
          chainId: Chains.Sepolia,
          contractAddress: USDC_SEPOLIA,
          contractAbi: SYMBOL_ABI,
          methodCalls: [{ methodName: "symbol", methodParams: [] }],
        }),
      ],
      edges: [{ id: "e1", source: "evt", target: "read" }],
      inputVariables: { settings: settingsForChain(wallet.address, Chains.Sepolia) },
    });
    expect(typeof created.id).toBe("string");
    createdWorkflowIds.push(created.id);

    const retrieved = await client.workflows.retrieve(created.id);
    expect(retrieved.id).toBe(created.id);
    // The wire contract: each chain-aware part keeps its explicit chain.
    expect(partChainId(retrieved.trigger)).toBe(Chains.Sepolia);
    const readNode = retrieved.nodes?.find((n) => n.id === "read");
    expect(partChainId(readNode)).toBe(Chains.Sepolia);
  });

  crossChainTest(
    "watches an event on Sepolia and reads a contract on Base Sepolia (per-part chains)",
    async () => {
      const wallet = await createSmartWallet(client);

      const created = await client.workflows.create({
        smartWalletAddress: wallet.address,
        name: "Cross-chain watch Sepolia / act Base Sepolia",
        trigger: Triggers.event({
          id: "evt",
          name: "evt",
          chainId: Chains.Sepolia,
          queries: [{ addresses: [USDC_SEPOLIA], topics: [TRANSFER_TOPIC] }],
        }),
        nodes: [
          Nodes.contractRead({
            id: "read",
            name: "read",
            // The act-on chain differs from the watch chain — the whole
            // point of the decoupling.
            chainId: Chains.BaseSepolia,
            contractAddress: USDC_BASE_SEPOLIA,
            contractAbi: SYMBOL_ABI,
            methodCalls: [{ methodName: "symbol", methodParams: [] }],
          }),
        ],
        edges: [{ id: "e1", source: "evt", target: "read" }],
        inputVariables: { settings: settingsForChain(wallet.address, Chains.Sepolia) },
      });
      createdWorkflowIds.push(created.id);

      const retrieved = await client.workflows.retrieve(created.id);
      expect(partChainId(retrieved.trigger)).toBe(Chains.Sepolia);
      const readNode = retrieved.nodes?.find((n) => n.id === "read");
      expect(partChainId(readNode)).toBe(Chains.BaseSepolia);
    },
  );
});
