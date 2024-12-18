import * as grpc from '@grpc/grpc-js';
import { Metadata } from '@grpc/grpc-js';
import * as jspb from 'google-protobuf';
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

declare class FixedTimeCondition extends jspb.Message { 
    clearEpochsList(): void;
    getEpochsList(): Array<number>;
    setEpochsList(value: Array<number>): FixedTimeCondition;
    addEpochs(value: number, index?: number): number;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FixedTimeCondition.AsObject;
    static toObject(includeInstance: boolean, msg: FixedTimeCondition): FixedTimeCondition.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FixedTimeCondition, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FixedTimeCondition;
    static deserializeBinaryFromReader(message: FixedTimeCondition, reader: jspb.BinaryReader): FixedTimeCondition;
}

declare namespace FixedTimeCondition {
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

declare class TaskTrigger extends jspb.Message { 
    getName(): string;
    setName(value: string): TaskTrigger;

    hasManual(): boolean;
    clearManual(): void;
    getManual(): boolean;
    setManual(value: boolean): TaskTrigger;

    hasFixedTime(): boolean;
    clearFixedTime(): void;
    getFixedTime(): FixedTimeCondition | undefined;
    setFixedTime(value?: FixedTimeCondition): TaskTrigger;

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

    getTriggerTypeCase(): TaskTrigger.TriggerTypeCase;

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
        name: string,
        manual: boolean,
        fixedTime?: FixedTimeCondition.AsObject,
        cron?: CronCondition.AsObject,
        block?: BlockCondition.AsObject,
        event?: EventCondition.AsObject,
    }

    export enum TriggerTypeCase {
        TRIGGER_TYPE_NOT_SET = 0,
        MANUAL = 2,
        FIXED_TIME = 3,
        CRON = 4,
        BLOCK = 5,
        EVENT = 6,
    }

}

declare class ETHTransferNode$1 extends jspb.Message { 
    getDestination(): string;
    setDestination(value: string): ETHTransferNode$1;
    getAmount(): string;
    setAmount(value: string): ETHTransferNode$1;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ETHTransferNode$1.AsObject;
    static toObject(includeInstance: boolean, msg: ETHTransferNode$1): ETHTransferNode$1.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ETHTransferNode$1, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ETHTransferNode$1;
    static deserializeBinaryFromReader(message: ETHTransferNode$1, reader: jspb.BinaryReader): ETHTransferNode$1;
}

declare namespace ETHTransferNode$1 {
    export type AsObject = {
        destination: string,
        amount: string,
    }
}

declare class ContractWriteNode$1 extends jspb.Message { 
    getContractAddress(): string;
    setContractAddress(value: string): ContractWriteNode$1;
    getCallData(): string;
    setCallData(value: string): ContractWriteNode$1;
    getContractAbi(): string;
    setContractAbi(value: string): ContractWriteNode$1;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ContractWriteNode$1.AsObject;
    static toObject(includeInstance: boolean, msg: ContractWriteNode$1): ContractWriteNode$1.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ContractWriteNode$1, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ContractWriteNode$1;
    static deserializeBinaryFromReader(message: ContractWriteNode$1, reader: jspb.BinaryReader): ContractWriteNode$1;
}

declare namespace ContractWriteNode$1 {
    export type AsObject = {
        contractAddress: string,
        callData: string,
        contractAbi: string,
    }
}

declare class ContractReadNode$1 extends jspb.Message { 
    getContractAddress(): string;
    setContractAddress(value: string): ContractReadNode$1;
    getCallData(): string;
    setCallData(value: string): ContractReadNode$1;
    getContractAbi(): string;
    setContractAbi(value: string): ContractReadNode$1;
    getMethod(): string;
    setMethod(value: string): ContractReadNode$1;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ContractReadNode$1.AsObject;
    static toObject(includeInstance: boolean, msg: ContractReadNode$1): ContractReadNode$1.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ContractReadNode$1, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ContractReadNode$1;
    static deserializeBinaryFromReader(message: ContractReadNode$1, reader: jspb.BinaryReader): ContractReadNode$1;
}

declare namespace ContractReadNode$1 {
    export type AsObject = {
        contractAddress: string,
        callData: string,
        contractAbi: string,
        method: string,
    }
}

declare class GraphQLQueryNode$1 extends jspb.Message { 
    getUrl(): string;
    setUrl(value: string): GraphQLQueryNode$1;
    getQuery(): string;
    setQuery(value: string): GraphQLQueryNode$1;

    getVariablesMap(): jspb.Map<string, string>;
    clearVariablesMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GraphQLQueryNode$1.AsObject;
    static toObject(includeInstance: boolean, msg: GraphQLQueryNode$1): GraphQLQueryNode$1.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GraphQLQueryNode$1, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GraphQLQueryNode$1;
    static deserializeBinaryFromReader(message: GraphQLQueryNode$1, reader: jspb.BinaryReader): GraphQLQueryNode$1;
}

declare namespace GraphQLQueryNode$1 {
    export type AsObject = {
        url: string,
        query: string,

        variablesMap: Array<[string, string]>,
    }
}

declare class RestAPINode$1 extends jspb.Message { 
    getUrl(): string;
    setUrl(value: string): RestAPINode$1;

