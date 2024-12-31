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
    var google_protobuf_wrappers_pb = require("google-protobuf/google/protobuf/wrappers_pb.js");
    goog.object.extend(proto, google_protobuf_wrappers_pb);
    goog.exportSymbol("proto.aggregator.BlockCondition", null, global);
    goog.exportSymbol("proto.aggregator.BranchNode", null, global);
    goog.exportSymbol("proto.aggregator.Condition", null, global);
    goog.exportSymbol("proto.aggregator.ContractReadNode", null, global);
    goog.exportSymbol("proto.aggregator.ContractWriteNode", null, global);
    goog.exportSymbol("proto.aggregator.CreateTaskReq", null, global);
    goog.exportSymbol("proto.aggregator.CreateTaskResp", null, global);
    goog.exportSymbol("proto.aggregator.CronCondition", null, global);
    goog.exportSymbol("proto.aggregator.CustomCodeLang", null, global);
    goog.exportSymbol("proto.aggregator.CustomCodeNode", null, global);
    goog.exportSymbol("proto.aggregator.ETHTransferNode", null, global);
    goog.exportSymbol("proto.aggregator.Error", null, global);
    goog.exportSymbol("proto.aggregator.EventCondition", null, global);
    goog.exportSymbol("proto.aggregator.Execution", null, global);
    goog.exportSymbol("proto.aggregator.Execution.Step", null, global);
    goog.exportSymbol("proto.aggregator.FilterNode", null, global);
    goog.exportSymbol("proto.aggregator.FixedTimeCondition", null, global);
    goog.exportSymbol("proto.aggregator.GetExecutionReq", null, global);
    goog.exportSymbol("proto.aggregator.GetKeyReq", null, global);
    goog.exportSymbol("proto.aggregator.GetWalletReq", null, global);
    goog.exportSymbol("proto.aggregator.GetWalletResp", null, global);
    goog.exportSymbol("proto.aggregator.GraphQLQueryNode", null, global);
    goog.exportSymbol("proto.aggregator.IdReq", null, global);
    goog.exportSymbol("proto.aggregator.KeyResp", null, global);
    goog.exportSymbol("proto.aggregator.ListExecutionsReq", null, global);
    goog.exportSymbol("proto.aggregator.ListExecutionsResp", null, global);
    goog.exportSymbol("proto.aggregator.ListTasksReq", null, global);
    goog.exportSymbol("proto.aggregator.ListTasksResp", null, global);
    goog.exportSymbol("proto.aggregator.ListTasksResp.Item", null, global);
    goog.exportSymbol("proto.aggregator.ListWalletReq", null, global);
    goog.exportSymbol("proto.aggregator.ListWalletResp", null, global);
    goog.exportSymbol("proto.aggregator.LoopNode", null, global);
    goog.exportSymbol("proto.aggregator.LoopNode.RunnerCase", null, global);
    goog.exportSymbol("proto.aggregator.NonceRequest", null, global);
    goog.exportSymbol("proto.aggregator.NonceResp", null, global);
    goog.exportSymbol("proto.aggregator.RestAPINode", null, global);
    goog.exportSymbol("proto.aggregator.SmartWallet", null, global);
    goog.exportSymbol("proto.aggregator.Task", null, global);
    goog.exportSymbol("proto.aggregator.TaskEdge", null, global);
    goog.exportSymbol("proto.aggregator.TaskNode", null, global);
    goog.exportSymbol("proto.aggregator.TaskNode.TaskTypeCase", null, global);
    goog.exportSymbol("proto.aggregator.TaskStatus", null, global);
    goog.exportSymbol("proto.aggregator.TaskTrigger", null, global);
    goog.exportSymbol("proto.aggregator.TaskTrigger.TriggerTypeCase", null, global);
    goog.exportSymbol("proto.aggregator.TriggerMetadata", null, global);
    goog.exportSymbol("proto.aggregator.TriggerMetadata.TriggerType", null, global);
    goog.exportSymbol("proto.aggregator.UserTriggerTaskReq", null, global);
    goog.exportSymbol("proto.aggregator.UserTriggerTaskResp", null, global);
    proto.aggregator.IdReq = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.IdReq, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.IdReq.displayName = "proto.aggregator.IdReq";
    }
    proto.aggregator.FixedTimeCondition = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.FixedTimeCondition.repeatedFields_, null);
    };
    goog.inherits(proto.aggregator.FixedTimeCondition, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.FixedTimeCondition.displayName = "proto.aggregator.FixedTimeCondition";
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
    proto.aggregator.ContractReadNode = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.ContractReadNode, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ContractReadNode.displayName = "proto.aggregator.ContractReadNode";
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
    proto.aggregator.Condition = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.Condition, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.Condition.displayName = "proto.aggregator.Condition";
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
    proto.aggregator.LoopNode = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, proto.aggregator.LoopNode.oneofGroups_);
    };
    goog.inherits(proto.aggregator.LoopNode, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.LoopNode.displayName = "proto.aggregator.LoopNode";
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
      jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.Execution.repeatedFields_, null);
    };
    goog.inherits(proto.aggregator.Execution, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.Execution.displayName = "proto.aggregator.Execution";
    }
    proto.aggregator.Execution.Step = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.Execution.Step, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.Execution.Step.displayName = "proto.aggregator.Execution.Step";
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
    proto.aggregator.ListWalletReq = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.ListWalletReq, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ListWalletReq.displayName = "proto.aggregator.ListWalletReq";
    }
    proto.aggregator.SmartWallet = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.SmartWallet, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.SmartWallet.displayName = "proto.aggregator.SmartWallet";
    }
    proto.aggregator.ListWalletResp = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.ListWalletResp.repeatedFields_, null);
    };
    goog.inherits(proto.aggregator.ListWalletResp, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ListWalletResp.displayName = "proto.aggregator.ListWalletResp";
    }
    proto.aggregator.ListTasksReq = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.ListTasksReq.repeatedFields_, null);
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
    proto.aggregator.ListTasksResp.Item = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.ListTasksResp.Item, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ListTasksResp.Item.displayName = "proto.aggregator.ListTasksResp.Item";
    }
    proto.aggregator.ListExecutionsReq = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.ListExecutionsReq.repeatedFields_, null);
    };
    goog.inherits(proto.aggregator.ListExecutionsReq, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ListExecutionsReq.displayName = "proto.aggregator.ListExecutionsReq";
    }
    proto.aggregator.ListExecutionsResp = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.ListExecutionsResp.repeatedFields_, null);
    };
    goog.inherits(proto.aggregator.ListExecutionsResp, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.ListExecutionsResp.displayName = "proto.aggregator.ListExecutionsResp";
    }
    proto.aggregator.GetExecutionReq = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.GetExecutionReq, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.GetExecutionReq.displayName = "proto.aggregator.GetExecutionReq";
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
    proto.aggregator.TriggerMetadata = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.TriggerMetadata, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.TriggerMetadata.displayName = "proto.aggregator.TriggerMetadata";
    }
    proto.aggregator.GetWalletReq = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.GetWalletReq, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.GetWalletReq.displayName = "proto.aggregator.GetWalletReq";
    }
    proto.aggregator.GetWalletResp = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.GetWalletResp, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.GetWalletResp.displayName = "proto.aggregator.GetWalletResp";
    }
    proto.aggregator.UserTriggerTaskReq = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.UserTriggerTaskReq, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.UserTriggerTaskReq.displayName = "proto.aggregator.UserTriggerTaskReq";
    }
    proto.aggregator.UserTriggerTaskResp = function(opt_data) {
      jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    };
    goog.inherits(proto.aggregator.UserTriggerTaskResp, jspb.Message);
    if (goog.DEBUG && !COMPILED) {
      proto.aggregator.UserTriggerTaskResp.displayName = "proto.aggregator.UserTriggerTaskResp";
    }
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.IdReq.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.IdReq.toObject(opt_includeInstance, this);
      };
      proto.aggregator.IdReq.toObject = function(includeInstance, msg) {
        var f, obj = {
          id: jspb.Message.getFieldWithDefault(msg, 1, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.IdReq.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.IdReq();
      return proto.aggregator.IdReq.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.IdReq.deserializeBinaryFromReader = function(msg, reader) {
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
    proto.aggregator.IdReq.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.IdReq.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.IdReq.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getId();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
    };
    proto.aggregator.IdReq.prototype.getId = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.IdReq.prototype.setId = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.FixedTimeCondition.repeatedFields_ = [1];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.FixedTimeCondition.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.FixedTimeCondition.toObject(opt_includeInstance, this);
      };
      proto.aggregator.FixedTimeCondition.toObject = function(includeInstance, msg) {
        var f, obj = {
          epochsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? void 0 : f
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.FixedTimeCondition.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.FixedTimeCondition();
      return proto.aggregator.FixedTimeCondition.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.FixedTimeCondition.deserializeBinaryFromReader = function(msg, reader) {
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
              msg.addEpochs(values[i]);
            }
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.FixedTimeCondition.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.FixedTimeCondition.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.FixedTimeCondition.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getEpochsList();
      if (f.length > 0) {
        writer.writePackedInt64(
          1,
          f
        );
      }
    };
    proto.aggregator.FixedTimeCondition.prototype.getEpochsList = function() {
      return (
        /** @type {!Array<number>} */
        jspb.Message.getRepeatedField(this, 1)
      );
    };
    proto.aggregator.FixedTimeCondition.prototype.setEpochsList = function(value) {
      return jspb.Message.setField(this, 1, value || []);
    };
    proto.aggregator.FixedTimeCondition.prototype.addEpochs = function(value, opt_index) {
      return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
    };
    proto.aggregator.FixedTimeCondition.prototype.clearEpochsList = function() {
      return this.setEpochsList([]);
    };
    proto.aggregator.CronCondition.repeatedFields_ = [1];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.CronCondition.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.CronCondition.toObject(opt_includeInstance, this);
      };
      proto.aggregator.CronCondition.toObject = function(includeInstance, msg) {
        var f, obj = {
          scheduleList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? void 0 : f
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
            msg.addSchedule(value);
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
      f = message.getScheduleList();
      if (f.length > 0) {
        writer.writeRepeatedString(
          1,
          f
        );
      }
    };
    proto.aggregator.CronCondition.prototype.getScheduleList = function() {
      return (
        /** @type {!Array<string>} */
        jspb.Message.getRepeatedField(this, 1)
      );
    };
    proto.aggregator.CronCondition.prototype.setScheduleList = function(value) {
      return jspb.Message.setField(this, 1, value || []);
    };
    proto.aggregator.CronCondition.prototype.addSchedule = function(value, opt_index) {
      return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
    };
    proto.aggregator.CronCondition.prototype.clearScheduleList = function() {
      return this.setScheduleList([]);
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
    proto.aggregator.TaskTrigger.TriggerTypeCase = {
      TRIGGER_TYPE_NOT_SET: 0,
      MANUAL: 2,
      FIXED_TIME: 3,
      CRON: 4,
      BLOCK: 5,
      EVENT: 6
    };
    proto.aggregator.TaskTrigger.prototype.getTriggerTypeCase = function() {
      return (
        /** @type {proto.aggregator.TaskTrigger.TriggerTypeCase} */
        jspb.Message.computeOneofCase(this, proto.aggregator.TaskTrigger.oneofGroups_[0])
      );
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.TaskTrigger.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.TaskTrigger.toObject(opt_includeInstance, this);
      };
      proto.aggregator.TaskTrigger.toObject = function(includeInstance, msg) {
        var f, obj = {
          name: jspb.Message.getFieldWithDefault(msg, 1, ""),
          manual: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
          fixedTime: (f = msg.getFixedTime()) && proto.aggregator.FixedTimeCondition.toObject(includeInstance, f),
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
              /** @type {string} */
              reader.readString()
            );
            msg.setName(value);
            break;
          case 2:
            var value = (
              /** @type {boolean} */
              reader.readBool()
            );
            msg.setManual(value);
            break;
          case 3:
            var value = new proto.aggregator.FixedTimeCondition();
            reader.readMessage(value, proto.aggregator.FixedTimeCondition.deserializeBinaryFromReader);
            msg.setFixedTime(value);
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
      f = message.getName();
      if (f.length > 0) {
        writer.writeString(
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
      f = message.getFixedTime();
      if (f != null) {
        writer.writeMessage(
          3,
          f,
          proto.aggregator.FixedTimeCondition.serializeBinaryToWriter
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
    proto.aggregator.TaskTrigger.prototype.getName = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.TaskTrigger.prototype.setName = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
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
    proto.aggregator.TaskTrigger.prototype.getFixedTime = function() {
      return (
        /** @type{?proto.aggregator.FixedTimeCondition} */
        jspb.Message.getWrapperField(this, proto.aggregator.FixedTimeCondition, 3)
      );
    };
    proto.aggregator.TaskTrigger.prototype.setFixedTime = function(value) {
      return jspb.Message.setOneofWrapperField(this, 3, proto.aggregator.TaskTrigger.oneofGroups_[0], value);
    };
    proto.aggregator.TaskTrigger.prototype.clearFixedTime = function() {
      return this.setFixedTime(void 0);
    };
    proto.aggregator.TaskTrigger.prototype.hasFixedTime = function() {
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
      proto.aggregator.ContractReadNode.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ContractReadNode.toObject(opt_includeInstance, this);
      };
      proto.aggregator.ContractReadNode.toObject = function(includeInstance, msg) {
        var f, obj = {
          contractAddress: jspb.Message.getFieldWithDefault(msg, 1, ""),
          callData: jspb.Message.getFieldWithDefault(msg, 2, ""),
          contractAbi: jspb.Message.getFieldWithDefault(msg, 3, ""),
          method: jspb.Message.getFieldWithDefault(msg, 4, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.ContractReadNode.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.ContractReadNode();
      return proto.aggregator.ContractReadNode.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.ContractReadNode.deserializeBinaryFromReader = function(msg, reader) {
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
    proto.aggregator.ContractReadNode.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.ContractReadNode.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.ContractReadNode.serializeBinaryToWriter = function(message, writer) {
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
      f = message.getMethod();
      if (f.length > 0) {
        writer.writeString(
          4,
          f
        );
      }
    };
    proto.aggregator.ContractReadNode.prototype.getContractAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.ContractReadNode.prototype.setContractAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.ContractReadNode.prototype.getCallData = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.ContractReadNode.prototype.setCallData = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.ContractReadNode.prototype.getContractAbi = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.ContractReadNode.prototype.setContractAbi = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    proto.aggregator.ContractReadNode.prototype.getMethod = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 4, "")
      );
    };
    proto.aggregator.ContractReadNode.prototype.setMethod = function(value) {
      return jspb.Message.setProto3StringField(this, 4, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.GraphQLQueryNode.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.GraphQLQueryNode.toObject(opt_includeInstance, this);
      };
      proto.aggregator.GraphQLQueryNode.toObject = function(includeInstance, msg) {
        var f, obj = {
          url: jspb.Message.getFieldWithDefault(msg, 1, ""),
          query: jspb.Message.getFieldWithDefault(msg, 2, ""),
          variablesMap: (f = msg.getVariablesMap()) ? f.toObject(includeInstance, void 0) : []
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
          case 3:
            var value = msg.getVariablesMap();
            reader.readMessage(value, function(message, reader2) {
              jspb.Map.deserializeBinary(message, reader2, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
            });
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
      f = message.getVariablesMap(true);
      if (f && f.getLength() > 0) {
        f.serializeBinary(3, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
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
    proto.aggregator.GraphQLQueryNode.prototype.getVariablesMap = function(opt_noLazyCreate) {
      return (
        /** @type {!jspb.Map<string,string>} */
        jspb.Message.getMapField(
          this,
          3,
          opt_noLazyCreate,
          null
        )
      );
    };
    proto.aggregator.GraphQLQueryNode.prototype.clearVariablesMap = function() {
      this.getVariablesMap().clear();
      return this;
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
          lang: jspb.Message.getFieldWithDefault(msg, 1, 0),
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
              /** @type {!proto.aggregator.CustomCodeLang} */
              reader.readEnum()
            );
            msg.setLang(value);
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
      f = message.getLang();
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
    proto.aggregator.CustomCodeNode.prototype.getLang = function() {
      return (
        /** @type {!proto.aggregator.CustomCodeLang} */
        jspb.Message.getFieldWithDefault(this, 1, 0)
      );
    };
    proto.aggregator.CustomCodeNode.prototype.setLang = function(value) {
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
      proto.aggregator.Condition.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.Condition.toObject(opt_includeInstance, this);
      };
      proto.aggregator.Condition.toObject = function(includeInstance, msg) {
        var f, obj = {
          id: jspb.Message.getFieldWithDefault(msg, 1, ""),
          type: jspb.Message.getFieldWithDefault(msg, 2, ""),
          expression: jspb.Message.getFieldWithDefault(msg, 3, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.Condition.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.Condition();
      return proto.aggregator.Condition.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.Condition.deserializeBinaryFromReader = function(msg, reader) {
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
            msg.setType(value);
            break;
          case 3:
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
    proto.aggregator.Condition.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.Condition.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.Condition.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getId();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
      f = message.getType();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
      f = message.getExpression();
      if (f.length > 0) {
        writer.writeString(
          3,
          f
        );
      }
    };
    proto.aggregator.Condition.prototype.getId = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.Condition.prototype.setId = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.Condition.prototype.getType = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.Condition.prototype.setType = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.Condition.prototype.getExpression = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.Condition.prototype.setExpression = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    proto.aggregator.BranchNode.repeatedFields_ = [1];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.BranchNode.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.BranchNode.toObject(opt_includeInstance, this);
      };
      proto.aggregator.BranchNode.toObject = function(includeInstance, msg) {
        var f, obj = {
          conditionsList: jspb.Message.toObjectList(
            msg.getConditionsList(),
            proto.aggregator.Condition.toObject,
            includeInstance
          )
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
            var value = new proto.aggregator.Condition();
            reader.readMessage(value, proto.aggregator.Condition.deserializeBinaryFromReader);
            msg.addConditions(value);
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
      f = message.getConditionsList();
      if (f.length > 0) {
        writer.writeRepeatedMessage(
          1,
          f,
          proto.aggregator.Condition.serializeBinaryToWriter
        );
      }
    };
    proto.aggregator.BranchNode.prototype.getConditionsList = function() {
      return (
        /** @type{!Array<!proto.aggregator.Condition>} */
        jspb.Message.getRepeatedWrapperField(this, proto.aggregator.Condition, 1)
      );
    };
    proto.aggregator.BranchNode.prototype.setConditionsList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 1, value);
    };
    proto.aggregator.BranchNode.prototype.addConditions = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.aggregator.Condition, opt_index);
    };
    proto.aggregator.BranchNode.prototype.clearConditionsList = function() {
      return this.setConditionsList([]);
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
    proto.aggregator.LoopNode.oneofGroups_ = [[10, 11, 12, 13, 14, 15]];
    proto.aggregator.LoopNode.RunnerCase = {
      RUNNER_NOT_SET: 0,
      ETH_TRANSFER: 10,
      CONTRACT_WRITE: 11,
      CONTRACT_READ: 12,
      GRAPHQL_DATA_QUERY: 13,
      REST_API: 14,
      CUSTOM_CODE: 15
    };
    proto.aggregator.LoopNode.prototype.getRunnerCase = function() {
      return (
        /** @type {proto.aggregator.LoopNode.RunnerCase} */
        jspb.Message.computeOneofCase(this, proto.aggregator.LoopNode.oneofGroups_[0])
      );
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.LoopNode.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.LoopNode.toObject(opt_includeInstance, this);
      };
      proto.aggregator.LoopNode.toObject = function(includeInstance, msg) {
        var f, obj = {
          input: jspb.Message.getFieldWithDefault(msg, 1, ""),
          iterVal: jspb.Message.getFieldWithDefault(msg, 2, ""),
          iterKey: jspb.Message.getFieldWithDefault(msg, 3, ""),
          ethTransfer: (f = msg.getEthTransfer()) && proto.aggregator.ETHTransferNode.toObject(includeInstance, f),
          contractWrite: (f = msg.getContractWrite()) && proto.aggregator.ContractWriteNode.toObject(includeInstance, f),
          contractRead: (f = msg.getContractRead()) && proto.aggregator.ContractReadNode.toObject(includeInstance, f),
          graphqlDataQuery: (f = msg.getGraphqlDataQuery()) && proto.aggregator.GraphQLQueryNode.toObject(includeInstance, f),
          restApi: (f = msg.getRestApi()) && proto.aggregator.RestAPINode.toObject(includeInstance, f),
          customCode: (f = msg.getCustomCode()) && proto.aggregator.CustomCodeNode.toObject(includeInstance, f)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.LoopNode.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.LoopNode();
      return proto.aggregator.LoopNode.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.LoopNode.deserializeBinaryFromReader = function(msg, reader) {
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
            msg.setInput(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setIterVal(value);
            break;
          case 3:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setIterKey(value);
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
            var value = new proto.aggregator.ContractReadNode();
            reader.readMessage(value, proto.aggregator.ContractReadNode.deserializeBinaryFromReader);
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
    proto.aggregator.LoopNode.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.LoopNode.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.LoopNode.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getInput();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
      f = message.getIterVal();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
      f = message.getIterKey();
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
          proto.aggregator.ContractReadNode.serializeBinaryToWriter
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
      f = message.getCustomCode();
      if (f != null) {
        writer.writeMessage(
          15,
          f,
          proto.aggregator.CustomCodeNode.serializeBinaryToWriter
        );
      }
    };
    proto.aggregator.LoopNode.prototype.getInput = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.LoopNode.prototype.setInput = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.LoopNode.prototype.getIterVal = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.LoopNode.prototype.setIterVal = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.LoopNode.prototype.getIterKey = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.LoopNode.prototype.setIterKey = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    proto.aggregator.LoopNode.prototype.getEthTransfer = function() {
      return (
        /** @type{?proto.aggregator.ETHTransferNode} */
        jspb.Message.getWrapperField(this, proto.aggregator.ETHTransferNode, 10)
      );
    };
    proto.aggregator.LoopNode.prototype.setEthTransfer = function(value) {
      return jspb.Message.setOneofWrapperField(this, 10, proto.aggregator.LoopNode.oneofGroups_[0], value);
    };
    proto.aggregator.LoopNode.prototype.clearEthTransfer = function() {
      return this.setEthTransfer(void 0);
    };
    proto.aggregator.LoopNode.prototype.hasEthTransfer = function() {
      return jspb.Message.getField(this, 10) != null;
    };
    proto.aggregator.LoopNode.prototype.getContractWrite = function() {
      return (
        /** @type{?proto.aggregator.ContractWriteNode} */
        jspb.Message.getWrapperField(this, proto.aggregator.ContractWriteNode, 11)
      );
    };
    proto.aggregator.LoopNode.prototype.setContractWrite = function(value) {
      return jspb.Message.setOneofWrapperField(this, 11, proto.aggregator.LoopNode.oneofGroups_[0], value);
    };
    proto.aggregator.LoopNode.prototype.clearContractWrite = function() {
      return this.setContractWrite(void 0);
    };
    proto.aggregator.LoopNode.prototype.hasContractWrite = function() {
      return jspb.Message.getField(this, 11) != null;
    };
    proto.aggregator.LoopNode.prototype.getContractRead = function() {
      return (
        /** @type{?proto.aggregator.ContractReadNode} */
        jspb.Message.getWrapperField(this, proto.aggregator.ContractReadNode, 12)
      );
    };
    proto.aggregator.LoopNode.prototype.setContractRead = function(value) {
      return jspb.Message.setOneofWrapperField(this, 12, proto.aggregator.LoopNode.oneofGroups_[0], value);
    };
    proto.aggregator.LoopNode.prototype.clearContractRead = function() {
      return this.setContractRead(void 0);
    };
    proto.aggregator.LoopNode.prototype.hasContractRead = function() {
      return jspb.Message.getField(this, 12) != null;
    };
    proto.aggregator.LoopNode.prototype.getGraphqlDataQuery = function() {
      return (
        /** @type{?proto.aggregator.GraphQLQueryNode} */
        jspb.Message.getWrapperField(this, proto.aggregator.GraphQLQueryNode, 13)
      );
    };
    proto.aggregator.LoopNode.prototype.setGraphqlDataQuery = function(value) {
      return jspb.Message.setOneofWrapperField(this, 13, proto.aggregator.LoopNode.oneofGroups_[0], value);
    };
    proto.aggregator.LoopNode.prototype.clearGraphqlDataQuery = function() {
      return this.setGraphqlDataQuery(void 0);
    };
    proto.aggregator.LoopNode.prototype.hasGraphqlDataQuery = function() {
      return jspb.Message.getField(this, 13) != null;
    };
    proto.aggregator.LoopNode.prototype.getRestApi = function() {
      return (
        /** @type{?proto.aggregator.RestAPINode} */
        jspb.Message.getWrapperField(this, proto.aggregator.RestAPINode, 14)
      );
    };
    proto.aggregator.LoopNode.prototype.setRestApi = function(value) {
      return jspb.Message.setOneofWrapperField(this, 14, proto.aggregator.LoopNode.oneofGroups_[0], value);
    };
    proto.aggregator.LoopNode.prototype.clearRestApi = function() {
      return this.setRestApi(void 0);
    };
    proto.aggregator.LoopNode.prototype.hasRestApi = function() {
      return jspb.Message.getField(this, 14) != null;
    };
    proto.aggregator.LoopNode.prototype.getCustomCode = function() {
      return (
        /** @type{?proto.aggregator.CustomCodeNode} */
        jspb.Message.getWrapperField(this, proto.aggregator.CustomCodeNode, 15)
      );
    };
    proto.aggregator.LoopNode.prototype.setCustomCode = function(value) {
      return jspb.Message.setOneofWrapperField(this, 15, proto.aggregator.LoopNode.oneofGroups_[0], value);
    };
    proto.aggregator.LoopNode.prototype.clearCustomCode = function() {
      return this.setCustomCode(void 0);
    };
    proto.aggregator.LoopNode.prototype.hasCustomCode = function() {
      return jspb.Message.getField(this, 15) != null;
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
    proto.aggregator.TaskNode.oneofGroups_ = [[10, 11, 12, 13, 14, 15, 16, 17, 18]];
    proto.aggregator.TaskNode.TaskTypeCase = {
      TASK_TYPE_NOT_SET: 0,
      ETH_TRANSFER: 10,
      CONTRACT_WRITE: 11,
      CONTRACT_READ: 12,
      GRAPHQL_QUERY: 13,
      REST_API: 14,
      BRANCH: 15,
      FILTER: 16,
      LOOP: 17,
      CUSTOM_CODE: 18
    };
    proto.aggregator.TaskNode.prototype.getTaskTypeCase = function() {
      return (
        /** @type {proto.aggregator.TaskNode.TaskTypeCase} */
        jspb.Message.computeOneofCase(this, proto.aggregator.TaskNode.oneofGroups_[0])
      );
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.TaskNode.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.TaskNode.toObject(opt_includeInstance, this);
      };
      proto.aggregator.TaskNode.toObject = function(includeInstance, msg) {
        var f, obj = {
          id: jspb.Message.getFieldWithDefault(msg, 2, ""),
          name: jspb.Message.getFieldWithDefault(msg, 3, ""),
          ethTransfer: (f = msg.getEthTransfer()) && proto.aggregator.ETHTransferNode.toObject(includeInstance, f),
          contractWrite: (f = msg.getContractWrite()) && proto.aggregator.ContractWriteNode.toObject(includeInstance, f),
          contractRead: (f = msg.getContractRead()) && proto.aggregator.ContractReadNode.toObject(includeInstance, f),
          graphqlQuery: (f = msg.getGraphqlQuery()) && proto.aggregator.GraphQLQueryNode.toObject(includeInstance, f),
          restApi: (f = msg.getRestApi()) && proto.aggregator.RestAPINode.toObject(includeInstance, f),
          branch: (f = msg.getBranch()) && proto.aggregator.BranchNode.toObject(includeInstance, f),
          filter: (f = msg.getFilter()) && proto.aggregator.FilterNode.toObject(includeInstance, f),
          loop: (f = msg.getLoop()) && proto.aggregator.LoopNode.toObject(includeInstance, f),
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
            var value = new proto.aggregator.ContractReadNode();
            reader.readMessage(value, proto.aggregator.ContractReadNode.deserializeBinaryFromReader);
            msg.setContractRead(value);
            break;
          case 13:
            var value = new proto.aggregator.GraphQLQueryNode();
            reader.readMessage(value, proto.aggregator.GraphQLQueryNode.deserializeBinaryFromReader);
            msg.setGraphqlQuery(value);
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
            var value = new proto.aggregator.LoopNode();
            reader.readMessage(value, proto.aggregator.LoopNode.deserializeBinaryFromReader);
            msg.setLoop(value);
            break;
          case 18:
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
          proto.aggregator.ContractReadNode.serializeBinaryToWriter
        );
      }
      f = message.getGraphqlQuery();
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
      f = message.getLoop();
      if (f != null) {
        writer.writeMessage(
          17,
          f,
          proto.aggregator.LoopNode.serializeBinaryToWriter
        );
      }
      f = message.getCustomCode();
      if (f != null) {
        writer.writeMessage(
          18,
          f,
          proto.aggregator.CustomCodeNode.serializeBinaryToWriter
        );
      }
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
        /** @type{?proto.aggregator.ContractReadNode} */
        jspb.Message.getWrapperField(this, proto.aggregator.ContractReadNode, 12)
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
    proto.aggregator.TaskNode.prototype.getGraphqlQuery = function() {
      return (
        /** @type{?proto.aggregator.GraphQLQueryNode} */
        jspb.Message.getWrapperField(this, proto.aggregator.GraphQLQueryNode, 13)
      );
    };
    proto.aggregator.TaskNode.prototype.setGraphqlQuery = function(value) {
      return jspb.Message.setOneofWrapperField(this, 13, proto.aggregator.TaskNode.oneofGroups_[0], value);
    };
    proto.aggregator.TaskNode.prototype.clearGraphqlQuery = function() {
      return this.setGraphqlQuery(void 0);
    };
    proto.aggregator.TaskNode.prototype.hasGraphqlQuery = function() {
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
    proto.aggregator.TaskNode.prototype.getLoop = function() {
      return (
        /** @type{?proto.aggregator.LoopNode} */
        jspb.Message.getWrapperField(this, proto.aggregator.LoopNode, 17)
      );
    };
    proto.aggregator.TaskNode.prototype.setLoop = function(value) {
      return jspb.Message.setOneofWrapperField(this, 17, proto.aggregator.TaskNode.oneofGroups_[0], value);
    };
    proto.aggregator.TaskNode.prototype.clearLoop = function() {
      return this.setLoop(void 0);
    };
    proto.aggregator.TaskNode.prototype.hasLoop = function() {
      return jspb.Message.getField(this, 17) != null;
    };
    proto.aggregator.TaskNode.prototype.getCustomCode = function() {
      return (
        /** @type{?proto.aggregator.CustomCodeNode} */
        jspb.Message.getWrapperField(this, proto.aggregator.CustomCodeNode, 18)
      );
    };
    proto.aggregator.TaskNode.prototype.setCustomCode = function(value) {
      return jspb.Message.setOneofWrapperField(this, 18, proto.aggregator.TaskNode.oneofGroups_[0], value);
    };
    proto.aggregator.TaskNode.prototype.clearCustomCode = function() {
      return this.setCustomCode(void 0);
    };
    proto.aggregator.TaskNode.prototype.hasCustomCode = function() {
      return jspb.Message.getField(this, 18) != null;
    };
    proto.aggregator.Execution.repeatedFields_ = [8];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.Execution.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.Execution.toObject(opt_includeInstance, this);
      };
      proto.aggregator.Execution.toObject = function(includeInstance, msg) {
        var f, obj = {
          id: jspb.Message.getFieldWithDefault(msg, 1, ""),
          startAt: jspb.Message.getFieldWithDefault(msg, 2, 0),
          endAt: jspb.Message.getFieldWithDefault(msg, 3, 0),
          success: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
          error: jspb.Message.getFieldWithDefault(msg, 5, ""),
          triggerMetadata: (f = msg.getTriggerMetadata()) && proto.aggregator.TriggerMetadata.toObject(includeInstance, f),
          result: jspb.Message.getFieldWithDefault(msg, 7, ""),
          stepsList: jspb.Message.toObjectList(
            msg.getStepsList(),
            proto.aggregator.Execution.Step.toObject,
            includeInstance
          )
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
              /** @type {string} */
              reader.readString()
            );
            msg.setId(value);
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
            msg.setEndAt(value);
            break;
          case 4:
            var value = (
              /** @type {boolean} */
              reader.readBool()
            );
            msg.setSuccess(value);
            break;
          case 5:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setError(value);
            break;
          case 6:
            var value = new proto.aggregator.TriggerMetadata();
            reader.readMessage(value, proto.aggregator.TriggerMetadata.deserializeBinaryFromReader);
            msg.setTriggerMetadata(value);
            break;
          case 7:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setResult(value);
            break;
          case 8:
            var value = new proto.aggregator.Execution.Step();
            reader.readMessage(value, proto.aggregator.Execution.Step.deserializeBinaryFromReader);
            msg.addSteps(value);
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
      f = message.getId();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
      f = message.getStartAt();
      if (f !== 0) {
        writer.writeInt64(
          2,
          f
        );
      }
      f = message.getEndAt();
      if (f !== 0) {
        writer.writeInt64(
          3,
          f
        );
      }
      f = message.getSuccess();
      if (f) {
        writer.writeBool(
          4,
          f
        );
      }
      f = message.getError();
      if (f.length > 0) {
        writer.writeString(
          5,
          f
        );
      }
      f = message.getTriggerMetadata();
      if (f != null) {
        writer.writeMessage(
          6,
          f,
          proto.aggregator.TriggerMetadata.serializeBinaryToWriter
        );
      }
      f = message.getResult();
      if (f.length > 0) {
        writer.writeString(
          7,
          f
        );
      }
      f = message.getStepsList();
      if (f.length > 0) {
        writer.writeRepeatedMessage(
          8,
          f,
          proto.aggregator.Execution.Step.serializeBinaryToWriter
        );
      }
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.Execution.Step.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.Execution.Step.toObject(opt_includeInstance, this);
      };
      proto.aggregator.Execution.Step.toObject = function(includeInstance, msg) {
        var f, obj = {
          nodeId: jspb.Message.getFieldWithDefault(msg, 1, ""),
          success: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
          outputData: jspb.Message.getFieldWithDefault(msg, 3, ""),
          log: jspb.Message.getFieldWithDefault(msg, 4, ""),
          error: jspb.Message.getFieldWithDefault(msg, 5, ""),
          startAt: jspb.Message.getFieldWithDefault(msg, 6, 0),
          endAt: jspb.Message.getFieldWithDefault(msg, 7, 0)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.Execution.Step.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.Execution.Step();
      return proto.aggregator.Execution.Step.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.Execution.Step.deserializeBinaryFromReader = function(msg, reader) {
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
            msg.setNodeId(value);
            break;
          case 2:
            var value = (
              /** @type {boolean} */
              reader.readBool()
            );
            msg.setSuccess(value);
            break;
          case 3:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setOutputData(value);
            break;
          case 4:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setLog(value);
            break;
          case 5:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setError(value);
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
            msg.setEndAt(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.Execution.Step.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.Execution.Step.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.Execution.Step.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getNodeId();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
      f = message.getSuccess();
      if (f) {
        writer.writeBool(
          2,
          f
        );
      }
      f = message.getOutputData();
      if (f.length > 0) {
        writer.writeString(
          3,
          f
        );
      }
      f = message.getLog();
      if (f.length > 0) {
        writer.writeString(
          4,
          f
        );
      }
      f = message.getError();
      if (f.length > 0) {
        writer.writeString(
          5,
          f
        );
      }
      f = message.getStartAt();
      if (f !== 0) {
        writer.writeInt64(
          6,
          f
        );
      }
      f = message.getEndAt();
      if (f !== 0) {
        writer.writeInt64(
          7,
          f
        );
      }
    };
    proto.aggregator.Execution.Step.prototype.getNodeId = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.Execution.Step.prototype.setNodeId = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.Execution.Step.prototype.getSuccess = function() {
      return (
        /** @type {boolean} */
        jspb.Message.getBooleanFieldWithDefault(this, 2, false)
      );
    };
    proto.aggregator.Execution.Step.prototype.setSuccess = function(value) {
      return jspb.Message.setProto3BooleanField(this, 2, value);
    };
    proto.aggregator.Execution.Step.prototype.getOutputData = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.Execution.Step.prototype.setOutputData = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    proto.aggregator.Execution.Step.prototype.getLog = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 4, "")
      );
    };
    proto.aggregator.Execution.Step.prototype.setLog = function(value) {
      return jspb.Message.setProto3StringField(this, 4, value);
    };
    proto.aggregator.Execution.Step.prototype.getError = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 5, "")
      );
    };
    proto.aggregator.Execution.Step.prototype.setError = function(value) {
      return jspb.Message.setProto3StringField(this, 5, value);
    };
    proto.aggregator.Execution.Step.prototype.getStartAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 6, 0)
      );
    };
    proto.aggregator.Execution.Step.prototype.setStartAt = function(value) {
      return jspb.Message.setProto3IntField(this, 6, value);
    };
    proto.aggregator.Execution.Step.prototype.getEndAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 7, 0)
      );
    };
    proto.aggregator.Execution.Step.prototype.setEndAt = function(value) {
      return jspb.Message.setProto3IntField(this, 7, value);
    };
    proto.aggregator.Execution.prototype.getId = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.Execution.prototype.setId = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.Execution.prototype.getStartAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 2, 0)
      );
    };
    proto.aggregator.Execution.prototype.setStartAt = function(value) {
      return jspb.Message.setProto3IntField(this, 2, value);
    };
    proto.aggregator.Execution.prototype.getEndAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 3, 0)
      );
    };
    proto.aggregator.Execution.prototype.setEndAt = function(value) {
      return jspb.Message.setProto3IntField(this, 3, value);
    };
    proto.aggregator.Execution.prototype.getSuccess = function() {
      return (
        /** @type {boolean} */
        jspb.Message.getBooleanFieldWithDefault(this, 4, false)
      );
    };
    proto.aggregator.Execution.prototype.setSuccess = function(value) {
      return jspb.Message.setProto3BooleanField(this, 4, value);
    };
    proto.aggregator.Execution.prototype.getError = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 5, "")
      );
    };
    proto.aggregator.Execution.prototype.setError = function(value) {
      return jspb.Message.setProto3StringField(this, 5, value);
    };
    proto.aggregator.Execution.prototype.getTriggerMetadata = function() {
      return (
        /** @type{?proto.aggregator.TriggerMetadata} */
        jspb.Message.getWrapperField(this, proto.aggregator.TriggerMetadata, 6)
      );
    };
    proto.aggregator.Execution.prototype.setTriggerMetadata = function(value) {
      return jspb.Message.setWrapperField(this, 6, value);
    };
    proto.aggregator.Execution.prototype.clearTriggerMetadata = function() {
      return this.setTriggerMetadata(void 0);
    };
    proto.aggregator.Execution.prototype.hasTriggerMetadata = function() {
      return jspb.Message.getField(this, 6) != null;
    };
    proto.aggregator.Execution.prototype.getResult = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 7, "")
      );
    };
    proto.aggregator.Execution.prototype.setResult = function(value) {
      return jspb.Message.setProto3StringField(this, 7, value);
    };
    proto.aggregator.Execution.prototype.getStepsList = function() {
      return (
        /** @type{!Array<!proto.aggregator.Execution.Step>} */
        jspb.Message.getRepeatedWrapperField(this, proto.aggregator.Execution.Step, 8)
      );
    };
    proto.aggregator.Execution.prototype.setStepsList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 8, value);
    };
    proto.aggregator.Execution.prototype.addSteps = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.aggregator.Execution.Step, opt_index);
    };
    proto.aggregator.Execution.prototype.clearStepsList = function() {
      return this.setStepsList([]);
    };
    proto.aggregator.Task.repeatedFields_ = [13, 14];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.Task.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.Task.toObject(opt_includeInstance, this);
      };
      proto.aggregator.Task.toObject = function(includeInstance, msg) {
        var f, obj = {
          id: jspb.Message.getFieldWithDefault(msg, 1, ""),
          owner: jspb.Message.getFieldWithDefault(msg, 2, ""),
          smartWalletAddress: jspb.Message.getFieldWithDefault(msg, 3, ""),
          startAt: jspb.Message.getFieldWithDefault(msg, 4, 0),
          expiredAt: jspb.Message.getFieldWithDefault(msg, 5, 0),
          memo: jspb.Message.getFieldWithDefault(msg, 6, ""),
          completedAt: jspb.Message.getFieldWithDefault(msg, 7, 0),
          maxExecution: jspb.Message.getFieldWithDefault(msg, 8, 0),
          totalExecution: jspb.Message.getFieldWithDefault(msg, 9, 0),
          lastRanAt: jspb.Message.getFieldWithDefault(msg, 10, 0),
          status: jspb.Message.getFieldWithDefault(msg, 11, 0),
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
            msg.setOwner(value);
            break;
          case 3:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setSmartWalletAddress(value);
            break;
          case 4:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setStartAt(value);
            break;
          case 5:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setExpiredAt(value);
            break;
          case 6:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setMemo(value);
            break;
          case 7:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setCompletedAt(value);
            break;
          case 8:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setMaxExecution(value);
            break;
          case 9:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setTotalExecution(value);
            break;
          case 10:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setLastRanAt(value);
            break;
          case 11:
            var value = (
              /** @type {!proto.aggregator.TaskStatus} */
              reader.readEnum()
            );
            msg.setStatus(value);
            break;
          case 12:
            var value = new proto.aggregator.TaskTrigger();
            reader.readMessage(value, proto.aggregator.TaskTrigger.deserializeBinaryFromReader);
            msg.setTrigger(value);
            break;
          case 13:
            var value = new proto.aggregator.TaskNode();
            reader.readMessage(value, proto.aggregator.TaskNode.deserializeBinaryFromReader);
            msg.addNodes(value);
            break;
          case 14:
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
    proto.aggregator.Task.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.Task.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.Task.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getId();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
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
          4,
          f
        );
      }
      f = message.getExpiredAt();
      if (f !== 0) {
        writer.writeInt64(
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
      f = message.getCompletedAt();
      if (f !== 0) {
        writer.writeInt64(
          7,
          f
        );
      }
      f = message.getMaxExecution();
      if (f !== 0) {
        writer.writeInt64(
          8,
          f
        );
      }
      f = message.getTotalExecution();
      if (f !== 0) {
        writer.writeInt64(
          9,
          f
        );
      }
      f = message.getLastRanAt();
      if (f !== 0) {
        writer.writeInt64(
          10,
          f
        );
      }
      f = message.getStatus();
      if (f !== 0) {
        writer.writeEnum(
          11,
          f
        );
      }
      f = message.getTrigger();
      if (f != null) {
        writer.writeMessage(
          12,
          f,
          proto.aggregator.TaskTrigger.serializeBinaryToWriter
        );
      }
      f = message.getNodesList();
      if (f.length > 0) {
        writer.writeRepeatedMessage(
          13,
          f,
          proto.aggregator.TaskNode.serializeBinaryToWriter
        );
      }
      f = message.getEdgesList();
      if (f.length > 0) {
        writer.writeRepeatedMessage(
          14,
          f,
          proto.aggregator.TaskEdge.serializeBinaryToWriter
        );
      }
    };
    proto.aggregator.Task.prototype.getId = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.Task.prototype.setId = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
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
        jspb.Message.getFieldWithDefault(this, 4, 0)
      );
    };
    proto.aggregator.Task.prototype.setStartAt = function(value) {
      return jspb.Message.setProto3IntField(this, 4, value);
    };
    proto.aggregator.Task.prototype.getExpiredAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 5, 0)
      );
    };
    proto.aggregator.Task.prototype.setExpiredAt = function(value) {
      return jspb.Message.setProto3IntField(this, 5, value);
    };
    proto.aggregator.Task.prototype.getMemo = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 6, "")
      );
    };
    proto.aggregator.Task.prototype.setMemo = function(value) {
      return jspb.Message.setProto3StringField(this, 6, value);
    };
    proto.aggregator.Task.prototype.getCompletedAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 7, 0)
      );
    };
    proto.aggregator.Task.prototype.setCompletedAt = function(value) {
      return jspb.Message.setProto3IntField(this, 7, value);
    };
    proto.aggregator.Task.prototype.getMaxExecution = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 8, 0)
      );
    };
    proto.aggregator.Task.prototype.setMaxExecution = function(value) {
      return jspb.Message.setProto3IntField(this, 8, value);
    };
    proto.aggregator.Task.prototype.getTotalExecution = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 9, 0)
      );
    };
    proto.aggregator.Task.prototype.setTotalExecution = function(value) {
      return jspb.Message.setProto3IntField(this, 9, value);
    };
    proto.aggregator.Task.prototype.getLastRanAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 10, 0)
      );
    };
    proto.aggregator.Task.prototype.setLastRanAt = function(value) {
      return jspb.Message.setProto3IntField(this, 10, value);
    };
    proto.aggregator.Task.prototype.getStatus = function() {
      return (
        /** @type {!proto.aggregator.TaskStatus} */
        jspb.Message.getFieldWithDefault(this, 11, 0)
      );
    };
    proto.aggregator.Task.prototype.setStatus = function(value) {
      return jspb.Message.setProto3EnumField(this, 11, value);
    };
    proto.aggregator.Task.prototype.getTrigger = function() {
      return (
        /** @type{?proto.aggregator.TaskTrigger} */
        jspb.Message.getWrapperField(this, proto.aggregator.TaskTrigger, 12)
      );
    };
    proto.aggregator.Task.prototype.setTrigger = function(value) {
      return jspb.Message.setWrapperField(this, 12, value);
    };
    proto.aggregator.Task.prototype.clearTrigger = function() {
      return this.setTrigger(void 0);
    };
    proto.aggregator.Task.prototype.hasTrigger = function() {
      return jspb.Message.getField(this, 12) != null;
    };
    proto.aggregator.Task.prototype.getNodesList = function() {
      return (
        /** @type{!Array<!proto.aggregator.TaskNode>} */
        jspb.Message.getRepeatedWrapperField(this, proto.aggregator.TaskNode, 13)
      );
    };
    proto.aggregator.Task.prototype.setNodesList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 13, value);
    };
    proto.aggregator.Task.prototype.addNodes = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(this, 13, opt_value, proto.aggregator.TaskNode, opt_index);
    };
    proto.aggregator.Task.prototype.clearNodesList = function() {
      return this.setNodesList([]);
    };
    proto.aggregator.Task.prototype.getEdgesList = function() {
      return (
        /** @type{!Array<!proto.aggregator.TaskEdge>} */
        jspb.Message.getRepeatedWrapperField(this, proto.aggregator.TaskEdge, 14)
      );
    };
    proto.aggregator.Task.prototype.setEdgesList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 14, value);
    };
    proto.aggregator.Task.prototype.addEdges = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(this, 14, opt_value, proto.aggregator.TaskEdge, opt_index);
    };
    proto.aggregator.Task.prototype.clearEdgesList = function() {
      return this.setEdgesList([]);
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
          maxExecution: jspb.Message.getFieldWithDefault(msg, 4, 0),
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
              /** @type {number} */
              reader.readInt64()
            );
            msg.setMaxExecution(value);
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
      f = message.getMaxExecution();
      if (f !== 0) {
        writer.writeInt64(
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
    proto.aggregator.CreateTaskReq.prototype.getMaxExecution = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 4, 0)
      );
    };
    proto.aggregator.CreateTaskReq.prototype.setMaxExecution = function(value) {
      return jspb.Message.setProto3IntField(this, 4, value);
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
      proto.aggregator.ListWalletReq.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ListWalletReq.toObject(opt_includeInstance, this);
      };
      proto.aggregator.ListWalletReq.toObject = function(includeInstance, msg) {
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
    proto.aggregator.ListWalletReq.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.ListWalletReq();
      return proto.aggregator.ListWalletReq.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.ListWalletReq.deserializeBinaryFromReader = function(msg, reader) {
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
    proto.aggregator.ListWalletReq.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.ListWalletReq.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.ListWalletReq.serializeBinaryToWriter = function(message, writer) {
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
    proto.aggregator.ListWalletReq.prototype.getFactory = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.ListWalletReq.prototype.setFactory = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.ListWalletReq.prototype.getSalt = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.ListWalletReq.prototype.setSalt = function(value) {
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
    proto.aggregator.ListWalletResp.repeatedFields_ = [1];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.ListWalletResp.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ListWalletResp.toObject(opt_includeInstance, this);
      };
      proto.aggregator.ListWalletResp.toObject = function(includeInstance, msg) {
        var f, obj = {
          itemsList: jspb.Message.toObjectList(
            msg.getItemsList(),
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
    proto.aggregator.ListWalletResp.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.ListWalletResp();
      return proto.aggregator.ListWalletResp.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.ListWalletResp.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = new proto.aggregator.SmartWallet();
            reader.readMessage(value, proto.aggregator.SmartWallet.deserializeBinaryFromReader);
            msg.addItems(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.ListWalletResp.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.ListWalletResp.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.ListWalletResp.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getItemsList();
      if (f.length > 0) {
        writer.writeRepeatedMessage(
          1,
          f,
          proto.aggregator.SmartWallet.serializeBinaryToWriter
        );
      }
    };
    proto.aggregator.ListWalletResp.prototype.getItemsList = function() {
      return (
        /** @type{!Array<!proto.aggregator.SmartWallet>} */
        jspb.Message.getRepeatedWrapperField(this, proto.aggregator.SmartWallet, 1)
      );
    };
    proto.aggregator.ListWalletResp.prototype.setItemsList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 1, value);
    };
    proto.aggregator.ListWalletResp.prototype.addItems = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.aggregator.SmartWallet, opt_index);
    };
    proto.aggregator.ListWalletResp.prototype.clearItemsList = function() {
      return this.setItemsList([]);
    };
    proto.aggregator.ListTasksReq.repeatedFields_ = [1];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.ListTasksReq.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ListTasksReq.toObject(opt_includeInstance, this);
      };
      proto.aggregator.ListTasksReq.toObject = function(includeInstance, msg) {
        var f, obj = {
          smartWalletAddressList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? void 0 : f,
          cursor: jspb.Message.getFieldWithDefault(msg, 2, ""),
          itemPerPage: jspb.Message.getFieldWithDefault(msg, 3, 0)
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
            msg.addSmartWalletAddress(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setCursor(value);
            break;
          case 3:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setItemPerPage(value);
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
      f = message.getSmartWalletAddressList();
      if (f.length > 0) {
        writer.writeRepeatedString(
          1,
          f
        );
      }
      f = message.getCursor();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
      f = message.getItemPerPage();
      if (f !== 0) {
        writer.writeInt64(
          3,
          f
        );
      }
    };
    proto.aggregator.ListTasksReq.prototype.getSmartWalletAddressList = function() {
      return (
        /** @type {!Array<string>} */
        jspb.Message.getRepeatedField(this, 1)
      );
    };
    proto.aggregator.ListTasksReq.prototype.setSmartWalletAddressList = function(value) {
      return jspb.Message.setField(this, 1, value || []);
    };
    proto.aggregator.ListTasksReq.prototype.addSmartWalletAddress = function(value, opt_index) {
      return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
    };
    proto.aggregator.ListTasksReq.prototype.clearSmartWalletAddressList = function() {
      return this.setSmartWalletAddressList([]);
    };
    proto.aggregator.ListTasksReq.prototype.getCursor = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.ListTasksReq.prototype.setCursor = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.ListTasksReq.prototype.getItemPerPage = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 3, 0)
      );
    };
    proto.aggregator.ListTasksReq.prototype.setItemPerPage = function(value) {
      return jspb.Message.setProto3IntField(this, 3, value);
    };
    proto.aggregator.ListTasksResp.repeatedFields_ = [1];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.ListTasksResp.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ListTasksResp.toObject(opt_includeInstance, this);
      };
      proto.aggregator.ListTasksResp.toObject = function(includeInstance, msg) {
        var f, obj = {
          itemsList: jspb.Message.toObjectList(
            msg.getItemsList(),
            proto.aggregator.ListTasksResp.Item.toObject,
            includeInstance
          ),
          cursor: jspb.Message.getFieldWithDefault(msg, 2, ""),
          hasMore: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
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
            var value = new proto.aggregator.ListTasksResp.Item();
            reader.readMessage(value, proto.aggregator.ListTasksResp.Item.deserializeBinaryFromReader);
            msg.addItems(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setCursor(value);
            break;
          case 3:
            var value = (
              /** @type {boolean} */
              reader.readBool()
            );
            msg.setHasMore(value);
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
      f = message.getItemsList();
      if (f.length > 0) {
        writer.writeRepeatedMessage(
          1,
          f,
          proto.aggregator.ListTasksResp.Item.serializeBinaryToWriter
        );
      }
      f = message.getCursor();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
      f = message.getHasMore();
      if (f) {
        writer.writeBool(
          3,
          f
        );
      }
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.ListTasksResp.Item.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ListTasksResp.Item.toObject(opt_includeInstance, this);
      };
      proto.aggregator.ListTasksResp.Item.toObject = function(includeInstance, msg) {
        var f, obj = {
          id: jspb.Message.getFieldWithDefault(msg, 1, ""),
          owner: jspb.Message.getFieldWithDefault(msg, 2, ""),
          smartWalletAddress: jspb.Message.getFieldWithDefault(msg, 3, ""),
          startAt: jspb.Message.getFieldWithDefault(msg, 4, 0),
          expiredAt: jspb.Message.getFieldWithDefault(msg, 5, 0),
          memo: jspb.Message.getFieldWithDefault(msg, 6, ""),
          completedAt: jspb.Message.getFieldWithDefault(msg, 7, 0),
          maxExecution: jspb.Message.getFieldWithDefault(msg, 8, 0),
          totalExecution: jspb.Message.getFieldWithDefault(msg, 9, 0),
          lastRanAt: jspb.Message.getFieldWithDefault(msg, 10, 0),
          status: jspb.Message.getFieldWithDefault(msg, 11, 0),
          trigger: (f = msg.getTrigger()) && proto.aggregator.TaskTrigger.toObject(includeInstance, f)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.ListTasksResp.Item.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.ListTasksResp.Item();
      return proto.aggregator.ListTasksResp.Item.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.ListTasksResp.Item.deserializeBinaryFromReader = function(msg, reader) {
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
            msg.setOwner(value);
            break;
          case 3:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setSmartWalletAddress(value);
            break;
          case 4:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setStartAt(value);
            break;
          case 5:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setExpiredAt(value);
            break;
          case 6:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setMemo(value);
            break;
          case 7:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setCompletedAt(value);
            break;
          case 8:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setMaxExecution(value);
            break;
          case 9:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setTotalExecution(value);
            break;
          case 10:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setLastRanAt(value);
            break;
          case 11:
            var value = (
              /** @type {!proto.aggregator.TaskStatus} */
              reader.readEnum()
            );
            msg.setStatus(value);
            break;
          case 12:
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
    proto.aggregator.ListTasksResp.Item.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.ListTasksResp.Item.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.ListTasksResp.Item.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getId();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
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
          4,
          f
        );
      }
      f = message.getExpiredAt();
      if (f !== 0) {
        writer.writeInt64(
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
      f = message.getCompletedAt();
      if (f !== 0) {
        writer.writeInt64(
          7,
          f
        );
      }
      f = message.getMaxExecution();
      if (f !== 0) {
        writer.writeInt64(
          8,
          f
        );
      }
      f = message.getTotalExecution();
      if (f !== 0) {
        writer.writeInt64(
          9,
          f
        );
      }
      f = message.getLastRanAt();
      if (f !== 0) {
        writer.writeInt64(
          10,
          f
        );
      }
      f = message.getStatus();
      if (f !== 0) {
        writer.writeEnum(
          11,
          f
        );
      }
      f = message.getTrigger();
      if (f != null) {
        writer.writeMessage(
          12,
          f,
          proto.aggregator.TaskTrigger.serializeBinaryToWriter
        );
      }
    };
    proto.aggregator.ListTasksResp.Item.prototype.getId = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.ListTasksResp.Item.prototype.setId = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.ListTasksResp.Item.prototype.getOwner = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.ListTasksResp.Item.prototype.setOwner = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.ListTasksResp.Item.prototype.getSmartWalletAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.ListTasksResp.Item.prototype.setSmartWalletAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    proto.aggregator.ListTasksResp.Item.prototype.getStartAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 4, 0)
      );
    };
    proto.aggregator.ListTasksResp.Item.prototype.setStartAt = function(value) {
      return jspb.Message.setProto3IntField(this, 4, value);
    };
    proto.aggregator.ListTasksResp.Item.prototype.getExpiredAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 5, 0)
      );
    };
    proto.aggregator.ListTasksResp.Item.prototype.setExpiredAt = function(value) {
      return jspb.Message.setProto3IntField(this, 5, value);
    };
    proto.aggregator.ListTasksResp.Item.prototype.getMemo = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 6, "")
      );
    };
    proto.aggregator.ListTasksResp.Item.prototype.setMemo = function(value) {
      return jspb.Message.setProto3StringField(this, 6, value);
    };
    proto.aggregator.ListTasksResp.Item.prototype.getCompletedAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 7, 0)
      );
    };
    proto.aggregator.ListTasksResp.Item.prototype.setCompletedAt = function(value) {
      return jspb.Message.setProto3IntField(this, 7, value);
    };
    proto.aggregator.ListTasksResp.Item.prototype.getMaxExecution = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 8, 0)
      );
    };
    proto.aggregator.ListTasksResp.Item.prototype.setMaxExecution = function(value) {
      return jspb.Message.setProto3IntField(this, 8, value);
    };
    proto.aggregator.ListTasksResp.Item.prototype.getTotalExecution = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 9, 0)
      );
    };
    proto.aggregator.ListTasksResp.Item.prototype.setTotalExecution = function(value) {
      return jspb.Message.setProto3IntField(this, 9, value);
    };
    proto.aggregator.ListTasksResp.Item.prototype.getLastRanAt = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 10, 0)
      );
    };
    proto.aggregator.ListTasksResp.Item.prototype.setLastRanAt = function(value) {
      return jspb.Message.setProto3IntField(this, 10, value);
    };
    proto.aggregator.ListTasksResp.Item.prototype.getStatus = function() {
      return (
        /** @type {!proto.aggregator.TaskStatus} */
        jspb.Message.getFieldWithDefault(this, 11, 0)
      );
    };
    proto.aggregator.ListTasksResp.Item.prototype.setStatus = function(value) {
      return jspb.Message.setProto3EnumField(this, 11, value);
    };
    proto.aggregator.ListTasksResp.Item.prototype.getTrigger = function() {
      return (
        /** @type{?proto.aggregator.TaskTrigger} */
        jspb.Message.getWrapperField(this, proto.aggregator.TaskTrigger, 12)
      );
    };
    proto.aggregator.ListTasksResp.Item.prototype.setTrigger = function(value) {
      return jspb.Message.setWrapperField(this, 12, value);
    };
    proto.aggregator.ListTasksResp.Item.prototype.clearTrigger = function() {
      return this.setTrigger(void 0);
    };
    proto.aggregator.ListTasksResp.Item.prototype.hasTrigger = function() {
      return jspb.Message.getField(this, 12) != null;
    };
    proto.aggregator.ListTasksResp.prototype.getItemsList = function() {
      return (
        /** @type{!Array<!proto.aggregator.ListTasksResp.Item>} */
        jspb.Message.getRepeatedWrapperField(this, proto.aggregator.ListTasksResp.Item, 1)
      );
    };
    proto.aggregator.ListTasksResp.prototype.setItemsList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 1, value);
    };
    proto.aggregator.ListTasksResp.prototype.addItems = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.aggregator.ListTasksResp.Item, opt_index);
    };
    proto.aggregator.ListTasksResp.prototype.clearItemsList = function() {
      return this.setItemsList([]);
    };
    proto.aggregator.ListTasksResp.prototype.getCursor = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.ListTasksResp.prototype.setCursor = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.ListTasksResp.prototype.getHasMore = function() {
      return (
        /** @type {boolean} */
        jspb.Message.getBooleanFieldWithDefault(this, 3, false)
      );
    };
    proto.aggregator.ListTasksResp.prototype.setHasMore = function(value) {
      return jspb.Message.setProto3BooleanField(this, 3, value);
    };
    proto.aggregator.ListExecutionsReq.repeatedFields_ = [1];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.ListExecutionsReq.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ListExecutionsReq.toObject(opt_includeInstance, this);
      };
      proto.aggregator.ListExecutionsReq.toObject = function(includeInstance, msg) {
        var f, obj = {
          taskIdsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? void 0 : f,
          cursor: jspb.Message.getFieldWithDefault(msg, 2, ""),
          itemPerPage: jspb.Message.getFieldWithDefault(msg, 3, 0)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.ListExecutionsReq.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.ListExecutionsReq();
      return proto.aggregator.ListExecutionsReq.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.ListExecutionsReq.deserializeBinaryFromReader = function(msg, reader) {
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
            msg.addTaskIds(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setCursor(value);
            break;
          case 3:
            var value = (
              /** @type {number} */
              reader.readInt64()
            );
            msg.setItemPerPage(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.ListExecutionsReq.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.ListExecutionsReq.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.ListExecutionsReq.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getTaskIdsList();
      if (f.length > 0) {
        writer.writeRepeatedString(
          1,
          f
        );
      }
      f = message.getCursor();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
      f = message.getItemPerPage();
      if (f !== 0) {
        writer.writeInt64(
          3,
          f
        );
      }
    };
    proto.aggregator.ListExecutionsReq.prototype.getTaskIdsList = function() {
      return (
        /** @type {!Array<string>} */
        jspb.Message.getRepeatedField(this, 1)
      );
    };
    proto.aggregator.ListExecutionsReq.prototype.setTaskIdsList = function(value) {
      return jspb.Message.setField(this, 1, value || []);
    };
    proto.aggregator.ListExecutionsReq.prototype.addTaskIds = function(value, opt_index) {
      return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
    };
    proto.aggregator.ListExecutionsReq.prototype.clearTaskIdsList = function() {
      return this.setTaskIdsList([]);
    };
    proto.aggregator.ListExecutionsReq.prototype.getCursor = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.ListExecutionsReq.prototype.setCursor = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.ListExecutionsReq.prototype.getItemPerPage = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 3, 0)
      );
    };
    proto.aggregator.ListExecutionsReq.prototype.setItemPerPage = function(value) {
      return jspb.Message.setProto3IntField(this, 3, value);
    };
    proto.aggregator.ListExecutionsResp.repeatedFields_ = [1];
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.ListExecutionsResp.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.ListExecutionsResp.toObject(opt_includeInstance, this);
      };
      proto.aggregator.ListExecutionsResp.toObject = function(includeInstance, msg) {
        var f, obj = {
          itemsList: jspb.Message.toObjectList(
            msg.getItemsList(),
            proto.aggregator.Execution.toObject,
            includeInstance
          ),
          cursor: jspb.Message.getFieldWithDefault(msg, 2, ""),
          hasMore: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.ListExecutionsResp.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.ListExecutionsResp();
      return proto.aggregator.ListExecutionsResp.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.ListExecutionsResp.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = new proto.aggregator.Execution();
            reader.readMessage(value, proto.aggregator.Execution.deserializeBinaryFromReader);
            msg.addItems(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setCursor(value);
            break;
          case 4:
            var value = (
              /** @type {boolean} */
              reader.readBool()
            );
            msg.setHasMore(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.ListExecutionsResp.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.ListExecutionsResp.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.ListExecutionsResp.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getItemsList();
      if (f.length > 0) {
        writer.writeRepeatedMessage(
          1,
          f,
          proto.aggregator.Execution.serializeBinaryToWriter
        );
      }
      f = message.getCursor();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
      f = message.getHasMore();
      if (f) {
        writer.writeBool(
          4,
          f
        );
      }
    };
    proto.aggregator.ListExecutionsResp.prototype.getItemsList = function() {
      return (
        /** @type{!Array<!proto.aggregator.Execution>} */
        jspb.Message.getRepeatedWrapperField(this, proto.aggregator.Execution, 1)
      );
    };
    proto.aggregator.ListExecutionsResp.prototype.setItemsList = function(value) {
      return jspb.Message.setRepeatedWrapperField(this, 1, value);
    };
    proto.aggregator.ListExecutionsResp.prototype.addItems = function(opt_value, opt_index) {
      return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.aggregator.Execution, opt_index);
    };
    proto.aggregator.ListExecutionsResp.prototype.clearItemsList = function() {
      return this.setItemsList([]);
    };
    proto.aggregator.ListExecutionsResp.prototype.getCursor = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.ListExecutionsResp.prototype.setCursor = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.ListExecutionsResp.prototype.getHasMore = function() {
      return (
        /** @type {boolean} */
        jspb.Message.getBooleanFieldWithDefault(this, 4, false)
      );
    };
    proto.aggregator.ListExecutionsResp.prototype.setHasMore = function(value) {
      return jspb.Message.setProto3BooleanField(this, 4, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.GetExecutionReq.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.GetExecutionReq.toObject(opt_includeInstance, this);
      };
      proto.aggregator.GetExecutionReq.toObject = function(includeInstance, msg) {
        var f, obj = {
          taskId: jspb.Message.getFieldWithDefault(msg, 1, ""),
          executionId: jspb.Message.getFieldWithDefault(msg, 2, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.GetExecutionReq.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.GetExecutionReq();
      return proto.aggregator.GetExecutionReq.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.GetExecutionReq.deserializeBinaryFromReader = function(msg, reader) {
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
            msg.setTaskId(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setExecutionId(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.GetExecutionReq.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.GetExecutionReq.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.GetExecutionReq.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getTaskId();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
      f = message.getExecutionId();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
    };
    proto.aggregator.GetExecutionReq.prototype.getTaskId = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.GetExecutionReq.prototype.setTaskId = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.GetExecutionReq.prototype.getExecutionId = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.GetExecutionReq.prototype.setExecutionId = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
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
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.TriggerMetadata.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.TriggerMetadata.toObject(opt_includeInstance, this);
      };
      proto.aggregator.TriggerMetadata.toObject = function(includeInstance, msg) {
        var f, obj = {
          blockNumber: jspb.Message.getFieldWithDefault(msg, 1, 0),
          logIndex: jspb.Message.getFieldWithDefault(msg, 2, 0),
          txHash: jspb.Message.getFieldWithDefault(msg, 3, ""),
          epoch: jspb.Message.getFieldWithDefault(msg, 4, 0),
          type: jspb.Message.getFieldWithDefault(msg, 5, 0)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.TriggerMetadata.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.TriggerMetadata();
      return proto.aggregator.TriggerMetadata.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.TriggerMetadata.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {number} */
              reader.readUint64()
            );
            msg.setBlockNumber(value);
            break;
          case 2:
            var value = (
              /** @type {number} */
              reader.readUint64()
            );
            msg.setLogIndex(value);
            break;
          case 3:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setTxHash(value);
            break;
          case 4:
            var value = (
              /** @type {number} */
              reader.readUint64()
            );
            msg.setEpoch(value);
            break;
          case 5:
            var value = (
              /** @type {!proto.aggregator.TriggerMetadata.TriggerType} */
              reader.readEnum()
            );
            msg.setType(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.TriggerMetadata.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.TriggerMetadata.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.TriggerMetadata.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getBlockNumber();
      if (f !== 0) {
        writer.writeUint64(
          1,
          f
        );
      }
      f = message.getLogIndex();
      if (f !== 0) {
        writer.writeUint64(
          2,
          f
        );
      }
      f = message.getTxHash();
      if (f.length > 0) {
        writer.writeString(
          3,
          f
        );
      }
      f = message.getEpoch();
      if (f !== 0) {
        writer.writeUint64(
          4,
          f
        );
      }
      f = message.getType();
      if (f !== 0) {
        writer.writeEnum(
          5,
          f
        );
      }
    };
    proto.aggregator.TriggerMetadata.TriggerType = {
      UNSET: 0,
      MANUAL: 2,
      FIXEDTIME: 3,
      CRON: 4,
      BLOCK: 5,
      EVENT: 6
    };
    proto.aggregator.TriggerMetadata.prototype.getBlockNumber = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 1, 0)
      );
    };
    proto.aggregator.TriggerMetadata.prototype.setBlockNumber = function(value) {
      return jspb.Message.setProto3IntField(this, 1, value);
    };
    proto.aggregator.TriggerMetadata.prototype.getLogIndex = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 2, 0)
      );
    };
    proto.aggregator.TriggerMetadata.prototype.setLogIndex = function(value) {
      return jspb.Message.setProto3IntField(this, 2, value);
    };
    proto.aggregator.TriggerMetadata.prototype.getTxHash = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.TriggerMetadata.prototype.setTxHash = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    proto.aggregator.TriggerMetadata.prototype.getEpoch = function() {
      return (
        /** @type {number} */
        jspb.Message.getFieldWithDefault(this, 4, 0)
      );
    };
    proto.aggregator.TriggerMetadata.prototype.setEpoch = function(value) {
      return jspb.Message.setProto3IntField(this, 4, value);
    };
    proto.aggregator.TriggerMetadata.prototype.getType = function() {
      return (
        /** @type {!proto.aggregator.TriggerMetadata.TriggerType} */
        jspb.Message.getFieldWithDefault(this, 5, 0)
      );
    };
    proto.aggregator.TriggerMetadata.prototype.setType = function(value) {
      return jspb.Message.setProto3EnumField(this, 5, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.GetWalletReq.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.GetWalletReq.toObject(opt_includeInstance, this);
      };
      proto.aggregator.GetWalletReq.toObject = function(includeInstance, msg) {
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
    proto.aggregator.GetWalletReq.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.GetWalletReq();
      return proto.aggregator.GetWalletReq.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.GetWalletReq.deserializeBinaryFromReader = function(msg, reader) {
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
    proto.aggregator.GetWalletReq.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.GetWalletReq.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.GetWalletReq.serializeBinaryToWriter = function(message, writer) {
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
    proto.aggregator.GetWalletReq.prototype.getSalt = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.GetWalletReq.prototype.setSalt = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.GetWalletReq.prototype.getFactoryAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.GetWalletReq.prototype.setFactoryAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.GetWalletResp.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.GetWalletResp.toObject(opt_includeInstance, this);
      };
      proto.aggregator.GetWalletResp.toObject = function(includeInstance, msg) {
        var f, obj = {
          address: jspb.Message.getFieldWithDefault(msg, 1, ""),
          salt: jspb.Message.getFieldWithDefault(msg, 2, ""),
          factoryAddress: jspb.Message.getFieldWithDefault(msg, 3, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.GetWalletResp.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.GetWalletResp();
      return proto.aggregator.GetWalletResp.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.GetWalletResp.deserializeBinaryFromReader = function(msg, reader) {
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
            msg.setFactoryAddress(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.GetWalletResp.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.GetWalletResp.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.GetWalletResp.serializeBinaryToWriter = function(message, writer) {
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
      f = message.getFactoryAddress();
      if (f.length > 0) {
        writer.writeString(
          3,
          f
        );
      }
    };
    proto.aggregator.GetWalletResp.prototype.getAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.GetWalletResp.prototype.setAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.GetWalletResp.prototype.getSalt = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.GetWalletResp.prototype.setSalt = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
    };
    proto.aggregator.GetWalletResp.prototype.getFactoryAddress = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 3, "")
      );
    };
    proto.aggregator.GetWalletResp.prototype.setFactoryAddress = function(value) {
      return jspb.Message.setProto3StringField(this, 3, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.UserTriggerTaskReq.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.UserTriggerTaskReq.toObject(opt_includeInstance, this);
      };
      proto.aggregator.UserTriggerTaskReq.toObject = function(includeInstance, msg) {
        var f, obj = {
          taskId: jspb.Message.getFieldWithDefault(msg, 1, ""),
          triggerMetadata: (f = msg.getTriggerMetadata()) && proto.aggregator.TriggerMetadata.toObject(includeInstance, f),
          isBlocking: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.UserTriggerTaskReq.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.UserTriggerTaskReq();
      return proto.aggregator.UserTriggerTaskReq.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.UserTriggerTaskReq.deserializeBinaryFromReader = function(msg, reader) {
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
            msg.setTaskId(value);
            break;
          case 2:
            var value = new proto.aggregator.TriggerMetadata();
            reader.readMessage(value, proto.aggregator.TriggerMetadata.deserializeBinaryFromReader);
            msg.setTriggerMetadata(value);
            break;
          case 3:
            var value = (
              /** @type {boolean} */
              reader.readBool()
            );
            msg.setIsBlocking(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.UserTriggerTaskReq.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.UserTriggerTaskReq.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.UserTriggerTaskReq.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getTaskId();
      if (f.length > 0) {
        writer.writeString(
          1,
          f
        );
      }
      f = message.getTriggerMetadata();
      if (f != null) {
        writer.writeMessage(
          2,
          f,
          proto.aggregator.TriggerMetadata.serializeBinaryToWriter
        );
      }
      f = message.getIsBlocking();
      if (f) {
        writer.writeBool(
          3,
          f
        );
      }
    };
    proto.aggregator.UserTriggerTaskReq.prototype.getTaskId = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 1, "")
      );
    };
    proto.aggregator.UserTriggerTaskReq.prototype.setTaskId = function(value) {
      return jspb.Message.setProto3StringField(this, 1, value);
    };
    proto.aggregator.UserTriggerTaskReq.prototype.getTriggerMetadata = function() {
      return (
        /** @type{?proto.aggregator.TriggerMetadata} */
        jspb.Message.getWrapperField(this, proto.aggregator.TriggerMetadata, 2)
      );
    };
    proto.aggregator.UserTriggerTaskReq.prototype.setTriggerMetadata = function(value) {
      return jspb.Message.setWrapperField(this, 2, value);
    };
    proto.aggregator.UserTriggerTaskReq.prototype.clearTriggerMetadata = function() {
      return this.setTriggerMetadata(void 0);
    };
    proto.aggregator.UserTriggerTaskReq.prototype.hasTriggerMetadata = function() {
      return jspb.Message.getField(this, 2) != null;
    };
    proto.aggregator.UserTriggerTaskReq.prototype.getIsBlocking = function() {
      return (
        /** @type {boolean} */
        jspb.Message.getBooleanFieldWithDefault(this, 3, false)
      );
    };
    proto.aggregator.UserTriggerTaskReq.prototype.setIsBlocking = function(value) {
      return jspb.Message.setProto3BooleanField(this, 3, value);
    };
    if (jspb.Message.GENERATE_TO_OBJECT) {
      proto.aggregator.UserTriggerTaskResp.prototype.toObject = function(opt_includeInstance) {
        return proto.aggregator.UserTriggerTaskResp.toObject(opt_includeInstance, this);
      };
      proto.aggregator.UserTriggerTaskResp.toObject = function(includeInstance, msg) {
        var f, obj = {
          result: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
          executionId: jspb.Message.getFieldWithDefault(msg, 2, "")
        };
        if (includeInstance) {
          obj.$jspbMessageInstance = msg;
        }
        return obj;
      };
    }
    proto.aggregator.UserTriggerTaskResp.deserializeBinary = function(bytes) {
      var reader = new jspb.BinaryReader(bytes);
      var msg = new proto.aggregator.UserTriggerTaskResp();
      return proto.aggregator.UserTriggerTaskResp.deserializeBinaryFromReader(msg, reader);
    };
    proto.aggregator.UserTriggerTaskResp.deserializeBinaryFromReader = function(msg, reader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) {
          break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
          case 1:
            var value = (
              /** @type {boolean} */
              reader.readBool()
            );
            msg.setResult(value);
            break;
          case 2:
            var value = (
              /** @type {string} */
              reader.readString()
            );
            msg.setExecutionId(value);
            break;
          default:
            reader.skipField();
            break;
        }
      }
      return msg;
    };
    proto.aggregator.UserTriggerTaskResp.prototype.serializeBinary = function() {
      var writer = new jspb.BinaryWriter();
      proto.aggregator.UserTriggerTaskResp.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    };
    proto.aggregator.UserTriggerTaskResp.serializeBinaryToWriter = function(message, writer) {
      var f = void 0;
      f = message.getResult();
      if (f) {
        writer.writeBool(
          1,
          f
        );
      }
      f = message.getExecutionId();
      if (f.length > 0) {
        writer.writeString(
          2,
          f
        );
      }
    };
    proto.aggregator.UserTriggerTaskResp.prototype.getResult = function() {
      return (
        /** @type {boolean} */
        jspb.Message.getBooleanFieldWithDefault(this, 1, false)
      );
    };
    proto.aggregator.UserTriggerTaskResp.prototype.setResult = function(value) {
      return jspb.Message.setProto3BooleanField(this, 1, value);
    };
    proto.aggregator.UserTriggerTaskResp.prototype.getExecutionId = function() {
      return (
        /** @type {string} */
        jspb.Message.getFieldWithDefault(this, 2, "")
      );
    };
    proto.aggregator.UserTriggerTaskResp.prototype.setExecutionId = function(value) {
      return jspb.Message.setProto3StringField(this, 2, value);
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
    proto.aggregator.CustomCodeLang = {
      JAVASCRIPT: 0
    };
    goog.object.extend(exports2, proto.aggregator);
  }
});

// grpc_codegen/avs_grpc_pb.js
var require_avs_grpc_pb = __commonJS({
  "grpc_codegen/avs_grpc_pb.js"(exports2) {
    "use strict";
    var grpc2 = require("@grpc/grpc-js");
    var avs_pb20 = require_avs_pb();
    var google_protobuf_wrappers_pb = require("google-protobuf/google/protobuf/wrappers_pb.js");
    function serialize_aggregator_CreateTaskReq(arg) {
      if (!(arg instanceof avs_pb20.CreateTaskReq)) {
        throw new Error("Expected argument of type aggregator.CreateTaskReq");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_CreateTaskReq(buffer_arg) {
      return avs_pb20.CreateTaskReq.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_CreateTaskResp(arg) {
      if (!(arg instanceof avs_pb20.CreateTaskResp)) {
        throw new Error("Expected argument of type aggregator.CreateTaskResp");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_CreateTaskResp(buffer_arg) {
      return avs_pb20.CreateTaskResp.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_Execution(arg) {
      if (!(arg instanceof avs_pb20.Execution)) {
        throw new Error("Expected argument of type aggregator.Execution");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_Execution(buffer_arg) {
      return avs_pb20.Execution.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_GetExecutionReq(arg) {
      if (!(arg instanceof avs_pb20.GetExecutionReq)) {
        throw new Error("Expected argument of type aggregator.GetExecutionReq");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_GetExecutionReq(buffer_arg) {
      return avs_pb20.GetExecutionReq.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_GetKeyReq(arg) {
      if (!(arg instanceof avs_pb20.GetKeyReq)) {
        throw new Error("Expected argument of type aggregator.GetKeyReq");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_GetKeyReq(buffer_arg) {
      return avs_pb20.GetKeyReq.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_GetWalletReq(arg) {
      if (!(arg instanceof avs_pb20.GetWalletReq)) {
        throw new Error("Expected argument of type aggregator.GetWalletReq");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_GetWalletReq(buffer_arg) {
      return avs_pb20.GetWalletReq.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_GetWalletResp(arg) {
      if (!(arg instanceof avs_pb20.GetWalletResp)) {
        throw new Error("Expected argument of type aggregator.GetWalletResp");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_GetWalletResp(buffer_arg) {
      return avs_pb20.GetWalletResp.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_IdReq(arg) {
      if (!(arg instanceof avs_pb20.IdReq)) {
        throw new Error("Expected argument of type aggregator.IdReq");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_IdReq(buffer_arg) {
      return avs_pb20.IdReq.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_KeyResp(arg) {
      if (!(arg instanceof avs_pb20.KeyResp)) {
        throw new Error("Expected argument of type aggregator.KeyResp");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_KeyResp(buffer_arg) {
      return avs_pb20.KeyResp.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_ListExecutionsReq(arg) {
      if (!(arg instanceof avs_pb20.ListExecutionsReq)) {
        throw new Error("Expected argument of type aggregator.ListExecutionsReq");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_ListExecutionsReq(buffer_arg) {
      return avs_pb20.ListExecutionsReq.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_ListExecutionsResp(arg) {
      if (!(arg instanceof avs_pb20.ListExecutionsResp)) {
        throw new Error("Expected argument of type aggregator.ListExecutionsResp");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_ListExecutionsResp(buffer_arg) {
      return avs_pb20.ListExecutionsResp.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_ListTasksReq(arg) {
      if (!(arg instanceof avs_pb20.ListTasksReq)) {
        throw new Error("Expected argument of type aggregator.ListTasksReq");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_ListTasksReq(buffer_arg) {
      return avs_pb20.ListTasksReq.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_ListTasksResp(arg) {
      if (!(arg instanceof avs_pb20.ListTasksResp)) {
        throw new Error("Expected argument of type aggregator.ListTasksResp");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_ListTasksResp(buffer_arg) {
      return avs_pb20.ListTasksResp.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_ListWalletReq(arg) {
      if (!(arg instanceof avs_pb20.ListWalletReq)) {
        throw new Error("Expected argument of type aggregator.ListWalletReq");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_ListWalletReq(buffer_arg) {
      return avs_pb20.ListWalletReq.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_ListWalletResp(arg) {
      if (!(arg instanceof avs_pb20.ListWalletResp)) {
        throw new Error("Expected argument of type aggregator.ListWalletResp");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_ListWalletResp(buffer_arg) {
      return avs_pb20.ListWalletResp.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_NonceRequest(arg) {
      if (!(arg instanceof avs_pb20.NonceRequest)) {
        throw new Error("Expected argument of type aggregator.NonceRequest");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_NonceRequest(buffer_arg) {
      return avs_pb20.NonceRequest.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_NonceResp(arg) {
      if (!(arg instanceof avs_pb20.NonceResp)) {
        throw new Error("Expected argument of type aggregator.NonceResp");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_NonceResp(buffer_arg) {
      return avs_pb20.NonceResp.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_Task(arg) {
      if (!(arg instanceof avs_pb20.Task)) {
        throw new Error("Expected argument of type aggregator.Task");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_Task(buffer_arg) {
      return avs_pb20.Task.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_UserTriggerTaskReq(arg) {
      if (!(arg instanceof avs_pb20.UserTriggerTaskReq)) {
        throw new Error("Expected argument of type aggregator.UserTriggerTaskReq");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_UserTriggerTaskReq(buffer_arg) {
      return avs_pb20.UserTriggerTaskReq.deserializeBinary(new Uint8Array(buffer_arg));
    }
    function serialize_aggregator_UserTriggerTaskResp(arg) {
      if (!(arg instanceof avs_pb20.UserTriggerTaskResp)) {
        throw new Error("Expected argument of type aggregator.UserTriggerTaskResp");
      }
      return Buffer.from(arg.serializeBinary());
    }
    function deserialize_aggregator_UserTriggerTaskResp(buffer_arg) {
      return avs_pb20.UserTriggerTaskResp.deserializeBinary(new Uint8Array(buffer_arg));
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
      // Exchange for an Auth Key to authenticate in subsequent request
      getKey: {
        path: "/aggregator.Aggregator/GetKey",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb20.GetKeyReq,
        responseType: avs_pb20.KeyResp,
        requestSerialize: serialize_aggregator_GetKeyReq,
        requestDeserialize: deserialize_aggregator_GetKeyReq,
        responseSerialize: serialize_aggregator_KeyResp,
        responseDeserialize: deserialize_aggregator_KeyResp
      },
      // Smart Acccount Operation
      getNonce: {
        path: "/aggregator.Aggregator/GetNonce",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb20.NonceRequest,
        responseType: avs_pb20.NonceResp,
        requestSerialize: serialize_aggregator_NonceRequest,
        requestDeserialize: deserialize_aggregator_NonceRequest,
        responseSerialize: serialize_aggregator_NonceResp,
        responseDeserialize: deserialize_aggregator_NonceResp
      },
      getWallet: {
        path: "/aggregator.Aggregator/GetWallet",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb20.GetWalletReq,
        responseType: avs_pb20.GetWalletResp,
        requestSerialize: serialize_aggregator_GetWalletReq,
        requestDeserialize: deserialize_aggregator_GetWalletReq,
        responseSerialize: serialize_aggregator_GetWalletResp,
        responseDeserialize: deserialize_aggregator_GetWalletResp
      },
      listWallets: {
        path: "/aggregator.Aggregator/ListWallets",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb20.ListWalletReq,
        responseType: avs_pb20.ListWalletResp,
        requestSerialize: serialize_aggregator_ListWalletReq,
        requestDeserialize: deserialize_aggregator_ListWalletReq,
        responseSerialize: serialize_aggregator_ListWalletResp,
        responseDeserialize: deserialize_aggregator_ListWalletResp
      },
      // Task Management Operation
      createTask: {
        path: "/aggregator.Aggregator/CreateTask",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb20.CreateTaskReq,
        responseType: avs_pb20.CreateTaskResp,
        requestSerialize: serialize_aggregator_CreateTaskReq,
        requestDeserialize: deserialize_aggregator_CreateTaskReq,
        responseSerialize: serialize_aggregator_CreateTaskResp,
        responseDeserialize: deserialize_aggregator_CreateTaskResp
      },
      listTasks: {
        path: "/aggregator.Aggregator/ListTasks",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb20.ListTasksReq,
        responseType: avs_pb20.ListTasksResp,
        requestSerialize: serialize_aggregator_ListTasksReq,
        requestDeserialize: deserialize_aggregator_ListTasksReq,
        responseSerialize: serialize_aggregator_ListTasksResp,
        responseDeserialize: deserialize_aggregator_ListTasksResp
      },
      getTask: {
        path: "/aggregator.Aggregator/GetTask",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb20.IdReq,
        responseType: avs_pb20.Task,
        requestSerialize: serialize_aggregator_IdReq,
        requestDeserialize: deserialize_aggregator_IdReq,
        responseSerialize: serialize_aggregator_Task,
        responseDeserialize: deserialize_aggregator_Task
      },
      listExecutions: {
        path: "/aggregator.Aggregator/ListExecutions",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb20.ListExecutionsReq,
        responseType: avs_pb20.ListExecutionsResp,
        requestSerialize: serialize_aggregator_ListExecutionsReq,
        requestDeserialize: deserialize_aggregator_ListExecutionsReq,
        responseSerialize: serialize_aggregator_ListExecutionsResp,
        responseDeserialize: deserialize_aggregator_ListExecutionsResp
      },
      getExecution: {
        path: "/aggregator.Aggregator/GetExecution",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb20.GetExecutionReq,
        responseType: avs_pb20.Execution,
        requestSerialize: serialize_aggregator_GetExecutionReq,
        requestDeserialize: deserialize_aggregator_GetExecutionReq,
        responseSerialize: serialize_aggregator_Execution,
        responseDeserialize: deserialize_aggregator_Execution
      },
      cancelTask: {
        path: "/aggregator.Aggregator/CancelTask",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb20.IdReq,
        responseType: google_protobuf_wrappers_pb.BoolValue,
        requestSerialize: serialize_aggregator_IdReq,
        requestDeserialize: deserialize_aggregator_IdReq,
        responseSerialize: serialize_google_protobuf_BoolValue,
        responseDeserialize: deserialize_google_protobuf_BoolValue
      },
      deleteTask: {
        path: "/aggregator.Aggregator/DeleteTask",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb20.IdReq,
        responseType: google_protobuf_wrappers_pb.BoolValue,
        requestSerialize: serialize_aggregator_IdReq,
        requestDeserialize: deserialize_aggregator_IdReq,
        responseSerialize: serialize_google_protobuf_BoolValue,
        responseDeserialize: deserialize_google_protobuf_BoolValue
      },
      triggerTask: {
        path: "/aggregator.Aggregator/TriggerTask",
        requestStream: false,
        responseStream: false,
        requestType: avs_pb20.UserTriggerTaskReq,
        responseType: avs_pb20.UserTriggerTaskResp,
        requestSerialize: serialize_aggregator_UserTriggerTaskReq,
        requestDeserialize: deserialize_aggregator_UserTriggerTaskReq,
        responseSerialize: serialize_aggregator_UserTriggerTaskResp,
        responseDeserialize: deserialize_aggregator_UserTriggerTaskResp
      }
    };
    exports2.AggregatorClient = grpc2.makeGenericClientConstructor(AggregatorService);
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AUTH_KEY_HEADER: () => AUTH_KEY_HEADER,
  BlockTrigger: () => block_default,
  BranchNode: () => branch_default,
  ContractReadNode: () => contractRead_default,
  ContractWriteNode: () => contractWrite_default,
  CronTrigger: () => cron_default,
  CustomCodeLangs: () => CustomCodeLangs,
  CustomCodeNode: () => customCode_default,
  DEFAULT_LIMIT: () => DEFAULT_LIMIT,
  ETHTransferNode: () => ethTransfer_default,
  Edge: () => edge_default,
  EventTrigger: () => event_default,
  Execution: () => execution_default,
  FixedTimeTrigger: () => fixedTime_default,
  GraphQLQueryNode: () => graphqlQuery_default,
  Node: () => interface_default2,
  NodeFactory: () => factory_default2,
  NodeTypes: () => NodeTypes,
  RestAPINode: () => restApi_default,
  Trigger: () => interface_default,
  TriggerFactory: () => factory_default,
  TriggerTypes: () => TriggerTypes,
  Workflow: () => workflow_default,
  WorkflowStatuses: () => WorkflowStatuses,
  default: () => Client,
  getKeyRequestMessage: () => getKeyRequestMessage
});
module.exports = __toCommonJS(src_exports);
var import_lodash4 = __toESM(require("lodash"));
var grpc = __toESM(require("@grpc/grpc-js"));
var import_grpc_js = require("@grpc/grpc-js");

// src/auth.ts
var getKeyRequestMessage = (address, expiredAt) => {
  return `key request for ${address} expired at ${expiredAt}`;
};

// src/index.ts
var import_avs_grpc_pb = __toESM(require_avs_grpc_pb());
var avs_pb19 = __toESM(require_avs_pb());

// src/models/workflow.ts
var import_lodash3 = __toESM(require("lodash"));
var avs_pb15 = __toESM(require_avs_pb());

// src/models/edge.ts
var avs_pb = __toESM(require_avs_pb());
var Edge = class _Edge {
  constructor(edge) {
    this.id = edge.id;
    this.source = edge.source;
    this.target = edge.target;
  }
  static fromResponse(edge) {
    return new _Edge(edge.toObject());
  }
  toRequest() {
    const edge = new avs_pb.TaskEdge();
    edge.setId(this.id);
    edge.setSource(this.source);
    edge.setTarget(this.target);
    return edge;
  }
};
var edge_default = Edge;

// src/models/trigger/block.ts
var avs_pb3 = __toESM(require_avs_pb());

// src/models/trigger/interface.ts
var avs_pb2 = __toESM(require_avs_pb());
var TriggerTypes = avs_pb2.TaskTrigger.TriggerTypeCase;
var Trigger = class {
  /**
   * Create an instance of Trigger from user inputs
   * @param props
   */
  constructor(props) {
    this.name = props.name;
    this.type = props.type;
    this.data = props.data;
  }
  toRequest() {
    throw new Error("Method not implemented.");
  }
};
var interface_default = Trigger;

// src/models/trigger/block.ts
var BlockTrigger = class _BlockTrigger extends interface_default {
  constructor(props) {
    super({ ...props, type: TriggerTypes.BLOCK, data: props.data });
  }
  toRequest() {
    const request = new avs_pb3.TaskTrigger();
    request.setName(this.name);
    if (!this.data) {
      throw new Error(`Trigger data is missing for ${this.type}`);
    }
    const condition = new avs_pb3.BlockCondition();
    condition.setInterval(this.data.interval);
    request.setBlock(condition);
    return request;
  }
  static fromResponse(raw) {
    const obj = raw.toObject();
    return new _BlockTrigger({
      ...obj,
      type: TriggerTypes.BLOCK,
      data: raw.getBlock().toObject()
    });
  }
};
var block_default = BlockTrigger;

// src/models/trigger/cron.ts
var avs_pb4 = __toESM(require_avs_pb());
var CronTrigger = class _CronTrigger extends interface_default {
  constructor(props) {
    super({ ...props, type: TriggerTypes.CRON, data: props.data });
    console.log("CronTrigger.constructor.props:", {
      ...props,
      type: TriggerTypes.CRON,
      data: props.data
    });
  }
  toRequest() {
    const request = new avs_pb4.TaskTrigger();
    request.setName(this.name);
    if (!this.data) {
      throw new Error(`Trigger data is missing for ${this.type}`);
    }
    const condition = new avs_pb4.CronCondition();
    condition.setScheduleList(this.data.scheduleList);
    request.setCron(condition);
    console.log("CronTrigger.toRequest.request:", request.toObject());
    return request;
  }
  static fromResponse(raw) {
    const obj = raw.toObject();
    console.log("CronTrigger.fromResponse.obj:", obj);
    return new _CronTrigger({
      ...obj,
      type: TriggerTypes.CRON,
      data: raw.getCron().toObject()
    });
  }
};
var cron_default = CronTrigger;

// src/models/trigger/event.ts
var avs_pb5 = __toESM(require_avs_pb());
var EventTrigger = class _EventTrigger extends interface_default {
  constructor(props) {
    super({ ...props, type: TriggerTypes.EVENT, data: props.data });
    console.log("EventTrigger.constructor.props:", {
      ...props,
      type: TriggerTypes.EVENT,
      data: props.data
    });
  }
  toRequest() {
    const request = new avs_pb5.TaskTrigger();
    request.setName(this.name);
    if (!this.data) {
      throw new Error(`Trigger data is missing for ${this.type}`);
    }
    const condition = new avs_pb5.EventCondition();
    condition.setExpression(this.data.expression);
    request.setEvent(condition);
    console.log("EventTrigger.toRequest.request:", request.toObject());
    return request;
  }
  static fromResponse(raw) {
    const obj = raw.toObject();
    console.log("EventTrigger.fromResponse.obj:", obj);
    return new _EventTrigger({
      ...obj,
      type: TriggerTypes.EVENT,
      data: raw.getEvent().toObject()
    });
  }
};
var event_default = EventTrigger;

// src/models/trigger/fixedTime.ts
var avs_pb6 = __toESM(require_avs_pb());
var FixedTimeTrigger = class _FixedTimeTrigger extends interface_default {
  constructor(props) {
    super({ ...props, type: TriggerTypes.FIXED_TIME, data: props.data });
    console.log("FixedTimeTrigger.constructor.props:", {
      ...props,
      type: TriggerTypes.FIXED_TIME,
      data: props.data
    });
  }
  toRequest() {
    const request = new avs_pb6.TaskTrigger();
    request.setName(this.name);
    if (!this.data) {
      throw new Error(`Trigger data is missing for ${this.type}`);
    }
    const condition = new avs_pb6.FixedTimeCondition();
    condition.setEpochsList(this.data.epochsList);
    request.setFixedTime(condition);
    console.log("FixedTimeTrigger.toRequest.request:", request.toObject());
    return request;
  }
  static fromResponse(raw) {
    const obj = raw.toObject();
    console.log("FixedTimeTrigger.fromResponse.obj:", obj);
    return new _FixedTimeTrigger({
      ...obj,
      type: TriggerTypes.FIXED_TIME,
      data: raw.getFixedTime().toObject()
    });
  }
};
var fixedTime_default = FixedTimeTrigger;

// src/models/trigger/factory.ts
var TriggerFactory = class {
  /**
   * Static factory method to create Trigger instances
   * @param props
   * @returns
   */
  static create(props) {
    switch (props.type) {
      case TriggerTypes.BLOCK:
        return new block_default(props);
      case TriggerTypes.CRON:
        return new cron_default(props);
      case TriggerTypes.EVENT:
        return new event_default(props);
      case TriggerTypes.FIXED_TIME:
        return new fixedTime_default(props);
    }
    throw new Error("Unsupported trigger type");
  }
  /**
   * Create an instance of Trigger from AVS getWorkflow or getWorkflows response
   * @param trigger
   * @returns
   */
  static fromResponse(raw) {
    switch (true) {
      case !!raw.getFixedTime():
        return fixedTime_default.fromResponse(raw);
      case !!raw.getCron():
        return cron_default.fromResponse(raw);
      case !!raw.getBlock():
        return block_default.fromResponse(raw);
      case !!raw.getEvent():
        return event_default.fromResponse(raw);
      default:
        throw new Error("Unknown trigger type");
    }
  }
};
var factory_default = TriggerFactory;

// src/models/node/factory.ts
var import_lodash2 = __toESM(require("lodash"));

// src/models/node/interface.ts
var avs_pb7 = __toESM(require_avs_pb());
var import_lodash = __toESM(require("lodash"));
var NodeTypes = avs_pb7.TaskNode.TaskTypeCase;
var Node = class {
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.type = props.type;
    this.data = props.data;
  }
  toRequest() {
    const request = new avs_pb7.TaskNode();
    console.log("Node.toRequest.request:", request);
    const raw = request.serializeBinary();
    const parsed = avs_pb7.TaskNode.deserializeBinary(raw);
    if (!import_lodash.default.isEqual(request, parsed)) {
      throw new Error("Invalid request object");
    }
    return request;
  }
};
var interface_default2 = Node;

// src/models/node/contractWrite.ts
var avs_pb8 = __toESM(require_avs_pb());
var ContractWriteNode2 = class _ContractWriteNode extends interface_default2 {
  constructor(props) {
    super({ ...props, type: NodeTypes.CONTRACT_WRITE, data: props.data });
  }
  static fromResponse(raw) {
    const obj = raw.toObject();
    return new _ContractWriteNode({
      ...obj,
      type: NodeTypes.CONTRACT_WRITE,
      data: raw.getContractWrite().toObject()
    });
  }
  toRequest() {
    const request = new avs_pb8.TaskNode();
    request.setId(this.id);
    request.setName(this.name);
    const nodeData = new avs_pb8.ContractWriteNode();
    nodeData.setContractAddress(
      this.data.contractAddress
    );
    nodeData.setCallData(this.data.callData);
    nodeData.setContractAbi(this.data.contractAbi);
    request.setContractWrite(nodeData);
    return request;
  }
};
var contractWrite_default = ContractWriteNode2;

// src/models/node/customCode.ts
var avs_pb9 = __toESM(require_avs_pb());
var CustomCodeLangs = avs_pb9.CustomCodeLang;
var CustomCodeNode2 = class _CustomCodeNode extends interface_default2 {
  constructor(props) {
    super({ ...props, type: NodeTypes.CUSTOM_CODE, data: props.data });
  }
  static fromResponse(raw) {
    const obj = raw.toObject();
    return new _CustomCodeNode({
      ...obj,
      type: NodeTypes.CUSTOM_CODE,
      data: raw.getCustomCode().toObject()
    });
  }
  toRequest() {
    const request = new avs_pb9.TaskNode();
    request.setId(this.id);
    request.setName(this.name);
    const nodeData = new avs_pb9.CustomCodeNode();
    nodeData.setLang(this.data.lang);
    nodeData.setSource(this.data.source);
    request.setCustomCode(nodeData);
    return request;
  }
};
var customCode_default = CustomCodeNode2;

// src/models/node/graphqlQuery.ts
var avs_pb10 = __toESM(require_avs_pb());
var GraphQLQueryNode2 = class _GraphQLQueryNode extends interface_default2 {
  constructor(props) {
    super({
      ...props,
      type: NodeTypes.GRAPHQL_QUERY,
      data: props.data
    });
  }
  static fromResponse(raw) {
    const obj = raw.toObject();
    return new _GraphQLQueryNode({
      ...obj,
      type: NodeTypes.GRAPHQL_QUERY,
      data: raw.getGraphqlQuery().toObject()
    });
  }
  toRequest() {
    const request = new avs_pb10.TaskNode();
    request.setId(this.id);
    request.setName(this.name);
    const nodeData = new avs_pb10.GraphQLQueryNode();
    nodeData.setUrl(this.data.url);
    nodeData.setQuery(this.data.query);
    const variables = this.data.variablesMap;
    const variablesMap = nodeData.getVariablesMap();
    variables.forEach(([key, value]) => {
      variablesMap.set(key, value);
    });
    request.setGraphqlQuery(nodeData);
    return request;
  }
};
var graphqlQuery_default = GraphQLQueryNode2;

// src/models/node/restApi.ts
var avs_pb11 = __toESM(require_avs_pb());
var RestAPINode2 = class _RestAPINode extends interface_default2 {
  constructor(props) {
    super({ ...props, type: NodeTypes.REST_API, data: props.data });
  }
  static fromResponse(raw) {
    const obj = raw.toObject();
    return new _RestAPINode({
      ...obj,
      type: NodeTypes.REST_API,
      data: raw.getRestApi().toObject()
    });
  }
  toRequest() {
    const request = new avs_pb11.TaskNode();
    request.setId(this.id);
    request.setName(this.name);
    const nodeData = new avs_pb11.RestAPINode();
    nodeData.setUrl(this.data.url);
    nodeData.setMethod(this.data.method);
    nodeData.setBody(this.data.body);
    const headers = this.data.headersMap;
    const headersMap = nodeData.getHeadersMap();
    headers.forEach(([key, value]) => {
      headersMap.set(key, value);
    });
    request.setRestApi(nodeData);
    return request;
  }
};
var restApi_default = RestAPINode2;

// src/models/node/contractRead.ts
var avs_pb12 = __toESM(require_avs_pb());
var ContractReadNode2 = class _ContractReadNode extends interface_default2 {
  constructor(props) {
    super({ ...props, type: NodeTypes.CONTRACT_READ, data: props.data });
  }
  static fromResponse(raw) {
    const obj = raw.toObject();
    return new _ContractReadNode({
      ...obj,
      type: NodeTypes.CONTRACT_READ,
      data: raw.getContractRead().toObject()
    });
  }
  toRequest() {
    const request = new avs_pb12.TaskNode();
    request.setId(this.id);
    request.setName(this.name);
    const nodeData = new avs_pb12.ContractReadNode();
    nodeData.setContractAddress(
      this.data.contractAddress
    );
    nodeData.setCallData(this.data.callData);
    nodeData.setContractAbi(this.data.contractAbi);
    nodeData.setMethod(this.data.method);
    request.setContractRead(nodeData);
    return request;
  }
};
var contractRead_default = ContractReadNode2;

// src/models/node/ethTransfer.ts
var avs_pb13 = __toESM(require_avs_pb());
var ETHTransferNode2 = class _ETHTransferNode extends interface_default2 {
  constructor(props) {
    super({ ...props, type: NodeTypes.ETH_TRANSFER, data: props.data });
  }
  static fromResponse(raw) {
    const obj = raw.toObject();
    return new _ETHTransferNode({
      ...obj,
      type: NodeTypes.ETH_TRANSFER,
      data: raw.getEthTransfer().toObject()
    });
  }
  toRequest() {
    const request = new avs_pb13.TaskNode();
    request.setId(this.id);
    request.setName(this.name);
    const nodeData = new avs_pb13.ETHTransferNode();
    nodeData.setDestination(this.data.destination);
    nodeData.setAmount(this.data.amount);
    request.setEthTransfer(nodeData);
    return request;
  }
};
var ethTransfer_default = ETHTransferNode2;

// src/models/node/branch.ts
var avs_pb14 = __toESM(require_avs_pb());
var BranchNode2 = class _BranchNode extends interface_default2 {
  constructor(props) {
    super({ ...props, type: NodeTypes.BRANCH, data: props.data });
  }
  static fromResponse(raw) {
    const obj = raw.toObject();
    return new _BranchNode({
      ...obj,
      type: NodeTypes.BRANCH,
      data: raw.getBranch().toObject()
    });
  }
  toRequest() {
    const request = new avs_pb14.TaskNode();
    request.setId(this.id);
    request.setName(this.name);
    const nodeData = new avs_pb14.BranchNode();
    nodeData.setConditionsList(
      this.data.conditionsList.map((condition) => {
        const conditionObj = new avs_pb14.Condition();
        conditionObj.setId(condition.id);
        conditionObj.setType(condition.type);
        return conditionObj;
      })
    );
    request.setBranch(nodeData);
    return request;
  }
  // TODO: do we need a getConditionId() to avoid exporting BranchNodeData?
};
var branch_default = BranchNode2;

// src/models/node/factory.ts
var NodeFactory = class {
  static create(props) {
    switch (props.type) {
      case NodeTypes.CONTRACT_WRITE:
        return new contractWrite_default(props);
      case NodeTypes.REST_API:
        return new restApi_default(props);
      case NodeTypes.CUSTOM_CODE:
        return new customCode_default(props);
      case NodeTypes.CONTRACT_READ:
        return new contractRead_default(props);
      case NodeTypes.ETH_TRANSFER:
        return new ethTransfer_default(props);
      case NodeTypes.GRAPHQL_QUERY:
        return new graphqlQuery_default(props);
      case NodeTypes.BRANCH:
        return new branch_default(props);
      default:
        throw new Error(`Unsupported node type: ${props.type}`);
    }
  }
  static createNodes(props) {
    return import_lodash2.default.map(props, (node) => this.create(node));
  }
  static fromResponse(raw) {
    switch (true) {
      case !!raw.getEthTransfer():
        return ethTransfer_default.fromResponse(raw);
      case !!raw.getContractRead():
        return contractRead_default.fromResponse(raw);
      case !!raw.getContractWrite():
        return contractWrite_default.fromResponse(raw);
      case !!raw.getGraphqlQuery():
        return graphqlQuery_default.fromResponse(raw);
      case !!raw.getRestApi():
        return restApi_default.fromResponse(raw);
      case !!raw.getCustomCode():
        return customCode_default.fromResponse(raw);
      case !!raw.getBranch():
        return branch_default.fromResponse(raw);
      default:
        throw new Error(`Unsupported node type: ${raw.getName()}`);
    }
  }
};
var factory_default2 = NodeFactory;

// src/models/workflow.ts
var WorkflowStatuses = avs_pb15.TaskStatus;
var Workflow = class _Workflow {
  /**
   * Create an instance of Workflow from user inputs
   * @param props
   */
  constructor(props) {
    if (!props.trigger) {
      throw new Error("Trigger is undefined in new Workflow()");
    }
    this.smartWalletAddress = props.smartWalletAddress;
    this.trigger = props.trigger;
    this.nodes = props.nodes;
    this.edges = props.edges;
    this.startAt = props.startAt;
    this.expiredAt = props.expiredAt;
    this.maxExecution = props.maxExecution;
    this.id = props.id;
    this.owner = props.owner;
    this.memo = props.memo;
    this.status = props.status;
    this.completedAt = props.completedAt;
    this.totalExecution = props.totalExecution;
    this.lastRanAt = props.lastRanAt;
  }
  /**
   * Create an instance of Workflow from AVS getWorkflow response
   * @param res
   * @returns
   */
  static fromResponse(obj) {
    const trigger = factory_default.fromResponse(obj.getTrigger());
    if (!trigger) {
      throw new Error("Trigger is undefined in fromResponse()");
    }
    const nodes = import_lodash3.default.map(
      obj.getNodesList(),
      (node) => factory_default2.fromResponse(node)
    );
    const edges = import_lodash3.default.map(obj.getEdgesList(), (edge) => edge_default.fromResponse(edge));
    const workflow = new _Workflow({
      id: obj.getId(),
      owner: obj.getOwner(),
      smartWalletAddress: obj.getSmartWalletAddress(),
      trigger,
      nodes,
      edges,
      startAt: obj.getStartAt(),
      expiredAt: obj.getExpiredAt(),
      maxExecution: obj.getMaxExecution(),
      memo: obj.getMemo(),
      status: obj.getStatus(),
      completedAt: obj.getCompletedAt(),
      totalExecution: obj.getTotalExecution(),
      lastRanAt: obj.getLastRanAt()
    });
    return workflow;
  }
  /**
   * Create an instance of Workflow with only selected fields
   * @param obj
   */
  static fromListResponse(obj) {
    const trigger = factory_default.fromResponse(obj.getTrigger());
    if (!trigger) {
      throw new Error("Trigger is undefined in fromListResponse()");
    }
    return new _Workflow({
      id: obj.getId(),
      owner: obj.getOwner(),
      smartWalletAddress: obj.getSmartWalletAddress(),
      trigger,
      startAt: obj.getStartAt(),
      expiredAt: obj.getExpiredAt(),
      maxExecution: obj.getMaxExecution(),
      nodes: [],
      edges: [],
      completedAt: obj.getCompletedAt(),
      status: obj.getStatus(),
      memo: obj.getMemo(),
      totalExecution: obj.getTotalExecution(),
      lastRanAt: obj.getLastRanAt()
    });
  }
  toRequest() {
    const request = new avs_pb15.CreateTaskReq();
    request.setSmartWalletAddress(this.smartWalletAddress);
    request.setTrigger(this.trigger.toRequest());
    import_lodash3.default.map(this.nodes, (node) => request.addNodes(node.toRequest()));
    import_lodash3.default.map(this.edges, (edge) => request.addEdges(edge.toRequest()));
    request.setStartAt(this.startAt);
    request.setExpiredAt(this.expiredAt);
    request.setMaxExecution(this.maxExecution);
    if (this.memo) {
      request.setMemo(this.memo);
    }
    return request;
  }
};
var workflow_default = Workflow;

// src/models/execution.ts
var avs_pb18 = __toESM(require_avs_pb());

// src/models/trigger/metadata.ts
var avs_pb16 = __toESM(require_avs_pb());
var TriggerMetadata2 = class _TriggerMetadata {
  constructor(props) {
    this.type = props.type;
    switch (props.type) {
      case TriggerTypes.FIXED_TIME:
      case TriggerTypes.CRON:
        this.epoch = props.epoch;
        break;
      case TriggerTypes.BLOCK:
        this.blockNumber = props.blockNumber;
        break;
      case TriggerTypes.EVENT:
        this.blockNumber = props.blockNumber;
        this.logIndex = props.logIndex;
        this.txHash = props.txHash;
        break;
      default:
        throw new Error("Unsupported trigger type");
    }
  }
  static fromResponse(data) {
    if (!data) {
      return void 0;
    }
    let type = data.getType();
    if (type != avs_pb16.TaskTrigger.TriggerTypeCase.FIXED_TIME && type != avs_pb16.TaskTrigger.TriggerTypeCase.CRON && type != avs_pb16.TaskTrigger.TriggerTypeCase.BLOCK && type != avs_pb16.TaskTrigger.TriggerTypeCase.EVENT) {
      throw new Error("Unable to determine trigger type from response");
    }
    return new _TriggerMetadata({
      type,
      blockNumber: data.getBlockNumber(),
      epoch: data.getEpoch(),
      logIndex: data.getLogIndex(),
      txHash: data.getTxHash()
    });
  }
  toRequest() {
    const request = new avs_pb16.TriggerMetadata();
    switch (this.type) {
      case TriggerTypes.FIXED_TIME:
      case TriggerTypes.CRON:
        if (this.epoch) {
          request.setEpoch(this.epoch);
        }
        break;
      case TriggerTypes.BLOCK:
        if (this.blockNumber) {
          request.setBlockNumber(this.blockNumber);
        }
        break;
      case TriggerTypes.EVENT:
        if (this.blockNumber) {
          request.setBlockNumber(this.blockNumber);
        }
        if (this.logIndex) {
          request.setLogIndex(this.logIndex);
        }
        if (this.txHash) {
          request.setTxHash(this.txHash);
        }
        break;
      default:
        throw new Error("Unsupported trigger type");
    }
    return request;
  }
};
var metadata_default = TriggerMetadata2;

// src/models/step.ts
var avs_pb17 = __toESM(require_avs_pb());
var Step = class _Step {
  constructor(props) {
    this.nodeId = props.nodeId;
    this.success = props.success;
    this.outputData = props.outputData;
    this.log = props.log;
    this.error = props.error;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
  }
  static fromResponse(step) {
    return new _Step({
      nodeId: step.getNodeId(),
      success: step.getSuccess(),
      outputData: step.getOutputData(),
      log: step.getLog(),
      error: step.getError(),
      startAt: step.getStartAt(),
      endAt: step.getEndAt()
    });
  }
  toRequest() {
    const step = new avs_pb17.Execution.Step();
    step.setNodeId(this.nodeId);
    step.setSuccess(this.success);
    step.setOutputData(this.outputData);
    step.setLog(this.log);
    step.setError(this.error);
    step.setStartAt(this.startAt);
    step.setEndAt(this.endAt);
    return step;
  }
};
var step_default = Step;

// src/models/execution.ts
var Execution3 = class _Execution {
  constructor(props) {
    this.id = props.id;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.success = props.success;
    this.error = props.error;
    this.triggerMetadata = props.triggerMetadata;
    this.result = props.result;
    this.stepsList = props.stepsList;
  }
  static fromResponse(execution) {
    return new _Execution({
      id: execution.getId(),
      startAt: execution.getStartAt(),
      endAt: execution.getEndAt(),
      success: execution.getSuccess(),
      error: execution.getError(),
      triggerMetadata: metadata_default.fromResponse(
        execution.getTriggerMetadata()
      ),
      result: execution.getResult(),
      stepsList: execution.getStepsList().map((step) => step_default.fromResponse(step))
    });
  }
  toRequest() {
    const execution = new avs_pb18.Execution();
    execution.setId(this.id);
    execution.setStartAt(this.startAt);
    execution.setEndAt(this.endAt);
    execution.setSuccess(this.success);
    execution.setError(this.error);
    execution.setStepsList(this.stepsList.map((step) => step.toRequest()));
    if (this.triggerMetadata) {
      execution.setTriggerMetadata(this.triggerMetadata.toRequest());
    }
    execution.setResult(this.result);
    return execution;
  }
};
var execution_default = Execution3;

// src/types.ts
var AUTH_KEY_HEADER = "authkey";
var DEFAULT_LIMIT = 10;

// src/index.ts
var BaseClient = class {
  constructor(opts) {
    this.endpoint = opts.endpoint;
    this.rpcClient = new import_avs_grpc_pb.AggregatorClient(
      this.endpoint,
      grpc.credentials.createInsecure()
    );
    this.factoryAddress = opts.factoryAddress;
    this.metadata = new import_grpc_js.Metadata();
  }
  /**
   * Check if the auth key is valid by decoding the JWT token and checking the expiration
   * @param key - The auth key
   * @returns {boolean} - Whether the auth key is valid
   */
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
  /**
   * The API key could retrieve a wallet’s authKey by skipping its signature verification
   * @param address - The address of the EOA wallet
   * @param apiKey - The API key
   * @param expiredAtEpoch - The expiration epoch
   * @returns {Promise<GetKeyResponse>} - The response from the auth call
   */
  async authWithAPIKey(address, apiKey, expiredAtEpoch) {
    const request = new avs_pb19.GetKeyReq();
    request.setOwner(address);
    request.setExpiredAt(expiredAtEpoch);
    request.setSignature(apiKey);
    const result = await this.sendGrpcRequest("getKey", request);
    return { authKey: result.getKey() };
  }
  /**
   * Getting an authKey from the server by verifying the signature of an EOA wallet
   * @param address - The address of the EOA wallet
   * @param signature - The signature of the EOA wallet
   * @param expiredAtEpoch - The expiration epoch
   * @returns {Promise<GetKeyResponse>} - The response from the auth call
   */
  async authWithSignature(address, signature, expiredAtEpoch) {
    const request = new avs_pb19.GetKeyReq();
    request.setOwner(address);
    request.setExpiredAt(expiredAtEpoch);
    request.setSignature(signature);
    const result = await this.sendGrpcRequest(
      "getKey",
      request
    );
    return { authKey: result.getKey() };
  }
  /**
   * The client could choose to store the authKey and use it for all requests; setting it to undefined will unset the authKey
   * The authKey can be overridden at the request level by request options
   * @param authKey - The auth key
   */
  setAuthKey(authKey) {
    this.authKey = authKey;
  }
  /**
   * Get the auth key if it’s set in the client
   * @returns {string | undefined} - The auth key
   */
  getAuthKey() {
    return this.authKey;
  }
  /**
   * Set the factory address of smart wallets for the client
   * @param address - The factory address
   */
  setFactoryAddress(address) {
    this.factoryAddress = address;
  }
  /**
   * Get the factory address if it’s set in the client
   * @returns {string | undefined} - The factory address
   */
  getFactoryAddress() {
    return this.factoryAddress;
  }
  /**
   * Send a gRPC request with an auth key
   * @param method - The method name
   * @param request - The request message
   * @param options - The request options
   * @returns {Promise<TResponse>} - The response from the gRPC call
   */
  sendGrpcRequest(method, request, options) {
    const metadata = import_lodash4.default.cloneDeep(this.metadata);
    if (options?.authKey) {
      metadata.set(AUTH_KEY_HEADER, options.authKey);
    } else if (this.authKey) {
      metadata.set(AUTH_KEY_HEADER, this.authKey);
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
  /**
   * Get the list of smart wallets; new wallets can be added to the list by calling `getWallet`
   * @param {RequestOptions} options - Request options
   * @returns {Promise<SmartWallet[]>} - The list of SmartWallet objects
   */
  async getWallets(options) {
    const request = new avs_pb19.ListWalletReq();
    const result = await this.sendGrpcRequest("listWallets", request, options);
    return result.getItemsList().map((item) => item.toObject());
  }
  /**
   * Add a new smart wallet address to the wallet list
   * @param {string} salt - The salt for the wallet
   * @param {string} factoryAddress - Factory address for the wallet; if not provided, the address stored in the client will be used
   * @param {RequestOptions} options - Request options
   * @returns {Promise<SmartWallet>} - The added SmartWallet object
   */
  async getWallet({ salt, factoryAddress }, options) {
    const request = new avs_pb19.GetWalletReq();
    request.setSalt(salt);
    if (factoryAddress) {
      request.setFactoryAddress(factoryAddress);
    } else if (this.factoryAddress) {
      request.setFactoryAddress(this.factoryAddress);
    }
    const result = await this.sendGrpcRequest("getWallet", request, options);
    return {
      address: result.getAddress(),
      salt: result.getSalt(),
      factory: result.getFactoryAddress()
    };
  }
  /**
   * Submit a workflow to the AVS server; once the workflow is submitted, it cannot be modified
   * @param {Workflow} workflow - Workflow object to submit
   * @param {RequestOptions} options - Request options
   * @returns {Promise<string>} - The Id of the submitted workflow
   */
  async submitWorkflow(workflow, options) {
    const request = workflow.toRequest();
    const result = await this.sendGrpcRequest("createTask", request, options);
    return result.getId();
  }
  createWorkflow(props) {
    return new workflow_default(props);
  }
  /**
   * Get the list of workflows; new workflows can be created by calling `submitWorkflow`
   * @param {string} address - The address of the smart wallet
   * @param {string} cursor - The cursor for the list
   * @param {number} limit - The limit for the list
   * @param {RequestOptions} options - Request options
   * @returns {Promise<{ cursor: string; result: Workflow[] }>} - The list of Workflow objects
   */
  async getWorkflows(addresses, options) {
    const request = new avs_pb19.ListTasksReq();
    for (const a of addresses) {
      request.addSmartWalletAddress(a);
    }
    if (options?.cursor) {
      request.setCursor(options.cursor);
    }
    request.setItemPerPage(options?.limit || DEFAULT_LIMIT);
    const result = await this.sendGrpcRequest("listTasks", request, options);
    return {
      cursor: result.getCursor(),
      hasMore: result.getHasMore(),
      result: result.getItemsList().map((item) => workflow_default.fromListResponse(item))
    };
  }
  /**
   * Get the list of executions for multiple workflow given in the workflows argument.
   * @param {string[]} workflows - The list of workflow ids to fetch execution for
   * @param {GetExecutionsRequest} options - Request options
   * @param {string} [options.cursor] - The cursor for pagination
   * @param {number} [options.limit] - The page limit of the response; default is 10
   * @param {string} [options.authKey] - The auth key for the request
   * @returns {Promise<{ cursor: string; result: Execution[] }>} - The list of Executions
   */
  async getExecutions(workflows, options) {
    const request = new avs_pb19.ListExecutionsReq();
    request.setTaskIdsList(workflows);
    if (options?.cursor && options?.cursor != "") {
      request.setCursor(options.cursor);
    }
    request.setItemPerPage(options?.limit || DEFAULT_LIMIT);
    const result = await this.sendGrpcRequest("listExecutions", request, options);
    return {
      cursor: result.getCursor(),
      result: result.getItemsList().map((item) => execution_default.fromResponse(item)),
      hasMore: result.getHasMore()
    };
  }
  /**
   * Get a single execution for given workflow and execution id
   * @param {string} workflowId - The workflow id
   * @param {string} executionId - The exectuion id
   * @param {GetExecutionsRequest} options - Request options
   * @returns {Promise<Execution>} - The result execution if it is existed
   */
  async getExecution(taskId, executionId, options) {
    const request = new avs_pb19.GetExecutionReq();
    request.setTaskId(taskId);
    request.setExecutionId(executionId);
    const result = await this.sendGrpcRequest("getExecution", request, options);
    return execution_default.fromResponse(result);
  }
  /**
   * Get a workflow by its Id
   * @param {string} id - The Id of the workflow
   * @param {RequestOptions} options - Request options
   * @returns {Promise<Workflow>} - The Workflow object
   */
  async getWorkflow(id, options) {
    const request = new avs_pb19.IdReq();
    request.setId(id);
    const result = await this.sendGrpcRequest(
      "getTask",
      request,
      options
    );
    return workflow_default.fromResponse(result);
  }
  /**
   * Manually trigger a workflow by its Id, and manual trigger data input
   * @param id - The Id of the workflow
   * @param triggerData - The data of the trigger
   * @param isBlocking - Whether the trigger is blocking
   * @param options - Request options
   * @returns {Promise<avs_pb.UserTriggerTaskResp>} - The response from the trigger workflow call
   */
  async triggerWorkflow({
    id,
    data,
    isBlocking = false
  }, options) {
    const request = new avs_pb19.UserTriggerTaskReq();
    request.setTaskId(id);
    request.setTriggerMetadata(new metadata_default(data).toRequest());
    request.setIsBlocking(isBlocking);
    const result = await this.sendGrpcRequest("triggerTask", request, options);
    return result.toObject();
  }
  /**
   * Cancel a workflow by its Id
   * @param {string} id - The Id of the workflow
   * @param {RequestOptions} options - Request options
   * @returns {Promise<boolean>} - Whether the workflow was successfully canceled
   */
  async cancelWorkflow(id, options) {
    const request = new avs_pb19.IdReq();
    request.setId(id);
    const result = await this.sendGrpcRequest(
      "cancelTask",
      request,
      options
    );
    return result.getValue();
  }
  /**
   * Delete a workflow by its Id
   * @param {string} id - The Id of the workflow
   * @param {RequestOptions} options - Request options
   * @returns {Promise<boolean>} - Whether the workflow was successfully deleted
   */
  async deleteWorkflow(id, options) {
    const request = new avs_pb19.IdReq();
    request.setId(id);
    const result = await this.sendGrpcRequest(
      "deleteTask",
      request,
      options
    );
    return result.getValue();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AUTH_KEY_HEADER,
  BlockTrigger,
  BranchNode,
  ContractReadNode,
  ContractWriteNode,
  CronTrigger,
  CustomCodeLangs,
  CustomCodeNode,
  DEFAULT_LIMIT,
  ETHTransferNode,
  Edge,
  EventTrigger,
  Execution,
  FixedTimeTrigger,
  GraphQLQueryNode,
  Node,
  NodeFactory,
  NodeTypes,
  RestAPINode,
  Trigger,
  TriggerFactory,
  TriggerTypes,
  Workflow,
  WorkflowStatuses,
  getKeyRequestMessage
});
