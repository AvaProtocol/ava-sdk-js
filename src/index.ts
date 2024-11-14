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

class BaseClient {
  readonly endpoint: string;

  readonly rpcClient;
  protected metadata: Metadata;
  protected authKey?: string;
  // owner is the EOA user wallet. It's the underlying user who created smart wallets and create tasks
  protected owner?: string;

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

    this.authKey = result.getKey();
    // when using an API key, the key can authenticate on behalf of other users as long as the user granted the permission
    this.owner = address;

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

    // succesfully authenticated, initialized trusted information for subsequent api call on this client
    this.authKey = result.getKey();
    this.owner = address;
    
    return { authKey: result.getKey() };
  }

  protected _callRPC<TResponse, TRequest>(
    method: string,
    request: TRequest | any,
    options?: RequestOptions
  ): Promise<TResponse> {
    // Clone the existing metadata from the client
    const metadata = _.cloneDeep(this.metadata);

    if (!this.authKey) {
      throw new Error("Not authenticated yet");
    }
    metadata.set(AUTH_KEY_HEADER, this.authKey);

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

  protected _callAnonRPC<TResponse, TRequest>(
    method: string,
    request: TRequest | any,
    options?: RequestOptions
  ): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      (this.rpcClient as any)[method].bind(this.rpcClient)(
        request,
        this.metadata,
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
  ): Promise<GetAddressesResponse> {
    const request = new avs_pb.AddressRequest();

    const result = await this._callRPC<
      avs_pb.AddressResp,
      avs_pb.AddressRequest
    >("getSmartAccountAddress", request);

    return {
      wallets: result.getWalletsList().map(item => item.toObject()),
    };
  }

  async createWallet(
    salt: string, factoryAddress?: string
  ): Promise<GetAddressesResponse> {
    const request = new avs_pb.CreateWalletReq();
    request.setSalt(salt);
    if (factoryAddress) {
      request.setFactoryAddress(factoryAddress);
    }

    const result = await this._callRPC<
      avs_pb.CreateWalletReq,
      avs_pb.CreateWalletResp
    >("createWallet", request);

    return {
      address: result.getAddress(),
    };
  }

  async createTask(
    {
      address,
      oracleContract,
      tokenContract,
    }: {
      address: string;
      tokenContract: string;
      oracleContract: string;
    }
  ): Promise<CreateTaskResponse> {
    const trigger = new avs_pb.TaskTrigger();
    trigger.setTriggerType(avs_pb.TriggerType.EXPRESSIONTRIGGER);
    trigger.setExpression(
      new avs_pb.ExpressionCondition().setExpression(`
      bigCmp(
        priceChainlink("${oracleContract}"), 
        toBigInt("10000")
      ) > 0`)
    );

    const action = new avs_pb.TaskAction();
    action.setTaskType(avs_pb.TaskType.CONTRACTEXECUTIONTASK);
    action.setId("transfer_erc20_1");
    action.setName("Transfer Test Token");
    const execution = new avs_pb.ContractExecution();
    execution.setContractAddress(tokenContract);

    let ABI = ["function transfer(address to, uint amount)"];
    let iface = new ethers.Interface(ABI);
    const callData = iface.encodeFunctionData("transfer", [
      address,
      ethers.parseUnits("12", 18),
    ]);
    execution.setCallData(callData);

    action.setContractExecution(execution);

    const request = new avs_pb.CreateTaskReq()
      .setTrigger(trigger)
      .setActionsList([action])
      .setExpiredAt(Math.floor(Date.now() / 1000) + 1000000);

    const result = await this._callRPC<
      avs_pb.CreateTaskResp,
      avs_pb.CreateTaskReq
    >("createTask", request, { authKey });

    return {
      id: result.getId(),
    };
  }

  async listTasks(
    address: string
  ): Promise<ListTasksResponse> {
    const request = new avs_pb.ListTasksReq();

    const result = await this._callRPC<
      avs_pb.ListTasksResp,
      avs_pb.ListTasksReq
    >("listTasks", request, { authKey });

    const tasks = _.map(
      result.getTasksList(),
      (obj: avs_pb.ListTasksResp.TaskItemResp) => {
        return {
          id: obj.getId(),
          status: _.capitalize(obj.getStatus().toString()),
        };
      }
    );

    return {
      tasks: tasks,
    };
  }

  // TODO: specify the return type to match client’s requirements
  // Right now we simply return the original object from the server
  async getTask(
    id: string,
  ): Promise<TaskType> {
    const request = new avs_pb.UUID();
    request.setBytes(id);
    ``;

    const result = await this._callRPC<avs_pb.Task, avs_pb.UUID>(
      "getTask",
      request,
    );

    return new Task(result);
  }

  async cancelTask(
    id: string
  ): Promise<CancelTaskResponse> {
    const request = new avs_pb.UUID();
    request.setBytes(id);

    const result = await this._callRPC<BoolValue, avs_pb.UUID>(
      "cancelTask",
      request,
    );

    return {
      value: result.getValue(),
    };
  }

  async deleteTask(
    id: string
  ): Promise<DeleteTaskResponse> {
    const request = new avs_pb.UUID();
    request.setBytes(id);

    const result = await this._callRPC<BoolValue, avs_pb.UUID>(
      "deleteTask",
      request,
    );

    return {
      value: result.getValue(),
    };
  }
}

// Export types for easier use
export * from "./types";

// Add this line at the end of the file
export { getKeyRequestMessage };
