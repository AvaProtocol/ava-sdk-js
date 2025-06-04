// package: aggregator
// file: avs.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";

export class TokenMetadata extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): TokenMetadata;
    getName(): string;
    setName(value: string): TokenMetadata;
    getSymbol(): string;
    setSymbol(value: string): TokenMetadata;
    getDecimals(): number;
    setDecimals(value: number): TokenMetadata;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TokenMetadata.AsObject;
    static toObject(includeInstance: boolean, msg: TokenMetadata): TokenMetadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TokenMetadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TokenMetadata;
    static deserializeBinaryFromReader(message: TokenMetadata, reader: jspb.BinaryReader): TokenMetadata;
}

export namespace TokenMetadata {
    export type AsObject = {
        address: string,
        name: string,
        symbol: string,
        decimals: number,
    }
}

export class GetTokenMetadataReq extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): GetTokenMetadataReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTokenMetadataReq.AsObject;
    static toObject(includeInstance: boolean, msg: GetTokenMetadataReq): GetTokenMetadataReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTokenMetadataReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTokenMetadataReq;
    static deserializeBinaryFromReader(message: GetTokenMetadataReq, reader: jspb.BinaryReader): GetTokenMetadataReq;
}

export namespace GetTokenMetadataReq {
    export type AsObject = {
        address: string,
    }
}

export class GetTokenMetadataResp extends jspb.Message { 

    hasToken(): boolean;
    clearToken(): void;
    getToken(): TokenMetadata | undefined;
    setToken(value?: TokenMetadata): GetTokenMetadataResp;
    getFound(): boolean;
    setFound(value: boolean): GetTokenMetadataResp;
    getSource(): string;
    setSource(value: string): GetTokenMetadataResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTokenMetadataResp.AsObject;
    static toObject(includeInstance: boolean, msg: GetTokenMetadataResp): GetTokenMetadataResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTokenMetadataResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTokenMetadataResp;
    static deserializeBinaryFromReader(message: GetTokenMetadataResp, reader: jspb.BinaryReader): GetTokenMetadataResp;
}

export namespace GetTokenMetadataResp {
    export type AsObject = {
        token?: TokenMetadata.AsObject,
        found: boolean,
        source: string,
    }
}

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

export class FixedTimeTrigger extends jspb.Message { 

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): FixedTimeTrigger.Config | undefined;
    setConfig(value?: FixedTimeTrigger.Config): FixedTimeTrigger;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FixedTimeTrigger.AsObject;
    static toObject(includeInstance: boolean, msg: FixedTimeTrigger): FixedTimeTrigger.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FixedTimeTrigger, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FixedTimeTrigger;
    static deserializeBinaryFromReader(message: FixedTimeTrigger, reader: jspb.BinaryReader): FixedTimeTrigger;
}

export namespace FixedTimeTrigger {
    export type AsObject = {
        config?: FixedTimeTrigger.Config.AsObject,
    }


    export class Config extends jspb.Message { 
        clearEpochsList(): void;
        getEpochsList(): Array<number>;
        setEpochsList(value: Array<number>): Config;
        addEpochs(value: number, index?: number): number;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Config.AsObject;
        static toObject(includeInstance: boolean, msg: Config): Config.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Config, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Config;
        static deserializeBinaryFromReader(message: Config, reader: jspb.BinaryReader): Config;
    }

    export namespace Config {
        export type AsObject = {
            epochsList: Array<number>,
        }
    }

    export class Output extends jspb.Message { 
        getTimestamp(): number;
        setTimestamp(value: number): Output;
        getTimestampIso(): string;
        setTimestampIso(value: string): Output;

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
            timestamp: number,
            timestampIso: string,
        }
    }

}

export class CronTrigger extends jspb.Message { 

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): CronTrigger.Config | undefined;
    setConfig(value?: CronTrigger.Config): CronTrigger;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CronTrigger.AsObject;
    static toObject(includeInstance: boolean, msg: CronTrigger): CronTrigger.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CronTrigger, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CronTrigger;
    static deserializeBinaryFromReader(message: CronTrigger, reader: jspb.BinaryReader): CronTrigger;
}

export namespace CronTrigger {
    export type AsObject = {
        config?: CronTrigger.Config.AsObject,
    }


    export class Config extends jspb.Message { 
        clearScheduleList(): void;
        getScheduleList(): Array<string>;
        setScheduleList(value: Array<string>): Config;
        addSchedule(value: string, index?: number): string;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Config.AsObject;
        static toObject(includeInstance: boolean, msg: Config): Config.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Config, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Config;
        static deserializeBinaryFromReader(message: Config, reader: jspb.BinaryReader): Config;
    }

    export namespace Config {
        export type AsObject = {
            scheduleList: Array<string>,
        }
    }

    export class Output extends jspb.Message { 
        getTimestamp(): number;
        setTimestamp(value: number): Output;
        getTimestampIso(): string;
        setTimestampIso(value: string): Output;

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
            timestamp: number,
            timestampIso: string,
        }
    }

}

export class BlockTrigger extends jspb.Message { 

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): BlockTrigger.Config | undefined;
    setConfig(value?: BlockTrigger.Config): BlockTrigger;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BlockTrigger.AsObject;
    static toObject(includeInstance: boolean, msg: BlockTrigger): BlockTrigger.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BlockTrigger, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BlockTrigger;
    static deserializeBinaryFromReader(message: BlockTrigger, reader: jspb.BinaryReader): BlockTrigger;
}

export namespace BlockTrigger {
    export type AsObject = {
        config?: BlockTrigger.Config.AsObject,
    }


    export class Config extends jspb.Message { 
        getInterval(): number;
        setInterval(value: number): Config;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Config.AsObject;
        static toObject(includeInstance: boolean, msg: Config): Config.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Config, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Config;
        static deserializeBinaryFromReader(message: Config, reader: jspb.BinaryReader): Config;
    }

