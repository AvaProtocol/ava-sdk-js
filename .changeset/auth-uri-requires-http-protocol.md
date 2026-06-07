---
"@avaprotocol/sdk-js": patch
---

`buildAuthMessage` now rejects URIs without an explicit `http:` or `https:` scheme.

The WHATWG URL parser accepts strings like `localhost:3000` as valid URLs with scheme `localhost`, so the previous validation (`new URL(uri)` inside a try/catch) let bare authority strings through. A signature scoped to a phantom `localhost:` scheme can't be trusted by anything verifying against the real origin — callers passing such values were getting incorrect behavior.

Existing callers using `http://localhost:3000`, `https://app.example.com`, etc. are unaffected.
