import { Client, TriggerFactory, NodeFactory, Edge } from "@avaprotocol/sdk-js";
import { NodeType, getKeyRequestMessage, TriggerType } from "@avaprotocol/types";

import _ from "lodash";
import { ethers, Wallet } from "ethers";
import util from "node:util";
import id128library from "id128";
const { UlidMonotonic } = id128library;

import { commandArgs, currentEnv, getConfig } from "./config";

const privateKey = process.env.PRIVATE_KEY; // Make sure to provide your private key with or without the '0x' prefix
const DEFAULT_PAGE_LIMIT = 5;

// Initialize SDK
console.log("Current environment is: ", currentEnv);

const client = new Client({
  endpoint: getConfig().AP_AVS_RPC,
});

const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "-4609037622";

// Generate a signed message from a private key
async function generateSignature(privateKey: string) {
  const wallet = new ethers.Wallet(privateKey);

  const keyRequestParams = {
    // TODO: move to config
    chainId: 11155111,
    address: wallet.address,
    issuedAt: new Date(),
    expiredAt: new Date(new Date().getTime() + 3600),
  };

  const message = getKeyRequestMessage(keyRequestParams);
  const signature = await wallet.signMessage(message);

  return { signature, ...keyRequestParams };
}

async function generateApiToken() {
  const signature = await generateSignature(privateKey as string);
  const { message } = await client.getSignatureFormat(wallet.address);
  const result = await client.authWithSignature({
    message: message,
    signature: signature,
  });
  client.setAuthKey(result.authKey);

  return result;
}

async function signMessageWithEthers(wallet, message: string) {
  const signature = await wallet.signMessage(message);
  return signature;
}

async function getWorkflows(
  address: string,
  options: { authKey: string; cursor: string; limit: number }
) {
  let params = [];
  const validOptions = {
    authKey: options.authKey,
    cursor: options.cursor || "",
    limit: options.limit || DEFAULT_PAGE_LIMIT,
  };

  if (_.isEmpty(address)) {
    console.log(
      "address is empty, fetching all wallet addresses as params ..."
    );

    const wallets = await client.getWallets({ authKey: validOptions.authKey });

    console.log(`Found ${wallets.length} smart wallets ...`);
    params = _.map(wallets, (wallet: any) => wallet.address);

    // If after fetching smart wallets the params is still empty, return early
    // Otherwise, AVS returns Error: 3 INVALID_ARGUMENT: Missing smart_wallet_address
    if (_.isEmpty(params)) {
      console.log("No addresses provided, returning early ...");
      console.log("Run create-wallet to create a smart wallet first ...");
      return;
    }
  } else {
    params = _.split(address, ",");
  }

  console.log(
    `Calling getWorkflows with cursor`,
    validOptions.cursor,
    `and limit`,
    validOptions.limit
  );

  const result = await client.getWorkflows(params, validOptions);

  console.log(
    "getWorkflows response:\n",
    util.inspect(result, { depth: 6, colors: true })
  );
}

async function getExecutions(
  workflowIdsString: string,
  options: {
    authKey: string;
    cursor?: string;
    limit?: number;
  } = { authKey: "", cursor: "", limit: 20 }
) {
  let workflowIds = [];

  if (_.isEmpty(workflowIdsString)) {
    const wallets = await client.getWallets({
      authKey: options.authKey,
    });

    const workflows = await client.getWorkflows(
      _.map(wallets, (wallet: any) => wallet.address),
      {
        authKey: options.authKey,
        cursor: options.cursor,
        limit: options.limit,
      }
    );

    console.log(
      `Found ${wallets.length} wallets and ${workflows.result.length} workflows...`
    );

    // If there's no workflows found, return early
    if (_.isEmpty(workflows.result)) {
      console.log("No workflows found, returning early ...");
      return;
    }

    workflowIds = _.map(workflows.result, (workflow: any) => workflow.id);
  } else {
    workflowIds = _.split(workflowIdsString, ",");
  }

  const result = await client.getExecutions(workflowIds, {
    authKey: options.authKey,
    cursor: options.cursor,
    limit: options.limit,
  });

  console.log(
    "getExecutions response:\n",
    util.inspect(result, { depth: 6, colors: true })
  );
}

