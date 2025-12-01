// package: aggregator
// file: avs.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";

export class TokenMetadata extends jspb.Message { 
    getId(): string;
    setId(value: string): TokenMetadata;
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
        id: string,
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
        clearSchedulesList(): void;
        getSchedulesList(): Array<string>;
        setSchedulesList(value: Array<string>): Config;
        addSchedules(value: string, index?: number): string;

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
            schedulesList: Array<string>,
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


    export class Query extends jspb.Message { 
        clearAddressesList(): void;
        getAddressesList(): Array<string>;
        setAddressesList(value: Array<string>): Query;
        addAddresses(value: string, index?: number): string;
        clearTopicsList(): void;
        getTopicsList(): Array<string>;
        setTopicsList(value: Array<string>): Query;
        addTopics(value: string, index?: number): string;

        hasMaxEventsPerBlock(): boolean;
        clearMaxEventsPerBlock(): void;
        getMaxEventsPerBlock(): number | undefined;
        setMaxEventsPerBlock(value: number): Query;
        clearContractAbiList(): void;
        getContractAbiList(): Array<google_protobuf_struct_pb.Value>;
        setContractAbiList(value: Array<google_protobuf_struct_pb.Value>): Query;
        addContractAbi(value?: google_protobuf_struct_pb.Value, index?: number): google_protobuf_struct_pb.Value;
        clearConditionsList(): void;
        getConditionsList(): Array<EventCondition>;
        setConditionsList(value: Array<EventCondition>): Query;
        addConditions(value?: EventCondition, index?: number): EventCondition;
        clearMethodCallsList(): void;
        getMethodCallsList(): Array<EventTrigger.MethodCall>;
        setMethodCallsList(value: Array<EventTrigger.MethodCall>): Query;
        addMethodCalls(value?: EventTrigger.MethodCall, index?: number): EventTrigger.MethodCall;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Query.AsObject;
        static toObject(includeInstance: boolean, msg: Query): Query.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Query, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Query;
        static deserializeBinaryFromReader(message: Query, reader: jspb.BinaryReader): Query;
    }

    export namespace Query {
        export type AsObject = {
            addressesList: Array<string>,
            topicsList: Array<string>,
            maxEventsPerBlock?: number,
            contractAbiList: Array<google_protobuf_struct_pb.Value.AsObject>,
            conditionsList: Array<EventCondition.AsObject>,
            methodCallsList: Array<EventTrigger.MethodCall.AsObject>,
        }
    }

    export class MethodCall extends jspb.Message { 
        getMethodName(): string;
        setMethodName(value: string): MethodCall;

