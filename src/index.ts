import * as grpc from "@grpc/grpc-js";
import { Metadata } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { DEFAULT_JWT_EXPIRATION, getRpcEndpoint } from "./config";
import { Environment } from "./types";
import { getKeyRequestMessage } from "./auth";
import * as path from "path";

// Load the protobuf definition
const protoPath = path.resolve(__dirname, "grpc_codegen", "avs.proto");
const packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const apProto = protoDescriptor.aggregator;

// Move interfaces to a separate file, e.g., types.ts
import {
  KeyExchangeResp,
  ClientParams,
  TaskResp,
  TaskListResp,
  SmartWalletResp,
} from "./types";

class BaseClient {
  readonly endpoint: string;
  readonly rpcClient;
  // protected owner?: string;
  // readonly opts: ClientParams;
  protected adminToken?: string; // A JWT token for admin operations
  // protected wallet?: any;

  constructor(config: ClientParams) {
    // if (!config.jwtApiKey && !config.owner) {
    //   throw new Error("missing jwtApiKey or owner");
    // }

    this.endpoint = config.endpoint;
    this.rpcClient = new (apProto as any).Aggregator(
      config.endpoint,
      // TODO: switch to the TLS after we're able to update all the operator
      grpc.credentials.createInsecure()
    );

    // this.opts = clientConfig;
    // this.owner = clientConfig.owner ?? undefined;
  }

  async authWithJwtToken(
    address: string,
    jwtToken: string,
    expiredAt?: number
  ): Promise<KeyExchangeResp> {
    console.log("Authenticating with JWT token: ", jwtToken);

    // Use the provided expiredAt or set it to 24 hours from now if not provided
    const expirationTime =
      expiredAt || Math.floor(Date.now() / 1000) + DEFAULT_JWT_EXPIRATION;

    const result: KeyExchangeResp = await this._callRPC<KeyExchangeResp>(
      "GetKey",
      {
        owner: address,
        expired_at: expirationTime,
        signature: jwtToken,
      }
    );

    this.adminToken = result.key;
    return { key: result.key };
  }

  // This flow can be used where the signature is generate from outside, such as in front-end and pass in
  async authWithSignature(
    address: string,
    signature: string,
    expiredAtEpoch: number
  ): Promise<KeyExchangeResp> {
    console.log(
      "Authenticating with signature:",
      signature,
      "Expired at epoch:",
      expiredAtEpoch
    );

    let result = await this._callRPC<KeyExchangeResp>("GetKey", {
      owner: address,
      expired_at: expiredAtEpoch,
      signature,
    });

    this.adminToken = result.key;

    return { key: result.key };
  }

  protected async sendRequest<TResponse, TRequest extends object = {}>(
    method: string,
    request: TRequest = {} as TRequest,
    metadata?: Metadata
  ): Promise<TResponse> {
    if (metadata === undefined) {
      metadata = new grpc.Metadata();
    }

    if (!this.adminToken) {
      throw new Error(
        "Authentication required. Please call authWithJwtToken() or authWithSignature() before making requests."
      );
    }

    metadata.add("adminToken", this.adminToken);

    return this._callRPC<TResponse, TRequest>(method, request, metadata);
  }
  public isAuthenticated(): boolean {
    return !!this.adminToken;
  }

  private _callRPC<TResponse, TRequest extends object = {}>(
    method: string,
    request: TRequest = {} as TRequest,
    metadata: Metadata = new grpc.Metadata()
  ): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      (this.rpcClient as any)[method].bind(this.rpcClient)(
        request,
        metadata,
        (error: any, response: TResponse) => {
          if (error) reject(error);
          else resolve(response);
        }
      );
    });
  }
}

export default class Client extends BaseClient {
  constructor(config: ClientParams) {
    super(config);
  }

  async listTask(): Promise<TaskListResp> {
    return this.sendRequest<TaskListResp>("ListTasks");
  }

  async getSmartWalletAddress(address: string): Promise<SmartWalletResp> {
    const result = await this.sendRequest<SmartWalletResp>(
      "GetSmartAccountAddress",
      { owner: address }
    );
    return result;
  }

  // TODO: generate the type def using protobuf typescriplt gen util
  async getTask(taskId: string): Promise<any> {
    const result = await this.sendRequest("GetTask", { bytes: taskId });
    // Consider removing console.log or using a logger
    return result;
  }
}

// Export types for easier use
export * from "./types";

// Add this line at the end of the file
export { getKeyRequestMessage };
