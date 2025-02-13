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

Run the script

```
node dist/example.js
```

and it will show the usage of the script with all the actions that you can do.
