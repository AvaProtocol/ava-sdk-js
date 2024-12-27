// package: aggregator
// file: avs.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as avs_pb from "./avs_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

interface IAggregatorService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getKey: IAggregatorService_IGetKey;
    getNonce: IAggregatorService_IGetNonce;
    getWallet: IAggregatorService_IGetWallet;
    listWallets: IAggregatorService_IListWallets;
    createTask: IAggregatorService_ICreateTask;
    listTasks: IAggregatorService_IListTasks;
    getTask: IAggregatorService_IGetTask;
    listExecutions: IAggregatorService_IListExecutions;
    getExecution: IAggregatorService_IGetExecution;
    cancelTask: IAggregatorService_ICancelTask;
    deleteTask: IAggregatorService_IDeleteTask;
    triggerTask: IAggregatorService_ITriggerTask;
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
interface IAggregatorService_IGetExecution extends grpc.MethodDefinition<avs_pb.GetExecutionReq, avs_pb.Execution> {
    path: "/aggregator.Aggregator/GetExecution";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.GetExecutionReq>;
    requestDeserialize: grpc.deserialize<avs_pb.GetExecutionReq>;
    responseSerialize: grpc.serialize<avs_pb.Execution>;
    responseDeserialize: grpc.deserialize<avs_pb.Execution>;
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

export const AggregatorService: IAggregatorService;

export interface IAggregatorServer extends grpc.UntypedServiceImplementation {
    getKey: grpc.handleUnaryCall<avs_pb.GetKeyReq, avs_pb.KeyResp>;
    getNonce: grpc.handleUnaryCall<avs_pb.NonceRequest, avs_pb.NonceResp>;
    getWallet: grpc.handleUnaryCall<avs_pb.GetWalletReq, avs_pb.GetWalletResp>;
    listWallets: grpc.handleUnaryCall<avs_pb.ListWalletReq, avs_pb.ListWalletResp>;
    createTask: grpc.handleUnaryCall<avs_pb.CreateTaskReq, avs_pb.CreateTaskResp>;
    listTasks: grpc.handleUnaryCall<avs_pb.ListTasksReq, avs_pb.ListTasksResp>;
    getTask: grpc.handleUnaryCall<avs_pb.IdReq, avs_pb.Task>;
    listExecutions: grpc.handleUnaryCall<avs_pb.ListExecutionsReq, avs_pb.ListExecutionsResp>;
    getExecution: grpc.handleUnaryCall<avs_pb.GetExecutionReq, avs_pb.Execution>;
    cancelTask: grpc.handleUnaryCall<avs_pb.IdReq, google_protobuf_wrappers_pb.BoolValue>;
    deleteTask: grpc.handleUnaryCall<avs_pb.IdReq, google_protobuf_wrappers_pb.BoolValue>;
    triggerTask: grpc.handleUnaryCall<avs_pb.UserTriggerTaskReq, avs_pb.UserTriggerTaskResp>;
}

export interface IAggregatorClient {
    getKey(request: avs_pb.GetKeyReq, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    getKey(request: avs_pb.GetKeyReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    getKey(request: avs_pb.GetKeyReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
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
    getExecution(request: avs_pb.GetExecutionReq, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
    getExecution(request: avs_pb.GetExecutionReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
    getExecution(request: avs_pb.GetExecutionReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
    cancelTask(request: avs_pb.IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    cancelTask(request: avs_pb.IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    cancelTask(request: avs_pb.IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: avs_pb.IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: avs_pb.IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: avs_pb.IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    triggerTask(request: avs_pb.UserTriggerTaskReq, callback: (error: grpc.ServiceError | null, response: avs_pb.UserTriggerTaskResp) => void): grpc.ClientUnaryCall;
    triggerTask(request: avs_pb.UserTriggerTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.UserTriggerTaskResp) => void): grpc.ClientUnaryCall;
    triggerTask(request: avs_pb.UserTriggerTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.UserTriggerTaskResp) => void): grpc.ClientUnaryCall;
}

export class AggregatorClient extends grpc.Client implements IAggregatorClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getKey(request: avs_pb.GetKeyReq, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    public getKey(request: avs_pb.GetKeyReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    public getKey(request: avs_pb.GetKeyReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
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
    public getExecution(request: avs_pb.GetExecutionReq, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
    public getExecution(request: avs_pb.GetExecutionReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
    public getExecution(request: avs_pb.GetExecutionReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
    public cancelTask(request: avs_pb.IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public cancelTask(request: avs_pb.IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public cancelTask(request: avs_pb.IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: avs_pb.IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: avs_pb.IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: avs_pb.IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public triggerTask(request: avs_pb.UserTriggerTaskReq, callback: (error: grpc.ServiceError | null, response: avs_pb.UserTriggerTaskResp) => void): grpc.ClientUnaryCall;
    public triggerTask(request: avs_pb.UserTriggerTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.UserTriggerTaskResp) => void): grpc.ClientUnaryCall;
    public triggerTask(request: avs_pb.UserTriggerTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.UserTriggerTaskResp) => void): grpc.ClientUnaryCall;
}
