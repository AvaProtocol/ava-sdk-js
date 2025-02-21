// source: avs.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');
goog.object.extend(proto, google_protobuf_wrappers_pb);
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
goog.object.extend(proto, google_protobuf_timestamp_pb);
goog.exportSymbol('proto.aggregator.BlockCondition', null, global);
goog.exportSymbol('proto.aggregator.BranchNode', null, global);
goog.exportSymbol('proto.aggregator.Condition', null, global);
goog.exportSymbol('proto.aggregator.ContractReadNode', null, global);
goog.exportSymbol('proto.aggregator.ContractWriteNode', null, global);
goog.exportSymbol('proto.aggregator.CreateOrUpdateSecretReq', null, global);
goog.exportSymbol('proto.aggregator.CreateTaskReq', null, global);
goog.exportSymbol('proto.aggregator.CreateTaskResp', null, global);
goog.exportSymbol('proto.aggregator.CronCondition', null, global);
goog.exportSymbol('proto.aggregator.CustomCodeLang', null, global);
goog.exportSymbol('proto.aggregator.CustomCodeNode', null, global);
goog.exportSymbol('proto.aggregator.DeleteSecretReq', null, global);
goog.exportSymbol('proto.aggregator.ETHTransferNode', null, global);
goog.exportSymbol('proto.aggregator.Error', null, global);
goog.exportSymbol('proto.aggregator.EventCondition', null, global);
goog.exportSymbol('proto.aggregator.EventCondition.Matcher', null, global);
goog.exportSymbol('proto.aggregator.Execution', null, global);
goog.exportSymbol('proto.aggregator.Execution.BlockOutput', null, global);
goog.exportSymbol('proto.aggregator.Execution.OutputDataCase', null, global);
goog.exportSymbol('proto.aggregator.Execution.RawEventOutput', null, global);
goog.exportSymbol('proto.aggregator.Execution.Step', null, global);
goog.exportSymbol('proto.aggregator.Execution.TimeOutput', null, global);
goog.exportSymbol('proto.aggregator.Execution.TransferEventOutput', null, global);
goog.exportSymbol('proto.aggregator.ExecutionReq', null, global);
goog.exportSymbol('proto.aggregator.ExecutionStatus', null, global);
goog.exportSymbol('proto.aggregator.ExecutionStatusResp', null, global);
goog.exportSymbol('proto.aggregator.FilterNode', null, global);
goog.exportSymbol('proto.aggregator.FixedTimeCondition', null, global);
goog.exportSymbol('proto.aggregator.GetKeyReq', null, global);
goog.exportSymbol('proto.aggregator.GetWalletReq', null, global);
goog.exportSymbol('proto.aggregator.GetWalletResp', null, global);
goog.exportSymbol('proto.aggregator.GraphQLQueryNode', null, global);
goog.exportSymbol('proto.aggregator.IdReq', null, global);
goog.exportSymbol('proto.aggregator.KeyResp', null, global);
goog.exportSymbol('proto.aggregator.ListExecutionsReq', null, global);
goog.exportSymbol('proto.aggregator.ListExecutionsResp', null, global);
goog.exportSymbol('proto.aggregator.ListSecretsReq', null, global);
goog.exportSymbol('proto.aggregator.ListSecretsResp', null, global);
goog.exportSymbol('proto.aggregator.ListSecretsResp.ResponseSecret', null, global);
goog.exportSymbol('proto.aggregator.ListTasksReq', null, global);
goog.exportSymbol('proto.aggregator.ListTasksResp', null, global);
goog.exportSymbol('proto.aggregator.ListTasksResp.Item', null, global);
goog.exportSymbol('proto.aggregator.ListWalletReq', null, global);
goog.exportSymbol('proto.aggregator.ListWalletResp', null, global);
goog.exportSymbol('proto.aggregator.LoopNode', null, global);
goog.exportSymbol('proto.aggregator.LoopNode.RunnerCase', null, global);
goog.exportSymbol('proto.aggregator.NonceRequest', null, global);
goog.exportSymbol('proto.aggregator.NonceResp', null, global);
goog.exportSymbol('proto.aggregator.RestAPINode', null, global);
goog.exportSymbol('proto.aggregator.SmartWallet', null, global);
goog.exportSymbol('proto.aggregator.Task', null, global);
goog.exportSymbol('proto.aggregator.TaskEdge', null, global);
goog.exportSymbol('proto.aggregator.TaskNode', null, global);
goog.exportSymbol('proto.aggregator.TaskNode.TaskTypeCase', null, global);
goog.exportSymbol('proto.aggregator.TaskStatus', null, global);
goog.exportSymbol('proto.aggregator.TaskTrigger', null, global);
goog.exportSymbol('proto.aggregator.TaskTrigger.TriggerTypeCase', null, global);
goog.exportSymbol('proto.aggregator.TriggerReason', null, global);
goog.exportSymbol('proto.aggregator.TriggerReason.TriggerType', null, global);
goog.exportSymbol('proto.aggregator.UserTriggerTaskReq', null, global);
goog.exportSymbol('proto.aggregator.UserTriggerTaskResp', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.IdReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.IdReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.IdReq.displayName = 'proto.aggregator.IdReq';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.FixedTimeCondition = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.FixedTimeCondition.repeatedFields_, null);
};
goog.inherits(proto.aggregator.FixedTimeCondition, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.FixedTimeCondition.displayName = 'proto.aggregator.FixedTimeCondition';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.CronCondition = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.CronCondition.repeatedFields_, null);
};
goog.inherits(proto.aggregator.CronCondition, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.CronCondition.displayName = 'proto.aggregator.CronCondition';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.BlockCondition = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.BlockCondition, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.BlockCondition.displayName = 'proto.aggregator.BlockCondition';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.EventCondition = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.EventCondition.repeatedFields_, null);
};
goog.inherits(proto.aggregator.EventCondition, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.EventCondition.displayName = 'proto.aggregator.EventCondition';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.EventCondition.Matcher = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.EventCondition.Matcher.repeatedFields_, null);
};
goog.inherits(proto.aggregator.EventCondition.Matcher, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.EventCondition.Matcher.displayName = 'proto.aggregator.EventCondition.Matcher';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.TaskTrigger = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.aggregator.TaskTrigger.oneofGroups_);
};
goog.inherits(proto.aggregator.TaskTrigger, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.TaskTrigger.displayName = 'proto.aggregator.TaskTrigger';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.ETHTransferNode = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.ETHTransferNode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ETHTransferNode.displayName = 'proto.aggregator.ETHTransferNode';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.ContractWriteNode = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.ContractWriteNode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ContractWriteNode.displayName = 'proto.aggregator.ContractWriteNode';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.ContractReadNode = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.ContractReadNode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ContractReadNode.displayName = 'proto.aggregator.ContractReadNode';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.GraphQLQueryNode = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.GraphQLQueryNode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.GraphQLQueryNode.displayName = 'proto.aggregator.GraphQLQueryNode';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.RestAPINode = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.RestAPINode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.RestAPINode.displayName = 'proto.aggregator.RestAPINode';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.CustomCodeNode = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.CustomCodeNode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.CustomCodeNode.displayName = 'proto.aggregator.CustomCodeNode';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.Condition = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.Condition, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.Condition.displayName = 'proto.aggregator.Condition';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.BranchNode = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.BranchNode.repeatedFields_, null);
};
goog.inherits(proto.aggregator.BranchNode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.BranchNode.displayName = 'proto.aggregator.BranchNode';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.FilterNode = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.FilterNode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.FilterNode.displayName = 'proto.aggregator.FilterNode';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.LoopNode = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.aggregator.LoopNode.oneofGroups_);
};
goog.inherits(proto.aggregator.LoopNode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.LoopNode.displayName = 'proto.aggregator.LoopNode';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.TaskEdge = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.TaskEdge, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.TaskEdge.displayName = 'proto.aggregator.TaskEdge';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.TaskNode = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.aggregator.TaskNode.oneofGroups_);
};
goog.inherits(proto.aggregator.TaskNode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.TaskNode.displayName = 'proto.aggregator.TaskNode';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.Execution = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.Execution.repeatedFields_, proto.aggregator.Execution.oneofGroups_);
};
goog.inherits(proto.aggregator.Execution, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.Execution.displayName = 'proto.aggregator.Execution';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.Execution.Step = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.Execution.Step.repeatedFields_, null);
};
goog.inherits(proto.aggregator.Execution.Step, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.Execution.Step.displayName = 'proto.aggregator.Execution.Step';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.Execution.TransferEventOutput = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.Execution.TransferEventOutput, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.Execution.TransferEventOutput.displayName = 'proto.aggregator.Execution.TransferEventOutput';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.Execution.RawEventOutput = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.Execution.RawEventOutput.repeatedFields_, null);
};
goog.inherits(proto.aggregator.Execution.RawEventOutput, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.Execution.RawEventOutput.displayName = 'proto.aggregator.Execution.RawEventOutput';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.Execution.BlockOutput = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.Execution.BlockOutput, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.Execution.BlockOutput.displayName = 'proto.aggregator.Execution.BlockOutput';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.Execution.TimeOutput = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.Execution.TimeOutput, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.Execution.TimeOutput.displayName = 'proto.aggregator.Execution.TimeOutput';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.Task = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.Task.repeatedFields_, null);
};
goog.inherits(proto.aggregator.Task, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.Task.displayName = 'proto.aggregator.Task';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.CreateTaskReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.CreateTaskReq.repeatedFields_, null);
};
goog.inherits(proto.aggregator.CreateTaskReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.CreateTaskReq.displayName = 'proto.aggregator.CreateTaskReq';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.CreateTaskResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.CreateTaskResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.CreateTaskResp.displayName = 'proto.aggregator.CreateTaskResp';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.NonceRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.NonceRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.NonceRequest.displayName = 'proto.aggregator.NonceRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.NonceResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.NonceResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.NonceResp.displayName = 'proto.aggregator.NonceResp';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.ListWalletReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.ListWalletReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ListWalletReq.displayName = 'proto.aggregator.ListWalletReq';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.SmartWallet = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.SmartWallet, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.SmartWallet.displayName = 'proto.aggregator.SmartWallet';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.ListWalletResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.ListWalletResp.repeatedFields_, null);
};
goog.inherits(proto.aggregator.ListWalletResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ListWalletResp.displayName = 'proto.aggregator.ListWalletResp';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.ListTasksReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.ListTasksReq.repeatedFields_, null);
};
goog.inherits(proto.aggregator.ListTasksReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ListTasksReq.displayName = 'proto.aggregator.ListTasksReq';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.ListTasksResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.ListTasksResp.repeatedFields_, null);
};
goog.inherits(proto.aggregator.ListTasksResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ListTasksResp.displayName = 'proto.aggregator.ListTasksResp';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.ListTasksResp.Item = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.ListTasksResp.Item, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ListTasksResp.Item.displayName = 'proto.aggregator.ListTasksResp.Item';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.ListExecutionsReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.ListExecutionsReq.repeatedFields_, null);
};
goog.inherits(proto.aggregator.ListExecutionsReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ListExecutionsReq.displayName = 'proto.aggregator.ListExecutionsReq';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.ListExecutionsResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.ListExecutionsResp.repeatedFields_, null);
};
goog.inherits(proto.aggregator.ListExecutionsResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ListExecutionsResp.displayName = 'proto.aggregator.ListExecutionsResp';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.ExecutionReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.ExecutionReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ExecutionReq.displayName = 'proto.aggregator.ExecutionReq';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.ExecutionStatusResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.ExecutionStatusResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ExecutionStatusResp.displayName = 'proto.aggregator.ExecutionStatusResp';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.GetKeyReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.GetKeyReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.GetKeyReq.displayName = 'proto.aggregator.GetKeyReq';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.KeyResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.KeyResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.KeyResp.displayName = 'proto.aggregator.KeyResp';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.TriggerReason = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.TriggerReason, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.TriggerReason.displayName = 'proto.aggregator.TriggerReason';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.GetWalletReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.GetWalletReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.GetWalletReq.displayName = 'proto.aggregator.GetWalletReq';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.GetWalletResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.GetWalletResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.GetWalletResp.displayName = 'proto.aggregator.GetWalletResp';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.UserTriggerTaskReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.UserTriggerTaskReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.UserTriggerTaskReq.displayName = 'proto.aggregator.UserTriggerTaskReq';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.UserTriggerTaskResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.UserTriggerTaskResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.UserTriggerTaskResp.displayName = 'proto.aggregator.UserTriggerTaskResp';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.CreateOrUpdateSecretReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.CreateOrUpdateSecretReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.CreateOrUpdateSecretReq.displayName = 'proto.aggregator.CreateOrUpdateSecretReq';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.ListSecretsReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.ListSecretsReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ListSecretsReq.displayName = 'proto.aggregator.ListSecretsReq';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.ListSecretsResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.ListSecretsResp.repeatedFields_, null);
};
goog.inherits(proto.aggregator.ListSecretsResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ListSecretsResp.displayName = 'proto.aggregator.ListSecretsResp';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.ListSecretsResp.ResponseSecret = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.ListSecretsResp.ResponseSecret, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ListSecretsResp.ResponseSecret.displayName = 'proto.aggregator.ListSecretsResp.ResponseSecret';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.aggregator.DeleteSecretReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.DeleteSecretReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.DeleteSecretReq.displayName = 'proto.aggregator.DeleteSecretReq';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.IdReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.IdReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.IdReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.IdReq}
 */
proto.aggregator.IdReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.IdReq;
  return proto.aggregator.IdReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.IdReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.IdReq}
 */
proto.aggregator.IdReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.IdReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.IdReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.IdReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.IdReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.aggregator.IdReq.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.IdReq} returns this
 */
proto.aggregator.IdReq.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.FixedTimeCondition.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.FixedTimeCondition.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.FixedTimeCondition.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.FixedTimeCondition} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.FixedTimeCondition.toObject = function(includeInstance, msg) {
  var f, obj = {
    epochsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.FixedTimeCondition}
 */
proto.aggregator.FixedTimeCondition.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.FixedTimeCondition;
  return proto.aggregator.FixedTimeCondition.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.FixedTimeCondition} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.FixedTimeCondition}
 */
proto.aggregator.FixedTimeCondition.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedInt64() : [reader.readInt64()]);
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


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.FixedTimeCondition.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.FixedTimeCondition.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.FixedTimeCondition} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.FixedTimeCondition.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEpochsList();
  if (f.length > 0) {
    writer.writePackedInt64(
      1,
      f
    );
  }
};


/**
 * repeated int64 epochs = 1;
 * @return {!Array<number>}
 */
proto.aggregator.FixedTimeCondition.prototype.getEpochsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.aggregator.FixedTimeCondition} returns this
 */
proto.aggregator.FixedTimeCondition.prototype.setEpochsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.FixedTimeCondition} returns this
 */
proto.aggregator.FixedTimeCondition.prototype.addEpochs = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.FixedTimeCondition} returns this
 */
proto.aggregator.FixedTimeCondition.prototype.clearEpochsList = function() {
  return this.setEpochsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.CronCondition.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.CronCondition.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.CronCondition.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.CronCondition} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CronCondition.toObject = function(includeInstance, msg) {
  var f, obj = {
    scheduleList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.CronCondition}
 */
proto.aggregator.CronCondition.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.CronCondition;
  return proto.aggregator.CronCondition.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.CronCondition} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.CronCondition}
 */
proto.aggregator.CronCondition.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addSchedule(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.CronCondition.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.CronCondition.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.CronCondition} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CronCondition.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getScheduleList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
};


/**
 * repeated string schedule = 1;
 * @return {!Array<string>}
 */
proto.aggregator.CronCondition.prototype.getScheduleList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.CronCondition} returns this
 */
proto.aggregator.CronCondition.prototype.setScheduleList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.CronCondition} returns this
 */
proto.aggregator.CronCondition.prototype.addSchedule = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.CronCondition} returns this
 */
proto.aggregator.CronCondition.prototype.clearScheduleList = function() {
  return this.setScheduleList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.BlockCondition.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.BlockCondition.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.BlockCondition} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.BlockCondition}
 */
proto.aggregator.BlockCondition.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.BlockCondition;
  return proto.aggregator.BlockCondition.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.BlockCondition} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.BlockCondition}
 */
proto.aggregator.BlockCondition.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setInterval(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.BlockCondition.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.BlockCondition.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.BlockCondition} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BlockCondition.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getInterval();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
};


/**
 * optional int64 interval = 1;
 * @return {number}
 */
proto.aggregator.BlockCondition.prototype.getInterval = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.BlockCondition} returns this
 */