    export namespace Config {
        export type AsObject = {
            interval: number,
        }
    }

    export class Output extends jspb.Message { 
        getBlockNumber(): number;
        setBlockNumber(value: number): Output;
        getBlockHash(): string;
        setBlockHash(value: string): Output;
        getTimestamp(): number;
        setTimestamp(value: number): Output;
        getParentHash(): string;
        setParentHash(value: string): Output;
        getDifficulty(): string;
        setDifficulty(value: string): Output;
        getGasLimit(): number;
        setGasLimit(value: number): Output;
        getGasUsed(): number;
        setGasUsed(value: number): Output;

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
            blockNumber: number,
            blockHash: string,
            timestamp: number,
            parentHash: string,
            difficulty: string,
            gasLimit: number,
            gasUsed: number,
        }
    }

}

export class EventTrigger extends jspb.Message { 

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): EventTrigger.Config | undefined;
    setConfig(value?: EventTrigger.Config): EventTrigger;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EventTrigger.AsObject;
    static toObject(includeInstance: boolean, msg: EventTrigger): EventTrigger.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EventTrigger, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EventTrigger;
    static deserializeBinaryFromReader(message: EventTrigger, reader: jspb.BinaryReader): EventTrigger;
}

export namespace EventTrigger {
    export type AsObject = {
        config?: EventTrigger.Config.AsObject,
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

    export class Config extends jspb.Message { 
        clearMatcherList(): void;
        getMatcherList(): Array<EventTrigger.Matcher>;
        setMatcherList(value: Array<EventTrigger.Matcher>): Config;
        addMatcher(value?: EventTrigger.Matcher, index?: number): EventTrigger.Matcher;
        getExpression(): string;
        setExpression(value: string): Config;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Config.AsObject;
        static toObject(includeInstance: boolean, msg: Config): Config.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Config, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Config;
        static deserializeBinaryFromReader(message: Config, reader: jspb.BinaryReader): Config;
    }

    export namespace Config {
        export type AsObject = {
            matcherList: Array<EventTrigger.Matcher.AsObject>,
            expression: string,
        }
    }

    export class Output extends jspb.Message { 

        hasEvmLog(): boolean;
        clearEvmLog(): void;
        getEvmLog(): Evm.Log | undefined;
        setEvmLog(value?: Evm.Log): Output;

        hasTransferLog(): boolean;
        clearTransferLog(): void;
        getTransferLog(): EventTrigger.TransferLogOutput | undefined;
        setTransferLog(value?: EventTrigger.TransferLogOutput): Output;

        getOutputTypeCase(): Output.OutputTypeCase;

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
            evmLog?: Evm.Log.AsObject,
            transferLog?: EventTrigger.TransferLogOutput.AsObject,
        }

        export enum OutputTypeCase {
            OUTPUT_TYPE_NOT_SET = 0,
            EVM_LOG = 1,
            TRANSFER_LOG = 2,
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
        getLogIndex(): number;
        setLogIndex(value: number): TransferLogOutput;

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
            logIndex: number,
        }
    }

}

export class ManualTrigger extends jspb.Message { 

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): ManualTrigger.Config | undefined;
    setConfig(value?: ManualTrigger.Config): ManualTrigger;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ManualTrigger.AsObject;
    static toObject(includeInstance: boolean, msg: ManualTrigger): ManualTrigger.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ManualTrigger, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ManualTrigger;
    static deserializeBinaryFromReader(message: ManualTrigger, reader: jspb.BinaryReader): ManualTrigger;
}

export namespace ManualTrigger {
    export type AsObject = {
        config?: ManualTrigger.Config.AsObject,
    }


    export class Config extends jspb.Message { 

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Config.AsObject;
        static toObject(includeInstance: boolean, msg: Config): Config.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Config, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Config;
        static deserializeBinaryFromReader(message: Config, reader: jspb.BinaryReader): Config;
    }

    export namespace Config {
        export type AsObject = {
        }
    }

    export class Output extends jspb.Message { 
        getRunAt(): number;
        setRunAt(value: number): Output;

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
            runAt: number,
        }
    }

}

export class TaskTrigger extends jspb.Message { 
    getName(): string;
    setName(value: string): TaskTrigger;
    getType(): TriggerType;
    setType(value: TriggerType): TaskTrigger;

    hasManual(): boolean;
    clearManual(): void;
    getManual(): boolean;
    setManual(value: boolean): TaskTrigger;

    hasFixedTime(): boolean;
    clearFixedTime(): void;
    getFixedTime(): FixedTimeTrigger | undefined;
    setFixedTime(value?: FixedTimeTrigger): TaskTrigger;

    hasCron(): boolean;
    clearCron(): void;
    getCron(): CronTrigger | undefined;
    setCron(value?: CronTrigger): TaskTrigger;

    hasBlock(): boolean;
    clearBlock(): void;
    getBlock(): BlockTrigger | undefined;
    setBlock(value?: BlockTrigger): TaskTrigger;

