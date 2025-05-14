// package: aggregator
// file: avs.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";

export class IdReq extends jspb.Message { 
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

export namespace IdReq {
    export type AsObject = {
        id: string,
    }
}

export class FixedTimeCondition extends jspb.Message { 
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

export namespace FixedTimeCondition {
    export type AsObject = {
        epochsList: Array<number>,
    }
}

export class CronCondition extends jspb.Message { 
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

export namespace CronCondition {
    export type AsObject = {
        scheduleList: Array<string>,
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
    clearMatcherList(): void;
    getMatcherList(): Array<EventCondition.Matcher>;
    setMatcherList(value: Array<EventCondition.Matcher>): EventCondition;
    addMatcher(value?: EventCondition.Matcher, index?: number): EventCondition.Matcher;
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
        matcherList: Array<EventCondition.Matcher.AsObject>,
        expression: string,
    }


    export class Matcher extends jspb.Message { 
        getType(): string;
        setType(value: string): Matcher;
        clearValueList(): void;
        getValueList(): Array<string>;
        setValueList(value: Array<string>): Matcher;
        addValue(value: string, index?: number): string;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Matcher.AsObject;
        static toObject(includeInstance: boolean, msg: Matcher): Matcher.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Matcher, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Matcher;
        static deserializeBinaryFromReader(message: Matcher, reader: jspb.BinaryReader): Matcher;
    }

