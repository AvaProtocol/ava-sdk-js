import * as _ from "lodash";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import Trigger from "./interface";
import {
  TriggerType,
  EventTriggerDataType,
  EventTriggerOutput,
  EventTriggerProps,
  TriggerProps,
  EventConditionType,
  MethodCallType,
} from "@avaprotocol/types";

import { convertProtobufValueToJs } from "../../utils";
// Ref: https://github.com/AvaProtocol/EigenLayer-AVS/issues/94
// The trigger is an array of Condition, which can be topics, dateRage, etc.
// We imply or operator among all conditions.
// ```
// [
// { type: "topics"
//   value: ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
//            null,
//           "0x000000000000000000000000c60e71bd0f2e6d8832fea1a2d56091c48493c788"],
// },
// {
// type: "topics",
// value:          ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
//            "0x000000000000000000000000c60e71bd0f2e6d8832fea1a2d56091c48493c788",
//       ]
// }
// ]
// ```

// Required props for constructor: id, name, type and data: { queries }

// EventTrigger now uses queries-based filtering instead of expression/matcher
// Each query represents an independent filter that creates its own subscription
// For FROM-OR-TO scenarios, provide two queries: one for FROM, one for TO.
//
// Example queries structure:
// ```
// [
//   {
//     addresses: ["0xA0b86a33E6441e6067ec0da4Cc2C8ae77d85e7b1"],
//     topics: [
//       "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", // [0] event signature
//       null, // [1] FROM address (wildcard - any sender)
//       "0x000000000000000000000000c60e71bd0f2e6d8832fea1a2d56091c48493c788" // [2] TO address
//     ]
//   }
// ]
// ```

class EventTrigger extends Trigger {
  constructor(props: EventTriggerProps) {
    super({ ...props, type: TriggerType.Event, data: props.data });
  }

