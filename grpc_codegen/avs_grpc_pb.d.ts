// package: aggregator
// file: avs.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as avs_pb from "./avs_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";

interface IAggregatorService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getKey: IAggregatorService_IGetKey;
    getSignatureFormat: IAggregatorService_IGetSignatureFormat;
    getNonce: IAggregatorService_IGetNonce;
    getWallet: IAggregatorService_IGetWallet;
    listWallets: IAggregatorService_IListWallets;
    createTask: IAggregatorService_ICreateTask;
    listTasks: IAggregatorService_IListTasks;
    getTask: IAggregatorService_IGetTask;
    listExecutions: IAggregatorService_IListExecutions;
    getExecution: IAggregatorService_IGetExecution;
    getExecutionStatus: IAggregatorService_IGetExecutionStatus;
    cancelTask: IAggregatorService_ICancelTask;
    deleteTask: IAggregatorService_IDeleteTask;
    triggerTask: IAggregatorService_ITriggerTask;
    createSecret: IAggregatorService_ICreateSecret;
    deleteSecret: IAggregatorService_IDeleteSecret;
    listSecrets: IAggregatorService_IListSecrets;
    updateSecret: IAggregatorService_IUpdateSecret;
    getWorkflowCount: IAggregatorService_IGetWorkflowCount;
    getExecutionCount: IAggregatorService_IGetExecutionCount;
    getExecutionStats: IAggregatorService_IGetExecutionStats;
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
interface IAggregatorService_IListWallets extends grpc.MethodDefinition<avs_pb.ListWalletReq, avs_pb.ListWalletResp> {
    path: "/aggregator.Aggregator/ListWallets";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.ListWalletReq>;
    requestDeserialize: grpc.deserialize<avs_pb.ListWalletReq>;
    responseSerialize: grpc.serialize<avs_pb.ListWalletResp>;
    responseDeserialize: grpc.deserialize<avs_pb.ListWalletResp>;
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
interface IAggregatorService_ICancelTask extends grpc.MethodDefinition<avs_pb.IdReq, google_protobuf_wrappers_pb.BoolValue> {
    path: "/aggregator.Aggregator/CancelTask";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.IdReq>;
    requestDeserialize: grpc.deserialize<avs_pb.IdReq>;
    responseSerialize: grpc.serialize<google_protobuf_wrappers_pb.BoolValue>;
    responseDeserialize: grpc.deserialize<google_protobuf_wrappers_pb.BoolValue>;
}
interface IAggregatorService_IDeleteTask extends grpc.MethodDefinition<avs_pb.IdReq, google_protobuf_wrappers_pb.BoolValue> {
    path: "/aggregator.Aggregator/DeleteTask";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.IdReq>;
    requestDeserialize: grpc.deserialize<avs_pb.IdReq>;
    responseSerialize: grpc.serialize<google_protobuf_wrappers_pb.BoolValue>;
    responseDeserialize: grpc.deserialize<google_protobuf_wrappers_pb.BoolValue>;
}
interface IAggregatorService_ITriggerTask extends grpc.MethodDefinition<avs_pb.UserTriggerTaskReq, avs_pb.UserTriggerTaskResp> {
    path: "/aggregator.Aggregator/TriggerTask";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.UserTriggerTaskReq>;
    requestDeserialize: grpc.deserialize<avs_pb.UserTriggerTaskReq>;
    responseSerialize: grpc.serialize<avs_pb.UserTriggerTaskResp>;
    responseDeserialize: grpc.deserialize<avs_pb.UserTriggerTaskResp>;
}
interface IAggregatorService_ICreateSecret extends grpc.MethodDefinition<avs_pb.CreateOrUpdateSecretReq, google_protobuf_wrappers_pb.BoolValue> {
    path: "/aggregator.Aggregator/CreateSecret";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.CreateOrUpdateSecretReq>;
    requestDeserialize: grpc.deserialize<avs_pb.CreateOrUpdateSecretReq>;
    responseSerialize: grpc.serialize<google_protobuf_wrappers_pb.BoolValue>;
    responseDeserialize: grpc.deserialize<google_protobuf_wrappers_pb.BoolValue>;
}
interface IAggregatorService_IDeleteSecret extends grpc.MethodDefinition<avs_pb.DeleteSecretReq, google_protobuf_wrappers_pb.BoolValue> {
    path: "/aggregator.Aggregator/DeleteSecret";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.DeleteSecretReq>;
    requestDeserialize: grpc.deserialize<avs_pb.DeleteSecretReq>;
    responseSerialize: grpc.serialize<google_protobuf_wrappers_pb.BoolValue>;
    responseDeserialize: grpc.deserialize<google_protobuf_wrappers_pb.BoolValue>;
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
interface IAggregatorService_IUpdateSecret extends grpc.MethodDefinition<avs_pb.CreateOrUpdateSecretReq, google_protobuf_wrappers_pb.BoolValue> {
    path: "/aggregator.Aggregator/UpdateSecret";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.CreateOrUpdateSecretReq>;
    requestDeserialize: grpc.deserialize<avs_pb.CreateOrUpdateSecretReq>;
    responseSerialize: grpc.serialize<google_protobuf_wrappers_pb.BoolValue>;
    responseDeserialize: grpc.deserialize<google_protobuf_wrappers_pb.BoolValue>;
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

export const AggregatorService: IAggregatorService;

export interface IAggregatorServer extends grpc.UntypedServiceImplementation {
    getKey: grpc.handleUnaryCall<avs_pb.GetKeyReq, avs_pb.KeyResp>;
    getSignatureFormat: grpc.handleUnaryCall<avs_pb.GetSignatureFormatReq, avs_pb.GetSignatureFormatResp>;
    getNonce: grpc.handleUnaryCall<avs_pb.NonceRequest, avs_pb.NonceResp>;
    getWallet: grpc.handleUnaryCall<avs_pb.GetWalletReq, avs_pb.GetWalletResp>;
    listWallets: grpc.handleUnaryCall<avs_pb.ListWalletReq, avs_pb.ListWalletResp>;
    createTask: grpc.handleUnaryCall<avs_pb.CreateTaskReq, avs_pb.CreateTaskResp>;
    listTasks: grpc.handleUnaryCall<avs_pb.ListTasksReq, avs_pb.ListTasksResp>;
    getTask: grpc.handleUnaryCall<avs_pb.IdReq, avs_pb.Task>;
    listExecutions: grpc.handleUnaryCall<avs_pb.ListExecutionsReq, avs_pb.ListExecutionsResp>;
    getExecution: grpc.handleUnaryCall<avs_pb.ExecutionReq, avs_pb.Execution>;
    getExecutionStatus: grpc.handleUnaryCall<avs_pb.ExecutionReq, avs_pb.ExecutionStatusResp>;
    cancelTask: grpc.handleUnaryCall<avs_pb.IdReq, google_protobuf_wrappers_pb.BoolValue>;
    deleteTask: grpc.handleUnaryCall<avs_pb.IdReq, google_protobuf_wrappers_pb.BoolValue>;
    triggerTask: grpc.handleUnaryCall<avs_pb.UserTriggerTaskReq, avs_pb.UserTriggerTaskResp>;
    createSecret: grpc.handleUnaryCall<avs_pb.CreateOrUpdateSecretReq, google_protobuf_wrappers_pb.BoolValue>;
    deleteSecret: grpc.handleUnaryCall<avs_pb.DeleteSecretReq, google_protobuf_wrappers_pb.BoolValue>;
    listSecrets: grpc.handleUnaryCall<avs_pb.ListSecretsReq, avs_pb.ListSecretsResp>;
    updateSecret: grpc.handleUnaryCall<avs_pb.CreateOrUpdateSecretReq, google_protobuf_wrappers_pb.BoolValue>;
    getWorkflowCount: grpc.handleUnaryCall<avs_pb.GetWorkflowCountReq, avs_pb.GetWorkflowCountResp>;
    getExecutionCount: grpc.handleUnaryCall<avs_pb.GetExecutionCountReq, avs_pb.GetExecutionCountResp>;
    getExecutionStats: grpc.handleUnaryCall<avs_pb.GetExecutionStatsReq, avs_pb.GetExecutionStatsResp>;
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
    listWallets(request: avs_pb.ListWalletReq, callback: (error: grpc.ServiceError | null, response: avs_pb.ListWalletResp) => void): grpc.ClientUnaryCall;
    listWallets(request: avs_pb.ListWalletReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.ListWalletResp) => void): grpc.ClientUnaryCall;
    listWallets(request: avs_pb.ListWalletReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.ListWalletResp) => void): grpc.ClientUnaryCall;
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
    cancelTask(request: avs_pb.IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    cancelTask(request: avs_pb.IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    cancelTask(request: avs_pb.IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: avs_pb.IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: avs_pb.IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: avs_pb.IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    triggerTask(request: avs_pb.UserTriggerTaskReq, callback: (error: grpc.ServiceError | null, response: avs_pb.UserTriggerTaskResp) => void): grpc.ClientUnaryCall;
    triggerTask(request: avs_pb.UserTriggerTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.UserTriggerTaskResp) => void): grpc.ClientUnaryCall;
    triggerTask(request: avs_pb.UserTriggerTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.UserTriggerTaskResp) => void): grpc.ClientUnaryCall;
    createSecret(request: avs_pb.CreateOrUpdateSecretReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    createSecret(request: avs_pb.CreateOrUpdateSecretReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    createSecret(request: avs_pb.CreateOrUpdateSecretReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteSecret(request: avs_pb.DeleteSecretReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteSecret(request: avs_pb.DeleteSecretReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteSecret(request: avs_pb.DeleteSecretReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    listSecrets(request: avs_pb.ListSecretsReq, callback: (error: grpc.ServiceError | null, response: avs_pb.ListSecretsResp) => void): grpc.ClientUnaryCall;
    listSecrets(request: avs_pb.ListSecretsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.ListSecretsResp) => void): grpc.ClientUnaryCall;
    listSecrets(request: avs_pb.ListSecretsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.ListSecretsResp) => void): grpc.ClientUnaryCall;
    updateSecret(request: avs_pb.CreateOrUpdateSecretReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    updateSecret(request: avs_pb.CreateOrUpdateSecretReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    updateSecret(request: avs_pb.CreateOrUpdateSecretReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    getWorkflowCount(request: avs_pb.GetWorkflowCountReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWorkflowCountResp) => void): grpc.ClientUnaryCall;
    getWorkflowCount(request: avs_pb.GetWorkflowCountReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWorkflowCountResp) => void): grpc.ClientUnaryCall;
    getWorkflowCount(request: avs_pb.GetWorkflowCountReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWorkflowCountResp) => void): grpc.ClientUnaryCall;
    getExecutionCount(request: avs_pb.GetExecutionCountReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionCountResp) => void): grpc.ClientUnaryCall;
    getExecutionCount(request: avs_pb.GetExecutionCountReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionCountResp) => void): grpc.ClientUnaryCall;
    getExecutionCount(request: avs_pb.GetExecutionCountReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionCountResp) => void): grpc.ClientUnaryCall;
    getExecutionStats(request: avs_pb.GetExecutionStatsReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionStatsResp) => void): grpc.ClientUnaryCall;
    getExecutionStats(request: avs_pb.GetExecutionStatsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionStatsResp) => void): grpc.ClientUnaryCall;
    getExecutionStats(request: avs_pb.GetExecutionStatsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionStatsResp) => void): grpc.ClientUnaryCall;
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
    public listWallets(request: avs_pb.ListWalletReq, callback: (error: grpc.ServiceError | null, response: avs_pb.ListWalletResp) => void): grpc.ClientUnaryCall;
    public listWallets(request: avs_pb.ListWalletReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.ListWalletResp) => void): grpc.ClientUnaryCall;
    public listWallets(request: avs_pb.ListWalletReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.ListWalletResp) => void): grpc.ClientUnaryCall;
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
    public cancelTask(request: avs_pb.IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public cancelTask(request: avs_pb.IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public cancelTask(request: avs_pb.IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: avs_pb.IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: avs_pb.IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: avs_pb.IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public triggerTask(request: avs_pb.UserTriggerTaskReq, callback: (error: grpc.ServiceError | null, response: avs_pb.UserTriggerTaskResp) => void): grpc.ClientUnaryCall;
    public triggerTask(request: avs_pb.UserTriggerTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.UserTriggerTaskResp) => void): grpc.ClientUnaryCall;
    public triggerTask(request: avs_pb.UserTriggerTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.UserTriggerTaskResp) => void): grpc.ClientUnaryCall;
    public createSecret(request: avs_pb.CreateOrUpdateSecretReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public createSecret(request: avs_pb.CreateOrUpdateSecretReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public createSecret(request: avs_pb.CreateOrUpdateSecretReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteSecret(request: avs_pb.DeleteSecretReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteSecret(request: avs_pb.DeleteSecretReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteSecret(request: avs_pb.DeleteSecretReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public listSecrets(request: avs_pb.ListSecretsReq, callback: (error: grpc.ServiceError | null, response: avs_pb.ListSecretsResp) => void): grpc.ClientUnaryCall;
    public listSecrets(request: avs_pb.ListSecretsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.ListSecretsResp) => void): grpc.ClientUnaryCall;
    public listSecrets(request: avs_pb.ListSecretsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.ListSecretsResp) => void): grpc.ClientUnaryCall;
    public updateSecret(request: avs_pb.CreateOrUpdateSecretReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public updateSecret(request: avs_pb.CreateOrUpdateSecretReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public updateSecret(request: avs_pb.CreateOrUpdateSecretReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public getWorkflowCount(request: avs_pb.GetWorkflowCountReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWorkflowCountResp) => void): grpc.ClientUnaryCall;
    public getWorkflowCount(request: avs_pb.GetWorkflowCountReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWorkflowCountResp) => void): grpc.ClientUnaryCall;
    public getWorkflowCount(request: avs_pb.GetWorkflowCountReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetWorkflowCountResp) => void): grpc.ClientUnaryCall;
    public getExecutionCount(request: avs_pb.GetExecutionCountReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionCountResp) => void): grpc.ClientUnaryCall;
    public getExecutionCount(request: avs_pb.GetExecutionCountReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionCountResp) => void): grpc.ClientUnaryCall;
    public getExecutionCount(request: avs_pb.GetExecutionCountReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionCountResp) => void): grpc.ClientUnaryCall;
    public getExecutionStats(request: avs_pb.GetExecutionStatsReq, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionStatsResp) => void): grpc.ClientUnaryCall;
    public getExecutionStats(request: avs_pb.GetExecutionStatsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionStatsResp) => void): grpc.ClientUnaryCall;
    public getExecutionStats(request: avs_pb.GetExecutionStatsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.GetExecutionStatsResp) => void): grpc.ClientUnaryCall;
}
