const _ = require("lodash");
const { default: Client, getKeyRequestMessage } = require("../dist/index.js");
const { ethers } = require("ethers");
const dotenv = require("dotenv");

// Update the dotenv configuration - modified to work with require
dotenv.config({ path: require("path").resolve(__dirname, "../.env.test") });

const {
  TEST_JWT_TOKEN,
  TEST_PRIVATE_KEY,
  TOKEN_CONTRACT,
  ORACLE_CONTRACT,
  ENDPOINT,
} = process.env;

const EXPIRED_AT = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
// Get wallet address from private key
async function getAddress(privateKey) {
  const wallet = new ethers.Wallet(privateKey);
  return wallet.address;
}

// Generate a signed message from a private key
async function generateSignature(privateKey, expiredAt) {
  const wallet = new ethers.Wallet(privateKey);
  const message = getKeyRequestMessage(wallet.address, expiredAt);

  // console.log("Signing message:", message, "Expired at:", expiredAt);

  const signature = await wallet.signMessage(message);

  return signature;
}

(async () => {
  const client = new Client({ endpoint: ENDPOINT });

  const address = await getAddress(TEST_PRIVATE_KEY);
  
  console.log("Get wallet address:", address);
  
  const signature = await generateSignature(TEST_PRIVATE_KEY, EXPIRED_AT);

  const authResponse = await client.authWithSignature(
    address,
    signature,
    EXPIRED_AT
  );

  console.log("Authenticated with signature, jwtToken:", authResponse.jwtToken);

  let taskCondition = "";

  switch (process.argv[2]) {
    case "schedule":
      // ETH-USD pair on sepolia
      // https://sepolia.etherscan.io/address/0x694AA1769357215DE4FAC081bf1f309aDC325306#code
      // The price return is big.Int so we have to use the cmp function to compare
      taskCondition = `
      bigCmp(
        priceChainlink("${config[env].ORACLE_PRICE_CONTRACT}"),
        toBigInt("10000")
      ) > 0`;
      await scheduleERC20TransferJob(owner, token, taskCondition);
      break;

    case "schedule2":
      taskCondition = `bigCmp(
      priceChainlink("${config[env].ORACLE_PRICE_CONTRACT}"),
      toBigInt("99228171987813")) > 0`;
      await scheduleERC20TransferJob(owner, token, taskCondition);
      break;

    case "schedule-generic":
      // https://sepolia.etherscan.io/address/0x9aCb42Ac07C72cFc29Cd95d9DEaC807E93ada1F6#writeContract
      // This is a demo contract where we have a map of address -> number
      // we can set the value to demo that the task is trigger when the number
      // match a condition
      // When matching an arbitrary contract, the user need to provide the ABI
      // for the function they call so our task engine can unpack the result
      taskCondition = `
        bigCmp(
          readContractData(
            // Target contract address
            "0x9aCb42Ac07C72cFc29Cd95d9DEaC807E93ada1F6",
            // encoded call data for retrieve method, check getTaskDataQuery to
            // see how to generate this
            "0x0a79309b000000000000000000000000e272b72e51a5bf8cb720fc6d6df164a4d5e321c5",
            // Method call and ABI are needed so the engine can parse the result
            "retrieve",
            '[{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'
          )[0],
          toBigInt("2000")
        ) > 0`;
      await scheduleERC20TransferJob(owner, token, taskCondition);
      break;

    case "tasks":
      const tasksResponse = await client.listTasks(address);
      console.log("Retrieved tasks:\n", tasksResponse.tasks);
      break;

    case "get":
      const getResponse = await client.getTask(process.argv[3]);
      console.log(`Retrieved task details for ${process.argv[3]}:\n`, getResponse);
      break;

    case "cancel":
      const cancelResponse = await client.cancelTask(process.argv[3]);
      
      console.log(
        `Canceled task ${process.argv[3]} with response:\n`,
        cancelResponse
      );

      break;
    case "delete":
      const deleteResponse = await client.deleteTask(process.argv[3]);
      console.log(
        `Deleted task ${process.argv[3]} with response:\n`,
        deleteResponse
      );
      break;

    case "wallet":
      const walletResponse = await client.getAddresses(address);
      console.log(`Retrieved smart wallet address:\n`, walletResponse);
      break;

    case "genTaskData":
      console.log("pack contract call", getTaskDataQuery(owner));
      break;

    case "time-schedule":
      await scheduleTimeTransfer(owner, token);
      break;

    default:
      console.log(`Usage:

      wallet:           to find smart wallet address for this eoa
      tasks:            to find all tasks
      get <task-id>:    to get task detail
      schedule:         to schedule a task with chainlink eth-usd its condition will be matched quickly
      schedule2:        to schedule a task with chainlink that has a very high price target
      schedule-generic: to schedule a task with an arbitrary contract query
      cancel <task-id>: to cancel a task
      delete <task-id>: to completely remove a task`);
  }
})();

