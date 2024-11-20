import * as grpc from '@grpc/grpc-js';
import { Metadata } from '@grpc/grpc-js';
import * as jspb from 'google-protobuf';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';
import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb';

declare const getKeyRequestMessage: (address: string, expiredAt: number) => string;

// package: aggregator
// file: avs.proto



declare class IdReq extends jspb.Message { 
    getId(): string;
    setId(value: string): IdReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IdReq.AsObject;
    static toObject(includeInstance: boolean, msg: IdReq): IdReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: IdReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IdReq;
    static deserializeBinaryFromReader(message: IdReq, reader: jspb.BinaryReader): IdReq;
}

declare namespace IdReq {
    export type AsObject = {
        id: string,
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

declare class FixedEpochCondition extends jspb.Message { 
    clearEpochsList(): void;
    getEpochsList(): Array<number>;
    setEpochsList(value: Array<number>): FixedEpochCondition;
    addEpochs(value: number, index?: number): number;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FixedEpochCondition.AsObject;
    static toObject(includeInstance: boolean, msg: FixedEpochCondition): FixedEpochCondition.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FixedEpochCondition, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FixedEpochCondition;
    static deserializeBinaryFromReader(message: FixedEpochCondition, reader: jspb.BinaryReader): FixedEpochCondition;
}

declare namespace FixedEpochCondition {
    export type AsObject = {
        epochsList: Array<number>,
    }
}

declare class CronCondition extends jspb.Message { 
    clearScheduleList(): void;
    getScheduleList(): Array<string>;
    setScheduleList(value: Array<string>): CronCondition;
    addSchedule(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CronCondition.AsObject;
    static toObject(includeInstance: boolean, msg: CronCondition): CronCondition.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CronCondition, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CronCondition;
    static deserializeBinaryFromReader(message: CronCondition, reader: jspb.BinaryReader): CronCondition;
}

declare namespace CronCondition {
    export type AsObject = {
        scheduleList: Array<string>,
    }
}

declare class BlockCondition extends jspb.Message { 
    getInterval(): number;
    setInterval(value: number): BlockCondition;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BlockCondition.AsObject;
    static toObject(includeInstance: boolean, msg: BlockCondition): BlockCondition.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BlockCondition, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BlockCondition;
    static deserializeBinaryFromReader(message: BlockCondition, reader: jspb.BinaryReader): BlockCondition;
}

declare namespace BlockCondition {
    export type AsObject = {
        interval: number,
    }
}

declare class EventCondition extends jspb.Message { 
    getExpression(): string;
    setExpression(value: string): EventCondition;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EventCondition.AsObject;
    static toObject(includeInstance: boolean, msg: EventCondition): EventCondition.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EventCondition, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EventCondition;
    static deserializeBinaryFromReader(message: EventCondition, reader: jspb.BinaryReader): EventCondition;
}

declare namespace EventCondition {
    export type AsObject = {
        expression: string,
    }
}

declare class TaskTrigger$1 extends jspb.Message { 

    hasManual(): boolean;
    clearManual(): void;
    getManual(): boolean;
    setManual(value: boolean): TaskTrigger$1;

    hasFixedTime(): boolean;
    clearFixedTime(): void;
    getFixedTime(): FixedEpochCondition | undefined;
    setFixedTime(value?: FixedEpochCondition): TaskTrigger$1;

    hasCron(): boolean;
    clearCron(): void;
    getCron(): CronCondition | undefined;
    setCron(value?: CronCondition): TaskTrigger$1;

    hasBlock(): boolean;
    clearBlock(): void;
    getBlock(): BlockCondition | undefined;
    setBlock(value?: BlockCondition): TaskTrigger$1;

    hasEvent(): boolean;
    clearEvent(): void;
    getEvent(): EventCondition | undefined;
    setEvent(value?: EventCondition): TaskTrigger$1;

    getTriggerTypeCase(): TaskTrigger$1.TriggerTypeCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TaskTrigger$1.AsObject;
    static toObject(includeInstance: boolean, msg: TaskTrigger$1): TaskTrigger$1.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TaskTrigger$1, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TaskTrigger$1;
    static deserializeBinaryFromReader(message: TaskTrigger$1, reader: jspb.BinaryReader): TaskTrigger$1;
}

declare namespace TaskTrigger$1 {
    export type AsObject = {
        manual: boolean,
        fixedTime?: FixedEpochCondition.AsObject,
        cron?: CronCondition.AsObject,
        block?: BlockCondition.AsObject,
        event?: EventCondition.AsObject,
    }

    export enum TriggerTypeCase {
        TRIGGER_TYPE_NOT_SET = 0,
        MANUAL = 1,
        FIXED_TIME = 2,
        CRON = 3,
        BLOCK = 4,
        EVENT = 5,
    }

}

declare class SyncTasksResp extends jspb.Message { 
    getId(): string;
    setId(value: string): SyncTasksResp;
    getChecktype(): string;
    setChecktype(value: string): SyncTasksResp;

    hasTrigger(): boolean;
    clearTrigger(): void;
    getTrigger(): TaskTrigger$1 | undefined;
    setTrigger(value?: TaskTrigger$1): SyncTasksResp;

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
        trigger?: TaskTrigger$1.AsObject,
    }
}

declare class ETHTransferNode extends jspb.Message { 
    getDestination(): string;
    setDestination(value: string): ETHTransferNode;
    getAmount(): string;
    setAmount(value: string): ETHTransferNode;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ETHTransferNode.AsObject;
    static toObject(includeInstance: boolean, msg: ETHTransferNode): ETHTransferNode.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ETHTransferNode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ETHTransferNode;
    static deserializeBinaryFromReader(message: ETHTransferNode, reader: jspb.BinaryReader): ETHTransferNode;
}

declare namespace ETHTransferNode {
    export type AsObject = {
        destination: string,
        amount: string,
    }
}

declare class ContractWriteNode extends jspb.Message { 
    getContractAddress(): string;
    setContractAddress(value: string): ContractWriteNode;
    getCallData(): string;
    setCallData(value: string): ContractWriteNode;
    getContractAbi(): string;
    setContractAbi(value: string): ContractWriteNode;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ContractWriteNode.AsObject;
    static toObject(includeInstance: boolean, msg: ContractWriteNode): ContractWriteNode.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ContractWriteNode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ContractWriteNode;
    static deserializeBinaryFromReader(message: ContractWriteNode, reader: jspb.BinaryReader): ContractWriteNode;
}

declare namespace ContractWriteNode {
    export type AsObject = {
        contractAddress: string,
        callData: string,
        contractAbi: string,
    }
}

declare class ContractReadNode extends jspb.Message { 
    getContractAddress(): string;
    setContractAddress(value: string): ContractReadNode;
    getCallData(): string;
    setCallData(value: string): ContractReadNode;
    getContractAbi(): string;
    setContractAbi(value: string): ContractReadNode;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ContractReadNode.AsObject;
    static toObject(includeInstance: boolean, msg: ContractReadNode): ContractReadNode.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ContractReadNode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ContractReadNode;
    static deserializeBinaryFromReader(message: ContractReadNode, reader: jspb.BinaryReader): ContractReadNode;
}

declare namespace ContractReadNode {
    export type AsObject = {
        contractAddress: string,
        callData: string,
        contractAbi: string,
    }
}

declare class GraphQLQueryNode extends jspb.Message { 
    getUrl(): string;
    setUrl(value: string): GraphQLQueryNode;
    getQuery(): string;
    setQuery(value: string): GraphQLQueryNode;

    getVariablesMap(): jspb.Map<string, string>;
    clearVariablesMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GraphQLQueryNode.AsObject;
    static toObject(includeInstance: boolean, msg: GraphQLQueryNode): GraphQLQueryNode.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GraphQLQueryNode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GraphQLQueryNode;
    static deserializeBinaryFromReader(message: GraphQLQueryNode, reader: jspb.BinaryReader): GraphQLQueryNode;
}

declare namespace GraphQLQueryNode {
    export type AsObject = {
        url: string,
        query: string,

        variablesMap: Array<[string, string]>,
    }
}

declare class RestAPINode extends jspb.Message { 
    getUrl(): string;
    setUrl(value: string): RestAPINode;

    getHeadersMap(): jspb.Map<string, string>;
    clearHeadersMap(): void;
    getBody(): string;
    setBody(value: string): RestAPINode;
    getMethod(): string;
    setMethod(value: string): RestAPINode;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RestAPINode.AsObject;
    static toObject(includeInstance: boolean, msg: RestAPINode): RestAPINode.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RestAPINode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RestAPINode;
    static deserializeBinaryFromReader(message: RestAPINode, reader: jspb.BinaryReader): RestAPINode;
}

declare namespace RestAPINode {
    export type AsObject = {
        url: string,

        headersMap: Array<[string, string]>,
        body: string,
        method: string,
    }
}

declare class CustomCodeNode extends jspb.Message { 
    getType(): CustomCodeType;
    setType(value: CustomCodeType): CustomCodeNode;
    getSource(): string;
    setSource(value: string): CustomCodeNode;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CustomCodeNode.AsObject;
    static toObject(includeInstance: boolean, msg: CustomCodeNode): CustomCodeNode.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CustomCodeNode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CustomCodeNode;
    static deserializeBinaryFromReader(message: CustomCodeNode, reader: jspb.BinaryReader): CustomCodeNode;
}

declare namespace CustomCodeNode {
    export type AsObject = {
        type: CustomCodeType,
        source: string,
    }
}

declare class Condition extends jspb.Message { 
    getId(): string;
    setId(value: string): Condition;
    getType(): string;
    setType(value: string): Condition;
    getExpression(): string;
    setExpression(value: string): Condition;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Condition.AsObject;
    static toObject(includeInstance: boolean, msg: Condition): Condition.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Condition, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Condition;
    static deserializeBinaryFromReader(message: Condition, reader: jspb.BinaryReader): Condition;
}

declare namespace Condition {
    export type AsObject = {
        id: string,
        type: string,
        expression: string,
    }
}

declare class BranchNode extends jspb.Message { 
    clearConditionsList(): void;
    getConditionsList(): Array<Condition>;
    setConditionsList(value: Array<Condition>): BranchNode;
    addConditions(value?: Condition, index?: number): Condition;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BranchNode.AsObject;
    static toObject(includeInstance: boolean, msg: BranchNode): BranchNode.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BranchNode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BranchNode;
    static deserializeBinaryFromReader(message: BranchNode, reader: jspb.BinaryReader): BranchNode;
}

declare namespace BranchNode {
    export type AsObject = {
        conditionsList: Array<Condition.AsObject>,
    }
}

declare class FilterNode extends jspb.Message { 
    getExpression(): string;
    setExpression(value: string): FilterNode;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FilterNode.AsObject;
    static toObject(includeInstance: boolean, msg: FilterNode): FilterNode.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FilterNode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FilterNode;
    static deserializeBinaryFromReader(message: FilterNode, reader: jspb.BinaryReader): FilterNode;
}

declare namespace FilterNode {
    export type AsObject = {
        expression: string,
    }
}

declare class LoopNode extends jspb.Message { 
    getIterVar(): string;
    setIterVar(value: string): LoopNode;
    getIterKey(): string;
    setIterKey(value: string): LoopNode;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoopNode.AsObject;
    static toObject(includeInstance: boolean, msg: LoopNode): LoopNode.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoopNode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoopNode;
    static deserializeBinaryFromReader(message: LoopNode, reader: jspb.BinaryReader): LoopNode;
}

declare namespace LoopNode {
    export type AsObject = {
        iterVar: string,
        iterKey: string,
    }
}

declare class TaskEdge extends jspb.Message { 
    getId(): string;
    setId(value: string): TaskEdge;
    getSource(): string;
    setSource(value: string): TaskEdge;
    getTarget(): string;
    setTarget(value: string): TaskEdge;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TaskEdge.AsObject;
    static toObject(includeInstance: boolean, msg: TaskEdge): TaskEdge.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TaskEdge, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TaskEdge;
    static deserializeBinaryFromReader(message: TaskEdge, reader: jspb.BinaryReader): TaskEdge;
}

declare namespace TaskEdge {
    export type AsObject = {
        id: string,
        source: string,
        target: string,
    }
}

declare class TaskNode extends jspb.Message { 
    getId(): string;
    setId(value: string): TaskNode;
    getName(): string;
    setName(value: string): TaskNode;

    hasEthTransfer(): boolean;
    clearEthTransfer(): void;
    getEthTransfer(): ETHTransferNode | undefined;
    setEthTransfer(value?: ETHTransferNode): TaskNode;

    hasContractWrite(): boolean;
    clearContractWrite(): void;
    getContractWrite(): ContractWriteNode | undefined;
    setContractWrite(value?: ContractWriteNode): TaskNode;

    hasContractRead(): boolean;
    clearContractRead(): void;
    getContractRead(): ContractReadNode | undefined;
    setContractRead(value?: ContractReadNode): TaskNode;

    hasGraphqlDataQuery(): boolean;
    clearGraphqlDataQuery(): void;
    getGraphqlDataQuery(): GraphQLQueryNode | undefined;
    setGraphqlDataQuery(value?: GraphQLQueryNode): TaskNode;

    hasRestApi(): boolean;
    clearRestApi(): void;
    getRestApi(): RestAPINode | undefined;
    setRestApi(value?: RestAPINode): TaskNode;

    hasBranch(): boolean;
    clearBranch(): void;
    getBranch(): BranchNode | undefined;
    setBranch(value?: BranchNode): TaskNode;

    hasFilter(): boolean;
    clearFilter(): void;
    getFilter(): FilterNode | undefined;
    setFilter(value?: FilterNode): TaskNode;

    hasLoop(): boolean;
    clearLoop(): void;
    getLoop(): LoopNode | undefined;
    setLoop(value?: LoopNode): TaskNode;

    hasCustomCode(): boolean;
    clearCustomCode(): void;
    getCustomCode(): CustomCodeNode | undefined;
    setCustomCode(value?: CustomCodeNode): TaskNode;

    getTaskTypeCase(): TaskNode.TaskTypeCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TaskNode.AsObject;
    static toObject(includeInstance: boolean, msg: TaskNode): TaskNode.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TaskNode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TaskNode;
    static deserializeBinaryFromReader(message: TaskNode, reader: jspb.BinaryReader): TaskNode;
}

declare namespace TaskNode {
    export type AsObject = {
        id: string,
        name: string,
        ethTransfer?: ETHTransferNode.AsObject,
        contractWrite?: ContractWriteNode.AsObject,
        contractRead?: ContractReadNode.AsObject,
        graphqlDataQuery?: GraphQLQueryNode.AsObject,
        restApi?: RestAPINode.AsObject,
        branch?: BranchNode.AsObject,
        filter?: FilterNode.AsObject,
        loop?: LoopNode.AsObject,
        customCode?: CustomCodeNode.AsObject,
    }

    export enum TaskTypeCase {
        TASK_TYPE_NOT_SET = 0,
        ETH_TRANSFER = 10,
        CONTRACT_WRITE = 11,
        CONTRACT_READ = 12,
        GRAPHQL_DATA_QUERY = 13,
        REST_API = 14,
        BRANCH = 15,
        FILTER = 16,
        LOOP = 17,
        CUSTOM_CODE = 18,
    }

}

declare class Execution$1 extends jspb.Message { 
    getEpoch(): number;
    setEpoch(value: number): Execution$1;
    getUserOpHash(): string;
    setUserOpHash(value: string): Execution$1;
    getError(): string;
    setError(value: string): Execution$1;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Execution$1.AsObject;
    static toObject(includeInstance: boolean, msg: Execution$1): Execution$1.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Execution$1, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Execution$1;
    static deserializeBinaryFromReader(message: Execution$1, reader: jspb.BinaryReader): Execution$1;
}

declare namespace Execution$1 {
    export type AsObject = {
        epoch: number,
        userOpHash: string,
        error: string,
    }
}

declare class Task$1 extends jspb.Message { 
    getId(): string;
    setId(value: string): Task$1;
    getOwner(): string;
    setOwner(value: string): Task$1;
    getSmartWalletAddress(): string;
    setSmartWalletAddress(value: string): Task$1;
    getStartAt(): number;
    setStartAt(value: number): Task$1;
    getExpiredAt(): number;
    setExpiredAt(value: number): Task$1;
    getMemo(): string;
    setMemo(value: string): Task$1;
    getCompletedAt(): number;
    setCompletedAt(value: number): Task$1;
    getMaxExecution(): number;
    setMaxExecution(value: number): Task$1;
    getStatus(): TaskStatus;
    setStatus(value: TaskStatus): Task$1;

    hasTrigger(): boolean;
    clearTrigger(): void;
    getTrigger(): TaskTrigger$1 | undefined;
    setTrigger(value?: TaskTrigger$1): Task$1;
    clearNodesList(): void;
    getNodesList(): Array<TaskNode>;
    setNodesList(value: Array<TaskNode>): Task$1;
    addNodes(value?: TaskNode, index?: number): TaskNode;
    clearEdgesList(): void;
    getEdgesList(): Array<TaskEdge>;
    setEdgesList(value: Array<TaskEdge>): Task$1;
    addEdges(value?: TaskEdge, index?: number): TaskEdge;
    clearExecutionsList(): void;
    getExecutionsList(): Array<Execution$1>;
    setExecutionsList(value: Array<Execution$1>): Task$1;
    addExecutions(value?: Execution$1, index?: number): Execution$1;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Task$1.AsObject;
    static toObject(includeInstance: boolean, msg: Task$1): Task$1.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Task$1, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Task$1;
    static deserializeBinaryFromReader(message: Task$1, reader: jspb.BinaryReader): Task$1;
}

declare namespace Task$1 {
    export type AsObject = {
        id: string,
        owner: string,
        smartWalletAddress: string,
        startAt: number,
        expiredAt: number,
        memo: string,
        completedAt: number,
        maxExecution: number,
        status: TaskStatus,
        trigger?: TaskTrigger$1.AsObject,
        nodesList: Array<TaskNode.AsObject>,
        edgesList: Array<TaskEdge.AsObject>,
        executionsList: Array<Execution$1.AsObject>,
    }
}

declare class CreateTaskReq extends jspb.Message { 

    hasTrigger(): boolean;
    clearTrigger(): void;
    getTrigger(): TaskTrigger$1 | undefined;
    setTrigger(value?: TaskTrigger$1): CreateTaskReq;
    getStartAt(): number;
    setStartAt(value: number): CreateTaskReq;
    getExpiredAt(): number;
    setExpiredAt(value: number): CreateTaskReq;
    getMaxExecution(): number;
    setMaxExecution(value: number): CreateTaskReq;
    getSmartWalletAddress(): string;
    setSmartWalletAddress(value: string): CreateTaskReq;
    getMemo(): string;
    setMemo(value: string): CreateTaskReq;
    clearNodesList(): void;
    getNodesList(): Array<TaskNode>;
    setNodesList(value: Array<TaskNode>): CreateTaskReq;
    addNodes(value?: TaskNode, index?: number): TaskNode;
    clearEdgesList(): void;
    getEdgesList(): Array<TaskEdge>;
    setEdgesList(value: Array<TaskEdge>): CreateTaskReq;
    addEdges(value?: TaskEdge, index?: number): TaskEdge;

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
        trigger?: TaskTrigger$1.AsObject,
        startAt: number,
        expiredAt: number,
        maxExecution: number,
        smartWalletAddress: string,
        memo: string,
        nodesList: Array<TaskNode.AsObject>,
        edgesList: Array<TaskEdge.AsObject>,
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

declare class ListWalletReq extends jspb.Message { 
    getFactory(): string;
    setFactory(value: string): ListWalletReq;
    getSalt(): string;
    setSalt(value: string): ListWalletReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListWalletReq.AsObject;
    static toObject(includeInstance: boolean, msg: ListWalletReq): ListWalletReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListWalletReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListWalletReq;
    static deserializeBinaryFromReader(message: ListWalletReq, reader: jspb.BinaryReader): ListWalletReq;
}

declare namespace ListWalletReq {
    export type AsObject = {
        factory: string,
        salt: string,
    }
}

declare class SmartWallet$1 extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): SmartWallet$1;
    getSalt(): string;
    setSalt(value: string): SmartWallet$1;
    getFactory(): string;
    setFactory(value: string): SmartWallet$1;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SmartWallet$1.AsObject;
    static toObject(includeInstance: boolean, msg: SmartWallet$1): SmartWallet$1.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SmartWallet$1, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SmartWallet$1;
    static deserializeBinaryFromReader(message: SmartWallet$1, reader: jspb.BinaryReader): SmartWallet$1;
}

declare namespace SmartWallet$1 {
    export type AsObject = {
        address: string,
        salt: string,
        factory: string,
    }
}

declare class ListWalletResp extends jspb.Message { 
    clearWalletsList(): void;
    getWalletsList(): Array<SmartWallet$1>;
    setWalletsList(value: Array<SmartWallet$1>): ListWalletResp;
    addWallets(value?: SmartWallet$1, index?: number): SmartWallet$1;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListWalletResp.AsObject;
    static toObject(includeInstance: boolean, msg: ListWalletResp): ListWalletResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListWalletResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListWalletResp;
    static deserializeBinaryFromReader(message: ListWalletResp, reader: jspb.BinaryReader): ListWalletResp;
}

declare namespace ListWalletResp {
    export type AsObject = {
        walletsList: Array<SmartWallet$1.AsObject>,
    }
}

declare class ListTasksReq extends jspb.Message { 
    getSmartWalletAddress(): string;
    setSmartWalletAddress(value: string): ListTasksReq;

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
        smartWalletAddress: string,
    }
}

