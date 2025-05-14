import { Value as ProtobufValue } from "google-protobuf/google/protobuf/struct_pb";

// Helper function to convert google.protobuf.Value to native JavaScript types
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
