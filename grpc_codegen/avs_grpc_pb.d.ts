// package: aggregator
// file: avs.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as avs_pb from "./avs_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";

interface IAggregatorService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getKey: IAggregatorService_IGetKey;
    getSignatureFormat: IAggregatorService_IGetSignatureFormat;
    getNonce: IAggregatorService_IGetNonce;
    getWallet: IAggregatorService_IGetWallet;
    setWallet: IAggregatorService_ISetWallet;
    listWallets: IAggregatorService_IListWallets;
    withdrawFunds: IAggregatorService_IWithdrawFunds;
    createTask: IAggregatorService_ICreateTask;
    listTasks: IAggregatorService_IListTasks;
    getTask: IAggregatorService_IGetTask;
    listExecutions: IAggregatorService_IListExecutions;
    getExecution: IAggregatorService_IGetExecution;
    getExecutionStatus: IAggregatorService_IGetExecutionStatus;
    setTaskActive: IAggregatorService_ISetTaskActive;
    deleteTask: IAggregatorService_IDeleteTask;
    triggerTask: IAggregatorService_ITriggerTask;
    createSecret: IAggregatorService_ICreateSecret;
    deleteSecret: IAggregatorService_IDeleteSecret;
    listSecrets: IAggregatorService_IListSecrets;
    updateSecret: IAggregatorService_IUpdateSecret;
    getWorkflowCount: IAggregatorService_IGetWorkflowCount;
    getExecutionCount: IAggregatorService_IGetExecutionCount;
    getExecutionStats: IAggregatorService_IGetExecutionStats;
    runNodeWithInputs: IAggregatorService_IRunNodeWithInputs;
    runTrigger: IAggregatorService_IRunTrigger;
    simulateTask: IAggregatorService_ISimulateTask;
    getTokenMetadata: IAggregatorService_IGetTokenMetadata;
    estimateFees: IAggregatorService_IEstimateFees;
}