proto.aggregator.BlockCondition.prototype.setInterval = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.EventCondition.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.EventCondition.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.EventCondition.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.EventCondition} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EventCondition.toObject = function(includeInstance, msg) {
  var f, obj = {
    matcherList: jspb.Message.toObjectList(msg.getMatcherList(),
    proto.aggregator.EventCondition.Matcher.toObject, includeInstance),
    expression: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.EventCondition}
 */
proto.aggregator.EventCondition.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.EventCondition;
  return proto.aggregator.EventCondition.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.EventCondition} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.EventCondition}
 */
proto.aggregator.EventCondition.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.EventCondition.Matcher;
      reader.readMessage(value,proto.aggregator.EventCondition.Matcher.deserializeBinaryFromReader);
      msg.addMatcher(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setExpression(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.EventCondition.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.EventCondition.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.EventCondition} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EventCondition.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMatcherList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.aggregator.EventCondition.Matcher.serializeBinaryToWriter
    );
  }
  f = message.getExpression();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.EventCondition.Matcher.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.EventCondition.Matcher.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.EventCondition.Matcher.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.EventCondition.Matcher} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EventCondition.Matcher.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, ""),
    valueList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.EventCondition.Matcher}
 */
proto.aggregator.EventCondition.Matcher.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.EventCondition.Matcher;
  return proto.aggregator.EventCondition.Matcher.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.EventCondition.Matcher} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.EventCondition.Matcher}
 */
proto.aggregator.EventCondition.Matcher.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setType(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.addValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.EventCondition.Matcher.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.EventCondition.Matcher.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.EventCondition.Matcher} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EventCondition.Matcher.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getValueList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * optional string type = 1;
 * @return {string}
 */
proto.aggregator.EventCondition.Matcher.prototype.getType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.EventCondition.Matcher} returns this
 */
proto.aggregator.EventCondition.Matcher.prototype.setType = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated string value = 2;
 * @return {!Array<string>}
 */
proto.aggregator.EventCondition.Matcher.prototype.getValueList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.EventCondition.Matcher} returns this
 */
proto.aggregator.EventCondition.Matcher.prototype.setValueList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.EventCondition.Matcher} returns this
 */
proto.aggregator.EventCondition.Matcher.prototype.addValue = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.EventCondition.Matcher} returns this
 */
proto.aggregator.EventCondition.Matcher.prototype.clearValueList = function() {
  return this.setValueList([]);
};


/**
 * repeated Matcher matcher = 1;
 * @return {!Array<!proto.aggregator.EventCondition.Matcher>}
 */
proto.aggregator.EventCondition.prototype.getMatcherList = function() {
  return /** @type{!Array<!proto.aggregator.EventCondition.Matcher>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.EventCondition.Matcher, 1));
};


/**
 * @param {!Array<!proto.aggregator.EventCondition.Matcher>} value
 * @return {!proto.aggregator.EventCondition} returns this
*/
proto.aggregator.EventCondition.prototype.setMatcherList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.aggregator.EventCondition.Matcher=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.EventCondition.Matcher}
 */
proto.aggregator.EventCondition.prototype.addMatcher = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.aggregator.EventCondition.Matcher, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.EventCondition} returns this
 */
proto.aggregator.EventCondition.prototype.clearMatcherList = function() {
  return this.setMatcherList([]);
};


/**
 * optional string expression = 2;
 * @return {string}
 */
proto.aggregator.EventCondition.prototype.getExpression = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.EventCondition} returns this
 */
proto.aggregator.EventCondition.prototype.setExpression = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.aggregator.TaskTrigger.oneofGroups_ = [[2,3,4,5,6]];

/**
 * @enum {number}
 */
proto.aggregator.TaskTrigger.TriggerTypeCase = {
  TRIGGER_TYPE_NOT_SET: 0,
  MANUAL: 2,
  FIXED_TIME: 3,
  CRON: 4,
  BLOCK: 5,
  EVENT: 6
};

/**
 * @return {proto.aggregator.TaskTrigger.TriggerTypeCase}
 */
proto.aggregator.TaskTrigger.prototype.getTriggerTypeCase = function() {
  return /** @type {proto.aggregator.TaskTrigger.TriggerTypeCase} */(jspb.Message.computeOneofCase(this, proto.aggregator.TaskTrigger.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.TaskTrigger.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.TaskTrigger.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.TaskTrigger} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.TaskTrigger.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    manual: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    fixedTime: (f = msg.getFixedTime()) && proto.aggregator.FixedTimeCondition.toObject(includeInstance, f),
    cron: (f = msg.getCron()) && proto.aggregator.CronCondition.toObject(includeInstance, f),
    block: (f = msg.getBlock()) && proto.aggregator.BlockCondition.toObject(includeInstance, f),
    event: (f = msg.getEvent()) && proto.aggregator.EventCondition.toObject(includeInstance, f),
    id: jspb.Message.getFieldWithDefault(msg, 7, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.TaskTrigger}
 */
proto.aggregator.TaskTrigger.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.TaskTrigger;
  return proto.aggregator.TaskTrigger.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.TaskTrigger} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.TaskTrigger}
 */
proto.aggregator.TaskTrigger.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setManual(value);
      break;
    case 3:
      var value = new proto.aggregator.FixedTimeCondition;
      reader.readMessage(value,proto.aggregator.FixedTimeCondition.deserializeBinaryFromReader);
      msg.setFixedTime(value);
      break;
    case 4:
      var value = new proto.aggregator.CronCondition;
      reader.readMessage(value,proto.aggregator.CronCondition.deserializeBinaryFromReader);
      msg.setCron(value);
      break;
    case 5:
      var value = new proto.aggregator.BlockCondition;
      reader.readMessage(value,proto.aggregator.BlockCondition.deserializeBinaryFromReader);
      msg.setBlock(value);
      break;
    case 6:
      var value = new proto.aggregator.EventCondition;
      reader.readMessage(value,proto.aggregator.EventCondition.deserializeBinaryFromReader);
      msg.setEvent(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.TaskTrigger.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.TaskTrigger.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.TaskTrigger} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.TaskTrigger.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 2));
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
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.aggregator.TaskTrigger.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.TaskTrigger} returns this
 */
proto.aggregator.TaskTrigger.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool manual = 2;
 * @return {boolean}
 */
proto.aggregator.TaskTrigger.prototype.getManual = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.TaskTrigger} returns this
 */
proto.aggregator.TaskTrigger.prototype.setManual = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.aggregator.TaskTrigger.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.aggregator.TaskTrigger} returns this
 */
proto.aggregator.TaskTrigger.prototype.clearManual = function() {
  return jspb.Message.setOneofField(this, 2, proto.aggregator.TaskTrigger.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TaskTrigger.prototype.hasManual = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional FixedTimeCondition fixed_time = 3;
 * @return {?proto.aggregator.FixedTimeCondition}
 */
proto.aggregator.TaskTrigger.prototype.getFixedTime = function() {
  return /** @type{?proto.aggregator.FixedTimeCondition} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FixedTimeCondition, 3));
};


/**
 * @param {?proto.aggregator.FixedTimeCondition|undefined} value
 * @return {!proto.aggregator.TaskTrigger} returns this
*/
proto.aggregator.TaskTrigger.prototype.setFixedTime = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.aggregator.TaskTrigger.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TaskTrigger} returns this
 */
proto.aggregator.TaskTrigger.prototype.clearFixedTime = function() {
  return this.setFixedTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TaskTrigger.prototype.hasFixedTime = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional CronCondition cron = 4;
 * @return {?proto.aggregator.CronCondition}
 */
proto.aggregator.TaskTrigger.prototype.getCron = function() {
  return /** @type{?proto.aggregator.CronCondition} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.CronCondition, 4));
};


/**
 * @param {?proto.aggregator.CronCondition|undefined} value
 * @return {!proto.aggregator.TaskTrigger} returns this
*/
proto.aggregator.TaskTrigger.prototype.setCron = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.aggregator.TaskTrigger.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TaskTrigger} returns this
 */
proto.aggregator.TaskTrigger.prototype.clearCron = function() {
  return this.setCron(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TaskTrigger.prototype.hasCron = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional BlockCondition block = 5;
 * @return {?proto.aggregator.BlockCondition}
 */
proto.aggregator.TaskTrigger.prototype.getBlock = function() {
  return /** @type{?proto.aggregator.BlockCondition} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.BlockCondition, 5));
};


/**
 * @param {?proto.aggregator.BlockCondition|undefined} value
 * @return {!proto.aggregator.TaskTrigger} returns this
*/
proto.aggregator.TaskTrigger.prototype.setBlock = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.aggregator.TaskTrigger.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TaskTrigger} returns this
 */
proto.aggregator.TaskTrigger.prototype.clearBlock = function() {
  return this.setBlock(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TaskTrigger.prototype.hasBlock = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional EventCondition event = 6;
 * @return {?proto.aggregator.EventCondition}
 */
proto.aggregator.TaskTrigger.prototype.getEvent = function() {
  return /** @type{?proto.aggregator.EventCondition} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.EventCondition, 6));
};


/**
 * @param {?proto.aggregator.EventCondition|undefined} value
 * @return {!proto.aggregator.TaskTrigger} returns this
*/
proto.aggregator.TaskTrigger.prototype.setEvent = function(value) {
  return jspb.Message.setOneofWrapperField(this, 6, proto.aggregator.TaskTrigger.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TaskTrigger} returns this
 */
proto.aggregator.TaskTrigger.prototype.clearEvent = function() {
  return this.setEvent(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TaskTrigger.prototype.hasEvent = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional string id = 7;
 * @return {string}
 */
proto.aggregator.TaskTrigger.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.TaskTrigger} returns this
 */
proto.aggregator.TaskTrigger.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.ETHTransferNode.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ETHTransferNode.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ETHTransferNode} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.ETHTransferNode}
 */
proto.aggregator.ETHTransferNode.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ETHTransferNode;
  return proto.aggregator.ETHTransferNode.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ETHTransferNode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ETHTransferNode}
 */
proto.aggregator.ETHTransferNode.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setDestination(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setAmount(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.ETHTransferNode.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ETHTransferNode.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ETHTransferNode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ETHTransferNode.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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


/**
 * optional string destination = 1;
 * @return {string}
 */
proto.aggregator.ETHTransferNode.prototype.getDestination = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ETHTransferNode} returns this
 */
proto.aggregator.ETHTransferNode.prototype.setDestination = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string amount = 2;
 * @return {string}
 */
proto.aggregator.ETHTransferNode.prototype.getAmount = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ETHTransferNode} returns this
 */
proto.aggregator.ETHTransferNode.prototype.setAmount = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.ContractWriteNode.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ContractWriteNode.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ContractWriteNode} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.ContractWriteNode}
 */
proto.aggregator.ContractWriteNode.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ContractWriteNode;
  return proto.aggregator.ContractWriteNode.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ContractWriteNode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ContractWriteNode}
 */
proto.aggregator.ContractWriteNode.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractAddress(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCallData(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractAbi(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.ContractWriteNode.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ContractWriteNode.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ContractWriteNode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractWriteNode.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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


/**
 * optional string contract_address = 1;
 * @return {string}
 */
proto.aggregator.ContractWriteNode.prototype.getContractAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractWriteNode} returns this
 */
proto.aggregator.ContractWriteNode.prototype.setContractAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string call_data = 2;
 * @return {string}
 */
proto.aggregator.ContractWriteNode.prototype.getCallData = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractWriteNode} returns this
 */
proto.aggregator.ContractWriteNode.prototype.setCallData = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string contract_abi = 3;
 * @return {string}
 */
proto.aggregator.ContractWriteNode.prototype.getContractAbi = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractWriteNode} returns this
 */
proto.aggregator.ContractWriteNode.prototype.setContractAbi = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.ContractReadNode.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ContractReadNode.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ContractReadNode} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractReadNode.toObject = function(includeInstance, msg) {
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.ContractReadNode}
 */
proto.aggregator.ContractReadNode.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ContractReadNode;
  return proto.aggregator.ContractReadNode.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ContractReadNode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ContractReadNode}
 */
proto.aggregator.ContractReadNode.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractAddress(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCallData(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractAbi(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.ContractReadNode.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ContractReadNode.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ContractReadNode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractReadNode.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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


/**
 * optional string contract_address = 1;
 * @return {string}
 */
proto.aggregator.ContractReadNode.prototype.getContractAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractReadNode} returns this
 */
proto.aggregator.ContractReadNode.prototype.setContractAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string call_data = 2;
 * @return {string}
 */
proto.aggregator.ContractReadNode.prototype.getCallData = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractReadNode} returns this
 */
proto.aggregator.ContractReadNode.prototype.setCallData = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string contract_abi = 3;
 * @return {string}
 */
proto.aggregator.ContractReadNode.prototype.getContractAbi = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractReadNode} returns this
 */
proto.aggregator.ContractReadNode.prototype.setContractAbi = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.GraphQLQueryNode.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.GraphQLQueryNode.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.GraphQLQueryNode} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GraphQLQueryNode.toObject = function(includeInstance, msg) {
  var f, obj = {
    url: jspb.Message.getFieldWithDefault(msg, 1, ""),
    query: jspb.Message.getFieldWithDefault(msg, 2, ""),
    variablesMap: (f = msg.getVariablesMap()) ? f.toObject(includeInstance, undefined) : []
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.GraphQLQueryNode}
 */
proto.aggregator.GraphQLQueryNode.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.GraphQLQueryNode;
  return proto.aggregator.GraphQLQueryNode.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.GraphQLQueryNode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.GraphQLQueryNode}
 */
proto.aggregator.GraphQLQueryNode.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setQuery(value);
      break;
    case 3:
      var value = msg.getVariablesMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.GraphQLQueryNode.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.GraphQLQueryNode.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.GraphQLQueryNode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GraphQLQueryNode.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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


/**
 * optional string url = 1;
 * @return {string}
 */
proto.aggregator.GraphQLQueryNode.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GraphQLQueryNode} returns this
 */
proto.aggregator.GraphQLQueryNode.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string query = 2;
 * @return {string}
 */
proto.aggregator.GraphQLQueryNode.prototype.getQuery = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GraphQLQueryNode} returns this
 */
proto.aggregator.GraphQLQueryNode.prototype.setQuery = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * map<string, string> variables = 3;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.aggregator.GraphQLQueryNode.prototype.getVariablesMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 3, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.aggregator.GraphQLQueryNode} returns this
 */
proto.aggregator.GraphQLQueryNode.prototype.clearVariablesMap = function() {
  this.getVariablesMap().clear();
  return this;};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.RestAPINode.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.RestAPINode.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.RestAPINode} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.RestAPINode.toObject = function(includeInstance, msg) {
  var f, obj = {
    url: jspb.Message.getFieldWithDefault(msg, 1, ""),
    headersMap: (f = msg.getHeadersMap()) ? f.toObject(includeInstance, undefined) : [],
    body: jspb.Message.getFieldWithDefault(msg, 3, ""),
    method: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.RestAPINode}
 */
proto.aggregator.RestAPINode.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.RestAPINode;
  return proto.aggregator.RestAPINode.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.RestAPINode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.RestAPINode}
 */
proto.aggregator.RestAPINode.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    case 2:
      var value = msg.getHeadersMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setBody(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMethod(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.RestAPINode.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.RestAPINode.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.RestAPINode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.RestAPINode.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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


/**
 * optional string url = 1;
 * @return {string}
 */
proto.aggregator.RestAPINode.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.RestAPINode} returns this
 */
proto.aggregator.RestAPINode.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * map<string, string> headers = 2;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.aggregator.RestAPINode.prototype.getHeadersMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 2, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.aggregator.RestAPINode} returns this
 */
proto.aggregator.RestAPINode.prototype.clearHeadersMap = function() {
  this.getHeadersMap().clear();
  return this;};


/**
 * optional string body = 3;
 * @return {string}
 */
proto.aggregator.RestAPINode.prototype.getBody = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.RestAPINode} returns this
 */
proto.aggregator.RestAPINode.prototype.setBody = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string method = 4;
 * @return {string}
 */
proto.aggregator.RestAPINode.prototype.getMethod = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.RestAPINode} returns this
 */
proto.aggregator.RestAPINode.prototype.setMethod = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.CustomCodeNode.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.CustomCodeNode.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.CustomCodeNode} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.CustomCodeNode}
 */
proto.aggregator.CustomCodeNode.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.CustomCodeNode;
  return proto.aggregator.CustomCodeNode.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.CustomCodeNode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.CustomCodeNode}
 */
