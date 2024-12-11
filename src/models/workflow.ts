import _ from "lodash";
import * as avs_pb from "../../grpc_codegen/avs_pb";
import Execution from "./execution";
import Node from "./node/interface";
import Edge from "./edge";
import Trigger from "./trigger/interface";
import TriggerFactory from "./trigger/factory";
import NodeFactory from "./node/factory";
export const DefaultExpiredAt = -1; // TODO: explain the meaning of -1

export const WorkflowStatuses = avs_pb.TaskStatus;
export type WorkflowStatus = avs_pb.TaskStatus;
export type WorkflowProps = Omit<
  avs_pb.Task.AsObject,
  | "id"
  | "owner"
  | "completedAt"
  | "status"
  | "executionsList"
  | "memo"
  | "trigger"
  | "nodesList"
  | "edgesList"
  | "totalExecution"
  | "lastRanAt"
> & {
  id?: string;
  owner?: string;
  completedAt?: number;
  status?: WorkflowStatus;
  memo?: string;
  trigger: Trigger;
  nodes: Node[];
  edges: Edge[];
  totalExecution?: number;
  lastRanAt?: number;
};

class Workflow implements WorkflowProps {
  smartWalletAddress: string;
  trigger: Trigger;
  nodes: Node[];
  edges: Edge[];
  startAt: number;
  expiredAt: number;
  maxExecution: number;

  // Optional fields
  id?: string; // Id is assigned by the server side, thus not required for initialization
  owner?: string;

  memo?: string;
  completedAt?: number;
  status?: WorkflowStatus;
  totalExecution?: number;
  lastRanAt?: number;

  /**
   * Create an instance of Workflow from user inputs
   * @param props
   */
  constructor(props: WorkflowProps) {
    if (!props.trigger) {
      throw new Error("Trigger is undefined in new Workflow()");
    }

    this.smartWalletAddress = props.smartWalletAddress;
    this.trigger = props.trigger;
    this.nodes = props.nodes;
    this.edges = props.edges;
    this.startAt = props.startAt;
    this.expiredAt = props.expiredAt;
    this.maxExecution = props.maxExecution;

    // Optional fields
    this.id = props.id;
    this.owner = props.owner;
    this.memo = props.memo;
    this.status = props.status;
    this.completedAt = props.completedAt;
    this.totalExecution = props.totalExecution;
    this.lastRanAt = props.lastRanAt;
  }

  /**
   * Create an instance of Workflow from AVS getTask response
   * @param res
   * @returns
   */
  static fromResponse(obj: avs_pb.Task): Workflow {
    const trigger = TriggerFactory.fromResponse(obj.getTrigger()!);

    if (!trigger) {
      throw new Error("Trigger is undefined in fromResponse()");
    }

    const nodes = _.map(obj.getNodesList(), (node) =>
      NodeFactory.fromResponse(node)
    );

    const edges = _.map(obj.getEdgesList(), (edge) => Edge.fromResponse(edge));
    // const executions = _.map(obj.getExecutionsList(), (item) =>
    //   Execution.fromResponse(item)
    // );

    const workflow = new Workflow({
      id: obj.getId(),
      owner: obj.getOwner(),
      smartWalletAddress: obj.getSmartWalletAddress(),
      trigger,
      nodes,
      edges,
      startAt: obj.getStartAt(),
      expiredAt: obj.getExpiredAt(),
      maxExecution: obj.getMaxExecution(),
      memo: obj.getMemo(),
      status: obj.getStatus(),
      completedAt: obj.getCompletedAt(),
      totalExecution: obj.getTotalExecution(),
      lastRanAt: obj.getLastRanAt(),
    });

    return workflow;
  }

  /**
   * Create an instance of Workflow with only selected fields
   * @param obj
   */
  static fromListResponse(obj: avs_pb.ListTasksResp.Item): Workflow {
    const trigger = TriggerFactory.fromResponse(obj.getTrigger()!);

    if (!trigger) {
      throw new Error("Trigger is undefined in fromListResponse()");
    }

    return new Workflow({
      id: obj.getId(),
      smartWalletAddress: obj.getSmartWalletAddress(),
      trigger: trigger,
      startAt: obj.getStartAt(),
      expiredAt: obj.getExpiredAt(),
      maxExecution: obj.getMaxExecution(),
      nodes: [],
      edges: [],
      owner: undefined,
      completedAt: undefined,
      status: undefined,
      memo: undefined,
      totalExecution: undefined,
      lastRanAt: undefined,
    });
  }

  toRequest(): avs_pb.CreateTaskReq {
    const request = new avs_pb.CreateTaskReq();

    // TODO: add client side validation for each field
    request.setSmartWalletAddress(this.smartWalletAddress);

    request.setTrigger(this.trigger.toRequest());

    _.map(this.nodes, (node) => request.addNodes(node.toRequest()));
    _.map(this.edges, (edge) => request.addEdges(edge.toRequest()));

    request.setStartAt(this.startAt);
    request.setExpiredAt(this.expiredAt);
    request.setMaxExecution(this.maxExecution);

    // Optional fields
    if (this.memo) {
      request.setMemo(this.memo);
    }

    console.log("Workflow.toRequest.request:", request.toObject());

    return request;
  }
}

export default Workflow;
