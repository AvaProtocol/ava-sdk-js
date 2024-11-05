import * as grpc from '@grpc/grpc-js';
import { Metadata } from '@grpc/grpc-js';
import * as jspb from 'google-protobuf';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';
import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb';

declare const getKeyRequestMessage: (address: string, expiredAt: number) => string;

// package: aggregator
// file: avs.proto



declare class UUID extends jspb.Message { 
    getBytes(): string;
    setBytes(value: string): UUID;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UUID.AsObject;
    static toObject(includeInstance: boolean, msg: UUID): UUID.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UUID, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UUID;
    static deserializeBinaryFromReader(message: UUID, reader: jspb.BinaryReader): UUID;
}

declare namespace UUID {
    export type AsObject = {
        bytes: string,
    }
}

declare class Checkin extends jspb.Message { 
    getId(): string;
    setId(value: string): Checkin;
    getAddress(): string;
    setAddress(value: string): Checkin;
    getSignature(): string;
    setSignature(value: string): Checkin;

    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): Checkin.Status | undefined;
    setStatus(value?: Checkin.Status): Checkin;
    getVersion(): string;
    setVersion(value: string): Checkin;
    getMetricsport(): number;
    setMetricsport(value: number): Checkin;
    getRemoteip(): string;
    setRemoteip(value: string): Checkin;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Checkin.AsObject;
    static toObject(includeInstance: boolean, msg: Checkin): Checkin.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Checkin, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Checkin;
    static deserializeBinaryFromReader(message: Checkin, reader: jspb.BinaryReader): Checkin;
}

declare namespace Checkin {
    export type AsObject = {
        id: string,
        address: string,
        signature: string,
        status?: Checkin.Status.AsObject,
        version: string,
        metricsport: number,
        remoteip: string,
    }


    export class Status extends jspb.Message { 
        getUptime(): number;
        setUptime(value: number): Status;
        getQueuedepth(): number;
        setQueuedepth(value: number): Status;

        hasLastHeartbeat(): boolean;
        clearLastHeartbeat(): void;
        getLastHeartbeat(): google_protobuf_timestamp_pb.Timestamp | undefined;
        setLastHeartbeat(value?: google_protobuf_timestamp_pb.Timestamp): Status;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Status.AsObject;
        static toObject(includeInstance: boolean, msg: Status): Status.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Status, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Status;
        static deserializeBinaryFromReader(message: Status, reader: jspb.BinaryReader): Status;
    }

    export namespace Status {
        export type AsObject = {
            uptime: number,
            queuedepth: number,
            lastHeartbeat?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        }
    }

}

declare class CheckinResp extends jspb.Message { 

    hasUpdatedAt(): boolean;
    clearUpdatedAt(): void;
    getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): CheckinResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CheckinResp.AsObject;
    static toObject(includeInstance: boolean, msg: CheckinResp): CheckinResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CheckinResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CheckinResp;
    static deserializeBinaryFromReader(message: CheckinResp, reader: jspb.BinaryReader): CheckinResp;
}

