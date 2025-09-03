import commandLineParser from "command-line-args";

const optionDefinitions = [
  { name: "command", type: String, defaultOption: true },
  {
    name: "avs-target",
    alias: "t",
    type: String,
    defaultValue: "dev",
  },
  { name: "args", type: String, multiple: true, defaultValue: [] }, // Captures extra arguments like `0`
];

const parsed = commandLineParser(optionDefinitions, {
  stopAtFirstUnknown: true,
});

const argv = process.argv;
const unknownArgsStart = argv.findIndex((arg) => arg === parsed.command) + 1;
const unknownArgs = argv
  .slice(unknownArgsStart)
  .filter((arg) => !arg.startsWith("-"));

export const commandArgs = {
  ...parsed,
  args: unknownArgs,
};

console.log("commandArgs", commandArgs);

export const env = commandArgs["avs-target"] || "dev";

export const config = {
  // The dev environment is the local environment run on your machine. It can be bring up following the instructions in this file https://github.com/AvaProtocol/EigenLayer-AVS/blob/main/docs/dev.md
  dev: {
    AP_AVS_RPC: "localhost:2206",
    chainId: "11155111",
    TEST_TRANSFER_TOKEN: "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b",
    TEST_TRANSFER_TO: "0xe0f7D11FD714674722d325Cd86062A5F1882E13a",
    ORACLE_PRICE_CONTRACT: "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1",
    RPC_PROVIDER: "https://sepolia.gateway.tenderly.co",
    factoryAddress: "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834",
    TOKENS: {
      USDC: {
        address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        name: "USD Coin",
        symbol: "USDC",
        decimals: 6,
      },
      LINK: {
        address: "0x779877a7b0d9e8603169ddbd7836e478b4624789",
        name: "ChainLink Token",
        symbol: "LINK",
        decimals: 18,
      },
    },
    ORACLES: {
      "BTC / USD": { pair: "BTC / USD", address: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43" },
      "ETH / USD": { pair: "ETH / USD", address: "0x694AA1769357215DE4FAC081bf1f309aDC325306" },
    },
  },

  sepolia: {
    AP_AVS_RPC: "aggregator-sepolia.avaprotocol.org:2206",
    chainId: "11155111",
    TEST_TRANSFER_TOKEN: "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b",
    TEST_TRANSFER_TO: "0xe0f7D11FD714674722d325Cd86062A5F1882E13a",
    ORACLE_PRICE_CONTRACT: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    RPC_PROVIDER: "https://sepolia.gateway.tenderly.co",
    factoryAddress: "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834",
    TOKENS: {
      USDC: {
        address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        name: "USD Coin",
        symbol: "USDC",
        decimals: 6,
      },
      LINK: {
        address: "0x779877a7b0d9e8603169ddbd7836e478b4624789",
        name: "ChainLink Token",
        symbol: "LINK",
        decimals: 18,
      },
    },
    ORACLES: {
      "ETH / USD": { pair: "ETH / USD", address: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419" },
    },
  },

  "base-sepolia": {
    AP_AVS_RPC: "aggregator-base-sepolia.avaprotocol.org:3206",
    chainId: "84532",
    TEST_TRANSFER_TOKEN: "0x72d587b34f7d21fbc47d55fa3d2c2609d4f25698",
    TEST_TRANSFER_TO: "0xa5ABB97A2540E4A4756E33f93fB2D7987668396a",
    ORACLE_PRICE_CONTRACT: "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1",
    RPC_PROVIDER: "https://mainnet.gateway.tenderly.co",
    factoryAddress: "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834",
    TOKENS: {},
    ORACLES: {},
  },

  base: {
    AP_AVS_RPC: "aggregator-base.avaprotocol.org:3206",
    chainId: "8453",
    TEST_TRANSFER_TOKEN: "0x72d587b34f7d21fbc47d55fa3d2c2609d4f25698",
    TEST_TRANSFER_TO: "0xa5ABB97A2540E4A4756E33f93fB2D7987668396a",
    ORACLE_PRICE_CONTRACT: "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70",
    RPC_PROVIDER: "https://mainnet.gateway.tenderly.co",
    factoryAddress: "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834",
    TOKENS: {},
    ORACLES: {},
  },

  ethereum: {
    AP_AVS_RPC: "aggregator.avaprotocol.org:2206",
    chainId: "1",
    TEST_TRANSFER_TOKEN: "0x72d587b34f7d21fbc47d55fa3d2c2609d4f25698",
    TEST_TRANSFER_TO: "0xa5ABB97A2540E4A4756E33f93fB2D7987668396a",
    ORACLE_PRICE_CONTRACT: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    RPC_PROVIDER: "https://mainnet.gateway.tenderly.co",
    factoryAddress: "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834",
    TOKENS: {},
    ORACLES: {},
  },

  // Additional chains from the original ENV_CONFIGS
  soneium: {
    AP_AVS_RPC: "aggregator-soneium.avaprotocol.org:2208",
    chainId: "1868",
    TEST_TRANSFER_TOKEN: "0xBA33747043d09868946978Dd935130490a083458",
    TEST_TRANSFER_TO: "0xa5ABB97A2540E4A4756E33f93fB2D7987668396a",
    ORACLE_PRICE_CONTRACT: "0x0ee7f0f7796Bd98c0E68107c42b21F5B7C13bcA9",
    RPC_PROVIDER: "https://rpc.soneium.org",
    factoryAddress: "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834",
    TOKENS: {},
    ORACLES: {},
  },

  "soneium-minato": {
    AP_AVS_RPC: "aggregator-soneium-minato.avaprotocol.org:2208",
    chainId: "1946",
    TEST_TRANSFER_TOKEN: "0xBA33747043d09868946978Dd935130490a083458",
    TEST_TRANSFER_TO: "0xa5ABB97A2540E4A4756E33f93fB2D7987668396a",
    ORACLE_PRICE_CONTRACT: "0x0ee7f0f7796Bd98c0E68107c42b21F5B7C13bcA9",
    RPC_PROVIDER: "https://rpc.minato.soneium.org",
    factoryAddress: "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834",
    TOKENS: {},
    ORACLES: {},
  },

  bsc: {
    AP_AVS_RPC: "aggregator-bsc.avaprotocol.org:2209",
    chainId: "56",
    TEST_TRANSFER_TOKEN: "0x72d587b34f7d21fbc47d55fa3d2c2609d4f25698",
    TEST_TRANSFER_TO: "0xa5ABB97A2540E4A4756E33f93fB2D7987668396a",
    ORACLE_PRICE_CONTRACT: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
    RPC_PROVIDER: "https://bsc-dataseed.binance.org",
    factoryAddress: "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834",
    TOKENS: {},
    ORACLES: {},
  },

  "bsc-testnet": {
    AP_AVS_RPC: "aggregator-bsc-testnet.avaprotocol.org:2209",
    chainId: "97",
    TEST_TRANSFER_TOKEN: "0x72d587b34f7d21fbc47d55fa3d2c2609d4f25698",
    TEST_TRANSFER_TO: "0xa5ABB97A2540E4A4756E33f93fB2D7987668396a",
    ORACLE_PRICE_CONTRACT: "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526",
    RPC_PROVIDER: "https://data-seed-prebsc-1-s1.binance.org:8545",
    factoryAddress: "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834",
    TOKENS: {},
    ORACLES: {},
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

if (!config[env as keyof typeof config]) {
  throw new Error(`Environment ${env} not found`);
}

export function getConfig() {
  return config[env as keyof typeof config];
}

export const currentEnv = env;
