import { cleanEnv, str, makeValidator } from "envalid";
import dotenv from "dotenv";

// Define allowed environment values
const ALLOWED_ENVIRONMENTS = [
  "dev",
  "sepolia",
  "ethereum",
  "base-sepolia",
  "base",
  "soneium",
  "soneium-minato",
  "bsc",
  "bsc-testnet",
] as const;
type Environment = (typeof ALLOWED_ENVIRONMENTS)[number];

type OracleDef = {
  address: string;
  pair: string;
};

// Token configuration types
type TokenDef = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
};

type TokenMap = Record<string, TokenDef>;
type OracleMap = Record<string, OracleDef>;

// Environment-specific configurations (with chain-specific token presets)
export const ENV_CONFIGS: Record<
  Environment,
  {
    avsEndpoint: string;
    chainId: string;
    tokens: TokenMap;
    oracles: OracleMap;
    factoryAddress: string;
  }
> = {
  dev: {
    avsEndpoint: "localhost:2206",
    chainId: "11155111",
    tokens: {
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
    oracles: {
      "BTC / USD": {
        pair: "BTC / USD",
        address: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43",
      },
      "ETH / USD": {
        pair: "ETH / USD",
        address: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
      },
    },
    // From docs/Contract.md Factory Proxy
    factoryAddress: "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834",
  },
  ethereum: {
    avsEndpoint: "aggregator.avaprotocol.org:2206",
    chainId: "1",
    tokens: {},
    oracles: {},
    factoryAddress: "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834",
  },
  sepolia: {
    avsEndpoint: "aggregator-sepolia.avaprotocol.org:2206",
    chainId: "11155111",
    tokens: {
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
    oracles: {},
    factoryAddress: "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834",
  },
  base: {
    avsEndpoint: "aggregator-base.avaprotocol.org:3206", // TODO:Change to 2207
    chainId: "8453",
    tokens: {},
    oracles: {},
    factoryAddress: "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834",
  },
  "base-sepolia": {
    avsEndpoint: "aggregator-base-sepolia.avaprotocol.org:3206", // TODO:Change to 2207
    chainId: "84532",
    tokens: {},
    oracles: {},
    factoryAddress: "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834",
  },
  soneium: {
    avsEndpoint: "aggregator-soneium.avaprotocol.org:2208",
    chainId: "1868",
    tokens: {},
    oracles: {},
    factoryAddress: "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834",
  },
  "soneium-minato": {
    avsEndpoint: "aggregator-soneium-minato.avaprotocol.org:2208",
    chainId: "1946",
    tokens: {},
    oracles: {},
    factoryAddress: "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834",
  },
  bsc: {
    avsEndpoint: "aggregator-bsc.avaprotocol.org:2209",
    chainId: "56",
    tokens: {},
    oracles: {},
    factoryAddress: "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834",
  },
  "bsc-testnet": {
    avsEndpoint: "aggregator-bsc-testnet.avaprotocol.org:2209",
    chainId: "97",
    tokens: {},
    oracles: {},
    factoryAddress: "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834",
  },
} as const;

// 1. Load base .env file first (for common variables like TEST_PRIVATE_KEY)
dotenv.config();

// 2. Then load environment-specific .env file if TEST_ENV is set
if (process.env.TEST_ENV) {
  dotenv.config({ path: `.env.${process.env.TEST_ENV}`, override: true });
}

// Define the config type
// NOTE: Config type was unused; removed to satisfy linter

// Create a custom validator for private key
const privateKeyValidator = makeValidator((privateKey) => {
  if (!privateKey || !privateKey.startsWith("0x") || privateKey.length !== 66) {
    throw new Error(
      "TEST_PRIVATE_KEY must be a valid Ethereum private key (0x-prefixed, 64 hex chars)"
    );
  }
  return privateKey;
});

// Custom validator for environment
const environmentValidator = makeValidator<Environment>((environment) => {
  if (!ALLOWED_ENVIRONMENTS.includes(environment as Environment)) {
    throw new Error(`Expected one of: ${ALLOWED_ENVIRONMENTS.join(", ")}`);
  }
  return environment as Environment;
});

// Get the environment from command line or default to dev
const env = process.env.TEST_ENV || "dev";

// Validate the environment
const validatedEnv = cleanEnv(
  {
    AVS_API_KEY: process.env.AVS_API_KEY,
    CHAIN_ENDPOINT: process.env.CHAIN_ENDPOINT,
    TEST_PRIVATE_KEY: process.env.TEST_PRIVATE_KEY,
    TEST_ENV: env,
  },
  {
    AVS_API_KEY: str({ desc: "AVS API Key" }),
    CHAIN_ENDPOINT: str({ desc: "Chain RPC Endpoint" }),
    TEST_PRIVATE_KEY: privateKeyValidator({ desc: "Wallet Private Key" }),
    TEST_ENV: environmentValidator({
      desc: "Test environment",
      default: "dev",
    }),
  }
);

// Get the environment-specific configuration
const envConfig = ENV_CONFIGS[validatedEnv.TEST_ENV];

// Export the configuration
export const getConfig = () => ({
  avsEndpoint: envConfig.avsEndpoint,
  avsApiKey: validatedEnv.AVS_API_KEY,
  chainId: envConfig.chainId,
  chainEndpoint: `https://${validatedEnv.CHAIN_ENDPOINT}`,
  walletPrivateKey: validatedEnv.TEST_PRIVATE_KEY,
  // factoryAddress: FACTORY_ADDRESS, // Let aggregator use its default factory
  environment: validatedEnv.TEST_ENV,
  tokens: envConfig.tokens,
  oracles: envConfig.oracles,
  factoryAddress: envConfig.factoryAddress,
});

// Export the environment for use in other files
export const getEnvironment = () => validatedEnv.TEST_ENV;

// Export the validation function for use in other files
export const validateEnv = () => validatedEnv;
