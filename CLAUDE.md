# ava-sdk-js

## Test Conventions

### simulateWorkflow must include `settings` in inputVariables

When calling `client.simulateWorkflow()`, always spread the workflow and pass `inputVariables` with a `settings` object containing at minimum:
- `name`: workflow name (required by the context-memory AI summarizer)
- `runner`: smart wallet address
- `chain`: chain name (e.g., "sepolia")

```typescript
const simulationResult = await client.simulateWorkflow({
  ...workflow,
  inputVariables: {
    settings: {
      name: "My Workflow Name",
      runner: smartWalletAddress,
      chain: "sepolia",
    },
  },
});
```

Without `settings.name`, the aggregator's context-memory API fails validation and falls back to a generic deterministic summary, producing meaningless Telegram/email messages.
