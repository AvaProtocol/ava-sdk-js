import * as grpc from "@grpc/grpc-js";
import { Metadata } from "@grpc/grpc-js";
import { DEFAULT_JWT_EXPIRATION, getRpcEndpoint } from "./config";
import { Environment } from "./types";
import { getKeyRequestMessage } from "./auth";
import * as avsGrpcPb from "../grpc_codegen/avs_grpc_pb";
import * as avsPb from "../grpc_codegen/avs_pb";

const AggregatorClient = (avsGrpcPb as any).AggregatorClient;
const metadata = new grpc.Metadata();

// console.log("protoDescriptor:", protoDescriptor);
// console.log("apProto:", apProto);
// console.log("apProto.Aggregator:", (new (apProto as any)).Aggregator));

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
  // protected owner?: string;
  // readonly opts: ClientOption;
  protected authkey?: string;
  protected wallet?: any;

  constructor(opts: ClientOption) {
    // if (!opts.jwtApiKey && !opts.owner) {
    //   throw new Error("missing jwtApiKey or owner");
    // }

    this.env = opts.env || ("production" as Environment);
    this.rpcClient = new AggregatorClient(
      getRpcEndpoint(this.env),
      // TODO: switch to the TLS after we're able to update all the operator
      grpc.credentials.createInsecure()
    );

    console.log("this.rpcClient:", this.rpcClient);

    // this.opts = opts;
    // this.owner = opts.owner ?? undefined;
  }

  // async authWithJwtToken(
  //   address: string,
  //   jwtToken: string,
  //   expiredAt?: number
  // ): Promise<KeyExchangeResp> {
  //   console.log("Authenticating with JWT token: ", jwtToken);

  //   // Use the provided expiredAt or set it to 24 hours from now if not provided
  //   const expirationTime =
  //     expiredAt || Math.floor(Date.now() / 1000) + DEFAULT_JWT_EXPIRATION;

  //   const result: avsPb.KeyResp = await this._callRPC<
  //     avsPb.KeyResp,
  //     avsPb.GetKeyReq
  //   >("getKey", {
  //     owner: address,
  //     expired_at: expirationTime,
  //     signature: jwtToken,
  //   });

  //   this.authkey = result.getKey();
  //   return { key: result.getKey() };
  // }

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

    // Create a new GetKeyReq message
    const request = new avsPb.GetKeyReq();
    request.setOwner(address);
    request.setExpiredAt(expiredAtEpoch);
    request.setSignature(signature);

    let result = await this._callRPC<avsPb.KeyResp, avsPb.GetKeyReq>(
      "getKey",
      request
    );

    console.log("result:", result);
    this.authkey = result.getKey();

    return { key: result.getKey() };
  }

  public isAuthenticated(): boolean {
    return !!this.authkey;
  }

  protected _callRPC<TResponse, TRequest>(
    method: string,
    request: TRequest | any
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
}

// Export types for easier use
export * from "./types";

// Add this line at the end of the file
export { getKeyRequestMessage };
