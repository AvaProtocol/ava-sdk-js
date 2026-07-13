---
"@avaprotocol/sdk-js": minor
---

feat(v4): support `Idempotency-Key` on `client.nodes.run`

`client.nodes.run(req, options?)` now accepts an optional `{ idempotencyKey }`
sent as the Stripe-style `Idempotency-Key` HTTP header. For a real execute
(`isSimulated: false`), reusing the same key across retries of one user-initiated
action (e.g. a Confirm click) prevents the gateway from broadcasting a second
UserOp — the retried request replays the first result. Backward compatible: the
header is only sent when a key is provided.