interface IAggregatorService_IGetKey extends grpc.MethodDefinition<avs_pb.GetKeyReq, avs_pb.KeyResp> {
    path: "/aggregator.Aggregator/GetKey";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.GetKeyReq>;
    requestDeserialize: grpc.deserialize<avs_pb.GetKeyReq>;
    responseSerialize: grpc.serialize<avs_pb.KeyResp>;
    responseDeserialize: grpc.deserialize<avs_pb.KeyResp>;
}
interface IAggregatorService_IGetSignatureFormat extends grpc.MethodDefinition<avs_pb.GetSignatureFormatReq, avs_pb.GetSignatureFormatResp> {
    path: "/aggregator.Aggregator/GetSignatureFormat";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.GetSignatureFormatReq>;
    requestDeserialize: grpc.deserialize<avs_pb.GetSignatureFormatReq>;
    responseSerialize: grpc.serialize<avs_pb.GetSignatureFormatResp>;
    responseDeserialize: grpc.deserialize<avs_pb.GetSignatureFormatResp>;
}
interface IAggregatorService_IGetNonce extends grpc.MethodDefinition<avs_pb.NonceRequest, avs_pb.NonceResp> {
    path: "/aggregator.Aggregator/GetNonce";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.NonceRequest>;
    requestDeserialize: grpc.deserialize<avs_pb.NonceRequest>;
    responseSerialize: grpc.serialize<avs_pb.NonceResp>;
    responseDeserialize: grpc.deserialize<avs_pb.NonceResp>;
}
interface IAggregatorService_IGetWallet extends grpc.MethodDefinition<avs_pb.GetWalletReq, avs_pb.GetWalletResp> {
    path: "/aggregator.Aggregator/GetWallet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.GetWalletReq>;
    requestDeserialize: grpc.deserialize<avs_pb.GetWalletReq>;
    responseSerialize: grpc.serialize<avs_pb.GetWalletResp>;
    responseDeserialize: grpc.deserialize<avs_pb.GetWalletResp>;
}
interface IAggregatorService_ISetWallet extends grpc.MethodDefinition<avs_pb.SetWalletReq, avs_pb.GetWalletResp> {
    path: "/aggregator.Aggregator/SetWallet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.SetWalletReq>;
    requestDeserialize: grpc.deserialize<avs_pb.SetWalletReq>;
    responseSerialize: grpc.serialize<avs_pb.GetWalletResp>;
    responseDeserialize: grpc.deserialize<avs_pb.GetWalletResp>;
}
interface IAggregatorService_IListWallets extends grpc.MethodDefinition<avs_pb.ListWalletReq, avs_pb.ListWalletResp> {
    path: "/aggregator.Aggregator/ListWallets";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.ListWalletReq>;
    requestDeserialize: grpc.deserialize<avs_pb.ListWalletReq>;
    responseSerialize: grpc.serialize<avs_pb.ListWalletResp>;
    responseDeserialize: grpc.deserialize<avs_pb.ListWalletResp>;
}
interface IAggregatorService_IWithdrawFunds extends grpc.MethodDefinition<avs_pb.WithdrawFundsReq, avs_pb.WithdrawFundsResp> {
    path: "/aggregator.Aggregator/WithdrawFunds";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.WithdrawFundsReq>;
    requestDeserialize: grpc.deserialize<avs_pb.WithdrawFundsReq>;
    responseSerialize: grpc.serialize<avs_pb.WithdrawFundsResp>;
    responseDeserialize: grpc.deserialize<avs_pb.WithdrawFundsResp>;
}
interface IAggregatorService_ICreateTask extends grpc.MethodDefinition<avs_pb.CreateTaskReq, avs_pb.CreateTaskResp> {
    path: "/aggregator.Aggregator/CreateTask";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.CreateTaskReq>;
    requestDeserialize: grpc.deserialize<avs_pb.CreateTaskReq>;
    responseSerialize: grpc.serialize<avs_pb.CreateTaskResp>;
    responseDeserialize: grpc.deserialize<avs_pb.CreateTaskResp>;
}
interface IAggregatorService_IListTasks extends grpc.MethodDefinition<avs_pb.ListTasksReq, avs_pb.ListTasksResp> {
    path: "/aggregator.Aggregator/ListTasks";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.ListTasksReq>;
    requestDeserialize: grpc.deserialize<avs_pb.ListTasksReq>;
    responseSerialize: grpc.serialize<avs_pb.ListTasksResp>;
    responseDeserialize: grpc.deserialize<avs_pb.ListTasksResp>;
}
interface IAggregatorService_IGetTask extends grpc.MethodDefinition<avs_pb.IdReq, avs_pb.Task> {
    path: "/aggregator.Aggregator/GetTask";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.IdReq>;
    requestDeserialize: grpc.deserialize<avs_pb.IdReq>;
    responseSerialize: grpc.serialize<avs_pb.Task>;
    responseDeserialize: grpc.deserialize<avs_pb.Task>;
}
interface IAggregatorService_IListExecutions extends grpc.MethodDefinition<avs_pb.ListExecutionsReq, avs_pb.ListExecutionsResp> {
    path: "/aggregator.Aggregator/ListExecutions";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.ListExecutionsReq>;
    requestDeserialize: grpc.deserialize<avs_pb.ListExecutionsReq>;
    responseSerialize: grpc.serialize<avs_pb.ListExecutionsResp>;
    responseDeserialize: grpc.deserialize<avs_pb.ListExecutionsResp>;
}
interface IAggregatorService_IGetExecution extends grpc.MethodDefinition<avs_pb.ExecutionReq, avs_pb.Execution> {
    path: "/aggregator.Aggregator/GetExecution";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.ExecutionReq>;
    requestDeserialize: grpc.deserialize<avs_pb.ExecutionReq>;
    responseSerialize: grpc.serialize<avs_pb.Execution>;
    responseDeserialize: grpc.deserialize<avs_pb.Execution>;
}
interface IAggregatorService_IGetExecutionStatus extends grpc.MethodDefinition<avs_pb.ExecutionReq, avs_pb.ExecutionStatusResp> {
    path: "/aggregator.Aggregator/GetExecutionStatus";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.ExecutionReq>;
    requestDeserialize: grpc.deserialize<avs_pb.ExecutionReq>;
    responseSerialize: grpc.serialize<avs_pb.ExecutionStatusResp>;
    responseDeserialize: grpc.deserialize<avs_pb.ExecutionStatusResp>;
}
interface IAggregatorService_ISetTaskActive extends grpc.MethodDefinition<avs_pb.SetTaskActiveReq, avs_pb.SetTaskActiveResp> {
    path: "/aggregator.Aggregator/SetTaskActive";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.SetTaskActiveReq>;
    requestDeserialize: grpc.deserialize<avs_pb.SetTaskActiveReq>;
    responseSerialize: grpc.serialize<avs_pb.SetTaskActiveResp>;
    responseDeserialize: grpc.deserialize<avs_pb.SetTaskActiveResp>;
}
interface IAggregatorService_IDeleteTask extends grpc.MethodDefinition<avs_pb.IdReq, avs_pb.DeleteTaskResp> {
    path: "/aggregator.Aggregator/DeleteTask";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.IdReq>;
    requestDeserialize: grpc.deserialize<avs_pb.IdReq>;
    responseSerialize: grpc.serialize<avs_pb.DeleteTaskResp>;
    responseDeserialize: grpc.deserialize<avs_pb.DeleteTaskResp>;
}
interface IAggregatorService_ITriggerTask extends grpc.MethodDefinition<avs_pb.TriggerTaskReq, avs_pb.TriggerTaskResp> {
    path: "/aggregator.Aggregator/TriggerTask";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.TriggerTaskReq>;
    requestDeserialize: grpc.deserialize<avs_pb.TriggerTaskReq>;
    responseSerialize: grpc.serialize<avs_pb.TriggerTaskResp>;
    responseDeserialize: grpc.deserialize<avs_pb.TriggerTaskResp>;
}
interface IAggregatorService_ICreateSecret extends grpc.MethodDefinition<avs_pb.CreateOrUpdateSecretReq, avs_pb.CreateSecretResp> {
    path: "/aggregator.Aggregator/CreateSecret";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.CreateOrUpdateSecretReq>;
    requestDeserialize: grpc.deserialize<avs_pb.CreateOrUpdateSecretReq>;
    responseSerialize: grpc.serialize<avs_pb.CreateSecretResp>;
    responseDeserialize: grpc.deserialize<avs_pb.CreateSecretResp>;
}
interface IAggregatorService_IDeleteSecret extends grpc.MethodDefinition<avs_pb.DeleteSecretReq, avs_pb.DeleteSecretResp> {
    path: "/aggregator.Aggregator/DeleteSecret";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.DeleteSecretReq>;
    requestDeserialize: grpc.deserialize<avs_pb.DeleteSecretReq>;
    responseSerialize: grpc.serialize<avs_pb.DeleteSecretResp>;
    responseDeserialize: grpc.deserialize<avs_pb.DeleteSecretResp>;
}
interface IAggregatorService_IListSecrets extends grpc.MethodDefinition<avs_pb.ListSecretsReq, avs_pb.ListSecretsResp> {
    path: "/aggregator.Aggregator/ListSecrets";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.ListSecretsReq>;
    requestDeserialize: grpc.deserialize<avs_pb.ListSecretsReq>;
    responseSerialize: grpc.serialize<avs_pb.ListSecretsResp>;
    responseDeserialize: grpc.deserialize<avs_pb.ListSecretsResp>;
}
interface IAggregatorService_IUpdateSecret extends grpc.MethodDefinition<avs_pb.CreateOrUpdateSecretReq, avs_pb.UpdateSecretResp> {
    path: "/aggregator.Aggregator/UpdateSecret";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.CreateOrUpdateSecretReq>;
    requestDeserialize: grpc.deserialize<avs_pb.CreateOrUpdateSecretReq>;
    responseSerialize: grpc.serialize<avs_pb.UpdateSecretResp>;
    responseDeserialize: grpc.deserialize<avs_pb.UpdateSecretResp>;
}
interface IAggregatorService_IGetWorkflowCount extends grpc.MethodDefinition<avs_pb.GetWorkflowCountReq, avs_pb.GetWorkflowCountResp> {
    path: "/aggregator.Aggregator/GetWorkflowCount";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.GetWorkflowCountReq>;
    requestDeserialize: grpc.deserialize<avs_pb.GetWorkflowCountReq>;
    responseSerialize: grpc.serialize<avs_pb.GetWorkflowCountResp>;
    responseDeserialize: grpc.deserialize<avs_pb.GetWorkflowCountResp>;
}
interface IAggregatorService_IGetExecutionCount extends grpc.MethodDefinition<avs_pb.GetExecutionCountReq, avs_pb.GetExecutionCountResp> {
    path: "/aggregator.Aggregator/GetExecutionCount";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.GetExecutionCountReq>;
    requestDeserialize: grpc.deserialize<avs_pb.GetExecutionCountReq>;
    responseSerialize: grpc.serialize<avs_pb.GetExecutionCountResp>;
    responseDeserialize: grpc.deserialize<avs_pb.GetExecutionCountResp>;
}
interface IAggregatorService_IGetExecutionStats extends grpc.MethodDefinition<avs_pb.GetExecutionStatsReq, avs_pb.GetExecutionStatsResp> {
    path: "/aggregator.Aggregator/GetExecutionStats";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.GetExecutionStatsReq>;
    requestDeserialize: grpc.deserialize<avs_pb.GetExecutionStatsReq>;
    responseSerialize: grpc.serialize<avs_pb.GetExecutionStatsResp>;
    responseDeserialize: grpc.deserialize<avs_pb.GetExecutionStatsResp>;
}
interface IAggregatorService_IRunNodeWithInputs extends grpc.MethodDefinition<avs_pb.RunNodeWithInputsReq, avs_pb.RunNodeWithInputsResp> {
    path: "/aggregator.Aggregator/RunNodeWithInputs";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.RunNodeWithInputsReq>;
    requestDeserialize: grpc.deserialize<avs_pb.RunNodeWithInputsReq>;
    responseSerialize: grpc.serialize<avs_pb.RunNodeWithInputsResp>;
    responseDeserialize: grpc.deserialize<avs_pb.RunNodeWithInputsResp>;
}
interface IAggregatorService_IRunTrigger extends grpc.MethodDefinition<avs_pb.RunTriggerReq, avs_pb.RunTriggerResp> {
    path: "/aggregator.Aggregator/RunTrigger";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.RunTriggerReq>;
    requestDeserialize: grpc.deserialize<avs_pb.RunTriggerReq>;
    responseSerialize: grpc.serialize<avs_pb.RunTriggerResp>;
    responseDeserialize: grpc.deserialize<avs_pb.RunTriggerResp>;
}
interface IAggregatorService_ISimulateTask extends grpc.MethodDefinition<avs_pb.SimulateTaskReq, avs_pb.Execution> {
    path: "/aggregator.Aggregator/SimulateTask";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.SimulateTaskReq>;
    requestDeserialize: grpc.deserialize<avs_pb.SimulateTaskReq>;
    responseSerialize: grpc.serialize<avs_pb.Execution>;
    responseDeserialize: grpc.deserialize<avs_pb.Execution>;
}
interface IAggregatorService_IGetTokenMetadata extends grpc.MethodDefinition<avs_pb.GetTokenMetadataReq, avs_pb.GetTokenMetadataResp> {
    path: "/aggregator.Aggregator/GetTokenMetadata";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.GetTokenMetadataReq>;
    requestDeserialize: grpc.deserialize<avs_pb.GetTokenMetadataReq>;
    responseSerialize: grpc.serialize<avs_pb.GetTokenMetadataResp>;
    responseDeserialize: grpc.deserialize<avs_pb.GetTokenMetadataResp>;
}
interface IAggregatorService_IEstimateFees extends grpc.MethodDefinition<avs_pb.EstimateFeesReq, avs_pb.EstimateFeesResp> {
    path: "/aggregator.Aggregator/EstimateFees";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.EstimateFeesReq>;
    requestDeserialize: grpc.deserialize<avs_pb.EstimateFeesReq>;
    responseSerialize: grpc.serialize<avs_pb.EstimateFeesResp>;
    responseDeserialize: grpc.deserialize<avs_pb.EstimateFeesResp>;
}

