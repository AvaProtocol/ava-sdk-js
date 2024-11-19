import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace aggregator. */
export namespace aggregator {

    /** Properties of a UUID. */
    interface IUUID {

        /** UUID bytes */
        bytes?: (string|null);
    }

    /** Represents a UUID. */
    class UUID implements IUUID {

        /**
         * Constructs a new UUID.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IUUID);

        /** UUID bytes. */
        public bytes: string;

        /**
         * Creates a new UUID instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UUID instance
         */
        public static create(properties?: aggregator.IUUID): aggregator.UUID;

        /**
         * Encodes the specified UUID message. Does not implicitly {@link aggregator.UUID.verify|verify} messages.
         * @param message UUID message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IUUID, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UUID message, length delimited. Does not implicitly {@link aggregator.UUID.verify|verify} messages.
         * @param message UUID message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IUUID, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UUID message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UUID
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.UUID;

        /**
         * Decodes a UUID message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UUID
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.UUID;

        /**
         * Verifies a UUID message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UUID message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UUID
         */
        public static fromObject(object: { [k: string]: any }): aggregator.UUID;

        /**
         * Creates a plain object from a UUID message. Also converts values to other types if specified.
         * @param message UUID
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.UUID, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UUID to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UUID
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Checkin. */
    interface ICheckin {

        /** Checkin id */
        id?: (string|null);

        /** Checkin address */
        address?: (string|null);

        /** Checkin signature */
        signature?: (string|null);

        /** Checkin status */
        status?: (aggregator.Checkin.IStatus|null);

        /** Checkin version */
        version?: (string|null);

        /** Checkin metricsPort */
        metricsPort?: (number|null);

        /** Checkin remoteIP */
        remoteIP?: (string|null);
    }

    /** Represents a Checkin. */
    class Checkin implements ICheckin {

        /**
         * Constructs a new Checkin.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.ICheckin);

        /** Checkin id. */
        public id: string;

        /** Checkin address. */
        public address: string;

        /** Checkin signature. */
        public signature: string;

        /** Checkin status. */
        public status?: (aggregator.Checkin.IStatus|null);

        /** Checkin version. */
        public version: string;

        /** Checkin metricsPort. */
        public metricsPort: number;

        /** Checkin remoteIP. */
        public remoteIP: string;

        /**
         * Creates a new Checkin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Checkin instance
         */
        public static create(properties?: aggregator.ICheckin): aggregator.Checkin;

        /**
         * Encodes the specified Checkin message. Does not implicitly {@link aggregator.Checkin.verify|verify} messages.
         * @param message Checkin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.ICheckin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Checkin message, length delimited. Does not implicitly {@link aggregator.Checkin.verify|verify} messages.
         * @param message Checkin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.ICheckin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Checkin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Checkin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.Checkin;

        /**
         * Decodes a Checkin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Checkin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.Checkin;

        /**
         * Verifies a Checkin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Checkin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Checkin
         */
        public static fromObject(object: { [k: string]: any }): aggregator.Checkin;

        /**
         * Creates a plain object from a Checkin message. Also converts values to other types if specified.
         * @param message Checkin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.Checkin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Checkin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Checkin
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace Checkin {

        /** Properties of a Status. */
        interface IStatus {

            /** Status uptime */
            uptime?: (number|Long|null);

            /** Status queueDepth */
            queueDepth?: (number|Long|null);

            /** Status lastHeartbeat */
            lastHeartbeat?: (google.protobuf.ITimestamp|null);
        }

        /** Represents a Status. */
        class Status implements IStatus {

            /**
             * Constructs a new Status.
             * @param [properties] Properties to set
             */
            constructor(properties?: aggregator.Checkin.IStatus);

            /** Status uptime. */
            public uptime: (number|Long);

            /** Status queueDepth. */
            public queueDepth: (number|Long);

            /** Status lastHeartbeat. */
            public lastHeartbeat?: (google.protobuf.ITimestamp|null);

            /**
             * Creates a new Status instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Status instance
             */
            public static create(properties?: aggregator.Checkin.IStatus): aggregator.Checkin.Status;

            /**
             * Encodes the specified Status message. Does not implicitly {@link aggregator.Checkin.Status.verify|verify} messages.
             * @param message Status message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: aggregator.Checkin.IStatus, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Status message, length delimited. Does not implicitly {@link aggregator.Checkin.Status.verify|verify} messages.
             * @param message Status message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: aggregator.Checkin.IStatus, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Status message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Status
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.Checkin.Status;

            /**
             * Decodes a Status message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Status
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.Checkin.Status;

            /**
             * Verifies a Status message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Status message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Status
             */
            public static fromObject(object: { [k: string]: any }): aggregator.Checkin.Status;

            /**
             * Creates a plain object from a Status message. Also converts values to other types if specified.
             * @param message Status
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: aggregator.Checkin.Status, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Status to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Status
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** Properties of a CheckinResp. */
    interface ICheckinResp {

        /** CheckinResp updatedAt */
        updatedAt?: (google.protobuf.ITimestamp|null);
    }

    /** Represents a CheckinResp. */
    class CheckinResp implements ICheckinResp {

        /**
         * Constructs a new CheckinResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.ICheckinResp);

        /** CheckinResp updatedAt. */
        public updatedAt?: (google.protobuf.ITimestamp|null);

        /**
         * Creates a new CheckinResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CheckinResp instance
         */
        public static create(properties?: aggregator.ICheckinResp): aggregator.CheckinResp;

        /**
         * Encodes the specified CheckinResp message. Does not implicitly {@link aggregator.CheckinResp.verify|verify} messages.
         * @param message CheckinResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.ICheckinResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CheckinResp message, length delimited. Does not implicitly {@link aggregator.CheckinResp.verify|verify} messages.
         * @param message CheckinResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.ICheckinResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CheckinResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CheckinResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.CheckinResp;

        /**
         * Decodes a CheckinResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CheckinResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.CheckinResp;

        /**
         * Verifies a CheckinResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CheckinResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CheckinResp
         */
        public static fromObject(object: { [k: string]: any }): aggregator.CheckinResp;

        /**
         * Creates a plain object from a CheckinResp message. Also converts values to other types if specified.
         * @param message CheckinResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.CheckinResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CheckinResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CheckinResp
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SyncTasksReq. */
    interface ISyncTasksReq {

        /** SyncTasksReq id */
        id?: (string|null);

        /** SyncTasksReq address */
        address?: (string|null);

        /** SyncTasksReq signature */
        signature?: (string|null);

        /** SyncTasksReq monotonicClock */
        monotonicClock?: (number|Long|null);
    }

    /** Represents a SyncTasksReq. */
    class SyncTasksReq implements ISyncTasksReq {

        /**
         * Constructs a new SyncTasksReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.ISyncTasksReq);

        /** SyncTasksReq id. */
        public id: string;

        /** SyncTasksReq address. */
        public address: string;

        /** SyncTasksReq signature. */
        public signature: string;

        /** SyncTasksReq monotonicClock. */
        public monotonicClock: (number|Long);

        /**
         * Creates a new SyncTasksReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SyncTasksReq instance
         */
        public static create(properties?: aggregator.ISyncTasksReq): aggregator.SyncTasksReq;

        /**
         * Encodes the specified SyncTasksReq message. Does not implicitly {@link aggregator.SyncTasksReq.verify|verify} messages.
         * @param message SyncTasksReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.ISyncTasksReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SyncTasksReq message, length delimited. Does not implicitly {@link aggregator.SyncTasksReq.verify|verify} messages.
         * @param message SyncTasksReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.ISyncTasksReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SyncTasksReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SyncTasksReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.SyncTasksReq;

        /**
         * Decodes a SyncTasksReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SyncTasksReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.SyncTasksReq;

        /**
         * Verifies a SyncTasksReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SyncTasksReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SyncTasksReq
         */
        public static fromObject(object: { [k: string]: any }): aggregator.SyncTasksReq;

        /**
         * Creates a plain object from a SyncTasksReq message. Also converts values to other types if specified.
         * @param message SyncTasksReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.SyncTasksReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SyncTasksReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SyncTasksReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** TriggerType enum. */
    enum TriggerType {
        ManualTrigger = 0,
        FixedEpochTrigger = 1,
        CronTrigger = 2,
        BlockTrigger = 3,
        EventTrigger = 4
    }

    /** Properties of a FixedEpochCondition. */
    interface IFixedEpochCondition {

        /** FixedEpochCondition epoches */
        epoches?: ((number|Long)[]|null);
    }

    /** Represents a FixedEpochCondition. */
    class FixedEpochCondition implements IFixedEpochCondition {

        /**
         * Constructs a new FixedEpochCondition.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IFixedEpochCondition);

        /** FixedEpochCondition epoches. */
        public epoches: (number|Long)[];

        /**
         * Creates a new FixedEpochCondition instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FixedEpochCondition instance
         */
        public static create(properties?: aggregator.IFixedEpochCondition): aggregator.FixedEpochCondition;

        /**
         * Encodes the specified FixedEpochCondition message. Does not implicitly {@link aggregator.FixedEpochCondition.verify|verify} messages.
         * @param message FixedEpochCondition message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IFixedEpochCondition, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified FixedEpochCondition message, length delimited. Does not implicitly {@link aggregator.FixedEpochCondition.verify|verify} messages.
         * @param message FixedEpochCondition message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IFixedEpochCondition, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FixedEpochCondition message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FixedEpochCondition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.FixedEpochCondition;

        /**
         * Decodes a FixedEpochCondition message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns FixedEpochCondition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.FixedEpochCondition;

        /**
         * Verifies a FixedEpochCondition message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FixedEpochCondition message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FixedEpochCondition
         */
        public static fromObject(object: { [k: string]: any }): aggregator.FixedEpochCondition;

        /**
         * Creates a plain object from a FixedEpochCondition message. Also converts values to other types if specified.
         * @param message FixedEpochCondition
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.FixedEpochCondition, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FixedEpochCondition to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for FixedEpochCondition
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CronCondition. */
    interface ICronCondition {

        /** CronCondition cronTable */
        cronTable?: (string[]|null);
    }

    /** Represents a CronCondition. */
    class CronCondition implements ICronCondition {

        /**
         * Constructs a new CronCondition.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.ICronCondition);

        /** CronCondition cronTable. */
        public cronTable: string[];

        /**
         * Creates a new CronCondition instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CronCondition instance
         */
        public static create(properties?: aggregator.ICronCondition): aggregator.CronCondition;

