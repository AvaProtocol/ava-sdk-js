import _ from "lodash";
import { credentials, Metadata } from "@grpc/grpc-js";
import { AggregatorClient } from "@/grpc_codegen/avs_grpc_pb";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { BoolValue } from "google-protobuf/google/protobuf/wrappers_pb";
import Workflow, { WorkflowProps } from "./models/workflow";
import Edge, { EdgeProps } from "./models/edge";
import Execution, { ExecutionProps, OutputDataProps } from "./models/execution";
import Step, { StepProps } from "./models/step";
import NodeFactory from "./models/node/factory";
import Node, { NodeProps, NodeData } from "./models/node/interface";
import TriggerFactory from "./models/trigger/factory";
import Secret from "./models/secret";
import type {
  GetKeyResponse,
  SecretRequestOptions,
  RequestOptions,
  ClientOption,
  SmartWallet,
  GetWalletRequest,
  GetExecutionsRequest,
  GetWorkflowsRequest,
  GetSignatureFormatResponse,
  RunNodeWithInputsRequest,
  RunNodeWithInputsResponse,
  SecretProps,
  PageInfo,
} from "@avaprotocol/types";

import { NodeType, TriggerType } from "@avaprotocol/types";

import { AUTH_KEY_HEADER, DEFAULT_LIMIT } from "@avaprotocol/types";

import { ExecutionStatus } from "@/grpc_codegen/avs_pb";