async function triggerTask(owner, token, taskId, triggerReason) {
  const metadata = JSON.parse(triggerReason);

  const result = await client.triggerWorkflow(
    {
      id: taskId,
      reason: {
        type: TriggerType.Event,
        blockNumber: metadata["block_number"],
        logIndex: metadata["log_index"],
        txHash: metadata["tx_hash"],
      },
      isBlocking: true,
    },
    {
      authKey: token,
    }
  );

  console.log("request", { taskId: taskId, triggerReason });
  console.log("Response:\n", result);
}

async function getWallets(
  owner: string,
  token: string,
  shouldFetchBalances?: boolean
) {
  const walletsResp = await client.getWallets({
    authKey: token,
  });

  if (shouldFetchBalances) {
    console.log("Fetching balances from RPC provider ...");
    // Update the provider creation
    const provider = new ethers.JsonRpcProvider(getConfig().RPC_PROVIDER);

    // Get token balance
    const tokenAddress = getConfig().TEST_TRANSFER_TOKEN;
    const tokenAbi = [
      "function balanceOf(address account) view returns (uint256)",
      "function decimals() view returns (uint8)",
      "function symbol() view returns (string)",
    ];
    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);

    let wallets = [];
    for (const wallet of walletsResp) {
      const balance = await provider.getBalance(wallet.address);
      const balanceInEth = _.floor(Number(ethers.formatEther(balance)), 2);

      const tokenBalance = await tokenContract.balanceOf(wallet.address);

      const tokenDecimals = await tokenContract.decimals();
      const tokenSymbol = await tokenContract.symbol();
      const tokenBalanceFormatted = _.floor(
        Number(ethers.formatUnits(tokenBalance, tokenDecimals)),
        2
      );
      wallets.push({
        ...wallet,
        balances: [
          `${balanceInEth} ETH`,
          `${tokenBalanceFormatted} ${tokenSymbol}`,
        ],
      });
    }

    return wallets;
  } else {
    return walletsResp;
  }
}

const createWallet = async (owner, token, salt, factoryAddress) => {
  return await client.getWallet(
    {
      salt,
      factoryAddress,
    },
    {
      authKey: token,
    }
  );
};

function getTaskData() {
  let ABI = ["function transfer(address to, uint amount)"];
  let iface = new ethers.Interface(ABI);
  return iface.encodeFunctionData("transfer", [
    getConfig().TEST_TRANSFER_TO,
    ethers.parseUnits("12", 18),
  ]);
}

function getTaskDataQuery(owner) {
  let ABI = ["function retrieve(address addr) public view returns (uint256)"];
  let iface = new ethers.Interface(ABI);
  return iface.encodeFunctionData("retrieve", [owner]);
}

// Schedule a simple job that get price of an asset and post it to a webhook
async function schedulePriceReport(
  schedule: string,
  smartWalletAddress: string,
  { authKey }: { authKey: string }
) {
  const taskBody = getTaskData();
  if (!smartWalletAddress) {
    console.log("invalid smart wallet address. check usage");
    return;
  }

  const triggerId: string = UlidMonotonic.generate().toCanonical();
  const nodeIdOraclePrice = UlidMonotonic.generate().toCanonical();
  const nodeIdNotification = UlidMonotonic.generate().toCanonical();

  let trigger = TriggerFactory.create({
    id: triggerId,
    type: TriggerType.Block,
    name: "demoTriggerName",
    data: {
      interval: 5,
    },
  });

  if (schedule === "schedule-cron") {
    trigger = TriggerFactory.create({
      id: triggerId,
      type: TriggerType.Cron,
      name: "demoCronTrigger",
      data: {
        // every 5 minutes, multiple crontab is also accepted
        scheduleList: ["*/2 * * * *"],
      },
    });
  }

  const workflow = client.createWorkflow({
    name: `price report every 5 blocks`,
    smartWalletAddress,
    nodes: NodeFactory.createNodes([
      {
        id: nodeIdOraclePrice,
        name: "checkPrice",
        type: NodeType.ContractRead,
        data: {
          contractAddress: getConfig().ORACLE_PRICE_CONTRACT,
          callData: "0xfeaf968c",
          contractAbi: `[
            {
              "inputs":[],
              "name":"latestRoundData",
              "outputs":[
                {"internalType":"uint80","name":"roundId","type":"uint80"},
                {"internalType":"int256","name":"answer","type":"int256"},
                {"internalType":"uint256","name":"startedAt","type":"uint256"},
                {"internalType":"uint256","name":"updatedAt","type":"uint256"},
                {"internalType":"uint80","name":"answeredInRound","type":"uint80"}
              ],
              "stateMutability":"view",
              "type":"function"
            }
          ]`,
        },
      },
      {
        id: nodeIdNotification,
        name: "notification",
        type: NodeType.RestAPI,
        data: {
          //url: "https://api.telegram.org/bot{{apContext.configVars.ap_notify_bot_token}}/sendMessage",
          // Using this kind of website so you can interactly look at the request body, once it looks good and match telegram style, uncomment to use the above telegram url. It is important to use your own chat id
          url: "https://wet-butcher-89.webhook.cool",
          method: "POST",
          body: `{
            "chat_id": ${CHAT_ID},
            "text": "The result of latestRoundData at {{ new Date().getTime() }} of ETH/USD pair on ${currentEnv} network is {{ checkPrice.data.toString() }}."
          }`,
          headersMap: [["content-type", "application/json"]],
        },
      },
    ]),

    edges: [
      new Edge({
        id: UlidMonotonic.generate().toCanonical(),
        source: triggerId,
        target: nodeIdOraclePrice,
      }),
      new Edge({
        id: UlidMonotonic.generate().toCanonical(),
        source: nodeIdOraclePrice,
        target: nodeIdNotification,
      }),
    ],

    trigger,
    startAt: Math.floor(Date.now() / 1000) + 30,
    expiredAt: Math.floor(Date.now() / 1000 + 3600 * 24 * 30),
    maxExecution: 1,
  });

  const workflowId = await client.submitWorkflow(workflow, {
    authKey,
  });

  console.log("create task", workflowId);
}

