interface Config {
  AVS_RPC_URL: string
}

export const configs: Record<string, Config> = {
  development: {
    AVS_RPC_URL: process.env.AVS_PROC_URL || 'localhost:2206',
  },

  staging: {
    AVS_RPC_URL: 'aggregator-holesky.avaprotocol.org:2206',
  },

  production: {
    AVS_RPC_URL: 'aggregator.avaprotocol.org:2206',
  },
}

export const getRpcEndpoint = (env: string): string => {
  switch (env) {
    case "staging":
      return configs.staging.AVS_RPC_URL;
    case "development":
      return configs.development.AVS_RPC_URL;
    default:
      return configs.production.AVS_RPC_URL;
  }
}