export const AggregatorService: IAggregatorService;

export interface IAggregatorServer extends grpc.UntypedServiceImplementation {
    getKey: grpc.handleUnaryCall<avs_pb.GetKeyReq, avs_pb.KeyResp>;
    getSignatureFormat: grpc.handleUnaryCall<avs_pb.GetSignatureFormatReq, avs_pb.GetSignatureFormatResp>;
    getNonce: grpc.handleUnaryCall<avs_pb.NonceRequest, avs_pb.NonceResp>;
    getWallet: grpc.handleUnaryCall<avs_pb.GetWalletReq, avs_pb.GetWalletResp>;
    setWallet: grpc.handleUnaryCall<avs_pb.SetWalletReq, avs_pb.GetWalletResp>;
    listWallets: grpc.handleUnaryCall<avs_pb.ListWalletReq, avs_pb.ListWalletResp>;
    withdrawFunds: grpc.handleUnaryCall<avs_pb.WithdrawFundsReq, avs_pb.WithdrawFundsResp>;
    createTask: grpc.handleUnaryCall<avs_pb.CreateTaskReq, avs_pb.CreateTaskResp>;
    listTasks: grpc.handleUnaryCall<avs_pb.ListTasksReq, avs_pb.ListTasksResp>;
    getTask: grpc.handleUnaryCall<avs_pb.IdReq, avs_pb.Task>;
    listExecutions: grpc.handleUnaryCall<avs_pb.ListExecutionsReq, avs_pb.ListExecutionsResp>;
    getExecution: grpc.handleUnaryCall<avs_pb.ExecutionReq, avs_pb.Execution>;
    getExecutionStatus: grpc.handleUnaryCall<avs_pb.ExecutionReq, avs_pb.ExecutionStatusResp>;
    setTaskActive: grpc.handleUnaryCall<avs_pb.SetTaskActiveReq, avs_pb.SetTaskActiveResp>;
    deleteTask: grpc.handleUnaryCall<avs_pb.IdReq, avs_pb.DeleteTaskResp>;
    triggerTask: grpc.handleUnaryCall<avs_pb.TriggerTaskReq, avs_pb.TriggerTaskResp>;
    createSecret: grpc.handleUnaryCall<avs_pb.CreateOrUpdateSecretReq, avs_pb.CreateSecretResp>;
    deleteSecret: grpc.handleUnaryCall<avs_pb.DeleteSecretReq, avs_pb.DeleteSecretResp>;
    listSecrets: grpc.handleUnaryCall<avs_pb.ListSecretsReq, avs_pb.ListSecretsResp>;
    updateSecret: grpc.handleUnaryCall<avs_pb.CreateOrUpdateSecretReq, avs_pb.UpdateSecretResp>;
    getWorkflowCount: grpc.handleUnaryCall<avs_pb.GetWorkflowCountReq, avs_pb.GetWorkflowCountResp>;
    getExecutionCount: grpc.handleUnaryCall<avs_pb.GetExecutionCountReq, avs_pb.GetExecutionCountResp>;
    getExecutionStats: grpc.handleUnaryCall<avs_pb.GetExecutionStatsReq, avs_pb.GetExecutionStatsResp>;
    runNodeWithInputs: grpc.handleUnaryCall<avs_pb.RunNodeWithInputsReq, avs_pb.RunNodeWithInputsResp>;
    runTrigger: grpc.handleUnaryCall<avs_pb.RunTriggerReq, avs_pb.RunTriggerResp>;
    simulateTask: grpc.handleUnaryCall<avs_pb.SimulateTaskReq, avs_pb.Execution>;
    getTokenMetadata: grpc.handleUnaryCall<avs_pb.GetTokenMetadataReq, avs_pb.GetTokenMetadataResp>;
    estimateFees: grpc.handleUnaryCall<avs_pb.EstimateFeesReq, avs_pb.EstimateFeesResp>;
}

