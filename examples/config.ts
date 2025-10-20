import commandLineParser from "command-line-args";
import { getChains } from "../config/chains";
const chains = getChains();

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

type ChainName = keyof typeof chains & string;
export const env: ChainName = ((commandArgs["avs-target"] as string) ||
  "dev") as ChainName;

export const config = Object.keys(chains).reduce(
  (acc, key) => {
    const c = chains[key as ChainName];
    acc[key as ChainName] = {
      AP_AVS_RPC: c.avsEndpoint,
      chainId: c.chainId,
      RPC_PROVIDER: c.rpcUrl,
      TOKENS: c.tokens || {},
      ORACLES: c.oracles || {},
    };
    return acc;
  },
  {} as Record<
    ChainName,
    {
      AP_AVS_RPC: string;
      chainId: string;
      RPC_PROVIDER?: string;
      TOKENS: Record<
        string,
        { address: string; name: string; symbol: string; decimals: number }
      >;
      ORACLES: Record<string, { pair: string; address: string }>;
    }
  >
);

if (!config[env as keyof typeof config]) {
  throw new Error(`Environment ${String(env)} not found`);
}

export function getConfig() {
  return config[env as keyof typeof config];
}

export const currentEnv = env;
