# Examples Script

This is a CLI script that can be used to interact with the SDK. It is a simple script designed to create a workflow, schedule a workflow, get the status of a workflow, list executions, manage secrets, and generate task data for a contract call method.

It is not intended to be a flexible, full-featured CLI, but rather a simple script to demonstrate how to use the SDK. Feel free to customize, add your own features, or edit it to suit your needs. Pull requests are welcome to add more actions.

## Environment Setup

Before running the script, you need to set up the following environment variables:

- `PRIVATE_KEY`: Your private key for accessing the blockchain. This is required for signing transactions.
- `ENV`: The environment in which the script will run. Options include `development`, `sepolia`, `base-sepolia`, and `ethereum`. Set this to match the desired network.

You can set these variables in a `.env` file or directly in your terminal:

```bash
export PRIVATE_KEY=<your_private_key>
export ENV=development
```

## Usage

1. **Build the Packages**: The example script imports libraries defined in this repo, so build the packages first by running `yarn build` at the root folder. `node_modules` should only be in the root folder, as all node_modules are managed and shared by this yarn workspace.

2. **Run the Script**: Use `yarn start` to see all options of this command-line tool. For example, run `yarn run wallet` to list all registered smart wallets, and `yarn run create-wallet <salt>` to create and add more smart wallets to the list.

## Example Commands

### Smart Wallets Related

- Create a new smart wallet:

  ```bash
  yarn start create-wallet 1
  ```

- List all registered smart wallets:
  ```bash
  yarn start wallet
  ```

### Workflow Related

#### General Workflow Commands

1. **Setup a Workflow to Monitor a Wallet**:

   ```bash
   yarn start schedule-monitor 0xC114FB059434563DC65AC8D57e7976e3eaC534F4
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

Feel free to reach out with any questions or suggestions for improvement!