import TriggerReason, { TriggerReasonProps } from "./models/trigger/reason";
import BlockTrigger, { BlockTriggerProps } from "./models/trigger/block";

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
   * Get the signature format from the server
   * @param wallet - The wallet address
   * @returns {Promise<GetSignatureFormatResponse>} - The response containing the signature format
   */
  async getSignatureFormat(
    wallet: string
  ): Promise<GetSignatureFormatResponse> {
    const request = new avs_pb.GetSignatureFormatReq();
    request.setWallet(wallet);

    const result = await this.sendGrpcRequest<
      avs_pb.GetSignatureFormatResp,
      avs_pb.GetSignatureFormatReq
    >("getSignatureFormat", request);

    return { message: result.getMessage() };
  }

  /**
   * The API key could retrieve a wallet's authKey by skipping its signature verification
   * @param message - The message to sign, obtained from getSignatureFormat
   * @param apiKey - The API key used instead of a signature
   * @returns {Promise<GetKeyResponse>} - The response from the auth call
   */
  async authWithAPIKey({
    message,
    apiKey,
  }: {
    message: string;
    apiKey: string;
  }): Promise<GetKeyResponse> {
    const request = new avs_pb.GetKeyReq();
    request.setMessage(message);
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
   * @param message - The message to sign, obtained from getSignatureFormat
   * @param signature - The signature of the message
   * @returns {Promise<GetKeyResponse>} - The response from the auth call
   */
  async authWithSignature({
    message,
    signature,
  }: {
    message: string;
    signature: string;
  }): Promise<GetKeyResponse> {
    // Create a new GetKeyReq message
    const request = new avs_pb.GetKeyReq();
    request.setMessage(message);
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

  /**
   * Convert a protobuf Value to a JavaScript value
   * @param value - The protobuf Value object
   * @returns {any} - The converted JavaScript value
   */
  protected convertProtobufValueToJS(value: any): any {
    if (!value) return null;

    // Handle different value types based on protobuf Value structure
    if (value.hasNullValue && value.hasNullValue()) {
      return null;
    }
    if (value.hasNumberValue && value.hasNumberValue()) {
      return value.getNumberValue();
    }
    if (value.hasStringValue && value.hasStringValue()) {
      return value.getStringValue();
    }
    if (value.hasBoolValue && value.hasBoolValue()) {
      return value.getBoolValue();
    }
    if (value.hasStructValue && value.hasStructValue()) {
      const struct = value.getStructValue();
      const result: any = {};
      if (struct && struct.getFieldsMap) {
        const fieldsMap = struct.getFieldsMap();
        fieldsMap.forEach((fieldValue: any, key: string) => {
          result[key] = this.convertProtobufValueToJS(fieldValue);
        });
      }
      return result;
    }
    if (value.hasListValue && value.hasListValue()) {
      const list = value.getListValue();
      if (list && list.getValuesList) {
        return list
          .getValuesList()
          .map((item: any) => this.convertProtobufValueToJS(item));
      }
      return [];
    }

    // Fallback: try to extract primitive values directly
    if (typeof value.getNumberValue === "function") {
      return value.getNumberValue();
    }
    if (typeof value.getStringValue === "function") {
      return value.getStringValue();
    }
    if (typeof value.getBoolValue === "function") {
      return value.getBoolValue();
    }

    // If all else fails, return the raw value
    return value;
  }

  /**
   * Convert a JavaScript value to a protobuf Value
   * @param value - The JavaScript value to convert
   * @returns {any} - The protobuf Value object
   */
  protected convertJSValueToProtobuf(value: any): any {
    const protobufValue =
      new (require("google-protobuf/google/protobuf/struct_pb").Value)();

    if (value === null || value === undefined) {
      protobufValue.setNullValue(0); // NULL_VALUE = 0
    } else if (typeof value === "number") {
      protobufValue.setNumberValue(value);
    } else if (typeof value === "string") {
      protobufValue.setStringValue(value);
    } else if (typeof value === "boolean") {
      protobufValue.setBoolValue(value);
    } else if (Array.isArray(value)) {
      const listValue =
        new (require("google-protobuf/google/protobuf/struct_pb").ListValue)();
      const convertedValues = value.map((item) =>
        this.convertJSValueToProtobuf(item)
      );
      listValue.setValuesList(convertedValues);
      protobufValue.setListValue(listValue);
    } else if (typeof value === "object") {
      const structValue =
        new (require("google-protobuf/google/protobuf/struct_pb").Struct)();
      const fieldsMap = structValue.getFieldsMap();
      Object.entries(value).forEach(([key, val]) => {
        fieldsMap.set(key, this.convertJSValueToProtobuf(val));
      });
      protobufValue.setStructValue(structValue);
    } else {
      // Fallback: convert to string
      protobufValue.setStringValue(String(value));
    }

    return protobufValue;
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
      isHidden: result.getIsHidden(),
      totalTaskCount: result.getTotalTaskCount(),
      activeTaskCount: result.getActiveTaskCount(),
      completedTaskCount: result.getCompletedTaskCount(),
      failedTaskCount: result.getFailedTaskCount(),
      canceledTaskCount: result.getCanceledTaskCount(),
    };
  }

  /**
   * Set wallet properties including hiding/unhiding a wallet
   * @param {GetWalletRequest} walletRequest - The wallet request containing salt and optional factory address
   * @param {object} options - Options for the wallet
   * @param {boolean} options.isHidden - Whether the wallet should be hidden
   * @param {RequestOptions} requestOptions - Request options
   * @returns {Promise<SmartWallet>} - The updated SmartWallet object
   */
  async setWallet(
    { salt, factoryAddress }: GetWalletRequest,
    { isHidden }: { isHidden: boolean },
    requestOptions?: RequestOptions
  ): Promise<SmartWallet> {
    const request = new avs_pb.SetWalletReq();
    request.setSalt(salt);

    if (factoryAddress) {
      request.setFactoryAddress(factoryAddress);
    } else if (this.factoryAddress) {
      request.setFactoryAddress(this.factoryAddress);
    }

    request.setIsHidden(isHidden);

    const result = await this.sendGrpcRequest<
      avs_pb.GetWalletResp,
      avs_pb.SetWalletReq
    >("setWallet", request, requestOptions);

    return {
      address: result.getAddress(),
      salt: result.getSalt(),
      factory: result.getFactoryAddress(),
      isHidden: result.getIsHidden(),
      totalTaskCount: result.getTotalTaskCount(),
      activeTaskCount: result.getActiveTaskCount(),
      completedTaskCount: result.getCompletedTaskCount(),
      failedTaskCount: result.getFailedTaskCount(),
      canceledTaskCount: result.getCanceledTaskCount(),
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
  /**
   * Get the list of workflows for multiple addresses
   * @param {string[]} addresses - The list of addresses
   * @param {GetWorkflowsRequest} options - Request options
   * @param {string} [options.before] - Get items before this cursor value (for backward pagination)
   * @param {string} [options.after] - Get items after this cursor value (for forward pagination)
   * @param {number} [options.limit] - The page limit of the response; default is 10
   * @param {string} [options.authKey] - The auth key for the request
   * @returns {Promise<{ cursor: string; result: Workflow[]; hasMore: boolean }>} - The list of Workflow objects with pagination metadata
   */
  async getWorkflows(
    addresses: string[],
    options?: GetWorkflowsRequest
  ): Promise<{
    items: Workflow[];
    pageInfo: PageInfo;
  }> {
    const request = new avs_pb.ListTasksReq();
    for (const a of addresses) {
      request.addSmartWalletAddress(a);
    }

    if (options?.before) {
      request.setBefore(options.before);
    }
    if (options?.after) {
      request.setAfter(options.after);
    }

    request.setLimit(options?.limit || DEFAULT_LIMIT);

    // Set field control options
    if (options?.includeNodes) {
      request.setIncludeNodes(options.includeNodes);
    }
    if (options?.includeEdges) {
      request.setIncludeEdges(options.includeEdges);
    }

    const result = await this.sendGrpcRequest<
      avs_pb.ListTasksResp,
      avs_pb.ListTasksReq
    >("listTasks", request, options);

    const pageInfo = result.getPageInfo();
    if (!pageInfo) {
      throw new Error("Server response missing pagination info.");
    }

    return {
      items: result
        .getItemsList()
        .map((item) => Workflow.fromListResponse(item)),
      pageInfo: {
        startCursor: pageInfo.getStartCursor(),
        endCursor: pageInfo.getEndCursor(),
        hasPreviousPage: pageInfo.getHasPreviousPage(),
        hasNextPage: pageInfo.getHasNextPage(),
      },
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
   * @param {string} [options.before] - Get items before this cursor value (for backward pagination)
   * @param {string} [options.after] - Get items after this cursor value (for forward pagination)
   * @param {number} [options.limit] - The page limit of the response; default is 10
   * @param {string} [options.authKey] - The auth key for the request
   * @returns {Promise<{ cursor: string; result: Execution[]; hasMore: boolean }>} - The list of Execution objects with pagination metadata
   */
  async getExecutions(
    workflows: string[],
    options?: GetExecutionsRequest
  ): Promise<{
    items: Execution[];
    pageInfo: PageInfo;
  }> {
    const request = new avs_pb.ListExecutionsReq();
    for (const w of workflows) {
      request.addTaskIds(w);
    }

    if (options?.before) {
      request.setBefore(options.before);
    }
    if (options?.after) {
      request.setAfter(options.after);
    }

    request.setLimit(options?.limit || DEFAULT_LIMIT);

    const result = await this.sendGrpcRequest<
      avs_pb.ListExecutionsResp,
      avs_pb.ListExecutionsReq
    >("listExecutions", request, options);

    const pageInfo = result.getPageInfo();
    if (!pageInfo) {
      throw new Error("Server response missing pagination info.");
    }

    return {
      items: result.getItemsList().map((item) => Execution.fromResponse(item)),
      pageInfo: {
        startCursor: pageInfo.getStartCursor(),
        endCursor: pageInfo.getEndCursor(),
        hasPreviousPage: pageInfo.getHasPreviousPage(),
        hasNextPage: pageInfo.getHasNextPage(),
      },
    };
  }

  /**
   * Get a specific execution by id
   * @param {string} workflowId - The workflow id (taskId)
   * @param {string} executionId - The execution id
   * @param {RequestOptions} options - Request options
   * @returns {Promise<Execution>} - The Execution object
   */
  async getExecution(
    workflowId: string,
    executionId: string,
    options?: RequestOptions
  ): Promise<Execution> {
    const request = new avs_pb.ExecutionReq();
    request.setTaskId(workflowId);
    request.setExecutionId(executionId);

    const result = await this.sendGrpcRequest<
      avs_pb.Execution,
      avs_pb.ExecutionReq
    >("getExecution", request, options);

    return Execution.fromResponse(result);
  }

  /**
   * Get the count of executions for multiple workflows
   * @param workflows - The list of workflow ids
   * @param options - Request options
   * @returns {Promise<number>} - The count of executions
   */
  async getExecutionCount(
    workflows: string[],
    options?: RequestOptions
  ): Promise<number> {
    const request = new avs_pb.GetExecutionCountReq();
    request.setWorkflowIdsList(workflows);

    const result = await this.sendGrpcRequest<
      avs_pb.GetExecutionCountResp,
      avs_pb.GetExecutionCountReq
    >("getExecutionCount", request, options);

    return result.getTotal();
  }

  /**
   * Get the status of an execution
   * @param {string} workflowId - The workflow id (taskId)
   * @param {string} executionId - The execution id
   * @param {RequestOptions} options - Request options
   * @returns {Promise<ExecutionStatus>} - The status of the execution
   */
  async getExecutionStatus(
    workflowId: string,
    executionId: string,
    options?: RequestOptions
  ): Promise<ExecutionStatus> {
    const request = new avs_pb.ExecutionReq();
    request.setTaskId(workflowId);
    request.setExecutionId(executionId);

    const result = await this.sendGrpcRequest<
      avs_pb.ExecutionStatusResp,
      avs_pb.ExecutionReq
    >("getExecutionStatus", request, options);

    return result.getStatus();
  }

  /**
   * Get a workflow by id
   * @param {string} id - The workflow id
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
   * Trigger a workflow manually
   * @param {object} params - The trigger parameters
   * @param {string} params.id - The workflow id
   * @param {TriggerReasonProps} params.reason - The trigger reason
   * @param {boolean} [params.isBlocking=false] - Whether to wait for execution completion
   * @param {RequestOptions} [options] - Request options
   * @returns {Promise<avs_pb.UserTriggerTaskResp.AsObject>} - The execution result
   */
  async triggerWorkflow(
    {
      id,
      reason,
      isBlocking = false,
    }: {
      id: string;
      reason: TriggerReasonProps;
      isBlocking?: boolean;
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
   * Cancel a workflow
   * @param {string} id - The workflow id
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
   * Delete a workflow
   * @param {string} id - The workflow id
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

  /**
   * Create a new secret
   * @param {string} name - The name of the secret
   * @param {string} value - The value of the secret
   * @param {SecretRequestOptions} options - Request options
   * @returns {Promise<boolean>} - True if the secret was created successfully
   */
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
   * Update a secret
   * @param {string} name - The name of the secret
   * @param {string} value - The value of the secret
   * @param {SecretRequestOptions} options - Request options
   * @returns {Promise<boolean>} - True if the secret was updated successfully
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
   * Get the list of secrets
   * @param {SecretRequestOptions} options - Request options
   * @returns {Promise<{ cursor: string; result: Secret[]; hasMore: boolean }>} - The list of Secret objects with pagination metadata
   */
  async getSecrets(options?: SecretRequestOptions): Promise<{
    items: SecretProps[];
    pageInfo: PageInfo;
  }> {
    const request = new avs_pb.ListSecretsReq();

    if (options?.workflowId) {
      request.setWorkflowId(options.workflowId);
    }

    if (options?.before) {
      request.setBefore(options.before);
    }
    if (options?.after) {
      request.setAfter(options.after);
    }

    request.setLimit(options?.limit || DEFAULT_LIMIT);

    // Set field control options
    if (options?.includeTimestamps) {
      request.setIncludeTimestamps(options.includeTimestamps);
    }
    if (options?.includeCreatedBy) {
      request.setIncludeCreatedBy(options.includeCreatedBy);
    }
    if (options?.includeDescription) {
      request.setIncludeDescription(options.includeDescription);
    }

    const result = await this.sendGrpcRequest<
      avs_pb.ListSecretsResp,
      avs_pb.ListSecretsReq
    >("listSecrets", request, options);

    const pageInfo = result.getPageInfo();

    if (!pageInfo) {
      throw new Error("Server response missing pagination info.");
    }

    return {
      items: result.getItemsList().map(
        (item) =>
          new Secret({
            name: item.getName(),
            workflowId: item.getWorkflowId() || undefined,
            orgId: item.getOrgId() || undefined,
            createdAt: item.getCreatedAt() || undefined,
            updatedAt: item.getUpdatedAt() || undefined,
            createdBy: item.getCreatedBy() || undefined,
            description: item.getDescription() || undefined,
          })
      ),
      pageInfo: {
        startCursor: pageInfo.getStartCursor(),
        endCursor: pageInfo.getEndCursor(),
        hasPreviousPage: pageInfo.getHasPreviousPage(),
        hasNextPage: pageInfo.getHasNextPage(),
      },
    };
  }

  /**
   * Delete a secret
   * @param {string} name - The name of the secret
   * @param {SecretRequestOptions} options - Request options
   * @returns {Promise<boolean>} - True if the secret was deleted successfully
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

  /**
   * Run a node with inputs
   * @param {RunNodeWithInputsRequest} params - The parameters for running the node
   * @param {string} params.nodeType - The type of the node
   * @param {Record<string, any>} params.nodeConfig - The configuration for the node
   * @param {Record<string, any>} params.inputVariables - The input variables for the node
   * @param {string} params.walletAddress - The wallet address to use for the node
   * @param {RequestOptions} options - Request options
   * @returns {Promise<RunNodeWithInputsResponse>} - The response from running the node
   */
  async runNodeWithInputs(
    { nodeType, nodeConfig, inputVariables = {} }: RunNodeWithInputsRequest,
    options?: RequestOptions
  ): Promise<RunNodeWithInputsResponse> {
    try {
      // Special handling for blockTrigger nodes - they should reject input variables
      if (
        nodeType === "blockTrigger" &&
        inputVariables &&
        Object.keys(inputVariables).length > 0
      ) {
        const variableNames = Object.keys(inputVariables).join(", ");
        return {
          success: false,
          error: `blockTrigger nodes do not accept input variables. Received: ${variableNames}`,
          nodeId: "",
        };
      }

      // Create the request
      const request = new avs_pb.RunNodeWithInputsReq();
      request.setNodeType(nodeType);

      const nodeConfigMap = request.getNodeConfigMap();
      for (const [key, value] of Object.entries(nodeConfig)) {
        nodeConfigMap.set(key, this.convertJSValueToProtobuf(value));
      }

      if (inputVariables && Object.keys(inputVariables).length > 0) {
        const inputVarsMap = request.getInputVariablesMap();
        for (const [key, value] of Object.entries(inputVariables)) {
          inputVarsMap.set(key, this.convertJSValueToProtobuf(value));
        }
      }

      // Send the request directly to the server
      const result = await this.sendGrpcRequest<
        avs_pb.RunNodeWithInputsResp,
        avs_pb.RunNodeWithInputsReq
      >("runNodeWithInputs", request, options);

      let data: Record<string, any> | undefined;

      const outputCase = result.getOutputDataCase();
      if (
        outputCase !==
        avs_pb.RunNodeWithInputsResp.OutputDataCase.OUTPUT_DATA_NOT_SET
      ) {
        switch (outputCase) {
          case avs_pb.RunNodeWithInputsResp.OutputDataCase.ETH_TRANSFER:
            data = result.getEthTransfer()?.toObject();
            break;
          case avs_pb.RunNodeWithInputsResp.OutputDataCase.GRAPHQL:
            data = result.getGraphql()?.toObject();
            break;
          case avs_pb.RunNodeWithInputsResp.OutputDataCase.CONTRACT_READ:
            data = result.getContractRead()?.toObject();
            break;
          case avs_pb.RunNodeWithInputsResp.OutputDataCase.CONTRACT_WRITE:
            data = result.getContractWrite()?.toObject();
            break;
          case avs_pb.RunNodeWithInputsResp.OutputDataCase.CUSTOM_CODE:
            data = result.getCustomCode()?.toObject();
            break;
          case avs_pb.RunNodeWithInputsResp.OutputDataCase.REST_API:
            data = result.getRestApi()?.toObject();
            break;
          case avs_pb.RunNodeWithInputsResp.OutputDataCase.BRANCH:
            data = result.getBranch()?.toObject();
            break;
          case avs_pb.RunNodeWithInputsResp.OutputDataCase.FILTER:
            data = result.getFilter()?.toObject();
            break;
          case avs_pb.RunNodeWithInputsResp.OutputDataCase.LOOP:
            data = result.getLoop()?.toObject();
            break;
          case avs_pb.RunNodeWithInputsResp.OutputDataCase.BLOCK_TRIGGER:
            data = result.getBlockTrigger()?.toObject();
            break;
          case avs_pb.RunNodeWithInputsResp.OutputDataCase.FIXED_TIME_TRIGGER:
            data = result.getFixedTimeTrigger()?.toObject();
            break;
          case avs_pb.RunNodeWithInputsResp.OutputDataCase.CRON_TRIGGER:
            data = result.getCronTrigger()?.toObject();
            break;
          case avs_pb.RunNodeWithInputsResp.OutputDataCase.EVENT_TRIGGER:
            data = result.getEventTrigger()?.toObject();
            break;
        }
      }

      return {
        success: result.getSuccess(),
        data,
        error: result.getError(),
        nodeId: result.getNodeId(),
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "An error occurred",
      };
    }
  }

  private createNodeFromConfig(
    nodeType: string,
    config: Record<string, any>,
    nodeId: string
  ): Node {
    const nodeProps: NodeProps = {
      id: nodeId,
      name: `${nodeType}_node`,
      type: nodeType as NodeType,
      data: this.createNodeData(nodeType, config),
    };

    return NodeFactory.create(nodeProps);
  }

  private mapNodeTypeString(nodeType: string): NodeType | null {
    const typeMap: Record<string, NodeType> = {
      blockTrigger: NodeType.CustomCode, // Handle blockTrigger as special CustomCode case
      restApi: NodeType.RestAPI,
      contractRead: NodeType.ContractRead,
      contractWrite: NodeType.ContractWrite,
      customCode: NodeType.CustomCode,
      ethTransfer: NodeType.ETHTransfer,
      graphqlQuery: NodeType.GraphQLQuery,
      branch: NodeType.Branch,
      filter: NodeType.Filter,
      loop: NodeType.Loop,
    };

    return typeMap[nodeType] || null;
  }

  private createNodeData(
    nodeType: string,
    config: Record<string, any>
  ): NodeData {
    switch (nodeType) {
      case "blockTrigger":
        return {
          config: {
            lang: 0, // JavaScript
            source:
              "return { blockNumber: Math.floor(Math.random() * 10000000) };", // Simulate block trigger
          },
        };
      case "restApi":
        return {
          config: {
            url: config.url || "",
            method: config.method || "GET",
            body: config.body || "",
            headersMap: Object.entries(config.headers || {}),
          },
        };
      case "contractRead":
        return {
          config: {
            contractAddress: config.contractAddress || "",
            callData: config.callData || "",
            contractAbi: config.contractAbi || "",
          },
        };
      case "customCode":
        return {
          config: {
            lang: config.lang || 0, // JavaScript
            source:
              config.source ||
              'return { message: "Node executed successfully" };',
          },
        };
      case "loop":
        return {
          config: {
            sourceId: config.sourceId || "",
            iterVal: config.iterVal || "",
            iterKey: config.iterKey || "",
          },
        };
      case "branch":
        return {
          config: {
            conditionsList: config.conditions || [],
          },
        };
      case "filter":
        return {
          config: {
            expression: config.expression || "",
            sourceId: config.sourceId || config.input || "",
          },
        };
      default:
        throw new Error(`Unsupported node type: ${nodeType}`);
    }
  }

  private createTempWorkflowForNode(
    node: Node,
    triggerId: string,
    inputVariables: Record<string, any>
  ): Workflow {
    // For customCode nodes, we need to modify the source to include the input variables
    if (
      node.type === NodeType.CustomCode &&
      inputVariables &&
      Object.keys(inputVariables).length > 0
    ) {
      const customCodeData = node.data as avs_pb.CustomCodeNode.AsObject;
      if (customCodeData.config) {
        // Create a wrapper that defines the variables before executing the original code
        const variableDefinitions = Object.entries(inputVariables)
          .map(([key, value]) => {
            const valueStr =
              typeof value === "string" ? `"${value}"` : JSON.stringify(value);
            return `const ${key} = ${valueStr};`;
          })
          .join("\n");

        customCodeData.config.source = `${variableDefinitions}\n${customCodeData.config.source}`;
      }
    }

    // Create a manual trigger and store input variables in its data property
    const trigger = TriggerFactory.create({
      id: triggerId,
      name: "manual_trigger",
      type: TriggerType.Manual,
      data: inputVariables, // Store input variables in the trigger data
    });

    return new Workflow({
      smartWalletAddress: "",
      trigger: trigger,
      nodes: [node],
      edges: [
        new Edge({
          id: `edge_${Date.now()}`,
          source: triggerId,
          target: node.id,
        }),
      ],
      startAt: Date.now(),
      expiredAt: Date.now() + 3600000, // 1 hour from now
      maxExecution: 1,
    });
  }

  private extractNodeExecutionData(execution: any): Record<string, any> {
    return {
      executionId: execution.executionId,
      status: execution.status,
    };
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
  RunNodeWithInputsRequest,
  RunNodeWithInputsResponse,
};
