import { Environment } from "./types";

export const DEFAULT_JWT_EXPIRATION = 24 * 60 * 60; // 24 hours
interface Config {
  endpoint: string;
}

// Define the configs object with typed keys
const configs: Record<Environment, Config> = {
  development: {
    endpoint: process.env.AVS_RPC_URL || "localhost:2206",
  },
  staging: {
    endpoint: "aggregator-holesky.avaprotocol.org:2206",
  },
  production: {
    endpoint: "aggregator.avaprotocol.org:2206",
  },
};

// Function to get RPC endpoint with improved type safety
export function getRpcEndpoint(env: Environment): string {
  return configs[env].endpoint;
}

// Export the configs only
export { configs };