proto.aggregator.CustomCodeNode.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.aggregator.CustomCodeLang} */ (reader.readEnum());
      msg.setLang(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSource(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.CustomCodeNode.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.CustomCodeNode.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.CustomCodeNode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CustomCodeNode.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLang();
  if (f !== 0.0) {
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


/**
 * optional CustomCodeLang lang = 1;
 * @return {!proto.aggregator.CustomCodeLang}
 */
proto.aggregator.CustomCodeNode.prototype.getLang = function() {
  return /** @type {!proto.aggregator.CustomCodeLang} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.aggregator.CustomCodeLang} value
 * @return {!proto.aggregator.CustomCodeNode} returns this
 */
proto.aggregator.CustomCodeNode.prototype.setLang = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional string source = 2;
 * @return {string}
 */
proto.aggregator.CustomCodeNode.prototype.getSource = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.CustomCodeNode} returns this
 */
proto.aggregator.CustomCodeNode.prototype.setSource = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.Condition.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.Condition.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.Condition} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.Condition}
 */
proto.aggregator.Condition.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.Condition;
  return proto.aggregator.Condition.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.Condition} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.Condition}
 */
proto.aggregator.Condition.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setType(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setExpression(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.Condition.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.Condition.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.Condition} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.Condition.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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


/**
 * optional string id = 1;
 * @return {string}
 */
proto.aggregator.Condition.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Condition} returns this
 */
proto.aggregator.Condition.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string type = 2;
 * @return {string}
 */
proto.aggregator.Condition.prototype.getType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Condition} returns this
 */
proto.aggregator.Condition.prototype.setType = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string expression = 3;
 * @return {string}
 */
proto.aggregator.Condition.prototype.getExpression = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Condition} returns this
 */
proto.aggregator.Condition.prototype.setExpression = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.BranchNode.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.BranchNode.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.BranchNode.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.BranchNode} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BranchNode.toObject = function(includeInstance, msg) {
  var f, obj = {
    conditionsList: jspb.Message.toObjectList(msg.getConditionsList(),
    proto.aggregator.Condition.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.BranchNode}
 */
proto.aggregator.BranchNode.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.BranchNode;
  return proto.aggregator.BranchNode.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.BranchNode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.BranchNode}
 */
proto.aggregator.BranchNode.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.Condition;
      reader.readMessage(value,proto.aggregator.Condition.deserializeBinaryFromReader);
      msg.addConditions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.BranchNode.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.BranchNode.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.BranchNode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BranchNode.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConditionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.aggregator.Condition.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Condition conditions = 1;
 * @return {!Array<!proto.aggregator.Condition>}
 */
proto.aggregator.BranchNode.prototype.getConditionsList = function() {
  return /** @type{!Array<!proto.aggregator.Condition>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.Condition, 1));
};


/**
 * @param {!Array<!proto.aggregator.Condition>} value
 * @return {!proto.aggregator.BranchNode} returns this
*/
proto.aggregator.BranchNode.prototype.setConditionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.aggregator.Condition=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.Condition}
 */
proto.aggregator.BranchNode.prototype.addConditions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.aggregator.Condition, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.BranchNode} returns this
 */
proto.aggregator.BranchNode.prototype.clearConditionsList = function() {
  return this.setConditionsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.FilterNode.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.FilterNode.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.FilterNode} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.FilterNode.toObject = function(includeInstance, msg) {
  var f, obj = {
    expression: jspb.Message.getFieldWithDefault(msg, 1, ""),
    input: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.FilterNode}
 */
proto.aggregator.FilterNode.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.FilterNode;
  return proto.aggregator.FilterNode.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.FilterNode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.FilterNode}
 */
proto.aggregator.FilterNode.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setExpression(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setInput(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.FilterNode.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.FilterNode.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.FilterNode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.FilterNode.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getExpression();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getInput();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string expression = 1;
 * @return {string}
 */
proto.aggregator.FilterNode.prototype.getExpression = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.FilterNode} returns this
 */
proto.aggregator.FilterNode.prototype.setExpression = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string input = 2;
 * @return {string}
 */
proto.aggregator.FilterNode.prototype.getInput = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.FilterNode} returns this
 */
proto.aggregator.FilterNode.prototype.setInput = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.aggregator.LoopNode.oneofGroups_ = [[10,11,12,13,14,15]];

/**
 * @enum {number}
 */
proto.aggregator.LoopNode.RunnerCase = {
  RUNNER_NOT_SET: 0,
  ETH_TRANSFER: 10,
  CONTRACT_WRITE: 11,
  CONTRACT_READ: 12,
  GRAPHQL_DATA_QUERY: 13,
  REST_API: 14,
  CUSTOM_CODE: 15
};

/**
 * @return {proto.aggregator.LoopNode.RunnerCase}
 */
proto.aggregator.LoopNode.prototype.getRunnerCase = function() {
  return /** @type {proto.aggregator.LoopNode.RunnerCase} */(jspb.Message.computeOneofCase(this, proto.aggregator.LoopNode.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.LoopNode.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.LoopNode.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.LoopNode} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.LoopNode}
 */
proto.aggregator.LoopNode.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.LoopNode;
  return proto.aggregator.LoopNode.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.LoopNode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.LoopNode}
 */
proto.aggregator.LoopNode.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setInput(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setIterVal(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setIterKey(value);
      break;
    case 10:
      var value = new proto.aggregator.ETHTransferNode;
      reader.readMessage(value,proto.aggregator.ETHTransferNode.deserializeBinaryFromReader);
      msg.setEthTransfer(value);
      break;
    case 11:
      var value = new proto.aggregator.ContractWriteNode;
      reader.readMessage(value,proto.aggregator.ContractWriteNode.deserializeBinaryFromReader);
      msg.setContractWrite(value);
      break;
    case 12:
      var value = new proto.aggregator.ContractReadNode;
      reader.readMessage(value,proto.aggregator.ContractReadNode.deserializeBinaryFromReader);
      msg.setContractRead(value);
      break;
    case 13:
      var value = new proto.aggregator.GraphQLQueryNode;
      reader.readMessage(value,proto.aggregator.GraphQLQueryNode.deserializeBinaryFromReader);
      msg.setGraphqlDataQuery(value);
      break;
    case 14:
      var value = new proto.aggregator.RestAPINode;
      reader.readMessage(value,proto.aggregator.RestAPINode.deserializeBinaryFromReader);
      msg.setRestApi(value);
      break;
    case 15:
      var value = new proto.aggregator.CustomCodeNode;
      reader.readMessage(value,proto.aggregator.CustomCodeNode.deserializeBinaryFromReader);
      msg.setCustomCode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.LoopNode.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.LoopNode.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.LoopNode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.LoopNode.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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


/**
 * optional string input = 1;
 * @return {string}
 */
proto.aggregator.LoopNode.prototype.getInput = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.LoopNode} returns this
 */
proto.aggregator.LoopNode.prototype.setInput = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string iter_val = 2;
 * @return {string}
 */
proto.aggregator.LoopNode.prototype.getIterVal = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.LoopNode} returns this
 */
proto.aggregator.LoopNode.prototype.setIterVal = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string iter_key = 3;
 * @return {string}
 */
proto.aggregator.LoopNode.prototype.getIterKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.LoopNode} returns this
 */
proto.aggregator.LoopNode.prototype.setIterKey = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional ETHTransferNode eth_transfer = 10;
 * @return {?proto.aggregator.ETHTransferNode}
 */
