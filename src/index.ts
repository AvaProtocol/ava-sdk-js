import _ from "lodash";
import { ethers } from "ethers";
import * as grpc from "@grpc/grpc-js";
import { Metadata } from "@grpc/grpc-js";
import { getKeyRequestMessage } from "./auth";
import { AggregatorClient } from "../grpc_codegen/avs_grpc_pb";
import * as avs_pb from "../grpc_codegen/avs_pb";
import Task from "./task";

const metadata = new grpc.Metadata();

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
  // protected owner?: string;
  // readonly opts: ClientOption;
  // protected wallet?: any;
  protected metadata: Metadata;
  constructor(opts: ClientOption) {
    // if (!opts.jwtApiKey && !opts.owner) {
    //   throw new Error("missing jwtApiKey or owner");
    // }

    this.endpoint = opts.endpoint;
    this.rpcClient = new AggregatorClient(
      this.endpoint,
      grpc.credentials.createInsecure()
    );

    // Create a new Metadata object for request headers
    this.metadata = new Metadata();
  }

  private setAuthKey(jwtToken: string): void {
    metadata.add("authkey", jwtToken);
  }

  public isAuthenticated(): boolean {
    if (!metadata.get("authkey")) {
      return false;
    }

    try {
      // Decode the JWT token (without verifying the signature)
      const [, payload] = metadata.get("authkey")[0].toString().split(".");
      const decodedPayload = JSON.parse(atob(payload));

      // Check if the token has expired
      const currentTimestamp = Math.floor(Date.now() / 1000);
      return decodedPayload.exp > currentTimestamp;
    } catch (error) {
      console.error("Error validating JWT token:", error);
      return false;
    }
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

  //   this.jwtToken = result.getKey();
  //   return { key: result.getKey() };
  // }

  // This flow can be used where the signature is generate from outside, such as in front-end and pass in
  async authWithSignature(
    address: string,
    signature: string,
    expiredAtEpoch: number
  ): Promise<GetKeyResponse> {
    console.log(
      "Authenticating with signature:",
      signature,
      "Expired at epoch:",
      expiredAtEpoch
    );

    // Create a new GetKeyReq message
    const request = new avs_pb.GetKeyReq();
    request.setOwner(address);
    request.setExpiredAt(expiredAtEpoch);
    request.setSignature(signature);

    let result = await this._callRPC<avs_pb.KeyResp, avs_pb.GetKeyReq>(
      "getKey",
      request
    );

    this.setAuthKey(result.getKey());

    return { jwtToken: result.getKey() };
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

  async getAddresses(address: string): Promise<GetAddressesResponse> {
    const request = new avs_pb.AddressRequest();
    request.setOwner(address);

    const result = await this._callRPC<
      avs_pb.AddressResp,
      avs_pb.AddressRequest
    >("getSmartAccountAddress", request);

    console.log("getAddresses.result:", result);

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
  }): Promise<object> {
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

    // console.log("callData:", callData);
    console.log("execution:", execution.toObject());
    action.setContractExecution(execution);

    const request = new avs_pb.CreateTaskReq()
      .setTrigger(trigger)
      .setActionsList([action])
      .setExpiredAt(Math.floor(Date.now() / 1000) + 1000000);

    const result = await this._callRPC<
      avs_pb.CreateTaskResp,
      avs_pb.CreateTaskReq
    >("createTask", request);

    console.log("createTask.result:", result.toObject());

    return result.toObject();
  }

  async listTasks(address: string): Promise<ListTasksResponse> {
    const request = new avs_pb.ListTasksReq();

    const result = await this._callRPC<
      avs_pb.ListTasksResp,
      avs_pb.ListTasksReq
    >("listTasks", request);

    console.log("listTasks.result:", result.toObject());

    const tasks = _.map(
      result.getTasksList(),
      (obj: avs_pb.ListTasksResp.TaskItemResp) => new Task(obj)
    );

    console.log("listTasks.tasks:", tasks);

    return {
      tasks: tasks,
    };
  }
}

// Export types for easier use
export * from "./types";

// Add this line at the end of the file
export { getKeyRequestMessage };
