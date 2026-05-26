import { Wallet, getAddress } from "ethers";

import { Chains } from "./chains";

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
   * Chain id to embed in the canonical message. Defaults to
   * `Chains.EigenLayerAuth` — the auth flow is chain-agnostic, the
   * embedded id only tells the verifier which chain bucket the
   * minted JWT belongs to.
   */
  chainId?: number;
  /** SDK version string surfaced in the message (purely informational). */
  version?: string;
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
 */
export function buildAuthMessage(input: BuildAuthMessageInput): BuiltAuthMessage {
  const issuedAt = input.issuedAt ?? new Date();
  const expireAt = input.expireAt ?? new Date(issuedAt.getTime() + 24 * 60 * 60 * 1000);
  const chainId = input.chainId ?? Chains.EigenLayerAuth;
  // Canonicalize the address so the wire form matches what the
  // aggregator extracts via crypto.PubkeyToAddress.
  const ownerAddress = getAddress(input.ownerAddress);
  const message = AUTH_TEMPLATE
    .replace("{chainId}", String(chainId))
    .replace("{version}", input.version ?? "v4-sdk")
    .replace("{issuedAt}", toRFC3339Millis(issuedAt))
    .replace("{expireAt}", toRFC3339Millis(expireAt))
    .replace("{wallet}", ownerAddress);
  return { message, chainId, ownerAddress, expireAt };
}

/**
 * One-shot helper: build the message, sign it with the supplied
 * private key, and return the payload ready for
 * `client.auth.exchange()`. Only useful in tests / Node tooling
 * where the private key is in hand; browser flows use
 * `buildAuthMessage` + a wallet's `personal_sign`.
 */
export async function signAuthMessage(
  privateKey: string,
  input?: Omit<BuildAuthMessageInput, "ownerAddress"> & { ownerAddress?: string },
): Promise<{ message: string; signature: string; ownerAddress: string; expireAt: Date }> {
  const signer = new Wallet(privateKey);
  const built = buildAuthMessage({
    ownerAddress: input?.ownerAddress ?? signer.address,
    chainId: input?.chainId,
    version: input?.version,
    issuedAt: input?.issuedAt,
    expireAt: input?.expireAt,
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
