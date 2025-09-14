# Withdraw Funds Functionality

This document describes the new `withdrawFunds` functionality that has been added to the Ava SDK.

## Overview

The `withdrawFunds` function allows users to withdraw ETH or ERC20 tokens from their smart wallets using UserOperation transactions. This function integrates with the AVS (Actively Validated Services) to execute the withdrawal through the smart wallet infrastructure.

## Function Signature

```typescript
async withdrawFunds(
  request: WithdrawFundsRequest, 
  options?: RequestOptions
): Promise<WithdrawFundsResponse>
```

## Types

### WithdrawFundsRequest

```typescript
interface WithdrawFundsRequest {
  recipientAddress: string;          // The recipient address to send funds to
  amount: string;                    // Amount in wei for ETH or smallest token unit for ERC20
  token: string;                     // "ETH" for native ETH, or contract address for ERC20 tokens
  smartWalletAddress?: string;       // Optional: Override the smart wallet to withdraw from
  salt?: string;                     // Optional: Salt for deriving smart wallet address
  factoryAddress?: string;           // Optional: Factory address for smart wallet derivation
}
```

### WithdrawFundsResponse

```typescript
interface WithdrawFundsResponse {
  success: boolean;                  // Whether the operation completed successfully
  status: string;                    // Status description: "pending", "submitted", "failed"
  message: string;                   // Human-readable message about what happened
  userOpHash?: string;               // UserOperation hash from bundler
  transactionHash?: string;          // Blockchain transaction hash (if available)
  submittedAt?: number;              // Unix timestamp when UserOp was submitted
  smartWalletAddress: string;        // Smart wallet address used for withdrawal
  recipientAddress: string;          // Recipient address
  amount: string;                    // Amount withdrawn
  token: string;                     // Token type (ETH or contract address)
}
```

## Usage Examples

### Basic ETH Withdrawal

```typescript
import { Client } from '@avaprotocol/sdk-js';

const client = new Client({ endpoint: 'your-avs-endpoint' });

// Authenticate first
const { message } = await client.getSignatureFormat(walletAddress);
const signature = await signMessage(message); // Use your signing method
const { authKey } = await client.authWithSignature({ message, signature });
client.setAuthKey(authKey);

// Withdraw ETH
const response = await client.withdrawFunds({
  recipientAddress: '0x1234567890123456789012345678901234567890',
  amount: '1000000000000000', // 0.001 ETH in wei
  token: 'ETH',
  salt: 'my-wallet-salt',
});

console.log('Withdrawal initiated:', response);
```

### ERC20 Token Withdrawal

```typescript
// Withdraw USDC (assuming 6 decimals)
const response = await client.withdrawFunds({
  recipientAddress: '0x1234567890123456789012345678901234567890',
  amount: '10000', // 0.01 USDC
  token: '0xA0b86a33E6b4e4d70cf3dA2A1F7f8e42B6d2E0aE', // USDC contract address
  smartWalletAddress: '0x9876543210987654321098765432109876543210', // Explicit wallet
});
```

### Using Specific Factory

```typescript
const response = await client.withdrawFunds({
  recipientAddress: '0x1234567890123456789012345678901234567890',
  amount: '500000000000000000', // 0.5 ETH
  token: 'ETH',
  salt: 'my-wallet-salt',
  factoryAddress: '0xFactoryAddress123456789012345678901234567890',
});
```

## Integration Tests

Comprehensive integration tests are available in `tests/core/withdraw.test.ts`. The tests cover:

### Test Categories

1. **Basic Tests**
   - ETH withdrawal with minimal parameters
   - Withdrawal with explicit smart wallet address
   - Withdrawal with factory address

2. **Token Tests**
   - USDC withdrawal (when configured)
   - Custom ERC20 token withdrawal

3. **Edge Cases**
   - Zero amount withdrawal
   - Large amount withdrawal
   - Different recipient addresses
   - Invalid input validation

4. **Authentication Tests**
   - Unauthenticated requests
   - Request-level authentication

5. **Integration Tests**
   - Custom factory usage
   - Multiple wallet withdrawals

6. **Response Validation**
   - Field presence and types
   - Content matching

## Running Tests

### Prerequisites

1. **AVS Running**: The AVS must be running for integration tests
2. **Environment Setup**: Proper `.env.test` configuration
3. **Test Credentials**: Valid private key and API key

### Quick Validation

```bash
# Validate function integration (no AVS required)
node validate-withdraw.js
```

### Full Test Suite

```bash
# Start AVS
docker compose up -d

# Run all withdraw tests
./run-withdraw-tests.sh

# Or run with yarn
yarn test --testPathPattern=withdraw.test.ts

# Run by test group
./run-withdraw-tests.sh --groups
```

### Individual Test Groups

```bash
# Basic functionality
yarn test --testPathPattern=withdraw.test.ts --testNamePattern="Basic Tests"

# Token handling  
yarn test --testPathPattern=withdraw.test.ts --testNamePattern="Token Tests"

# Edge cases
yarn test --testPathPattern=withdraw.test.ts --testNamePattern="Edge Cases"

# Authentication
yarn test --testPathPattern=withdraw.test.ts --testNamePattern="Authentication Tests"
```

## Error Handling

The function handles various error scenarios:

- **Invalid recipient address**: Throws validation error
- **Invalid token address**: Throws validation error  
- **Invalid amount format**: Throws validation error
- **Insufficient funds**: Returns success=false with descriptive message
- **Network issues**: Throws gRPC error with timeout context
- **Authentication errors**: Throws authentication error

## Response Status Values

- `"pending"` - Withdrawal initiated, awaiting processing
- `"submitted"` - UserOperation submitted to bundler
- `"failed"` - Withdrawal failed (check message for details)

## Best Practices

1. **Amount Format**: Always use string format for amounts to avoid precision issues
2. **Wei Values**: For ETH, use wei values (multiply by 10^18)
3. **Token Decimals**: For ERC20 tokens, multiply by 10^decimals
4. **Error Handling**: Always check the `success` field in responses
5. **Authentication**: Ensure valid auth key before calling
6. **Salt Usage**: Use unique salts for different wallets

## Troubleshooting

### Common Issues

1. **"Unauthenticated" Error**
   - Ensure `setAuthKey()` is called after authentication
   - Verify auth key is not expired

2. **"Invalid Address" Error**
   - Check address format (42 characters, 0x-prefixed)
   - Verify checksums if using mixed case

3. **"Insufficient Funds" Error**
   - Check wallet balance
   - Account for gas fees

4. **Timeout Errors**
   - Check network connectivity
   - Verify AVS is running and accessible

### Debug Information

Enable debug logging to troubleshoot issues:

```typescript
// The response includes helpful debugging information
const response = await client.withdrawFunds(request);
console.log('Debug info:', {
  success: response.success,
  status: response.status,
  message: response.message,
  userOpHash: response.userOpHash,
  submittedAt: response.submittedAt,
});
```

## Implementation Details

- Built on gRPC `WithdrawFunds` service method
- Follows existing SDK patterns and conventions
- Includes comprehensive TypeScript type definitions
- Supports both ETH and ERC20 token withdrawals
- Integrates with smart wallet factory system
- Uses UserOperation for transaction execution
- Includes proper error handling and timeout support

## Version Compatibility

- **Node.js**: >= 20.18.0
- **SDK Version**: >= 2.6.13
- **Types Version**: >= 2.4.11

This functionality is available in the latest version of the Ava SDK and is fully backward compatible.
