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
  ContractAbi,
} from "@avaprotocol/types";
import { convertProtobufValueToJs } from "../../utils";

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

    return new LoopNode({
      ...obj,
      type: NodeType.Loop,
      data: data,
    });
  }

  private static extractRunnerFromProtobuf(
    loopNodeData: Record<string, unknown>
  ): { type: string; config: unknown } | null {
    // Define a mapping of runner types to their corresponding data keys
    const runnerMapping: Record<string, string> = {
      restApi: "restApi",
      customCode: "customCode",
      ethTransfer: "ethTransfer",
      contractRead: "contractRead",
      contractWrite: "contractWrite",
      graphqlDataQuery: "graphqlDataQuery",
    };

    // Iterate over the mapping to find the matching runner type
    for (const [type, key] of Object.entries(runnerMapping)) {
      if (loopNodeData[key]) {
        return { type, config: loopNodeData[key] };
      }
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
        case ExecutionMode.Parallel:
          return 1;
        case ExecutionMode.Sequential:
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
    config.setInputNodeName(data.inputNodeName || "");
    config.setIterVal(data.iterVal || "");
    config.setIterKey(data.iterKey || "");

    // Set execution mode - map ExecutionMode enum to protobuf enum
    const executionMode = this.mapExecutionModeToProtobuf(data.executionMode);
    config.setExecutionMode(executionMode);

    loopNode.setConfig(config);

    // Handle runner - check the runner field and set the appropriate oneof field
    if (data.runner) {
      this.setRunnerOnProtobuf(loopNode, data.runner);
    }

    node.setLoop(loopNode);
    return node;
  }

  private setRunnerOnProtobuf(
    loopNode: avs_pb.LoopNode,
    runner: {
      type: string;
      data?: Record<string, unknown>;
      config?: Record<string, unknown>;
    }
  ): void {
    if (!runner || !runner.type) {
      return;
    }

    // Support both old structure (runner.data.config) and new structure (runner.config)
    const config =
      runner.config || (runner.data && (runner.data as any).config);
    if (!config) {
      return;
    }

    switch (runner.type) {
      case "ethTransfer": {
        const ethConfig = config as Record<string, string>;
        const ethTransfer = ETHTransferNode.createProtobufNode({
          destination: ethConfig.destination,
          amount: ethConfig.amount,
        });
        loopNode.setEthTransfer(ethTransfer);
        break;
      }

      case "contractWrite": {
        const writeConfig = config as Record<string, unknown>;
        const contractWrite = ContractWriteNode.createProtobufNode({
          contractAddress: writeConfig.contractAddress as string,
          contractAbi: writeConfig.contractAbi as ContractAbi,
          methodCalls:
            (
              writeConfig.methodCalls as Array<{
                methodName: string;
                methodParams: string[];
                callData?: string;
              }>
            )?.map((call) => ({
              methodName: call.methodName || "",
              methodParams: call.methodParams || [],
              ...(call.callData && { callData: call.callData }),
            })) || [],
        });
        loopNode.setContractWrite(contractWrite);
        break;
      }

      case "contractRead": {
        const readConfig = config as Record<string, unknown>;
        const contractRead = ContractReadNode.createProtobufNode({
          contractAddress: readConfig.contractAddress as string,
          contractAbi: readConfig.contractAbi as ContractAbi,
          methodCalls:
            (
              readConfig.methodCalls as Array<{
                methodName: string;
                methodParams: string[];
                callData?: string;
                applyToFields?: string[];
              }>
            )?.map((call) => ({
              methodName: call.methodName || "",
              methodParams: call.methodParams || [],
              ...(call.callData && { callData: call.callData }),
              ...(call.applyToFields && { applyToFields: call.applyToFields }),
            })) || [],
        });
        loopNode.setContractRead(contractRead);
        break;
      }

      case "graphqlDataQuery": {
        const gqlConfig = config as Record<string, unknown>;
        const graphqlQuery = GraphQLQueryNode.createProtobufNode({
          url: gqlConfig.url as string,
          query: gqlConfig.query as string,
          variablesMap: gqlConfig.variablesMap as Array<[string, string]>,
        });
        loopNode.setGraphqlDataQuery(graphqlQuery);
        break;
      }

      case "restApi": {
        const apiConfig = config as Record<string, unknown>;
        const restApi = RestAPINode.createProtobufNode({
          url: apiConfig.url as string,
          method: apiConfig.method as string,
          body: (apiConfig.body as string) || "",
          headers: apiConfig.headers as Record<string, string>,
        });
        loopNode.setRestApi(restApi);
        break;
      }

      case "customCode": {
        const codeConfig = config as Record<string, string>;
        const customCode = CustomCodeNode.createProtobufNode({
          lang: codeConfig.lang,
          source: codeConfig.source,
        });
        loopNode.setCustomCode(customCode);
        break;
      }
    }
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): unknown {
    // For workflow execution, data comes as Loop format with new protobuf Value
    const loopOutput = outputData.getLoop();
    if (loopOutput) {
      // Extract data from the new data field
      const dataValue = loopOutput.getData();
      if (dataValue) {
        try {
          // Use the standard protobuf conversion utility
          return convertProtobufValueToJs(dataValue);
        } catch (error) {
          console.warn(
            "Failed to convert loop data from protobuf Value:",
            error
          );
          return null;
        }
      }
    }

    // Fallback: For immediate execution, data might come as CustomCode format
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

    return null;
  }
}

export default LoopNode;