export interface IAggregatorClient {
    getKey(request: avs_pb.GetKeyReq, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    getKey(request: avs_pb.GetKeyReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    getKey(request: avs_pb.GetKeyReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    getSignatureFormat(request: avs_pb.GetSignatureFormatReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetSignatureFormatResp) => void): grpc.ClientUnaryCall;
    getSignatureFormat(request: avs_pb.GetSignatureFormatReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetSignatureFormatResp) => void): grpc.ClientUnaryCall;
    getSignatureFormat(request: avs_pb.GetSignatureFormatReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetSignatureFormatResp) => void): grpc.ClientUnaryCall;
    getNonce(request: avs_pb.NonceRequest, callback: (error: grpc.ServiceError | null, response: avs_pb.NonceResp) => void): grpc.ClientUnaryCall;
    getNonce(request: avs_pb.NonceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.NonceResp) => void): grpc.ClientUnaryCall;
    getNonce(request: avs_pb.NonceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.NonceResp) => void): grpc.ClientUnaryCall;
    getWallet(request: avs_pb.GetWalletReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWalletResp) => void): grpc.ClientUnaryCall;
    getWallet(request: avs_pb.GetWalletReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWalletResp) => void): grpc.ClientUnaryCall;
    getWallet(request: avs_pb.GetWalletReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWalletResp) => void): grpc.ClientUnaryCall;
    setWallet(request: avs_pb.SetWalletReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWalletResp) => void): grpc.ClientUnaryCall;
    setWallet(request: avs_pb.SetWalletReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWalletResp) => void): grpc.ClientUnaryCall;
    setWallet(request: avs_pb.SetWalletReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWalletResp) => void): grpc.ClientUnaryCall;
    listWallets(request: avs_pb.ListWalletReq, callback: (error: grpc.ServiceError | null, response: avs_pb.ListWalletResp) => void): grpc.ClientUnaryCall;
    listWallets(request: avs_pb.ListWalletReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.ListWalletResp) => void): grpc.ClientUnaryCall;
    listWallets(request: avs_pb.ListWalletReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.ListWalletResp) => void): grpc.ClientUnaryCall;
    withdrawFunds(request: avs_pb.WithdrawFundsReq, callback: (error: grpc.ServiceError | null, response: avs_pb.WithdrawFundsResp) => void): grpc.ClientUnaryCall;
    withdrawFunds(request: avs_pb.WithdrawFundsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.WithdrawFundsResp) => void): grpc.ClientUnaryCall;
    withdrawFunds(request: avs_pb.WithdrawFundsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.WithdrawFundsResp) => void): grpc.ClientUnaryCall;
    createTask(request: avs_pb.CreateTaskReq, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateTaskResp) => void): grpc.ClientUnaryCall;
    createTask(request: avs_pb.CreateTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateTaskResp) => void): grpc.ClientUnaryCall;
    createTask(request: avs_pb.CreateTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateTaskResp) => void): grpc.ClientUnaryCall;
    listTasks(request: avs_pb.ListTasksReq, callback: (error: grpc.ServiceError | null, response: avs_pb.ListTasksResp) => void): grpc.ClientUnaryCall;
    listTasks(request: avs_pb.ListTasksReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.ListTasksResp) => void): grpc.ClientUnaryCall;
    listTasks(request: avs_pb.ListTasksReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.ListTasksResp) => void): grpc.ClientUnaryCall;
    getTask(request: avs_pb.IdReq, callback: (error: grpc.ServiceError | null, response: avs_pb.Task) => void): grpc.ClientUnaryCall;
    getTask(request: avs_pb.IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.Task) => void): grpc.ClientUnaryCall;
    getTask(request: avs_pb.IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.Task) => void): grpc.ClientUnaryCall;
    listExecutions(request: avs_pb.ListExecutionsReq, callback: (error: grpc.ServiceError | null, response: avs_pb.ListExecutionsResp) => void): grpc.ClientUnaryCall;
    listExecutions(request: avs_pb.ListExecutionsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.ListExecutionsResp) => void): grpc.ClientUnaryCall;
    listExecutions(request: avs_pb.ListExecutionsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.ListExecutionsResp) => void): grpc.ClientUnaryCall;
    getExecution(request: avs_pb.ExecutionReq, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
    getExecution(request: avs_pb.ExecutionReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
    getExecution(request: avs_pb.ExecutionReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
    getExecutionStatus(request: avs_pb.ExecutionReq, callback: (error: grpc.ServiceError | null, response: avs_pb.ExecutionStatusResp) => void): grpc.ClientUnaryCall;
    getExecutionStatus(request: avs_pb.ExecutionReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.ExecutionStatusResp) => void): grpc.ClientUnaryCall;
    getExecutionStatus(request: avs_pb.ExecutionReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.ExecutionStatusResp) => void): grpc.ClientUnaryCall;
    setTaskActive(request: avs_pb.SetTaskActiveReq, callback: (error: grpc.ServiceError | null, response: avs_pb.SetTaskActiveResp) => void): grpc.ClientUnaryCall;
    setTaskActive(request: avs_pb.SetTaskActiveReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.SetTaskActiveResp) => void): grpc.ClientUnaryCall;
    setTaskActive(request: avs_pb.SetTaskActiveReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.SetTaskActiveResp) => void): grpc.ClientUnaryCall;
    deleteTask(request: avs_pb.IdReq, callback: (error: grpc.ServiceError | null, response: avs_pb.DeleteTaskResp) => void): grpc.ClientUnaryCall;
    deleteTask(request: avs_pb.IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.DeleteTaskResp) => void): grpc.ClientUnaryCall;
    deleteTask(request: avs_pb.IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.DeleteTaskResp) => void): grpc.ClientUnaryCall;
    triggerTask(request: avs_pb.TriggerTaskReq, callback: (error: grpc.ServiceError | null, response: avs_pb.TriggerTaskResp) => void): grpc.ClientUnaryCall;
    triggerTask(request: avs_pb.TriggerTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.TriggerTaskResp) => void): grpc.ClientUnaryCall;
    triggerTask(request: avs_pb.TriggerTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.TriggerTaskResp) => void): grpc.ClientUnaryCall;
    createSecret(request: avs_pb.CreateOrUpdateSecretReq, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateSecretResp) => void): grpc.ClientUnaryCall;
    createSecret(request: avs_pb.CreateOrUpdateSecretReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateSecretResp) => void): grpc.ClientUnaryCall;
    createSecret(request: avs_pb.CreateOrUpdateSecretReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateSecretResp) => void): grpc.ClientUnaryCall;
    deleteSecret(request: avs_pb.DeleteSecretReq, callback: (error: grpc.ServiceError | null, response: avs_pb.DeleteSecretResp) => void): grpc.ClientUnaryCall;
    deleteSecret(request: avs_pb.DeleteSecretReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.DeleteSecretResp) => void): grpc.ClientUnaryCall;
    deleteSecret(request: avs_pb.DeleteSecretReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.DeleteSecretResp) => void): grpc.ClientUnaryCall;
    listSecrets(request: avs_pb.ListSecretsReq, callback: (error: grpc.ServiceError | null, response: avs_pb.ListSecretsResp) => void): grpc.ClientUnaryCall;
    listSecrets(request: avs_pb.ListSecretsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.ListSecretsResp) => void): grpc.ClientUnaryCall;
    listSecrets(request: avs_pb.ListSecretsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.ListSecretsResp) => void): grpc.ClientUnaryCall;
    updateSecret(request: avs_pb.CreateOrUpdateSecretReq, callback: (error: grpc.ServiceError | null, response: avs_pb.UpdateSecretResp) => void): grpc.ClientUnaryCall;
    updateSecret(request: avs_pb.CreateOrUpdateSecretReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.UpdateSecretResp) => void): grpc.ClientUnaryCall;
    updateSecret(request: avs_pb.CreateOrUpdateSecretReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.UpdateSecretResp) => void): grpc.ClientUnaryCall;
    getWorkflowCount(request: avs_pb.GetWorkflowCountReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWorkflowCountResp) => void): grpc.ClientUnaryCall;
    getWorkflowCount(request: avs_pb.GetWorkflowCountReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWorkflowCountResp) => void): grpc.ClientUnaryCall;
    getWorkflowCount(request: avs_pb.GetWorkflowCountReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWorkflowCountResp) => void): grpc.ClientUnaryCall;
    getExecutionCount(request: avs_pb.GetExecutionCountReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionCountResp) => void): grpc.ClientUnaryCall;
    getExecutionCount(request: avs_pb.GetExecutionCountReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionCountResp) => void): grpc.ClientUnaryCall;
    getExecutionCount(request: avs_pb.GetExecutionCountReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionCountResp) => void): grpc.ClientUnaryCall;
    getExecutionStats(request: avs_pb.GetExecutionStatsReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionStatsResp) => void): grpc.ClientUnaryCall;
    getExecutionStats(request: avs_pb.GetExecutionStatsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionStatsResp) => void): grpc.ClientUnaryCall;
    getExecutionStats(request: avs_pb.GetExecutionStatsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionStatsResp) => void): grpc.ClientUnaryCall;
    runNodeWithInputs(request: avs_pb.RunNodeWithInputsReq, callback: (error: grpc.ServiceError | null, response: avs_pb.RunNodeWithInputsResp) => void): grpc.ClientUnaryCall;
    runNodeWithInputs(request: avs_pb.RunNodeWithInputsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.RunNodeWithInputsResp) => void): grpc.ClientUnaryCall;
    runNodeWithInputs(request: avs_pb.RunNodeWithInputsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.RunNodeWithInputsResp) => void): grpc.ClientUnaryCall;
    runTrigger(request: avs_pb.RunTriggerReq, callback: (error: grpc.ServiceError | null, response: avs_pb.RunTriggerResp) => void): grpc.ClientUnaryCall;
    runTrigger(request: avs_pb.RunTriggerReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.RunTriggerResp) => void): grpc.ClientUnaryCall;
    runTrigger(request: avs_pb.RunTriggerReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.RunTriggerResp) => void): grpc.ClientUnaryCall;
    simulateTask(request: avs_pb.SimulateTaskReq, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
    simulateTask(request: avs_pb.SimulateTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
    simulateTask(request: avs_pb.SimulateTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
    getTokenMetadata(request: avs_pb.GetTokenMetadataReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetTokenMetadataResp) => void): grpc.ClientUnaryCall;
    getTokenMetadata(request: avs_pb.GetTokenMetadataReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetTokenMetadataResp) => void): grpc.ClientUnaryCall;
    getTokenMetadata(request: avs_pb.GetTokenMetadataReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetTokenMetadataResp) => void): grpc.ClientUnaryCall;
    estimateFees(request: avs_pb.EstimateFeesReq, callback: (error: grpc.ServiceError | null, response: avs_pb.EstimateFeesResp) => void): grpc.ClientUnaryCall;
    estimateFees(request: avs_pb.EstimateFeesReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.EstimateFeesResp) => void): grpc.ClientUnaryCall;
    estimateFees(request: avs_pb.EstimateFeesReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.EstimateFeesResp) => void): grpc.ClientUnaryCall;
}