    hasEvent(): boolean;
    clearEvent(): void;
    getEvent(): EventTrigger | undefined;
    setEvent(value?: EventTrigger): TaskTrigger;
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
        type: TriggerType,
        manual: boolean,
        fixedTime?: FixedTimeTrigger.AsObject,
        cron?: CronTrigger.AsObject,
        block?: BlockTrigger.AsObject,
        event?: EventTrigger.AsObject,
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

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): ETHTransferNode.Config | undefined;
    setConfig(value?: ETHTransferNode.Config): ETHTransferNode;

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
        config?: ETHTransferNode.Config.AsObject,
    }


    export class Config extends jspb.Message { 
        getDestination(): string;
        setDestination(value: string): Config;
        getAmount(): string;
        setAmount(value: string): Config;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Config.AsObject;
        static toObject(includeInstance: boolean, msg: Config): Config.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Config, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Config;
        static deserializeBinaryFromReader(message: Config, reader: jspb.BinaryReader): Config;
    }

    export namespace Config {
        export type AsObject = {
            destination: string,
            amount: string,
        }
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

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): ContractWriteNode.Config | undefined;
    setConfig(value?: ContractWriteNode.Config): ContractWriteNode;

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
        config?: ContractWriteNode.Config.AsObject,
    }


    export class Config extends jspb.Message { 
        getContractAddress(): string;
        setContractAddress(value: string): Config;
        getCallData(): string;
        setCallData(value: string): Config;
        getContractAbi(): string;
        setContractAbi(value: string): Config;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Config.AsObject;
        static toObject(includeInstance: boolean, msg: Config): Config.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Config, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Config;
        static deserializeBinaryFromReader(message: Config, reader: jspb.BinaryReader): Config;
    }

    export namespace Config {
        export type AsObject = {
            contractAddress: string,
            callData: string,
            contractAbi: string,
        }
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

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): ContractReadNode.Config | undefined;
    setConfig(value?: ContractReadNode.Config): ContractReadNode;

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
        config?: ContractReadNode.Config.AsObject,
    }


    export class Config extends jspb.Message { 
        getContractAddress(): string;
        setContractAddress(value: string): Config;
        getCallData(): string;
        setCallData(value: string): Config;
        getContractAbi(): string;
        setContractAbi(value: string): Config;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Config.AsObject;
        static toObject(includeInstance: boolean, msg: Config): Config.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Config, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Config;
        static deserializeBinaryFromReader(message: Config, reader: jspb.BinaryReader): Config;
    }

    export namespace Config {
        export type AsObject = {
            contractAddress: string,
            callData: string,
            contractAbi: string,
        }
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

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): GraphQLQueryNode.Config | undefined;
    setConfig(value?: GraphQLQueryNode.Config): GraphQLQueryNode;

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
        config?: GraphQLQueryNode.Config.AsObject,
    }


    export class Config extends jspb.Message { 
        getUrl(): string;
        setUrl(value: string): Config;
        getQuery(): string;
        setQuery(value: string): Config;

        getVariablesMap(): jspb.Map<string, string>;
        clearVariablesMap(): void;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Config.AsObject;
        static toObject(includeInstance: boolean, msg: Config): Config.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Config, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Config;
        static deserializeBinaryFromReader(message: Config, reader: jspb.BinaryReader): Config;
    }

    export namespace Config {
        export type AsObject = {
            url: string,
            query: string,

            variablesMap: Array<[string, string]>,
        }
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

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): RestAPINode.Config | undefined;
    setConfig(value?: RestAPINode.Config): RestAPINode;

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
        config?: RestAPINode.Config.AsObject,
    }


    export class Config extends jspb.Message { 
        getUrl(): string;
        setUrl(value: string): Config;

        getHeadersMap(): jspb.Map<string, string>;
        clearHeadersMap(): void;
        getBody(): string;
        setBody(value: string): Config;
        getMethod(): string;
        setMethod(value: string): Config;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Config.AsObject;
        static toObject(includeInstance: boolean, msg: Config): Config.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Config, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Config;
        static deserializeBinaryFromReader(message: Config, reader: jspb.BinaryReader): Config;
    }

    export namespace Config {
        export type AsObject = {
            url: string,

            headersMap: Array<[string, string]>,
            body: string,
            method: string,
        }
    }

    export class Output extends jspb.Message { 

        hasData(): boolean;
        clearData(): void;
        getData(): google_protobuf_struct_pb.Value | undefined;
        setData(value?: google_protobuf_struct_pb.Value): Output;

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
            data?: google_protobuf_struct_pb.Value.AsObject,
        }
    }

}

export class CustomCodeNode extends jspb.Message { 

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): CustomCodeNode.Config | undefined;
    setConfig(value?: CustomCodeNode.Config): CustomCodeNode;

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
        config?: CustomCodeNode.Config.AsObject,
    }


    export class Config extends jspb.Message { 
        getLang(): Lang;
        setLang(value: Lang): Config;
        getSource(): string;
        setSource(value: string): Config;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Config.AsObject;
        static toObject(includeInstance: boolean, msg: Config): Config.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Config, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Config;
        static deserializeBinaryFromReader(message: Config, reader: jspb.BinaryReader): Config;
    }

    export namespace Config {
        export type AsObject = {
            lang: Lang,
            source: string,
        }
    }

    export class Output extends jspb.Message { 

        hasData(): boolean;
        clearData(): void;
        getData(): google_protobuf_struct_pb.Value | undefined;
        setData(value?: google_protobuf_struct_pb.Value): Output;

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
            data?: google_protobuf_struct_pb.Value.AsObject,
        }
    }

}

