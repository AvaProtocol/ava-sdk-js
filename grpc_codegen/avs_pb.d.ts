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

export class FixedEpochCondition extends jspb.Message { 
    clearEpochesList(): void;
    getEpochesList(): Array<number>;
    setEpochesList(value: Array<number>): FixedEpochCondition;
    addEpoches(value: number, index?: number): number;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FixedEpochCondition.AsObject;
    static toObject(includeInstance: boolean, msg: FixedEpochCondition): FixedEpochCondition.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FixedEpochCondition, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FixedEpochCondition;
    static deserializeBinaryFromReader(message: FixedEpochCondition, reader: jspb.BinaryReader): FixedEpochCondition;
}

export namespace FixedEpochCondition {
    export type AsObject = {
        epochesList: Array<number>,
    }
}

export class CronCondition extends jspb.Message { 
    clearCronTableList(): void;
    getCronTableList(): Array<string>;
    setCronTableList(value: Array<string>): CronCondition;
    addCronTable(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CronCondition.AsObject;
    static toObject(includeInstance: boolean, msg: CronCondition): CronCondition.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CronCondition, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CronCondition;
    static deserializeBinaryFromReader(message: CronCondition, reader: jspb.BinaryReader): CronCondition;
}

export namespace CronCondition {
    export type AsObject = {
        cronTableList: Array<string>,
    }
}

export class BlockCondition extends jspb.Message { 
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

export namespace BlockCondition {
    export type AsObject = {
        interval: number,
    }
}

export class EventCondition extends jspb.Message { 
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

export namespace EventCondition {
    export type AsObject = {
        expression: string,
    }
}

export class TaskTrigger extends jspb.Message { 
    getTriggerType(): TriggerType;
    setTriggerType(value: TriggerType): TaskTrigger;

    hasManual(): boolean;
    clearManual(): void;
    getManual(): boolean;
    setManual(value: boolean): TaskTrigger;

    hasAt(): boolean;
    clearAt(): void;
    getAt(): FixedEpochCondition | undefined;
    setAt(value?: FixedEpochCondition): TaskTrigger;

    hasCron(): boolean;
    clearCron(): void;
    getCron(): CronCondition | undefined;
    setCron(value?: CronCondition): TaskTrigger;

    hasBlock(): boolean;
    clearBlock(): void;
    getBlock(): BlockCondition | undefined;
    setBlock(value?: BlockCondition): TaskTrigger;

    hasEvent(): boolean;
    clearEvent(): void;
    getEvent(): EventCondition | undefined;
    setEvent(value?: EventCondition): TaskTrigger;

    getTriggerConditionCase(): TaskTrigger.TriggerConditionCase;

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
        manual: boolean,
        at?: FixedEpochCondition.AsObject,
        cron?: CronCondition.AsObject,
        block?: BlockCondition.AsObject,
        event?: EventCondition.AsObject,
    }

