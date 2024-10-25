import * as grpc from "@grpc/grpc-js";
import { Metadata } from "@grpc/grpc-js";
import { DEFAULT_JWT_EXPIRATION, getRpcEndpoint } from "./config";
import { Environment } from "./types";
import { getKeyRequestMessage } from "./auth";
import { AggregatorClient } from "../grpc_codegen/avs_grpc_pb";
import { AddressRequest, AddressResp, GetKeyReq, KeyResp, ListTasksReq, Task, UUID } from "../grpc_codegen/avs_pb";

// Load the protobuf definition
// const protoPath = path.resolve(__dirname, "grpc_codegen", "avs.proto");
// const packageDefinition = protoLoader.loadSync(protoPath, {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
// });

// const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// const apProto = protoDescriptor.aggregator;

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
  readonly rpcClient: AggregatorClient;
  // protected owner?: string;
  // readonly opts: ClientParams;
  protected adminToken?: string; // A JWT token for admin operations
  // protected wallet?: any;

  constructor(config: ClientParams) {
    // if (!config.jwtApiKey && !config.owner) {
    //   throw new Error("missing jwtApiKey or owner");
    // }

    this.endpoint = config.endpoint;
    this.rpcClient = new AggregatorClient(
      config.endpoint,
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

    const expirationTime =
      expiredAt || Math.floor(Date.now() / 1000) + DEFAULT_JWT_EXPIRATION;

    const method = this.rpcClient.getKey.bind(this.rpcClient) as (
      request: GetKeyReq,
      metadata: Metadata | undefined,
      callback: (error: grpc.ServiceError | null, response: KeyResp) => void
    ) => grpc.ClientUnaryCall;

    const request = new GetKeyReq()
      .setOwner(address)
      .setExpiredAt(expirationTime)
      .setSignature(jwtToken);

    const response = await this._callRPC<KeyResp, GetKeyReq>(method, request);

    console.log("response:", response.getKey());
    return { key: response.getKey() };
  }

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

    const method = this.rpcClient.getKey.bind(this.rpcClient) as (
      request: GetKeyReq,
      metadata: Metadata | undefined,
      callback: (error: grpc.ServiceError | null, response: KeyResp) => void
    ) => grpc.ClientUnaryCall;

    const request = new GetKeyReq()
      .setOwner(address)
      .setExpiredAt(expiredAtEpoch)
      .setSignature(signature);

    const response = await this._callRPC<KeyResp, GetKeyReq>(method, request);

    console.log("response:", response.getKey());
    return { key: response.getKey() };
  }

  // protected async sendRequest<TResponse, TRequest extends object = {}>(
  //   method: string,
  //   request: TRequest = {} as TRequest,
  //   metadata?: Metadata
  // ): Promise<TResponse> {
  //   if (metadata === undefined) {
  //     metadata = new grpc.Metadata();
  //   }

  //   if (!this.adminToken) {
  //     throw new Error(
  //       "Authentication required. Please call authWithJwtToken() or authWithSignature() before making requests."
  //     );
  //   }

  //   metadata.add("adminToken", this.adminToken);

  //   return this._callRPC<TResponse, TRequest>(
  //     method as (
  //       request: TRequest,
  //       metadata: grpc.Metadata | undefined,
  //       callback: (error: grpc.ServiceError | null, response: TResponse) => void
  //     ),
  //     request,
  //     metadata
  //   );
  // }

  public isAuthenticated(): boolean {
    return !!this.adminToken;
  }

  protected _callRPC<TResponse, TRequest extends object = {}>(
    method: (
      request: TRequest,
      metadata: grpc.Metadata | undefined,
      callback: (error: grpc.ServiceError | null, response: TResponse) => void
    ) => grpc.ClientUnaryCall,
    request: TRequest,
    metadata?: grpc.Metadata
  ): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      method(
        request,
        metadata,
        (error: grpc.ServiceError | null, response: TResponse) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
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
    console.log("Listing tasks");

    const method = this.rpcClient.listTasks.bind(this.rpcClient) as (
      request: ListTasksReq,
      metadata: Metadata | undefined,
      callback: (
        error: grpc.ServiceError | null,
        response: TaskListResp
      ) => void
    ) => grpc.ClientUnaryCall;

    const request = new ListTasksReq();

    const response = await this._callRPC<TaskListResp, ListTasksReq>(
      method,
      request
    );

    console.log("response:", response);
    return response;
  }

  async getSmartWalletAddress(address: string): Promise<SmartWalletResp> {
    const method = this.rpcClient.getSmartAccountAddress.bind(this.rpcClient) as (
      request: AddressRequest,
      metadata: Metadata | undefined,
      callback: (error: grpc.ServiceError | null, response: AddressResp) => void
    ) => grpc.ClientUnaryCall;

    const request = new AddressRequest().setOwner(address);
    const response = await this._callRPC<AddressResp, AddressRequest>(
      method,
      request
    );

    return response;
  }

  // TODO: generate the type def using protobuf typescriplt gen util
  async getTask(taskId: string): Promise<any> {
      const method = this.rpcClient.getTask.bind(this.rpcClient) as (
        request: UUID,
      metadata: Metadata | undefined,
      callback: (error: grpc.ServiceError | null, response: Task) => void
    ) => grpc.ClientUnaryCall;

    const request = new UUID().setUuid(taskId);
    const response = await this._callRPC<Task, UUID>(method, request);
    return response;
  }
}

// Export types for easier use
export * from "./types";

// Add this line at the end of the file
export { getKeyRequestMessage };