export class BranchNode extends jspb.Message { 

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): BranchNode.Config | undefined;
    setConfig(value?: BranchNode.Config): BranchNode;

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
        config?: BranchNode.Config.AsObject,
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

    export class Config extends jspb.Message { 
        clearConditionsList(): void;
        getConditionsList(): Array<BranchNode.Condition>;
        setConditionsList(value: Array<BranchNode.Condition>): Config;
        addConditions(value?: BranchNode.Condition, index?: number): BranchNode.Condition;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Config.AsObject;
        static toObject(includeInstance: boolean, msg: Config): Config.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Config, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Config;
        static deserializeBinaryFromReader(message: Config, reader: jspb.BinaryReader): Config;
    }

    export namespace Config {
        export type AsObject = {
            conditionsList: Array<BranchNode.Condition.AsObject>,
        }
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

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): FilterNode.Config | undefined;
    setConfig(value?: FilterNode.Config): FilterNode;

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
        config?: FilterNode.Config.AsObject,
    }


    export class Config extends jspb.Message { 
        getExpression(): string;
        setExpression(value: string): Config;
        getSourceId(): string;
        setSourceId(value: string): Config;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Config.AsObject;
        static toObject(includeInstance: boolean, msg: Config): Config.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Config, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Config;
        static deserializeBinaryFromReader(message: Config, reader: jspb.BinaryReader): Config;
    }

    export namespace Config {
        export type AsObject = {
            expression: string,
            sourceId: string,
        }
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

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): LoopNode.Config | undefined;
    setConfig(value?: LoopNode.Config): LoopNode;

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
        ethTransfer?: ETHTransferNode.AsObject,
        contractWrite?: ContractWriteNode.AsObject,
        contractRead?: ContractReadNode.AsObject,
        graphqlDataQuery?: GraphQLQueryNode.AsObject,
        restApi?: RestAPINode.AsObject,
        customCode?: CustomCodeNode.AsObject,
        config?: LoopNode.Config.AsObject,
    }


    export class Config extends jspb.Message { 
        getSourceId(): string;
        setSourceId(value: string): Config;
        getIterVal(): string;
        setIterVal(value: string): Config;
        getIterKey(): string;
        setIterKey(value: string): Config;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Config.AsObject;
        static toObject(includeInstance: boolean, msg: Config): Config.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Config, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Config;
        static deserializeBinaryFromReader(message: Config, reader: jspb.BinaryReader): Config;
    }

    export namespace Config {
        export type AsObject = {
            sourceId: string,
            iterVal: string,
            iterKey: string,
        }
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
    getType(): NodeType;
    setType(value: NodeType): TaskNode;

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
        type: NodeType,
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
    clearStepsList(): void;
    getStepsList(): Array<Execution.Step>;
    setStepsList(value: Array<Execution.Step>): Execution;
    addSteps(value?: Execution.Step, index?: number): Execution.Step;

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
        stepsList: Array<Execution.Step.AsObject>,
    }


    export class Step extends jspb.Message { 
        getId(): string;
        setId(value: string): Step;
        getType(): string;
        setType(value: string): Step;
        getName(): string;
        setName(value: string): Step;
        getSuccess(): boolean;
        setSuccess(value: boolean): Step;
        getError(): string;
        setError(value: string): Step;
        getLog(): string;
        setLog(value: string): Step;
        clearInputsList(): void;
        getInputsList(): Array<string>;
        setInputsList(value: Array<string>): Step;
        addInputs(value: string, index?: number): string;

        hasBlockTrigger(): boolean;
        clearBlockTrigger(): void;
        getBlockTrigger(): BlockTrigger.Output | undefined;
        setBlockTrigger(value?: BlockTrigger.Output): Step;

        hasFixedTimeTrigger(): boolean;
        clearFixedTimeTrigger(): void;
        getFixedTimeTrigger(): FixedTimeTrigger.Output | undefined;
        setFixedTimeTrigger(value?: FixedTimeTrigger.Output): Step;

        hasCronTrigger(): boolean;
        clearCronTrigger(): void;
        getCronTrigger(): CronTrigger.Output | undefined;
        setCronTrigger(value?: CronTrigger.Output): Step;

        hasEventTrigger(): boolean;
        clearEventTrigger(): void;
        getEventTrigger(): EventTrigger.Output | undefined;
        setEventTrigger(value?: EventTrigger.Output): Step;

        hasManualTrigger(): boolean;
        clearManualTrigger(): void;
        getManualTrigger(): ManualTrigger.Output | undefined;
        setManualTrigger(value?: ManualTrigger.Output): Step;

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
        getStartAt(): number;
        setStartAt(value: number): Step;
        getEndAt(): number;
        setEndAt(value: number): Step;

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
            id: string,
            type: string,
            name: string,
            success: boolean,
            error: string,
            log: string,
            inputsList: Array<string>,
            blockTrigger?: BlockTrigger.Output.AsObject,
            fixedTimeTrigger?: FixedTimeTrigger.Output.AsObject,
            cronTrigger?: CronTrigger.Output.AsObject,
            eventTrigger?: EventTrigger.Output.AsObject,
            manualTrigger?: ManualTrigger.Output.AsObject,
            ethTransfer?: ETHTransferNode.Output.AsObject,
            graphql?: GraphQLQueryNode.Output.AsObject,
            contractRead?: ContractReadNode.Output.AsObject,
            contractWrite?: ContractWriteNode.Output.AsObject,
            customCode?: CustomCodeNode.Output.AsObject,
            restApi?: RestAPINode.Output.AsObject,
            branch?: BranchNode.Output.AsObject,
            filter?: FilterNode.Output.AsObject,
            loop?: LoopNode.Output.AsObject,
            startAt: number,
            endAt: number,
        }

        export enum OutputDataCase {
            OUTPUT_DATA_NOT_SET = 0,
            BLOCK_TRIGGER = 20,
            FIXED_TIME_TRIGGER = 21,
            CRON_TRIGGER = 22,
            EVENT_TRIGGER = 23,
            MANUAL_TRIGGER = 24,
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
        executionCount: number,
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
    getIsHidden(): boolean;
    setIsHidden(value: boolean): SmartWallet;

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
        isHidden: boolean,
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
    getBefore(): string;
    setBefore(value: string): ListTasksReq;
    getAfter(): string;
    setAfter(value: string): ListTasksReq;
    getLimit(): number;
    setLimit(value: number): ListTasksReq;
    getIncludeNodes(): boolean;
    setIncludeNodes(value: boolean): ListTasksReq;
    getIncludeEdges(): boolean;
    setIncludeEdges(value: boolean): ListTasksReq;

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
        before: string,
        after: string,
        limit: number,
        includeNodes: boolean,
        includeEdges: boolean,
    }
}