function getTaskData() {
  let ABI = ["function transfer(address to, uint amount)"];
  let iface = new ethers.Interface(ABI);
  return iface.encodeFunctionData("transfer", [
    TOKEN_CONTRACT,
    ethers.parseUnits("12", 18),
  ]);
}

function getTaskDataQuery(owner) {
  let ABI = ["function retrieve(address addr) public view returns (uint256)"];
  let iface = new ethers.Interface(ABI);
  return iface.encodeFunctionData("retrieve", [owner]);
}

async function scheduleERC20TransferJob(owner, token, taskCondition) {
  // Now we can schedule a task
  // 1. Generate the calldata to check condition
  const taskBody = getTaskData();
  console.log("\n\nTask body:", taskBody);

  console.log("\n\nTask condition:", taskCondition);

  const metadata = new grpc.Metadata();
  metadata.add("authkey", token);

  console.log("Trigger type", TriggerType.EXPRESSIONTRIGGER);

  const result = await asyncRPC(
    client,
    "CreateTask",
    {
      actions: [
        {
          task_type: TaskType.CONTRACTEXECUTIONTASK,
          // id need to be unique
          id: "transfer_erc20_1",
          // name is for our note only
          name: "Transfer Test Token",
          contract_execution: {
            // Our ERC20 test token
            contract_address: config[env].TEST_TRANSFER_TOKEN,
            call_data: taskBody,
          },
        },
      ],
      trigger: {
        trigger_type: TriggerType.EXPRESSIONTRIGGER,
        expression: {
          expression: taskCondition,
        },
      },
      start_at: Math.floor(Date.now() / 1000) + 30,
      expired_at: Math.floor(Date.now() / 1000 + 3600 * 24 * 30),
      memo: `Demo Example task for ${owner}`,
    },
    metadata
  );

  console.log("Expression Task ID is:", result);
}

async function scheduleTimeTransfer(owner, token) {
  // Now we can schedule a task
  // 1. Generate the calldata to check condition
  const taskBody = getTaskData();
  console.log("\n\nTask body:", taskBody);
  console.log("\n\nTask condition: Timeschedule", "*/2");

  const metadata = new grpc.Metadata();
  metadata.add("authkey", token);

  console.log("Trigger type", TriggerType.TIMETRIGGER);

  const result = await asyncRPC(
    client,
    "CreateTask",
    {
      // A contract execution will be perform for this taks
      task_type: TaskType.CONTRACTEXECUTIONTASK,

      actions: [
        {
          contract_execution: {
            // Our ERC20 test token deploy on sepolia
            // https://sepolia.etherscan.io/token/0x69256ca54e6296e460dec7b29b7dcd97b81a3d55#code
            contract_address: config[env].TEST_TRANSFER_TOKEN,
            call_data: taskBody,
          },
        },
      ],
      trigger: {
        trigger_type: TriggerType.TIMETRIGGER,
        schedule: {
          cron: "*/2 * * * *",
        },
      },

      start_at: Math.floor(Date.now() / 1000) + 30,
      expired_at: Math.floor(Date.now() / 1000 + 3600 * 24 * 30),
      memo: `Demo Example task for ${owner}`,
    },
    metadata
  );

  console.log("Expression Task ID is:", result);
}
