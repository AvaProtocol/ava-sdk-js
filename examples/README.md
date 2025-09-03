# Examples Script

This is a CLI script that can be used to interact with the SDK. It is a simple script designed to create a workflow, schedule a workflow, get the status of a workflow, list executions, manage secrets, and generate task data for a contract call method.

It is not intended to be a flexible, full-featured CLI, but rather a simple script to demonstrate how to use the SDK. Feel free to customize, add your own features, or edit it to suit your needs. Pull requests are welcome to add more actions.

## Environment Setup

Before running the script, you need to set up authentication. You have two options:

### Option 1: Private Key Authentication (Wallet-specific access)
- `TEST_PRIVATE_KEY`: Your private key for accessing the blockchain. This allows you to access only wallets derived from this private key.

```bash
export TEST_PRIVATE_KEY=<your_private_key>
```

### Option 2: API Key Authentication (Admin access to any wallet)
- `AVS_API_KEY`: Admin API key that allows querying wallets for any address, not just your own.

```bash
export AVS_API_KEY=<your_api_key>
```

### Key Differences:
- **TEST_PRIVATE_KEY**: Can only access wallets derived from that specific private key. Good for personal use.
- **AVS_API_KEY**: Admin access that can query any wallet address. Required for cross-wallet operations.

### For Base Chain specifically:
You can create environment-specific `.env` files **in the root directory** (same level as `package.json`):

```bash
# .env.base (for Base mainnet) - place in root directory
AVS_API_KEY=your_api_key_here
CHAIN_ENDPOINT=https://base-mainnet.core.chainstack.com/your_endpoint

# .env.base-sepolia (for Base testnet) - place in root directory
AVS_API_KEY=your_api_key_here  
CHAIN_ENDPOINT=https://base-sepolia.core.chainstack.com/your_endpoint

# .env (base file) - place in root directory  
TEST_PRIVATE_KEY=your_private_key_here  # Optional, for fallback
```

**Important**: These `.env` files should be in the **root directory** of the project (same level as `package.json`), not in the `examples/` folder.

## Targeting Different Networks

The script supports multiple blockchain networks. Use the `--avs-target` flag to specify which network to use:

**Available networks:**
- `dev` - Local development environment (default)
- `sepolia` - Ethereum Sepolia testnet  
- `base-sepolia` - Base Sepolia testnet (Chain ID: 84532)
- `base` - Base mainnet (Chain ID: 8453)
- `ethereum` - Ethereum mainnet
- `soneium` - Soneium mainnet
- `soneium-minato` - Soneium testnet
- `bsc` - Binance Smart Chain mainnet
- `bsc-testnet` - Binance Smart Chain testnet

**Examples:**
```bash
yarn start --avs-target base getWallets           # Base mainnet
yarn start --avs-target base-sepolia getWallets  # Base testnet
yarn start --avs-target sepolia getWallets       # Ethereum testnet

# Short flag also works
yarn start -t base getWallets
```

### Verify Your Setup

To verify your Base chain setup is working:

```bash
# This should show "Using API key authentication for admin access"
# and "Loading environment from: .env.base"
yarn start --avs-target base getWallets

# Query a specific wallet address
yarn start --avs-target base getWallets 0xYourWalletAddress
```

## Usage

1. **Build the Packages**: The example script imports libraries defined in this repo, so build the packages first by running `yarn build` at the root folder. `node_modules` should only be in the root folder, as all node_modules are managed and shared by this yarn workspace.

2. **Run the Script**: Use `yarn start` to see all options of this command-line tool. For example, run `yarn start getWallets` to list all registered smart wallets, and `yarn start getWallet <salt>` to create and add more smart wallets to the list.

## Example Commands

### Smart Wallets Related

- Create a new smart wallet:

  ```bash
  yarn start getWallet 1
  ```

- Create a smart wallet on Base mainnet:
  ```bash
  yarn start --avs-target base getWallet 1
  ```

