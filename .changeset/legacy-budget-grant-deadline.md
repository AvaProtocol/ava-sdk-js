---
"@avaprotocol/types": patch
---

Expose the optional `Problem.legacyGrantDeadline` returned by
`BUDGET_LEGACY_GRANT_PENDING` at budget prepare and submit. It is the latest
outstanding legacy signature deadline in unix milliseconds, so clients can show
when migration becomes possible without parsing the error detail. Synced from
EigenLayer-AVS #889; no SDK method or runtime behavior changes.
