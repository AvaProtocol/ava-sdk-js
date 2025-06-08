# Timeout Configuration

The Ava Protocol SDK provides comprehensive timeout functionality with intelligent retry logic and predefined presets for common use cases.

## 🚀 Features

- **Configurable timeouts** per client and per request
- **Intelligent retry logic** for network errors (with option to disable)
- **NO_RETRY default strategy** for fail-fast behavior
- **Predefined presets** for common scenarios
- **Rich error context** with timeout information
- **Request cancellation** on timeout

## 📋 Default Configuration

By default, the SDK uses a **NO_RETRY strategy**:

```javascript
// Default timeout configuration
{
  timeout: 30000,    // 30 seconds
  retries: 0,        // No retries (fail-fast)
  retryDelay: 0      // No delay between retries
}
```

## 🎛️ Timeout Presets

The SDK includes four predefined timeout presets:

| Preset | Timeout | Retries | Retry Delay | Use Case |
|--------|---------|---------|-------------|----------|
| `NO_RETRY` | 30s | 0 | 0ms | **Default** - Fail-fast, latency-sensitive |
| `FAST` | 5s | 2 | 500ms | Quick operations |
| `NORMAL` | 30s | 3 | 1s | Standard operations |
| `SLOW` | 2min | 2 | 2s | Heavy operations |

## 📚 Usage Examples

### Basic Client Creation

```javascript
import { Client, TimeoutPresets } from '@avaprotocol/sdk-js';

// 1. Default configuration (NO_RETRY)
const client = new Client({
  endpoint: 'your-endpoint-url'
});

console.log(client.getTimeoutConfig());
// Output: { timeout: 30000, retries: 0, retryDelay: 0 }
```

### Custom Timeout Configuration

```javascript
// 2. Custom timeout on client creation
const customClient = new Client({
  endpoint: 'your-endpoint-url',
  timeout: {
    timeout: 10000,    // 10 seconds
    retries: 1,        // 1 retry attempt
    retryDelay: 1000   // 1 second between retries
  }
});

// 3. Using presets
const fastClient = new Client({
  endpoint: 'your-endpoint-url',
  timeout: TimeoutPresets.FAST  // 5s timeout, 2 retries, 500ms delay
});

const slowClient = new Client({
  endpoint: 'your-endpoint-url',
  timeout: TimeoutPresets.SLOW  // 2min timeout, 2 retries, 2s delay
});
```

### Dynamic Configuration Updates

```javascript
// Update timeout configuration after client creation
client.setTimeoutConfig({
  timeout: 15000,
  retries: 2
});

// Partial updates (other values remain unchanged)
client.setTimeoutConfig({ timeout: 60000 });

// Get current configuration
const config = client.getTimeoutConfig();
```

### Per-Request Timeout Overrides

```javascript
// Override timeout for specific requests using presets
const wallets = await client.getWallets({
  timeout: TimeoutPresets.FAST
});

// Custom timeout for specific request
const result = await client.runNodeWithInputs(
  {
    nodeType: 'customCode',
    nodeConfig: { source: 'return { value: 42 };' }
  },
  {
    timeout: {
      timeout: 60000,  // 1 minute
      retries: 0,      // No retries
      retryDelay: 0
    }
  }
);
```

## 🔄 Retry Logic

The SDK automatically retries requests for specific error conditions:

### Retryable Errors
- `UNAVAILABLE` - Service temporarily unavailable
- `DEADLINE_EXCEEDED` - Request timeout
- `RESOURCE_EXHAUSTED` - Rate limiting
- Network timeout errors

### Non-Retryable Errors
- `UNAUTHENTICATED` - Invalid credentials
- `PERMISSION_DENIED` - Access denied
- `INVALID_ARGUMENT` - Bad request parameters

## ❌ Error Handling

Timeout errors include additional context for debugging:

```javascript
try {
  await client.getWorkflows(['0x123'], {
    timeout: TimeoutPresets.FAST
  });
} catch (error) {
  if (error.isTimeout) {
    console.log(`Timeout after ${error.attemptsMade} attempts`);
    console.log(`Method: ${error.methodName}`);
    console.log(`Timeout duration: ${error.timeoutMs}ms`);
  } else {
    console.log('Other error:', error.message);
  }
}
```

