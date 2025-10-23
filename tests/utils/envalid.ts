import { cleanEnv, str, makeValidator } from "envalid";
import dotenv from "dotenv";
// Use single-source chain config
import { getChains } from "../../config/chains";
const CHAINS = getChains();
const chains = CHAINS as Record<string, {
  avsEndpoint: string;
  chainId: string;
  chainEndpoint: string | null;
  tokens?: TokenMap;
  oracles?: OracleMap;
}>;

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

// Environment-specific configurations derived from shared chains.json
export const ENV_CONFIGS: Record<
  Environment,
  {
    avsEndpoint: string;
    chainId: string;
    chainEndpoint?: string | null;
    tokens: TokenMap;
    oracles: OracleMap;
    paymasterAddress: string;
  }
> = (Object.keys(chains) as Environment[]).reduce((acc, key) => {
  const c = chains[key];
  acc[key] = {
    avsEndpoint: c.avsEndpoint,
    chainId: c.chainId,
    chainEndpoint: c.chainEndpoint,
    tokens: c.tokens || {},
    oracles: c.oracles || {},
    paymasterAddress: "0xd856f532F7C032e6b30d76F19187F25A068D6d92", // Consistent across all chains
  };
  return acc;
}, {} as Record<Environment, {
  avsEndpoint: string;
  chainId: string;
  chainEndpoint?: string | null;
  tokens: TokenMap;
  oracles: OracleMap;
  paymasterAddress: string;
}>);

// 1. Load base .env file first (for common variables like TEST_PRIVATE_KEY)
dotenv.config({ quiet: true });

// 2. Then load environment-specific .env file if TEST_ENV is set
if (process.env.TEST_ENV) {
  dotenv.config({ path: `.env.${process.env.TEST_ENV}`, override: true, quiet: true });
}

// Print environment variables for debugging
const testEnv = process.env.TEST_ENV || "dev";
const tempConfig = chains[testEnv as Environment];
console.log("Test config:", { env: testEnv, chainId: tempConfig?.chainId || "NOT SET", avsEndpoint: tempConfig?.avsEndpoint || "NOT SET", chainEndpoint: tempConfig?.chainEndpoint || "NOT SET" });

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
    TEST_PRIVATE_KEY: process.env.TEST_PRIVATE_KEY,
    TEST_ENV: env,
  },
  {
    AVS_API_KEY: str({ desc: "AVS API Key" }),
    TEST_PRIVATE_KEY: privateKeyValidator({ desc: "Wallet Private Key" }),
    TEST_ENV: environmentValidator({
      desc: "Test environment",
      default: "dev",
    }),
  }
);

// Get the environment-specific configuration
const envConfig = ENV_CONFIGS[validatedEnv.TEST_ENV];
// Resolve chain endpoint host once (prefer config; fallback to env)
const chainEndpointHost = envConfig.chainEndpoint || undefined;

// Fail fast if chain endpoint is missing for the selected environment
if (!chainEndpointHost) {
  throw new Error(
    `Missing CHAIN endpoint for ${validatedEnv.TEST_ENV}. Set CHAIN_ENDPOINT (host only, no scheme).`
  );
}

// Export the configuration
export const getConfig = () => ({
  avsEndpoint: envConfig.avsEndpoint,
  avsApiKey: validatedEnv.AVS_API_KEY,
  chainId: envConfig.chainId,
  chainEndpoint: chainEndpointHost ? `https://${chainEndpointHost}` : undefined,
  walletPrivateKey: validatedEnv.TEST_PRIVATE_KEY,
  // factoryAddress: FACTORY_ADDRESS, // Let aggregator use its default factory
  environment: validatedEnv.TEST_ENV,
  tokens: envConfig.tokens,
  oracles: envConfig.oracles,
  paymasterAddress: envConfig.paymasterAddress,
});

// Export the validation function for use in other files
export const validateEnv = () => validatedEnv;