        /**
         * Encodes the specified CronCondition message. Does not implicitly {@link aggregator.CronCondition.verify|verify} messages.
         * @param message CronCondition message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.ICronCondition, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CronCondition message, length delimited. Does not implicitly {@link aggregator.CronCondition.verify|verify} messages.
         * @param message CronCondition message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.ICronCondition, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CronCondition message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CronCondition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.CronCondition;

        /**
         * Decodes a CronCondition message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CronCondition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.CronCondition;

        /**
         * Verifies a CronCondition message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CronCondition message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CronCondition
         */
        public static fromObject(object: { [k: string]: any }): aggregator.CronCondition;

        /**
         * Creates a plain object from a CronCondition message. Also converts values to other types if specified.
         * @param message CronCondition
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.CronCondition, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CronCondition to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CronCondition
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BlockCondition. */
    interface IBlockCondition {

        /** BlockCondition interval */
        interval?: (number|Long|null);
    }

    /** Represents a BlockCondition. */
    class BlockCondition implements IBlockCondition {

        /**
         * Constructs a new BlockCondition.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IBlockCondition);

        /** BlockCondition interval. */
        public interval: (number|Long);

        /**
         * Creates a new BlockCondition instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BlockCondition instance
         */
        public static create(properties?: aggregator.IBlockCondition): aggregator.BlockCondition;

        /**
         * Encodes the specified BlockCondition message. Does not implicitly {@link aggregator.BlockCondition.verify|verify} messages.
         * @param message BlockCondition message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IBlockCondition, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BlockCondition message, length delimited. Does not implicitly {@link aggregator.BlockCondition.verify|verify} messages.
         * @param message BlockCondition message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IBlockCondition, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BlockCondition message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BlockCondition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.BlockCondition;

        /**
         * Decodes a BlockCondition message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BlockCondition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.BlockCondition;

        /**
         * Verifies a BlockCondition message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BlockCondition message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BlockCondition
         */
        public static fromObject(object: { [k: string]: any }): aggregator.BlockCondition;

        /**
         * Creates a plain object from a BlockCondition message. Also converts values to other types if specified.
         * @param message BlockCondition
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.BlockCondition, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BlockCondition to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BlockCondition
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an EventCondition. */
    interface IEventCondition {

        /** EventCondition expression */
        expression?: (string|null);
    }

    /** Represents an EventCondition. */
    class EventCondition implements IEventCondition {

        /**
         * Constructs a new EventCondition.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IEventCondition);

        /** EventCondition expression. */
        public expression: string;

        /**
         * Creates a new EventCondition instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EventCondition instance
         */
        public static create(properties?: aggregator.IEventCondition): aggregator.EventCondition;

        /**
         * Encodes the specified EventCondition message. Does not implicitly {@link aggregator.EventCondition.verify|verify} messages.
         * @param message EventCondition message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IEventCondition, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EventCondition message, length delimited. Does not implicitly {@link aggregator.EventCondition.verify|verify} messages.
         * @param message EventCondition message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IEventCondition, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EventCondition message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EventCondition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.EventCondition;

        /**
         * Decodes an EventCondition message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EventCondition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.EventCondition;

        /**
         * Verifies an EventCondition message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EventCondition message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EventCondition
         */
        public static fromObject(object: { [k: string]: any }): aggregator.EventCondition;

        /**
         * Creates a plain object from an EventCondition message. Also converts values to other types if specified.
         * @param message EventCondition
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.EventCondition, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EventCondition to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for EventCondition
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a TaskTrigger. */
    interface ITaskTrigger {

        /** TaskTrigger triggerType */
        triggerType?: (aggregator.TriggerType|null);

        /** TaskTrigger manual */
        manual?: (boolean|null);

        /** TaskTrigger at */
        at?: (aggregator.IFixedEpochCondition|null);

        /** TaskTrigger cron */
        cron?: (aggregator.ICronCondition|null);

        /** TaskTrigger block */
        block?: (aggregator.IBlockCondition|null);

        /** TaskTrigger event */
        event?: (aggregator.IEventCondition|null);
    }

    /** Represents a TaskTrigger. */
    class TaskTrigger implements ITaskTrigger {

        /**
         * Constructs a new TaskTrigger.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.ITaskTrigger);

        /** TaskTrigger triggerType. */
        public triggerType: aggregator.TriggerType;

        /** TaskTrigger manual. */
        public manual?: (boolean|null);

        /** TaskTrigger at. */
        public at?: (aggregator.IFixedEpochCondition|null);

        /** TaskTrigger cron. */
        public cron?: (aggregator.ICronCondition|null);

        /** TaskTrigger block. */
        public block?: (aggregator.IBlockCondition|null);

        /** TaskTrigger event. */
        public event?: (aggregator.IEventCondition|null);

        /** TaskTrigger triggerCondition. */
        public triggerCondition?: ("manual"|"at"|"cron"|"block"|"event");

        /**
         * Creates a new TaskTrigger instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TaskTrigger instance
         */
        public static create(properties?: aggregator.ITaskTrigger): aggregator.TaskTrigger;

        /**
         * Encodes the specified TaskTrigger message. Does not implicitly {@link aggregator.TaskTrigger.verify|verify} messages.
         * @param message TaskTrigger message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.ITaskTrigger, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TaskTrigger message, length delimited. Does not implicitly {@link aggregator.TaskTrigger.verify|verify} messages.
         * @param message TaskTrigger message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.ITaskTrigger, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TaskTrigger message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TaskTrigger
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.TaskTrigger;

        /**
         * Decodes a TaskTrigger message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TaskTrigger
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.TaskTrigger;

        /**
         * Verifies a TaskTrigger message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TaskTrigger message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TaskTrigger
         */
        public static fromObject(object: { [k: string]: any }): aggregator.TaskTrigger;

        /**
         * Creates a plain object from a TaskTrigger message. Also converts values to other types if specified.
         * @param message TaskTrigger
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.TaskTrigger, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TaskTrigger to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TaskTrigger
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Error enum. */
    enum Error {
        UnknowError = 0,
        RpcNodeError = 1000,
        StorageUnavailable = 2000,
        StorageWriteError = 2001,
        SmartWalletRpcError = 6000,
        SmartWalletNotFoundError = 6001,
        TaskDataCorrupted = 7000,
        TaskDataMissingError = 7001
    }

    /** Properties of a SyncTasksResp. */
    interface ISyncTasksResp {

        /** SyncTasksResp id */
        id?: (string|null);

        /** SyncTasksResp checkType */
        checkType?: (string|null);

        /** SyncTasksResp trigger */
        trigger?: (aggregator.ITaskTrigger|null);
    }

    /** Represents a SyncTasksResp. */
    class SyncTasksResp implements ISyncTasksResp {

        /**
         * Constructs a new SyncTasksResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.ISyncTasksResp);

        /** SyncTasksResp id. */
        public id: string;

        /** SyncTasksResp checkType. */
        public checkType: string;

        /** SyncTasksResp trigger. */
        public trigger?: (aggregator.ITaskTrigger|null);

        /**
         * Creates a new SyncTasksResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SyncTasksResp instance
         */
        public static create(properties?: aggregator.ISyncTasksResp): aggregator.SyncTasksResp;

        /**
         * Encodes the specified SyncTasksResp message. Does not implicitly {@link aggregator.SyncTasksResp.verify|verify} messages.
         * @param message SyncTasksResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.ISyncTasksResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SyncTasksResp message, length delimited. Does not implicitly {@link aggregator.SyncTasksResp.verify|verify} messages.
         * @param message SyncTasksResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.ISyncTasksResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SyncTasksResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SyncTasksResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.SyncTasksResp;

        /**
         * Decodes a SyncTasksResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SyncTasksResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.SyncTasksResp;

        /**
         * Verifies a SyncTasksResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SyncTasksResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SyncTasksResp
         */
        public static fromObject(object: { [k: string]: any }): aggregator.SyncTasksResp;

        /**
         * Creates a plain object from a SyncTasksResp message. Also converts values to other types if specified.
         * @param message SyncTasksResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.SyncTasksResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SyncTasksResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SyncTasksResp
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** TaskStatus enum. */
    enum TaskStatus {
        Active = 0,
        Completed = 1,
        Failed = 2,
        Canceled = 3,
        Executing = 4
    }

    /** Properties of a ETHTransferNode. */
    interface IETHTransferNode {

        /** ETHTransferNode destination */
        destination?: (string|null);

        /** ETHTransferNode amount */
        amount?: (string|null);
    }

    /** Represents a ETHTransferNode. */
    class ETHTransferNode implements IETHTransferNode {

        /**
         * Constructs a new ETHTransferNode.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IETHTransferNode);

        /** ETHTransferNode destination. */
        public destination: string;

        /** ETHTransferNode amount. */
        public amount: string;

        /**
         * Creates a new ETHTransferNode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ETHTransferNode instance
         */
        public static create(properties?: aggregator.IETHTransferNode): aggregator.ETHTransferNode;

        /**
         * Encodes the specified ETHTransferNode message. Does not implicitly {@link aggregator.ETHTransferNode.verify|verify} messages.
         * @param message ETHTransferNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IETHTransferNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ETHTransferNode message, length delimited. Does not implicitly {@link aggregator.ETHTransferNode.verify|verify} messages.
         * @param message ETHTransferNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IETHTransferNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ETHTransferNode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ETHTransferNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.ETHTransferNode;

        /**
         * Decodes a ETHTransferNode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ETHTransferNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.ETHTransferNode;

        /**
         * Verifies a ETHTransferNode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ETHTransferNode message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ETHTransferNode
         */
        public static fromObject(object: { [k: string]: any }): aggregator.ETHTransferNode;

        /**
         * Creates a plain object from a ETHTransferNode message. Also converts values to other types if specified.
         * @param message ETHTransferNode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.ETHTransferNode, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ETHTransferNode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ETHTransferNode
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ContractWriteNode. */
    interface IContractWriteNode {

        /** ContractWriteNode contractAddress */
        contractAddress?: (string|null);

        /** ContractWriteNode callData */
        callData?: (string|null);

        /** ContractWriteNode contractAbi */
        contractAbi?: (string|null);
    }

    /** Represents a ContractWriteNode. */
    class ContractWriteNode implements IContractWriteNode {

        /**
         * Constructs a new ContractWriteNode.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IContractWriteNode);

        /** ContractWriteNode contractAddress. */
        public contractAddress: string;

        /** ContractWriteNode callData. */
        public callData: string;

        /** ContractWriteNode contractAbi. */
        public contractAbi: string;

        /**
         * Creates a new ContractWriteNode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ContractWriteNode instance
         */
        public static create(properties?: aggregator.IContractWriteNode): aggregator.ContractWriteNode;