// setup a task to monitor in/out transfer for a wallet and send notification
async function scheduleTelegram(owner: string, token: string) {
  console.log("schedule a dummy telegram message");
  const wallets = await getWallets(owner, token);
  if (_.isEmpty(wallets)) {
    console.log(
      "please create at least one wallet. this example will then auto pick the first wallet to schedule the test"
    );
    return;
  }
  const smartWalletAddress = wallets[0].address;

  const nodeIdNotification = UlidMonotonic.generate().toCanonical();

  const triggerId = UlidMonotonic.generate().toCanonical();

  const workflow = client.createWorkflow({
    name: `dummy telegram msg ${new Date().toISOString()}`,
    smartWalletAddress,
    nodes: NodeFactory.createNodes([
      {
        id: nodeIdNotification,
        name: "notification",
        type: NodeType.RestAPI,
        data: {
          url: "https://api.telegram.org/bot{{apContext.configVars.ap_notify_bot_token}}/sendMessage?parse_mode=Markdown",
          method: "POST",
          //body: `{
          //  "chat_id": -4609037622,
          //  "text": "Hello world scheduleTelegram Test. This task is triggered at block {{ triggerEvery10.data.block_number }}. we can also use use js in this block new Date() = {{ new Date() }}"
          //}`,

          body: `{
            "chat_id": 5197173428,
            "text": "Hello world scheduleTelegram Test on ${currentEnv} network. This task is triggered at block {{ triggerEvery10.data.block_number }}. we can also use use js in this block new Date() = {{ new Date() }}"
          }`,
          headersMap: [["content-type", "application/json"]],
        },
      },
    ]),

    edges: [
      new Edge({
        id: UlidMonotonic.generate().toCanonical(),
        source: triggerId,
        target: nodeIdNotification,
      }),
    ],

    trigger: TriggerFactory.create({
      id: triggerId,
      type: TriggerType.Block,
      name: "triggerEvery10",
      data: {
        interval: 5,
      },
    }),
    startAt: Math.floor(Date.now() / 1000) + 30,
    expiredAt: Math.floor(Date.now() / 1000 + 3600 * 24 * 30),
    maxExecution: 1,
  });

  const workflowId = await client.submitWorkflow(workflow, {
    authKey: token,
  });

  console.log("create task", workflowId);

  return workflowId;
}

