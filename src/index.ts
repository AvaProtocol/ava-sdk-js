import * as grpc from "@grpc/grpc-js";
import { Metadata } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { getRpcEndpoint } from "./config";
import { getKeyRequestMessage } from "./auth";

// Load the protobuf definition
const packageDefinition = protoLoader.loadSync("./grpc_codegen/avs.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const apProto = protoDescriptor.aggregator;

// Move interfaces to a separate file, e.g., types.ts
import { KeyExchangeResp, ClientOption, TaskResp, TaskListResp, SmartWalletResp } from './types';

class BaseClient {
  readonly env: string;
  readonly rpcClient;
  readonly owner?: string;
  readonly opts: ClientOption;
  private authkey?: string;

  constructor(opts: ClientOption) {
    if (!opts.privateKey && !opts.jwtApiKey) {
      throw new Error("missing private key or apikey");
    }

    if (!opts.privateKey && !opts.owner) {
      throw new Error("missing owner");
    }

    this.env = opts.env || "production";
    this.rpcClient = new (apProto as any).Aggregator(
      getRpcEndpoint(this.env),
      // TODO: switch to the TLS after we're able to update all the operator
      grpc.credentials.createInsecure()
    );

    this.opts = opts;
    // Use optional chaining for cleaner code
    this.owner = opts.owner ?? undefined;
  }

  async authenticate(): Promise<void> {
    if (this.opts.jwtApiKey) {
      const { key } = await this.authWithJwtKey(this.opts.jwtApiKey);
      this.authkey = key;
    } else if (this.opts.privateKey) {
      // Implement ECDSA authentication here
      // This was missing in the original code
    } else {
      throw new Error("No authentication method provided");
    }
  }

  getKeyRequestMessage(address: string, expiredAt: Date): string {
    return getKeyRequestMessage(address, expiredAt.getTime());
  }

  async authWithJwtKey(signature: string): Promise<KeyExchangeResp> {
    const expiredAt = Math.floor((+new Date() / 3600) * 24);
    let result: KeyExchangeResp = await this._callRPC<KeyExchangeResp>(
      "GetKey",
      {
        owner: this.owner,
        expired_at: expiredAt,
        signature,
      }
    );

    return { key: result.key };
  }

  async authWithECDSAKey(
    address: string,
    signature: string,
    expiredAt: Date
  ): Promise<KeyExchangeResp> {
    const expiredAtUnix = Math.floor((+expiredAt / 3600) * 24);
    let result = await this._callRPC<KeyExchangeResp>("GetKey", {
      owner: address,
      expired_at: expiredAtUnix,
      signature,
    });

    return { key: result.key };
  }

  callRPC<Resp, Req extends object = {}>(
    method: string,
    request: Req = {} as Req,
    metadata?: Metadata
  ): Promise<Resp> {
    if (metadata === undefined) {
      metadata = new grpc.Metadata();
    }

    if (!this.authkey) {
      throw new Error("Not authenticated yet");
    }

    metadata.add("authkey", this.authkey);

    return this._callRPC<Resp, Req>(method, request, metadata);
  }

  private _callRPC<Resp, Req extends object = {}>(
    method: string,
    request: Req = {} as Req,
    metadata: Metadata = new grpc.Metadata()
  ): Promise<Resp> {
    return new Promise((resolve, reject) => {
      (this.rpcClient as any)[method].bind(this.rpcClient)(
        request,
        metadata,
        (error: any, response: Resp) => {
          if (error) reject(error);
          else resolve(response);
        }
      );
    });
  }
}

export default class Client extends BaseClient {
  async listTask(): Promise<TaskListResp> {
    const result = await this.callRPC<TaskListResp>("ListTasks");

    return result;
  }

  async getSmartWalletAddress(): Promise<SmartWalletResp> {
    const result = await this.callRPC<SmartWalletResp>(
      "GetSmartAccountAddress",
      { owner: this.owner }
    );
    return result;
  }

  // TODO: generate the type def using protobuf typescriplt gen util
  async getTask(taskId: string): Promise<any> {
    const result = await this.callRPC("GetTask", { bytes: taskId });
    // Consider removing console.log or using a logger
    return result;
  }
}

// Export types for easier use
export * from './types';
