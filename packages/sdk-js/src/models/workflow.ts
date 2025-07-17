import _ from "lodash";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import Node from "./node/interface";
import Edge from "./edge";
import Trigger from "./trigger/interface";
import TriggerFactory from "./trigger/factory";
import NodeFactory from "./node/factory";
export const DefaultExpiredAt = -1; // TODO: explain the meaning of -1
import { WorkflowStatus, WorkflowProps } from "@avaprotocol/types";

// Function to convert TaskStatus to string
export function convertStatusToString(
  status: avs_pb.TaskStatus
): WorkflowStatus {
  const conversionMap: { [key in avs_pb.TaskStatus]: WorkflowStatus } = {
    [avs_pb.TaskStatus.ACTIVE]: WorkflowStatus.Active,
    [avs_pb.TaskStatus.COMPLETED]: WorkflowStatus.Completed,
    [avs_pb.TaskStatus.FAILED]: WorkflowStatus.Failed,
    [avs_pb.TaskStatus.CANCELED]: WorkflowStatus.Canceled,
    [avs_pb.TaskStatus.EXECUTING]: WorkflowStatus.Executing,
  };

  return conversionMap[status] as WorkflowStatus;
}

class Workflow implements WorkflowProps {
  smartWalletAddress: string;
  trigger: Trigger;
  nodes: Node[];
  edges: Edge[];
  startAt: number;
  expiredAt: number;
  maxExecution: number;

  // Optional fields
  id?: string;
  owner?: string;
  name?: string;
  completedAt?: number;
  status?: WorkflowStatus;
  lastRanAt?: number;
  executionCount?: number;

  /**
   * Create an instance of Workflow from user inputs
   * @param props
   */
  constructor(props: WorkflowProps) {
    if (!props.trigger) {
      throw new Error("Trigger is undefined in new Workflow()");
    }

    this.smartWalletAddress = props.smartWalletAddress;
    this.trigger = props.trigger as any;
    this.nodes = props.nodes as any;
    this.edges = props.edges as any;
    this.startAt = props.startAt;
    this.expiredAt = props.expiredAt;
    this.maxExecution = props.maxExecution;
    this.executionCount = props.executionCount;

    // Optional fields
    this.id = props.id;
    this.owner = props.owner;
    this.name = props.name;
    this.status = props.status;
    this.completedAt = props.completedAt;
    this.lastRanAt = props.lastRanAt;
  }

  /**
   * Create an instance of Workflow from AVS getWorkflow response
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
      executionCount: obj.getExecutionCount(),
      name: obj.getName(),
      status: convertStatusToString(obj.getStatus()),
      completedAt: obj.getCompletedAt(),
      lastRanAt: obj.getLastRanAt(),
    });

    return workflow;
  }

  /**
   * Create an instance of Workflow with only selected fields
   * @param obj
   */
  static fromListResponse(obj: avs_pb.Task): Workflow {
    const trigger = TriggerFactory.fromResponse(obj.getTrigger()!);

    if (!trigger) {
      throw new Error("Trigger is undefined in fromListResponse()");
    }

    return new Workflow({
      id: obj.getId(),
      owner: obj.getOwner(),
      smartWalletAddress: obj.getSmartWalletAddress(),
      trigger: trigger,
      startAt: obj.getStartAt(),
      expiredAt: obj.getExpiredAt(),
      maxExecution: obj.getMaxExecution(),
      executionCount: obj.getExecutionCount(),
      nodes: _.map(obj.getNodesList(), (node) => NodeFactory.fromResponse(node)),
      edges: _.map(obj.getEdgesList(), (edge) => Edge.fromResponse(edge)),
      completedAt: obj.getCompletedAt(),
      status: convertStatusToString(obj.getStatus()),
      name: obj.getName(),
      lastRanAt: obj.getLastRanAt(),
    });
  }

  toRequest(): avs_pb.CreateTaskReq {
    const request = new avs_pb.CreateTaskReq();

    // TODO: add client side validation for each field
    request.setSmartWalletAddress(this.smartWalletAddress);

    request.setTrigger(this.trigger.toRequest());

    // Add error handling for node serialization
    try {
      _.map(this.nodes, (node, index) => {
        try {
          const nodeRequest = node.toRequest();
          request.addNodes(nodeRequest);
        } catch (nodeError) {
          console.error(`🚨 Node ${index} (${node.name}) serialization failed:`, nodeError);
          const errorMessage = nodeError instanceof Error ? nodeError.message : String(nodeError);
          throw new Error(`Node serialization failed: ${node.name} - ${errorMessage}`);
        }
      });
    } catch (nodesError) {
      console.error('🚨 Nodes serialization failed:', nodesError);
      throw nodesError;
    }

    // Add error handling for edge serialization  
    try {
      _.map(this.edges, (edge, index) => {
        try {
          const edgeRequest = edge.toRequest();
          request.addEdges(edgeRequest);
        } catch (edgeError) {
          console.error(`🚨 Edge ${index} serialization failed:`, edgeError);
          const errorMessage = edgeError instanceof Error ? edgeError.message : String(edgeError);
          throw new Error(`Edge serialization failed: ${edge.id} - ${errorMessage}`);
        }
      });
    } catch (edgesError) {
      console.error('🚨 Edges serialization failed:', edgesError);
      throw edgesError;
    }

    request.setStartAt(this.startAt);
    request.setExpiredAt(this.expiredAt);
    request.setMaxExecution(this.maxExecution);

    // Optional fields
    if (this.name) {
      request.setName(this.name);
    }

    return request;
  }

  /**
   * Convert Workflow instance to plain object (WorkflowProps)
   * This is useful for serialization, especially with Next.js Server Components
   */
  toJson(): WorkflowProps {
    return {
      id: this.id,
      owner: this.owner,
      smartWalletAddress: this.smartWalletAddress,
      trigger: this.trigger.toJson(),
      nodes: this.nodes as any,
      edges: this.edges as any,
      startAt: this.startAt,
      expiredAt: this.expiredAt,
      maxExecution: this.maxExecution,
      executionCount: this.executionCount,
      name: this.name,
      status: this.status,
      completedAt: this.completedAt,
      lastRanAt: this.lastRanAt,
    };
  }
}

export default Workflow;