// sweep is a highly dynamic task where the task isn't a fixed. It is essentially simulate an exchange deposit wallet. It works as follow
// 1. A task is setup to monitor a certain of token transfer in the wallet. Note: can also monitor all but don't want to waste gas for spam token
// 2. When the allowed token transfer it the smart wallet, we will transfer out the exact amount into a destination wallet
//
// The task demo how contractWrite node can be dynamic based on previous input
async function scheduleSweep(owner: string, token: string, target: string) {
  console.log(
    "schedule a sweep task that move incoming fund to another wallet"
  );
  const wallets = await getWallets(owner, token);
  if (_.isEmpty(wallets)) {
    console.log(
      "please create at least one wallet. this example will then auto pick the first wallet to schedule the test"
    );
    return;
  }
  const smartWalletAddress = wallets[0].address;

  const nodeIdCheckToken = UlidMonotonic.generate().toCanonical();
  const nodeIdLog = UlidMonotonic.generate().toCanonical();
  const nodeIdSweep = UlidMonotonic.generate().toCanonical();
  const branchIdCheckToken = UlidMonotonic.generate().toCanonical();

  const triggerId = UlidMonotonic.generate().toCanonical();

  const workflow = client.createWorkflow({
    name: `monitor transfer at ${new Date().toISOString()}`,
    smartWalletAddress,
    nodes: NodeFactory.createNodes([
      {
        id: nodeIdCheckToken,
        name: "checktoken",
        type: NodeType.Branch,
        data: {
          conditionsList: [
            {
              id: branchIdCheckToken,
              type: "if",
              // This can be an or to only sweep whitelist token such as usd and link
              expression: `["0x036cbd53842c5426634e7929541ec2318f3dcf7e", "0xe4ab69c077896252fafbd49efd26b5d171a32410"].indexOf(demoTriggerName.data.address.toLowerCase()) >= 0`,
            },
          ],
        },
      },
      {
        id: nodeIdLog,
        name: "log",
        type: NodeType.RestAPI,
        data: {
          //url: "https://api.telegram.org/bot{{apContext.configVars.ap_notify_bot_token}}/sendMessage?parse_mode=Markdown",
          url: "https://wet-butcher-89.webhook.cool",
          method: "POST",
          // Update the chat id according to your own telegram bot
          body: `{{ demoTriggerName.data.toString() }}`,
          headersMap: [["content-type", "application/json"]],
        },
      },

      {
        id: nodeIdSweep,
        name: "sweep",
        type: NodeType.ContractWrite,
        data: {
          // At  run time this is dynamically evaluate
          contractAddress: "{{demoTriggerName.data.address}}",
          // Transfer whatever coming in to 0xe0f7d11fd714674722d325cd86062a5f1882e13a
          // Learn more how to compute these here https://ethereum.stackexchange.com/questions/114146/how-do-i-manually-encode-and-send-transaction-data and https://docs.ethers.org/v6/api/abi/#Interface-encodeFunctionData
          callData:
            "0xa9059cbb000000000000000000000000e0f7d11fd714674722d325cd86062a5f1882e13a{{ Number(demoTriggerName.data.value).toString(16).padStart(64, '0') }}",
          // Adding required contractAbi property
          contractAbi: "[]",
        },
      },
    ]),

    edges: [
      new Edge({
        id: UlidMonotonic.generate().toCanonical(),
        source: triggerId,
        target: nodeIdCheckToken,
      }),
      new Edge({
        id: UlidMonotonic.generate().toCanonical(),
        source: `${nodeIdCheckToken}.${branchIdCheckToken}`,
        target: nodeIdLog,
      }),
      new Edge({
        id: UlidMonotonic.generate().toCanonical(),
        source: nodeIdLog,
        target: nodeIdSweep,
      }),
    ],

    trigger: TriggerFactory.create({
      id: triggerId,
      type: TriggerType.Event,
      name: "demoTriggerName",
      data: {
        expression: "",
        matcherList: [
          {
            type: "topics",
            valueList: [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "",
              // The wallet to monitor here
              target,
            ],
          },
        ],
      },
    }),
    startAt: Math.floor(Date.now() / 1000) + 30,
    expiredAt: Math.floor(Date.now() / 1000 + 3600 * 24 * 30),
    maxExecution: 1,
  });

  const workflowId = await client.submitWorkflow(workflow, {
    authKey: token,
  });

  console.log("create task", workflowId);

  return workflowId;
}

