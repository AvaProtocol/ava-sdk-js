import {
  Value as ProtobufValue,
  Struct as ProtobufStruct,
  ListValue as ProtobufListValue,
} from "google-protobuf/google/protobuf/struct_pb";
import { TriggerType, NodeType } from "@avaprotocol/types";

/**
 * Convert a protobuf Value to a JavaScript value
 *
 * **🏆 RECOMMENDED for modern protobuf usage**
 *
 * This is the primary implementation using proper TypeScript types and getKindCase()
 * for the latest protobuf libraries. Use this for all new code.
 *
 * @param value - The protobuf Value to convert
 * @returns The converted JavaScript value
 */
export function convertProtobufValueToJs(value?: ProtobufValue): any {
  if (!value) {
    return undefined;
  }

  switch (value.getKindCase()) {
    case ProtobufValue.KindCase.NULL_VALUE:
      return null;
    case ProtobufValue.KindCase.NUMBER_VALUE:
      return value.getNumberValue();
    case ProtobufValue.KindCase.STRING_VALUE:
      return value.getStringValue();
    case ProtobufValue.KindCase.BOOL_VALUE:
      return value.getBoolValue();
    case ProtobufValue.KindCase.STRUCT_VALUE: {
      const struct = value.getStructValue();
      if (!struct) return {};
      const jsObj: { [key: string]: any } = {};
      const fields = struct.getFieldsMap();
      fields.forEach((val, key) => {
        jsObj[key] = convertProtobufValueToJs(val);
      });
      return jsObj;
    }
    case ProtobufValue.KindCase.LIST_VALUE: {
      const list = value.getListValue();
      if (!list) return [];
      return list.getValuesList().map((item) => convertProtobufValueToJs(item));
    }
    case ProtobufValue.KindCase.KIND_NOT_SET:
    default:
      return undefined;
  }
}

/**
 * Convert a JavaScript value to a protobuf Value
 *
 * Uses proper TypeScript types for modern protobuf usage.
 *
 * @param value - The JavaScript value to convert
 * @returns The protobuf Value object
 */
export function convertJSValueToProtobuf(value: any): ProtobufValue {
  const protobufValue = new ProtobufValue();

  if (value === null || value === undefined) {
    protobufValue.setNullValue(0); // NULL_VALUE = 0
  } else if (typeof value === "number") {
    protobufValue.setNumberValue(value);
  } else if (typeof value === "string") {
    protobufValue.setStringValue(value);
  } else if (typeof value === "boolean") {
    protobufValue.setBoolValue(value);
  } else if (Array.isArray(value)) {
    const listValue = new ProtobufListValue();
    const convertedValues = value.map((item) => convertJSValueToProtobuf(item));
    listValue.setValuesList(convertedValues);
    protobufValue.setListValue(listValue);
  } else if (typeof value === "object") {
    const structValue = new ProtobufStruct();
    const fieldsMap = structValue.getFieldsMap();
    Object.entries(value).forEach(([key, val]) => {
      fieldsMap.set(key, convertJSValueToProtobuf(val));
    });
    protobufValue.setStructValue(structValue);
  } else {
    // Fallback: convert to string
    protobufValue.setStringValue(String(value));
  }

  return protobufValue;
}

/**
 * Recursively convert object keys from snake_case to camelCase.
 * Leaves non-objects and arrays intact (arrays are mapped over).
 */
export function toCamelCaseKeys<T = any>(input: any): T {
  if (input === null || input === undefined) return input as T;
  if (Array.isArray(input)) {
    return input.map((item) => toCamelCaseKeys(item)) as unknown as T;
  }
  if (typeof input !== "object") return input as T;

  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(input)) {
    const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    result[camelKey] = toCamelCaseKeys(value);
  }
  return result as T;
}

/**
 * Recursively convert object keys from camelCase to snake_case.
 * Leaves non-objects and arrays intact (arrays are mapped over).
 */
export function toSnakeCaseKeys<T = any>(input: any): T {
  if (input === null || input === undefined) return input as T;
  if (Array.isArray(input)) {
    return input.map((item) => toSnakeCaseKeys(item)) as unknown as T;
  }
  if (typeof input !== "object") return input as T;

  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(input)) {
    const snakeKey = key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
    result[snakeKey] = toSnakeCaseKeys(value);
  }
  return result as T;
}

/**
 * Convert protobuf trigger type string to SDK trigger type string
 *
 * @param protobufType - The protobuf trigger type string (e.g., "TRIGGER_TYPE_MANUAL")
 * @returns The SDK trigger type string (e.g., "manualTrigger")
 */
export function convertProtobufTriggerTypeToSdk(protobufType: string): string {
  switch (protobufType) {
    case "TRIGGER_TYPE_MANUAL":
      return TriggerType.Manual; // "manualTrigger"
    case "TRIGGER_TYPE_FIXED_TIME":
      return TriggerType.FixedTime; // "fixedTimeTrigger"
    case "TRIGGER_TYPE_CRON":
      return TriggerType.Cron; // "cronTrigger"
    case "TRIGGER_TYPE_BLOCK":
      return TriggerType.Block; // "blockTrigger"
    case "TRIGGER_TYPE_EVENT":
      return TriggerType.Event; // "eventTrigger"
    case "TRIGGER_TYPE_UNSPECIFIED":
      return TriggerType.Unspecified; // "unspecified"
    default:
      console.warn(`Unknown trigger type: ${protobufType}, using raw value`);
      return protobufType; // fallback to raw value
  }
}

