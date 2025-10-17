#!/usr/bin/env ts-node

import { ethers } from "ethers";
import { getConfig } from "./config";

// Uniswap V3 addresses on Sepolia
const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const PERMIT2_ADDRESS = "0x000000000022D473030F116dDEE9F6B43aC78BA3";
const SWAPROUTER_ADDRESS = "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E";

// ERC-20 ABI for allowance check
const ERC20_ABI = [
  {
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" }
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
];

// Permit2 ABI for allowance check
const PERMIT2_ABI = [
  {
    inputs: [
      { name: "owner", type: "address" },
      { name: "token", type: "address" },
      { name: "spender", type: "address" }
    ],
    name: "allowance",
    outputs: [
      { name: "amount", type: "uint160" },
      { name: "expiration", type: "uint48" },
      { name: "nonce", type: "uint48" }
    ],
    stateMutability: "view",
    type: "function"
  }
];

interface AllowanceResult {
  amount: string;
  formatted: string;
  decimals: number;
}

interface Permit2AllowanceResult {
  amount: string;
  expiration: string;
  nonce: string;
  formatted: string;
  decimals: number;
}

async function checkAllowances(smartWalletAddress: string, rpcUrl: string) {
  console.log("=== Uniswap V3 Allowance Check ===");
  console.log(`Smart Wallet: ${smartWalletAddress}`);
  console.log(`USDC: ${USDC_ADDRESS}`);
  console.log(`Permit2: ${PERMIT2_ADDRESS}`);
  console.log(`SwapRouter: ${SWAPROUTER_ADDRESS}`);
  console.log(`RPC URL: ${rpcUrl}`);
  console.log();

  // Create provider
  const provider = new ethers.JsonRpcProvider(rpcUrl);

  // Create contract instances
  const usdcContract = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, provider);
  const permit2Contract = new ethers.Contract(PERMIT2_ADDRESS, PERMIT2_ABI, provider);

  try {
    // 1. Check USDC balance
    console.log("1. USDC Balance:");
    const balance = await usdcContract.balanceOf(smartWalletAddress);
    const balanceFormatted = ethers.formatUnits(balance, 6);
    console.log(`   Balance: ${balance.toString()}`);
    console.log(`   Balance (formatted): ${balanceFormatted} USDC`);
    console.log();

    // 2. Check DIRECT ERC-20 allowance: USDC -> SwapRouter
    console.log("2. ERC-20 Allowance (USDC -> SwapRouter) [DIRECT]:");
    const allowanceToSwapRouter = await usdcContract.allowance(smartWalletAddress, SWAPROUTER_ADDRESS);
    const swapRouterAllowanceFormatted = ethers.formatUnits(allowanceToSwapRouter, 6);
    console.log(`   Allowance: ${allowanceToSwapRouter.toString()}`);
    console.log(`   Allowance (formatted): ${swapRouterAllowanceFormatted} USDC`);
    console.log();

    // 3. Check ERC-20 allowance: USDC -> Permit2
    console.log("3. ERC-20 Allowance (USDC -> Permit2) [FOR PERMIT2 FLOW]:");
    const allowanceToPermit2 = await usdcContract.allowance(smartWalletAddress, PERMIT2_ADDRESS);
    const allowanceFormatted = ethers.formatUnits(allowanceToPermit2, 6);
    console.log(`   Allowance: ${allowanceToPermit2.toString()}`);
    console.log(`   Allowance (formatted): ${allowanceFormatted} USDC`);
    console.log();

    // 4. Check Permit2 allowance: Permit2 -> SwapRouter
    console.log("4. Permit2 Allowance (Permit2 -> SwapRouter) [FOR PERMIT2 FLOW]:");
    const permit2Allowance = await permit2Contract.allowance(
      smartWalletAddress,
      USDC_ADDRESS,
      SWAPROUTER_ADDRESS
    );
    
    const permit2AmountFormatted = ethers.formatUnits(permit2Allowance.amount, 6);
    const expirationDate = new Date(Number(permit2Allowance.expiration) * 1000);
    
    console.log(`   Amount: ${permit2Allowance.amount.toString()}`);
    console.log(`   Amount (formatted): ${permit2AmountFormatted} USDC`);
    console.log(`   Expiration: ${permit2Allowance.expiration.toString()}`);
    console.log(`   Expiration (date): ${expirationDate.toISOString()}`);
    console.log(`   Nonce: ${permit2Allowance.nonce.toString()}`);
    console.log();

    // 5. Analysis
    console.log("=== Analysis ===");
    
    const hasDirectAllowance = allowanceToSwapRouter > 0;
    const hasERC20Allowance = allowanceToPermit2 > 0;
    const hasPermit2Allowance = permit2Allowance.amount > 0;
    const isExpired = Number(permit2Allowance.expiration) < Math.floor(Date.now() / 1000);
    
    console.log(`✅ DIRECT ERC-20 Allowance (USDC -> SwapRouter): ${hasDirectAllowance ? 'SET (' + swapRouterAllowanceFormatted + ' USDC)' : 'NOT SET'}`);
    console.log(`   Permit2 Flow - ERC-20 Allowance (USDC -> Permit2): ${hasERC20Allowance ? 'SET (' + allowanceFormatted + ' USDC)' : 'NOT SET'}`);
    console.log(`   Permit2 Flow - Permit2 Allowance: ${hasPermit2Allowance ? 'SET (' + permit2AmountFormatted + ' USDC)' : 'NOT SET'}`);
    
    if (hasPermit2Allowance) {
      console.log(`   Permit2 Expiration: ${isExpired ? '⏰ EXPIRED' : '✅ Valid until ' + expirationDate.toISOString()}`);
    }
    
    console.log();
    
    if (!hasDirectAllowance) {
      console.log("❌ ISSUE: Direct USDC -> SwapRouter allowance is NOT SET!");
      console.log("   This is why your swap is failing with STF error!");
      console.log("   Solution: Call USDC.approve(SwapRouter, amount)");
      console.log("   Example: USDC.approve('0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E', '1000000')");
    } else {
      console.log("✅ Direct allowance is SET - swap should work!");
      console.log("   If swap still fails, check:");
      console.log("   - Pool liquidity");
      console.log("   - Slippage settings");
      console.log("   - Token balances");
    }

    return {
      balance: {
        amount: balance.toString(),
        formatted: balanceFormatted,
        decimals: 6
      },
      erc20Allowance: {
        amount: allowanceToPermit2.toString(),
        formatted: allowanceFormatted,
        decimals: 6
      },
      permit2Allowance: {
        amount: permit2Allowance.amount.toString(),
        expiration: permit2Allowance.expiration.toString(),
        nonce: permit2Allowance.nonce.toString(),
        formatted: permit2AmountFormatted,
        decimals: 6
      }
    };

  } catch (error) {
    console.error("Error checking allowances:", error);
    throw error;
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log("Usage: ts-node get-unipswapv3-allowance.ts <smart-wallet-address>");
    console.log("Example: ts-node get-unipswapv3-allowance.ts 0x71c8f4D7D5291EdCb3A081802e7efB2788Bd232e");
    process.exit(1);
  }

  const smartWalletAddress = args[0];
  
  // Validate address
  if (!ethers.isAddress(smartWalletAddress)) {
    console.error("Error: Invalid Ethereum address");
    process.exit(1);
  }

  try {
    const config = getConfig();
    const rpcUrl = config.RPC_PROVIDER;
    
    console.log(`Using environment: ${process.env.npm_config_avs_target || 'dev'}`);
    console.log(`Chain ID: ${config.chainId}`);
    console.log();

    const result = await checkAllowances(smartWalletAddress, rpcUrl);
    
    console.log("\n=== Summary ===");
    console.log(`USDC Balance: ${result.balance.formatted}`);
    console.log(`ERC-20 Allowance: ${result.erc20Allowance.formatted}`);
    console.log(`Permit2 Allowance: ${result.permit2Allowance.formatted}`);
    
  } catch (error) {
    console.error("Failed to check allowances:", error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { checkAllowances, USDC_ADDRESS, PERMIT2_ADDRESS, SWAPROUTER_ADDRESS };
