# Examples script

This is a CLI script that can be used to interact with the SDK. It is a simple script that can be used to create a workflow, schedule a workflow, and get the status of a workflow, list executions, manage secrets, and generate task data for a contract call method.

It doesn't mean to be a flexible full featured CLI, but rather a simple script to show how to use the SDK. If you want customize, add your own stuff or edit it to your needs. PR are welcome to add more actions.

## Usage

We need to prepare environment variable for the script. You can store it in a `.env` file or set it in your system.

```
export PRIVATE_KEY=your_private_key
export ENV=development
# you can switch between development, sepolia, "base-sepolia" and ethereum by setting this ENV to the key of config array
```

Build the script

```
yarn build:example
```

The build run in watch mode, so you can change the code and it will automatically rebuild the script. Useful because you will notice you want to edit this script parameter a lot when testing out.

Run the script

```
node dist/example.js
```

and it will show the usage of the script with all the actions that you can do.

## Example commands

Note: please don't just copy and run these example command. Read the code to understand what are these parameter.

```
node dist/example.js create-wallet 1
node dist/example.js wallet

# Setup a task to monitor this wallet
node dist/example.js schedule-monitor 0xC114FB059434563DC65AC8D57e7976e3eaC534F4

# At this moment we had an ID, we should set it to env to use it in other commands
export WORKFLOW_ID=01JKVASBP0E7E5XGJ949QXX0X1

# Get the workflow details
node dist/example get $WORKFLOW_ID

# Get all workflow of smart wallet 0x5Df343de7d99fd64b2479189692C1dAb8f46184a (replace with your own smart wallet address)
node dist/example.js tasks 0x5Df343de7d99fd64b2479189692C1dAb8f46184a
# pagination is also supported (update the cursor)
node dist/example.js tasks 0x5Df343de7d99fd64b2479189692C1dAb8f46184a 2 'eyJkIjoibmV4dCIsInAiOiIwMUpLTVdXQk5QOURKRVBKMTFYTVNEMkg3VyJ9'

# trigger the workflow manually
node dist/example.js trigger $WORKFLOW_ID '{"tx_hash": "0x74edc53c374eb0947909fd387ecf9b166b8add40528ed4f2534ece903bc70cdd", "log_index": 143, "block_number": 72121741}'

# list all the executions of the workflow
node dist/example.js executions $WORKFLOW_ID

# Schedule a cron task that post the result to webhook.site very 5 mins
# Please check and update accordingly your smart wallet
# This task require that we are passing a smart wallet
n dist/example.js schedule-cron '0x5Afb1B1bc212C6417C575A78bf9921Cc05F6d3E2'


# schedule an auto sweep task where fund transfer to the smart wallet will automatically move out to the 0x036cbd53842c5426634e7929541ec2318f3dcf7e wallet
n dist/example.js schedule-sweep 0x036cbd53842c5426634e7929541ec2318f3dcf7e
```