proto.aggregator.LoopNode.prototype.getEthTransfer = function() {
  return /** @type{?proto.aggregator.ETHTransferNode} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ETHTransferNode, 10));
};


/**
 * @param {?proto.aggregator.ETHTransferNode|undefined} value
 * @return {!proto.aggregator.LoopNode} returns this
*/
proto.aggregator.LoopNode.prototype.setEthTransfer = function(value) {
  return jspb.Message.setOneofWrapperField(this, 10, proto.aggregator.LoopNode.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.LoopNode} returns this
 */
proto.aggregator.LoopNode.prototype.clearEthTransfer = function() {
  return this.setEthTransfer(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.LoopNode.prototype.hasEthTransfer = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional ContractWriteNode contract_write = 11;
 * @return {?proto.aggregator.ContractWriteNode}
 */
proto.aggregator.LoopNode.prototype.getContractWrite = function() {
  return /** @type{?proto.aggregator.ContractWriteNode} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ContractWriteNode, 11));
};


/**
 * @param {?proto.aggregator.ContractWriteNode|undefined} value
 * @return {!proto.aggregator.LoopNode} returns this
*/
proto.aggregator.LoopNode.prototype.setContractWrite = function(value) {
  return jspb.Message.setOneofWrapperField(this, 11, proto.aggregator.LoopNode.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.LoopNode} returns this
 */
proto.aggregator.LoopNode.prototype.clearContractWrite = function() {
  return this.setContractWrite(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.LoopNode.prototype.hasContractWrite = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional ContractReadNode contract_read = 12;
 * @return {?proto.aggregator.ContractReadNode}
 */
proto.aggregator.LoopNode.prototype.getContractRead = function() {
  return /** @type{?proto.aggregator.ContractReadNode} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ContractReadNode, 12));
};


/**
 * @param {?proto.aggregator.ContractReadNode|undefined} value
 * @return {!proto.aggregator.LoopNode} returns this
*/
proto.aggregator.LoopNode.prototype.setContractRead = function(value) {
  return jspb.Message.setOneofWrapperField(this, 12, proto.aggregator.LoopNode.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.LoopNode} returns this
 */
proto.aggregator.LoopNode.prototype.clearContractRead = function() {
  return this.setContractRead(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.LoopNode.prototype.hasContractRead = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * optional GraphQLQueryNode graphql_data_query = 13;
 * @return {?proto.aggregator.GraphQLQueryNode}
 */
proto.aggregator.LoopNode.prototype.getGraphqlDataQuery = function() {
  return /** @type{?proto.aggregator.GraphQLQueryNode} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.GraphQLQueryNode, 13));
};


/**
 * @param {?proto.aggregator.GraphQLQueryNode|undefined} value
 * @return {!proto.aggregator.LoopNode} returns this
*/
proto.aggregator.LoopNode.prototype.setGraphqlDataQuery = function(value) {
  return jspb.Message.setOneofWrapperField(this, 13, proto.aggregator.LoopNode.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.LoopNode} returns this
 */
proto.aggregator.LoopNode.prototype.clearGraphqlDataQuery = function() {
  return this.setGraphqlDataQuery(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.LoopNode.prototype.hasGraphqlDataQuery = function() {
  return jspb.Message.getField(this, 13) != null;
};


/**
 * optional RestAPINode rest_api = 14;
 * @return {?proto.aggregator.RestAPINode}
 */
proto.aggregator.LoopNode.prototype.getRestApi = function() {
  return /** @type{?proto.aggregator.RestAPINode} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.RestAPINode, 14));
};


/**
 * @param {?proto.aggregator.RestAPINode|undefined} value
 * @return {!proto.aggregator.LoopNode} returns this
*/
proto.aggregator.LoopNode.prototype.setRestApi = function(value) {
  return jspb.Message.setOneofWrapperField(this, 14, proto.aggregator.LoopNode.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.LoopNode} returns this
 */
proto.aggregator.LoopNode.prototype.clearRestApi = function() {
  return this.setRestApi(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.LoopNode.prototype.hasRestApi = function() {
  return jspb.Message.getField(this, 14) != null;
};


/**
 * optional CustomCodeNode custom_code = 15;
 * @return {?proto.aggregator.CustomCodeNode}
 */
proto.aggregator.LoopNode.prototype.getCustomCode = function() {
  return /** @type{?proto.aggregator.CustomCodeNode} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.CustomCodeNode, 15));
};


/**
 * @param {?proto.aggregator.CustomCodeNode|undefined} value
 * @return {!proto.aggregator.LoopNode} returns this
*/
proto.aggregator.LoopNode.prototype.setCustomCode = function(value) {
  return jspb.Message.setOneofWrapperField(this, 15, proto.aggregator.LoopNode.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.LoopNode} returns this
 */
proto.aggregator.LoopNode.prototype.clearCustomCode = function() {
  return this.setCustomCode(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.LoopNode.prototype.hasCustomCode = function() {
  return jspb.Message.getField(this, 15) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.TaskEdge.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.TaskEdge.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.TaskEdge} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.TaskEdge}
 */
proto.aggregator.TaskEdge.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.TaskEdge;
  return proto.aggregator.TaskEdge.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.TaskEdge} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.TaskEdge}
 */
proto.aggregator.TaskEdge.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSource(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTarget(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.TaskEdge.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.TaskEdge.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.TaskEdge} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.TaskEdge.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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


/**
 * optional string id = 1;
 * @return {string}
 */
proto.aggregator.TaskEdge.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.TaskEdge} returns this
 */
proto.aggregator.TaskEdge.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string source = 2;
 * @return {string}
 */
proto.aggregator.TaskEdge.prototype.getSource = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.TaskEdge} returns this
 */
proto.aggregator.TaskEdge.prototype.setSource = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string target = 3;
 * @return {string}
 */
proto.aggregator.TaskEdge.prototype.getTarget = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.TaskEdge} returns this
 */
proto.aggregator.TaskEdge.prototype.setTarget = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.aggregator.TaskNode.oneofGroups_ = [[10,11,12,13,14,15,16,17,18]];

/**
 * @enum {number}
 */
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

/**
 * @return {proto.aggregator.TaskNode.TaskTypeCase}
 */
proto.aggregator.TaskNode.prototype.getTaskTypeCase = function() {
  return /** @type {proto.aggregator.TaskNode.TaskTypeCase} */(jspb.Message.computeOneofCase(this, proto.aggregator.TaskNode.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.TaskNode.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.TaskNode.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.TaskNode} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.TaskNode}
 */
proto.aggregator.TaskNode.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.TaskNode;
  return proto.aggregator.TaskNode.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.TaskNode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.TaskNode}
 */
proto.aggregator.TaskNode.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 10:
      var value = new proto.aggregator.ETHTransferNode;
      reader.readMessage(value,proto.aggregator.ETHTransferNode.deserializeBinaryFromReader);
      msg.setEthTransfer(value);
      break;
    case 11:
      var value = new proto.aggregator.ContractWriteNode;
      reader.readMessage(value,proto.aggregator.ContractWriteNode.deserializeBinaryFromReader);
      msg.setContractWrite(value);
      break;
    case 12:
      var value = new proto.aggregator.ContractReadNode;
      reader.readMessage(value,proto.aggregator.ContractReadNode.deserializeBinaryFromReader);
      msg.setContractRead(value);
      break;
    case 13:
      var value = new proto.aggregator.GraphQLQueryNode;
      reader.readMessage(value,proto.aggregator.GraphQLQueryNode.deserializeBinaryFromReader);
      msg.setGraphqlQuery(value);
      break;
    case 14:
      var value = new proto.aggregator.RestAPINode;
      reader.readMessage(value,proto.aggregator.RestAPINode.deserializeBinaryFromReader);
      msg.setRestApi(value);
      break;
    case 15:
      var value = new proto.aggregator.BranchNode;
      reader.readMessage(value,proto.aggregator.BranchNode.deserializeBinaryFromReader);
      msg.setBranch(value);
      break;
    case 16:
      var value = new proto.aggregator.FilterNode;
      reader.readMessage(value,proto.aggregator.FilterNode.deserializeBinaryFromReader);
      msg.setFilter(value);
      break;
    case 17:
      var value = new proto.aggregator.LoopNode;
      reader.readMessage(value,proto.aggregator.LoopNode.deserializeBinaryFromReader);
      msg.setLoop(value);
      break;
    case 18:
      var value = new proto.aggregator.CustomCodeNode;
      reader.readMessage(value,proto.aggregator.CustomCodeNode.deserializeBinaryFromReader);
      msg.setCustomCode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.TaskNode.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.TaskNode.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.TaskNode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.TaskNode.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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


/**
 * optional string id = 2;
 * @return {string}
 */
proto.aggregator.TaskNode.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.TaskNode} returns this
 */
proto.aggregator.TaskNode.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string name = 3;
 * @return {string}
 */
proto.aggregator.TaskNode.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.TaskNode} returns this
 */
proto.aggregator.TaskNode.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional ETHTransferNode eth_transfer = 10;
 * @return {?proto.aggregator.ETHTransferNode}
 */
proto.aggregator.TaskNode.prototype.getEthTransfer = function() {
  return /** @type{?proto.aggregator.ETHTransferNode} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ETHTransferNode, 10));
};


/**
 * @param {?proto.aggregator.ETHTransferNode|undefined} value
 * @return {!proto.aggregator.TaskNode} returns this
*/
proto.aggregator.TaskNode.prototype.setEthTransfer = function(value) {
  return jspb.Message.setOneofWrapperField(this, 10, proto.aggregator.TaskNode.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TaskNode} returns this
 */
proto.aggregator.TaskNode.prototype.clearEthTransfer = function() {
  return this.setEthTransfer(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TaskNode.prototype.hasEthTransfer = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional ContractWriteNode contract_write = 11;
 * @return {?proto.aggregator.ContractWriteNode}
 */
proto.aggregator.TaskNode.prototype.getContractWrite = function() {
  return /** @type{?proto.aggregator.ContractWriteNode} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ContractWriteNode, 11));
};


/**
 * @param {?proto.aggregator.ContractWriteNode|undefined} value
 * @return {!proto.aggregator.TaskNode} returns this
*/
proto.aggregator.TaskNode.prototype.setContractWrite = function(value) {
  return jspb.Message.setOneofWrapperField(this, 11, proto.aggregator.TaskNode.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TaskNode} returns this
 */
proto.aggregator.TaskNode.prototype.clearContractWrite = function() {
  return this.setContractWrite(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TaskNode.prototype.hasContractWrite = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional ContractReadNode contract_read = 12;
 * @return {?proto.aggregator.ContractReadNode}
 */
proto.aggregator.TaskNode.prototype.getContractRead = function() {
  return /** @type{?proto.aggregator.ContractReadNode} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ContractReadNode, 12));
};


/**
 * @param {?proto.aggregator.ContractReadNode|undefined} value
 * @return {!proto.aggregator.TaskNode} returns this
*/
proto.aggregator.TaskNode.prototype.setContractRead = function(value) {
  return jspb.Message.setOneofWrapperField(this, 12, proto.aggregator.TaskNode.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TaskNode} returns this
 */
proto.aggregator.TaskNode.prototype.clearContractRead = function() {
  return this.setContractRead(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TaskNode.prototype.hasContractRead = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * optional GraphQLQueryNode graphql_query = 13;
 * @return {?proto.aggregator.GraphQLQueryNode}
 */
proto.aggregator.TaskNode.prototype.getGraphqlQuery = function() {
  return /** @type{?proto.aggregator.GraphQLQueryNode} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.GraphQLQueryNode, 13));
};


/**
 * @param {?proto.aggregator.GraphQLQueryNode|undefined} value
 * @return {!proto.aggregator.TaskNode} returns this
*/
proto.aggregator.TaskNode.prototype.setGraphqlQuery = function(value) {
  return jspb.Message.setOneofWrapperField(this, 13, proto.aggregator.TaskNode.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TaskNode} returns this
 */
proto.aggregator.TaskNode.prototype.clearGraphqlQuery = function() {
  return this.setGraphqlQuery(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TaskNode.prototype.hasGraphqlQuery = function() {
  return jspb.Message.getField(this, 13) != null;
};


/**
 * optional RestAPINode rest_api = 14;
 * @return {?proto.aggregator.RestAPINode}
 */
proto.aggregator.TaskNode.prototype.getRestApi = function() {
  return /** @type{?proto.aggregator.RestAPINode} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.RestAPINode, 14));
};


/**
 * @param {?proto.aggregator.RestAPINode|undefined} value
 * @return {!proto.aggregator.TaskNode} returns this
*/
proto.aggregator.TaskNode.prototype.setRestApi = function(value) {
  return jspb.Message.setOneofWrapperField(this, 14, proto.aggregator.TaskNode.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TaskNode} returns this
 */
proto.aggregator.TaskNode.prototype.clearRestApi = function() {
  return this.setRestApi(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TaskNode.prototype.hasRestApi = function() {
  return jspb.Message.getField(this, 14) != null;
};


/**
 * optional BranchNode branch = 15;
 * @return {?proto.aggregator.BranchNode}
 */
proto.aggregator.TaskNode.prototype.getBranch = function() {
  return /** @type{?proto.aggregator.BranchNode} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.BranchNode, 15));
};


/**
 * @param {?proto.aggregator.BranchNode|undefined} value
 * @return {!proto.aggregator.TaskNode} returns this
*/
proto.aggregator.TaskNode.prototype.setBranch = function(value) {
  return jspb.Message.setOneofWrapperField(this, 15, proto.aggregator.TaskNode.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TaskNode} returns this
 */
proto.aggregator.TaskNode.prototype.clearBranch = function() {
  return this.setBranch(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TaskNode.prototype.hasBranch = function() {
  return jspb.Message.getField(this, 15) != null;
};


/**
 * optional FilterNode filter = 16;
 * @return {?proto.aggregator.FilterNode}
 */
proto.aggregator.TaskNode.prototype.getFilter = function() {
  return /** @type{?proto.aggregator.FilterNode} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FilterNode, 16));
};


/**
 * @param {?proto.aggregator.FilterNode|undefined} value
 * @return {!proto.aggregator.TaskNode} returns this
*/
proto.aggregator.TaskNode.prototype.setFilter = function(value) {
  return jspb.Message.setOneofWrapperField(this, 16, proto.aggregator.TaskNode.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TaskNode} returns this
 */
proto.aggregator.TaskNode.prototype.clearFilter = function() {
  return this.setFilter(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TaskNode.prototype.hasFilter = function() {
  return jspb.Message.getField(this, 16) != null;
};


/**
 * optional LoopNode loop = 17;
 * @return {?proto.aggregator.LoopNode}
 */
proto.aggregator.TaskNode.prototype.getLoop = function() {
  return /** @type{?proto.aggregator.LoopNode} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.LoopNode, 17));
};


/**
 * @param {?proto.aggregator.LoopNode|undefined} value
 * @return {!proto.aggregator.TaskNode} returns this
*/
proto.aggregator.TaskNode.prototype.setLoop = function(value) {
  return jspb.Message.setOneofWrapperField(this, 17, proto.aggregator.TaskNode.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TaskNode} returns this
 */
proto.aggregator.TaskNode.prototype.clearLoop = function() {
  return this.setLoop(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TaskNode.prototype.hasLoop = function() {
  return jspb.Message.getField(this, 17) != null;
};


/**
 * optional CustomCodeNode custom_code = 18;
 * @return {?proto.aggregator.CustomCodeNode}
 */
proto.aggregator.TaskNode.prototype.getCustomCode = function() {
  return /** @type{?proto.aggregator.CustomCodeNode} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.CustomCodeNode, 18));
};


/**
 * @param {?proto.aggregator.CustomCodeNode|undefined} value
 * @return {!proto.aggregator.TaskNode} returns this
*/
proto.aggregator.TaskNode.prototype.setCustomCode = function(value) {
  return jspb.Message.setOneofWrapperField(this, 18, proto.aggregator.TaskNode.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TaskNode} returns this
 */
proto.aggregator.TaskNode.prototype.clearCustomCode = function() {
  return this.setCustomCode(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TaskNode.prototype.hasCustomCode = function() {
  return jspb.Message.getField(this, 18) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.Execution.repeatedFields_ = [8];

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.aggregator.Execution.oneofGroups_ = [[10,11,12,13]];

/**
 * @enum {number}
 */
proto.aggregator.Execution.OutputDataCase = {
  OUTPUT_DATA_NOT_SET: 0,
  TRANSFER_EVENT: 10,
  RAW_EVENT: 11,
  BLOCK: 12,
  TIME: 13
};

/**
 * @return {proto.aggregator.Execution.OutputDataCase}
 */
proto.aggregator.Execution.prototype.getOutputDataCase = function() {
  return /** @type {proto.aggregator.Execution.OutputDataCase} */(jspb.Message.computeOneofCase(this, proto.aggregator.Execution.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.Execution.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.Execution.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.Execution} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.Execution.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    startAt: jspb.Message.getFieldWithDefault(msg, 2, 0),
    endAt: jspb.Message.getFieldWithDefault(msg, 3, 0),
    success: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    error: jspb.Message.getFieldWithDefault(msg, 5, ""),
    reason: (f = msg.getReason()) && proto.aggregator.TriggerReason.toObject(includeInstance, f),
    stepsList: jspb.Message.toObjectList(msg.getStepsList(),
    proto.aggregator.Execution.Step.toObject, includeInstance),
    triggerName: jspb.Message.getFieldWithDefault(msg, 9, ""),
    transferEvent: (f = msg.getTransferEvent()) && proto.aggregator.Execution.TransferEventOutput.toObject(includeInstance, f),
    rawEvent: (f = msg.getRawEvent()) && proto.aggregator.Execution.RawEventOutput.toObject(includeInstance, f),
    block: (f = msg.getBlock()) && proto.aggregator.Execution.BlockOutput.toObject(includeInstance, f),
    time: (f = msg.getTime()) && proto.aggregator.Execution.TimeOutput.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.Execution}
 */
proto.aggregator.Execution.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.Execution;
  return proto.aggregator.Execution.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.Execution} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.Execution}
 */
proto.aggregator.Execution.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setStartAt(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEndAt(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setError(value);
      break;
    case 6:
      var value = new proto.aggregator.TriggerReason;
      reader.readMessage(value,proto.aggregator.TriggerReason.deserializeBinaryFromReader);
      msg.setReason(value);
      break;
    case 8:
      var value = new proto.aggregator.Execution.Step;
      reader.readMessage(value,proto.aggregator.Execution.Step.deserializeBinaryFromReader);
      msg.addSteps(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setTriggerName(value);
      break;
    case 10:
      var value = new proto.aggregator.Execution.TransferEventOutput;
      reader.readMessage(value,proto.aggregator.Execution.TransferEventOutput.deserializeBinaryFromReader);
      msg.setTransferEvent(value);
      break;
    case 11:
      var value = new proto.aggregator.Execution.RawEventOutput;
      reader.readMessage(value,proto.aggregator.Execution.RawEventOutput.deserializeBinaryFromReader);
      msg.setRawEvent(value);
      break;
    case 12:
      var value = new proto.aggregator.Execution.BlockOutput;
      reader.readMessage(value,proto.aggregator.Execution.BlockOutput.deserializeBinaryFromReader);
      msg.setBlock(value);
      break;
    case 13:
      var value = new proto.aggregator.Execution.TimeOutput;
      reader.readMessage(value,proto.aggregator.Execution.TimeOutput.deserializeBinaryFromReader);
      msg.setTime(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.Execution.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.Execution.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.Execution} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.Execution.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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
  f = message.getReason();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.aggregator.TriggerReason.serializeBinaryToWriter
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
  f = message.getTriggerName();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getTransferEvent();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.aggregator.Execution.TransferEventOutput.serializeBinaryToWriter
    );
  }
  f = message.getRawEvent();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      proto.aggregator.Execution.RawEventOutput.serializeBinaryToWriter
    );
  }
  f = message.getBlock();
  if (f != null) {
    writer.writeMessage(
      12,
      f,
      proto.aggregator.Execution.BlockOutput.serializeBinaryToWriter
    );
  }
  f = message.getTime();
  if (f != null) {
    writer.writeMessage(
      13,
      f,
      proto.aggregator.Execution.TimeOutput.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.Execution.Step.repeatedFields_ = [8];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.Execution.Step.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.Execution.Step.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.Execution.Step} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.Execution.Step.toObject = function(includeInstance, msg) {
  var f, obj = {
    nodeId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    success: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    outputData: jspb.Message.getFieldWithDefault(msg, 3, ""),
    log: jspb.Message.getFieldWithDefault(msg, 4, ""),
    error: jspb.Message.getFieldWithDefault(msg, 5, ""),
    startAt: jspb.Message.getFieldWithDefault(msg, 6, 0),
    endAt: jspb.Message.getFieldWithDefault(msg, 7, 0),
    inputsList: (f = jspb.Message.getRepeatedField(msg, 8)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.Execution.Step}
 */
proto.aggregator.Execution.Step.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.Execution.Step;
  return proto.aggregator.Execution.Step.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.Execution.Step} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.Execution.Step}
 */
proto.aggregator.Execution.Step.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setNodeId(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setOutputData(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setLog(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setError(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setStartAt(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEndAt(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.addInputs(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.Execution.Step.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.Execution.Step.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.Execution.Step} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.Execution.Step.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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
  f = message.getInputsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      8,
      f
    );
  }
};


/**
 * optional string node_id = 1;
 * @return {string}
 */
proto.aggregator.Execution.Step.prototype.getNodeId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setNodeId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool success = 2;
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional string output_data = 3;
 * @return {string}
 */
proto.aggregator.Execution.Step.prototype.getOutputData = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setOutputData = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string log = 4;
 * @return {string}
 */
proto.aggregator.Execution.Step.prototype.getLog = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setLog = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string error = 5;
 * @return {string}
 */
proto.aggregator.Execution.Step.prototype.getError = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setError = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional int64 start_at = 6;
 * @return {number}
 */
proto.aggregator.Execution.Step.prototype.getStartAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setStartAt = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional int64 end_at = 7;
 * @return {number}
 */
proto.aggregator.Execution.Step.prototype.getEndAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setEndAt = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * repeated string inputs = 8;
 * @return {!Array<string>}
 */
proto.aggregator.Execution.Step.prototype.getInputsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 8));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setInputsList = function(value) {
  return jspb.Message.setField(this, 8, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.addInputs = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 8, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearInputsList = function() {
  return this.setInputsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.Execution.TransferEventOutput.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.Execution.TransferEventOutput.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.Execution.TransferEventOutput} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.Execution.TransferEventOutput.toObject = function(includeInstance, msg) {
  var f, obj = {
    tokenName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    tokenSymbol: jspb.Message.getFieldWithDefault(msg, 2, ""),
    tokenDecimals: jspb.Message.getFieldWithDefault(msg, 3, 0),
    transactionHash: jspb.Message.getFieldWithDefault(msg, 4, ""),
    address: jspb.Message.getFieldWithDefault(msg, 5, ""),
    blockNumber: jspb.Message.getFieldWithDefault(msg, 6, 0),
    blockTimestamp: jspb.Message.getFieldWithDefault(msg, 7, 0),
    fromAddress: jspb.Message.getFieldWithDefault(msg, 8, ""),
    toAddress: jspb.Message.getFieldWithDefault(msg, 9, ""),
    value: jspb.Message.getFieldWithDefault(msg, 10, ""),
    valueFormatted: jspb.Message.getFieldWithDefault(msg, 11, ""),
    transactionIndex: jspb.Message.getFieldWithDefault(msg, 12, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.Execution.TransferEventOutput}
 */
proto.aggregator.Execution.TransferEventOutput.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.Execution.TransferEventOutput;
  return proto.aggregator.Execution.TransferEventOutput.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.Execution.TransferEventOutput} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.Execution.TransferEventOutput}
 */
proto.aggregator.Execution.TransferEventOutput.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTokenName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTokenSymbol(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setTokenDecimals(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setTransactionHash(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setBlockNumber(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setBlockTimestamp(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setFromAddress(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setToAddress(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setValue(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setValueFormatted(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setTransactionIndex(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.Execution.TransferEventOutput.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.Execution.TransferEventOutput.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.Execution.TransferEventOutput} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.Execution.TransferEventOutput.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTokenName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTokenSymbol();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTokenDecimals();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
  f = message.getTransactionHash();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getBlockNumber();
  if (f !== 0) {
    writer.writeUint64(
      6,
      f
    );
  }
  f = message.getBlockTimestamp();
  if (f !== 0) {
    writer.writeUint64(
      7,
      f
    );
  }
  f = message.getFromAddress();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getToAddress();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getValue();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
  f = message.getValueFormatted();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
  f = message.getTransactionIndex();
  if (f !== 0) {
    writer.writeUint32(
      12,
      f
    );
  }
};


/**
 * optional string token_name = 1;
 * @return {string}
 */
proto.aggregator.Execution.TransferEventOutput.prototype.getTokenName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.TransferEventOutput} returns this
 */
proto.aggregator.Execution.TransferEventOutput.prototype.setTokenName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string token_symbol = 2;
 * @return {string}
 */
proto.aggregator.Execution.TransferEventOutput.prototype.getTokenSymbol = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.TransferEventOutput} returns this
 */
proto.aggregator.Execution.TransferEventOutput.prototype.setTokenSymbol = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional uint32 token_decimals = 3;
 * @return {number}
 */
proto.aggregator.Execution.TransferEventOutput.prototype.getTokenDecimals = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Execution.TransferEventOutput} returns this
 */
proto.aggregator.Execution.TransferEventOutput.prototype.setTokenDecimals = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional string transaction_hash = 4;
 * @return {string}
 */
proto.aggregator.Execution.TransferEventOutput.prototype.getTransactionHash = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.TransferEventOutput} returns this
 */
proto.aggregator.Execution.TransferEventOutput.prototype.setTransactionHash = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string address = 5;
 * @return {string}
 */
proto.aggregator.Execution.TransferEventOutput.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.TransferEventOutput} returns this
 */
proto.aggregator.Execution.TransferEventOutput.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional uint64 block_number = 6;
 * @return {number}
 */
proto.aggregator.Execution.TransferEventOutput.prototype.getBlockNumber = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Execution.TransferEventOutput} returns this
 */
proto.aggregator.Execution.TransferEventOutput.prototype.setBlockNumber = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional uint64 block_timestamp = 7;
 * @return {number}
 */
proto.aggregator.Execution.TransferEventOutput.prototype.getBlockTimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Execution.TransferEventOutput} returns this
 */
proto.aggregator.Execution.TransferEventOutput.prototype.setBlockTimestamp = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional string from_address = 8;
 * @return {string}
 */
proto.aggregator.Execution.TransferEventOutput.prototype.getFromAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.TransferEventOutput} returns this
 */
proto.aggregator.Execution.TransferEventOutput.prototype.setFromAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional string to_address = 9;
 * @return {string}
 */
proto.aggregator.Execution.TransferEventOutput.prototype.getToAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.TransferEventOutput} returns this
 */
proto.aggregator.Execution.TransferEventOutput.prototype.setToAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};


/**
 * optional string value = 10;
 * @return {string}
 */
proto.aggregator.Execution.TransferEventOutput.prototype.getValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.TransferEventOutput} returns this
 */
proto.aggregator.Execution.TransferEventOutput.prototype.setValue = function(value) {
  return jspb.Message.setProto3StringField(this, 10, value);
};


/**
 * optional string value_formatted = 11;
 * @return {string}
 */
proto.aggregator.Execution.TransferEventOutput.prototype.getValueFormatted = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.TransferEventOutput} returns this
 */
proto.aggregator.Execution.TransferEventOutput.prototype.setValueFormatted = function(value) {
  return jspb.Message.setProto3StringField(this, 11, value);
};


/**
 * optional uint32 transaction_index = 12;
 * @return {number}
 */
proto.aggregator.Execution.TransferEventOutput.prototype.getTransactionIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 12, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Execution.TransferEventOutput} returns this
 */
proto.aggregator.Execution.TransferEventOutput.prototype.setTransactionIndex = function(value) {
  return jspb.Message.setProto3IntField(this, 12, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.Execution.RawEventOutput.repeatedFields_ = [6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.Execution.RawEventOutput.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.Execution.RawEventOutput.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.Execution.RawEventOutput} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.Execution.RawEventOutput.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: jspb.Message.getFieldWithDefault(msg, 1, ""),
    blockHash: jspb.Message.getFieldWithDefault(msg, 2, ""),
    blockNumber: jspb.Message.getFieldWithDefault(msg, 3, 0),
    data: jspb.Message.getFieldWithDefault(msg, 4, ""),
    index: jspb.Message.getFieldWithDefault(msg, 5, 0),
    topicsList: (f = jspb.Message.getRepeatedField(msg, 6)) == null ? undefined : f,
    transactionHash: jspb.Message.getFieldWithDefault(msg, 7, ""),
    transactionIndex: jspb.Message.getFieldWithDefault(msg, 8, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.Execution.RawEventOutput}
 */
proto.aggregator.Execution.RawEventOutput.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.Execution.RawEventOutput;
  return proto.aggregator.Execution.RawEventOutput.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.Execution.RawEventOutput} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.Execution.RawEventOutput}
 */
proto.aggregator.Execution.RawEventOutput.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setBlockHash(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setBlockNumber(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setData(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setIndex(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.addTopics(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setTransactionHash(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setTransactionIndex(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.Execution.RawEventOutput.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.Execution.RawEventOutput.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.Execution.RawEventOutput} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.Execution.RawEventOutput.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getBlockHash();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getBlockNumber();
  if (f !== 0) {
    writer.writeUint64(
      3,
      f
    );
  }
  f = message.getData();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getIndex();
  if (f !== 0) {
    writer.writeUint32(
      5,
      f
    );
  }
  f = message.getTopicsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      6,
      f
    );
  }
  f = message.getTransactionHash();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getTransactionIndex();
  if (f !== 0) {
    writer.writeUint32(
      8,
      f
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.aggregator.Execution.RawEventOutput.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.RawEventOutput} returns this
 */
proto.aggregator.Execution.RawEventOutput.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string block_hash = 2;
 * @return {string}
 */
proto.aggregator.Execution.RawEventOutput.prototype.getBlockHash = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.RawEventOutput} returns this
 */
proto.aggregator.Execution.RawEventOutput.prototype.setBlockHash = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional uint64 block_number = 3;
 * @return {number}
 */
proto.aggregator.Execution.RawEventOutput.prototype.getBlockNumber = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Execution.RawEventOutput} returns this
 */
proto.aggregator.Execution.RawEventOutput.prototype.setBlockNumber = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional string data = 4;
 * @return {string}
 */
proto.aggregator.Execution.RawEventOutput.prototype.getData = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.RawEventOutput} returns this
 */
proto.aggregator.Execution.RawEventOutput.prototype.setData = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional uint32 index = 5;
 * @return {number}
 */
proto.aggregator.Execution.RawEventOutput.prototype.getIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Execution.RawEventOutput} returns this
 */
proto.aggregator.Execution.RawEventOutput.prototype.setIndex = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * repeated string topics = 6;
 * @return {!Array<string>}
 */
proto.aggregator.Execution.RawEventOutput.prototype.getTopicsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 6));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.Execution.RawEventOutput} returns this
 */
proto.aggregator.Execution.RawEventOutput.prototype.setTopicsList = function(value) {
  return jspb.Message.setField(this, 6, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.Execution.RawEventOutput} returns this
 */
proto.aggregator.Execution.RawEventOutput.prototype.addTopics = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 6, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.Execution.RawEventOutput} returns this
 */
proto.aggregator.Execution.RawEventOutput.prototype.clearTopicsList = function() {
  return this.setTopicsList([]);
};


/**
 * optional string transaction_hash = 7;
 * @return {string}
 */
proto.aggregator.Execution.RawEventOutput.prototype.getTransactionHash = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.RawEventOutput} returns this
 */
proto.aggregator.Execution.RawEventOutput.prototype.setTransactionHash = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional uint32 transaction_index = 8;
 * @return {number}
 */
proto.aggregator.Execution.RawEventOutput.prototype.getTransactionIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Execution.RawEventOutput} returns this
 */
proto.aggregator.Execution.RawEventOutput.prototype.setTransactionIndex = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.Execution.BlockOutput.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.Execution.BlockOutput.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.Execution.BlockOutput} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.Execution.BlockOutput.toObject = function(includeInstance, msg) {
  var f, obj = {
    blockNumber: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.Execution.BlockOutput}
 */
proto.aggregator.Execution.BlockOutput.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.Execution.BlockOutput;
  return proto.aggregator.Execution.BlockOutput.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.Execution.BlockOutput} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.Execution.BlockOutput}
 */
proto.aggregator.Execution.BlockOutput.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setBlockNumber(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.Execution.BlockOutput.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.Execution.BlockOutput.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.Execution.BlockOutput} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.Execution.BlockOutput.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBlockNumber();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
};


/**
 * optional uint64 block_number = 1;
 * @return {number}
 */
proto.aggregator.Execution.BlockOutput.prototype.getBlockNumber = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Execution.BlockOutput} returns this
 */
proto.aggregator.Execution.BlockOutput.prototype.setBlockNumber = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.Execution.TimeOutput.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.Execution.TimeOutput.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.Execution.TimeOutput} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.Execution.TimeOutput.toObject = function(includeInstance, msg) {
  var f, obj = {
    epoch: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.Execution.TimeOutput}
 */
proto.aggregator.Execution.TimeOutput.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.Execution.TimeOutput;
  return proto.aggregator.Execution.TimeOutput.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.Execution.TimeOutput} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.Execution.TimeOutput}
 */
proto.aggregator.Execution.TimeOutput.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setEpoch(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.Execution.TimeOutput.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.Execution.TimeOutput.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.Execution.TimeOutput} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.Execution.TimeOutput.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEpoch();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
};


/**
 * optional uint64 epoch = 1;
 * @return {number}
 */
proto.aggregator.Execution.TimeOutput.prototype.getEpoch = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Execution.TimeOutput} returns this
 */
proto.aggregator.Execution.TimeOutput.prototype.setEpoch = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.aggregator.Execution.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution} returns this
 */
proto.aggregator.Execution.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int64 start_at = 2;
 * @return {number}
 */
proto.aggregator.Execution.prototype.getStartAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Execution} returns this
 */
proto.aggregator.Execution.prototype.setStartAt = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int64 end_at = 3;
 * @return {number}
 */
proto.aggregator.Execution.prototype.getEndAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Execution} returns this
 */
proto.aggregator.Execution.prototype.setEndAt = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional bool success = 4;
 * @return {boolean}
 */
proto.aggregator.Execution.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.Execution} returns this
 */
proto.aggregator.Execution.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional string error = 5;
 * @return {string}
 */
proto.aggregator.Execution.prototype.getError = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution} returns this
 */
proto.aggregator.Execution.prototype.setError = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional TriggerReason reason = 6;
 * @return {?proto.aggregator.TriggerReason}
 */
proto.aggregator.Execution.prototype.getReason = function() {
  return /** @type{?proto.aggregator.TriggerReason} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.TriggerReason, 6));
};


/**
 * @param {?proto.aggregator.TriggerReason|undefined} value
 * @return {!proto.aggregator.Execution} returns this
*/
proto.aggregator.Execution.prototype.setReason = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution} returns this
 */
proto.aggregator.Execution.prototype.clearReason = function() {
  return this.setReason(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.prototype.hasReason = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * repeated Step steps = 8;
 * @return {!Array<!proto.aggregator.Execution.Step>}
 */
proto.aggregator.Execution.prototype.getStepsList = function() {
  return /** @type{!Array<!proto.aggregator.Execution.Step>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.Execution.Step, 8));
};


/**
 * @param {!Array<!proto.aggregator.Execution.Step>} value
 * @return {!proto.aggregator.Execution} returns this
*/
proto.aggregator.Execution.prototype.setStepsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.aggregator.Execution.Step=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.Execution.Step}
 */
proto.aggregator.Execution.prototype.addSteps = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.aggregator.Execution.Step, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.Execution} returns this
 */
proto.aggregator.Execution.prototype.clearStepsList = function() {
  return this.setStepsList([]);
};


/**
 * optional string trigger_name = 9;
 * @return {string}
 */
proto.aggregator.Execution.prototype.getTriggerName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution} returns this
 */
proto.aggregator.Execution.prototype.setTriggerName = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};


/**
 * optional TransferEventOutput transfer_event = 10;
 * @return {?proto.aggregator.Execution.TransferEventOutput}
 */
proto.aggregator.Execution.prototype.getTransferEvent = function() {
  return /** @type{?proto.aggregator.Execution.TransferEventOutput} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.Execution.TransferEventOutput, 10));
};


/**
 * @param {?proto.aggregator.Execution.TransferEventOutput|undefined} value
 * @return {!proto.aggregator.Execution} returns this
*/
proto.aggregator.Execution.prototype.setTransferEvent = function(value) {
  return jspb.Message.setOneofWrapperField(this, 10, proto.aggregator.Execution.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution} returns this
 */
proto.aggregator.Execution.prototype.clearTransferEvent = function() {
  return this.setTransferEvent(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.prototype.hasTransferEvent = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional RawEventOutput raw_event = 11;
 * @return {?proto.aggregator.Execution.RawEventOutput}
 */
proto.aggregator.Execution.prototype.getRawEvent = function() {
  return /** @type{?proto.aggregator.Execution.RawEventOutput} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.Execution.RawEventOutput, 11));
};


/**
 * @param {?proto.aggregator.Execution.RawEventOutput|undefined} value
 * @return {!proto.aggregator.Execution} returns this
*/
proto.aggregator.Execution.prototype.setRawEvent = function(value) {
  return jspb.Message.setOneofWrapperField(this, 11, proto.aggregator.Execution.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution} returns this
 */
proto.aggregator.Execution.prototype.clearRawEvent = function() {
  return this.setRawEvent(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.prototype.hasRawEvent = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional BlockOutput block = 12;
 * @return {?proto.aggregator.Execution.BlockOutput}
 */
proto.aggregator.Execution.prototype.getBlock = function() {
  return /** @type{?proto.aggregator.Execution.BlockOutput} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.Execution.BlockOutput, 12));
};


/**
 * @param {?proto.aggregator.Execution.BlockOutput|undefined} value
 * @return {!proto.aggregator.Execution} returns this
*/
proto.aggregator.Execution.prototype.setBlock = function(value) {
  return jspb.Message.setOneofWrapperField(this, 12, proto.aggregator.Execution.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution} returns this
 */
proto.aggregator.Execution.prototype.clearBlock = function() {
  return this.setBlock(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.prototype.hasBlock = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * optional TimeOutput time = 13;
 * @return {?proto.aggregator.Execution.TimeOutput}
 */
proto.aggregator.Execution.prototype.getTime = function() {
  return /** @type{?proto.aggregator.Execution.TimeOutput} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.Execution.TimeOutput, 13));
};


/**
 * @param {?proto.aggregator.Execution.TimeOutput|undefined} value
 * @return {!proto.aggregator.Execution} returns this
*/
proto.aggregator.Execution.prototype.setTime = function(value) {
  return jspb.Message.setOneofWrapperField(this, 13, proto.aggregator.Execution.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution} returns this
 */
proto.aggregator.Execution.prototype.clearTime = function() {
  return this.setTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.prototype.hasTime = function() {
  return jspb.Message.getField(this, 13) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.Task.repeatedFields_ = [13,14];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.Task.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.Task.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.Task} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.Task.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    owner: jspb.Message.getFieldWithDefault(msg, 2, ""),
    smartWalletAddress: jspb.Message.getFieldWithDefault(msg, 3, ""),
    startAt: jspb.Message.getFieldWithDefault(msg, 4, 0),
    expiredAt: jspb.Message.getFieldWithDefault(msg, 5, 0),
    name: jspb.Message.getFieldWithDefault(msg, 6, ""),
    completedAt: jspb.Message.getFieldWithDefault(msg, 7, 0),
    maxExecution: jspb.Message.getFieldWithDefault(msg, 8, 0),
    totalExecution: jspb.Message.getFieldWithDefault(msg, 9, 0),
    lastRanAt: jspb.Message.getFieldWithDefault(msg, 10, 0),
    status: jspb.Message.getFieldWithDefault(msg, 11, 0),
    trigger: (f = msg.getTrigger()) && proto.aggregator.TaskTrigger.toObject(includeInstance, f),
    nodesList: jspb.Message.toObjectList(msg.getNodesList(),
    proto.aggregator.TaskNode.toObject, includeInstance),
    edgesList: jspb.Message.toObjectList(msg.getEdgesList(),
    proto.aggregator.TaskEdge.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.Task}
 */
proto.aggregator.Task.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.Task;
  return proto.aggregator.Task.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.Task} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.Task}
 */
proto.aggregator.Task.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwner(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSmartWalletAddress(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setStartAt(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExpiredAt(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCompletedAt(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setMaxExecution(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTotalExecution(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLastRanAt(value);
      break;
    case 11:
      var value = /** @type {!proto.aggregator.TaskStatus} */ (reader.readEnum());
      msg.setStatus(value);
      break;
    case 12:
      var value = new proto.aggregator.TaskTrigger;
      reader.readMessage(value,proto.aggregator.TaskTrigger.deserializeBinaryFromReader);
      msg.setTrigger(value);
      break;
    case 13:
      var value = new proto.aggregator.TaskNode;
      reader.readMessage(value,proto.aggregator.TaskNode.deserializeBinaryFromReader);
      msg.addNodes(value);
      break;
    case 14:
      var value = new proto.aggregator.TaskEdge;
      reader.readMessage(value,proto.aggregator.TaskEdge.deserializeBinaryFromReader);
      msg.addEdges(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.Task.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.Task.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.Task} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.Task.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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
  f = message.getName();
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
  if (f !== 0.0) {
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


/**
 * optional string id = 1;
 * @return {string}
 */
proto.aggregator.Task.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Task} returns this
 */
proto.aggregator.Task.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string owner = 2;
 * @return {string}
 */
proto.aggregator.Task.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Task} returns this
 */
proto.aggregator.Task.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string smart_wallet_address = 3;
 * @return {string}
 */
proto.aggregator.Task.prototype.getSmartWalletAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Task} returns this
 */
proto.aggregator.Task.prototype.setSmartWalletAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int64 start_at = 4;
 * @return {number}
 */
proto.aggregator.Task.prototype.getStartAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Task} returns this
 */
proto.aggregator.Task.prototype.setStartAt = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int64 expired_at = 5;
 * @return {number}
 */
proto.aggregator.Task.prototype.getExpiredAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Task} returns this
 */
proto.aggregator.Task.prototype.setExpiredAt = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional string name = 6;
 * @return {string}
 */
proto.aggregator.Task.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Task} returns this
 */
proto.aggregator.Task.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional int64 completed_at = 7;
 * @return {number}
 */
proto.aggregator.Task.prototype.getCompletedAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Task} returns this
 */
proto.aggregator.Task.prototype.setCompletedAt = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int64 max_execution = 8;
 * @return {number}
 */
proto.aggregator.Task.prototype.getMaxExecution = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Task} returns this
 */
proto.aggregator.Task.prototype.setMaxExecution = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional int64 total_execution = 9;
 * @return {number}
 */
proto.aggregator.Task.prototype.getTotalExecution = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Task} returns this
 */
proto.aggregator.Task.prototype.setTotalExecution = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional int64 last_ran_at = 10;
 * @return {number}
 */
proto.aggregator.Task.prototype.getLastRanAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Task} returns this
 */
proto.aggregator.Task.prototype.setLastRanAt = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * optional TaskStatus status = 11;
 * @return {!proto.aggregator.TaskStatus}
 */
proto.aggregator.Task.prototype.getStatus = function() {
  return /** @type {!proto.aggregator.TaskStatus} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {!proto.aggregator.TaskStatus} value
 * @return {!proto.aggregator.Task} returns this
 */
proto.aggregator.Task.prototype.setStatus = function(value) {
  return jspb.Message.setProto3EnumField(this, 11, value);
};


/**
 * optional TaskTrigger trigger = 12;
 * @return {?proto.aggregator.TaskTrigger}
 */
proto.aggregator.Task.prototype.getTrigger = function() {
  return /** @type{?proto.aggregator.TaskTrigger} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.TaskTrigger, 12));
};


/**
 * @param {?proto.aggregator.TaskTrigger|undefined} value
 * @return {!proto.aggregator.Task} returns this
*/
proto.aggregator.Task.prototype.setTrigger = function(value) {
  return jspb.Message.setWrapperField(this, 12, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Task} returns this
 */
proto.aggregator.Task.prototype.clearTrigger = function() {
  return this.setTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Task.prototype.hasTrigger = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * repeated TaskNode nodes = 13;
 * @return {!Array<!proto.aggregator.TaskNode>}
 */
proto.aggregator.Task.prototype.getNodesList = function() {
  return /** @type{!Array<!proto.aggregator.TaskNode>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.TaskNode, 13));
};


/**
 * @param {!Array<!proto.aggregator.TaskNode>} value
 * @return {!proto.aggregator.Task} returns this
*/
proto.aggregator.Task.prototype.setNodesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 13, value);
};


/**
 * @param {!proto.aggregator.TaskNode=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.TaskNode}
 */
proto.aggregator.Task.prototype.addNodes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 13, opt_value, proto.aggregator.TaskNode, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.Task} returns this
 */
proto.aggregator.Task.prototype.clearNodesList = function() {
  return this.setNodesList([]);
};


/**
 * repeated TaskEdge edges = 14;
 * @return {!Array<!proto.aggregator.TaskEdge>}
 */
proto.aggregator.Task.prototype.getEdgesList = function() {
  return /** @type{!Array<!proto.aggregator.TaskEdge>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.TaskEdge, 14));
};


/**
 * @param {!Array<!proto.aggregator.TaskEdge>} value
 * @return {!proto.aggregator.Task} returns this
*/
proto.aggregator.Task.prototype.setEdgesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 14, value);
};


/**
 * @param {!proto.aggregator.TaskEdge=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.TaskEdge}
 */
proto.aggregator.Task.prototype.addEdges = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 14, opt_value, proto.aggregator.TaskEdge, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.Task} returns this
 */
proto.aggregator.Task.prototype.clearEdgesList = function() {
  return this.setEdgesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.CreateTaskReq.repeatedFields_ = [7,8];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.CreateTaskReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.CreateTaskReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.CreateTaskReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CreateTaskReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    trigger: (f = msg.getTrigger()) && proto.aggregator.TaskTrigger.toObject(includeInstance, f),
    startAt: jspb.Message.getFieldWithDefault(msg, 2, 0),
    expiredAt: jspb.Message.getFieldWithDefault(msg, 3, 0),
    maxExecution: jspb.Message.getFieldWithDefault(msg, 4, 0),
    smartWalletAddress: jspb.Message.getFieldWithDefault(msg, 5, ""),
    name: jspb.Message.getFieldWithDefault(msg, 6, ""),
    nodesList: jspb.Message.toObjectList(msg.getNodesList(),
    proto.aggregator.TaskNode.toObject, includeInstance),
    edgesList: jspb.Message.toObjectList(msg.getEdgesList(),
    proto.aggregator.TaskEdge.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.CreateTaskReq}
 */
proto.aggregator.CreateTaskReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.CreateTaskReq;
  return proto.aggregator.CreateTaskReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.CreateTaskReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.CreateTaskReq}
 */
proto.aggregator.CreateTaskReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.TaskTrigger;
      reader.readMessage(value,proto.aggregator.TaskTrigger.deserializeBinaryFromReader);
      msg.setTrigger(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setStartAt(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExpiredAt(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setMaxExecution(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setSmartWalletAddress(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 7:
      var value = new proto.aggregator.TaskNode;
      reader.readMessage(value,proto.aggregator.TaskNode.deserializeBinaryFromReader);
      msg.addNodes(value);
      break;
    case 8:
      var value = new proto.aggregator.TaskEdge;
      reader.readMessage(value,proto.aggregator.TaskEdge.deserializeBinaryFromReader);
      msg.addEdges(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.CreateTaskReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.CreateTaskReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.CreateTaskReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CreateTaskReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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
  f = message.getName();
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


/**
 * optional TaskTrigger trigger = 1;
 * @return {?proto.aggregator.TaskTrigger}
 */
proto.aggregator.CreateTaskReq.prototype.getTrigger = function() {
  return /** @type{?proto.aggregator.TaskTrigger} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.TaskTrigger, 1));
};


/**
 * @param {?proto.aggregator.TaskTrigger|undefined} value
 * @return {!proto.aggregator.CreateTaskReq} returns this
*/
proto.aggregator.CreateTaskReq.prototype.setTrigger = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.CreateTaskReq} returns this
 */
proto.aggregator.CreateTaskReq.prototype.clearTrigger = function() {
  return this.setTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.CreateTaskReq.prototype.hasTrigger = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int64 start_at = 2;
 * @return {number}
 */
proto.aggregator.CreateTaskReq.prototype.getStartAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.CreateTaskReq} returns this
 */
proto.aggregator.CreateTaskReq.prototype.setStartAt = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int64 expired_at = 3;
 * @return {number}
 */
proto.aggregator.CreateTaskReq.prototype.getExpiredAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.CreateTaskReq} returns this
 */
proto.aggregator.CreateTaskReq.prototype.setExpiredAt = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int64 max_execution = 4;
 * @return {number}
 */
proto.aggregator.CreateTaskReq.prototype.getMaxExecution = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.CreateTaskReq} returns this
 */
proto.aggregator.CreateTaskReq.prototype.setMaxExecution = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional string smart_wallet_address = 5;
 * @return {string}
 */
proto.aggregator.CreateTaskReq.prototype.getSmartWalletAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.CreateTaskReq} returns this
 */
proto.aggregator.CreateTaskReq.prototype.setSmartWalletAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string name = 6;
 * @return {string}
 */
proto.aggregator.CreateTaskReq.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.CreateTaskReq} returns this
 */
proto.aggregator.CreateTaskReq.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * repeated TaskNode nodes = 7;
 * @return {!Array<!proto.aggregator.TaskNode>}
 */
proto.aggregator.CreateTaskReq.prototype.getNodesList = function() {
  return /** @type{!Array<!proto.aggregator.TaskNode>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.TaskNode, 7));
};


/**
 * @param {!Array<!proto.aggregator.TaskNode>} value
 * @return {!proto.aggregator.CreateTaskReq} returns this
*/
proto.aggregator.CreateTaskReq.prototype.setNodesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.aggregator.TaskNode=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.TaskNode}
 */
proto.aggregator.CreateTaskReq.prototype.addNodes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.aggregator.TaskNode, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.CreateTaskReq} returns this
 */
proto.aggregator.CreateTaskReq.prototype.clearNodesList = function() {
  return this.setNodesList([]);
};


/**
 * repeated TaskEdge edges = 8;
 * @return {!Array<!proto.aggregator.TaskEdge>}
 */
proto.aggregator.CreateTaskReq.prototype.getEdgesList = function() {
  return /** @type{!Array<!proto.aggregator.TaskEdge>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.TaskEdge, 8));
};


/**
 * @param {!Array<!proto.aggregator.TaskEdge>} value
 * @return {!proto.aggregator.CreateTaskReq} returns this
*/
proto.aggregator.CreateTaskReq.prototype.setEdgesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.aggregator.TaskEdge=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.TaskEdge}
 */
proto.aggregator.CreateTaskReq.prototype.addEdges = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.aggregator.TaskEdge, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.CreateTaskReq} returns this
 */
proto.aggregator.CreateTaskReq.prototype.clearEdgesList = function() {
  return this.setEdgesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.CreateTaskResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.CreateTaskResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.CreateTaskResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.CreateTaskResp}
 */
proto.aggregator.CreateTaskResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.CreateTaskResp;
  return proto.aggregator.CreateTaskResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.CreateTaskResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.CreateTaskResp}
 */
proto.aggregator.CreateTaskResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.CreateTaskResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.CreateTaskResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.CreateTaskResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CreateTaskResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.aggregator.CreateTaskResp.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.CreateTaskResp} returns this
 */
proto.aggregator.CreateTaskResp.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.NonceRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.NonceRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.NonceRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.NonceRequest}
 */
proto.aggregator.NonceRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.NonceRequest;
  return proto.aggregator.NonceRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.NonceRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.NonceRequest}
 */
proto.aggregator.NonceRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwner(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.NonceRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.NonceRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.NonceRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.NonceRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwner();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.aggregator.NonceRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.NonceRequest} returns this
 */
proto.aggregator.NonceRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.NonceResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.NonceResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.NonceResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.NonceResp}
 */
proto.aggregator.NonceResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.NonceResp;
  return proto.aggregator.NonceResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.NonceResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.NonceResp}
 */
proto.aggregator.NonceResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setNonce(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.NonceResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.NonceResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.NonceResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.NonceResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNonce();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string nonce = 1;
 * @return {string}
 */
proto.aggregator.NonceResp.prototype.getNonce = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.NonceResp} returns this
 */
proto.aggregator.NonceResp.prototype.setNonce = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.ListWalletReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ListWalletReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ListWalletReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListWalletReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    factoryAddress: jspb.Message.getFieldWithDefault(msg, 1, ""),
    salt: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.ListWalletReq}
 */
proto.aggregator.ListWalletReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ListWalletReq;
  return proto.aggregator.ListWalletReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ListWalletReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ListWalletReq}
 */
proto.aggregator.ListWalletReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFactoryAddress(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSalt(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.ListWalletReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ListWalletReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ListWalletReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListWalletReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFactoryAddress();
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


/**
 * optional string factory_address = 1;
 * @return {string}
 */
proto.aggregator.ListWalletReq.prototype.getFactoryAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListWalletReq} returns this
 */
proto.aggregator.ListWalletReq.prototype.setFactoryAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string salt = 2;
 * @return {string}
 */
proto.aggregator.ListWalletReq.prototype.getSalt = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListWalletReq} returns this
 */
proto.aggregator.ListWalletReq.prototype.setSalt = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.SmartWallet.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.SmartWallet.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.SmartWallet} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.SmartWallet}
 */
proto.aggregator.SmartWallet.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.SmartWallet;
  return proto.aggregator.SmartWallet.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.SmartWallet} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.SmartWallet}
 */
proto.aggregator.SmartWallet.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSalt(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setFactory(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.SmartWallet.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.SmartWallet.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.SmartWallet} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.SmartWallet.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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


/**
 * optional string address = 1;
 * @return {string}
 */
proto.aggregator.SmartWallet.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.SmartWallet} returns this
 */
proto.aggregator.SmartWallet.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string salt = 2;
 * @return {string}
 */
proto.aggregator.SmartWallet.prototype.getSalt = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.SmartWallet} returns this
 */
proto.aggregator.SmartWallet.prototype.setSalt = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string factory = 3;
 * @return {string}
 */
proto.aggregator.SmartWallet.prototype.getFactory = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.SmartWallet} returns this
 */
proto.aggregator.SmartWallet.prototype.setFactory = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.ListWalletResp.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.ListWalletResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ListWalletResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ListWalletResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListWalletResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    itemsList: jspb.Message.toObjectList(msg.getItemsList(),
    proto.aggregator.SmartWallet.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.ListWalletResp}
 */
proto.aggregator.ListWalletResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ListWalletResp;
  return proto.aggregator.ListWalletResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ListWalletResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ListWalletResp}
 */
proto.aggregator.ListWalletResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.SmartWallet;
      reader.readMessage(value,proto.aggregator.SmartWallet.deserializeBinaryFromReader);
      msg.addItems(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.ListWalletResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ListWalletResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ListWalletResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListWalletResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getItemsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.aggregator.SmartWallet.serializeBinaryToWriter
    );
  }
};


/**
 * repeated SmartWallet items = 1;
 * @return {!Array<!proto.aggregator.SmartWallet>}
 */
proto.aggregator.ListWalletResp.prototype.getItemsList = function() {
  return /** @type{!Array<!proto.aggregator.SmartWallet>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.SmartWallet, 1));
};


/**
 * @param {!Array<!proto.aggregator.SmartWallet>} value
 * @return {!proto.aggregator.ListWalletResp} returns this
*/
proto.aggregator.ListWalletResp.prototype.setItemsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.aggregator.SmartWallet=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.SmartWallet}
 */
proto.aggregator.ListWalletResp.prototype.addItems = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.aggregator.SmartWallet, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.ListWalletResp} returns this
 */
proto.aggregator.ListWalletResp.prototype.clearItemsList = function() {
  return this.setItemsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.ListTasksReq.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.ListTasksReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ListTasksReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ListTasksReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListTasksReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    smartWalletAddressList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    cursor: jspb.Message.getFieldWithDefault(msg, 2, ""),
    itemPerPage: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.ListTasksReq}
 */
proto.aggregator.ListTasksReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ListTasksReq;
  return proto.aggregator.ListTasksReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ListTasksReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ListTasksReq}
 */
proto.aggregator.ListTasksReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addSmartWalletAddress(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCursor(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setItemPerPage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.ListTasksReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ListTasksReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ListTasksReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListTasksReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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


/**
 * repeated string smart_wallet_address = 1;
 * @return {!Array<string>}
 */
proto.aggregator.ListTasksReq.prototype.getSmartWalletAddressList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.ListTasksReq} returns this
 */
proto.aggregator.ListTasksReq.prototype.setSmartWalletAddressList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.ListTasksReq} returns this
 */
proto.aggregator.ListTasksReq.prototype.addSmartWalletAddress = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.ListTasksReq} returns this
 */
proto.aggregator.ListTasksReq.prototype.clearSmartWalletAddressList = function() {
  return this.setSmartWalletAddressList([]);
};


/**
 * optional string cursor = 2;
 * @return {string}
 */
proto.aggregator.ListTasksReq.prototype.getCursor = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListTasksReq} returns this
 */
proto.aggregator.ListTasksReq.prototype.setCursor = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional int64 item_per_page = 3;
 * @return {number}
 */
proto.aggregator.ListTasksReq.prototype.getItemPerPage = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.ListTasksReq} returns this
 */
proto.aggregator.ListTasksReq.prototype.setItemPerPage = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.ListTasksResp.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.ListTasksResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ListTasksResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ListTasksResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListTasksResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    itemsList: jspb.Message.toObjectList(msg.getItemsList(),
    proto.aggregator.ListTasksResp.Item.toObject, includeInstance),
    cursor: jspb.Message.getFieldWithDefault(msg, 2, ""),
    hasMore: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.ListTasksResp}
 */
proto.aggregator.ListTasksResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ListTasksResp;
  return proto.aggregator.ListTasksResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ListTasksResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ListTasksResp}
 */
proto.aggregator.ListTasksResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.ListTasksResp.Item;
      reader.readMessage(value,proto.aggregator.ListTasksResp.Item.deserializeBinaryFromReader);
      msg.addItems(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCursor(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setHasMore(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.ListTasksResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ListTasksResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ListTasksResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListTasksResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.ListTasksResp.Item.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ListTasksResp.Item.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ListTasksResp.Item} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListTasksResp.Item.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    owner: jspb.Message.getFieldWithDefault(msg, 2, ""),
    smartWalletAddress: jspb.Message.getFieldWithDefault(msg, 3, ""),
    startAt: jspb.Message.getFieldWithDefault(msg, 4, 0),
    expiredAt: jspb.Message.getFieldWithDefault(msg, 5, 0),
    name: jspb.Message.getFieldWithDefault(msg, 6, ""),
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.ListTasksResp.Item}
 */
proto.aggregator.ListTasksResp.Item.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ListTasksResp.Item;
  return proto.aggregator.ListTasksResp.Item.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ListTasksResp.Item} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ListTasksResp.Item}
 */
proto.aggregator.ListTasksResp.Item.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwner(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSmartWalletAddress(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setStartAt(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExpiredAt(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCompletedAt(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setMaxExecution(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTotalExecution(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLastRanAt(value);
      break;
    case 11:
      var value = /** @type {!proto.aggregator.TaskStatus} */ (reader.readEnum());
      msg.setStatus(value);
      break;
    case 12:
      var value = new proto.aggregator.TaskTrigger;
      reader.readMessage(value,proto.aggregator.TaskTrigger.deserializeBinaryFromReader);
      msg.setTrigger(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.ListTasksResp.Item.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ListTasksResp.Item.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ListTasksResp.Item} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListTasksResp.Item.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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
  f = message.getName();
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
  if (f !== 0.0) {
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


/**
 * optional string id = 1;
 * @return {string}
 */
proto.aggregator.ListTasksResp.Item.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListTasksResp.Item} returns this
 */
proto.aggregator.ListTasksResp.Item.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string owner = 2;
 * @return {string}
 */
proto.aggregator.ListTasksResp.Item.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListTasksResp.Item} returns this
 */
proto.aggregator.ListTasksResp.Item.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string smart_wallet_address = 3;
 * @return {string}
 */
proto.aggregator.ListTasksResp.Item.prototype.getSmartWalletAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListTasksResp.Item} returns this
 */
proto.aggregator.ListTasksResp.Item.prototype.setSmartWalletAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int64 start_at = 4;
 * @return {number}
 */
proto.aggregator.ListTasksResp.Item.prototype.getStartAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.ListTasksResp.Item} returns this
 */
proto.aggregator.ListTasksResp.Item.prototype.setStartAt = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int64 expired_at = 5;
 * @return {number}
 */
proto.aggregator.ListTasksResp.Item.prototype.getExpiredAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.ListTasksResp.Item} returns this
 */
proto.aggregator.ListTasksResp.Item.prototype.setExpiredAt = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional string name = 6;
 * @return {string}
 */
proto.aggregator.ListTasksResp.Item.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListTasksResp.Item} returns this
 */
proto.aggregator.ListTasksResp.Item.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional int64 completed_at = 7;
 * @return {number}
 */
proto.aggregator.ListTasksResp.Item.prototype.getCompletedAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.ListTasksResp.Item} returns this
 */
proto.aggregator.ListTasksResp.Item.prototype.setCompletedAt = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int64 max_execution = 8;
 * @return {number}
 */
proto.aggregator.ListTasksResp.Item.prototype.getMaxExecution = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.ListTasksResp.Item} returns this
 */
proto.aggregator.ListTasksResp.Item.prototype.setMaxExecution = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional int64 total_execution = 9;
 * @return {number}
 */
proto.aggregator.ListTasksResp.Item.prototype.getTotalExecution = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.ListTasksResp.Item} returns this
 */
proto.aggregator.ListTasksResp.Item.prototype.setTotalExecution = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional int64 last_ran_at = 10;
 * @return {number}
 */
proto.aggregator.ListTasksResp.Item.prototype.getLastRanAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.ListTasksResp.Item} returns this
 */
proto.aggregator.ListTasksResp.Item.prototype.setLastRanAt = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * optional TaskStatus status = 11;
 * @return {!proto.aggregator.TaskStatus}
 */
proto.aggregator.ListTasksResp.Item.prototype.getStatus = function() {
  return /** @type {!proto.aggregator.TaskStatus} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {!proto.aggregator.TaskStatus} value
 * @return {!proto.aggregator.ListTasksResp.Item} returns this
 */
proto.aggregator.ListTasksResp.Item.prototype.setStatus = function(value) {
  return jspb.Message.setProto3EnumField(this, 11, value);
};


/**
 * optional TaskTrigger trigger = 12;
 * @return {?proto.aggregator.TaskTrigger}
 */
proto.aggregator.ListTasksResp.Item.prototype.getTrigger = function() {
  return /** @type{?proto.aggregator.TaskTrigger} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.TaskTrigger, 12));
};


/**
 * @param {?proto.aggregator.TaskTrigger|undefined} value
 * @return {!proto.aggregator.ListTasksResp.Item} returns this
*/
proto.aggregator.ListTasksResp.Item.prototype.setTrigger = function(value) {
  return jspb.Message.setWrapperField(this, 12, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.ListTasksResp.Item} returns this
 */
proto.aggregator.ListTasksResp.Item.prototype.clearTrigger = function() {
  return this.setTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ListTasksResp.Item.prototype.hasTrigger = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * repeated Item items = 1;
 * @return {!Array<!proto.aggregator.ListTasksResp.Item>}
 */
proto.aggregator.ListTasksResp.prototype.getItemsList = function() {
  return /** @type{!Array<!proto.aggregator.ListTasksResp.Item>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.ListTasksResp.Item, 1));
};


/**
 * @param {!Array<!proto.aggregator.ListTasksResp.Item>} value
 * @return {!proto.aggregator.ListTasksResp} returns this
*/
proto.aggregator.ListTasksResp.prototype.setItemsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.aggregator.ListTasksResp.Item=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.ListTasksResp.Item}
 */
proto.aggregator.ListTasksResp.prototype.addItems = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.aggregator.ListTasksResp.Item, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.ListTasksResp} returns this
 */
proto.aggregator.ListTasksResp.prototype.clearItemsList = function() {
  return this.setItemsList([]);
};


/**
 * optional string cursor = 2;
 * @return {string}
 */
proto.aggregator.ListTasksResp.prototype.getCursor = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListTasksResp} returns this
 */
proto.aggregator.ListTasksResp.prototype.setCursor = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool has_more = 3;
 * @return {boolean}
 */
proto.aggregator.ListTasksResp.prototype.getHasMore = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.ListTasksResp} returns this
 */
proto.aggregator.ListTasksResp.prototype.setHasMore = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.ListExecutionsReq.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.ListExecutionsReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ListExecutionsReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ListExecutionsReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListExecutionsReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    taskIdsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    cursor: jspb.Message.getFieldWithDefault(msg, 2, ""),
    itemPerPage: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.ListExecutionsReq}
 */
proto.aggregator.ListExecutionsReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ListExecutionsReq;
  return proto.aggregator.ListExecutionsReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ListExecutionsReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ListExecutionsReq}
 */
proto.aggregator.ListExecutionsReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addTaskIds(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCursor(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setItemPerPage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.ListExecutionsReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ListExecutionsReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ListExecutionsReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListExecutionsReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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


/**
 * repeated string task_ids = 1;
 * @return {!Array<string>}
 */
proto.aggregator.ListExecutionsReq.prototype.getTaskIdsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.ListExecutionsReq} returns this
 */
proto.aggregator.ListExecutionsReq.prototype.setTaskIdsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.ListExecutionsReq} returns this
 */
proto.aggregator.ListExecutionsReq.prototype.addTaskIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.ListExecutionsReq} returns this
 */
proto.aggregator.ListExecutionsReq.prototype.clearTaskIdsList = function() {
  return this.setTaskIdsList([]);
};


/**
 * optional string cursor = 2;
 * @return {string}
 */
proto.aggregator.ListExecutionsReq.prototype.getCursor = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListExecutionsReq} returns this
 */
proto.aggregator.ListExecutionsReq.prototype.setCursor = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional int64 item_per_page = 3;
 * @return {number}
 */
proto.aggregator.ListExecutionsReq.prototype.getItemPerPage = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.ListExecutionsReq} returns this
 */
proto.aggregator.ListExecutionsReq.prototype.setItemPerPage = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.ListExecutionsResp.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.ListExecutionsResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ListExecutionsResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ListExecutionsResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListExecutionsResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    itemsList: jspb.Message.toObjectList(msg.getItemsList(),
    proto.aggregator.Execution.toObject, includeInstance),
    cursor: jspb.Message.getFieldWithDefault(msg, 2, ""),
    hasMore: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.ListExecutionsResp}
 */
proto.aggregator.ListExecutionsResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ListExecutionsResp;
  return proto.aggregator.ListExecutionsResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ListExecutionsResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ListExecutionsResp}
 */
proto.aggregator.ListExecutionsResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.Execution;
      reader.readMessage(value,proto.aggregator.Execution.deserializeBinaryFromReader);
      msg.addItems(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCursor(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setHasMore(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.ListExecutionsResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ListExecutionsResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ListExecutionsResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListExecutionsResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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


/**
 * repeated Execution items = 1;
 * @return {!Array<!proto.aggregator.Execution>}
 */
proto.aggregator.ListExecutionsResp.prototype.getItemsList = function() {
  return /** @type{!Array<!proto.aggregator.Execution>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.Execution, 1));
};


/**
 * @param {!Array<!proto.aggregator.Execution>} value
 * @return {!proto.aggregator.ListExecutionsResp} returns this
*/
proto.aggregator.ListExecutionsResp.prototype.setItemsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.aggregator.Execution=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.Execution}
 */
proto.aggregator.ListExecutionsResp.prototype.addItems = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.aggregator.Execution, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.ListExecutionsResp} returns this
 */
proto.aggregator.ListExecutionsResp.prototype.clearItemsList = function() {
  return this.setItemsList([]);
};


/**
 * optional string cursor = 2;
 * @return {string}
 */
proto.aggregator.ListExecutionsResp.prototype.getCursor = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListExecutionsResp} returns this
 */
proto.aggregator.ListExecutionsResp.prototype.setCursor = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool has_more = 4;
 * @return {boolean}
 */
proto.aggregator.ListExecutionsResp.prototype.getHasMore = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.ListExecutionsResp} returns this
 */
proto.aggregator.ListExecutionsResp.prototype.setHasMore = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.ExecutionReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ExecutionReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ExecutionReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ExecutionReq.toObject = function(includeInstance, msg) {
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.ExecutionReq}
 */
proto.aggregator.ExecutionReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ExecutionReq;
  return proto.aggregator.ExecutionReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ExecutionReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ExecutionReq}
 */
proto.aggregator.ExecutionReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTaskId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setExecutionId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.ExecutionReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ExecutionReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ExecutionReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ExecutionReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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


/**
 * optional string task_id = 1;
 * @return {string}
 */
proto.aggregator.ExecutionReq.prototype.getTaskId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ExecutionReq} returns this
 */
proto.aggregator.ExecutionReq.prototype.setTaskId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string execution_id = 2;
 * @return {string}
 */
proto.aggregator.ExecutionReq.prototype.getExecutionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ExecutionReq} returns this
 */
proto.aggregator.ExecutionReq.prototype.setExecutionId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.ExecutionStatusResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ExecutionStatusResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ExecutionStatusResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ExecutionStatusResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    status: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.ExecutionStatusResp}
 */
proto.aggregator.ExecutionStatusResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ExecutionStatusResp;
  return proto.aggregator.ExecutionStatusResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ExecutionStatusResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ExecutionStatusResp}
 */
proto.aggregator.ExecutionStatusResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.aggregator.ExecutionStatus} */ (reader.readEnum());
      msg.setStatus(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.ExecutionStatusResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ExecutionStatusResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ExecutionStatusResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ExecutionStatusResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatus();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
};


/**
 * optional ExecutionStatus status = 1;
 * @return {!proto.aggregator.ExecutionStatus}
 */
proto.aggregator.ExecutionStatusResp.prototype.getStatus = function() {
  return /** @type {!proto.aggregator.ExecutionStatus} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.aggregator.ExecutionStatus} value
 * @return {!proto.aggregator.ExecutionStatusResp} returns this
 */
proto.aggregator.ExecutionStatusResp.prototype.setStatus = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.GetKeyReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.GetKeyReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.GetKeyReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetKeyReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    chainId: jspb.Message.getFieldWithDefault(msg, 2, 0),
    issuedAt: (f = msg.getIssuedAt()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    expiredAt: (f = msg.getExpiredAt()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    signature: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.GetKeyReq}
 */
proto.aggregator.GetKeyReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.GetKeyReq;
  return proto.aggregator.GetKeyReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.GetKeyReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.GetKeyReq}
 */
proto.aggregator.GetKeyReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwner(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setChainId(value);
      break;
    case 3:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setIssuedAt(value);
      break;
    case 4:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setExpiredAt(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setSignature(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.GetKeyReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.GetKeyReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.GetKeyReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetKeyReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwner();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getChainId();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getIssuedAt();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getExpiredAt();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getSignature();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.aggregator.GetKeyReq.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GetKeyReq} returns this
 */
proto.aggregator.GetKeyReq.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int64 chain_id = 2;
 * @return {number}
 */
proto.aggregator.GetKeyReq.prototype.getChainId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.GetKeyReq} returns this
 */
proto.aggregator.GetKeyReq.prototype.setChainId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional google.protobuf.Timestamp issued_at = 3;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.aggregator.GetKeyReq.prototype.getIssuedAt = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 3));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.aggregator.GetKeyReq} returns this
*/
proto.aggregator.GetKeyReq.prototype.setIssuedAt = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.GetKeyReq} returns this
 */
proto.aggregator.GetKeyReq.prototype.clearIssuedAt = function() {
  return this.setIssuedAt(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.GetKeyReq.prototype.hasIssuedAt = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional google.protobuf.Timestamp expired_at = 4;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.aggregator.GetKeyReq.prototype.getExpiredAt = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 4));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.aggregator.GetKeyReq} returns this
*/
proto.aggregator.GetKeyReq.prototype.setExpiredAt = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.GetKeyReq} returns this
 */
proto.aggregator.GetKeyReq.prototype.clearExpiredAt = function() {
  return this.setExpiredAt(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.GetKeyReq.prototype.hasExpiredAt = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional string signature = 5;
 * @return {string}
 */
proto.aggregator.GetKeyReq.prototype.getSignature = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GetKeyReq} returns this
 */
proto.aggregator.GetKeyReq.prototype.setSignature = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.KeyResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.KeyResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.KeyResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.KeyResp}
 */
proto.aggregator.KeyResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.KeyResp;
  return proto.aggregator.KeyResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.KeyResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.KeyResp}
 */
