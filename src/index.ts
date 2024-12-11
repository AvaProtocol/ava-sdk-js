import _ from "lodash";
import * as grpc from "@grpc/grpc-js";
import { Metadata } from "@grpc/grpc-js";
import { getKeyRequestMessage } from "./auth";
import { AggregatorClient } from "../grpc_codegen/avs_grpc_pb";
import * as avs_pb from "../grpc_codegen/avs_pb";
import { BoolValue } from "google-protobuf/google/protobuf/wrappers_pb";
import Workflow, {
  WorkflowProps,
  WorkflowStatus,
  WorkflowStatuses,
} from "./models/workflow";
import { NodeProps, NodeType } from "./models/node/interface";
import Edge, { EdgeProps } from "./models/edge";
import { TriggerType } from "./models/trigger/interface";
import Execution from "./models/execution";
import NodeFactory from "./models/node/factory";
import TriggerFactory from "./models/trigger/factory";

import {
  AUTH_KEY_HEADER,
  RequestOptions,
  ClientOption,
  CreateWalletReq,
  SmartWallet,
  GetKeyResponse,
} from "./types";

class BaseClient {
  readonly endpoint: string;

  readonly rpcClient;
  protected metadata: Metadata;

  constructor(opts: ClientOption) {
    this.endpoint = opts.endpoint;
    this.rpcClient = new AggregatorClient(
      this.endpoint,
      grpc.credentials.createInsecure()
    );

    // Create a new Metadata object for request headers
    this.metadata = new Metadata();
  }

  public isAuthKeyValid(key: string): boolean {
    try {
      // Decode the JWT token (without verifying the signature)
      const [, payload] = key.split(".");
      const decodedPayload = JSON.parse(atob(payload));

      // Check if the token has expired
      const currentTimestamp = Math.floor(Date.now() / 1000);
      return decodedPayload.exp > currentTimestamp;
    } catch (error) {
      console.error("Error validating auth key:", error);
      return false;
    }
  }

  // When using the APIkey, depends on scope of the key, it may have access to one ore more account
  async authWithAPIKey(
    address: string,
    apiKey: string,
    expiredAtEpoch: number
  ): Promise<GetKeyResponse> {
    // Create a new GetKeyReq message
    const request = new avs_pb.GetKeyReq();
    request.setOwner(address);
    request.setExpiredAt(expiredAtEpoch);
    request.setSignature(apiKey);

    // when exchanging the key, we don't set the token yet
    const result: avs_pb.KeyResp = await this._callAnonRPC<
      avs_pb.KeyResp,
      avs_pb.GetKeyReq
    >("getKey", request);

    return { authKey: result.getKey() };
  }

  // This flow can be used where the signature is generate from outside, such as in front-end and pass in
  async authWithSignature(
    address: string,
    signature: string,
    expiredAtEpoch: number
  ): Promise<GetKeyResponse> {
    // Create a new GetKeyReq message
    const request = new avs_pb.GetKeyReq();
    request.setOwner(address);
    request.setExpiredAt(expiredAtEpoch);
    request.setSignature(signature);

    // when exchanging the key, we don't set the token yet
    const result = await this._callAnonRPC<avs_pb.KeyResp, avs_pb.GetKeyReq>(
      "getKey",
      request
    );

    return { authKey: result.getKey() };
  }

  protected _callRPC<TResponse, TRequest>(
    method: string,
    request: TRequest | any,
    options?: RequestOptions
  ): Promise<TResponse> {
    // Clone the existing metadata from the client
    const metadata = _.cloneDeep(this.metadata);

    if (!options?.authKey) {
      throw new Error("missing auth header");
    }
    metadata.set(AUTH_KEY_HEADER, options.authKey);

    return new Promise((resolve, reject) => {
      (this.rpcClient as any)[method].bind(this.rpcClient)(
        request as any,
        metadata,
        (error: any, response: TResponse) => {
          if (error) reject(error);
          else resolve(response);
        }
      );
    });
  }

  protected _callAnonRPC<TResponse, TRequest>(
    method: string,
    request: TRequest | any,
    options?: RequestOptions
  ): Promise<TResponse> {
    // Clone the existing metadata from the client
    const metadata = _.cloneDeep(this.metadata);

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

  async getWallets(options: RequestOptions): Promise<SmartWallet[]> {
    const request = new avs_pb.ListWalletReq();

    const result = await this._callRPC<
      avs_pb.ListWalletResp,
      avs_pb.ListWalletReq
    >("listWallets", request, options);

    return result.getWalletsList().map((item) => item.toObject());
  }

  async createWallet(
    { salt, factoryAddress }: CreateWalletReq,
    options: RequestOptions
  ): Promise<SmartWallet> {
    const request = new avs_pb.CreateWalletReq();
    request.setSalt(salt);
    if (factoryAddress) {
      request.setFactoryAddress(factoryAddress);
    }

    const result = await this._callRPC<
      avs_pb.CreateWalletResp,
      avs_pb.CreateWalletReq
    >("createWallet", request, options);

    return {
      address: result.getAddress(),
      salt: result.getSalt(),
      factory: result.getFactoryAddress(),
    };
  }

  async submitWorkflow(
    workflow: Workflow,
    options: RequestOptions
  ): Promise<string> {
    const request = workflow.toRequest();

    const result = await this._callRPC<
      avs_pb.CreateTaskResp,
      avs_pb.CreateTaskReq
    >("createTask", request, options);

    return result.getId();
  }

  createWorkflow(props: WorkflowProps): Workflow {
    return new Workflow(props);
  }

  async getWorkflows(
    address: string,
    options: RequestOptions
  ): Promise<Workflow[]> {
    const request = new avs_pb.ListTasksReq();
    request.setSmartWalletAddress(address);

    const result = await this._callRPC<
      avs_pb.ListTasksResp,
      avs_pb.ListTasksReq
    >("listTasks", request, options);

    return result.getTasksList().map((item) => Workflow.fromResponse(item));
  }

  // TODO: specify the return type to match client’s requirements
  async getWorkflow(id: string, options: RequestOptions): Promise<Workflow> {
    const request = new avs_pb.IdReq();
    request.setId(id);

    const result = await this._callRPC<avs_pb.Task, avs_pb.IdReq>(
      "getTask",
      request,
      options
    );

    return Workflow.fromResponse(result);
  }

  async cancelWorkflow(id: string, options: RequestOptions): Promise<boolean> {
    const request = new avs_pb.IdReq();
    request.setId(id);

    const result = await this._callRPC<BoolValue, avs_pb.IdReq>(
      "cancelTask",
      request,
      options
    );

    return result.getValue();
  }

  async deleteWorkflow(id: string, options: RequestOptions): Promise<boolean> {
    const request = new avs_pb.IdReq();
    request.setId(id);

    const result = await this._callRPC<BoolValue, avs_pb.IdReq>(
      "deleteTask",
      request,
      options
    );

    return result.getValue();
  }
}

// Export types for easier use
export * from "./types";
export * from "./models/node/factory";
export * from "./models/trigger/factory";

export {
  Workflow,
  WorkflowStatuses,
  Edge,
  Execution,
};

export type { WorkflowProps, WorkflowStatus, EdgeProps };

// Add this line at the end of the file
export { getKeyRequestMessage };
