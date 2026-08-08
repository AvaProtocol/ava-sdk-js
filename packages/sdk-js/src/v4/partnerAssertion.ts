import { createPrivateKey, sign as cryptoSign, type KeyObject } from "node:crypto";

/**
 * Header name for the short-lived Ed25519 partner assertion JWT accepted
 * by the AVS gateway (see EigenLayer-AVS `aggregator/rest/permission.go`).
 */
export const PARTNER_ASSERTION_HEADER = "X-Partner-Assertion";

/**
 * Partner scope for token metadata and preview wallet list/create.
 * Simulate / runNode / runTrigger require a user Bearer JWT instead.
 */
export const PARTNER_SCOPE_READ = "read";

/**
 * PKCS#8 DER prefix for a 32-byte Ed25519 seed
 * (`SEQUENCE` / version / AlgorithmIdentifier ed25519 / OCTET STRING seed).
 */
const ED25519_PKCS8_PREFIX = Buffer.from(
  "302e020100300506032b657004220420",
  "hex",
);

export interface MintPartnerAssertionInput {
  /**
   * Partner's Ed25519 private key as base64 (optionally `ed25519:`-prefixed).
   * Accepts a 32-byte seed, a 64-byte seed+public, or a full PKCS#8 DER blob.
   * Must match a `public_keys` entry on the gateway's `partners[]` config.
   */
  privateKeyBase64: string;
  /** Partner id; must equal the assertion `iss` and a registered partner id (e.g. `"studio"`). */
  partnerId: string;
  /**
   * Scope(s) declared on the token. Gateway checks both registry grant and
   * token claim. Use {@link PARTNER_SCOPE_READ} for tokens + wallet preview.
   */
  scope: string | readonly string[];
  /**
   * Optional end-user subject. Required (non-zero 0x EOA) for preview wallet
   * list/create; optional for pure token metadata.
   */
  subject?: string;
  /**
   * Gateway `partner_assertion_audience` value(s). Required when the gateway
   * has an audience configured (recommended in every env).
   */
  audience?: string | readonly string[];
  /** Seconds until `exp`. Default 300; gateway rejects TTL &gt; 1 hour. */
  expiresInSeconds?: number;
  /** Override `iat` (unix seconds). Defaults to now. */
  issuedAt?: number;
}

/**
 * Mint a short-lived EdDSA (Ed25519) partner assertion JWT for
 * `X-Partner-Assertion`.
 *
 * Permission model (gateway):
 * - `scope: read` alone → token metadata; with non-zero EOA `sub` → wallet list/create
 * - Simulate / runNode / runTrigger → user Bearer JWT only (not partner)
 * - Session policies / fund ops → user JWT; partner header refused
 *
 * @example
 *   const assertion = mintPartnerAssertion({
 *     privateKeyBase64: process.env.PARTNER_ASSERTION_PRIVATE_KEY!,
 *     partnerId: "studio",
 *     scope: PARTNER_SCOPE_READ,
 *     audience: "avs-gateway-staging",
 *   });
 *   const client = new Client({
 *     baseUrl,
 *     headers: { [PARTNER_ASSERTION_HEADER]: assertion },
 *   });
 *   await client.tokens.retrieve(usdcAddress, { chainId: 11155111 });
 */
export function mintPartnerAssertion(input: MintPartnerAssertionInput): string {
  const expiresIn = input.expiresInSeconds ?? 300;
  if (expiresIn <= 0) {
    throw new Error("expiresInSeconds must be positive");
  }
  if (expiresIn > 3600) {
    throw new Error(
      "expiresInSeconds must be at most 3600 (gateway max partner assertion TTL is 1h)",
    );
  }

  const iat = input.issuedAt ?? Math.floor(Date.now() / 1000);
  const exp = iat + expiresIn;

  const scope = Array.isArray(input.scope)
    ? input.scope.join(" ")
    : String(input.scope).trim();
  if (!scope) {
    throw new Error("scope is required");
  }
  if (!input.partnerId?.trim()) {
    throw new Error("partnerId is required");
  }

  const payload: Record<string, unknown> = {
    iss: input.partnerId.trim(),
    scope,
    iat,
    exp,
  };
  if (input.subject !== undefined && input.subject !== "") {
    payload.sub = input.subject;
  }
  if (input.audience !== undefined) {
    const aud = input.audience;
    if (Array.isArray(aud)) {
      if (aud.length === 0) {
        throw new Error("audience array must not be empty when provided");
      }
      payload.aud = [...aud];
    } else if (String(aud).trim() !== "") {
      payload.aud = String(aud).trim();
    }
  }

  const header = { alg: "EdDSA", typ: "JWT" };
  const signingInput = `${base64UrlJson(header)}.${base64UrlJson(payload)}`;
  const key = ed25519PrivateKeyFromBase64(input.privateKeyBase64);
  // Node: for Ed25519, algorithm must be null / undefined.
  const signature = cryptoSign(null, Buffer.from(signingInput, "utf8"), key);
  return `${signingInput}.${base64Url(signature)}`;
}

/**
 * Convenience: build the default-headers map for a Client / Transport.
 */
export function partnerAssertionHeaders(
  input: MintPartnerAssertionInput,
): Record<string, string> {
  return {
    [PARTNER_ASSERTION_HEADER]: mintPartnerAssertion(input),
  };
}

function ed25519PrivateKeyFromBase64(encoded: string): KeyObject {
  const trimmed = encoded.trim().replace(/^ed25519:/i, "");
  const raw = decodeBase64Flexible(trimmed);
  let pkcs8: Buffer;
  if (raw.length === 32) {
    pkcs8 = Buffer.concat([ED25519_PKCS8_PREFIX, raw]);
  } else if (raw.length === 64) {
    // seed (32) + public (32) — common libsodium / some export formats
    pkcs8 = Buffer.concat([ED25519_PKCS8_PREFIX, raw.subarray(0, 32)]);
  } else if (raw.length === 48 && raw.subarray(0, 16).equals(ED25519_PKCS8_PREFIX)) {
    pkcs8 = raw;
  } else if (raw.length > 48) {
    // Assume full PKCS#8 DER
    pkcs8 = raw;
  } else {
    throw new Error(
      `partner private key must be base64 of 32-byte seed, 64-byte seed+pub, or PKCS#8 DER (got ${raw.length} bytes)`,
    );
  }
  try {
    return createPrivateKey({ key: pkcs8, format: "der", type: "pkcs8" });
  } catch (err) {
    throw new Error(
      `invalid Ed25519 private key material: ${(err as Error).message}`,
    );
  }
}

function decodeBase64Flexible(s: string): Buffer {
  const candidates = [
    () => Buffer.from(s, "base64"),
    () => Buffer.from(s, "base64url"),
  ];
  let last: Buffer | undefined;
  for (const tryDecode of candidates) {
    try {
      const b = tryDecode();
      if (b.length > 0) {
        // Prefer the first non-empty decode; std base64 may accept url-safe poorly
        if (!last || b.length >= last.length) last = b;
      }
    } catch {
      // try next
    }
  }
  if (!last || last.length === 0) {
    throw new Error("partner private key is not valid base64");
  }
  return last;
}

function base64UrlJson(value: unknown): string {
  return base64Url(Buffer.from(JSON.stringify(value), "utf8"));
}

function base64Url(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}
