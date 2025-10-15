#!/usr/bin/env ts-node
/**
 * Cancel Stuck UserOp Script
 * 
 * Creates a minimal "no-op" UserOp with the same nonce as the stuck one,
 * but with MUCH HIGHER gas fees to get picked up immediately by bundlers.
 * This effectively "cancels" the old UserOp by consuming the nonce.
 * 
 * USAGE:
 *   # With paymaster (default):
 *   ts-node cancel-stuck-userop.ts
 * 
 *   # Without paymaster (uses wallet's own ETH):
 *   ts-node cancel-stuck-userop.ts --no-paymaster
 * 
 * ENVIRONMENT VARIABLES (in .env file):
 *   CONTROLLER_PRIVATE_KEY - Required: Controller private key for signing UserOps
 *   PAYMASTER_PRIVATE_KEY - Required if using paymaster
 *   CHAIN_ENDPOINT - Required: RPC endpoint (e.g., base-mainnet.core.chainstack.com/...)
 * 
 * CONFIGURATION:
 *   Edit the config object below to set:
 *   - wallet address
 *   - nonce to cancel
 *   - chain (base/sepolia)
 */

import { ethers } from "ethers";
import * as dotenv from "dotenv";
import * as path from "path";

// Load .env from project root
dotenv.config({ path: path.join(__dirname, "../../.env") });

// Configuration
interface Config {
  chain: string;
  wallet: string;
  nonce: number;
  bundlerUrl: string;
  rpcUrl: string;
  entryPoint: string;
  paymaster?: string;
  controllerPrivateKey: string;
  paymasterPrivateKey?: string;
  usePaymaster: boolean;
}

// Constants
const ENTRYPOINT_V06 = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

interface ChainConfig {
  bundlerUrl: string;
  paymaster: string;
}

const CHAIN_CONFIGS: Record<string, ChainConfig> = {
  base: {
    bundlerUrl: "http://localhost:4440/rpc",
    paymaster: "0xB985af5f96EF2722DC99aEBA573520903B86505e",
  },
  sepolia: {
    bundlerUrl: "https://bundler-sepolia.avaprotocol.org/rpc",
    paymaster: "0xB985af5f96EF2722DC99aEBA573520903B86505e",
  },
};

const PAYMASTER_ABI = [
  "function senderNonce(address sender) view returns (uint256)",
  "function getHash(tuple(address sender, uint256 nonce, bytes initCode, bytes callData, " +
    "uint256 callGasLimit, uint256 verificationGasLimit, uint256 preVerificationGas, " +
    "uint256 maxFeePerGas, uint256 maxPriorityFeePerGas, bytes paymasterAndData, bytes signature) " +
    "userOp, uint48 validUntil, uint48 validAfter) view returns (bytes32)",
];

const ENTRYPOINT_ABI = [
  "function getNonce(address sender, uint192 key) view returns (uint256 nonce)",
];

