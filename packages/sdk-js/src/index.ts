import _ from "lodash";
import { credentials, Metadata } from "@grpc/grpc-js";
import { AggregatorClient } from "@/grpc_codegen/avs_grpc_pb";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { BoolValue } from "google-protobuf/google/protobuf/wrappers_pb";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import Workflow, { WorkflowProps } from "./models/workflow";
import Edge, { EdgeProps } from "./models/edge";
import Execution, { ExecutionProps, OutputDataProps } from "./models/execution";
import Step, { StepProps } from "./models/step";
import NodeFactory from "./models/node/factory";
import TriggerFactory from "./models/trigger/factory";
import Secret, { SecretProps } from "./models/secret";
import type {
  GetKeyRequestApiKey,
  GetKeyRequestSignature,
  GetKeyResponse,
} from "@avaprotocol/types";

import {
  AUTH_KEY_HEADER,
  RequestOptions,
  ClientOption,
  SmartWallet,
  GetWalletRequest,
  GetExecutionsRequest,
  GetWorkflowsRequest,
  DEFAULT_LIMIT,
  ListSecretResponse,
  SecretRequestOptions,
} from "@avaprotocol/types";

import { ExecutionStatus } from "@/grpc_codegen/avs_pb";

import TriggerReason, { TriggerReasonProps } from "./models/trigger/reason";

class BaseClient {
  readonly endpoint: string;

  readonly rpcClient;
  protected metadata: Metadata;
  protected factoryAddress?: string;
  protected authKey?: string;

  constructor(opts: ClientOption) {
    this.endpoint = opts.endpoint;
    this.rpcClient = new AggregatorClient(
      this.endpoint,
      credentials.createInsecure()
    );

    this.factoryAddress = opts.factoryAddress;

    // Create a new Metadata object for request headers
    this.metadata = new Metadata();
  }

  /**
   * Check if the auth key is valid by decoding the JWT token and checking the expiration
   * @param key - The auth key
   * @returns {boolean} - Whether the auth key is valid
   */
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

  /**
   * The API key could retrieve a wallet's authKey by skipping its signature verification
   * @param chainId - The chain id
   * @param address - The address of the EOA wallet
   * @param issuedAt - The issued at timestamp
   * @param expiredAt - The expiration timestamp
   * @param apiKey - The API key
   * @returns {Promise<GetKeyResponse>} - The response from the auth call
   */
  async authWithAPIKey({
    chainId,
    address,
    issuedAt,
    expiredAt,
    apiKey,
  }: GetKeyRequestApiKey): Promise<GetKeyResponse> {
    const request = new avs_pb.GetKeyReq();
    request.setChainId(chainId);
    request.setOwner(address);
    // Create and set timestamp objects properly
    const issueTs = new Timestamp();
    issueTs.fromDate(issuedAt);

    const expiredTs = new Timestamp();
    expiredTs.fromDate(expiredAt);

    request.setIssuedAt(issueTs);
    request.setExpiredAt(expiredTs);
    request.setSignature(apiKey);

    // when exchanging the key, we don't set the token yet
    const result: avs_pb.KeyResp = await this.sendGrpcRequest<
      avs_pb.KeyResp,
      avs_pb.GetKeyReq
    >("getKey", request);

    return { authKey: result.getKey() };
  }

  /**
   * Getting an authKey from the server by verifying the signature of an EOA wallet
   * @param chainId - The chain id
   * @param address - The address of the EOA wallet
   * @param issuedAt - The issued at timestamp
   * @param expiredAt - The expiration timestamp
   * @param signature - The signature of the EOA wallet
   * @returns {Promise<GetKeyResponse>} - The response from the auth call
   */
  async authWithSignature({
    chainId,
    address,
    issuedAt,
    expiredAt,
    signature,
  }: GetKeyRequestSignature): Promise<GetKeyResponse> {
    // Create a new GetKeyReq message
    const request = new avs_pb.GetKeyReq();
    request.setChainId(chainId);
    request.setOwner(address);

    // Create and set timestamp objects properly
    const issueTs = new Timestamp();
    issueTs.fromDate(issuedAt);

    const expiredTs = new Timestamp();
    expiredTs.fromDate(expiredAt);

    request.setIssuedAt(issueTs);
    request.setExpiredAt(expiredTs);
    request.setSignature(signature);

    // when exchanging the key, we don't set the token yet
    const result = await this.sendGrpcRequest<avs_pb.KeyResp, avs_pb.GetKeyReq>(
      "getKey",
      request
    );
    return { authKey: result.getKey() };
  }

