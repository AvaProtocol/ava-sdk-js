/**
 * Server-only partner assertion minting (Node.js).
 *
 * Uses `node:crypto` — **do not import this module from the root SDK barrel**
 * or browser bundles. Import via:
 *   `import { mintPartnerAssertion } from "@avaprotocol/sdk-js/partner"`
 *
 * Browser-safe constants live in `partnerAssertionConstants.ts` and are
 * re-exported from the root package for header names / scope strings.
 */

import {
  createPrivateKey,
  randomUUID,
  sign as cryptoSign,
  type KeyObject,
} from "node:crypto";

import {
  PARTNER_ASSERTION_HEADER,
  PARTNER_SCOPE_READ,
} from "./partnerAssertionConstants";

export {
  PARTNER_ASSERTION_HEADER,
  PARTNER_SCOPE_READ,
} from "./partnerAssertionConstants";

/**
 * PKCS#8 DER prefix for a 32-byte Ed25519 seed
 * (`SEQUENCE` / version / AlgorithmIdentifier ed25519 / OCTET STRING seed).
 * Length 16; + 32-byte seed = 48-byte PKCS#8 blob Node accepts.
 */
const ED25519_PKCS8_PREFIX = Buffer.from(
  "302e020100300506032b657004220420",
  "hex",
);

export interface MintPartnerAssertionInput {
  /**
   * Partner's Ed25519 private key. Accepts:
   * - base64 of a 32-byte seed, 64-byte seed+public, or PKCS#8 DER
   * - base64 of a PEM PKCS#8 block (Studio `GATEWAY_STUDIO_PARTNER_KEY` format)
   * - raw PEM text (`-----BEGIN PRIVATE KEY-----`…)
   * Optionally `ed25519:`-prefixed. Must match a gateway `partners[].public_keys` entry.
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
  /**
   * Optional JWT ID. Defaults to a random UUID (`jti`) so Studio and gateway
   * tooling can correlate / (future) de-dupe assertions.
   */
  jti?: string;
}

/**
 * Mint a short-lived EdDSA (Ed25519) partner assertion JWT for
 * `X-Partner-Assertion`. **Node.js only** — see module header.
 *
 * Permission model (gateway):
 * - `scope: read` alone → token metadata; with non-zero EOA `sub` → wallet list/create
 * - Simulate / runNode / runTrigger → user Bearer JWT only (not partner)
 * - Session policies / fund ops → user JWT; partner header refused
 *
 * @example
 *   import { mintPartnerAssertion, PARTNER_SCOPE_READ, PARTNER_ASSERTION_HEADER } from "@avaprotocol/sdk-js/partner";
 *   import { Client } from "@avaprotocol/sdk-js";
 *
 *   const assertion = mintPartnerAssertion({
 *     privateKeyBase64: process.env.GATEWAY_STUDIO_PARTNER_KEY!,
 *     partnerId: "studio",
 *     scope: PARTNER_SCOPE_READ,
 *     audience: "avs-gateway-staging",
 *   });
 *   const client = new Client({
 *     baseUrl,
 *     headers: { [PARTNER_ASSERTION_HEADER]: assertion },
 *   });
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

  const scope = normalizeScope(input.scope);
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
    jti: input.jti?.trim() || randomUUID(),
  };
  if (input.subject !== undefined && input.subject !== "") {
    payload.sub = input.subject;
  }
  if (input.audience !== undefined) {
    const aud = input.audience;
    if (Array.isArray(aud)) {
      const cleaned = aud.map((a) => String(a).trim()).filter(Boolean);
      if (cleaned.length === 0) {
        throw new Error("audience array must not be empty when provided");
      }
      payload.aud = cleaned.length === 1 ? cleaned[0] : cleaned;
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
 * Normalize scope claim: trim each entry, drop empties, join with spaces
 * (OAuth-style). Throws via empty string when nothing remains.
 */
function normalizeScope(scope: string | readonly string[]): string {
  if (Array.isArray(scope)) {
    return scope
      .map((s) => String(s).trim())
      .filter((s) => s.length > 0)
      .join(" ");
  }
  return String(scope).trim();
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

  // Studio stores GATEWAY_STUDIO_PARTNER_KEY as base64(PEM PKCS8 text).
  // Detect PEM either raw or after base64 decode.
  if (trimmed.includes("BEGIN PRIVATE KEY")) {
    try {
      return createPrivateKey(trimmed);
    } catch (err) {
      throw new Error(
        `invalid Ed25519 PEM private key: ${(err as Error).message}`,
      );
    }
  }
  const raw = decodeBase64Flexible(trimmed);
  const asUtf8 = raw.toString("utf8");
  if (asUtf8.includes("BEGIN PRIVATE KEY")) {
    try {
      return createPrivateKey(asUtf8);
    } catch (err) {
      throw new Error(
        `invalid Ed25519 PEM private key (base64-wrapped): ${(err as Error).message}`,
      );
    }
  }

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
      `partner private key must be base64 of 32-byte seed, 64-byte seed+pub, PKCS#8 DER, or base64(PEM) (got ${raw.length} bytes)`,
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

/**
 * Decode base64 or base64url. Node's `base64` decoder is lenient about
 * alphabet (may silently drop or mis-map url-safe chars), so we try both
 * encodings and keep the **longer** non-empty buffer — a wrong alphabet
 * usually yields a shorter/wrong blob rather than throwing.
 */
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
