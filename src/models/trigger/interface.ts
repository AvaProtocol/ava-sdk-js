import * as avs_pb from "../../../grpc_codegen/avs_pb";
import _ from "lodash";
export const TriggerTypes = avs_pb.TaskTrigger.TriggerTypeCase;
export type TriggerType = avs_pb.TaskTrigger.TriggerTypeCase;
export type TriggerData =
  | avs_pb.FixedEpochCondition.AsObject
  | avs_pb.CronCondition.AsObject
  | avs_pb.BlockCondition.AsObject
  | avs_pb.EventCondition.AsObject
  | null;

export type TriggerProps = Omit<
  avs_pb.TaskTrigger.AsObject,
  "manual" | "fixedTime" | "cron" | "block" | "event"
> & {
  type: TriggerType;
  data: TriggerData;
};

class Trigger implements TriggerProps {
  name: string;
  type: TriggerType;
  data: TriggerData;

  /**
   * Create an instance of Trigger from user inputs
   * @param props
   */
  constructor(props: TriggerProps) {
    this.name = props.name;
    this.type = props.type;
    this.data = props.data;
  }

  // static getTypeAndData(obj: avs_pb.TaskTrigger.AsObject): {
  //   type: TriggerType;
  //   data: TriggerData;
  // } {
  //   switch (true) {
  //     case !!obj.fixedTime:
  //       return {
  //         type: TriggerTypes.FIXED_TIME,
  //         data: obj.fixedTime,
  //       };
  //     case !!obj.cron:
  //       return { type: TriggerTypes.CRON, data: obj.cron };
  //     case !!obj.block:
  //       return { type: TriggerTypes.BLOCK, data: obj.block };
  //     case !!obj.event:
  //       return { type: TriggerTypes.EVENT, data: obj.event };
  //     case !!obj.manual:
  //       return { type: TriggerTypes.MANUAL, data: null };
  //     default:
  //       throw new Error("Unknown trigger type");
  //   }
  // }

  // /**
  //  * Create an instance of Trigger from AVS getTask response
  //  * @param trigger
  //  */
  // static fromResponse(trigger: avs_pb.TaskTrigger): Trigger {
  //   const raw = trigger.toObject() as avs_pb.TaskTrigger.AsObject;
  //   const { type, data } = Trigger.getTypeAndData(raw);

  //   return new Trigger({
  //     name: raw.name,
  //     type: type,
  //     data: data,
  //   });
  // }

  toRequest(): avs_pb.TaskTrigger {
    // const request = new avs_pb.TaskTrigger();
    // request.setName(this.name);

    // if (!this.data && this.type !== TriggerTypes.MANUAL) {
    //   throw new Error(`Trigger data is missing for ${this.type}`);
    // }

    // switch (this.type) {
    //   case TriggerTypes.FIXED_TIME:
    //     const fixedTime = new avs_pb.FixedEpochCondition();
    //     fixedTime.setEpochsList(this.data as Array<number>);
    //     request.setFixedTime(fixedTime);
    //     break;
    //   case TriggerTypes.CRON:
    //     const cron = new avs_pb.CronCondition();
    //     cron.setScheduleList(this.data as Array<string>);
    //     request.setCron(cron);
    //     break;
    //   case TriggerTypes.BLOCK:
    //     const block = new avs_pb.BlockCondition();
    //     console.log("Trigger.toRequest.block:", this.data);
    //     block.setInterval(this.data as number);
    //     request.setBlock(block);
    //     break;
    //   case TriggerTypes.EVENT:
    //     const event = new avs_pb.EventCondition();
    //     event.setExpression(this.data as string);
    //     request.setEvent(event);
    //     break;
    //   case TriggerTypes.MANUAL:
    //     request.setManual(true);
    //     break;
    //   default:
    //     throw new Error("Unknown trigger type");
    // }

    // console.log("Trigger.toRequest.request:", request.toObject());

    // return request;
    throw new Error("Not implemented");
  }
}

export default Trigger;