export class ListTasksResp extends jspb.Message { 
    clearItemsList(): void;
    getItemsList(): Array<Task>;
    setItemsList(value: Array<Task>): ListTasksResp;
    addItems(value?: Task, index?: number): Task;

    hasPageInfo(): boolean;
    clearPageInfo(): void;
    getPageInfo(): PageInfo | undefined;
    setPageInfo(value?: PageInfo): ListTasksResp;

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
        itemsList: Array<Task.AsObject>,
        pageInfo?: PageInfo.AsObject,
    }
}

export class ListExecutionsReq extends jspb.Message { 
    clearTaskIdsList(): void;
    getTaskIdsList(): Array<string>;
    setTaskIdsList(value: Array<string>): ListExecutionsReq;
    addTaskIds(value: string, index?: number): string;
    getBefore(): string;
    setBefore(value: string): ListExecutionsReq;
    getAfter(): string;
    setAfter(value: string): ListExecutionsReq;
    getLimit(): number;
    setLimit(value: number): ListExecutionsReq;

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
        before: string,
        after: string,
        limit: number,
    }
}

export class ListExecutionsResp extends jspb.Message { 
    clearItemsList(): void;
    getItemsList(): Array<Execution>;
    setItemsList(value: Array<Execution>): ListExecutionsResp;
    addItems(value?: Execution, index?: number): Execution;

    hasPageInfo(): boolean;
    clearPageInfo(): void;
    getPageInfo(): PageInfo | undefined;
    setPageInfo(value?: PageInfo): ListExecutionsResp;

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
        pageInfo?: PageInfo.AsObject,
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
    getMessage(): string;
    setMessage(value: string): GetKeyReq;
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
        message: string,
        signature: string,
    }
}

export class KeyResp extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): KeyResp;
    getKey(): string;
    setKey(value: string): KeyResp;
    getMessage(): string;
    setMessage(value: string): KeyResp;
    getExpiry(): number;
    setExpiry(value: number): KeyResp;

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
        address: string,
        key: string,
        message: string,
        expiry: number,
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
    getIsHidden(): boolean;
    setIsHidden(value: boolean): GetWalletResp;
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
        isHidden: boolean,
        totalTaskCount: number,
        activeTaskCount: number,
        completedTaskCount: number,
        failedTaskCount: number,
        canceledTaskCount: number,
    }
}

export class SetWalletReq extends jspb.Message { 
    getSalt(): string;
    setSalt(value: string): SetWalletReq;
    getFactoryAddress(): string;
    setFactoryAddress(value: string): SetWalletReq;
    getIsHidden(): boolean;
    setIsHidden(value: boolean): SetWalletReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetWalletReq.AsObject;
    static toObject(includeInstance: boolean, msg: SetWalletReq): SetWalletReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetWalletReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetWalletReq;
    static deserializeBinaryFromReader(message: SetWalletReq, reader: jspb.BinaryReader): SetWalletReq;
}

export namespace SetWalletReq {
    export type AsObject = {
        salt: string,
        factoryAddress: string,
        isHidden: boolean,
    }
}

export class TriggerTaskReq extends jspb.Message { 
    getTaskId(): string;
    setTaskId(value: string): TriggerTaskReq;
    getTriggerType(): TriggerType;
    setTriggerType(value: TriggerType): TriggerTaskReq;

    hasBlockTrigger(): boolean;
    clearBlockTrigger(): void;
    getBlockTrigger(): BlockTrigger.Output | undefined;
    setBlockTrigger(value?: BlockTrigger.Output): TriggerTaskReq;

    hasFixedTimeTrigger(): boolean;
    clearFixedTimeTrigger(): void;
    getFixedTimeTrigger(): FixedTimeTrigger.Output | undefined;
    setFixedTimeTrigger(value?: FixedTimeTrigger.Output): TriggerTaskReq;

    hasCronTrigger(): boolean;
    clearCronTrigger(): void;
    getCronTrigger(): CronTrigger.Output | undefined;
    setCronTrigger(value?: CronTrigger.Output): TriggerTaskReq;

    hasEventTrigger(): boolean;
    clearEventTrigger(): void;
    getEventTrigger(): EventTrigger.Output | undefined;
    setEventTrigger(value?: EventTrigger.Output): TriggerTaskReq;

    hasManualTrigger(): boolean;
    clearManualTrigger(): void;
    getManualTrigger(): ManualTrigger.Output | undefined;
    setManualTrigger(value?: ManualTrigger.Output): TriggerTaskReq;
    getIsBlocking(): boolean;
    setIsBlocking(value: boolean): TriggerTaskReq;

    getTriggerOutputCase(): TriggerTaskReq.TriggerOutputCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TriggerTaskReq.AsObject;
    static toObject(includeInstance: boolean, msg: TriggerTaskReq): TriggerTaskReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TriggerTaskReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TriggerTaskReq;
    static deserializeBinaryFromReader(message: TriggerTaskReq, reader: jspb.BinaryReader): TriggerTaskReq;
}

export namespace TriggerTaskReq {
    export type AsObject = {
        taskId: string,
        triggerType: TriggerType,
        blockTrigger?: BlockTrigger.Output.AsObject,
        fixedTimeTrigger?: FixedTimeTrigger.Output.AsObject,
        cronTrigger?: CronTrigger.Output.AsObject,
        eventTrigger?: EventTrigger.Output.AsObject,
        manualTrigger?: ManualTrigger.Output.AsObject,
        isBlocking: boolean,
    }

    export enum TriggerOutputCase {
        TRIGGER_OUTPUT_NOT_SET = 0,
        BLOCK_TRIGGER = 3,
        FIXED_TIME_TRIGGER = 4,
        CRON_TRIGGER = 5,
        EVENT_TRIGGER = 6,
        MANUAL_TRIGGER = 7,
    }

}

