// package: aggregator
// file: avs.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as avs_pb from "./avs_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

interface IAggregatorService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getKey: IAggregatorService_IGetKey;
    getNonce: IAggregatorService_IGetNonce;
    createWallet: IAggregatorService_ICreateWallet;
    listWallets: IAggregatorService_IListWallets;
    createTask: IAggregatorService_ICreateTask;
    listTasks: IAggregatorService_IListTasks;
    getTask: IAggregatorService_IGetTask;
    cancelTask: IAggregatorService_ICancelTask;
    deleteTask: IAggregatorService_IDeleteTask;
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
interface IAggregatorService_ICreateWallet extends grpc.MethodDefinition<avs_pb.CreateWalletReq, avs_pb.CreateWalletResp> {
    path: "/aggregator.Aggregator/CreateWallet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.CreateWalletReq>;
    requestDeserialize: grpc.deserialize<avs_pb.CreateWalletReq>;
    responseSerialize: grpc.serialize<avs_pb.CreateWalletResp>;
    responseDeserialize: grpc.deserialize<avs_pb.CreateWalletResp>;
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

export const AggregatorService: IAggregatorService;

export interface IAggregatorServer extends grpc.UntypedServiceImplementation {
    getKey: grpc.handleUnaryCall<avs_pb.GetKeyReq, avs_pb.KeyResp>;
    getNonce: grpc.handleUnaryCall<avs_pb.NonceRequest, avs_pb.NonceResp>;
    createWallet: grpc.handleUnaryCall<avs_pb.CreateWalletReq, avs_pb.CreateWalletResp>;
    listWallets: grpc.handleUnaryCall<avs_pb.ListWalletReq, avs_pb.ListWalletResp>;
    createTask: grpc.handleUnaryCall<avs_pb.CreateTaskReq, avs_pb.CreateTaskResp>;
    listTasks: grpc.handleUnaryCall<avs_pb.ListTasksReq, avs_pb.ListTasksResp>;
    getTask: grpc.handleUnaryCall<avs_pb.IdReq, avs_pb.Task>;
    cancelTask: grpc.handleUnaryCall<avs_pb.IdReq, google_protobuf_wrappers_pb.BoolValue>;
    deleteTask: grpc.handleUnaryCall<avs_pb.IdReq, google_protobuf_wrappers_pb.BoolValue>;
}

export interface IAggregatorClient {
    getKey(request: avs_pb.GetKeyReq, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    getKey(request: avs_pb.GetKeyReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    getKey(request: avs_pb.GetKeyReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    getNonce(request: avs_pb.NonceRequest, callback: (error: grpc.ServiceError | null, response: avs_pb.NonceResp) => void): grpc.ClientUnaryCall;
    getNonce(request: avs_pb.NonceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.NonceResp) => void): grpc.ClientUnaryCall;
    getNonce(request: avs_pb.NonceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.NonceResp) => void): grpc.ClientUnaryCall;
    createWallet(request: avs_pb.CreateWalletReq, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateWalletResp) => void): grpc.ClientUnaryCall;
    createWallet(request: avs_pb.CreateWalletReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateWalletResp) => void): grpc.ClientUnaryCall;
    createWallet(request: avs_pb.CreateWalletReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateWalletResp) => void): grpc.ClientUnaryCall;
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
    cancelTask(request: avs_pb.IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    cancelTask(request: avs_pb.IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    cancelTask(request: avs_pb.IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: avs_pb.IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: avs_pb.IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: avs_pb.IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
}

export class AggregatorClient extends grpc.Client implements IAggregatorClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getKey(request: avs_pb.GetKeyReq, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    public getKey(request: avs_pb.GetKeyReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    public getKey(request: avs_pb.GetKeyReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    public getNonce(request: avs_pb.NonceRequest, callback: (error: grpc.ServiceError | null, response: avs_pb.NonceResp) => void): grpc.ClientUnaryCall;
    public getNonce(request: avs_pb.NonceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.NonceResp) => void): grpc.ClientUnaryCall;
    public getNonce(request: avs_pb.NonceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.NonceResp) => void): grpc.ClientUnaryCall;
    public createWallet(request: avs_pb.CreateWalletReq, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateWalletResp) => void): grpc.ClientUnaryCall;
    public createWallet(request: avs_pb.CreateWalletReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateWalletResp) => void): grpc.ClientUnaryCall;
    public createWallet(request: avs_pb.CreateWalletReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateWalletResp) => void): grpc.ClientUnaryCall;
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
    public cancelTask(request: avs_pb.IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public cancelTask(request: avs_pb.IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public cancelTask(request: avs_pb.IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: avs_pb.IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: avs_pb.IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: avs_pb.IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
}

interface INodeService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    ping: INodeService_IPing;
    syncMessages: INodeService_ISyncMessages;
    ack: INodeService_IAck;
    notifyTriggers: INodeService_INotifyTriggers;
}

interface INodeService_IPing extends grpc.MethodDefinition<avs_pb.Checkin, avs_pb.CheckinResp> {
    path: "/aggregator.Node/Ping";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.Checkin>;
    requestDeserialize: grpc.deserialize<avs_pb.Checkin>;
    responseSerialize: grpc.serialize<avs_pb.CheckinResp>;
    responseDeserialize: grpc.deserialize<avs_pb.CheckinResp>;
}
interface INodeService_ISyncMessages extends grpc.MethodDefinition<avs_pb.SyncMessagesReq, avs_pb.SyncMessagesResp> {
    path: "/aggregator.Node/SyncMessages";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<avs_pb.SyncMessagesReq>;
    requestDeserialize: grpc.deserialize<avs_pb.SyncMessagesReq>;
    responseSerialize: grpc.serialize<avs_pb.SyncMessagesResp>;
    responseDeserialize: grpc.deserialize<avs_pb.SyncMessagesResp>;
}
interface INodeService_IAck extends grpc.MethodDefinition<avs_pb.AckMessageReq, google_protobuf_wrappers_pb.BoolValue> {
    path: "/aggregator.Node/Ack";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.AckMessageReq>;
    requestDeserialize: grpc.deserialize<avs_pb.AckMessageReq>;
    responseSerialize: grpc.serialize<google_protobuf_wrappers_pb.BoolValue>;
    responseDeserialize: grpc.deserialize<google_protobuf_wrappers_pb.BoolValue>;
}
interface INodeService_INotifyTriggers extends grpc.MethodDefinition<avs_pb.NotifyTriggersReq, avs_pb.NotifyTriggersResp> {
    path: "/aggregator.Node/NotifyTriggers";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.NotifyTriggersReq>;
    requestDeserialize: grpc.deserialize<avs_pb.NotifyTriggersReq>;
    responseSerialize: grpc.serialize<avs_pb.NotifyTriggersResp>;
    responseDeserialize: grpc.deserialize<avs_pb.NotifyTriggersResp>;
}

export const NodeService: INodeService;

export interface INodeServer extends grpc.UntypedServiceImplementation {
    ping: grpc.handleUnaryCall<avs_pb.Checkin, avs_pb.CheckinResp>;
    syncMessages: grpc.handleServerStreamingCall<avs_pb.SyncMessagesReq, avs_pb.SyncMessagesResp>;
    ack: grpc.handleUnaryCall<avs_pb.AckMessageReq, google_protobuf_wrappers_pb.BoolValue>;
    notifyTriggers: grpc.handleUnaryCall<avs_pb.NotifyTriggersReq, avs_pb.NotifyTriggersResp>;
}

export interface INodeClient {
    ping(request: avs_pb.Checkin, callback: (error: grpc.ServiceError | null, response: avs_pb.CheckinResp) => void): grpc.ClientUnaryCall;
    ping(request: avs_pb.Checkin, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.CheckinResp) => void): grpc.ClientUnaryCall;
    ping(request: avs_pb.Checkin, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.CheckinResp) => void): grpc.ClientUnaryCall;
    syncMessages(request: avs_pb.SyncMessagesReq, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<avs_pb.SyncMessagesResp>;
    syncMessages(request: avs_pb.SyncMessagesReq, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<avs_pb.SyncMessagesResp>;
    ack(request: avs_pb.AckMessageReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    ack(request: avs_pb.AckMessageReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    ack(request: avs_pb.AckMessageReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    notifyTriggers(request: avs_pb.NotifyTriggersReq, callback: (error: grpc.ServiceError | null, response: avs_pb.NotifyTriggersResp) => void): grpc.ClientUnaryCall;
    notifyTriggers(request: avs_pb.NotifyTriggersReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.NotifyTriggersResp) => void): grpc.ClientUnaryCall;
    notifyTriggers(request: avs_pb.NotifyTriggersReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.NotifyTriggersResp) => void): grpc.ClientUnaryCall;
}

export class NodeClient extends grpc.Client implements INodeClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public ping(request: avs_pb.Checkin, callback: (error: grpc.ServiceError | null, response: avs_pb.CheckinResp) => void): grpc.ClientUnaryCall;
    public ping(request: avs_pb.Checkin, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.CheckinResp) => void): grpc.ClientUnaryCall;
    public ping(request: avs_pb.Checkin, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.CheckinResp) => void): grpc.ClientUnaryCall;
    public syncMessages(request: avs_pb.SyncMessagesReq, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<avs_pb.SyncMessagesResp>;
    public syncMessages(request: avs_pb.SyncMessagesReq, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<avs_pb.SyncMessagesResp>;
    public ack(request: avs_pb.AckMessageReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public ack(request: avs_pb.AckMessageReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public ack(request: avs_pb.AckMessageReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public notifyTriggers(request: avs_pb.NotifyTriggersReq, callback: (error: grpc.ServiceError | null, response: avs_pb.NotifyTriggersResp) => void): grpc.ClientUnaryCall;
    public notifyTriggers(request: avs_pb.NotifyTriggersReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.NotifyTriggersResp) => void): grpc.ClientUnaryCall;
    public notifyTriggers(request: avs_pb.NotifyTriggersReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.NotifyTriggersResp) => void): grpc.ClientUnaryCall;
}
