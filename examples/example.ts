import Client, {
  TriggerFactory,
  TriggerType,
  TriggerMetadata,
  NodeFactory,
  Edge,
} from "@/sdk-js/dist";

import { NodeType } from "@/types/dist";
import { Secret } from "@avaprotocol/sdk-js";

const {
  getKeyRequestMessage,
  GetKeyRequestMessage,
  GetKeyRequestApiKey,
  GetKeyRequestSignature,
} = require("@/types/dist");

const _ = require("lodash");
const { ethers } = require("ethers");
const { Wallet } = ethers;
const { UlidMonotonic } = require("id128");
const util = require("node:util");

const env = process.env.ENV || "development";
const privateKey = process.env.PRIVATE_KEY; // Make sure to provide your private key with or without the '0x' prefix
const DEFAULT_PAGE_LIMIT = 5;

const config = {
  // The development environment is the local environment run on your machine. It can be bring up following the instructions in this file https://github.com/AvaProtocol/EigenLayer-AVS/blob/main/docs/development.md
  development: {
    AP_AVS_RPC: "localhost:2206",
    TEST_TRANSFER_TOKEN: "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b",
    TEST_TRANSFER_TO: "0xe0f7D11FD714674722d325Cd86062A5F1882E13a",
    ORACLE_PRICE_CONTRACT: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    // on local development we still target smart wallet on sepolia
    RPC_PROVIDER: "https://sepolia.gateway.tenderly.co",
  },

  sepolia: {
    AP_AVS_RPC: "aggregator-sepolia.avaprotocol.org:2206",
    TEST_TRANSFER_TOKEN: "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b",
    TEST_TRANSFER_TO: "0xe0f7D11FD714674722d325Cd86062A5F1882E13a",
    ORACLE_PRICE_CONTRACT: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    RPC_PROVIDER: "https://sepolia.gateway.tenderly.co",
  },

  "base-sepolia": {
    AP_AVS_RPC: "aggregator-base-sepolia.avaprotocol.org:3206",
    TEST_TRANSFER_TOKEN: "0x72d587b34f7d21fbc47d55fa3d2c2609d4f25698",
    TEST_TRANSFER_TO: "0xa5ABB97A2540E4A4756E33f93fB2D7987668396a",
    ORACLE_PRICE_CONTRACT: "0x360B0a3f9Fc28Eb2426fa2391Fd2eB13912E1e40",
    RPC_PROVIDER: "https://mainnet.gateway.tenderly.co",
  },

  base: {
    AP_AVS_RPC: "aggregator-base.avaprotocol.org:3206",
    TEST_TRANSFER_TOKEN: "0x72d587b34f7d21fbc47d55fa3d2c2609d4f25698",
    TEST_TRANSFER_TO: "0xa5ABB97A2540E4A4756E33f93fB2D7987668396a",
    ORACLE_PRICE_CONTRACT: "0x360B0a3f9Fc28Eb2426fa2391Fd2eB13912E1e40",
    RPC_PROVIDER: "https://mainnet.gateway.tenderly.co",
  },

  ethereum: {
    AP_AVS_RPC: "aggregator.avaprotocol.org:2206",
    TEST_TRANSFER_TOKEN: "0x72d587b34f7d21fbc47d55fa3d2c2609d4f25698",
    TEST_TRANSFER_TO: "0xa5ABB97A2540E4A4756E33f93fB2D7987668396a",
    ORACLE_PRICE_CONTRACT: "0x360B0a3f9Fc28Eb2426fa2391Fd2eB13912E1e40",
    RPC_PROVIDER: "https://mainnet.gateway.tenderly.co",
  },

  // TODO: Minato no longer works so we comment out in this, will add it back it eventually
  // minato: {
  //   AP_AVS_RPC: "aggregator-minato.avaprotocol.org:2306",
  //   // https://explorer-testnet.soneium.org/token/0xBA33747043d09868946978Dd935130490a083458?tab=contract
  //   // anyone can mint this token for testing transfer it
  //   TEST_TRANSFER_TOKEN: "0xBA33747043d09868946978Dd935130490a083458",
  //   // Can be any arbitrary address to demonstrate that this address will receive the token above
  //   TEST_TRANSFER_TO: "0xa5ABB97A2540E4A4756E33f93fB2D7987668396a",
  //   ORACLE_PRICE_CONTRACT: "0x0ee7f0f7796Bd98c0E68107c42b21F5B7C13bcA9",
  //   RPC_PROVIDER: "https://rpc.minato.soneium.org",
  // },
};

