// Define the environment type
import * as avs_pb from "../grpc_codegen/avs_pb";
export type Environment = "production" | "development" | "staging";

export const AUTH_KEY_HEADER = "authkey";

export interface RequestOptions {
  authKey: string;
}

export interface GetKeyResponse {
  authKey: string;
}

export interface ClientOption {
  endpoint: string;
}

export type SmartWallet = avs_pb.SmartWallet.AsObject;