declare class ListTasksResp extends jspb.Message { 
    clearTasksList(): void;
    getTasksList(): Array<Task$1>;
    setTasksList(value: Array<Task$1>): ListTasksResp;
    addTasks(value?: Task$1, index?: number): Task$1;

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
        tasksList: Array<Task$1.AsObject>,
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

declare class CreateWalletReq$1 extends jspb.Message { 
    getSalt(): string;
    setSalt(value: string): CreateWalletReq$1;
    getFactoryAddress(): string;
    setFactoryAddress(value: string): CreateWalletReq$1;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateWalletReq$1.AsObject;
    static toObject(includeInstance: boolean, msg: CreateWalletReq$1): CreateWalletReq$1.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateWalletReq$1, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateWalletReq$1;
    static deserializeBinaryFromReader(message: CreateWalletReq$1, reader: jspb.BinaryReader): CreateWalletReq$1;
}

declare namespace CreateWalletReq$1 {
    export type AsObject = {
        salt: string,
        factoryAddress: string,
    }
}

declare class CreateWalletResp extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): CreateWalletResp;
    getSalt(): string;
    setSalt(value: string): CreateWalletResp;
    getFactoryAddress(): string;
    setFactoryAddress(value: string): CreateWalletResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateWalletResp.AsObject;
    static toObject(includeInstance: boolean, msg: CreateWalletResp): CreateWalletResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateWalletResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateWalletResp;
    static deserializeBinaryFromReader(message: CreateWalletResp, reader: jspb.BinaryReader): CreateWalletResp;
}

