---
"@avaprotocol/sdk-js": minor
"@avaprotocol/types": minor
---

EOA 7702 delegation API (`wallets.prepareDelegation` / `submitDelegation` / `getDelegation` / `delegate`) and native ETH session-grant fields from AVS OpenAPI.

Prepare/submit is the EIP-7702 authorization, not a session grant. `delegate()` polls GET on 202 and never resubmits. `policies.grant` echoes `nativeRecipients` / `nativeSpendCap` / `erc20SpendCaps`. `SessionPolicyActions.nativeTransfer` / `nativeValueCap` compile those fields.