        hasCallData(): boolean;
        clearCallData(): void;
        getCallData(): string | undefined;
        setCallData(value: string): MethodCall;
        clearApplyToFieldsList(): void;
        getApplyToFieldsList(): Array<string>;
        setApplyToFieldsList(value: Array<string>): MethodCall;
        addApplyToFields(value: string, index?: number): string;
        clearMethodParamsList(): void;
        getMethodParamsList(): Array<string>;
        setMethodParamsList(value: Array<string>): MethodCall;
        addMethodParams(value: string, index?: number): string;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): MethodCall.AsObject;
        static toObject(includeInstance: boolean, msg: MethodCall): MethodCall.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: MethodCall, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): MethodCall;
        static deserializeBinaryFromReader(message: MethodCall, reader: jspb.BinaryReader): MethodCall;
    }

    export namespace MethodCall {
        export type AsObject = {
            methodName: string,
            callData?: string,
            applyToFieldsList: Array<string>,
            methodParamsList: Array<string>,
        }
    }

    export class Config extends jspb.Message { 
        clearQueriesList(): void;
        getQueriesList(): Array<EventTrigger.Query>;
        setQueriesList(value: Array<EventTrigger.Query>): Config;
        addQueries(value?: EventTrigger.Query, index?: number): EventTrigger.Query;

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
            queriesList: Array<EventTrigger.Query.AsObject>,
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

        hasData(): boolean;
        clearData(): void;
        getData(): google_protobuf_struct_pb.Value | undefined;
        setData(value?: google_protobuf_struct_pb.Value): Config;

        getHeadersMap(): jspb.Map<string, string>;
        clearHeadersMap(): void;

        getPathparamsMap(): jspb.Map<string, string>;
        clearPathparamsMap(): void;
        getLang(): Lang;
        setLang(value: Lang): Config;

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
            data?: google_protobuf_struct_pb.Value.AsObject,

            headersMap: Array<[string, string]>,

            pathparamsMap: Array<[string, string]>,
            lang: Lang,
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

export class TaskTrigger extends jspb.Message { 
    getName(): string;
    setName(value: string): TaskTrigger;
    getType(): TriggerType;
    setType(value: TriggerType): TaskTrigger;

    hasManual(): boolean;
    clearManual(): void;
    getManual(): ManualTrigger | undefined;
    setManual(value?: ManualTrigger): TaskTrigger;

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
        manual?: ManualTrigger.AsObject,
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
        clearContractAbiList(): void;
        getContractAbiList(): Array<google_protobuf_struct_pb.Value>;
        setContractAbiList(value: Array<google_protobuf_struct_pb.Value>): Config;
        addContractAbi(value?: google_protobuf_struct_pb.Value, index?: number): google_protobuf_struct_pb.Value;
        clearMethodCallsList(): void;
        getMethodCallsList(): Array<ContractWriteNode.MethodCall>;
        setMethodCallsList(value: Array<ContractWriteNode.MethodCall>): Config;
        addMethodCalls(value?: ContractWriteNode.MethodCall, index?: number): ContractWriteNode.MethodCall;

        hasIsSimulated(): boolean;
        clearIsSimulated(): void;
        getIsSimulated(): boolean | undefined;
        setIsSimulated(value: boolean): Config;

        hasValue(): boolean;
        clearValue(): void;
        getValue(): string | undefined;
        setValue(value: string): Config;

        hasGasLimit(): boolean;
        clearGasLimit(): void;
        getGasLimit(): string | undefined;
        setGasLimit(value: string): Config;

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
            contractAbiList: Array<google_protobuf_struct_pb.Value.AsObject>,
            methodCallsList: Array<ContractWriteNode.MethodCall.AsObject>,
            isSimulated?: boolean,
            value?: string,
            gasLimit?: string,
        }
    }

    export class MethodCall extends jspb.Message { 

        hasCallData(): boolean;
        clearCallData(): void;
        getCallData(): string | undefined;
        setCallData(value: string): MethodCall;
        getMethodName(): string;
        setMethodName(value: string): MethodCall;
        clearApplyToFieldsList(): void;
        getApplyToFieldsList(): Array<string>;
        setApplyToFieldsList(value: Array<string>): MethodCall;
        addApplyToFields(value: string, index?: number): string;
        clearMethodParamsList(): void;
        getMethodParamsList(): Array<string>;
        setMethodParamsList(value: Array<string>): MethodCall;
        addMethodParams(value: string, index?: number): string;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): MethodCall.AsObject;
        static toObject(includeInstance: boolean, msg: MethodCall): MethodCall.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: MethodCall, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): MethodCall;
        static deserializeBinaryFromReader(message: MethodCall, reader: jspb.BinaryReader): MethodCall;
    }

    export namespace MethodCall {
        export type AsObject = {
            callData?: string,
            methodName: string,
            applyToFieldsList: Array<string>,
            methodParamsList: Array<string>,
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

    export class MethodResult extends jspb.Message { 
        getMethodName(): string;
        setMethodName(value: string): MethodResult;

        hasMethodAbi(): boolean;
        clearMethodAbi(): void;
        getMethodAbi(): google_protobuf_struct_pb.Value | undefined;
        setMethodAbi(value?: google_protobuf_struct_pb.Value): MethodResult;
        getSuccess(): boolean;
        setSuccess(value: boolean): MethodResult;
        getError(): string;
        setError(value: string): MethodResult;

        hasReceipt(): boolean;
        clearReceipt(): void;
        getReceipt(): google_protobuf_struct_pb.Value | undefined;
        setReceipt(value?: google_protobuf_struct_pb.Value): MethodResult;

        hasBlockNumber(): boolean;
        clearBlockNumber(): void;
        getBlockNumber(): number | undefined;
        setBlockNumber(value: number): MethodResult;

        hasValue(): boolean;
        clearValue(): void;
        getValue(): google_protobuf_struct_pb.Value | undefined;
        setValue(value?: google_protobuf_struct_pb.Value): MethodResult;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): MethodResult.AsObject;
        static toObject(includeInstance: boolean, msg: MethodResult): MethodResult.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: MethodResult, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): MethodResult;
        static deserializeBinaryFromReader(message: MethodResult, reader: jspb.BinaryReader): MethodResult;
    }

    export namespace MethodResult {
        export type AsObject = {
            methodName: string,
            methodAbi?: google_protobuf_struct_pb.Value.AsObject,
            success: boolean,
            error: string,
            receipt?: google_protobuf_struct_pb.Value.AsObject,
            blockNumber?: number,
            value?: google_protobuf_struct_pb.Value.AsObject,
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


    export class MethodCall extends jspb.Message { 

        hasCallData(): boolean;
        clearCallData(): void;
        getCallData(): string | undefined;
        setCallData(value: string): MethodCall;
        getMethodName(): string;
        setMethodName(value: string): MethodCall;
        clearApplyToFieldsList(): void;
        getApplyToFieldsList(): Array<string>;
        setApplyToFieldsList(value: Array<string>): MethodCall;
        addApplyToFields(value: string, index?: number): string;
        clearMethodParamsList(): void;
        getMethodParamsList(): Array<string>;
        setMethodParamsList(value: Array<string>): MethodCall;
        addMethodParams(value: string, index?: number): string;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): MethodCall.AsObject;
        static toObject(includeInstance: boolean, msg: MethodCall): MethodCall.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: MethodCall, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): MethodCall;
        static deserializeBinaryFromReader(message: MethodCall, reader: jspb.BinaryReader): MethodCall;
    }

    export namespace MethodCall {
        export type AsObject = {
            callData?: string,
            methodName: string,
            applyToFieldsList: Array<string>,
            methodParamsList: Array<string>,
        }
    }

    export class Config extends jspb.Message { 
        getContractAddress(): string;
        setContractAddress(value: string): Config;
        clearContractAbiList(): void;
        getContractAbiList(): Array<google_protobuf_struct_pb.Value>;
        setContractAbiList(value: Array<google_protobuf_struct_pb.Value>): Config;
        addContractAbi(value?: google_protobuf_struct_pb.Value, index?: number): google_protobuf_struct_pb.Value;
        clearMethodCallsList(): void;
        getMethodCallsList(): Array<ContractReadNode.MethodCall>;
        setMethodCallsList(value: Array<ContractReadNode.MethodCall>): Config;
        addMethodCalls(value?: ContractReadNode.MethodCall, index?: number): ContractReadNode.MethodCall;

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
            contractAbiList: Array<google_protobuf_struct_pb.Value.AsObject>,
            methodCallsList: Array<ContractReadNode.MethodCall.AsObject>,
        }
    }

    export class MethodResult extends jspb.Message { 
        clearDataList(): void;
        getDataList(): Array<ContractReadNode.MethodResult.StructuredField>;
        setDataList(value: Array<ContractReadNode.MethodResult.StructuredField>): MethodResult;
        addData(value?: ContractReadNode.MethodResult.StructuredField, index?: number): ContractReadNode.MethodResult.StructuredField;
        getMethodName(): string;
        setMethodName(value: string): MethodResult;
        getSuccess(): boolean;
        setSuccess(value: boolean): MethodResult;
        getError(): string;
        setError(value: string): MethodResult;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): MethodResult.AsObject;
        static toObject(includeInstance: boolean, msg: MethodResult): MethodResult.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: MethodResult, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): MethodResult;
        static deserializeBinaryFromReader(message: MethodResult, reader: jspb.BinaryReader): MethodResult;
    }

    export namespace MethodResult {
        export type AsObject = {
            dataList: Array<ContractReadNode.MethodResult.StructuredField.AsObject>,
            methodName: string,
            success: boolean,
            error: string,
        }


        export class StructuredField extends jspb.Message { 
            getName(): string;
            setName(value: string): StructuredField;
            getType(): string;
            setType(value: string): StructuredField;
            getValue(): string;
            setValue(value: string): StructuredField;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): StructuredField.AsObject;
            static toObject(includeInstance: boolean, msg: StructuredField): StructuredField.AsObject;
            static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
            static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
            static serializeBinaryToWriter(message: StructuredField, writer: jspb.BinaryWriter): void;
            static deserializeBinary(bytes: Uint8Array): StructuredField;
            static deserializeBinaryFromReader(message: StructuredField, reader: jspb.BinaryReader): StructuredField;
        }

        export namespace StructuredField {
            export type AsObject = {
                name: string,
                type: string,
                value: string,
            }
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

        hasOptions(): boolean;
        clearOptions(): void;
        getOptions(): google_protobuf_struct_pb.Value | undefined;
        setOptions(value?: google_protobuf_struct_pb.Value): Config;

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
            options?: google_protobuf_struct_pb.Value.AsObject,
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

export class BalanceNode extends jspb.Message { 

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): BalanceNode.Config | undefined;
    setConfig(value?: BalanceNode.Config): BalanceNode;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BalanceNode.AsObject;
    static toObject(includeInstance: boolean, msg: BalanceNode): BalanceNode.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BalanceNode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BalanceNode;
    static deserializeBinaryFromReader(message: BalanceNode, reader: jspb.BinaryReader): BalanceNode;
}