declare namespace CreateWalletResp {
    export type AsObject = {
        address: string,
        salt: string,
        factoryAddress: string,
    }
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
    getKey(request: GetKeyReq, callback: (error: grpc.ServiceError | null, response: KeyResp) => void): grpc.ClientUnaryCall;
    getKey(request: GetKeyReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: KeyResp) => void): grpc.ClientUnaryCall;
    getKey(request: GetKeyReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: KeyResp) => void): grpc.ClientUnaryCall;
    getNonce(request: NonceRequest, callback: (error: grpc.ServiceError | null, response: NonceResp) => void): grpc.ClientUnaryCall;
    getNonce(request: NonceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: NonceResp) => void): grpc.ClientUnaryCall;
    getNonce(request: NonceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: NonceResp) => void): grpc.ClientUnaryCall;
    createWallet(request: CreateWalletReq$1, callback: (error: grpc.ServiceError | null, response: CreateWalletResp) => void): grpc.ClientUnaryCall;
    createWallet(request: CreateWalletReq$1, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: CreateWalletResp) => void): grpc.ClientUnaryCall;
    createWallet(request: CreateWalletReq$1, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: CreateWalletResp) => void): grpc.ClientUnaryCall;
    listWallets(request: ListWalletReq, callback: (error: grpc.ServiceError | null, response: ListWalletResp) => void): grpc.ClientUnaryCall;
    listWallets(request: ListWalletReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: ListWalletResp) => void): grpc.ClientUnaryCall;
    listWallets(request: ListWalletReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: ListWalletResp) => void): grpc.ClientUnaryCall;
    createTask(request: CreateTaskReq, callback: (error: grpc.ServiceError | null, response: CreateTaskResp) => void): grpc.ClientUnaryCall;
    createTask(request: CreateTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: CreateTaskResp) => void): grpc.ClientUnaryCall;
    createTask(request: CreateTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: CreateTaskResp) => void): grpc.ClientUnaryCall;
    listTasks(request: ListTasksReq, callback: (error: grpc.ServiceError | null, response: ListTasksResp) => void): grpc.ClientUnaryCall;
    listTasks(request: ListTasksReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: ListTasksResp) => void): grpc.ClientUnaryCall;
    listTasks(request: ListTasksReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: ListTasksResp) => void): grpc.ClientUnaryCall;
    getTask(request: IdReq, callback: (error: grpc.ServiceError | null, response: Task$1) => void): grpc.ClientUnaryCall;
    getTask(request: IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Task$1) => void): grpc.ClientUnaryCall;
    getTask(request: IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Task$1) => void): grpc.ClientUnaryCall;
    cancelTask(request: IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    cancelTask(request: IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    cancelTask(request: IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    ping(request: Checkin, callback: (error: grpc.ServiceError | null, response: CheckinResp) => void): grpc.ClientUnaryCall;
    ping(request: Checkin, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: CheckinResp) => void): grpc.ClientUnaryCall;
    ping(request: Checkin, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: CheckinResp) => void): grpc.ClientUnaryCall;
    syncTasks(request: SyncTasksReq, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<SyncTasksResp>;
    syncTasks(request: SyncTasksReq, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<SyncTasksResp>;
    updateChecks(request: UpdateChecksReq, callback: (error: grpc.ServiceError | null, response: UpdateChecksResp) => void): grpc.ClientUnaryCall;
    updateChecks(request: UpdateChecksReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: UpdateChecksResp) => void): grpc.ClientUnaryCall;
    updateChecks(request: UpdateChecksReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: UpdateChecksResp) => void): grpc.ClientUnaryCall;
}

