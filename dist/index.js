"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// grpc_codegen/avs_pb.js
var require_avs_pb = __commonJS({
  "grpc_codegen/avs_pb.js"(exports2) {
    "use strict";
    var jspb = require("google-protobuf");
    var goog = jspb;
    var global = function() {
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
    var google_protobuf_timestamp_pb = require("google-protobuf/google/protobuf/timestamp_pb.js");
    goog.object.extend(proto, google_protobuf_timestamp_pb);
    var google_protobuf_wrappers_pb = require("google-protobuf/google/protobuf/wrappers_pb.js");
    goog.object.extend(proto, google_protobuf_wrappers_pb);
    goog.exportSymbol("proto.aggregator.AddressRequest", null, global);
    goog.exportSymbol("proto.aggregator.AddressResp", null, global);
    goog.exportSymbol("proto.aggregator.BlockCondition", null, global);
    goog.exportSymbol("proto.aggregator.BranchNode", null, global);
    goog.exportSymbol("proto.aggregator.Checkin", null, global);
    goog.exportSymbol("proto.aggregator.Checkin.Status", null, global);
    goog.exportSymbol("proto.aggregator.CheckinResp", null, global);
    goog.exportSymbol("proto.aggregator.ConditionJump", null, global);
    goog.exportSymbol("proto.aggregator.ContractQueryNode", null, global);
    goog.exportSymbol("proto.aggregator.ContractWriteNode", null, global);
    goog.exportSymbol("proto.aggregator.CreateTaskReq", null, global);
    goog.exportSymbol("proto.aggregator.CreateTaskResp", null, global);
    goog.exportSymbol("proto.aggregator.CreateWalletReq", null, global);
    goog.exportSymbol("proto.aggregator.CreateWalletResp", null, global);
    goog.exportSymbol("proto.aggregator.CronCondition", null, global);
    goog.exportSymbol("proto.aggregator.CustomCodeNode", null, global);
    goog.exportSymbol("proto.aggregator.CustomCodeType", null, global);
    goog.exportSymbol("proto.aggregator.ETHTransferNode", null, global);
    goog.exportSymbol("proto.aggregator.Error", null, global);
    goog.exportSymbol("proto.aggregator.EventCondition", null, global);
    goog.exportSymbol("proto.aggregator.Execution", null, global);
    goog.exportSymbol("proto.aggregator.FilterNode", null, global);
    goog.exportSymbol("proto.aggregator.FixedEpochCondition", null, global);
    goog.exportSymbol("proto.aggregator.GetKeyReq", null, global);
    goog.exportSymbol("proto.aggregator.GraphQLQueryNode", null, global);
    goog.exportSymbol("proto.aggregator.KeyResp", null, global);
    goog.exportSymbol("proto.aggregator.ListTasksReq", null, global);
    goog.exportSymbol("proto.aggregator.ListTasksResp", null, global);
    goog.exportSymbol("proto.aggregator.NonceRequest", null, global);
    goog.exportSymbol("proto.aggregator.NonceResp", null, global);
    goog.exportSymbol("proto.aggregator.RestAPINode", null, global);
    goog.exportSymbol("proto.aggregator.SmartWallet", null, global);
    goog.exportSymbol("proto.aggregator.SyncTasksReq", null, global);
    goog.exportSymbol("proto.aggregator.SyncTasksResp", null, global);
    goog.exportSymbol("proto.aggregator.Task", null, global);
    goog.exportSymbol("proto.aggregator.TaskEdge", null, global);
    goog.exportSymbol("proto.aggregator.TaskNode", null, global);
    goog.exportSymbol("proto.aggregator.TaskNode.TaskBodyCase", null, global);
    goog.exportSymbol("proto.aggregator.TaskStatus", null, global);
    goog.exportSymbol("proto.aggregator.TaskTrigger", null, global);
    goog.exportSymbol("proto.aggregator.TaskTrigger.TriggerConditionCase", null, global);
    goog.exportSymbol("proto.aggregator.TaskType", null, global);
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
    proto.aggregator.FixedEpochCondition = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.FixedEpochCondition.repeatedFields_, null);
    };
    goog.inherits(proto.aggregator.FixedEpochCondition, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.FixedEpochCondition.displayName = "proto.aggregator.FixedEpochCondition";
    }
    proto.aggregator.CronCondition = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.CronCondition.repeatedFields_, null);
    };
    goog.inherits(proto.aggregator.CronCondition, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.CronCondition.displayName = "proto.aggregator.CronCondition";
    }
    proto.aggregator.BlockCondition = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.BlockCondition, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.BlockCondition.displayName = "proto.aggregator.BlockCondition";
    }
    proto.aggregator.EventCondition = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.EventCondition, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.EventCondition.displayName = "proto.aggregator.EventCondition";
    }
    proto.aggregator.TaskTrigger = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, proto.aggregator.TaskTrigger.oneofGroups_);
    };
    goog.inherits(proto.aggregator.TaskTrigger, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.TaskTrigger.displayName = "proto.aggregator.TaskTrigger";
    }
    proto.aggregator.SyncTasksResp = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.SyncTasksResp, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.SyncTasksResp.displayName = "proto.aggregator.SyncTasksResp";
    }
    proto.aggregator.ETHTransferNode = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.ETHTransferNode, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ETHTransferNode.displayName = "proto.aggregator.ETHTransferNode";
    }
    proto.aggregator.ContractWriteNode = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.ContractWriteNode, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ContractWriteNode.displayName = "proto.aggregator.ContractWriteNode";
    }
    proto.aggregator.ContractQueryNode = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.ContractQueryNode, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ContractQueryNode.displayName = "proto.aggregator.ContractQueryNode";
    }
    proto.aggregator.GraphQLQueryNode = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.GraphQLQueryNode, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.GraphQLQueryNode.displayName = "proto.aggregator.GraphQLQueryNode";
    }
    proto.aggregator.RestAPINode = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.RestAPINode, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.RestAPINode.displayName = "proto.aggregator.RestAPINode";
    }
    proto.aggregator.CustomCodeNode = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.CustomCodeNode, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.CustomCodeNode.displayName = "proto.aggregator.CustomCodeNode";
    }
    proto.aggregator.ConditionJump = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.ConditionJump, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ConditionJump.displayName = "proto.aggregator.ConditionJump";
    }
    proto.aggregator.BranchNode = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.BranchNode.repeatedFields_, null);
    };
    goog.inherits(proto.aggregator.BranchNode, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.BranchNode.displayName = "proto.aggregator.BranchNode";
    }
    proto.aggregator.FilterNode = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.FilterNode, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.FilterNode.displayName = "proto.aggregator.FilterNode";
    }
    proto.aggregator.TaskEdge = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.TaskEdge, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.TaskEdge.displayName = "proto.aggregator.TaskEdge";
    }
    proto.aggregator.TaskNode = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, proto.aggregator.TaskNode.oneofGroups_);
    };
    goog.inherits(proto.aggregator.TaskNode, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.TaskNode.displayName = "proto.aggregator.TaskNode";
    }
    proto.aggregator.Execution = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.Execution, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.Execution.displayName = "proto.aggregator.Execution";
    }
    proto.aggregator.Task = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.Task.repeatedFields_, null);
    };
    goog.inherits(proto.aggregator.Task, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.Task.displayName = "proto.aggregator.Task";
    }
    proto.aggregator.CreateTaskReq = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.CreateTaskReq.repeatedFields_, null);
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
    proto.aggregator.SmartWallet = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.SmartWallet, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.SmartWallet.displayName = "proto.aggregator.SmartWallet";
    }
    proto.aggregator.AddressResp = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.AddressResp.repeatedFields_, null);
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
      jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.ListTasksResp.repeatedFields_, null);
    };
    goog.inherits(proto.aggregator.ListTasksResp, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ListTasksResp.displayName = "proto.aggregator.ListTasksResp";
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
      jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.UpdateChecksReq.repeatedFields_, null);
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
    proto.aggregator.CreateWalletReq = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.CreateWalletReq, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.CreateWalletReq.displayName = "proto.aggregator.CreateWalletReq";
    }
    proto.aggregator.CreateWalletResp = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.CreateWalletResp, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.CreateWalletResp.displayName = "proto.aggregator.CreateWalletResp";
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
        writer.writeString(
          1,
          f
        );
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
            reader.readMessage(value, proto.aggregator.Checkin.Status.deserializeBinaryFromReader);
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
        writer.writeString(
          1,
          f
        );
      }
      f = message.getAddress();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
      f = message.getSignature();
      if (f.length > 0) {
        writer.writeString(
          3,
          f
        );
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
        writer.writeString(
          5,
          f
        );
      }
      f = message.getMetricsport();
      if (f !== 0) {
        writer.writeInt32(
          6,
          f
        );
      }
      f = message.getRemoteip();
      if (f.length > 0) {
        writer.writeString(
          7,
          f
        );
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
      return proto.aggregator.Checkin.Status.deserializeBinaryFromReader(msg, reader);
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
            reader.readMessage(value, google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
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
        writer.writeInt64(
          1,
          f
        );
      }
      f = message.getQueuedepth();
      if (f !== 0) {
        writer.writeInt64(
          2,
          f
        );
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
        jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 3)
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
            reader.readMessage(value, google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
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
        jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 1)
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
        writer.writeString(
          1,
          f
        );
      }
      f = message.getAddress();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
      f = message.getSignature();
      if (f.length > 0) {
        writer.writeString(
          3,
          f
        );
      }
      f = message.getMonotonicClock();
      if (f !== 0) {
        writer.writeInt64(
          4,
          f
        );
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
    proto.aggregator.FixedEpochCondition.repeatedFields_ = [1];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.FixedEpochCondition.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.FixedEpochCondition.toObject(opt_includeInstance, this);
      };
      proto.aggregator.FixedEpochCondition.toObject = function(includeInstance, msg) {
        var f, obj = {
          epochesList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? void 0 : f
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.FixedEpochCondition.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.FixedEpochCondition();
      return proto.aggregator.FixedEpochCondition.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.FixedEpochCondition.deserializeBinaryFromReader = function(msg, reader) {
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
              msg.addEpoches(values[i]);
            }
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.FixedEpochCondition.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.FixedEpochCondition.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.FixedEpochCondition.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getEpochesList();
      if (f.length > 0) {
        writer.writePackedInt64(
          1,
          f
        );
      }
    };
    proto.aggregator.FixedEpochCondition.prototype.getEpochesList = function() {
      return (
        /** @type {!Array<number>} */
        jspb.Message.getRepeatedField(this, 1)
      );
    };
    proto.aggregator.FixedEpochCondition.prototype.setEpochesList = function(value) {
      return jspb.Message.setField(this, 1, value || []);
    };
    proto.aggregator.FixedEpochCondition.prototype.addEpoches = function(value, opt_index) {
      return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
    };
    proto.aggregator.FixedEpochCondition.prototype.clearEpochesList = function() {
      return this.setEpochesList([]);
    };
    proto.aggregator.CronCondition.repeatedFields_ = [1];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.CronCondition.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.CronCondition.toObject(opt_includeInstance, this);
      };
      proto.aggregator.CronCondition.toObject = function(includeInstance, msg) {
        var f, obj = {
          cronTableList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? void 0 : f
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.CronCondition.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.CronCondition();
      return proto.aggregator.CronCondition.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.CronCondition.deserializeBinaryFromReader = function(msg, reader) {
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
            msg.addCronTable(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.CronCondition.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.CronCondition.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.CronCondition.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getCronTableList();
      if (f.length > 0) {
        writer.writeRepeatedString(
          1,
          f
        );
      }
    };
    proto.aggregator.CronCondition.prototype.getCronTableList = function() {
      return (
        /** @type {!Array<string>} */
        jspb.Message.getRepeatedField(this, 1)
      );
    };
    proto.aggregator.CronCondition.prototype.setCronTableList = function(value) {
      return jspb.Message.setField(this, 1, value || []);
    };
    proto.aggregator.CronCondition.prototype.addCronTable = function(value, opt_index) {
      return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
    };
    proto.aggregator.CronCondition.prototype.clearCronTableList = function() {
      return this.setCronTableList([]);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.BlockCondition.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.BlockCondition.toObject(opt_includeInstance, this);
      };
      proto.aggregator.BlockCondition.toObject = function(includeInstance, msg) {
        var f, obj = {
          interval: jspb.Message.getFieldWithDefault(msg, 1, 0)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.BlockCondition.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.BlockCondition();
      return proto.aggregator.BlockCondition.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.BlockCondition.deserializeBinaryFromReader = function(msg, reader) {
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
            msg.setInterval(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.BlockCondition.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.BlockCondition.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.BlockCondition.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getInterval();
      if (f !== 0) {
        writer.writeInt64(
          1,
          f
        );
      }
    };
    proto.aggregator.BlockCondition.prototype.getInterval = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 1, 0)
      );
    };
    proto.aggregator.BlockCondition.prototype.setInterval = function(value) {
      return jspb.Message.setProto3IntField(this, 1, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.EventCondition.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.EventCondition.toObject(opt_includeInstance, this);
      };
      proto.aggregator.EventCondition.toObject = function(includeInstance, msg) {
        var f, obj = {
          expression: jspb.Message.getFieldWithDefault(msg, 1, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.EventCondition.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.EventCondition();
      return proto.aggregator.EventCondition.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.EventCondition.deserializeBinaryFromReader = function(msg, reader) {
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
    proto.aggregator.EventCondition.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.EventCondition.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.EventCondition.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getExpression();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
    };
    proto.aggregator.EventCondition.prototype.getExpression = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.EventCondition.prototype.setExpression = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.TaskTrigger.oneofGroups_ = [[2, 3, 4, 5, 6]];
    proto.aggregator.TaskTrigger.TriggerConditionCase = {
      TRIGGER_CONDITION_NOT_SET: 0,
      MANUAL: 2,
      AT: 3,
      CRON: 4,
      BLOCK: 5,
      EVENT: 6
    };
    proto.aggregator.TaskTrigger.prototype.getTriggerConditionCase = function() {
      return (
        /** @type {proto.aggregator.TaskTrigger.TriggerConditionCase} */
        jspb.Message.computeOneofCase(this, proto.aggregator.TaskTrigger.oneofGroups_[0])
      );
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.TaskTrigger.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.TaskTrigger.toObject(opt_includeInstance, this);
      };
      proto.aggregator.TaskTrigger.toObject = function(includeInstance, msg) {
        var f, obj = {
          triggerType: jspb.Message.getFieldWithDefault(msg, 1, 0),
          manual: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
          at: (f = msg.getAt()) && proto.aggregator.FixedEpochCondition.toObject(includeInstance, f),
          cron: (f = msg.getCron()) && proto.aggregator.CronCondition.toObject(includeInstance, f),
          block: (f = msg.getBlock()) && proto.aggregator.BlockCondition.toObject(includeInstance, f),
          event: (f = msg.getEvent()) && proto.aggregator.EventCondition.toObject(includeInstance, f)
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
            var value = (
              /** @type {boolean} */
              reader.readBool()
            );
            msg.setManual(value);
            break;
          case 3:
            var value = new proto.aggregator.FixedEpochCondition();
            reader.readMessage(value, proto.aggregator.FixedEpochCondition.deserializeBinaryFromReader);
            msg.setAt(value);
            break;
          case 4:
            var value = new proto.aggregator.CronCondition();
            reader.readMessage(value, proto.aggregator.CronCondition.deserializeBinaryFromReader);
            msg.setCron(value);
            break;
          case 5:
            var value = new proto.aggregator.BlockCondition();
            reader.readMessage(value, proto.aggregator.BlockCondition.deserializeBinaryFromReader);
            msg.setBlock(value);
            break;
          case 6:
            var value = new proto.aggregator.EventCondition();
            reader.readMessage(value, proto.aggregator.EventCondition.deserializeBinaryFromReader);
            msg.setEvent(value);
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
        writer.writeEnum(
          1,
          f
        );
      }
      f = /** @type {boolean} */
      jspb.Message.getField(message, 2);
      if (f != null) {
        writer.writeBool(
          2,
          f
        );
      }
      f = message.getAt();
      if (f != null) {
        writer.writeMessage(
          3,
          f,
          proto.aggregator.FixedEpochCondition.serializeBinaryToWriter
        );
      }
      f = message.getCron();
      if (f != null) {
        writer.writeMessage(
          4,
          f,
          proto.aggregator.CronCondition.serializeBinaryToWriter
        );
      }
      f = message.getBlock();
      if (f != null) {
        writer.writeMessage(
          5,
          f,
          proto.aggregator.BlockCondition.serializeBinaryToWriter
        );
      }
      f = message.getEvent();
      if (f != null) {
        writer.writeMessage(
          6,
          f,
          proto.aggregator.EventCondition.serializeBinaryToWriter
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
    proto.aggregator.TaskTrigger.prototype.getManual = function() {
      return (
        /** @type {boolean} */
        jspb.Message.getBooleanFieldWithDefault(this, 2, false)
      );
    };
    proto.aggregator.TaskTrigger.prototype.setManual = function(value) {
      return jspb.Message.setOneofField(this, 2, proto.aggregator.TaskTrigger.oneofGroups_[0], value);
    };
    proto.aggregator.TaskTrigger.prototype.clearManual = function() {
      return jspb.Message.setOneofField(this, 2, proto.aggregator.TaskTrigger.oneofGroups_[0], void 0);
    };
    proto.aggregator.TaskTrigger.prototype.hasManual = function() {
      return jspb.Message.getField(this, 2) != null;
    };
    proto.aggregator.TaskTrigger.prototype.getAt = function() {
      return (
        /** @type{?proto.aggregator.FixedEpochCondition} */
        jspb.Message.getWrapperField(this, proto.aggregator.FixedEpochCondition, 3)
      );
    };
    proto.aggregator.TaskTrigger.prototype.setAt = function(value) {
      return jspb.Message.setOneofWrapperField(this, 3, proto.aggregator.TaskTrigger.oneofGroups_[0], value);
    };
    proto.aggregator.TaskTrigger.prototype.clearAt = function() {
      return this.setAt(void 0);
    };
    proto.aggregator.TaskTrigger.prototype.hasAt = function() {
      return jspb.Message.getField(this, 3) != null;
    };
    proto.aggregator.TaskTrigger.prototype.getCron = function() {
      return (
        /** @type{?proto.aggregator.CronCondition} */
        jspb.Message.getWrapperField(this, proto.aggregator.CronCondition, 4)
      );
    };
    proto.aggregator.TaskTrigger.prototype.setCron = function(value) {
      return jspb.Message.setOneofWrapperField(this, 4, proto.aggregator.TaskTrigger.oneofGroups_[0], value);
    };
    proto.aggregator.TaskTrigger.prototype.clearCron = function() {
      return this.setCron(void 0);
    };
    proto.aggregator.TaskTrigger.prototype.hasCron = function() {
      return jspb.Message.getField(this, 4) != null;
    };
    proto.aggregator.TaskTrigger.prototype.getBlock = function() {
      return (
        /** @type{?proto.aggregator.BlockCondition} */
        jspb.Message.getWrapperField(this, proto.aggregator.BlockCondition, 5)
      );
    };
    proto.aggregator.TaskTrigger.prototype.setBlock = function(value) {
      return jspb.Message.setOneofWrapperField(this, 5, proto.aggregator.TaskTrigger.oneofGroups_[0], value);
    };
    proto.aggregator.TaskTrigger.prototype.clearBlock = function() {
      return this.setBlock(void 0);
    };
    proto.aggregator.TaskTrigger.prototype.hasBlock = function() {
      return jspb.Message.getField(this, 5) != null;
    };
    proto.aggregator.TaskTrigger.prototype.getEvent = function() {
      return (
        /** @type{?proto.aggregator.EventCondition} */
        jspb.Message.getWrapperField(this, proto.aggregator.EventCondition, 6)
      );
    };
    proto.aggregator.TaskTrigger.prototype.setEvent = function(value) {
      return jspb.Message.setOneofWrapperField(this, 6, proto.aggregator.TaskTrigger.oneofGroups_[0], value);
    };
    proto.aggregator.TaskTrigger.prototype.clearEvent = function() {
      return this.setEvent(void 0);
    };
    proto.aggregator.TaskTrigger.prototype.hasEvent = function() {
      return jspb.Message.getField(this, 6) != null;
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
      return proto.aggregator.SyncTasksResp.deserializeBinaryFromReader(msg, reader);
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
            reader.readMessage(value, proto.aggregator.TaskTrigger.deserializeBinaryFromReader);
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
        writer.writeString(
          1,
          f
        );
      }
      f = message.getChecktype();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
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
      proto.aggregator.ETHTransferNode.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ETHTransferNode.toObject(opt_includeInstance, this);
      };
      proto.aggregator.ETHTransferNode.toObject = function(includeInstance, msg) {
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
    proto.aggregator.ETHTransferNode.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.ETHTransferNode();
      return proto.aggregator.ETHTransferNode.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.ETHTransferNode.deserializeBinaryFromReader = function(msg, reader) {
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
    proto.aggregator.ETHTransferNode.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.ETHTransferNode.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.ETHTransferNode.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getDestination();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
      f = message.getAmount();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
    };
    proto.aggregator.ETHTransferNode.prototype.getDestination = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.ETHTransferNode.prototype.setDestination = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.ETHTransferNode.prototype.getAmount = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.ETHTransferNode.prototype.setAmount = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.ContractWriteNode.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ContractWriteNode.toObject(opt_includeInstance, this);
      };
      proto.aggregator.ContractWriteNode.toObject = function(includeInstance, msg) {
        var f, obj = {
          contractAddress: jspb.Message.getFieldWithDefault(msg, 1, ""),
          callData: jspb.Message.getFieldWithDefault(msg, 2, ""),
          contractAbi: jspb.Message.getFieldWithDefault(msg, 3, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.ContractWriteNode.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.ContractWriteNode();
      return proto.aggregator.ContractWriteNode.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.ContractWriteNode.deserializeBinaryFromReader = function(msg, reader) {
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
            msg.setContractAbi(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.ContractWriteNode.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.ContractWriteNode.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.ContractWriteNode.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getContractAddress();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
      f = message.getCallData();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
      f = message.getContractAbi();
      if (f.length > 0) {
        writer.writeString(
          3,
          f
        );
      }
    };
    proto.aggregator.ContractWriteNode.prototype.getContractAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.ContractWriteNode.prototype.setContractAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.ContractWriteNode.prototype.getCallData = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.ContractWriteNode.prototype.setCallData = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.ContractWriteNode.prototype.getContractAbi = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.ContractWriteNode.prototype.setContractAbi = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.ContractQueryNode.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ContractQueryNode.toObject(opt_includeInstance, this);
      };
      proto.aggregator.ContractQueryNode.toObject = function(includeInstance, msg) {
        var f, obj = {
          contractAddress: jspb.Message.getFieldWithDefault(msg, 1, ""),
          callData: jspb.Message.getFieldWithDefault(msg, 2, ""),
          contractAbi: jspb.Message.getFieldWithDefault(msg, 3, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.ContractQueryNode.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.ContractQueryNode();
      return proto.aggregator.ContractQueryNode.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.ContractQueryNode.deserializeBinaryFromReader = function(msg, reader) {
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
            msg.setContractAbi(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.ContractQueryNode.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.ContractQueryNode.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.ContractQueryNode.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getContractAddress();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
      f = message.getCallData();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
      f = message.getContractAbi();
      if (f.length > 0) {
        writer.writeString(
          3,
          f
        );
      }
    };
    proto.aggregator.ContractQueryNode.prototype.getContractAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.ContractQueryNode.prototype.setContractAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.ContractQueryNode.prototype.getCallData = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.ContractQueryNode.prototype.setCallData = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.ContractQueryNode.prototype.getContractAbi = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.ContractQueryNode.prototype.setContractAbi = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.GraphQLQueryNode.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.GraphQLQueryNode.toObject(opt_includeInstance, this);
      };
      proto.aggregator.GraphQLQueryNode.toObject = function(includeInstance, msg) {
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
    proto.aggregator.GraphQLQueryNode.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.GraphQLQueryNode();
      return proto.aggregator.GraphQLQueryNode.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.GraphQLQueryNode.deserializeBinaryFromReader = function(msg, reader) {
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
    proto.aggregator.GraphQLQueryNode.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.GraphQLQueryNode.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.GraphQLQueryNode.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getUrl();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
      f = message.getQuery();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
    };
    proto.aggregator.GraphQLQueryNode.prototype.getUrl = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.GraphQLQueryNode.prototype.setUrl = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.GraphQLQueryNode.prototype.getQuery = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.GraphQLQueryNode.prototype.setQuery = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.RestAPINode.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.RestAPINode.toObject(opt_includeInstance, this);
      };
      proto.aggregator.RestAPINode.toObject = function(includeInstance, msg) {
        var f, obj = {
          url: jspb.Message.getFieldWithDefault(msg, 1, ""),
          headersMap: (f = msg.getHeadersMap()) ? f.toObject(includeInstance, void 0) : [],
          body: jspb.Message.getFieldWithDefault(msg, 3, ""),
          method: jspb.Message.getFieldWithDefault(msg, 4, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.RestAPINode.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.RestAPINode();
      return proto.aggregator.RestAPINode.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.RestAPINode.deserializeBinaryFromReader = function(msg, reader) {
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
              jspb.Map.deserializeBinary(message, reader2, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
            });
            break;
          case 3:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setBody(value);
            break;
          case 4:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setMethod(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.RestAPINode.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.RestAPINode.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.RestAPINode.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getUrl();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
      f = message.getHeadersMap(true);
      if (f && f.getLength() > 0) {
        f.serializeBinary(2, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
      }
      f = message.getBody();
      if (f.length > 0) {
        writer.writeString(
          3,
          f
        );
      }
      f = message.getMethod();
      if (f.length > 0) {
        writer.writeString(
          4,
          f
        );
      }
    };
    proto.aggregator.RestAPINode.prototype.getUrl = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.RestAPINode.prototype.setUrl = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.RestAPINode.prototype.getHeadersMap = function(opt_noLazyCreate) {
      return (
        /** @type {!jspb.Map<string,string>} */
        jspb.Message.getMapField(
          this,
          2,
          opt_noLazyCreate,
          null
        )
      );
    };
    proto.aggregator.RestAPINode.prototype.clearHeadersMap = function() {
      this.getHeadersMap().clear();
      return this;
    };
    proto.aggregator.RestAPINode.prototype.getBody = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.RestAPINode.prototype.setBody = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    proto.aggregator.RestAPINode.prototype.getMethod = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 4, "")
      );
    };
    proto.aggregator.RestAPINode.prototype.setMethod = function(value) {
      return jspb.Message.setProto3StringField(this, 4, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.CustomCodeNode.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.CustomCodeNode.toObject(opt_includeInstance, this);
      };
      proto.aggregator.CustomCodeNode.toObject = function(includeInstance, msg) {
        var f, obj = {
          type: jspb.Message.getFieldWithDefault(msg, 1, 0),
          source: jspb.Message.getFieldWithDefault(msg, 2, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.CustomCodeNode.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.CustomCodeNode();
      return proto.aggregator.CustomCodeNode.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.CustomCodeNode.deserializeBinaryFromReader = function(msg, reader) {
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
            msg.setSource(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.CustomCodeNode.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.CustomCodeNode.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.CustomCodeNode.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getType();
      if (f !== 0) {
        writer.writeEnum(
          1,
          f
        );
      }
      f = message.getSource();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
    };
    proto.aggregator.CustomCodeNode.prototype.getType = function() {
      return (
        /** @type {!proto.aggregator.CustomCodeType} */
        jspb.Message.getFieldWithDefault(this, 1, 0)
      );
    };
    proto.aggregator.CustomCodeNode.prototype.setType = function(value) {
      return jspb.Message.setProto3EnumField(this, 1, value);
    };
    proto.aggregator.CustomCodeNode.prototype.getSource = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.CustomCodeNode.prototype.setSource = function(value) {
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
      return proto.aggregator.ConditionJump.deserializeBinaryFromReader(msg, reader);
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
        writer.writeString(
          1,
          f
        );
      }
      f = message.getNext();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
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
    proto.aggregator.BranchNode.repeatedFields_ = [2];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.BranchNode.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.BranchNode.toObject(opt_includeInstance, this);
      };
      proto.aggregator.BranchNode.toObject = function(includeInstance, msg) {
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
    proto.aggregator.BranchNode.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.BranchNode();
      return proto.aggregator.BranchNode.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.BranchNode.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = new proto.aggregator.ConditionJump();
            reader.readMessage(value, proto.aggregator.ConditionJump.deserializeBinaryFromReader);
            msg.setIf(value);
            break;
          case 2:
            var value = new proto.aggregator.ConditionJump();
            reader.readMessage(value, proto.aggregator.ConditionJump.deserializeBinaryFromReader);
            msg.addElseifs(value);
            break;
          case 3:
            var value = new proto.aggregator.ConditionJump();
            reader.readMessage(value, proto.aggregator.ConditionJump.deserializeBinaryFromReader);
            msg.setElse(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.BranchNode.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.BranchNode.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.BranchNode.serializeBinaryToWriter = function(message, writer) {
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
    proto.aggregator.BranchNode.prototype.getIf = function() {
      return (
        /** @type{?proto.aggregator.ConditionJump} */
        jspb.Message.getWrapperField(this, proto.aggregator.ConditionJump, 1)
      );
    };
    proto.aggregator.BranchNode.prototype.setIf = function(value) {
      return jspb.Message.setWrapperField(this, 1, value);
    };
    proto.aggregator.BranchNode.prototype.clearIf = function() {
      return this.setIf(void 0);
    };
    proto.aggregator.BranchNode.prototype.hasIf = function() {
      return jspb.Message.getField(this, 1) != null;
    };
    proto.aggregator.BranchNode.prototype.getElseifsList = function() {
      return (
        /** @type{!Array<!proto.aggregator.ConditionJump>} */
        jspb.Message.getRepeatedWrapperField(this, proto.aggregator.ConditionJump, 2)
      );
    };
    proto.aggregator.BranchNode.prototype.setElseifsList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 2, value);
    };
    proto.aggregator.BranchNode.prototype.addElseifs = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.aggregator.ConditionJump, opt_index);
    };
    proto.aggregator.BranchNode.prototype.clearElseifsList = function() {
      return this.setElseifsList([]);
    };
    proto.aggregator.BranchNode.prototype.getElse = function() {
      return (
        /** @type{?proto.aggregator.ConditionJump} */
        jspb.Message.getWrapperField(this, proto.aggregator.ConditionJump, 3)
      );
    };
    proto.aggregator.BranchNode.prototype.setElse = function(value) {
      return jspb.Message.setWrapperField(this, 3, value);
    };
    proto.aggregator.BranchNode.prototype.clearElse = function() {
      return this.setElse(void 0);
    };
    proto.aggregator.BranchNode.prototype.hasElse = function() {
      return jspb.Message.getField(this, 3) != null;
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.FilterNode.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.FilterNode.toObject(opt_includeInstance, this);
      };
      proto.aggregator.FilterNode.toObject = function(includeInstance, msg) {
        var f, obj = {
          expression: jspb.Message.getFieldWithDefault(msg, 1, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.FilterNode.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.FilterNode();
      return proto.aggregator.FilterNode.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.FilterNode.deserializeBinaryFromReader = function(msg, reader) {
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
    proto.aggregator.FilterNode.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.FilterNode.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.FilterNode.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getExpression();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
    };
    proto.aggregator.FilterNode.prototype.getExpression = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.FilterNode.prototype.setExpression = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.TaskEdge.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.TaskEdge.toObject(opt_includeInstance, this);
      };
      proto.aggregator.TaskEdge.toObject = function(includeInstance, msg) {
        var f, obj = {
          id: jspb.Message.getFieldWithDefault(msg, 1, ""),
          source: jspb.Message.getFieldWithDefault(msg, 2, ""),
          target: jspb.Message.getFieldWithDefault(msg, 3, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.TaskEdge.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.TaskEdge();
      return proto.aggregator.TaskEdge.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.TaskEdge.deserializeBinaryFromReader = function(msg, reader) {
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
            msg.setSource(value);
            break;
          case 3:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setTarget(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.TaskEdge.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.TaskEdge.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.TaskEdge.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getId();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
      f = message.getSource();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
      f = message.getTarget();
      if (f.length > 0) {
        writer.writeString(
          3,
          f
        );
      }
    };
    proto.aggregator.TaskEdge.prototype.getId = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.TaskEdge.prototype.setId = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.TaskEdge.prototype.getSource = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.TaskEdge.prototype.setSource = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.TaskEdge.prototype.getTarget = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.TaskEdge.prototype.setTarget = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    proto.aggregator.TaskNode.oneofGroups_ = [[10, 11, 12, 13, 14, 15, 16, 17]];
    proto.aggregator.TaskNode.TaskBodyCase = {
      TASK_BODY_NOT_SET: 0,
      ETH_TRANSFER: 10,
      CONTRACT_WRITE: 11,
      CONTRACT_READ: 12,
      GRAPHQL_DATA_QUERY: 13,
      REST_API: 14,
      BRANCH: 15,
      FILTER: 16,
      CUSTOM_CODE: 17
    };
    proto.aggregator.TaskNode.prototype.getTaskBodyCase = function() {
      return (
        /** @type {proto.aggregator.TaskNode.TaskBodyCase} */
        jspb.Message.computeOneofCase(this, proto.aggregator.TaskNode.oneofGroups_[0])
      );
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.TaskNode.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.TaskNode.toObject(opt_includeInstance, this);
      };
      proto.aggregator.TaskNode.toObject = function(includeInstance, msg) {
        var f, obj = {
          nodeType: jspb.Message.getFieldWithDefault(msg, 1, 0),
          id: jspb.Message.getFieldWithDefault(msg, 2, ""),
          name: jspb.Message.getFieldWithDefault(msg, 3, ""),
          ethTransfer: (f = msg.getEthTransfer()) && proto.aggregator.ETHTransferNode.toObject(includeInstance, f),
          contractWrite: (f = msg.getContractWrite()) && proto.aggregator.ContractWriteNode.toObject(includeInstance, f),
          contractRead: (f = msg.getContractRead()) && proto.aggregator.ContractQueryNode.toObject(includeInstance, f),
          graphqlDataQuery: (f = msg.getGraphqlDataQuery()) && proto.aggregator.GraphQLQueryNode.toObject(includeInstance, f),
          restApi: (f = msg.getRestApi()) && proto.aggregator.RestAPINode.toObject(includeInstance, f),
          branch: (f = msg.getBranch()) && proto.aggregator.BranchNode.toObject(includeInstance, f),
          filter: (f = msg.getFilter()) && proto.aggregator.FilterNode.toObject(includeInstance, f),
          customCode: (f = msg.getCustomCode()) && proto.aggregator.CustomCodeNode.toObject(includeInstance, f)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.TaskNode.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.TaskNode();
      return proto.aggregator.TaskNode.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.TaskNode.deserializeBinaryFromReader = function(msg, reader) {
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
            msg.setNodeType(value);
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
          case 10:
            var value = new proto.aggregator.ETHTransferNode();
            reader.readMessage(value, proto.aggregator.ETHTransferNode.deserializeBinaryFromReader);
            msg.setEthTransfer(value);
            break;
          case 11:
            var value = new proto.aggregator.ContractWriteNode();
            reader.readMessage(value, proto.aggregator.ContractWriteNode.deserializeBinaryFromReader);
            msg.setContractWrite(value);
            break;
          case 12:
            var value = new proto.aggregator.ContractQueryNode();
            reader.readMessage(value, proto.aggregator.ContractQueryNode.deserializeBinaryFromReader);
            msg.setContractRead(value);
            break;
          case 13:
            var value = new proto.aggregator.GraphQLQueryNode();
            reader.readMessage(value, proto.aggregator.GraphQLQueryNode.deserializeBinaryFromReader);
            msg.setGraphqlDataQuery(value);
            break;
          case 14:
            var value = new proto.aggregator.RestAPINode();
            reader.readMessage(value, proto.aggregator.RestAPINode.deserializeBinaryFromReader);
            msg.setRestApi(value);
            break;
          case 15:
            var value = new proto.aggregator.BranchNode();
            reader.readMessage(value, proto.aggregator.BranchNode.deserializeBinaryFromReader);
            msg.setBranch(value);
            break;
          case 16:
            var value = new proto.aggregator.FilterNode();
            reader.readMessage(value, proto.aggregator.FilterNode.deserializeBinaryFromReader);
            msg.setFilter(value);
            break;
          case 17:
            var value = new proto.aggregator.CustomCodeNode();
            reader.readMessage(value, proto.aggregator.CustomCodeNode.deserializeBinaryFromReader);
            msg.setCustomCode(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.TaskNode.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.TaskNode.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.TaskNode.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getNodeType();
      if (f !== 0) {
        writer.writeEnum(
          1,
          f
        );
      }
      f = message.getId();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
      f = message.getName();
      if (f.length > 0) {
        writer.writeString(
          3,
          f
        );
      }
      f = message.getEthTransfer();
      if (f != null) {
        writer.writeMessage(
          10,
          f,
          proto.aggregator.ETHTransferNode.serializeBinaryToWriter
        );
      }
      f = message.getContractWrite();
      if (f != null) {
        writer.writeMessage(
          11,
          f,
          proto.aggregator.ContractWriteNode.serializeBinaryToWriter
        );
      }
      f = message.getContractRead();
      if (f != null) {
        writer.writeMessage(
          12,
          f,
          proto.aggregator.ContractQueryNode.serializeBinaryToWriter
        );
      }
      f = message.getGraphqlDataQuery();
      if (f != null) {
        writer.writeMessage(
          13,
          f,
          proto.aggregator.GraphQLQueryNode.serializeBinaryToWriter
        );
      }
      f = message.getRestApi();
      if (f != null) {
        writer.writeMessage(
          14,
          f,
          proto.aggregator.RestAPINode.serializeBinaryToWriter
        );
      }
      f = message.getBranch();
      if (f != null) {
        writer.writeMessage(
          15,
          f,
          proto.aggregator.BranchNode.serializeBinaryToWriter
        );
      }
      f = message.getFilter();
      if (f != null) {
        writer.writeMessage(
          16,
          f,
          proto.aggregator.FilterNode.serializeBinaryToWriter
        );
      }
      f = message.getCustomCode();
      if (f != null) {
        writer.writeMessage(
          17,
          f,
          proto.aggregator.CustomCodeNode.serializeBinaryToWriter
        );
      }
    };
    proto.aggregator.TaskNode.prototype.getNodeType = function() {
      return (
        /** @type {!proto.aggregator.TaskType} */
        jspb.Message.getFieldWithDefault(this, 1, 0)
      );
    };
    proto.aggregator.TaskNode.prototype.setNodeType = function(value) {
      return jspb.Message.setProto3EnumField(this, 1, value);
    };
    proto.aggregator.TaskNode.prototype.getId = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.TaskNode.prototype.setId = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.TaskNode.prototype.getName = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.TaskNode.prototype.setName = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    proto.aggregator.TaskNode.prototype.getEthTransfer = function() {
      return (
        /** @type{?proto.aggregator.ETHTransferNode} */
        jspb.Message.getWrapperField(this, proto.aggregator.ETHTransferNode, 10)
      );
    };
    proto.aggregator.TaskNode.prototype.setEthTransfer = function(value) {
      return jspb.Message.setOneofWrapperField(this, 10, proto.aggregator.TaskNode.oneofGroups_[0], value);
    };
    proto.aggregator.TaskNode.prototype.clearEthTransfer = function() {
      return this.setEthTransfer(void 0);
    };
    proto.aggregator.TaskNode.prototype.hasEthTransfer = function() {
      return jspb.Message.getField(this, 10) != null;
    };
    proto.aggregator.TaskNode.prototype.getContractWrite = function() {
      return (
        /** @type{?proto.aggregator.ContractWriteNode} */
        jspb.Message.getWrapperField(this, proto.aggregator.ContractWriteNode, 11)
      );
    };
    proto.aggregator.TaskNode.prototype.setContractWrite = function(value) {
      return jspb.Message.setOneofWrapperField(this, 11, proto.aggregator.TaskNode.oneofGroups_[0], value);
    };
    proto.aggregator.TaskNode.prototype.clearContractWrite = function() {
      return this.setContractWrite(void 0);
    };
    proto.aggregator.TaskNode.prototype.hasContractWrite = function() {
      return jspb.Message.getField(this, 11) != null;
    };
    proto.aggregator.TaskNode.prototype.getContractRead = function() {
      return (
        /** @type{?proto.aggregator.ContractQueryNode} */
        jspb.Message.getWrapperField(this, proto.aggregator.ContractQueryNode, 12)
      );
    };
    proto.aggregator.TaskNode.prototype.setContractRead = function(value) {
      return jspb.Message.setOneofWrapperField(this, 12, proto.aggregator.TaskNode.oneofGroups_[0], value);
    };
    proto.aggregator.TaskNode.prototype.clearContractRead = function() {
      return this.setContractRead(void 0);
    };
    proto.aggregator.TaskNode.prototype.hasContractRead = function() {
      return jspb.Message.getField(this, 12) != null;
    };
    proto.aggregator.TaskNode.prototype.getGraphqlDataQuery = function() {
      return (
        /** @type{?proto.aggregator.GraphQLQueryNode} */
        jspb.Message.getWrapperField(this, proto.aggregator.GraphQLQueryNode, 13)
      );
    };
    proto.aggregator.TaskNode.prototype.setGraphqlDataQuery = function(value) {
      return jspb.Message.setOneofWrapperField(this, 13, proto.aggregator.TaskNode.oneofGroups_[0], value);
    };
    proto.aggregator.TaskNode.prototype.clearGraphqlDataQuery = function() {
      return this.setGraphqlDataQuery(void 0);
    };
    proto.aggregator.TaskNode.prototype.hasGraphqlDataQuery = function() {
      return jspb.Message.getField(this, 13) != null;
    };
    proto.aggregator.TaskNode.prototype.getRestApi = function() {
      return (
        /** @type{?proto.aggregator.RestAPINode} */
        jspb.Message.getWrapperField(this, proto.aggregator.RestAPINode, 14)
      );
    };
    proto.aggregator.TaskNode.prototype.setRestApi = function(value) {
      return jspb.Message.setOneofWrapperField(this, 14, proto.aggregator.TaskNode.oneofGroups_[0], value);
    };
    proto.aggregator.TaskNode.prototype.clearRestApi = function() {
      return this.setRestApi(void 0);
    };
    proto.aggregator.TaskNode.prototype.hasRestApi = function() {
      return jspb.Message.getField(this, 14) != null;
    };
    proto.aggregator.TaskNode.prototype.getBranch = function() {
      return (
        /** @type{?proto.aggregator.BranchNode} */
        jspb.Message.getWrapperField(this, proto.aggregator.BranchNode, 15)
      );
    };
    proto.aggregator.TaskNode.prototype.setBranch = function(value) {
      return jspb.Message.setOneofWrapperField(this, 15, proto.aggregator.TaskNode.oneofGroups_[0], value);
    };
    proto.aggregator.TaskNode.prototype.clearBranch = function() {
      return this.setBranch(void 0);
    };
    proto.aggregator.TaskNode.prototype.hasBranch = function() {
      return jspb.Message.getField(this, 15) != null;
    };
    proto.aggregator.TaskNode.prototype.getFilter = function() {
      return (
        /** @type{?proto.aggregator.FilterNode} */
        jspb.Message.getWrapperField(this, proto.aggregator.FilterNode, 16)
      );
    };
    proto.aggregator.TaskNode.prototype.setFilter = function(value) {
      return jspb.Message.setOneofWrapperField(this, 16, proto.aggregator.TaskNode.oneofGroups_[0], value);
    };
    proto.aggregator.TaskNode.prototype.clearFilter = function() {
      return this.setFilter(void 0);
    };
    proto.aggregator.TaskNode.prototype.hasFilter = function() {
      return jspb.Message.getField(this, 16) != null;
    };
    proto.aggregator.TaskNode.prototype.getCustomCode = function() {
      return (
        /** @type{?proto.aggregator.CustomCodeNode} */
        jspb.Message.getWrapperField(this, proto.aggregator.CustomCodeNode, 17)
      );
    };
    proto.aggregator.TaskNode.prototype.setCustomCode = function(value) {
      return jspb.Message.setOneofWrapperField(this, 17, proto.aggregator.TaskNode.oneofGroups_[0], value);
    };
    proto.aggregator.TaskNode.prototype.clearCustomCode = function() {
      return this.setCustomCode(void 0);
    };
    proto.aggregator.TaskNode.prototype.hasCustomCode = function() {
      return jspb.Message.getField(this, 17) != null;
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
        writer.writeInt64(
          1,
          f
        );
      }
      f = message.getUserOpHash();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
      f = message.getError();
      if (f.length > 0) {
        writer.writeString(
          3,
          f
        );
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
    proto.aggregator.Task.repeatedFields_ = [11, 12, 13];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.Task.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.Task.toObject(opt_includeInstance, this);
      };
      proto.aggregator.Task.toObject = function(includeInstance, msg) {
        var f, obj = {
          id: (f = msg.getId()) && proto.aggregator.UUID.toObject(includeInstance, f),
          owner: jspb.Message.getFieldWithDefault(msg, 2, ""),
          smartWalletAddress: jspb.Message.getFieldWithDefault(msg, 3, ""),
          startAt: jspb.Message.getFieldWithDefault(msg, 5, 0),
          expiredAt: jspb.Message.getFieldWithDefault(msg, 6, 0),
          memo: jspb.Message.getFieldWithDefault(msg, 7, ""),
          completedAt: jspb.Message.getFieldWithDefault(msg, 8, 0),
          recurring: jspb.Message.getBooleanFieldWithDefault(msg, 10, false),
          status: jspb.Message.getFieldWithDefault(msg, 9, 0),
          trigger: (f = msg.getTrigger()) && proto.aggregator.TaskTrigger.toObject(includeInstance, f),
          nodesList: jspb.Message.toObjectList(
            msg.getNodesList(),
            proto.aggregator.TaskNode.toObject,
            includeInstance
          ),
          edgesList: jspb.Message.toObjectList(
            msg.getEdgesList(),
            proto.aggregator.TaskEdge.toObject,
            includeInstance
          ),
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
            reader.readMessage(value, proto.aggregator.UUID.deserializeBinaryFromReader);
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
            msg.setSmartWalletAddress(value);
            break;
          case 5:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setStartAt(value);
            break;
          case 6:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setExpiredAt(value);
            break;
          case 7:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setMemo(value);
            break;
          case 8:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setCompletedAt(value);
            break;
          case 10:
            var value = (
              /** @type {boolean} */
              reader.readBool()
            );
            msg.setRecurring(value);
            break;
          case 9:
            var value = (
              /** @type {!proto.aggregator.TaskStatus} */
              reader.readEnum()
            );
            msg.setStatus(value);
            break;
          case 4:
            var value = new proto.aggregator.TaskTrigger();
            reader.readMessage(value, proto.aggregator.TaskTrigger.deserializeBinaryFromReader);
            msg.setTrigger(value);
            break;
          case 11:
            var value = new proto.aggregator.TaskNode();
            reader.readMessage(value, proto.aggregator.TaskNode.deserializeBinaryFromReader);
            msg.addNodes(value);
            break;
          case 12:
            var value = new proto.aggregator.TaskEdge();
            reader.readMessage(value, proto.aggregator.TaskEdge.deserializeBinaryFromReader);
            msg.addEdges(value);
            break;
          case 13:
            var value = new proto.aggregator.Execution();
            reader.readMessage(value, proto.aggregator.Execution.deserializeBinaryFromReader);
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
        writer.writeMessage(
          1,
          f,
          proto.aggregator.UUID.serializeBinaryToWriter
        );
      }
      f = message.getOwner();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
      f = message.getSmartWalletAddress();
      if (f.length > 0) {
        writer.writeString(
          3,
          f
        );
      }
      f = message.getStartAt();
      if (f !== 0) {
        writer.writeInt64(
          5,
          f
        );
      }
      f = message.getExpiredAt();
      if (f !== 0) {
        writer.writeInt64(
          6,
          f
        );
      }
      f = message.getMemo();
      if (f.length > 0) {
        writer.writeString(
          7,
          f
        );
      }
      f = message.getCompletedAt();
      if (f !== 0) {
        writer.writeInt64(
          8,
          f
        );
      }
      f = message.getRecurring();
      if (f) {
        writer.writeBool(
          10,
          f
        );
      }
      f = message.getStatus();
      if (f !== 0) {
        writer.writeEnum(
          9,
          f
        );
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
          11,
          f,
          proto.aggregator.TaskNode.serializeBinaryToWriter
        );
      }
      f = message.getEdgesList();
      if (f.length > 0) {
        writer.writeRepeatedMessage(
          12,
          f,
          proto.aggregator.TaskEdge.serializeBinaryToWriter
        );
      }
      f = message.getExecutionsList();
      if (f.length > 0) {
        writer.writeRepeatedMessage(
          13,
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
    proto.aggregator.Task.prototype.getSmartWalletAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.Task.prototype.setSmartWalletAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    proto.aggregator.Task.prototype.getStartAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 5, 0)
      );
    };
    proto.aggregator.Task.prototype.setStartAt = function(value) {
      return jspb.Message.setProto3IntField(this, 5, value);
    };
    proto.aggregator.Task.prototype.getExpiredAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 6, 0)
      );
    };
    proto.aggregator.Task.prototype.setExpiredAt = function(value) {
      return jspb.Message.setProto3IntField(this, 6, value);
    };
    proto.aggregator.Task.prototype.getMemo = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 7, "")
      );
    };
    proto.aggregator.Task.prototype.setMemo = function(value) {
      return jspb.Message.setProto3StringField(this, 7, value);
    };
    proto.aggregator.Task.prototype.getCompletedAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 8, 0)
      );
    };
    proto.aggregator.Task.prototype.setCompletedAt = function(value) {
      return jspb.Message.setProto3IntField(this, 8, value);
    };
    proto.aggregator.Task.prototype.getRecurring = function() {
      return (
        /** @type {boolean} */
        jspb.Message.getBooleanFieldWithDefault(this, 10, false)
      );
    };
    proto.aggregator.Task.prototype.setRecurring = function(value) {
      return jspb.Message.setProto3BooleanField(this, 10, value);
    };
    proto.aggregator.Task.prototype.getStatus = function() {
      return (
        /** @type {!proto.aggregator.TaskStatus} */
        jspb.Message.getFieldWithDefault(this, 9, 0)
      );
    };
    proto.aggregator.Task.prototype.setStatus = function(value) {
      return jspb.Message.setProto3EnumField(this, 9, value);
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
        /** @type{!Array<!proto.aggregator.TaskNode>} */
        jspb.Message.getRepeatedWrapperField(this, proto.aggregator.TaskNode, 11)
      );
    };
    proto.aggregator.Task.prototype.setNodesList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 11, value);
    };
    proto.aggregator.Task.prototype.addNodes = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(this, 11, opt_value, proto.aggregator.TaskNode, opt_index);
    };
    proto.aggregator.Task.prototype.clearNodesList = function() {
      return this.setNodesList([]);
    };
    proto.aggregator.Task.prototype.getEdgesList = function() {
      return (
        /** @type{!Array<!proto.aggregator.TaskEdge>} */
        jspb.Message.getRepeatedWrapperField(this, proto.aggregator.TaskEdge, 12)
      );
    };
    proto.aggregator.Task.prototype.setEdgesList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 12, value);
    };
    proto.aggregator.Task.prototype.addEdges = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(this, 12, opt_value, proto.aggregator.TaskEdge, opt_index);
    };
    proto.aggregator.Task.prototype.clearEdgesList = function() {
      return this.setEdgesList([]);
    };
    proto.aggregator.Task.prototype.getExecutionsList = function() {
      return (
        /** @type{!Array<!proto.aggregator.Execution>} */
        jspb.Message.getRepeatedWrapperField(this, proto.aggregator.Execution, 13)
      );
    };
    proto.aggregator.Task.prototype.setExecutionsList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 13, value);
    };
    proto.aggregator.Task.prototype.addExecutions = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(this, 13, opt_value, proto.aggregator.Execution, opt_index);
    };
    proto.aggregator.Task.prototype.clearExecutionsList = function() {
      return this.setExecutionsList([]);
    };
    proto.aggregator.CreateTaskReq.repeatedFields_ = [7, 8];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.CreateTaskReq.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.CreateTaskReq.toObject(opt_includeInstance, this);
      };
      proto.aggregator.CreateTaskReq.toObject = function(includeInstance, msg) {
        var f, obj = {
          trigger: (f = msg.getTrigger()) && proto.aggregator.TaskTrigger.toObject(includeInstance, f),
          startAt: jspb.Message.getFieldWithDefault(msg, 2, 0),
          expiredAt: jspb.Message.getFieldWithDefault(msg, 3, 0),
          repeatable: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
          smartWalletAddress: jspb.Message.getFieldWithDefault(msg, 5, ""),
          memo: jspb.Message.getFieldWithDefault(msg, 6, ""),
          nodesList: jspb.Message.toObjectList(
            msg.getNodesList(),
            proto.aggregator.TaskNode.toObject,
            includeInstance
          ),
          edgesList: jspb.Message.toObjectList(
            msg.getEdgesList(),
            proto.aggregator.TaskEdge.toObject,
            includeInstance
          )
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
      return proto.aggregator.CreateTaskReq.deserializeBinaryFromReader(msg, reader);
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
            reader.readMessage(value, proto.aggregator.TaskTrigger.deserializeBinaryFromReader);
            msg.setTrigger(value);
            break;
          case 2:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setStartAt(value);
            break;
          case 3:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setExpiredAt(value);
            break;
          case 4:
            var value = (
              /** @type {boolean} */
              reader.readBool()
            );
            msg.setRepeatable(value);
            break;
          case 5:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setSmartWalletAddress(value);
            break;
          case 6:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setMemo(value);
            break;
          case 7:
            var value = new proto.aggregator.TaskNode();
            reader.readMessage(value, proto.aggregator.TaskNode.deserializeBinaryFromReader);
            msg.addNodes(value);
            break;
          case 8:
            var value = new proto.aggregator.TaskEdge();
            reader.readMessage(value, proto.aggregator.TaskEdge.deserializeBinaryFromReader);
            msg.addEdges(value);
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
      f = message.getStartAt();
      if (f !== 0) {
        writer.writeInt64(
          2,
          f
        );
      }
      f = message.getExpiredAt();
      if (f !== 0) {
        writer.writeInt64(
          3,
          f
        );
      }
      f = message.getRepeatable();
      if (f) {
        writer.writeBool(
          4,
          f
        );
      }
      f = message.getSmartWalletAddress();
      if (f.length > 0) {
        writer.writeString(
          5,
          f
        );
      }
      f = message.getMemo();
      if (f.length > 0) {
        writer.writeString(
          6,
          f
        );
      }
      f = message.getNodesList();
      if (f.length > 0) {
        writer.writeRepeatedMessage(
          7,
          f,
          proto.aggregator.TaskNode.serializeBinaryToWriter
        );
      }
      f = message.getEdgesList();
      if (f.length > 0) {
        writer.writeRepeatedMessage(
          8,
          f,
          proto.aggregator.TaskEdge.serializeBinaryToWriter
        );
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
    proto.aggregator.CreateTaskReq.prototype.getStartAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 2, 0)
      );
    };
    proto.aggregator.CreateTaskReq.prototype.setStartAt = function(value) {
      return jspb.Message.setProto3IntField(this, 2, value);
    };
    proto.aggregator.CreateTaskReq.prototype.getExpiredAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 3, 0)
      );
    };
    proto.aggregator.CreateTaskReq.prototype.setExpiredAt = function(value) {
      return jspb.Message.setProto3IntField(this, 3, value);
    };
    proto.aggregator.CreateTaskReq.prototype.getRepeatable = function() {
      return (
        /** @type {boolean} */
        jspb.Message.getBooleanFieldWithDefault(this, 4, false)
      );
    };
    proto.aggregator.CreateTaskReq.prototype.setRepeatable = function(value) {
      return jspb.Message.setProto3BooleanField(this, 4, value);
    };
    proto.aggregator.CreateTaskReq.prototype.getSmartWalletAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 5, "")
      );
    };
    proto.aggregator.CreateTaskReq.prototype.setSmartWalletAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 5, value);
    };
    proto.aggregator.CreateTaskReq.prototype.getMemo = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 6, "")
      );
    };
    proto.aggregator.CreateTaskReq.prototype.setMemo = function(value) {
      return jspb.Message.setProto3StringField(this, 6, value);
    };
    proto.aggregator.CreateTaskReq.prototype.getNodesList = function() {
      return (
        /** @type{!Array<!proto.aggregator.TaskNode>} */
        jspb.Message.getRepeatedWrapperField(this, proto.aggregator.TaskNode, 7)
      );
    };
    proto.aggregator.CreateTaskReq.prototype.setNodesList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 7, value);
    };
    proto.aggregator.CreateTaskReq.prototype.addNodes = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.aggregator.TaskNode, opt_index);
    };
    proto.aggregator.CreateTaskReq.prototype.clearNodesList = function() {
      return this.setNodesList([]);
    };
    proto.aggregator.CreateTaskReq.prototype.getEdgesList = function() {
      return (
        /** @type{!Array<!proto.aggregator.TaskEdge>} */
        jspb.Message.getRepeatedWrapperField(this, proto.aggregator.TaskEdge, 8)
      );
    };
    proto.aggregator.CreateTaskReq.prototype.setEdgesList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 8, value);
    };
    proto.aggregator.CreateTaskReq.prototype.addEdges = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.aggregator.TaskEdge, opt_index);
    };
    proto.aggregator.CreateTaskReq.prototype.clearEdgesList = function() {
      return this.setEdgesList([]);
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
      return proto.aggregator.CreateTaskResp.deserializeBinaryFromReader(msg, reader);
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
        writer.writeString(
          1,
          f
        );
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
        writer.writeString(
          1,
          f
        );
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
        writer.writeString(
          1,
          f
        );
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
          factory: jspb.Message.getFieldWithDefault(msg, 1, ""),
          salt: jspb.Message.getFieldWithDefault(msg, 2, "")
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
      return proto.aggregator.AddressRequest.deserializeBinaryFromReader(msg, reader);
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
            msg.setFactory(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setSalt(value);
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
      f = message.getFactory();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
      f = message.getSalt();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
    };
    proto.aggregator.AddressRequest.prototype.getFactory = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.AddressRequest.prototype.setFactory = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.AddressRequest.prototype.getSalt = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.AddressRequest.prototype.setSalt = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.SmartWallet.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.SmartWallet.toObject(opt_includeInstance, this);
      };
      proto.aggregator.SmartWallet.toObject = function(includeInstance, msg) {
        var f, obj = {
          address: jspb.Message.getFieldWithDefault(msg, 1, ""),
          salt: jspb.Message.getFieldWithDefault(msg, 2, ""),
          factory: jspb.Message.getFieldWithDefault(msg, 3, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.SmartWallet.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.SmartWallet();
      return proto.aggregator.SmartWallet.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.SmartWallet.deserializeBinaryFromReader = function(msg, reader) {
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
            msg.setSalt(value);
            break;
          case 3:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setFactory(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.SmartWallet.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.SmartWallet.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.SmartWallet.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getAddress();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
      f = message.getSalt();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
      f = message.getFactory();
      if (f.length > 0) {
        writer.writeString(
          3,
          f
        );
      }
    };
    proto.aggregator.SmartWallet.prototype.getAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.SmartWallet.prototype.setAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.SmartWallet.prototype.getSalt = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.SmartWallet.prototype.setSalt = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.SmartWallet.prototype.getFactory = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.SmartWallet.prototype.setFactory = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    proto.aggregator.AddressResp.repeatedFields_ = [1];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.AddressResp.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.AddressResp.toObject(opt_includeInstance, this);
      };
      proto.aggregator.AddressResp.toObject = function(includeInstance, msg) {
        var f, obj = {
          walletsList: jspb.Message.toObjectList(
            msg.getWalletsList(),
            proto.aggregator.SmartWallet.toObject,
            includeInstance
          )
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
            var value = new proto.aggregator.SmartWallet();
            reader.readMessage(value, proto.aggregator.SmartWallet.deserializeBinaryFromReader);
            msg.addWallets(value);
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
      f = message.getWalletsList();
      if (f.length > 0) {
        writer.writeRepeatedMessage(
          1,
          f,
          proto.aggregator.SmartWallet.serializeBinaryToWriter
        );
      }
    };
    proto.aggregator.AddressResp.prototype.getWalletsList = function() {
      return (
        /** @type{!Array<!proto.aggregator.SmartWallet>} */
        jspb.Message.getRepeatedWrapperField(this, proto.aggregator.SmartWallet, 1)
      );
    };
    proto.aggregator.AddressResp.prototype.setWalletsList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 1, value);
    };
    proto.aggregator.AddressResp.prototype.addWallets = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.aggregator.SmartWallet, opt_index);
    };
    proto.aggregator.AddressResp.prototype.clearWalletsList = function() {
      return this.setWalletsList([]);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.ListTasksReq.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ListTasksReq.toObject(opt_includeInstance, this);
      };
      proto.aggregator.ListTasksReq.toObject = function(includeInstance, msg) {
        var f, obj = {
          smartWalletAddress: jspb.Message.getFieldWithDefault(msg, 1, "")
        };
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
          case 1:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setSmartWalletAddress(value);
            break;
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
      f = message.getSmartWalletAddress();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
    };
    proto.aggregator.ListTasksReq.prototype.getSmartWalletAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.ListTasksReq.prototype.setSmartWalletAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
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
            proto.aggregator.Task.toObject,
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
      return proto.aggregator.ListTasksResp.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.ListTasksResp.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = new proto.aggregator.Task();
            reader.readMessage(value, proto.aggregator.Task.deserializeBinaryFromReader);
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
          proto.aggregator.Task.serializeBinaryToWriter
        );
      }
    };
    proto.aggregator.ListTasksResp.prototype.getTasksList = function() {
      return (
        /** @type{!Array<!proto.aggregator.Task>} */
        jspb.Message.getRepeatedWrapperField(this, proto.aggregator.Task, 1)
      );
    };
    proto.aggregator.ListTasksResp.prototype.setTasksList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 1, value);
    };
    proto.aggregator.ListTasksResp.prototype.addTasks = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.aggregator.Task, opt_index);
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
        writer.writeString(
          1,
          f
        );
      }
      f = message.getExpiredAt();
      if (f !== 0) {
        writer.writeInt64(
          2,
          f
        );
      }
      f = message.getSignature();
      if (f.length > 0) {
        writer.writeString(
          3,
          f
        );
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
        writer.writeString(
          1,
          f
        );
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
      return proto.aggregator.UpdateChecksReq.deserializeBinaryFromReader(msg, reader);
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
        writer.writeString(
          1,
          f
        );
      }
      f = message.getSignature();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
      f = message.getIdList();
      if (f.length > 0) {
        writer.writeRepeatedString(
          3,
          f
        );
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
        return proto.aggregator.UpdateChecksResp.toObject(opt_includeInstance, this);
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
      return proto.aggregator.UpdateChecksResp.deserializeBinaryFromReader(msg, reader);
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
            reader.readMessage(value, google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
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
        jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 1)
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
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.CreateWalletReq.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.CreateWalletReq.toObject(opt_includeInstance, this);
      };
      proto.aggregator.CreateWalletReq.toObject = function(includeInstance, msg) {
        var f, obj = {
          salt: jspb.Message.getFieldWithDefault(msg, 1, ""),
          factoryAddress: jspb.Message.getFieldWithDefault(msg, 2, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.CreateWalletReq.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.CreateWalletReq();
      return proto.aggregator.CreateWalletReq.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.CreateWalletReq.deserializeBinaryFromReader = function(msg, reader) {
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
            msg.setSalt(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setFactoryAddress(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.CreateWalletReq.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.CreateWalletReq.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.CreateWalletReq.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getSalt();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
      f = message.getFactoryAddress();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
    };
    proto.aggregator.CreateWalletReq.prototype.getSalt = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.CreateWalletReq.prototype.setSalt = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.CreateWalletReq.prototype.getFactoryAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.CreateWalletReq.prototype.setFactoryAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.CreateWalletResp.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.CreateWalletResp.toObject(opt_includeInstance, this);
      };
      proto.aggregator.CreateWalletResp.toObject = function(includeInstance, msg) {
        var f, obj = {
          address: jspb.Message.getFieldWithDefault(msg, 1, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.CreateWalletResp.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.CreateWalletResp();
      return proto.aggregator.CreateWalletResp.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.CreateWalletResp.deserializeBinaryFromReader = function(msg, reader) {
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
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.CreateWalletResp.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.CreateWalletResp.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.CreateWalletResp.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getAddress();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
    };
    proto.aggregator.CreateWalletResp.prototype.getAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.CreateWalletResp.prototype.setAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.TriggerType = {
      MANUALTRIGGER: 0,
      FIXEDEPOCHTRIGGER: 1,
      CRONTRIGGER: 2,
      BLOCKTRIGGER: 3,
      EVENTTRIGGER: 4
    };
    proto.aggregator.Error = {
      UNKNOWERROR: 0,
      RPCNODEERROR: 1e3,
      STORAGEUNAVAILABLE: 2e3,
      STORAGEWRITEERROR: 2001,
      SMARTWALLETRPCERROR: 6e3,
      SMARTWALLETNOTFOUNDERROR: 6001,
      TASKDATACORRUPTED: 7e3,
      TASKDATAMISSINGERROR: 7001
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
    proto.aggregator.TaskType = {
      ETHTRANSFERTASK: 0,
      CONTRACTWRITETASK: 1,
      CONTRACTREADTASK: 2,
      GRAPHQLDATAQUERYTASK: 3,
      RESTAPITASK: 4,
      BRANCHTASK: 5,
      FILTERTASK: 6,
      CUSTOMCODETASK: 7
    };
    goog.object.extend(exports2, proto.aggregator);
  }
});

// grpc_codegen/avs_grpc_pb.js
var require_avs_grpc_pb = __commonJS({
  "grpc_codegen/avs_grpc_pb.js"(exports2) {
    "use strict";
    var grpc2 = require("@grpc/grpc-js");
    var avs_pb2 = require_avs_pb();
    var google_protobuf_timestamp_pb = require("google-protobuf/google/protobuf/timestamp_pb.js");
    var google_protobuf_wrappers_pb = require("google-protobuf/google/protobuf/wrappers_pb.js");
    function serialize_aggregator_AddressRequest(arg) {
      if (!(arg instanceof avs_pb2.AddressRequest)) {
        throw new Error("Expected argument of type aggregator.AddressRequest");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_AddressRequest(buffer_arg) {
      return avs_pb2.AddressRequest.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_AddressResp(arg) {
      if (!(arg instanceof avs_pb2.AddressResp)) {
        throw new Error("Expected argument of type aggregator.AddressResp");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_AddressResp(buffer_arg) {
      return avs_pb2.AddressResp.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_Checkin(arg) {
      if (!(arg instanceof avs_pb2.Checkin)) {
        throw new Error("Expected argument of type aggregator.Checkin");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_Checkin(buffer_arg) {
      return avs_pb2.Checkin.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_CheckinResp(arg) {
      if (!(arg instanceof avs_pb2.CheckinResp)) {
        throw new Error("Expected argument of type aggregator.CheckinResp");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_CheckinResp(buffer_arg) {
      return avs_pb2.CheckinResp.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_CreateTaskReq(arg) {
      if (!(arg instanceof avs_pb2.CreateTaskReq)) {
        throw new Error("Expected argument of type aggregator.CreateTaskReq");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_CreateTaskReq(buffer_arg) {
      return avs_pb2.CreateTaskReq.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_CreateTaskResp(arg) {
      if (!(arg instanceof avs_pb2.CreateTaskResp)) {
        throw new Error("Expected argument of type aggregator.CreateTaskResp");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_CreateTaskResp(buffer_arg) {
      return avs_pb2.CreateTaskResp.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_CreateWalletReq(arg) {
      if (!(arg instanceof avs_pb2.CreateWalletReq)) {
        throw new Error("Expected argument of type aggregator.CreateWalletReq");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_CreateWalletReq(buffer_arg) {
      return avs_pb2.CreateWalletReq.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_CreateWalletResp(arg) {
      if (!(arg instanceof avs_pb2.CreateWalletResp)) {
        throw new Error("Expected argument of type aggregator.CreateWalletResp");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_CreateWalletResp(buffer_arg) {
      return avs_pb2.CreateWalletResp.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_GetKeyReq(arg) {
      if (!(arg instanceof avs_pb2.GetKeyReq)) {
        throw new Error("Expected argument of type aggregator.GetKeyReq");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_GetKeyReq(buffer_arg) {
      return avs_pb2.GetKeyReq.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_KeyResp(arg) {
      if (!(arg instanceof avs_pb2.KeyResp)) {
        throw new Error("Expected argument of type aggregator.KeyResp");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_KeyResp(buffer_arg) {
      return avs_pb2.KeyResp.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_ListTasksReq(arg) {
      if (!(arg instanceof avs_pb2.ListTasksReq)) {
        throw new Error("Expected argument of type aggregator.ListTasksReq");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_ListTasksReq(buffer_arg) {
      return avs_pb2.ListTasksReq.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_ListTasksResp(arg) {
      if (!(arg instanceof avs_pb2.ListTasksResp)) {
        throw new Error("Expected argument of type aggregator.ListTasksResp");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_ListTasksResp(buffer_arg) {
      return avs_pb2.ListTasksResp.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_NonceRequest(arg) {
      if (!(arg instanceof avs_pb2.NonceRequest)) {
        throw new Error("Expected argument of type aggregator.NonceRequest");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_NonceRequest(buffer_arg) {
      return avs_pb2.NonceRequest.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_NonceResp(arg) {
      if (!(arg instanceof avs_pb2.NonceResp)) {
        throw new Error("Expected argument of type aggregator.NonceResp");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_NonceResp(buffer_arg) {
      return avs_pb2.NonceResp.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_SyncTasksReq(arg) {
      if (!(arg instanceof avs_pb2.SyncTasksReq)) {
        throw new Error("Expected argument of type aggregator.SyncTasksReq");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_SyncTasksReq(buffer_arg) {
      return avs_pb2.SyncTasksReq.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_SyncTasksResp(arg) {
      if (!(arg instanceof avs_pb2.SyncTasksResp)) {
        throw new Error("Expected argument of type aggregator.SyncTasksResp");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_SyncTasksResp(buffer_arg) {
      return avs_pb2.SyncTasksResp.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_Task(arg) {
      if (!(arg instanceof avs_pb2.Task)) {
        throw new Error("Expected argument of type aggregator.Task");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_Task(buffer_arg) {
      return avs_pb2.Task.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_UUID(arg) {
      if (!(arg instanceof avs_pb2.UUID)) {
        throw new Error("Expected argument of type aggregator.UUID");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_UUID(buffer_arg) {
      return avs_pb2.UUID.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_UpdateChecksReq(arg) {
      if (!(arg instanceof avs_pb2.UpdateChecksReq)) {
        throw new Error("Expected argument of type aggregator.UpdateChecksReq");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_UpdateChecksReq(buffer_arg) {
      return avs_pb2.UpdateChecksReq.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_UpdateChecksResp(arg) {
      if (!(arg instanceof avs_pb2.UpdateChecksResp)) {
        throw new Error("Expected argument of type aggregator.UpdateChecksResp");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_UpdateChecksResp(buffer_arg) {
      return avs_pb2.UpdateChecksResp.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_google_protobuf_BoolValue(arg) {
      if (!(arg instanceof google_protobuf_wrappers_pb.BoolValue)) {
        throw new Error("Expected argument of type google.protobuf.BoolValue");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_google_protobuf_BoolValue(buffer_arg) {
      return google_protobuf_wrappers_pb.BoolValue.deserializeBinary(new Uint8Array(buffer_arg));
    }
    var AggregatorService = exports2.AggregatorService = {
      // Auth
      getKey: {
        path: "/aggregator.Aggregator/GetKey",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb2.GetKeyReq,
        responseType: avs_pb2.KeyResp,
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
        requestType: avs_pb2.NonceRequest,
        responseType: avs_pb2.NonceResp,
        requestSerialize: serialize_aggregator_NonceRequest,
        requestDeserialize: deserialize_aggregator_NonceRequest,
        responseSerialize: serialize_aggregator_NonceResp,
        responseDeserialize: deserialize_aggregator_NonceResp
      },
      getSmartAccountAddress: {
        path: "/aggregator.Aggregator/GetSmartAccountAddress",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb2.AddressRequest,
        responseType: avs_pb2.AddressResp,
        requestSerialize: serialize_aggregator_AddressRequest,
        requestDeserialize: deserialize_aggregator_AddressRequest,
        responseSerialize: serialize_aggregator_AddressResp,
        responseDeserialize: deserialize_aggregator_AddressResp
      },
      // Task Management
      createWallet: {
        path: "/aggregator.Aggregator/CreateWallet",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb2.CreateWalletReq,
        responseType: avs_pb2.CreateWalletResp,
        requestSerialize: serialize_aggregator_CreateWalletReq,
        requestDeserialize: deserialize_aggregator_CreateWalletReq,
        responseSerialize: serialize_aggregator_CreateWalletResp,
        responseDeserialize: deserialize_aggregator_CreateWalletResp
      },
      createTask: {
        path: "/aggregator.Aggregator/CreateTask",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb2.CreateTaskReq,
        responseType: avs_pb2.CreateTaskResp,
        requestSerialize: serialize_aggregator_CreateTaskReq,
        requestDeserialize: deserialize_aggregator_CreateTaskReq,
        responseSerialize: serialize_aggregator_CreateTaskResp,
        responseDeserialize: deserialize_aggregator_CreateTaskResp
      },
      listTasks: {
        path: "/aggregator.Aggregator/ListTasks",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb2.ListTasksReq,
        responseType: avs_pb2.ListTasksResp,
        requestSerialize: serialize_aggregator_ListTasksReq,
        requestDeserialize: deserialize_aggregator_ListTasksReq,
        responseSerialize: serialize_aggregator_ListTasksResp,
        responseDeserialize: deserialize_aggregator_ListTasksResp
      },
      getTask: {
        path: "/aggregator.Aggregator/GetTask",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb2.UUID,
        responseType: avs_pb2.Task,
        requestSerialize: serialize_aggregator_UUID,
        requestDeserialize: deserialize_aggregator_UUID,
        responseSerialize: serialize_aggregator_Task,
        responseDeserialize: deserialize_aggregator_Task
      },
      cancelTask: {
        path: "/aggregator.Aggregator/CancelTask",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb2.UUID,
        responseType: google_protobuf_wrappers_pb.BoolValue,
        requestSerialize: serialize_aggregator_UUID,
        requestDeserialize: deserialize_aggregator_UUID,
        responseSerialize: serialize_google_protobuf_BoolValue,
        responseDeserialize: deserialize_google_protobuf_BoolValue
      },
      deleteTask: {
        path: "/aggregator.Aggregator/DeleteTask",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb2.UUID,
        responseType: google_protobuf_wrappers_pb.BoolValue,
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
        requestType: avs_pb2.Checkin,
        responseType: avs_pb2.CheckinResp,
        requestSerialize: serialize_aggregator_Checkin,
        requestDeserialize: deserialize_aggregator_Checkin,
        responseSerialize: serialize_aggregator_CheckinResp,
        responseDeserialize: deserialize_aggregator_CheckinResp
      },
      syncTasks: {
        path: "/aggregator.Aggregator/SyncTasks",
        requestStream: false,
        responseStream: true,
        requestType: avs_pb2.SyncTasksReq,
        responseType: avs_pb2.SyncTasksResp,
        requestSerialize: serialize_aggregator_SyncTasksReq,
        requestDeserialize: deserialize_aggregator_SyncTasksReq,
        responseSerialize: serialize_aggregator_SyncTasksResp,
        responseDeserialize: deserialize_aggregator_SyncTasksResp
      },
      updateChecks: {
        path: "/aggregator.Aggregator/UpdateChecks",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb2.UpdateChecksReq,
        responseType: avs_pb2.UpdateChecksResp,
        requestSerialize: serialize_aggregator_UpdateChecksReq,
        requestDeserialize: deserialize_aggregator_UpdateChecksReq,
        responseSerialize: serialize_aggregator_UpdateChecksResp,
        responseDeserialize: deserialize_aggregator_UpdateChecksResp
      }
    };
    exports2.AggregatorClient = grpc2.makeGenericClientConstructor(AggregatorService);
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AUTH_KEY_HEADER: () => AUTH_KEY_HEADER,
  default: () => Client,
  getKeyRequestMessage: () => getKeyRequestMessage
});
module.exports = __toCommonJS(src_exports);
var import_lodash = __toESM(require("lodash"));
var import_ethers = require("ethers");
var grpc = __toESM(require("@grpc/grpc-js"));
var import_grpc_js = require("@grpc/grpc-js");

// src/auth.ts
var getKeyRequestMessage = (address2, expiredAt) => {
  return `key request for ${address2} expired at ${expiredAt}`;
};

// src/index.ts
var import_avs_grpc_pb = __toESM(require_avs_grpc_pb());
var avs_pb = __toESM(require_avs_pb());

// src/types.ts
var AUTH_KEY_HEADER = "authKey";

// src/task.ts
var Task = class {
  // Add other missing properties here
  constructor(task) {
    this.id = task.getId()?.toString() || "";
    this.status = task.getStatus().toString();
    this.owner = task.getOwner();
    this.smartAccountAddress = task.getSmartAccountAddress();
    this.trigger = {
      triggerType: task.getTrigger()?.getTriggerType() || 0,
      schedule: task.getTrigger()?.getSchedule()?.toObject(),
      contractQuery: task.getTrigger()?.getContractQuery()?.toObject(),
      expression: task.getTrigger()?.getExpression()?.toObject() || {
        expression: ""
      }
    };
    this.nodesList = task.getNodesList();
    this.startAt = task.getStartAt();
    this.expiredAt = task.getExpiredAt();
    this.memo = task.getMemo();
    this.completedAt = task.getCompletedAt();
    this.status = task.getStatus();
    this.repeatable = task.getRepeatable();
    this.executionsList = task.getExecutionsList();
  }
};
var task_default = Task;

// src/index.ts
var BaseClient = class {
  constructor(opts) {
    this.endpoint = opts.endpoint;
    this.rpcClient = new import_avs_grpc_pb.AggregatorClient(
      this.endpoint,
      grpc.credentials.createInsecure()
    );
    this.metadata = new import_grpc_js.Metadata();
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
  // When using the APIkey, depends on scope of the key, it may have access to one ore more account
  async authWithAPIKey(address2, apiKey, expiredAtEpoch) {
    const request = new avs_pb.GetKeyReq();
    request.setOwner(address2);
    request.setExpiredAt(expiredAtEpoch);
    request.setSignature(apiKey);
    const result = await this._callRPC("getKey", request);
    this.authKey = result.getKey();
    return { authKey: result.getKey() };
  }
  // This flow can be used where the signature is generate from outside, such as in front-end and pass in
  async authWithSignature(address2, signature, expiredAtEpoch) {
    const request = new avs_pb.GetKeyReq();
    request.setOwner(address2);
    request.setExpiredAt(expiredAtEpoch);
    request.setSignature(signature);
    let result = await this._callRPC(
      "getKey",
      request
    );
    console.log("my key is ", result, result.getKey());
    this.authKey = result.getKey();
    return { authKey: result.getKey() };
  }
  _callRPC(method, request, options) {
    const metadata = import_lodash.default.cloneDeep(this.metadata);
    console.log("my authkey", this.authkey);
    if (!this.authKey) {
      throw new Error("Not authenticated yet");
    }
    metadata.set(AUTH_KEY_HEADER, options.authKey);
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
  _callAnonRPC(method, request, options) {
    return new Promise((resolve, reject) => {
      this.rpcClient[method].bind(this.rpcClient)(
        request,
        this.metadata,
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
  async listSmartWallets() {
    const request = new avs_pb.AddressRequest();
    request.setOwner(address);
    const result = await this._callRPC("getSmartAccountAddress", request);
    return {
      owner: address,
      wallets: result.getWalletsList()
    };
  }
  async createTask({
    address: address2,
    oracleContract,
    tokenContract
  }) {
    const trigger = new avs_pb.TaskTrigger();
    trigger.setTriggerType(avs_pb.TriggerType.EXPRESSIONTRIGGER);
    trigger.setExpression(
      new avs_pb.ExpressionCondition().setExpression(`
      bigCmp(
        priceChainlink("${oracleContract}"), 
        toBigInt("10000")
      ) > 0`)
    );
    const action = new avs_pb.TaskAction();
    action.setTaskType(avs_pb.TaskType.CONTRACTEXECUTIONTASK);
    action.setId("transfer_erc20_1");
    action.setName("Transfer Test Token");
    const execution = new avs_pb.ContractExecution();
    execution.setContractAddress(tokenContract);
    let ABI = ["function transfer(address to, uint amount)"];
    let iface = new import_ethers.ethers.Interface(ABI);
    const callData = iface.encodeFunctionData("transfer", [
      address2,
      import_ethers.ethers.parseUnits("12", 18)
    ]);
    execution.setCallData(callData);
    action.setContractExecution(execution);
    const request = new avs_pb.CreateTaskReq().setTrigger(trigger).setActionsList([action]).setExpiredAt(Math.floor(Date.now() / 1e3) + 1e6);
    const result = await this._callRPC("createTask", request, { authKey });
    return {
      id: result.getId()
    };
  }
  async listTasks(address2) {
    const request = new avs_pb.ListTasksReq();
    const result = await this._callRPC("listTasks", request, { authKey });
    const tasks = import_lodash.default.map(
      result.getTasksList(),
      (obj) => {
        return {
          id: obj.getId(),
          status: import_lodash.default.capitalize(obj.getStatus().toString())
        };
      }
    );
    return {
      tasks
    };
  }
  // TODO: specify the return type to match client’s requirements
  // Right now we simply return the original object from the server
  async getTask(id) {
    const request = new avs_pb.UUID();
    request.setBytes(id);
    ``;
    const result = await this._callRPC(
      "getTask",
      request
    );
    return new task_default(result);
  }
  async cancelTask(id) {
    const request = new avs_pb.UUID();
    request.setBytes(id);
    const result = await this._callRPC(
      "cancelTask",
      request
    );
    return {
      value: result.getValue()
    };
  }
  async deleteTask(id) {
    const request = new avs_pb.UUID();
    request.setBytes(id);
    const result = await this._callRPC(
      "deleteTask",
      request
    );
    return {
      value: result.getValue()
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AUTH_KEY_HEADER,
  getKeyRequestMessage
});