    export enum TriggerConditionCase {
        TRIGGER_CONDITION_NOT_SET = 0,
        MANUAL = 2,
        AT = 3,
        CRON = 4,
        BLOCK = 5,
        EVENT = 6,
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

export class ETHTransferNode extends jspb.Message { 
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

export namespace ETHTransferNode {
    export type AsObject = {
        destination: string,
        amount: string,
    }
}

export class ContractWriteNode extends jspb.Message { 
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

export namespace ContractWriteNode {
    export type AsObject = {
        contractAddress: string,
        callData: string,
        contractAbi: string,
    }
}

export class ContractQueryNode extends jspb.Message { 
    getContractAddress(): string;
    setContractAddress(value: string): ContractQueryNode;
    getCallData(): string;
    setCallData(value: string): ContractQueryNode;
    getContractAbi(): string;
    setContractAbi(value: string): ContractQueryNode;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ContractQueryNode.AsObject;
    static toObject(includeInstance: boolean, msg: ContractQueryNode): ContractQueryNode.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ContractQueryNode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ContractQueryNode;
    static deserializeBinaryFromReader(message: ContractQueryNode, reader: jspb.BinaryReader): ContractQueryNode;
}

export namespace ContractQueryNode {
    export type AsObject = {
        contractAddress: string,
        callData: string,
        contractAbi: string,
    }
}

export class GraphQLQueryNode extends jspb.Message { 
    getUrl(): string;
    setUrl(value: string): GraphQLQueryNode;
    getQuery(): string;
    setQuery(value: string): GraphQLQueryNode;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GraphQLQueryNode.AsObject;
    static toObject(includeInstance: boolean, msg: GraphQLQueryNode): GraphQLQueryNode.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GraphQLQueryNode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GraphQLQueryNode;
    static deserializeBinaryFromReader(message: GraphQLQueryNode, reader: jspb.BinaryReader): GraphQLQueryNode;
}

export namespace GraphQLQueryNode {
    export type AsObject = {
        url: string,
        query: string,
    }
}

export class RestAPINode extends jspb.Message { 
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

export namespace RestAPINode {
    export type AsObject = {
        url: string,

        headersMap: Array<[string, string]>,
        body: string,
        method: string,
    }
}

export class CustomCodeNode extends jspb.Message { 
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

export namespace CustomCodeNode {
    export type AsObject = {
        type: CustomCodeType,
        source: string,
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

export class BranchNode extends jspb.Message { 

    hasIf(): boolean;
    clearIf(): void;
    getIf(): ConditionJump | undefined;
    setIf(value?: ConditionJump): BranchNode;
    clearElseifsList(): void;
    getElseifsList(): Array<ConditionJump>;
    setElseifsList(value: Array<ConditionJump>): BranchNode;
    addElseifs(value?: ConditionJump, index?: number): ConditionJump;

    hasElse(): boolean;
    clearElse(): void;
    getElse(): ConditionJump | undefined;
    setElse(value?: ConditionJump): BranchNode;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BranchNode.AsObject;
    static toObject(includeInstance: boolean, msg: BranchNode): BranchNode.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BranchNode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BranchNode;
    static deserializeBinaryFromReader(message: BranchNode, reader: jspb.BinaryReader): BranchNode;
}

export namespace BranchNode {
    export type AsObject = {
        pb_if?: ConditionJump.AsObject,
        elseifsList: Array<ConditionJump.AsObject>,
        pb_else?: ConditionJump.AsObject,
    }
}

export class FilterNode extends jspb.Message { 
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

export namespace FilterNode {
    export type AsObject = {
        expression: string,
    }
}

export class TaskEdge extends jspb.Message { 
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

export namespace TaskEdge {
    export type AsObject = {
        id: string,
        source: string,
        target: string,
    }
}

export class TaskNode extends jspb.Message { 
    getNodeType(): TaskType;
    setNodeType(value: TaskType): TaskNode;
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
    getContractRead(): ContractQueryNode | undefined;
    setContractRead(value?: ContractQueryNode): TaskNode;

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

    hasCustomCode(): boolean;
    clearCustomCode(): void;
    getCustomCode(): CustomCodeNode | undefined;
    setCustomCode(value?: CustomCodeNode): TaskNode;

    getTaskBodyCase(): TaskNode.TaskBodyCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TaskNode.AsObject;
    static toObject(includeInstance: boolean, msg: TaskNode): TaskNode.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TaskNode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TaskNode;
    static deserializeBinaryFromReader(message: TaskNode, reader: jspb.BinaryReader): TaskNode;
}

export namespace TaskNode {
    export type AsObject = {
        nodeType: TaskType,
        id: string,
        name: string,
        ethTransfer?: ETHTransferNode.AsObject,
        contractWrite?: ContractWriteNode.AsObject,
        contractRead?: ContractQueryNode.AsObject,
        graphqlDataQuery?: GraphQLQueryNode.AsObject,
        restApi?: RestAPINode.AsObject,
        branch?: BranchNode.AsObject,
        filter?: FilterNode.AsObject,
        customCode?: CustomCodeNode.AsObject,
    }

    export enum TaskBodyCase {
        TASK_BODY_NOT_SET = 0,
        ETH_TRANSFER = 10,
        CONTRACT_WRITE = 11,
        CONTRACT_READ = 12,
        GRAPHQL_DATA_QUERY = 13,
        REST_API = 14,
        BRANCH = 15,
        FILTER = 16,
        CUSTOM_CODE = 17,
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
    getSmartWalletAddress(): string;
    setSmartWalletAddress(value: string): Task;
    getStartAt(): number;
    setStartAt(value: number): Task;
    getExpiredAt(): number;
    setExpiredAt(value: number): Task;
    getMemo(): string;
    setMemo(value: string): Task;
    getCompletedAt(): number;
    setCompletedAt(value: number): Task;
    getRecurring(): boolean;
    setRecurring(value: boolean): Task;
    getStatus(): TaskStatus;
    setStatus(value: TaskStatus): Task;

    hasTrigger(): boolean;
    clearTrigger(): void;
    getTrigger(): TaskTrigger | undefined;
    setTrigger(value?: TaskTrigger): Task;
    clearNodesList(): void;
    getNodesList(): Array<TaskNode>;
    setNodesList(value: Array<TaskNode>): Task;
    addNodes(value?: TaskNode, index?: number): TaskNode;
    clearEdgesList(): void;
    getEdgesList(): Array<TaskEdge>;
    setEdgesList(value: Array<TaskEdge>): Task;
    addEdges(value?: TaskEdge, index?: number): TaskEdge;
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
        smartWalletAddress: string,
        startAt: number,
        expiredAt: number,
        memo: string,
        completedAt: number,
        recurring: boolean,
        status: TaskStatus,
        trigger?: TaskTrigger.AsObject,
        nodesList: Array<TaskNode.AsObject>,
        edgesList: Array<TaskEdge.AsObject>,
        executionsList: Array<Execution.AsObject>,
    }
}

export class CreateTaskReq extends jspb.Message { 

    hasTrigger(): boolean;
    clearTrigger(): void;
    getTrigger(): TaskTrigger | undefined;
    setTrigger(value?: TaskTrigger): CreateTaskReq;
    getStartAt(): number;
    setStartAt(value: number): CreateTaskReq;
    getExpiredAt(): number;
    setExpiredAt(value: number): CreateTaskReq;
    getRepeatable(): boolean;
    setRepeatable(value: boolean): CreateTaskReq;
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

export namespace CreateTaskReq {
    export type AsObject = {
        trigger?: TaskTrigger.AsObject,
        startAt: number,
        expiredAt: number,
        repeatable: boolean,
        smartWalletAddress: string,
        memo: string,
        nodesList: Array<TaskNode.AsObject>,
        edgesList: Array<TaskEdge.AsObject>,
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
    getFactory(): string;
    setFactory(value: string): AddressRequest;
    getSalt(): string;
    setSalt(value: string): AddressRequest;

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
        factory: string,
        salt: string,
    }
}

export class SmartWallet extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): SmartWallet;
    getSalt(): string;
    setSalt(value: string): SmartWallet;
    getFactory(): string;
    setFactory(value: string): SmartWallet;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SmartWallet.AsObject;
    static toObject(includeInstance: boolean, msg: SmartWallet): SmartWallet.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SmartWallet, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SmartWallet;
    static deserializeBinaryFromReader(message: SmartWallet, reader: jspb.BinaryReader): SmartWallet;
}

export namespace SmartWallet {
    export type AsObject = {
        address: string,
        salt: string,
        factory: string,
    }
}

export class AddressResp extends jspb.Message { 
    clearWalletsList(): void;
    getWalletsList(): Array<SmartWallet>;
    setWalletsList(value: Array<SmartWallet>): AddressResp;
    addWallets(value?: SmartWallet, index?: number): SmartWallet;

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
        walletsList: Array<SmartWallet.AsObject>,
    }
}

export class ListTasksReq extends jspb.Message { 
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

export namespace ListTasksReq {
    export type AsObject = {
        smartWalletAddress: string,
    }
}

export class ListTasksResp extends jspb.Message { 
    clearTasksList(): void;
    getTasksList(): Array<Task>;
    setTasksList(value: Array<Task>): ListTasksResp;
    addTasks(value?: Task, index?: number): Task;

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
        tasksList: Array<Task.AsObject>,
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

export class CreateWalletReq extends jspb.Message { 
    getSalt(): string;
    setSalt(value: string): CreateWalletReq;
    getFactoryAddress(): string;
    setFactoryAddress(value: string): CreateWalletReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateWalletReq.AsObject;
    static toObject(includeInstance: boolean, msg: CreateWalletReq): CreateWalletReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateWalletReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateWalletReq;
    static deserializeBinaryFromReader(message: CreateWalletReq, reader: jspb.BinaryReader): CreateWalletReq;
}

export namespace CreateWalletReq {
    export type AsObject = {
        salt: string,
        factoryAddress: string,
    }
}

export class CreateWalletResp extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): CreateWalletResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateWalletResp.AsObject;
    static toObject(includeInstance: boolean, msg: CreateWalletResp): CreateWalletResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateWalletResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateWalletResp;
    static deserializeBinaryFromReader(message: CreateWalletResp, reader: jspb.BinaryReader): CreateWalletResp;
}

export namespace CreateWalletResp {
    export type AsObject = {
        address: string,
    }
}

export enum TriggerType {
    MANUALTRIGGER = 0,
    FIXEDEPOCHTRIGGER = 1,
    CRONTRIGGER = 2,
    BLOCKTRIGGER = 3,
    EVENTTRIGGER = 4,
}

export enum Error {
    UNKNOWERROR = 0,
    RPCNODEERROR = 1000,
    STORAGEUNAVAILABLE = 2000,
    STORAGEWRITEERROR = 2001,
    SMARTWALLETRPCERROR = 6000,
    SMARTWALLETNOTFOUNDERROR = 6001,
    TASKDATACORRUPTED = 7000,
    TASKDATAMISSINGERROR = 7001,
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

export enum TaskType {
    ETHTRANSFERTASK = 0,
    CONTRACTWRITETASK = 1,
    CONTRACTREADTASK = 2,
    GRAPHQLDATAQUERYTASK = 3,
    RESTAPITASK = 4,
    BRANCHTASK = 5,
    FILTERTASK = 6,
    CUSTOMCODETASK = 7,
}
