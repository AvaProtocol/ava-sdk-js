const { ethers } = require("ethers");
require("dotenv").config();

/**
 * Comprehensive script to decode calldata of failed internal transactions using RPC tracing
 * Usage: node scripts/decode-transaction-calldata.js <txHash> [chain]
 * Chain options: sepolia, ethereum, base-sepolia, base, soneium, soneium-minato, bsc, bsc-testnet
 */
const { getChains } = require("../config/chains");
const CHAINS = getChains();

async function decodeTransactionCalldata(txHash, chain = "sepolia") {
  const chainConfig = CHAINS[chain];
  if (!chainConfig) {
    console.error(
      `❌ Invalid chain: ${chain}. Available chains: ${Object.keys(CHAINS).join(
        ", "
      )}`
    );
    process.exit(1);
  }
  const rpcUrl = chainConfig.chainEndpoint ? `https://${chainConfig.chainEndpoint}` : undefined;
  if (!rpcUrl) {
    console.error(`❌ RPC URL not configured for chain: ${chain}`);
    process.exit(1);
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);

  console.log(`🔍 Analyzing transaction: ${txHash}`);
  console.log(`📡 Using RPC endpoint for chain: ${chain}`);
  console.log(`📡 RPC URL: ${rpcUrl}\n`);

  try {
    // 1. Get transaction details
    console.log("1️⃣ Fetching transaction details...");
    const tx = await provider.getTransaction(txHash);

    if (!tx) {
      console.error("❌ Transaction not found");
      return;
    }

    console.log(`   Block Number: ${tx.blockNumber}`);
    console.log(`   From: ${tx.from}`);
    console.log(`   To: ${tx.to}`);
    console.log(`   Value: ${ethers.formatEther(tx.value)} ETH`);
    console.log(`   Input Data Length: ${tx.data.length} bytes`);

    // 2. Get transaction receipt
    console.log("\n2️⃣ Fetching transaction receipt...");
    const receipt = await provider.getTransactionReceipt(txHash);

    if (!receipt) {
      console.error("❌ Receipt not found");
      return;
    }

    console.log(
      `   Status: ${receipt.status === 1 ? "✅ SUCCESS" : "❌ FAILED"}`
    );
    console.log(`   Gas Used: ${receipt.gasUsed.toString()}`);
    console.log(`   Logs Count: ${receipt.logs.length}`);

    // 3. Get detailed trace using debug_traceTransaction
    console.log("\n3️⃣ Fetching detailed transaction trace...");
    const trace = await provider.send("debug_traceTransaction", [
      txHash,
      {
        tracer: "callTracer",
        tracerConfig: {
          withLog: true,
        },
      },
    ]);

    console.log(`   ✅ Trace fetched successfully\n`);

    // 4. Analyze the trace to find executeBatchWithValues calls
    console.log("4️⃣ Analyzing internal calls...\n");

    let callCounter = 0;
    const recipient = "0x804e49e8C4eDb560AE7c48B554f6d2e27Bb81557";
    const paymaster = "0xd856f532F7C032e6b30d76F19187F25A068D6d92";

    function analyzeCall(call, depth = 0) {
      callCounter++;
      const indent = "  ".repeat(depth);

      console.log(`${indent}📞 Call #${callCounter}:`);
      console.log(`${indent}   From: ${call.from}`);
      console.log(`${indent}   To: ${call.to}`);
      console.log(`${indent}   Type: ${call.type || "CALL"}`);
      console.log(
        `${indent}   Value: ${
          call.value ? ethers.formatEther(call.value) : "0"
        } ETH`
      );
      console.log(`${indent}   Gas: ${call.gas}`);
      console.log(`${indent}   Gas Used: ${call.gasUsed}`);

      if (call.error) {
        console.log(`${indent}   ❌ ERROR: ${call.error}`);
      }

      // Check if this is executeBatchWithValues
      if (call.input && call.input.startsWith("0xc3ff72fc")) {
        console.log(`${indent}   🎯 executeBatchWithValues DETECTED!`);
        console.log(`${indent}   Input Data: ${call.input.slice(0, 100)}...`);

        // Decode the parameters
        decodeExecuteBatchWithValuesFromTrace(call.input, indent);

        if (call.error) {
          console.log(
            `${indent}   ❌ CRITICAL: executeBatchWithValues FAILED with error: ${call.error}`
          );
          console.log(`${indent}   This is why the withdrawal didn't work!`);
        }
      }

      // Check if this is a transfer to recipient
      if (
        call.to &&
        call.to.toLowerCase() === recipient.toLowerCase() &&
        call.value &&
        call.value !== "0x0"
      ) {
        console.log(
          `${indent}   🎯 WITHDRAWAL TRANSFER: ${ethers.formatEther(
            call.value
          )} ETH to recipient`
        );
        if (call.error) {
          console.log(`${indent}   ❌ WITHDRAWAL FAILED: ${call.error}`);
        }
      }

      // Check if this is a transfer to paymaster
      if (
        call.to &&
        call.to.toLowerCase() === paymaster.toLowerCase() &&
        call.value &&
        call.value !== "0x0"
      ) {
        console.log(
          `${indent}   🎯 REIMBURSEMENT TRANSFER: ${ethers.formatEther(
            call.value
          )} ETH to paymaster`
        );
        if (call.error) {
          console.log(`${indent}   ❌ REIMBURSEMENT FAILED: ${call.error}`);
        }
      }

      console.log("");

      // Recursively analyze sub-calls
      if (call.calls && call.calls.length > 0) {
        console.log(`${indent}   ⤷ ${call.calls.length} sub-call(s):\n`);
        for (const subCall of call.calls) {
          analyzeCall(subCall, depth + 1);
        }
      }
    }

    analyzeCall(trace);

    // 5. Summary
    console.log("\n📋 SUMMARY:");
    console.log(
      `   Transaction Status: ${
        receipt.status === 1 ? "✅ SUCCESS" : "❌ FAILED"
      }`
    );
    console.log(`   Total Calls Analyzed: ${callCounter}`);
    console.log(`   Gas Used: ${receipt.gasUsed.toString()}`);
  } catch (error) {
    console.error("❌ Error analyzing transaction:", error.message);
  }
}