- List all registered smart wallets:
  ```bash
  yarn start getWallets  # Uses dev environment by default
  ```

- List wallets on Base testnet:
  ```bash
  yarn start --avs-target base-sepolia getWallets
  ```

- Query specific wallet on Base mainnet (requires API key):
  ```bash
  yarn start --avs-target base getWallets 0xYourWalletAddressHere
  ```

### Workflow Related

#### General Workflow Commands

1. **Setup a Workflow to Monitor a Wallet**:

   ```bash
   yarn start schedule-monitor 0xC114FB059434563DC65AC8D57e7976e3eaC534F4
   ```

   **On Base chain:**
   ```bash
   yarn start --avs-target base schedule-monitor 0xC114FB059434563DC65AC8D57e7976e3eaC534F4
   ```

   After scheduling, set the workflow ID to an environment variable for use in other commands:

   ```bash
   export WORKFLOW_ID=01JKVASBP0E7E5XGJ949QXX0X1
   ```

2. **Get Details of the Scheduled Workflow**:

   ```bash
   yarn start get $WORKFLOW_ID
   ```

3. **Get All Workflows of a Smart Wallet**:
   Replace with your own smart wallet address:

   ```bash
   yarn start tasks 0x5Df343de7d99fd64b2479189692C1dAb8f46184a
   ```

4. **Pagination Support**:
   Update the cursor as needed:

   ```bash
   yarn start tasks 0x5Df343de7d99fd64b2479189692C1dAb8f46184a 2 'eyJkIjoibmV4dCIsInAiOiIwMUpLTVdXQk5QOURKRVBKMTFYTVNEMkg3VyJ9'
   ```

5. **Trigger the Workflow Manually**:

   ```bash
   yarn start trigger $WORKFLOW_ID '{"tx_hash": "0x74edc53c374eb0947909fd387ecf9b166b8add40528ed4f2534ece903bc70cdd", "log_index": 143, "block_number": 72121741}'
   ```

6. **List All Executions of the Workflow**:
   ```bash
   yarn start executions $WORKFLOW_ID
   ```

#### Schedule a Cron Task

