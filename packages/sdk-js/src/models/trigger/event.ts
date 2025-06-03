import * as _ from "lodash";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger, { TriggerOutput, TriggerProps } from "./interface";
import { TriggerType } from "@avaprotocol/types";
import { EventTriggerDataType, EventTriggerOutput } from "../node/types";
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
export type EventTriggerProps = TriggerProps & { data: EventTriggerDataType };

class EventTrigger extends Trigger {
  constructor(props: EventTriggerProps) {
    super({ ...props, type: TriggerType.Event, data: props.data });
  }

  toRequest(): avs_pb.TaskTrigger {
    const request = new avs_pb.TaskTrigger();
    request.setName(this.name);
    request.setId(this.id);

    if (!this.data) {
      throw new Error(`Trigger data is missing for ${this.type}`);
    }

    const trigger = new avs_pb.EventTrigger();
    
    const dataConfig = this.data as EventTriggerDataType;
    
    const config = new avs_pb.EventTrigger.Config();
    const expression = dataConfig.expression;
    const matcherList = dataConfig.matcherList;

    if (_.isUndefined(expression) || _.isNull(expression)) {
      throw new Error(`Expression is undefined for ${this.type}`);
    }

    config.setExpression(expression);

    if (matcherList && matcherList.length > 0) {
      const matchers = matcherList.map((element: any) => {
        const m = new avs_pb.EventTrigger.Matcher();
        m.setType(element.type);
        m.setValueList(element.valueList || []);
        return m;
      });
      config.setMatcherList(matchers);
    }
    
    trigger.setConfig(config);

    request.setEvent(trigger);

    return request;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): EventTrigger {
    // Convert the raw object to TriggerProps, which should keep name and id
    const obj = raw.toObject() as unknown as TriggerProps;

    let data: EventTriggerDataType = { expression: "", matcherList: [] };
    
    if (raw.getEvent() && raw.getEvent()!.hasConfig()) {
      const config = raw.getEvent()!.getConfig();
      
      if (config) {
        data = {
          expression: config.getExpression(),
          matcherList: []
        };
        
        if (config.getMatcherList && config.getMatcherList().length > 0) {
          data.matcherList = config.getMatcherList().map((item: any) => {
            return {
              type: item.getType(),
              valueList: item.getValueList() || [],
            };
          });
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
    const eventOutput = outputData.getEventTrigger();
    return eventOutput?.toObject() || null;
  }
}

export default EventTrigger;
