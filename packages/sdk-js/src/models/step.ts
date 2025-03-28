import * as avs_pb from "@/grpc_codegen/avs_pb";

export type StepProps = avs_pb.Execution.Step.AsObject;

class Step implements StepProps {
  nodeId: string;
  success: boolean;
  log: string;
  error: string;
  startAt: number;
  endAt: number;
  inputsList: string[];

  constructor(props: StepProps) {
    this.nodeId = props.nodeId;
    this.success = props.success;
    this.log = props.log;
    this.error = props.error;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.inputsList = props.inputsList;
  }

  static fromResponse(step: avs_pb.Execution.Step): Step {
    return new Step({
      nodeId: step.getNodeId(),
      success: step.getSuccess(),
      log: step.getLog(),
      error: step.getError(),
      startAt: step.getStartAt(),
      endAt: step.getEndAt(),
      inputsList: step.getInputsList(),
    });
  }

  toRequest(): avs_pb.Execution.Step {
    const step = new avs_pb.Execution.Step();
    step.setNodeId(this.nodeId);
    step.setSuccess(this.success);
    step.setLog(this.log);
    step.setError(this.error);
    step.setStartAt(this.startAt);
    step.setEndAt(this.endAt);
    step.setInputsList(this.inputsList);
    return step;
  }
}

export default Step;
