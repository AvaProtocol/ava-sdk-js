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

declare class TaskTrigger extends jspb.Message { 
    getName(): string;
    setName(value: string): TaskTrigger;

    hasManual(): boolean;
    clearManual(): void;
    getManual(): boolean;
    setManual(value: boolean): TaskTrigger;

    hasFixedTime(): boolean;
    clearFixedTime(): void;
    getFixedTime(): FixedEpochCondition | undefined;
    setFixedTime(value?: FixedEpochCondition): TaskTrigger;

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
        fixedTime?: FixedEpochCondition.AsObject,
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
    getLang(): CustomCodeLang;
    setLang(value: CustomCodeLang): CustomCodeNode;
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
    getInput(): string;
    setInput(value: string): LoopNode;
    getIterVal(): string;
    setIterVal(value: string): LoopNode;
    getIterKey(): string;
    setIterKey(value: string): LoopNode;

    hasEthTransfer(): boolean;
    clearEthTransfer(): void;
    getEthTransfer(): ETHTransferNode | undefined;
    setEthTransfer(value?: ETHTransferNode): LoopNode;

    hasContractWrite(): boolean;
    clearContractWrite(): void;
    getContractWrite(): ContractWriteNode$1 | undefined;
    setContractWrite(value?: ContractWriteNode$1): LoopNode;

    hasContractRead(): boolean;
    clearContractRead(): void;
    getContractRead(): ContractReadNode | undefined;
    setContractRead(value?: ContractReadNode): LoopNode;

    hasGraphqlDataQuery(): boolean;
    clearGraphqlDataQuery(): void;
    getGraphqlDataQuery(): GraphQLQueryNode | undefined;
    setGraphqlDataQuery(value?: GraphQLQueryNode): LoopNode;

    hasRestApi(): boolean;
    clearRestApi(): void;
    getRestApi(): RestAPINode | undefined;
    setRestApi(value?: RestAPINode): LoopNode;

    hasCustomCode(): boolean;
    clearCustomCode(): void;
    getCustomCode(): CustomCodeNode | undefined;
    setCustomCode(value?: CustomCodeNode): LoopNode;

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
        ethTransfer?: ETHTransferNode.AsObject,
        contractWrite?: ContractWriteNode$1.AsObject,
        contractRead?: ContractReadNode.AsObject,
        graphqlDataQuery?: GraphQLQueryNode.AsObject,
        restApi?: RestAPINode.AsObject,
        customCode?: CustomCodeNode.AsObject,
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
    getEthTransfer(): ETHTransferNode | undefined;
    setEthTransfer(value?: ETHTransferNode): TaskNode;

    hasContractWrite(): boolean;
    clearContractWrite(): void;
    getContractWrite(): ContractWriteNode$1 | undefined;
    setContractWrite(value?: ContractWriteNode$1): TaskNode;

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
        contractWrite?: ContractWriteNode$1.AsObject,
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
    getSuccess(): boolean;
    setSuccess(value: boolean): Execution$1;
    getError(): string;
    setError(value: string): Execution$1;

