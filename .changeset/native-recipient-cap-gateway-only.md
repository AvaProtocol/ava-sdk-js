---
"@avaprotocol/sdk-js": major
---

Remove `MAX_NATIVE_RECIPIENTS` and the recipient count check in `SessionPolicyActions.nativeTransfer`. The gateway is the only place the cap lives: it applies to the wallet's whole grant, merged across every automation, which one builder call can't see, and it refuses more at prepare with `SESSION_POLICY_TOO_MANY_NATIVE_RECIPIENTS`. The gateway's cap rises from 5 to 20 (EigenLayer-AVS `MaxNativeRecipients`).
