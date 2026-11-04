# Wallet-budget owner handoff

The budget gateway contract is EigenLayer-AVS #886, merged to staging as
`150f7e085b6032cd8c8e483dae63ae5add43d388`. The vendored OpenAPI and generated
types are synced to that commit. The SDK provides explicit calls; the app owns
the review, wallet prompt, recovery display and decision to enable a Skill.

## Methods

| Method                                                               | Purpose                                                                                       |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `wallets.getBudget(wallet, { chainId })`                             | Current totals, used, remaining, unmetered permissions, retirement health and pending change. |
| `policies.prepare(wallet, request)`                                  | Existing prepare endpoint; a budget request returns the stored priced owner-operation review. |
| `policies.getPreparation(wallet, id, { chainId })`                   | Recover that exact review and reconcile its original operation.                               |
| `policies.submitPreparation(wallet, id, { signature }, { chainId })` | Submit only the owner's 65-byte signature. The client cannot replace operation fields.        |
| `policies.prepareCancel(wallet, id, { chainId })`                    | Prepare a priced no-op on the held nonce for a separate review and owner signature.           |

Every budget read/recovery/submit/cancel method requires an explicit chain.
The owner's user JWT is required; a partner assertion alone is insufficient.
There is no SDK retry, automatic prepare, auto-sign or polling loop.

## Review and sign

`policies.prepare` supports both legacy typed-data grants and budget owner
operations. Legacy `grant()` is still a typed-data convenience: it refuses an
owner-operation response before calling its signer. Applications that use
`prepare` directly must distinguish the response too. `digest` and `typedData`
are optional in `PreparedPolicy`; this is an intentional type-level breaking
change from the older legacy-only schema.

For budgets, render the returned amounts, expiry, approval resets, unmetered
rights and maximum fee before asking for the signature. Review the exact
`signing.userOp` and hash; do not rebuild, reprice or edit it after review.
The trusted backend supplies approval discovery. The SDK neither discovers
approvals nor mints the service attestation.

An ethers signer uses `signMessage(getBytes(userOpHash))`: personal_sign over
the **32 raw bytes**, not the text of the hexadecimal string. The gateway adds
the `0xFF 0x00` frame. Do not frame it in the SDK or apply EIP-191 twice.

```ts
import { getBytes } from "ethers";
import type { Client } from "@avaprotocol/sdk-js";
import type { PreparedPolicy } from "@avaprotocol/types";

// Called only after the owner reviewed and accepted this exact preparation.
async function submitReviewedBudget(
  client: Client,
  wallet: string,
  chainId: number,
  prepared: PreparedPolicy,
  signer: { signMessage(message: Uint8Array): Promise<string> },
) {
  const signing = prepared.signing;
  if (
    prepared.chainId !== chainId ||
    prepared.state !== "prepared" ||
    !prepared.preparationId ||
    signing?.kind !== "owner_operation" ||
    signing.preparationId !== prepared.preparationId ||
    signing.signingMethod !== "personal_sign" ||
    !signing.userOpHash
  ) {
    throw new Error("Expected the reviewed owner-operation preparation");
  }
  // Persist wallet, chainId, preparationId and userOpHash before signing/send,
  // so a reload or lost reply can recover this same change.
  const signature = await signer.signMessage(getBytes(signing.userOpHash));
  return client.policies.submitPreparation(
    wallet,
    prepared.preparationId,
    { signature },
    { chainId },
  );
}
```

## Activation and recovery

`submitted` means relay/inclusion progress, not usable permission. Enable the
Skill only after a recovered change says `state === "active"` and
`isCancel !== true`. `active` with `isCancel: true` means a cancellation won;
it does not install the proposed permission.

`submitting`, `submitted` and `rejected` remain unsettled and keep Ava's runs
paused. A bundler rejection, timeout or missing hash does not settle a signed
operation. After a lost submit reply, call `getPreparation` on the saved id;
do not automatically prepare or send another operation. A repeated submit still
requires a valid signature and the gateway does not rebroadcast it.

The ten-minute window bounds the first submit of an unsigned review. A send
that has started remains recoverable after that window. Only nonce-consuming
inclusion plus the required reset proof releases the hold. Reverted or
superseded changes must be displayed as such; do not interpret them as an
active new permission.

Cancellation is another priced owner operation. `prepareCancel` returns a
new id and signing review; submit that returned id with its new signature.
Either the original, an owner-reviewed replacement, or the cancel can win the
nonce. No method promises that requesting a cancellation prevents the original
from being included.

## Current rollout boundary

Gateway budget signing is off by default, Sepolia-only, self-funded and capped
at a configurable fee (default **0.005 ETH**). The full discovery, lifecycle and
cross-surface acceptance gates still apply. This SDK change neither provisions
a discovery key nor enables signing or publishes packages. Pending changesets
are released through the staging-to-main release workflow.

`getBudget` is the shared source for amounts. A 503 remainder failure is not
zero remaining and must not fall back to saved totals. An unverified retirement
is separate health information. Missing `native.gasWei` means the historical
gas breakdown was not recorded; do not reconstruct it.