// setup a task to monitor in/out transfer for a wallet and send notification
async function scheduleMonitorTransfer(
  owner: string,
  token: string,
  target: string
) {
  console.log("schedule a monitor transfer task to the first smart wallet");
  const wallets = await getWallets(owner, token);
  if (_.isEmpty(wallets)) {
    console.log(
      "please create at least one wallet. this example will then auto pick the first wallet to schedule the test"
    );
    return;
  }
  const smartWalletAddress = wallets[0].address;

  const nodeIdNotification = UlidMonotonic.generate().toCanonical();
  const nodeIdCheckAmount = UlidMonotonic.generate().toCanonical();
  const branchIdCheckAmount = UlidMonotonic.generate().toCanonical();

  const triggerId = UlidMonotonic.generate().toCanonical();

  const workflow = client.createWorkflow({
    name: `monitor transfer at ${new Date().toISOString()}`,
    smartWalletAddress,
    nodes: NodeFactory.createNodes([
      {
        id: nodeIdCheckAmount,
        name: "checkAmount",
        type: NodeType.Branch,
        data: {
          conditionsList: [
            {
              id: branchIdCheckAmount,
              type: "if",
              //expression: `demoTriggerName.data.address == "0x036cbd53842c5426634e7929541ec2318f3dcf7e" && Number(demoTriggerName.data.value_formatted) > 1`,
              expression: `demoTriggerName.data.address == "0x036cbd53842c5426634e7929541ec2318f3dcf7e" && Number(demoTriggerName.data.value_formatted) > 0.005`,
            },
          ],
        },
      },
      {
        id: nodeIdNotification,
        name: "notification",
        type: NodeType.RestAPI,
        data: {
          //url: "https://api.telegram.org/bot{{apContext.configVars.ap_notify_bot_token}}/sendMessage?parse_mode=Markdown",
          url: "https://wet-butcher-89.webhook.cool",
          method: "POST",
          // Update the chat id according to your own telegram bot
          body: `{
            "chat_id": -4609037622,
            "text": "Congrat, your walllet {{demoTriggerName.data.to_address}}(https://sepolia.etherscan.io/address/{{demoTriggerName.data.to_address}}) received {{demoTriggerName.data.value_formatted}} [{{demoTriggerName.data.token_symbol}}](https://sepolia.etherscan.io/token/{{demoTriggerName.data.address}}) from {{demoTriggerName.data.from_address}} at [{{demoTriggerName.data.transaction_hash}}](sepolia.etherscan.io/tx/{{demoTriggerName.data.transaction_hash}})"
          }`,
          headersMap: [["content-type", "application/json"]],
        },
      },
    ]),

    edges: [
      new Edge({
        id: UlidMonotonic.generate().toCanonical(),
        source: triggerId,
        target: nodeIdCheckAmount,
      }),
      new Edge({
        id: UlidMonotonic.generate().toCanonical(),
        source: `${nodeIdCheckAmount}.${branchIdCheckAmount}`,
        target: nodeIdNotification,
      }),
    ],

    trigger: TriggerFactory.create({
      id: triggerId,
      type: TriggerType.Event,
      name: "demoTriggerName",
      data: {
        expression: "",
        matcherList: [
          {
            type: "topics",
            valueList: [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "",
              //"0x06DBb141d8275d9eDb8a7446F037D20E215188ff",
              target,
            ],
          },
        ],
      },
    }),
    startAt: Math.floor(Date.now() / 1000) + 30,
    expiredAt: Math.floor(Date.now() / 1000 + 3600 * 24 * 30),
    maxExecution: 1,
  });

  const workflowId = await client.submitWorkflow(workflow, {
    authKey: token,
  });

  console.log("create task", workflowId);

  return workflowId;
}