export namespace BalanceNode {
    export type AsObject = {
        config?: BalanceNode.Config.AsObject,
    }


    export class Config extends jspb.Message { 
        getAddress(): string;
        setAddress(value: string): Config;
        getChain(): string;
        setChain(value: string): Config;
        getIncludeSpam(): boolean;
        setIncludeSpam(value: boolean): Config;
        getIncludeZeroBalances(): boolean;
        setIncludeZeroBalances(value: boolean): Config;
        getMinUsdValueCents(): number;
        setMinUsdValueCents(value: number): Config;
        clearTokenAddressesList(): void;
        getTokenAddressesList(): Array<string>;
        setTokenAddressesList(value: Array<string>): Config;
        addTokenAddresses(value: string, index?: number): string;

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
            address: string,
            chain: string,
            includeSpam: boolean,
            includeZeroBalances: boolean,
            minUsdValueCents: number,
            tokenAddressesList: Array<string>,
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
        getInputNodeName(): string;
        setInputNodeName(value: string): Config;

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
            inputNodeName: string,
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
        getInputNodeName(): string;
        setInputNodeName(value: string): Config;
        getIterVal(): string;
        setIterVal(value: string): Config;
        getIterKey(): string;
        setIterKey(value: string): Config;
        getExecutionMode(): ExecutionMode;
        setExecutionMode(value: ExecutionMode): Config;

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
            inputNodeName: string,
            iterVal: string,
            iterKey: string,
            executionMode: ExecutionMode,
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

    hasBalance(): boolean;
    clearBalance(): void;
    getBalance(): BalanceNode | undefined;
    setBalance(value?: BalanceNode): TaskNode;

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
        balance?: BalanceNode.AsObject,
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
        BALANCE = 19,
    }

}

export class Execution extends jspb.Message { 
    getId(): string;
    setId(value: string): Execution;
    getStartAt(): number;
    setStartAt(value: number): Execution;
    getEndAt(): number;
    setEndAt(value: number): Execution;
    getStatus(): ExecutionStatus;
    setStatus(value: ExecutionStatus): Execution;
    getError(): string;
    setError(value: string): Execution;
    getIndex(): number;
    setIndex(value: number): Execution;
    getTotalGasCost(): string;
    setTotalGasCost(value: string): Execution;
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
        status: ExecutionStatus,
        error: string,
        index: number,
        totalGasCost: string,
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
        getErrorCode(): ErrorCode;
        setErrorCode(value: ErrorCode): Step;
        getLog(): string;
        setLog(value: string): Step;
        clearInputsList(): void;
        getInputsList(): Array<string>;
        setInputsList(value: Array<string>): Step;
        addInputs(value: string, index?: number): string;

        hasConfig(): boolean;
        clearConfig(): void;
        getConfig(): google_protobuf_struct_pb.Value | undefined;
        setConfig(value?: google_protobuf_struct_pb.Value): Step;

        hasMetadata(): boolean;
        clearMetadata(): void;
        getMetadata(): google_protobuf_struct_pb.Value | undefined;
        setMetadata(value?: google_protobuf_struct_pb.Value): Step;

        hasExecutionContext(): boolean;
        clearExecutionContext(): void;
        getExecutionContext(): google_protobuf_struct_pb.Value | undefined;
        setExecutionContext(value?: google_protobuf_struct_pb.Value): Step;
        getGasUsed(): string;
        setGasUsed(value: string): Step;
        getGasPrice(): string;
        setGasPrice(value: string): Step;
        getTotalGasCost(): string;
        setTotalGasCost(value: string): Step;

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

        hasBalance(): boolean;
        clearBalance(): void;
        getBalance(): BalanceNode.Output | undefined;
        setBalance(value?: BalanceNode.Output): Step;
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
            errorCode: ErrorCode,
            log: string,
            inputsList: Array<string>,
            config?: google_protobuf_struct_pb.Value.AsObject,
            metadata?: google_protobuf_struct_pb.Value.AsObject,
            executionContext?: google_protobuf_struct_pb.Value.AsObject,
            gasUsed: string,
            gasPrice: string,
            totalGasCost: string,
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
            balance?: BalanceNode.Output.AsObject,
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
            BALANCE = 30,
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