declare namespace CheckinResp {
    export type AsObject = {
        updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

declare class SyncTasksReq extends jspb.Message { 
    getId(): string;
    setId(value: string): SyncTasksReq;
    getAddress(): string;
    setAddress(value: string): SyncTasksReq;
    getSignature(): string;
    setSignature(value: string): SyncTasksReq;
    getMonotonicClock(): number;
    setMonotonicClock(value: number): SyncTasksReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SyncTasksReq.AsObject;
    static toObject(includeInstance: boolean, msg: SyncTasksReq): SyncTasksReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SyncTasksReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SyncTasksReq;
    static deserializeBinaryFromReader(message: SyncTasksReq, reader: jspb.BinaryReader): SyncTasksReq;
}

declare namespace SyncTasksReq {
    export type AsObject = {
        id: string,
        address: string,
        signature: string,
        monotonicClock: number,
    }
}

declare class TaskTrigger extends jspb.Message { 
    getTriggerType(): TriggerType;
    setTriggerType(value: TriggerType): TaskTrigger;

    hasSchedule(): boolean;
    clearSchedule(): void;
    getSchedule(): TimeCondition | undefined;
    setSchedule(value?: TimeCondition): TaskTrigger;

    hasContractQuery(): boolean;
    clearContractQuery(): void;
    getContractQuery(): ContractQueryCondition | undefined;
    setContractQuery(value?: ContractQueryCondition): TaskTrigger;

    hasExpression(): boolean;
    clearExpression(): void;
    getExpression(): ExpressionCondition | undefined;
    setExpression(value?: ExpressionCondition): TaskTrigger;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TaskTrigger.AsObject;
    static toObject(includeInstance: boolean, msg: TaskTrigger): TaskTrigger.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TaskTrigger, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TaskTrigger;
    static deserializeBinaryFromReader(message: TaskTrigger, reader: jspb.BinaryReader): TaskTrigger;
}

declare namespace TaskTrigger {
    export type AsObject = {
        triggerType: TriggerType,
        schedule?: TimeCondition.AsObject,
        contractQuery?: ContractQueryCondition.AsObject,
        expression?: ExpressionCondition.AsObject,
    }
}

declare class TimeCondition extends jspb.Message { 
    clearFixedList(): void;
    getFixedList(): Array<number>;
    setFixedList(value: Array<number>): TimeCondition;
    addFixed(value: number, index?: number): number;
    getCron(): string;
    setCron(value: string): TimeCondition;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TimeCondition.AsObject;
    static toObject(includeInstance: boolean, msg: TimeCondition): TimeCondition.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TimeCondition, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TimeCondition;
    static deserializeBinaryFromReader(message: TimeCondition, reader: jspb.BinaryReader): TimeCondition;
}

declare namespace TimeCondition {
    export type AsObject = {
        fixedList: Array<number>,
        cron: string,
    }
}

declare class ContractQueryCondition extends jspb.Message { 
    getContractAddress(): string;
    setContractAddress(value: string): ContractQueryCondition;
    getCallmsg(): string;
    setCallmsg(value: string): ContractQueryCondition;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ContractQueryCondition.AsObject;
    static toObject(includeInstance: boolean, msg: ContractQueryCondition): ContractQueryCondition.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ContractQueryCondition, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ContractQueryCondition;
    static deserializeBinaryFromReader(message: ContractQueryCondition, reader: jspb.BinaryReader): ContractQueryCondition;
}

declare namespace ContractQueryCondition {
    export type AsObject = {
        contractAddress: string,
        callmsg: string,
    }
}

declare class ExpressionCondition extends jspb.Message { 
    getExpression(): string;
    setExpression(value: string): ExpressionCondition;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExpressionCondition.AsObject;
    static toObject(includeInstance: boolean, msg: ExpressionCondition): ExpressionCondition.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExpressionCondition, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExpressionCondition;
    static deserializeBinaryFromReader(message: ExpressionCondition, reader: jspb.BinaryReader): ExpressionCondition;
}

declare namespace ExpressionCondition {
    export type AsObject = {
        expression: string,
    }
}

declare class SyncTasksResp extends jspb.Message { 
    getId(): string;
    setId(value: string): SyncTasksResp;
    getChecktype(): string;
    setChecktype(value: string): SyncTasksResp;

    hasTrigger(): boolean;
    clearTrigger(): void;
    getTrigger(): TaskTrigger | undefined;
    setTrigger(value?: TaskTrigger): SyncTasksResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SyncTasksResp.AsObject;
    static toObject(includeInstance: boolean, msg: SyncTasksResp): SyncTasksResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SyncTasksResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SyncTasksResp;
    static deserializeBinaryFromReader(message: SyncTasksResp, reader: jspb.BinaryReader): SyncTasksResp;
}

declare namespace SyncTasksResp {
    export type AsObject = {
        id: string,
        checktype: string,
        trigger?: TaskTrigger.AsObject,
    }
}

declare class ETHTransfer extends jspb.Message { 
    getDestination(): string;
    setDestination(value: string): ETHTransfer;
    getAmount(): string;
    setAmount(value: string): ETHTransfer;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ETHTransfer.AsObject;
    static toObject(includeInstance: boolean, msg: ETHTransfer): ETHTransfer.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ETHTransfer, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ETHTransfer;
    static deserializeBinaryFromReader(message: ETHTransfer, reader: jspb.BinaryReader): ETHTransfer;
}

declare namespace ETHTransfer {
    export type AsObject = {
        destination: string,
        amount: string,
    }
}

declare class ContractExecution extends jspb.Message { 
    getContractAddress(): string;
    setContractAddress(value: string): ContractExecution;
    getCallData(): string;
    setCallData(value: string): ContractExecution;
    getMethod(): string;
    setMethod(value: string): ContractExecution;
    getEncodedParams(): string;
    setEncodedParams(value: string): ContractExecution;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ContractExecution.AsObject;
    static toObject(includeInstance: boolean, msg: ContractExecution): ContractExecution.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ContractExecution, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ContractExecution;
    static deserializeBinaryFromReader(message: ContractExecution, reader: jspb.BinaryReader): ContractExecution;
}

declare namespace ContractExecution {
    export type AsObject = {
        contractAddress: string,
        callData: string,
        method: string,
        encodedParams: string,
    }
}

declare class GraphQLDataQuery extends jspb.Message { 
    getUrl(): string;
    setUrl(value: string): GraphQLDataQuery;
    getQuery(): string;
    setQuery(value: string): GraphQLDataQuery;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GraphQLDataQuery.AsObject;
    static toObject(includeInstance: boolean, msg: GraphQLDataQuery): GraphQLDataQuery.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GraphQLDataQuery, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GraphQLDataQuery;
    static deserializeBinaryFromReader(message: GraphQLDataQuery, reader: jspb.BinaryReader): GraphQLDataQuery;
}

declare namespace GraphQLDataQuery {
    export type AsObject = {
        url: string,
        query: string,
    }
}

declare class HTTPAPICall extends jspb.Message { 
    getUrl(): string;
    setUrl(value: string): HTTPAPICall;

    getHeadersMap(): jspb.Map<string, string>;
    clearHeadersMap(): void;
    getBody(): string;
    setBody(value: string): HTTPAPICall;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HTTPAPICall.AsObject;
    static toObject(includeInstance: boolean, msg: HTTPAPICall): HTTPAPICall.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HTTPAPICall, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HTTPAPICall;
    static deserializeBinaryFromReader(message: HTTPAPICall, reader: jspb.BinaryReader): HTTPAPICall;
}

declare namespace HTTPAPICall {
    export type AsObject = {
        url: string,

        headersMap: Array<[string, string]>,
        body: string,
    }
}

declare class CustomCode extends jspb.Message { 
    getType(): CustomCodeType;
    setType(value: CustomCodeType): CustomCode;
    getBody(): string;
    setBody(value: string): CustomCode;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CustomCode.AsObject;
    static toObject(includeInstance: boolean, msg: CustomCode): CustomCode.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CustomCode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CustomCode;
    static deserializeBinaryFromReader(message: CustomCode, reader: jspb.BinaryReader): CustomCode;
}

declare namespace CustomCode {
    export type AsObject = {
        type: CustomCodeType,
        body: string,
    }
}

declare class ConditionJump extends jspb.Message { 
    getExpression(): string;
    setExpression(value: string): ConditionJump;
    getNext(): string;
    setNext(value: string): ConditionJump;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ConditionJump.AsObject;
    static toObject(includeInstance: boolean, msg: ConditionJump): ConditionJump.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ConditionJump, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ConditionJump;
    static deserializeBinaryFromReader(message: ConditionJump, reader: jspb.BinaryReader): ConditionJump;
}

declare namespace ConditionJump {
    export type AsObject = {
        expression: string,
        next: string,
    }
}

declare class BranchAction extends jspb.Message { 

    hasIf(): boolean;
    clearIf(): void;
    getIf(): ConditionJump | undefined;
    setIf(value?: ConditionJump): BranchAction;
    clearElseifsList(): void;
    getElseifsList(): Array<ConditionJump>;
    setElseifsList(value: Array<ConditionJump>): BranchAction;
    addElseifs(value?: ConditionJump, index?: number): ConditionJump;

    hasElse(): boolean;
    clearElse(): void;
    getElse(): ConditionJump | undefined;
    setElse(value?: ConditionJump): BranchAction;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BranchAction.AsObject;
    static toObject(includeInstance: boolean, msg: BranchAction): BranchAction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BranchAction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BranchAction;
    static deserializeBinaryFromReader(message: BranchAction, reader: jspb.BinaryReader): BranchAction;
}

declare namespace BranchAction {
    export type AsObject = {
        pb_if?: ConditionJump.AsObject,
        elseifsList: Array<ConditionJump.AsObject>,
        pb_else?: ConditionJump.AsObject,
    }
}

declare class TaskAction extends jspb.Message { 
    getTaskType(): TaskType$1;
    setTaskType(value: TaskType$1): TaskAction;
    getId(): string;
    setId(value: string): TaskAction;
    getName(): string;
    setName(value: string): TaskAction;
    clearNextList(): void;
    getNextList(): Array<string>;
    setNextList(value: Array<string>): TaskAction;
    addNext(value: string, index?: number): string;

    hasEthTransfer(): boolean;
    clearEthTransfer(): void;
    getEthTransfer(): ETHTransfer | undefined;
    setEthTransfer(value?: ETHTransfer): TaskAction;

    hasContractExecution(): boolean;
    clearContractExecution(): void;
    getContractExecution(): ContractExecution | undefined;
    setContractExecution(value?: ContractExecution): TaskAction;

    hasGraphqlDataQuery(): boolean;
    clearGraphqlDataQuery(): void;
    getGraphqlDataQuery(): GraphQLDataQuery | undefined;
    setGraphqlDataQuery(value?: GraphQLDataQuery): TaskAction;

    hasHttpDataQuery(): boolean;
    clearHttpDataQuery(): void;
    getHttpDataQuery(): HTTPAPICall | undefined;
    setHttpDataQuery(value?: HTTPAPICall): TaskAction;

    hasCustomCode(): boolean;
    clearCustomCode(): void;
    getCustomCode(): CustomCode | undefined;
    setCustomCode(value?: CustomCode): TaskAction;

    hasBranch(): boolean;
    clearBranch(): void;
    getBranch(): BranchAction | undefined;
    setBranch(value?: BranchAction): TaskAction;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TaskAction.AsObject;
    static toObject(includeInstance: boolean, msg: TaskAction): TaskAction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TaskAction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TaskAction;
    static deserializeBinaryFromReader(message: TaskAction, reader: jspb.BinaryReader): TaskAction;
}

declare namespace TaskAction {
    export type AsObject = {
        taskType: TaskType$1,
        id: string,
        name: string,
        nextList: Array<string>,
        ethTransfer?: ETHTransfer.AsObject,
        contractExecution?: ContractExecution.AsObject,
        graphqlDataQuery?: GraphQLDataQuery.AsObject,
        httpDataQuery?: HTTPAPICall.AsObject,
        customCode?: CustomCode.AsObject,
        branch?: BranchAction.AsObject,
    }
}

declare class Execution extends jspb.Message { 
    getEpoch(): number;
    setEpoch(value: number): Execution;
    getUserOpHash(): string;
    setUserOpHash(value: string): Execution;
    getError(): string;
    setError(value: string): Execution;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Execution.AsObject;
    static toObject(includeInstance: boolean, msg: Execution): Execution.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Execution, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Execution;
    static deserializeBinaryFromReader(message: Execution, reader: jspb.BinaryReader): Execution;
}

declare namespace Execution {
    export type AsObject = {
        epoch: number,
        userOpHash: string,
        error: string,
    }
}

declare class Task extends jspb.Message { 

    hasId(): boolean;
    clearId(): void;
    getId(): UUID | undefined;
    setId(value?: UUID): Task;
    getOwner(): string;
    setOwner(value: string): Task;
    getSmartAccountAddress(): string;
    setSmartAccountAddress(value: string): Task;

    hasTrigger(): boolean;
    clearTrigger(): void;
    getTrigger(): TaskTrigger | undefined;
    setTrigger(value?: TaskTrigger): Task;
    clearNodesList(): void;
    getNodesList(): Array<TaskAction>;
    setNodesList(value: Array<TaskAction>): Task;
    addNodes(value?: TaskAction, index?: number): TaskAction;
    getStartAt(): number;
    setStartAt(value: number): Task;
    getExpiredAt(): number;
    setExpiredAt(value: number): Task;
    getMemo(): string;
    setMemo(value: string): Task;
    getCompletedAt(): number;
    setCompletedAt(value: number): Task;
    getStatus(): TaskStatus;
    setStatus(value: TaskStatus): Task;
    getRepeatable(): boolean;
    setRepeatable(value: boolean): Task;
    clearExecutionsList(): void;
    getExecutionsList(): Array<Execution>;
    setExecutionsList(value: Array<Execution>): Task;
    addExecutions(value?: Execution, index?: number): Execution;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Task.AsObject;
    static toObject(includeInstance: boolean, msg: Task): Task.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Task, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Task;
    static deserializeBinaryFromReader(message: Task, reader: jspb.BinaryReader): Task;
}

declare namespace Task {
    export type AsObject = {
        id?: UUID.AsObject,
        owner: string,
        smartAccountAddress: string,
        trigger?: TaskTrigger.AsObject,
        nodesList: Array<TaskAction.AsObject>,
        startAt: number,
        expiredAt: number,
        memo: string,
        completedAt: number,
        status: TaskStatus,
        repeatable: boolean,
        executionsList: Array<Execution.AsObject>,
    }
}

declare class CreateTaskReq extends jspb.Message { 

    hasTrigger(): boolean;
    clearTrigger(): void;
    getTrigger(): TaskTrigger | undefined;
    setTrigger(value?: TaskTrigger): CreateTaskReq;
    clearActionsList(): void;
    getActionsList(): Array<TaskAction>;
    setActionsList(value: Array<TaskAction>): CreateTaskReq;
    addActions(value?: TaskAction, index?: number): TaskAction;
    getStartAt(): number;
    setStartAt(value: number): CreateTaskReq;
    getExpiredAt(): number;
    setExpiredAt(value: number): CreateTaskReq;
    getMemo(): string;
    setMemo(value: string): CreateTaskReq;
    getRepeatable(): boolean;
    setRepeatable(value: boolean): CreateTaskReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateTaskReq.AsObject;
    static toObject(includeInstance: boolean, msg: CreateTaskReq): CreateTaskReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateTaskReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateTaskReq;
    static deserializeBinaryFromReader(message: CreateTaskReq, reader: jspb.BinaryReader): CreateTaskReq;
}

declare namespace CreateTaskReq {
    export type AsObject = {
        trigger?: TaskTrigger.AsObject,
        actionsList: Array<TaskAction.AsObject>,
        startAt: number,
        expiredAt: number,
        memo: string,
        repeatable: boolean,
    }
}

declare class CreateTaskResp extends jspb.Message { 
    getId(): string;
    setId(value: string): CreateTaskResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateTaskResp.AsObject;
    static toObject(includeInstance: boolean, msg: CreateTaskResp): CreateTaskResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateTaskResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateTaskResp;
    static deserializeBinaryFromReader(message: CreateTaskResp, reader: jspb.BinaryReader): CreateTaskResp;
}

declare namespace CreateTaskResp {
    export type AsObject = {
        id: string,
    }
}

declare class NonceRequest extends jspb.Message { 
    getOwner(): string;
    setOwner(value: string): NonceRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NonceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: NonceRequest): NonceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NonceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NonceRequest;
    static deserializeBinaryFromReader(message: NonceRequest, reader: jspb.BinaryReader): NonceRequest;
}

declare namespace NonceRequest {
    export type AsObject = {
        owner: string,
    }
}

declare class NonceResp extends jspb.Message { 
    getNonce(): string;
    setNonce(value: string): NonceResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NonceResp.AsObject;
    static toObject(includeInstance: boolean, msg: NonceResp): NonceResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NonceResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NonceResp;
    static deserializeBinaryFromReader(message: NonceResp, reader: jspb.BinaryReader): NonceResp;
}

declare namespace NonceResp {
    export type AsObject = {
        nonce: string,
    }
}

declare class AddressRequest extends jspb.Message { 
    getOwner(): string;
    setOwner(value: string): AddressRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddressRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddressRequest): AddressRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddressRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddressRequest;
    static deserializeBinaryFromReader(message: AddressRequest, reader: jspb.BinaryReader): AddressRequest;
}

