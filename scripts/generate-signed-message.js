/**
 * @file Get wallet address and generate a signed message from a private key
 *       An environment variable TEST_MNEMONIC must be set to the mnemonic used to generate the wallet
 */

import { ethers } from "ethers";
import { getKeyRequestMessage } from "../dist/index.js";

const mnemonic = process.env.TEST_MNEMONIC;
const expiredAtEpoch = Math.floor(Date.now() / 1000) + 24 * 60 * 60;

if (!mnemonic) {
  throw new Error("Mnemonic is required; Please set the TEST_MNEMONIC environment variable.");
}

const wallet = ethers.Wallet.fromPhrase(mnemonic);

console.log("Address:", wallet.address, "Expired at epoch:", expiredAtEpoch);
console.log("Private key:", wallet.privateKey);

// Generate the key request message
const message = getKeyRequestMessage(wallet.address, expiredAtEpoch);

async function main() {
  const signature = await wallet.signMessage(message);
  console.log("Message:", message);
  console.log("Signature:", signature);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