    getInputVariablesMap(): jspb.Map<string, google_protobuf_struct_pb.Value>;
    clearInputVariablesMap(): void;

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

        inputVariablesMap: Array<[string, google_protobuf_struct_pb.Value.AsObject]>,
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

    getInputVariablesMap(): jspb.Map<string, google_protobuf_struct_pb.Value>;
    clearInputVariablesMap(): void;

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

        inputVariablesMap: Array<[string, google_protobuf_struct_pb.Value.AsObject]>,
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
    getInactiveTaskCount(): number;
    setInactiveTaskCount(value: number): GetWalletResp;

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
        inactiveTaskCount: number,
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

export class WithdrawFundsReq extends jspb.Message { 
    getRecipientAddress(): string;
    setRecipientAddress(value: string): WithdrawFundsReq;
    getAmount(): string;
    setAmount(value: string): WithdrawFundsReq;
    getToken(): string;
    setToken(value: string): WithdrawFundsReq;
    getSmartWalletAddress(): string;
    setSmartWalletAddress(value: string): WithdrawFundsReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WithdrawFundsReq.AsObject;
    static toObject(includeInstance: boolean, msg: WithdrawFundsReq): WithdrawFundsReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WithdrawFundsReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WithdrawFundsReq;
    static deserializeBinaryFromReader(message: WithdrawFundsReq, reader: jspb.BinaryReader): WithdrawFundsReq;
}

export namespace WithdrawFundsReq {
    export type AsObject = {
        recipientAddress: string,
        amount: string,
        token: string,
        smartWalletAddress: string,
    }
}

export class WithdrawFundsResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): WithdrawFundsResp;
    getStatus(): string;
    setStatus(value: string): WithdrawFundsResp;
    getMessage(): string;
    setMessage(value: string): WithdrawFundsResp;
    getUserOpHash(): string;
    setUserOpHash(value: string): WithdrawFundsResp;
    getTransactionHash(): string;
    setTransactionHash(value: string): WithdrawFundsResp;
    getSubmittedAt(): number;
    setSubmittedAt(value: number): WithdrawFundsResp;
    getSmartWalletAddress(): string;
    setSmartWalletAddress(value: string): WithdrawFundsResp;
    getRecipientAddress(): string;
    setRecipientAddress(value: string): WithdrawFundsResp;
    getAmount(): string;
    setAmount(value: string): WithdrawFundsResp;
    getToken(): string;
    setToken(value: string): WithdrawFundsResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WithdrawFundsResp.AsObject;
    static toObject(includeInstance: boolean, msg: WithdrawFundsResp): WithdrawFundsResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WithdrawFundsResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WithdrawFundsResp;
    static deserializeBinaryFromReader(message: WithdrawFundsResp, reader: jspb.BinaryReader): WithdrawFundsResp;
}

export namespace WithdrawFundsResp {
    export type AsObject = {
        success: boolean,
        status: string,
        message: string,
        userOpHash: string,
        transactionHash: string,
        submittedAt: number,
        smartWalletAddress: string,
        recipientAddress: string,
        amount: string,
        token: string,
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

    getTriggerInputMap(): jspb.Map<string, google_protobuf_struct_pb.Value>;
    clearTriggerInputMap(): void;

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

        triggerInputMap: Array<[string, google_protobuf_struct_pb.Value.AsObject]>,
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
    getWorkflowId(): string;
    setWorkflowId(value: string): TriggerTaskResp;

    hasStartAt(): boolean;
    clearStartAt(): void;
    getStartAt(): number | undefined;
    setStartAt(value: number): TriggerTaskResp;

    hasEndAt(): boolean;
    clearEndAt(): void;
    getEndAt(): number | undefined;
    setEndAt(value: number): TriggerTaskResp;

    hasError(): boolean;
    clearError(): void;
    getError(): string | undefined;
    setError(value: string): TriggerTaskResp;
    clearStepsList(): void;
    getStepsList(): Array<Execution.Step>;
    setStepsList(value: Array<Execution.Step>): TriggerTaskResp;
    addSteps(value?: Execution.Step, index?: number): Execution.Step;

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
        workflowId: string,
        startAt?: number,
        endAt?: number,
        error?: string,
        stepsList: Array<Execution.Step.AsObject>,
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

export class DeleteSecretResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): DeleteSecretResp;
    getStatus(): string;
    setStatus(value: string): DeleteSecretResp;
    getMessage(): string;
    setMessage(value: string): DeleteSecretResp;
    getDeletedAt(): number;
    setDeletedAt(value: number): DeleteSecretResp;
    getSecretName(): string;
    setSecretName(value: string): DeleteSecretResp;
    getScope(): string;
    setScope(value: string): DeleteSecretResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteSecretResp.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteSecretResp): DeleteSecretResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteSecretResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteSecretResp;
    static deserializeBinaryFromReader(message: DeleteSecretResp, reader: jspb.BinaryReader): DeleteSecretResp;
}

export namespace DeleteSecretResp {
    export type AsObject = {
        success: boolean,
        status: string,
        message: string,
        deletedAt: number,
        secretName: string,
        scope: string,
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

export class CreateSecretResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): CreateSecretResp;
    getStatus(): string;
    setStatus(value: string): CreateSecretResp;
    getMessage(): string;
    setMessage(value: string): CreateSecretResp;
    getCreatedAt(): number;
    setCreatedAt(value: number): CreateSecretResp;
    getSecretName(): string;
    setSecretName(value: string): CreateSecretResp;
    getScope(): string;
    setScope(value: string): CreateSecretResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateSecretResp.AsObject;
    static toObject(includeInstance: boolean, msg: CreateSecretResp): CreateSecretResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateSecretResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateSecretResp;
    static deserializeBinaryFromReader(message: CreateSecretResp, reader: jspb.BinaryReader): CreateSecretResp;
}