declare namespace AddressRequest {
    export type AsObject = {
        owner: string,
    }
}

declare class AddressResp extends jspb.Message { 
    getSmartAccountAddress(): string;
    setSmartAccountAddress(value: string): AddressResp;
    getNonce(): string;
    setNonce(value: string): AddressResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddressResp.AsObject;
    static toObject(includeInstance: boolean, msg: AddressResp): AddressResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddressResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddressResp;
    static deserializeBinaryFromReader(message: AddressResp, reader: jspb.BinaryReader): AddressResp;
}

declare namespace AddressResp {
    export type AsObject = {
        smartAccountAddress: string,
        nonce: string,
    }
}

declare class ListTasksReq extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListTasksReq.AsObject;
    static toObject(includeInstance: boolean, msg: ListTasksReq): ListTasksReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListTasksReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListTasksReq;
    static deserializeBinaryFromReader(message: ListTasksReq, reader: jspb.BinaryReader): ListTasksReq;
}

declare namespace ListTasksReq {
    export type AsObject = {
    }
}

declare class ListTasksResp extends jspb.Message { 
    clearTasksList(): void;
    getTasksList(): Array<ListTasksResp.TaskItemResp>;
    setTasksList(value: Array<ListTasksResp.TaskItemResp>): ListTasksResp;
    addTasks(value?: ListTasksResp.TaskItemResp, index?: number): ListTasksResp.TaskItemResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListTasksResp.AsObject;
    static toObject(includeInstance: boolean, msg: ListTasksResp): ListTasksResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListTasksResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListTasksResp;
    static deserializeBinaryFromReader(message: ListTasksResp, reader: jspb.BinaryReader): ListTasksResp;
}

