#!/usr/bin/env tsx

/**
 * Fee Estimation Example
 * 
 * This example demonstrates how to use the new fee estimation functionality
 * to get comprehensive cost breakdowns before deploying workflows.
 */

import { Client, TriggerType } from '../packages/sdk-js/src/index';
import type { 
  EstimateFeesRequest,
  EstimateFeesResponse,
  TriggerProps,
  NodeProps 
} from '../packages/sdk-js/src/index';

// Example configuration
const AGGREGATOR_ENDPOINT = process.env.AGGREGATOR_ENDPOINT || 'http://localhost:2206';
const TEST_API_KEY = process.env.TEST_API_KEY || '';
const SMART_WALLET_ADDRESS = process.env.SMART_WALLET_ADDRESS || '0x742d35Cc6634C0532925a3b8D965337c7FF18723';

async function demonstrateFeeEstimation() {
  // Initialize the client
  const client = new Client({
    endpoint: AGGREGATOR_ENDPOINT,
  });

  // Set auth key if available
  if (TEST_API_KEY) {
    client.setAuthKey(TEST_API_KEY);
  }

  console.log('🔍 Fee Estimation Example');
  console.log('========================\n');

  try {
    // Example 1: Simple fixed-time trigger with REST API call
    console.log('📊 Example 1: Simple workflow with fixed-time trigger');
    console.log('-----------------------------------------------------');
    
    const simpleTrigger: TriggerProps = {
      type: TriggerType.FixedTime,
      config: {
        datetime: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
      },
    };

    const simpleNodes: NodeProps[] = [
      {
        id: 'rest-api-node',
        type: 'restApi',
        config: {
          url: 'https://jsonplaceholder.typicode.com/posts/1',
          method: 'GET',
        },
      },
    ];

    const simpleRequest: EstimateFeesRequest = {
      trigger: simpleTrigger,
      nodes: simpleNodes,
      runner: SMART_WALLET_ADDRESS,
      inputVariables: {
        workflowContext: {
          runner: SMART_WALLET_ADDRESS,
          chainId: 1, // Ethereum mainnet
        },
      },
      createdAt: Date.now(),
      expireAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours from now
    };

    const simpleEstimation = await client.estimateFees(simpleRequest);
    printFeeEstimation('Simple Workflow', simpleEstimation);

    console.log('\n');

    // Example 2: Complex workflow with event trigger and contract interaction
    console.log('📊 Example 2: Complex workflow with event trigger and contract write');
    console.log('---------------------------------------------------------------------');

    const complexTrigger: TriggerProps = {
      type: TriggerType.Event,
      config: {
        contractAddress: '0xA0b86a33E6417c6Af3e90C0da9E2B2a5e9AB9e40',
        eventSignature: 'Transfer(address,address,uint256)',
        queries: [
          {
            type: 'topic',
            values: [
              '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // Transfer signature
              '', // from (any)
              '0x000000000000000000000000' + SMART_WALLET_ADDRESS.slice(2), // to (our wallet)
            ],
          },
        ],
      },
    };

    const complexNodes: NodeProps[] = [
      {
        id: 'contract-write-node',
        type: 'contractWrite',
        config: {
          contractAddress: '0xA0b86a33E6417c6Af3e90C0da9E2B2a5e9AB9e40',
          abi: [
            {
              name: 'approve',
              type: 'function',
              inputs: [
                { name: 'spender', type: 'address' },
                { name: 'amount', type: 'uint256' },
              ],
              outputs: [{ name: '', type: 'bool' }],
            },
          ],
          functionName: 'approve',
          args: [
            '0x1234567890123456789012345678901234567890',
            '1000000000000000000', // 1 token
          ],
        },
      },
      {
        id: 'eth-transfer-node',
        type: 'ethTransfer',
        config: {
          to: '0x1234567890123456789012345678901234567890',
          amount: '100000000000000000', // 0.1 ETH
        },
      },
    ];

    const complexRequest: EstimateFeesRequest = {
      trigger: complexTrigger,
      nodes: complexNodes,
      runner: SMART_WALLET_ADDRESS,
      inputVariables: {
        workflowContext: {
          runner: SMART_WALLET_ADDRESS,
          chainId: 8453, // Base mainnet
        },
      },
      createdAt: Date.now(),
      expireAt: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days from now
    };

    const complexEstimation = await client.estimateFees(complexRequest);
    printFeeEstimation('Complex Workflow', complexEstimation);

    console.log('\n');

    // Example 3: Long-running cron workflow
    console.log('📊 Example 3: Long-running cron workflow');
    console.log('----------------------------------------');

    const cronTrigger: TriggerProps = {
      type: TriggerType.Cron,
      config: {
        cron: '0 */6 * * *', // Every 6 hours
      },
    };

    const cronNodes: NodeProps[] = [
      {
        id: 'price-check-node',
        type: 'restApi',
        config: {
          url: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
          method: 'GET',
        },
      },
      {
        id: 'conditional-transfer',
        type: 'ethTransfer',
        config: {
          to: '0x1234567890123456789012345678901234567890',
          amount: '50000000000000000', // 0.05 ETH
        },
      },
    ];

    const cronRequest: EstimateFeesRequest = {
      trigger: cronTrigger,
      nodes: cronNodes,
      runner: SMART_WALLET_ADDRESS,
      inputVariables: {
        workflowContext: {
          runner: SMART_WALLET_ADDRESS,
          chainId: 1, // Ethereum mainnet
        },
      },
      createdAt: Date.now(),
      expireAt: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days from now
    };

    const cronEstimation = await client.estimateFees(cronRequest);
    printFeeEstimation('Cron Workflow (30 days)', cronEstimation);

  } catch (error: any) {
    console.error('❌ Error during fee estimation:', error.message);
    if (error.details) {
      console.error('Details:', error.details);
    }
  }
}

