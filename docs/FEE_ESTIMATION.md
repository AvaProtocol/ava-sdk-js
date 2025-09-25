# Fee Estimation

The Ava Protocol SDK now includes comprehensive fee estimation functionality that allows you to get accurate cost breakdowns before deploying workflows. This helps you understand the total cost of automation including gas fees, monitoring fees, and smart wallet creation costs.

## Overview

The fee estimation feature provides:
- **Gas Fee Estimation**: Accurate gas costs for blockchain operations using RPC-first estimation
- **Automation Fees**: Monitoring and execution costs based on trigger type and duration
- **Smart Wallet Fees**: Creation costs if a new smart wallet is needed
- **Discount Application**: Beta program, new user, and volume discounts
- **USD Conversion**: Real-time price data from Moralis Web3 Data API
- **Detailed Breakdown**: Per-operation costs with recommendations

## Supported Chains

Currently supports:
- **Ethereum Mainnet** (Chain ID: 1)
- **Ethereum Sepolia** (Chain ID: 11155111) 
- **Base Mainnet** (Chain ID: 8453)
- **Base Sepolia** (Chain ID: 84532)

## Basic Usage

```typescript
import { Client } from '@avaprotocol/sdk-js';
import type { EstimateFeesRequest } from '@avaprotocol/sdk-js';

const client = new Client({
  endpoint: 'http://localhost:2206', // Your aggregator endpoint
});

// Set authentication
client.setAuthKey('your-api-key');

// Define your workflow
const request: EstimateFeesRequest = {
  trigger: {
    type: 'fixedTime',
    config: {
      datetime: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    },
  },
  nodes: [
    {
      id: 'transfer-node',
      type: 'ethTransfer',
      config: {
        to: '0x742d35Cc6634C0532925a3b8D965337c7FF18723',
        amount: '100000000000000000', // 0.1 ETH
      },
    },
  ],
  runner: '0xYourSmartWalletAddress',
  inputVariables: {
    workflowContext: {
      runner: '0xYourSmartWalletAddress',
      chainId: 8453, // Base mainnet
    },
  },
  createdAt: Date.now(),
  expireAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
};

// Get comprehensive fee estimation
const estimation = await client.estimateFees(request);

if (estimation.success) {
  console.log('Final Total:', estimation.finalTotal);
  console.log('Gas Costs:', estimation.gasFees?.totalGasCost);
  console.log('Automation Costs:', estimation.automationFees?.totalFee);
} else {
  console.error('Estimation failed:', estimation.error);
}
```

## Fee Types

### Gas Fees (`gasFees`)

Covers blockchain transaction costs:
- **Per-operation breakdown**: Individual gas costs for each node
- **Total gas cost**: Sum of all blockchain operations
- **Estimation accuracy**: Whether RPC estimation was successful
- **Gas price**: Current network gas price in gwei

```typescript
interface GasFeeBreakdown {
  nodeGasFees: NodeGasFee[];           // Individual operation costs
  totalGasCost: FeeAmount;             // Total gas across all operations
  estimationAccurate: boolean;         // True if RPC estimation succeeded
  estimationMethod: string;            // "rpc_estimate", "tenderly_simulation", "fallback"
  averageGasPrice: string;             // Gas price in gwei
  notes?: string[];                    // Additional estimation notes
}
```

### Automation Fees (`automationFees`)

Based on trigger type and monitoring duration:
- **Fixed Time**: $0.01/day monitoring
- **Cron**: $0.02/day monitoring  
- **Block**: $0.02/day monitoring
- **Event**: $0.05/day base + scaling per address/topic
- **Manual**: No monitoring fees

```typescript
interface AutomationFee {
  triggerType: string;                 // Type of trigger
  durationMinutes: number;             // Monitoring duration
  baseFee: FeeAmount;                  // Base monitoring cost
  executionFee: FeeAmount;             // Per-execution cost estimate
  estimatedExecutions: number;         // Expected number of executions
  totalFee: FeeAmount;                 // Total automation cost
  breakdown: AutomationFeeComponent[]; // Detailed fee components
}
```

### Smart Wallet Creation Fees (`creationFees`)

If the runner wallet doesn't exist:
- **Creation detection**: Checks if wallet is deployed
- **Creation cost**: Gas cost to deploy the wallet
- **Initial funding**: Recommended funding amount

```typescript
interface SmartWalletCreationFee {
  creationRequired: boolean;           // Whether wallet needs to be created
  walletAddress: string;               // The wallet address
  creationFee?: FeeAmount;             // Cost to create wallet
  initialFunding?: FeeAmount;          // Recommended initial funding
}
```

### Discounts

Applied automatically based on user status:
- **Beta Program**: 100% off automation fees
- **New User**: 80% off automation fees  
- **Volume**: Discounts for high-usage users