export namespace CreateSecretResp {
    export type AsObject = {
        success: boolean,
        status: string,
        message: string,
        createdAt: number,
        secretName: string,
        scope: string,
    }
}

export class UpdateSecretResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): UpdateSecretResp;
    getStatus(): string;
    setStatus(value: string): UpdateSecretResp;
    getMessage(): string;
    setMessage(value: string): UpdateSecretResp;
    getUpdatedAt(): number;
    setUpdatedAt(value: number): UpdateSecretResp;
    getSecretName(): string;
    setSecretName(value: string): UpdateSecretResp;
    getScope(): string;
    setScope(value: string): UpdateSecretResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateSecretResp.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateSecretResp): UpdateSecretResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateSecretResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateSecretResp;
    static deserializeBinaryFromReader(message: UpdateSecretResp, reader: jspb.BinaryReader): UpdateSecretResp;
}

export namespace UpdateSecretResp {
    export type AsObject = {
        success: boolean,
        status: string,
        message: string,
        updatedAt: number,
        secretName: string,
        scope: string,
    }
}

export class DeleteTaskResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): DeleteTaskResp;
    getStatus(): string;
    setStatus(value: string): DeleteTaskResp;
    getMessage(): string;
    setMessage(value: string): DeleteTaskResp;
    getDeletedAt(): number;
    setDeletedAt(value: number): DeleteTaskResp;
    getId(): string;
    setId(value: string): DeleteTaskResp;
    getPreviousStatus(): string;
    setPreviousStatus(value: string): DeleteTaskResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteTaskResp.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteTaskResp): DeleteTaskResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteTaskResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteTaskResp;
    static deserializeBinaryFromReader(message: DeleteTaskResp, reader: jspb.BinaryReader): DeleteTaskResp;
}

export namespace DeleteTaskResp {
    export type AsObject = {
        success: boolean,
        status: string,
        message: string,
        deletedAt: number,
        id: string,
        previousStatus: string,
    }
}

export class SetTaskActiveReq extends jspb.Message { 
    getId(): string;
    setId(value: string): SetTaskActiveReq;
    getActive(): boolean;
    setActive(value: boolean): SetTaskActiveReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetTaskActiveReq.AsObject;
    static toObject(includeInstance: boolean, msg: SetTaskActiveReq): SetTaskActiveReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetTaskActiveReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetTaskActiveReq;
    static deserializeBinaryFromReader(message: SetTaskActiveReq, reader: jspb.BinaryReader): SetTaskActiveReq;
}

export namespace SetTaskActiveReq {
    export type AsObject = {
        id: string,
        active: boolean,
    }
}

export class SetTaskActiveResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): SetTaskActiveResp;
    getStatus(): string;
    setStatus(value: string): SetTaskActiveResp;
    getMessage(): string;
    setMessage(value: string): SetTaskActiveResp;
    getId(): string;
    setId(value: string): SetTaskActiveResp;
    getPreviousStatus(): string;
    setPreviousStatus(value: string): SetTaskActiveResp;
    getUpdatedAt(): number;
    setUpdatedAt(value: number): SetTaskActiveResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetTaskActiveResp.AsObject;
    static toObject(includeInstance: boolean, msg: SetTaskActiveResp): SetTaskActiveResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetTaskActiveResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetTaskActiveResp;
    static deserializeBinaryFromReader(message: SetTaskActiveResp, reader: jspb.BinaryReader): SetTaskActiveResp;
}

export namespace SetTaskActiveResp {
    export type AsObject = {
        success: boolean,
        status: string,
        message: string,
        id: string,
        previousStatus: string,
        updatedAt: number,
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

    hasNode(): boolean;
    clearNode(): void;
    getNode(): TaskNode | undefined;
    setNode(value?: TaskNode): RunNodeWithInputsReq;

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
        node?: TaskNode.AsObject,

        inputVariablesMap: Array<[string, google_protobuf_struct_pb.Value.AsObject]>,
    }
}

export class RunNodeWithInputsResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): RunNodeWithInputsResp;
    getError(): string;
    setError(value: string): RunNodeWithInputsResp;

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): google_protobuf_struct_pb.Value | undefined;
    setMetadata(value?: google_protobuf_struct_pb.Value): RunNodeWithInputsResp;

    hasExecutionContext(): boolean;
    clearExecutionContext(): void;
    getExecutionContext(): google_protobuf_struct_pb.Value | undefined;
    setExecutionContext(value?: google_protobuf_struct_pb.Value): RunNodeWithInputsResp;
    getErrorCode(): ErrorCode;
    setErrorCode(value: ErrorCode): RunNodeWithInputsResp;

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

    hasBalance(): boolean;
    clearBalance(): void;
    getBalance(): BalanceNode.Output | undefined;
    setBalance(value?: BalanceNode.Output): RunNodeWithInputsResp;

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
        metadata?: google_protobuf_struct_pb.Value.AsObject,
        executionContext?: google_protobuf_struct_pb.Value.AsObject,
        errorCode: ErrorCode,
        ethTransfer?: ETHTransferNode.Output.AsObject,
        graphql?: GraphQLQueryNode.Output.AsObject,
        contractRead?: ContractReadNode.Output.AsObject,
        contractWrite?: ContractWriteNode.Output.AsObject,
        customCode?: CustomCodeNode.Output.AsObject,
        restApi?: RestAPINode.Output.AsObject,
        branch?: BranchNode.Output.AsObject,
        filter?: FilterNode.Output.AsObject,
        loop?: LoopNode.Output.AsObject,
        balance?: BalanceNode.Output.AsObject,
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
        BALANCE = 19,
    }

}

export class RunTriggerReq extends jspb.Message { 

    hasTrigger(): boolean;
    clearTrigger(): void;
    getTrigger(): TaskTrigger | undefined;
    setTrigger(value?: TaskTrigger): RunTriggerReq;