    export namespace Matcher {
        export type AsObject = {
            type: string,
            valueList: Array<string>,
        }
    }

}

export class TaskTrigger extends jspb.Message { 
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
    getId(): string;
    setId(value: string): TaskTrigger;

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

export namespace TaskTrigger {
    export type AsObject = {
        name: string,
        manual: boolean,
        fixedTime?: FixedTimeCondition.AsObject,
        cron?: CronCondition.AsObject,
        block?: BlockCondition.AsObject,
        event?: EventCondition.AsObject,
        id: string,
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


    export class Output extends jspb.Message { 
        getTransactionHash(): string;
        setTransactionHash(value: string): Output;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Output.AsObject;
        static toObject(includeInstance: boolean, msg: Output): Output.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Output, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Output;
        static deserializeBinaryFromReader(message: Output, reader: jspb.BinaryReader): Output;
    }

    export namespace Output {
        export type AsObject = {
            transactionHash: string,
        }
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


    export class Output extends jspb.Message { 

        hasUserOp(): boolean;
        clearUserOp(): void;
        getUserOp(): Evm.UserOp | undefined;
        setUserOp(value?: Evm.UserOp): Output;

        hasTxReceipt(): boolean;
        clearTxReceipt(): void;
        getTxReceipt(): Evm.TransactionReceipt | undefined;
        setTxReceipt(value?: Evm.TransactionReceipt): Output;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Output.AsObject;
        static toObject(includeInstance: boolean, msg: Output): Output.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Output, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Output;
        static deserializeBinaryFromReader(message: Output, reader: jspb.BinaryReader): Output;
    }

    export namespace Output {
        export type AsObject = {
            userOp?: Evm.UserOp.AsObject,
            txReceipt?: Evm.TransactionReceipt.AsObject,
        }
    }

}

export class ContractReadNode extends jspb.Message { 
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

export namespace ContractReadNode {
    export type AsObject = {
        contractAddress: string,
        callData: string,
        contractAbi: string,
    }


    export class Output extends jspb.Message { 
        clearDataList(): void;
        getDataList(): Array<google_protobuf_struct_pb.Value>;
        setDataList(value: Array<google_protobuf_struct_pb.Value>): Output;
        addData(value?: google_protobuf_struct_pb.Value, index?: number): google_protobuf_struct_pb.Value;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Output.AsObject;
        static toObject(includeInstance: boolean, msg: Output): Output.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Output, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Output;
        static deserializeBinaryFromReader(message: Output, reader: jspb.BinaryReader): Output;
    }

    export namespace Output {
        export type AsObject = {
            dataList: Array<google_protobuf_struct_pb.Value.AsObject>,
        }
    }

}

export class GraphQLQueryNode extends jspb.Message { 
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

export namespace GraphQLQueryNode {
    export type AsObject = {
        url: string,
        query: string,

        variablesMap: Array<[string, string]>,
    }


    export class Output extends jspb.Message { 

        hasData(): boolean;
        clearData(): void;
        getData(): google_protobuf_any_pb.Any | undefined;
        setData(value?: google_protobuf_any_pb.Any): Output;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Output.AsObject;
        static toObject(includeInstance: boolean, msg: Output): Output.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Output, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Output;
        static deserializeBinaryFromReader(message: Output, reader: jspb.BinaryReader): Output;
    }

    export namespace Output {
        export type AsObject = {
            data?: google_protobuf_any_pb.Any.AsObject,
        }
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


    export class Output extends jspb.Message { 

        hasData(): boolean;
        clearData(): void;
        getData(): google_protobuf_any_pb.Any | undefined;
        setData(value?: google_protobuf_any_pb.Any): Output;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Output.AsObject;
        static toObject(includeInstance: boolean, msg: Output): Output.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Output, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Output;
        static deserializeBinaryFromReader(message: Output, reader: jspb.BinaryReader): Output;
    }

    export namespace Output {
        export type AsObject = {
            data?: google_protobuf_any_pb.Any.AsObject,
        }
    }

}

export class CustomCodeNode extends jspb.Message { 
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

export namespace CustomCodeNode {
    export type AsObject = {
        lang: CustomCodeLang,
        source: string,
    }


    export class Output extends jspb.Message { 

        hasData(): boolean;
        clearData(): void;
        getData(): google_protobuf_any_pb.Any | undefined;
        setData(value?: google_protobuf_any_pb.Any): Output;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Output.AsObject;
        static toObject(includeInstance: boolean, msg: Output): Output.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Output, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Output;
        static deserializeBinaryFromReader(message: Output, reader: jspb.BinaryReader): Output;
    }

    export namespace Output {
        export type AsObject = {
            data?: google_protobuf_any_pb.Any.AsObject,
        }
    }

}

export class Condition extends jspb.Message { 
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

export namespace Condition {
    export type AsObject = {
        id: string,
        type: string,
        expression: string,
    }
}

export class BranchNode extends jspb.Message { 
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

export namespace BranchNode {
    export type AsObject = {
        conditionsList: Array<Condition.AsObject>,
    }


    export class Output extends jspb.Message { 
        getConditionId(): string;
        setConditionId(value: string): Output;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Output.AsObject;
        static toObject(includeInstance: boolean, msg: Output): Output.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Output, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Output;
        static deserializeBinaryFromReader(message: Output, reader: jspb.BinaryReader): Output;
    }

    export namespace Output {
        export type AsObject = {
            conditionId: string,
        }
    }

}

export class FilterNode extends jspb.Message { 
    getExpression(): string;
    setExpression(value: string): FilterNode;
    getInput(): string;
    setInput(value: string): FilterNode;

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
        input: string,
    }


    export class Output extends jspb.Message { 

        hasData(): boolean;
        clearData(): void;
        getData(): google_protobuf_any_pb.Any | undefined;
        setData(value?: google_protobuf_any_pb.Any): Output;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Output.AsObject;
        static toObject(includeInstance: boolean, msg: Output): Output.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Output, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Output;
        static deserializeBinaryFromReader(message: Output, reader: jspb.BinaryReader): Output;
    }

    export namespace Output {
        export type AsObject = {
            data?: google_protobuf_any_pb.Any.AsObject,
        }
    }

}

export class LoopNode extends jspb.Message { 
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
    getContractWrite(): ContractWriteNode | undefined;
    setContractWrite(value?: ContractWriteNode): LoopNode;

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

export namespace LoopNode {
    export type AsObject = {
        input: string,
        iterVal: string,
        iterKey: string,
        ethTransfer?: ETHTransferNode.AsObject,
        contractWrite?: ContractWriteNode.AsObject,
        contractRead?: ContractReadNode.AsObject,
        graphqlDataQuery?: GraphQLQueryNode.AsObject,
        restApi?: RestAPINode.AsObject,
        customCode?: CustomCodeNode.AsObject,
    }


    export class Output extends jspb.Message { 
        getData(): string;
        setData(value: string): Output;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Output.AsObject;
        static toObject(includeInstance: boolean, msg: Output): Output.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Output, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Output;
        static deserializeBinaryFromReader(message: Output, reader: jspb.BinaryReader): Output;
    }

    export namespace Output {
        export type AsObject = {
            data: string,
        }
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

    hasGraphqlQuery(): boolean;
    clearGraphqlQuery(): void;
    getGraphqlQuery(): GraphQLQueryNode | undefined;
    setGraphqlQuery(value?: GraphQLQueryNode): TaskNode;

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

export namespace TaskNode {
    export type AsObject = {
        id: string,
        name: string,
        ethTransfer?: ETHTransferNode.AsObject,
        contractWrite?: ContractWriteNode.AsObject,
        contractRead?: ContractReadNode.AsObject,
        graphqlQuery?: GraphQLQueryNode.AsObject,
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
        GRAPHQL_QUERY = 13,
        REST_API = 14,
        BRANCH = 15,
        FILTER = 16,
        LOOP = 17,
        CUSTOM_CODE = 18,
    }

}

export class Execution extends jspb.Message { 
    getId(): string;
    setId(value: string): Execution;
    getStartAt(): number;
    setStartAt(value: number): Execution;
    getEndAt(): number;
    setEndAt(value: number): Execution;
    getSuccess(): boolean;
    setSuccess(value: boolean): Execution;
    getError(): string;
    setError(value: string): Execution;

    hasReason(): boolean;
    clearReason(): void;
    getReason(): TriggerReason | undefined;
    setReason(value?: TriggerReason): Execution;
    clearStepsList(): void;
    getStepsList(): Array<Execution.Step>;
    setStepsList(value: Array<Execution.Step>): Execution;
    addSteps(value?: Execution.Step, index?: number): Execution.Step;
    getTriggerName(): string;
    setTriggerName(value: string): Execution;

    hasTransferLog(): boolean;
    clearTransferLog(): void;
    getTransferLog(): Execution.TransferLogOutput | undefined;
    setTransferLog(value?: Execution.TransferLogOutput): Execution;

    hasEvmLog(): boolean;
    clearEvmLog(): void;
    getEvmLog(): Evm.Log | undefined;
    setEvmLog(value?: Evm.Log): Execution;

    hasBlock(): boolean;
    clearBlock(): void;
    getBlock(): Execution.BlockOutput | undefined;
    setBlock(value?: Execution.BlockOutput): Execution;

    hasTime(): boolean;
    clearTime(): void;
    getTime(): Execution.TimeOutput | undefined;
    setTime(value?: Execution.TimeOutput): Execution;

    getOutputDataCase(): Execution.OutputDataCase;

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
        id: string,
        startAt: number,
        endAt: number,
        success: boolean,
        error: string,
        reason?: TriggerReason.AsObject,
        stepsList: Array<Execution.Step.AsObject>,
        triggerName: string,
        transferLog?: Execution.TransferLogOutput.AsObject,
        evmLog?: Evm.Log.AsObject,
        block?: Execution.BlockOutput.AsObject,
        time?: Execution.TimeOutput.AsObject,
    }


    export class Step extends jspb.Message { 
        getNodeId(): string;
        setNodeId(value: string): Step;
        getSuccess(): boolean;
        setSuccess(value: boolean): Step;

        hasEthTransfer(): boolean;
        clearEthTransfer(): void;
        getEthTransfer(): ETHTransferNode.Output | undefined;
        setEthTransfer(value?: ETHTransferNode.Output): Step;

        hasGraphql(): boolean;
        clearGraphql(): void;
        getGraphql(): GraphQLQueryNode.Output | undefined;
        setGraphql(value?: GraphQLQueryNode.Output): Step;

        hasContractRead(): boolean;
        clearContractRead(): void;
        getContractRead(): ContractReadNode.Output | undefined;
        setContractRead(value?: ContractReadNode.Output): Step;

        hasContractWrite(): boolean;
        clearContractWrite(): void;
        getContractWrite(): ContractWriteNode.Output | undefined;
        setContractWrite(value?: ContractWriteNode.Output): Step;

        hasCustomCode(): boolean;
        clearCustomCode(): void;
        getCustomCode(): CustomCodeNode.Output | undefined;
        setCustomCode(value?: CustomCodeNode.Output): Step;

        hasRestApi(): boolean;
        clearRestApi(): void;
        getRestApi(): RestAPINode.Output | undefined;
        setRestApi(value?: RestAPINode.Output): Step;

        hasBranch(): boolean;
        clearBranch(): void;
        getBranch(): BranchNode.Output | undefined;
        setBranch(value?: BranchNode.Output): Step;

        hasFilter(): boolean;
        clearFilter(): void;
        getFilter(): FilterNode.Output | undefined;
        setFilter(value?: FilterNode.Output): Step;

        hasLoop(): boolean;
        clearLoop(): void;
        getLoop(): LoopNode.Output | undefined;
        setLoop(value?: LoopNode.Output): Step;
        getLog(): string;
        setLog(value: string): Step;
        getError(): string;
        setError(value: string): Step;
        getStartAt(): number;
        setStartAt(value: number): Step;
        getEndAt(): number;
        setEndAt(value: number): Step;
        clearInputsList(): void;
        getInputsList(): Array<string>;
        setInputsList(value: Array<string>): Step;
        addInputs(value: string, index?: number): string;

        getOutputDataCase(): Step.OutputDataCase;

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
            ethTransfer?: ETHTransferNode.Output.AsObject,
            graphql?: GraphQLQueryNode.Output.AsObject,
            contractRead?: ContractReadNode.Output.AsObject,
            contractWrite?: ContractWriteNode.Output.AsObject,
            customCode?: CustomCodeNode.Output.AsObject,
            restApi?: RestAPINode.Output.AsObject,
            branch?: BranchNode.Output.AsObject,
            filter?: FilterNode.Output.AsObject,
            loop?: LoopNode.Output.AsObject,
            log: string,
            error: string,
            startAt: number,
            endAt: number,
            inputsList: Array<string>,
        }

        export enum OutputDataCase {
            OUTPUT_DATA_NOT_SET = 0,
            ETH_TRANSFER = 3,
            GRAPHQL = 4,
            CONTRACT_READ = 5,
            CONTRACT_WRITE = 6,
            CUSTOM_CODE = 7,
            REST_API = 8,
            BRANCH = 9,
            FILTER = 10,
            LOOP = 11,
        }

    }

    export class TransferLogOutput extends jspb.Message { 
        getTokenName(): string;
        setTokenName(value: string): TransferLogOutput;
        getTokenSymbol(): string;
        setTokenSymbol(value: string): TransferLogOutput;
        getTokenDecimals(): number;
        setTokenDecimals(value: number): TransferLogOutput;
        getTransactionHash(): string;
        setTransactionHash(value: string): TransferLogOutput;
        getAddress(): string;
        setAddress(value: string): TransferLogOutput;
        getBlockNumber(): number;
        setBlockNumber(value: number): TransferLogOutput;
        getBlockTimestamp(): number;
        setBlockTimestamp(value: number): TransferLogOutput;
        getFromAddress(): string;
        setFromAddress(value: string): TransferLogOutput;
        getToAddress(): string;
        setToAddress(value: string): TransferLogOutput;
        getValue(): string;
        setValue(value: string): TransferLogOutput;
        getValueFormatted(): string;
        setValueFormatted(value: string): TransferLogOutput;
        getTransactionIndex(): number;
        setTransactionIndex(value: number): TransferLogOutput;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): TransferLogOutput.AsObject;
        static toObject(includeInstance: boolean, msg: TransferLogOutput): TransferLogOutput.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: TransferLogOutput, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): TransferLogOutput;
        static deserializeBinaryFromReader(message: TransferLogOutput, reader: jspb.BinaryReader): TransferLogOutput;
    }

    export namespace TransferLogOutput {
        export type AsObject = {
            tokenName: string,
            tokenSymbol: string,
            tokenDecimals: number,
            transactionHash: string,
            address: string,
            blockNumber: number,
            blockTimestamp: number,
            fromAddress: string,
            toAddress: string,
            value: string,
            valueFormatted: string,
            transactionIndex: number,
        }
    }

    export class BlockOutput extends jspb.Message { 
        getBlockNumber(): number;
        setBlockNumber(value: number): BlockOutput;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): BlockOutput.AsObject;
        static toObject(includeInstance: boolean, msg: BlockOutput): BlockOutput.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: BlockOutput, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): BlockOutput;
        static deserializeBinaryFromReader(message: BlockOutput, reader: jspb.BinaryReader): BlockOutput;
    }

    export namespace BlockOutput {
        export type AsObject = {
            blockNumber: number,
        }
    }

    export class TimeOutput extends jspb.Message { 
        getEpoch(): number;
        setEpoch(value: number): TimeOutput;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): TimeOutput.AsObject;
        static toObject(includeInstance: boolean, msg: TimeOutput): TimeOutput.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: TimeOutput, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): TimeOutput;
        static deserializeBinaryFromReader(message: TimeOutput, reader: jspb.BinaryReader): TimeOutput;
    }

    export namespace TimeOutput {
        export type AsObject = {
            epoch: number,
        }
    }


    export enum OutputDataCase {
        OUTPUT_DATA_NOT_SET = 0,
        TRANSFER_LOG = 10,
        EVM_LOG = 11,
        BLOCK = 12,
        TIME = 13,
    }

}

export class Task extends jspb.Message { 
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
    getName(): string;
    setName(value: string): Task;
    getCompletedAt(): number;
    setCompletedAt(value: number): Task;
    getMaxExecution(): number;
    setMaxExecution(value: number): Task;
    getExecutionCount(): number;
    setExecutionCount(value: number): Task;
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

export namespace Task {
    export type AsObject = {
        id: string,
        owner: string,
        smartWalletAddress: string,
        startAt: number,
        expiredAt: number,
        name: string,
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

export class CreateTaskReq extends jspb.Message { 

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
    getName(): string;
    setName(value: string): CreateTaskReq;
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
        maxExecution: number,
        smartWalletAddress: string,
        name: string,
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

export class ListWalletReq extends jspb.Message { 
    getFactoryAddress(): string;
    setFactoryAddress(value: string): ListWalletReq;
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

export namespace ListWalletReq {
    export type AsObject = {
        factoryAddress: string,
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

export class ListWalletResp extends jspb.Message { 
    clearItemsList(): void;
    getItemsList(): Array<SmartWallet>;
    setItemsList(value: Array<SmartWallet>): ListWalletResp;
    addItems(value?: SmartWallet, index?: number): SmartWallet;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListWalletResp.AsObject;
    static toObject(includeInstance: boolean, msg: ListWalletResp): ListWalletResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListWalletResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListWalletResp;
    static deserializeBinaryFromReader(message: ListWalletResp, reader: jspb.BinaryReader): ListWalletResp;
}

export namespace ListWalletResp {
    export type AsObject = {
        itemsList: Array<SmartWallet.AsObject>,
    }
}

export class ListTasksReq extends jspb.Message { 
    clearSmartWalletAddressList(): void;
    getSmartWalletAddressList(): Array<string>;
    setSmartWalletAddressList(value: Array<string>): ListTasksReq;
    addSmartWalletAddress(value: string, index?: number): string;
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

export namespace ListTasksReq {
    export type AsObject = {
        smartWalletAddressList: Array<string>,
        cursor: string,
        itemPerPage: number,
    }
}

export class ListTasksResp extends jspb.Message { 
    clearItemsList(): void;
    getItemsList(): Array<ListTasksResp.Item>;
    setItemsList(value: Array<ListTasksResp.Item>): ListTasksResp;
    addItems(value?: ListTasksResp.Item, index?: number): ListTasksResp.Item;
    getCursor(): string;
    setCursor(value: string): ListTasksResp;
    getHasMore(): boolean;
    setHasMore(value: boolean): ListTasksResp;

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
        itemsList: Array<ListTasksResp.Item.AsObject>,
        cursor: string,
        hasMore: boolean,
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
        getName(): string;
        setName(value: string): Item;
        getCompletedAt(): number;
        setCompletedAt(value: number): Item;
        getMaxExecution(): number;
        setMaxExecution(value: number): Item;
        getExecutionCount(): number;
        setExecutionCount(value: number): Item;
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
            name: string,
            completedAt: number,
            maxExecution: number,
            totalExecution: number,
            lastRanAt: number,
            status: TaskStatus,
            trigger?: TaskTrigger.AsObject,
        }
    }

}

export class ListExecutionsReq extends jspb.Message { 
    clearTaskIdsList(): void;
    getTaskIdsList(): Array<string>;
    setTaskIdsList(value: Array<string>): ListExecutionsReq;
    addTaskIds(value: string, index?: number): string;
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

export namespace ListExecutionsReq {
    export type AsObject = {
        taskIdsList: Array<string>,
        cursor: string,
        itemPerPage: number,
    }
}

export class ListExecutionsResp extends jspb.Message { 
    clearItemsList(): void;
    getItemsList(): Array<Execution>;
    setItemsList(value: Array<Execution>): ListExecutionsResp;
    addItems(value?: Execution, index?: number): Execution;
    getCursor(): string;
    setCursor(value: string): ListExecutionsResp;
    getHasMore(): boolean;
    setHasMore(value: boolean): ListExecutionsResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListExecutionsResp.AsObject;
    static toObject(includeInstance: boolean, msg: ListExecutionsResp): ListExecutionsResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListExecutionsResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListExecutionsResp;
    static deserializeBinaryFromReader(message: ListExecutionsResp, reader: jspb.BinaryReader): ListExecutionsResp;
}

export namespace ListExecutionsResp {
    export type AsObject = {
        itemsList: Array<Execution.AsObject>,
        cursor: string,
        hasMore: boolean,
    }
}

export class ExecutionReq extends jspb.Message { 
    getTaskId(): string;
    setTaskId(value: string): ExecutionReq;
    getExecutionId(): string;
    setExecutionId(value: string): ExecutionReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExecutionReq.AsObject;
    static toObject(includeInstance: boolean, msg: ExecutionReq): ExecutionReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExecutionReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExecutionReq;
    static deserializeBinaryFromReader(message: ExecutionReq, reader: jspb.BinaryReader): ExecutionReq;
}

export namespace ExecutionReq {
    export type AsObject = {
        taskId: string,
        executionId: string,
    }
}

export class ExecutionStatusResp extends jspb.Message { 
    getStatus(): ExecutionStatus;
    setStatus(value: ExecutionStatus): ExecutionStatusResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExecutionStatusResp.AsObject;
    static toObject(includeInstance: boolean, msg: ExecutionStatusResp): ExecutionStatusResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExecutionStatusResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExecutionStatusResp;
    static deserializeBinaryFromReader(message: ExecutionStatusResp, reader: jspb.BinaryReader): ExecutionStatusResp;
}

export namespace ExecutionStatusResp {
    export type AsObject = {
        status: ExecutionStatus,
    }
}

export class GetKeyReq extends jspb.Message { 
    getOwner(): string;
    setOwner(value: string): GetKeyReq;
    getChainId(): number;
    setChainId(value: number): GetKeyReq;

    hasIssuedAt(): boolean;
    clearIssuedAt(): void;
    getIssuedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setIssuedAt(value?: google_protobuf_timestamp_pb.Timestamp): GetKeyReq;

    hasExpiredAt(): boolean;
    clearExpiredAt(): void;
    getExpiredAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setExpiredAt(value?: google_protobuf_timestamp_pb.Timestamp): GetKeyReq;
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
        chainId: number,
        issuedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        expiredAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
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

export class TriggerReason extends jspb.Message { 
    getBlockNumber(): number;
    setBlockNumber(value: number): TriggerReason;
    getLogIndex(): number;
    setLogIndex(value: number): TriggerReason;
    getTxHash(): string;
    setTxHash(value: string): TriggerReason;
    getEpoch(): number;
    setEpoch(value: number): TriggerReason;
    getType(): TriggerReason.TriggerType;
    setType(value: TriggerReason.TriggerType): TriggerReason;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TriggerReason.AsObject;
    static toObject(includeInstance: boolean, msg: TriggerReason): TriggerReason.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TriggerReason, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TriggerReason;
    static deserializeBinaryFromReader(message: TriggerReason, reader: jspb.BinaryReader): TriggerReason;
}

export namespace TriggerReason {
    export type AsObject = {
        blockNumber: number,
        logIndex: number,
        txHash: string,
        epoch: number,
        type: TriggerReason.TriggerType,
    }

    export enum TriggerType {
    UNSET = 0,
    MANUAL = 2,
    FIXEDTIME = 3,
    CRON = 4,
    BLOCK = 5,
    EVENT = 6,
    }

}

export class GetWalletReq extends jspb.Message { 
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

export namespace GetWalletReq {
    export type AsObject = {
        salt: string,
        factoryAddress: string,
    }
}

export class GetWalletResp extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): GetWalletResp;
    getSalt(): string;
    setSalt(value: string): GetWalletResp;
    getFactoryAddress(): string;
    setFactoryAddress(value: string): GetWalletResp;
    getTotalTaskCount(): number;
    setTotalTaskCount(value: number): GetWalletResp;
    getActiveTaskCount(): number;
    setActiveTaskCount(value: number): GetWalletResp;
    getCompletedTaskCount(): number;
    setCompletedTaskCount(value: number): GetWalletResp;
    getFailedTaskCount(): number;
    setFailedTaskCount(value: number): GetWalletResp;
    getCanceledTaskCount(): number;
    setCanceledTaskCount(value: number): GetWalletResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetWalletResp.AsObject;
    static toObject(includeInstance: boolean, msg: GetWalletResp): GetWalletResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetWalletResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetWalletResp;
    static deserializeBinaryFromReader(message: GetWalletResp, reader: jspb.BinaryReader): GetWalletResp;
}

export namespace GetWalletResp {
    export type AsObject = {
        address: string,
        salt: string,
        factoryAddress: string,
        totalTaskCount: number,
        activeTaskCount: number,
        completedTaskCount: number,
        failedTaskCount: number,
        canceledTaskCount: number,
    }
}

export class UserTriggerTaskReq extends jspb.Message { 
    getTaskId(): string;
    setTaskId(value: string): UserTriggerTaskReq;

    hasReason(): boolean;
    clearReason(): void;
    getReason(): TriggerReason | undefined;
    setReason(value?: TriggerReason): UserTriggerTaskReq;
    getIsBlocking(): boolean;
    setIsBlocking(value: boolean): UserTriggerTaskReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserTriggerTaskReq.AsObject;
    static toObject(includeInstance: boolean, msg: UserTriggerTaskReq): UserTriggerTaskReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserTriggerTaskReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserTriggerTaskReq;
    static deserializeBinaryFromReader(message: UserTriggerTaskReq, reader: jspb.BinaryReader): UserTriggerTaskReq;
}

export namespace UserTriggerTaskReq {
    export type AsObject = {
        taskId: string,
        reason?: TriggerReason.AsObject,
        isBlocking: boolean,
    }
}

export class UserTriggerTaskResp extends jspb.Message { 
    getExecutionId(): string;
    setExecutionId(value: string): UserTriggerTaskResp;
    getStatus(): ExecutionStatus;
    setStatus(value: ExecutionStatus): UserTriggerTaskResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserTriggerTaskResp.AsObject;
    static toObject(includeInstance: boolean, msg: UserTriggerTaskResp): UserTriggerTaskResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserTriggerTaskResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserTriggerTaskResp;
    static deserializeBinaryFromReader(message: UserTriggerTaskResp, reader: jspb.BinaryReader): UserTriggerTaskResp;
}

export namespace UserTriggerTaskResp {
    export type AsObject = {
        executionId: string,
        status: ExecutionStatus,
    }
}

export class CreateOrUpdateSecretReq extends jspb.Message { 
    getName(): string;
    setName(value: string): CreateOrUpdateSecretReq;
    getSecret(): string;
    setSecret(value: string): CreateOrUpdateSecretReq;
    getWorkflowId(): string;
    setWorkflowId(value: string): CreateOrUpdateSecretReq;
    getOrgId(): string;
    setOrgId(value: string): CreateOrUpdateSecretReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateOrUpdateSecretReq.AsObject;
    static toObject(includeInstance: boolean, msg: CreateOrUpdateSecretReq): CreateOrUpdateSecretReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateOrUpdateSecretReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateOrUpdateSecretReq;
    static deserializeBinaryFromReader(message: CreateOrUpdateSecretReq, reader: jspb.BinaryReader): CreateOrUpdateSecretReq;
}

export namespace CreateOrUpdateSecretReq {
    export type AsObject = {
        name: string,
        secret: string,
        workflowId: string,
        orgId: string,
    }
}

export class ListSecretsReq extends jspb.Message { 
    getWorkflowId(): string;
    setWorkflowId(value: string): ListSecretsReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListSecretsReq.AsObject;
    static toObject(includeInstance: boolean, msg: ListSecretsReq): ListSecretsReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListSecretsReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListSecretsReq;
    static deserializeBinaryFromReader(message: ListSecretsReq, reader: jspb.BinaryReader): ListSecretsReq;
}

export namespace ListSecretsReq {
    export type AsObject = {
        workflowId: string,
    }
}

export class ListSecretsResp extends jspb.Message { 
    clearItemsList(): void;
    getItemsList(): Array<ListSecretsResp.ResponseSecret>;
    setItemsList(value: Array<ListSecretsResp.ResponseSecret>): ListSecretsResp;
    addItems(value?: ListSecretsResp.ResponseSecret, index?: number): ListSecretsResp.ResponseSecret;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListSecretsResp.AsObject;
    static toObject(includeInstance: boolean, msg: ListSecretsResp): ListSecretsResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListSecretsResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListSecretsResp;
    static deserializeBinaryFromReader(message: ListSecretsResp, reader: jspb.BinaryReader): ListSecretsResp;
}

export namespace ListSecretsResp {
    export type AsObject = {
        itemsList: Array<ListSecretsResp.ResponseSecret.AsObject>,
    }


    export class ResponseSecret extends jspb.Message { 
        getName(): string;
        setName(value: string): ResponseSecret;
        getScope(): string;
        setScope(value: string): ResponseSecret;
        getWorkflowId(): string;
        setWorkflowId(value: string): ResponseSecret;
        getOrgId(): string;
        setOrgId(value: string): ResponseSecret;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): ResponseSecret.AsObject;
        static toObject(includeInstance: boolean, msg: ResponseSecret): ResponseSecret.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: ResponseSecret, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): ResponseSecret;
        static deserializeBinaryFromReader(message: ResponseSecret, reader: jspb.BinaryReader): ResponseSecret;
    }

    export namespace ResponseSecret {
        export type AsObject = {
            name: string,
            scope: string,
            workflowId: string,
            orgId: string,
        }
    }

}

export class DeleteSecretReq extends jspb.Message { 
    getName(): string;
    setName(value: string): DeleteSecretReq;
    getWorkflowId(): string;
    setWorkflowId(value: string): DeleteSecretReq;
    getOrgId(): string;
    setOrgId(value: string): DeleteSecretReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteSecretReq.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteSecretReq): DeleteSecretReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteSecretReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteSecretReq;
    static deserializeBinaryFromReader(message: DeleteSecretReq, reader: jspb.BinaryReader): DeleteSecretReq;
}

export namespace DeleteSecretReq {
    export type AsObject = {
        name: string,
        workflowId: string,
        orgId: string,
    }
}

export class GetWorkflowCountReq extends jspb.Message { 
    clearAddressesList(): void;
    getAddressesList(): Array<string>;
    setAddressesList(value: Array<string>): GetWorkflowCountReq;
    addAddresses(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetWorkflowCountReq.AsObject;
    static toObject(includeInstance: boolean, msg: GetWorkflowCountReq): GetWorkflowCountReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetWorkflowCountReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetWorkflowCountReq;
    static deserializeBinaryFromReader(message: GetWorkflowCountReq, reader: jspb.BinaryReader): GetWorkflowCountReq;
}

export namespace GetWorkflowCountReq {
    export type AsObject = {
        addressesList: Array<string>,
    }
}

export class GetWorkflowCountResp extends jspb.Message { 
    getTotal(): number;
    setTotal(value: number): GetWorkflowCountResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetWorkflowCountResp.AsObject;
    static toObject(includeInstance: boolean, msg: GetWorkflowCountResp): GetWorkflowCountResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetWorkflowCountResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetWorkflowCountResp;
    static deserializeBinaryFromReader(message: GetWorkflowCountResp, reader: jspb.BinaryReader): GetWorkflowCountResp;
}

export namespace GetWorkflowCountResp {
    export type AsObject = {
        total: number,
    }
}

export class GetExecutionCountReq extends jspb.Message { 
    clearWorkflowIdsList(): void;
    getWorkflowIdsList(): Array<string>;
    setWorkflowIdsList(value: Array<string>): GetExecutionCountReq;
    addWorkflowIds(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetExecutionCountReq.AsObject;
    static toObject(includeInstance: boolean, msg: GetExecutionCountReq): GetExecutionCountReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetExecutionCountReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetExecutionCountReq;
    static deserializeBinaryFromReader(message: GetExecutionCountReq, reader: jspb.BinaryReader): GetExecutionCountReq;
}

export namespace GetExecutionCountReq {
    export type AsObject = {
        workflowIdsList: Array<string>,
    }
}

export class GetExecutionCountResp extends jspb.Message { 
    getTotal(): number;
    setTotal(value: number): GetExecutionCountResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetExecutionCountResp.AsObject;
    static toObject(includeInstance: boolean, msg: GetExecutionCountResp): GetExecutionCountResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetExecutionCountResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetExecutionCountResp;
    static deserializeBinaryFromReader(message: GetExecutionCountResp, reader: jspb.BinaryReader): GetExecutionCountResp;
}

export namespace GetExecutionCountResp {
    export type AsObject = {
        total: number,
    }
}

export class Evm extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Evm.AsObject;
    static toObject(includeInstance: boolean, msg: Evm): Evm.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Evm, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Evm;
    static deserializeBinaryFromReader(message: Evm, reader: jspb.BinaryReader): Evm;
}

export namespace Evm {
    export type AsObject = {
    }


    export class Log extends jspb.Message { 
        getAddress(): string;
        setAddress(value: string): Log;
        clearTopicsList(): void;
        getTopicsList(): Array<string>;
        setTopicsList(value: Array<string>): Log;
        addTopics(value: string, index?: number): string;
        getData(): string;
        setData(value: string): Log;
        getBlockNumber(): number;
        setBlockNumber(value: number): Log;
        getTransactionHash(): string;
        setTransactionHash(value: string): Log;
        getTransactionIndex(): number;
        setTransactionIndex(value: number): Log;
        getBlockHash(): string;
        setBlockHash(value: string): Log;
        getIndex(): number;
        setIndex(value: number): Log;
        getRemoved(): boolean;
        setRemoved(value: boolean): Log;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Log.AsObject;
        static toObject(includeInstance: boolean, msg: Log): Log.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Log, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Log;
        static deserializeBinaryFromReader(message: Log, reader: jspb.BinaryReader): Log;
    }

    export namespace Log {
        export type AsObject = {
            address: string,
            topicsList: Array<string>,
            data: string,
            blockNumber: number,
            transactionHash: string,
            transactionIndex: number,
            blockHash: string,
            index: number,
            removed: boolean,
        }
    }

    export class TransactionReceipt extends jspb.Message { 
        getHash(): string;
        setHash(value: string): TransactionReceipt;
        getBlockHash(): string;
        setBlockHash(value: string): TransactionReceipt;
        getBlockNumber(): number;
        setBlockNumber(value: number): TransactionReceipt;
        getFrom(): string;
        setFrom(value: string): TransactionReceipt;
        getGasUsed(): number;
        setGasUsed(value: number): TransactionReceipt;
        getGasPrice(): number;
        setGasPrice(value: number): TransactionReceipt;
        getCumulativeGasUsed(): number;
        setCumulativeGasUsed(value: number): TransactionReceipt;
        getFee(): number;
        setFee(value: number): TransactionReceipt;
        getContractAddress(): string;
        setContractAddress(value: string): TransactionReceipt;
        getIndex(): number;
        setIndex(value: number): TransactionReceipt;
        clearLogsList(): void;
        getLogsList(): Array<string>;
        setLogsList(value: Array<string>): TransactionReceipt;
        addLogs(value: string, index?: number): string;
        getLogsBloom(): string;
        setLogsBloom(value: string): TransactionReceipt;
        getRoot(): string;
        setRoot(value: string): TransactionReceipt;
        getStatus(): number;
        setStatus(value: number): TransactionReceipt;
        getType(): number;
        setType(value: number): TransactionReceipt;
        getBlobGasPrice(): number;
        setBlobGasPrice(value: number): TransactionReceipt;
        getBlobGasUsed(): number;
        setBlobGasUsed(value: number): TransactionReceipt;
        getTo(): string;
        setTo(value: string): TransactionReceipt;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): TransactionReceipt.AsObject;
        static toObject(includeInstance: boolean, msg: TransactionReceipt): TransactionReceipt.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: TransactionReceipt, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): TransactionReceipt;
        static deserializeBinaryFromReader(message: TransactionReceipt, reader: jspb.BinaryReader): TransactionReceipt;
    }

    export namespace TransactionReceipt {
        export type AsObject = {
            hash: string,
            blockHash: string,
            blockNumber: number,
            from: string,
            gasUsed: number,
            gasPrice: number,
            cumulativeGasUsed: number,
            fee: number,
            contractAddress: string,
            index: number,
            logsList: Array<string>,
            logsBloom: string,
            root: string,
            status: number,
            type: number,
            blobGasPrice: number,
            blobGasUsed: number,
            to: string,
        }
    }

    export class UserOp extends jspb.Message { 
        getSender(): string;
        setSender(value: string): UserOp;
        getNonce(): string;
        setNonce(value: string): UserOp;
        getInitCode(): string;
        setInitCode(value: string): UserOp;
        getCallData(): string;
        setCallData(value: string): UserOp;
        getCallGasLimit(): string;
        setCallGasLimit(value: string): UserOp;
        getVerificationGasLimit(): string;
        setVerificationGasLimit(value: string): UserOp;
        getPreVerificationGas(): string;
        setPreVerificationGas(value: string): UserOp;
        getMaxFeePerGas(): string;
        setMaxFeePerGas(value: string): UserOp;
        getMaxPriorityFeePerGas(): string;
        setMaxPriorityFeePerGas(value: string): UserOp;
        getPaymasterAndData(): string;
        setPaymasterAndData(value: string): UserOp;
        getSignature(): string;
        setSignature(value: string): UserOp;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): UserOp.AsObject;
        static toObject(includeInstance: boolean, msg: UserOp): UserOp.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: UserOp, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): UserOp;
        static deserializeBinaryFromReader(message: UserOp, reader: jspb.BinaryReader): UserOp;
    }

    export namespace UserOp {
        export type AsObject = {
            sender: string,
            nonce: string,
            initCode: string,
            callData: string,
            callGasLimit: string,
            verificationGasLimit: string,
            preVerificationGas: string,
            maxFeePerGas: string,
            maxPriorityFeePerGas: string,
            paymasterAndData: string,
            signature: string,
        }
    }

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
    TASKTRIGGERERROR = 7003,
}

export enum TaskStatus {
    ACTIVE = 0,
    COMPLETED = 1,
    FAILED = 2,
    CANCELED = 3,
    EXECUTING = 4,
}

export enum ExecutionStatus {
    QUEUED = 0,
    FINISHED = 2,
}

export enum CustomCodeLang {
    JAVASCRIPT = 0,
}
