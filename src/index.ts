import _ from "lodash";
import { ethers } from "ethers";
import * as grpc from "@grpc/grpc-js";
import { Metadata } from "@grpc/grpc-js";
import { getKeyRequestMessage } from "./auth";
import { AggregatorClient } from "../grpc_codegen/avs_grpc_pb";
import * as avs_pb from "../grpc_codegen/avs_pb";
import { BoolValue } from "google-protobuf/google/protobuf/wrappers_pb";
import {
  AUTH_KEY_HEADER,
  CancelTaskResponse,
  DeleteTaskResponse,
  RequestOptions,
  TaskType,
} from "./types";
import Task from "./task";
// Move interfaces to a separate file, e.g., types.ts
import {
  ClientOption,
  CreateTaskResponse,
  GetAddressesResponse,
  GetKeyResponse,
  ListTasksResponse,
} from "./types";

import {
  buildContractWrite, buildTaskEdge
} from "./builder";

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
    let result = await this._callAnonRPC<avs_pb.KeyResp, avs_pb.GetKeyReq>(
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

  async listSmartWallets(
    options: RequestOptions,
  ): Promise<GetAddressesResponse> {
    const request = new avs_pb.ListWalletReq();

    const result = await this._callRPC<
      avs_pb.AddressResp,
      avs_pb.ListWalletReq
    >("listWallets", request, options);

    return result.getWalletsList().map(item => item.toObject());
  }

  async createWallet(
    {
      salt,
      factoryAddress
    }: CreateWalletReq,
    options: RequestOptions,
  ): Promise<GetAddressesResponse> {
    const request = new avs_pb.CreateWalletReq();
    request.setSalt(salt);
    if (factoryAddress) {
      request.setFactoryAddress(factoryAddress);
    }

    const result = await this._callRPC<
      avs_pb.CreateWalletReq,
      avs_pb.CreateWalletResp
    >("createWallet", request, options);

    return result.toObject();
  }

  async createTask(payload: any, options: RequestOptions): Promise<CreateTaskResponse> {
    const request = new avs_pb.CreateTaskReq();
    request.setSmartWalletAddress(payload.smartWalletAddress);
    request.setStartAt(payload.startAt);
    request.setExpiredAt(payload.expiredAt);
    request.setMemo(payload.memo);

    // request.setTrigger(payload.trigger);
    let nodes = [];
    for (const node of payload.nodes) {
      const n = new avs_pb.TaskNode();
      n.setId(node.id);
      n.setName(node.name);

      if (node.ethTransfer) {
       // n.setEthTransfer(node.ethTransfer);
      } else if (node.contractWrite) {
        n.setContractWrite(buildContractWrite(node.contractWrite));
      } else if (node.contractRead) {
        n.setContractRead(buildContractRead(node.contractRead));
      // } else if (node.graphqlDataQuery) {
      //   n.setGraphqlDataQuery(node.graphqlDataQuery);
      // } else if (node.restApi) {
      //   n.setRestApi(node.restApi);
      //} else if (node.branch) {
      //  n.setBranch(node.branch);
      //} else if (node["filter"]) {
      //  n.setfilter(node["filter"]);
      //} else if (node.customCode) {
      //  n.setCustomCode(node.customCode);
      } else {
        throw new Error("missing task payload");
      }
      nodes.push(n);
      request.addNodes(n);
    }

    const edges = [];
    for (const edge of payload.edges) {
      edges.push(buildTaskEdge(edge));
    }
    request.setEdgesList(edges);
    //const request = aggPb.CreateTaskReq.create(payload);

    const result = await this._callRPC<
      avs_pb.CreateTaskResp
    >("createTask", request, options);

    return {
      id: result.getId(),
    };
  }

  async listTasks(address: string, options: RequestOptions): Promise<ListTasksResponse> {
    const request = new avs_pb.ListTasksReq();
    request.setSmartWalletAddress(address);

    const result = await this._callRPC<
      avs_pb.ListTasksResp,
      avs_pb.ListTasksReq
    >("listTasks", request, options);

    return result.getTasksList().map(item => new Task(item));
  }

  // TODO: specify the return type to match client’s requirements
  async getTask(id: string, options: RequestOptions): Promise<TaskType> {
    const request = new avs_pb.IdReq();
    request.setId(id);

    const result = await this._callRPC<avs_pb.Task, avs_pb.IdReq>(
      "getTask",
      request,
      options
    );

    return new Task(result);
  }

  async cancelTask(id: string, options: RequestOptions): Promise<CancelTaskResponse> {
    const request = new avs_pb.IdReq();
    request.setId(id);

    const result = await this._callRPC<BoolValue, avs_pb.IdReq>(
      "cancelTask",
      request,
      options
    );

    return result.getValue();
  }

  async deleteTask(id: string, options: RequestOptions): Promise<DeleteTaskResponse> {
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

// Add this line at the end of the file
export { getKeyRequestMessage };
