# Studio adoption: partner-gated reads (gateway permission map)

**Related**
- EigenLayer-AVS [#739](https://github.com/AvaProtocol/EigenLayer-AVS/pull/739) — `permission.go` / `ensurePermission`
- ava-sdk-js staging: `mintPartnerAssertion`, `PARTNER_SCOPE_READ`, OpenAPI `partnerAssertion`
- Studio today: `app/lib/partnerAssertion.ts`, `app/lib/avaClient.ts` (`getSimulateClient`)

This is the **Studio-side contract** after the gateway stopped treating partner as “simulate family” and introduced **minimal permission levels**.

---

## 1. What changed on the gateway (do not re-litigate)

| Operation | Auth now | Studio impact |
|-----------|----------|----------------|
| `GET /tokens/{address}` | **Partner only** (`scope: read`) | Must **not** use `getAuthedClient` alone → `PARTNER_REQUIRED` / “wallet must sign in again” on cold JWT |
| `GET/POST /wallets` (list + create/derive) | Partner `read` + EOA `sub` **or** user JWT | Partner-only still OK for preview runner resolve |
| `workflows.simulate` / `nodes.run` / `triggers.run` | **User JWT only** | Partner-only `getSimulateClient` **breaks** (401) |
| Policies / fund moves | User JWT; partner header refused | Unchanged |

There is **no** anonymous public token API. Partner registration stays YAML-only (`partners[]`, scopes include `read`).

---

## 2. Env / gateway config (no new secrets if already local)

| Studio env | Gateway config | Notes |
|------------|----------------|--------|
| `GATEWAY_STUDIO_PARTNER_KEY` | `partners[].public_keys` | Same base64(PEM PKCS8) pair as today |
| `GATEWAY_PARTNER_AUDIENCE` | `partner_assertion_audience` | e.g. `avs-gateway-local` |
| issuer | `partners[].id` | `"studio"` |
| — | `partners[].scopes` | Must include **`read`** (not only `simulate`) |

Deployed gateways: change example/config from `scopes: [simulate]` → `scopes: [read]` (or `[read, simulate]` only if you keep unused claims; **simulate scope no longer authorizes simulate**).

---

## 3. SDK upgrade

1. Bump `@avaprotocol/sdk-js` (and `@avaprotocol/types` if versioned) to a release that includes:
   - `mintPartnerAssertion` / `partnerAssertionHeaders` / `PARTNER_SCOPE_READ` / `PARTNER_ASSERTION_HEADER`
   - OpenAPI `partnerAssertion` security scheme
2. Optional: replace Studio’s local mint with the SDK helper for one implementation:

```ts
import {
  mintPartnerAssertion,
  PARTNER_ASSERTION_HEADER,
  PARTNER_SCOPE_READ,
  Client,
} from "@avaprotocol/sdk-js";

const assertion = mintPartnerAssertion({
  privateKeyBase64: env.GATEWAY_STUDIO_PARTNER_KEY,
  partnerId: "studio",
  scope: PARTNER_SCOPE_READ,
  audience: env.GATEWAY_PARTNER_AUDIENCE,
  subject: ownerEoa, // required for wallet list/create; optional for tokens
  expiresInSeconds: 300,
});
```

Studio may keep `jose` + `app/lib/partnerAssertion.ts` if preferred — then **change scope and call sites** only (below).

---

## 4. Code changes (Studio)

### 4.1 `app/lib/partnerAssertion.ts`

Today hardcodes `scope: "simulate"`:

```ts
const PARTNER_SCOPE = "simulate";
// SignJWT({ scope: PARTNER_SCOPE })
```

**Required:**

1. Support **`read`** (and optionally multi-scope string if needed later).
2. Prefer an explicit API:

```ts
export type PartnerScope = "read" | "simulate"; // "simulate" obsolete for auth

export async function mintPartnerAssertion(
  subjectEoa: string | undefined,
  scope: PartnerScope = "read",
): Promise<string> {
  // claims: scope, iss=studio, sub=subjectEoa when set, aud, exp ≤ 1h
}
```

3. Update error copy: not “partner-delegated simulate”, but “partner-gated gateway calls”.
4. **Do not** mint `scope: simulate` expecting simulate/runNode to work — gateway requires user JWT.

### 4.2 `app/lib/avaClient.ts`

| Helper | Today | Target |
|--------|--------|--------|
| `getSimulateClient` | Partner only, used for simulate/runNode/wallets | **Split** (see below) |
| `getAuthedClient` | User JWT | Keep for simulate, deploy, secrets, policies, etc. |

Recommended helpers:

```ts
/** Partner scope=read. Token metadata; optional subject for logging. */
export async function getPartnerReadClient(chainId: number, subjectEoa?: string): Promise<Client>

/** Partner scope=read + sub = owner EOA. Preview list/create wallets without user JWT. */
export async function getPartnerWalletPreviewClient(chainId: number, ownerEoa: string): Promise<Client>

/** User JWT — simulate / runNode / runTrigger / fund paths. */
// getAuthedClient — unchanged
```

Deprecate or repurpose `getSimulateClient`:

- **Wrong:** keep using it for `workflows.simulate` / `nodes.run` / `triggers.run`.
- **OK:** temporarily alias wallet preview to partner `read` + `sub` until call sites migrate.
- Prefer **rename** so “simulate” is not in the name.

### 4.3 Call-site migration

| Call site (examples) | Old | New |
|----------------------|-----|-----|
| `executionController.getTokenMetadata` | `getAuthedClient` → `tokens.retrieve` | **`getPartnerReadClient`** (no user JWT required) |
| Deposit / token picker server actions | same | partner read client |
| `workflows.simulate` / `nodes.run` / `triggers.run` | `getSimulateClient` | **`getAuthedClient`** (user must have SIWE’d) |
| Wallet list/create for `$SMART_WALLET$` preview without JWT | partner simulate | **`getPartnerWalletPreviewClient(ownerEoa)`** |
| create workflow / policies / withdraw | authed | unchanged |

**UX for Deposit (cold JWT / AutoConnect):**

1. Metadata via partner read → works without AVS JWT.
2. Balances can stay Moralis + NextAuth.
3. Catalog-first fallback for known tokens (USDC/WETH) still recommended.
4. Simulate / real execute still need re-sign when JWT missing — copy should say “sign in to gateway”, not “wallet disconnected”.

### 4.4 Docs / comments to fix in Studio

- `docs/changes/20260717-partner-delegated-simulate.md` — mark **superseded** for simulate; partner is read + wallet preview.
- `STRATEGY_*` / `PLAN_STRATEGY_BUILD_STATUS` — partner is not simulate-only.
- `wallet.avs.model.ts` comments about partner-delegated no-fund simulate.

---

## 5. Suggested implementation order (Studio)

1. Gateway/deploy configs: `scopes: [read]` for Studio partner.
2. Bump `@avaprotocol/sdk-js` (or only change Studio mint scope if SDK not bumped yet).
3. Extend `mintPartnerAssertion(..., scope)` → default **`read`**.
4. Add `getPartnerReadClient` / `getPartnerWalletPreviewClient`.
5. Switch **token metadata** paths off `getAuthedClient`.
6. Switch **simulate / runNode / runTrigger** off partner-only client → `getAuthedClient`.
7. Grep for `getSimulateClient` / `scope: "simulate"` / `mintPartnerAssertion` — zero remaining wrong uses.
8. Manual: Deposit with AutoConnect (no re-SIWE) loads token symbols; Run once still asks for JWT if cold.

---

## 6. Acceptance checklist

- [ ] `tokens.retrieve` with partner `read` assertion, **no** Bearer → 200.
- [ ] `tokens.retrieve` with Bearer only → 401 `PARTNER_REQUIRED` (expected).
- [ ] Simulate / runNode with partner only → 401; with user JWT → success.
- [ ] Wallet list/create with partner `read` + non-zero EOA `sub` → success without JWT.
- [ ] Zero address `sub` rejected for wallets.
- [ ] Local: `GATEWAY_PARTNER_AUDIENCE` matches `partner_assertion_audience`.
- [ ] Deposit UI does not map metadata failure to “wallet not connected” when only JWT is missing.

---

## 7. Security notes for Studio

- Partner private key stays **server-only** (no `NEXT_PUBLIC_`).
- Short TTL (≤ 5m Studio / ≤ 1h gateway cap).
- Leaked partner `read` key = free metadata + wallet derive for asserted `sub`s, **not** fund moves or simulate.
- Never put partner assertion on policy prepare/submit (gateway refuses).

---

## 8. Minimal patch sketch (keep Studio mint)

```ts
// partnerAssertion.ts
export async function mintPartnerAssertion(
  subjectEoa: string | undefined,
  scope: "read" = "read",
): Promise<string> {
  const { SignJWT } = await import("jose");
  const key = await signingKey();
  let builder = new SignJWT({ scope })
    .setProtectedHeader({ alg: "EdDSA" })
    .setIssuer("studio")
    .setAudience(env.GATEWAY_PARTNER_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime("5m")
    .setJti(randomUUID());
  if (subjectEoa) builder = builder.setSubject(subjectEoa);
  return builder.sign(key);
}

// avaClient.ts
export async function getPartnerReadClient(chainId: number, subjectEoa?: string) {
  const assertion = await mintPartnerAssertion(subjectEoa, "read");
  return makeClient(chainId, undefined, { [PARTNER_ASSERTION_HEADER]: assertion });
}

// executionController.getTokenMetadata
const client = await getPartnerReadClient(chainId, eoaAddress);
// optional: still pass eoa for logging/attribution only
await client.tokens.retrieve(erc20Address, { chainId });
```

Simulate paths: replace `getSimulateClient` → `getAuthedClient` (and ensure UI re-exchange when `AuthRequiredError`).

---

## 9. Out of scope for Studio in this pass

- Per-partner rate limits on gateway (deferred).
- Moving Moralis balances onto the gateway.
- Partner registration API.