export class TriggerTaskResp extends jspb.Message { 
    getExecutionId(): string;
    setExecutionId(value: string): TriggerTaskResp;
    getStatus(): ExecutionStatus;
    setStatus(value: ExecutionStatus): TriggerTaskResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TriggerTaskResp.AsObject;
    static toObject(includeInstance: boolean, msg: TriggerTaskResp): TriggerTaskResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TriggerTaskResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TriggerTaskResp;
    static deserializeBinaryFromReader(message: TriggerTaskResp, reader: jspb.BinaryReader): TriggerTaskResp;
}

export namespace TriggerTaskResp {
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
    getBefore(): string;
    setBefore(value: string): ListSecretsReq;
    getAfter(): string;
    setAfter(value: string): ListSecretsReq;
    getLimit(): number;
    setLimit(value: number): ListSecretsReq;
    getIncludeTimestamps(): boolean;
    setIncludeTimestamps(value: boolean): ListSecretsReq;
    getIncludeCreatedBy(): boolean;
    setIncludeCreatedBy(value: boolean): ListSecretsReq;
    getIncludeDescription(): boolean;
    setIncludeDescription(value: boolean): ListSecretsReq;

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
        before: string,
        after: string,
        limit: number,
        includeTimestamps: boolean,
        includeCreatedBy: boolean,
        includeDescription: boolean,
    }
}

export class PageInfo extends jspb.Message { 
    getStartCursor(): string;
    setStartCursor(value: string): PageInfo;
    getEndCursor(): string;
    setEndCursor(value: string): PageInfo;
    getHasPreviousPage(): boolean;
    setHasPreviousPage(value: boolean): PageInfo;
    getHasNextPage(): boolean;
    setHasNextPage(value: boolean): PageInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PageInfo.AsObject;
    static toObject(includeInstance: boolean, msg: PageInfo): PageInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PageInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PageInfo;
    static deserializeBinaryFromReader(message: PageInfo, reader: jspb.BinaryReader): PageInfo;
}

export namespace PageInfo {
    export type AsObject = {
        startCursor: string,
        endCursor: string,
        hasPreviousPage: boolean,
        hasNextPage: boolean,
    }
}

export class Secret extends jspb.Message { 
    getName(): string;
    setName(value: string): Secret;
    getScope(): string;
    setScope(value: string): Secret;
    getWorkflowId(): string;
    setWorkflowId(value: string): Secret;
    getOrgId(): string;
    setOrgId(value: string): Secret;
    getCreatedAt(): number;
    setCreatedAt(value: number): Secret;
    getUpdatedAt(): number;
    setUpdatedAt(value: number): Secret;
    getCreatedBy(): string;
    setCreatedBy(value: string): Secret;
    getDescription(): string;
    setDescription(value: string): Secret;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Secret.AsObject;
    static toObject(includeInstance: boolean, msg: Secret): Secret.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Secret, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Secret;
    static deserializeBinaryFromReader(message: Secret, reader: jspb.BinaryReader): Secret;
}

export namespace Secret {
    export type AsObject = {
        name: string,
        scope: string,
        workflowId: string,
        orgId: string,
        createdAt: number,
        updatedAt: number,
        createdBy: string,
        description: string,
    }
}

export class ListSecretsResp extends jspb.Message { 
    clearItemsList(): void;
    getItemsList(): Array<Secret>;
    setItemsList(value: Array<Secret>): ListSecretsResp;
    addItems(value?: Secret, index?: number): Secret;

    hasPageInfo(): boolean;
    clearPageInfo(): void;
    getPageInfo(): PageInfo | undefined;
    setPageInfo(value?: PageInfo): ListSecretsResp;

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
        itemsList: Array<Secret.AsObject>,
        pageInfo?: PageInfo.AsObject,
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

export class GetSignatureFormatReq extends jspb.Message { 
    getWallet(): string;
    setWallet(value: string): GetSignatureFormatReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSignatureFormatReq.AsObject;
    static toObject(includeInstance: boolean, msg: GetSignatureFormatReq): GetSignatureFormatReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSignatureFormatReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSignatureFormatReq;
    static deserializeBinaryFromReader(message: GetSignatureFormatReq, reader: jspb.BinaryReader): GetSignatureFormatReq;
}

export namespace GetSignatureFormatReq {
    export type AsObject = {
        wallet: string,
    }
}

export class GetSignatureFormatResp extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): GetSignatureFormatResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSignatureFormatResp.AsObject;
    static toObject(includeInstance: boolean, msg: GetSignatureFormatResp): GetSignatureFormatResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSignatureFormatResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSignatureFormatResp;
    static deserializeBinaryFromReader(message: GetSignatureFormatResp, reader: jspb.BinaryReader): GetSignatureFormatResp;
}

