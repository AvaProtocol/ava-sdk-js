import _ from "lodash";
import { ethers } from "ethers";
import * as grpc from "@grpc/grpc-js";
import { Metadata } from "@grpc/grpc-js";
import { getKeyRequestMessage } from "./auth";
import { AggregatorClient } from "../grpc_codegen/avs_grpc_pb";
import * as avs_pb from "../grpc_codegen/avs_pb";
import { BoolValue } from "google-protobuf/google/protobuf/wrappers_pb";
import Task from "./task";
import { AUTH_KEY_HEADER, RequestOptions } from "./types";

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

  async authWithAPIKey(
    apiKey: string,
    expiredAtEpoch: number
  ): Promise<GetKeyResponse> {
    // Create a new GetKeyReq message
    const request = new avs_pb.GetKeyReq();
    request.setOwner("");
    request.setExpiredAt(expiredAtEpoch);
    request.setSignature(apiKey);

    const result: avs_pb.KeyResp = await this._callRPC<
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

    let result = await this._callRPC<avs_pb.KeyResp, avs_pb.GetKeyReq>(
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

    // Add the auth key to the metadata as a header
    if (options?.authKey) {
      metadata.set(AUTH_KEY_HEADER, options.authKey);
    }

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

  async getAddresses(
    address: string,
    { authKey }: { authKey: string }
  ): Promise<GetAddressesResponse> {
    const request = new avs_pb.AddressRequest();
    request.setOwner(address);

    const result = await this._callRPC<
      avs_pb.AddressResp,
      avs_pb.AddressRequest
    >("getSmartAccountAddress", request, { authKey });

    return {
      owner: address,
      smart_account_address: result.getSmartAccountAddress(),
    };
  }

  async createTask({
    address,
    oracleContract,
    tokenContract,
  }: {
    address: string;
    tokenContract: string;
    oracleContract: string;
  }): Promise<CreateTaskResponse> {
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
    >("createTask", request);

    return {
      id: result.getId(),
    };
  }

  async listTasks(address: string): Promise<ListTasksResponse> {
    const request = new avs_pb.ListTasksReq();

    const result = await this._callRPC<
      avs_pb.ListTasksResp,
      avs_pb.ListTasksReq
    >("listTasks", request);

    const tasks = _.map(
      result.getTasksList(),
      (obj: avs_pb.ListTasksResp.TaskItemResp) => new Task(obj)
    );

    return {
      tasks: tasks,
    };
  }

  // TODO: specify the return type to match client’s requirements
  // Right now we simply return the original object from the server
  async getTask(id: string): Promise<object> {
    const request = new avs_pb.UUID();
    request.setBytes(id);

    const result = await this._callRPC<avs_pb.Task, avs_pb.UUID>(
      "getTask",
      request
    );

    return result.toObject();
  }

  async cancelTask(id: string): Promise<boolean> {
    const request = new avs_pb.UUID();
    request.setBytes(id);

    const result = await this._callRPC<BoolValue, avs_pb.UUID>(
      "cancelTask",
      request
    );

    return result.getValue();
  }

  async deleteTask(id: string): Promise<boolean> {
    const request = new avs_pb.UUID();
    request.setBytes(id);

    const result = await this._callRPC<BoolValue, avs_pb.UUID>(
      "deleteTask",
      request
    );

    return result.getValue();
  }
}

// Export types for easier use
export * from "./types";

// Add this line at the end of the file
export { getKeyRequestMessage };