    getHeadersMap(): jspb.Map<string, string>;
    clearHeadersMap(): void;
    getBody(): string;
    setBody(value: string): RestAPINode$1;
    getMethod(): string;
    setMethod(value: string): RestAPINode$1;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RestAPINode$1.AsObject;
    static toObject(includeInstance: boolean, msg: RestAPINode$1): RestAPINode$1.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RestAPINode$1, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RestAPINode$1;
    static deserializeBinaryFromReader(message: RestAPINode$1, reader: jspb.BinaryReader): RestAPINode$1;
}

declare namespace RestAPINode$1 {
    export type AsObject = {
        url: string,

        headersMap: Array<[string, string]>,
        body: string,
        method: string,
    }
}

declare class CustomCodeNode$1 extends jspb.Message { 
    getLang(): CustomCodeLang;
    setLang(value: CustomCodeLang): CustomCodeNode$1;
    getSource(): string;
    setSource(value: string): CustomCodeNode$1;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CustomCodeNode$1.AsObject;
    static toObject(includeInstance: boolean, msg: CustomCodeNode$1): CustomCodeNode$1.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CustomCodeNode$1, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CustomCodeNode$1;
    static deserializeBinaryFromReader(message: CustomCodeNode$1, reader: jspb.BinaryReader): CustomCodeNode$1;
}

declare namespace CustomCodeNode$1 {
    export type AsObject = {
        lang: CustomCodeLang,
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

declare class BranchNode$1 extends jspb.Message { 
    clearConditionsList(): void;
    getConditionsList(): Array<Condition>;
    setConditionsList(value: Array<Condition>): BranchNode$1;
    addConditions(value?: Condition, index?: number): Condition;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BranchNode$1.AsObject;
    static toObject(includeInstance: boolean, msg: BranchNode$1): BranchNode$1.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BranchNode$1, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BranchNode$1;
    static deserializeBinaryFromReader(message: BranchNode$1, reader: jspb.BinaryReader): BranchNode$1;
}

declare namespace BranchNode$1 {
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
    getInput(): string;
    setInput(value: string): LoopNode;
    getIterVal(): string;
    setIterVal(value: string): LoopNode;
    getIterKey(): string;
    setIterKey(value: string): LoopNode;

    hasEthTransfer(): boolean;
    clearEthTransfer(): void;
    getEthTransfer(): ETHTransferNode$1 | undefined;
    setEthTransfer(value?: ETHTransferNode$1): LoopNode;

    hasContractWrite(): boolean;
    clearContractWrite(): void;
    getContractWrite(): ContractWriteNode$1 | undefined;
    setContractWrite(value?: ContractWriteNode$1): LoopNode;

    hasContractRead(): boolean;
    clearContractRead(): void;
    getContractRead(): ContractReadNode$1 | undefined;
    setContractRead(value?: ContractReadNode$1): LoopNode;

    hasGraphqlDataQuery(): boolean;
    clearGraphqlDataQuery(): void;
    getGraphqlDataQuery(): GraphQLQueryNode$1 | undefined;
    setGraphqlDataQuery(value?: GraphQLQueryNode$1): LoopNode;

    hasRestApi(): boolean;
    clearRestApi(): void;
    getRestApi(): RestAPINode$1 | undefined;
    setRestApi(value?: RestAPINode$1): LoopNode;

    hasCustomCode(): boolean;
    clearCustomCode(): void;
    getCustomCode(): CustomCodeNode$1 | undefined;
    setCustomCode(value?: CustomCodeNode$1): LoopNode;

    getRunnerCase(): LoopNode.RunnerCase;

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
        input: string,
        iterVal: string,
        iterKey: string,
        ethTransfer?: ETHTransferNode$1.AsObject,
        contractWrite?: ContractWriteNode$1.AsObject,
        contractRead?: ContractReadNode$1.AsObject,
        graphqlDataQuery?: GraphQLQueryNode$1.AsObject,
        restApi?: RestAPINode$1.AsObject,
        customCode?: CustomCodeNode$1.AsObject,
    }

    export enum RunnerCase {
        RUNNER_NOT_SET = 0,
        ETH_TRANSFER = 10,
        CONTRACT_WRITE = 11,
        CONTRACT_READ = 12,
        GRAPHQL_DATA_QUERY = 13,
        REST_API = 14,
        CUSTOM_CODE = 15,
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
    getEthTransfer(): ETHTransferNode$1 | undefined;
    setEthTransfer(value?: ETHTransferNode$1): TaskNode;

    hasContractWrite(): boolean;
    clearContractWrite(): void;
    getContractWrite(): ContractWriteNode$1 | undefined;
    setContractWrite(value?: ContractWriteNode$1): TaskNode;

    hasContractRead(): boolean;
    clearContractRead(): void;
    getContractRead(): ContractReadNode$1 | undefined;
    setContractRead(value?: ContractReadNode$1): TaskNode;

    hasGraphqlQuery(): boolean;
    clearGraphqlQuery(): void;
    getGraphqlQuery(): GraphQLQueryNode$1 | undefined;
    setGraphqlQuery(value?: GraphQLQueryNode$1): TaskNode;

    hasRestApi(): boolean;
    clearRestApi(): void;
    getRestApi(): RestAPINode$1 | undefined;
    setRestApi(value?: RestAPINode$1): TaskNode;

    hasBranch(): boolean;
    clearBranch(): void;
    getBranch(): BranchNode$1 | undefined;
    setBranch(value?: BranchNode$1): TaskNode;

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
    getCustomCode(): CustomCodeNode$1 | undefined;
    setCustomCode(value?: CustomCodeNode$1): TaskNode;

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
        ethTransfer?: ETHTransferNode$1.AsObject,
        contractWrite?: ContractWriteNode$1.AsObject,
        contractRead?: ContractReadNode$1.AsObject,
        graphqlQuery?: GraphQLQueryNode$1.AsObject,
        restApi?: RestAPINode$1.AsObject,
        branch?: BranchNode$1.AsObject,
        filter?: FilterNode.AsObject,
        loop?: LoopNode.AsObject,
        customCode?: CustomCodeNode$1.AsObject,
    }

    export enum TaskTypeCase {
        TASK_TYPE_NOT_SET = 0,
        ETH_TRANSFER = 10,
        CONTRACT_WRITE = 11,
        CONTRACT_READ = 12,
        GRAPHQL_QUERY = 13,
        REST_API = 14,
        BRANCH = 15,
        FILTER = 16,
        LOOP = 17,
        CUSTOM_CODE = 18,
    }

}

declare class Execution$1 extends jspb.Message { 
    getId(): string;
    setId(value: string): Execution$1;
    getStartAt(): number;
    setStartAt(value: number): Execution$1;
    getEndAt(): number;
    setEndAt(value: number): Execution$1;
    getSuccess(): boolean;
    setSuccess(value: boolean): Execution$1;
    getError(): string;
    setError(value: string): Execution$1;