// Initialize SDK
console.log("Current environment is: ", env);
if (!config[env as keyof typeof config]) {
  throw new Error(`Environment ${env} not found`);
}

const client = new Client({
  endpoint: config[env as keyof typeof config].AP_AVS_RPC,
});

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
  console.log("🚀 ~ message:", message);
  const signature = await wallet.signMessage(message);
  console.log("🚀 ~ signature:", { signature, ...keyRequestParams });

  return { signature, ...keyRequestParams };
}

async function generateApiToken() {
  const signature = await generateSignature(privateKey as string);
  const result = await client.authWithSignature(signature);
  client.setAuthKey(result.authKey);

  return result;
}

async function signMessageWithEthers(wallet, message: string) {
  const signature = await wallet.signMessage(message);
  return signature;
}

async function listTask(owner: string, token: string) {
  const opts = {
    cursor: process.argv[5] || "",
    limit: parseInt(process.argv[4]) || DEFAULT_PAGE_LIMIT,
    authKey: token,
  };

  const input = process.argv[3];

  let params = [];

  if (_.isEmpty(input)) {
    console.log(
      "process.argv[3] is empty, fetching all wallet addresses as params ..."
    );
    const wallets = await getWallets(owner, token);
    params = _.map(wallets, (wallet: any) => wallet.address);

    // If after fetching smart wallets the params is still empty, return early
    // Otherwise, AVS returns Error: 3 INVALID_ARGUMENT: Missing smart_wallet_address
    if (_.isEmpty(params)) {
      console.log("No addresses provided, returning early ...");
      console.log("Run create-wallet to create a smart wallet first ...");
      return;
    }
  } else {
    params = _.split(input, ",");
  }

  const result = await client.getWorkflows(params, opts);

  console.log(`List tasks with param`, opts);
  console.log(
    `Found ${result.result.length} tasks created by`,
    process.argv[3]
  );

  for (const item of result.result) {
    console.log(util.inspect(item, { depth: 4, colors: true }));
  }
  console.log(
    util.inspect(
      { cursor: result.cursor, hasMore: result.hasMore, limit: opts.limit },
      { depth: 4, colors: true }
    )
  );
}

async function getTask(owner, token, taskId) {
  const result = await client.getWorkflow(taskId, {
    authKey: token,
  });

  console.log(util.inspect(result, { depth: 4, colors: true }));
}

async function listExecutions(owner, token, ids) {
  const result = await client.getExecutions(ids.split(","), {
    authKey: token,
    cursor: process.argv[4] || "",
    itemPerPage: 200,
  });

  console.log(util.inspect(result, { depth: 4, colors: true }));
}

async function getExecution(owner, token, taskId, execId) {
  const result = await client.getExecution(taskId, execId, { authKey: token });

  console.log(util.inspect(result, { depth: 4, colors: true }));
}

async function cancel(owner, token, taskId) {
  const result = await client.cancelWorkflow(taskId, { authKey: token });

  console.log("Response:\n", result);
}

async function deleteTask(owner, token, taskId) {
  const result = await client.deleteWorkflow(taskId, { authKey: token });

  console.log("Response:\n", result);
}

