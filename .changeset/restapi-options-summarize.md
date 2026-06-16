---
"@avaprotocol/types": patch
---

types: `RestAPINodeConfig` now exposes an optional `options` bag, with a typed `summarize?: boolean` flag. Setting `summarize: true` on a terminal SendGrid or Telegram RestAPI node opts the workflow into the aggregator's context-memory AI summarizer (which composes a subject + HTML body from execution context and injects them into the outgoing request). No-op on non-notification URLs; the deterministic summarizer remains the default. Surface added via the openapi resync from EigenLayer-AVS staging.
