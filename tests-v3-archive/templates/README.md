# Real-World Workflow Templates

This folder contains comprehensive test suites based on **real client workflow data** to validate that the SDK works correctly with actual usage patterns.

## Overview

Each template test file follows a consistent structure with **three test suites**:

### 1. Individual Component Testing
- Tests each trigger and node in isolation using `runTrigger` and `runNodeImmediately`
- Validates input field handling and data flow
- Ensures components work correctly with real-world data structures

### 2. Workflow Simulation Testing  
- Tests the complete workflow using `simulateWorkflow`
- Verifies end-to-end execution without deployment
- Validates step-by-step execution and data transformation

### 3. Full Deployment and Execution Testing
- Deploys the workflow to the aggregator
- Triggers the workflow with real event data
- Verifies complete execution cycle including database persistence

## Current Templates

### `telegram-alert-on-transfer.test.ts`
**Real client use case:** Monitor USDC transfers and send Telegram alerts

- **Trigger:** EventTrigger with complex input data (tokens, addresses, chainId)
- **Nodes:** CustomCode (message formatting) + RestAPI (Telegram notification)
- **Real Data:** Based on actual Sepolia USDC contract monitoring
- **Tests:** Input field serialization, workflow persistence, event monitoring

## Running Template Tests

```bash
# Run all template tests
npm test -- tests/templates/

# Run specific template
npm test -- tests/templates/telegram-alert-on-transfer.test.ts

# Run with verbose output
npm test -- tests/templates/ --verbose
```

## Benefits

### 🔍 **Comprehensive Coverage**
- Tests individual components, simulation, and full deployment
- Validates both success and error scenarios
- Ensures input field handling works correctly

### 🌍 **Real-World Validation**
- Based on actual client usage patterns
- Uses real contract addresses and data structures
- Tests complex input data scenarios

### 🚀 **Regression Prevention**
- Catches serialization issues (like empty nodes/edges arrays)
- Validates input field persistence and retrieval
- Tests event monitoring integration 