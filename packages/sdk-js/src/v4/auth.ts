import { Wallet, getAddress } from "ethers";

/**
 * Canonical EIP-191 message template the aggregator's auth handler
 * verifies. Must match the format documented in the API spec.
 *
 * Filled by `buildAuthMessage` below; the SDK exports both halves
 * (build + sign) so non-SDK callers (web wallets, smart-account
 * signers) can produce a message that exchanges cleanly.
 */
export const AUTH_TEMPLATE = `Please sign the below text for ownership verification.

URI: https://app.avaprotocol.org
Chain ID: {chainId}
Version: {version}
Issued At: {issuedAt}
Expire At: {expireAt}
Wallet: {wallet}`;

export interface BuildAuthMessageInput {
  /** EOA the JWT will be bound to. Lowercased / checksummed both work. */
  ownerAddress: string;
  /**
   * Chain ID to embed in the canonical message. Required — callers
   * MUST pass the user's currently-connected wallet chain (e.g.
   * `await wallet.getChainId()`). The aggregator echoes this into
   * the JWT `aud` claim, which becomes the default chain for
   * subsequent wallet RPCs. Hardcoding a value here would silently
   * route every request to the wrong chain.
   */
  chainId: number;
  /**
   * Gateway binary version to stamp into the message. Required —
   * fetch it once per session via `client.health.check()` and pass
   * the `version` field through. Pinning a literal here (the old
   * `"v4-sdk"` default) lies about which gateway the message was
   * signed against and breaks support triage.
   */
  version: string;
  /** Issuance timestamp; defaults to `new Date()`. */
  issuedAt?: Date;
  /** Token expiry; defaults to 24h from issuedAt. */
  expireAt?: Date;
}

export interface BuiltAuthMessage {
  readonly message: string;
  readonly chainId: number;
  readonly ownerAddress: string;
  readonly expireAt: Date;
}

/**
 * Build the canonical auth message a wallet must sign. Pure — does
 * no signing — so it can run in the browser before opening the wallet
 * popup.
 *
 * @example
 *   const { version } = await client.health.check();
 *   const chainId = await wallet.getChainId();
 *   const { message } = buildAuthMessage({ ownerAddress, chainId, version });
 *   const signature = await wallet.signMessage(message);
 *   const { token } = await client.auth.exchange({ ownerAddress, message, signature });
 */
export function buildAuthMessage(input: BuildAuthMessageInput): BuiltAuthMessage {
  if (!Number.isInteger(input.chainId) || input.chainId <= 0) {
    throw new Error(
      "buildAuthMessage: chainId must be a positive integer (the wallet's currently-connected chain).",
    );
  }
  if (typeof input.version !== "string" || input.version.length === 0) {
    throw new Error(
      "buildAuthMessage: version must be a non-empty string (fetch it from `client.health.check()`).",
    );
  }
  const issuedAt = input.issuedAt ?? new Date();
  const expireAt = input.expireAt ?? new Date(issuedAt.getTime() + 24 * 60 * 60 * 1000);
  // Canonicalize the address so the wire form matches what the
  // aggregator extracts via crypto.PubkeyToAddress.
  const ownerAddress = getAddress(input.ownerAddress);
  const message = AUTH_TEMPLATE
    .replace("{chainId}", String(input.chainId))
    .replace("{version}", input.version)
    .replace("{issuedAt}", toRFC3339Millis(issuedAt))
    .replace("{expireAt}", toRFC3339Millis(expireAt))
    .replace("{wallet}", ownerAddress);
  return { message, chainId: input.chainId, ownerAddress, expireAt };
}

/**
 * One-shot helper: build the message, sign it with the supplied
 * private key, and return the payload ready for
 * `client.auth.exchange()`. Only useful in tests / Node tooling
 * where the private key is in hand; browser flows use
 * `buildAuthMessage` + a wallet's `personal_sign`.
 *
 * `chainId` and `version` are required for the same reasons as
 * `buildAuthMessage` — silent defaults would lie about the chain
 * the JWT is bound to and the gateway it was signed against.
 */
export async function signAuthMessage(
  privateKey: string,
  input: Omit<BuildAuthMessageInput, "ownerAddress"> & { ownerAddress?: string },
): Promise<{ message: string; signature: string; ownerAddress: string; expireAt: Date }> {
  const signer = new Wallet(privateKey);
  const built = buildAuthMessage({
    ownerAddress: input.ownerAddress ?? signer.address,
    chainId: input.chainId,
    version: input.version,
    issuedAt: input.issuedAt,
    expireAt: input.expireAt,
  });
  // signMessage performs EIP-191 personal_sign — the same prefix
  // accounts.TextHash uses on the verifier side.
  const signature = await signer.signMessage(built.message);
  return {
    message: built.message,
    signature,
    ownerAddress: built.ownerAddress,
    expireAt: built.expireAt,
  };
}

// toRFC3339Millis renders a Date as `2026-05-25T12:00:00.000Z`. Matches
// the format the aggregator's verifier parses with the layout
// `2006-01-02T15:04:05.000Z`.
function toRFC3339Millis(d: Date): string {
  return d.toISOString().replace(/(\.\d{3})\d*Z$/, "$1Z");
}
