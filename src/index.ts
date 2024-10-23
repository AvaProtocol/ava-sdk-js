import * as grpc from "@grpc/grpc-js";
import { Metadata } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { getRpcEndpoint } from "./config";
import { Environment } from "./types";
import { getKeyRequestMessage } from "./auth";
import { ethers, Wallet } from "ethers";

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
import {
  KeyExchangeResp,
  ClientOption,
  TaskResp,
  TaskListResp,
  SmartWalletResp,
} from "./types";

class BaseClient {
  readonly env: Environment;
  readonly rpcClient;
  protected owner?: string;
  readonly opts: ClientOption;
  protected authkey?: string;
  protected wallet?: any;

  constructor(opts: ClientOption) {
    if (!opts.privateKey && !opts.jwtApiKey) {
      throw new Error("missing private key or apikey");
    }

    if (!opts.privateKey && !opts.owner) {
      throw new Error("missing owner");
    }

    this.env = opts.env || ("production" as Environment);
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
      // Add '0x' prefix if it's not already present
      const jwtKey = this.opts.jwtApiKey.startsWith('0x') ? this.opts.jwtApiKey : `0x${this.opts.jwtApiKey}`;
      const { key } = await this.authWithJwtKey(jwtKey);
      this.authkey = key;
    } else if (this.opts.privateKey) {
      const { key } = await this.authWithECDSAKey(this.opts.privateKey);
      this.authkey = key;
    } else if (this.opts.presignSignature && this.opts.signatureExpiredAt) {
      const { key } = await this.authWithSignature(this.opts.presignSignature, this.opts.signatureExpiredAt);
      this.authkey = key;
    } else {
      throw new Error("No authentication method provided");
    }
  }

  getKeyRequestMessage(address: string, expiredAt: Date): string {
    return getKeyRequestMessage(address, expiredAt.getTime());
  }

  async authWithJwtKey(signature: string): Promise<KeyExchangeResp> {
    const expiredAt = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // Set expiration to 24 hours from now
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

  async authWithECDSAKey(privateKey: string): Promise<KeyExchangeResp> {
    this.wallet = new Wallet(privateKey);
    this.owner = this.wallet.address;

    const expiredAtEpoch = Math.floor(+new Date() / 3600 * 24);
    const message = `key request for ${this.owner} expired at ${expiredAtEpoch}`;

    let signature = await this.wallet.signMessage(message);
    let result = await this._callRPC<KeyExchangeResp>('GetKey', {
      owner: this.owner,
      expired_at: expiredAtEpoch,
      signature
    })

    return { key: result.key };
  }

  // This flow can be used where the signature is generate from outside, such as in front-end and pass in
  async authWithSignature(signature: string, expiredAtEpoch: number): Promise<KeyExchangeResp> {
    let result = await this._callRPC<KeyExchangeResp>('GetKey', {
      owner: this.owner,
      expired_at: expiredAtEpoch,
      signature
    })

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

    if (!this.authkey) {
      throw new Error("Not authenticated yet");
    }

    metadata.add("authkey", this.authkey);

    return this._callRPC<TResponse, TRequest>(method, request, metadata);
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
  constructor(config: ClientOption) {
    super(config);
  }

  async listTask(): Promise<TaskListResp> {
    return this.sendRequest<TaskListResp>("ListTasks");
  }

  async getSmartWalletAddress(): Promise<SmartWalletResp> {
    const result = await this.sendRequest<SmartWalletResp>(
      "GetSmartAccountAddress",
      { owner: this.owner }
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
