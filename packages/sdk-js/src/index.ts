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
import TriggerFactory from "./models/trigger/factory";
import Secret from "./models/secret";
import type {
  GetKeyResponse,
  RequestOptions,
  ClientOption,
  SmartWallet,
  GetWalletRequest,
  GetExecutionsOptions,
  GetWorkflowsOptions,
  GetSignatureFormatResponse,
  RunNodeWithInputsRequest,
  RunNodeWithInputsResponse,
  RunTriggerRequest,
  RunTriggerResponse,
  SecretProps,
  PageInfo,
  GetSecretsOptions,
  SecretOptions,
  TriggerDataProps,
} from "@avaprotocol/types";

import {
  TriggerType,
  NodeTypeGoConverter,
  TriggerTypeGoConverter,
  TriggerTypeConverter,
} from "@avaprotocol/types";

import { AUTH_KEY_HEADER, DEFAULT_LIMIT } from "@avaprotocol/types";

import { ExecutionStatus } from "@/grpc_codegen/avs_pb";

// Import the consolidated conversion utilities
import { convertProtobufValueToJs, convertJSValueToProtobuf } from "./utils";

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
   * Send a gRPC request with authentication and error handling
   * @param method - The method name to call
   * @param request - The request object
   * @param options - Request options
   * @returns {Promise<TResponse>} - The response from the server
   */
  protected sendGrpcRequest<TResponse, TRequest>(
    method: string,
    request: TRequest | any,
    options?: RequestOptions
  ): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      const metadata = new Metadata();

      // Set auth header if available (priority: options > instance variable)
      const authKey = options?.authKey || this.authKey;
      if (authKey) {
        metadata.set(AUTH_KEY_HEADER, authKey);
    }

      (this.rpcClient as any)[method](
        request,
        metadata,
        (error: any, response: TResponse) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
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
   * Get the list of workflows for multiple addresses
   * @param {string[]} addresses - The list of addresses
   * @param {GetWorkflowsOptions} options - Request options
   * @param {string} [options.before] - Get items before this cursor value (for backward pagination)
   * @param {string} [options.after] - Get items after this cursor value (for forward pagination)
   * @param {number} [options.limit] - The page limit of the response; default is 10
   * @param {boolean} [options.includeNodes] - Include task nodes (expensive field)
   * @param {boolean} [options.includeEdges] - Include task edges (expensive field)
   * @param {string} [options.authKey] - The auth key for the request
   * @returns {Promise<{ items: Workflow[]; pageInfo: PageInfo }>} - The list of Workflow objects with nested pagination metadata
   */
  async getWorkflows(
    addresses: string[],
    options?: GetWorkflowsOptions
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
   * Get the list of executions for multiple workflows
   * @param {string[]} workflows - The list of workflow ids to fetch execution for
   * @param {GetExecutionsOptions} options - Request options
   * @param {string} [options.before] - Get items before this cursor value (for backward pagination)
   * @param {string} [options.after] - Get items after this cursor value (for forward pagination)
   * @param {number} [options.limit] - The page limit of the response; default is 10
   * @param {string} [options.authKey] - The auth key for the request
   * @returns {Promise<{ items: Execution[]; pageInfo: PageInfo }>} - The list of Execution objects with nested pagination metadata
   */
  async getExecutions(
    workflows: string[],
    options?: GetExecutionsOptions
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
   * Trigger a workflow with the new flattened trigger data structure
   * @param {Object} params - The trigger parameters
   * @param {string} params.id - The workflow id
   * @param {TriggerDataProps} params.triggerData - The trigger data
   * @param {boolean} params.isBlocking - Whether to block until execution completes
   * @param {RequestOptions} options - Request options
   * @returns {Promise<avs_pb.TriggerTaskResp.AsObject>} - The response from triggering the workflow
   */
  async triggerWorkflow(
    {
      id,
      triggerData,
      isBlocking = false,
    }: {
      id: string;
      triggerData: TriggerDataProps;
      isBlocking?: boolean;
    },
    options?: RequestOptions
  ): Promise<avs_pb.TriggerTaskResp.AsObject> {
    const request = new avs_pb.TriggerTaskReq();

    request.setTaskId(id);
    request.setTriggerType(TriggerTypeConverter.toProtobuf(triggerData.type));
    request.setIsBlocking(isBlocking);

    // Set the appropriate trigger output based on type
    switch (triggerData.type) {
      case TriggerType.FixedTime: {
        const fixedTimeOutput = new avs_pb.FixedTimeTrigger.Output();
        fixedTimeOutput.setTimestamp((triggerData as any).timestamp);
        fixedTimeOutput.setTimestampIso((triggerData as any).timestampIso);
        request.setFixedTimeTrigger(fixedTimeOutput);
        break;
      }
      case TriggerType.Cron: {
        const cronOutput = new avs_pb.CronTrigger.Output();
        cronOutput.setTimestamp((triggerData as any).timestamp);
        cronOutput.setTimestampIso((triggerData as any).timestampIso);
        request.setCronTrigger(cronOutput);
        break;
      }
      case TriggerType.Block: {
        const blockData = triggerData as any;
        const blockOutput = new avs_pb.BlockTrigger.Output();
        blockOutput.setBlockNumber(blockData.blockNumber);
        if (blockData.blockHash) blockOutput.setBlockHash(blockData.blockHash);
        if (blockData.timestamp) blockOutput.setTimestamp(blockData.timestamp);
        if (blockData.parentHash) blockOutput.setParentHash(blockData.parentHash);
        if (blockData.difficulty) blockOutput.setDifficulty(blockData.difficulty);
        if (blockData.gasLimit) blockOutput.setGasLimit(blockData.gasLimit);
        if (blockData.gasUsed) blockOutput.setGasUsed(blockData.gasUsed);
        request.setBlockTrigger(blockOutput);
        break;
      }
      case TriggerType.Event: {
        const eventData = triggerData as any;
        const eventOutput = new avs_pb.EventTrigger.Output();
        if (eventData.evmLog) {
          const evmLog = new avs_pb.Evm.Log();
          evmLog.setAddress(eventData.evmLog.address);
          evmLog.setBlockNumber(eventData.evmLog.blockNumber);
          evmLog.setTransactionHash(eventData.evmLog.transactionHash);
          evmLog.setIndex(eventData.evmLog.index);
          eventOutput.setEvmLog(evmLog);
        }
        if (eventData.transferLog) {
          const transferLog = new avs_pb.EventTrigger.TransferLogOutput();
          transferLog.setTokenName(eventData.transferLog.tokenName);
          transferLog.setTokenSymbol(eventData.transferLog.tokenSymbol);
          transferLog.setTokenDecimals(eventData.transferLog.tokenDecimals);
          transferLog.setTransactionHash(eventData.transferLog.transactionHash);
          transferLog.setAddress(eventData.transferLog.address);
          transferLog.setBlockNumber(eventData.transferLog.blockNumber);
          transferLog.setBlockTimestamp(eventData.transferLog.blockTimestamp);
          transferLog.setFromAddress(eventData.transferLog.fromAddress);
          transferLog.setToAddress(eventData.transferLog.toAddress);
          transferLog.setValue(eventData.transferLog.value);
          transferLog.setValueFormatted(eventData.transferLog.valueFormatted);
          transferLog.setTransactionIndex(eventData.transferLog.transactionIndex);
          transferLog.setLogIndex(eventData.transferLog.logIndex);
          eventOutput.setTransferLog(transferLog);
        }
        request.setEventTrigger(eventOutput);
        break;
      }
      case TriggerType.Manual: {
        const manualData = triggerData as any;
        const manualOutput = new avs_pb.ManualTrigger.Output();
        if (manualData.runAt) manualOutput.setRunAt(manualData.runAt);
        request.setManualTrigger(manualOutput);
        break;
      }
      case TriggerType.Unspecified:
        // No output data for unspecified triggers
        break;
      default:
        throw new Error(`Unsupported trigger type: ${(triggerData as any).type}`);
    }

    const result = await this.sendGrpcRequest<
      avs_pb.TriggerTaskResp,
      avs_pb.TriggerTaskReq
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
   * @param {SecretOptions} [options] - Request options
   * @param {string} [options.workflowId] - The workflow ID to associate the secret with
   * @param {string} [options.orgId] - The organization ID to associate the secret with
   * @param {string} [options.authKey] - The auth key for the request
   * @returns {Promise<boolean>} - True if the secret was created successfully
   */
  async createSecret(
    name: string,
    value: string,
    options?: SecretOptions
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
   * @param {SecretOptions} [options] - Request options
   * @param {string} [options.workflowId] - The workflow ID to associate the secret with
   * @param {string} [options.orgId] - The organization ID to associate the secret with
   * @param {string} [options.authKey] - The auth key for the request
   * @returns {Promise<boolean>} - True if the secret was updated successfully
   */
  async updateSecret(
    name: string,
    value: string,
    options?: SecretOptions
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
   * @param {GetSecretsOptions} options - Request options
   * @param {string} [options.workflowId] - Filter secrets by workflow ID
   * @param {string} [options.orgId] - Filter secrets by organization ID
   * @param {string} [options.before] - Get items before this cursor value (for backward pagination)
   * @param {string} [options.after] - Get items after this cursor value (for forward pagination)
   * @param {number} [options.limit] - The page limit of the response; default is 10
   * @param {boolean} [options.includeTimestamps] - Include created_at and updated_at fields
   * @param {boolean} [options.includeCreatedBy] - Include created_by field
   * @param {boolean} [options.includeDescription] - Include description field
   * @param {string} [options.authKey] - The auth key for the request
   * @returns {Promise<{ items: SecretProps[]; pageInfo: PageInfo }>} - The list of Secret objects with nested pagination metadata
   */
  async getSecrets(options?: GetSecretsOptions): Promise<{
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
   * @param {SecretOptions} [options] - Request options
   * @param {string} [options.workflowId] - The workflow ID to associate the secret with
   * @param {string} [options.orgId] - The organization ID to associate the secret with
   * @param {string} [options.authKey] - The auth key for the request
   * @returns {Promise<boolean>} - True if the secret was deleted successfully
   */
  async deleteSecret(name: string, options?: SecretOptions): Promise<boolean> {
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
   * Run a node with inputs for testing purposes
   * @param {RunNodeWithInputsRequest} params - The parameters for running the node
   * @param {string} params.nodeType - The type of the node (restApi, customCode, etc.)
   * @param {Record<string, any>} params.nodeConfig - The configuration for the node
   * @param {Record<string, any>} params.inputVariables - Variables to pass to the node
   * @param {RequestOptions} options - Request options
   * @returns {Promise<RunNodeWithInputsResponse>} - The response from running the node
   */
  async runNodeWithInputs(
    { nodeType, nodeConfig, inputVariables = {} }: RunNodeWithInputsRequest,
    options?: RequestOptions
  ): Promise<RunNodeWithInputsResponse> {
    // Reject trigger types - they should use the runTrigger method instead
    const triggerTypes = [
      TriggerType.Block,
      TriggerType.FixedTime,
      TriggerType.Cron,
      TriggerType.Event,
      TriggerType.Manual,
    ];
    if (triggerTypes.includes(nodeType as TriggerType)) {
        return {
          success: false,
        error: `Trigger type "${nodeType}" should use the runTrigger() method instead of runNodeWithInputs()`,
          nodeId: "",
        };
      }

      // Create the request
      const request = new avs_pb.RunNodeWithInputsReq();
      
    // Convert string nodeType to protobuf enum for regular nodes
    const protobufNodeType = NodeTypeGoConverter.fromGoString(nodeType);
      request.setNodeType(protobufNodeType);

      const nodeConfigMap = request.getNodeConfigMap();
      for (const [key, value] of Object.entries(nodeConfig)) {
      nodeConfigMap.set(key, convertJSValueToProtobuf(value));
      }

      if (inputVariables && Object.keys(inputVariables).length > 0) {
        const inputVarsMap = request.getInputVariablesMap();
        for (const [key, value] of Object.entries(inputVariables)) {
        inputVarsMap.set(key, convertJSValueToProtobuf(value));
        }
      }

      // Send the request directly to the server
      const result = await this.sendGrpcRequest<
        avs_pb.RunNodeWithInputsResp,
        avs_pb.RunNodeWithInputsReq
      >("runNodeWithInputs", request, options);

      return {
        success: result.getSuccess(),
      data: NodeFactory.fromOutputData(result),
        error: result.getError(),
        nodeId: result.getNodeId(),
      };
  }

  /**
   * Run a trigger for testing purposes
   * @param {RunTriggerRequest} params - The parameters for running the trigger
   * @param {string} params.triggerType - The type of the trigger (blockTrigger, cronTrigger, etc.)
   * @param {Record<string, any>} params.triggerConfig - The configuration for the trigger
   * @param {RequestOptions} options - Request options
   * @returns {Promise<RunTriggerResponse>} - The response from running the trigger
   */
  async runTrigger(
    { triggerType, triggerConfig }: RunTriggerRequest,
    options?: RequestOptions
  ): Promise<RunTriggerResponse> {
    // Create the request
    const request = new avs_pb.RunTriggerReq();

    // Convert string triggerType to protobuf enum
    const protobufTriggerType =
      TriggerTypeGoConverter.fromGoString(triggerType);
    request.setTriggerType(protobufTriggerType);

    // Set trigger configuration
    const triggerConfigMap = request.getTriggerConfigMap();
    for (const [key, value] of Object.entries(triggerConfig)) {
      triggerConfigMap.set(key, convertJSValueToProtobuf(value));
    }

    // Send the request directly to the server
    const result = await this.sendGrpcRequest<
      avs_pb.RunTriggerResp,
      avs_pb.RunTriggerReq
    >("runTrigger", request, options);

    return {
      success: result.getSuccess(),
      data: TriggerFactory.fromOutputData(result),
      error: result.getError(),
      triggerId: result.getTriggerId(),
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
  Secret,
};

export type {
  WorkflowProps,
  EdgeProps,
  ExecutionProps,
  StepProps,
  OutputDataProps,
  RunNodeWithInputsRequest,
  RunNodeWithInputsResponse,
  RunTriggerRequest,
  RunTriggerResponse,
};
