const { ethers } = require("ethers");
require("dotenv").config();

/**
 * Script to analyze a transaction using Etherscan API
 * Usage: node scripts/analyze-transaction.js <txHash> [chain]
 * Chain options: sepolia, ethereum, base-sepolia, base, soneium, soneium-minato, bsc, bsc-testnet
 */
const CHAINS = require("../config/chains.json");

async function analyzeTransaction(txHash, chain = "sepolia") {
  const apiKey = process.env.ETHERSCAN_API_KEY;
  
  if (!apiKey) {
    console.error("❌ ETHERSCAN_API_KEY environment variable is required");
    console.error("   Set it in your .env file or export it in your shell");
    process.exit(1);
  }

  // Determine Explorer API URL from shared config
  const chainConfig = CHAINS[chain];
  if (!chainConfig) {
    console.error(
      `❌ Invalid chain: ${chain}. Available chains: ${Object.keys(CHAINS).join(
        ", "
      )}`
    );
    process.exit(1);
  }
  const baseUrl = chainConfig.explorerApiBaseUrl;
  if (!baseUrl) {
    console.error(`❌ Explorer API not configured for chain: ${chain}`);
    process.exit(1);
  }

  console.log(`🔍 Analyzing transaction: ${txHash}`);
  console.log(`📡 Using Etherscan API for chain: ${chain}\n`);

  try {
    // 1. Get basic transaction details
    console.log("1️⃣ Fetching transaction details...");
    const txResponse = await fetch(
      `${baseUrl}?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${apiKey}`
    );
    const txData = await txResponse.json();

    if (txData.error) {
      console.error("❌ Error fetching transaction:", txData.error);
      return;
    }

    const tx = txData.result;
    if (!tx || tx === null) {
      console.error("❌ Transaction not found or invalid response");
      return;
    }

    console.log(
      `   Block Number: ${
        tx.blockNumber ? parseInt(tx.blockNumber, 16) : "N/A"
      }`
    );
    console.log(`   From: ${tx.from || "N/A"}`);
    console.log(`   To: ${tx.to || "N/A"}`);
    console.log(
      `   Value: ${tx.value ? ethers.formatEther(tx.value) : "0"} ETH`
    );
    console.log(`   Gas Limit: ${tx.gas ? parseInt(tx.gas, 16) : "N/A"}`);
    console.log(
      `   Gas Price: ${
        tx.gasPrice ? ethers.formatUnits(tx.gasPrice, "gwei") : "N/A"
      } gwei`
    );
    console.log(
      `   Input Data Length: ${tx.input ? tx.input.length : 0} bytes`
    );

    // 2. Get transaction receipt
    console.log("\n2️⃣ Fetching transaction receipt...");
    const receiptResponse = await fetch(
      `${baseUrl}?module=proxy&action=eth_getTransactionReceipt&txhash=${txHash}&apikey=${apiKey}`
    );
    const receiptData = await receiptResponse.json();

    if (receiptData.error) {
      console.error("❌ Error fetching receipt:", receiptData.error);
      return;
    }

    const receipt = receiptData.result;
    if (!receipt || receipt === null) {
      console.error("❌ Transaction receipt not found or invalid response");
      return;
    }

    console.log(
      `   Status: ${receipt.status === "0x1" ? "✅ Success" : "❌ Failed"}`
    );
    console.log(
      `   Gas Used: ${receipt.gasUsed ? parseInt(receipt.gasUsed, 16) : "N/A"}`
    );
    console.log(
      `   Effective Gas Price: ${
        receipt.effectiveGasPrice
          ? ethers.formatUnits(receipt.effectiveGasPrice, "gwei")
          : "N/A"
      } gwei`
    );

    // 3. Get internal transactions
    console.log("\n3️⃣ Fetching internal transactions...");
    const internalResponse = await fetch(
      `${baseUrl}?module=account&action=txlistinternal&txhash=${txHash}&apikey=${apiKey}`
    );
    const internalData = await internalResponse.json();

    if (internalData.error) {
      console.error(
        "❌ Error fetching internal transactions:",
        internalData.error
      );
      return;
    }

    const internalTxs = internalData.result;
    if (!Array.isArray(internalTxs)) {
      console.log(
        `   Internal transactions data: ${JSON.stringify(internalTxs)}`
      );
      console.log(`   Found 0 internal transactions (invalid response format)`);
      return;
    }

    console.log(`   Found ${internalTxs.length} internal transactions`);

    // Analyze internal transactions
    let withdrawalFound = false;
    let reimbursementFound = false;

    internalTxs.forEach((internalTx, index) => {
      console.log(`\n   Internal TX ${index + 1}:`);
      console.log(`     Type: ${internalTx.type || "N/A"}`);
      console.log(`     From: ${internalTx.from || "N/A"}`);
      console.log(`     To: ${internalTx.to || "N/A"}`);
      console.log(
        `     Value: ${
          internalTx.value ? ethers.formatEther(internalTx.value) : "0"
        } ETH`
      );
      console.log(`     Gas: ${internalTx.gas || "N/A"}`);
      console.log(`     Gas Used: ${internalTx.gasUsed || "N/A"}`);
      console.log(
        `     Is Error: ${internalTx.isError === "1" ? "❌ Yes" : "✅ No"}`
      );

      // Check for withdrawal (to recipient)
      if (
        internalTx.to?.toLowerCase() ===
        "0x804e49e8c4edb560ae7c48b554f6d2e27bb81557"
      ) {
        console.log(
          `     🎯 WITHDRAWAL FOUND: ${
            internalTx.value ? ethers.formatEther(internalTx.value) : "0"
          } ETH`
        );
        withdrawalFound = true;
      }

      // Check for reimbursement (to paymaster)
      if (
        internalTx.to?.toLowerCase() ===
        "0xd856f532f7c032e6b30d76f19187f25a068d6d92"
      ) {
        console.log(
          `     🎯 REIMBURSEMENT FOUND: ${
            internalTx.value ? ethers.formatEther(internalTx.value) : "0"
          } ETH`
        );
        reimbursementFound = true;
      }
    });

    // 4. Summary
    console.log("\n📋 SUMMARY:");
    console.log(
      `   Transaction Status: ${
        receipt.status === "0x1" ? "✅ SUCCESS" : "❌ FAILED"
      }`
    );
    console.log(`   Withdrawal Found: ${withdrawalFound ? "✅ YES" : "❌ NO"}`);
    console.log(
      `   Reimbursement Found: ${reimbursementFound ? "✅ YES" : "❌ NO"}`
    );
    console.log(
      `   Total Gas Used: ${
        receipt.gasUsed ? parseInt(receipt.gasUsed, 16) : "N/A"
      }`
    );
    console.log(`   Total Internal TXs: ${internalTxs.length}`);

    // 5. Check if any internal transactions failed
    const failedInternalTxs = internalTxs.filter((tx) => tx.isError === "1");
    if (failedInternalTxs.length > 0) {
      console.log(
        `\n⚠️  ${failedInternalTxs.length} internal transactions failed:`
      );
      failedInternalTxs.forEach((tx, index) => {
        console.log(
          `   Failed TX ${index + 1}: ${tx.from} → ${
            tx.to
          } (${ethers.formatEther(tx.value || "0")} ETH)`
        );
      });
    }
  } catch (error) {
    console.error("❌ Error analyzing transaction:", error.message);
  }
}

// Get transaction hash and chain from command line arguments
const txHash = process.argv[2];
const chain = process.argv[3] || "sepolia";

if (!txHash) {
  console.error("❌ Please provide a transaction hash");
  console.error("Usage: node scripts/analyze-transaction.js <txHash> [chain]");
  console.error(
    "Available chains: sepolia, ethereum, base-sepolia, base, soneium, soneium-minato, bsc, bsc-testnet"
  );
  process.exit(1);
}

analyzeTransaction(txHash, chain);