        /**
         * Encodes the specified ContractWriteNode message. Does not implicitly {@link aggregator.ContractWriteNode.verify|verify} messages.
         * @param message ContractWriteNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IContractWriteNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ContractWriteNode message, length delimited. Does not implicitly {@link aggregator.ContractWriteNode.verify|verify} messages.
         * @param message ContractWriteNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IContractWriteNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ContractWriteNode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ContractWriteNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.ContractWriteNode;

        /**
         * Decodes a ContractWriteNode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ContractWriteNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.ContractWriteNode;

        /**
         * Verifies a ContractWriteNode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ContractWriteNode message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ContractWriteNode
         */
        public static fromObject(object: { [k: string]: any }): aggregator.ContractWriteNode;

        /**
         * Creates a plain object from a ContractWriteNode message. Also converts values to other types if specified.
         * @param message ContractWriteNode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.ContractWriteNode, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ContractWriteNode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ContractWriteNode
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ContractQueryNode. */
    interface IContractQueryNode {

        /** ContractQueryNode contractAddress */
        contractAddress?: (string|null);

        /** ContractQueryNode callData */
        callData?: (string|null);

        /** ContractQueryNode contractAbi */
        contractAbi?: (string|null);
    }

    /** Represents a ContractQueryNode. */
    class ContractQueryNode implements IContractQueryNode {

        /**
         * Constructs a new ContractQueryNode.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IContractQueryNode);

        /** ContractQueryNode contractAddress. */
        public contractAddress: string;

        /** ContractQueryNode callData. */
        public callData: string;

        /** ContractQueryNode contractAbi. */
        public contractAbi: string;

        /**
         * Creates a new ContractQueryNode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ContractQueryNode instance
         */
        public static create(properties?: aggregator.IContractQueryNode): aggregator.ContractQueryNode;

        /**
         * Encodes the specified ContractQueryNode message. Does not implicitly {@link aggregator.ContractQueryNode.verify|verify} messages.
         * @param message ContractQueryNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IContractQueryNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ContractQueryNode message, length delimited. Does not implicitly {@link aggregator.ContractQueryNode.verify|verify} messages.
         * @param message ContractQueryNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IContractQueryNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ContractQueryNode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ContractQueryNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.ContractQueryNode;

        /**
         * Decodes a ContractQueryNode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ContractQueryNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.ContractQueryNode;

        /**
         * Verifies a ContractQueryNode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ContractQueryNode message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ContractQueryNode
         */
        public static fromObject(object: { [k: string]: any }): aggregator.ContractQueryNode;

        /**
         * Creates a plain object from a ContractQueryNode message. Also converts values to other types if specified.
         * @param message ContractQueryNode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.ContractQueryNode, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ContractQueryNode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ContractQueryNode
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GraphQLQueryNode. */
    interface IGraphQLQueryNode {

        /** GraphQLQueryNode url */
        url?: (string|null);

        /** GraphQLQueryNode query */
        query?: (string|null);
    }

    /** Represents a GraphQLQueryNode. */
    class GraphQLQueryNode implements IGraphQLQueryNode {

        /**
         * Constructs a new GraphQLQueryNode.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IGraphQLQueryNode);

        /** GraphQLQueryNode url. */
        public url: string;

        /** GraphQLQueryNode query. */
        public query: string;

        /**
         * Creates a new GraphQLQueryNode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GraphQLQueryNode instance
         */
        public static create(properties?: aggregator.IGraphQLQueryNode): aggregator.GraphQLQueryNode;

        /**
         * Encodes the specified GraphQLQueryNode message. Does not implicitly {@link aggregator.GraphQLQueryNode.verify|verify} messages.
         * @param message GraphQLQueryNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IGraphQLQueryNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GraphQLQueryNode message, length delimited. Does not implicitly {@link aggregator.GraphQLQueryNode.verify|verify} messages.
         * @param message GraphQLQueryNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IGraphQLQueryNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GraphQLQueryNode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GraphQLQueryNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.GraphQLQueryNode;

        /**
         * Decodes a GraphQLQueryNode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GraphQLQueryNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.GraphQLQueryNode;

        /**
         * Verifies a GraphQLQueryNode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GraphQLQueryNode message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GraphQLQueryNode
         */
        public static fromObject(object: { [k: string]: any }): aggregator.GraphQLQueryNode;

        /**
         * Creates a plain object from a GraphQLQueryNode message. Also converts values to other types if specified.
         * @param message GraphQLQueryNode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.GraphQLQueryNode, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GraphQLQueryNode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GraphQLQueryNode
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RestAPINode. */
    interface IRestAPINode {

        /** RestAPINode url */
        url?: (string|null);

        /** RestAPINode headers */
        headers?: ({ [k: string]: string }|null);

        /** RestAPINode body */
        body?: (string|null);

        /** RestAPINode method */
        method?: (string|null);
    }

    /** Represents a RestAPINode. */
    class RestAPINode implements IRestAPINode {

        /**
         * Constructs a new RestAPINode.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IRestAPINode);

        /** RestAPINode url. */
        public url: string;

        /** RestAPINode headers. */
        public headers: { [k: string]: string };

        /** RestAPINode body. */
        public body: string;

        /** RestAPINode method. */
        public method: string;

        /**
         * Creates a new RestAPINode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RestAPINode instance
         */
        public static create(properties?: aggregator.IRestAPINode): aggregator.RestAPINode;

        /**
         * Encodes the specified RestAPINode message. Does not implicitly {@link aggregator.RestAPINode.verify|verify} messages.
         * @param message RestAPINode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IRestAPINode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RestAPINode message, length delimited. Does not implicitly {@link aggregator.RestAPINode.verify|verify} messages.
         * @param message RestAPINode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IRestAPINode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RestAPINode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RestAPINode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.RestAPINode;

        /**
         * Decodes a RestAPINode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RestAPINode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.RestAPINode;

        /**
         * Verifies a RestAPINode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RestAPINode message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RestAPINode
         */
        public static fromObject(object: { [k: string]: any }): aggregator.RestAPINode;

        /**
         * Creates a plain object from a RestAPINode message. Also converts values to other types if specified.
         * @param message RestAPINode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.RestAPINode, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RestAPINode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RestAPINode
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** CustomCodeType enum. */
    enum CustomCodeType {
        JavaScript = 0
    }

    /** Properties of a CustomCodeNode. */
    interface ICustomCodeNode {

        /** CustomCodeNode type */
        type?: (aggregator.CustomCodeType|null);

        /** CustomCodeNode source */
        source?: (string|null);
    }

    /** Represents a CustomCodeNode. */
    class CustomCodeNode implements ICustomCodeNode {

        /**
         * Constructs a new CustomCodeNode.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.ICustomCodeNode);

        /** CustomCodeNode type. */
        public type: aggregator.CustomCodeType;

        /** CustomCodeNode source. */
        public source: string;

        /**
         * Creates a new CustomCodeNode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CustomCodeNode instance
         */
        public static create(properties?: aggregator.ICustomCodeNode): aggregator.CustomCodeNode;

        /**
         * Encodes the specified CustomCodeNode message. Does not implicitly {@link aggregator.CustomCodeNode.verify|verify} messages.
         * @param message CustomCodeNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.ICustomCodeNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CustomCodeNode message, length delimited. Does not implicitly {@link aggregator.CustomCodeNode.verify|verify} messages.
         * @param message CustomCodeNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.ICustomCodeNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CustomCodeNode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CustomCodeNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.CustomCodeNode;

        /**
         * Decodes a CustomCodeNode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CustomCodeNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.CustomCodeNode;

        /**
         * Verifies a CustomCodeNode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CustomCodeNode message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CustomCodeNode
         */
        public static fromObject(object: { [k: string]: any }): aggregator.CustomCodeNode;

        /**
         * Creates a plain object from a CustomCodeNode message. Also converts values to other types if specified.
         * @param message CustomCodeNode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.CustomCodeNode, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CustomCodeNode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CustomCodeNode
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ConditionJump. */
    interface IConditionJump {

        /** ConditionJump expression */
        expression?: (string|null);

        /** ConditionJump next */
        next?: (string|null);
    }

    /** Represents a ConditionJump. */
    class ConditionJump implements IConditionJump {

        /**
         * Constructs a new ConditionJump.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IConditionJump);

        /** ConditionJump expression. */
        public expression: string;

        /** ConditionJump next. */
        public next: string;

        /**
         * Creates a new ConditionJump instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ConditionJump instance
         */
        public static create(properties?: aggregator.IConditionJump): aggregator.ConditionJump;

        /**
         * Encodes the specified ConditionJump message. Does not implicitly {@link aggregator.ConditionJump.verify|verify} messages.
         * @param message ConditionJump message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IConditionJump, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ConditionJump message, length delimited. Does not implicitly {@link aggregator.ConditionJump.verify|verify} messages.
         * @param message ConditionJump message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IConditionJump, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ConditionJump message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ConditionJump
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.ConditionJump;

        /**
         * Decodes a ConditionJump message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ConditionJump
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.ConditionJump;

        /**
         * Verifies a ConditionJump message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ConditionJump message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ConditionJump
         */
        public static fromObject(object: { [k: string]: any }): aggregator.ConditionJump;

        /**
         * Creates a plain object from a ConditionJump message. Also converts values to other types if specified.
         * @param message ConditionJump
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.ConditionJump, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ConditionJump to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ConditionJump
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BranchNode. */
    interface IBranchNode {

        /** BranchNode if */
        "if"?: (aggregator.IConditionJump|null);

        /** BranchNode elseIfs */
        elseIfs?: (aggregator.IConditionJump[]|null);

        /** BranchNode else */
        "else"?: (aggregator.IConditionJump|null);
    }

    /** Represents a BranchNode. */
    class BranchNode implements IBranchNode {

        /**
         * Constructs a new BranchNode.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IBranchNode);

        /** BranchNode if. */
        public if?: (aggregator.IConditionJump|null);

        /** BranchNode elseIfs. */
        public elseIfs: aggregator.IConditionJump[];

        /** BranchNode else. */
        public else?: (aggregator.IConditionJump|null);

        /**
         * Creates a new BranchNode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BranchNode instance
         */
        public static create(properties?: aggregator.IBranchNode): aggregator.BranchNode;

        /**
         * Encodes the specified BranchNode message. Does not implicitly {@link aggregator.BranchNode.verify|verify} messages.
         * @param message BranchNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IBranchNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BranchNode message, length delimited. Does not implicitly {@link aggregator.BranchNode.verify|verify} messages.
         * @param message BranchNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IBranchNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BranchNode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BranchNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.BranchNode;

        /**
         * Decodes a BranchNode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BranchNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.BranchNode;

        /**
         * Verifies a BranchNode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BranchNode message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BranchNode
         */
        public static fromObject(object: { [k: string]: any }): aggregator.BranchNode;

        /**
         * Creates a plain object from a BranchNode message. Also converts values to other types if specified.
         * @param message BranchNode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.BranchNode, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BranchNode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BranchNode
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a FilterNode. */
    interface IFilterNode {