  toRequest(): avs_pb.TaskTrigger {
    const request = new avs_pb.TaskTrigger();
    request.setName(this.name);
    request.setId(this.id);
    request.setType(avs_pb.TriggerType.TRIGGER_TYPE_EVENT);

    if (!this.data) {
      throw new Error(`Trigger data is missing for ${this.type}`);
    }

    const trigger = new avs_pb.EventTrigger();
    const config = new avs_pb.EventTrigger.Config();

    const dataConfig = this.data as EventTriggerDataType;
    const queries = dataConfig.queries;

    if (!queries || queries.length === 0) {
      throw new Error(`Queries array is required for ${this.type}`);
    }

    const queryMessages = queries.map((queryData) => {
      const query = new avs_pb.EventTrigger.Query();

      // Set addresses if provided
      if (queryData.addresses && queryData.addresses.length > 0) {
        query.setAddressesList(queryData.addresses);
      }

      // Set topics if provided - flat array format
      if (queryData.topics && queryData.topics.length > 0) {
        // Convert null values to empty strings for protobuf compatibility
        // null represents "any value" wildcards in EVM log filtering
        const processedTopics = queryData.topics.map((value) =>
          value === null ? "" : value
        );
        query.setTopicsList(processedTopics);
      }

      // Set maxEventsPerBlock if provided
      if (queryData.maxEventsPerBlock !== undefined) {
        query.setMaxEventsPerBlock(queryData.maxEventsPerBlock);
      }

      // Set contractAbi if provided - must be an array like ContractRead
      if (queryData.contractAbi !== undefined) {
        // Strictly require array format (no string support)
        if (!Array.isArray(queryData.contractAbi)) {
          throw new Error("contractAbi must be an array of ABI elements");
        }

        // Convert array to protobuf Value list
        const abiValueList = queryData.contractAbi.map((item) => {
          const value = new google_protobuf_struct_pb.Value();
          value.setStructValue(
            google_protobuf_struct_pb.Struct.fromJavaScript(item as any)
          );
          return value;
        });
        query.setContractAbiList(abiValueList);
      }

      // Set conditions if provided
      if (queryData.conditions && queryData.conditions.length > 0) {
        const conditionMessages = queryData.conditions.map((conditionData) => {
          const condition = new avs_pb.EventCondition();
          condition.setFieldName(conditionData.fieldName);
          condition.setOperator(conditionData.operator);
          condition.setValue(conditionData.value);
          condition.setFieldType(conditionData.fieldType);
          return condition;
        });
        query.setConditionsList(conditionMessages);
      }

      // Set method calls if provided
      if (queryData.methodCalls && queryData.methodCalls.length > 0) {
        const methodCallMessages = queryData.methodCalls.map(
          (methodCallData: MethodCallType) => {
            const methodCall = new avs_pb.EventTrigger.MethodCall();
            methodCall.setMethodName(methodCallData.methodName);
            methodCall.setMethodParamsList(methodCallData.methodParams);

            // Optional: Set callData if provided
            if (methodCallData.callData) {
              methodCall.setCallData(methodCallData.callData);
            }

            // Optional: Set applyToFields if provided
            if (
              methodCallData.applyToFields &&
              methodCallData.applyToFields.length > 0
            ) {
              methodCall.setApplyToFieldsList(methodCallData.applyToFields);
            }
            return methodCall;
          }
        );
        query.setMethodCallsList(methodCallMessages);
      }

      return query;
    });

    config.setQueriesList(queryMessages);

    // Set cooldownSeconds if provided
    if (dataConfig.cooldownSeconds !== undefined) {
      config.setCooldownSeconds(dataConfig.cooldownSeconds);
    }

    trigger.setConfig(config);

    request.setEvent(trigger);

    return request;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): EventTrigger {
    // Convert the raw object to TriggerProps, which should keep name and id
    const obj = raw.toObject() as unknown as TriggerProps;

    let data: EventTriggerDataType = { queries: [] };

    if (raw.getEvent() && raw.getEvent()!.hasConfig()) {
      const config = raw.getEvent()!.getConfig();

      if (config) {
        const queries: EventTriggerDataType["queries"] = [];

        if (config.getQueriesList && config.getQueriesList().length > 0) {
          config.getQueriesList().forEach((query) => {
            const queryData: EventTriggerDataType["queries"][0] = {
              addresses: [],
              topics: [], // Flat array of topic strings
              contractAbi: [], // Add the required contractAbi field
            };

            // Extract addresses
            if (query.getAddressesList && query.getAddressesList().length > 0) {
              queryData.addresses = query.getAddressesList();
            }

            // Extract topics - now a flat array
            if (query.getTopicsList && query.getTopicsList().length > 0) {
              // Convert empty strings back to null for JavaScript compatibility
              // Empty strings represent wildcards in the protobuf representation
              queryData.topics = query
                .getTopicsList()
                .map((topic) => (topic === "" ? null : topic));
            }

            // Extract maxEventsPerBlock
            const maxEvents = query.getMaxEventsPerBlock();
            if (maxEvents && maxEvents > 0) {
              queryData.maxEventsPerBlock = maxEvents;
            }

            // Extract contractAbi
            const contractAbi = query.getContractAbiList();
            if (contractAbi && contractAbi.length > 0) {
              queryData.contractAbi = contractAbi.map((value) =>
                convertProtobufValueToJs(value)
              );
            }

            // Extract conditions
            const conditions: EventConditionType[] = [];
            if (
              query.getConditionsList &&
              query.getConditionsList().length > 0
            ) {
              query.getConditionsList().forEach((condition) => {
                const conditionData: EventConditionType = {
                  fieldName: condition.getFieldName(),
                  operator: condition.getOperator(),
                  value: condition.getValue(),
                  fieldType: condition.getFieldType(),
                };
                conditions.push(conditionData);
              });
            }
            if (conditions.length > 0) {
              queryData.conditions = conditions;
            }

            queries.push(queryData);
          });
        }

        // Extract cooldownSeconds if present
        // Use hasCooldownSeconds() to check if field was set, since getCooldownSeconds()
        // returns 0 (default uint32 value) when field is not set
        data = { queries: queries };

        if (config.hasCooldownSeconds()) {
          data.cooldownSeconds = config.getCooldownSeconds();
        }
      }
    }

    return new EventTrigger({
      ...obj,
      type: TriggerType.Event,
      data: data,
    });
  }

  /**
   * Convert raw data from runTrigger response to EventOutput format
   * @param rawData - The raw data from the gRPC response
   * @returns {EventTriggerOutput | undefined} - The converted data
   */
  getOutput(): EventTriggerOutput | undefined {
    return this.output as EventTriggerOutput;
  }

  /**
   * Extract output data from RunTriggerResp for event triggers
   * @param outputData - The RunTriggerResp containing event trigger output
   * @returns Plain JavaScript object with event trigger data
   */
  static fromOutputData(outputData: avs_pb.RunTriggerResp): any {
    // Try to get data from protobuf structure first
    const eventOutput = outputData.getEventTrigger();
    if (eventOutput) {
      const dataValue = eventOutput.getData();
      if (dataValue) {
        try {
          // Convert protobuf Value to JavaScript object
          const convertedData = convertProtobufValueToJs(dataValue);
          // If the converted data is an empty string, return null
          if (convertedData === "") {
            return null;
          }
          return convertedData;
        } catch (error) {
          console.warn(
            "Failed to convert event trigger data from protobuf Value:",
            error
          );
          // Return the raw protobuf Value object as fallback
          return dataValue;
        }
      }
    }
    return null;
  }
}

export default EventTrigger;