declare namespace ListTasksResp {
    export type AsObject = {
        tasksList: Array<ListTasksResp.TaskItemResp.AsObject>,
    }


    export class TaskItemResp extends jspb.Message { 
        getId(): string;
        setId(value: string): TaskItemResp;
        getStatus(): TaskStatus;
        setStatus(value: TaskStatus): TaskItemResp;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): TaskItemResp.AsObject;
        static toObject(includeInstance: boolean, msg: TaskItemResp): TaskItemResp.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: TaskItemResp, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): TaskItemResp;
        static deserializeBinaryFromReader(message: TaskItemResp, reader: jspb.BinaryReader): TaskItemResp;
    }

    export namespace TaskItemResp {
        export type AsObject = {
            id: string,
            status: TaskStatus,
        }
    }

}

declare class GetKeyReq extends jspb.Message { 
    getOwner(): string;
    setOwner(value: string): GetKeyReq;
    getExpiredAt(): number;
    setExpiredAt(value: number): GetKeyReq;
    getSignature(): string;
    setSignature(value: string): GetKeyReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetKeyReq.AsObject;
    static toObject(includeInstance: boolean, msg: GetKeyReq): GetKeyReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetKeyReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetKeyReq;
    static deserializeBinaryFromReader(message: GetKeyReq, reader: jspb.BinaryReader): GetKeyReq;
}

