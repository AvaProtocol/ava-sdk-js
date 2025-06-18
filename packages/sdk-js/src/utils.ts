import { 
  Value as ProtobufValue,
  Struct as ProtobufStruct,
  ListValue as ProtobufListValue 
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
      return list.getValuesList().map(item => convertProtobufValueToJs(item));
    }
    case ProtobufValue.KindCase.KIND_NOT_SET:
    default:
      return undefined;
  }
}

/**
 * Convert a protobuf Value to a JavaScript value
 * 
 * **⚠️ DEPRECATED - Use convertProtobufValueToJs() for new code**
 * 
 * This is a legacy compatibility version for existing code that may use 
 * dynamically typed protobuf objects. It uses older has*() methods and
 * fallback logic. Only use this if you need backward compatibility.
 * 
 * @deprecated Use convertProtobufValueToJs() instead for better type safety
 * @param value - The protobuf Value object (may be dynamically typed)
 * @returns The converted JavaScript value
 */
export function convertProtobufValueToJS(value: any): any {
  if (!value) return null;

  // Handle different value types based on protobuf Value structure
  if (value.hasNullValue && value.hasNullValue()) {
    return null;
  }
  if (value.hasNumberValue && value.hasNumberValue()) {
    return value.getNumberValue();
  }
  if (value.hasStringValue && value.hasStringValue()) {
    return value.getStringValue();
  }
  if (value.hasBoolValue && value.hasBoolValue()) {
    return value.getBoolValue();
  }
  if (value.hasStructValue && value.hasStructValue()) {
    const struct = value.getStructValue();
    const result: any = {};
    if (struct && struct.getFieldsMap) {
      const fieldsMap = struct.getFieldsMap();
      fieldsMap.forEach((fieldValue: any, key: string) => {
        result[key] = convertProtobufValueToJS(fieldValue);
      });
    }
    return result;
  }
  if (value.hasListValue && value.hasListValue()) {
    const list = value.getListValue();
    if (list && list.getValuesList) {
      return list
        .getValuesList()
        .map((item: any) => convertProtobufValueToJS(item));
    }
    return [];
  }

  // Fallback: try to extract primitive values directly
  if (typeof value.getNumberValue === "function") {
    return value.getNumberValue();
  }
  if (typeof value.getStringValue === "function") {
    return value.getStringValue();
  }
  if (typeof value.getBoolValue === "function") {
    return value.getBoolValue();
  }

  // If all else fails, return the raw value
  return value;
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
 * Convert protobuf trigger type string to SDK trigger type string
 * 
 * @param protobufType - The protobuf trigger type string (e.g., "TRIGGER_TYPE_MANUAL")
 * @returns The SDK trigger type string (e.g., "manualTrigger")
 */
export function convertProtobufTriggerTypeToSdk(protobufType: string): string {
  switch (protobufType) {
    case 'TRIGGER_TYPE_MANUAL':
      return TriggerType.Manual; // "manualTrigger"
    case 'TRIGGER_TYPE_FIXED_TIME':
      return TriggerType.FixedTime; // "fixedTimeTrigger"
    case 'TRIGGER_TYPE_CRON':
      return TriggerType.Cron; // "cronTrigger"
    case 'TRIGGER_TYPE_BLOCK':
      return TriggerType.Block; // "blockTrigger"
    case 'TRIGGER_TYPE_EVENT':
      return TriggerType.Event; // "eventTrigger"
    case 'TRIGGER_TYPE_UNSPECIFIED':
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
    case 'NODE_TYPE_ETH_TRANSFER':
      return NodeType.ETHTransfer; // "ethTransfer"
    case 'NODE_TYPE_CONTRACT_WRITE':
      return NodeType.ContractWrite; // "contractWrite"
    case 'NODE_TYPE_CONTRACT_READ':
      return NodeType.ContractRead; // "contractRead"
    case 'NODE_TYPE_GRAPHQL_QUERY':
      return NodeType.GraphQLQuery; // "graphql"
    case 'NODE_TYPE_REST_API':
      return NodeType.RestAPI; // "restApi"
    case 'NODE_TYPE_CUSTOM_CODE':
      return NodeType.CustomCode; // "customCode"
    case 'NODE_TYPE_BRANCH':
      return NodeType.Branch; // "branch"
    case 'NODE_TYPE_FILTER':
      return NodeType.Filter; // "filter"
    case 'NODE_TYPE_LOOP':
      return NodeType.Loop; // "loop"
    case 'NODE_TYPE_UNSPECIFIED':
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
  if (protobufType.startsWith('TRIGGER_TYPE_')) {
    return convertProtobufTriggerTypeToSdk(protobufType);
  } else if (protobufType.startsWith('NODE_TYPE_')) {
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
export function convertInputToProtobuf(input?: Record<string, any>): ProtobufValue | undefined {
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
export function extractInputFromProtobuf(inputValue?: ProtobufValue | Record<string, any>): Record<string, any> | undefined {
  if (!inputValue) {
    return undefined;
  }
  
  // Check if it's already a plain JavaScript object
  if (typeof inputValue === 'object' && !inputValue.toJavaScript) {
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
    if (inputJavaScript && typeof inputJavaScript === 'object' && !Array.isArray(inputJavaScript)) {
      return inputJavaScript as Record<string, any>;
    }
  } catch (error) {
    // If conversion fails, try to return the object as-is if it looks like a valid input object
    if (typeof inputValue === 'object' && !Array.isArray(inputValue)) {
      return inputValue as Record<string, any>;
    }
  }
  
  return undefined;
}

