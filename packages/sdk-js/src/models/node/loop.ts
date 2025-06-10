import * as avs_pb from "@/grpc_codegen/avs_pb";
import Node from "./interface";
import {
  NodeType,
  LoopNodeData,
  LoopNodeProps,
  NodeProps,
} from "@avaprotocol/types";
import { convertProtobufValueToJs } from "../../utils";
import _ from "lodash";

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
    const loopNodeData = loopNode.toObject() as any;

    // Since LoopNodeData is now Config.AsObject, we need to merge the config properties
    // with the nested node data from the full object
    const data: LoopNodeData = {
      ...configData,
      // Keep the nested node structures from the full object
      restApi: loopNodeData.restApi,
      customCode: loopNodeData.customCode,
      ethTransfer: loopNodeData.ethTransfer,
      contractRead: loopNodeData.contractRead,
      contractWrite: loopNodeData.contractWrite,
      graphqlDataQuery: loopNodeData.graphqlDataQuery,
    } as LoopNodeData;

    return new LoopNode({
      ...obj,
      type: NodeType.Loop,
      data: data,
    });
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
    loopNode.setConfig(config);

    // Handle nested nodes - these still use the nested structure within LoopNodeData
    if ((data as any).ethTransfer) {
      const ethTransfer = new avs_pb.ETHTransferNode();
      if ((data as any).ethTransfer.config) {
        const config = new avs_pb.ETHTransferNode.Config();
        config.setDestination((data as any).ethTransfer.config.destination);
        config.setAmount((data as any).ethTransfer.config.amount);
        ethTransfer.setConfig(config);
      }
      loopNode.setEthTransfer(ethTransfer);
    } else if ((data as any).contractWrite) {
      const contractWrite = new avs_pb.ContractWriteNode();
      if ((data as any).contractWrite.config) {
        const config = new avs_pb.ContractWriteNode.Config();
        config.setContractAddress(
          (data as any).contractWrite.config.contractAddress
        );
        config.setCallData((data as any).contractWrite.config.callData);
        config.setContractAbi((data as any).contractWrite.config.contractAbi);

        // Handle method calls array for ContractWrite
        const methodCalls =
          (data as any).contractWrite.config.methodCallsList || [];
        methodCalls.forEach(
          (methodCall: { callData: string; methodName?: string }) => {
            const methodCallMsg = new avs_pb.ContractWriteNode.MethodCall();
            methodCallMsg.setCallData(methodCall.callData);
            if (methodCall.methodName) {
              methodCallMsg.setMethodName(methodCall.methodName);
            }
            config.addMethodCalls(methodCallMsg);
          }
        );

        contractWrite.setConfig(config);
      }
      loopNode.setContractWrite(contractWrite);
    } else if ((data as any).contractRead) {
      const contractRead = new avs_pb.ContractReadNode();
      if ((data as any).contractRead.config) {
        const config = new avs_pb.ContractReadNode.Config();
        config.setContractAddress(
          (data as any).contractRead.config.contractAddress
        );
        config.setContractAbi((data as any).contractRead.config.contractAbi);

        // Handle method calls array
        const methodCalls =
          (data as any).contractRead.config.methodCallsList || [];
        methodCalls.forEach(
          (methodCall: { callData: string; methodName?: string }) => {
            const methodCallMsg = new avs_pb.ContractReadNode.MethodCall();
            methodCallMsg.setCallData(methodCall.callData);
            if (methodCall.methodName) {
              methodCallMsg.setMethodName(methodCall.methodName);
            }
            config.addMethodCalls(methodCallMsg);
          }
        );

        contractRead.setConfig(config);
      }
      loopNode.setContractRead(contractRead);
    } else if ((data as any).graphqlDataQuery) {
      const graphqlQuery = new avs_pb.GraphQLQueryNode();
      if ((data as any).graphqlDataQuery.config) {
        const config = new avs_pb.GraphQLQueryNode.Config();
        config.setUrl((data as any).graphqlDataQuery.config.url);
        config.setQuery((data as any).graphqlDataQuery.config.query);

        if (
          (data as any).graphqlDataQuery.config.variablesMap &&
          (data as any).graphqlDataQuery.config.variablesMap.length > 0
        ) {
          (data as any).graphqlDataQuery.config.variablesMap.forEach(
            ([key, value]: [string, string]) => {
              config.getVariablesMap().set(key, value);
            }
          );
        }
        graphqlQuery.setConfig(config);
      }
      loopNode.setGraphqlDataQuery(graphqlQuery);
    } else if ((data as any).restApi) {
      const restApi = new avs_pb.RestAPINode();
      if ((data as any).restApi.config) {
        const config = new avs_pb.RestAPINode.Config();
        config.setUrl((data as any).restApi.config.url);
        config.setMethod((data as any).restApi.config.method);
        config.setBody((data as any).restApi.config.body || "");

        if (
          (data as any).restApi.config.headersMap &&
          (data as any).restApi.config.headersMap.length > 0
        ) {
          (data as any).restApi.config.headersMap.forEach(
            ([key, value]: [string, string]) => {
              config.getHeadersMap().set(key, value);
            }
          );
        }
        restApi.setConfig(config);
      }
      loopNode.setRestApi(restApi);
    } else if ((data as any).customCode) {
      const customCode = new avs_pb.CustomCodeNode();
      if ((data as any).customCode.config) {
        const config = new avs_pb.CustomCodeNode.Config();
        config.setLang((data as any).customCode.config.lang);
        config.setSource((data as any).customCode.config.source);
        customCode.setConfig(config);
      }
      loopNode.setCustomCode(customCode);
    }

    node.setLoop(loopNode);
    return node;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    // For immediate execution, the server returns loop data as CustomCode format
    const customCodeOutput = outputData.getCustomCode();
    if (customCodeOutput?.getData()) {
      const result = convertProtobufValueToJs(customCodeOutput.getData());

      // Check if the result is wrapped with a single "data" property
      if (
        result &&
        typeof result === "object" &&
        Object.keys(result).length === 1 &&
        "data" in result
      ) {
        // If data is a Go map string, parse it
        if (typeof result.data === "string") {
          const parsed = LoopNode.parseGoMapStringArray(result.data);
          return parsed !== null ? parsed : result.data;
        }
        return result.data;
      }

      // If result is directly a Go map string, parse it
      if (typeof result === "string") {
        const parsed = LoopNode.parseGoMapStringArray(result);
        return parsed !== null ? parsed : result;
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
        } catch (e) {
          // If JSON parsing fails, try Go map parsing
          const parsed = LoopNode.parseGoMapStringArray(loopObj.data);
          return parsed !== null ? parsed : loopObj.data;
        }
      }

      return loopObj;
    }

    return null;
  }

  /**
   * Parse Go map string array format like "[map[key:value] map[key2:value2]]"
   * into proper JavaScript array of objects
   */
  private static parseGoMapStringArray(input: string): any[] | null {
    if (!input || typeof input !== "string") {
      return null;
    }

    // Handle empty array
    if (input.trim() === "[]") {
      return [];
    }

    // Check if it looks like a Go map array: starts with [ and contains map[
    if (!input.startsWith("[") || !input.includes("map[")) {
      return null;
    }

    try {
      // Extract content between the outer brackets
      const content = input.slice(1, -1).trim();
      if (!content) {
        return [];
      }

      const results: any[] = [];
      let pos = 0;

      while (pos < content.length) {
        // Skip whitespace
        while (pos < content.length && /\s/.test(content[pos])) {
          pos++;
        }

        if (pos >= content.length) break;

        // Look for "map[" start
        if (content.substr(pos, 4) === "map[") {
          pos += 4; // Skip "map["

          // Find the matching closing bracket
          let bracketCount = 1;
          let start = pos;

          while (pos < content.length && bracketCount > 0) {
            if (content[pos] === "[") {
              bracketCount++;
            } else if (content[pos] === "]") {
              bracketCount--;
            }
            if (bracketCount > 0) {
              pos++;
            }
          }

          if (bracketCount === 0) {
            // Extract the map content
            const mapContent = content.slice(start, pos);
            const parsedMap = LoopNode.parseGoMapContent(mapContent);
            if (parsedMap) {
              results.push(parsedMap);
            }
            pos++; // Skip the closing ']'
          } else {
            // Malformed, break
            break;
          }
        } else {
          // Skip unknown content
          pos++;
        }
      }

      return results.length > 0 ? results : null;
    } catch (e) {
      console.warn("Failed to parse Go map string:", e);
      return null;
    }
  }

  /**
   * Parse the content inside a Go map like "key:value key2:value2"
   */
  private static parseGoMapContent(content: string): any | null {
    if (!content) {
      return {};
    }

    try {
      const result: any = {};
      let pos = 0;

      while (pos < content.length) {
        // Skip whitespace
        while (pos < content.length && /\s/.test(content[pos])) {
          pos++;
        }

        if (pos >= content.length) break;

        // Find key (everything up to the first colon)
        let keyStart = pos;
        while (pos < content.length && content[pos] !== ":") {
          pos++;
        }

        if (pos >= content.length) break; // No colon found

        const key = content.slice(keyStart, pos).trim();
        pos++; // Skip the colon

        // Find value (everything up to the next space that precedes a key, or end)
        let valueStart = pos;
        let valueEnd = pos;

        // Look ahead to find the end of this value
        while (valueEnd < content.length) {
          if (/\s/.test(content[valueEnd])) {
            // Found whitespace, check if next non-whitespace has a colon
            let nextKeyPos = valueEnd + 1;
            while (
              nextKeyPos < content.length &&
              /\s/.test(content[nextKeyPos])
            ) {
              nextKeyPos++;
            }

            // Look for a colon in the next word
            let hasColon = false;
            let checkPos = nextKeyPos;
            while (checkPos < content.length && !/\s/.test(content[checkPos])) {
              if (content[checkPos] === ":") {
                hasColon = true;
                break;
              }
              checkPos++;
            }

            if (hasColon) {
              // Next word has a colon, so this is the end of current value
              break;
            }
          }
          valueEnd++;
        }

        const value = content.slice(valueStart, valueEnd).trim();

        // Convert value to appropriate type
        result[key] = LoopNode.parseValue(value);

        pos = valueEnd;
      }

      return result;
    } catch (e) {
      console.warn("Failed to parse Go map content:", content, e);
      return null;
    }
  }

  /**
   * Parse a value string to appropriate JavaScript type
   */
  private static parseValue(value: string): any {
    if (!value) return "";

    // Try boolean
    if (value === "true") return true;
    if (value === "false") return false;

    // Try number (int or float)
    if (/^-?\d+$/.test(value)) {
      return parseInt(value, 10);
    }
    if (/^-?\d*\.\d+$/.test(value)) {
      return parseFloat(value);
    }

    // Try ISO date
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(value)) {
      return value; // Keep as string for JSON compatibility
    }

    // Default to string
    return value;
  }
}

export default LoopNode;