## 🎯 Best Practices

### 1. Choose Appropriate Timeouts
```javascript
// Quick metadata requests
const metadata = await client.getTokenMetadata(address, {
  timeout: TimeoutPresets.FAST
});

// Heavy operations like workflow execution
const execution = await client.runNodeWithInputs(nodeConfig, {
  timeout: TimeoutPresets.SLOW
});

// Latency-sensitive operations
const status = await client.getExecutionStatus(workflowId, executionId, {
  timeout: TimeoutPresets.NO_RETRY
});
```

### 2. Client-Level vs Request-Level Configuration
```javascript
// Set conservative defaults at client level
const client = new Client({
  endpoint: 'your-endpoint-url',
  timeout: TimeoutPresets.NO_RETRY  // Fail-fast by default
});

// Override for specific operations that need retries
const workflows = await client.getWorkflows(addresses, {
  timeout: TimeoutPresets.NORMAL  // Allow retries for this call
});
```

### 3. Production vs Development
```javascript
// Development - more verbose errors and longer timeouts
const devClient = new Client({
  endpoint: 'dev-endpoint',
  timeout: TimeoutPresets.SLOW
});

// Production - fail-fast with minimal retries
const prodClient = new Client({
  endpoint: 'prod-endpoint', 
  timeout: TimeoutPresets.NO_RETRY
});
```

## 📊 Monitoring and Debugging

### Timeout Metrics
```javascript
// Track timeout patterns in your application
let timeoutCount = 0;
let successCount = 0;

try {
  await client.someOperation();
  successCount++;
} catch (error) {
  if (error.isTimeout) {
    timeoutCount++;
    console.log(`Timeout rate: ${timeoutCount / (timeoutCount + successCount) * 100}%`);
  }
}
```

### Configuration Inspection
```javascript
// Log current timeout configuration for debugging
console.log('Client timeout config:', client.getTimeoutConfig());

// Verify preset values
console.log('Available presets:', {
  FAST: TimeoutPresets.FAST,
  NORMAL: TimeoutPresets.NORMAL, 
  SLOW: TimeoutPresets.SLOW,
  NO_RETRY: TimeoutPresets.NO_RETRY
});
```

## 🔧 Advanced Configuration

### Custom Retry Strategies
```javascript
// Aggressive retry for critical operations
const criticalClient = new Client({
  endpoint: 'your-endpoint-url',
  timeout: {
    timeout: 5000,     // Short individual timeouts
    retries: 5,        // Many retry attempts
    retryDelay: 2000   // Longer delays between retries
  }
});

// Minimal retry for real-time operations  
const realtimeClient = new Client({
  endpoint: 'your-endpoint-url',
  timeout: {
    timeout: 1000,     // Very short timeout
    retries: 1,        // Single retry
    retryDelay: 100    // Minimal delay
  }
});
```

### Environment-Based Configuration
```javascript
const timeoutConfig = process.env.NODE_ENV === 'production' 
  ? TimeoutPresets.NO_RETRY     // Fail-fast in production
  : TimeoutPresets.NORMAL;      // More forgiving in development

const client = new Client({
  endpoint: process.env.AVS_ENDPOINT,
  timeout: timeoutConfig
});
```

## 📝 Migration Guide

If you're upgrading from a version without timeout configuration:

### Before (Old SDK)
```javascript
const client = new Client({ endpoint: 'your-endpoint-url' });
// No timeout control, requests could hang indefinitely
```

### After (Current SDK)
```javascript
const client = new Client({ endpoint: 'your-endpoint-url' });
// Default NO_RETRY configuration provides fail-fast behavior

// Explicitly enable retries if needed
const retriableClient = new Client({
  endpoint: 'your-endpoint-url',
  timeout: TimeoutPresets.NORMAL
});
```

## 🧪 Testing

The timeout functionality includes comprehensive tests. See `tests/runImmediately.test.ts` for examples of:

- Default configuration verification
- Custom timeout configuration
- Preset validation
- Configuration updates and merging
- Edge cases and error handling

Run timeout-specific tests:
```bash
TEST_ENV=dev npx jest --testNamePattern="SDK Timeout Configuration"
``` 