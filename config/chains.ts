import dotenv from "dotenv";

dotenv.config({ quiet: true });

export type TokenDef = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
};

export type OracleDef = {
  pair: string;
  address: string;
};

export type ChainDef = {
  avsEndpoint: string;
  chainId: string;
  chainEndpoint: string | null;
  explorerApiBaseUrl?: string | null;
  tokens?: Record<string, TokenDef>;
  oracles?: Record<string, OracleDef>;
  rpcUrl?: string;
};

const staticChains: Record<string, Omit<ChainDef, "rpcUrl">> = {
  dev: {
    avsEndpoint: "localhost:2206",
    chainId: "11155111",
    chainEndpoint: null,
    explorerApiBaseUrl: null,
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
      "BTC / USD": { pair: "BTC / USD", address: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43" },
      "ETH / USD": { pair: "ETH / USD", address: "0x694AA1769357215DE4FAC081bf1f309aDC325306" },
    },
  },
  sepolia: {
    avsEndpoint: "aggregator-sepolia.avaprotocol.org:2206",
    chainId: "11155111",
    chainEndpoint: null,
    explorerApiBaseUrl: "https://api-sepolia.etherscan.io/api",
    tokens: {
      USDC: { address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", name: "USD Coin", symbol: "USDC", decimals: 6 },
      LINK: { address: "0x779877a7b0d9e8603169ddbd7836e478b4624789", name: "ChainLink Token", symbol: "LINK", decimals: 18 },
    },
    oracles: { "ETH / USD": { pair: "ETH / USD", address: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419" } },
  },
  "base-sepolia": {
    avsEndpoint: "aggregator-base-sepolia.avaprotocol.org:3206",
    chainId: "84532",
    chainEndpoint: null,
    explorerApiBaseUrl: "https://api-sepolia.basescan.org/api",
    tokens: {},
    oracles: {},
  },
  base: {
    avsEndpoint: "aggregator-base.avaprotocol.org:3206",
    chainId: "8453",
    chainEndpoint: null,
    explorerApiBaseUrl: "https://api.basescan.org/api",
    tokens: {},
    oracles: {},
  },
  ethereum: {
    avsEndpoint: "aggregator.avaprotocol.org:2206",
    chainId: "1",
    chainEndpoint: null,
    explorerApiBaseUrl: "https://api.etherscan.io/api",
    tokens: {},
    oracles: {},
  },
  soneium: {
    avsEndpoint: "aggregator-soneium.avaprotocol.org:2208",
    chainId: "1868",
    chainEndpoint: null,
    explorerApiBaseUrl: "https://soneium.blockscout.com/api",
    tokens: {},
    oracles: {},
  },
  "soneium-minato": {
    avsEndpoint: "aggregator-soneium-minato.avaprotocol.org:2208",
    chainId: "1946",
    chainEndpoint: null,
    explorerApiBaseUrl: "https://soneium.blockscout.com/api",
    tokens: {},
    oracles: {},
  },
  bsc: {
    avsEndpoint: "aggregator-bsc.avaprotocol.org:2209",
    chainId: "56",
    chainEndpoint: null,
    explorerApiBaseUrl: "https://api.bscscan.com/api",
    tokens: {},
    oracles: {},
  },
  "bsc-testnet": {
    avsEndpoint: "aggregator-bsc-testnet.avaprotocol.org:2209",
    chainId: "97",
    chainEndpoint: null,
    explorerApiBaseUrl: "https://api-testnet.bscscan.com/api",
    tokens: {},
    oracles: {},
  },
};

function resolveChainEndpoint(): string | null {
  const generic = process.env.CHAIN_ENDPOINT;
  if (generic && generic.trim()) return generic.trim();
  return null;
}

export function getChains(): Record<string, ChainDef> {
  const out: Record<string, ChainDef> = {};
  for (const [key, value] of Object.entries(staticChains)) {
    const envEndpoint = resolveChainEndpoint();
    const chainEndpoint = value.chainEndpoint || envEndpoint || null;
    out[key] = {
      ...value,
      chainEndpoint,
      rpcUrl: chainEndpoint ? `https://${chainEndpoint}` : undefined,
    };
  }
  return out;
}


