// Define the environment type
export type Environment = "production" | "development" | "staging";

export interface KeyExchangeResp {
  key: string;
}

export interface ClientOption {
  privateKey?: string;
  jwtApiKey?: string;
  env?: Environment;
  owner?: string;
}

export interface TaskResp {
  id: string;
  status: string;
  result?: any;
  error?: string;
}

export interface TaskListResp {
  tasks: TaskResp[];
}

export interface SmartWalletResp {
  address: string;
  smart_account_address: string;
}

export interface TransactionResp {
  hash: string;
}

export interface BalanceResp {
  balance: string;
}
