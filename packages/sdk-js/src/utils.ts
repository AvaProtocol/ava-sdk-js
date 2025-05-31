import { 
  Value as ProtobufValue,
  Struct as ProtobufStruct,
  ListValue as ProtobufListValue 
} from "google-protobuf/google/protobuf/struct_pb";

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