  /**
   * The client could choose to store the authKey and use it for all requests; setting it to undefined will unset the authKey
   * The authKey can be overridden at the request level by request options
   * @param authKey - The auth key
   */
  public setAuthKey(authKey: string | undefined) {
    this.authKey = authKey;
  }

  /**
   * Get the auth key if it's set in the client
   * @returns {string | undefined} - The auth key
   */
  public getAuthKey(): string | undefined {
    return this.authKey;
  }

  /**
   * Set the factory address of smart wallets for the client
   * @param address - The factory address
   */
  public setFactoryAddress(address: string) {
    this.factoryAddress = address;
  }

  /**
   * Get the factory address if it's set in the client
   * @returns {string | undefined} - The factory address
   */
  public getFactoryAddress(): string | undefined {
    return this.factoryAddress;
  }

  /**
   * Send a gRPC request with an auth key
   * @param method - The method name
   * @param request - The request message
   * @param options - The request options
   * @returns {Promise<TResponse>} - The response from the gRPC call
   */
  protected sendGrpcRequest<TResponse, TRequest>(
    method: string,
    request: TRequest | any,
    options?: RequestOptions
  ): Promise<TResponse> {
    // Clone the existing metadata from the client
    const metadata = _.cloneDeep(this.metadata);

    if (options?.authKey) {
      metadata.set(AUTH_KEY_HEADER, options.authKey);
    } else if (this.authKey) {
      metadata.set(AUTH_KEY_HEADER, this.authKey);
    }

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
}

class Client extends BaseClient {
  constructor(config: ClientOption) {
    super(config);
  }

  /**
   * Get the list of smart wallets; new wallets can be added to the list by calling `getWallet`
   * @param {RequestOptions} options - Request options
   * @returns {Promise<SmartWallet[]>} - The list of SmartWallet objects
   */
  async getWallets(options?: RequestOptions): Promise<SmartWallet[]> {
    const request = new avs_pb.ListWalletReq();

    const result = await this.sendGrpcRequest<
      avs_pb.ListWalletResp,
      avs_pb.ListWalletReq
    >("listWallets", request, options);

    return result.getItemsList().map((item) => item.toObject());
  }

  /**
   * Add a new smart wallet address to the wallet list
   * @param {string} salt - The salt for the wallet
   * @param {string} factoryAddress - Factory address for the wallet; if not provided, the address stored in the client will be used
   * @param {RequestOptions} options - Request options
   * @returns {Promise<SmartWallet>} - The added SmartWallet object
   */
  async getWallet(
    { salt, factoryAddress }: GetWalletRequest,
    options?: RequestOptions
  ): Promise<SmartWallet> {
    const request = new avs_pb.GetWalletReq();
    request.setSalt(salt);

    if (factoryAddress) {
      request.setFactoryAddress(factoryAddress);
    } else if (this.factoryAddress) {
      request.setFactoryAddress(this.factoryAddress);
    }

    const result = await this.sendGrpcRequest<
      avs_pb.GetWalletResp,
      avs_pb.GetWalletReq
    >("getWallet", request, options);

    return {
      address: result.getAddress(),
      salt: result.getSalt(),
      factory: result.getFactoryAddress(),
      totalTaskCount: result.getTotalTaskCount(),
      activeTaskCount: result.getActiveTaskCount(),
      completedTaskCount: result.getCompletedTaskCount(),
      failedTaskCount: result.getFailedTaskCount(),
      canceledTaskCount: result.getCanceledTaskCount(),
    } as SmartWallet;
  }

