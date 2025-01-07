import { Environment } from "./types";

export const DEFAULT_JWT_EXPIRATION = 24 * 60 * 60; // 24 hours
interface Config {
  AVS_RPC_URL: string;
}

// Define the configs object with typed keys
const configs: Record<Environment, Config> = {
  development: {
    AVS_RPC_URL: process.env.AVS_RPC_URL || "localhost:2206",
  },
  staging: {
    AVS_RPC_URL: "aggregator-holesky.avaprotocol.org:2206",
  },
  production: {
    AVS_RPC_URL: "aggregator.avaprotocol.org:2206",
  },
};

// Function to get RPC endpoint with improved type safety
export function getRpcEndpoint(env: Environment): string {
  return configs[env].AVS_RPC_URL;
}

// Export the configs only
export { configs };