/**
 * Convert protobuf node type string to SDK node type string
 *
 * @param protobufType - The protobuf node type string (e.g., "NODE_TYPE_CUSTOM_CODE")
 * @returns The SDK node type string (e.g., "customCode")
 */
export function convertProtobufNodeTypeToSdk(protobufType: string): string {
  switch (protobufType) {
    case "NODE_TYPE_ETH_TRANSFER":
      return NodeType.ETHTransfer; // "ethTransfer"
    case "NODE_TYPE_CONTRACT_WRITE":
      return NodeType.ContractWrite; // "contractWrite"
    case "NODE_TYPE_CONTRACT_READ":
      return NodeType.ContractRead; // "contractRead"
    case "NODE_TYPE_GRAPHQL_QUERY":
      return NodeType.GraphQLQuery; // "graphql"
    case "NODE_TYPE_REST_API":
      return NodeType.RestAPI; // "restApi"
    case "NODE_TYPE_CUSTOM_CODE":
      return NodeType.CustomCode; // "customCode"
    case "NODE_TYPE_BRANCH":
      return NodeType.Branch; // "branch"
    case "NODE_TYPE_FILTER":
      return NodeType.Filter; // "filter"
    case "NODE_TYPE_LOOP":
      return NodeType.Loop; // "loop"
    case "NODE_TYPE_BALANCE":
      return NodeType.Balance; // "balance"
    case "NODE_TYPE_UNSPECIFIED":
      return NodeType.Unspecified; // "unspecified"
    default:
      console.warn(`Unknown node type: ${protobufType}, using raw value`);
      return protobufType; // fallback to raw value
  }
}

/**
 * Convert protobuf step type string to SDK step type string
 *
 * Automatically detects whether the type is a trigger or node type and converts accordingly.
 *
 * @param protobufType - The protobuf type string (e.g., "TRIGGER_TYPE_MANUAL" or "NODE_TYPE_CUSTOM_CODE")
 * @returns The SDK type string (e.g., "manualTrigger" or "customCode")
 */
export function convertProtobufStepTypeToSdk(protobufType: string): string {
  if (protobufType.startsWith("TRIGGER_TYPE_")) {
    return convertProtobufTriggerTypeToSdk(protobufType);
  } else if (protobufType.startsWith("NODE_TYPE_")) {
    return convertProtobufNodeTypeToSdk(protobufType);
  } else {
    console.warn(`Unknown step type: ${protobufType}, using raw value`);
    return protobufType; // fallback to raw value
  }
}

/**
 * Convert input field from JavaScript object to protobuf Value format
 *
 * Pure utility function for converting trigger/node input data to protobuf format.
 * Can be used by both triggers and nodes.
 *
 * @param input - JavaScript object with input data, or undefined
 * @returns protobuf Value or undefined if no input
 */
export function convertInputToProtobuf(
  input?: Record<string, any>
): ProtobufValue | undefined {
  if (!input) {
    return undefined;
  }
  return convertJSValueToProtobuf(input);
}

/**
 * Extract input field from protobuf Value format to JavaScript object
 *
 * Pure utility function for extracting trigger/node input data from protobuf format.
 * Can be used by both triggers and nodes.
 *
 * @param inputValue - protobuf Value from response, plain JavaScript object, or undefined
 * @returns JavaScript object or undefined
 */
export function extractInputFromProtobuf(
  inputValue?: ProtobufValue | Record<string, any>
): Record<string, any> | undefined {
  if (!inputValue) {
    return undefined;
  }

  // Check if it's already a plain JavaScript object
  if (typeof inputValue === "object" && !inputValue.toJavaScript) {
    // It's a plain JavaScript object, return as-is
    if (!Array.isArray(inputValue)) {
      return inputValue as Record<string, any>;
    }
    return undefined;
  }

  // It's a protobuf Value object, convert it
  try {
    const protobufValue = inputValue as ProtobufValue;
    const inputJavaScript = protobufValue.toJavaScript();
    if (
      inputJavaScript &&
      typeof inputJavaScript === "object" &&
      !Array.isArray(inputJavaScript)
    ) {
      return inputJavaScript as Record<string, any>;
    }
  } catch (error) {
    // If conversion fails, try to return the object as-is if it looks like a valid input object
    if (typeof inputValue === "object" && !Array.isArray(inputValue)) {
      return inputValue as Record<string, any>;
    }
  }

  return undefined;
}

/**
 * Clean up gRPC error messages by extracting the actual message
 * @param message - The raw gRPC error message
 * @returns {string} - The cleaned error message
 */
export function cleanGrpcErrorMessage(message: string): string {
  if (!message) return message;

  // Pattern to match: "gRPC Error (Code X): X STATUS_CODE: actual message"
  // We want to extract everything after the status code
  const grpcErrorPattern = /gRPC Error \(Code \d+\): \d+ [A-Z_]+: (.+)$/;
  const match = message.match(grpcErrorPattern);

  if (match && match[1]) {
    return match[1].trim();
  }

  // Fallback: try to extract message after any status code pattern
  const statusCodePattern = /\d+ [A-Z_]+: (.+)$/;
  const statusMatch = message.match(statusCodePattern);

  if (statusMatch && statusMatch[1]) {
    return statusMatch[1].trim();
  }

  // If no pattern matches, return the original message
  return message;
}
