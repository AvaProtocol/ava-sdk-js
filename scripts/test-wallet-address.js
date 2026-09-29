const { Wallet } = require("ethers");
require("dotenv").config({ quiet: true });

/**
 * Prints the address of TEST_PRIVATE_KEY (from the environment or .env).
 * Used as the subject when minting test API keys, so nothing pins an
 * address that goes stale when the test key rotates.
 * Usage: node scripts/test-wallet-address.js
 */
const privateKey = process.env.TEST_PRIVATE_KEY;
if (!privateKey) {
  console.error("TEST_PRIVATE_KEY is not set");
  process.exit(1);
}
console.log(new Wallet(privateKey).address);
