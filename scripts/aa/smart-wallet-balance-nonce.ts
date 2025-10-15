#!/usr/bin/env ts-node
/**
 * Smart Wallet Diagnostics Script
 * 
 * Comprehensive diagnostics for ERC-4337 smart wallets:
 * - ETH balance (regular and EntryPoint deposit)
 * - Current nonce status
 * - Deposit information
 * 
 * USAGE:
 *   ts-node wallet-diagnostics.ts
 * 
 * ENVIRONMENT VARIABLES (in .env file):
 *   CHAIN_ENDPOINT - Required: RPC endpoint (e.g., base-mainnet.core.chainstack.com/...)
 * 
 * CONFIGURATION:
 *   Edit the constants below to set:
 *   - WALLET - The smart wallet address to diagnose
 *   - ENTRYPOINT - The EntryPoint contract address
 */

import { ethers } from "ethers";
import * as dotenv from "dotenv";
import * as path from "path";

// Load .env from project root
dotenv.config({ path: path.join(__dirname, "../../.env") });

const CHAIN_ENDPOINT = process.env.CHAIN_ENDPOINT;
if (!CHAIN_ENDPOINT) {
  console.error("❌ Error: CHAIN_ENDPOINT not found in .env file");
  console.error("💡 Make sure you have CHAIN_ENDPOINT=<your_rpc_endpoint> in your .env file");
  process.exit(1);
}

const RPC = CHAIN_ENDPOINT.startsWith("http") ? CHAIN_ENDPOINT : `https://${CHAIN_ENDPOINT}`;
const ENTRYPOINT = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const WALLET = "0x981E18d5AadE83620A6Bd21990b5Da0c797e1e5b";

const ENTRYPOINT_ABI = [
  "function getNonce(address sender, uint192 key) view returns (uint256 nonce)",
  "function balanceOf(address account) view returns (uint256)",
  "function getDepositInfo(address account) view returns (tuple(uint112 deposit, bool staked, uint112 stake, uint32 unstakeDelaySec, uint48 withdrawTime))"
];

async function main() {
  console.log("\n🔍 Smart Wallet Diagnostics");
  console.log("=".repeat(60));
  console.log(`Wallet:     ${WALLET}`);
  console.log(`RPC:        ${RPC}`);
  console.log(`EntryPoint: ${ENTRYPOINT}`);
  console.log("=".repeat(60) + "\n");

  const provider = new ethers.JsonRpcProvider(RPC);
  const entrypoint = new ethers.Contract(ENTRYPOINT, ENTRYPOINT_ABI, provider);
  
  // 1. Check Nonce Status
  console.log("📊 NONCE STATUS");
  console.log("-".repeat(60));
  const nonce = await entrypoint.getNonce(WALLET, 0);
  console.log(`Current on-chain nonce: ${nonce}`);
  console.log(`Next UserOp should use nonce: ${nonce}`);
  
  if (nonce === 0n) {
    console.log("ℹ️  This wallet has never submitted a UserOp");
  } else {
    console.log(`✅ ${nonce} UserOps have been successfully executed`);
  }
  console.log();

  // 2. Check ETH Balances
  console.log("💰 ETH BALANCES");
  console.log("-".repeat(60));
  
  // Regular ETH balance
  const ethBalance = await provider.getBalance(WALLET);
  console.log(`Regular ETH balance:     ${ethers.formatEther(ethBalance)} ETH`);
  
  // EntryPoint deposit balance
  const depositBalance = await entrypoint.balanceOf(WALLET);
  console.log(`EntryPoint deposit:      ${ethers.formatEther(depositBalance)} ETH`);
  console.log();

  // 3. Balance Status Assessment
  console.log("🏥 BALANCE STATUS");
  console.log("-".repeat(60));
  if (depositBalance > 0n) {
    console.log("✅ Has deposit in EntryPoint - can pay for UserOps!");
    console.log(`   Available for gas: ${ethers.formatEther(depositBalance)} ETH`);
  } else if (ethBalance > 0n) {
    console.log("⚠️  Has ETH but needs to deposit to EntryPoint first");
    console.log(`   Available ETH: ${ethers.formatEther(ethBalance)} ETH`);
    console.log("💡 To deposit, call EntryPoint.depositTo() with:");
    console.log(`   - Address: ${WALLET}`);
    console.log(`   - Value: amount to deposit`);
  } else {
    console.log("❌ No ETH balance at all");
    console.log("💡 Send ETH to this wallet first, then deposit to EntryPoint");
  }
  console.log();
  
  // 4. Detailed Deposit Info
  console.log("📋 DEPOSIT DETAILS");
  console.log("-".repeat(60));
  const depositInfo = await entrypoint.getDepositInfo(WALLET);
  console.log(`Deposit:            ${ethers.formatEther(depositInfo.deposit)} ETH`);
  console.log(`Staked:             ${depositInfo.staked}`);
  console.log(`Stake Amount:       ${ethers.formatEther(depositInfo.stake)} ETH`);
  console.log(`Unstake Delay:      ${depositInfo.unstakeDelaySec} seconds`);
  if (depositInfo.withdrawTime > 0) {
    const withdrawDate = new Date(Number(depositInfo.withdrawTime) * 1000);
    console.log(`Withdraw Time:      ${withdrawDate.toISOString()}`);
  } else {
    console.log(`Withdraw Time:      Not scheduled`);
  }
  console.log();

  // 5. Summary
  console.log("📝 SUMMARY");
  console.log("-".repeat(60));
  const canExecuteUserOps = depositBalance > 0n || ethBalance > 0n;
  const hasDepositBalance = depositBalance > 0n;
  
  if (hasDepositBalance) {
    console.log("✅ Wallet is ready to execute UserOps");
    console.log(`   ✓ EntryPoint has ${ethers.formatEther(depositBalance)} ETH`);
    console.log(`   ✓ Can execute approximately ${Math.floor(Number(ethers.formatEther(depositBalance)) / 0.0001)} UserOps`);
    console.log(`     (assuming ~0.0001 ETH per UserOp)`);
  } else if (canExecuteUserOps) {
    console.log("⚠️  Wallet needs setup");
    console.log(`   ⚠ ETH available: ${ethers.formatEther(ethBalance)} ETH`);
    console.log("   ⚠ Deposit to EntryPoint required");
    console.log("   💡 Next step: Call EntryPoint.depositTo()");
  } else {
    console.log("❌ Wallet not ready");
    console.log("   ❌ No ETH balance");
    console.log("   💡 Next step: Send ETH to wallet, then deposit to EntryPoint");
  }
  console.log("\n");
}

main().catch((error) => {
  console.error("❌ Error running diagnostics:", error);
  process.exit(1);
});

