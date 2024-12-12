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
import Edge, { EdgeProps } from "./models/edge";
import Execution from "./models/execution";
import NodeFactory from "./models/node/factory";
import TriggerFactory, {
  TriggerType,
  TriggerTypes,
} from "./models/trigger/factory";

import {
  AUTH_KEY_HEADER,
  RequestOptions,
  ClientOption,
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

  /**
   * Get the list of smart wallets; new wallets can be added to the list by calling `addWallet`
   * @param {RequestOptions} options - Request options
   * @returns {Promise<SmartWallet[]>} - The list of SmartWallet objects
   */
  async getWallets(options: RequestOptions): Promise<SmartWallet[]> {
    const request = new avs_pb.ListWalletReq();

    const result = await this._callRPC<
      avs_pb.ListWalletResp,
      avs_pb.ListWalletReq
    >("listWallets", request, options);

    return result.getItemsList().map((item) => item.toObject());
  }

  /**
   * Add a new smart wallet address to the wallet list
   * @param {string} salt - The salt for the wallet
   * @param {string} factoryAddress - Factory address for the wallet
   * @param {RequestOptions} options - Request options
   * @returns {Promise<SmartWallet>} - The added SmartWallet object
   */
  async addWallet(
    { salt, factoryAddress }: avs_pb.GetWalletReq.AsObject,
    options: RequestOptions
  ): Promise<SmartWallet> {
    const request = new avs_pb.GetWalletReq();
    request.setSalt(salt);
    if (factoryAddress) {
      request.setFactoryAddress(factoryAddress);
    }

    const result = await this._callRPC<
      avs_pb.GetWalletResp,
      avs_pb.GetWalletReq
    >("getWallet", request, options);

    return {
      address: result.getAddress(),
      salt: result.getSalt(),
      factory: result.getFactoryAddress(),
    };
  }

  /**
   * Submit a workflow to the AVS server; once the workflow is submitted, it cannot be modified
   * @param {Workflow} workflow - Workflow object to submit
   * @param {RequestOptions} options - Request options
   * @returns {Promise<string>} - The Id of the submitted workflow
   */
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

  /**
   * Get the list of workflows; new workflows can be created by calling `submitWorkflow`
   * @param {string} address - The address of the smart wallet
   * @param {string} cursor - The cursor for the list
   * @param {number} limit - The limit for the list
   * @param {RequestOptions} options - Request options
   * @returns {Promise<{ cursor: string; result: Workflow[] }>} - The list of Workflow objects
   */
  async getWorkflows(
    address: string,
    cursor: string,
    limit: number,
    options: RequestOptions
  ): Promise<{ cursor: string; result: Workflow[] }> {
    const request = new avs_pb.ListTasksReq();
    request.setSmartWalletAddress(address);
    request.setCursor(cursor);
    request.setItemPerPage(limit);

    const result = await this._callRPC<
      avs_pb.ListTasksResp,
      avs_pb.ListTasksReq
    >("listTasks", request, options);

    return {
      cursor: result.getCursor(),
      result: result
        .getItemsList()
        .map((item) => Workflow.fromListResponse(item)),
    };
  }

  /**
   * Get the list of executions for a workflow
   * @param {string} workflowId - The Id of the workflow
   * @param {string} cursor - The cursor for the list
   * @param {number} limit - The limit for the list
   * @param {RequestOptions} options - Request options
   * @returns {Promise<{ cursor: string; result: Execution[] }>} - The list of Executions
   */
  async getExecutions(
    workflowId: string,
    cursor: string,
    limit: number,
    options: RequestOptions
  ): Promise<{ cursor: string; result: Execution[] }> {
    const request = new avs_pb.ListExecutionsReq();
    request.setId(workflowId);
    request.setCursor(cursor);
    request.setItemPerPage(limit);

    const result = await this._callRPC<
      avs_pb.ListExecutionsResp,
      avs_pb.ListExecutionsReq
    >("listExecutions", request, options);

    return {
      cursor: result.getCursor(),
      result: result.getItemsList().map((item) => Execution.fromResponse(item)),
    };
  }

  /**
   * Get a workflow by its Id
   * @param {string} id - The Id of the workflow
   * @param {RequestOptions} options - Request options
   * @returns {Promise<Workflow>} - The Workflow object
   */
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

  /**
   * Manually trigger a workflow by its Id, and manual trigger data input
   * @param id - The Id of the workflow
   * @param triggerType - The trigger type of the workflow
   * @param triggerData - The data of the trigger
   * @param isBlocking - Whether the trigger is blocking
   * @param options - Request options
   * @returns {Promise<avs_pb.UserTriggerTaskResp>} - The response from the trigger workflow call
   */
  async triggerWorkflow(
    {
      id,
      triggerType,
      triggerData,
      isBlocking = false,
    }: {
      id: string;
      triggerType: TriggerType;
      triggerData: avs_pb.TriggerMark.AsObject;
      isBlocking: boolean;
    },
    options: RequestOptions
  ): Promise<avs_pb.UserTriggerTaskResp> {
    const request = new avs_pb.UserTriggerTaskReq();

    // Construct the manual trigger based on the workflow’s trigger type
    const metadata = new avs_pb.TriggerMark();

    switch (triggerType) {
      case TriggerTypes.FIXED_TIME:
        if (!triggerData.epoch) {
          throw new Error("Epoch is required for fixed time trigger");
        }
        metadata.setEpoch(triggerData.epoch);
        break;
      case TriggerTypes.CRON:
        if (!triggerData.epoch) {
          throw new Error("Epoch is required for cron trigger");
        }
        metadata.setEpoch(triggerData.epoch);
        break;
      case TriggerTypes.BLOCK:
        if (!triggerData.blockNumber) {
          throw new Error("Block number is required for block trigger");
        }
        metadata.setBlockNumber(triggerData.blockNumber);
        break;
      case TriggerTypes.EVENT:
        if (
          !triggerData.blockNumber ||
          !triggerData.logIndex ||
          !triggerData.txHash
        ) {
          throw new Error(
            "Block number, log index, and tx hash are required for event trigger"
          );
        }

        metadata.setBlockNumber(triggerData.blockNumber);
        metadata.setLogIndex(triggerData.logIndex);
        metadata.setTxHash(triggerData.txHash);

        break;
    }

    request.setTaskId(id);
    request.setTriggerMark(metadata);
    request.setRunInline(isBlocking);

    const result = await this._callRPC<
      avs_pb.UserTriggerTaskResp,
      avs_pb.UserTriggerTaskReq
    >("userTriggerTask", request, options);

    return result;
  }

  /**
   * Cancel a workflow by its Id
   * @param {string} id - The Id of the workflow
   * @param {RequestOptions} options - Request options
   * @returns {Promise<boolean>} - Whether the workflow was successfully canceled
   */
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

  /**
   * Delete a workflow by its Id
   * @param {string} id - The Id of the workflow
   * @param {RequestOptions} options - Request options
   * @returns {Promise<boolean>} - Whether the workflow was successfully deleted
   */
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
  NodeFactory,
  TriggerFactory,
};

export type { WorkflowProps, WorkflowStatus, EdgeProps };

// Add this line at the end of the file
export { getKeyRequestMessage };
