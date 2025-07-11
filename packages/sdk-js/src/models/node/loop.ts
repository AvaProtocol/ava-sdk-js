import * as avs_pb from "@/grpc_codegen/avs_pb";
import Node from "./interface";
import CustomCodeNode from "./customCode";
import ETHTransferNode from "./ethTransfer";
import RestAPINode from "./restApi";
import GraphQLQueryNode from "./graphqlQuery";
import ContractReadNode from "./contractRead";
import ContractWriteNode from "./contractWrite";
import {
  NodeType,
  LoopNodeData,
  LoopNodeProps,
  NodeProps,
  ExecutionMode,
} from "@avaprotocol/types";
import { convertInputToProtobuf, extractInputFromProtobuf } from "../../utils";

class LoopNode extends Node {
  constructor(props: LoopNodeProps) {
    super({ ...props, type: NodeType.Loop, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): LoopNode {
    const obj = raw.toObject() as unknown as NodeProps;
    const loopNode = raw.getLoop();
    if (!loopNode) {
      throw new Error("Response does not contain a Loop node");
    }

    // Get the config data directly as flat structure
    const configData = loopNode.getConfig()?.toObject();
    const loopNodeData = loopNode.toObject();

    // Since LoopNodeData is now Config.AsObject, we need to merge the config properties
    // with the runner data from the protobuf structure
    const data: LoopNodeData = {
      ...configData,
      // Extract runner data from the oneof runner field
      runner: this.extractRunnerFromProtobuf(loopNodeData),
      // Map execution mode from protobuf enum to ExecutionMode enum
      executionMode: this.mapExecutionModeFromProtobuf(
        configData?.executionMode
      ),
    } as LoopNodeData;

    // Extract input data from top-level TaskNode.input field (not nested LoopNode.input)
    // This matches where we set it in toRequest() and where the Go backend looks for it
    let input: Record<string, unknown> | undefined = undefined;
    if (raw.hasInput()) {
      input = extractInputFromProtobuf(raw.getInput());
    }

    return new LoopNode({
      ...obj,
      type: NodeType.Loop,
      data: data,
      input: input,
    });
  }

  private static extractRunnerFromProtobuf(
    loopNodeData: Record<string, unknown>
  ): { type: string; data: unknown } | null {
    // Check which runner type is present in the oneof runner field
    if (loopNodeData.restApi) {
      return { type: "restApi", data: loopNodeData.restApi };
    } else if (loopNodeData.customCode) {
      return { type: "customCode", data: loopNodeData.customCode };
    } else if (loopNodeData.ethTransfer) {
      return { type: "ethTransfer", data: loopNodeData.ethTransfer };
    } else if (loopNodeData.contractRead) {
      return { type: "contractRead", data: loopNodeData.contractRead };
    } else if (loopNodeData.contractWrite) {
      return { type: "contractWrite", data: loopNodeData.contractWrite };
    } else if (loopNodeData.graphqlDataQuery) {
      return { type: "graphqlDataQuery", data: loopNodeData.graphqlDataQuery };
    }
    return null;
  }

  private static mapExecutionModeFromProtobuf(
    executionMode?: number
  ): ExecutionMode {
    // Map protobuf ExecutionMode enum to ExecutionMode enum
    // EXECUTION_MODE_SEQUENTIAL = 0, EXECUTION_MODE_PARALLEL = 1
    switch (executionMode) {
      case 0:
        return ExecutionMode.Sequential;
      case 1:
        return ExecutionMode.Parallel;
      default:
        return ExecutionMode.Sequential; // Default to sequential for safety
    }
  }

  private mapExecutionModeToProtobuf(
    executionMode?: ExecutionMode | string
  ): number {
    // Map ExecutionMode enum or string to protobuf ExecutionMode enum
    // EXECUTION_MODE_SEQUENTIAL = 0, EXECUTION_MODE_PARALLEL = 1
    if (!executionMode) {
      return 0; // Default to sequential for safety
    }
    
    if (typeof executionMode === "string") {
      switch (executionMode.toLowerCase()) {
        case "parallel":
          return 1;
        case "sequential":
        default:
          return 0; // Default to sequential for safety
      }
    } else {
      switch (executionMode) {
        case ExecutionMode.Parallel:
          return 1;
        case ExecutionMode.Sequential:
        default:
          return 0; // Default to sequential for safety
      }
    }
  }

  toRequest(): avs_pb.TaskNode {
    const node = new avs_pb.TaskNode();
    const loopNode = new avs_pb.LoopNode();

    node.setId(this.id);
    node.setName(this.name);

    const data = this.data as LoopNodeData;

    // Set the loop config from the flat data structure
    const config = new avs_pb.LoopNode.Config();
    config.setSourceId(data.sourceId || "");
    config.setIterVal(data.iterVal || "");
    config.setIterKey(data.iterKey || "");

    // Set execution mode - map ExecutionMode enum to protobuf enum
    const executionMode = this.mapExecutionModeToProtobuf(data.executionMode);
    config.setExecutionMode(executionMode);

    loopNode.setConfig(config);

    // Set input data on the top-level TaskNode, not the nested LoopNode
    // This matches where the Go backend's ExtractNodeInputData() looks for it
    const inputValue = convertInputToProtobuf(this.input);
    if (inputValue) {
      node.setInput(inputValue);
    }

    // Handle runner - check the runner field and set the appropriate oneof field
    if (data.runner) {
      this.setRunnerOnProtobuf(loopNode, data.runner);
    }

    node.setLoop(loopNode);
    return node;
  }

  private setRunnerOnProtobuf(
    loopNode: avs_pb.LoopNode,
    runner: { type: string; data: Record<string, unknown> }
  ): void {
    if (!runner || !runner.type || !runner.data) {
      return;
    }

    switch (runner.type) {
      case "ethTransfer": {
        const ethTransferData = runner.data as Record<string, unknown>;
        if (ethTransferData.config) {
          const ethConfig = ethTransferData.config as Record<string, string>;
          const ethTransfer = ETHTransferNode.createProtobufNode({
            destination: ethConfig.destination,
            amount: ethConfig.amount,
          });
          loopNode.setEthTransfer(ethTransfer);
        }
        break;
      }

      case "contractWrite": {
        const contractWriteData = runner.data as Record<string, unknown>;
        if (contractWriteData.config) {
          const writeConfig = contractWriteData.config as Record<
            string,
            unknown
          >;
          const contractWrite = ContractWriteNode.createProtobufNode({
            contractAddress: writeConfig.contractAddress as string,
            callData: writeConfig.callData as string,
            contractAbi: writeConfig.contractAbi as string,
            methodCalls:
              (writeConfig.methodCallsList as Array<{
                callData: string;
                methodName?: string;
              }>) || [],
          });
          loopNode.setContractWrite(contractWrite);
        }
        break;
      }

      case "contractRead": {
        const contractReadData = runner.data as Record<string, unknown>;
        if (contractReadData.config) {
          const readConfig = contractReadData.config as Record<string, unknown>;
          const contractRead = ContractReadNode.createProtobufNode({
            contractAddress: readConfig.contractAddress as string,
            contractAbi: readConfig.contractAbi as string,
            methodCalls:
              (readConfig.methodCallsList as Array<{
                callData: string;
                methodName?: string;
                applyToFields?: string[];
              }>) || [],
          });
          loopNode.setContractRead(contractRead);
        }
        break;
      }

      case "graphqlDataQuery": {
        const graphqlData = runner.data as Record<string, unknown>;
        if (graphqlData.config) {
          const gqlConfig = graphqlData.config as Record<string, unknown>;
          const graphqlQuery = GraphQLQueryNode.createProtobufNode({
            url: gqlConfig.url as string,
            query: gqlConfig.query as string,
            variablesMap: gqlConfig.variablesMap as Array<[string, string]>,
          });
          loopNode.setGraphqlDataQuery(graphqlQuery);
        }
        break;
      }

      case "restApi": {
        const restApiData = runner.data as Record<string, unknown>;
        if (restApiData.config) {
          const apiConfig = restApiData.config as Record<string, unknown>;
          const restApi = RestAPINode.createProtobufNode({
            url: apiConfig.url as string,
            method: apiConfig.method as string,
            body: (apiConfig.body as string) || "",
            headersMap: apiConfig.headersMap as Array<[string, string]>,
          });
          loopNode.setRestApi(restApi);
        }
        break;
      }

      case "customCode": {
        const customCodeData = runner.data as Record<string, unknown>;
        if (customCodeData.config) {
          const codeConfig = customCodeData.config as Record<string, string>;
          const customCode = CustomCodeNode.createProtobufNode({
            lang: codeConfig.lang,
            source: codeConfig.source,
          });
          loopNode.setCustomCode(customCode);
        }
        break;
      }
    }
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): unknown {
    // For immediate execution, data comes as CustomCode format
    const customCodeOutput = outputData.getCustomCode();
    if (customCodeOutput) {
      const result = customCodeOutput.toObject();

      // Handle nested data structure
      if (
        result &&
        typeof result === "object" &&
        Object.keys(result).length === 1 &&
        "data" in result
      ) {
        return result.data;
      }

      return result;
    }

    // For workflow execution, data comes as Loop format with JSON string
    const loopOutput = outputData.getLoop();
    if (loopOutput) {
      const loopObj = loopOutput.toObject();

      // If there's a data field that's a JSON string, parse it
      if (loopObj.data && typeof loopObj.data === "string") {
        try {
          return JSON.parse(loopObj.data);
        } catch {
          // If JSON parsing fails, return the raw data
          return loopObj.data;
        }
      }

      return loopObj;
    }

    return null;
  }
}

export default LoopNode;
