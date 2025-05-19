import * as _ from "lodash";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger, { TriggerProps } from "./interface";
import { TriggerType } from "@avaprotocol/types";
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
export type EventTriggerDataType = avs_pb.EventCondition.AsObject;

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

    const condition = new avs_pb.EventCondition();
    const expression = (this.data as EventTriggerDataType).expression;
    const matcherList = (this.data as EventTriggerDataType).matcherList;

    if (_.isUndefined(expression)) {
      throw new Error(`Expression is undefined for ${this.type}`);
    }

    condition.setExpression(expression);

    if (_.isUndefined(matcherList)) {
      throw new Error(`Matcher list is undefined for ${this.type}`);
    }

    condition.setMatcherList(
      matcherList.map((element) => {
        const m = new avs_pb.EventCondition.Matcher();
        m.setType(element["type"]);
        m.setValueList(element["valueList"]);
        return m;
      })
    );

    request.setEvent(condition);

    return request;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): EventTrigger {
    // Convert the raw object to TriggerProps, which should keep name and id
    const obj = raw.toObject() as unknown as TriggerProps;

    let data: EventTriggerDataType = {} as EventTriggerDataType;
    if (raw.getEvent()!.getExpression()) {
      data.expression = raw.getEvent()!.getExpression();
    }

    if (raw.getEvent()!.getMatcherList()) {
      data.matcherList = raw
        .getEvent()!
        .getMatcherList()
        .map((item: avs_pb.EventCondition.Matcher) => {
          return {
            type: item.getType(),
            valueList: item.getValueList(),
          };
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