        /** FilterNode expression */
        expression?: (string|null);
    }

    /** Represents a FilterNode. */
    class FilterNode implements IFilterNode {

        /**
         * Constructs a new FilterNode.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IFilterNode);

        /** FilterNode expression. */
        public expression: string;

        /**
         * Creates a new FilterNode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FilterNode instance
         */
        public static create(properties?: aggregator.IFilterNode): aggregator.FilterNode;

        /**
         * Encodes the specified FilterNode message. Does not implicitly {@link aggregator.FilterNode.verify|verify} messages.
         * @param message FilterNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IFilterNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified FilterNode message, length delimited. Does not implicitly {@link aggregator.FilterNode.verify|verify} messages.
         * @param message FilterNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IFilterNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FilterNode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FilterNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.FilterNode;

        /**
         * Decodes a FilterNode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns FilterNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.FilterNode;

        /**
         * Verifies a FilterNode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FilterNode message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FilterNode
         */
        public static fromObject(object: { [k: string]: any }): aggregator.FilterNode;

        /**
         * Creates a plain object from a FilterNode message. Also converts values to other types if specified.
         * @param message FilterNode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.FilterNode, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FilterNode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for FilterNode
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a TaskEdge. */
    interface ITaskEdge {

        /** TaskEdge id */
        id?: (string|null);

        /** TaskEdge source */
        source?: (string|null);

        /** TaskEdge target */
        target?: (string|null);
    }

    /** Represents a TaskEdge. */
    class TaskEdge implements ITaskEdge {

        /**
         * Constructs a new TaskEdge.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.ITaskEdge);

        /** TaskEdge id. */
        public id: string;

        /** TaskEdge source. */
        public source: string;

        /** TaskEdge target. */
        public target: string;

        /**
         * Creates a new TaskEdge instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TaskEdge instance
         */
        public static create(properties?: aggregator.ITaskEdge): aggregator.TaskEdge;

        /**
         * Encodes the specified TaskEdge message. Does not implicitly {@link aggregator.TaskEdge.verify|verify} messages.
         * @param message TaskEdge message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.ITaskEdge, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TaskEdge message, length delimited. Does not implicitly {@link aggregator.TaskEdge.verify|verify} messages.
         * @param message TaskEdge message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.ITaskEdge, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TaskEdge message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TaskEdge
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.TaskEdge;

        /**
         * Decodes a TaskEdge message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TaskEdge
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.TaskEdge;

        /**
         * Verifies a TaskEdge message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TaskEdge message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TaskEdge
         */
        public static fromObject(object: { [k: string]: any }): aggregator.TaskEdge;

        /**
         * Creates a plain object from a TaskEdge message. Also converts values to other types if specified.
         * @param message TaskEdge
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.TaskEdge, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TaskEdge to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TaskEdge
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** TaskType enum. */
    enum TaskType {
        ETHTransferTask = 0,
        ContractWriteTask = 1,
        ContractReadTask = 2,
        GraphQLDataQueryTask = 3,
        RestAPITask = 4,
        BranchTask = 5,
        FilterTask = 6,
        CustomCodeTask = 7
    }

    /** Properties of a TaskNode. */
    interface ITaskNode {

        /** TaskNode nodeType */
        nodeType?: (aggregator.TaskType|null);

        /** TaskNode id */
        id?: (string|null);

        /** TaskNode name */
        name?: (string|null);

        /** TaskNode ethTransfer */
        ethTransfer?: (aggregator.IETHTransferNode|null);

        /** TaskNode contractWrite */
        contractWrite?: (aggregator.IContractWriteNode|null);

        /** TaskNode contractRead */
        contractRead?: (aggregator.IContractQueryNode|null);

        /** TaskNode graphqlDataQuery */
        graphqlDataQuery?: (aggregator.IGraphQLQueryNode|null);

        /** TaskNode restApi */
        restApi?: (aggregator.IRestAPINode|null);

        /** TaskNode branch */
        branch?: (aggregator.IBranchNode|null);

        /** TaskNode filter */
        filter?: (aggregator.IFilterNode|null);

        /** TaskNode customCode */
        customCode?: (aggregator.ICustomCodeNode|null);
    }

    /** Represents a TaskNode. */
    class TaskNode implements ITaskNode {

        /**
         * Constructs a new TaskNode.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.ITaskNode);

        /** TaskNode nodeType. */
        public nodeType: aggregator.TaskType;

        /** TaskNode id. */
        public id: string;

        /** TaskNode name. */
        public name: string;

        /** TaskNode ethTransfer. */
        public ethTransfer?: (aggregator.IETHTransferNode|null);

        /** TaskNode contractWrite. */
        public contractWrite?: (aggregator.IContractWriteNode|null);

        /** TaskNode contractRead. */
        public contractRead?: (aggregator.IContractQueryNode|null);

        /** TaskNode graphqlDataQuery. */
        public graphqlDataQuery?: (aggregator.IGraphQLQueryNode|null);

        /** TaskNode restApi. */
        public restApi?: (aggregator.IRestAPINode|null);

        /** TaskNode branch. */
        public branch?: (aggregator.IBranchNode|null);

        /** TaskNode filter. */
        public filter?: (aggregator.IFilterNode|null);

        /** TaskNode customCode. */
        public customCode?: (aggregator.ICustomCodeNode|null);

        /** TaskNode taskBody. */
        public taskBody?: ("ethTransfer"|"contractWrite"|"contractRead"|"graphqlDataQuery"|"restApi"|"branch"|"filter"|"customCode");

        /**
         * Creates a new TaskNode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TaskNode instance
         */
        public static create(properties?: aggregator.ITaskNode): aggregator.TaskNode;

        /**
         * Encodes the specified TaskNode message. Does not implicitly {@link aggregator.TaskNode.verify|verify} messages.
         * @param message TaskNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.ITaskNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TaskNode message, length delimited. Does not implicitly {@link aggregator.TaskNode.verify|verify} messages.
         * @param message TaskNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.ITaskNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TaskNode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TaskNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.TaskNode;

        /**
         * Decodes a TaskNode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TaskNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.TaskNode;

        /**
         * Verifies a TaskNode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TaskNode message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TaskNode
         */
        public static fromObject(object: { [k: string]: any }): aggregator.TaskNode;

        /**
         * Creates a plain object from a TaskNode message. Also converts values to other types if specified.
         * @param message TaskNode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.TaskNode, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TaskNode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TaskNode
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an Execution. */
    interface IExecution {

        /** Execution epoch */
        epoch?: (number|Long|null);

        /** Execution userOpHash */
        userOpHash?: (string|null);

        /** Execution error */
        error?: (string|null);
    }

    /** Represents an Execution. */
    class Execution implements IExecution {

        /**
         * Constructs a new Execution.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IExecution);

        /** Execution epoch. */
        public epoch: (number|Long);

        /** Execution userOpHash. */
        public userOpHash: string;

        /** Execution error. */
        public error: string;

        /**
         * Creates a new Execution instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Execution instance
         */
        public static create(properties?: aggregator.IExecution): aggregator.Execution;

        /**
         * Encodes the specified Execution message. Does not implicitly {@link aggregator.Execution.verify|verify} messages.
         * @param message Execution message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IExecution, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Execution message, length delimited. Does not implicitly {@link aggregator.Execution.verify|verify} messages.
         * @param message Execution message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IExecution, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Execution message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Execution
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.Execution;

        /**
         * Decodes an Execution message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Execution
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.Execution;

        /**
         * Verifies an Execution message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Execution message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Execution
         */
        public static fromObject(object: { [k: string]: any }): aggregator.Execution;

        /**
         * Creates a plain object from an Execution message. Also converts values to other types if specified.
         * @param message Execution
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.Execution, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Execution to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Execution
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Task. */
    interface ITask {

        /** Task id */
        id?: (aggregator.IUUID|null);

        /** Task owner */
        owner?: (string|null);

        /** Task smartWalletAddress */
        smartWalletAddress?: (string|null);

        /** Task startAt */
        startAt?: (number|Long|null);

        /** Task expiredAt */
        expiredAt?: (number|Long|null);

        /** Task memo */
        memo?: (string|null);

        /** Task completedAt */
        completedAt?: (number|Long|null);

        /** Task recurring */
        recurring?: (boolean|null);

        /** Task status */
        status?: (aggregator.TaskStatus|null);

        /** Task trigger */
        trigger?: (aggregator.ITaskTrigger|null);

        /** Task nodes */
        nodes?: (aggregator.ITaskNode[]|null);

        /** Task edges */
        edges?: (aggregator.ITaskEdge[]|null);

        /** Task executions */
        executions?: (aggregator.IExecution[]|null);
    }

    /** Represents a Task. */
    class Task implements ITask {

        /**
         * Constructs a new Task.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.ITask);

        /** Task id. */
        public id?: (aggregator.IUUID|null);

        /** Task owner. */
        public owner: string;

        /** Task smartWalletAddress. */
        public smartWalletAddress: string;

        /** Task startAt. */
        public startAt: (number|Long);

        /** Task expiredAt. */
        public expiredAt: (number|Long);

        /** Task memo. */
        public memo: string;

        /** Task completedAt. */
        public completedAt: (number|Long);

        /** Task recurring. */
        public recurring: boolean;

        /** Task status. */
        public status: aggregator.TaskStatus;

        /** Task trigger. */
        public trigger?: (aggregator.ITaskTrigger|null);

        /** Task nodes. */
        public nodes: aggregator.ITaskNode[];

        /** Task edges. */
        public edges: aggregator.ITaskEdge[];

        /** Task executions. */
        public executions: aggregator.IExecution[];

        /**
         * Creates a new Task instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Task instance
         */
        public static create(properties?: aggregator.ITask): aggregator.Task;

        /**
         * Encodes the specified Task message. Does not implicitly {@link aggregator.Task.verify|verify} messages.
         * @param message Task message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.ITask, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Task message, length delimited. Does not implicitly {@link aggregator.Task.verify|verify} messages.
         * @param message Task message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.ITask, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Task message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Task
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.Task;

        /**
         * Decodes a Task message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Task
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.Task;

        /**
         * Verifies a Task message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Task message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Task
         */
        public static fromObject(object: { [k: string]: any }): aggregator.Task;

        /**
         * Creates a plain object from a Task message. Also converts values to other types if specified.
         * @param message Task
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.Task, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Task to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Task
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CreateTaskReq. */
    interface ICreateTaskReq {

        /** CreateTaskReq trigger */
        trigger?: (aggregator.ITaskTrigger|null);

        /** CreateTaskReq startAt */
        startAt?: (number|Long|null);

        /** CreateTaskReq expiredAt */
        expiredAt?: (number|Long|null);

        /** CreateTaskReq repeatable */
        repeatable?: (boolean|null);