const main = async (cmd: string) => {
  const result = await generateApiToken();
  // Fix the address property issue - use the address from the original signature
  const wallet = new Wallet(privateKey);
  const owner = wallet.address;
  const authKey = result.authKey;

  switch (commandArgs.command) {
    case "auth-key":
      console.log("The authkey associate with the EOA is", authKey);
      break;
    case "getWallets":
      const wallets = await client.getWallets({ authKey });
      console.log(
        "getWallets response:\n",
        util.inspect(wallets, { depth: 6, colors: true })
      );
      break;
    case "getWallet":
      const salt = commandArgs.args[0];
      const factoryAddress = getConfig().FACTORY_ADDRESS;
      let smartWalletAddress = await client.getWallet(
        {
          salt,
          factoryAddress,
        },
        { authKey }
      );
      console.log(
        `A new smart wallet with salt ${salt} is created for ${owner}:\nResponse:\n`,
        smartWalletAddress
      );
      break;
    case "schedule-monitor":
      scheduleMonitorTransfer(owner, authKey, commandArgs.args[0]);
      break;
    case "schedule-telegram":
      scheduleTelegram(owner, authKey);
      break;
    case "schedule-sweep":
      scheduleSweep(owner, authKey, commandArgs.args[0]);
      break;
    case "schedule":
    case "schedule-cron":
    case "schedule-fixed":
    case "schedule-manual":
      const resultSchedule = await schedulePriceReport(
        commandArgs.args[0],
        commandArgs.args[1],
        { authKey }
      );

      console.log(
        "schedule",
        util.inspect(resultSchedule, { depth: 6, colors: true })
      );
      break;

    case "getWorkflows":
      const address = commandArgs.args[0];
      await getWorkflows(address, {
        cursor: commandArgs.args[1],
        limit: _.toNumber(commandArgs.args[2]),
        authKey,
      });
      break;

    case "getWorkflow":
      const taskId = commandArgs.args[0];
      const result = await client.getWorkflow(taskId, {
        authKey,
      });

      console.log(
        "getWorkflow response:\n",
        util.inspect(result, { depth: 6, colors: true })
      );
      break;

    case "getExecutions":
      await getExecutions(commandArgs.args[0], {
        authKey,
        cursor: commandArgs.args[1],
        limit: _.toNumber(commandArgs.args[2]),
      });
      break;
    case "getExecution":
      const resultExecution = await client.getExecution(
        commandArgs.args[0],
        commandArgs.args[1],
        { authKey }
      );

      console.log(
        "getExecution response:\n",
        util.inspect(resultExecution, { depth: 6, colors: true })
      );
      break;
    case "cancel":
      const resultCancel = await client.cancelWorkflow(commandArgs.args[0], {
        authKey,
      });

      console.log("Response:\n", resultCancel);
      break;
    case "deleteWorkflow":
      const resultDelete = await client.deleteWorkflow(commandArgs.args[0], {
        authKey,
      });

      console.log("Response:\n", resultDelete);
      break;

    case "gen-task-data":
      console.log("pack contract call", getTaskDataQuery(owner));
      break;

    case "trigger":
      await triggerTask(
        owner,
        authKey,
        commandArgs.args[0],
        commandArgs.args[1]
      );
      break;

    case "create-secret":
      const isSuccess = await client.createSecret(
        commandArgs.args[0],
        commandArgs.args[1],
        { authKey }
      );

      console.log(
        "secret",
        util.inspect(isSuccess, { depth: 6, colors: true })
      );
      break;
    case "list-secrets":
      const secrets = await client.listSecrets({
        authKey,
      });
      console.log("secrets", util.inspect(secrets, { depth: 6, colors: true }));
      break;

    default:
      console.log(`Usage:

      create-wallet <salt> <factory-address(optional)>:   to create a smart wallet with a salt, and optionally a factory contract
      wallet:                                             to list smart wallet address that has been created. note that a default wallet with salt=0 will automatically created
      tasks <smart-wallet>,... <limit> <cursor>:          to list all tasks of given smart wallet addresses, with cursor and limit
      get <task-id>:                                      to get task detail. a permission error is throw if the eoa isn't the smart wallet owner.
      executions <task-id>:                               to get task execution history. a permission error is throw if the eoa isn't the smart wallet owner.
      execution <task-id> <execution-id>:                 to get a single task execution history. a permission error is throw if the eoa isn't the smart wallet owner.
      schedule <smart-wallet-address>:                    to schedule a task that run on every block, with chainlink eth-usd its condition will be matched quickly
      schedule-cron <smart-wallet-address>:               same as above, but run on cron
      schedule-monitor <wallet-address>:                  to monitor erc20 in/out for an address
      schedule-telegram:                                  to schedule a dummy task that send a fix message to telegram every 10 blocks
      schedule-sweep <smart-wallet-address>:              when fund arrive to smart wallet, route them to other address, simulate exchange deposit
      trigger <task-id> <trigger-metadata>:               manually trigger a task. Example:
                                                            trigger abcdef '{"block_number":1234}' for blog trigger
                                                            trigger abcdef '{"block_number":1234, "log_index":312,"tx_hash":"0x123"}' for event trigger
                                                            trigger abcdef '{"epoch":1234, "log_index":312,"tx_hash":"0x123"}' for time based trigger (fixed or cron)
      cancel <task-id>:                                   to cancel a task
      delete <task-id>:                                   to completely remove a task
      create-secret name value:                           create a user secret that is available to all task
      list-secrets name value:                            create a user secret that is available to all task
      gen-task-data:                                      generate a task data for a contract call
      auth-key:                                            get auth key for your EOA when you want to construct grpc call manually
      `);
  }
};

(async () => {
  main(process.argv[2]);
})();