  /**
   * Submit a workflow to the AVS server; once the workflow is submitted, it cannot be modified
   * @param {Workflow} workflow - Workflow object to submit
   * @param {RequestOptions} options - Request options
   * @returns {Promise<string>} - The Id of the submitted workflow
   */
  async submitWorkflow(
    workflow: Workflow,
    options?: RequestOptions
  ): Promise<string> {
    const request = workflow.toRequest();

    const result = await this.sendGrpcRequest<
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
    addresses: string[],
    options?: GetWorkflowsRequest
  ): Promise<{ cursor: string; result: Workflow[]; hasMore: boolean }> {
    const request = new avs_pb.ListTasksReq();
    for (const a of addresses) {
      request.addSmartWalletAddress(a);
    }

    if (options?.cursor) {
      request.setCursor(options.cursor);
    }

    request.setItemPerPage(options?.limit || DEFAULT_LIMIT);

    const result = await this.sendGrpcRequest<
      avs_pb.ListTasksResp,
      avs_pb.ListTasksReq
    >("listTasks", request, options);

    return {
      cursor: result.getCursor(),
      hasMore: result.getHasMore(),
      result: result
        .getItemsList()
        .map((item) => Workflow.fromListResponse(item)),
    };
  }

  /**
   * Get the count of workflows for multiple addresses
   * @param addresses - The list of addresses
   * @param options - Request options
   * @returns {Promise<number>} - The count of workflows
   */
  async getWorkflowCount(
    addresses: string[],
    options?: RequestOptions
  ): Promise<number> {
    const request = new avs_pb.GetWorkflowCountReq();
    request.setAddressesList(addresses);

    const result = await this.sendGrpcRequest<
      avs_pb.GetWorkflowCountResp,
      avs_pb.GetWorkflowCountReq
    >("getWorkflowCount", request, options);

    return result.getTotal();
  }

  /**
   * Get the list of executions for multiple workflow given in the workflows argument.
   * @param {string[]} workflows - The list of workflow ids to fetch execution for
   * @param {GetExecutionsRequest} options - Request options
   * @param {string} [options.cursor] - The cursor for pagination
   * @param {number} [options.limit] - The page limit of the response; default is 10
   * @param {string} [options.authKey] - The auth key for the request
   * @returns {Promise<{ cursor: string; result: Execution[] }>} - The list of Executions
   */
  async getExecutions(
    workflows: string[],
    options?: GetExecutionsRequest
  ): Promise<{ cursor: string; result: Execution[]; hasMore: boolean }> {
    const request = new avs_pb.ListExecutionsReq();
    request.setTaskIdsList(workflows);

    // Cusor is implemenent similarly to moral
    if (options?.cursor && options?.cursor != "") {
      request.setCursor(options.cursor);
    }

    request.setItemPerPage(options?.limit || DEFAULT_LIMIT);

    const result = await this.sendGrpcRequest<
      avs_pb.ListExecutionsResp,
      avs_pb.ListExecutionsReq
    >("listExecutions", request, options);

    return {
      cursor: result.getCursor(),
      result: result.getItemsList().map((item) => Execution.fromResponse(item)),
      hasMore: result.getHasMore(),
    };
  }

  /**
   * Get a single execution for given workflow and execution id
   * @param {string} workflowId - The workflow id
   * @param {string} executionId - The exectuion id
   * @param {GetExecutionsRequest} options - Request options
   * @returns {Promise<Execution>} - The result execution if it is existed
   */
  async getExecution(
    taskId: string,
    executionId: string,
    options?: RequestOptions
  ): Promise<Execution> {
    const request = new avs_pb.ExecutionReq();
    request.setTaskId(taskId);
    request.setExecutionId(executionId);

    const result = await this.sendGrpcRequest<
      avs_pb.Execution,
      avs_pb.ExecutionReq
    >("getExecution", request, options);

    return Execution.fromResponse(result);
  }

