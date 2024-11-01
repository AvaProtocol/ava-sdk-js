// Define the environment type
export type Environment = "production" | "development" | "staging";

export const AUTH_KEY_HEADER = "authKey";

export interface RequestOptions {
  authKey: string;
}

export interface GetKeyResponse {
  authKey: string;
}

export interface ClientOption {
  // env?: Environment;
  endpoint: string;

  // used in automated manner where this key can schedule job on behalf of other user. this jwtApiKey is generated from aggregator CLI. It's a long live key.
  // This currently used in our telegram bot, because the bot can schedule and manage tasks for any user
  // It is just require the user to prove they own the wallet in initial onboarding.
  jwtApiKey?: string;

  // used in front-end app where front-end generate the signature
  // presignSignature?: string;
  // signatureExpiredAt?: number;

  // env?: Environment;
  // owner?: string;
}

export interface Task {
  id: string;
  status: string;
  result?: any;
  error?: string;
}

export interface CreateTaskResponse {
  id: string;
}

export interface ListTasksResponse {
  tasks: Task[];
}

export interface GetAddressesResponse {
  owner: string;
  smart_account_address: string;
}

export interface TransactionResp {
  hash: string;
}

export interface BalanceResp {
  balance: string;
}