export namespace GetSignatureFormatResp {
    export type AsObject = {
        message: string,
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

export class GetExecutionStatsReq extends jspb.Message { 
    clearWorkflowIdsList(): void;
    getWorkflowIdsList(): Array<string>;
    setWorkflowIdsList(value: Array<string>): GetExecutionStatsReq;
    addWorkflowIds(value: string, index?: number): string;
    getDays(): number;
    setDays(value: number): GetExecutionStatsReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetExecutionStatsReq.AsObject;
    static toObject(includeInstance: boolean, msg: GetExecutionStatsReq): GetExecutionStatsReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetExecutionStatsReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetExecutionStatsReq;
    static deserializeBinaryFromReader(message: GetExecutionStatsReq, reader: jspb.BinaryReader): GetExecutionStatsReq;
}

export namespace GetExecutionStatsReq {
    export type AsObject = {
        workflowIdsList: Array<string>,
        days: number,
    }
}

export class GetExecutionStatsResp extends jspb.Message { 
    getTotal(): number;
    setTotal(value: number): GetExecutionStatsResp;
    getSucceeded(): number;
    setSucceeded(value: number): GetExecutionStatsResp;
    getFailed(): number;
    setFailed(value: number): GetExecutionStatsResp;
    getAvgExecutionTime(): number;
    setAvgExecutionTime(value: number): GetExecutionStatsResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetExecutionStatsResp.AsObject;
    static toObject(includeInstance: boolean, msg: GetExecutionStatsResp): GetExecutionStatsResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetExecutionStatsResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetExecutionStatsResp;
    static deserializeBinaryFromReader(message: GetExecutionStatsResp, reader: jspb.BinaryReader): GetExecutionStatsResp;
}

export namespace GetExecutionStatsResp {
    export type AsObject = {
        total: number,
        succeeded: number,
        failed: number,
        avgExecutionTime: number,
    }
}

export class RunNodeWithInputsReq extends jspb.Message { 
    getNodeType(): NodeType;
    setNodeType(value: NodeType): RunNodeWithInputsReq;

    getNodeConfigMap(): jspb.Map<string, google_protobuf_struct_pb.Value>;
    clearNodeConfigMap(): void;

    getInputVariablesMap(): jspb.Map<string, google_protobuf_struct_pb.Value>;
    clearInputVariablesMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RunNodeWithInputsReq.AsObject;
    static toObject(includeInstance: boolean, msg: RunNodeWithInputsReq): RunNodeWithInputsReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RunNodeWithInputsReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RunNodeWithInputsReq;
    static deserializeBinaryFromReader(message: RunNodeWithInputsReq, reader: jspb.BinaryReader): RunNodeWithInputsReq;
}

export namespace RunNodeWithInputsReq {
    export type AsObject = {
        nodeType: NodeType,

        nodeConfigMap: Array<[string, google_protobuf_struct_pb.Value.AsObject]>,

        inputVariablesMap: Array<[string, google_protobuf_struct_pb.Value.AsObject]>,
    }
}

export class RunNodeWithInputsResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): RunNodeWithInputsResp;
    getError(): string;
    setError(value: string): RunNodeWithInputsResp;
    getNodeId(): string;
    setNodeId(value: string): RunNodeWithInputsResp;

    hasEthTransfer(): boolean;
    clearEthTransfer(): void;
    getEthTransfer(): ETHTransferNode.Output | undefined;
    setEthTransfer(value?: ETHTransferNode.Output): RunNodeWithInputsResp;

    hasGraphql(): boolean;
    clearGraphql(): void;
    getGraphql(): GraphQLQueryNode.Output | undefined;
    setGraphql(value?: GraphQLQueryNode.Output): RunNodeWithInputsResp;

    hasContractRead(): boolean;
    clearContractRead(): void;
    getContractRead(): ContractReadNode.Output | undefined;
    setContractRead(value?: ContractReadNode.Output): RunNodeWithInputsResp;

    hasContractWrite(): boolean;
    clearContractWrite(): void;
    getContractWrite(): ContractWriteNode.Output | undefined;
    setContractWrite(value?: ContractWriteNode.Output): RunNodeWithInputsResp;

    hasCustomCode(): boolean;
    clearCustomCode(): void;
    getCustomCode(): CustomCodeNode.Output | undefined;
    setCustomCode(value?: CustomCodeNode.Output): RunNodeWithInputsResp;

    hasRestApi(): boolean;
    clearRestApi(): void;
    getRestApi(): RestAPINode.Output | undefined;
    setRestApi(value?: RestAPINode.Output): RunNodeWithInputsResp;

    hasBranch(): boolean;
    clearBranch(): void;
    getBranch(): BranchNode.Output | undefined;
    setBranch(value?: BranchNode.Output): RunNodeWithInputsResp;

    hasFilter(): boolean;
    clearFilter(): void;
    getFilter(): FilterNode.Output | undefined;
    setFilter(value?: FilterNode.Output): RunNodeWithInputsResp;

    hasLoop(): boolean;
    clearLoop(): void;
    getLoop(): LoopNode.Output | undefined;
    setLoop(value?: LoopNode.Output): RunNodeWithInputsResp;

    getOutputDataCase(): RunNodeWithInputsResp.OutputDataCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RunNodeWithInputsResp.AsObject;
    static toObject(includeInstance: boolean, msg: RunNodeWithInputsResp): RunNodeWithInputsResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RunNodeWithInputsResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RunNodeWithInputsResp;
    static deserializeBinaryFromReader(message: RunNodeWithInputsResp, reader: jspb.BinaryReader): RunNodeWithInputsResp;
}

export namespace RunNodeWithInputsResp {
    export type AsObject = {
        success: boolean,
        error: string,
        nodeId: string,
        ethTransfer?: ETHTransferNode.Output.AsObject,
        graphql?: GraphQLQueryNode.Output.AsObject,
        contractRead?: ContractReadNode.Output.AsObject,
        contractWrite?: ContractWriteNode.Output.AsObject,
        customCode?: CustomCodeNode.Output.AsObject,
        restApi?: RestAPINode.Output.AsObject,
        branch?: BranchNode.Output.AsObject,
        filter?: FilterNode.Output.AsObject,
        loop?: LoopNode.Output.AsObject,
    }

    export enum OutputDataCase {
        OUTPUT_DATA_NOT_SET = 0,
        ETH_TRANSFER = 10,
        GRAPHQL = 11,
        CONTRACT_READ = 12,
        CONTRACT_WRITE = 13,
        CUSTOM_CODE = 14,
        REST_API = 15,
        BRANCH = 16,
        FILTER = 17,
        LOOP = 18,
    }

}

export class RunTriggerReq extends jspb.Message { 
    getTriggerType(): TriggerType;
    setTriggerType(value: TriggerType): RunTriggerReq;