proto.aggregator.KeyResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setKey(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.KeyResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.KeyResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.KeyResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.KeyResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getKey();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string key = 1;
 * @return {string}
 */
proto.aggregator.KeyResp.prototype.getKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.KeyResp} returns this
 */
proto.aggregator.KeyResp.prototype.setKey = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.TriggerReason.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.TriggerReason.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.TriggerReason} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.TriggerReason.toObject = function(includeInstance, msg) {
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.TriggerReason}
 */
proto.aggregator.TriggerReason.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.TriggerReason;
  return proto.aggregator.TriggerReason.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.TriggerReason} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.TriggerReason}
 */
proto.aggregator.TriggerReason.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setBlockNumber(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setLogIndex(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTxHash(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setEpoch(value);
      break;
    case 5:
      var value = /** @type {!proto.aggregator.TriggerReason.TriggerType} */ (reader.readEnum());
      msg.setType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.TriggerReason.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.TriggerReason.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.TriggerReason} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.TriggerReason.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.aggregator.TriggerReason.TriggerType = {
  UNSET: 0,
  MANUAL: 2,
  FIXEDTIME: 3,
  CRON: 4,
  BLOCK: 5,
  EVENT: 6
};

/**
 * optional uint64 block_number = 1;
 * @return {number}
 */
proto.aggregator.TriggerReason.prototype.getBlockNumber = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.TriggerReason} returns this
 */
proto.aggregator.TriggerReason.prototype.setBlockNumber = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional uint64 log_index = 2;
 * @return {number}
 */
proto.aggregator.TriggerReason.prototype.getLogIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.TriggerReason} returns this
 */