  /**
   * Get the count of executions for multiple workflows
   * @param workflowIds - The list of workflow ids
   * @param options - Request options
   * @returns {Promise<number>} - The count of executions
   */
  async getExecutionCount(
    workflowIds: string[],
    options?: RequestOptions
  ): Promise<number> {
    const request = new avs_pb.GetExecutionCountReq();
    request.setWorkflowIdsList(workflowIds);

    const result = await this.sendGrpcRequest<
      avs_pb.GetExecutionCountResp,
      avs_pb.GetExecutionCountReq
    >("getExecutionCount", request, options);

    return result.getTotal();
  }

  /**
   * Get status of an execution.
   *
   * When a task is trigger in async manner, it has not run yet, so the data isn't available to return in GetExecution. Calling GetExecution will return in execution not found. We can instad call getExecutionStatus to check whether the execution is finished or not.
   *
   * @param {string} workflowId - The workflow id
   * @param {string} executionId - The exectuion id
   * @param {GetExecutionsRequest} options - Request options
   * @returns {Promise<ExecutionStatus>} - The result execution if it is existed
   */
  async getExecutionStatus(
    taskId: string,
    executionId: string,
    options?: RequestOptions
  ): Promise<avs_pb.ExecutionStatus> {
    const request = new avs_pb.ExecutionReq();
    request.setTaskId(taskId);
    request.setExecutionId(executionId);

    const result = await this.sendGrpcRequest<
      avs_pb.ExecutionStatusResp,
      avs_pb.ExecutionReq
    >("getExecutionStatus", request, options);

    return result.getStatus();
  }

  /**
   * Get a workflow by its Id
   * @param {string} id - The Id of the workflow
   * @param {RequestOptions} options - Request options
   * @returns {Promise<Workflow>} - The Workflow object
   */
  async getWorkflow(id: string, options?: RequestOptions): Promise<Workflow> {
    const request = new avs_pb.IdReq();
    request.setId(id);

    const result = await this.sendGrpcRequest<avs_pb.Task, avs_pb.IdReq>(
      "getTask",
      request,
      options
    );

    return Workflow.fromResponse(result);
  }

  /**
   * Manually trigger a workflow by its Id, and manual trigger data input
   * @param id - The Id of the workflow
   * @param triggerData - The data of the trigger
   * @param isBlocking - Whether the trigger is blocking
   * @param options - Request options
   * @returns {Promise<avs_pb.UserTriggerTaskResp>} - The response from the trigger workflow call
   */
  async triggerWorkflow(
    {
      id,
      reason,
      isBlocking = false,
    }: {
      id: string;
      reason: TriggerReasonProps;
      isBlocking: boolean;
    },
    options?: RequestOptions
  ): Promise<avs_pb.UserTriggerTaskResp.AsObject> {
    const request = new avs_pb.UserTriggerTaskReq();

    request.setTaskId(id);
    request.setReason(new TriggerReason(reason).toRequest());
    request.setIsBlocking(isBlocking);

    const result = await this.sendGrpcRequest<
      avs_pb.UserTriggerTaskResp,
      avs_pb.UserTriggerTaskReq
    >("triggerTask", request, options);

    return result.toObject();
  }

