import { cleanEnv, str, makeValidator } from "envalid";
import dotenv from "dotenv";

// Define allowed environment values
const ALLOWED_ENVIRONMENTS = [
  "dev",
  "sepolia",
  "ethereum",
  "base-sepolia",
  "base",
] as const;
type Environment = (typeof ALLOWED_ENVIRONMENTS)[number];

// Smart wallet factory address is the same for all chain
const FACTORY_ADDRESS = "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834";

// Environment-specific configurations
const ENV_CONFIGS = {
  dev: {
    avsEndpoint: "localhost:2206",
    chainId: "11155111",
  },
  sepolia: {
    avsEndpoint: "aggregator-sepolia.avaprotocol.org:2206",
    chainId: "11155111",
  },
  "base-sepolia": {
    avsEndpoint: "aggregator-base-sepolia.avaprotocol.org:3206",
    chainId: "84532",
  },
  ethereum: {
    avsEndpoint: "aggregator.avaprotocol.org:2206",
    chainId: "1",
  },
  base: {
    avsEndpoint: "aggregator-base.avaprotocol.org:3206",
    chainId: "8453",
  },
} as const;

// 1. Load base .env file first (for common variables like TEST_PRIVATE_KEY)
dotenv.config();

// 2. Then load environment-specific .env file if TEST_ENV is set
if (process.env.TEST_ENV) {
  dotenv.config({ path: `.env.${process.env.TEST_ENV}`, override: true });
}

// Define the config type
type Config = {
  avsEndpoint: string;
  avsApiKey: string;
  chainEndpoint: string;
  chainId: string;
  walletPrivateKey: string;
  environment: Environment;
  factoryAddress: string;
};

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
    TEST_ENV: environmentValidator({ desc: "Test environment" }),
  }
);

// Get the environment-specific configuration
const envConfig = ENV_CONFIGS[validatedEnv.TEST_ENV];

// Export the configuration
export const getConfig = () => ({
  avsEndpoint: envConfig.avsEndpoint,
  avsApiKey: validatedEnv.AVS_API_KEY,
  chainId: envConfig.chainId,
  chainEndpoint: validatedEnv.CHAIN_ENDPOINT,
  walletPrivateKey: validatedEnv.TEST_PRIVATE_KEY,
  factoryAddress: FACTORY_ADDRESS,
  environment: validatedEnv.TEST_ENV,
});

// Export the environment for use in other files
export const getEnvironment = () => validatedEnv.TEST_ENV;

// Export the validation function for use in other files
export const validateEnv = () => validatedEnv;
