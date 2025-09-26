import { credentials, Metadata, status } from "@grpc/grpc-js";
import { AggregatorClient } from "@/grpc_codegen/avs_grpc_pb";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import Workflow from "./models/workflow";
import Edge from "./models/edge";
import Execution from "./models/execution";
import Step from "./models/step";
import NodeFactory from "./models/node/factory";
import TriggerFactory from "./models/trigger/factory";
import Secret from "./models/secret";
import {
  TriggerType,
  NodeTypeGoConverter,
  TriggerTypeGoConverter,
  TriggerTypeConverter,
  AUTH_KEY_HEADER,
  DEFAULT_LIMIT,
  ErrorCode,
  type WorkflowProps,
  type GetKeyResponse,
  type RequestOptions,
  type ClientOption,
  type SmartWallet,
  type GetWalletRequest,
  type GetExecutionsOptions,
  type GetWorkflowsOptions,
  type GetSignatureFormatResponse,
  type RunNodeWithInputsRequest,
  type RunNodeWithInputsResponse,
  type RunTriggerRequest,
  type RunTriggerResponse,
  type SecretProps,
  type PageInfo,
  type GetSecretsOptions,
  type SecretOptions,
  type TriggerDataProps,
  type SimulateWorkflowRequest,
  type ExecutionProps,
  type GetTokenMetadataRequest,
  type GetTokenMetadataResponse,
  type TokenSource,
  type TimeoutConfig,
  type TimeoutError,
  TimeoutPresets,
  // Import the new structured response types
  type CreateSecretResponse,
  type UpdateSecretResponse,
  type DeleteSecretResponse,
  type CancelTaskResponse,
  type DeleteTaskResponse,
  type GetExecutionStatsResponse,
  type GetExecutionStatsOptions,
  ExecutionStatus,
  type TriggerWorkflowResponse,
  type WithdrawFundsRequest,
  type WithdrawFundsResponse,
  // Fee estimation types
  type EstimateFeesRequest,
  type EstimateFeesResponse,
  type FeeAmount,
  type GasFeeBreakdown,
  type NodeGasFee,
  type AutomationFee,
  type AutomationFeeComponent,
  type SmartWalletCreationFee,
  type Discount
} from "@avaprotocol/types";

import { ExecutionStatus as ProtobufExecutionStatus } from "@/grpc_codegen/avs_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";

// Import the consolidated conversion utilities
import {
  convertProtobufValueToJs,
  convertJSValueToProtobuf,
  cleanGrpcErrorMessage,
  toCamelCaseKeys,
} from "./utils";


/**
 * Convert protobuf ExecutionStatus numeric value to meaningful string enum
 * @param protobufStatus - The numeric status from protobuf (0=UNSPECIFIED, 1=PENDING, 2=SUCCESS, 3=FAILED, 4=PARTIAL_SUCCESS)
 * @returns {ExecutionStatus} - The meaningful string enum value
 */
function convertProtobufExecutionStatus(
  protobufStatus: ProtobufExecutionStatus
): ExecutionStatus {
  switch (protobufStatus) {
    case ProtobufExecutionStatus.EXECUTION_STATUS_PENDING:
      return ExecutionStatus.Pending;
    case ProtobufExecutionStatus.EXECUTION_STATUS_SUCCESS:
      return ExecutionStatus.Success;
    case ProtobufExecutionStatus.EXECUTION_STATUS_FAILED:
      return ExecutionStatus.Failed;
    case ProtobufExecutionStatus.EXECUTION_STATUS_PARTIAL_SUCCESS:
      return ExecutionStatus.PartialSuccess;
    case ProtobufExecutionStatus.EXECUTION_STATUS_UNSPECIFIED:
    default:
      return ExecutionStatus.Unspecified;
  }
}

class BaseClient {
  readonly endpoint: string;

  readonly rpcClient;
  protected metadata: Metadata;
  protected factoryAddress?: string;
  protected authKey?: string;
  protected timeoutConfig: TimeoutConfig;

  constructor(opts: ClientOption) {
    this.endpoint = opts.endpoint;
    this.rpcClient = new AggregatorClient(
      this.endpoint,
      credentials.createInsecure()
    );

    this.factoryAddress = opts.factoryAddress;

    // Set default timeout configuration (NO_RETRY strategy)
    this.timeoutConfig = {
      timeout: 30000,
      retries: 0,
      retryDelay: 0,
      ...opts.timeout,
    };

    // Create a new Metadata object for request headers
    this.metadata = new Metadata();
  }

  /**
   * Set default timeout configuration for all requests
   * @param config - The timeout configuration
   */
  public setTimeoutConfig(config: TimeoutConfig): void {
    this.timeoutConfig = { ...this.timeoutConfig, ...config };
  }