declare namespace GetKeyReq {
    export type AsObject = {
        owner: string,
        expiredAt: number,
        signature: string,
    }
}

declare class KeyResp extends jspb.Message { 
    getKey(): string;
    setKey(value: string): KeyResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): KeyResp.AsObject;
    static toObject(includeInstance: boolean, msg: KeyResp): KeyResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: KeyResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): KeyResp;
    static deserializeBinaryFromReader(message: KeyResp, reader: jspb.BinaryReader): KeyResp;
}

declare namespace KeyResp {
    export type AsObject = {
        key: string,
    }
}

declare class UpdateChecksReq extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): UpdateChecksReq;
    getSignature(): string;
    setSignature(value: string): UpdateChecksReq;
    clearIdList(): void;
    getIdList(): Array<string>;
    setIdList(value: Array<string>): UpdateChecksReq;
    addId(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateChecksReq.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateChecksReq): UpdateChecksReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateChecksReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateChecksReq;
    static deserializeBinaryFromReader(message: UpdateChecksReq, reader: jspb.BinaryReader): UpdateChecksReq;
}

declare namespace UpdateChecksReq {
    export type AsObject = {
        address: string,
        signature: string,
        idList: Array<string>,
    }
}

declare class UpdateChecksResp extends jspb.Message { 

