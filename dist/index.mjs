var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// grpc_codegen/avs_pb.js
var avs_pb_exports = {};
__export(avs_pb_exports, {
  ActionType: () => ActionType,
  AddressRequest: () => AddressRequest,
  AddressResp: () => AddressResp,
  ContractExecution: () => ContractExecution,
  CreateTaskReq: () => CreateTaskReq,
  CreateTaskResp: () => CreateTaskResp,
  ExpressionCondition: () => ExpressionCondition,
  GetKeyReq: () => GetKeyReq,
  KeyResp: () => KeyResp,
  ListTasksReq: () => ListTasksReq,
  ListTasksResp: () => ListTasksResp,
  Task: () => Task,
  TaskAction: () => TaskAction,
  TaskTrigger: () => TaskTrigger,
  TaskType: () => TaskType,
  TriggerType: () => TriggerType,
  UUID: () => UUID,
  UpdateChecksReq: () => UpdateChecksReq,
  UpdateChecksResp: () => UpdateChecksResp
});
var jspb, goog, global, google_protobuf_timestamp_pb, google_protobuf_wrappers_pb, Task, CreateTaskReq, CreateTaskResp, GetKeyReq, KeyResp, UpdateChecksReq, UpdateChecksResp, AddressResp, AddressRequest, ListTasksReq, ListTasksResp, TaskTrigger, TriggerType, ExpressionCondition, TaskAction, ActionType, ContractExecution, TaskType, UUID;
var init_avs_pb = __esm({
  "grpc_codegen/avs_pb.js"() {
    "use strict";
    jspb = __require("google-protobuf");
    goog = jspb;
    global = function() {
      if (this) {
        return this;
      }
      if (typeof window !== "undefined") {
        return window;
      }
      if (typeof global !== "undefined") {
        return global;
      }
      if (typeof self !== "undefined") {
        return self;
      }
      return Function("return this")();
    }.call(null);
    google_protobuf_timestamp_pb = __require("google-protobuf/google/protobuf/timestamp_pb.js");
    goog.object.extend(proto, google_protobuf_timestamp_pb);
    google_protobuf_wrappers_pb = __require("google-protobuf/google/protobuf/wrappers_pb.js");
    goog.object.extend(proto, google_protobuf_wrappers_pb);
    goog.exportSymbol("proto.aggregator.AddressRequest", null, global);
    goog.exportSymbol("proto.aggregator.AddressResp", null, global);
    goog.exportSymbol("proto.aggregator.BranchAction", null, global);
    goog.exportSymbol("proto.aggregator.Checkin", null, global);
    goog.exportSymbol("proto.aggregator.Checkin.Status", null, global);
    goog.exportSymbol("proto.aggregator.CheckinResp", null, global);
    goog.exportSymbol("proto.aggregator.ConditionJump", null, global);
    goog.exportSymbol("proto.aggregator.ContractExecution", null, global);
    goog.exportSymbol("proto.aggregator.ContractQueryCondition", null, global);
    goog.exportSymbol("proto.aggregator.CreateTaskReq", null, global);
    goog.exportSymbol("proto.aggregator.CreateTaskResp", null, global);
    goog.exportSymbol("proto.aggregator.CustomCode", null, global);
    goog.exportSymbol("proto.aggregator.CustomCodeType", null, global);
    goog.exportSymbol("proto.aggregator.ETHTransfer", null, global);
    goog.exportSymbol("proto.aggregator.Execution", null, global);
    goog.exportSymbol("proto.aggregator.ExpressionCondition", null, global);
    goog.exportSymbol("proto.aggregator.GetKeyReq", null, global);
    goog.exportSymbol("proto.aggregator.GraphQLDataQuery", null, global);
    goog.exportSymbol("proto.aggregator.HTTPAPICall", null, global);
    goog.exportSymbol("proto.aggregator.KeyResp", null, global);
    goog.exportSymbol("proto.aggregator.ListTasksReq", null, global);
    goog.exportSymbol("proto.aggregator.ListTasksResp", null, global);
    goog.exportSymbol("proto.aggregator.ListTasksResp.TaskItemResp", null, global);
    goog.exportSymbol("proto.aggregator.NonceRequest", null, global);
    goog.exportSymbol("proto.aggregator.NonceResp", null, global);
    goog.exportSymbol("proto.aggregator.SyncTasksReq", null, global);
    goog.exportSymbol("proto.aggregator.SyncTasksResp", null, global);
    goog.exportSymbol("proto.aggregator.Task", null, global);
    goog.exportSymbol("proto.aggregator.TaskAction", null, global);
    goog.exportSymbol("proto.aggregator.TaskStatus", null, global);
    goog.exportSymbol("proto.aggregator.TaskTrigger", null, global);
    goog.exportSymbol("proto.aggregator.TaskType", null, global);
    goog.exportSymbol("proto.aggregator.TimeCondition", null, global);
    goog.exportSymbol("proto.aggregator.TriggerType", null, global);
    goog.exportSymbol("proto.aggregator.UUID", null, global);
    goog.exportSymbol("proto.aggregator.UpdateChecksReq", null, global);
    goog.exportSymbol("proto.aggregator.UpdateChecksResp", null, global);
    proto.aggregator.UUID = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.UUID, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.UUID.displayName = "proto.aggregator.UUID";
    }
    proto.aggregator.Checkin = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.Checkin, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.Checkin.displayName = "proto.aggregator.Checkin";
    }
    proto.aggregator.Checkin.Status = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.Checkin.Status, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.Checkin.Status.displayName = "proto.aggregator.Checkin.Status";
    }
    proto.aggregator.CheckinResp = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.CheckinResp, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.CheckinResp.displayName = "proto.aggregator.CheckinResp";
    }
    proto.aggregator.SyncTasksReq = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.SyncTasksReq, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.SyncTasksReq.displayName = "proto.aggregator.SyncTasksReq";
    }
    proto.aggregator.TaskTrigger = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.TaskTrigger, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.TaskTrigger.displayName = "proto.aggregator.TaskTrigger";
    }
    proto.aggregator.TimeCondition = function(opt_data) {
      jspb.Message.initialize(
        this,
        opt_data,
        0,
        -1,
        proto.aggregator.TimeCondition.repeatedFields_,
        null
      );
    };
    goog.inherits(proto.aggregator.TimeCondition, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.TimeCondition.displayName = "proto.aggregator.TimeCondition";
    }
    proto.aggregator.ContractQueryCondition = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.ContractQueryCondition, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ContractQueryCondition.displayName = "proto.aggregator.ContractQueryCondition";
    }
    proto.aggregator.ExpressionCondition = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.ExpressionCondition, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ExpressionCondition.displayName = "proto.aggregator.ExpressionCondition";
    }
    proto.aggregator.SyncTasksResp = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.SyncTasksResp, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.SyncTasksResp.displayName = "proto.aggregator.SyncTasksResp";
    }
    proto.aggregator.ETHTransfer = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.ETHTransfer, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ETHTransfer.displayName = "proto.aggregator.ETHTransfer";
    }
    proto.aggregator.ContractExecution = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.ContractExecution, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ContractExecution.displayName = "proto.aggregator.ContractExecution";
    }
    proto.aggregator.GraphQLDataQuery = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.GraphQLDataQuery, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.GraphQLDataQuery.displayName = "proto.aggregator.GraphQLDataQuery";
    }
    proto.aggregator.HTTPAPICall = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.HTTPAPICall, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.HTTPAPICall.displayName = "proto.aggregator.HTTPAPICall";
    }
    proto.aggregator.CustomCode = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.CustomCode, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.CustomCode.displayName = "proto.aggregator.CustomCode";
    }
    proto.aggregator.ConditionJump = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.ConditionJump, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ConditionJump.displayName = "proto.aggregator.ConditionJump";
    }
    proto.aggregator.BranchAction = function(opt_data) {
      jspb.Message.initialize(
        this,
        opt_data,
        0,
        -1,
        proto.aggregator.BranchAction.repeatedFields_,
        null
      );
    };
    goog.inherits(proto.aggregator.BranchAction, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.BranchAction.displayName = "proto.aggregator.BranchAction";
    }
    proto.aggregator.TaskAction = function(opt_data) {
      jspb.Message.initialize(
        this,
        opt_data,
        0,
        -1,
        proto.aggregator.TaskAction.repeatedFields_,
        null
      );
    };
    goog.inherits(proto.aggregator.TaskAction, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.TaskAction.displayName = "proto.aggregator.TaskAction";
    }
    proto.aggregator.Execution = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.Execution, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.Execution.displayName = "proto.aggregator.Execution";
    }
    proto.aggregator.Task = function(opt_data) {
      jspb.Message.initialize(
        this,
        opt_data,
        0,
        -1,
        proto.aggregator.Task.repeatedFields_,
        null
      );
    };
    goog.inherits(proto.aggregator.Task, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.Task.displayName = "proto.aggregator.Task";
    }
    proto.aggregator.CreateTaskReq = function(opt_data) {
      jspb.Message.initialize(
        this,
        opt_data,
        0,
        -1,
        proto.aggregator.CreateTaskReq.repeatedFields_,
        null
      );
    };
    goog.inherits(proto.aggregator.CreateTaskReq, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.CreateTaskReq.displayName = "proto.aggregator.CreateTaskReq";
    }
    proto.aggregator.CreateTaskResp = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.CreateTaskResp, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.CreateTaskResp.displayName = "proto.aggregator.CreateTaskResp";
    }
    proto.aggregator.NonceRequest = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.NonceRequest, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.NonceRequest.displayName = "proto.aggregator.NonceRequest";
    }
    proto.aggregator.NonceResp = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.NonceResp, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.NonceResp.displayName = "proto.aggregator.NonceResp";
    }
    proto.aggregator.AddressRequest = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.AddressRequest, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.AddressRequest.displayName = "proto.aggregator.AddressRequest";
    }
    proto.aggregator.AddressResp = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.AddressResp, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.AddressResp.displayName = "proto.aggregator.AddressResp";
    }
    proto.aggregator.ListTasksReq = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.ListTasksReq, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ListTasksReq.displayName = "proto.aggregator.ListTasksReq";
    }
    proto.aggregator.ListTasksResp = function(opt_data) {
      jspb.Message.initialize(
        this,
        opt_data,
        0,
        -1,
        proto.aggregator.ListTasksResp.repeatedFields_,
        null
      );
    };
    goog.inherits(proto.aggregator.ListTasksResp, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ListTasksResp.displayName = "proto.aggregator.ListTasksResp";
    }
    proto.aggregator.ListTasksResp.TaskItemResp = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.ListTasksResp.TaskItemResp, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ListTasksResp.TaskItemResp.displayName = "proto.aggregator.ListTasksResp.TaskItemResp";
    }
    proto.aggregator.GetKeyReq = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.GetKeyReq, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.GetKeyReq.displayName = "proto.aggregator.GetKeyReq";
    }
    proto.aggregator.KeyResp = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.KeyResp, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.KeyResp.displayName = "proto.aggregator.KeyResp";
    }
    proto.aggregator.UpdateChecksReq = function(opt_data) {
      jspb.Message.initialize(
        this,
        opt_data,
        0,
        -1,
        proto.aggregator.UpdateChecksReq.repeatedFields_,
        null
      );
    };
    goog.inherits(proto.aggregator.UpdateChecksReq, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.UpdateChecksReq.displayName = "proto.aggregator.UpdateChecksReq";
    }
    proto.aggregator.UpdateChecksResp = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.UpdateChecksResp, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.UpdateChecksResp.displayName = "proto.aggregator.UpdateChecksResp";
    }
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.UUID.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.UUID.toObject(opt_includeInstance, this);
      };
      proto.aggregator.UUID.toObject = function(includeInstance, msg) {
        var f, obj = {
          bytes: jspb.Message.getFieldWithDefault(msg, 1, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.UUID.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.UUID();
      return proto.aggregator.UUID.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.UUID.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setBytes(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.UUID.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.UUID.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.UUID.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getBytes();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
    };
    proto.aggregator.UUID.prototype.getBytes = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.UUID.prototype.setBytes = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.Checkin.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.Checkin.toObject(opt_includeInstance, this);
      };
      proto.aggregator.Checkin.toObject = function(includeInstance, msg) {
        var f, obj = {
          id: jspb.Message.getFieldWithDefault(msg, 1, ""),
          address: jspb.Message.getFieldWithDefault(msg, 2, ""),
          signature: jspb.Message.getFieldWithDefault(msg, 3, ""),
          status: (f = msg.getStatus()) && proto.aggregator.Checkin.Status.toObject(includeInstance, f),
          version: jspb.Message.getFieldWithDefault(msg, 5, ""),
          metricsport: jspb.Message.getFieldWithDefault(msg, 6, 0),
          remoteip: jspb.Message.getFieldWithDefault(msg, 7, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.Checkin.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.Checkin();
      return proto.aggregator.Checkin.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.Checkin.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setId(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setAddress(value);
            break;
          case 3:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setSignature(value);
            break;
          case 4:
            var value = new proto.aggregator.Checkin.Status();
            reader.readMessage(
              value,
              proto.aggregator.Checkin.Status.deserializeBinaryFromReader
            );
            msg.setStatus(value);
            break;
          case 5:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setVersion(value);
            break;
          case 6:
            var value = (
              /** @type {number} */
              reader.readInt32()
            );
            msg.setMetricsport(value);
            break;
          case 7:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setRemoteip(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.Checkin.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.Checkin.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.Checkin.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getId();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
      f = message.getAddress();
      if (f.length > 0) {
        writer.writeString(2, f);
      }
      f = message.getSignature();
      if (f.length > 0) {
        writer.writeString(3, f);
      }
      f = message.getStatus();
      if (f != null) {
        writer.writeMessage(
          4,
          f,
          proto.aggregator.Checkin.Status.serializeBinaryToWriter
        );
      }
      f = message.getVersion();
      if (f.length > 0) {
        writer.writeString(5, f);
      }
      f = message.getMetricsport();
      if (f !== 0) {
        writer.writeInt32(6, f);
      }
      f = message.getRemoteip();
      if (f.length > 0) {
        writer.writeString(7, f);
      }
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.Checkin.Status.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.Checkin.Status.toObject(opt_includeInstance, this);
      };
      proto.aggregator.Checkin.Status.toObject = function(includeInstance, msg) {
        var f, obj = {
          uptime: jspb.Message.getFieldWithDefault(msg, 1, 0),
          queuedepth: jspb.Message.getFieldWithDefault(msg, 2, 0),
          lastHeartbeat: (f = msg.getLastHeartbeat()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.Checkin.Status.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.Checkin.Status();
      return proto.aggregator.Checkin.Status.deserializeBinaryFromReader(
        msg,
        reader
      );
    };
    proto.aggregator.Checkin.Status.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setUptime(value);
            break;
          case 2:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setQueuedepth(value);
            break;
          case 3:
            var value = new google_protobuf_timestamp_pb.Timestamp();
            reader.readMessage(
              value,
              google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader
            );
            msg.setLastHeartbeat(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.Checkin.Status.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.Checkin.Status.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.Checkin.Status.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getUptime();
      if (f !== 0) {
        writer.writeInt64(1, f);
      }
      f = message.getQueuedepth();
      if (f !== 0) {
        writer.writeInt64(2, f);
      }
      f = message.getLastHeartbeat();
      if (f != null) {
        writer.writeMessage(
          3,
          f,
          google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
        );
      }
    };
    proto.aggregator.Checkin.Status.prototype.getUptime = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 1, 0)
      );
    };
    proto.aggregator.Checkin.Status.prototype.setUptime = function(value) {
      return jspb.Message.setProto3IntField(this, 1, value);
    };
    proto.aggregator.Checkin.Status.prototype.getQueuedepth = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 2, 0)
      );
    };
    proto.aggregator.Checkin.Status.prototype.setQueuedepth = function(value) {
      return jspb.Message.setProto3IntField(this, 2, value);
    };
    proto.aggregator.Checkin.Status.prototype.getLastHeartbeat = function() {
      return (
        /** @type{?proto.google.protobuf.Timestamp} */
        jspb.Message.getWrapperField(
          this,
          google_protobuf_timestamp_pb.Timestamp,
          3
        )
      );
    };
    proto.aggregator.Checkin.Status.prototype.setLastHeartbeat = function(value) {
      return jspb.Message.setWrapperField(this, 3, value);
    };
    proto.aggregator.Checkin.Status.prototype.clearLastHeartbeat = function() {
      return this.setLastHeartbeat(void 0);
    };
    proto.aggregator.Checkin.Status.prototype.hasLastHeartbeat = function() {
      return jspb.Message.getField(this, 3) != null;
    };
    proto.aggregator.Checkin.prototype.getId = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.Checkin.prototype.setId = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.Checkin.prototype.getAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.Checkin.prototype.setAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.Checkin.prototype.getSignature = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.Checkin.prototype.setSignature = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    proto.aggregator.Checkin.prototype.getStatus = function() {
      return (
        /** @type{?proto.aggregator.Checkin.Status} */
        jspb.Message.getWrapperField(this, proto.aggregator.Checkin.Status, 4)
      );
    };
    proto.aggregator.Checkin.prototype.setStatus = function(value) {
      return jspb.Message.setWrapperField(this, 4, value);
    };
    proto.aggregator.Checkin.prototype.clearStatus = function() {
      return this.setStatus(void 0);
    };
    proto.aggregator.Checkin.prototype.hasStatus = function() {
      return jspb.Message.getField(this, 4) != null;
    };
    proto.aggregator.Checkin.prototype.getVersion = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 5, "")
      );
    };
    proto.aggregator.Checkin.prototype.setVersion = function(value) {
      return jspb.Message.setProto3StringField(this, 5, value);
    };
    proto.aggregator.Checkin.prototype.getMetricsport = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 6, 0)
      );
    };
    proto.aggregator.Checkin.prototype.setMetricsport = function(value) {
      return jspb.Message.setProto3IntField(this, 6, value);
    };
    proto.aggregator.Checkin.prototype.getRemoteip = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 7, "")
      );
    };
    proto.aggregator.Checkin.prototype.setRemoteip = function(value) {
      return jspb.Message.setProto3StringField(this, 7, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.CheckinResp.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.CheckinResp.toObject(opt_includeInstance, this);
      };
      proto.aggregator.CheckinResp.toObject = function(includeInstance, msg) {
        var f, obj = {
          updatedAt: (f = msg.getUpdatedAt()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.CheckinResp.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.CheckinResp();
      return proto.aggregator.CheckinResp.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.CheckinResp.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = new google_protobuf_timestamp_pb.Timestamp();
            reader.readMessage(
              value,
              google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader
            );
            msg.setUpdatedAt(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.CheckinResp.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.CheckinResp.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.CheckinResp.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getUpdatedAt();
      if (f != null) {
        writer.writeMessage(
          1,
          f,
          google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
        );
      }
    };
    proto.aggregator.CheckinResp.prototype.getUpdatedAt = function() {
      return (
        /** @type{?proto.google.protobuf.Timestamp} */
        jspb.Message.getWrapperField(
          this,
          google_protobuf_timestamp_pb.Timestamp,
          1
        )
      );
    };
    proto.aggregator.CheckinResp.prototype.setUpdatedAt = function(value) {
      return jspb.Message.setWrapperField(this, 1, value);
    };
    proto.aggregator.CheckinResp.prototype.clearUpdatedAt = function() {
      return this.setUpdatedAt(void 0);
    };
    proto.aggregator.CheckinResp.prototype.hasUpdatedAt = function() {
      return jspb.Message.getField(this, 1) != null;
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.SyncTasksReq.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.SyncTasksReq.toObject(opt_includeInstance, this);
      };
      proto.aggregator.SyncTasksReq.toObject = function(includeInstance, msg) {
        var f, obj = {
          id: jspb.Message.getFieldWithDefault(msg, 1, ""),
          address: jspb.Message.getFieldWithDefault(msg, 2, ""),
          signature: jspb.Message.getFieldWithDefault(msg, 3, ""),
          monotonicClock: jspb.Message.getFieldWithDefault(msg, 4, 0)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.SyncTasksReq.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.SyncTasksReq();
      return proto.aggregator.SyncTasksReq.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.SyncTasksReq.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setId(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setAddress(value);
            break;
          case 3:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setSignature(value);
            break;
          case 4:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setMonotonicClock(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.SyncTasksReq.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.SyncTasksReq.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.SyncTasksReq.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getId();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
      f = message.getAddress();
      if (f.length > 0) {
        writer.writeString(2, f);
      }
      f = message.getSignature();
      if (f.length > 0) {
        writer.writeString(3, f);
      }
      f = message.getMonotonicClock();
      if (f !== 0) {
        writer.writeInt64(4, f);
      }
    };
    proto.aggregator.SyncTasksReq.prototype.getId = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.SyncTasksReq.prototype.setId = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.SyncTasksReq.prototype.getAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.SyncTasksReq.prototype.setAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.SyncTasksReq.prototype.getSignature = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.SyncTasksReq.prototype.setSignature = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    proto.aggregator.SyncTasksReq.prototype.getMonotonicClock = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 4, 0)
      );
    };
    proto.aggregator.SyncTasksReq.prototype.setMonotonicClock = function(value) {
      return jspb.Message.setProto3IntField(this, 4, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.TaskTrigger.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.TaskTrigger.toObject(opt_includeInstance, this);
      };
      proto.aggregator.TaskTrigger.toObject = function(includeInstance, msg) {
        var f, obj = {
          triggerType: jspb.Message.getFieldWithDefault(msg, 1, 0),
          schedule: (f = msg.getSchedule()) && proto.aggregator.TimeCondition.toObject(includeInstance, f),
          contractQuery: (f = msg.getContractQuery()) && proto.aggregator.ContractQueryCondition.toObject(includeInstance, f),
          expression: (f = msg.getExpression()) && proto.aggregator.ExpressionCondition.toObject(includeInstance, f)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.TaskTrigger.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.TaskTrigger();
      return proto.aggregator.TaskTrigger.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.TaskTrigger.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {!proto.aggregator.TriggerType} */
              reader.readEnum()
            );
            msg.setTriggerType(value);
            break;
          case 2:
            var value = new proto.aggregator.TimeCondition();
            reader.readMessage(
              value,
              proto.aggregator.TimeCondition.deserializeBinaryFromReader
            );
            msg.setSchedule(value);
            break;
          case 3:
            var value = new proto.aggregator.ContractQueryCondition();
            reader.readMessage(
              value,
              proto.aggregator.ContractQueryCondition.deserializeBinaryFromReader
            );
            msg.setContractQuery(value);
            break;
          case 4:
            var value = new proto.aggregator.ExpressionCondition();
            reader.readMessage(
              value,
              proto.aggregator.ExpressionCondition.deserializeBinaryFromReader
            );
            msg.setExpression(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.TaskTrigger.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.TaskTrigger.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.TaskTrigger.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getTriggerType();
      if (f !== 0) {
        writer.writeEnum(1, f);
      }
      f = message.getSchedule();
      if (f != null) {
        writer.writeMessage(
          2,
          f,
          proto.aggregator.TimeCondition.serializeBinaryToWriter
        );
      }
      f = message.getContractQuery();
      if (f != null) {
        writer.writeMessage(
          3,
          f,
          proto.aggregator.ContractQueryCondition.serializeBinaryToWriter
        );
      }
      f = message.getExpression();
      if (f != null) {
        writer.writeMessage(
          4,
          f,
          proto.aggregator.ExpressionCondition.serializeBinaryToWriter
        );
      }
    };
    proto.aggregator.TaskTrigger.prototype.getTriggerType = function() {
      return (
        /** @type {!proto.aggregator.TriggerType} */
        jspb.Message.getFieldWithDefault(this, 1, 0)
      );
    };
    proto.aggregator.TaskTrigger.prototype.setTriggerType = function(value) {
      return jspb.Message.setProto3EnumField(this, 1, value);
    };
    proto.aggregator.TaskTrigger.prototype.getSchedule = function() {
      return (
        /** @type{?proto.aggregator.TimeCondition} */
        jspb.Message.getWrapperField(this, proto.aggregator.TimeCondition, 2)
      );
    };
    proto.aggregator.TaskTrigger.prototype.setSchedule = function(value) {
      return jspb.Message.setWrapperField(this, 2, value);
    };
    proto.aggregator.TaskTrigger.prototype.clearSchedule = function() {
      return this.setSchedule(void 0);
    };
    proto.aggregator.TaskTrigger.prototype.hasSchedule = function() {
      return jspb.Message.getField(this, 2) != null;
    };
    proto.aggregator.TaskTrigger.prototype.getContractQuery = function() {
      return (
        /** @type{?proto.aggregator.ContractQueryCondition} */
        jspb.Message.getWrapperField(
          this,
          proto.aggregator.ContractQueryCondition,
          3
        )
      );
    };
    proto.aggregator.TaskTrigger.prototype.setContractQuery = function(value) {
      return jspb.Message.setWrapperField(this, 3, value);
    };
    proto.aggregator.TaskTrigger.prototype.clearContractQuery = function() {
      return this.setContractQuery(void 0);
    };
    proto.aggregator.TaskTrigger.prototype.hasContractQuery = function() {
      return jspb.Message.getField(this, 3) != null;
    };
    proto.aggregator.TaskTrigger.prototype.getExpression = function() {
      return (
        /** @type{?proto.aggregator.ExpressionCondition} */
        jspb.Message.getWrapperField(this, proto.aggregator.ExpressionCondition, 4)
      );
    };
    proto.aggregator.TaskTrigger.prototype.setExpression = function(value) {
      return jspb.Message.setWrapperField(this, 4, value);
    };
    proto.aggregator.TaskTrigger.prototype.clearExpression = function() {
      return this.setExpression(void 0);
    };
    proto.aggregator.TaskTrigger.prototype.hasExpression = function() {
      return jspb.Message.getField(this, 4) != null;
    };
    proto.aggregator.TimeCondition.repeatedFields_ = [1];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.TimeCondition.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.TimeCondition.toObject(opt_includeInstance, this);
      };
      proto.aggregator.TimeCondition.toObject = function(includeInstance, msg) {
        var f, obj = {
          fixedList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? void 0 : f,
          cron: jspb.Message.getFieldWithDefault(msg, 2, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.TimeCondition.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.TimeCondition();
      return proto.aggregator.TimeCondition.deserializeBinaryFromReader(
        msg,
        reader
      );
    };
    proto.aggregator.TimeCondition.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var values = (
              /** @type {!Array<number>} */
              reader.isDelimited() ? reader.readPackedInt64() : [reader.readInt64()]
            );
            for (var i = 0; i < values.length; i++) {
              msg.addFixed(values[i]);
            }
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setCron(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.TimeCondition.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.TimeCondition.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.TimeCondition.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getFixedList();
      if (f.length > 0) {
        writer.writePackedInt64(1, f);
      }
      f = message.getCron();
      if (f.length > 0) {
        writer.writeString(2, f);
      }
    };
    proto.aggregator.TimeCondition.prototype.getFixedList = function() {
      return (
        /** @type {!Array<number>} */
        jspb.Message.getRepeatedField(this, 1)
      );
    };
    proto.aggregator.TimeCondition.prototype.setFixedList = function(value) {
      return jspb.Message.setField(this, 1, value || []);
    };
    proto.aggregator.TimeCondition.prototype.addFixed = function(value, opt_index) {
      return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
    };
    proto.aggregator.TimeCondition.prototype.clearFixedList = function() {
      return this.setFixedList([]);
    };
    proto.aggregator.TimeCondition.prototype.getCron = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.TimeCondition.prototype.setCron = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.ContractQueryCondition.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ContractQueryCondition.toObject(
          opt_includeInstance,
          this
        );
      };
      proto.aggregator.ContractQueryCondition.toObject = function(includeInstance, msg) {
        var f, obj = {
          contractAddress: jspb.Message.getFieldWithDefault(msg, 1, ""),
          callmsg: jspb.Message.getFieldWithDefault(msg, 2, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.ContractQueryCondition.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.ContractQueryCondition();
      return proto.aggregator.ContractQueryCondition.deserializeBinaryFromReader(
        msg,
        reader
      );
    };
    proto.aggregator.ContractQueryCondition.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setContractAddress(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setCallmsg(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.ContractQueryCondition.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.ContractQueryCondition.serializeBinaryToWriter(
        this,
        writer
      );
      return writer.getResultBuffer();
    };
    proto.aggregator.ContractQueryCondition.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getContractAddress();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
      f = message.getCallmsg();
      if (f.length > 0) {
        writer.writeString(2, f);
      }
    };
    proto.aggregator.ContractQueryCondition.prototype.getContractAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.ContractQueryCondition.prototype.setContractAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.ContractQueryCondition.prototype.getCallmsg = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.ContractQueryCondition.prototype.setCallmsg = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.ExpressionCondition.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ExpressionCondition.toObject(
          opt_includeInstance,
          this
        );
      };
      proto.aggregator.ExpressionCondition.toObject = function(includeInstance, msg) {
        var f, obj = {
          expression: jspb.Message.getFieldWithDefault(msg, 1, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.ExpressionCondition.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.ExpressionCondition();
      return proto.aggregator.ExpressionCondition.deserializeBinaryFromReader(
        msg,
        reader
      );
    };
    proto.aggregator.ExpressionCondition.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setExpression(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.ExpressionCondition.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.ExpressionCondition.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.ExpressionCondition.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getExpression();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
    };
    proto.aggregator.ExpressionCondition.prototype.getExpression = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.ExpressionCondition.prototype.setExpression = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.SyncTasksResp.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.SyncTasksResp.toObject(opt_includeInstance, this);
      };
      proto.aggregator.SyncTasksResp.toObject = function(includeInstance, msg) {
        var f, obj = {
          id: jspb.Message.getFieldWithDefault(msg, 1, ""),
          checktype: jspb.Message.getFieldWithDefault(msg, 2, ""),
          trigger: (f = msg.getTrigger()) && proto.aggregator.TaskTrigger.toObject(includeInstance, f)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.SyncTasksResp.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.SyncTasksResp();
      return proto.aggregator.SyncTasksResp.deserializeBinaryFromReader(
        msg,
        reader
      );
    };
    proto.aggregator.SyncTasksResp.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setId(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setChecktype(value);
            break;
          case 3:
            var value = new proto.aggregator.TaskTrigger();
            reader.readMessage(
              value,
              proto.aggregator.TaskTrigger.deserializeBinaryFromReader
            );
            msg.setTrigger(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.SyncTasksResp.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.SyncTasksResp.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.SyncTasksResp.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getId();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
      f = message.getChecktype();
      if (f.length > 0) {
        writer.writeString(2, f);
      }
      f = message.getTrigger();
      if (f != null) {
        writer.writeMessage(
          3,
          f,
          proto.aggregator.TaskTrigger.serializeBinaryToWriter
        );
      }
    };
    proto.aggregator.SyncTasksResp.prototype.getId = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.SyncTasksResp.prototype.setId = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.SyncTasksResp.prototype.getChecktype = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.SyncTasksResp.prototype.setChecktype = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.SyncTasksResp.prototype.getTrigger = function() {
      return (
        /** @type{?proto.aggregator.TaskTrigger} */
        jspb.Message.getWrapperField(this, proto.aggregator.TaskTrigger, 3)
      );
    };
    proto.aggregator.SyncTasksResp.prototype.setTrigger = function(value) {
      return jspb.Message.setWrapperField(this, 3, value);
    };
    proto.aggregator.SyncTasksResp.prototype.clearTrigger = function() {
      return this.setTrigger(void 0);
    };
    proto.aggregator.SyncTasksResp.prototype.hasTrigger = function() {
      return jspb.Message.getField(this, 3) != null;
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.ETHTransfer.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ETHTransfer.toObject(opt_includeInstance, this);
      };
      proto.aggregator.ETHTransfer.toObject = function(includeInstance, msg) {
        var f, obj = {
          destination: jspb.Message.getFieldWithDefault(msg, 1, ""),
          amount: jspb.Message.getFieldWithDefault(msg, 2, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.ETHTransfer.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.ETHTransfer();
      return proto.aggregator.ETHTransfer.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.ETHTransfer.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setDestination(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setAmount(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.ETHTransfer.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.ETHTransfer.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.ETHTransfer.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getDestination();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
      f = message.getAmount();
      if (f.length > 0) {
        writer.writeString(2, f);
      }
    };
    proto.aggregator.ETHTransfer.prototype.getDestination = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.ETHTransfer.prototype.setDestination = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.ETHTransfer.prototype.getAmount = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.ETHTransfer.prototype.setAmount = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.ContractExecution.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ContractExecution.toObject(
          opt_includeInstance,
          this
        );
      };
      proto.aggregator.ContractExecution.toObject = function(includeInstance, msg) {
        var f, obj = {
          contractAddress: jspb.Message.getFieldWithDefault(msg, 1, ""),
          callData: jspb.Message.getFieldWithDefault(msg, 2, ""),
          method: jspb.Message.getFieldWithDefault(msg, 3, ""),
          encodedParams: jspb.Message.getFieldWithDefault(msg, 4, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.ContractExecution.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.ContractExecution();
      return proto.aggregator.ContractExecution.deserializeBinaryFromReader(
        msg,
        reader
      );
    };
    proto.aggregator.ContractExecution.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setContractAddress(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setCallData(value);
            break;
          case 3:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setMethod(value);
            break;
          case 4:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setEncodedParams(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.ContractExecution.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.ContractExecution.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.ContractExecution.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getContractAddress();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
      f = message.getCallData();
      if (f.length > 0) {
        writer.writeString(2, f);
      }
      f = message.getMethod();
      if (f.length > 0) {
        writer.writeString(3, f);
      }
      f = message.getEncodedParams();
      if (f.length > 0) {
        writer.writeString(4, f);
      }
    };
    proto.aggregator.ContractExecution.prototype.getContractAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.ContractExecution.prototype.setContractAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.ContractExecution.prototype.getCallData = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.ContractExecution.prototype.setCallData = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.ContractExecution.prototype.getMethod = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.ContractExecution.prototype.setMethod = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    proto.aggregator.ContractExecution.prototype.getEncodedParams = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 4, "")
      );
    };
    proto.aggregator.ContractExecution.prototype.setEncodedParams = function(value) {
      return jspb.Message.setProto3StringField(this, 4, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.GraphQLDataQuery.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.GraphQLDataQuery.toObject(
          opt_includeInstance,
          this
        );
      };
      proto.aggregator.GraphQLDataQuery.toObject = function(includeInstance, msg) {
        var f, obj = {
          url: jspb.Message.getFieldWithDefault(msg, 1, ""),
          query: jspb.Message.getFieldWithDefault(msg, 2, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.GraphQLDataQuery.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.GraphQLDataQuery();
      return proto.aggregator.GraphQLDataQuery.deserializeBinaryFromReader(
        msg,
        reader
      );
    };
    proto.aggregator.GraphQLDataQuery.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setUrl(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setQuery(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.GraphQLDataQuery.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.GraphQLDataQuery.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.GraphQLDataQuery.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getUrl();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
      f = message.getQuery();
      if (f.length > 0) {
        writer.writeString(2, f);
      }
    };
    proto.aggregator.GraphQLDataQuery.prototype.getUrl = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.GraphQLDataQuery.prototype.setUrl = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.GraphQLDataQuery.prototype.getQuery = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.GraphQLDataQuery.prototype.setQuery = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.HTTPAPICall.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.HTTPAPICall.toObject(opt_includeInstance, this);
      };
      proto.aggregator.HTTPAPICall.toObject = function(includeInstance, msg) {
        var f, obj = {
          url: jspb.Message.getFieldWithDefault(msg, 1, ""),
          headersMap: (f = msg.getHeadersMap()) ? f.toObject(includeInstance, void 0) : [],
          body: jspb.Message.getFieldWithDefault(msg, 3, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.HTTPAPICall.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.HTTPAPICall();
      return proto.aggregator.HTTPAPICall.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.HTTPAPICall.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setUrl(value);
            break;
          case 2:
            var value = msg.getHeadersMap();
            reader.readMessage(value, function(message, reader2) {
              jspb.Map.deserializeBinary(
                message,
                reader2,
                jspb.BinaryReader.prototype.readString,
                jspb.BinaryReader.prototype.readString,
                null,
                "",
                ""
              );
            });
            break;
          case 3:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setBody(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.HTTPAPICall.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.HTTPAPICall.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.HTTPAPICall.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getUrl();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
      f = message.getHeadersMap(true);
      if (f && f.getLength() > 0) {
        f.serializeBinary(
          2,
          writer,
          jspb.BinaryWriter.prototype.writeString,
          jspb.BinaryWriter.prototype.writeString
        );
      }
      f = message.getBody();
      if (f.length > 0) {
        writer.writeString(3, f);
      }
    };
    proto.aggregator.HTTPAPICall.prototype.getUrl = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.HTTPAPICall.prototype.setUrl = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.HTTPAPICall.prototype.getHeadersMap = function(opt_noLazyCreate) {
      return (
        /** @type {!jspb.Map<string,string>} */
        jspb.Message.getMapField(this, 2, opt_noLazyCreate, null)
      );
    };
    proto.aggregator.HTTPAPICall.prototype.clearHeadersMap = function() {
      this.getHeadersMap().clear();
      return this;
    };
    proto.aggregator.HTTPAPICall.prototype.getBody = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.HTTPAPICall.prototype.setBody = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.CustomCode.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.CustomCode.toObject(opt_includeInstance, this);
      };
      proto.aggregator.CustomCode.toObject = function(includeInstance, msg) {
        var f, obj = {
          type: jspb.Message.getFieldWithDefault(msg, 1, 0),
          body: jspb.Message.getFieldWithDefault(msg, 2, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.CustomCode.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.CustomCode();
      return proto.aggregator.CustomCode.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.CustomCode.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {!proto.aggregator.CustomCodeType} */
              reader.readEnum()
            );
            msg.setType(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setBody(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.CustomCode.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.CustomCode.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.CustomCode.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getType();
      if (f !== 0) {
        writer.writeEnum(1, f);
      }
      f = message.getBody();
      if (f.length > 0) {
        writer.writeString(2, f);
      }
    };
    proto.aggregator.CustomCode.prototype.getType = function() {
      return (
        /** @type {!proto.aggregator.CustomCodeType} */
        jspb.Message.getFieldWithDefault(this, 1, 0)
      );
    };
    proto.aggregator.CustomCode.prototype.setType = function(value) {
      return jspb.Message.setProto3EnumField(this, 1, value);
    };
    proto.aggregator.CustomCode.prototype.getBody = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.CustomCode.prototype.setBody = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.ConditionJump.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ConditionJump.toObject(opt_includeInstance, this);
      };
      proto.aggregator.ConditionJump.toObject = function(includeInstance, msg) {
        var f, obj = {
          expression: jspb.Message.getFieldWithDefault(msg, 1, ""),
          next: jspb.Message.getFieldWithDefault(msg, 2, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.ConditionJump.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.ConditionJump();
      return proto.aggregator.ConditionJump.deserializeBinaryFromReader(
        msg,
        reader
      );
    };
    proto.aggregator.ConditionJump.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setExpression(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setNext(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.ConditionJump.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.ConditionJump.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.ConditionJump.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getExpression();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
      f = message.getNext();
      if (f.length > 0) {
        writer.writeString(2, f);
      }
    };
    proto.aggregator.ConditionJump.prototype.getExpression = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.ConditionJump.prototype.setExpression = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.ConditionJump.prototype.getNext = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.ConditionJump.prototype.setNext = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.BranchAction.repeatedFields_ = [2];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.BranchAction.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.BranchAction.toObject(opt_includeInstance, this);
      };
      proto.aggregator.BranchAction.toObject = function(includeInstance, msg) {
        var f, obj = {
          pb_if: (f = msg.getIf()) && proto.aggregator.ConditionJump.toObject(includeInstance, f),
          elseifsList: jspb.Message.toObjectList(
            msg.getElseifsList(),
            proto.aggregator.ConditionJump.toObject,
            includeInstance
          ),
          pb_else: (f = msg.getElse()) && proto.aggregator.ConditionJump.toObject(includeInstance, f)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.BranchAction.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.BranchAction();
      return proto.aggregator.BranchAction.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.BranchAction.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = new proto.aggregator.ConditionJump();
            reader.readMessage(
              value,
              proto.aggregator.ConditionJump.deserializeBinaryFromReader
            );
            msg.setIf(value);
            break;
          case 2:
            var value = new proto.aggregator.ConditionJump();
            reader.readMessage(
              value,
              proto.aggregator.ConditionJump.deserializeBinaryFromReader
            );
            msg.addElseifs(value);
            break;
          case 3:
            var value = new proto.aggregator.ConditionJump();
            reader.readMessage(
              value,
              proto.aggregator.ConditionJump.deserializeBinaryFromReader
            );
            msg.setElse(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.BranchAction.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.BranchAction.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.BranchAction.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getIf();
      if (f != null) {
        writer.writeMessage(
          1,
          f,
          proto.aggregator.ConditionJump.serializeBinaryToWriter
        );
      }
      f = message.getElseifsList();
      if (f.length > 0) {
        writer.writeRepeatedMessage(
          2,
          f,
          proto.aggregator.ConditionJump.serializeBinaryToWriter
        );
      }
      f = message.getElse();
      if (f != null) {
        writer.writeMessage(
          3,
          f,
          proto.aggregator.ConditionJump.serializeBinaryToWriter
        );
      }
    };
    proto.aggregator.BranchAction.prototype.getIf = function() {
      return (
        /** @type{?proto.aggregator.ConditionJump} */
        jspb.Message.getWrapperField(this, proto.aggregator.ConditionJump, 1)
      );
    };
    proto.aggregator.BranchAction.prototype.setIf = function(value) {
      return jspb.Message.setWrapperField(this, 1, value);
    };
    proto.aggregator.BranchAction.prototype.clearIf = function() {
      return this.setIf(void 0);
    };
    proto.aggregator.BranchAction.prototype.hasIf = function() {
      return jspb.Message.getField(this, 1) != null;
    };
    proto.aggregator.BranchAction.prototype.getElseifsList = function() {
      return (
        /** @type{!Array<!proto.aggregator.ConditionJump>} */
        jspb.Message.getRepeatedWrapperField(
          this,
          proto.aggregator.ConditionJump,
          2
        )
      );
    };
    proto.aggregator.BranchAction.prototype.setElseifsList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 2, value);
    };
    proto.aggregator.BranchAction.prototype.addElseifs = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(
        this,
        2,
        opt_value,
        proto.aggregator.ConditionJump,
        opt_index
      );
    };
    proto.aggregator.BranchAction.prototype.clearElseifsList = function() {
      return this.setElseifsList([]);
    };
    proto.aggregator.BranchAction.prototype.getElse = function() {
      return (
        /** @type{?proto.aggregator.ConditionJump} */
        jspb.Message.getWrapperField(this, proto.aggregator.ConditionJump, 3)
      );
    };
    proto.aggregator.BranchAction.prototype.setElse = function(value) {
      return jspb.Message.setWrapperField(this, 3, value);
    };
    proto.aggregator.BranchAction.prototype.clearElse = function() {
      return this.setElse(void 0);
    };
    proto.aggregator.BranchAction.prototype.hasElse = function() {
      return jspb.Message.getField(this, 3) != null;
    };
    proto.aggregator.TaskAction.repeatedFields_ = [4];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.TaskAction.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.TaskAction.toObject(opt_includeInstance, this);
      };
      proto.aggregator.TaskAction.toObject = function(includeInstance, msg) {
        var f, obj = {
          taskType: jspb.Message.getFieldWithDefault(msg, 1, 0),
          id: jspb.Message.getFieldWithDefault(msg, 2, ""),
          name: jspb.Message.getFieldWithDefault(msg, 3, ""),
          nextList: (f = jspb.Message.getRepeatedField(msg, 4)) == null ? void 0 : f,
          ethTransfer: (f = msg.getEthTransfer()) && proto.aggregator.ETHTransfer.toObject(includeInstance, f),
          contractExecution: (f = msg.getContractExecution()) && proto.aggregator.ContractExecution.toObject(includeInstance, f),
          graphqlDataQuery: (f = msg.getGraphqlDataQuery()) && proto.aggregator.GraphQLDataQuery.toObject(includeInstance, f),
          httpDataQuery: (f = msg.getHttpDataQuery()) && proto.aggregator.HTTPAPICall.toObject(includeInstance, f),
          customCode: (f = msg.getCustomCode()) && proto.aggregator.CustomCode.toObject(includeInstance, f),
          branch: (f = msg.getBranch()) && proto.aggregator.BranchAction.toObject(includeInstance, f)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.TaskAction.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.TaskAction();
      return proto.aggregator.TaskAction.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.TaskAction.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {!proto.aggregator.TaskType} */
              reader.readEnum()
            );
            msg.setTaskType(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setId(value);
            break;
          case 3:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setName(value);
            break;
          case 4:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.addNext(value);
            break;
          case 10:
            var value = new proto.aggregator.ETHTransfer();
            reader.readMessage(
              value,
              proto.aggregator.ETHTransfer.deserializeBinaryFromReader
            );
            msg.setEthTransfer(value);
            break;
          case 11:
            var value = new proto.aggregator.ContractExecution();
            reader.readMessage(
              value,
              proto.aggregator.ContractExecution.deserializeBinaryFromReader
            );
            msg.setContractExecution(value);
            break;
          case 12:
            var value = new proto.aggregator.GraphQLDataQuery();
            reader.readMessage(
              value,
              proto.aggregator.GraphQLDataQuery.deserializeBinaryFromReader
            );
            msg.setGraphqlDataQuery(value);
            break;
          case 13:
            var value = new proto.aggregator.HTTPAPICall();
            reader.readMessage(
              value,
              proto.aggregator.HTTPAPICall.deserializeBinaryFromReader
            );
            msg.setHttpDataQuery(value);
            break;
          case 14:
            var value = new proto.aggregator.CustomCode();
            reader.readMessage(
              value,
              proto.aggregator.CustomCode.deserializeBinaryFromReader
            );
            msg.setCustomCode(value);
            break;
          case 15:
            var value = new proto.aggregator.BranchAction();
            reader.readMessage(
              value,
              proto.aggregator.BranchAction.deserializeBinaryFromReader
            );
            msg.setBranch(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.TaskAction.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.TaskAction.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.TaskAction.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getTaskType();
      if (f !== 0) {
        writer.writeEnum(1, f);
      }
      f = message.getId();
      if (f.length > 0) {
        writer.writeString(2, f);
      }
      f = message.getName();
      if (f.length > 0) {
        writer.writeString(3, f);
      }
      f = message.getNextList();
      if (f.length > 0) {
        writer.writeRepeatedString(4, f);
      }
      f = message.getEthTransfer();
      if (f != null) {
        writer.writeMessage(
          10,
          f,
          proto.aggregator.ETHTransfer.serializeBinaryToWriter
        );
      }
      f = message.getContractExecution();
      if (f != null) {
        writer.writeMessage(
          11,
          f,
          proto.aggregator.ContractExecution.serializeBinaryToWriter
        );
      }
      f = message.getGraphqlDataQuery();
      if (f != null) {
        writer.writeMessage(
          12,
          f,
          proto.aggregator.GraphQLDataQuery.serializeBinaryToWriter
        );
      }
      f = message.getHttpDataQuery();
      if (f != null) {
        writer.writeMessage(
          13,
          f,
          proto.aggregator.HTTPAPICall.serializeBinaryToWriter
        );
      }
      f = message.getCustomCode();
      if (f != null) {
        writer.writeMessage(
          14,
          f,
          proto.aggregator.CustomCode.serializeBinaryToWriter
        );
      }
      f = message.getBranch();
      if (f != null) {
        writer.writeMessage(
          15,
          f,
          proto.aggregator.BranchAction.serializeBinaryToWriter
        );
      }
    };
    proto.aggregator.TaskAction.prototype.getTaskType = function() {
      return (
        /** @type {!proto.aggregator.TaskType} */
        jspb.Message.getFieldWithDefault(this, 1, 0)
      );
    };
    proto.aggregator.TaskAction.prototype.setTaskType = function(value) {
      return jspb.Message.setProto3EnumField(this, 1, value);
    };
    proto.aggregator.TaskAction.prototype.getId = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.TaskAction.prototype.setId = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.TaskAction.prototype.getName = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.TaskAction.prototype.setName = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    proto.aggregator.TaskAction.prototype.getNextList = function() {
      return (
        /** @type {!Array<string>} */
        jspb.Message.getRepeatedField(this, 4)
      );
    };
    proto.aggregator.TaskAction.prototype.setNextList = function(value) {
      return jspb.Message.setField(this, 4, value || []);
    };
    proto.aggregator.TaskAction.prototype.addNext = function(value, opt_index) {
      return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
    };
    proto.aggregator.TaskAction.prototype.clearNextList = function() {
      return this.setNextList([]);
    };
    proto.aggregator.TaskAction.prototype.getEthTransfer = function() {
      return (
        /** @type{?proto.aggregator.ETHTransfer} */
        jspb.Message.getWrapperField(this, proto.aggregator.ETHTransfer, 10)
      );
    };
    proto.aggregator.TaskAction.prototype.setEthTransfer = function(value) {
      return jspb.Message.setWrapperField(this, 10, value);
    };
    proto.aggregator.TaskAction.prototype.clearEthTransfer = function() {
      return this.setEthTransfer(void 0);
    };
    proto.aggregator.TaskAction.prototype.hasEthTransfer = function() {
      return jspb.Message.getField(this, 10) != null;
    };
    proto.aggregator.TaskAction.prototype.getContractExecution = function() {
      return (
        /** @type{?proto.aggregator.ContractExecution} */
        jspb.Message.getWrapperField(this, proto.aggregator.ContractExecution, 11)
      );
    };
    proto.aggregator.TaskAction.prototype.setContractExecution = function(value) {
      return jspb.Message.setWrapperField(this, 11, value);
    };
    proto.aggregator.TaskAction.prototype.clearContractExecution = function() {
      return this.setContractExecution(void 0);
    };
    proto.aggregator.TaskAction.prototype.hasContractExecution = function() {
      return jspb.Message.getField(this, 11) != null;
    };
    proto.aggregator.TaskAction.prototype.getGraphqlDataQuery = function() {
      return (
        /** @type{?proto.aggregator.GraphQLDataQuery} */
        jspb.Message.getWrapperField(this, proto.aggregator.GraphQLDataQuery, 12)
      );
    };
    proto.aggregator.TaskAction.prototype.setGraphqlDataQuery = function(value) {
      return jspb.Message.setWrapperField(this, 12, value);
    };
    proto.aggregator.TaskAction.prototype.clearGraphqlDataQuery = function() {
      return this.setGraphqlDataQuery(void 0);
    };
    proto.aggregator.TaskAction.prototype.hasGraphqlDataQuery = function() {
      return jspb.Message.getField(this, 12) != null;
    };
    proto.aggregator.TaskAction.prototype.getHttpDataQuery = function() {
      return (
        /** @type{?proto.aggregator.HTTPAPICall} */
        jspb.Message.getWrapperField(this, proto.aggregator.HTTPAPICall, 13)
      );
    };
    proto.aggregator.TaskAction.prototype.setHttpDataQuery = function(value) {
      return jspb.Message.setWrapperField(this, 13, value);
    };
    proto.aggregator.TaskAction.prototype.clearHttpDataQuery = function() {
      return this.setHttpDataQuery(void 0);
    };
    proto.aggregator.TaskAction.prototype.hasHttpDataQuery = function() {
      return jspb.Message.getField(this, 13) != null;
    };
    proto.aggregator.TaskAction.prototype.getCustomCode = function() {
      return (
        /** @type{?proto.aggregator.CustomCode} */
        jspb.Message.getWrapperField(this, proto.aggregator.CustomCode, 14)
      );
    };
    proto.aggregator.TaskAction.prototype.setCustomCode = function(value) {
      return jspb.Message.setWrapperField(this, 14, value);
    };
    proto.aggregator.TaskAction.prototype.clearCustomCode = function() {
      return this.setCustomCode(void 0);
    };
    proto.aggregator.TaskAction.prototype.hasCustomCode = function() {
      return jspb.Message.getField(this, 14) != null;
    };
    proto.aggregator.TaskAction.prototype.getBranch = function() {
      return (
        /** @type{?proto.aggregator.BranchAction} */
        jspb.Message.getWrapperField(this, proto.aggregator.BranchAction, 15)
      );
    };
    proto.aggregator.TaskAction.prototype.setBranch = function(value) {
      return jspb.Message.setWrapperField(this, 15, value);
    };
    proto.aggregator.TaskAction.prototype.clearBranch = function() {
      return this.setBranch(void 0);
    };
    proto.aggregator.TaskAction.prototype.hasBranch = function() {
      return jspb.Message.getField(this, 15) != null;
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.Execution.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.Execution.toObject(opt_includeInstance, this);
      };
      proto.aggregator.Execution.toObject = function(includeInstance, msg) {
        var f, obj = {
          epoch: jspb.Message.getFieldWithDefault(msg, 1, 0),
          userOpHash: jspb.Message.getFieldWithDefault(msg, 2, ""),
          error: jspb.Message.getFieldWithDefault(msg, 3, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.Execution.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.Execution();
      return proto.aggregator.Execution.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.Execution.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setEpoch(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setUserOpHash(value);
            break;
          case 3:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setError(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.Execution.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.Execution.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.Execution.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getEpoch();
      if (f !== 0) {
        writer.writeInt64(1, f);
      }
      f = message.getUserOpHash();
      if (f.length > 0) {
        writer.writeString(2, f);
      }
      f = message.getError();
      if (f.length > 0) {
        writer.writeString(3, f);
      }
    };
    proto.aggregator.Execution.prototype.getEpoch = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 1, 0)
      );
    };
    proto.aggregator.Execution.prototype.setEpoch = function(value) {
      return jspb.Message.setProto3IntField(this, 1, value);
    };
    proto.aggregator.Execution.prototype.getUserOpHash = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.Execution.prototype.setUserOpHash = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.Execution.prototype.getError = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.Execution.prototype.setError = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    proto.aggregator.Task.repeatedFields_ = [5, 12];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.Task.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.Task.toObject(opt_includeInstance, this);
      };
      proto.aggregator.Task.toObject = function(includeInstance, msg) {
        var f, obj = {
          id: (f = msg.getId()) && proto.aggregator.UUID.toObject(includeInstance, f),
          owner: jspb.Message.getFieldWithDefault(msg, 2, ""),
          smartAccountAddress: jspb.Message.getFieldWithDefault(msg, 3, ""),
          trigger: (f = msg.getTrigger()) && proto.aggregator.TaskTrigger.toObject(includeInstance, f),
          nodesList: jspb.Message.toObjectList(
            msg.getNodesList(),
            proto.aggregator.TaskAction.toObject,
            includeInstance
          ),
          startAt: jspb.Message.getFieldWithDefault(msg, 6, 0),
          expiredAt: jspb.Message.getFieldWithDefault(msg, 7, 0),
          memo: jspb.Message.getFieldWithDefault(msg, 8, ""),
          completedAt: jspb.Message.getFieldWithDefault(msg, 9, 0),
          status: jspb.Message.getFieldWithDefault(msg, 10, 0),
          repeatable: jspb.Message.getBooleanFieldWithDefault(msg, 11, false),
          executionsList: jspb.Message.toObjectList(
            msg.getExecutionsList(),
            proto.aggregator.Execution.toObject,
            includeInstance
          )
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.Task.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.Task();
      return proto.aggregator.Task.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.Task.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = new proto.aggregator.UUID();
            reader.readMessage(
              value,
              proto.aggregator.UUID.deserializeBinaryFromReader
            );
            msg.setId(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setOwner(value);
            break;
          case 3:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setSmartAccountAddress(value);
            break;
          case 4:
            var value = new proto.aggregator.TaskTrigger();
            reader.readMessage(
              value,
              proto.aggregator.TaskTrigger.deserializeBinaryFromReader
            );
            msg.setTrigger(value);
            break;
          case 5:
            var value = new proto.aggregator.TaskAction();
            reader.readMessage(
              value,
              proto.aggregator.TaskAction.deserializeBinaryFromReader
            );
            msg.addNodes(value);
            break;
          case 6:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setStartAt(value);
            break;
          case 7:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setExpiredAt(value);
            break;
          case 8:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setMemo(value);
            break;
          case 9:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setCompletedAt(value);
            break;
          case 10:
            var value = (
              /** @type {!proto.aggregator.TaskStatus} */
              reader.readEnum()
            );
            msg.setStatus(value);
            break;
          case 11:
            var value = (
              /** @type {boolean} */
              reader.readBool()
            );
            msg.setRepeatable(value);
            break;
          case 12:
            var value = new proto.aggregator.Execution();
            reader.readMessage(
              value,
              proto.aggregator.Execution.deserializeBinaryFromReader
            );
            msg.addExecutions(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.Task.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.Task.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.Task.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getId();
      if (f != null) {
        writer.writeMessage(1, f, proto.aggregator.UUID.serializeBinaryToWriter);
      }
      f = message.getOwner();
      if (f.length > 0) {
        writer.writeString(2, f);
      }
      f = message.getSmartAccountAddress();
      if (f.length > 0) {
        writer.writeString(3, f);
      }
      f = message.getTrigger();
      if (f != null) {
        writer.writeMessage(
          4,
          f,
          proto.aggregator.TaskTrigger.serializeBinaryToWriter
        );
      }
      f = message.getNodesList();
      if (f.length > 0) {
        writer.writeRepeatedMessage(
          5,
          f,
          proto.aggregator.TaskAction.serializeBinaryToWriter
        );
      }
      f = message.getStartAt();
      if (f !== 0) {
        writer.writeInt64(6, f);
      }
      f = message.getExpiredAt();
      if (f !== 0) {
        writer.writeInt64(7, f);
      }
      f = message.getMemo();
      if (f.length > 0) {
        writer.writeString(8, f);
      }
      f = message.getCompletedAt();
      if (f !== 0) {
        writer.writeInt64(9, f);
      }
      f = message.getStatus();
      if (f !== 0) {
        writer.writeEnum(10, f);
      }
      f = message.getRepeatable();
      if (f) {
        writer.writeBool(11, f);
      }
      f = message.getExecutionsList();
      if (f.length > 0) {
        writer.writeRepeatedMessage(
          12,
          f,
          proto.aggregator.Execution.serializeBinaryToWriter
        );
      }
    };
    proto.aggregator.Task.prototype.getId = function() {
      return (
        /** @type{?proto.aggregator.UUID} */
        jspb.Message.getWrapperField(this, proto.aggregator.UUID, 1)
      );
    };
    proto.aggregator.Task.prototype.setId = function(value) {
      return jspb.Message.setWrapperField(this, 1, value);
    };
    proto.aggregator.Task.prototype.clearId = function() {
      return this.setId(void 0);
    };
    proto.aggregator.Task.prototype.hasId = function() {
      return jspb.Message.getField(this, 1) != null;
    };
    proto.aggregator.Task.prototype.getOwner = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.Task.prototype.setOwner = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.Task.prototype.getSmartAccountAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.Task.prototype.setSmartAccountAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    proto.aggregator.Task.prototype.getTrigger = function() {
      return (
        /** @type{?proto.aggregator.TaskTrigger} */
        jspb.Message.getWrapperField(this, proto.aggregator.TaskTrigger, 4)
      );
    };
    proto.aggregator.Task.prototype.setTrigger = function(value) {
      return jspb.Message.setWrapperField(this, 4, value);
    };
    proto.aggregator.Task.prototype.clearTrigger = function() {
      return this.setTrigger(void 0);
    };
    proto.aggregator.Task.prototype.hasTrigger = function() {
      return jspb.Message.getField(this, 4) != null;
    };
    proto.aggregator.Task.prototype.getNodesList = function() {
      return (
        /** @type{!Array<!proto.aggregator.TaskAction>} */
        jspb.Message.getRepeatedWrapperField(this, proto.aggregator.TaskAction, 5)
      );
    };
    proto.aggregator.Task.prototype.setNodesList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 5, value);
    };
    proto.aggregator.Task.prototype.addNodes = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(
        this,
        5,
        opt_value,
        proto.aggregator.TaskAction,
        opt_index
      );
    };
    proto.aggregator.Task.prototype.clearNodesList = function() {
      return this.setNodesList([]);
    };
    proto.aggregator.Task.prototype.getStartAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 6, 0)
      );
    };
    proto.aggregator.Task.prototype.setStartAt = function(value) {
      return jspb.Message.setProto3IntField(this, 6, value);
    };
    proto.aggregator.Task.prototype.getExpiredAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 7, 0)
      );
    };
    proto.aggregator.Task.prototype.setExpiredAt = function(value) {
      return jspb.Message.setProto3IntField(this, 7, value);
    };
    proto.aggregator.Task.prototype.getMemo = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 8, "")
      );
    };
    proto.aggregator.Task.prototype.setMemo = function(value) {
      return jspb.Message.setProto3StringField(this, 8, value);
    };
    proto.aggregator.Task.prototype.getCompletedAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 9, 0)
      );
    };
    proto.aggregator.Task.prototype.setCompletedAt = function(value) {
      return jspb.Message.setProto3IntField(this, 9, value);
    };
    proto.aggregator.Task.prototype.getStatus = function() {
      return (
        /** @type {!proto.aggregator.TaskStatus} */
        jspb.Message.getFieldWithDefault(this, 10, 0)
      );
    };
    proto.aggregator.Task.prototype.setStatus = function(value) {
      return jspb.Message.setProto3EnumField(this, 10, value);
    };
    proto.aggregator.Task.prototype.getRepeatable = function() {
      return (
        /** @type {boolean} */
        jspb.Message.getBooleanFieldWithDefault(this, 11, false)
      );
    };
    proto.aggregator.Task.prototype.setRepeatable = function(value) {
      return jspb.Message.setProto3BooleanField(this, 11, value);
    };
    proto.aggregator.Task.prototype.getExecutionsList = function() {
      return (
        /** @type{!Array<!proto.aggregator.Execution>} */
        jspb.Message.getRepeatedWrapperField(this, proto.aggregator.Execution, 12)
      );
    };
    proto.aggregator.Task.prototype.setExecutionsList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 12, value);
    };
    proto.aggregator.Task.prototype.addExecutions = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(
        this,
        12,
        opt_value,
        proto.aggregator.Execution,
        opt_index
      );
    };
    proto.aggregator.Task.prototype.clearExecutionsList = function() {
      return this.setExecutionsList([]);
    };
    proto.aggregator.CreateTaskReq.repeatedFields_ = [2];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.CreateTaskReq.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.CreateTaskReq.toObject(opt_includeInstance, this);
      };
      proto.aggregator.CreateTaskReq.toObject = function(includeInstance, msg) {
        var f, obj = {
          trigger: (f = msg.getTrigger()) && proto.aggregator.TaskTrigger.toObject(includeInstance, f),
          actionsList: jspb.Message.toObjectList(
            msg.getActionsList(),
            proto.aggregator.TaskAction.toObject,
            includeInstance
          ),
          startAt: jspb.Message.getFieldWithDefault(msg, 3, 0),
          expiredAt: jspb.Message.getFieldWithDefault(msg, 4, 0),
          memo: jspb.Message.getFieldWithDefault(msg, 5, ""),
          repeatable: jspb.Message.getBooleanFieldWithDefault(msg, 6, false)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.CreateTaskReq.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.CreateTaskReq();
      return proto.aggregator.CreateTaskReq.deserializeBinaryFromReader(
        msg,
        reader
      );
    };
    proto.aggregator.CreateTaskReq.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = new proto.aggregator.TaskTrigger();
            reader.readMessage(
              value,
              proto.aggregator.TaskTrigger.deserializeBinaryFromReader
            );
            msg.setTrigger(value);
            break;
          case 2:
            var value = new proto.aggregator.TaskAction();
            reader.readMessage(
              value,
              proto.aggregator.TaskAction.deserializeBinaryFromReader
            );
            msg.addActions(value);
            break;
          case 3:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setStartAt(value);
            break;
          case 4:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setExpiredAt(value);
            break;
          case 5:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setMemo(value);
            break;
          case 6:
            var value = (
              /** @type {boolean} */
              reader.readBool()
            );
            msg.setRepeatable(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.CreateTaskReq.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.CreateTaskReq.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.CreateTaskReq.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getTrigger();
      if (f != null) {
        writer.writeMessage(
          1,
          f,
          proto.aggregator.TaskTrigger.serializeBinaryToWriter
        );
      }
      f = message.getActionsList();
      if (f.length > 0) {
        writer.writeRepeatedMessage(
          2,
          f,
          proto.aggregator.TaskAction.serializeBinaryToWriter
        );
      }
      f = message.getStartAt();
      if (f !== 0) {
        writer.writeInt64(3, f);
      }
      f = message.getExpiredAt();
      if (f !== 0) {
        writer.writeInt64(4, f);
      }
      f = message.getMemo();
      if (f.length > 0) {
        writer.writeString(5, f);
      }
      f = message.getRepeatable();
      if (f) {
        writer.writeBool(6, f);
      }
    };
    proto.aggregator.CreateTaskReq.prototype.getTrigger = function() {
      return (
        /** @type{?proto.aggregator.TaskTrigger} */
        jspb.Message.getWrapperField(this, proto.aggregator.TaskTrigger, 1)
      );
    };
    proto.aggregator.CreateTaskReq.prototype.setTrigger = function(value) {
      return jspb.Message.setWrapperField(this, 1, value);
    };
    proto.aggregator.CreateTaskReq.prototype.clearTrigger = function() {
      return this.setTrigger(void 0);
    };
    proto.aggregator.CreateTaskReq.prototype.hasTrigger = function() {
      return jspb.Message.getField(this, 1) != null;
    };
    proto.aggregator.CreateTaskReq.prototype.getActionsList = function() {
      return (
        /** @type{!Array<!proto.aggregator.TaskAction>} */
        jspb.Message.getRepeatedWrapperField(this, proto.aggregator.TaskAction, 2)
      );
    };
    proto.aggregator.CreateTaskReq.prototype.setActionsList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 2, value);
    };
    proto.aggregator.CreateTaskReq.prototype.addActions = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(
        this,
        2,
        opt_value,
        proto.aggregator.TaskAction,
        opt_index
      );
    };
    proto.aggregator.CreateTaskReq.prototype.clearActionsList = function() {
      return this.setActionsList([]);
    };
    proto.aggregator.CreateTaskReq.prototype.getStartAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 3, 0)
      );
    };
    proto.aggregator.CreateTaskReq.prototype.setStartAt = function(value) {
      return jspb.Message.setProto3IntField(this, 3, value);
    };
    proto.aggregator.CreateTaskReq.prototype.getExpiredAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 4, 0)
      );
    };
    proto.aggregator.CreateTaskReq.prototype.setExpiredAt = function(value) {
      return jspb.Message.setProto3IntField(this, 4, value);
    };
    proto.aggregator.CreateTaskReq.prototype.getMemo = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 5, "")
      );
    };
    proto.aggregator.CreateTaskReq.prototype.setMemo = function(value) {
      return jspb.Message.setProto3StringField(this, 5, value);
    };
    proto.aggregator.CreateTaskReq.prototype.getRepeatable = function() {
      return (
        /** @type {boolean} */
        jspb.Message.getBooleanFieldWithDefault(this, 6, false)
      );
    };
    proto.aggregator.CreateTaskReq.prototype.setRepeatable = function(value) {
      return jspb.Message.setProto3BooleanField(this, 6, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.CreateTaskResp.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.CreateTaskResp.toObject(opt_includeInstance, this);
      };
      proto.aggregator.CreateTaskResp.toObject = function(includeInstance, msg) {
        var f, obj = {
          id: jspb.Message.getFieldWithDefault(msg, 1, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.CreateTaskResp.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.CreateTaskResp();
      return proto.aggregator.CreateTaskResp.deserializeBinaryFromReader(
        msg,
        reader
      );
    };
    proto.aggregator.CreateTaskResp.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setId(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.CreateTaskResp.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.CreateTaskResp.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.CreateTaskResp.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getId();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
    };
    proto.aggregator.CreateTaskResp.prototype.getId = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.CreateTaskResp.prototype.setId = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.NonceRequest.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.NonceRequest.toObject(opt_includeInstance, this);
      };
      proto.aggregator.NonceRequest.toObject = function(includeInstance, msg) {
        var f, obj = {
          owner: jspb.Message.getFieldWithDefault(msg, 1, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.NonceRequest.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.NonceRequest();
      return proto.aggregator.NonceRequest.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.NonceRequest.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setOwner(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.NonceRequest.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.NonceRequest.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.NonceRequest.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getOwner();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
    };
    proto.aggregator.NonceRequest.prototype.getOwner = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.NonceRequest.prototype.setOwner = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.NonceResp.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.NonceResp.toObject(opt_includeInstance, this);
      };
      proto.aggregator.NonceResp.toObject = function(includeInstance, msg) {
        var f, obj = {
          nonce: jspb.Message.getFieldWithDefault(msg, 1, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.NonceResp.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.NonceResp();
      return proto.aggregator.NonceResp.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.NonceResp.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setNonce(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.NonceResp.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.NonceResp.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.NonceResp.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getNonce();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
    };
    proto.aggregator.NonceResp.prototype.getNonce = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.NonceResp.prototype.setNonce = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.AddressRequest.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.AddressRequest.toObject(opt_includeInstance, this);
      };
      proto.aggregator.AddressRequest.toObject = function(includeInstance, msg) {
        var f, obj = {
          owner: jspb.Message.getFieldWithDefault(msg, 1, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.AddressRequest.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.AddressRequest();
      return proto.aggregator.AddressRequest.deserializeBinaryFromReader(
        msg,
        reader
      );
    };
    proto.aggregator.AddressRequest.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setOwner(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.AddressRequest.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.AddressRequest.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.AddressRequest.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getOwner();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
    };
    proto.aggregator.AddressRequest.prototype.getOwner = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.AddressRequest.prototype.setOwner = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.AddressResp.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.AddressResp.toObject(opt_includeInstance, this);
      };
      proto.aggregator.AddressResp.toObject = function(includeInstance, msg) {
        var f, obj = {
          smartAccountAddress: jspb.Message.getFieldWithDefault(msg, 1, ""),
          nonce: jspb.Message.getFieldWithDefault(msg, 2, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.AddressResp.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.AddressResp();
      return proto.aggregator.AddressResp.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.AddressResp.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setSmartAccountAddress(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setNonce(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.AddressResp.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.AddressResp.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.AddressResp.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getSmartAccountAddress();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
      f = message.getNonce();
      if (f.length > 0) {
        writer.writeString(2, f);
      }
    };
    proto.aggregator.AddressResp.prototype.getSmartAccountAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.AddressResp.prototype.setSmartAccountAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.AddressResp.prototype.getNonce = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.AddressResp.prototype.setNonce = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.ListTasksReq.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ListTasksReq.toObject(opt_includeInstance, this);
      };
      proto.aggregator.ListTasksReq.toObject = function(includeInstance, msg) {
        var f, obj = {};
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.ListTasksReq.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.ListTasksReq();
      return proto.aggregator.ListTasksReq.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.ListTasksReq.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.ListTasksReq.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.ListTasksReq.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.ListTasksReq.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
    };
    proto.aggregator.ListTasksResp.repeatedFields_ = [1];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.ListTasksResp.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ListTasksResp.toObject(opt_includeInstance, this);
      };
      proto.aggregator.ListTasksResp.toObject = function(includeInstance, msg) {
        var f, obj = {
          tasksList: jspb.Message.toObjectList(
            msg.getTasksList(),
            proto.aggregator.ListTasksResp.TaskItemResp.toObject,
            includeInstance
          )
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.ListTasksResp.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.ListTasksResp();
      return proto.aggregator.ListTasksResp.deserializeBinaryFromReader(
        msg,
        reader
      );
    };
    proto.aggregator.ListTasksResp.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = new proto.aggregator.ListTasksResp.TaskItemResp();
            reader.readMessage(
              value,
              proto.aggregator.ListTasksResp.TaskItemResp.deserializeBinaryFromReader
            );
            msg.addTasks(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.ListTasksResp.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.ListTasksResp.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.ListTasksResp.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getTasksList();
      if (f.length > 0) {
        writer.writeRepeatedMessage(
          1,
          f,
          proto.aggregator.ListTasksResp.TaskItemResp.serializeBinaryToWriter
        );
      }
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.ListTasksResp.TaskItemResp.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ListTasksResp.TaskItemResp.toObject(
          opt_includeInstance,
          this
        );
      };
      proto.aggregator.ListTasksResp.TaskItemResp.toObject = function(includeInstance, msg) {
        var f, obj = {
          id: jspb.Message.getFieldWithDefault(msg, 1, ""),
          status: jspb.Message.getFieldWithDefault(msg, 2, 0)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.ListTasksResp.TaskItemResp.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.ListTasksResp.TaskItemResp();
      return proto.aggregator.ListTasksResp.TaskItemResp.deserializeBinaryFromReader(
        msg,
        reader
      );
    };
    proto.aggregator.ListTasksResp.TaskItemResp.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setId(value);
            break;
          case 2:
            var value = (
              /** @type {!proto.aggregator.TaskStatus} */
              reader.readEnum()
            );
            msg.setStatus(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.ListTasksResp.TaskItemResp.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.ListTasksResp.TaskItemResp.serializeBinaryToWriter(
        this,
        writer
      );
      return writer.getResultBuffer();
    };
    proto.aggregator.ListTasksResp.TaskItemResp.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getId();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
      f = message.getStatus();
      if (f !== 0) {
        writer.writeEnum(2, f);
      }
    };
    proto.aggregator.ListTasksResp.TaskItemResp.prototype.getId = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.ListTasksResp.TaskItemResp.prototype.setId = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.ListTasksResp.TaskItemResp.prototype.getStatus = function() {
      return (
        /** @type {!proto.aggregator.TaskStatus} */
        jspb.Message.getFieldWithDefault(this, 2, 0)
      );
    };
    proto.aggregator.ListTasksResp.TaskItemResp.prototype.setStatus = function(value) {
      return jspb.Message.setProto3EnumField(this, 2, value);
    };
    proto.aggregator.ListTasksResp.prototype.getTasksList = function() {
      return (
        /** @type{!Array<!proto.aggregator.ListTasksResp.TaskItemResp>} */
        jspb.Message.getRepeatedWrapperField(
          this,
          proto.aggregator.ListTasksResp.TaskItemResp,
          1
        )
      );
    };
    proto.aggregator.ListTasksResp.prototype.setTasksList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 1, value);
    };
    proto.aggregator.ListTasksResp.prototype.addTasks = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(
        this,
        1,
        opt_value,
        proto.aggregator.ListTasksResp.TaskItemResp,
        opt_index
      );
    };
    proto.aggregator.ListTasksResp.prototype.clearTasksList = function() {
      return this.setTasksList([]);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.GetKeyReq.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.GetKeyReq.toObject(opt_includeInstance, this);
      };
      proto.aggregator.GetKeyReq.toObject = function(includeInstance, msg) {
        var f, obj = {
          owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
          expiredAt: jspb.Message.getFieldWithDefault(msg, 2, 0),
          signature: jspb.Message.getFieldWithDefault(msg, 3, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.GetKeyReq.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.GetKeyReq();
      return proto.aggregator.GetKeyReq.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.GetKeyReq.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setOwner(value);
            break;
          case 2:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setExpiredAt(value);
            break;
          case 3:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setSignature(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.GetKeyReq.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.GetKeyReq.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.GetKeyReq.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getOwner();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
      f = message.getExpiredAt();
      if (f !== 0) {
        writer.writeInt64(2, f);
      }
      f = message.getSignature();
      if (f.length > 0) {
        writer.writeString(3, f);
      }
    };
    proto.aggregator.GetKeyReq.prototype.getOwner = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.GetKeyReq.prototype.setOwner = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.GetKeyReq.prototype.getExpiredAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 2, 0)
      );
    };
    proto.aggregator.GetKeyReq.prototype.setExpiredAt = function(value) {
      return jspb.Message.setProto3IntField(this, 2, value);
    };
    proto.aggregator.GetKeyReq.prototype.getSignature = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.GetKeyReq.prototype.setSignature = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.KeyResp.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.KeyResp.toObject(opt_includeInstance, this);
      };
      proto.aggregator.KeyResp.toObject = function(includeInstance, msg) {
        var f, obj = {
          key: jspb.Message.getFieldWithDefault(msg, 1, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.KeyResp.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.KeyResp();
      return proto.aggregator.KeyResp.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.KeyResp.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setKey(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.KeyResp.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.KeyResp.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.KeyResp.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getKey();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
    };
    proto.aggregator.KeyResp.prototype.getKey = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.KeyResp.prototype.setKey = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.UpdateChecksReq.repeatedFields_ = [3];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.UpdateChecksReq.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.UpdateChecksReq.toObject(opt_includeInstance, this);
      };
      proto.aggregator.UpdateChecksReq.toObject = function(includeInstance, msg) {
        var f, obj = {
          address: jspb.Message.getFieldWithDefault(msg, 1, ""),
          signature: jspb.Message.getFieldWithDefault(msg, 2, ""),
          idList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? void 0 : f
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.UpdateChecksReq.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.UpdateChecksReq();
      return proto.aggregator.UpdateChecksReq.deserializeBinaryFromReader(
        msg,
        reader
      );
    };
    proto.aggregator.UpdateChecksReq.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setAddress(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setSignature(value);
            break;
          case 3:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.addId(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.UpdateChecksReq.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.UpdateChecksReq.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.UpdateChecksReq.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getAddress();
      if (f.length > 0) {
        writer.writeString(1, f);
      }
      f = message.getSignature();
      if (f.length > 0) {
        writer.writeString(2, f);
      }
      f = message.getIdList();
      if (f.length > 0) {
        writer.writeRepeatedString(3, f);
      }
    };
    proto.aggregator.UpdateChecksReq.prototype.getAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.UpdateChecksReq.prototype.setAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.UpdateChecksReq.prototype.getSignature = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.UpdateChecksReq.prototype.setSignature = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.UpdateChecksReq.prototype.getIdList = function() {
      return (
        /** @type {!Array<string>} */
        jspb.Message.getRepeatedField(this, 3)
      );
    };
    proto.aggregator.UpdateChecksReq.prototype.setIdList = function(value) {
      return jspb.Message.setField(this, 3, value || []);
    };
    proto.aggregator.UpdateChecksReq.prototype.addId = function(value, opt_index) {
      return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
    };
    proto.aggregator.UpdateChecksReq.prototype.clearIdList = function() {
      return this.setIdList([]);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.UpdateChecksResp.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.UpdateChecksResp.toObject(
          opt_includeInstance,
          this
        );
      };
      proto.aggregator.UpdateChecksResp.toObject = function(includeInstance, msg) {
        var f, obj = {
          updatedAt: (f = msg.getUpdatedAt()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.UpdateChecksResp.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.UpdateChecksResp();
      return proto.aggregator.UpdateChecksResp.deserializeBinaryFromReader(
        msg,
        reader
      );
    };
    proto.aggregator.UpdateChecksResp.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = new google_protobuf_timestamp_pb.Timestamp();
            reader.readMessage(
              value,
              google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader
            );
            msg.setUpdatedAt(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.UpdateChecksResp.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.UpdateChecksResp.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.UpdateChecksResp.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getUpdatedAt();
      if (f != null) {
        writer.writeMessage(
          1,
          f,
          google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
        );
      }
    };
    proto.aggregator.UpdateChecksResp.prototype.getUpdatedAt = function() {
      return (
        /** @type{?proto.google.protobuf.Timestamp} */
        jspb.Message.getWrapperField(
          this,
          google_protobuf_timestamp_pb.Timestamp,
          1
        )
      );
    };
    proto.aggregator.UpdateChecksResp.prototype.setUpdatedAt = function(value) {
      return jspb.Message.setWrapperField(this, 1, value);
    };
    proto.aggregator.UpdateChecksResp.prototype.clearUpdatedAt = function() {
      return this.setUpdatedAt(void 0);
    };
    proto.aggregator.UpdateChecksResp.prototype.hasUpdatedAt = function() {
      return jspb.Message.getField(this, 1) != null;
    };
    proto.aggregator.TriggerType = {
      TIMETRIGGER: 0,
      CONTRACTQUERYTRIGGER: 1,
      EXPRESSIONTRIGGER: 2
    };
    proto.aggregator.TaskType = {
      ETHTRANSFERTASK: 0,
      CONTRACTEXECUTIONTASK: 1,
      GRAPHQLDATAQUERYTASK: 2,
      HTTPAPICALLTASK: 3,
      CUSTOMCODETASK: 4,
      BRANCHACTIONTASK: 5
    };
    proto.aggregator.TaskStatus = {
      ACTIVE: 0,
      COMPLETED: 1,
      FAILED: 2,
      CANCELED: 3,
      EXECUTING: 4
    };
    proto.aggregator.CustomCodeType = {
      JAVASCRIPT: 0
    };
    goog.object.extend(exports, proto.aggregator);
    ({
      Task,
      CreateTaskReq,
      CreateTaskResp,
      GetKeyReq,
      KeyResp,
      UpdateChecksReq,
      UpdateChecksResp,
      AddressResp,
      AddressRequest,
      ListTasksReq,
      ListTasksResp,
      TaskTrigger,
      TriggerType,
      ExpressionCondition,
      TaskAction,
      ActionType,
      ContractExecution,
      TaskType,
      UUID
    } = proto.aggregator);
  }
});

// src/index.ts
import _ from "lodash";
import { ethers } from "ethers";
import * as grpc2 from "@grpc/grpc-js";
import { Metadata } from "@grpc/grpc-js";

// src/auth.ts
var getKeyRequestMessage = (address, expiredAt) => {
  return `key request for ${address} expired at ${expiredAt}`;
};

// grpc_codegen/avs_grpc_pb.js
var grpc = __require("@grpc/grpc-js");
var avs_pb = (init_avs_pb(), __toCommonJS(avs_pb_exports));
var google_protobuf_timestamp_pb2 = __require("google-protobuf/google/protobuf/timestamp_pb.js");
var google_protobuf_wrappers_pb2 = __require("google-protobuf/google/protobuf/wrappers_pb.js");
function serialize_aggregator_AddressRequest(arg) {
  if (!(arg instanceof avs_pb.AddressRequest)) {
    throw new Error("Expected argument of type aggregator.AddressRequest");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_aggregator_AddressRequest(buffer_arg) {
  return avs_pb.AddressRequest.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_aggregator_AddressResp(arg) {
  if (!(arg instanceof avs_pb.AddressResp)) {
    throw new Error("Expected argument of type aggregator.AddressResp");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_aggregator_AddressResp(buffer_arg) {
  return avs_pb.AddressResp.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_aggregator_Checkin(arg) {
  if (!(arg instanceof avs_pb.Checkin)) {
    throw new Error("Expected argument of type aggregator.Checkin");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_aggregator_Checkin(buffer_arg) {
  return avs_pb.Checkin.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_aggregator_CheckinResp(arg) {
  if (!(arg instanceof avs_pb.CheckinResp)) {
    throw new Error("Expected argument of type aggregator.CheckinResp");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_aggregator_CheckinResp(buffer_arg) {
  return avs_pb.CheckinResp.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_aggregator_CreateTaskReq(arg) {
  if (!(arg instanceof avs_pb.CreateTaskReq)) {
    throw new Error("Expected argument of type aggregator.CreateTaskReq");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_aggregator_CreateTaskReq(buffer_arg) {
  return avs_pb.CreateTaskReq.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_aggregator_CreateTaskResp(arg) {
  if (!(arg instanceof avs_pb.CreateTaskResp)) {
    throw new Error("Expected argument of type aggregator.CreateTaskResp");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_aggregator_CreateTaskResp(buffer_arg) {
  return avs_pb.CreateTaskResp.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_aggregator_GetKeyReq(arg) {
  if (!(arg instanceof avs_pb.GetKeyReq)) {
    throw new Error("Expected argument of type aggregator.GetKeyReq");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_aggregator_GetKeyReq(buffer_arg) {
  return avs_pb.GetKeyReq.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_aggregator_KeyResp(arg) {
  if (!(arg instanceof avs_pb.KeyResp)) {
    throw new Error("Expected argument of type aggregator.KeyResp");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_aggregator_KeyResp(buffer_arg) {
  return avs_pb.KeyResp.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_aggregator_ListTasksReq(arg) {
  if (!(arg instanceof avs_pb.ListTasksReq)) {
    throw new Error("Expected argument of type aggregator.ListTasksReq");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_aggregator_ListTasksReq(buffer_arg) {
  return avs_pb.ListTasksReq.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_aggregator_ListTasksResp(arg) {
  if (!(arg instanceof avs_pb.ListTasksResp)) {
    throw new Error("Expected argument of type aggregator.ListTasksResp");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_aggregator_ListTasksResp(buffer_arg) {
  return avs_pb.ListTasksResp.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_aggregator_NonceRequest(arg) {
  if (!(arg instanceof avs_pb.NonceRequest)) {
    throw new Error("Expected argument of type aggregator.NonceRequest");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_aggregator_NonceRequest(buffer_arg) {
  return avs_pb.NonceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_aggregator_NonceResp(arg) {
  if (!(arg instanceof avs_pb.NonceResp)) {
    throw new Error("Expected argument of type aggregator.NonceResp");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_aggregator_NonceResp(buffer_arg) {
  return avs_pb.NonceResp.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_aggregator_SyncTasksReq(arg) {
  if (!(arg instanceof avs_pb.SyncTasksReq)) {
    throw new Error("Expected argument of type aggregator.SyncTasksReq");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_aggregator_SyncTasksReq(buffer_arg) {
  return avs_pb.SyncTasksReq.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_aggregator_SyncTasksResp(arg) {
  if (!(arg instanceof avs_pb.SyncTasksResp)) {
    throw new Error("Expected argument of type aggregator.SyncTasksResp");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_aggregator_SyncTasksResp(buffer_arg) {
  return avs_pb.SyncTasksResp.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_aggregator_Task(arg) {
  if (!(arg instanceof avs_pb.Task)) {
    throw new Error("Expected argument of type aggregator.Task");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_aggregator_Task(buffer_arg) {
  return avs_pb.Task.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_aggregator_UUID(arg) {
  if (!(arg instanceof avs_pb.UUID)) {
    throw new Error("Expected argument of type aggregator.UUID");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_aggregator_UUID(buffer_arg) {
  return avs_pb.UUID.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_aggregator_UpdateChecksReq(arg) {
  if (!(arg instanceof avs_pb.UpdateChecksReq)) {
    throw new Error("Expected argument of type aggregator.UpdateChecksReq");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_aggregator_UpdateChecksReq(buffer_arg) {
  return avs_pb.UpdateChecksReq.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_aggregator_UpdateChecksResp(arg) {
  if (!(arg instanceof avs_pb.UpdateChecksResp)) {
    throw new Error("Expected argument of type aggregator.UpdateChecksResp");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_aggregator_UpdateChecksResp(buffer_arg) {
  return avs_pb.UpdateChecksResp.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_google_protobuf_BoolValue(arg) {
  if (!(arg instanceof google_protobuf_wrappers_pb2.BoolValue)) {
    throw new Error("Expected argument of type google.protobuf.BoolValue");
  }
  return Buffer.from(arg.serializeBinary());
}
function deserialize_google_protobuf_BoolValue(buffer_arg) {
  return google_protobuf_wrappers_pb2.BoolValue.deserializeBinary(new Uint8Array(buffer_arg));
}
var AggregatorService = {
  // Auth
  getKey: {
    path: "/aggregator.Aggregator/GetKey",
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.GetKeyReq,
    responseType: avs_pb.KeyResp,
    requestSerialize: serialize_aggregator_GetKeyReq,
    requestDeserialize: deserialize_aggregator_GetKeyReq,
    responseSerialize: serialize_aggregator_KeyResp,
    responseDeserialize: deserialize_aggregator_KeyResp
  },
  // Smart Acccount
  getNonce: {
    path: "/aggregator.Aggregator/GetNonce",
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.NonceRequest,
    responseType: avs_pb.NonceResp,
    requestSerialize: serialize_aggregator_NonceRequest,
    requestDeserialize: deserialize_aggregator_NonceRequest,
    responseSerialize: serialize_aggregator_NonceResp,
    responseDeserialize: deserialize_aggregator_NonceResp
  },
  getSmartAccountAddress: {
    path: "/aggregator.Aggregator/GetSmartAccountAddress",
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.AddressRequest,
    responseType: avs_pb.AddressResp,
    requestSerialize: serialize_aggregator_AddressRequest,
    requestDeserialize: deserialize_aggregator_AddressRequest,
    responseSerialize: serialize_aggregator_AddressResp,
    responseDeserialize: deserialize_aggregator_AddressResp
  },
  // Task Management
  createTask: {
    path: "/aggregator.Aggregator/CreateTask",
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.CreateTaskReq,
    responseType: avs_pb.CreateTaskResp,
    requestSerialize: serialize_aggregator_CreateTaskReq,
    requestDeserialize: deserialize_aggregator_CreateTaskReq,
    responseSerialize: serialize_aggregator_CreateTaskResp,
    responseDeserialize: deserialize_aggregator_CreateTaskResp
  },
  listTasks: {
    path: "/aggregator.Aggregator/ListTasks",
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.ListTasksReq,
    responseType: avs_pb.ListTasksResp,
    requestSerialize: serialize_aggregator_ListTasksReq,
    requestDeserialize: deserialize_aggregator_ListTasksReq,
    responseSerialize: serialize_aggregator_ListTasksResp,
    responseDeserialize: deserialize_aggregator_ListTasksResp
  },
  getTask: {
    path: "/aggregator.Aggregator/GetTask",
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.UUID,
    responseType: avs_pb.Task,
    requestSerialize: serialize_aggregator_UUID,
    requestDeserialize: deserialize_aggregator_UUID,
    responseSerialize: serialize_aggregator_Task,
    responseDeserialize: deserialize_aggregator_Task
  },
  cancelTask: {
    path: "/aggregator.Aggregator/CancelTask",
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.UUID,
    responseType: google_protobuf_wrappers_pb2.BoolValue,
    requestSerialize: serialize_aggregator_UUID,
    requestDeserialize: deserialize_aggregator_UUID,
    responseSerialize: serialize_google_protobuf_BoolValue,
    responseDeserialize: deserialize_google_protobuf_BoolValue
  },
  deleteTask: {
    path: "/aggregator.Aggregator/DeleteTask",
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.UUID,
    responseType: google_protobuf_wrappers_pb2.BoolValue,
    requestSerialize: serialize_aggregator_UUID,
    requestDeserialize: deserialize_aggregator_UUID,
    responseSerialize: serialize_google_protobuf_BoolValue,
    responseDeserialize: deserialize_google_protobuf_BoolValue
  },
  // Operator endpoint
  ping: {
    path: "/aggregator.Aggregator/Ping",
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.Checkin,
    responseType: avs_pb.CheckinResp,
    requestSerialize: serialize_aggregator_Checkin,
    requestDeserialize: deserialize_aggregator_Checkin,
    responseSerialize: serialize_aggregator_CheckinResp,
    responseDeserialize: deserialize_aggregator_CheckinResp
  },
  syncTasks: {
    path: "/aggregator.Aggregator/SyncTasks",
    requestStream: false,
    responseStream: true,
    requestType: avs_pb.SyncTasksReq,
    responseType: avs_pb.SyncTasksResp,
    requestSerialize: serialize_aggregator_SyncTasksReq,
    requestDeserialize: deserialize_aggregator_SyncTasksReq,
    responseSerialize: serialize_aggregator_SyncTasksResp,
    responseDeserialize: deserialize_aggregator_SyncTasksResp
  },
  updateChecks: {
    path: "/aggregator.Aggregator/UpdateChecks",
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.UpdateChecksReq,
    responseType: avs_pb.UpdateChecksResp,
    requestSerialize: serialize_aggregator_UpdateChecksReq,
    requestDeserialize: deserialize_aggregator_UpdateChecksReq,
    responseSerialize: serialize_aggregator_UpdateChecksResp,
    responseDeserialize: deserialize_aggregator_UpdateChecksResp
  }
};
var AggregatorClient = grpc.makeGenericClientConstructor(AggregatorService);

// src/index.ts
init_avs_pb();

// src/task.ts
var Task2 = class {
  //   result?: any;
  //   error?: string;
  constructor(task) {
    this.id = task.getId();
    this.status = task.getStatus().toString();
  }
};
var task_default = Task2;

// src/types.ts
var AUTH_KEY_HEADER = "authKey";

// src/index.ts
var BaseClient = class {
  constructor(opts) {
    this.endpoint = opts.endpoint;
    this.rpcClient = new AggregatorClient(
      this.endpoint,
      grpc2.credentials.createInsecure()
    );
    this.metadata = new Metadata();
  }
  isAuthKeyValid(key) {
    try {
      const [, payload] = key.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      const currentTimestamp = Math.floor(Date.now() / 1e3);
      return decodedPayload.exp > currentTimestamp;
    } catch (error) {
      console.error("Error validating auth key:", error);
      return false;
    }
  }
  async authWithAPIKey(apiKey, expiredAtEpoch) {
    const request = new GetKeyReq();
    request.setOwner("");
    request.setExpiredAt(expiredAtEpoch);
    request.setSignature(apiKey);
    const result = await this._callRPC("getKey", request);
    return { authKey: result.getKey() };
  }
  // This flow can be used where the signature is generate from outside, such as in front-end and pass in
  async authWithSignature(address, signature, expiredAtEpoch) {
    const request = new GetKeyReq();
    request.setOwner(address);
    request.setExpiredAt(expiredAtEpoch);
    request.setSignature(signature);
    let result = await this._callRPC(
      "getKey",
      request
    );
    return { authKey: result.getKey() };
  }
  _callRPC(method, request, options) {
    const metadata = _.cloneDeep(this.metadata);
    if (options?.authKey) {
      metadata.set(AUTH_KEY_HEADER, options.authKey);
    }
    return new Promise((resolve, reject) => {
      this.rpcClient[method].bind(this.rpcClient)(
        request,
        metadata,
        (error, response) => {
          if (error) reject(error);
          else resolve(response);
        }
      );
    });
  }
};
var Client = class extends BaseClient {
  constructor(config) {
    super(config);
  }
  async getAddresses(address, { authKey }) {
    const request = new AddressRequest();
    request.setOwner(address);
    const result = await this._callRPC("getSmartAccountAddress", request, { authKey });
    return {
      owner: address,
      smart_account_address: result.getSmartAccountAddress()
    };
  }
  async createTask({
    address,
    oracleContract,
    tokenContract
  }) {
    const trigger = new TaskTrigger();
    trigger.setTriggerType(TriggerType.EXPRESSIONTRIGGER);
    trigger.setExpression(
      new ExpressionCondition().setExpression(`
      bigCmp(
        priceChainlink("${oracleContract}"), 
        toBigInt("10000")
      ) > 0`)
    );
    const action = new TaskAction();
    action.setTaskType(TaskType.CONTRACTEXECUTIONTASK);
    action.setId("transfer_erc20_1");
    action.setName("Transfer Test Token");
    const execution = new ContractExecution();
    execution.setContractAddress(tokenContract);
    let ABI = ["function transfer(address to, uint amount)"];
    let iface = new ethers.Interface(ABI);
    const callData = iface.encodeFunctionData("transfer", [
      address,
      ethers.parseUnits("12", 18)
    ]);
    execution.setCallData(callData);
    action.setContractExecution(execution);
    const request = new CreateTaskReq().setTrigger(trigger).setActionsList([action]).setExpiredAt(Math.floor(Date.now() / 1e3) + 1e6);
    const result = await this._callRPC("createTask", request);
    return {
      id: result.getId()
    };
  }
  async listTasks(address) {
    const request = new ListTasksReq();
    const result = await this._callRPC("listTasks", request);
    const tasks = _.map(
      result.getTasksList(),
      (obj) => new task_default(obj)
    );
    return {
      tasks
    };
  }
  // TODO: specify the return type to match client’s requirements
  // Right now we simply return the original object from the server
  async getTask(id) {
    const request = new UUID();
    request.setBytes(id);
    const result = await this._callRPC(
      "getTask",
      request
    );
    return result.toObject();
  }
  async cancelTask(id) {
    const request = new UUID();
    request.setBytes(id);
    const result = await this._callRPC(
      "cancelTask",
      request
    );
    return result.getValue();
  }
  async deleteTask(id) {
    const request = new UUID();
    request.setBytes(id);
    const result = await this._callRPC(
      "deleteTask",
      request
    );
    return result.getValue();
  }
};
export {
  AUTH_KEY_HEADER,
  Client as default,
  getKeyRequestMessage
};