        /** CreateTaskReq smartWalletAddress */
        smartWalletAddress?: (string|null);

        /** CreateTaskReq memo */
        memo?: (string|null);

        /** CreateTaskReq nodes */
        nodes?: (aggregator.ITaskNode[]|null);

        /** CreateTaskReq edges */
        edges?: (aggregator.ITaskEdge[]|null);
    }

    /** Represents a CreateTaskReq. */
    class CreateTaskReq implements ICreateTaskReq {

        /**
         * Constructs a new CreateTaskReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.ICreateTaskReq);

        /** CreateTaskReq trigger. */
        public trigger?: (aggregator.ITaskTrigger|null);

        /** CreateTaskReq startAt. */
        public startAt: (number|Long);

        /** CreateTaskReq expiredAt. */
        public expiredAt: (number|Long);

        /** CreateTaskReq repeatable. */
        public repeatable: boolean;

        /** CreateTaskReq smartWalletAddress. */
        public smartWalletAddress: string;

        /** CreateTaskReq memo. */
        public memo: string;

        /** CreateTaskReq nodes. */
        public nodes: aggregator.ITaskNode[];

        /** CreateTaskReq edges. */
        public edges: aggregator.ITaskEdge[];

        /**
         * Creates a new CreateTaskReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateTaskReq instance
         */
        public static create(properties?: aggregator.ICreateTaskReq): aggregator.CreateTaskReq;

        /**
         * Encodes the specified CreateTaskReq message. Does not implicitly {@link aggregator.CreateTaskReq.verify|verify} messages.
         * @param message CreateTaskReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.ICreateTaskReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateTaskReq message, length delimited. Does not implicitly {@link aggregator.CreateTaskReq.verify|verify} messages.
         * @param message CreateTaskReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.ICreateTaskReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateTaskReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateTaskReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.CreateTaskReq;

        /**
         * Decodes a CreateTaskReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateTaskReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.CreateTaskReq;

        /**
         * Verifies a CreateTaskReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateTaskReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateTaskReq
         */
        public static fromObject(object: { [k: string]: any }): aggregator.CreateTaskReq;

        /**
         * Creates a plain object from a CreateTaskReq message. Also converts values to other types if specified.
         * @param message CreateTaskReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.CreateTaskReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateTaskReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CreateTaskReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CreateTaskResp. */
    interface ICreateTaskResp {

        /** CreateTaskResp id */
        id?: (string|null);
    }

    /** Represents a CreateTaskResp. */
    class CreateTaskResp implements ICreateTaskResp {

        /**
         * Constructs a new CreateTaskResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.ICreateTaskResp);

        /** CreateTaskResp id. */
        public id: string;

        /**
         * Creates a new CreateTaskResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateTaskResp instance
         */
        public static create(properties?: aggregator.ICreateTaskResp): aggregator.CreateTaskResp;

        /**
         * Encodes the specified CreateTaskResp message. Does not implicitly {@link aggregator.CreateTaskResp.verify|verify} messages.
         * @param message CreateTaskResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.ICreateTaskResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateTaskResp message, length delimited. Does not implicitly {@link aggregator.CreateTaskResp.verify|verify} messages.
         * @param message CreateTaskResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.ICreateTaskResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateTaskResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateTaskResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.CreateTaskResp;

        /**
         * Decodes a CreateTaskResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateTaskResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.CreateTaskResp;

        /**
         * Verifies a CreateTaskResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateTaskResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateTaskResp
         */
        public static fromObject(object: { [k: string]: any }): aggregator.CreateTaskResp;

        /**
         * Creates a plain object from a CreateTaskResp message. Also converts values to other types if specified.
         * @param message CreateTaskResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.CreateTaskResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateTaskResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CreateTaskResp
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a NonceRequest. */
    interface INonceRequest {

        /** NonceRequest owner */
        owner?: (string|null);
    }

    /** Represents a NonceRequest. */
    class NonceRequest implements INonceRequest {

        /**
         * Constructs a new NonceRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.INonceRequest);

        /** NonceRequest owner. */
        public owner: string;

        /**
         * Creates a new NonceRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NonceRequest instance
         */
        public static create(properties?: aggregator.INonceRequest): aggregator.NonceRequest;

        /**
         * Encodes the specified NonceRequest message. Does not implicitly {@link aggregator.NonceRequest.verify|verify} messages.
         * @param message NonceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.INonceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NonceRequest message, length delimited. Does not implicitly {@link aggregator.NonceRequest.verify|verify} messages.
         * @param message NonceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.INonceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NonceRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NonceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.NonceRequest;

        /**
         * Decodes a NonceRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NonceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.NonceRequest;

        /**
         * Verifies a NonceRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NonceRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NonceRequest
         */
        public static fromObject(object: { [k: string]: any }): aggregator.NonceRequest;

        /**
         * Creates a plain object from a NonceRequest message. Also converts values to other types if specified.
         * @param message NonceRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.NonceRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NonceRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for NonceRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a NonceResp. */
    interface INonceResp {

        /** NonceResp nonce */
        nonce?: (string|null);
    }

    /** Represents a NonceResp. */
    class NonceResp implements INonceResp {

        /**
         * Constructs a new NonceResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.INonceResp);

        /** NonceResp nonce. */
        public nonce: string;

        /**
         * Creates a new NonceResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NonceResp instance
         */
        public static create(properties?: aggregator.INonceResp): aggregator.NonceResp;

        /**
         * Encodes the specified NonceResp message. Does not implicitly {@link aggregator.NonceResp.verify|verify} messages.
         * @param message NonceResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.INonceResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NonceResp message, length delimited. Does not implicitly {@link aggregator.NonceResp.verify|verify} messages.
         * @param message NonceResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.INonceResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NonceResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NonceResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.NonceResp;

        /**
         * Decodes a NonceResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NonceResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.NonceResp;

        /**
         * Verifies a NonceResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NonceResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NonceResp
         */
        public static fromObject(object: { [k: string]: any }): aggregator.NonceResp;

        /**
         * Creates a plain object from a NonceResp message. Also converts values to other types if specified.
         * @param message NonceResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.NonceResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NonceResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for NonceResp
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AddressRequest. */
    interface IAddressRequest {

        /** AddressRequest factory */
        factory?: (string|null);

        /** AddressRequest salt */
        salt?: (string|null);
    }

    /** Represents an AddressRequest. */
    class AddressRequest implements IAddressRequest {

        /**
         * Constructs a new AddressRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IAddressRequest);

        /** AddressRequest factory. */
        public factory: string;

        /** AddressRequest salt. */
        public salt: string;

        /**
         * Creates a new AddressRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AddressRequest instance
         */
        public static create(properties?: aggregator.IAddressRequest): aggregator.AddressRequest;

        /**
         * Encodes the specified AddressRequest message. Does not implicitly {@link aggregator.AddressRequest.verify|verify} messages.
         * @param message AddressRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IAddressRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AddressRequest message, length delimited. Does not implicitly {@link aggregator.AddressRequest.verify|verify} messages.
         * @param message AddressRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IAddressRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AddressRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AddressRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.AddressRequest;

        /**
         * Decodes an AddressRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AddressRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.AddressRequest;

        /**
         * Verifies an AddressRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AddressRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AddressRequest
         */
        public static fromObject(object: { [k: string]: any }): aggregator.AddressRequest;

        /**
         * Creates a plain object from an AddressRequest message. Also converts values to other types if specified.
         * @param message AddressRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.AddressRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AddressRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AddressRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SmartWallet. */
    interface ISmartWallet {

        /** SmartWallet address */
        address?: (string|null);

        /** SmartWallet salt */
        salt?: (string|null);

        /** SmartWallet factory */
        factory?: (string|null);
    }

    /** Represents a SmartWallet. */
    class SmartWallet implements ISmartWallet {

        /**
         * Constructs a new SmartWallet.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.ISmartWallet);

        /** SmartWallet address. */
        public address: string;

        /** SmartWallet salt. */
        public salt: string;

        /** SmartWallet factory. */
        public factory: string;

        /**
         * Creates a new SmartWallet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SmartWallet instance
         */
        public static create(properties?: aggregator.ISmartWallet): aggregator.SmartWallet;

        /**
         * Encodes the specified SmartWallet message. Does not implicitly {@link aggregator.SmartWallet.verify|verify} messages.
         * @param message SmartWallet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.ISmartWallet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SmartWallet message, length delimited. Does not implicitly {@link aggregator.SmartWallet.verify|verify} messages.
         * @param message SmartWallet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.ISmartWallet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SmartWallet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SmartWallet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.SmartWallet;

        /**
         * Decodes a SmartWallet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SmartWallet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.SmartWallet;

        /**
         * Verifies a SmartWallet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SmartWallet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SmartWallet
         */
        public static fromObject(object: { [k: string]: any }): aggregator.SmartWallet;

        /**
         * Creates a plain object from a SmartWallet message. Also converts values to other types if specified.
         * @param message SmartWallet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.SmartWallet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SmartWallet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SmartWallet
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AddressResp. */
    interface IAddressResp {

        /** AddressResp wallets */
        wallets?: (aggregator.ISmartWallet[]|null);
    }

    /** Represents an AddressResp. */
    class AddressResp implements IAddressResp {

        /**
         * Constructs a new AddressResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IAddressResp);

        /** AddressResp wallets. */
        public wallets: aggregator.ISmartWallet[];

        /**
         * Creates a new AddressResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AddressResp instance
         */
        public static create(properties?: aggregator.IAddressResp): aggregator.AddressResp;

        /**
         * Encodes the specified AddressResp message. Does not implicitly {@link aggregator.AddressResp.verify|verify} messages.
         * @param message AddressResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IAddressResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AddressResp message, length delimited. Does not implicitly {@link aggregator.AddressResp.verify|verify} messages.
         * @param message AddressResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IAddressResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AddressResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AddressResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.AddressResp;

        /**
         * Decodes an AddressResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AddressResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.AddressResp;

        /**
         * Verifies an AddressResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AddressResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AddressResp
         */
        public static fromObject(object: { [k: string]: any }): aggregator.AddressResp;

        /**
         * Creates a plain object from an AddressResp message. Also converts values to other types if specified.
         * @param message AddressResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.AddressResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AddressResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AddressResp
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListTasksReq. */
    interface IListTasksReq {

        /** ListTasksReq smartWalletAddress */
        smartWalletAddress?: (string|null);
    }

    /** Represents a ListTasksReq. */
    class ListTasksReq implements IListTasksReq {

        /**
         * Constructs a new ListTasksReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IListTasksReq);

        /** ListTasksReq smartWalletAddress. */
        public smartWalletAddress: string;