    hasUpdatedAt(): boolean;
    clearUpdatedAt(): void;
    getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): UpdateChecksResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateChecksResp.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateChecksResp): UpdateChecksResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateChecksResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateChecksResp;
    static deserializeBinaryFromReader(message: UpdateChecksResp, reader: jspb.BinaryReader): UpdateChecksResp;
}

declare namespace UpdateChecksResp {
    export type AsObject = {
        updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

declare enum TriggerType {
    TIMETRIGGER = 0,
    CONTRACTQUERYTRIGGER = 1,
    EXPRESSIONTRIGGER = 2,
}

declare enum TaskType$1 {
    ETHTRANSFERTASK = 0,
    CONTRACTEXECUTIONTASK = 1,
    GRAPHQLDATAQUERYTASK = 2,
    HTTPAPICALLTASK = 3,
    CUSTOMCODETASK = 4,
    BRANCHACTIONTASK = 5,
}

declare enum TaskStatus {
    ACTIVE = 0,
    COMPLETED = 1,
    FAILED = 2,
    CANCELED = 3,
    EXECUTING = 4,
}

declare enum CustomCodeType {
    JAVASCRIPT = 0,
}

// package: aggregator
// file: avs.proto



interface IAggregatorClient {
  getKey(
    request: GetKeyReq,
    callback: (
      error: grpc.ServiceError | null,
      response: KeyResp
    ) => void
  ): grpc.ClientUnaryCall;
  getKey(
    request: GetKeyReq,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: KeyResp
    ) => void
  ): grpc.ClientUnaryCall;
  getKey(
    request: GetKeyReq,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: KeyResp
    ) => void
  ): grpc.ClientUnaryCall;
  getNonce(
    request: NonceRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: NonceResp
    ) => void
  ): grpc.ClientUnaryCall;
  getNonce(
    request: NonceRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: NonceResp
    ) => void
  ): grpc.ClientUnaryCall;
  getNonce(
    request: NonceRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: NonceResp
    ) => void
  ): grpc.ClientUnaryCall;
  getSmartAccountAddress(
    request: AddressRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: AddressResp
    ) => void
  ): grpc.ClientUnaryCall;
  getSmartAccountAddress(
    request: AddressRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: AddressResp
    ) => void
  ): grpc.ClientUnaryCall;
  getSmartAccountAddress(
    request: AddressRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: AddressResp
    ) => void
  ): grpc.ClientUnaryCall;
  createTask(
    request: CreateTaskReq,
    callback: (
      error: grpc.ServiceError | null,
      response: CreateTaskResp
    ) => void
  ): grpc.ClientUnaryCall;
  createTask(
    request: CreateTaskReq,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: CreateTaskResp
    ) => void
  ): grpc.ClientUnaryCall;
  createTask(
    request: CreateTaskReq,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: CreateTaskResp
    ) => void
  ): grpc.ClientUnaryCall;
  listTasks(
    request: ListTasksReq,
    callback: (
      error: grpc.ServiceError | null,
      response: ListTasksResp
    ) => void
  ): grpc.ClientUnaryCall;
  listTasks(
    request: ListTasksReq,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: ListTasksResp
    ) => void
  ): grpc.ClientUnaryCall;
  listTasks(
    request: ListTasksReq,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: ListTasksResp
    ) => void
  ): grpc.ClientUnaryCall;
  getTask(
    request: UUID,
    callback: (error: grpc.ServiceError | null, response: Task) => void
  ): grpc.ClientUnaryCall;
  getTask(
    request: UUID,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: Task) => void
  ): grpc.ClientUnaryCall;
  getTask(
    request: UUID,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: Task) => void
  ): grpc.ClientUnaryCall;
  cancelTask(
    request: UUID,
    callback: (
      error: grpc.ServiceError | null,
      response: google_protobuf_wrappers_pb.BoolValue
    ) => void
  ): grpc.ClientUnaryCall;
  cancelTask(
    request: UUID,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: google_protobuf_wrappers_pb.BoolValue
    ) => void
  ): grpc.ClientUnaryCall;
  cancelTask(
    request: UUID,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: google_protobuf_wrappers_pb.BoolValue
    ) => void
  ): grpc.ClientUnaryCall;
  deleteTask(
    request: UUID,
    callback: (
      error: grpc.ServiceError | null,
      response: google_protobuf_wrappers_pb.BoolValue
    ) => void
  ): grpc.ClientUnaryCall;
  deleteTask(
    request: UUID,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: google_protobuf_wrappers_pb.BoolValue
    ) => void
  ): grpc.ClientUnaryCall;
  deleteTask(
    request: UUID,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: google_protobuf_wrappers_pb.BoolValue
    ) => void
  ): grpc.ClientUnaryCall;
  ping(
    request: Checkin,
    callback: (
      error: grpc.ServiceError | null,
      response: CheckinResp
    ) => void
  ): grpc.ClientUnaryCall;
  ping(
    request: Checkin,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: CheckinResp
    ) => void
  ): grpc.ClientUnaryCall;
  ping(
    request: Checkin,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: CheckinResp
    ) => void
  ): grpc.ClientUnaryCall;
  syncTasks(
    request: SyncTasksReq,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<SyncTasksResp>;
  syncTasks(
    request: SyncTasksReq,
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<SyncTasksResp>;
  updateChecks(
    request: UpdateChecksReq,
    callback: (
      error: grpc.ServiceError | null,
      response: UpdateChecksResp
    ) => void
  ): grpc.ClientUnaryCall;
  updateChecks(
    request: UpdateChecksReq,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: UpdateChecksResp
    ) => void
  ): grpc.ClientUnaryCall;
  updateChecks(
    request: UpdateChecksReq,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: UpdateChecksResp
    ) => void
  ): grpc.ClientUnaryCall;
}