## Fee Amount Format

All fees are provided in multiple formats:

```typescript
interface FeeAmount {
  nativeTokenAmount: string;  // Amount in wei (e.g., "100000000000000000")
  nativeTokenSymbol: string;  // Token symbol (e.g., "ETH")
  usdAmount: string;          // USD value (e.g., "250.000000")
  apTokenAmount: string;      // AP token amount (future feature, currently "0")
}
```

## Trigger-Specific Pricing

### Event Triggers

Event triggers have additional scaling costs:
- **Base**: $0.05/day monitoring
- **Per Address**: +$0.005/day per monitored address
- **Per Topic Group**: +$0.002/day per topic filter

Example: Monitoring USDC transfers to 5 addresses with 2 topic filters:
```
Base:     $0.05/day
Address:  $0.025/day (5 × $0.005)
Topics:   $0.004/day (2 × $0.002)
Total:    $0.079/day
```

### Cron Triggers

Based on execution frequency:
- **Monitoring**: $0.02/day
- **Per Execution**: $0.005 per run

Example: Running every 6 hours for 30 days:
```
Monitoring: $0.60 (30 × $0.02)
Executions: $2.40 (120 × $0.005)  
Total:      $3.00
```

## Error Handling

The estimation can fail for various reasons:

```typescript
if (!estimation.success) {
  console.error('Error:', estimation.error);
  
  switch (estimation.errorCode) {
    case 'SMART_WALLET_NOT_FOUND':
      console.log('Runner address is invalid');
      break;
    case 'SIMULATION_ERROR':
      console.log('Gas estimation failed - check your node configurations');
      break;
    case 'INVALID_REQUEST':
      console.log('Request validation failed');
      break;
  }
}
```

## Warnings and Recommendations

The estimation provides helpful guidance:

```typescript
// Check for warnings about accuracy
estimation.warnings?.forEach(warning => {
  console.warn('⚠️', warning);
});

// Get optimization recommendations
estimation.recommendations?.forEach(rec => {
  console.log('💡', rec);
});
```

Common warnings:
- "Gas estimation used fallback values due to RPC unavailability"
- "Conservative gas estimates used. Consider testing with smaller amounts first"

Common recommendations:
- "Consider shorter workflow durations to reduce monitoring costs"
- "High execution count detected. Consider optimizing trigger conditions"
- "Event triggers have higher monitoring costs. Consider manual triggers if suitable"

## Price Data

Fee estimates use real-time price data:
- **Primary**: Moralis Web3 Data API (5-minute cache)
- **Fallback**: Conservative hardcoded prices ($2,500 ETH)

```typescript
console.log('Price source:', estimation.priceDataSource); // "moralis" or "fallback"
console.log('Data age:', estimation.priceDataAgeSeconds, 'seconds');
```

## Complete Example

See `examples/fee-estimation-example.ts` for a comprehensive example showing:
- Simple fixed-time workflows
- Complex event-triggered workflows with contract interactions  
- Long-running cron workflows
- Detailed cost breakdowns and formatting

## Integration Tips

### Before Workflow Deployment
```typescript
// Get estimation first
const estimation = await client.estimateFees(workflowRequest);

if (estimation.success && estimation.finalTotal) {
  const costUSD = parseFloat(estimation.finalTotal.usdAmount);
  
  // Check if cost is acceptable
  if (costUSD > MAX_ACCEPTABLE_COST) {
    console.log('Cost too high:', costUSD);
    return;
  }
  
  // Proceed with deployment
  const workflowId = await client.submitWorkflow(workflow);
}
```

### Smart Wallet Funding
```typescript
// Check if wallet needs creation and funding
if (estimation.creationFees?.creationRequired && estimation.creationFees.initialFunding) {
  const fundingETH = estimation.creationFees.initialFunding.nativeTokenAmount;
  console.log(`Need to fund wallet with ${fundingETH} wei before deployment`);
}
```

### Cost Optimization
```typescript
// Compare different trigger types
const fixedTimeEstimation = await client.estimateFees({
  ...baseRequest,
  trigger: { type: 'fixedTime', config: { datetime: futureTime } },
});

const cronEstimation = await client.estimateFees({
  ...baseRequest,  
  trigger: { type: 'cron', config: { cron: '0 12 * * *' } },
});

// Choose the more cost-effective option
```

## Rate Limits

Fee estimation requests are authenticated and subject to rate limits. For high-volume applications, consider:
- Caching estimates for similar workflows
- Batching multiple estimations
- Using conservative fallback calculations

## Future Enhancements

Planned features:
- **AP Token Pricing**: Pay fees using AP tokens
- **Batch Estimation**: Multiple workflows in single request
- **Historical Cost Tracking**: Track actual vs estimated costs
- **More Chains**: Additional blockchain support as aggregator expands