    getTriggerConfigMap(): jspb.Map<string, google_protobuf_struct_pb.Value>;
    clearTriggerConfigMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RunTriggerReq.AsObject;
    static toObject(includeInstance: boolean, msg: RunTriggerReq): RunTriggerReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RunTriggerReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RunTriggerReq;
    static deserializeBinaryFromReader(message: RunTriggerReq, reader: jspb.BinaryReader): RunTriggerReq;
}

export namespace RunTriggerReq {
    export type AsObject = {
        triggerType: TriggerType,

        triggerConfigMap: Array<[string, google_protobuf_struct_pb.Value.AsObject]>,
    }
}

export class RunTriggerResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): RunTriggerResp;
    getError(): string;
    setError(value: string): RunTriggerResp;
    getTriggerId(): string;
    setTriggerId(value: string): RunTriggerResp;

    hasBlockTrigger(): boolean;
    clearBlockTrigger(): void;
    getBlockTrigger(): BlockTrigger.Output | undefined;
    setBlockTrigger(value?: BlockTrigger.Output): RunTriggerResp;

    hasFixedTimeTrigger(): boolean;
    clearFixedTimeTrigger(): void;
    getFixedTimeTrigger(): FixedTimeTrigger.Output | undefined;
    setFixedTimeTrigger(value?: FixedTimeTrigger.Output): RunTriggerResp;

    hasCronTrigger(): boolean;
    clearCronTrigger(): void;
    getCronTrigger(): CronTrigger.Output | undefined;
    setCronTrigger(value?: CronTrigger.Output): RunTriggerResp;

    hasEventTrigger(): boolean;
    clearEventTrigger(): void;
    getEventTrigger(): EventTrigger.Output | undefined;
    setEventTrigger(value?: EventTrigger.Output): RunTriggerResp;

    hasManualTrigger(): boolean;
    clearManualTrigger(): void;
    getManualTrigger(): ManualTrigger.Output | undefined;
    setManualTrigger(value?: ManualTrigger.Output): RunTriggerResp;

    getOutputDataCase(): RunTriggerResp.OutputDataCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RunTriggerResp.AsObject;
    static toObject(includeInstance: boolean, msg: RunTriggerResp): RunTriggerResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RunTriggerResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RunTriggerResp;
    static deserializeBinaryFromReader(message: RunTriggerResp, reader: jspb.BinaryReader): RunTriggerResp;
}

export namespace RunTriggerResp {
    export type AsObject = {
        success: boolean,
        error: string,
        triggerId: string,
        blockTrigger?: BlockTrigger.Output.AsObject,
        fixedTimeTrigger?: FixedTimeTrigger.Output.AsObject,
        cronTrigger?: CronTrigger.Output.AsObject,
        eventTrigger?: EventTrigger.Output.AsObject,
        manualTrigger?: ManualTrigger.Output.AsObject,
    }

    export enum OutputDataCase {
        OUTPUT_DATA_NOT_SET = 0,
        BLOCK_TRIGGER = 10,
        FIXED_TIME_TRIGGER = 11,
        CRON_TRIGGER = 12,
        EVENT_TRIGGER = 13,
        MANUAL_TRIGGER = 14,
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

export class SimulateTaskReq extends jspb.Message { 

    hasTrigger(): boolean;
    clearTrigger(): void;
    getTrigger(): TaskTrigger | undefined;
    setTrigger(value?: TaskTrigger): SimulateTaskReq;
    clearNodesList(): void;
    getNodesList(): Array<TaskNode>;
    setNodesList(value: Array<TaskNode>): SimulateTaskReq;
    addNodes(value?: TaskNode, index?: number): TaskNode;
    clearEdgesList(): void;
    getEdgesList(): Array<TaskEdge>;
    setEdgesList(value: Array<TaskEdge>): SimulateTaskReq;
    addEdges(value?: TaskEdge, index?: number): TaskEdge;

    getInputVariablesMap(): jspb.Map<string, google_protobuf_struct_pb.Value>;
    clearInputVariablesMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SimulateTaskReq.AsObject;
    static toObject(includeInstance: boolean, msg: SimulateTaskReq): SimulateTaskReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SimulateTaskReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SimulateTaskReq;
    static deserializeBinaryFromReader(message: SimulateTaskReq, reader: jspb.BinaryReader): SimulateTaskReq;
}

export namespace SimulateTaskReq {
    export type AsObject = {
        trigger?: TaskTrigger.AsObject,
        nodesList: Array<TaskNode.AsObject>,
        edgesList: Array<TaskEdge.AsObject>,

        inputVariablesMap: Array<[string, google_protobuf_struct_pb.Value.AsObject]>,
    }
}

export enum TriggerType {
    TRIGGER_TYPE_UNSPECIFIED = 0,
    TRIGGER_TYPE_MANUAL = 1,
    TRIGGER_TYPE_FIXED_TIME = 2,
    TRIGGER_TYPE_CRON = 3,
    TRIGGER_TYPE_BLOCK = 4,
    TRIGGER_TYPE_EVENT = 5,
}

export enum NodeType {
    NODE_TYPE_UNSPECIFIED = 0,
    NODE_TYPE_ETH_TRANSFER = 1,
    NODE_TYPE_CONTRACT_WRITE = 2,
    NODE_TYPE_CONTRACT_READ = 3,
    NODE_TYPE_GRAPHQL_QUERY = 4,
    NODE_TYPE_REST_API = 5,
    NODE_TYPE_CUSTOM_CODE = 6,
    NODE_TYPE_BRANCH = 7,
    NODE_TYPE_FILTER = 8,
    NODE_TYPE_LOOP = 9,
}

export enum Lang {
    JAVASCRIPT = 0,
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
    EXECUTION_STATUS_UNSPECIFIED = 0,
    EXECUTION_STATUS_PENDING = 1,
    EXECUTION_STATUS_COMPLETED = 2,
    EXECUTION_STATUS_FAILED = 3,
}
