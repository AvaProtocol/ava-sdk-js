---
"@avaprotocol/sdk-js": minor
"@avaprotocol/types": minor
---

EOA 7702 delegation API (`wallets.prepareDelegation` / `submitDelegation` / `getDelegation` / `delegate`) and native ETH session-grant fields from AVS OpenAPI.

Prepare/submit is the EIP-7702 authorization, not a session grant. Signing refuses a non-canonical delegate and a digest that is not the locally re-derived `SetCodeAuthorization.SigHash`. `delegate()` polls GET until `delegated` (`missing` after 202 is not failure). `policies.grant` echoes `nativeRecipients` / `nativeSpendCap` / `erc20SpendCaps`. `SessionPolicyActions.nativeTransfer` / `nativeValueCap` compile those fields. Requires ethers ≥ 6.14.