Schedule a cron task that posts the result to [webhook.site](https://webhook.site) every 5 minutes.

**Note**: Please check and update your smart wallet accordingly. This task requires that you pass a smart wallet address.

```bash
n dist/example.js schedule-cron '0x5Afb1B1bc212C6417C575A78bf9921Cc05F6d3E2'
```

#### Schedule an Auto Sweep Task

Schedule an auto sweep task where funds transferred to the smart wallet will automatically move out to the specified wallet address.

```bash
n dist/example.js schedule-sweep 0x036cbd53842c5426634e7929541ec2318f3dcf7e
```

## Troubleshooting

### Connection Refused Error

If you see an error like:
```
Error: 14 UNAVAILABLE: No connection established. Last error: Error: connect ECONNREFUSED 127.0.0.1:2206
```

This means you're trying to connect to the local development environment (`dev`) but the local aggregator server is not running. 

**Solutions:**

1. **Use a remote environment instead of local dev:**
   ```bash
   yarn start --avs-target base-sepolia getWallets  # Use Base testnet
   # or
   yarn start --avs-target base getWallets          # Use Base mainnet
   ```

2. **Or start the local development server** (if you have the EigenLayer-AVS repo set up):
   ```bash
   cd ../EigenLayer-AVS
   make dev-agg
   ```

### Environment Configuration

The example script automatically loads environment-specific configurations:

- **Base mainnet** (`base`): Connects to `aggregator-base.avaprotocol.org:3206`
- **Base testnet** (`base-sepolia`): Connects to `aggregator-base-sepolia.avaprotocol.org:3206`  
- **Local dev** (`dev`): Connects to `localhost:2206` (requires local server)

Feel free to reach out with any questions or suggestions for improvement!

## Examples

This directory contains examples of how to use the AVA SDK.

## Basic Usage

Run examples with:
```bash
yarn example
```

## MethodParams Usage (NEW)

The SDK now supports `methodParams` fields in ContractRead and ContractWrite nodes, allowing for dynamic parameter injection using Handlebars templates. Since Solidity uses positional parameters, `methodParams` is an array of strings where each element represents a parameter at that position:

### ContractRead with methodParams

```javascript
import { NodeFactory, NodeType } from "@avaprotocol/sdk-js";

// Create a contract read node that uses methodParams for dynamic address
const contractReadNode = NodeFactory.create({
  id: "balance-check",
  name: "Check Balance",
  type: NodeType.ContractRead,
  data: {
    contractAddress: "0xA0b86a33E6411b6a7d9AE326E74250f0DAc8D7C7", // ERC20 token
    contractAbi: [/* ERC20 ABI */],
    methodCalls: [
      {
        callData: "0x70a08231", // balanceOf(address) signature
        methodName: "balanceOf",
        methodParams: ["{{value.userAddress}}"] // Array with single parameter at position 0
      }
    ]
  }
});
```

### ContractWrite with methodParams

```javascript
import { NodeFactory, NodeType } from "@avaprotocol/sdk-js";

// Create a contract write node that uses methodParams for dynamic transfer
const contractWriteNode = NodeFactory.create({
  id: "token-transfer",
  name: "Transfer Tokens",
  type: NodeType.ContractWrite,
  data: {
    contractAddress: "0xA0b86a33E6411b6a7d9AE326E74250f0DAc8D7C7", // ERC20 token
    callData: "0xa9059cbb", // transfer(address,uint256) signature (fallback)
    contractAbi: [/* ERC20 ABI */],
    methodCalls: [
      {
        callData: "0xa9059cbb", // transfer(address,uint256) signature
        methodName: "transfer", 
        methodParams: ["{{value.recipient}}", "{{value.amount}}"] // Array: [address, uint256]
      }
    ]
  }
});

// Example with 3 parameters (transferFrom)
const transferFromNode = NodeFactory.create({
  id: "token-transfer-from",
  name: "Transfer From",
  type: NodeType.ContractWrite,
  data: {
    contractAddress: "0xA0b86a33E6411b6a7d9AE326E74250f0DAc8D7C7",
    callData: "0x23b872dd", // transferFrom(address,address,uint256)
    contractAbi: [/* ERC20 ABI */],
    methodCalls: [
      {
        callData: "0x23b872dd",
        methodName: "transferFrom",
        methodParams: ["{{value.sender}}", "{{value.recipient}}", "{{value.amount}}"] // Array: [from, to, amount]
      }
    ]
  }
});
```

### Using in Loops

MethodParams are especially useful in loop nodes where you iterate over data:

```javascript
// Assuming a manual trigger provides an array of addresses
const loopNode = NodeFactory.create({
  id: "check-balances-loop",
  name: "Check Multiple Balances",
  type: NodeType.Loop,
  data: {
    inputNodeName: "manual_trigger", // References the trigger data
    iterVal: "value", // Current iteration value
    iterKey: "index", // Current iteration index
    runner: {
      type: "contractRead",
      data: {
        config: {
          contractAddress: "0xA0b86a33E6411b6a7d9AE326E74250f0DAc8D7C7",
          contractAbi: [/* ERC20 ABI */],
          methodCalls: [
            {
              callData: "0x70a08231",
              methodName: "balanceOf",
              methodParams: ["{{value.address}}"] // Array with single parameter
            }
          ]
        }
      }
    }
  }
});
```

**Important Notes:**
- `methodParams` is an array of strings, not a single string
- Each array element represents a parameter at that position (0, 1, 2, etc.)
- This aligns with Solidity's positional parameter system
- The backend handles the actual parameter parsing and call data generation
- The SDK simply stores and transmits the methodParams templates to the backend for processing
