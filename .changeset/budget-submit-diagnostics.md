---
"@avaprotocol/types": patch
"@avaprotocol/sdk-js": patch
---

Expose optional `Problem.submissionStarted` and `Problem.ownerDelegate` from
[AvaProtocol/EigenLayer-AVS #890](https://github.com/AvaProtocol/EigenLayer-AVS/pull/890)
for budget submit recovery and unsupported owner-account guidance. Sync the
owner-refusal and partial-revoke error documentation from gateway commit
`c78d7efe`. No SDK method, signing, retry or submission behavior changes.
