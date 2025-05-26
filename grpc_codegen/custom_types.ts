import * as jspb from "google-protobuf";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";

/**
 * Custom implementation of RunNodeWithInputsReq class
 * This is needed because the class is not generated from the proto file
 */
export class RunNodeWithInputsReq extends jspb.Message {
  private nodeType_: string;
  private nodeConfig_: google_protobuf_struct_pb.Struct | undefined;
  private inputVariables_: google_protobuf_struct_pb.Struct | undefined;

  constructor() {
    super();
    this.nodeType_ = "";
    this.nodeConfig_ = undefined;
    this.inputVariables_ = undefined;
  }

  getNodeType(): string {
    return this.nodeType_;
  }

  setNodeType(value: string): RunNodeWithInputsReq {
    this.nodeType_ = value;
    return this;
  }

  getNodeConfig(): google_protobuf_struct_pb.Struct | undefined {
    return this.nodeConfig_;
  }

  setNodeConfig(value: google_protobuf_struct_pb.Struct | undefined): RunNodeWithInputsReq {
    this.nodeConfig_ = value;
    return this;
  }

  getInputVariables(): google_protobuf_struct_pb.Struct | undefined {
    return this.inputVariables_;
  }

  setInputVariables(value: google_protobuf_struct_pb.Struct | undefined): RunNodeWithInputsReq {
    this.inputVariables_ = value;
    return this;
  }

  serializeBinary(): Uint8Array {
    const writer = new jspb.BinaryWriter();
    this.serializeBinaryToWriter(writer);
    return writer.getResultBuffer();
  }

  serializeBinaryToWriter(writer: jspb.BinaryWriter): void {
    if (this.nodeType_ !== "") {
      writer.writeString(1, this.nodeType_);
    }
    if (this.nodeConfig_ !== undefined) {
      writer.writeMessage(
        2, 
        this.nodeConfig_, 
        google_protobuf_struct_pb.Struct.serializeBinaryToWriter
      );
    }
    if (this.inputVariables_ !== undefined) {
      writer.writeMessage(
        3, 
        this.inputVariables_, 
        google_protobuf_struct_pb.Struct.serializeBinaryToWriter
      );
    }
  }
  
  toObject(includeInstance?: boolean): object {
    return {
      nodeType: this.nodeType_,
      nodeConfig: this.nodeConfig_ ? 
        this.nodeConfig_.toObject(includeInstance) : undefined,
      inputVariables: this.inputVariables_ ? 
        this.inputVariables_.toObject(includeInstance) : undefined
    };
  }

  static deserializeBinary(bytes: Uint8Array): RunNodeWithInputsReq {
    const reader = new jspb.BinaryReader(bytes);
    const message = new RunNodeWithInputsReq();
    return RunNodeWithInputsReq.deserializeBinaryFromReader(message, reader);
  }

  static deserializeBinaryFromReader(
    message: RunNodeWithInputsReq,
    reader: jspb.BinaryReader
  ): RunNodeWithInputsReq {
    while (reader.nextField()) {
      if (reader.isEndGroup()) {
        break;
      }
      const field = reader.getFieldNumber();
      switch (field) {
        case 1:
          message.setNodeType(reader.readString());
          break;
        case 2:
          const nodeConfig = new google_protobuf_struct_pb.Struct();
          reader.readMessage(
            nodeConfig,
            google_protobuf_struct_pb.Struct.deserializeBinaryFromReader
          );
          message.setNodeConfig(nodeConfig);
          break;
        case 3:
          const inputVariables = new google_protobuf_struct_pb.Struct();
          reader.readMessage(
            inputVariables,
            google_protobuf_struct_pb.Struct.deserializeBinaryFromReader
          );
          message.setInputVariables(inputVariables);
          break;
        default:
          reader.skipField();
          break;
      }
    }
    return message;
  }
}

/**
 * Custom implementation of RunNodeWithInputsResp class
 * This is needed because the class is not generated from the proto file
 */
export class RunNodeWithInputsResp extends jspb.Message {
  private success_: boolean;
  private error_: string;
  private result_: google_protobuf_struct_pb.Struct | undefined;

  constructor() {
    super();
    this.success_ = false;
    this.error_ = "";
    this.result_ = undefined;
  }

  getSuccess(): boolean {
    return this.success_;
  }

  setSuccess(value: boolean): RunNodeWithInputsResp {
    this.success_ = value;
    return this;
  }

  getError(): string {
    return this.error_;
  }

  setError(value: string): RunNodeWithInputsResp {
    this.error_ = value;
    return this;
  }

  getResult(): google_protobuf_struct_pb.Struct | undefined {
    return this.result_;
  }

  setResult(value: google_protobuf_struct_pb.Struct | undefined): RunNodeWithInputsResp {
    this.result_ = value;
    return this;
  }

  serializeBinary(): Uint8Array {
    const writer = new jspb.BinaryWriter();
    this.serializeBinaryToWriter(writer);
    return writer.getResultBuffer();
  }

  serializeBinaryToWriter(writer: jspb.BinaryWriter): void {
    if (this.success_ !== false) {
      writer.writeBool(1, this.success_);
    }
    if (this.error_ !== "") {
      writer.writeString(2, this.error_);
    }
    if (this.result_ !== undefined) {
      writer.writeMessage(
        3, 
        this.result_, 
        google_protobuf_struct_pb.Struct.serializeBinaryToWriter
      );
    }
  }
  
  toObject(includeInstance?: boolean): object {
    return {
      success: this.success_,
      error: this.error_,
      result: this.result_ ? 
        this.result_.toObject(includeInstance) : undefined
    };
  }

  static deserializeBinary(bytes: Uint8Array): RunNodeWithInputsResp {
    const reader = new jspb.BinaryReader(bytes);
    const message = new RunNodeWithInputsResp();
    return RunNodeWithInputsResp.deserializeBinaryFromReader(message, reader);
  }

  static deserializeBinaryFromReader(
    message: RunNodeWithInputsResp,
    reader: jspb.BinaryReader
  ): RunNodeWithInputsResp {
    while (reader.nextField()) {
      if (reader.isEndGroup()) {
        break;
      }
      const field = reader.getFieldNumber();
      switch (field) {
        case 1:
          message.setSuccess(reader.readBool());
          break;
        case 2:
          message.setError(reader.readString());
          break;
        case 3:
          const result = new google_protobuf_struct_pb.Struct();
          reader.readMessage(
            result,
            google_protobuf_struct_pb.Struct.deserializeBinaryFromReader
          );
          message.setResult(result);
          break;
        default:
          reader.skipField();
          break;
      }
    }
    return message;
  }
}
