// Define the environment type
export type Environment = "production" | "development" | "staging";

export interface KeyExchangeResp {
  key: string;
}

export interface ClientParams {
  // used primary in backend where owner own the key
  // privateKey?: string;

  // used in automated manner where this key can schedule job on behalf of other user. this jwtApiKey is generated from aggregator CLI. It's a long live key.
  // This currently used in our telegram bot, because the bot can schedule and manage tasks for any user
  // It is just require the user to prove they own the wallet in initial onboarding.
  adminToken?: string;

  // used in front-end app where front-end generate the signature
  // presignSignature?: string;
  // signatureExpiredAt?: number;

  // env?: Environment;
  endpoint: string;
  // owner?: string;
}
export interface TransactionResp {
  hash: string;
}

export interface BalanceResp {
  balance: string;
}
