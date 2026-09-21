import { Wallet } from "ethers";

import type { v4 } from "@avaprotocol/types";

/**
 * Canonical Alchemy SemiModularAccount7702 (`alchemy.sma-7702.1.0.0`).
 * Prepare always returns this; never propose another implementation.
 */
export const SMA7702_DELEGATE =
  "0x69007702764179f14F51cdce752f4f775d74E139";

/**
 * keccak256 of the 23,741-byte bytecode at {@link SMA7702_DELEGATE}.
 * Byte-identical on Sepolia and Base. K13 compares this hash, never
 * type-4 receipt status.
 */
export const SMA7702_IMPL_HASH =
  "0xecfc0328ce4d953a4d452e11f54b578fa2d7f2f8126246d1120ca24d11845081";

/**
 * Signs the EIP-7702 authorization prepare returned.
 *
 * The digest is `SetCodeAuthorization.SigHash`:
 * `keccak256(0x05 ‖ rlp([chainId, delegate, nonce]))`. That is **not**
 * EIP-712 and **not** a session grant. `nonce` is the EOA's nonce — the
 * aggregator broadcasts the type-4, so the EOA is the authority, not
 * `nonce+1`.
 *
 * Node / tests: pass a hex private key. Browser / hardware wallets should
 * implement {@link Eoa7702AuthorizationSigner} with viem
 * `signAuthorization` or ethers `wallet.authorize` instead of exporting
 * the key.
 */
export function signEoa7702Authorization(
  privateKey: string,
  prepared: Pick<v4.PreparedDelegation, "chainId" | "delegate" | "nonce">,
): string {
  const wallet = new Wallet(privateKey);
  const auth = wallet.authorizeSync({
    address: prepared.delegate,
    chainId: prepared.chainId,
    nonce: prepared.nonce,
  });
  return auth.signature.serialized;
}

/**
 * Signs a prepared 7702 authorization. Studio / viem:
 *
 * ```ts
 * const sign: Eoa7702AuthorizationSigner = (prepared) =>
 *   walletClient.signAuthorization({
 *     address: prepared.delegate,
 *     chainId: prepared.chainId,
 *     nonce: prepared.nonce,
 *   }).then((a) => a.signature);
 * ```
 */
export type Eoa7702AuthorizationSigner = (
  prepared: v4.PreparedDelegation,
) => Promise<string>;

/**
 * `chainId=0` is refused on the gateway. Some chain pickers treat 0 as
 * "use JWT aud", which would silently sign the wrong chain. Fail here.
 */
export function assert7702ChainId(chainId: number | undefined): void {
  if (chainId !== undefined && chainId <= 0) {
    throw new Error(
      "7702 delegation chainId must be a positive chain id (Sepolia 11155111 or Base 8453); chainId=0 is refused",
    );
  }
}