  /**
   * Cancel a workflow by its Id
   * @param {string} id - The Id of the workflow
   * @param {RequestOptions} options - Request options
   * @returns {Promise<boolean>} - Whether the workflow was successfully canceled
   */
  async cancelWorkflow(id: string, options?: RequestOptions): Promise<boolean> {
    const request = new avs_pb.IdReq();
    request.setId(id);

    const result = await this.sendGrpcRequest<BoolValue, avs_pb.IdReq>(
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
  async deleteWorkflow(id: string, options?: RequestOptions): Promise<boolean> {
    const request = new avs_pb.IdReq();
    request.setId(id);

    const result = await this.sendGrpcRequest<BoolValue, avs_pb.IdReq>(
      "deleteTask",
      request,
      options
    );

    return result.getValue();
  }

  async createSecret(
    name: string,
    value: string,
    options?: SecretRequestOptions
  ): Promise<boolean> {
    const request = new avs_pb.CreateOrUpdateSecretReq();

    request.setName(name);
    request.setSecret(value);

    if (options?.workflowId) {
      request.setWorkflowId(options.workflowId);
    }

    if (options?.orgId) {
      request.setOrgId(options.orgId);
    }

    const result = await this.sendGrpcRequest<
      BoolValue,
      avs_pb.CreateOrUpdateSecretReq
    >("createSecret", request, options);

    return result.getValue();
  }

  /**
   * Update an existing secret; the secret is updated in the user scope by default, derived from the auth key.
   * @param secret - The secret object containing updated information
   * @param options - Request options, including workflowId and orgId for scoping
   * @returns {Promise<boolean>} - Whether the secret was successfully updated
   */
  async updateSecret(
    name: string,
    value: string,
    options?: SecretRequestOptions
  ): Promise<boolean> {
    const request = new avs_pb.CreateOrUpdateSecretReq();

    request.setName(name);
    request.setSecret(value);

    if (options?.workflowId) {
      request.setWorkflowId(options.workflowId);
    }

    if (options?.orgId) {
      request.setOrgId(options.orgId);
    }

    const result = await this.sendGrpcRequest<
      BoolValue,
      avs_pb.CreateOrUpdateSecretReq
    >("updateSecret", request, options);

    return result.getValue();
  }

  /**
   * Retrieve a list of secrets; secrets can be filtered by workflowId or orgId.
   * @param params - Parameters for listing secrets
   * @param options - Request options, including workflowId and orgId for filtering
   * @returns {Promise<ListSecretResponse[]>} - The list of secrets
   */
  async listSecrets(
    options?: SecretRequestOptions
  ): Promise<ListSecretResponse[]> {
    const request = new avs_pb.ListSecretsReq();

    if (options?.workflowId) {
      request.setWorkflowId(options.workflowId);
    }

    if (options?.orgId) {
      // TODO: wait for the AVS to support orgId in ListSecrets
      // request.setOrgId(options.orgId);
    }

    const result = await this.sendGrpcRequest<
      avs_pb.ListSecretsResp,
      avs_pb.ListSecretsReq
    >("listSecrets", request, options);

    return result.getItemsList().map((item) => ({
      name: item.getName(),
      workflowId: item.getWorkflowId(),
      orgId: item.getOrgId(),
    }));
  }

  /**
   * Delete a secret by its name; by default, the secret is deleted from the user scope, derived from the auth key
   * @param name - The name of the secret
   * @param options - Request options
   * @param options.workflowId - The workflow id; if specified, the secret will be deleted from the workflow scope
   * @param options.orgId - The organization id; if specified, the secret will be deleted from the organization scope
   * @returns {Promise<boolean>} - Whether the secret was successfully deleted
   */
  async deleteSecret(
    name: string,
    options?: SecretRequestOptions
  ): Promise<boolean> {
    const request = new avs_pb.DeleteSecretReq();
    request.setName(name);

    if (options?.workflowId) {
      request.setWorkflowId(options.workflowId);
    }

    if (options?.orgId) {
      request.setOrgId(options.orgId);
    }

    const result = await this.sendGrpcRequest<
      BoolValue,
      avs_pb.DeleteSecretReq
    >("deleteSecret", request, options);

    return result.getValue();
  }
}

export * from "./models/node/factory";
export * from "./models/trigger/factory";

export {
  Client,
  Workflow,
  Edge,
  Execution,
  Step,
  NodeFactory,
  TriggerFactory,
  TriggerReason,
  Secret,
};

export type {
  WorkflowProps,
  EdgeProps,
  ExecutionProps,
  StepProps,
  TriggerReasonProps,
  OutputDataProps,
  SecretProps,
  ListSecretResponse,
  SecretRequestOptions,
};
