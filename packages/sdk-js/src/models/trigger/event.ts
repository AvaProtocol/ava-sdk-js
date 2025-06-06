import * as _ from "lodash";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger, { TriggerOutput } from "./interface";
import { TriggerType, EventTriggerDataType, EventTriggerOutput, EventTriggerProps, TriggerProps } from "@avaprotocol/types";
import util from "util";
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

// Required props for constructor: id, name, type and data: { expression, matcherList }

// EventTrigger now uses queries-based filtering instead of expression/matcher
// Each query represents an independent filter that creates its own subscription
// For FROM-OR-TO scenarios, provide two queries: one for FROM, one for TO.
//
// Example queries structure:
// ```
// [
//   {
//     addressesList: ["0xA0b86a33E6441e6067ec0da4Cc2C8ae77d85e7b1"],
//     topicsList: [
//       {
//         valuesList: [
//           "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
//           null,
//           "0x000000000000000000000000c60e71bd0f2e6d8832fea1a2d56091c48493c788"
//         ]
//       }
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
    const queries = dataConfig.queriesList;

    if (!queries || queries.length === 0) {
      throw new Error(`Queries array is required for ${this.type}`);
    }

    const queryMessages = queries.map((queryData) => {
      const query = new avs_pb.EventTrigger.Query();
      
      // Set addresses if provided
      if (queryData.addressesList && queryData.addressesList.length > 0) {
        query.setAddressesList(queryData.addressesList);
      }
      
      // Set topics if provided
      if (queryData.topicsList && queryData.topicsList.length > 0) {
        const topicsMessages = queryData.topicsList.map((topicData) => {
          const topics = new avs_pb.EventTrigger.Topics();
          if (topicData.valuesList) {
            topics.setValuesList(topicData.valuesList);
          }
          return topics;
        });
        query.setTopicsList(topicsMessages);
      }
      
      // Set maxEventsPerBlock if provided
      if (queryData.maxEventsPerBlock !== undefined) {
        query.setMaxEventsPerBlock(queryData.maxEventsPerBlock);
      }
      
      return query;
    });
    
    config.setQueriesList(queryMessages);
    trigger.setConfig(config);
    request.setEvent(trigger);

    return request;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): EventTrigger {
    // Convert the raw object to TriggerProps, which should keep name and id
    const obj = raw.toObject() as unknown as TriggerProps;

    let data: EventTriggerDataType = { queriesList: [] };
    
    if (raw.getEvent() && raw.getEvent()!.hasConfig()) {
      const config = raw.getEvent()!.getConfig();
      
      if (config) {
        const queries: EventTriggerDataType['queriesList'] = [];
        
        if (config.getQueriesList && config.getQueriesList().length > 0) {
          config.getQueriesList().forEach((query) => {
            const queryData: EventTriggerDataType['queriesList'][0] = {
              addressesList: [],
              topicsList: [],
            };
            
            // Extract addresses
            if (query.getAddressesList && query.getAddressesList().length > 0) {
              queryData.addressesList = query.getAddressesList();
            }
            
            // Extract topics
            if (query.getTopicsList && query.getTopicsList().length > 0) {
              queryData.topicsList = query.getTopicsList().map((topics) => ({
                valuesList: topics.getValuesList() || []
              }));
            }
            
            // Extract maxEventsPerBlock
            const maxEvents = query.getMaxEventsPerBlock();
            if (maxEvents && maxEvents > 0) {
              queryData.maxEventsPerBlock = maxEvents;
            }
            
            queries.push(queryData);
          });
        }
        
        data = { queriesList: queries };
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
    const eventOutput = outputData.getEventTrigger();
    if (eventOutput) {
      if (eventOutput.hasEvmLog()) {
        return eventOutput.getEvmLog()?.toObject();
      } else if (eventOutput.hasTransferLog()) {
        return eventOutput.getTransferLog()?.toObject();
      }
    }
    return null;
  }
}

export default EventTrigger;