    hasTriggerMark(): boolean;
    clearTriggerMark(): void;
    getTriggerMark(): TriggerMark | undefined;
    setTriggerMark(value?: TriggerMark): Execution$1;
    getResult(): string;
    setResult(value: string): Execution$1;
    clearStepsList(): void;
    getStepsList(): Array<Execution$1.Step>;
    setStepsList(value: Array<Execution$1.Step>): Execution$1;
    addSteps(value?: Execution$1.Step, index?: number): Execution$1.Step;

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
        id: string,
        startAt: number,
        endAt: number,
        success: boolean,
        error: string,
        triggerMark?: TriggerMark.AsObject,
        result: string,
        stepsList: Array<Execution$1.Step.AsObject>,
    }


    export class Step extends jspb.Message { 
        getNodeId(): string;
        setNodeId(value: string): Step;
        getSuccess(): boolean;
        setSuccess(value: boolean): Step;
        getOutputData(): string;
        setOutputData(value: string): Step;
        getLog(): string;
        setLog(value: string): Step;
        getError(): string;
        setError(value: string): Step;
        getStartAt(): number;
        setStartAt(value: number): Step;
        getEndAt(): number;
        setEndAt(value: number): Step;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Step.AsObject;
        static toObject(includeInstance: boolean, msg: Step): Step.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Step, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Step;
        static deserializeBinaryFromReader(message: Step, reader: jspb.BinaryReader): Step;
    }

    export namespace Step {
        export type AsObject = {
            nodeId: string,
            success: boolean,
            outputData: string,
            log: string,
            error: string,
            startAt: number,
            endAt: number,
        }
    }

}

declare class Task extends jspb.Message { 
    getId(): string;
    setId(value: string): Task;
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
    getMaxExecution(): number;
    setMaxExecution(value: number): Task;
    getTotalExecution(): number;
    setTotalExecution(value: number): Task;
    getLastRanAt(): number;
    setLastRanAt(value: number): Task;
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
        id: string,
        owner: string,
        smartWalletAddress: string,
        startAt: number,
        expiredAt: number,
        memo: string,
        completedAt: number,
        maxExecution: number,
        totalExecution: number,
        lastRanAt: number,
        status: TaskStatus,
        trigger?: TaskTrigger.AsObject,
        nodesList: Array<TaskNode.AsObject>,
        edgesList: Array<TaskEdge.AsObject>,
    }
}

declare class CreateTaskReq extends jspb.Message { 

    hasTrigger(): boolean;
    clearTrigger(): void;
    getTrigger(): TaskTrigger | undefined;
    setTrigger(value?: TaskTrigger): CreateTaskReq;
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
        trigger?: TaskTrigger.AsObject,
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
    clearItemsList(): void;
    getItemsList(): Array<SmartWallet$1>;
    setItemsList(value: Array<SmartWallet$1>): ListWalletResp;
    addItems(value?: SmartWallet$1, index?: number): SmartWallet$1;

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
        itemsList: Array<SmartWallet$1.AsObject>,
    }
}

declare class ListTasksReq extends jspb.Message { 
    getSmartWalletAddress(): string;
    setSmartWalletAddress(value: string): ListTasksReq;
    getCursor(): string;
    setCursor(value: string): ListTasksReq;
    getItemPerPage(): number;
    setItemPerPage(value: number): ListTasksReq;

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
        cursor: string,
        itemPerPage: number,
    }
}