    getTriggerInputMap(): jspb.Map<string, google_protobuf_struct_pb.Value>;
    clearTriggerInputMap(): void;

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
        trigger?: TaskTrigger.AsObject,

        triggerInputMap: Array<[string, google_protobuf_struct_pb.Value.AsObject]>,
    }
}

export class RunTriggerResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): RunTriggerResp;
    getError(): string;
    setError(value: string): RunTriggerResp;

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): google_protobuf_struct_pb.Value | undefined;
    setMetadata(value?: google_protobuf_struct_pb.Value): RunTriggerResp;

    hasExecutionContext(): boolean;
    clearExecutionContext(): void;
    getExecutionContext(): google_protobuf_struct_pb.Value | undefined;
    setExecutionContext(value?: google_protobuf_struct_pb.Value): RunTriggerResp;
    getErrorCode(): ErrorCode;
    setErrorCode(value: ErrorCode): RunTriggerResp;

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
        metadata?: google_protobuf_struct_pb.Value.AsObject,
        executionContext?: google_protobuf_struct_pb.Value.AsObject,
        errorCode: ErrorCode,
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

export class EstimateFeesReq extends jspb.Message { 

    hasTrigger(): boolean;
    clearTrigger(): void;
    getTrigger(): TaskTrigger | undefined;
    setTrigger(value?: TaskTrigger): EstimateFeesReq;
    clearNodesList(): void;
    getNodesList(): Array<TaskNode>;
    setNodesList(value: Array<TaskNode>): EstimateFeesReq;
    addNodes(value?: TaskNode, index?: number): TaskNode;
    clearEdgesList(): void;
    getEdgesList(): Array<TaskEdge>;
    setEdgesList(value: Array<TaskEdge>): EstimateFeesReq;
    addEdges(value?: TaskEdge, index?: number): TaskEdge;
    getCreatedAt(): number;
    setCreatedAt(value: number): EstimateFeesReq;
    getExpireAt(): number;
    setExpireAt(value: number): EstimateFeesReq;
    getMaxExecution(): number;
    setMaxExecution(value: number): EstimateFeesReq;
    getRunner(): string;
    setRunner(value: string): EstimateFeesReq;

    getInputVariablesMap(): jspb.Map<string, google_protobuf_struct_pb.Value>;
    clearInputVariablesMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EstimateFeesReq.AsObject;
    static toObject(includeInstance: boolean, msg: EstimateFeesReq): EstimateFeesReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EstimateFeesReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EstimateFeesReq;
    static deserializeBinaryFromReader(message: EstimateFeesReq, reader: jspb.BinaryReader): EstimateFeesReq;
}

export namespace EstimateFeesReq {
    export type AsObject = {
        trigger?: TaskTrigger.AsObject,
        nodesList: Array<TaskNode.AsObject>,
        edgesList: Array<TaskEdge.AsObject>,
        createdAt: number,
        expireAt: number,
        maxExecution: number,
        runner: string,

        inputVariablesMap: Array<[string, google_protobuf_struct_pb.Value.AsObject]>,
    }
}

export class FeeAmount extends jspb.Message { 
    getNativeTokenAmount(): string;
    setNativeTokenAmount(value: string): FeeAmount;
    getNativeTokenSymbol(): string;
    setNativeTokenSymbol(value: string): FeeAmount;
    getUsdAmount(): string;
    setUsdAmount(value: string): FeeAmount;
    getApTokenAmount(): string;
    setApTokenAmount(value: string): FeeAmount;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FeeAmount.AsObject;
    static toObject(includeInstance: boolean, msg: FeeAmount): FeeAmount.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FeeAmount, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FeeAmount;
    static deserializeBinaryFromReader(message: FeeAmount, reader: jspb.BinaryReader): FeeAmount;
}

export namespace FeeAmount {
    export type AsObject = {
        nativeTokenAmount: string,
        nativeTokenSymbol: string,
        usdAmount: string,
        apTokenAmount: string,
    }
}

export class GasFeeBreakdown extends jspb.Message { 

    hasTotalGasFees(): boolean;
    clearTotalGasFees(): void;
    getTotalGasFees(): FeeAmount | undefined;
    setTotalGasFees(value?: FeeAmount): GasFeeBreakdown;
    clearOperationsList(): void;
    getOperationsList(): Array<GasOperationFee>;
    setOperationsList(value: Array<GasOperationFee>): GasFeeBreakdown;
    addOperations(value?: GasOperationFee, index?: number): GasOperationFee;
    getGasPriceGwei(): string;
    setGasPriceGwei(value: string): GasFeeBreakdown;
    getTotalGasUnits(): string;
    setTotalGasUnits(value: string): GasFeeBreakdown;
    getEstimationAccurate(): boolean;
    setEstimationAccurate(value: boolean): GasFeeBreakdown;
    getEstimationMethod(): string;
    setEstimationMethod(value: string): GasFeeBreakdown;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GasFeeBreakdown.AsObject;
    static toObject(includeInstance: boolean, msg: GasFeeBreakdown): GasFeeBreakdown.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GasFeeBreakdown, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GasFeeBreakdown;
    static deserializeBinaryFromReader(message: GasFeeBreakdown, reader: jspb.BinaryReader): GasFeeBreakdown;
}

export namespace GasFeeBreakdown {
    export type AsObject = {
        totalGasFees?: FeeAmount.AsObject,
        operationsList: Array<GasOperationFee.AsObject>,
        gasPriceGwei: string,
        totalGasUnits: string,
        estimationAccurate: boolean,
        estimationMethod: string,
    }
}

export class GasOperationFee extends jspb.Message { 
    getOperationType(): string;
    setOperationType(value: string): GasOperationFee;
    getNodeId(): string;
    setNodeId(value: string): GasOperationFee;
    getMethodName(): string;
    setMethodName(value: string): GasOperationFee;