function decodeExecuteBatchWithValuesFromTrace(calldata, indent = "") {
  try {
    console.log(
      `${indent}   🔍 Decoding executeBatchWithValues parameters...\n`
    );

    // Remove 0x prefix and function selector
    const data = calldata.slice(10);

    // The structure is: offset1, offset2, offset3, then the arrays
    const offset1Raw = parseInt(data.slice(0, 64), 16);
    const offset2Raw = parseInt(data.slice(64, 128), 16);
    const offset3Raw = parseInt(data.slice(128, 192), 16);

    console.log(
      `${indent}     📍 Offsets (in bytes from start of parameters):`
    );
    console.log(`${indent}        Offset to dest[]: ${offset1Raw}`);
    console.log(`${indent}        Offset to values[]: ${offset2Raw}`);
    console.log(`${indent}        Offset to func[]: ${offset3Raw}`);

    // Convert byte offsets to character offsets in hex string (2 chars per byte)
    const offset1 = offset1Raw * 2;
    const offset2 = offset2Raw * 2;
    const offset3 = offset3Raw * 2;

    // Decode dest array
    const destData = data.slice(offset1);
    const destLength = parseInt(destData.slice(0, 64), 16);
    console.log(`${indent}\n     📍 Dest array (addresses):`);
    console.log(`${indent}        Length: ${destLength}`);

    const destAddresses = [];
    for (let i = 0; i < destLength; i++) {
      const addr =
        "0x" + destData.slice(64 + i * 64, 64 + i * 64 + 64).slice(-40);
      destAddresses.push(addr);
      console.log(`${indent}        Dest[${i}]: ${addr}`);
    }

    // Decode values array
    const valuesData = data.slice(offset2);
    const valuesLength = parseInt(valuesData.slice(0, 64), 16);
    console.log(`${indent}\n     📍 Values array (ETH amounts):`);
    console.log(`${indent}        Length: ${valuesLength}`);

    const values = [];
    for (let i = 0; i < valuesLength; i++) {
      const value = "0x" + valuesData.slice(64 + i * 64, 64 + i * 64 + 64);
      const valueBigInt = BigInt(value);
      values.push(valueBigInt);
      console.log(
        `${indent}        Values[${i}]: ${valueBigInt.toString()} wei (${ethers.formatEther(
          valueBigInt
        )} ETH)`
      );
    }

    // Decode func array
    const funcData = data.slice(offset3);
    const funcLength = parseInt(funcData.slice(0, 64), 16);
    console.log(
      `${indent}\n     📍 Func array (calldata for each sub-operation):`
    );
    console.log(`${indent}        Length: ${funcLength}`);

    // First, read all the offsets
    const funcOffsets = [];
    for (let i = 0; i < funcLength; i++) {
      const offsetHex = funcData.slice(64 + i * 64, 64 + i * 64 + 64);
      const offset = parseInt(offsetHex, 16);
      funcOffsets.push(offset);
      console.log(`${indent}        Func[${i}] offset: ${offset} bytes`);
    }

    // Now decode each func element
    console.log(`${indent}\n     📍 Func array contents:`);
    for (let i = 0; i < funcLength; i++) {
      const funcOffset = funcOffsets[i] * 2; // Convert to hex string offset
      const funcLengthHex = funcData.slice(funcOffset, funcOffset + 64);
      const funcDataLength = parseInt(funcLengthHex, 16);

      console.log(`${indent}        Func[${i}]:`);
      console.log(`${indent}          Length: ${funcDataLength} bytes`);

      if (funcDataLength > 0) {
        const funcCalldata =
          "0x" +
          funcData.slice(funcOffset + 64, funcOffset + 64 + funcDataLength * 2);
        console.log(`${indent}          Data: ${funcCalldata}`);
        console.log(`${indent}          ⚠️  Non-empty calldata detected!`);
      } else {
        console.log(
          `${indent}          Data: 0x (empty - simple ETH transfer)`
        );
        console.log(
          `${indent}          ✅ Empty calldata = simple ETH transfer`
        );
      }
    }

    // Summary and validation
    console.log(`${indent}\n     🔍 VALIDATION:`);
    console.log(
      `${indent}        Expected: 2 operations (withdrawal + reimbursement)`
    );
    console.log(`${indent}        Actual dest[] length: ${destLength}`);
    console.log(`${indent}        Actual values[] length: ${valuesLength}`);
    console.log(`${indent}        Actual func[] length: ${funcLength}`);

    if (destLength !== valuesLength || destLength !== funcLength) {
      console.log(
        `${indent}        ❌ CRITICAL ERROR: Array lengths don't match!`
      );
      console.log(
        `${indent}        This will cause the executeBatchWithValues to revert!`
      );
    } else {
      console.log(`${indent}        ✅ Array lengths match`);
    }

    // Check if the arrays are in the expected order
    if (destLength >= 2) {
      const recipient = "0x804e49e8C4eDb560AE7c48B554f6d2e27Bb81557";
      const paymaster = "0xd856f532F7C032e6b30d76F19187F25A068D6d92";

      console.log(`${indent}\n     🎯 Identifying operations:`);
      if (destAddresses[0].toLowerCase() === recipient.toLowerCase()) {
        console.log(
          `${indent}        Operation 0: ✅ Withdrawal to ${
            destAddresses[0]
          } (${ethers.formatEther(values[0])} ETH)`
        );
      } else {
        console.log(
          `${indent}        Operation 0: ❌ NOT withdrawal - sent to ${
            destAddresses[0]
          } (${ethers.formatEther(values[0])} ETH)`
        );
      }

      if (destAddresses[1].toLowerCase() === paymaster.toLowerCase()) {
        console.log(
          `${indent}        Operation 1: ✅ Reimbursement to ${
            destAddresses[1]
          } (${ethers.formatEther(values[1])} ETH)`
        );
      } else {
        console.log(
          `${indent}        Operation 1: ❌ NOT reimbursement - sent to ${
            destAddresses[1]
          } (${ethers.formatEther(values[1])} ETH)`
        );
      }
    }
  } catch (error) {
    console.error(
      `${indent}   ❌ Error decoding executeBatchWithValues:`,
      error.message
    );
    console.error(`${indent}   Stack:`, error.stack);
  }
}

// Get transaction hash and chain from command line arguments
const txHash = process.argv[2];
const chain = process.argv[3] || "sepolia";

if (!txHash) {
  console.error("❌ Please provide a transaction hash");
  console.error(
    "Usage: node scripts/decode-transaction-calldata.js <txHash> [chain]"
  );
  console.error(
    "Available chains: sepolia, ethereum, base-sepolia, base, soneium, soneium-minato, bsc, bsc-testnet"
  );
  process.exit(1);
}

decodeTransactionCalldata(txHash, chain);
