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
    getSmartAccountAddress: IAggregatorService_IGetSmartAccountAddress;
    createTask: IAggregatorService_ICreateTask;
    listTasks: IAggregatorService_IListTasks;
    getTask: IAggregatorService_IGetTask;
    cancelTask: IAggregatorService_ICancelTask;
    deleteTask: IAggregatorService_IDeleteTask;
    ping: IAggregatorService_IPing;
    syncTasks: IAggregatorService_ISyncTasks;
    updateChecks: IAggregatorService_IUpdateChecks;
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
interface IAggregatorService_IGetSmartAccountAddress extends grpc.MethodDefinition<avs_pb.AddressRequest, avs_pb.AddressResp> {
    path: "/aggregator.Aggregator/GetSmartAccountAddress";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.AddressRequest>;
    requestDeserialize: grpc.deserialize<avs_pb.AddressRequest>;
    responseSerialize: grpc.serialize<avs_pb.AddressResp>;
    responseDeserialize: grpc.deserialize<avs_pb.AddressResp>;
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
interface IAggregatorService_IGetTask extends grpc.MethodDefinition<avs_pb.UUID, avs_pb.Task> {
    path: "/aggregator.Aggregator/GetTask";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.UUID>;
    requestDeserialize: grpc.deserialize<avs_pb.UUID>;
    responseSerialize: grpc.serialize<avs_pb.Task>;
    responseDeserialize: grpc.deserialize<avs_pb.Task>;
}
interface IAggregatorService_ICancelTask extends grpc.MethodDefinition<avs_pb.UUID, google_protobuf_wrappers_pb.BoolValue> {
    path: "/aggregator.Aggregator/CancelTask";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.UUID>;
    requestDeserialize: grpc.deserialize<avs_pb.UUID>;
    responseSerialize: grpc.serialize<google_protobuf_wrappers_pb.BoolValue>;
    responseDeserialize: grpc.deserialize<google_protobuf_wrappers_pb.BoolValue>;
}
interface IAggregatorService_IDeleteTask extends grpc.MethodDefinition<avs_pb.UUID, google_protobuf_wrappers_pb.BoolValue> {
    path: "/aggregator.Aggregator/DeleteTask";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.UUID>;
    requestDeserialize: grpc.deserialize<avs_pb.UUID>;
    responseSerialize: grpc.serialize<google_protobuf_wrappers_pb.BoolValue>;
    responseDeserialize: grpc.deserialize<google_protobuf_wrappers_pb.BoolValue>;
}
interface IAggregatorService_IPing extends grpc.MethodDefinition<avs_pb.Checkin, avs_pb.CheckinResp> {
    path: "/aggregator.Aggregator/Ping";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.Checkin>;
    requestDeserialize: grpc.deserialize<avs_pb.Checkin>;
    responseSerialize: grpc.serialize<avs_pb.CheckinResp>;
    responseDeserialize: grpc.deserialize<avs_pb.CheckinResp>;
}
interface IAggregatorService_ISyncTasks extends grpc.MethodDefinition<avs_pb.SyncTasksReq, avs_pb.SyncTasksResp> {
    path: "/aggregator.Aggregator/SyncTasks";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<avs_pb.SyncTasksReq>;
    requestDeserialize: grpc.deserialize<avs_pb.SyncTasksReq>;
    responseSerialize: grpc.serialize<avs_pb.SyncTasksResp>;
    responseDeserialize: grpc.deserialize<avs_pb.SyncTasksResp>;
}
interface IAggregatorService_IUpdateChecks extends grpc.MethodDefinition<avs_pb.UpdateChecksReq, avs_pb.UpdateChecksResp> {
    path: "/aggregator.Aggregator/UpdateChecks";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.UpdateChecksReq>;
    requestDeserialize: grpc.deserialize<avs_pb.UpdateChecksReq>;
    responseSerialize: grpc.serialize<avs_pb.UpdateChecksResp>;
    responseDeserialize: grpc.deserialize<avs_pb.UpdateChecksResp>;
}

export const AggregatorService: IAggregatorService;

export interface IAggregatorServer extends grpc.UntypedServiceImplementation {
    getKey: grpc.handleUnaryCall<avs_pb.GetKeyReq, avs_pb.KeyResp>;
    getNonce: grpc.handleUnaryCall<avs_pb.NonceRequest, avs_pb.NonceResp>;
    getSmartAccountAddress: grpc.handleUnaryCall<avs_pb.AddressRequest, avs_pb.AddressResp>;
    createTask: grpc.handleUnaryCall<avs_pb.CreateTaskReq, avs_pb.CreateTaskResp>;
    listTasks: grpc.handleUnaryCall<avs_pb.ListTasksReq, avs_pb.ListTasksResp>;
    getTask: grpc.handleUnaryCall<avs_pb.UUID, avs_pb.Task>;
    cancelTask: grpc.handleUnaryCall<avs_pb.UUID, google_protobuf_wrappers_pb.BoolValue>;
    deleteTask: grpc.handleUnaryCall<avs_pb.UUID, google_protobuf_wrappers_pb.BoolValue>;
    ping: grpc.handleUnaryCall<avs_pb.Checkin, avs_pb.CheckinResp>;
    syncTasks: grpc.handleServerStreamingCall<avs_pb.SyncTasksReq, avs_pb.SyncTasksResp>;
    updateChecks: grpc.handleUnaryCall<avs_pb.UpdateChecksReq, avs_pb.UpdateChecksResp>;
}

export interface IAggregatorClient {
    getKey(request: avs_pb.GetKeyReq, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    getKey(request: avs_pb.GetKeyReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    getKey(request: avs_pb.GetKeyReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    getNonce(request: avs_pb.NonceRequest, callback: (error: grpc.ServiceError | null, response: avs_pb.NonceResp) => void): grpc.ClientUnaryCall;
    getNonce(request: avs_pb.NonceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.NonceResp) => void): grpc.ClientUnaryCall;
    getNonce(request: avs_pb.NonceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.NonceResp) => void): grpc.ClientUnaryCall;
    getSmartAccountAddress(request: avs_pb.AddressRequest, callback: (error: grpc.ServiceError | null, response: avs_pb.AddressResp) => void): grpc.ClientUnaryCall;
    getSmartAccountAddress(request: avs_pb.AddressRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.AddressResp) => void): grpc.ClientUnaryCall;
    getSmartAccountAddress(request: avs_pb.AddressRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.AddressResp) => void): grpc.ClientUnaryCall;
    createTask(request: avs_pb.CreateTaskReq, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateTaskResp) => void): grpc.ClientUnaryCall;
    createTask(request: avs_pb.CreateTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateTaskResp) => void): grpc.ClientUnaryCall;
    createTask(request: avs_pb.CreateTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateTaskResp) => void): grpc.ClientUnaryCall;
    listTasks(request: avs_pb.ListTasksReq, callback: (error: grpc.ServiceError | null, response: avs_pb.ListTasksResp) => void): grpc.ClientUnaryCall;
    listTasks(request: avs_pb.ListTasksReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.ListTasksResp) => void): grpc.ClientUnaryCall;
    listTasks(request: avs_pb.ListTasksReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.ListTasksResp) => void): grpc.ClientUnaryCall;
    getTask(request: avs_pb.UUID, callback: (error: grpc.ServiceError | null, response: avs_pb.Task) => void): grpc.ClientUnaryCall;
    getTask(request: avs_pb.UUID, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.Task) => void): grpc.ClientUnaryCall;
    getTask(request: avs_pb.UUID, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.Task) => void): grpc.ClientUnaryCall;
    cancelTask(request: avs_pb.UUID, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    cancelTask(request: avs_pb.UUID, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    cancelTask(request: avs_pb.UUID, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: avs_pb.UUID, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: avs_pb.UUID, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: avs_pb.UUID, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    ping(request: avs_pb.Checkin, callback: (error: grpc.ServiceError | null, response: avs_pb.CheckinResp) => void): grpc.ClientUnaryCall;
    ping(request: avs_pb.Checkin, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.CheckinResp) => void): grpc.ClientUnaryCall;
    ping(request: avs_pb.Checkin, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.CheckinResp) => void): grpc.ClientUnaryCall;
    syncTasks(request: avs_pb.SyncTasksReq, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<avs_pb.SyncTasksResp>;
    syncTasks(request: avs_pb.SyncTasksReq, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<avs_pb.SyncTasksResp>;
    updateChecks(request: avs_pb.UpdateChecksReq, callback: (error: grpc.ServiceError | null, response: avs_pb.UpdateChecksResp) => void): grpc.ClientUnaryCall;
    updateChecks(request: avs_pb.UpdateChecksReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.UpdateChecksResp) => void): grpc.ClientUnaryCall;
    updateChecks(request: avs_pb.UpdateChecksReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.UpdateChecksResp) => void): grpc.ClientUnaryCall;
}