        /**
         * Creates a new ListTasksReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListTasksReq instance
         */
        public static create(properties?: aggregator.IListTasksReq): aggregator.ListTasksReq;

        /**
         * Encodes the specified ListTasksReq message. Does not implicitly {@link aggregator.ListTasksReq.verify|verify} messages.
         * @param message ListTasksReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IListTasksReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListTasksReq message, length delimited. Does not implicitly {@link aggregator.ListTasksReq.verify|verify} messages.
         * @param message ListTasksReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IListTasksReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListTasksReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListTasksReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.ListTasksReq;

        /**
         * Decodes a ListTasksReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListTasksReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.ListTasksReq;

        /**
         * Verifies a ListTasksReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListTasksReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListTasksReq
         */
        public static fromObject(object: { [k: string]: any }): aggregator.ListTasksReq;

        /**
         * Creates a plain object from a ListTasksReq message. Also converts values to other types if specified.
         * @param message ListTasksReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.ListTasksReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListTasksReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListTasksReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListTasksResp. */
    interface IListTasksResp {

        /** ListTasksResp tasks */
        tasks?: (aggregator.ITask[]|null);
    }

    /** Represents a ListTasksResp. */
    class ListTasksResp implements IListTasksResp {

        /**
         * Constructs a new ListTasksResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IListTasksResp);

        /** ListTasksResp tasks. */
        public tasks: aggregator.ITask[];

        /**
         * Creates a new ListTasksResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListTasksResp instance
         */
        public static create(properties?: aggregator.IListTasksResp): aggregator.ListTasksResp;

        /**
         * Encodes the specified ListTasksResp message. Does not implicitly {@link aggregator.ListTasksResp.verify|verify} messages.
         * @param message ListTasksResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IListTasksResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListTasksResp message, length delimited. Does not implicitly {@link aggregator.ListTasksResp.verify|verify} messages.
         * @param message ListTasksResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IListTasksResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListTasksResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListTasksResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.ListTasksResp;

        /**
         * Decodes a ListTasksResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListTasksResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.ListTasksResp;

        /**
         * Verifies a ListTasksResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListTasksResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListTasksResp
         */
        public static fromObject(object: { [k: string]: any }): aggregator.ListTasksResp;

        /**
         * Creates a plain object from a ListTasksResp message. Also converts values to other types if specified.
         * @param message ListTasksResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.ListTasksResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListTasksResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListTasksResp
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetKeyReq. */
    interface IGetKeyReq {

        /** GetKeyReq owner */
        owner?: (string|null);

        /** GetKeyReq expiredAt */
        expiredAt?: (number|Long|null);

        /** GetKeyReq signature */
        signature?: (string|null);
    }

    /** Represents a GetKeyReq. */
    class GetKeyReq implements IGetKeyReq {

        /**
         * Constructs a new GetKeyReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IGetKeyReq);

        /** GetKeyReq owner. */
        public owner: string;

        /** GetKeyReq expiredAt. */
        public expiredAt: (number|Long);

        /** GetKeyReq signature. */
        public signature: string;

        /**
         * Creates a new GetKeyReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetKeyReq instance
         */
        public static create(properties?: aggregator.IGetKeyReq): aggregator.GetKeyReq;

        /**
         * Encodes the specified GetKeyReq message. Does not implicitly {@link aggregator.GetKeyReq.verify|verify} messages.
         * @param message GetKeyReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IGetKeyReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetKeyReq message, length delimited. Does not implicitly {@link aggregator.GetKeyReq.verify|verify} messages.
         * @param message GetKeyReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IGetKeyReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetKeyReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetKeyReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.GetKeyReq;

        /**
         * Decodes a GetKeyReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetKeyReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.GetKeyReq;

        /**
         * Verifies a GetKeyReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetKeyReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetKeyReq
         */
        public static fromObject(object: { [k: string]: any }): aggregator.GetKeyReq;

        /**
         * Creates a plain object from a GetKeyReq message. Also converts values to other types if specified.
         * @param message GetKeyReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.GetKeyReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetKeyReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetKeyReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a KeyResp. */
    interface IKeyResp {

        /** KeyResp key */
        key?: (string|null);
    }

    /** Represents a KeyResp. */
    class KeyResp implements IKeyResp {

        /**
         * Constructs a new KeyResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IKeyResp);

        /** KeyResp key. */
        public key: string;

        /**
         * Creates a new KeyResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns KeyResp instance
         */
        public static create(properties?: aggregator.IKeyResp): aggregator.KeyResp;

        /**
         * Encodes the specified KeyResp message. Does not implicitly {@link aggregator.KeyResp.verify|verify} messages.
         * @param message KeyResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IKeyResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified KeyResp message, length delimited. Does not implicitly {@link aggregator.KeyResp.verify|verify} messages.
         * @param message KeyResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IKeyResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a KeyResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns KeyResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.KeyResp;

        /**
         * Decodes a KeyResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns KeyResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.KeyResp;

        /**
         * Verifies a KeyResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a KeyResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns KeyResp
         */
        public static fromObject(object: { [k: string]: any }): aggregator.KeyResp;

        /**
         * Creates a plain object from a KeyResp message. Also converts values to other types if specified.
         * @param message KeyResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.KeyResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this KeyResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for KeyResp
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an UpdateChecksReq. */
    interface IUpdateChecksReq {

        /** UpdateChecksReq address */
        address?: (string|null);

        /** UpdateChecksReq signature */
        signature?: (string|null);

        /** UpdateChecksReq id */
        id?: (string[]|null);
    }

    /** Represents an UpdateChecksReq. */
    class UpdateChecksReq implements IUpdateChecksReq {

        /**
         * Constructs a new UpdateChecksReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IUpdateChecksReq);

        /** UpdateChecksReq address. */
        public address: string;

        /** UpdateChecksReq signature. */
        public signature: string;

        /** UpdateChecksReq id. */
        public id: string[];

        /**
         * Creates a new UpdateChecksReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpdateChecksReq instance
         */
        public static create(properties?: aggregator.IUpdateChecksReq): aggregator.UpdateChecksReq;

        /**
         * Encodes the specified UpdateChecksReq message. Does not implicitly {@link aggregator.UpdateChecksReq.verify|verify} messages.
         * @param message UpdateChecksReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IUpdateChecksReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpdateChecksReq message, length delimited. Does not implicitly {@link aggregator.UpdateChecksReq.verify|verify} messages.
         * @param message UpdateChecksReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IUpdateChecksReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpdateChecksReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpdateChecksReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.UpdateChecksReq;

        /**
         * Decodes an UpdateChecksReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpdateChecksReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.UpdateChecksReq;

        /**
         * Verifies an UpdateChecksReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpdateChecksReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpdateChecksReq
         */
        public static fromObject(object: { [k: string]: any }): aggregator.UpdateChecksReq;

        /**
         * Creates a plain object from an UpdateChecksReq message. Also converts values to other types if specified.
         * @param message UpdateChecksReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.UpdateChecksReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpdateChecksReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UpdateChecksReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an UpdateChecksResp. */
    interface IUpdateChecksResp {

        /** UpdateChecksResp updatedAt */
        updatedAt?: (google.protobuf.ITimestamp|null);
    }

    /** Represents an UpdateChecksResp. */
    class UpdateChecksResp implements IUpdateChecksResp {

        /**
         * Constructs a new UpdateChecksResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.IUpdateChecksResp);

        /** UpdateChecksResp updatedAt. */
        public updatedAt?: (google.protobuf.ITimestamp|null);

        /**
         * Creates a new UpdateChecksResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpdateChecksResp instance
         */
        public static create(properties?: aggregator.IUpdateChecksResp): aggregator.UpdateChecksResp;

        /**
         * Encodes the specified UpdateChecksResp message. Does not implicitly {@link aggregator.UpdateChecksResp.verify|verify} messages.
         * @param message UpdateChecksResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.IUpdateChecksResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpdateChecksResp message, length delimited. Does not implicitly {@link aggregator.UpdateChecksResp.verify|verify} messages.
         * @param message UpdateChecksResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.IUpdateChecksResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpdateChecksResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpdateChecksResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.UpdateChecksResp;

        /**
         * Decodes an UpdateChecksResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpdateChecksResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.UpdateChecksResp;

        /**
         * Verifies an UpdateChecksResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpdateChecksResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpdateChecksResp
         */
        public static fromObject(object: { [k: string]: any }): aggregator.UpdateChecksResp;

        /**
         * Creates a plain object from an UpdateChecksResp message. Also converts values to other types if specified.
         * @param message UpdateChecksResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.UpdateChecksResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpdateChecksResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UpdateChecksResp
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CreateWalletReq. */
    interface ICreateWalletReq {

        /** CreateWalletReq salt */
        salt?: (string|null);

        /** CreateWalletReq factoryAddress */
        factoryAddress?: (string|null);
    }

    /** Represents a CreateWalletReq. */
    class CreateWalletReq implements ICreateWalletReq {

        /**
         * Constructs a new CreateWalletReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.ICreateWalletReq);

        /** CreateWalletReq salt. */
        public salt: string;

        /** CreateWalletReq factoryAddress. */
        public factoryAddress: string;

        /**
         * Creates a new CreateWalletReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateWalletReq instance
         */
        public static create(properties?: aggregator.ICreateWalletReq): aggregator.CreateWalletReq;

        /**
         * Encodes the specified CreateWalletReq message. Does not implicitly {@link aggregator.CreateWalletReq.verify|verify} messages.
         * @param message CreateWalletReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.ICreateWalletReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateWalletReq message, length delimited. Does not implicitly {@link aggregator.CreateWalletReq.verify|verify} messages.
         * @param message CreateWalletReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.ICreateWalletReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateWalletReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateWalletReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.CreateWalletReq;

        /**
         * Decodes a CreateWalletReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateWalletReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.CreateWalletReq;

        /**
         * Verifies a CreateWalletReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateWalletReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateWalletReq
         */
        public static fromObject(object: { [k: string]: any }): aggregator.CreateWalletReq;

        /**
         * Creates a plain object from a CreateWalletReq message. Also converts values to other types if specified.
         * @param message CreateWalletReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.CreateWalletReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateWalletReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CreateWalletReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CreateWalletResp. */
    interface ICreateWalletResp {

        /** CreateWalletResp address */
        address?: (string|null);
    }

    /** Represents a CreateWalletResp. */
    class CreateWalletResp implements ICreateWalletResp {