declare class AggregatorClient extends grpc.Client implements IAggregatorClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getKey(request: GetKeyReq, callback: (error: grpc.ServiceError | null, response: KeyResp) => void): grpc.ClientUnaryCall;
    public getKey(request: GetKeyReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: KeyResp) => void): grpc.ClientUnaryCall;
    public getKey(request: GetKeyReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: KeyResp) => void): grpc.ClientUnaryCall;
    public getNonce(request: NonceRequest, callback: (error: grpc.ServiceError | null, response: NonceResp) => void): grpc.ClientUnaryCall;
    public getNonce(request: NonceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: NonceResp) => void): grpc.ClientUnaryCall;
    public getNonce(request: NonceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: NonceResp) => void): grpc.ClientUnaryCall;
    public createWallet(request: CreateWalletReq$1, callback: (error: grpc.ServiceError | null, response: CreateWalletResp) => void): grpc.ClientUnaryCall;
    public createWallet(request: CreateWalletReq$1, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: CreateWalletResp) => void): grpc.ClientUnaryCall;
    public createWallet(request: CreateWalletReq$1, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: CreateWalletResp) => void): grpc.ClientUnaryCall;
    public listWallets(request: ListWalletReq, callback: (error: grpc.ServiceError | null, response: ListWalletResp) => void): grpc.ClientUnaryCall;
    public listWallets(request: ListWalletReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: ListWalletResp) => void): grpc.ClientUnaryCall;
    public listWallets(request: ListWalletReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: ListWalletResp) => void): grpc.ClientUnaryCall;
    public createTask(request: CreateTaskReq, callback: (error: grpc.ServiceError | null, response: CreateTaskResp) => void): grpc.ClientUnaryCall;
    public createTask(request: CreateTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: CreateTaskResp) => void): grpc.ClientUnaryCall;
    public createTask(request: CreateTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: CreateTaskResp) => void): grpc.ClientUnaryCall;
    public listTasks(request: ListTasksReq, callback: (error: grpc.ServiceError | null, response: ListTasksResp) => void): grpc.ClientUnaryCall;
    public listTasks(request: ListTasksReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: ListTasksResp) => void): grpc.ClientUnaryCall;
    public listTasks(request: ListTasksReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: ListTasksResp) => void): grpc.ClientUnaryCall;
    public getTask(request: IdReq, callback: (error: grpc.ServiceError | null, response: Task$1) => void): grpc.ClientUnaryCall;
    public getTask(request: IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Task$1) => void): grpc.ClientUnaryCall;
    public getTask(request: IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Task$1) => void): grpc.ClientUnaryCall;
    public cancelTask(request: IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public cancelTask(request: IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public cancelTask(request: IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public ping(request: Checkin, callback: (error: grpc.ServiceError | null, response: CheckinResp) => void): grpc.ClientUnaryCall;
    public ping(request: Checkin, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: CheckinResp) => void): grpc.ClientUnaryCall;
    public ping(request: Checkin, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: CheckinResp) => void): grpc.ClientUnaryCall;
    public syncTasks(request: SyncTasksReq, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<SyncTasksResp>;
    public syncTasks(request: SyncTasksReq, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<SyncTasksResp>;
    public updateChecks(request: UpdateChecksReq, callback: (error: grpc.ServiceError | null, response: UpdateChecksResp) => void): grpc.ClientUnaryCall;
    public updateChecks(request: UpdateChecksReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: UpdateChecksResp) => void): grpc.ClientUnaryCall;
    public updateChecks(request: UpdateChecksReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: UpdateChecksResp) => void): grpc.ClientUnaryCall;
}