/**
 * Print fee estimation results in a readable format
 */
function printFeeEstimation(title: string, estimation: EstimateFeesResponse) {
  console.log(`💰 ${title} Fee Estimation:`);
  
  if (!estimation.success) {
    console.log(`❌ Error: ${estimation.error}`);
    if (estimation.errorCode) {
      console.log(`   Code: ${estimation.errorCode}`);
    }
    return;
  }

  console.log('✅ Estimation successful');
  
  if (estimation.chainId) {
    console.log(`🔗 Chain ID: ${estimation.chainId}`);
  }
  
  // Gas fees
  if (estimation.gasFees) {
    console.log('⛽ Gas Fees:');
    console.log(`   Total: ${formatFeeAmount(estimation.gasFees.totalGasCost)}`);
    console.log(`   Method: ${estimation.gasFees.estimationMethod}`);
    console.log(`   Accurate: ${estimation.gasFees.estimationAccurate ? '✅' : '⚠️'}`);
    console.log(`   Avg Gas Price: ${estimation.gasFees.averageGasPrice} gwei`);
    
    if (estimation.gasFees.nodeGasFees.length > 0) {
      console.log('   Operations:');
      estimation.gasFees.nodeGasFees.forEach((op, i) => {
        console.log(`   ${i + 1}. ${op.operationType} (${op.nodeId}): ${formatFeeAmount(op.totalCost)}`);
        if (op.methodName) {
          console.log(`      Method: ${op.methodName}`);
        }
        console.log(`      Gas Units: ${op.gasUnits}`);
      });
    }
  }

  // Automation fees
  if (estimation.automationFees) {
    console.log('🤖 Automation Fees:');
    console.log(`   Trigger Type: ${estimation.automationFees.triggerType}`);
    console.log(`   Duration: ${estimation.automationFees.durationMinutes} minutes`);
    console.log(`   Base Fee: ${formatFeeAmount(estimation.automationFees.baseFee)}`);
    console.log(`   Execution Fee: ${formatFeeAmount(estimation.automationFees.executionFee)}`);
    console.log(`   Est. Executions: ${estimation.automationFees.estimatedExecutions}`);
    console.log(`   Total: ${formatFeeAmount(estimation.automationFees.totalFee)}`);
  }

  // Smart wallet creation
  if (estimation.creationFees) {
    console.log('🏦 Smart Wallet:');
    console.log(`   Creation Required: ${estimation.creationFees.creationRequired ? '✅' : '❌'}`);
    console.log(`   Wallet Address: ${estimation.creationFees.walletAddress}`);
    if (estimation.creationFees.creationRequired && estimation.creationFees.creationFee) {
      console.log(`   Creation Fee: ${formatFeeAmount(estimation.creationFees.creationFee)}`);
      if (estimation.creationFees.initialFunding) {
        console.log(`   Recommended Funding: ${formatFeeAmount(estimation.creationFees.initialFunding)}`);
      }
    }
  }

  // Discounts
  if (estimation.discounts && estimation.discounts.length > 0) {
    console.log('🎫 Discounts Applied:');
    estimation.discounts.forEach((discount, i) => {
      console.log(`   ${i + 1}. ${discount.discountName} (${discount.discountPercentage}% off)`);
      console.log(`      Applies to: ${discount.appliesTo}`);
      console.log(`      Discount: ${formatFeeAmount(discount.discountAmount)}`);
      if (discount.expiryDate) {
        console.log(`      Expires: ${discount.expiryDate}`);
      }
    });
  }

  // Totals
  console.log('💳 Total Costs:');
  if (estimation.totalFees) {
    console.log(`   Before Discounts: ${formatFeeAmount(estimation.totalFees)}`);
  }
  if (estimation.totalDiscounts) {
    console.log(`   Total Discounts: ${formatFeeAmount(estimation.totalDiscounts)}`);
  }
  if (estimation.finalTotal) {
    console.log(`   🎯 Final Total: ${formatFeeAmount(estimation.finalTotal)}`);
  }

  // Warnings and recommendations
  if (estimation.warnings && estimation.warnings.length > 0) {
    console.log('⚠️  Warnings:');
    estimation.warnings.forEach((warning, i) => {
      console.log(`   ${i + 1}. ${warning}`);
    });
  }

  if (estimation.recommendations && estimation.recommendations.length > 0) {
    console.log('💡 Recommendations:');
    estimation.recommendations.forEach((rec, i) => {
      console.log(`   ${i + 1}. ${rec}`);
    });
  }

  // Metadata
  if (estimation.priceDataSource) {
    console.log(`📊 Price Data: ${estimation.priceDataSource}${estimation.priceDataAgeSeconds ? ` (${estimation.priceDataAgeSeconds}s ago)` : ''}`);
  }
}

/**
 * Format fee amount for display
 */
function formatFeeAmount(feeAmount: any): string {
  return `${feeAmount.nativeTokenSymbol} ${formatWeiAmount(feeAmount.nativeTokenAmount)} ($${feeAmount.usdAmount})`;
}

/**
 * Format wei amount to human-readable format
 */
function formatWeiAmount(weiString: string): string {
  const wei = BigInt(weiString);
  const eth = Number(wei) / 1e18;
  
  if (eth < 0.0001) {
    return wei.toString() + ' wei';
  } else if (eth < 1) {
    return eth.toFixed(6);
  } else {
    return eth.toFixed(4);
  }
}

// Run the example
if (require.main === module) {
  demonstrateFeeEstimation().catch(console.error);
}

export { demonstrateFeeEstimation };