declare class ListTasksResp extends jspb.Message { 
    clearItemsList(): void;
    getItemsList(): Array<ListTasksResp.Item>;
    setItemsList(value: Array<ListTasksResp.Item>): ListTasksResp;
    addItems(value?: ListTasksResp.Item, index?: number): ListTasksResp.Item;
    getCursor(): string;
    setCursor(value: string): ListTasksResp;

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
        itemsList: Array<ListTasksResp.Item.AsObject>,
        cursor: string,
    }


    export class Item extends jspb.Message { 
        getId(): string;
        setId(value: string): Item;
        getOwner(): string;
        setOwner(value: string): Item;
        getSmartWalletAddress(): string;
        setSmartWalletAddress(value: string): Item;
        getStartAt(): number;
        setStartAt(value: number): Item;
        getExpiredAt(): number;
        setExpiredAt(value: number): Item;
        getMemo(): string;
        setMemo(value: string): Item;
        getCompletedAt(): number;
        setCompletedAt(value: number): Item;
        getMaxExecution(): number;
        setMaxExecution(value: number): Item;
        getTotalExecution(): number;
        setTotalExecution(value: number): Item;
        getLastRanAt(): number;
        setLastRanAt(value: number): Item;
        getStatus(): TaskStatus;
        setStatus(value: TaskStatus): Item;

        hasTrigger(): boolean;
        clearTrigger(): void;
        getTrigger(): TaskTrigger | undefined;
        setTrigger(value?: TaskTrigger): Item;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Item.AsObject;
        static toObject(includeInstance: boolean, msg: Item): Item.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Item, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Item;
        static deserializeBinaryFromReader(message: Item, reader: jspb.BinaryReader): Item;
    }

    export namespace Item {
        export type AsObject = {
            id: string,
            owner: string,
            smartWalletAddress: string,
            startAt: number,
            expiredAt: number,
            memo: string,
            completedAt: number,
            maxExecution: number,
            totalExecution: number,
            lastRanAt: number,
            status: TaskStatus,
            trigger?: TaskTrigger.AsObject,
        }
    }

}

declare class ListExecutionsReq extends jspb.Message { 
    getId(): string;
    setId(value: string): ListExecutionsReq;
    getCursor(): string;
    setCursor(value: string): ListExecutionsReq;
    getItemPerPage(): number;
    setItemPerPage(value: number): ListExecutionsReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListExecutionsReq.AsObject;
    static toObject(includeInstance: boolean, msg: ListExecutionsReq): ListExecutionsReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListExecutionsReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListExecutionsReq;
    static deserializeBinaryFromReader(message: ListExecutionsReq, reader: jspb.BinaryReader): ListExecutionsReq;
}

declare namespace ListExecutionsReq {
    export type AsObject = {
        id: string,
        cursor: string,
        itemPerPage: number,
    }
}

declare class ListExecutionsResp extends jspb.Message { 
    clearItemsList(): void;
    getItemsList(): Array<Execution$1>;
    setItemsList(value: Array<Execution$1>): ListExecutionsResp;
    addItems(value?: Execution$1, index?: number): Execution$1;
    getCursor(): string;
    setCursor(value: string): ListExecutionsResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListExecutionsResp.AsObject;
    static toObject(includeInstance: boolean, msg: ListExecutionsResp): ListExecutionsResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListExecutionsResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListExecutionsResp;
    static deserializeBinaryFromReader(message: ListExecutionsResp, reader: jspb.BinaryReader): ListExecutionsResp;
}

declare namespace ListExecutionsResp {
    export type AsObject = {
        itemsList: Array<Execution$1.AsObject>,
        cursor: string,
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

declare class TriggerMark extends jspb.Message { 
    getBlockNumber(): number;
    setBlockNumber(value: number): TriggerMark;
    getLogIndex(): number;
    setLogIndex(value: number): TriggerMark;
    getTxHash(): string;
    setTxHash(value: string): TriggerMark;
    getEpoch(): number;
    setEpoch(value: number): TriggerMark;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TriggerMark.AsObject;
    static toObject(includeInstance: boolean, msg: TriggerMark): TriggerMark.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TriggerMark, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TriggerMark;
    static deserializeBinaryFromReader(message: TriggerMark, reader: jspb.BinaryReader): TriggerMark;
}

declare namespace TriggerMark {
    export type AsObject = {
        blockNumber: number,
        logIndex: number,
        txHash: string,
        epoch: number,
    }
}

declare class GetWalletReq extends jspb.Message { 
    getSalt(): string;
    setSalt(value: string): GetWalletReq;
    getFactoryAddress(): string;
    setFactoryAddress(value: string): GetWalletReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetWalletReq.AsObject;
    static toObject(includeInstance: boolean, msg: GetWalletReq): GetWalletReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetWalletReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetWalletReq;
    static deserializeBinaryFromReader(message: GetWalletReq, reader: jspb.BinaryReader): GetWalletReq;
}

declare namespace GetWalletReq {
    export type AsObject = {
        salt: string,
        factoryAddress: string,
    }
}

declare class GetWalletResp extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): GetWalletResp;
    getSalt(): string;
    setSalt(value: string): GetWalletResp;
    getFactoryAddress(): string;
    setFactoryAddress(value: string): GetWalletResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetWalletResp.AsObject;
    static toObject(includeInstance: boolean, msg: GetWalletResp): GetWalletResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetWalletResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetWalletResp;
    static deserializeBinaryFromReader(message: GetWalletResp, reader: jspb.BinaryReader): GetWalletResp;
}

declare namespace GetWalletResp {
    export type AsObject = {
        address: string,
        salt: string,
        factoryAddress: string,
    }
}

declare class UserTriggerTaskReq extends jspb.Message { 
    getTaskId(): string;
    setTaskId(value: string): UserTriggerTaskReq;

