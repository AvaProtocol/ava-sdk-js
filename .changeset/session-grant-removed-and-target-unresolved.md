---
"@avaprotocol/sdk-js": patch
"@avaprotocol/types": minor
---

Session grant types declare optional `removed` on `SessionPolicyCapChange` and the `target_unresolved` authorization status. `previousAmount` is what remained on the previous grant. A carried cap is the greater of what remains and what enabled automations still need, plus the addition. `policies.grant` sends `dropTaskIds` on an `add` prepare and submits prepare's `affectedTaskIds`. `workflows.simulate` and `policies.submit` document `target_unresolved` and `SESSION_POLICY_NATIVE_UNSIZED`.
