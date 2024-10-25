// package: aggregator
// file: avs.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

export class UUID extends jspb.Message { 
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

export namespace UUID {
    export type AsObject = {
        bytes: string,
    }
}

export class Checkin extends jspb.Message { 
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

export namespace Checkin {
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

export class CheckinResp extends jspb.Message { 

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

export namespace CheckinResp {
    export type AsObject = {
        updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class SyncTasksReq extends jspb.Message { 
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

export namespace SyncTasksReq {
    export type AsObject = {
        id: string,
        address: string,
        signature: string,
        monotonicClock: number,
    }
}

export class TaskTrigger extends jspb.Message { 
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

export namespace TaskTrigger {
    export type AsObject = {
        triggerType: TriggerType,
        schedule?: TimeCondition.AsObject,
        contractQuery?: ContractQueryCondition.AsObject,
        expression?: ExpressionCondition.AsObject,
    }
}

export class TimeCondition extends jspb.Message { 
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

export namespace TimeCondition {
    export type AsObject = {
        fixedList: Array<number>,
        cron: string,
    }
}

export class ContractQueryCondition extends jspb.Message { 
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

export namespace ContractQueryCondition {
    export type AsObject = {
        contractAddress: string,
        callmsg: string,
    }
}

export class ExpressionCondition extends jspb.Message { 
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

export namespace ExpressionCondition {
    export type AsObject = {
        expression: string,
    }
}

export class SyncTasksResp extends jspb.Message { 
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

export namespace SyncTasksResp {
    export type AsObject = {
        id: string,
        checktype: string,
        trigger?: TaskTrigger.AsObject,
    }
}

export class ETHTransfer extends jspb.Message { 
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

export namespace ETHTransfer {
    export type AsObject = {
        destination: string,
        amount: string,
    }
}

export class ContractExecution extends jspb.Message { 
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

export namespace ContractExecution {
    export type AsObject = {
        contractAddress: string,
        callData: string,
        method: string,
        encodedParams: string,
    }
}

export class GraphQLDataQuery extends jspb.Message { 
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

export namespace GraphQLDataQuery {
    export type AsObject = {
        url: string,
        query: string,
    }
}

export class HTTPAPICall extends jspb.Message { 
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

export namespace HTTPAPICall {
    export type AsObject = {
        url: string,

        headersMap: Array<[string, string]>,
        body: string,
    }
}

export class CustomCode extends jspb.Message { 
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

export namespace CustomCode {
    export type AsObject = {
        type: CustomCodeType,
        body: string,
    }
}

export class ConditionJump extends jspb.Message { 
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

export namespace ConditionJump {
    export type AsObject = {
        expression: string,
        next: string,
    }
}

export class BranchAction extends jspb.Message { 

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

export namespace BranchAction {
    export type AsObject = {
        pb_if?: ConditionJump.AsObject,
        elseifsList: Array<ConditionJump.AsObject>,
        pb_else?: ConditionJump.AsObject,
    }
}

export class TaskAction extends jspb.Message { 
    getTaskType(): TaskType;
    setTaskType(value: TaskType): TaskAction;
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

export namespace TaskAction {
    export type AsObject = {
        taskType: TaskType,
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

export class Execution extends jspb.Message { 
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

export namespace Execution {
    export type AsObject = {
        epoch: number,
        userOpHash: string,
        error: string,
    }
}

export class Task extends jspb.Message { 

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

export namespace Task {
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

export class CreateTaskReq extends jspb.Message { 

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

export namespace CreateTaskReq {
    export type AsObject = {
        trigger?: TaskTrigger.AsObject,
        actionsList: Array<TaskAction.AsObject>,
        startAt: number,
        expiredAt: number,
        memo: string,
        repeatable: boolean,
    }
}

export class CreateTaskResp extends jspb.Message { 
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

export namespace CreateTaskResp {
    export type AsObject = {
        id: string,
    }
}

export class NonceRequest extends jspb.Message { 
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

export namespace NonceRequest {
    export type AsObject = {
        owner: string,
    }
}

export class NonceResp extends jspb.Message { 
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

export namespace NonceResp {
    export type AsObject = {
        nonce: string,
    }
}

export class AddressRequest extends jspb.Message { 
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

export namespace AddressRequest {
    export type AsObject = {
        owner: string,
    }
}

export class AddressResp extends jspb.Message { 
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

export namespace AddressResp {
    export type AsObject = {
        smartAccountAddress: string,
        nonce: string,
    }
}

export class ListTasksReq extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListTasksReq.AsObject;
    static toObject(includeInstance: boolean, msg: ListTasksReq): ListTasksReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListTasksReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListTasksReq;
    static deserializeBinaryFromReader(message: ListTasksReq, reader: jspb.BinaryReader): ListTasksReq;
}

export namespace ListTasksReq {
    export type AsObject = {
    }
}

export class ListTasksResp extends jspb.Message { 
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

export namespace ListTasksResp {
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

export class GetKeyReq extends jspb.Message { 
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

export namespace GetKeyReq {
    export type AsObject = {
        owner: string,
        expiredAt: number,
        signature: string,
    }
}

export class KeyResp extends jspb.Message { 
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

export namespace KeyResp {
    export type AsObject = {
        key: string,
    }
}

export class UpdateChecksReq extends jspb.Message { 
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

export namespace UpdateChecksReq {
    export type AsObject = {
        address: string,
        signature: string,
        idList: Array<string>,
    }
}

export class UpdateChecksResp extends jspb.Message { 

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

export namespace UpdateChecksResp {
    export type AsObject = {
        updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export enum TriggerType {
    TIMETRIGGER = 0,
    CONTRACTQUERYTRIGGER = 1,
    EXPRESSIONTRIGGER = 2,
}

export enum TaskType {
    ETHTRANSFERTASK = 0,
    CONTRACTEXECUTIONTASK = 1,
    GRAPHQLDATAQUERYTASK = 2,
    HTTPAPICALLTASK = 3,
    CUSTOMCODETASK = 4,
    BRANCHACTIONTASK = 5,
}

export enum TaskStatus {
    ACTIVE = 0,
    COMPLETED = 1,
    FAILED = 2,
    CANCELED = 3,
    EXECUTING = 4,
}

export enum CustomCodeType {
    JAVASCRIPT = 0,
}