export class AggregatorClient extends grpc.Client implements IAggregatorClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getKey(request: avs_pb.GetKeyReq, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    public getKey(request: avs_pb.GetKeyReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    public getKey(request: avs_pb.GetKeyReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    public getSignatureFormat(request: avs_pb.GetSignatureFormatReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetSignatureFormatResp) => void): grpc.ClientUnaryCall;
    public getSignatureFormat(request: avs_pb.GetSignatureFormatReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetSignatureFormatResp) => void): grpc.ClientUnaryCall;
    public getSignatureFormat(request: avs_pb.GetSignatureFormatReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetSignatureFormatResp) => void): grpc.ClientUnaryCall;
    public getNonce(request: avs_pb.NonceRequest, callback: (error: grpc.ServiceError | null, response: avs_pb.NonceResp) => void): grpc.ClientUnaryCall;
    public getNonce(request: avs_pb.NonceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.NonceResp) => void): grpc.ClientUnaryCall;
    public getNonce(request: avs_pb.NonceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.NonceResp) => void): grpc.ClientUnaryCall;
    public getWallet(request: avs_pb.GetWalletReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWalletResp) => void): grpc.ClientUnaryCall;
    public getWallet(request: avs_pb.GetWalletReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWalletResp) => void): grpc.ClientUnaryCall;
    public getWallet(request: avs_pb.GetWalletReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWalletResp) => void): grpc.ClientUnaryCall;
    public setWallet(request: avs_pb.SetWalletReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWalletResp) => void): grpc.ClientUnaryCall;
    public setWallet(request: avs_pb.SetWalletReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWalletResp) => void): grpc.ClientUnaryCall;
    public setWallet(request: avs_pb.SetWalletReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWalletResp) => void): grpc.ClientUnaryCall;
    public listWallets(request: avs_pb.ListWalletReq, callback: (error: grpc.ServiceError | null, response: avs_pb.ListWalletResp) => void): grpc.ClientUnaryCall;
    public listWallets(request: avs_pb.ListWalletReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.ListWalletResp) => void): grpc.ClientUnaryCall;
    public listWallets(request: avs_pb.ListWalletReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.ListWalletResp) => void): grpc.ClientUnaryCall;
    public withdrawFunds(request: avs_pb.WithdrawFundsReq, callback: (error: grpc.ServiceError | null, response: avs_pb.WithdrawFundsResp) => void): grpc.ClientUnaryCall;
    public withdrawFunds(request: avs_pb.WithdrawFundsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.WithdrawFundsResp) => void): grpc.ClientUnaryCall;
    public withdrawFunds(request: avs_pb.WithdrawFundsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.WithdrawFundsResp) => void): grpc.ClientUnaryCall;
    public createTask(request: avs_pb.CreateTaskReq, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateTaskResp) => void): grpc.ClientUnaryCall;
    public createTask(request: avs_pb.CreateTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateTaskResp) => void): grpc.ClientUnaryCall;
    public createTask(request: avs_pb.CreateTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateTaskResp) => void): grpc.ClientUnaryCall;
    public listTasks(request: avs_pb.ListTasksReq, callback: (error: grpc.ServiceError | null, response: avs_pb.ListTasksResp) => void): grpc.ClientUnaryCall;
    public listTasks(request: avs_pb.ListTasksReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.ListTasksResp) => void): grpc.ClientUnaryCall;
    public listTasks(request: avs_pb.ListTasksReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.ListTasksResp) => void): grpc.ClientUnaryCall;
    public getTask(request: avs_pb.IdReq, callback: (error: grpc.ServiceError | null, response: avs_pb.Task) => void): grpc.ClientUnaryCall;
    public getTask(request: avs_pb.IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.Task) => void): grpc.ClientUnaryCall;
    public getTask(request: avs_pb.IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.Task) => void): grpc.ClientUnaryCall;
    public listExecutions(request: avs_pb.ListExecutionsReq, callback: (error: grpc.ServiceError | null, response: avs_pb.ListExecutionsResp) => void): grpc.ClientUnaryCall;
    public listExecutions(request: avs_pb.ListExecutionsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.ListExecutionsResp) => void): grpc.ClientUnaryCall;
    public listExecutions(request: avs_pb.ListExecutionsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.ListExecutionsResp) => void): grpc.ClientUnaryCall;
    public getExecution(request: avs_pb.ExecutionReq, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
    public getExecution(request: avs_pb.ExecutionReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
    public getExecution(request: avs_pb.ExecutionReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
    public getExecutionStatus(request: avs_pb.ExecutionReq, callback: (error: grpc.ServiceError | null, response: avs_pb.ExecutionStatusResp) => void): grpc.ClientUnaryCall;
    public getExecutionStatus(request: avs_pb.ExecutionReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.ExecutionStatusResp) => void): grpc.ClientUnaryCall;
    public getExecutionStatus(request: avs_pb.ExecutionReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.ExecutionStatusResp) => void): grpc.ClientUnaryCall;
    public setTaskActive(request: avs_pb.SetTaskActiveReq, callback: (error: grpc.ServiceError | null, response: avs_pb.SetTaskActiveResp) => void): grpc.ClientUnaryCall;
    public setTaskActive(request: avs_pb.SetTaskActiveReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.SetTaskActiveResp) => void): grpc.ClientUnaryCall;
    public setTaskActive(request: avs_pb.SetTaskActiveReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.SetTaskActiveResp) => void): grpc.ClientUnaryCall;
    public deleteTask(request: avs_pb.IdReq, callback: (error: grpc.ServiceError | null, response: avs_pb.DeleteTaskResp) => void): grpc.ClientUnaryCall;
    public deleteTask(request: avs_pb.IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.DeleteTaskResp) => void): grpc.ClientUnaryCall;
    public deleteTask(request: avs_pb.IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.DeleteTaskResp) => void): grpc.ClientUnaryCall;
    public triggerTask(request: avs_pb.TriggerTaskReq, callback: (error: grpc.ServiceError | null, response: avs_pb.TriggerTaskResp) => void): grpc.ClientUnaryCall;
    public triggerTask(request: avs_pb.TriggerTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.TriggerTaskResp) => void): grpc.ClientUnaryCall;
    public triggerTask(request: avs_pb.TriggerTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.TriggerTaskResp) => void): grpc.ClientUnaryCall;
    public createSecret(request: avs_pb.CreateOrUpdateSecretReq, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateSecretResp) => void): grpc.ClientUnaryCall;
    public createSecret(request: avs_pb.CreateOrUpdateSecretReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateSecretResp) => void): grpc.ClientUnaryCall;
    public createSecret(request: avs_pb.CreateOrUpdateSecretReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateSecretResp) => void): grpc.ClientUnaryCall;
    public deleteSecret(request: avs_pb.DeleteSecretReq, callback: (error: grpc.ServiceError | null, response: avs_pb.DeleteSecretResp) => void): grpc.ClientUnaryCall;
    public deleteSecret(request: avs_pb.DeleteSecretReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.DeleteSecretResp) => void): grpc.ClientUnaryCall;
    public deleteSecret(request: avs_pb.DeleteSecretReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.DeleteSecretResp) => void): grpc.ClientUnaryCall;
    public listSecrets(request: avs_pb.ListSecretsReq, callback: (error: grpc.ServiceError | null, response: avs_pb.ListSecretsResp) => void): grpc.ClientUnaryCall;
    public listSecrets(request: avs_pb.ListSecretsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.ListSecretsResp) => void): grpc.ClientUnaryCall;
    public listSecrets(request: avs_pb.ListSecretsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.ListSecretsResp) => void): grpc.ClientUnaryCall;
    public updateSecret(request: avs_pb.CreateOrUpdateSecretReq, callback: (error: grpc.ServiceError | null, response: avs_pb.UpdateSecretResp) => void): grpc.ClientUnaryCall;
    public updateSecret(request: avs_pb.CreateOrUpdateSecretReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.UpdateSecretResp) => void): grpc.ClientUnaryCall;
    public updateSecret(request: avs_pb.CreateOrUpdateSecretReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.UpdateSecretResp) => void): grpc.ClientUnaryCall;
    public getWorkflowCount(request: avs_pb.GetWorkflowCountReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWorkflowCountResp) => void): grpc.ClientUnaryCall;
    public getWorkflowCount(request: avs_pb.GetWorkflowCountReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWorkflowCountResp) => void): grpc.ClientUnaryCall;
    public getWorkflowCount(request: avs_pb.GetWorkflowCountReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWorkflowCountResp) => void): grpc.ClientUnaryCall;
    public getExecutionCount(request: avs_pb.GetExecutionCountReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionCountResp) => void): grpc.ClientUnaryCall;
    public getExecutionCount(request: avs_pb.GetExecutionCountReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionCountResp) => void): grpc.ClientUnaryCall;
    public getExecutionCount(request: avs_pb.GetExecutionCountReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionCountResp) => void): grpc.ClientUnaryCall;
    public getExecutionStats(request: avs_pb.GetExecutionStatsReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionStatsResp) => void): grpc.ClientUnaryCall;
    public getExecutionStats(request: avs_pb.GetExecutionStatsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionStatsResp) => void): grpc.ClientUnaryCall;
    public getExecutionStats(request: avs_pb.GetExecutionStatsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionStatsResp) => void): grpc.ClientUnaryCall;
    public runNodeWithInputs(request: avs_pb.RunNodeWithInputsReq, callback: (error: grpc.ServiceError | null, response: avs_pb.RunNodeWithInputsResp) => void): grpc.ClientUnaryCall;
    public runNodeWithInputs(request: avs_pb.RunNodeWithInputsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.RunNodeWithInputsResp) => void): grpc.ClientUnaryCall;
    public runNodeWithInputs(request: avs_pb.RunNodeWithInputsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.RunNodeWithInputsResp) => void): grpc.ClientUnaryCall;
    public runTrigger(request: avs_pb.RunTriggerReq, callback: (error: grpc.ServiceError | null, response: avs_pb.RunTriggerResp) => void): grpc.ClientUnaryCall;
    public runTrigger(request: avs_pb.RunTriggerReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.RunTriggerResp) => void): grpc.ClientUnaryCall;
    public runTrigger(request: avs_pb.RunTriggerReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.RunTriggerResp) => void): grpc.ClientUnaryCall;
    public simulateTask(request: avs_pb.SimulateTaskReq, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
    public simulateTask(request: avs_pb.SimulateTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
    public simulateTask(request: avs_pb.SimulateTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
    public getTokenMetadata(request: avs_pb.GetTokenMetadataReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetTokenMetadataResp) => void): grpc.ClientUnaryCall;
    public getTokenMetadata(request: avs_pb.GetTokenMetadataReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetTokenMetadataResp) => void): grpc.ClientUnaryCall;
    public getTokenMetadata(request: avs_pb.GetTokenMetadataReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetTokenMetadataResp) => void): grpc.ClientUnaryCall;
    public estimateFees(request: avs_pb.EstimateFeesReq, callback: (error: grpc.ServiceError | null, response: avs_pb.EstimateFeesResp) => void): grpc.ClientUnaryCall;
    public estimateFees(request: avs_pb.EstimateFeesReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.EstimateFeesResp) => void): grpc.ClientUnaryCall;
    public estimateFees(request: avs_pb.EstimateFeesReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.EstimateFeesResp) => void): grpc.ClientUnaryCall;
}