    hasTriggerMark(): boolean;
    clearTriggerMark(): void;
    getTriggerMark(): TriggerMark | undefined;
    setTriggerMark(value?: TriggerMark): UserTriggerTaskReq;
    getRunInline(): boolean;
    setRunInline(value: boolean): UserTriggerTaskReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserTriggerTaskReq.AsObject;
    static toObject(includeInstance: boolean, msg: UserTriggerTaskReq): UserTriggerTaskReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserTriggerTaskReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserTriggerTaskReq;
    static deserializeBinaryFromReader(message: UserTriggerTaskReq, reader: jspb.BinaryReader): UserTriggerTaskReq;
}

declare namespace UserTriggerTaskReq {
    export type AsObject = {
        taskId: string,
        triggerMark?: TriggerMark.AsObject,
        runInline: boolean,
    }
}

declare class UserTriggerTaskResp extends jspb.Message { 
    getResult(): boolean;
    setResult(value: boolean): UserTriggerTaskResp;
    getExecutionId(): string;
    setExecutionId(value: string): UserTriggerTaskResp;
    getJobId(): string;
    setJobId(value: string): UserTriggerTaskResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserTriggerTaskResp.AsObject;
    static toObject(includeInstance: boolean, msg: UserTriggerTaskResp): UserTriggerTaskResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserTriggerTaskResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserTriggerTaskResp;
    static deserializeBinaryFromReader(message: UserTriggerTaskResp, reader: jspb.BinaryReader): UserTriggerTaskResp;
}

declare namespace UserTriggerTaskResp {
    export type AsObject = {
        result: boolean,
        executionId: string,
        jobId: string,
    }
}

declare enum TaskStatus {
    ACTIVE = 0,
    COMPLETED = 1,
    FAILED = 2,
    CANCELED = 3,
    EXECUTING = 4,
}

declare enum CustomCodeLang {
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
    getWallet(request: GetWalletReq, callback: (error: grpc.ServiceError | null, response: GetWalletResp) => void): grpc.ClientUnaryCall;
    getWallet(request: GetWalletReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: GetWalletResp) => void): grpc.ClientUnaryCall;
    getWallet(request: GetWalletReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: GetWalletResp) => void): grpc.ClientUnaryCall;
    listWallets(request: ListWalletReq, callback: (error: grpc.ServiceError | null, response: ListWalletResp) => void): grpc.ClientUnaryCall;
    listWallets(request: ListWalletReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: ListWalletResp) => void): grpc.ClientUnaryCall;
    listWallets(request: ListWalletReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: ListWalletResp) => void): grpc.ClientUnaryCall;
    createTask(request: CreateTaskReq, callback: (error: grpc.ServiceError | null, response: CreateTaskResp) => void): grpc.ClientUnaryCall;
    createTask(request: CreateTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: CreateTaskResp) => void): grpc.ClientUnaryCall;
    createTask(request: CreateTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: CreateTaskResp) => void): grpc.ClientUnaryCall;
    listTasks(request: ListTasksReq, callback: (error: grpc.ServiceError | null, response: ListTasksResp) => void): grpc.ClientUnaryCall;
    listTasks(request: ListTasksReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: ListTasksResp) => void): grpc.ClientUnaryCall;
    listTasks(request: ListTasksReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: ListTasksResp) => void): grpc.ClientUnaryCall;
    getTask(request: IdReq, callback: (error: grpc.ServiceError | null, response: Task) => void): grpc.ClientUnaryCall;
    getTask(request: IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Task) => void): grpc.ClientUnaryCall;
    getTask(request: IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Task) => void): grpc.ClientUnaryCall;
    listExecutions(request: ListExecutionsReq, callback: (error: grpc.ServiceError | null, response: ListExecutionsResp) => void): grpc.ClientUnaryCall;
    listExecutions(request: ListExecutionsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: ListExecutionsResp) => void): grpc.ClientUnaryCall;
    listExecutions(request: ListExecutionsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: ListExecutionsResp) => void): grpc.ClientUnaryCall;
    cancelTask(request: IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    cancelTask(request: IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    cancelTask(request: IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    triggerTask(request: UserTriggerTaskReq, callback: (error: grpc.ServiceError | null, response: UserTriggerTaskResp) => void): grpc.ClientUnaryCall;
    triggerTask(request: UserTriggerTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: UserTriggerTaskResp) => void): grpc.ClientUnaryCall;
    triggerTask(request: UserTriggerTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: UserTriggerTaskResp) => void): grpc.ClientUnaryCall;
}

