import _ from "lodash";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import Node from "./node/interface";
import Edge from "./edge";
import Trigger from "./trigger/interface";
import TriggerFactory from "./trigger/factory";
import NodeFactory from "./node/factory";
export const DefaultExpiredAt = -1; // TODO: explain the meaning of -1
import { WorkflowStatus, WorkflowProps, InputVariables } from "@avaprotocol/types";
import { convertJSValueToProtobuf } from "../utils";

// Function to convert TaskStatus to string
export function convertStatusToString(
  status: avs_pb.TaskStatus
): WorkflowStatus {
  switch (status) {
    case avs_pb.TaskStatus.ENABLED:
      return WorkflowStatus.Enabled;
    case avs_pb.TaskStatus.COMPLETED:
      return WorkflowStatus.Completed;
    case avs_pb.TaskStatus.FAILED:
      return WorkflowStatus.Failed;
    case avs_pb.TaskStatus.RUNNING:
      return WorkflowStatus.Running;
    case avs_pb.TaskStatus.DISABLED:
      return WorkflowStatus.Disabled;
    default: {
      throw new Error(`Unknown TaskStatus: ${status}`);
    }
  }
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
  inputVariables?: InputVariables;

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
    this.inputVariables = props.inputVariables;
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


    // Convert inputVariables from protobuf map back to JavaScript object
    const inputVariables: Record<string, any> = {};
    const inputVarsMap = obj.getInputVariablesMap();
    if (inputVarsMap && inputVarsMap.getLength() > 0) {
      inputVarsMap.forEach((value, key) => {
        inputVariables[key] = value.toJavaScript();
      });
    }

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
      inputVariables: Object.keys(inputVariables).length > 0 ? inputVariables : undefined,
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

    // Convert inputVariables from protobuf map back to JavaScript object
    const inputVariables: Record<string, any> = {};
    const inputVarsMap = obj.getInputVariablesMap();
    if (inputVarsMap && inputVarsMap.getLength() > 0) {
      inputVarsMap.forEach((value, key) => {
        inputVariables[key] = value.toJavaScript();
      });
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
      inputVariables: Object.keys(inputVariables).length > 0 ? inputVariables : undefined,
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

    // Add input variables if provided
    if (this.inputVariables) {
      const inputVarsMap = request.getInputVariablesMap();
      for (const [key, value] of Object.entries(this.inputVariables)) {
        inputVarsMap.set(key, convertJSValueToProtobuf(value));
      }
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
      inputVariables: this.inputVariables,
    };
  }
}

export default Workflow;