export class AggregatorClient extends grpc.Client implements IAggregatorClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getKey(request: avs_pb.GetKeyReq, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    public getKey(request: avs_pb.GetKeyReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    public getKey(request: avs_pb.GetKeyReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResp) => void): grpc.ClientUnaryCall;
    public getNonce(request: avs_pb.NonceRequest, callback: (error: grpc.ServiceError | null, response: avs_pb.NonceResp) => void): grpc.ClientUnaryCall;
    public getNonce(request: avs_pb.NonceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.NonceResp) => void): grpc.ClientUnaryCall;
    public getNonce(request: avs_pb.NonceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.NonceResp) => void): grpc.ClientUnaryCall;
    public getSmartAccountAddress(request: avs_pb.AddressRequest, callback: (error: grpc.ServiceError | null, response: avs_pb.AddressResp) => void): grpc.ClientUnaryCall;
    public getSmartAccountAddress(request: avs_pb.AddressRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.AddressResp) => void): grpc.ClientUnaryCall;
    public getSmartAccountAddress(request: avs_pb.AddressRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.AddressResp) => void): grpc.ClientUnaryCall;
    public createTask(request: avs_pb.CreateTaskReq, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateTaskResp) => void): grpc.ClientUnaryCall;
    public createTask(request: avs_pb.CreateTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateTaskResp) => void): grpc.ClientUnaryCall;
    public createTask(request: avs_pb.CreateTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.CreateTaskResp) => void): grpc.ClientUnaryCall;
    public listTasks(request: avs_pb.ListTasksReq, callback: (error: grpc.ServiceError | null, response: avs_pb.ListTasksResp) => void): grpc.ClientUnaryCall;
    public listTasks(request: avs_pb.ListTasksReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.ListTasksResp) => void): grpc.ClientUnaryCall;
    public listTasks(request: avs_pb.ListTasksReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.ListTasksResp) => void): grpc.ClientUnaryCall;
    public getTask(request: avs_pb.UUID, callback: (error: grpc.ServiceError | null, response: avs_pb.Task) => void): grpc.ClientUnaryCall;
    public getTask(request: avs_pb.UUID, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.Task) => void): grpc.ClientUnaryCall;
    public getTask(request: avs_pb.UUID, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.Task) => void): grpc.ClientUnaryCall;
    public cancelTask(request: avs_pb.UUID, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public cancelTask(request: avs_pb.UUID, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public cancelTask(request: avs_pb.UUID, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: avs_pb.UUID, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: avs_pb.UUID, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: avs_pb.UUID, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public ping(request: avs_pb.Checkin, callback: (error: grpc.ServiceError | null, response: avs_pb.CheckinResp) => void): grpc.ClientUnaryCall;
    public ping(request: avs_pb.Checkin, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.CheckinResp) => void): grpc.ClientUnaryCall;
    public ping(request: avs_pb.Checkin, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.CheckinResp) => void): grpc.ClientUnaryCall;
    public syncTasks(request: avs_pb.SyncTasksReq, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<avs_pb.SyncTasksResp>;
    public syncTasks(request: avs_pb.SyncTasksReq, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<avs_pb.SyncTasksResp>;
    public updateChecks(request: avs_pb.UpdateChecksReq, callback: (error: grpc.ServiceError | null, response: avs_pb.UpdateChecksResp) => void): grpc.ClientUnaryCall;
    public updateChecks(request: avs_pb.UpdateChecksReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.UpdateChecksResp) => void): grpc.ClientUnaryCall;
    public updateChecks(request: avs_pb.UpdateChecksReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.UpdateChecksResp) => void): grpc.ClientUnaryCall;
}
