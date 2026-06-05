---
"@avaprotocol/sdk-js": major
---

`buildAuthMessage`, `signAuthMessage`, and `AuthResource.exchangeWithKey` now require a `uri` parameter (the origin URL the user is authenticating against). This replaces the previously hardcoded `https://app.avaprotocol.org` value so wallet popups display the correct site. The `uri` value is validated as a non-empty, syntactically valid URL at runtime; whitespace-only strings and non-URL values throw immediately.