        /**
         * Constructs a new CreateWalletResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: aggregator.ICreateWalletResp);

        /** CreateWalletResp address. */
        public address: string;

        /**
         * Creates a new CreateWalletResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateWalletResp instance
         */
        public static create(properties?: aggregator.ICreateWalletResp): aggregator.CreateWalletResp;

        /**
         * Encodes the specified CreateWalletResp message. Does not implicitly {@link aggregator.CreateWalletResp.verify|verify} messages.
         * @param message CreateWalletResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: aggregator.ICreateWalletResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateWalletResp message, length delimited. Does not implicitly {@link aggregator.CreateWalletResp.verify|verify} messages.
         * @param message CreateWalletResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: aggregator.ICreateWalletResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateWalletResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateWalletResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): aggregator.CreateWalletResp;

        /**
         * Decodes a CreateWalletResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateWalletResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): aggregator.CreateWalletResp;

        /**
         * Verifies a CreateWalletResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateWalletResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateWalletResp
         */
        public static fromObject(object: { [k: string]: any }): aggregator.CreateWalletResp;

        /**
         * Creates a plain object from a CreateWalletResp message. Also converts values to other types if specified.
         * @param message CreateWalletResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: aggregator.CreateWalletResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateWalletResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CreateWalletResp
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Represents an Aggregator */
    class Aggregator extends $protobuf.rpc.Service {

        /**
         * Constructs a new Aggregator service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new Aggregator service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): Aggregator;

        /**
         * Calls GetKey.
         * @param request GetKeyReq message or plain object
         * @param callback Node-style callback called with the error, if any, and KeyResp
         */
        public getKey(request: aggregator.IGetKeyReq, callback: aggregator.Aggregator.GetKeyCallback): void;

        /**
         * Calls GetKey.
         * @param request GetKeyReq message or plain object
         * @returns Promise
         */
        public getKey(request: aggregator.IGetKeyReq): Promise<aggregator.KeyResp>;

        /**
         * Calls GetNonce.
         * @param request NonceRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and NonceResp
         */
        public getNonce(request: aggregator.INonceRequest, callback: aggregator.Aggregator.GetNonceCallback): void;

        /**
         * Calls GetNonce.
         * @param request NonceRequest message or plain object
         * @returns Promise
         */
        public getNonce(request: aggregator.INonceRequest): Promise<aggregator.NonceResp>;

        /**
         * Calls GetSmartAccountAddress.
         * @param request AddressRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and AddressResp
         */
        public getSmartAccountAddress(request: aggregator.IAddressRequest, callback: aggregator.Aggregator.GetSmartAccountAddressCallback): void;

        /**
         * Calls GetSmartAccountAddress.
         * @param request AddressRequest message or plain object
         * @returns Promise
         */
        public getSmartAccountAddress(request: aggregator.IAddressRequest): Promise<aggregator.AddressResp>;

        /**
         * Calls CreateWallet.
         * @param request CreateWalletReq message or plain object
         * @param callback Node-style callback called with the error, if any, and CreateWalletResp
         */
        public createWallet(request: aggregator.ICreateWalletReq, callback: aggregator.Aggregator.CreateWalletCallback): void;

        /**
         * Calls CreateWallet.
         * @param request CreateWalletReq message or plain object
         * @returns Promise
         */
        public createWallet(request: aggregator.ICreateWalletReq): Promise<aggregator.CreateWalletResp>;

        /**
         * Calls CreateTask.
         * @param request CreateTaskReq message or plain object
         * @param callback Node-style callback called with the error, if any, and CreateTaskResp
         */
        public createTask(request: aggregator.ICreateTaskReq, callback: aggregator.Aggregator.CreateTaskCallback): void;

        /**
         * Calls CreateTask.
         * @param request CreateTaskReq message or plain object
         * @returns Promise
         */
        public createTask(request: aggregator.ICreateTaskReq): Promise<aggregator.CreateTaskResp>;

        /**
         * Calls ListTasks.
         * @param request ListTasksReq message or plain object
         * @param callback Node-style callback called with the error, if any, and ListTasksResp
         */
        public listTasks(request: aggregator.IListTasksReq, callback: aggregator.Aggregator.ListTasksCallback): void;

        /**
         * Calls ListTasks.
         * @param request ListTasksReq message or plain object
         * @returns Promise
         */
        public listTasks(request: aggregator.IListTasksReq): Promise<aggregator.ListTasksResp>;

        /**
         * Calls GetTask.
         * @param request UUID message or plain object
         * @param callback Node-style callback called with the error, if any, and Task
         */
        public getTask(request: aggregator.IUUID, callback: aggregator.Aggregator.GetTaskCallback): void;

        /**
         * Calls GetTask.
         * @param request UUID message or plain object
         * @returns Promise
         */
        public getTask(request: aggregator.IUUID): Promise<aggregator.Task>;

        /**
         * Calls CancelTask.
         * @param request UUID message or plain object
         * @param callback Node-style callback called with the error, if any, and BoolValue
         */
        public cancelTask(request: aggregator.IUUID, callback: aggregator.Aggregator.CancelTaskCallback): void;

        /**
         * Calls CancelTask.
         * @param request UUID message or plain object
         * @returns Promise
         */
        public cancelTask(request: aggregator.IUUID): Promise<google.protobuf.BoolValue>;

        /**
         * Calls DeleteTask.
         * @param request UUID message or plain object
         * @param callback Node-style callback called with the error, if any, and BoolValue
         */
        public deleteTask(request: aggregator.IUUID, callback: aggregator.Aggregator.DeleteTaskCallback): void;

        /**
         * Calls DeleteTask.
         * @param request UUID message or plain object
         * @returns Promise
         */
        public deleteTask(request: aggregator.IUUID): Promise<google.protobuf.BoolValue>;

        /**
         * Calls Ping.
         * @param request Checkin message or plain object
         * @param callback Node-style callback called with the error, if any, and CheckinResp
         */
        public ping(request: aggregator.ICheckin, callback: aggregator.Aggregator.PingCallback): void;

        /**
         * Calls Ping.
         * @param request Checkin message or plain object
         * @returns Promise
         */
        public ping(request: aggregator.ICheckin): Promise<aggregator.CheckinResp>;

        /**
         * Calls SyncTasks.
         * @param request SyncTasksReq message or plain object
         * @param callback Node-style callback called with the error, if any, and SyncTasksResp
         */
        public syncTasks(request: aggregator.ISyncTasksReq, callback: aggregator.Aggregator.SyncTasksCallback): void;

        /**
         * Calls SyncTasks.
         * @param request SyncTasksReq message or plain object
         * @returns Promise
         */
        public syncTasks(request: aggregator.ISyncTasksReq): Promise<aggregator.SyncTasksResp>;

        /**
         * Calls UpdateChecks.
         * @param request UpdateChecksReq message or plain object
         * @param callback Node-style callback called with the error, if any, and UpdateChecksResp
         */
        public updateChecks(request: aggregator.IUpdateChecksReq, callback: aggregator.Aggregator.UpdateChecksCallback): void;

        /**
         * Calls UpdateChecks.
         * @param request UpdateChecksReq message or plain object
         * @returns Promise
         */
        public updateChecks(request: aggregator.IUpdateChecksReq): Promise<aggregator.UpdateChecksResp>;
    }

    namespace Aggregator {

        /**
         * Callback as used by {@link aggregator.Aggregator#getKey}.
         * @param error Error, if any
         * @param [response] KeyResp
         */
        type GetKeyCallback = (error: (Error|null), response?: aggregator.KeyResp) => void;

        /**
         * Callback as used by {@link aggregator.Aggregator#getNonce}.
         * @param error Error, if any
         * @param [response] NonceResp
         */
        type GetNonceCallback = (error: (Error|null), response?: aggregator.NonceResp) => void;

        /**
         * Callback as used by {@link aggregator.Aggregator#getSmartAccountAddress}.
         * @param error Error, if any
         * @param [response] AddressResp
         */
        type GetSmartAccountAddressCallback = (error: (Error|null), response?: aggregator.AddressResp) => void;

        /**
         * Callback as used by {@link aggregator.Aggregator#createWallet}.
         * @param error Error, if any
         * @param [response] CreateWalletResp
         */
        type CreateWalletCallback = (error: (Error|null), response?: aggregator.CreateWalletResp) => void;

        /**
         * Callback as used by {@link aggregator.Aggregator#createTask}.
         * @param error Error, if any
         * @param [response] CreateTaskResp
         */
        type CreateTaskCallback = (error: (Error|null), response?: aggregator.CreateTaskResp) => void;

        /**
         * Callback as used by {@link aggregator.Aggregator#listTasks}.
         * @param error Error, if any
         * @param [response] ListTasksResp
         */
        type ListTasksCallback = (error: (Error|null), response?: aggregator.ListTasksResp) => void;

        /**
         * Callback as used by {@link aggregator.Aggregator#getTask}.
         * @param error Error, if any
         * @param [response] Task
         */
        type GetTaskCallback = (error: (Error|null), response?: aggregator.Task) => void;

        /**
         * Callback as used by {@link aggregator.Aggregator#cancelTask}.
         * @param error Error, if any
         * @param [response] BoolValue
         */
        type CancelTaskCallback = (error: (Error|null), response?: google.protobuf.BoolValue) => void;

        /**
         * Callback as used by {@link aggregator.Aggregator#deleteTask}.
         * @param error Error, if any
         * @param [response] BoolValue
         */
        type DeleteTaskCallback = (error: (Error|null), response?: google.protobuf.BoolValue) => void;

        /**
         * Callback as used by {@link aggregator.Aggregator#ping}.
         * @param error Error, if any
         * @param [response] CheckinResp
         */
        type PingCallback = (error: (Error|null), response?: aggregator.CheckinResp) => void;

        /**
         * Callback as used by {@link aggregator.Aggregator#syncTasks}.
         * @param error Error, if any
         * @param [response] SyncTasksResp
         */
        type SyncTasksCallback = (error: (Error|null), response?: aggregator.SyncTasksResp) => void;

        /**
         * Callback as used by {@link aggregator.Aggregator#updateChecks}.
         * @param error Error, if any
         * @param [response] UpdateChecksResp
         */
        type UpdateChecksCallback = (error: (Error|null), response?: aggregator.UpdateChecksResp) => void;
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of a Timestamp. */
        interface ITimestamp {

            /** Timestamp seconds */
            seconds?: (number|Long|null);

            /** Timestamp nanos */
            nanos?: (number|null);
        }

        /** Represents a Timestamp. */
        class Timestamp implements ITimestamp {

            /**
             * Constructs a new Timestamp.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ITimestamp);

            /** Timestamp seconds. */
            public seconds: (number|Long);