    hasTriggerMark(): boolean;
    clearTriggerMark(): void;
    getTriggerMark(): TriggerMark$1 | undefined;
    setTriggerMark(value?: TriggerMark$1): Execution$1;
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
        epoch: number,
        success: boolean,
        error: string,
        triggerMark?: TriggerMark$1.AsObject,
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
    getExecutionsList(): Array<Execution$1>;
    setExecutionsList(value: Array<Execution$1>): Task;
    addExecutions(value?: Execution$1, index?: number): Execution$1;

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
        status: avs_pb.TaskStatus,
        trigger?: TaskTrigger.AsObject,
        nodesList: Array<TaskNode.AsObject>,
        edgesList: Array<TaskEdge.AsObject>,
        executionsList: Array<Execution$1.AsObject>,
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

declare namespace ListTasksResp {
    export type AsObject = {
        tasksList: Array<Task.AsObject>,
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

declare class TriggerMark$1 extends jspb.Message { 
    getBlockNumber(): number;
    setBlockNumber(value: number): TriggerMark$1;
    getLogIndex(): number;
    setLogIndex(value: number): TriggerMark$1;
    getTxHash(): string;
    setTxHash(value: string): TriggerMark$1;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TriggerMark$1.AsObject;
    static toObject(includeInstance: boolean, msg: TriggerMark$1): TriggerMark$1.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TriggerMark$1, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TriggerMark$1;
    static deserializeBinaryFromReader(message: TriggerMark$1, reader: jspb.BinaryReader): TriggerMark$1;
}

declare namespace TriggerMark$1 {
    export type AsObject = {
        blockNumber: number,
        logIndex: number,
        txHash: string,
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
    getTask(request: IdReq, callback: (error: grpc.ServiceError | null, response: Task) => void): grpc.ClientUnaryCall;
    getTask(request: IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Task) => void): grpc.ClientUnaryCall;
    getTask(request: IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Task) => void): grpc.ClientUnaryCall;
    cancelTask(request: IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    cancelTask(request: IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    cancelTask(request: IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    deleteTask(request: IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
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
    public getTask(request: IdReq, callback: (error: grpc.ServiceError | null, response: Task) => void): grpc.ClientUnaryCall;
    public getTask(request: IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Task) => void): grpc.ClientUnaryCall;
    public getTask(request: IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Task) => void): grpc.ClientUnaryCall;
    public cancelTask(request: IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public cancelTask(request: IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public cancelTask(request: IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: IdReq, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: IdReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
    public deleteTask(request: IdReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_wrappers_pb.BoolValue) => void): grpc.ClientUnaryCall;
}

type ExecutionProps = Execution$1.AsObject;
type TriggerMarkProps = TriggerMark$1.AsObject;
type StepProps = Execution$1.Step.AsObject;
declare class Execution implements ExecutionProps {
    epoch: number;
    success: boolean;
    error: string;
    triggerMark?: TriggerMarkProps;
    result: string;
    stepsList: Array<StepProps>;
    constructor(props: ExecutionProps);
    static fromResponse(execution: Execution$1): Execution;
    toRequest(): Execution$1;
}

declare const NodeTypes: typeof TaskNode.TaskTypeCase;
type NodeType = TaskNode.TaskTypeCase;
type NodeData = ETHTransferNode.AsObject | ContractWriteNode$1.AsObject | ContractReadNode.AsObject | GraphQLQueryNode.AsObject | RestAPINode.AsObject | BranchNode.AsObject | FilterNode.AsObject | LoopNode.AsObject | CustomCodeNode.AsObject;
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
    static getTypeAndData(obj: TaskNode.AsObject): {
        type: NodeType;
        data: NodeData;
    };
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
type TriggerData = FixedEpochCondition.AsObject | CronCondition.AsObject | BlockCondition.AsObject | EventCondition.AsObject | null;
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
type WorkflowProps = Omit<Task.AsObject, "id" | "owner" | "completedAt" | "status" | "executionsList" | "memo" | "trigger" | "nodesList" | "edgesList"> & {
    id?: string;
    owner?: string;
    completedAt?: number;
    status?: WorkflowStatus;
    memo?: string;
    trigger: Trigger;
    nodes: Node[];
    edges: Edge[];
    executions?: Execution[];
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
    executions?: Execution[];
    completedAt?: number;
    status?: WorkflowStatus;
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
    toRequest(): CreateTaskReq;
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

declare class NodeFactory {
    static create(props: NodeProps): Node;
    static createNodes(props: NodeProps[]): Node[];
    static fromResponse(raw: TaskNode): Node;
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

type ContractWriteNodeData = ContractWriteNode$1.AsObject;
type ContractWriteNodeProps = NodeProps & {
    data: ContractWriteNodeData;
};
declare class ContractWriteNode extends Node {
    constructor(props: ContractWriteNodeProps);
    static fromResponse(raw: TaskNode): ContractWriteNode;
    toRequest(): TaskNode;
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
interface TriggerMark {
    blockNumber?: number;
    logIndex?: number;
    txHash?: string;
    epoch?: number;
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
    getWallets(options: RequestOptions): Promise<SmartWallet[]>;
    createWallet({ salt, factoryAddress }: CreateWalletReq, options: RequestOptions): Promise<SmartWallet>;
    submitWorkflow(workflow: Workflow, options: RequestOptions): Promise<string>;
    createWorkflow(props: WorkflowProps): Workflow;
    getWorkflows(address: string, options: RequestOptions): Promise<Workflow[]>;
    getWorkflow(id: string, options: RequestOptions): Promise<Workflow>;
    cancelWorkflow(id: string, options: RequestOptions): Promise<boolean>;
    deleteWorkflow(id: string, options: RequestOptions): Promise<boolean>;
}

export { AUTH_KEY_HEADER, BlockTrigger, type BlockTriggerProps, type CancelTaskResponse, type ClientOption, ContractWriteNode, type ContractWriteNodeProps, type CreateTaskResponse, type CreateWalletReq, type DeleteTaskResponse, Edge, type EdgeProps, type Environment, Execution, type GetKeyResponse, type ListTasksResponse, Node, NodeFactory, type NodeProps, type NodeType, NodeTypes, type RequestOptions, type SmartWallet, Trigger, TriggerFactory, type TriggerMark, type TriggerType, TriggerTypes, Workflow, type WorkflowProps, type WorkflowStatus, WorkflowStatuses, Client as default, getKeyRequestMessage };