proto.aggregator.TriggerReason.prototype.setLogIndex = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string tx_hash = 3;
 * @return {string}
 */
proto.aggregator.TriggerReason.prototype.getTxHash = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.TriggerReason} returns this
 */
proto.aggregator.TriggerReason.prototype.setTxHash = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional uint64 epoch = 4;
 * @return {number}
 */
proto.aggregator.TriggerReason.prototype.getEpoch = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.TriggerReason} returns this
 */
proto.aggregator.TriggerReason.prototype.setEpoch = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional TriggerType type = 5;
 * @return {!proto.aggregator.TriggerReason.TriggerType}
 */
proto.aggregator.TriggerReason.prototype.getType = function() {
  return /** @type {!proto.aggregator.TriggerReason.TriggerType} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {!proto.aggregator.TriggerReason.TriggerType} value
 * @return {!proto.aggregator.TriggerReason} returns this
 */
proto.aggregator.TriggerReason.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.GetWalletReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.GetWalletReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.GetWalletReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
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


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.GetWalletReq}
 */
proto.aggregator.GetWalletReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.GetWalletReq;
  return proto.aggregator.GetWalletReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.GetWalletReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.GetWalletReq}
 */
proto.aggregator.GetWalletReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSalt(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFactoryAddress(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.GetWalletReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.GetWalletReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.GetWalletReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetWalletReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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


/**
 * optional string salt = 1;
 * @return {string}
 */
proto.aggregator.GetWalletReq.prototype.getSalt = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GetWalletReq} returns this
 */
proto.aggregator.GetWalletReq.prototype.setSalt = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string factory_address = 2;
 * @return {string}
 */
proto.aggregator.GetWalletReq.prototype.getFactoryAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GetWalletReq} returns this
 */