async function triggerTask(owner, token, taskId, triggerMetadata) {
  const metadata = JSON.parse(triggerMetadata);

  const result = await client.triggerWorkflow(
    {
      id: taskId,
      data: new TriggerMetadata({
        type: TriggerType.Event,
        blockNumber: metadata["block_number"],
        logIndex: metadata["log_index"],
        txHash: metadata["tx_hash"],
      }),
      isBlocking: true,
    },
    {
      authKey: token,
    }
  );

  console.log("request", { taskId: taskId, triggerMetadata });
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

  console.log("getWallets response:\n", walletsResp);

  if (shouldFetchBalances) {
    console.log("Fetching balances from RPC provider ...");
    // Update the provider creation
    const provider = new ethers.JsonRpcProvider(config[env].RPC_PROVIDER);

    // Get token balance
    const tokenAddress = config[env].TEST_TRANSFER_TOKEN;
    const tokenAbi = [
      "function balanceOf(address account) view returns (uint256)",
      "function decimals() view returns (uint8)",
      "function symbol() view returns (string)",
    ];
    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);

    let wallets = [];
    for (const wallet of walletsResp) {
      const balance = await provider.getBalance(wallet.address);
      const balanceInEth = _.floor(ethers.formatEther(balance), 2);

      const tokenBalance = await tokenContract.balanceOf(wallet.address);

      const tokenDecimals = await tokenContract.decimals();
      const tokenSymbol = await tokenContract.symbol();
      const tokenBalanceFormatted = _.floor(
        ethers.formatUnits(tokenBalance, tokenDecimals),
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
    config[env].TEST_TRANSFER_TO,
    ethers.parseUnits("12", 18),
  ]);
}

function getTaskDataQuery(owner) {
  let ABI = ["function retrieve(address addr) public view returns (uint256)"];
  let iface = new ethers.Interface(ABI);
  return iface.encodeFunctionData("retrieve", [owner]);
}

async function createSecret(
  owner: string,
  token: string,
  name: string,
  secret: string
) {
  const result = await client.createSecret(new Secret({ name, secret }), {
    authKey: token,
  });

  console.log(
    "Created secret:",
    util.inspect(result, { depth: 4, colors: true })
  );
}

async function listSecrets(owner: string, token: string) {
  const result = await client.listSecrets(
    {},
    {
      authKey: token,
    }
  );

  console.log("Secrets:", util.inspect(result, { depth: 4, colors: true }));
}

// Schedule a simple job that get price of an asset and post it to a webhook
async function schedulePriceReport(owner: string, token: string) {
  const taskBody = getTaskData();
  const smartWalletAddress = process.argv[3];
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

  const workflow = client.createWorkflow({
    name: `price report every 5 blocks`,
    smartWalletAddress,
    nodes: NodeFactory.createNodes([
      {
        id: nodeIdOraclePrice,
        name: "checkPrice",
        type: NodeType.ContractRead,
        data: {
          contractAddress:
            config[env as keyof typeof config].ORACLE_PRICE_CONTRACT,
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
          // Show case how we're posting to a webhook, you can then go to browser at https://webhook.site/#!/view/51e02e34-e8db-47b0-ba28-ae38fd895478 to inspect the payload that we push
          url: "https://webhook.site/51e02e34-e8db-47b0-ba28-ae38fd895478",
          method: "POST",
          body: `The latest price is \${checkPrice.data.answer}`,
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
    maxExecution: 0, // unlimited run
  });

  const workflowId = await client.submitWorkflow(workflow, {
    authKey: token,
  });

  console.log("create task", workflowId);
}

// setup a task to monitor in/out transfer for a wallet and send notification
async function scheduleTelegram(
  owner: string,
  token: string
) {
  console.log("schedule a dummy telegram message");
  const wallets = await getWallets(owner, token);
  if (_.isEmpty(wallets)) {
    console.log("please create at least one wallet. this example will then auto pick the first wallet to schedule the test");
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
          body: `{
            "chat_id":-4609037622,
            "text": "Hello world, you can use use js in this block {{ new Date() }}."
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
        interval: 10,
      },
    }),
    startAt: Math.floor(Date.now() / 1000) + 30,
    expiredAt: Math.floor(Date.now() / 1000 + 3600 * 24 * 30),
    maxExecution: 0, // unlimited run
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
    console.log("please create at least one wallet. this example will then auto pick the first wallet to schedule the test");
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
              expression: `
                demoTriggerName.data.address == "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238" && Number(demoTriggerName.data.value_formatted) > 1
              `,
            },
          ],
        },
      },
      {
        id: nodeIdNotification,
        name: "notification",
        type: NodeType.RestAPI,
        data: {
          url: "https://api.telegram.org/bot{{apContext.configVars.ap_notify_bot_token}}/sendMessage?parse_mode=Markdown",
          method: "POST",
          // Update the chat id according to your own telegram bot
          body: `{
            "chat_id":-4609037622,
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
            value: [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "",
              "0x06DBb141d8275d9eDb8a7446F037D20E215188ff",
            ],
          },
        ],
      },
    }),
    startAt: Math.floor(Date.now() / 1000) + 30,
    expiredAt: Math.floor(Date.now() / 1000 + 3600 * 24 * 30),
    maxExecution: 0, // unlimited run
  });

  const workflowId = await client.submitWorkflow(workflow, {
    authKey: token,
  });

  console.log("create task", workflowId);

  return workflowId;
}