            /** Timestamp nanos. */
            public nanos: number;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Timestamp instance
             */
            public static create(properties?: google.protobuf.ITimestamp): google.protobuf.Timestamp;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp;

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp;

            /**
             * Verifies a Timestamp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Timestamp
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @param message Timestamp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Timestamp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Timestamp
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a DoubleValue. */
        interface IDoubleValue {

            /** DoubleValue value */
            value?: (number|null);
        }

        /** Represents a DoubleValue. */
        class DoubleValue implements IDoubleValue {

            /**
             * Constructs a new DoubleValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IDoubleValue);

            /** DoubleValue value. */
            public value: number;

            /**
             * Creates a new DoubleValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DoubleValue instance
             */
            public static create(properties?: google.protobuf.IDoubleValue): google.protobuf.DoubleValue;

            /**
             * Encodes the specified DoubleValue message. Does not implicitly {@link google.protobuf.DoubleValue.verify|verify} messages.
             * @param message DoubleValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IDoubleValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DoubleValue message, length delimited. Does not implicitly {@link google.protobuf.DoubleValue.verify|verify} messages.
             * @param message DoubleValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IDoubleValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DoubleValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DoubleValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DoubleValue;

            /**
             * Decodes a DoubleValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DoubleValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DoubleValue;

            /**
             * Verifies a DoubleValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DoubleValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DoubleValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.DoubleValue;

            /**
             * Creates a plain object from a DoubleValue message. Also converts values to other types if specified.
             * @param message DoubleValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.DoubleValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DoubleValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for DoubleValue
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a FloatValue. */
        interface IFloatValue {

            /** FloatValue value */
            value?: (number|null);
        }

        /** Represents a FloatValue. */
        class FloatValue implements IFloatValue {

            /**
             * Constructs a new FloatValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFloatValue);

            /** FloatValue value. */
            public value: number;

            /**
             * Creates a new FloatValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FloatValue instance
             */
            public static create(properties?: google.protobuf.IFloatValue): google.protobuf.FloatValue;

            /**
             * Encodes the specified FloatValue message. Does not implicitly {@link google.protobuf.FloatValue.verify|verify} messages.
             * @param message FloatValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFloatValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FloatValue message, length delimited. Does not implicitly {@link google.protobuf.FloatValue.verify|verify} messages.
             * @param message FloatValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFloatValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FloatValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FloatValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FloatValue;

            /**
             * Decodes a FloatValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FloatValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FloatValue;

            /**
             * Verifies a FloatValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FloatValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FloatValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FloatValue;

            /**
             * Creates a plain object from a FloatValue message. Also converts values to other types if specified.
             * @param message FloatValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FloatValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FloatValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for FloatValue
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an Int64Value. */
        interface IInt64Value {

            /** Int64Value value */
            value?: (number|Long|null);
        }

        /** Represents an Int64Value. */
        class Int64Value implements IInt64Value {

            /**
             * Constructs a new Int64Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IInt64Value);

            /** Int64Value value. */
            public value: (number|Long);

            /**
             * Creates a new Int64Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Int64Value instance
             */
            public static create(properties?: google.protobuf.IInt64Value): google.protobuf.Int64Value;

            /**
             * Encodes the specified Int64Value message. Does not implicitly {@link google.protobuf.Int64Value.verify|verify} messages.
             * @param message Int64Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IInt64Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Int64Value message, length delimited. Does not implicitly {@link google.protobuf.Int64Value.verify|verify} messages.
             * @param message Int64Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IInt64Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Int64Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Int64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Int64Value;

            /**
             * Decodes an Int64Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Int64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Int64Value;

            /**
             * Verifies an Int64Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Int64Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Int64Value
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Int64Value;

            /**
             * Creates a plain object from an Int64Value message. Also converts values to other types if specified.
             * @param message Int64Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Int64Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Int64Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Int64Value
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a UInt64Value. */
        interface IUInt64Value {

            /** UInt64Value value */
            value?: (number|Long|null);
        }

        /** Represents a UInt64Value. */
        class UInt64Value implements IUInt64Value {

            /**
             * Constructs a new UInt64Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IUInt64Value);

            /** UInt64Value value. */
            public value: (number|Long);

            /**
             * Creates a new UInt64Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UInt64Value instance
             */
            public static create(properties?: google.protobuf.IUInt64Value): google.protobuf.UInt64Value;

            /**
             * Encodes the specified UInt64Value message. Does not implicitly {@link google.protobuf.UInt64Value.verify|verify} messages.
             * @param message UInt64Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IUInt64Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UInt64Value message, length delimited. Does not implicitly {@link google.protobuf.UInt64Value.verify|verify} messages.
             * @param message UInt64Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IUInt64Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a UInt64Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UInt64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UInt64Value;

            /**
             * Decodes a UInt64Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UInt64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UInt64Value;

            /**
             * Verifies a UInt64Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a UInt64Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UInt64Value
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.UInt64Value;

            /**
             * Creates a plain object from a UInt64Value message. Also converts values to other types if specified.
             * @param message UInt64Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.UInt64Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UInt64Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for UInt64Value
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an Int32Value. */
        interface IInt32Value {

            /** Int32Value value */
            value?: (number|null);
        }

        /** Represents an Int32Value. */
        class Int32Value implements IInt32Value {

            /**
             * Constructs a new Int32Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IInt32Value);

            /** Int32Value value. */
            public value: number;

            /**
             * Creates a new Int32Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Int32Value instance
             */
            public static create(properties?: google.protobuf.IInt32Value): google.protobuf.Int32Value;

            /**
             * Encodes the specified Int32Value message. Does not implicitly {@link google.protobuf.Int32Value.verify|verify} messages.
             * @param message Int32Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Int32Value message, length delimited. Does not implicitly {@link google.protobuf.Int32Value.verify|verify} messages.
             * @param message Int32Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Int32Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Int32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Int32Value;

            /**
             * Decodes an Int32Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Int32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Int32Value;

            /**
             * Verifies an Int32Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Int32Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Int32Value
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Int32Value;

            /**
             * Creates a plain object from an Int32Value message. Also converts values to other types if specified.
             * @param message Int32Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Int32Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Int32Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Int32Value
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a UInt32Value. */
        interface IUInt32Value {

            /** UInt32Value value */
            value?: (number|null);
        }

        /** Represents a UInt32Value. */
        class UInt32Value implements IUInt32Value {

            /**
             * Constructs a new UInt32Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IUInt32Value);

            /** UInt32Value value. */
            public value: number;

            /**
             * Creates a new UInt32Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UInt32Value instance
             */
            public static create(properties?: google.protobuf.IUInt32Value): google.protobuf.UInt32Value;

            /**
             * Encodes the specified UInt32Value message. Does not implicitly {@link google.protobuf.UInt32Value.verify|verify} messages.
             * @param message UInt32Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IUInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UInt32Value message, length delimited. Does not implicitly {@link google.protobuf.UInt32Value.verify|verify} messages.
             * @param message UInt32Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IUInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a UInt32Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UInt32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UInt32Value;

            /**
             * Decodes a UInt32Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UInt32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UInt32Value;

            /**
             * Verifies a UInt32Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a UInt32Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UInt32Value
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.UInt32Value;

            /**
             * Creates a plain object from a UInt32Value message. Also converts values to other types if specified.
             * @param message UInt32Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.UInt32Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UInt32Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for UInt32Value
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a BoolValue. */
        interface IBoolValue {

            /** BoolValue value */
            value?: (boolean|null);
        }

        /** Represents a BoolValue. */
        class BoolValue implements IBoolValue {

            /**
             * Constructs a new BoolValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IBoolValue);

            /** BoolValue value. */
            public value: boolean;

            /**
             * Creates a new BoolValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BoolValue instance
             */
            public static create(properties?: google.protobuf.IBoolValue): google.protobuf.BoolValue;

            /**
             * Encodes the specified BoolValue message. Does not implicitly {@link google.protobuf.BoolValue.verify|verify} messages.
             * @param message BoolValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IBoolValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BoolValue message, length delimited. Does not implicitly {@link google.protobuf.BoolValue.verify|verify} messages.
             * @param message BoolValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IBoolValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BoolValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BoolValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.BoolValue;

            /**
             * Decodes a BoolValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BoolValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.BoolValue;

            /**
             * Verifies a BoolValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BoolValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BoolValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.BoolValue;

            /**
             * Creates a plain object from a BoolValue message. Also converts values to other types if specified.
             * @param message BoolValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.BoolValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BoolValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for BoolValue
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a StringValue. */
        interface IStringValue {

            /** StringValue value */
            value?: (string|null);
        }

        /** Represents a StringValue. */
        class StringValue implements IStringValue {

            /**
             * Constructs a new StringValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IStringValue);

            /** StringValue value. */
            public value: string;

            /**
             * Creates a new StringValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StringValue instance
             */
            public static create(properties?: google.protobuf.IStringValue): google.protobuf.StringValue;

            /**
             * Encodes the specified StringValue message. Does not implicitly {@link google.protobuf.StringValue.verify|verify} messages.
             * @param message StringValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IStringValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StringValue message, length delimited. Does not implicitly {@link google.protobuf.StringValue.verify|verify} messages.
             * @param message StringValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IStringValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StringValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StringValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.StringValue;

            /**
             * Decodes a StringValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StringValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.StringValue;

            /**
             * Verifies a StringValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StringValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StringValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.StringValue;

            /**
             * Creates a plain object from a StringValue message. Also converts values to other types if specified.
             * @param message StringValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.StringValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StringValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for StringValue
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a BytesValue. */
        interface IBytesValue {

            /** BytesValue value */
            value?: (Uint8Array|null);
        }

        /** Represents a BytesValue. */
        class BytesValue implements IBytesValue {

            /**
             * Constructs a new BytesValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IBytesValue);

            /** BytesValue value. */
            public value: Uint8Array;

            /**
             * Creates a new BytesValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BytesValue instance
             */
            public static create(properties?: google.protobuf.IBytesValue): google.protobuf.BytesValue;

            /**
             * Encodes the specified BytesValue message. Does not implicitly {@link google.protobuf.BytesValue.verify|verify} messages.
             * @param message BytesValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IBytesValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BytesValue message, length delimited. Does not implicitly {@link google.protobuf.BytesValue.verify|verify} messages.
             * @param message BytesValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IBytesValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BytesValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BytesValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.BytesValue;

            /**
             * Decodes a BytesValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BytesValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.BytesValue;

            /**
             * Verifies a BytesValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BytesValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BytesValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.BytesValue;

            /**
             * Creates a plain object from a BytesValue message. Also converts values to other types if specified.
             * @param message BytesValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.BytesValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BytesValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for BytesValue
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
