# Wallet sweep workflow and simulation example

Date: 2026-10-26
Status: Proposed; workflow/simulation phase only
Branch: `feat/1987-wallet-sweep-example`
Related: [Studio #1987](https://github.com/AvaProtocol/studio/issues/1987)

Adds `examples/wallet-sweep.ts` and a shared workflow factory for Studio #1987.
The Sepolia example reads USDC/WETH balances through existing ContractRead
nodes, omits zeros, and compiles exact snapshot amounts into a multi-target
ContractWrite node. A second balance check takes a failure branch if the
snapshot changed. Per-token simulation results must succeed and return true.

The CLI prints the preview/definition or simulates the complete graph. It
never creates or triggers a workflow, installs a grant, signs a transfer or
sends an on-chain transaction. Owner-signed execution and atomic workflow
batching remain gateway integration work; a multi-call node alone does not
prove either capability. The builder documentation now states this boundary.

The [owner-signed execution contract](../wallet-sweep-owner-execution.md) records
the verified next-phase requirements at gateway `ac7ad90f`: reuse per-call/batch
encoding and pricing, select the owner nonce with the global option, personal-sign
the raw hash bytes, normalize/frame the signature, finalize gas and sponsorship
before signing, relay unchanged signed fields without server-key retries and
reuse status with its current ownership boundary. No new gateway/SDK execution
API is introduced by this example.

Coverage includes offline graph/transport checks, live empty-wallet reads,
stale-snapshot refusal and an explicitly enabled funded two-token simulation.
The funded case checks unchanged source balances after simulation. Native ETH,
EIP-7702 setup and arbitrary token imports are outside this first example.