declare class AggregatorClient extends grpc.Client implements IAggregatorClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getKey(request: GetKeyReq, callback: (error: grpc.ServiceError | null, response: KeyResp) => void): grpc.ClientUnaryCall;
    public getKey(request: GetKeyReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: KeyResp) => void): grpc.ClientUnaryCall;
    public getKey(request: GetKeyReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: KeyResp) => void): grpc.ClientUnaryCall;
    public getNonce(request: NonceRequest, callback: (error: grpc.ServiceError | null, response: NonceResp) => void): grpc.ClientUnaryCall;
    public getNonce(request: NonceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: NonceResp) => void): grpc.ClientUnaryCall;
    public getNonce(request: NonceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: NonceResp) => void): grpc.ClientUnaryCall;
    public getWallet(request: GetWalletReq, callback: (error: grpc.ServiceError | null, response: GetWalletResp) => void): grpc.ClientUnaryCall;
    public getWallet(request: GetWalletReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: GetWalletResp) => void): grpc.ClientUnaryCall;
    public getWallet(request: GetWalletReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: GetWalletResp) => void): grpc.ClientUnaryCall;
    public listWallets(request: ListWalletReq, callback: (error: grpc.ServiceError | null, response: ListWalletResp) => void): grpc.ClientUnaryCall;
    public listWallets(request: ListWalletReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: ListWalletResp) => void): grpc.ClientUnaryCall;
    public listWallets(request: ListWalletReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: ListWalletResp) => void): grpc.ClientUnaryCall;
    public createTask(request: CreateTaskReq, callback: (error: grpc.ServiceError | null, response: CreateTaskResp) => void): grpc.ClientUnaryCall;
    public createTask(request: CreateTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: CreateTaskResp) => void): grpc.ClientUnaryCall;
    public createTask(request: CreateTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: CreateTaskResp) => void): grpc.ClientUnaryCall;
    public listTasks(request: ListTasksReq, callback: (error: grpc.ServiceError | null, response: ListTasksResp) => void): grpc.ClientUnaryCall;
    public listTasks(request: ListTasksReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: ListTasksResp) => void): grpc.ClientUnaryCall;
    public listTasks(request: ListTasksReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: ListTasksResp) => void): grpc.ClientUnaryCall;
    public getTask(request: IdReq, callback: (error: grpc.ServiceError | null, response: Task) => void): grpc.ClientUnaryCall;
    public getTask(request: IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Task) => void): grpc.ClientUnaryCall;
    public getTask(request: IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Task) => void): grpc.ClientUnaryCall;
    public listExecutions(request: ListExecutionsReq, callback: (error: grpc.ServiceError | null, response: ListExecutionsResp) => void): grpc.ClientUnaryCall;
    public listExecutions(request: ListExecutionsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: ListExecutionsResp) => void): grpc.ClientUnaryCall;
    public listExecutions(request: ListExecutionsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: ListExecutionsResp) => void): grpc.ClientUnaryCall;
    public cancelTask(request: IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public cancelTask(request: IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public cancelTask(request: IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public triggerTask(request: UserTriggerTaskReq, callback: (error: grpc.ServiceError | null, response: UserTriggerTaskResp) => void): grpc.ClientUnaryCall;
    public triggerTask(request: UserTriggerTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: UserTriggerTaskResp) => void): grpc.ClientUnaryCall;
    public triggerTask(request: UserTriggerTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: UserTriggerTaskResp) => void): grpc.ClientUnaryCall;
}

declare const NodeTypes: typeof TaskNode.TaskTypeCase;
type NodeType = TaskNode.TaskTypeCase;
type NodeData = ETHTransferNode$1.AsObject | ContractWriteNode$1.AsObject | ContractReadNode$1.AsObject | GraphQLQueryNode$1.AsObject | RestAPINode$1.AsObject | BranchNode$1.AsObject | FilterNode.AsObject | LoopNode.AsObject | CustomCodeNode$1.AsObject;
type NodeProps = Omit<TaskNode.AsObject, "ethTransfer" | "contractWrite" | "contractRead" | "graphqlDataQuery" | "restApi" | "branch" | "filter" | "loop" | "customCode"> & {
    type: TaskNode.TaskTypeCase;
    data: NodeData;
};
declare class Node implements NodeProps {
    id: string;
    name: string;
    type: NodeType;
    data: NodeData;
    constructor(props: NodeProps);
    toRequest(): TaskNode;
}

type EdgeProps = TaskEdge.AsObject;
declare class Edge implements EdgeProps {
    id: string;
    source: string;
    target: string;
    constructor(edge: EdgeProps);
    static fromResponse(edge: TaskEdge): Edge;
    toRequest(): TaskEdge;
}

declare const TriggerTypes: typeof TaskTrigger.TriggerTypeCase;
type TriggerType = TaskTrigger.TriggerTypeCase;
type TriggerData = FixedTimeCondition.AsObject | CronCondition.AsObject | BlockCondition.AsObject | EventCondition.AsObject | null;
type TriggerProps = Omit<TaskTrigger.AsObject, "manual" | "fixedTime" | "cron" | "block" | "event"> & {
    type: TriggerType;
    data: TriggerData;
};
declare class Trigger implements TriggerProps {
    name: string;
    type: TriggerType;
    data: TriggerData;
    /**
     * Create an instance of Trigger from user inputs
     * @param props
     */
    constructor(props: TriggerProps);
    toRequest(): TaskTrigger;
}