    hasFee(): boolean;
    clearFee(): void;
    getFee(): FeeAmount | undefined;
    setFee(value?: FeeAmount): GasOperationFee;
    getGasUnits(): string;
    setGasUnits(value: string): GasOperationFee;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GasOperationFee.AsObject;
    static toObject(includeInstance: boolean, msg: GasOperationFee): GasOperationFee.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GasOperationFee, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GasOperationFee;
    static deserializeBinaryFromReader(message: GasOperationFee, reader: jspb.BinaryReader): GasOperationFee;
}

export namespace GasOperationFee {
    export type AsObject = {
        operationType: string,
        nodeId: string,
        methodName: string,
        fee?: FeeAmount.AsObject,
        gasUnits: string,
    }
}

export class SmartWalletCreationFee extends jspb.Message { 
    getCreationRequired(): boolean;
    setCreationRequired(value: boolean): SmartWalletCreationFee;

    hasCreationFee(): boolean;
    clearCreationFee(): void;
    getCreationFee(): FeeAmount | undefined;
    setCreationFee(value?: FeeAmount): SmartWalletCreationFee;

    hasInitialFunding(): boolean;
    clearInitialFunding(): void;
    getInitialFunding(): FeeAmount | undefined;
    setInitialFunding(value?: FeeAmount): SmartWalletCreationFee;
    getWalletAddress(): string;
    setWalletAddress(value: string): SmartWalletCreationFee;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SmartWalletCreationFee.AsObject;
    static toObject(includeInstance: boolean, msg: SmartWalletCreationFee): SmartWalletCreationFee.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SmartWalletCreationFee, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SmartWalletCreationFee;
    static deserializeBinaryFromReader(message: SmartWalletCreationFee, reader: jspb.BinaryReader): SmartWalletCreationFee;
}

export namespace SmartWalletCreationFee {
    export type AsObject = {
        creationRequired: boolean,
        creationFee?: FeeAmount.AsObject,
        initialFunding?: FeeAmount.AsObject,
        walletAddress: string,
    }
}

export class AutomationFee extends jspb.Message { 

    hasBaseFee(): boolean;
    clearBaseFee(): void;
    getBaseFee(): FeeAmount | undefined;
    setBaseFee(value?: FeeAmount): AutomationFee;

    hasMonitoringFee(): boolean;
    clearMonitoringFee(): void;
    getMonitoringFee(): FeeAmount | undefined;
    setMonitoringFee(value?: FeeAmount): AutomationFee;

    hasExecutionFee(): boolean;
    clearExecutionFee(): void;
    getExecutionFee(): FeeAmount | undefined;
    setExecutionFee(value?: FeeAmount): AutomationFee;
    getTriggerType(): string;
    setTriggerType(value: string): AutomationFee;
    getEstimatedExecutions(): number;
    setEstimatedExecutions(value: number): AutomationFee;
    getDurationMinutes(): number;
    setDurationMinutes(value: number): AutomationFee;
    getFeeCalculationMethod(): string;
    setFeeCalculationMethod(value: string): AutomationFee;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AutomationFee.AsObject;
    static toObject(includeInstance: boolean, msg: AutomationFee): AutomationFee.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AutomationFee, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AutomationFee;
    static deserializeBinaryFromReader(message: AutomationFee, reader: jspb.BinaryReader): AutomationFee;
}

export namespace AutomationFee {
    export type AsObject = {
        baseFee?: FeeAmount.AsObject,
        monitoringFee?: FeeAmount.AsObject,
        executionFee?: FeeAmount.AsObject,
        triggerType: string,
        estimatedExecutions: number,
        durationMinutes: number,
        feeCalculationMethod: string,
    }
}

export class FeeDiscount extends jspb.Message { 
    getDiscountType(): string;
    setDiscountType(value: string): FeeDiscount;
    getDiscountName(): string;
    setDiscountName(value: string): FeeDiscount;
    getAppliesTo(): string;
    setAppliesTo(value: string): FeeDiscount;
    getDiscountPercentage(): number;
    setDiscountPercentage(value: number): FeeDiscount;

    hasDiscountAmount(): boolean;
    clearDiscountAmount(): void;
    getDiscountAmount(): FeeAmount | undefined;
    setDiscountAmount(value?: FeeAmount): FeeDiscount;
    getExpiryDate(): string;
    setExpiryDate(value: string): FeeDiscount;
    getTerms(): string;
    setTerms(value: string): FeeDiscount;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FeeDiscount.AsObject;
    static toObject(includeInstance: boolean, msg: FeeDiscount): FeeDiscount.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FeeDiscount, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FeeDiscount;
    static deserializeBinaryFromReader(message: FeeDiscount, reader: jspb.BinaryReader): FeeDiscount;
}

export namespace FeeDiscount {
    export type AsObject = {
        discountType: string,
        discountName: string,
        appliesTo: string,
        discountPercentage: number,
        discountAmount?: FeeAmount.AsObject,
        expiryDate: string,
        terms: string,
    }
}

