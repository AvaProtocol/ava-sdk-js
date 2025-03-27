import * as commandLineArgs from 'command-line-args';

const cliOptions = commandLineArgs([
  { name: 'avs-target', alias: 't', type: String, defaultValue: 'development' }
], { partial: true });

export const env = cliOptions['avs-target'] || 'development';

export const config = {
  development: {
    AP_AVS_RPC: "localhost:2206",
    TEST_TRANSFER_TOKEN: "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b",
    TEST_TRANSFER_TO: "0xe0f7D11FD714674722d325Cd86062A5F1882E13a",
    ORACLE_PRICE_CONTRACT: "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1",
    RPC_PROVIDER: "https://sepolia.gateway.tenderly.co",
  },

  sepolia: {
    AP_AVS_RPC: "aggregator-sepolia.avaprotocol.org:2206",
    TEST_TRANSFER_TOKEN: "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b",
    TEST_TRANSFER_TO: "0xe0f7D11FD714674722d325Cd86062A5F1882E13a",
    ORACLE_PRICE_CONTRACT: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    RPC_PROVIDER: "https://sepolia.gateway.tenderly.co",
  },

  "base-sepolia": {
    AP_AVS_RPC: "aggregator-base-sepolia.avaprotocol.org:3206",
    TEST_TRANSFER_TOKEN: "0x72d587b34f7d21fbc47d55fa3d2c2609d4f25698",
    TEST_TRANSFER_TO: "0xa5ABB97A2540E4A4756E33f93fB2D7987668396a",
    ORACLE_PRICE_CONTRACT: "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1",
    RPC_PROVIDER: "https://mainnet.gateway.tenderly.co",
  },

  base: {
    AP_AVS_RPC: "aggregator-base.avaprotocol.org:3206",
    TEST_TRANSFER_TOKEN: "0x72d587b34f7d21fbc47d55fa3d2c2609d4f25698",
    TEST_TRANSFER_TO: "0xa5ABB97A2540E4A4756E33f93fB2D7987668396a",
    ORACLE_PRICE_CONTRACT: "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70",
    RPC_PROVIDER: "https://mainnet.gateway.tenderly.co",
  },

  ethereum: {
    AP_AVS_RPC: "aggregator.avaprotocol.org:2206",
    TEST_TRANSFER_TOKEN: "0x72d587b34f7d21fbc47d55fa3d2c2609d4f25698",
    TEST_TRANSFER_TO: "0xa5ABB97A2540E4A4756E33f93fB2D7987668396a",
    ORACLE_PRICE_CONTRACT: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    RPC_PROVIDER: "https://mainnet.gateway.tenderly.co",
  },

};

if (!config[env as keyof typeof config]) {
  throw new Error(`Environment ${env} not found`);
}

export function getConfig() {
  return config[env as keyof typeof config];
}

export const currentEnv = env;