proto.aggregator.GetWalletReq.prototype.setFactoryAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.GetWalletResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.GetWalletResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.GetWalletResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetWalletResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: jspb.Message.getFieldWithDefault(msg, 1, ""),
    salt: jspb.Message.getFieldWithDefault(msg, 2, ""),
    factoryAddress: jspb.Message.getFieldWithDefault(msg, 3, ""),
    totalTaskCount: jspb.Message.getFieldWithDefault(msg, 4, 0),
    activeTaskCount: jspb.Message.getFieldWithDefault(msg, 5, 0),
    completedTaskCount: jspb.Message.getFieldWithDefault(msg, 6, 0),
    failedTaskCount: jspb.Message.getFieldWithDefault(msg, 7, 0),
    canceledTaskCount: jspb.Message.getFieldWithDefault(msg, 8, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.GetWalletResp}
 */
proto.aggregator.GetWalletResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.GetWalletResp;
  return proto.aggregator.GetWalletResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.GetWalletResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.GetWalletResp}
 */
proto.aggregator.GetWalletResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSalt(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setFactoryAddress(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setTotalTaskCount(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setActiveTaskCount(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setCompletedTaskCount(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setFailedTaskCount(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setCanceledTaskCount(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.GetWalletResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.GetWalletResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.GetWalletResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetWalletResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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
  f = message.getTotalTaskCount();
  if (f !== 0) {
    writer.writeUint64(
      4,
      f
    );
  }
  f = message.getActiveTaskCount();
  if (f !== 0) {
    writer.writeUint64(
      5,
      f
    );
  }
  f = message.getCompletedTaskCount();
  if (f !== 0) {
    writer.writeUint64(
      6,
      f
    );
  }
  f = message.getFailedTaskCount();
  if (f !== 0) {
    writer.writeUint64(
      7,
      f
    );
  }
  f = message.getCanceledTaskCount();
  if (f !== 0) {
    writer.writeUint64(
      8,
      f
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.aggregator.GetWalletResp.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GetWalletResp} returns this
 */
proto.aggregator.GetWalletResp.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string salt = 2;
 * @return {string}
 */
proto.aggregator.GetWalletResp.prototype.getSalt = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GetWalletResp} returns this
 */
proto.aggregator.GetWalletResp.prototype.setSalt = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string factory_address = 3;
 * @return {string}
 */
proto.aggregator.GetWalletResp.prototype.getFactoryAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GetWalletResp} returns this
 */
proto.aggregator.GetWalletResp.prototype.setFactoryAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional uint64 total_task_count = 4;
 * @return {number}
 */
proto.aggregator.GetWalletResp.prototype.getTotalTaskCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.GetWalletResp} returns this
 */
proto.aggregator.GetWalletResp.prototype.setTotalTaskCount = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional uint64 active_task_count = 5;
 * @return {number}
 */
proto.aggregator.GetWalletResp.prototype.getActiveTaskCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.GetWalletResp} returns this
 */
proto.aggregator.GetWalletResp.prototype.setActiveTaskCount = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional uint64 completed_task_count = 6;
 * @return {number}
 */
proto.aggregator.GetWalletResp.prototype.getCompletedTaskCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.GetWalletResp} returns this
 */
proto.aggregator.GetWalletResp.prototype.setCompletedTaskCount = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional uint64 failed_task_count = 7;
 * @return {number}
 */
proto.aggregator.GetWalletResp.prototype.getFailedTaskCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.GetWalletResp} returns this
 */
proto.aggregator.GetWalletResp.prototype.setFailedTaskCount = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional uint64 canceled_task_count = 8;
 * @return {number}
 */
proto.aggregator.GetWalletResp.prototype.getCanceledTaskCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.GetWalletResp} returns this
 */
proto.aggregator.GetWalletResp.prototype.setCanceledTaskCount = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.UserTriggerTaskReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.UserTriggerTaskReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.UserTriggerTaskReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.UserTriggerTaskReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    taskId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    reason: (f = msg.getReason()) && proto.aggregator.TriggerReason.toObject(includeInstance, f),
    isBlocking: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.UserTriggerTaskReq}
 */
