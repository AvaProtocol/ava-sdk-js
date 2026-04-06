#!/usr/bin/env tsx

/**
 * Fee Estimation Example
 *
 * Demonstrates how to use the fee estimation API to get per-execution
 * cost breakdowns before deploying workflows.
 *
 * Response components (all per-execution):
 *   executionFee  — flat platform fee (USD)
 *   cogs[]        — per-node operational costs: gas, external API (WEI)
 *   valueFee      — workflow-level value-capture fee (PERCENTAGE)
 */

import { Client } from '../packages/sdk-js/src/index';
import type {
  TriggerType,
  EstimateFeesRequest,
  EstimateFeesResponse,
  Fee,
  TriggerProps,
  NodeProps,
} from '@avaprotocol/types';

// Example configuration
const AGGREGATOR_ENDPOINT = process.env.AGGREGATOR_ENDPOINT || 'http://localhost:2206';
const TEST_API_KEY = process.env.TEST_API_KEY || '';
const SMART_WALLET_ADDRESS = process.env.SMART_WALLET_ADDRESS || '0x742d35Cc6634C0532925a3b8D965337c7FF18723';

async function demonstrateFeeEstimation() {
  const client = new Client({
    endpoint: AGGREGATOR_ENDPOINT,
  });

  if (TEST_API_KEY) {
    client.setAuthKey(TEST_API_KEY);
  }

  console.log('Fee Estimation Example');
  console.log('========================\n');

  try {
    // Example 1: Simple fixed-time trigger with REST API call
    console.log('Example 1: Simple workflow with fixed-time trigger');
    console.log('-----------------------------------------------------');

    const simpleTrigger: TriggerProps = {
      type: TriggerType.FixedTime,
      config: {
        datetime: Math.floor(Date.now() / 1000) + 3600,
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
        settings: {
          name: 'Simple REST API Workflow',
          runner: SMART_WALLET_ADDRESS,
        },
      },
      createdAt: Date.now(),
      expireAt: Date.now() + (24 * 60 * 60 * 1000),
    };

    const simpleEstimation = await client.estimateFees(simpleRequest);
    printFeeEstimation('Simple Workflow', simpleEstimation);

    console.log('\n');

    // Example 2: Complex workflow with event trigger and contract interaction
    console.log('Example 2: Complex workflow with event trigger and contract write');
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
              '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
              '',
              '0x000000000000000000000000' + SMART_WALLET_ADDRESS.slice(2),
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
            '1000000000000000000',
          ],
        },
      },
      {
        id: 'eth-transfer-node',
        type: 'ethTransfer',
        config: {
          to: '0x1234567890123456789012345678901234567890',
          amount: '100000000000000000',
        },
      },
    ];

    const complexRequest: EstimateFeesRequest = {
      trigger: complexTrigger,
      nodes: complexNodes,
      runner: SMART_WALLET_ADDRESS,
      inputVariables: {
        settings: {
          name: 'Complex Contract Write Workflow',
          runner: SMART_WALLET_ADDRESS,
        },
      },
      createdAt: Date.now(),
      expireAt: Date.now() + (7 * 24 * 60 * 60 * 1000),
    };

    const complexEstimation = await client.estimateFees(complexRequest);
    printFeeEstimation('Complex Workflow', complexEstimation);

    console.log('\n');

    // Example 3: Long-running cron workflow
    console.log('Example 3: Long-running cron workflow');
    console.log('----------------------------------------');

    const cronTrigger: TriggerProps = {
      type: TriggerType.Cron,
      config: {
        cron: '0 */6 * * *',
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
          amount: '50000000000000000',
        },
      },
    ];

    const cronRequest: EstimateFeesRequest = {
      trigger: cronTrigger,
      nodes: cronNodes,
      runner: SMART_WALLET_ADDRESS,
      inputVariables: {
        settings: {
          name: 'Cron ETH Transfer Workflow',
          runner: SMART_WALLET_ADDRESS,
        },
      },
      createdAt: Date.now(),
      expireAt: Date.now() + (30 * 24 * 60 * 60 * 1000),
    };

    const cronEstimation = await client.estimateFees(cronRequest);
    printFeeEstimation('Cron Workflow (30 days)', cronEstimation);

  } catch (error: any) {
    console.error('Error during fee estimation:', error.message);
    if (error.details) {
      console.error('Details:', error.details);
    }
  }
}

function formatFee(fee: Fee): string {
  return `${fee.amount} ${fee.unit}`;
}

function printFeeEstimation(title: string, estimation: EstimateFeesResponse) {
  console.log(`${title} Fee Estimation:`);

  if (!estimation.success) {
    console.log(`  Error: ${estimation.error}`);
    if (estimation.errorCode) {
      console.log(`  Code: ${estimation.errorCode}`);
    }
    return;
  }

  console.log('  Estimation successful');

  if (estimation.chainId) {
    console.log(`  Chain ID: ${estimation.chainId}`);
  }

  if (estimation.nativeToken) {
    console.log(`  Native Token: ${estimation.nativeToken.symbol} (${estimation.nativeToken.decimals} decimals)`);
  }

  // Execution fee (flat platform fee)
  if (estimation.executionFee) {
    console.log(`  Execution Fee: ${formatFee(estimation.executionFee)}`);
  }

  // COGS (per-node operational costs)
  if (estimation.cogs.length > 0) {
    console.log('  Node COGS:');
    estimation.cogs.forEach((cogs, i) => {
      console.log(`    ${i + 1}. ${cogs.nodeId} [${cogs.costType}]: ${formatFee(cogs.fee)}`);
      if (cogs.gasUnits) {
        console.log(`       Gas Units: ${cogs.gasUnits}`);
      }
    });
  }

  // Value fee (workflow-level value-capture)
  if (estimation.valueFee) {
    console.log('  Value Fee:');
    console.log(`    Fee: ${formatFee(estimation.valueFee.fee)}`);
    console.log(`    Tier: ${estimation.valueFee.tier}`);
    console.log(`    Classification: ${estimation.valueFee.classificationMethod} (confidence: ${estimation.valueFee.confidence})`);
    console.log(`    Reason: ${estimation.valueFee.reason}`);
    if (estimation.valueFee.valueBase) {
      console.log(`    Value Base: ${estimation.valueFee.valueBase}`);
    }
  }

  // Discounts
  if (estimation.discounts.length > 0) {
    console.log('  Discounts:');
    estimation.discounts.forEach((discount, i) => {
      console.log(`    ${i + 1}. ${discount.discountName} (${discount.discountType}): ${formatFee(discount.discount)}`);
      if (discount.expiryDate) {
        console.log(`       Expires: ${discount.expiryDate}`);
      }
    });
  }

  // Warnings
  if (estimation.warnings.length > 0) {
    console.log('  Warnings:');
    estimation.warnings.forEach((warning, i) => {
      console.log(`    ${i + 1}. ${warning}`);
    });
  }

  if (estimation.pricingModel) {
    console.log(`  Pricing Model: ${estimation.pricingModel}`);
  }
}

// Run the example
if (require.main === module) {
  demonstrateFeeEstimation().catch(console.error);
}

export { demonstrateFeeEstimation };