type Environment = "production" | "development" | "staging";
declare const AUTH_KEY_HEADER = "authkey";
interface RequestOptions {
    authKey: string;
}
interface GetKeyResponse {
    authKey: string;
}
interface ClientOption {
    endpoint: string;
}
interface TaskTrigger {
    triggerType: number;
    manual?: boolean;
    cron?: {
        schedule: string[];
    };
    event?: {
        expression: string;
    };
    fixedTime?: {
        epochs: number[];
    };
    block?: {
        interval: number;
    };
}
interface TaskType {
    id: string;
    owner: string;
    smartWalletAddress: string;
    trigger: TaskTrigger;
    nodes: Array<{
        taskType: number;
        id: string;
        name: string;
        ethTransfer?: any;
        contractWrite?: any;
        contractRead?: any;
        restApi?: any;
        customCode?: any;
        branch?: any;
        filter?: any;
    }>;
    edges: any[];
    startAt: number;
    expiredAt: number;
    memo: string;
    completedAt: number;
    status: number;
    maxExecution: number;
    executions: Execution[];
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
interface SmartWallet {
    address: string;
    salt: string;
    factory: string;
}
interface CreateWalletReq {
    salt: string;
    factoryAddress?: string;
}
interface Execution {
    epoch: number;
    userOpHash: string;
    error: string;
}

declare class Task implements TaskType {
    id: string;
    status: number;
    owner: string;
    smartWalletAddress: string;
    trigger: TaskTrigger;
    nodes: any[];
    edges: any[];
    startAt: number;
    expiredAt: number;
    memo: string;
    completedAt: number;
    maxExecution: number;
    executions: Execution[];
    constructor(task: Task$1);
}

declare class BaseClient {
    readonly endpoint: string;
    readonly rpcClient: AggregatorClient;
    protected metadata: Metadata;
    constructor(opts: ClientOption);
    isAuthKeyValid(key: string): boolean;
    authWithAPIKey(address: string, apiKey: string, expiredAtEpoch: number): Promise<GetKeyResponse>;
    authWithSignature(address: string, signature: string, expiredAtEpoch: number): Promise<GetKeyResponse>;
    protected _callRPC<TResponse, TRequest>(method: string, request: TRequest | any, options?: RequestOptions): Promise<TResponse>;
    protected _callAnonRPC<TResponse, TRequest>(method: string, request: TRequest | any, options?: RequestOptions): Promise<TResponse>;
}
declare class Client extends BaseClient {
    constructor(config: ClientOption);
    listSmartWallets(options: RequestOptions): Promise<SmartWallet[]>;
    createWallet({ salt, factoryAddress }: CreateWalletReq, options: RequestOptions): Promise<SmartWallet>;
    createTask(payload: any, options: RequestOptions): Promise<string>;
    listTasks(address: string, options: RequestOptions): Promise<Task[]>;
    getTask(id: string, options: RequestOptions): Promise<TaskType>;
    cancelTask(id: string, options: RequestOptions): Promise<boolean>;
    deleteTask(id: string, options: RequestOptions): Promise<boolean>;
}

export { AUTH_KEY_HEADER, type CancelTaskResponse, type ClientOption, type CreateTaskResponse, type CreateWalletReq, type DeleteTaskResponse, type Environment, type Execution, type GetKeyResponse, type ListTasksResponse, type RequestOptions, type SmartWallet, type TaskTrigger, type TaskType, Client as default, getKeyRequestMessage };