declare const WorkflowStatuses: typeof TaskStatus;
type WorkflowStatus = TaskStatus;
type WorkflowProps = Omit<Task.AsObject, "id" | "owner" | "completedAt" | "status" | "executionsList" | "memo" | "trigger" | "nodesList" | "edgesList" | "totalExecution" | "lastRanAt"> & {
    id?: string;
    owner?: string;
    completedAt?: number;
    status?: WorkflowStatus;
    memo?: string;
    trigger: Trigger;
    nodes: Node[];
    edges: Edge[];
    totalExecution?: number;
    lastRanAt?: number;
};
declare class Workflow implements WorkflowProps {
    smartWalletAddress: string;
    trigger: Trigger;
    nodes: Node[];
    edges: Edge[];
    startAt: number;
    expiredAt: number;
    maxExecution: number;
    id?: string;
    owner?: string;
    memo?: string;
    completedAt?: number;
    status?: WorkflowStatus;
    totalExecution?: number;
    lastRanAt?: number;
    /**
     * Create an instance of Workflow from user inputs
     * @param props
     */
    constructor(props: WorkflowProps);
    /**
     * Create an instance of Workflow from AVS getTask response
     * @param res
     * @returns
     */
    static fromResponse(obj: Task): Workflow;
    /**
     * Create an instance of Workflow with only selected fields
     * @param obj
     */
    static fromListResponse(obj: ListTasksResp.Item): Workflow;
    toRequest(): CreateTaskReq;
}

type StepProps = Execution$1.Step.AsObject;
declare class Step implements StepProps {
    nodeId: string;
    success: boolean;
    outputData: string;
    log: string;
    error: string;
    startAt: number;
    endAt: number;
    constructor(props: StepProps);
    static fromResponse(step: Execution$1.Step): Step;
    toRequest(): Execution$1.Step;
}

type ExecutionProps = Omit<Execution$1.AsObject, "stepsList"> & {
    stepsList: Step[];
};
type TriggerMarkProps = TriggerMark.AsObject;
declare class Execution implements ExecutionProps {
    id: string;
    startAt: number;
    endAt: number;
    success: boolean;
    error: string;
    triggerMark?: TriggerMarkProps;
    result: string;
    stepsList: Step[];
    constructor(props: ExecutionProps);
    static fromResponse(execution: Execution$1): Execution;
    toRequest(): Execution$1;
}

type ContractWriteNodeData = ContractWriteNode$1.AsObject;
type ContractWriteNodeProps = NodeProps & {
    data: ContractWriteNodeData;
};
declare class ContractWriteNode extends Node {
    constructor(props: ContractWriteNodeProps);
    static fromResponse(raw: TaskNode): ContractWriteNode;
    toRequest(): TaskNode;
}

type CustomCodeNodeData = CustomCodeNode$1.AsObject;
declare const CustomCodeLangs: typeof CustomCodeLang;
type CustomCodeNodeProps = NodeProps & {
    data: CustomCodeNodeData;
};
declare class CustomCodeNode extends Node {
    constructor(props: CustomCodeNodeProps);
    static fromResponse(raw: TaskNode): CustomCodeNode;
    toRequest(): TaskNode;
}

type GraphQLQueryNodeData = GraphQLQueryNode$1.AsObject;
type GraphQLQueryNodeProps = NodeProps & {
    data: GraphQLQueryNodeData;
};
declare class GraphQLQueryNode extends Node {
    constructor(props: GraphQLQueryNodeProps);
    static fromResponse(raw: TaskNode): GraphQLQueryNode;
    toRequest(): TaskNode;
}

type RestAPINodeData = RestAPINode$1.AsObject;
type RestAPINodeProps = NodeProps & {
    data: RestAPINodeData;
};
declare class RestAPINode extends Node {
    constructor(props: RestAPINodeProps);
    static fromResponse(raw: TaskNode): RestAPINode;
    toRequest(): TaskNode;
}

type ContractReadNodeData = ContractReadNode$1.AsObject;
type ContractReadNodeProps = NodeProps & {
    data: ContractReadNodeData;
};
declare class ContractReadNode extends Node {
    constructor(props: ContractReadNodeProps);
    static fromResponse(raw: TaskNode): ContractReadNode;
    toRequest(): TaskNode;
}

type ETHTransferNodeData = ETHTransferNode$1.AsObject;
type ETHTransferNodeProps = NodeProps & {
    data: ETHTransferNodeData;
};
declare class ETHTransferNode extends Node {
    constructor(props: ETHTransferNodeProps);
    static fromResponse(raw: TaskNode): ETHTransferNode;
    toRequest(): TaskNode;
}

type BranchNodeData = BranchNode$1.AsObject;
type BranchNodeProps = NodeProps & {
    data: BranchNodeData;
};
declare class BranchNode extends Node {
    constructor(props: BranchNodeProps);
    static fromResponse(raw: TaskNode): BranchNode;
    toRequest(): TaskNode;
}

declare class NodeFactory {
    static create(props: NodeProps): Node;
    static createNodes(props: NodeProps[]): Node[];
    static fromResponse(raw: TaskNode): Node;
}

type BlockTriggerDataType = BlockCondition.AsObject;
type BlockTriggerProps = TriggerProps & {
    data: BlockTriggerDataType;
};
declare class BlockTrigger extends Trigger {
    constructor(props: BlockTriggerProps);
    toRequest(): TaskTrigger;
    static fromResponse(raw: TaskTrigger): BlockTrigger;
}

type CronTriggerDataType = CronCondition.AsObject;
type CronTriggerProps = TriggerProps & {
    data: CronTriggerDataType;
};
declare class CronTrigger extends Trigger {
    constructor(props: CronTriggerProps);
    toRequest(): TaskTrigger;
    static fromResponse(raw: TaskTrigger): CronTrigger;
}

type EventTriggerDataType = EventCondition.AsObject;
type EventTriggerProps = TriggerProps & {
    data: EventTriggerDataType;
};
declare class EventTrigger extends Trigger {
    constructor(props: EventTriggerProps);
    toRequest(): TaskTrigger;
    static fromResponse(raw: TaskTrigger): EventTrigger;
}