export class EstimateFeesResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): EstimateFeesResp;
    getError(): string;
    setError(value: string): EstimateFeesResp;
    getErrorCode(): ErrorCode;
    setErrorCode(value: ErrorCode): EstimateFeesResp;

    hasGasFees(): boolean;
    clearGasFees(): void;
    getGasFees(): GasFeeBreakdown | undefined;
    setGasFees(value?: GasFeeBreakdown): EstimateFeesResp;

    hasAutomationFees(): boolean;
    clearAutomationFees(): void;
    getAutomationFees(): AutomationFee | undefined;
    setAutomationFees(value?: AutomationFee): EstimateFeesResp;

    hasCreationFees(): boolean;
    clearCreationFees(): void;
    getCreationFees(): SmartWalletCreationFee | undefined;
    setCreationFees(value?: SmartWalletCreationFee): EstimateFeesResp;

    hasTotalFees(): boolean;
    clearTotalFees(): void;
    getTotalFees(): FeeAmount | undefined;
    setTotalFees(value?: FeeAmount): EstimateFeesResp;
    clearDiscountsList(): void;
    getDiscountsList(): Array<FeeDiscount>;
    setDiscountsList(value: Array<FeeDiscount>): EstimateFeesResp;
    addDiscounts(value?: FeeDiscount, index?: number): FeeDiscount;

    hasTotalDiscounts(): boolean;
    clearTotalDiscounts(): void;
    getTotalDiscounts(): FeeAmount | undefined;
    setTotalDiscounts(value?: FeeAmount): EstimateFeesResp;

    hasFinalTotal(): boolean;
    clearFinalTotal(): void;
    getFinalTotal(): FeeAmount | undefined;
    setFinalTotal(value?: FeeAmount): EstimateFeesResp;
    getEstimatedAt(): number;
    setEstimatedAt(value: number): EstimateFeesResp;
    getChainId(): string;
    setChainId(value: string): EstimateFeesResp;
    getPriceDataSource(): string;
    setPriceDataSource(value: string): EstimateFeesResp;
    getPriceDataAgeSeconds(): number;
    setPriceDataAgeSeconds(value: number): EstimateFeesResp;
    clearWarningsList(): void;
    getWarningsList(): Array<string>;
    setWarningsList(value: Array<string>): EstimateFeesResp;
    addWarnings(value: string, index?: number): string;
    clearRecommendationsList(): void;
    getRecommendationsList(): Array<string>;
    setRecommendationsList(value: Array<string>): EstimateFeesResp;
    addRecommendations(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EstimateFeesResp.AsObject;
    static toObject(includeInstance: boolean, msg: EstimateFeesResp): EstimateFeesResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EstimateFeesResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EstimateFeesResp;
    static deserializeBinaryFromReader(message: EstimateFeesResp, reader: jspb.BinaryReader): EstimateFeesResp;
}

export namespace EstimateFeesResp {
    export type AsObject = {
        success: boolean,
        error: string,
        errorCode: ErrorCode,
        gasFees?: GasFeeBreakdown.AsObject,
        automationFees?: AutomationFee.AsObject,
        creationFees?: SmartWalletCreationFee.AsObject,
        totalFees?: FeeAmount.AsObject,
        discountsList: Array<FeeDiscount.AsObject>,
        totalDiscounts?: FeeAmount.AsObject,
        finalTotal?: FeeAmount.AsObject,
        estimatedAt: number,
        chainId: string,
        priceDataSource: string,
        priceDataAgeSeconds: number,
        warningsList: Array<string>,
        recommendationsList: Array<string>,
    }
}

export class EventCondition extends jspb.Message { 
    getFieldName(): string;
    setFieldName(value: string): EventCondition;
    getOperator(): string;
    setOperator(value: string): EventCondition;
    getValue(): string;
    setValue(value: string): EventCondition;
    getFieldType(): string;
    setFieldType(value: string): EventCondition;

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
        fieldName: string,
        operator: string,
        value: string,
        fieldType: string,
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
    NODE_TYPE_BALANCE = 10,
}

export enum ExecutionMode {
    EXECUTION_MODE_SEQUENTIAL = 0,
    EXECUTION_MODE_PARALLEL = 1,
}

export enum Lang {
    LANG_UNSPECIFIED = 0,
    LANG_JAVASCRIPT = 1,
    LANG_JSON = 2,
    LANG_GRAPHQL = 3,
    LANG_HANDLEBARS = 4,
}

export enum ErrorCode {
    ERROR_CODE_UNSPECIFIED = 0,
    UNAUTHORIZED = 1000,
    FORBIDDEN = 1001,
    INVALID_SIGNATURE = 1002,
    EXPIRED_TOKEN = 1003,
    TASK_NOT_FOUND = 2000,
    EXECUTION_NOT_FOUND = 2001,
    WALLET_NOT_FOUND = 2002,
    SECRET_NOT_FOUND = 2003,
    TOKEN_METADATA_NOT_FOUND = 2004,
    INVALID_REQUEST = 3000,
    INVALID_TRIGGER_CONFIG = 3001,
    INVALID_NODE_CONFIG = 3002,
    INVALID_WORKFLOW = 3003,
    INVALID_ADDRESS = 3004,
    INVALID_SIGNATURE_FORMAT = 3005,
    MISSING_REQUIRED_FIELD = 3006,
    TASK_ALREADY_EXISTS = 4000,
    TASK_ALREADY_COMPLETED = 4001,
    TASK_ALREADY_CANCELLED = 4002,
    EXECUTION_IN_PROGRESS = 4003,
    WALLET_ALREADY_EXISTS = 4004,
    SECRET_ALREADY_EXISTS = 4005,
    RPC_NODE_ERROR = 5000,
    TENDERLY_API_ERROR = 5001,
    TOKEN_LOOKUP_ERROR = 5002,
    SIMULATION_ERROR = 5003,
    STORAGE_UNAVAILABLE = 6000,
    STORAGE_WRITE_ERROR = 6001,
    STORAGE_READ_ERROR = 6002,
    TASK_DATA_CORRUPTED = 6003,
    EXECUTION_ENGINE_ERROR = 6004,
    RATE_LIMIT_EXCEEDED = 7000,
    QUOTA_EXCEEDED = 7001,
    TOO_MANY_REQUESTS = 7002,
    SMART_WALLET_RPC_ERROR = 8000,
    SMART_WALLET_NOT_FOUND = 8001,
    SMART_WALLET_DEPLOYMENT_ERROR = 8002,
    INSUFFICIENT_BALANCE = 8003,
}

export enum TaskStatus {
    ACTIVE = 0,
    COMPLETED = 1,
    FAILED = 2,
    RUNNING = 4,
    INACTIVE = 5,
}

export enum ExecutionStatus {
    EXECUTION_STATUS_UNSPECIFIED = 0,
    EXECUTION_STATUS_PENDING = 1,
    EXECUTION_STATUS_SUCCESS = 2,
    EXECUTION_STATUS_FAILED = 3,
    EXECUTION_STATUS_PARTIAL_SUCCESS = 4,
}
