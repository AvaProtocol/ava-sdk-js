import * as avs_pb from "@/grpc_codegen/avs_pb";

export type StepProps = avs_pb.Execution.Step.AsObject;

class Step implements StepProps {
  nodeId: string;
  success: boolean;
  outputData: string;
  log: string;
  error: string;
  startAt: number;
  endAt: number;

  constructor(props: StepProps) {
    this.nodeId = props.nodeId;
    this.success = props.success;
    this.outputData = props.outputData;
    this.log = props.log;
    this.error = props.error;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
  }

  static fromResponse(step: avs_pb.Execution.Step): Step {
    return new Step({
      nodeId: step.getNodeId(),
      success: step.getSuccess(),
      outputData: step.getOutputData(),
      log: step.getLog(),
      error: step.getError(),
      startAt: step.getStartAt(),
      endAt: step.getEndAt(),
    });
  }

  toRequest(): avs_pb.Execution.Step {
    const step = new avs_pb.Execution.Step();
    step.setNodeId(this.nodeId);
    step.setSuccess(this.success);
    step.setOutputData(this.outputData);
    step.setLog(this.log);
    step.setError(this.error);
    step.setStartAt(this.startAt);
    step.setEndAt(this.endAt);

    return step;
  }
}

export default Step;