type FixedTimeTriggerDataType = FixedTimeCondition.AsObject;
type FixedTimeTriggerProps = TriggerProps & {
    data: FixedTimeTriggerDataType;
};
declare class FixedTimeTrigger extends Trigger {
    constructor(props: FixedTimeTriggerProps);
    toRequest(): TaskTrigger;
    static fromResponse(raw: TaskTrigger): FixedTimeTrigger;
}

declare class TriggerFactory {
    /**
     * Static factory method to create Trigger instances
     * @param props
     * @returns
     */
    static create(props: TriggerProps): Trigger;
    /**
     * Create an instance of Trigger from AVS getTask or listTasks response
     * @param trigger
     * @returns
     */
    static fromResponse(raw: TaskTrigger): Trigger;
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
type SmartWallet = SmartWallet$1.AsObject;

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
    /**
     * Get the list of smart wallets; new wallets can be added to the list by calling `addWallet`
     * @param {RequestOptions} options - Request options
     * @returns {Promise<SmartWallet[]>} - The list of SmartWallet objects
     */
    getWallets(options: RequestOptions): Promise<SmartWallet[]>;
    /**
     * Add a new smart wallet address to the wallet list
     * @param {string} salt - The salt for the wallet
     * @param {string} factoryAddress - Factory address for the wallet
     * @param {RequestOptions} options - Request options
     * @returns {Promise<SmartWallet>} - The added SmartWallet object
     */
    addWallet({ salt, factoryAddress }: GetWalletReq.AsObject, options: RequestOptions): Promise<SmartWallet>;
    /**
     * Submit a workflow to the AVS server; once the workflow is submitted, it cannot be modified
     * @param {Workflow} workflow - Workflow object to submit
     * @param {RequestOptions} options - Request options
     * @returns {Promise<string>} - The Id of the submitted workflow
     */
    submitWorkflow(workflow: Workflow, options: RequestOptions): Promise<string>;
    createWorkflow(props: WorkflowProps): Workflow;
    /**
     * Get the list of workflows; new workflows can be created by calling `submitWorkflow`
     * @param {string} address - The address of the smart wallet
     * @param {string} cursor - The cursor for the list
     * @param {number} limit - The limit for the list
     * @param {RequestOptions} options - Request options
     * @returns {Promise<{ cursor: string; result: Workflow[] }>} - The list of Workflow objects
     */
    getWorkflows(address: string, cursor: string, limit: number, options: RequestOptions): Promise<{
        cursor: string;
        result: Workflow[];
    }>;
    /**
     * Get the list of executions for a workflow
     * @param {string} workflowId - The Id of the workflow
     * @param {string} cursor - The cursor for the list
     * @param {number} limit - The limit for the list
     * @param {RequestOptions} options - Request options
     * @returns {Promise<{ cursor: string; result: Execution[] }>} - The list of Executions
     */
    getExecutions(workflowId: string, cursor: string, limit: number, options: RequestOptions): Promise<{
        cursor: string;
        result: Execution[];
    }>;
    /**
     * Get a workflow by its Id
     * @param {string} id - The Id of the workflow
     * @param {RequestOptions} options - Request options
     * @returns {Promise<Workflow>} - The Workflow object
     */
    getWorkflow(id: string, options: RequestOptions): Promise<Workflow>;
    triggerWorkflow(workflowId: string, triggerType: TriggerType, triggerMark: TriggerMark.AsObject, isBlocking: boolean | undefined, options: RequestOptions): Promise<UserTriggerTaskResp>;
    /**
     * Cancel a workflow by its Id
     * @param {string} id - The Id of the workflow
     * @param {RequestOptions} options - Request options
     * @returns {Promise<boolean>} - Whether the workflow was successfully canceled
     */
    cancelWorkflow(id: string, options: RequestOptions): Promise<boolean>;
    /**
     * Delete a workflow by its Id
     * @param {string} id - The Id of the workflow
     * @param {RequestOptions} options - Request options
     * @returns {Promise<boolean>} - Whether the workflow was successfully deleted
     */
    deleteWorkflow(id: string, options: RequestOptions): Promise<boolean>;
}

export { AUTH_KEY_HEADER, BlockTrigger, type BlockTriggerProps, BranchNode, type BranchNodeData, type BranchNodeProps, type ClientOption, ContractReadNode, type ContractReadNodeProps, ContractWriteNode, type ContractWriteNodeProps, CronTrigger, type CronTriggerProps, CustomCodeLangs, CustomCodeNode, type CustomCodeNodeProps, ETHTransferNode, type ETHTransferNodeProps, Edge, type EdgeProps, type Environment, EventTrigger, type EventTriggerProps, Execution, FixedTimeTrigger, type FixedTimeTriggerProps, type GetKeyResponse, GraphQLQueryNode, type GraphQLQueryNodeProps, Node, NodeFactory, type NodeProps, type NodeType, NodeTypes, type RequestOptions, RestAPINode, type RestAPINodeProps, type SmartWallet, Trigger, TriggerFactory, type TriggerProps, type TriggerType, TriggerTypes, Workflow, type WorkflowProps, type WorkflowStatus, WorkflowStatuses, Client as default, getKeyRequestMessage };
