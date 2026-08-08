/**
 * Partner assertion helpers for the v4 e2e suite.
 *
 * After EigenLayer-AVS permission map (PR #739), token metadata requires
 * `X-Partner-Assertion` with `scope: read`. Preview wallet list/create
 * accept partner+EOA `sub` or a user JWT. Simulate/runNode need user JWT.
 *
 * Env (match gateway `partners[]` + `partner_assertion_audience`):
 * - `PARTNER_ASSERTION_PRIVATE_KEY` — base64 Ed25519 seed (or PKCS#8)
 * - `PARTNER_ASSERTION_ISSUER` — default `studio`
 * - `PARTNER_ASSERTION_AUDIENCE` — required when gateway sets audience
 */

import {
  mintPartnerAssertion,
  partnerAssertionHeaders,
  PARTNER_ASSERTION_HEADER,
  PARTNER_SCOPE_READ,
} from "@avaprotocol/sdk-js";

import { optionalEnv } from "./env";

export { PARTNER_ASSERTION_HEADER, PARTNER_SCOPE_READ };

/** True when a partner private key is configured for e2e. */
export function hasPartnerAssertionKey(): boolean {
  return Boolean(process.env.PARTNER_ASSERTION_PRIVATE_KEY?.trim());
}

export interface TestPartnerAssertionOpts {
  /** Assertion `sub` (owner EOA for wallet preview). */
  subject?: string;
  scope?: string;
  expiresInSeconds?: number;
}

/**
 * Mint a short-lived partner assertion from test env. Throws a clear
 * message when `PARTNER_ASSERTION_PRIVATE_KEY` is unset.
 */
export function mintTestPartnerAssertion(
  opts: TestPartnerAssertionOpts = {},
): string {
  const privateKeyBase64 = process.env.PARTNER_ASSERTION_PRIVATE_KEY?.trim();
  if (!privateKeyBase64) {
    throw new Error(
      "PARTNER_ASSERTION_PRIVATE_KEY is required for partner-gated tests " +
        "(token metadata). Set it to the base64 Ed25519 private key matching " +
        "gateway partners[].public_keys (issuer PARTNER_ASSERTION_ISSUER, " +
        "audience PARTNER_ASSERTION_AUDIENCE).",
    );
  }
  const partnerId = optionalEnv("PARTNER_ASSERTION_ISSUER", "studio");
  const audience = process.env.PARTNER_ASSERTION_AUDIENCE?.trim();
  return mintPartnerAssertion({
    privateKeyBase64,
    partnerId,
    scope: opts.scope ?? PARTNER_SCOPE_READ,
    subject: opts.subject,
    audience: audience || undefined,
    expiresInSeconds: opts.expiresInSeconds ?? 600,
  });
}

/** Headers map for Client / Transport default headers. */
export function testPartnerHeaders(
  opts: TestPartnerAssertionOpts = {},
): Record<string, string> {
  const privateKeyBase64 = process.env.PARTNER_ASSERTION_PRIVATE_KEY?.trim();
  if (!privateKeyBase64) {
    throw new Error(
      "PARTNER_ASSERTION_PRIVATE_KEY is required for partner-gated tests",
    );
  }
  return partnerAssertionHeaders({
    privateKeyBase64,
    partnerId: optionalEnv("PARTNER_ASSERTION_ISSUER", "studio"),
    scope: opts.scope ?? PARTNER_SCOPE_READ,
    subject: opts.subject,
    audience: process.env.PARTNER_ASSERTION_AUDIENCE?.trim() || undefined,
    expiresInSeconds: opts.expiresInSeconds ?? 600,
  });
}