declare class AggregatorClient extends grpc.Client implements IAggregatorClient {
  constructor(
    address: string,
    credentials: grpc.ChannelCredentials,
    options?: Partial<grpc.ClientOptions>
  );
  public getKey(
    request: GetKeyReq,
    callback: (
      error: grpc.ServiceError | null,
      response: KeyResp
    ) => void
  ): grpc.ClientUnaryCall;
  public getKey(
    request: GetKeyReq,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: KeyResp
    ) => void
  ): grpc.ClientUnaryCall;
  public getKey(
    request: GetKeyReq,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: KeyResp
    ) => void
  ): grpc.ClientUnaryCall;
  public getNonce(
    request: NonceRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: NonceResp
    ) => void
  ): grpc.ClientUnaryCall;
  public getNonce(
    request: NonceRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: NonceResp
    ) => void
  ): grpc.ClientUnaryCall;
  public getNonce(
    request: NonceRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: NonceResp
    ) => void
  ): grpc.ClientUnaryCall;
  public getSmartAccountAddress(
    request: AddressRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: AddressResp
    ) => void
  ): grpc.ClientUnaryCall;
  public getSmartAccountAddress(
    request: AddressRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: AddressResp
    ) => void
  ): grpc.ClientUnaryCall;
  public getSmartAccountAddress(
    request: AddressRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: AddressResp
    ) => void
  ): grpc.ClientUnaryCall;
  public createTask(
    request: CreateTaskReq,
    callback: (
      error: grpc.ServiceError | null,
      response: CreateTaskResp
    ) => void
  ): grpc.ClientUnaryCall;
  public createTask(
    request: CreateTaskReq,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: CreateTaskResp
    ) => void
  ): grpc.ClientUnaryCall;
  public createTask(
    request: CreateTaskReq,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: CreateTaskResp
    ) => void
  ): grpc.ClientUnaryCall;
  public listTasks(
    request: ListTasksReq,
    callback: (
      error: grpc.ServiceError | null,
      response: ListTasksResp
    ) => void
  ): grpc.ClientUnaryCall;
  public listTasks(
    request: ListTasksReq,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: ListTasksResp
    ) => void
  ): grpc.ClientUnaryCall;
  public listTasks(
    request: ListTasksReq,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: ListTasksResp
    ) => void
  ): grpc.ClientUnaryCall;
  public getTask(
    request: UUID,
    callback: (error: grpc.ServiceError | null, response: Task) => void
  ): grpc.ClientUnaryCall;
  public getTask(
    request: UUID,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: Task) => void
  ): grpc.ClientUnaryCall;
  public getTask(
    request: UUID,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: Task) => void
  ): grpc.ClientUnaryCall;
  public cancelTask(
    request: UUID,
    callback: (
      error: grpc.ServiceError | null,
      response: google_protobuf_wrappers_pb.BoolValue
    ) => void
  ): grpc.ClientUnaryCall;
  public cancelTask(
    request: UUID,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: google_protobuf_wrappers_pb.BoolValue
    ) => void
  ): grpc.ClientUnaryCall;
  public cancelTask(
    request: UUID,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: google_protobuf_wrappers_pb.BoolValue
    ) => void
  ): grpc.ClientUnaryCall;
  public deleteTask(
    request: UUID,
    callback: (
      error: grpc.ServiceError | null,
      response: google_protobuf_wrappers_pb.BoolValue
    ) => void
  ): grpc.ClientUnaryCall;
  public deleteTask(
    request: UUID,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: google_protobuf_wrappers_pb.BoolValue
    ) => void
  ): grpc.ClientUnaryCall;
  public deleteTask(
    request: UUID,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: google_protobuf_wrappers_pb.BoolValue
    ) => void
  ): grpc.ClientUnaryCall;
  public ping(
    request: Checkin,
    callback: (
      error: grpc.ServiceError | null,
      response: CheckinResp
    ) => void
  ): grpc.ClientUnaryCall;
  public ping(
    request: Checkin,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: CheckinResp
    ) => void
  ): grpc.ClientUnaryCall;
  public ping(
    request: Checkin,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: CheckinResp
    ) => void
  ): grpc.ClientUnaryCall;
  public syncTasks(
    request: SyncTasksReq,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<SyncTasksResp>;
  public syncTasks(
    request: SyncTasksReq,
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<SyncTasksResp>;
  public updateChecks(
    request: UpdateChecksReq,
    callback: (
      error: grpc.ServiceError | null,
      response: UpdateChecksResp
    ) => void
  ): grpc.ClientUnaryCall;
  public updateChecks(
    request: UpdateChecksReq,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: UpdateChecksResp
    ) => void
  ): grpc.ClientUnaryCall;
  public updateChecks(
    request: UpdateChecksReq,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: UpdateChecksResp
    ) => void
  ): grpc.ClientUnaryCall;
}