async function main() {
  // Parse command line arguments
  const usePaymaster = !process.argv.includes("--no-paymaster");

  console.log(`🚫 Cancel Stuck UserOp Script ${usePaymaster ? "(With Paymaster)" : "(No Paymaster)"}`);
  console.log("=".repeat(60) + "\n");

  // Get environment variables
  const controllerPrivateKey = process.env.CONTROLLER_PRIVATE_KEY;
  if (!controllerPrivateKey) {
    throw new Error("CONTROLLER_PRIVATE_KEY not found in .env file");
  }

  let paymasterPrivateKey: string | undefined;
  if (usePaymaster) {
    paymasterPrivateKey = process.env.PAYMASTER_PRIVATE_KEY;
    if (!paymasterPrivateKey) {
      throw new Error("PAYMASTER_PRIVATE_KEY not found in .env file (or use --no-paymaster flag)");
    }
  }

  const chainEndpoint = process.env.CHAIN_ENDPOINT;
  if (!chainEndpoint) {
    throw new Error("CHAIN_ENDPOINT not found in .env file");
  }

  const rpcUrl = chainEndpoint.startsWith("http") ? chainEndpoint : `https://${chainEndpoint}`;
  const chainConfig = CHAIN_CONFIGS.base;
  
  const config: Config = {
    chain: "base",
    wallet: "0x981E18d5AadE83620A6Bd21990b5Da0c797e1e5b",
    nonce: 2,
    bundlerUrl: chainConfig.bundlerUrl,
    rpcUrl: rpcUrl,
    entryPoint: ENTRYPOINT_V06,
    paymaster: usePaymaster ? chainConfig.paymaster : undefined,
    controllerPrivateKey: controllerPrivateKey,
    paymasterPrivateKey: paymasterPrivateKey,
    usePaymaster: usePaymaster,
  };

  console.log(`Chain:        ${config.chain}`);
  console.log(`Wallet:       ${config.wallet}`);
  console.log(`Nonce:        ${config.nonce} (CANCELING STUCK USEROP)`);
  console.log(`Bundler:      ${config.bundlerUrl}`);
  console.log(`RPC:          ${config.rpcUrl}`);
  console.log(`EntryPoint:   ${config.entryPoint}`);
  if (config.paymaster) {
    console.log(`Paymaster:    ${config.paymaster}`);
  }
  console.log();

  const provider = new ethers.JsonRpcProvider(config.rpcUrl);
  const controllerPk = config.controllerPrivateKey.startsWith('0x') ? config.controllerPrivateKey : `0x${config.controllerPrivateKey}`;
  const controllerWallet = new ethers.Wallet(controllerPk, provider);

  console.log(`Controller:   ${controllerWallet.address}\n`);

  // Check smart wallet ETH balance if not using paymaster
  if (!config.usePaymaster) {
    const balance = await provider.getBalance(config.wallet);
    console.log(`💰 Smart wallet balance: ${ethers.formatEther(balance)} ETH`);
    if (balance === 0n) {
      throw new Error("Smart wallet has no ETH balance! Please send ETH first or use --paymaster flag.");
    }
    console.log(`✅ Sufficient balance for self-paid UserOp\n`);
  }

  // Verify on-chain nonce
  const entrypoint = new ethers.Contract(config.entryPoint, ENTRYPOINT_ABI, provider);
  const onChainNonce = await entrypoint.getNonce(config.wallet, 0);
  console.log(`📊 Current on-chain nonce: ${onChainNonce}`);
  
  if (onChainNonce != BigInt(config.nonce)) {
    throw new Error(`On-chain nonce (${onChainNonce}) doesn't match target nonce (${config.nonce})`);
  }
  console.log(`✅ Nonce matches - ready to cancel stuck UserOp\n`);

  // Build minimal no-op UserOp
  console.log(`📝 Building minimal no-op UserOp...`);
  console.log(`   Operation: Self-call with empty calldata (does nothing)`);

  // Encode: execute(address(this), 0, "") - minimal operation
  const executeSelector = "0xb61d27f6"; // execute(address,uint256,bytes)
  const callData = ethers.concat([
    executeSelector,
    ethers.AbiCoder.defaultAbiCoder().encode(
      ["address", "uint256", "bytes"],
      [config.wallet, 0, "0x"]
    ),
  ]);
  console.log(`   CallData: ${callData.slice(0, 66)}...\n`);

  // Get current gas prices and BOOST them significantly
  const feeData = await provider.getFeeData();
  const baseMaxFeePerGas = feeData.maxFeePerGas || ethers.parseUnits("1", "gwei");
  const baseMaxPriorityFeePerGas = feeData.maxPriorityFeePerGas || ethers.parseUnits("0.1", "gwei");

  // BOOST: Higher fees to get picked up immediately
  const boostMultiplier = config.usePaymaster ? 10n : 20n;
  const maxFeePerGas = baseMaxFeePerGas * boostMultiplier;
  const maxPriorityFeePerGas = baseMaxPriorityFeePerGas * boostMultiplier;

  console.log(`💰 Aggressive gas fees (${boostMultiplier}x boost):`);
  console.log(`   maxFeePerGas:         ${ethers.formatUnits(maxFeePerGas, "gwei")} gwei`);
  console.log(`   maxPriorityFeePerGas: ${ethers.formatUnits(maxPriorityFeePerGas, "gwei")} gwei\n`);

  // Build UserOp
  interface UserOp {
    sender: string;
    nonce: string;
    initCode: string;
    callData: string;
    callGasLimit: string;
    verificationGasLimit: string;
    preVerificationGas: string;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    paymasterAndData: string;
    signature: string;
  }

  const userOp: UserOp = {
    sender: config.wallet,
    nonce: `0x${config.nonce.toString(16)}`,
    initCode: "0x",
    callData: callData,
    callGasLimit: "0x186a0", // 100k
    verificationGasLimit: "0x249f0", // 150k
    preVerificationGas: "0xc350", // 50k
    maxFeePerGas: `0x${maxFeePerGas.toString(16)}`,
    maxPriorityFeePerGas: `0x${maxPriorityFeePerGas.toString(16)}`,
    paymasterAndData: "0x",
    signature: "0x",
  };

  // Configure paymaster if needed
  if (config.usePaymaster && config.paymaster && config.paymasterPrivateKey) {
    console.log(`🏦 Configuring paymaster sponsorship...`);
    const paymasterPk = config.paymasterPrivateKey.startsWith('0x') ? config.paymasterPrivateKey : `0x${config.paymasterPrivateKey}`;
    const paymasterWallet = new ethers.Wallet(paymasterPk, provider);
    const paymasterContract = new ethers.Contract(config.paymaster, PAYMASTER_ABI, provider);
    const paymasterNonce = await paymasterContract.senderNonce(userOp.sender);
    console.log(`   Paymaster nonce: ${paymasterNonce}`);

    const now = Math.floor(Date.now() / 1000);
    const validAfter = now - 60; // 1 minute ago
    const validUntil = now + 900; // 15 minutes from now

    console.log(`   validAfter: ${validAfter} (${new Date(validAfter * 1000).toISOString()})`);
    console.log(`   validUntil: ${validUntil} (${new Date(validUntil * 1000).toISOString()})`);

    // Create dummy paymasterAndData for hash calculation
    const dummyPaymasterData = "0x" + "ff".repeat(65);
    const tempUserOp = { ...userOp, paymasterAndData: dummyPaymasterData };

    const paymasterHash = await paymasterContract.getHash(tempUserOp, validUntil, validAfter);
    console.log(`   Paymaster hash: ${paymasterHash}`);

    // Sign paymaster hash
    const paymasterSignature = await paymasterWallet.signMessage(ethers.getBytes(paymasterHash));
    console.log(`   Paymaster signature: ${paymasterSignature.slice(0, 20)}...`);

    // Pack timestamps (validUntil, validAfter per Solidity contract)
    const timestampArgs = ethers.AbiCoder.defaultAbiCoder();
    const encodedTimestamps = timestampArgs.encode(
      ["uint48", "uint48"],
      [validUntil, validAfter]
    );

    // Build final paymasterAndData
    userOp.paymasterAndData = ethers.concat([
      config.paymaster,
      encodedTimestamps,
      paymasterSignature,
    ]);
    console.log(`   PaymasterAndData length: ${ethers.dataLength(userOp.paymasterAndData)} bytes\n`);
  } else if (config.usePaymaster) {
    console.log(`   ⚠️  Skipping paymaster (wallet will pay for gas)\n`);
  }

  // Sign UserOp
  console.log(`✍️  Signing UserOp...`);
  const chainId = (await provider.getNetwork()).chainId;

  const userOpHash = ethers.keccak256(
    ethers.AbiCoder.defaultAbiCoder().encode(
      [
        "address",
        "uint256",
        "bytes32",
        "bytes32",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
        "bytes32",
      ],
      [
        userOp.sender,
        BigInt(userOp.nonce),
        ethers.keccak256(userOp.initCode),
        ethers.keccak256(userOp.callData),
        BigInt(userOp.callGasLimit),
        BigInt(userOp.verificationGasLimit),
        BigInt(userOp.preVerificationGas),
        BigInt(userOp.maxFeePerGas),
        BigInt(userOp.maxPriorityFeePerGas),
        ethers.keccak256(userOp.paymasterAndData),
      ]
    )
  );

  const userOpHashWithEntryPoint = ethers.keccak256(
    ethers.AbiCoder.defaultAbiCoder().encode(
      ["bytes32", "address", "uint256"],
      [userOpHash, config.entryPoint, chainId]
    )
  );

  const userOpSignature = await controllerWallet.signMessage(
    ethers.getBytes(userOpHashWithEntryPoint)
  );
  userOp.signature = userOpSignature;

  console.log(`   UserOp hash: ${userOpHashWithEntryPoint}`);
  console.log(`   Signature: ${userOpSignature.slice(0, 20)}...\n`);

  // Send to bundler
  console.log(`📤 Sending CANCEL UserOp to bundler...`);
  console.log(`   URL: ${config.bundlerUrl}`);
  if (!config.usePaymaster) {
    console.log(`   Note: Smart wallet will pay for gas (no paymaster)`);
  }
  console.log();
  
  const response = await fetch(config.bundlerUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_sendUserOperation",
      params: [userOp, config.entryPoint],
      id: 1,
    }),
  });

  const result = await response.json() as { error?: { message: string; code: number }; result?: string };

  if (result.error) {
    console.log(`❌ Error sending UserOp to bundler:`);
    console.log(JSON.stringify(result.error, null, 2));
    process.exit(1);
  }

  console.log(`✅ CANCEL UserOp accepted by bundler!`);
  console.log(`   UserOp hash: ${result.result}\n`);

  console.log(`⏳ Waiting for transaction to be mined...`);
  console.log(`   High fees should get it picked up within seconds!\n`);

  console.log(`🔍 Check transaction on block explorer using UserOp hash: ${result.result}\n`);

  console.log(`✨ Once mined, the stuck nonce will be consumed and you can proceed with nonce ${config.nonce + 1}!`);
}

main().catch((error) => {
  console.error("An unexpected error occurred:", error);
  process.exit(1);
});
