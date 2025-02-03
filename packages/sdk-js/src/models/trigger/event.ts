import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger, { TriggerProps } from "./interface";
import { TriggerType } from "../../types";

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
interface EventMatcher {
  type: string;
  value: string[];
}

// Required props for constructor: id, name, type and data: { expression }
export type EventTriggerDataType = avs_pb.EventCondition.AsObject & {
  matcher?: EventMatcher[];
}

export type EventTriggerProps = TriggerProps & { data: EventTriggerDataType };

class EventTrigger extends Trigger {
  constructor(props: EventTriggerProps) {
    super({ ...props, type: TriggerType.Event, data: props.data });

    console.log("EventTrigger.constructor.props:", {
      ...props,
      type: TriggerType.Event,
      data: props.data,
    });
  }

  toRequest(): avs_pb.TaskTrigger {
    const request = new avs_pb.TaskTrigger();
    request.setName(this.name);
    request.setId(this.id);

    if (!this.data) {
      throw new Error(`Trigger data is missing for ${this.type}`);
    }

    const condition = new avs_pb.EventCondition();
    const expression = (this.data as EventTriggerDataType).expression; 
    const matcher = (this.data as EventTriggerDataType).matcher;

    if (expression && expression != "") {
      condition.setExpression(expression);
    }

    if (matcher && matcher.length >= 1) {
        console.log("hit here", matcher);
        condition.setMatcherList(matcher.map(element => {
          const m = new avs_pb.EventCondition.Matcher();
          m.setType(element["type"]);
          m.setValueList(element["value"]);
          return m;
        }));
    }
    request.setEvent(condition);

    console.log("EventTrigger.toRequest.request:", request.toObject());

    return request;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): EventTrigger {
    // Convert the raw object to TriggerProps, which should keep name and id
    const obj = raw.toObject() as unknown as TriggerProps;

    console.log("EventTrigger.fromResponse.obj:", obj);

    let data: EventTriggerDataType = {} as EventTriggerDataType;
    if (raw.getEvent()!.getExpression()) {
      data.expression = raw.getEvent()!.getExpression();
    }

    if (raw.getEvent()!.getMatcherList()) {
      data.matcher = raw.getEvent()!.getMatcherList().map((item: avs_pb.EventCondition.Matcher) => {
        return {
          type: item.getType(),
          value: item.getValueList(),
        }
      });
    }

    //raw.getEvent()!.toObject() as EventTriggerDataType;
    return new EventTrigger({
      ...obj,
      type: TriggerType.Event,
      data: data,
    });
  }
}

export default EventTrigger;