type Environment = "production" | "development" | "staging";
declare const AUTH_KEY_HEADER = "authKey";
interface RequestOptions {
    authKey: string;
}
interface GetKeyResponse {
    authKey: string;
}
interface ClientOption {
    endpoint: string;
}
interface TaskType {
    id: string;
    owner: string;
    smartAccountAddress: string;
    trigger: {
        triggerType: number;
        schedule?: any;
        contractQuery?: any;
        expression: {
            expression: string;
        };
    };
    nodesList: Array<{
        taskType: number;
        id: string;
        name: string;
        nextList: any[];
        ethTransfer?: any;
        contractExecution: any;
        graphqlDataQuery?: any;
        httpDataQuery?: any;
        customCode?: any;
        branch?: any;
    }>;
    startAt: number;
    expiredAt: number;
    memo: string;
    completedAt: number;
    status: number;
    repeatable: boolean;
    executionsList: any[];
}
interface CreateTaskResponse {
    id: string;
}
interface ListTasksResponse {
    tasks: {
        id: string;
        status: string;
    }[];
}
interface CancelTaskResponse {
    value: boolean;
}
interface DeleteTaskResponse {
    value: boolean;
}
interface GetAddressesResponse {
    owner: string;
    smart_account_address: string;
}

declare class BaseClient {
    readonly endpoint: string;
    readonly rpcClient: AggregatorClient;
    protected metadata: Metadata;
    constructor(opts: ClientOption);
    isAuthKeyValid(key: string): boolean;
    authWithAPIKey(apiKey: string, expiredAtEpoch: number): Promise<GetKeyResponse>;
    authWithSignature(address: string, signature: string, expiredAtEpoch: number): Promise<GetKeyResponse>;
    protected _callRPC<TResponse, TRequest>(method: string, request: TRequest | any, options?: RequestOptions): Promise<TResponse>;
}
declare class Client extends BaseClient {
    constructor(config: ClientOption);
    getAddresses(address: string, { authKey }: {
        authKey: string;
    }): Promise<GetAddressesResponse>;
    createTask({ address, oracleContract, tokenContract, }: {
        address: string;
        tokenContract: string;
        oracleContract: string;
    }, { authKey }: {
        authKey: string;
    }): Promise<CreateTaskResponse>;
    listTasks(address: string, { authKey }: {
        authKey: string;
    }): Promise<ListTasksResponse>;
    getTask(id: string, { authKey }: {
        authKey: string;
    }): Promise<TaskType>;
    cancelTask(id: string, { authKey }: {
        authKey: string;
    }): Promise<CancelTaskResponse>;
    deleteTask(id: string, { authKey }: {
        authKey: string;
    }): Promise<DeleteTaskResponse>;
}

export { AUTH_KEY_HEADER, type CancelTaskResponse, type ClientOption, type CreateTaskResponse, type DeleteTaskResponse, type Environment, type GetAddressesResponse, type GetKeyResponse, type ListTasksResponse, type RequestOptions, type TaskType, Client as default, getKeyRequestMessage };