  /**
   * Get the current timeout configuration
   * @returns {TimeoutConfig} - The current timeout configuration
   */
  public getTimeoutConfig(): TimeoutConfig {
    return { ...this.timeoutConfig };
  }

  /**
   * Send a fast gRPC request using FAST preset (5s timeout, 2 retries)
   * @param method - The method name to call
   * @param request - The request object
   * @param options - Request options
   * @returns {Promise<TResponse>} - The response from the server
   */
  protected sendFastRequest<TResponse, TRequest>(
    method: string,
    request: TRequest | any,
    options?: RequestOptions
  ): Promise<TResponse> {
    return this.sendGrpcRequest(method, request, {
      ...options,
      timeout: TimeoutPresets.FAST,
    });
  }

  /**
   * Send a slow gRPC request using SLOW preset (2min timeout, 2 retries)
   * @param method - The method name to call
   * @param request - The request object
   * @param options - Request options
   * @returns {Promise<TResponse>} - The response from the server
   */
  protected sendSlowRequest<TResponse, TRequest>(
    method: string,
    request: TRequest | any,
    options?: RequestOptions
  ): Promise<TResponse> {
    return this.sendGrpcRequest(method, request, {
      ...options,
      timeout: TimeoutPresets.SLOW,
    });
  }

  /**
   * Send a no-retry gRPC request using NO_RETRY preset (30s timeout, no retries)
   * @param method - The method name to call
   * @param request - The request object
   * @param options - Request options
   * @returns {Promise<TResponse>} - The response from the server
   */
  protected sendNoRetryRequest<TResponse, TRequest>(
    method: string,
    request: TRequest | any,
    options?: RequestOptions
  ): Promise<TResponse> {
    return this.sendGrpcRequest(method, request, {
      ...options,
      timeout: TimeoutPresets.NO_RETRY,
    });
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
   * Send a gRPC request with authentication, timeout support, and error handling
   * @param method - The method name to call
   * @param request - The request object
   * @param options - Request options including timeout configuration
   * @returns {Promise<TResponse>} - The response from the server
   */
  protected sendGrpcRequest<TResponse, TRequest>(
    method: string,
    request: TRequest | any,
    options?: RequestOptions
  ): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      // Merge timeout configuration (priority: options > instance config > defaults)
      const timeoutConfig = {
        ...this.timeoutConfig,
        ...options?.timeout,
      };

      const {
        timeout = timeoutConfig.timeout || 30000,
        retries = timeoutConfig.retries || 3,
        retryDelay = timeoutConfig.retryDelay || 1000,
      } = timeoutConfig;

      let attempt = 0;

      const executeRequest = () => {
        attempt++;

        // Create a timeout promise with proper cleanup
        let timeoutId: NodeJS.Timeout;
        const timeoutPromise = new Promise<never>((_, timeoutReject) => {
          timeoutId = setTimeout(() => {
            const error = new Error(
              `gRPC request timeout after ${timeout}ms for method ${method}`
            ) as TimeoutError;
            error.isTimeout = true;
            error.attemptsMade = attempt;
            error.methodName = method;
            timeoutReject(error);
          }, timeout);
        });

        // Create the actual gRPC call promise
        const grpcPromise = new Promise<TResponse>(
          (grpcResolve, grpcReject) => {
            const metadata = new Metadata();

            // Set auth header if available (priority: options > instance variable)
            const authKey = options?.authKey || this.authKey;
            if (authKey) {
              metadata.set(AUTH_KEY_HEADER, authKey);
            }

            const call = (this.rpcClient as any)[method](
              request,
              metadata,
              (error: any, response: TResponse) => {
                if (error) {
                  grpcReject(error);
                } else {
                  grpcResolve(response);
                }
              }
            );

            // Handle call cancellation on timeout
            timeoutPromise.catch(() => {
              if (call && call.cancel) {
                call.cancel();
              }
            });
          }
        );

        // Race between timeout and actual call
        Promise.race([grpcPromise, timeoutPromise])
          .then((result) => {
            // Clear the timeout when request completes successfully
            clearTimeout(timeoutId);
            resolve(result);
          })
          .catch((error: any) => {
            // Clear the timeout when request fails
            clearTimeout(timeoutId);

            const isTimeoutError =
              error.isTimeout || error.message?.includes("timeout");
            const isRetryableError =
              isTimeoutError ||
              error.code === status.UNAVAILABLE ||
              error.code === status.DEADLINE_EXCEEDED ||
              error.code === status.RESOURCE_EXHAUSTED;

            if (isRetryableError && attempt < retries) {
              console.warn(
                `gRPC ${method} attempt ${attempt} failed, retrying in ${retryDelay}ms:`,
                error.message
              );
              setTimeout(executeRequest, retryDelay);
            } else {
              // Add timeout context to error if it's a timeout
              if (isTimeoutError && !error.isTimeout) {
                (error as TimeoutError).isTimeout = true;
                (error as TimeoutError).attemptsMade = attempt;
                (error as TimeoutError).methodName = method;
              }

              // Clean up gRPC error messages before rejecting
              if (error.message) {
                error.message = cleanGrpcErrorMessage(error.message);
              }

              reject(error);
            }
          });
      };

      executeRequest();
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
   * Withdraw funds from a smart wallet using UserOp
   * @param {WithdrawFundsRequest} withdrawRequest - The withdraw request parameters
   * @param {string} withdrawRequest.recipientAddress - The recipient address to send funds to
   * @param {string} withdrawRequest.amount - The amount to withdraw in wei for ETH or smallest token unit for ERC20
   * @param {string} withdrawRequest.token - Token type: "ETH" for native ETH, or contract address for ERC20 tokens
   * @param {string} withdrawRequest.smartWalletAddress - Required: Smart wallet address to withdraw from (must be from user's getWallet() call)
   * @param {RequestOptions} options - Request options
   * @returns {Promise<WithdrawFundsResponse>} - The response from the withdraw operation
   */
  async withdrawFunds(
    {
      recipientAddress,
      amount,
      token,
      smartWalletAddress,
    }: WithdrawFundsRequest,
    options?: RequestOptions
  ): Promise<WithdrawFundsResponse> {
    const request = new avs_pb.WithdrawFundsReq();
    request.setRecipientAddress(recipientAddress);
    request.setAmount(amount);
    request.setToken(token);
    request.setSmartWalletAddress(smartWalletAddress);

    const result = await this.sendGrpcRequest<
      avs_pb.WithdrawFundsResp,
      avs_pb.WithdrawFundsReq
    >("withdrawFunds", request, options);

    return {
      success: result.getSuccess(),
      status: result.getStatus(),
      message: result.getMessage(),
      userOpHash: result.getUserOpHash() || undefined,
      transactionHash: result.getTransactionHash() || undefined,
      submittedAt: result.getSubmittedAt() || undefined,
      smartWalletAddress: result.getSmartWalletAddress(),
      recipientAddress: result.getRecipientAddress(),
      amount: result.getAmount(),
      token: result.getToken(),
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
   * @returns {Promise<{ items: WorkflowProps[]; pageInfo: PageInfo }>} - The list of WorkflowProps objects with nested pagination metadata
   */
  async getWorkflows(
    addresses: string[],
    options?: GetWorkflowsOptions
  ): Promise<{
    items: WorkflowProps[];
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
        .map((item) => Workflow.fromListResponse(item).toJson()),
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
   * @returns {Promise<{ items: ExecutionProps[]; pageInfo: PageInfo }>} - The list of ExecutionProps objects with nested pagination metadata
   */
  async getExecutions(
    workflows: string[],
    options?: GetExecutionsOptions
  ): Promise<{
    items: ExecutionProps[];
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
      items: result
        .getItemsList()
        .map((item) => Execution.fromResponse(item).toJson()),
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
   * @returns {Promise<ExecutionProps>} - The ExecutionProps object
   */
  async getExecution(
    workflowId: string,
    executionId: string,
    options?: RequestOptions
  ): Promise<ExecutionProps> {
    const request = new avs_pb.ExecutionReq();
    request.setTaskId(workflowId);
    request.setExecutionId(executionId);

    const result = await this.sendGrpcRequest<
      avs_pb.Execution,
      avs_pb.ExecutionReq
    >("getExecution", request, options);

    return Execution.fromResponse(result).toJson();
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
   * Get execution statistics for a specified time period
   * @param {GetExecutionStatsOptions} options - Request options
   * @param {string[]} [options.workflowIds] - Optional array of workflow IDs
   * @param {number} [options.days] - Number of days to look back (default: 7)
   * @param {string} [options.authKey] - The auth key for the request
   * @returns {Promise<GetExecutionStatsResponse>} - Execution statistics
   */
  async getExecutionStats(
    options?: GetExecutionStatsOptions
  ): Promise<GetExecutionStatsResponse> {
    const request = new avs_pb.GetExecutionStatsReq();

    if (options?.workflowIds && options.workflowIds.length > 0) {
      request.setWorkflowIdsList(options.workflowIds);
    }

    if (options?.days) {
      request.setDays(options.days);
    }

    const result = await this.sendGrpcRequest<
      avs_pb.GetExecutionStatsResp,
      avs_pb.GetExecutionStatsReq
    >("getExecutionStats", request, options);

    return {
      total: result.getTotal(),
      succeeded: result.getSucceeded(),
      failed: result.getFailed(),
      avgExecutionTime: result.getAvgExecutionTime(),
    };
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

    return convertProtobufExecutionStatus(result.getStatus());
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
   * Trigger a workflow with enhanced response including workflowId and optional execution details
   * @param {Object} params - The trigger parameters
   * @param {string} params.id - The workflow id
   * @param {TriggerDataProps} params.triggerData - The trigger data
   * @param {boolean} params.isBlocking - Whether to block until execution completes
   * @param {RequestOptions} options - Request options
   * @returns {Promise<TriggerWorkflowResponse>} - Enhanced response with workflowId and execution details
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
  ): Promise<TriggerWorkflowResponse> {
    const request = new avs_pb.TriggerTaskReq();

    request.setTaskId(id);
    request.setTriggerType(TriggerTypeConverter.toProtobuf(triggerData.type));
    request.setIsBlocking(isBlocking);

    // Set the appropriate trigger output based on type
    switch (triggerData.type) {
      case TriggerType.FixedTime: {
        const fixedTimeData = triggerData as any;
        const fixedTimeOutput = new avs_pb.FixedTimeTrigger.Output();
        const triggerOutputData = {
          timestamp: fixedTimeData.timestamp,
          timestampIso: fixedTimeData.timestampIso,
        };
        const dataValue = new google_protobuf_struct_pb.Value();
        dataValue.setStructValue(
          google_protobuf_struct_pb.Struct.fromJavaScript(triggerOutputData)
        );
        fixedTimeOutput.setData(dataValue);
        request.setFixedTimeTrigger(fixedTimeOutput);
        break;
      }
      case TriggerType.Cron: {
        const cronData = triggerData as any;
        const cronOutput = new avs_pb.CronTrigger.Output();
        const triggerOutputData = {
          timestamp: cronData.timestamp,
          timestampIso: cronData.timestampIso,
        };
        const dataValue = new google_protobuf_struct_pb.Value();
        dataValue.setStructValue(
          google_protobuf_struct_pb.Struct.fromJavaScript(triggerOutputData)
        );
        cronOutput.setData(dataValue);
        request.setCronTrigger(cronOutput);
        break;
      }
      case TriggerType.Block: {
        const blockData = triggerData as any;
        const blockOutput = new avs_pb.BlockTrigger.Output();
        const triggerOutputData = {
          blockNumber: blockData.blockNumber,
          blockHash: blockData.blockHash || "",
          timestamp: blockData.timestamp || 0,
          parentHash: blockData.parentHash || "",
          difficulty: blockData.difficulty || "",
          gasLimit: blockData.gasLimit || 0,
          gasUsed: blockData.gasUsed || 0,
        };
        const dataValue = new google_protobuf_struct_pb.Value();
        dataValue.setStructValue(
          google_protobuf_struct_pb.Struct.fromJavaScript(triggerOutputData)
        );
        blockOutput.setData(dataValue);
        request.setBlockTrigger(blockOutput);
        break;
      }
      case TriggerType.Event: {
        const eventData = triggerData as any;
        const eventOutput = new avs_pb.EventTrigger.Output();

        // Convert JavaScript data to protobuf Value
        if (eventData.data) {
          const protobufValue = convertJSValueToProtobuf(eventData.data);
          eventOutput.setData(protobufValue);
        }

        request.setEventTrigger(eventOutput);
        break;
      }
      case TriggerType.Manual: {
        const manualData = triggerData as any;
        const manualOutput = new avs_pb.ManualTrigger.Output();

        // Convert JavaScript data to protobuf Value
        if (manualData.data) {
          const protobufValue = convertJSValueToProtobuf(manualData.data);
          manualOutput.setData(protobufValue);
        }

        request.setManualTrigger(manualOutput);
        break;
      }
      case TriggerType.Unspecified:
        // No output data for unspecified triggers
        break;
      default:
        throw new Error(
          `Unsupported trigger type: ${(triggerData as any).type}`
        );
    }

    const result = await this.sendGrpcRequest<
      avs_pb.TriggerTaskResp,
      avs_pb.TriggerTaskReq
    >("triggerTask", request, options);

    const responseObject = result.toObject();

    // Transform to TriggerWorkflowResponse format
    const response: TriggerWorkflowResponse = {
      executionId: responseObject.executionId,
      status: convertProtobufExecutionStatus(result.getStatus()),
      workflowId: responseObject.workflowId,
    };

    // Add optional fields if present
    if (responseObject.startAt !== undefined) {
      response.startAt = responseObject.startAt;
    }
    if (responseObject.endAt !== undefined) {
      response.endAt = responseObject.endAt;
    }
    // Note: success field was removed from TriggerTaskResp protobuf
    if (responseObject.error) {
      response.error = responseObject.error;
    }
    if (responseObject.stepsList && responseObject.stepsList.length > 0) {
      response.steps = responseObject.stepsList.map(step => {
        // Extract output data from the appropriate oneof field
        let output: unknown = undefined;
        if (step.blockTrigger) output = step.blockTrigger;
        else if (step.fixedTimeTrigger) output = step.fixedTimeTrigger;
        else if (step.cronTrigger) output = step.cronTrigger;
        else if (step.eventTrigger) output = step.eventTrigger;
        else if (step.manualTrigger) output = step.manualTrigger;
        else if (step.ethTransfer) output = step.ethTransfer;
        else if (step.graphql) output = step.graphql;
        else if (step.contractRead) output = step.contractRead;
        else if (step.contractWrite) output = step.contractWrite;
        else if (step.customCode) output = step.customCode;
        else if (step.restApi) output = step.restApi;
        else if (step.branch) output = step.branch;
        else if (step.filter) output = step.filter;
        else if (step.loop) output = step.loop;

        return {
          id: step.id,
          type: step.type,
          name: step.name,
          success: step.success,
          error: step.error,
          log: step.log,
          inputsList: step.inputsList,
          config: step.config,
          output: output,
          startAt: step.startAt,
          endAt: step.endAt,
        };
      });
    }

    return response;
  }

  /**
   * Cancel a workflow
   * @param {string} id - The workflow id
   * @param {RequestOptions} options - Request options
   * @returns {Promise<CancelTaskResponse>} - The response from canceling the workflow
   */
  async cancelWorkflow(
    id: string,
    options?: RequestOptions
  ): Promise<CancelTaskResponse> {
    const request = new avs_pb.IdReq();
    request.setId(id);

    const result = await this.sendGrpcRequest<
      avs_pb.CancelTaskResp,
      avs_pb.IdReq
    >("cancelTask", request, options);

    return {
      success: result.getSuccess(),
      status: result.getStatus(),
      message: result.getMessage(),
      cancelledAt: result.getCancelledAt() || undefined,
      id: result.getId(),
      previousStatus: result.getPreviousStatus(),
    };
  }

  /**
   * Delete a workflow
   * @param {string} id - The workflow id
   * @param {RequestOptions} options - Request options
   * @returns {Promise<DeleteTaskResponse>} - The response from deleting the workflow
   */
  async deleteWorkflow(
    id: string,
    options?: RequestOptions
  ): Promise<DeleteTaskResponse> {
    const request = new avs_pb.IdReq();
    request.setId(id);

    const result = await this.sendGrpcRequest<
      avs_pb.DeleteTaskResp,
      avs_pb.IdReq
    >("deleteTask", request, options);

    return {
      success: result.getSuccess(),
      status: result.getStatus(),
      message: result.getMessage(),
      deletedAt: result.getDeletedAt() || undefined,
      id: result.getId(),
      previousStatus: result.getPreviousStatus(),
    };
  }

  /**
   * Create a new secret
   * @param {string} name - The name of the secret
   * @param {string} value - The value of the secret
   * @param {SecretOptions} [options] - Request options
   * @param {string} [options.workflowId] - The workflow ID to associate the secret with
   * @param {string} [options.orgId] - The organization ID to associate the secret with
   * @param {string} [options.authKey] - The auth key for the request
   * @returns {Promise<CreateSecretResponse>} - Structured response with creation details
   */
  async createSecret(
    name: string,
    value: string,
    options?: SecretOptions
  ): Promise<CreateSecretResponse> {
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
      avs_pb.CreateSecretResp,
      avs_pb.CreateOrUpdateSecretReq
    >("createSecret", request, options);

    return {
      success: result.getSuccess(),
      status: result.getStatus(),
      message: result.getMessage(),
      createdAt: result.getCreatedAt() || undefined,
      secretName: result.getSecretName(),
      scope: result.getScope(),
    };
  }

  /**
   * Update a secret
   * @param {string} name - The name of the secret
   * @param {string} value - The value of the secret
   * @param {SecretOptions} [options] - Request options
   * @param {string} [options.workflowId] - The workflow ID to associate the secret with
   * @param {string} [options.orgId] - The organization ID to associate the secret with
   * @param {string} [options.authKey] - The auth key for the request
   * @returns {Promise<UpdateSecretResponse>} - Structured response with update details
   */
  async updateSecret(
    name: string,
    value: string,
    options?: SecretOptions
  ): Promise<UpdateSecretResponse> {
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
      avs_pb.UpdateSecretResp,
      avs_pb.CreateOrUpdateSecretReq
    >("updateSecret", request, options);

    return {
      success: result.getSuccess(),
      status: result.getStatus(),
      message: result.getMessage(),
      updatedAt: result.getUpdatedAt() || undefined,
      secretName: result.getSecretName(),
      scope: result.getScope(),
    };
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
   * @returns {Promise<DeleteSecretResponse>} - Structured response with deletion details
   */
  async deleteSecret(
    name: string,
    options?: SecretOptions
  ): Promise<DeleteSecretResponse> {
    const request = new avs_pb.DeleteSecretReq();
    request.setName(name);

    if (options?.workflowId) {
      request.setWorkflowId(options.workflowId);
    }

    if (options?.orgId) {
      request.setOrgId(options.orgId);
    }

    const result = await this.sendGrpcRequest<
      avs_pb.DeleteSecretResp,
      avs_pb.DeleteSecretReq
    >("deleteSecret", request, options);

    return {
      success: result.getSuccess(),
      status: result.getStatus(),
      message: result.getMessage(),
      deletedAt: result.getDeletedAt() || undefined,
      secretName: result.getSecretName(),
      scope: result.getScope(),
    };
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
        errorCode: ErrorCode.INVALID_REQUEST,
        data: null,
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
      data: toCamelCaseKeys(NodeFactory.fromOutputData(result)),
      error: result.getError(),
      errorCode: result.getErrorCode() || undefined,
      metadata: result.hasMetadata()
        ? toCamelCaseKeys(convertProtobufValueToJs(result.getMetadata()!))
        : undefined,
      executionContext: result.hasExecutionContext()
        ? toCamelCaseKeys(convertProtobufValueToJs(result.getExecutionContext()!))
        : undefined,
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

    // Convert metadata from protobuf Value to JavaScript object
    let metadata: any = undefined;
    const metadataValue = result.getMetadata();
    if (metadataValue) {
      try {
        metadata = convertProtobufValueToJs(metadataValue);
      } catch (error) {
        console.warn("Failed to convert metadata from protobuf Value:", error);
        metadata = metadataValue; // fallback to raw value
      }
    }

    return {
      success: result.getSuccess(),
      data: toCamelCaseKeys(TriggerFactory.fromOutputData(result)),
      error: result.getError(),
      errorCode: result.getErrorCode() || undefined,
      metadata: toCamelCaseKeys(metadata),
      executionContext: result.hasExecutionContext()
        ? toCamelCaseKeys(convertProtobufValueToJs(result.getExecutionContext()!))
        : undefined,
    };
  }

  /**
   * Simulate a complete task execution including trigger and all workflow nodes
   * @param {SimulateWorkflowRequest} params - The parameters for simulating the task
   * @param {Record<string, any>} params.trigger - The trigger configuration
   * @param {Array<Record<string, any>>} params.nodes - The workflow nodes
   * @param {Array<Record<string, any>>} params.edges - The workflow edges
   * @param {Record<string, any>} params.inputVariables - Input variables for the simulation
   * @param {RequestOptions} options - Request options
   * @returns {Promise<ExecutionProps>} - The response from simulating the task
   */
  async simulateWorkflow(
    { trigger, nodes, edges, inputVariables = {} }: SimulateWorkflowRequest,
    options?: RequestOptions
  ): Promise<ExecutionProps> {
    // Create the request
    const request = new avs_pb.SimulateTaskReq();

    // Create SDK trigger object and convert to protobuf
    const triggerSdk = TriggerFactory.create(trigger as any);
    request.setTrigger(triggerSdk.toRequest());

    // Create SDK node objects and convert to protobuf
    const nodeMessages = nodes.map((node: any) => {
      const nodeSdk = NodeFactory.create(node as any);
      return nodeSdk.toRequest();
    });
    request.setNodesList(nodeMessages);

    // Create SDK edge objects and convert to protobuf
    const edgeMessages = edges.map((edge: any) => {
      const edgeSdk = new Edge(edge as any);
      return edgeSdk.toRequest();
    });
    request.setEdgesList(edgeMessages);

    // Set input variables
    const inputVarsMap = request.getInputVariablesMap();
    for (const [key, value] of Object.entries(inputVariables)) {
      inputVarsMap.set(key, convertJSValueToProtobuf(value));
    }

    // Send the request directly to the server
    const result = await this.sendGrpcRequest<
      avs_pb.Execution,
      avs_pb.SimulateTaskReq
    >("simulateTask", request, options);

    // Convert to Execution instance, then return as plain object for serialization
    const execution = Execution.fromResponse(result);
    return execution.toJson();
  }

  /**
   * Get token metadata by contract address
   * @param {GetTokenMetadataRequest} params - The parameters for getting token metadata
   * @param {string} params.address - The contract address to look up
   * @param {RequestOptions} options - Request options
   * @returns {Promise<GetTokenMetadataResponse>} - The response containing token metadata
   */
  async getTokenMetadata(
    { address }: GetTokenMetadataRequest,
    options?: RequestOptions
  ): Promise<GetTokenMetadataResponse> {
    const request = new avs_pb.GetTokenMetadataReq();
    request.setAddress(address);

    const result = await this.sendGrpcRequest<
      avs_pb.GetTokenMetadataResp,
      avs_pb.GetTokenMetadataReq
    >("getTokenMetadata", request, options);

    const token = result.getToken();

    return {
      token: token
        ? {
            address: token.getAddress()?.toLowerCase(),
            name: token.getName(),
            symbol: token.getSymbol(),
            decimals: token.getDecimals(),
          }
        : null,
      found: result.getFound(),
      source: result.getSource() as TokenSource,
    };
  }

  /**
   * Get comprehensive fee estimation for workflow deployment
   * TEMPORARILY DISABLED: Fee estimation types are not synchronized between branches
   * TODO: Re-enable when types package includes fee estimation types
   */
  /*
  async estimateFees(
    {
      trigger,
      nodes,
      runner,
      inputVariables = {},
      createdAt,
      expireAt,
    }: EstimateFeesRequest,
    options?: RequestOptions
  ): Promise<EstimateFeesResponse> {
    // Create the protobuf request
    const request = new avs_pb.EstimateFeesReq();

    // Convert trigger to protobuf
    const triggerSdk = TriggerFactory.create(trigger as any);
    request.setTrigger(triggerSdk.toRequest());

    // Convert nodes to protobuf
    const nodeMessages = nodes.map((node: any) => {
      const nodeSdk = NodeFactory.create(node as any);
      return nodeSdk.toRequest();
    });
    request.setNodesList(nodeMessages);

    // Set runner if provided
    if (runner) {
      request.setRunner(runner);
    }

    // Set input variables
    if (inputVariables && Object.keys(inputVariables).length > 0) {
      const inputVarsMap = request.getInputVariablesMap();
      for (const [key, value] of Object.entries(inputVariables)) {
        inputVarsMap.set(key, convertJSValueToProtobuf(value));
      }
    }

    // Set timestamps
    request.setCreatedAt(createdAt);
    request.setExpireAt(expireAt);

    // Send the request
    const result = await this.sendGrpcRequest<
      avs_pb.EstimateFeesResp,
      avs_pb.EstimateFeesReq
    >("estimateFees", request, options);

    // Convert protobuf response to TypeScript interface
    return this.convertEstimateFeesResponse(result);
  }

  /**
   * Convert protobuf EstimateFeesResp to TypeScript EstimateFeesResponse
   * @private
   */
  private convertEstimateFeesResponse(
    result: avs_pb.EstimateFeesResp
  ): EstimateFeesResponse {
    const response: EstimateFeesResponse = {
      success: result.getSuccess(),
      error: result.getError() || undefined,
      errorCode: result.getErrorCode().toString() || undefined,
    };

    // Convert gas fees if present
    const gasFees = result.getGasFees();
    if (gasFees) {
      response.gasFees = {
        nodeGasFees: gasFees.getOperationsList().map((operation) => ({
          nodeId: operation.getNodeId(),
          operationType: operation.getOperationType(),
          methodName: operation.getMethodName() || undefined,
          gasUnits: operation.getGasUnits(),
          gasPrice: gasFees.getGasPriceGwei() || "", // Use parent gas price
          totalCost: operation.getFee() ? this.convertFeeAmount(operation.getFee()!) : 
            this.createZeroFeeAmount(result.getChainId()),
          success: operation.getFee() ? 
            (parseFloat(operation.getFee()!.getNativeTokenAmount()) > 0) : false, // Check if operation has valid gas cost
          error: undefined,
        })),
        totalGasCost: this.convertFeeAmount(gasFees.getTotalGasFees()!),
        estimationAccurate: gasFees.getEstimationAccurate(),
        estimationMethod: gasFees.getEstimationMethod(),
        averageGasPrice: gasFees.getGasPriceGwei(),
        notes: [], // Not available in current protobuf
      };
    }

    // Convert automation fees if present
    const automationFees = result.getAutomationFees();
    if (automationFees) {
      // Calculate total fee from base + monitoring + execution
      const baseFee = automationFees.getBaseFee();
      const monitoringFee = automationFees.getMonitoringFee();
      const executionFee = automationFees.getExecutionFee();
      
      // For now, use baseFee as totalFee since the exact calculation isn't available
      // If baseFee is not available, create a mock fee amount with proper chain detection
      const totalFee = baseFee || this.createMockFeeAmount(result.getChainId());

      response.automationFees = {
        triggerType: automationFees.getTriggerType(),
        durationMinutes: automationFees.getDurationMinutes(),
        baseFee: baseFee ? this.convertFeeAmount(baseFee) : this.createZeroFeeAmount(result.getChainId()),
        executionFee: executionFee ? this.convertFeeAmount(executionFee) : this.createZeroFeeAmount(result.getChainId()),
        estimatedExecutions: automationFees.getEstimatedExecutions(),
        totalFee: this.convertFeeAmount(totalFee),
        breakdown: [], // Not available in current protobuf structure
      };
    }

    // Convert creation fees if present
    const creationFees = result.getCreationFees();
    if (creationFees) {
      response.creationFees = {
        creationRequired: creationFees.getCreationRequired(),
        walletAddress: creationFees.getWalletAddress(),
        creationFee: creationFees.getCreationFee()
          ? this.convertFeeAmount(creationFees.getCreationFee()!)
          : undefined,
        initialFunding: creationFees.getInitialFunding()
          ? this.convertFeeAmount(creationFees.getInitialFunding()!)
          : undefined,
      };
    }

    // Convert fee amounts
    if (result.getTotalFees()) {
      response.totalFees = this.convertFeeAmount(result.getTotalFees()!);
    }
    if (result.getTotalDiscounts()) {
      response.totalDiscounts = this.convertFeeAmount(result.getTotalDiscounts()!);
    }
    if (result.getFinalTotal()) {
      response.finalTotal = this.convertFeeAmount(result.getFinalTotal()!);
    }

    // Convert discounts (using FeeDiscount type, not Discount)
    response.discounts = result.getDiscountsList().map((discount, index) => ({
      discountId: `auto-${index}`, // Synthesized unique ID since not available in FeeDiscount
      discountType: discount.getDiscountType(),
      discountName: discount.getDiscountName(),
      appliesTo: discount.getAppliesTo(),
      discountPercentage: discount.getDiscountPercentage(),
      discountAmount: this.convertFeeAmount(discount.getDiscountAmount()!),
      expiryDate: discount.getExpiryDate() || undefined,
      terms: discount.getTerms() || undefined,
    }));

    // Add metadata
    response.estimatedAt = result.getEstimatedAt() || undefined;
    response.chainId = result.getChainId() || undefined;
    response.priceDataSource = result.getPriceDataSource() || undefined;
    response.priceDataAgeSeconds = result.getPriceDataAgeSeconds() || undefined;
    response.warnings = result.getWarningsList();
    response.recommendations = result.getRecommendationsList();

    return response;
  }

  /**
   * Create a mock fee amount object that mimics protobuf FeeAmount interface
   * @private
   */
  private createMockFeeAmount(chainId?: string): any {
    const getNativeTokenSymbol = (chainId?: string): string => {
      // All supported chains (Ethereum and Base) use ETH as native token
      return "ETH"; // Ethereum, Base mainnet/testnet all use ETH
    };

    return {
      getNativeTokenAmount: () => "0",
      getNativeTokenSymbol: () => getNativeTokenSymbol(chainId),
      getUsdAmount: () => "0",
      getApTokenAmount: () => "0"
    };
  }

  /**
   * Create a zero fee amount
   * @private
   */
  private createZeroFeeAmount(chainId?: string): FeeAmount {
    // Determine native token symbol based on chain ID
    const getNativeTokenSymbol = (chainId?: string): string => {
      // All supported chains (Ethereum and Base) use ETH as native token
      // But could be extended for other chains in the future
      return "ETH"; // Ethereum, Base mainnet/testnet all use ETH
    };

    return {
      nativeTokenAmount: "0",
      nativeTokenSymbol: getNativeTokenSymbol(chainId),
      usdAmount: "0",
      apTokenAmount: "0",
    };
  }

  /**
   * Convert protobuf FeeAmount to TypeScript FeeAmount
   * @private
   */
  private convertFeeAmount(feeAmount: avs_pb.FeeAmount): FeeAmount {
    return {
      nativeTokenAmount: feeAmount.getNativeTokenAmount(),
      nativeTokenSymbol: feeAmount.getNativeTokenSymbol(),
      usdAmount: feeAmount.getUsdAmount(),
      apTokenAmount: feeAmount.getApTokenAmount(),
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
  ErrorCode,
  cleanGrpcErrorMessage,
};

// Re-export token types for convenience
export type {
  TokenMetadata,
  GetTokenMetadataRequest,
  GetTokenMetadataResponse,
  TokenSource,
  WithdrawFundsRequest,
  WithdrawFundsResponse,
} from "@avaprotocol/types";

// Re-export fee estimation types for convenience - temporarily disabled
// TODO: Re-enable when types package is synchronized with fee estimation changes

// Re-export timeout-related types and presets
export {
  TimeoutPresets,
  type TimeoutConfig,
  type TimeoutError,
} from "@avaprotocol/types";