const main = async (cmd: string) => {
  const result = await generateApiToken();
  const owner = result.address; // this is the address extract from private key
  const token = result.authKey;

  switch (cmd) {
    case "wallet":
      await getWallets(owner, token);
      break;
    case "create-wallet":
      const salt = process.argv[3] || 0;
      let smartWalletAddress = await createWallet(
        owner,
        token,
        salt,
        process.argv[4]
      );
      console.log(
        `A new smart wallet with salt ${salt} is created for ${owner}:\nResponse:\n`,
        smartWalletAddress
      );
      break;
    case "schedule-monitor":
      scheduleMonitorTransfer(owner, token, process.argv[3]);
      break;
    case "schedule-telegram":
      scheduleTelegram(owner, token);
    case "schedule":
    case "schedule-cron":
    case "schedule-fixed":
    case "schedule-manual":
      const resultSchedule = await schedulePriceReport(owner, token);
      break;

    case "tasks":
      await listTask(owner, token);
      break;

    case "get":
      await getTask(owner, token, process.argv[3]);
      break;

    case "executions":
      await listExecutions(owner, token, process.argv[3]);
      break;
    case "execution":
      await getExecution(owner, token, process.argv[3], process.argv[4]);
      break;
    case "cancel":
      await cancel(owner, token, process.argv[3]);
      break;
    case "delete":
      await deleteTask(owner, token, process.argv[3]);
      break;

    case "gen-task-data":
      console.log("pack contract call", getTaskDataQuery(owner));
      break;

    case "trigger":
      await triggerTask(owner, token, process.argv[3], process.argv[4]);
      break;

    case "create-secret":
      await createSecret(owner, token, process.argv[3], process.argv[4]);
      break;
    case "list-secrets":
      await listSecrets(owner, token);
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
      trigger <task-id> <trigger-metadata>:               manually trigger a task. Example:
                                                            trigger abcdef '{"block_number":1234}' for blog trigger
                                                            trigger abcdef '{"block_number":1234, "log_index":312,"tx_hash":"0x123"}' for event trigger
                                                            trigger abcdef '{"epoch":1234, "log_index":312,"tx_hash":"0x123"}' for time based trigger (fixed or cron)
      cancel <task-id>:                                   to cancel a task
      delete <task-id>:                                   to completely remove a task
      create-secret name value:                           create a user secret that is available to all task
      list-secrets name value:                            create a user secret that is available to all task
      gen-task-data:                                      generate a task data for a contract call
      `);
  }
};

(async () => {
  main(process.argv[2]);
})();