proto.aggregator.UserTriggerTaskReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.UserTriggerTaskReq;
  return proto.aggregator.UserTriggerTaskReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.UserTriggerTaskReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.UserTriggerTaskReq}
 */
proto.aggregator.UserTriggerTaskReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTaskId(value);
      break;
    case 2:
      var value = new proto.aggregator.TriggerReason;
      reader.readMessage(value,proto.aggregator.TriggerReason.deserializeBinaryFromReader);
      msg.setReason(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsBlocking(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.UserTriggerTaskReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.UserTriggerTaskReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.UserTriggerTaskReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.UserTriggerTaskReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTaskId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getReason();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.aggregator.TriggerReason.serializeBinaryToWriter
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


/**
 * optional string task_id = 1;
 * @return {string}
 */
proto.aggregator.UserTriggerTaskReq.prototype.getTaskId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.UserTriggerTaskReq} returns this
 */
proto.aggregator.UserTriggerTaskReq.prototype.setTaskId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional TriggerReason reason = 2;
 * @return {?proto.aggregator.TriggerReason}
 */
proto.aggregator.UserTriggerTaskReq.prototype.getReason = function() {
  return /** @type{?proto.aggregator.TriggerReason} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.TriggerReason, 2));
};


/**
 * @param {?proto.aggregator.TriggerReason|undefined} value
 * @return {!proto.aggregator.UserTriggerTaskReq} returns this
*/
proto.aggregator.UserTriggerTaskReq.prototype.setReason = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.UserTriggerTaskReq} returns this
 */
proto.aggregator.UserTriggerTaskReq.prototype.clearReason = function() {
  return this.setReason(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.UserTriggerTaskReq.prototype.hasReason = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional bool is_blocking = 3;
 * @return {boolean}
 */
proto.aggregator.UserTriggerTaskReq.prototype.getIsBlocking = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.UserTriggerTaskReq} returns this
 */
proto.aggregator.UserTriggerTaskReq.prototype.setIsBlocking = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.UserTriggerTaskResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.UserTriggerTaskResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.UserTriggerTaskResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.UserTriggerTaskResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    executionId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    status: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.UserTriggerTaskResp}
 */
proto.aggregator.UserTriggerTaskResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.UserTriggerTaskResp;
  return proto.aggregator.UserTriggerTaskResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.UserTriggerTaskResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.UserTriggerTaskResp}
 */
proto.aggregator.UserTriggerTaskResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setExecutionId(value);
      break;
    case 2:
      var value = /** @type {!proto.aggregator.ExecutionStatus} */ (reader.readEnum());
      msg.setStatus(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.UserTriggerTaskResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.UserTriggerTaskResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.UserTriggerTaskResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.UserTriggerTaskResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getExecutionId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getStatus();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * optional string execution_id = 1;
 * @return {string}
 */
proto.aggregator.UserTriggerTaskResp.prototype.getExecutionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.UserTriggerTaskResp} returns this
 */
proto.aggregator.UserTriggerTaskResp.prototype.setExecutionId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional ExecutionStatus status = 2;
 * @return {!proto.aggregator.ExecutionStatus}
 */
proto.aggregator.UserTriggerTaskResp.prototype.getStatus = function() {
  return /** @type {!proto.aggregator.ExecutionStatus} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.aggregator.ExecutionStatus} value
 * @return {!proto.aggregator.UserTriggerTaskResp} returns this
 */
proto.aggregator.UserTriggerTaskResp.prototype.setStatus = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.CreateOrUpdateSecretReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.CreateOrUpdateSecretReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.CreateOrUpdateSecretReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CreateOrUpdateSecretReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    secret: jspb.Message.getFieldWithDefault(msg, 2, ""),
    workflowId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    orgId: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.CreateOrUpdateSecretReq}
 */
proto.aggregator.CreateOrUpdateSecretReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.CreateOrUpdateSecretReq;
  return proto.aggregator.CreateOrUpdateSecretReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.CreateOrUpdateSecretReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.CreateOrUpdateSecretReq}
 */
proto.aggregator.CreateOrUpdateSecretReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSecret(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setWorkflowId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setOrgId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.CreateOrUpdateSecretReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.CreateOrUpdateSecretReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.CreateOrUpdateSecretReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CreateOrUpdateSecretReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSecret();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getWorkflowId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getOrgId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.aggregator.CreateOrUpdateSecretReq.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.CreateOrUpdateSecretReq} returns this
 */
proto.aggregator.CreateOrUpdateSecretReq.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string secret = 2;
 * @return {string}
 */
proto.aggregator.CreateOrUpdateSecretReq.prototype.getSecret = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.CreateOrUpdateSecretReq} returns this
 */
proto.aggregator.CreateOrUpdateSecretReq.prototype.setSecret = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string workflow_id = 3;
 * @return {string}
 */
proto.aggregator.CreateOrUpdateSecretReq.prototype.getWorkflowId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.CreateOrUpdateSecretReq} returns this
 */
proto.aggregator.CreateOrUpdateSecretReq.prototype.setWorkflowId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string org_id = 4;
 * @return {string}
 */
proto.aggregator.CreateOrUpdateSecretReq.prototype.getOrgId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.CreateOrUpdateSecretReq} returns this
 */
proto.aggregator.CreateOrUpdateSecretReq.prototype.setOrgId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.ListSecretsReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ListSecretsReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ListSecretsReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListSecretsReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    workflowId: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.ListSecretsReq}
 */
proto.aggregator.ListSecretsReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ListSecretsReq;
  return proto.aggregator.ListSecretsReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ListSecretsReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ListSecretsReq}
 */
proto.aggregator.ListSecretsReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setWorkflowId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.ListSecretsReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ListSecretsReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ListSecretsReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListSecretsReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getWorkflowId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string workflow_id = 1;
 * @return {string}
 */
proto.aggregator.ListSecretsReq.prototype.getWorkflowId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListSecretsReq} returns this
 */
proto.aggregator.ListSecretsReq.prototype.setWorkflowId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.ListSecretsResp.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.ListSecretsResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ListSecretsResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ListSecretsResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListSecretsResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    itemsList: jspb.Message.toObjectList(msg.getItemsList(),
    proto.aggregator.ListSecretsResp.ResponseSecret.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.ListSecretsResp}
 */
proto.aggregator.ListSecretsResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ListSecretsResp;
  return proto.aggregator.ListSecretsResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ListSecretsResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ListSecretsResp}
 */
proto.aggregator.ListSecretsResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.ListSecretsResp.ResponseSecret;
      reader.readMessage(value,proto.aggregator.ListSecretsResp.ResponseSecret.deserializeBinaryFromReader);
      msg.addItems(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.ListSecretsResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ListSecretsResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ListSecretsResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListSecretsResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getItemsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.aggregator.ListSecretsResp.ResponseSecret.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.ListSecretsResp.ResponseSecret.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ListSecretsResp.ResponseSecret.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ListSecretsResp.ResponseSecret} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListSecretsResp.ResponseSecret.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    scope: jspb.Message.getFieldWithDefault(msg, 2, ""),
    workflowId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    orgId: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.ListSecretsResp.ResponseSecret}
 */
proto.aggregator.ListSecretsResp.ResponseSecret.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ListSecretsResp.ResponseSecret;
  return proto.aggregator.ListSecretsResp.ResponseSecret.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ListSecretsResp.ResponseSecret} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ListSecretsResp.ResponseSecret}
 */
proto.aggregator.ListSecretsResp.ResponseSecret.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setScope(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setWorkflowId(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setOrgId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.ListSecretsResp.ResponseSecret.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ListSecretsResp.ResponseSecret.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ListSecretsResp.ResponseSecret} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ListSecretsResp.ResponseSecret.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getScope();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getWorkflowId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getOrgId();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.aggregator.ListSecretsResp.ResponseSecret.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListSecretsResp.ResponseSecret} returns this
 */
proto.aggregator.ListSecretsResp.ResponseSecret.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string scope = 2;
 * @return {string}
 */
proto.aggregator.ListSecretsResp.ResponseSecret.prototype.getScope = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListSecretsResp.ResponseSecret} returns this
 */
proto.aggregator.ListSecretsResp.ResponseSecret.prototype.setScope = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string workflow_id = 4;
 * @return {string}
 */
proto.aggregator.ListSecretsResp.ResponseSecret.prototype.getWorkflowId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListSecretsResp.ResponseSecret} returns this
 */
proto.aggregator.ListSecretsResp.ResponseSecret.prototype.setWorkflowId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string org_id = 5;
 * @return {string}
 */
proto.aggregator.ListSecretsResp.ResponseSecret.prototype.getOrgId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListSecretsResp.ResponseSecret} returns this
 */
proto.aggregator.ListSecretsResp.ResponseSecret.prototype.setOrgId = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * repeated ResponseSecret items = 1;
 * @return {!Array<!proto.aggregator.ListSecretsResp.ResponseSecret>}
 */
proto.aggregator.ListSecretsResp.prototype.getItemsList = function() {
  return /** @type{!Array<!proto.aggregator.ListSecretsResp.ResponseSecret>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.ListSecretsResp.ResponseSecret, 1));
};


/**
 * @param {!Array<!proto.aggregator.ListSecretsResp.ResponseSecret>} value
 * @return {!proto.aggregator.ListSecretsResp} returns this
*/
proto.aggregator.ListSecretsResp.prototype.setItemsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.aggregator.ListSecretsResp.ResponseSecret=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.ListSecretsResp.ResponseSecret}
 */
proto.aggregator.ListSecretsResp.prototype.addItems = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.aggregator.ListSecretsResp.ResponseSecret, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.ListSecretsResp} returns this
 */
proto.aggregator.ListSecretsResp.prototype.clearItemsList = function() {
  return this.setItemsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.aggregator.DeleteSecretReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.DeleteSecretReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.DeleteSecretReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.DeleteSecretReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    workflowId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    orgId: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.aggregator.DeleteSecretReq}
 */
proto.aggregator.DeleteSecretReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.DeleteSecretReq;
  return proto.aggregator.DeleteSecretReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.DeleteSecretReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.DeleteSecretReq}
 */
proto.aggregator.DeleteSecretReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setWorkflowId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setOrgId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.aggregator.DeleteSecretReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.DeleteSecretReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.DeleteSecretReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.DeleteSecretReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getWorkflowId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getOrgId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.aggregator.DeleteSecretReq.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.DeleteSecretReq} returns this
 */
proto.aggregator.DeleteSecretReq.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string workflow_id = 2;
 * @return {string}
 */
proto.aggregator.DeleteSecretReq.prototype.getWorkflowId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.DeleteSecretReq} returns this
 */
proto.aggregator.DeleteSecretReq.prototype.setWorkflowId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string org_id = 3;
 * @return {string}
 */
proto.aggregator.DeleteSecretReq.prototype.getOrgId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.DeleteSecretReq} returns this
 */
proto.aggregator.DeleteSecretReq.prototype.setOrgId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * @enum {number}
 */
proto.aggregator.Error = {
  UNKNOWERROR: 0,
  RPCNODEERROR: 1000,
  STORAGEUNAVAILABLE: 2000,
  STORAGEWRITEERROR: 2001,
  SMARTWALLETRPCERROR: 6000,
  SMARTWALLETNOTFOUNDERROR: 6001,
  TASKDATACORRUPTED: 7000,
  TASKDATAMISSINGERROR: 7001,
  TASKTRIGGERERROR: 7003
};

/**
 * @enum {number}
 */
proto.aggregator.TaskStatus = {
  ACTIVE: 0,
  COMPLETED: 1,
  FAILED: 2,
  CANCELED: 3,
  EXECUTING: 4
};

/**
 * @enum {number}
 */
proto.aggregator.ExecutionStatus = {
  QUEUED: 0,
  FINISHED: 2
};

/**
 * @enum {number}
 */
proto.aggregator.CustomCodeLang = {
  JAVASCRIPT: 0
};

goog.object.extend(exports, proto.aggregator);
