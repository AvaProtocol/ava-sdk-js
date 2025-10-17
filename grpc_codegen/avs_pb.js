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

var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js');
goog.object.extend(proto, google_protobuf_struct_pb);
goog.exportSymbol('proto.aggregator.AutomationFee', null, global);
goog.exportSymbol('proto.aggregator.BalanceNode', null, global);
goog.exportSymbol('proto.aggregator.BalanceNode.Config', null, global);
goog.exportSymbol('proto.aggregator.BalanceNode.Output', null, global);
goog.exportSymbol('proto.aggregator.BlockTrigger', null, global);
goog.exportSymbol('proto.aggregator.BlockTrigger.Config', null, global);
goog.exportSymbol('proto.aggregator.BlockTrigger.Output', null, global);
goog.exportSymbol('proto.aggregator.BranchNode', null, global);
goog.exportSymbol('proto.aggregator.BranchNode.Condition', null, global);
goog.exportSymbol('proto.aggregator.BranchNode.Config', null, global);
goog.exportSymbol('proto.aggregator.BranchNode.Output', null, global);
goog.exportSymbol('proto.aggregator.CancelTaskResp', null, global);
goog.exportSymbol('proto.aggregator.ContractReadNode', null, global);
goog.exportSymbol('proto.aggregator.ContractReadNode.Config', null, global);
goog.exportSymbol('proto.aggregator.ContractReadNode.MethodCall', null, global);
goog.exportSymbol('proto.aggregator.ContractReadNode.MethodResult', null, global);
goog.exportSymbol('proto.aggregator.ContractReadNode.MethodResult.StructuredField', null, global);
goog.exportSymbol('proto.aggregator.ContractReadNode.Output', null, global);
goog.exportSymbol('proto.aggregator.ContractWriteNode', null, global);
goog.exportSymbol('proto.aggregator.ContractWriteNode.Config', null, global);
goog.exportSymbol('proto.aggregator.ContractWriteNode.MethodCall', null, global);
goog.exportSymbol('proto.aggregator.ContractWriteNode.MethodResult', null, global);
goog.exportSymbol('proto.aggregator.ContractWriteNode.Output', null, global);
goog.exportSymbol('proto.aggregator.CreateOrUpdateSecretReq', null, global);
goog.exportSymbol('proto.aggregator.CreateSecretResp', null, global);
goog.exportSymbol('proto.aggregator.CreateTaskReq', null, global);
goog.exportSymbol('proto.aggregator.CreateTaskResp', null, global);
goog.exportSymbol('proto.aggregator.CronTrigger', null, global);
goog.exportSymbol('proto.aggregator.CronTrigger.Config', null, global);
goog.exportSymbol('proto.aggregator.CronTrigger.Output', null, global);
goog.exportSymbol('proto.aggregator.CustomCodeNode', null, global);
goog.exportSymbol('proto.aggregator.CustomCodeNode.Config', null, global);
goog.exportSymbol('proto.aggregator.CustomCodeNode.Output', null, global);
goog.exportSymbol('proto.aggregator.DeleteSecretReq', null, global);
goog.exportSymbol('proto.aggregator.DeleteSecretResp', null, global);
goog.exportSymbol('proto.aggregator.DeleteTaskResp', null, global);
goog.exportSymbol('proto.aggregator.ETHTransferNode', null, global);
goog.exportSymbol('proto.aggregator.ETHTransferNode.Config', null, global);
goog.exportSymbol('proto.aggregator.ETHTransferNode.Output', null, global);
goog.exportSymbol('proto.aggregator.ErrorCode', null, global);
goog.exportSymbol('proto.aggregator.EstimateFeesReq', null, global);
goog.exportSymbol('proto.aggregator.EstimateFeesResp', null, global);
goog.exportSymbol('proto.aggregator.EventCondition', null, global);
goog.exportSymbol('proto.aggregator.EventTrigger', null, global);
goog.exportSymbol('proto.aggregator.EventTrigger.Config', null, global);
goog.exportSymbol('proto.aggregator.EventTrigger.MethodCall', null, global);
goog.exportSymbol('proto.aggregator.EventTrigger.Output', null, global);
goog.exportSymbol('proto.aggregator.EventTrigger.Query', null, global);
goog.exportSymbol('proto.aggregator.EventTrigger.Topics', null, global);
goog.exportSymbol('proto.aggregator.Execution', null, global);
goog.exportSymbol('proto.aggregator.Execution.Step', null, global);
goog.exportSymbol('proto.aggregator.Execution.Step.OutputDataCase', null, global);
goog.exportSymbol('proto.aggregator.ExecutionMode', null, global);
goog.exportSymbol('proto.aggregator.ExecutionReq', null, global);
goog.exportSymbol('proto.aggregator.ExecutionStatus', null, global);
goog.exportSymbol('proto.aggregator.ExecutionStatusResp', null, global);
goog.exportSymbol('proto.aggregator.FeeAmount', null, global);
goog.exportSymbol('proto.aggregator.FeeDiscount', null, global);
goog.exportSymbol('proto.aggregator.FilterNode', null, global);
goog.exportSymbol('proto.aggregator.FilterNode.Config', null, global);
goog.exportSymbol('proto.aggregator.FilterNode.Output', null, global);
goog.exportSymbol('proto.aggregator.FixedTimeTrigger', null, global);
goog.exportSymbol('proto.aggregator.FixedTimeTrigger.Config', null, global);
goog.exportSymbol('proto.aggregator.FixedTimeTrigger.Output', null, global);
goog.exportSymbol('proto.aggregator.GasFeeBreakdown', null, global);
goog.exportSymbol('proto.aggregator.GasOperationFee', null, global);
goog.exportSymbol('proto.aggregator.GetExecutionCountReq', null, global);
goog.exportSymbol('proto.aggregator.GetExecutionCountResp', null, global);
goog.exportSymbol('proto.aggregator.GetExecutionStatsReq', null, global);
goog.exportSymbol('proto.aggregator.GetExecutionStatsResp', null, global);
goog.exportSymbol('proto.aggregator.GetKeyReq', null, global);
goog.exportSymbol('proto.aggregator.GetSignatureFormatReq', null, global);
goog.exportSymbol('proto.aggregator.GetSignatureFormatResp', null, global);
goog.exportSymbol('proto.aggregator.GetTokenMetadataReq', null, global);
goog.exportSymbol('proto.aggregator.GetTokenMetadataResp', null, global);
goog.exportSymbol('proto.aggregator.GetWalletReq', null, global);
goog.exportSymbol('proto.aggregator.GetWalletResp', null, global);
goog.exportSymbol('proto.aggregator.GetWorkflowCountReq', null, global);
goog.exportSymbol('proto.aggregator.GetWorkflowCountResp', null, global);
goog.exportSymbol('proto.aggregator.GraphQLQueryNode', null, global);
goog.exportSymbol('proto.aggregator.GraphQLQueryNode.Config', null, global);
goog.exportSymbol('proto.aggregator.GraphQLQueryNode.Output', null, global);
goog.exportSymbol('proto.aggregator.IdReq', null, global);
goog.exportSymbol('proto.aggregator.KeyResp', null, global);
goog.exportSymbol('proto.aggregator.Lang', null, global);
goog.exportSymbol('proto.aggregator.ListExecutionsReq', null, global);
goog.exportSymbol('proto.aggregator.ListExecutionsResp', null, global);
goog.exportSymbol('proto.aggregator.ListSecretsReq', null, global);
goog.exportSymbol('proto.aggregator.ListSecretsResp', null, global);
goog.exportSymbol('proto.aggregator.ListTasksReq', null, global);
goog.exportSymbol('proto.aggregator.ListTasksResp', null, global);
goog.exportSymbol('proto.aggregator.ListWalletReq', null, global);
goog.exportSymbol('proto.aggregator.ListWalletResp', null, global);
goog.exportSymbol('proto.aggregator.LoopNode', null, global);
goog.exportSymbol('proto.aggregator.LoopNode.Config', null, global);
goog.exportSymbol('proto.aggregator.LoopNode.Output', null, global);
goog.exportSymbol('proto.aggregator.LoopNode.RunnerCase', null, global);
goog.exportSymbol('proto.aggregator.ManualTrigger', null, global);
goog.exportSymbol('proto.aggregator.ManualTrigger.Config', null, global);
goog.exportSymbol('proto.aggregator.ManualTrigger.Output', null, global);
goog.exportSymbol('proto.aggregator.NodeType', null, global);
goog.exportSymbol('proto.aggregator.NonceRequest', null, global);
goog.exportSymbol('proto.aggregator.NonceResp', null, global);
goog.exportSymbol('proto.aggregator.PageInfo', null, global);
goog.exportSymbol('proto.aggregator.RestAPINode', null, global);
goog.exportSymbol('proto.aggregator.RestAPINode.Config', null, global);
goog.exportSymbol('proto.aggregator.RestAPINode.Output', null, global);
goog.exportSymbol('proto.aggregator.RunNodeWithInputsReq', null, global);
goog.exportSymbol('proto.aggregator.RunNodeWithInputsResp', null, global);
goog.exportSymbol('proto.aggregator.RunNodeWithInputsResp.OutputDataCase', null, global);
goog.exportSymbol('proto.aggregator.RunTriggerReq', null, global);
goog.exportSymbol('proto.aggregator.RunTriggerResp', null, global);
goog.exportSymbol('proto.aggregator.RunTriggerResp.OutputDataCase', null, global);
goog.exportSymbol('proto.aggregator.Secret', null, global);
goog.exportSymbol('proto.aggregator.SetWalletReq', null, global);
goog.exportSymbol('proto.aggregator.SimulateTaskReq', null, global);
goog.exportSymbol('proto.aggregator.SmartWallet', null, global);
goog.exportSymbol('proto.aggregator.SmartWalletCreationFee', null, global);
goog.exportSymbol('proto.aggregator.Task', null, global);
goog.exportSymbol('proto.aggregator.TaskEdge', null, global);
goog.exportSymbol('proto.aggregator.TaskNode', null, global);
goog.exportSymbol('proto.aggregator.TaskNode.TaskTypeCase', null, global);
goog.exportSymbol('proto.aggregator.TaskStatus', null, global);
goog.exportSymbol('proto.aggregator.TaskTrigger', null, global);
goog.exportSymbol('proto.aggregator.TaskTrigger.TriggerTypeCase', null, global);
goog.exportSymbol('proto.aggregator.TokenMetadata', null, global);
goog.exportSymbol('proto.aggregator.TriggerTaskReq', null, global);
goog.exportSymbol('proto.aggregator.TriggerTaskReq.TriggerOutputCase', null, global);
goog.exportSymbol('proto.aggregator.TriggerTaskResp', null, global);
goog.exportSymbol('proto.aggregator.TriggerType', null, global);
goog.exportSymbol('proto.aggregator.UpdateSecretResp', null, global);
goog.exportSymbol('proto.aggregator.WithdrawFundsReq', null, global);
goog.exportSymbol('proto.aggregator.WithdrawFundsResp', null, global);
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
proto.aggregator.TokenMetadata = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.TokenMetadata, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.TokenMetadata.displayName = 'proto.aggregator.TokenMetadata';
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
proto.aggregator.GetTokenMetadataReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.GetTokenMetadataReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.GetTokenMetadataReq.displayName = 'proto.aggregator.GetTokenMetadataReq';
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
proto.aggregator.GetTokenMetadataResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.GetTokenMetadataResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.GetTokenMetadataResp.displayName = 'proto.aggregator.GetTokenMetadataResp';
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
proto.aggregator.FixedTimeTrigger = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.FixedTimeTrigger, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.FixedTimeTrigger.displayName = 'proto.aggregator.FixedTimeTrigger';
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
proto.aggregator.FixedTimeTrigger.Config = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.FixedTimeTrigger.Config.repeatedFields_, null);
};
goog.inherits(proto.aggregator.FixedTimeTrigger.Config, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.FixedTimeTrigger.Config.displayName = 'proto.aggregator.FixedTimeTrigger.Config';
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
proto.aggregator.FixedTimeTrigger.Output = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.FixedTimeTrigger.Output, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.FixedTimeTrigger.Output.displayName = 'proto.aggregator.FixedTimeTrigger.Output';
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
proto.aggregator.CronTrigger = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.CronTrigger, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.CronTrigger.displayName = 'proto.aggregator.CronTrigger';
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
proto.aggregator.CronTrigger.Config = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.CronTrigger.Config.repeatedFields_, null);
};
goog.inherits(proto.aggregator.CronTrigger.Config, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.CronTrigger.Config.displayName = 'proto.aggregator.CronTrigger.Config';
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
proto.aggregator.CronTrigger.Output = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.CronTrigger.Output, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.CronTrigger.Output.displayName = 'proto.aggregator.CronTrigger.Output';
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
proto.aggregator.BlockTrigger = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.BlockTrigger, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.BlockTrigger.displayName = 'proto.aggregator.BlockTrigger';
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
proto.aggregator.BlockTrigger.Config = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.BlockTrigger.Config, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.BlockTrigger.Config.displayName = 'proto.aggregator.BlockTrigger.Config';
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
proto.aggregator.BlockTrigger.Output = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.BlockTrigger.Output, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.BlockTrigger.Output.displayName = 'proto.aggregator.BlockTrigger.Output';
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
proto.aggregator.EventTrigger = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.EventTrigger, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.EventTrigger.displayName = 'proto.aggregator.EventTrigger';
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
proto.aggregator.EventTrigger.Query = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.EventTrigger.Query.repeatedFields_, null);
};
goog.inherits(proto.aggregator.EventTrigger.Query, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.EventTrigger.Query.displayName = 'proto.aggregator.EventTrigger.Query';
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
proto.aggregator.EventTrigger.MethodCall = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.EventTrigger.MethodCall.repeatedFields_, null);
};
goog.inherits(proto.aggregator.EventTrigger.MethodCall, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.EventTrigger.MethodCall.displayName = 'proto.aggregator.EventTrigger.MethodCall';
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
proto.aggregator.EventTrigger.Topics = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.EventTrigger.Topics.repeatedFields_, null);
};
goog.inherits(proto.aggregator.EventTrigger.Topics, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.EventTrigger.Topics.displayName = 'proto.aggregator.EventTrigger.Topics';
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
proto.aggregator.EventTrigger.Config = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.EventTrigger.Config.repeatedFields_, null);
};
goog.inherits(proto.aggregator.EventTrigger.Config, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.EventTrigger.Config.displayName = 'proto.aggregator.EventTrigger.Config';
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
proto.aggregator.EventTrigger.Output = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.EventTrigger.Output, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.EventTrigger.Output.displayName = 'proto.aggregator.EventTrigger.Output';
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
proto.aggregator.ManualTrigger = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.ManualTrigger, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ManualTrigger.displayName = 'proto.aggregator.ManualTrigger';
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
proto.aggregator.ManualTrigger.Config = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.ManualTrigger.Config, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ManualTrigger.Config.displayName = 'proto.aggregator.ManualTrigger.Config';
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
proto.aggregator.ManualTrigger.Output = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.ManualTrigger.Output, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ManualTrigger.Output.displayName = 'proto.aggregator.ManualTrigger.Output';
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
proto.aggregator.ETHTransferNode.Config = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.ETHTransferNode.Config, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ETHTransferNode.Config.displayName = 'proto.aggregator.ETHTransferNode.Config';
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
proto.aggregator.ETHTransferNode.Output = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.ETHTransferNode.Output, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ETHTransferNode.Output.displayName = 'proto.aggregator.ETHTransferNode.Output';
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
proto.aggregator.ContractWriteNode.Config = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.ContractWriteNode.Config.repeatedFields_, null);
};
goog.inherits(proto.aggregator.ContractWriteNode.Config, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ContractWriteNode.Config.displayName = 'proto.aggregator.ContractWriteNode.Config';
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
proto.aggregator.ContractWriteNode.MethodCall = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.ContractWriteNode.MethodCall.repeatedFields_, null);
};
goog.inherits(proto.aggregator.ContractWriteNode.MethodCall, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ContractWriteNode.MethodCall.displayName = 'proto.aggregator.ContractWriteNode.MethodCall';
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
proto.aggregator.ContractWriteNode.Output = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.ContractWriteNode.Output, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ContractWriteNode.Output.displayName = 'proto.aggregator.ContractWriteNode.Output';
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
proto.aggregator.ContractWriteNode.MethodResult = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.ContractWriteNode.MethodResult, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ContractWriteNode.MethodResult.displayName = 'proto.aggregator.ContractWriteNode.MethodResult';
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
proto.aggregator.ContractReadNode.MethodCall = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.ContractReadNode.MethodCall.repeatedFields_, null);
};
goog.inherits(proto.aggregator.ContractReadNode.MethodCall, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ContractReadNode.MethodCall.displayName = 'proto.aggregator.ContractReadNode.MethodCall';
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
proto.aggregator.ContractReadNode.Config = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.ContractReadNode.Config.repeatedFields_, null);
};
goog.inherits(proto.aggregator.ContractReadNode.Config, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ContractReadNode.Config.displayName = 'proto.aggregator.ContractReadNode.Config';
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
proto.aggregator.ContractReadNode.MethodResult = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.ContractReadNode.MethodResult.repeatedFields_, null);
};
goog.inherits(proto.aggregator.ContractReadNode.MethodResult, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ContractReadNode.MethodResult.displayName = 'proto.aggregator.ContractReadNode.MethodResult';
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
proto.aggregator.ContractReadNode.MethodResult.StructuredField = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.ContractReadNode.MethodResult.StructuredField, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ContractReadNode.MethodResult.StructuredField.displayName = 'proto.aggregator.ContractReadNode.MethodResult.StructuredField';
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
proto.aggregator.ContractReadNode.Output = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.ContractReadNode.Output, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.ContractReadNode.Output.displayName = 'proto.aggregator.ContractReadNode.Output';
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
proto.aggregator.GraphQLQueryNode.Config = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.GraphQLQueryNode.Config, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.GraphQLQueryNode.Config.displayName = 'proto.aggregator.GraphQLQueryNode.Config';
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
proto.aggregator.GraphQLQueryNode.Output = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.GraphQLQueryNode.Output, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.GraphQLQueryNode.Output.displayName = 'proto.aggregator.GraphQLQueryNode.Output';
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
proto.aggregator.RestAPINode.Config = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.RestAPINode.Config, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.RestAPINode.Config.displayName = 'proto.aggregator.RestAPINode.Config';
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
proto.aggregator.RestAPINode.Output = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.RestAPINode.Output, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.RestAPINode.Output.displayName = 'proto.aggregator.RestAPINode.Output';
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
proto.aggregator.CustomCodeNode.Config = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.CustomCodeNode.Config, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.CustomCodeNode.Config.displayName = 'proto.aggregator.CustomCodeNode.Config';
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
proto.aggregator.CustomCodeNode.Output = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.CustomCodeNode.Output, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.CustomCodeNode.Output.displayName = 'proto.aggregator.CustomCodeNode.Output';
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
proto.aggregator.BalanceNode = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.BalanceNode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.BalanceNode.displayName = 'proto.aggregator.BalanceNode';
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
proto.aggregator.BalanceNode.Config = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.BalanceNode.Config.repeatedFields_, null);
};
goog.inherits(proto.aggregator.BalanceNode.Config, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.BalanceNode.Config.displayName = 'proto.aggregator.BalanceNode.Config';
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
proto.aggregator.BalanceNode.Output = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.BalanceNode.Output, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.BalanceNode.Output.displayName = 'proto.aggregator.BalanceNode.Output';
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
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
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
proto.aggregator.BranchNode.Condition = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.BranchNode.Condition, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.BranchNode.Condition.displayName = 'proto.aggregator.BranchNode.Condition';
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
proto.aggregator.BranchNode.Config = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.BranchNode.Config.repeatedFields_, null);
};
goog.inherits(proto.aggregator.BranchNode.Config, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.BranchNode.Config.displayName = 'proto.aggregator.BranchNode.Config';
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
proto.aggregator.BranchNode.Output = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.BranchNode.Output, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.BranchNode.Output.displayName = 'proto.aggregator.BranchNode.Output';
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
proto.aggregator.FilterNode.Config = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.FilterNode.Config, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.FilterNode.Config.displayName = 'proto.aggregator.FilterNode.Config';
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
proto.aggregator.FilterNode.Output = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.FilterNode.Output, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.FilterNode.Output.displayName = 'proto.aggregator.FilterNode.Output';
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
proto.aggregator.LoopNode.Config = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.LoopNode.Config, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.LoopNode.Config.displayName = 'proto.aggregator.LoopNode.Config';
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
proto.aggregator.LoopNode.Output = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.LoopNode.Output, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.LoopNode.Output.displayName = 'proto.aggregator.LoopNode.Output';
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
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.Execution.repeatedFields_, null);
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
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.Execution.Step.repeatedFields_, proto.aggregator.Execution.Step.oneofGroups_);
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
proto.aggregator.SetWalletReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.SetWalletReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.SetWalletReq.displayName = 'proto.aggregator.SetWalletReq';
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
proto.aggregator.WithdrawFundsReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.WithdrawFundsReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.WithdrawFundsReq.displayName = 'proto.aggregator.WithdrawFundsReq';
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
proto.aggregator.WithdrawFundsResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.WithdrawFundsResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.WithdrawFundsResp.displayName = 'proto.aggregator.WithdrawFundsResp';
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
proto.aggregator.TriggerTaskReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.aggregator.TriggerTaskReq.oneofGroups_);
};
goog.inherits(proto.aggregator.TriggerTaskReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.TriggerTaskReq.displayName = 'proto.aggregator.TriggerTaskReq';
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
proto.aggregator.TriggerTaskResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.TriggerTaskResp.repeatedFields_, null);
};
goog.inherits(proto.aggregator.TriggerTaskResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.TriggerTaskResp.displayName = 'proto.aggregator.TriggerTaskResp';
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
proto.aggregator.PageInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.PageInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.PageInfo.displayName = 'proto.aggregator.PageInfo';
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
proto.aggregator.Secret = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.Secret, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.Secret.displayName = 'proto.aggregator.Secret';
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
proto.aggregator.DeleteSecretResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.DeleteSecretResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.DeleteSecretResp.displayName = 'proto.aggregator.DeleteSecretResp';
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
proto.aggregator.GetSignatureFormatReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.GetSignatureFormatReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.GetSignatureFormatReq.displayName = 'proto.aggregator.GetSignatureFormatReq';
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
proto.aggregator.GetSignatureFormatResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.GetSignatureFormatResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.GetSignatureFormatResp.displayName = 'proto.aggregator.GetSignatureFormatResp';
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
proto.aggregator.CreateSecretResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.CreateSecretResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.CreateSecretResp.displayName = 'proto.aggregator.CreateSecretResp';
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
proto.aggregator.UpdateSecretResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.UpdateSecretResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.UpdateSecretResp.displayName = 'proto.aggregator.UpdateSecretResp';
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
proto.aggregator.DeleteTaskResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.DeleteTaskResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.DeleteTaskResp.displayName = 'proto.aggregator.DeleteTaskResp';
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
proto.aggregator.CancelTaskResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.CancelTaskResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.CancelTaskResp.displayName = 'proto.aggregator.CancelTaskResp';
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
proto.aggregator.GetWorkflowCountReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.GetWorkflowCountReq.repeatedFields_, null);
};
goog.inherits(proto.aggregator.GetWorkflowCountReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.GetWorkflowCountReq.displayName = 'proto.aggregator.GetWorkflowCountReq';
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
proto.aggregator.GetWorkflowCountResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.GetWorkflowCountResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.GetWorkflowCountResp.displayName = 'proto.aggregator.GetWorkflowCountResp';
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
proto.aggregator.GetExecutionCountReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.GetExecutionCountReq.repeatedFields_, null);
};
goog.inherits(proto.aggregator.GetExecutionCountReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.GetExecutionCountReq.displayName = 'proto.aggregator.GetExecutionCountReq';
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
proto.aggregator.GetExecutionCountResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.GetExecutionCountResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.GetExecutionCountResp.displayName = 'proto.aggregator.GetExecutionCountResp';
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
proto.aggregator.GetExecutionStatsReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.GetExecutionStatsReq.repeatedFields_, null);
};
goog.inherits(proto.aggregator.GetExecutionStatsReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.GetExecutionStatsReq.displayName = 'proto.aggregator.GetExecutionStatsReq';
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
proto.aggregator.GetExecutionStatsResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.GetExecutionStatsResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.GetExecutionStatsResp.displayName = 'proto.aggregator.GetExecutionStatsResp';
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
proto.aggregator.RunNodeWithInputsReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.RunNodeWithInputsReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.RunNodeWithInputsReq.displayName = 'proto.aggregator.RunNodeWithInputsReq';
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
proto.aggregator.RunNodeWithInputsResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.aggregator.RunNodeWithInputsResp.oneofGroups_);
};
goog.inherits(proto.aggregator.RunNodeWithInputsResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.RunNodeWithInputsResp.displayName = 'proto.aggregator.RunNodeWithInputsResp';
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
proto.aggregator.RunTriggerReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.RunTriggerReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.RunTriggerReq.displayName = 'proto.aggregator.RunTriggerReq';
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
proto.aggregator.RunTriggerResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.aggregator.RunTriggerResp.oneofGroups_);
};
goog.inherits(proto.aggregator.RunTriggerResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.RunTriggerResp.displayName = 'proto.aggregator.RunTriggerResp';
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
proto.aggregator.SimulateTaskReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.SimulateTaskReq.repeatedFields_, null);
};
goog.inherits(proto.aggregator.SimulateTaskReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.SimulateTaskReq.displayName = 'proto.aggregator.SimulateTaskReq';
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
proto.aggregator.EstimateFeesReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.EstimateFeesReq.repeatedFields_, null);
};
goog.inherits(proto.aggregator.EstimateFeesReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.EstimateFeesReq.displayName = 'proto.aggregator.EstimateFeesReq';
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
proto.aggregator.FeeAmount = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.FeeAmount, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.FeeAmount.displayName = 'proto.aggregator.FeeAmount';
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
proto.aggregator.GasFeeBreakdown = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.GasFeeBreakdown.repeatedFields_, null);
};
goog.inherits(proto.aggregator.GasFeeBreakdown, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.GasFeeBreakdown.displayName = 'proto.aggregator.GasFeeBreakdown';
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
proto.aggregator.GasOperationFee = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.GasOperationFee, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.GasOperationFee.displayName = 'proto.aggregator.GasOperationFee';
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
proto.aggregator.SmartWalletCreationFee = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.SmartWalletCreationFee, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.SmartWalletCreationFee.displayName = 'proto.aggregator.SmartWalletCreationFee';
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
proto.aggregator.AutomationFee = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.AutomationFee, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.AutomationFee.displayName = 'proto.aggregator.AutomationFee';
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
proto.aggregator.FeeDiscount = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.FeeDiscount, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.FeeDiscount.displayName = 'proto.aggregator.FeeDiscount';
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
proto.aggregator.EstimateFeesResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.EstimateFeesResp.repeatedFields_, null);
};
goog.inherits(proto.aggregator.EstimateFeesResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.EstimateFeesResp.displayName = 'proto.aggregator.EstimateFeesResp';
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
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.aggregator.EventCondition, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.aggregator.EventCondition.displayName = 'proto.aggregator.EventCondition';
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
proto.aggregator.TokenMetadata.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.TokenMetadata.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.TokenMetadata} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.TokenMetadata.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    symbol: jspb.Message.getFieldWithDefault(msg, 3, ""),
    decimals: jspb.Message.getFieldWithDefault(msg, 4, 0)
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
 * @return {!proto.aggregator.TokenMetadata}
 */
proto.aggregator.TokenMetadata.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.TokenMetadata;
  return proto.aggregator.TokenMetadata.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.TokenMetadata} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.TokenMetadata}
 */
proto.aggregator.TokenMetadata.deserializeBinaryFromReader = function(msg, reader) {
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
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSymbol(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setDecimals(value);
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
proto.aggregator.TokenMetadata.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.TokenMetadata.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.TokenMetadata} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.TokenMetadata.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSymbol();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getDecimals();
  if (f !== 0) {
    writer.writeUint32(
      4,
      f
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.aggregator.TokenMetadata.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.TokenMetadata} returns this
 */
proto.aggregator.TokenMetadata.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.aggregator.TokenMetadata.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.TokenMetadata} returns this
 */
proto.aggregator.TokenMetadata.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string symbol = 3;
 * @return {string}
 */
proto.aggregator.TokenMetadata.prototype.getSymbol = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.TokenMetadata} returns this
 */
proto.aggregator.TokenMetadata.prototype.setSymbol = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional uint32 decimals = 4;
 * @return {number}
 */
proto.aggregator.TokenMetadata.prototype.getDecimals = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.TokenMetadata} returns this
 */
proto.aggregator.TokenMetadata.prototype.setDecimals = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
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
proto.aggregator.GetTokenMetadataReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.GetTokenMetadataReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.GetTokenMetadataReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetTokenMetadataReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: jspb.Message.getFieldWithDefault(msg, 1, "")
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
 * @return {!proto.aggregator.GetTokenMetadataReq}
 */
proto.aggregator.GetTokenMetadataReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.GetTokenMetadataReq;
  return proto.aggregator.GetTokenMetadataReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.GetTokenMetadataReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.GetTokenMetadataReq}
 */
proto.aggregator.GetTokenMetadataReq.deserializeBinaryFromReader = function(msg, reader) {
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
proto.aggregator.GetTokenMetadataReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.GetTokenMetadataReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.GetTokenMetadataReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetTokenMetadataReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.aggregator.GetTokenMetadataReq.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GetTokenMetadataReq} returns this
 */
proto.aggregator.GetTokenMetadataReq.prototype.setAddress = function(value) {
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
proto.aggregator.GetTokenMetadataResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.GetTokenMetadataResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.GetTokenMetadataResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetTokenMetadataResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    token: (f = msg.getToken()) && proto.aggregator.TokenMetadata.toObject(includeInstance, f),
    found: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    source: jspb.Message.getFieldWithDefault(msg, 3, "")
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
 * @return {!proto.aggregator.GetTokenMetadataResp}
 */
proto.aggregator.GetTokenMetadataResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.GetTokenMetadataResp;
  return proto.aggregator.GetTokenMetadataResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.GetTokenMetadataResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.GetTokenMetadataResp}
 */
proto.aggregator.GetTokenMetadataResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.TokenMetadata;
      reader.readMessage(value,proto.aggregator.TokenMetadata.deserializeBinaryFromReader);
      msg.setToken(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setFound(value);
      break;
    case 3:
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
proto.aggregator.GetTokenMetadataResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.GetTokenMetadataResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.GetTokenMetadataResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetTokenMetadataResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getToken();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.TokenMetadata.serializeBinaryToWriter
    );
  }
  f = message.getFound();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getSource();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional TokenMetadata token = 1;
 * @return {?proto.aggregator.TokenMetadata}
 */
proto.aggregator.GetTokenMetadataResp.prototype.getToken = function() {
  return /** @type{?proto.aggregator.TokenMetadata} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.TokenMetadata, 1));
};


/**
 * @param {?proto.aggregator.TokenMetadata|undefined} value
 * @return {!proto.aggregator.GetTokenMetadataResp} returns this
*/
proto.aggregator.GetTokenMetadataResp.prototype.setToken = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.GetTokenMetadataResp} returns this
 */
proto.aggregator.GetTokenMetadataResp.prototype.clearToken = function() {
  return this.setToken(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.GetTokenMetadataResp.prototype.hasToken = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bool found = 2;
 * @return {boolean}
 */
proto.aggregator.GetTokenMetadataResp.prototype.getFound = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.GetTokenMetadataResp} returns this
 */
proto.aggregator.GetTokenMetadataResp.prototype.setFound = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional string source = 3;
 * @return {string}
 */
proto.aggregator.GetTokenMetadataResp.prototype.getSource = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GetTokenMetadataResp} returns this
 */
proto.aggregator.GetTokenMetadataResp.prototype.setSource = function(value) {
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
proto.aggregator.FixedTimeTrigger.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.FixedTimeTrigger.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.FixedTimeTrigger} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.FixedTimeTrigger.toObject = function(includeInstance, msg) {
  var f, obj = {
    config: (f = msg.getConfig()) && proto.aggregator.FixedTimeTrigger.Config.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.FixedTimeTrigger}
 */
proto.aggregator.FixedTimeTrigger.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.FixedTimeTrigger;
  return proto.aggregator.FixedTimeTrigger.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.FixedTimeTrigger} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.FixedTimeTrigger}
 */
proto.aggregator.FixedTimeTrigger.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.FixedTimeTrigger.Config;
      reader.readMessage(value,proto.aggregator.FixedTimeTrigger.Config.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.aggregator.FixedTimeTrigger.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.FixedTimeTrigger.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.FixedTimeTrigger} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.FixedTimeTrigger.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.FixedTimeTrigger.Config.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.FixedTimeTrigger.Config.repeatedFields_ = [1];



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
proto.aggregator.FixedTimeTrigger.Config.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.FixedTimeTrigger.Config.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.FixedTimeTrigger.Config} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.FixedTimeTrigger.Config.toObject = function(includeInstance, msg) {
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
 * @return {!proto.aggregator.FixedTimeTrigger.Config}
 */
proto.aggregator.FixedTimeTrigger.Config.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.FixedTimeTrigger.Config;
  return proto.aggregator.FixedTimeTrigger.Config.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.FixedTimeTrigger.Config} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.FixedTimeTrigger.Config}
 */
proto.aggregator.FixedTimeTrigger.Config.deserializeBinaryFromReader = function(msg, reader) {
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
proto.aggregator.FixedTimeTrigger.Config.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.FixedTimeTrigger.Config.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.FixedTimeTrigger.Config} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.FixedTimeTrigger.Config.serializeBinaryToWriter = function(message, writer) {
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
proto.aggregator.FixedTimeTrigger.Config.prototype.getEpochsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.aggregator.FixedTimeTrigger.Config} returns this
 */
proto.aggregator.FixedTimeTrigger.Config.prototype.setEpochsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.FixedTimeTrigger.Config} returns this
 */
proto.aggregator.FixedTimeTrigger.Config.prototype.addEpochs = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.FixedTimeTrigger.Config} returns this
 */
proto.aggregator.FixedTimeTrigger.Config.prototype.clearEpochsList = function() {
  return this.setEpochsList([]);
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
proto.aggregator.FixedTimeTrigger.Output.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.FixedTimeTrigger.Output.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.FixedTimeTrigger.Output} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.FixedTimeTrigger.Output.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.FixedTimeTrigger.Output}
 */
proto.aggregator.FixedTimeTrigger.Output.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.FixedTimeTrigger.Output;
  return proto.aggregator.FixedTimeTrigger.Output.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.FixedTimeTrigger.Output} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.FixedTimeTrigger.Output}
 */
proto.aggregator.FixedTimeTrigger.Output.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setData(value);
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
proto.aggregator.FixedTimeTrigger.Output.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.FixedTimeTrigger.Output.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.FixedTimeTrigger.Output} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.FixedTimeTrigger.Output.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Value data = 1;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.FixedTimeTrigger.Output.prototype.getData = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 1));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.FixedTimeTrigger.Output} returns this
*/
proto.aggregator.FixedTimeTrigger.Output.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.FixedTimeTrigger.Output} returns this
 */
proto.aggregator.FixedTimeTrigger.Output.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.FixedTimeTrigger.Output.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Config config = 1;
 * @return {?proto.aggregator.FixedTimeTrigger.Config}
 */
proto.aggregator.FixedTimeTrigger.prototype.getConfig = function() {
  return /** @type{?proto.aggregator.FixedTimeTrigger.Config} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FixedTimeTrigger.Config, 1));
};


/**
 * @param {?proto.aggregator.FixedTimeTrigger.Config|undefined} value
 * @return {!proto.aggregator.FixedTimeTrigger} returns this
*/
proto.aggregator.FixedTimeTrigger.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.FixedTimeTrigger} returns this
 */
proto.aggregator.FixedTimeTrigger.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.FixedTimeTrigger.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
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
proto.aggregator.CronTrigger.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.CronTrigger.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.CronTrigger} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CronTrigger.toObject = function(includeInstance, msg) {
  var f, obj = {
    config: (f = msg.getConfig()) && proto.aggregator.CronTrigger.Config.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.CronTrigger}
 */
proto.aggregator.CronTrigger.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.CronTrigger;
  return proto.aggregator.CronTrigger.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.CronTrigger} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.CronTrigger}
 */
proto.aggregator.CronTrigger.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.CronTrigger.Config;
      reader.readMessage(value,proto.aggregator.CronTrigger.Config.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.aggregator.CronTrigger.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.CronTrigger.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.CronTrigger} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CronTrigger.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.CronTrigger.Config.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.CronTrigger.Config.repeatedFields_ = [1];



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
proto.aggregator.CronTrigger.Config.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.CronTrigger.Config.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.CronTrigger.Config} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CronTrigger.Config.toObject = function(includeInstance, msg) {
  var f, obj = {
    schedulesList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
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
 * @return {!proto.aggregator.CronTrigger.Config}
 */
proto.aggregator.CronTrigger.Config.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.CronTrigger.Config;
  return proto.aggregator.CronTrigger.Config.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.CronTrigger.Config} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.CronTrigger.Config}
 */
proto.aggregator.CronTrigger.Config.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addSchedules(value);
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
proto.aggregator.CronTrigger.Config.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.CronTrigger.Config.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.CronTrigger.Config} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CronTrigger.Config.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSchedulesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
};


/**
 * repeated string schedules = 1;
 * @return {!Array<string>}
 */
proto.aggregator.CronTrigger.Config.prototype.getSchedulesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.CronTrigger.Config} returns this
 */
proto.aggregator.CronTrigger.Config.prototype.setSchedulesList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.CronTrigger.Config} returns this
 */
proto.aggregator.CronTrigger.Config.prototype.addSchedules = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.CronTrigger.Config} returns this
 */
proto.aggregator.CronTrigger.Config.prototype.clearSchedulesList = function() {
  return this.setSchedulesList([]);
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
proto.aggregator.CronTrigger.Output.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.CronTrigger.Output.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.CronTrigger.Output} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CronTrigger.Output.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.CronTrigger.Output}
 */
proto.aggregator.CronTrigger.Output.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.CronTrigger.Output;
  return proto.aggregator.CronTrigger.Output.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.CronTrigger.Output} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.CronTrigger.Output}
 */
proto.aggregator.CronTrigger.Output.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setData(value);
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
proto.aggregator.CronTrigger.Output.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.CronTrigger.Output.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.CronTrigger.Output} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CronTrigger.Output.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Value data = 1;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.CronTrigger.Output.prototype.getData = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 1));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.CronTrigger.Output} returns this
*/
proto.aggregator.CronTrigger.Output.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.CronTrigger.Output} returns this
 */
proto.aggregator.CronTrigger.Output.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.CronTrigger.Output.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Config config = 1;
 * @return {?proto.aggregator.CronTrigger.Config}
 */
proto.aggregator.CronTrigger.prototype.getConfig = function() {
  return /** @type{?proto.aggregator.CronTrigger.Config} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.CronTrigger.Config, 1));
};


/**
 * @param {?proto.aggregator.CronTrigger.Config|undefined} value
 * @return {!proto.aggregator.CronTrigger} returns this
*/
proto.aggregator.CronTrigger.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.CronTrigger} returns this
 */
proto.aggregator.CronTrigger.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.CronTrigger.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
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
proto.aggregator.BlockTrigger.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.BlockTrigger.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.BlockTrigger} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BlockTrigger.toObject = function(includeInstance, msg) {
  var f, obj = {
    config: (f = msg.getConfig()) && proto.aggregator.BlockTrigger.Config.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.BlockTrigger}
 */
proto.aggregator.BlockTrigger.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.BlockTrigger;
  return proto.aggregator.BlockTrigger.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.BlockTrigger} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.BlockTrigger}
 */
proto.aggregator.BlockTrigger.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.BlockTrigger.Config;
      reader.readMessage(value,proto.aggregator.BlockTrigger.Config.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.aggregator.BlockTrigger.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.BlockTrigger.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.BlockTrigger} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BlockTrigger.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.BlockTrigger.Config.serializeBinaryToWriter
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
proto.aggregator.BlockTrigger.Config.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.BlockTrigger.Config.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.BlockTrigger.Config} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BlockTrigger.Config.toObject = function(includeInstance, msg) {
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
 * @return {!proto.aggregator.BlockTrigger.Config}
 */
proto.aggregator.BlockTrigger.Config.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.BlockTrigger.Config;
  return proto.aggregator.BlockTrigger.Config.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.BlockTrigger.Config} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.BlockTrigger.Config}
 */
proto.aggregator.BlockTrigger.Config.deserializeBinaryFromReader = function(msg, reader) {
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
proto.aggregator.BlockTrigger.Config.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.BlockTrigger.Config.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.BlockTrigger.Config} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BlockTrigger.Config.serializeBinaryToWriter = function(message, writer) {
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
proto.aggregator.BlockTrigger.Config.prototype.getInterval = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.BlockTrigger.Config} returns this
 */
proto.aggregator.BlockTrigger.Config.prototype.setInterval = function(value) {
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
proto.aggregator.BlockTrigger.Output.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.BlockTrigger.Output.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.BlockTrigger.Output} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BlockTrigger.Output.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.BlockTrigger.Output}
 */
proto.aggregator.BlockTrigger.Output.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.BlockTrigger.Output;
  return proto.aggregator.BlockTrigger.Output.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.BlockTrigger.Output} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.BlockTrigger.Output}
 */
proto.aggregator.BlockTrigger.Output.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setData(value);
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
proto.aggregator.BlockTrigger.Output.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.BlockTrigger.Output.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.BlockTrigger.Output} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BlockTrigger.Output.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Value data = 1;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.BlockTrigger.Output.prototype.getData = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 1));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.BlockTrigger.Output} returns this
*/
proto.aggregator.BlockTrigger.Output.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.BlockTrigger.Output} returns this
 */
proto.aggregator.BlockTrigger.Output.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.BlockTrigger.Output.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Config config = 1;
 * @return {?proto.aggregator.BlockTrigger.Config}
 */
proto.aggregator.BlockTrigger.prototype.getConfig = function() {
  return /** @type{?proto.aggregator.BlockTrigger.Config} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.BlockTrigger.Config, 1));
};


/**
 * @param {?proto.aggregator.BlockTrigger.Config|undefined} value
 * @return {!proto.aggregator.BlockTrigger} returns this
*/
proto.aggregator.BlockTrigger.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.BlockTrigger} returns this
 */
proto.aggregator.BlockTrigger.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.BlockTrigger.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
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
proto.aggregator.EventTrigger.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.EventTrigger.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.EventTrigger} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EventTrigger.toObject = function(includeInstance, msg) {
  var f, obj = {
    config: (f = msg.getConfig()) && proto.aggregator.EventTrigger.Config.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.EventTrigger}
 */
proto.aggregator.EventTrigger.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.EventTrigger;
  return proto.aggregator.EventTrigger.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.EventTrigger} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.EventTrigger}
 */
proto.aggregator.EventTrigger.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.EventTrigger.Config;
      reader.readMessage(value,proto.aggregator.EventTrigger.Config.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.aggregator.EventTrigger.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.EventTrigger.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.EventTrigger} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EventTrigger.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.EventTrigger.Config.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.EventTrigger.Query.repeatedFields_ = [1,2,4,5,6];



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
proto.aggregator.EventTrigger.Query.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.EventTrigger.Query.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.EventTrigger.Query} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EventTrigger.Query.toObject = function(includeInstance, msg) {
  var f, obj = {
    addressesList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    topicsList: jspb.Message.toObjectList(msg.getTopicsList(),
    proto.aggregator.EventTrigger.Topics.toObject, includeInstance),
    maxEventsPerBlock: jspb.Message.getFieldWithDefault(msg, 3, 0),
    contractAbiList: jspb.Message.toObjectList(msg.getContractAbiList(),
    google_protobuf_struct_pb.Value.toObject, includeInstance),
    conditionsList: jspb.Message.toObjectList(msg.getConditionsList(),
    proto.aggregator.EventCondition.toObject, includeInstance),
    methodCallsList: jspb.Message.toObjectList(msg.getMethodCallsList(),
    proto.aggregator.EventTrigger.MethodCall.toObject, includeInstance)
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
 * @return {!proto.aggregator.EventTrigger.Query}
 */
proto.aggregator.EventTrigger.Query.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.EventTrigger.Query;
  return proto.aggregator.EventTrigger.Query.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.EventTrigger.Query} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.EventTrigger.Query}
 */
proto.aggregator.EventTrigger.Query.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addAddresses(value);
      break;
    case 2:
      var value = new proto.aggregator.EventTrigger.Topics;
      reader.readMessage(value,proto.aggregator.EventTrigger.Topics.deserializeBinaryFromReader);
      msg.addTopics(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setMaxEventsPerBlock(value);
      break;
    case 4:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.addContractAbi(value);
      break;
    case 5:
      var value = new proto.aggregator.EventCondition;
      reader.readMessage(value,proto.aggregator.EventCondition.deserializeBinaryFromReader);
      msg.addConditions(value);
      break;
    case 6:
      var value = new proto.aggregator.EventTrigger.MethodCall;
      reader.readMessage(value,proto.aggregator.EventTrigger.MethodCall.deserializeBinaryFromReader);
      msg.addMethodCalls(value);
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
proto.aggregator.EventTrigger.Query.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.EventTrigger.Query.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.EventTrigger.Query} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EventTrigger.Query.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddressesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
  f = message.getTopicsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.aggregator.EventTrigger.Topics.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeUint32(
      3,
      f
    );
  }
  f = message.getContractAbiList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
  f = message.getConditionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.aggregator.EventCondition.serializeBinaryToWriter
    );
  }
  f = message.getMethodCallsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.aggregator.EventTrigger.MethodCall.serializeBinaryToWriter
    );
  }
};


/**
 * repeated string addresses = 1;
 * @return {!Array<string>}
 */
proto.aggregator.EventTrigger.Query.prototype.getAddressesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.EventTrigger.Query} returns this
 */
proto.aggregator.EventTrigger.Query.prototype.setAddressesList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.EventTrigger.Query} returns this
 */
proto.aggregator.EventTrigger.Query.prototype.addAddresses = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.EventTrigger.Query} returns this
 */
proto.aggregator.EventTrigger.Query.prototype.clearAddressesList = function() {
  return this.setAddressesList([]);
};


/**
 * repeated Topics topics = 2;
 * @return {!Array<!proto.aggregator.EventTrigger.Topics>}
 */
proto.aggregator.EventTrigger.Query.prototype.getTopicsList = function() {
  return /** @type{!Array<!proto.aggregator.EventTrigger.Topics>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.EventTrigger.Topics, 2));
};


/**
 * @param {!Array<!proto.aggregator.EventTrigger.Topics>} value
 * @return {!proto.aggregator.EventTrigger.Query} returns this
*/
proto.aggregator.EventTrigger.Query.prototype.setTopicsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.aggregator.EventTrigger.Topics=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.EventTrigger.Topics}
 */
proto.aggregator.EventTrigger.Query.prototype.addTopics = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.aggregator.EventTrigger.Topics, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.EventTrigger.Query} returns this
 */
proto.aggregator.EventTrigger.Query.prototype.clearTopicsList = function() {
  return this.setTopicsList([]);
};


/**
 * optional uint32 max_events_per_block = 3;
 * @return {number}
 */
proto.aggregator.EventTrigger.Query.prototype.getMaxEventsPerBlock = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.EventTrigger.Query} returns this
 */
proto.aggregator.EventTrigger.Query.prototype.setMaxEventsPerBlock = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.aggregator.EventTrigger.Query} returns this
 */
proto.aggregator.EventTrigger.Query.prototype.clearMaxEventsPerBlock = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.EventTrigger.Query.prototype.hasMaxEventsPerBlock = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * repeated google.protobuf.Value contract_abi = 4;
 * @return {!Array<!proto.google.protobuf.Value>}
 */
proto.aggregator.EventTrigger.Query.prototype.getContractAbiList = function() {
  return /** @type{!Array<!proto.google.protobuf.Value>} */ (
    jspb.Message.getRepeatedWrapperField(this, google_protobuf_struct_pb.Value, 4));
};


/**
 * @param {!Array<!proto.google.protobuf.Value>} value
 * @return {!proto.aggregator.EventTrigger.Query} returns this
*/
proto.aggregator.EventTrigger.Query.prototype.setContractAbiList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.google.protobuf.Value=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.Value}
 */
proto.aggregator.EventTrigger.Query.prototype.addContractAbi = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.google.protobuf.Value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.EventTrigger.Query} returns this
 */
proto.aggregator.EventTrigger.Query.prototype.clearContractAbiList = function() {
  return this.setContractAbiList([]);
};


/**
 * repeated EventCondition conditions = 5;
 * @return {!Array<!proto.aggregator.EventCondition>}
 */
proto.aggregator.EventTrigger.Query.prototype.getConditionsList = function() {
  return /** @type{!Array<!proto.aggregator.EventCondition>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.EventCondition, 5));
};


/**
 * @param {!Array<!proto.aggregator.EventCondition>} value
 * @return {!proto.aggregator.EventTrigger.Query} returns this
*/
proto.aggregator.EventTrigger.Query.prototype.setConditionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.aggregator.EventCondition=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.EventCondition}
 */
proto.aggregator.EventTrigger.Query.prototype.addConditions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.aggregator.EventCondition, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.EventTrigger.Query} returns this
 */
proto.aggregator.EventTrigger.Query.prototype.clearConditionsList = function() {
  return this.setConditionsList([]);
};


/**
 * repeated MethodCall method_calls = 6;
 * @return {!Array<!proto.aggregator.EventTrigger.MethodCall>}
 */
proto.aggregator.EventTrigger.Query.prototype.getMethodCallsList = function() {
  return /** @type{!Array<!proto.aggregator.EventTrigger.MethodCall>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.EventTrigger.MethodCall, 6));
};


/**
 * @param {!Array<!proto.aggregator.EventTrigger.MethodCall>} value
 * @return {!proto.aggregator.EventTrigger.Query} returns this
*/
proto.aggregator.EventTrigger.Query.prototype.setMethodCallsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.aggregator.EventTrigger.MethodCall=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.EventTrigger.MethodCall}
 */
proto.aggregator.EventTrigger.Query.prototype.addMethodCalls = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.aggregator.EventTrigger.MethodCall, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.EventTrigger.Query} returns this
 */
proto.aggregator.EventTrigger.Query.prototype.clearMethodCallsList = function() {
  return this.setMethodCallsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.EventTrigger.MethodCall.repeatedFields_ = [3,4];



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
proto.aggregator.EventTrigger.MethodCall.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.EventTrigger.MethodCall.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.EventTrigger.MethodCall} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EventTrigger.MethodCall.toObject = function(includeInstance, msg) {
  var f, obj = {
    methodName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    callData: jspb.Message.getFieldWithDefault(msg, 2, ""),
    applyToFieldsList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f,
    methodParamsList: (f = jspb.Message.getRepeatedField(msg, 4)) == null ? undefined : f
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
 * @return {!proto.aggregator.EventTrigger.MethodCall}
 */
proto.aggregator.EventTrigger.MethodCall.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.EventTrigger.MethodCall;
  return proto.aggregator.EventTrigger.MethodCall.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.EventTrigger.MethodCall} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.EventTrigger.MethodCall}
 */
proto.aggregator.EventTrigger.MethodCall.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setMethodName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCallData(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.addApplyToFields(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.addMethodParams(value);
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
proto.aggregator.EventTrigger.MethodCall.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.EventTrigger.MethodCall.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.EventTrigger.MethodCall} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EventTrigger.MethodCall.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMethodName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getApplyToFieldsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      3,
      f
    );
  }
  f = message.getMethodParamsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      4,
      f
    );
  }
};


/**
 * optional string method_name = 1;
 * @return {string}
 */
proto.aggregator.EventTrigger.MethodCall.prototype.getMethodName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.EventTrigger.MethodCall} returns this
 */
proto.aggregator.EventTrigger.MethodCall.prototype.setMethodName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string call_data = 2;
 * @return {string}
 */
proto.aggregator.EventTrigger.MethodCall.prototype.getCallData = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.EventTrigger.MethodCall} returns this
 */
proto.aggregator.EventTrigger.MethodCall.prototype.setCallData = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.aggregator.EventTrigger.MethodCall} returns this
 */
proto.aggregator.EventTrigger.MethodCall.prototype.clearCallData = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.EventTrigger.MethodCall.prototype.hasCallData = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * repeated string apply_to_fields = 3;
 * @return {!Array<string>}
 */
proto.aggregator.EventTrigger.MethodCall.prototype.getApplyToFieldsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.EventTrigger.MethodCall} returns this
 */
proto.aggregator.EventTrigger.MethodCall.prototype.setApplyToFieldsList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.EventTrigger.MethodCall} returns this
 */
proto.aggregator.EventTrigger.MethodCall.prototype.addApplyToFields = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.EventTrigger.MethodCall} returns this
 */
proto.aggregator.EventTrigger.MethodCall.prototype.clearApplyToFieldsList = function() {
  return this.setApplyToFieldsList([]);
};


/**
 * repeated string method_params = 4;
 * @return {!Array<string>}
 */
proto.aggregator.EventTrigger.MethodCall.prototype.getMethodParamsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 4));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.EventTrigger.MethodCall} returns this
 */
proto.aggregator.EventTrigger.MethodCall.prototype.setMethodParamsList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.EventTrigger.MethodCall} returns this
 */
proto.aggregator.EventTrigger.MethodCall.prototype.addMethodParams = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.EventTrigger.MethodCall} returns this
 */
proto.aggregator.EventTrigger.MethodCall.prototype.clearMethodParamsList = function() {
  return this.setMethodParamsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.EventTrigger.Topics.repeatedFields_ = [1];



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
proto.aggregator.EventTrigger.Topics.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.EventTrigger.Topics.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.EventTrigger.Topics} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EventTrigger.Topics.toObject = function(includeInstance, msg) {
  var f, obj = {
    valuesList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
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
 * @return {!proto.aggregator.EventTrigger.Topics}
 */
proto.aggregator.EventTrigger.Topics.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.EventTrigger.Topics;
  return proto.aggregator.EventTrigger.Topics.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.EventTrigger.Topics} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.EventTrigger.Topics}
 */
proto.aggregator.EventTrigger.Topics.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addValues(value);
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
proto.aggregator.EventTrigger.Topics.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.EventTrigger.Topics.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.EventTrigger.Topics} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EventTrigger.Topics.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getValuesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
};


/**
 * repeated string values = 1;
 * @return {!Array<string>}
 */
proto.aggregator.EventTrigger.Topics.prototype.getValuesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.EventTrigger.Topics} returns this
 */
proto.aggregator.EventTrigger.Topics.prototype.setValuesList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.EventTrigger.Topics} returns this
 */
proto.aggregator.EventTrigger.Topics.prototype.addValues = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.EventTrigger.Topics} returns this
 */
proto.aggregator.EventTrigger.Topics.prototype.clearValuesList = function() {
  return this.setValuesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.EventTrigger.Config.repeatedFields_ = [1];



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
proto.aggregator.EventTrigger.Config.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.EventTrigger.Config.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.EventTrigger.Config} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EventTrigger.Config.toObject = function(includeInstance, msg) {
  var f, obj = {
    queriesList: jspb.Message.toObjectList(msg.getQueriesList(),
    proto.aggregator.EventTrigger.Query.toObject, includeInstance)
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
 * @return {!proto.aggregator.EventTrigger.Config}
 */
proto.aggregator.EventTrigger.Config.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.EventTrigger.Config;
  return proto.aggregator.EventTrigger.Config.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.EventTrigger.Config} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.EventTrigger.Config}
 */
proto.aggregator.EventTrigger.Config.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.EventTrigger.Query;
      reader.readMessage(value,proto.aggregator.EventTrigger.Query.deserializeBinaryFromReader);
      msg.addQueries(value);
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
proto.aggregator.EventTrigger.Config.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.EventTrigger.Config.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.EventTrigger.Config} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EventTrigger.Config.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getQueriesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.aggregator.EventTrigger.Query.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Query queries = 1;
 * @return {!Array<!proto.aggregator.EventTrigger.Query>}
 */
proto.aggregator.EventTrigger.Config.prototype.getQueriesList = function() {
  return /** @type{!Array<!proto.aggregator.EventTrigger.Query>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.EventTrigger.Query, 1));
};


/**
 * @param {!Array<!proto.aggregator.EventTrigger.Query>} value
 * @return {!proto.aggregator.EventTrigger.Config} returns this
*/
proto.aggregator.EventTrigger.Config.prototype.setQueriesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.aggregator.EventTrigger.Query=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.EventTrigger.Query}
 */
proto.aggregator.EventTrigger.Config.prototype.addQueries = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.aggregator.EventTrigger.Query, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.EventTrigger.Config} returns this
 */
proto.aggregator.EventTrigger.Config.prototype.clearQueriesList = function() {
  return this.setQueriesList([]);
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
proto.aggregator.EventTrigger.Output.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.EventTrigger.Output.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.EventTrigger.Output} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EventTrigger.Output.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.EventTrigger.Output}
 */
proto.aggregator.EventTrigger.Output.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.EventTrigger.Output;
  return proto.aggregator.EventTrigger.Output.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.EventTrigger.Output} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.EventTrigger.Output}
 */
proto.aggregator.EventTrigger.Output.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setData(value);
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
proto.aggregator.EventTrigger.Output.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.EventTrigger.Output.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.EventTrigger.Output} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EventTrigger.Output.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Value data = 1;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.EventTrigger.Output.prototype.getData = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 1));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.EventTrigger.Output} returns this
*/
proto.aggregator.EventTrigger.Output.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.EventTrigger.Output} returns this
 */
proto.aggregator.EventTrigger.Output.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.EventTrigger.Output.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Config config = 1;
 * @return {?proto.aggregator.EventTrigger.Config}
 */
proto.aggregator.EventTrigger.prototype.getConfig = function() {
  return /** @type{?proto.aggregator.EventTrigger.Config} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.EventTrigger.Config, 1));
};


/**
 * @param {?proto.aggregator.EventTrigger.Config|undefined} value
 * @return {!proto.aggregator.EventTrigger} returns this
*/
proto.aggregator.EventTrigger.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.EventTrigger} returns this
 */
proto.aggregator.EventTrigger.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.EventTrigger.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
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
proto.aggregator.ManualTrigger.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ManualTrigger.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ManualTrigger} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ManualTrigger.toObject = function(includeInstance, msg) {
  var f, obj = {
    config: (f = msg.getConfig()) && proto.aggregator.ManualTrigger.Config.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.ManualTrigger}
 */
proto.aggregator.ManualTrigger.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ManualTrigger;
  return proto.aggregator.ManualTrigger.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ManualTrigger} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ManualTrigger}
 */
proto.aggregator.ManualTrigger.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.ManualTrigger.Config;
      reader.readMessage(value,proto.aggregator.ManualTrigger.Config.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.aggregator.ManualTrigger.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ManualTrigger.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ManualTrigger} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ManualTrigger.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.ManualTrigger.Config.serializeBinaryToWriter
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
proto.aggregator.ManualTrigger.Config.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ManualTrigger.Config.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ManualTrigger.Config} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ManualTrigger.Config.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f),
    headersMap: (f = msg.getHeadersMap()) ? f.toObject(includeInstance, undefined) : [],
    pathparamsMap: (f = msg.getPathparamsMap()) ? f.toObject(includeInstance, undefined) : [],
    lang: jspb.Message.getFieldWithDefault(msg, 4, 0)
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
 * @return {!proto.aggregator.ManualTrigger.Config}
 */
proto.aggregator.ManualTrigger.Config.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ManualTrigger.Config;
  return proto.aggregator.ManualTrigger.Config.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ManualTrigger.Config} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ManualTrigger.Config}
 */
proto.aggregator.ManualTrigger.Config.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = msg.getHeadersMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    case 3:
      var value = msg.getPathparamsMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    case 4:
      var value = /** @type {!proto.aggregator.Lang} */ (reader.readEnum());
      msg.setLang(value);
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
proto.aggregator.ManualTrigger.Config.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ManualTrigger.Config.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ManualTrigger.Config} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ManualTrigger.Config.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
  f = message.getHeadersMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(2, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
  f = message.getPathparamsMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(3, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
  f = message.getLang();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
};


/**
 * optional google.protobuf.Value data = 1;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.ManualTrigger.Config.prototype.getData = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 1));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.ManualTrigger.Config} returns this
*/
proto.aggregator.ManualTrigger.Config.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.ManualTrigger.Config} returns this
 */
proto.aggregator.ManualTrigger.Config.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ManualTrigger.Config.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * map<string, string> headers = 2;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.aggregator.ManualTrigger.Config.prototype.getHeadersMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 2, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.aggregator.ManualTrigger.Config} returns this
 */
proto.aggregator.ManualTrigger.Config.prototype.clearHeadersMap = function() {
  this.getHeadersMap().clear();
  return this;};


/**
 * map<string, string> pathParams = 3;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.aggregator.ManualTrigger.Config.prototype.getPathparamsMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 3, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.aggregator.ManualTrigger.Config} returns this
 */
proto.aggregator.ManualTrigger.Config.prototype.clearPathparamsMap = function() {
  this.getPathparamsMap().clear();
  return this;};


/**
 * optional Lang lang = 4;
 * @return {!proto.aggregator.Lang}
 */
proto.aggregator.ManualTrigger.Config.prototype.getLang = function() {
  return /** @type {!proto.aggregator.Lang} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.aggregator.Lang} value
 * @return {!proto.aggregator.ManualTrigger.Config} returns this
 */
proto.aggregator.ManualTrigger.Config.prototype.setLang = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
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
proto.aggregator.ManualTrigger.Output.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ManualTrigger.Output.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ManualTrigger.Output} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ManualTrigger.Output.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.ManualTrigger.Output}
 */
proto.aggregator.ManualTrigger.Output.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ManualTrigger.Output;
  return proto.aggregator.ManualTrigger.Output.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ManualTrigger.Output} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ManualTrigger.Output}
 */
proto.aggregator.ManualTrigger.Output.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setData(value);
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
proto.aggregator.ManualTrigger.Output.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ManualTrigger.Output.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ManualTrigger.Output} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ManualTrigger.Output.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Value data = 1;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.ManualTrigger.Output.prototype.getData = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 1));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.ManualTrigger.Output} returns this
*/
proto.aggregator.ManualTrigger.Output.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.ManualTrigger.Output} returns this
 */
proto.aggregator.ManualTrigger.Output.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ManualTrigger.Output.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Config config = 1;
 * @return {?proto.aggregator.ManualTrigger.Config}
 */
proto.aggregator.ManualTrigger.prototype.getConfig = function() {
  return /** @type{?proto.aggregator.ManualTrigger.Config} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ManualTrigger.Config, 1));
};


/**
 * @param {?proto.aggregator.ManualTrigger.Config|undefined} value
 * @return {!proto.aggregator.ManualTrigger} returns this
*/
proto.aggregator.ManualTrigger.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.ManualTrigger} returns this
 */
proto.aggregator.ManualTrigger.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ManualTrigger.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
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
    type: jspb.Message.getFieldWithDefault(msg, 8, 0),
    manual: (f = msg.getManual()) && proto.aggregator.ManualTrigger.toObject(includeInstance, f),
    fixedTime: (f = msg.getFixedTime()) && proto.aggregator.FixedTimeTrigger.toObject(includeInstance, f),
    cron: (f = msg.getCron()) && proto.aggregator.CronTrigger.toObject(includeInstance, f),
    block: (f = msg.getBlock()) && proto.aggregator.BlockTrigger.toObject(includeInstance, f),
    event: (f = msg.getEvent()) && proto.aggregator.EventTrigger.toObject(includeInstance, f),
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
    case 8:
      var value = /** @type {!proto.aggregator.TriggerType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = new proto.aggregator.ManualTrigger;
      reader.readMessage(value,proto.aggregator.ManualTrigger.deserializeBinaryFromReader);
      msg.setManual(value);
      break;
    case 3:
      var value = new proto.aggregator.FixedTimeTrigger;
      reader.readMessage(value,proto.aggregator.FixedTimeTrigger.deserializeBinaryFromReader);
      msg.setFixedTime(value);
      break;
    case 4:
      var value = new proto.aggregator.CronTrigger;
      reader.readMessage(value,proto.aggregator.CronTrigger.deserializeBinaryFromReader);
      msg.setCron(value);
      break;
    case 5:
      var value = new proto.aggregator.BlockTrigger;
      reader.readMessage(value,proto.aggregator.BlockTrigger.deserializeBinaryFromReader);
      msg.setBlock(value);
      break;
    case 6:
      var value = new proto.aggregator.EventTrigger;
      reader.readMessage(value,proto.aggregator.EventTrigger.deserializeBinaryFromReader);
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
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      8,
      f
    );
  }
  f = message.getManual();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.aggregator.ManualTrigger.serializeBinaryToWriter
    );
  }
  f = message.getFixedTime();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.aggregator.FixedTimeTrigger.serializeBinaryToWriter
    );
  }
  f = message.getCron();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.aggregator.CronTrigger.serializeBinaryToWriter
    );
  }
  f = message.getBlock();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.aggregator.BlockTrigger.serializeBinaryToWriter
    );
  }
  f = message.getEvent();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.aggregator.EventTrigger.serializeBinaryToWriter
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
 * optional TriggerType type = 8;
 * @return {!proto.aggregator.TriggerType}
 */
proto.aggregator.TaskTrigger.prototype.getType = function() {
  return /** @type {!proto.aggregator.TriggerType} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {!proto.aggregator.TriggerType} value
 * @return {!proto.aggregator.TaskTrigger} returns this
 */
proto.aggregator.TaskTrigger.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 8, value);
};


/**
 * optional ManualTrigger manual = 2;
 * @return {?proto.aggregator.ManualTrigger}
 */
proto.aggregator.TaskTrigger.prototype.getManual = function() {
  return /** @type{?proto.aggregator.ManualTrigger} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ManualTrigger, 2));
};


/**
 * @param {?proto.aggregator.ManualTrigger|undefined} value
 * @return {!proto.aggregator.TaskTrigger} returns this
*/
proto.aggregator.TaskTrigger.prototype.setManual = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.aggregator.TaskTrigger.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TaskTrigger} returns this
 */
proto.aggregator.TaskTrigger.prototype.clearManual = function() {
  return this.setManual(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TaskTrigger.prototype.hasManual = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional FixedTimeTrigger fixed_time = 3;
 * @return {?proto.aggregator.FixedTimeTrigger}
 */
proto.aggregator.TaskTrigger.prototype.getFixedTime = function() {
  return /** @type{?proto.aggregator.FixedTimeTrigger} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FixedTimeTrigger, 3));
};


/**
 * @param {?proto.aggregator.FixedTimeTrigger|undefined} value
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
 * optional CronTrigger cron = 4;
 * @return {?proto.aggregator.CronTrigger}
 */
proto.aggregator.TaskTrigger.prototype.getCron = function() {
  return /** @type{?proto.aggregator.CronTrigger} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.CronTrigger, 4));
};


/**
 * @param {?proto.aggregator.CronTrigger|undefined} value
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
 * optional BlockTrigger block = 5;
 * @return {?proto.aggregator.BlockTrigger}
 */
proto.aggregator.TaskTrigger.prototype.getBlock = function() {
  return /** @type{?proto.aggregator.BlockTrigger} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.BlockTrigger, 5));
};


/**
 * @param {?proto.aggregator.BlockTrigger|undefined} value
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
 * optional EventTrigger event = 6;
 * @return {?proto.aggregator.EventTrigger}
 */
proto.aggregator.TaskTrigger.prototype.getEvent = function() {
  return /** @type{?proto.aggregator.EventTrigger} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.EventTrigger, 6));
};


/**
 * @param {?proto.aggregator.EventTrigger|undefined} value
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
    config: (f = msg.getConfig()) && proto.aggregator.ETHTransferNode.Config.toObject(includeInstance, f)
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
      var value = new proto.aggregator.ETHTransferNode.Config;
      reader.readMessage(value,proto.aggregator.ETHTransferNode.Config.deserializeBinaryFromReader);
      msg.setConfig(value);
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
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.ETHTransferNode.Config.serializeBinaryToWriter
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
proto.aggregator.ETHTransferNode.Config.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ETHTransferNode.Config.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ETHTransferNode.Config} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ETHTransferNode.Config.toObject = function(includeInstance, msg) {
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
 * @return {!proto.aggregator.ETHTransferNode.Config}
 */
proto.aggregator.ETHTransferNode.Config.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ETHTransferNode.Config;
  return proto.aggregator.ETHTransferNode.Config.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ETHTransferNode.Config} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ETHTransferNode.Config}
 */
proto.aggregator.ETHTransferNode.Config.deserializeBinaryFromReader = function(msg, reader) {
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
proto.aggregator.ETHTransferNode.Config.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ETHTransferNode.Config.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ETHTransferNode.Config} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ETHTransferNode.Config.serializeBinaryToWriter = function(message, writer) {
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
proto.aggregator.ETHTransferNode.Config.prototype.getDestination = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ETHTransferNode.Config} returns this
 */
proto.aggregator.ETHTransferNode.Config.prototype.setDestination = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string amount = 2;
 * @return {string}
 */
proto.aggregator.ETHTransferNode.Config.prototype.getAmount = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ETHTransferNode.Config} returns this
 */
proto.aggregator.ETHTransferNode.Config.prototype.setAmount = function(value) {
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
proto.aggregator.ETHTransferNode.Output.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ETHTransferNode.Output.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ETHTransferNode.Output} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ETHTransferNode.Output.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.ETHTransferNode.Output}
 */
proto.aggregator.ETHTransferNode.Output.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ETHTransferNode.Output;
  return proto.aggregator.ETHTransferNode.Output.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ETHTransferNode.Output} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ETHTransferNode.Output}
 */
proto.aggregator.ETHTransferNode.Output.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setData(value);
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
proto.aggregator.ETHTransferNode.Output.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ETHTransferNode.Output.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ETHTransferNode.Output} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ETHTransferNode.Output.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Value data = 1;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.ETHTransferNode.Output.prototype.getData = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 1));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.ETHTransferNode.Output} returns this
*/
proto.aggregator.ETHTransferNode.Output.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.ETHTransferNode.Output} returns this
 */
proto.aggregator.ETHTransferNode.Output.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ETHTransferNode.Output.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Config config = 1;
 * @return {?proto.aggregator.ETHTransferNode.Config}
 */
proto.aggregator.ETHTransferNode.prototype.getConfig = function() {
  return /** @type{?proto.aggregator.ETHTransferNode.Config} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ETHTransferNode.Config, 1));
};


/**
 * @param {?proto.aggregator.ETHTransferNode.Config|undefined} value
 * @return {!proto.aggregator.ETHTransferNode} returns this
*/
proto.aggregator.ETHTransferNode.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.ETHTransferNode} returns this
 */
proto.aggregator.ETHTransferNode.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ETHTransferNode.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
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
    config: (f = msg.getConfig()) && proto.aggregator.ContractWriteNode.Config.toObject(includeInstance, f)
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
      var value = new proto.aggregator.ContractWriteNode.Config;
      reader.readMessage(value,proto.aggregator.ContractWriteNode.Config.deserializeBinaryFromReader);
      msg.setConfig(value);
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
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.ContractWriteNode.Config.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.ContractWriteNode.Config.repeatedFields_ = [3,4];



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
proto.aggregator.ContractWriteNode.Config.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ContractWriteNode.Config.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ContractWriteNode.Config} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractWriteNode.Config.toObject = function(includeInstance, msg) {
  var f, obj = {
    contractAddress: jspb.Message.getFieldWithDefault(msg, 1, ""),
    callData: jspb.Message.getFieldWithDefault(msg, 2, ""),
    contractAbiList: jspb.Message.toObjectList(msg.getContractAbiList(),
    google_protobuf_struct_pb.Value.toObject, includeInstance),
    methodCallsList: jspb.Message.toObjectList(msg.getMethodCallsList(),
    proto.aggregator.ContractWriteNode.MethodCall.toObject, includeInstance)
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
 * @return {!proto.aggregator.ContractWriteNode.Config}
 */
proto.aggregator.ContractWriteNode.Config.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ContractWriteNode.Config;
  return proto.aggregator.ContractWriteNode.Config.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ContractWriteNode.Config} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ContractWriteNode.Config}
 */
proto.aggregator.ContractWriteNode.Config.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.addContractAbi(value);
      break;
    case 4:
      var value = new proto.aggregator.ContractWriteNode.MethodCall;
      reader.readMessage(value,proto.aggregator.ContractWriteNode.MethodCall.deserializeBinaryFromReader);
      msg.addMethodCalls(value);
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
proto.aggregator.ContractWriteNode.Config.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ContractWriteNode.Config.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ContractWriteNode.Config} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractWriteNode.Config.serializeBinaryToWriter = function(message, writer) {
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
  f = message.getContractAbiList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
  f = message.getMethodCallsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.aggregator.ContractWriteNode.MethodCall.serializeBinaryToWriter
    );
  }
};


/**
 * optional string contract_address = 1;
 * @return {string}
 */
proto.aggregator.ContractWriteNode.Config.prototype.getContractAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractWriteNode.Config} returns this
 */
proto.aggregator.ContractWriteNode.Config.prototype.setContractAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string call_data = 2;
 * @return {string}
 */
proto.aggregator.ContractWriteNode.Config.prototype.getCallData = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractWriteNode.Config} returns this
 */
proto.aggregator.ContractWriteNode.Config.prototype.setCallData = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated google.protobuf.Value contract_abi = 3;
 * @return {!Array<!proto.google.protobuf.Value>}
 */
proto.aggregator.ContractWriteNode.Config.prototype.getContractAbiList = function() {
  return /** @type{!Array<!proto.google.protobuf.Value>} */ (
    jspb.Message.getRepeatedWrapperField(this, google_protobuf_struct_pb.Value, 3));
};


/**
 * @param {!Array<!proto.google.protobuf.Value>} value
 * @return {!proto.aggregator.ContractWriteNode.Config} returns this
*/
proto.aggregator.ContractWriteNode.Config.prototype.setContractAbiList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.google.protobuf.Value=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.Value}
 */
proto.aggregator.ContractWriteNode.Config.prototype.addContractAbi = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.google.protobuf.Value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.ContractWriteNode.Config} returns this
 */
proto.aggregator.ContractWriteNode.Config.prototype.clearContractAbiList = function() {
  return this.setContractAbiList([]);
};


/**
 * repeated MethodCall method_calls = 4;
 * @return {!Array<!proto.aggregator.ContractWriteNode.MethodCall>}
 */
proto.aggregator.ContractWriteNode.Config.prototype.getMethodCallsList = function() {
  return /** @type{!Array<!proto.aggregator.ContractWriteNode.MethodCall>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.ContractWriteNode.MethodCall, 4));
};


/**
 * @param {!Array<!proto.aggregator.ContractWriteNode.MethodCall>} value
 * @return {!proto.aggregator.ContractWriteNode.Config} returns this
*/
proto.aggregator.ContractWriteNode.Config.prototype.setMethodCallsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.aggregator.ContractWriteNode.MethodCall=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.ContractWriteNode.MethodCall}
 */
proto.aggregator.ContractWriteNode.Config.prototype.addMethodCalls = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.aggregator.ContractWriteNode.MethodCall, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.ContractWriteNode.Config} returns this
 */
proto.aggregator.ContractWriteNode.Config.prototype.clearMethodCallsList = function() {
  return this.setMethodCallsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.ContractWriteNode.MethodCall.repeatedFields_ = [3,4];



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
proto.aggregator.ContractWriteNode.MethodCall.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ContractWriteNode.MethodCall.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ContractWriteNode.MethodCall} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractWriteNode.MethodCall.toObject = function(includeInstance, msg) {
  var f, obj = {
    callData: jspb.Message.getFieldWithDefault(msg, 1, ""),
    methodName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    applyToFieldsList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f,
    methodParamsList: (f = jspb.Message.getRepeatedField(msg, 4)) == null ? undefined : f
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
 * @return {!proto.aggregator.ContractWriteNode.MethodCall}
 */
proto.aggregator.ContractWriteNode.MethodCall.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ContractWriteNode.MethodCall;
  return proto.aggregator.ContractWriteNode.MethodCall.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ContractWriteNode.MethodCall} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ContractWriteNode.MethodCall}
 */
proto.aggregator.ContractWriteNode.MethodCall.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setCallData(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMethodName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.addApplyToFields(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.addMethodParams(value);
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
proto.aggregator.ContractWriteNode.MethodCall.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ContractWriteNode.MethodCall.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ContractWriteNode.MethodCall} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractWriteNode.MethodCall.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getMethodName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getApplyToFieldsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      3,
      f
    );
  }
  f = message.getMethodParamsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      4,
      f
    );
  }
};


/**
 * optional string call_data = 1;
 * @return {string}
 */
proto.aggregator.ContractWriteNode.MethodCall.prototype.getCallData = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractWriteNode.MethodCall} returns this
 */
proto.aggregator.ContractWriteNode.MethodCall.prototype.setCallData = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.aggregator.ContractWriteNode.MethodCall} returns this
 */
proto.aggregator.ContractWriteNode.MethodCall.prototype.clearCallData = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ContractWriteNode.MethodCall.prototype.hasCallData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string method_name = 2;
 * @return {string}
 */
proto.aggregator.ContractWriteNode.MethodCall.prototype.getMethodName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractWriteNode.MethodCall} returns this
 */
proto.aggregator.ContractWriteNode.MethodCall.prototype.setMethodName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated string apply_to_fields = 3;
 * @return {!Array<string>}
 */
proto.aggregator.ContractWriteNode.MethodCall.prototype.getApplyToFieldsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.ContractWriteNode.MethodCall} returns this
 */
proto.aggregator.ContractWriteNode.MethodCall.prototype.setApplyToFieldsList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.ContractWriteNode.MethodCall} returns this
 */
proto.aggregator.ContractWriteNode.MethodCall.prototype.addApplyToFields = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.ContractWriteNode.MethodCall} returns this
 */
proto.aggregator.ContractWriteNode.MethodCall.prototype.clearApplyToFieldsList = function() {
  return this.setApplyToFieldsList([]);
};


/**
 * repeated string method_params = 4;
 * @return {!Array<string>}
 */
proto.aggregator.ContractWriteNode.MethodCall.prototype.getMethodParamsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 4));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.ContractWriteNode.MethodCall} returns this
 */
proto.aggregator.ContractWriteNode.MethodCall.prototype.setMethodParamsList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.ContractWriteNode.MethodCall} returns this
 */
proto.aggregator.ContractWriteNode.MethodCall.prototype.addMethodParams = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.ContractWriteNode.MethodCall} returns this
 */
proto.aggregator.ContractWriteNode.MethodCall.prototype.clearMethodParamsList = function() {
  return this.setMethodParamsList([]);
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
proto.aggregator.ContractWriteNode.Output.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ContractWriteNode.Output.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ContractWriteNode.Output} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractWriteNode.Output.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.ContractWriteNode.Output}
 */
proto.aggregator.ContractWriteNode.Output.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ContractWriteNode.Output;
  return proto.aggregator.ContractWriteNode.Output.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ContractWriteNode.Output} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ContractWriteNode.Output}
 */
proto.aggregator.ContractWriteNode.Output.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setData(value);
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
proto.aggregator.ContractWriteNode.Output.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ContractWriteNode.Output.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ContractWriteNode.Output} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractWriteNode.Output.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Value data = 1;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.ContractWriteNode.Output.prototype.getData = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 1));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.ContractWriteNode.Output} returns this
*/
proto.aggregator.ContractWriteNode.Output.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.ContractWriteNode.Output} returns this
 */
proto.aggregator.ContractWriteNode.Output.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ContractWriteNode.Output.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
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
proto.aggregator.ContractWriteNode.MethodResult.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ContractWriteNode.MethodResult.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ContractWriteNode.MethodResult} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractWriteNode.MethodResult.toObject = function(includeInstance, msg) {
  var f, obj = {
    methodName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    methodAbi: (f = msg.getMethodAbi()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f),
    success: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    error: jspb.Message.getFieldWithDefault(msg, 4, ""),
    receipt: (f = msg.getReceipt()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f),
    blockNumber: jspb.Message.getFieldWithDefault(msg, 6, 0),
    value: (f = msg.getValue()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.ContractWriteNode.MethodResult}
 */
proto.aggregator.ContractWriteNode.MethodResult.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ContractWriteNode.MethodResult;
  return proto.aggregator.ContractWriteNode.MethodResult.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ContractWriteNode.MethodResult} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ContractWriteNode.MethodResult}
 */
proto.aggregator.ContractWriteNode.MethodResult.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setMethodName(value);
      break;
    case 2:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setMethodAbi(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setError(value);
      break;
    case 5:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setReceipt(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setBlockNumber(value);
      break;
    case 7:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setValue(value);
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
proto.aggregator.ContractWriteNode.MethodResult.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ContractWriteNode.MethodResult.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ContractWriteNode.MethodResult} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractWriteNode.MethodResult.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMethodName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getMethodAbi();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getError();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getReceipt();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeUint64(
      6,
      f
    );
  }
  f = message.getValue();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
};


/**
 * optional string method_name = 1;
 * @return {string}
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.getMethodName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractWriteNode.MethodResult} returns this
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.setMethodName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional google.protobuf.Value method_abi = 2;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.getMethodAbi = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 2));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.ContractWriteNode.MethodResult} returns this
*/
proto.aggregator.ContractWriteNode.MethodResult.prototype.setMethodAbi = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.ContractWriteNode.MethodResult} returns this
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.clearMethodAbi = function() {
  return this.setMethodAbi(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.hasMethodAbi = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional bool success = 3;
 * @return {boolean}
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.ContractWriteNode.MethodResult} returns this
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional string error = 4;
 * @return {string}
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.getError = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractWriteNode.MethodResult} returns this
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.setError = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional google.protobuf.Value receipt = 5;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.getReceipt = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 5));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.ContractWriteNode.MethodResult} returns this
*/
proto.aggregator.ContractWriteNode.MethodResult.prototype.setReceipt = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.ContractWriteNode.MethodResult} returns this
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.clearReceipt = function() {
  return this.setReceipt(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.hasReceipt = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional uint64 block_number = 6;
 * @return {number}
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.getBlockNumber = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.ContractWriteNode.MethodResult} returns this
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.setBlockNumber = function(value) {
  return jspb.Message.setField(this, 6, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.aggregator.ContractWriteNode.MethodResult} returns this
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.clearBlockNumber = function() {
  return jspb.Message.setField(this, 6, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.hasBlockNumber = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional google.protobuf.Value value = 7;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.getValue = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 7));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.ContractWriteNode.MethodResult} returns this
*/
proto.aggregator.ContractWriteNode.MethodResult.prototype.setValue = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.ContractWriteNode.MethodResult} returns this
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.clearValue = function() {
  return this.setValue(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ContractWriteNode.MethodResult.prototype.hasValue = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional Config config = 1;
 * @return {?proto.aggregator.ContractWriteNode.Config}
 */
proto.aggregator.ContractWriteNode.prototype.getConfig = function() {
  return /** @type{?proto.aggregator.ContractWriteNode.Config} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ContractWriteNode.Config, 1));
};


/**
 * @param {?proto.aggregator.ContractWriteNode.Config|undefined} value
 * @return {!proto.aggregator.ContractWriteNode} returns this
*/
proto.aggregator.ContractWriteNode.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.ContractWriteNode} returns this
 */
proto.aggregator.ContractWriteNode.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ContractWriteNode.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
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
    config: (f = msg.getConfig()) && proto.aggregator.ContractReadNode.Config.toObject(includeInstance, f)
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
      var value = new proto.aggregator.ContractReadNode.Config;
      reader.readMessage(value,proto.aggregator.ContractReadNode.Config.deserializeBinaryFromReader);
      msg.setConfig(value);
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
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.ContractReadNode.Config.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.ContractReadNode.MethodCall.repeatedFields_ = [3,4];



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
proto.aggregator.ContractReadNode.MethodCall.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ContractReadNode.MethodCall.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ContractReadNode.MethodCall} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractReadNode.MethodCall.toObject = function(includeInstance, msg) {
  var f, obj = {
    callData: jspb.Message.getFieldWithDefault(msg, 1, ""),
    methodName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    applyToFieldsList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f,
    methodParamsList: (f = jspb.Message.getRepeatedField(msg, 4)) == null ? undefined : f
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
 * @return {!proto.aggregator.ContractReadNode.MethodCall}
 */
proto.aggregator.ContractReadNode.MethodCall.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ContractReadNode.MethodCall;
  return proto.aggregator.ContractReadNode.MethodCall.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ContractReadNode.MethodCall} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ContractReadNode.MethodCall}
 */
proto.aggregator.ContractReadNode.MethodCall.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setCallData(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMethodName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.addApplyToFields(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.addMethodParams(value);
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
proto.aggregator.ContractReadNode.MethodCall.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ContractReadNode.MethodCall.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ContractReadNode.MethodCall} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractReadNode.MethodCall.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getMethodName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getApplyToFieldsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      3,
      f
    );
  }
  f = message.getMethodParamsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      4,
      f
    );
  }
};


/**
 * optional string call_data = 1;
 * @return {string}
 */
proto.aggregator.ContractReadNode.MethodCall.prototype.getCallData = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractReadNode.MethodCall} returns this
 */
proto.aggregator.ContractReadNode.MethodCall.prototype.setCallData = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.aggregator.ContractReadNode.MethodCall} returns this
 */
proto.aggregator.ContractReadNode.MethodCall.prototype.clearCallData = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ContractReadNode.MethodCall.prototype.hasCallData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string method_name = 2;
 * @return {string}
 */
proto.aggregator.ContractReadNode.MethodCall.prototype.getMethodName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractReadNode.MethodCall} returns this
 */
proto.aggregator.ContractReadNode.MethodCall.prototype.setMethodName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated string apply_to_fields = 3;
 * @return {!Array<string>}
 */
proto.aggregator.ContractReadNode.MethodCall.prototype.getApplyToFieldsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.ContractReadNode.MethodCall} returns this
 */
proto.aggregator.ContractReadNode.MethodCall.prototype.setApplyToFieldsList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.ContractReadNode.MethodCall} returns this
 */
proto.aggregator.ContractReadNode.MethodCall.prototype.addApplyToFields = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.ContractReadNode.MethodCall} returns this
 */
proto.aggregator.ContractReadNode.MethodCall.prototype.clearApplyToFieldsList = function() {
  return this.setApplyToFieldsList([]);
};


/**
 * repeated string method_params = 4;
 * @return {!Array<string>}
 */
proto.aggregator.ContractReadNode.MethodCall.prototype.getMethodParamsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 4));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.ContractReadNode.MethodCall} returns this
 */
proto.aggregator.ContractReadNode.MethodCall.prototype.setMethodParamsList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.ContractReadNode.MethodCall} returns this
 */
proto.aggregator.ContractReadNode.MethodCall.prototype.addMethodParams = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.ContractReadNode.MethodCall} returns this
 */
proto.aggregator.ContractReadNode.MethodCall.prototype.clearMethodParamsList = function() {
  return this.setMethodParamsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.ContractReadNode.Config.repeatedFields_ = [2,3];



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
proto.aggregator.ContractReadNode.Config.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ContractReadNode.Config.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ContractReadNode.Config} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractReadNode.Config.toObject = function(includeInstance, msg) {
  var f, obj = {
    contractAddress: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractAbiList: jspb.Message.toObjectList(msg.getContractAbiList(),
    google_protobuf_struct_pb.Value.toObject, includeInstance),
    methodCallsList: jspb.Message.toObjectList(msg.getMethodCallsList(),
    proto.aggregator.ContractReadNode.MethodCall.toObject, includeInstance)
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
 * @return {!proto.aggregator.ContractReadNode.Config}
 */
proto.aggregator.ContractReadNode.Config.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ContractReadNode.Config;
  return proto.aggregator.ContractReadNode.Config.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ContractReadNode.Config} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ContractReadNode.Config}
 */
proto.aggregator.ContractReadNode.Config.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.addContractAbi(value);
      break;
    case 3:
      var value = new proto.aggregator.ContractReadNode.MethodCall;
      reader.readMessage(value,proto.aggregator.ContractReadNode.MethodCall.deserializeBinaryFromReader);
      msg.addMethodCalls(value);
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
proto.aggregator.ContractReadNode.Config.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ContractReadNode.Config.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ContractReadNode.Config} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractReadNode.Config.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContractAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractAbiList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
  f = message.getMethodCallsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.aggregator.ContractReadNode.MethodCall.serializeBinaryToWriter
    );
  }
};


/**
 * optional string contract_address = 1;
 * @return {string}
 */
proto.aggregator.ContractReadNode.Config.prototype.getContractAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractReadNode.Config} returns this
 */
proto.aggregator.ContractReadNode.Config.prototype.setContractAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated google.protobuf.Value contract_abi = 2;
 * @return {!Array<!proto.google.protobuf.Value>}
 */
proto.aggregator.ContractReadNode.Config.prototype.getContractAbiList = function() {
  return /** @type{!Array<!proto.google.protobuf.Value>} */ (
    jspb.Message.getRepeatedWrapperField(this, google_protobuf_struct_pb.Value, 2));
};


/**
 * @param {!Array<!proto.google.protobuf.Value>} value
 * @return {!proto.aggregator.ContractReadNode.Config} returns this
*/
proto.aggregator.ContractReadNode.Config.prototype.setContractAbiList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.google.protobuf.Value=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.Value}
 */
proto.aggregator.ContractReadNode.Config.prototype.addContractAbi = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.google.protobuf.Value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.ContractReadNode.Config} returns this
 */
proto.aggregator.ContractReadNode.Config.prototype.clearContractAbiList = function() {
  return this.setContractAbiList([]);
};


/**
 * repeated MethodCall method_calls = 3;
 * @return {!Array<!proto.aggregator.ContractReadNode.MethodCall>}
 */
proto.aggregator.ContractReadNode.Config.prototype.getMethodCallsList = function() {
  return /** @type{!Array<!proto.aggregator.ContractReadNode.MethodCall>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.ContractReadNode.MethodCall, 3));
};


/**
 * @param {!Array<!proto.aggregator.ContractReadNode.MethodCall>} value
 * @return {!proto.aggregator.ContractReadNode.Config} returns this
*/
proto.aggregator.ContractReadNode.Config.prototype.setMethodCallsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.aggregator.ContractReadNode.MethodCall=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.ContractReadNode.MethodCall}
 */
proto.aggregator.ContractReadNode.Config.prototype.addMethodCalls = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.aggregator.ContractReadNode.MethodCall, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.ContractReadNode.Config} returns this
 */
proto.aggregator.ContractReadNode.Config.prototype.clearMethodCallsList = function() {
  return this.setMethodCallsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.ContractReadNode.MethodResult.repeatedFields_ = [1];



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
proto.aggregator.ContractReadNode.MethodResult.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ContractReadNode.MethodResult.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ContractReadNode.MethodResult} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractReadNode.MethodResult.toObject = function(includeInstance, msg) {
  var f, obj = {
    dataList: jspb.Message.toObjectList(msg.getDataList(),
    proto.aggregator.ContractReadNode.MethodResult.StructuredField.toObject, includeInstance),
    methodName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    success: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    error: jspb.Message.getFieldWithDefault(msg, 4, "")
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
 * @return {!proto.aggregator.ContractReadNode.MethodResult}
 */
proto.aggregator.ContractReadNode.MethodResult.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ContractReadNode.MethodResult;
  return proto.aggregator.ContractReadNode.MethodResult.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ContractReadNode.MethodResult} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ContractReadNode.MethodResult}
 */
proto.aggregator.ContractReadNode.MethodResult.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.ContractReadNode.MethodResult.StructuredField;
      reader.readMessage(value,proto.aggregator.ContractReadNode.MethodResult.StructuredField.deserializeBinaryFromReader);
      msg.addData(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMethodName(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setError(value);
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
proto.aggregator.ContractReadNode.MethodResult.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ContractReadNode.MethodResult.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ContractReadNode.MethodResult} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractReadNode.MethodResult.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.aggregator.ContractReadNode.MethodResult.StructuredField.serializeBinaryToWriter
    );
  }
  f = message.getMethodName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getError();
  if (f.length > 0) {
    writer.writeString(
      4,
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
proto.aggregator.ContractReadNode.MethodResult.StructuredField.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ContractReadNode.MethodResult.StructuredField.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ContractReadNode.MethodResult.StructuredField} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractReadNode.MethodResult.StructuredField.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    type: jspb.Message.getFieldWithDefault(msg, 2, ""),
    value: jspb.Message.getFieldWithDefault(msg, 3, "")
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
 * @return {!proto.aggregator.ContractReadNode.MethodResult.StructuredField}
 */
proto.aggregator.ContractReadNode.MethodResult.StructuredField.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ContractReadNode.MethodResult.StructuredField;
  return proto.aggregator.ContractReadNode.MethodResult.StructuredField.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ContractReadNode.MethodResult.StructuredField} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ContractReadNode.MethodResult.StructuredField}
 */
proto.aggregator.ContractReadNode.MethodResult.StructuredField.deserializeBinaryFromReader = function(msg, reader) {
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
      msg.setType(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setValue(value);
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
proto.aggregator.ContractReadNode.MethodResult.StructuredField.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ContractReadNode.MethodResult.StructuredField.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ContractReadNode.MethodResult.StructuredField} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractReadNode.MethodResult.StructuredField.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
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
  f = message.getValue();
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
proto.aggregator.ContractReadNode.MethodResult.StructuredField.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractReadNode.MethodResult.StructuredField} returns this
 */
proto.aggregator.ContractReadNode.MethodResult.StructuredField.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string type = 2;
 * @return {string}
 */
proto.aggregator.ContractReadNode.MethodResult.StructuredField.prototype.getType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractReadNode.MethodResult.StructuredField} returns this
 */
proto.aggregator.ContractReadNode.MethodResult.StructuredField.prototype.setType = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string value = 3;
 * @return {string}
 */
proto.aggregator.ContractReadNode.MethodResult.StructuredField.prototype.getValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractReadNode.MethodResult.StructuredField} returns this
 */
proto.aggregator.ContractReadNode.MethodResult.StructuredField.prototype.setValue = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * repeated StructuredField data = 1;
 * @return {!Array<!proto.aggregator.ContractReadNode.MethodResult.StructuredField>}
 */
proto.aggregator.ContractReadNode.MethodResult.prototype.getDataList = function() {
  return /** @type{!Array<!proto.aggregator.ContractReadNode.MethodResult.StructuredField>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.ContractReadNode.MethodResult.StructuredField, 1));
};


/**
 * @param {!Array<!proto.aggregator.ContractReadNode.MethodResult.StructuredField>} value
 * @return {!proto.aggregator.ContractReadNode.MethodResult} returns this
*/
proto.aggregator.ContractReadNode.MethodResult.prototype.setDataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.aggregator.ContractReadNode.MethodResult.StructuredField=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.ContractReadNode.MethodResult.StructuredField}
 */
proto.aggregator.ContractReadNode.MethodResult.prototype.addData = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.aggregator.ContractReadNode.MethodResult.StructuredField, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.ContractReadNode.MethodResult} returns this
 */
proto.aggregator.ContractReadNode.MethodResult.prototype.clearDataList = function() {
  return this.setDataList([]);
};


/**
 * optional string method_name = 2;
 * @return {string}
 */
proto.aggregator.ContractReadNode.MethodResult.prototype.getMethodName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractReadNode.MethodResult} returns this
 */
proto.aggregator.ContractReadNode.MethodResult.prototype.setMethodName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool success = 3;
 * @return {boolean}
 */
proto.aggregator.ContractReadNode.MethodResult.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.ContractReadNode.MethodResult} returns this
 */
proto.aggregator.ContractReadNode.MethodResult.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional string error = 4;
 * @return {string}
 */
proto.aggregator.ContractReadNode.MethodResult.prototype.getError = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ContractReadNode.MethodResult} returns this
 */
proto.aggregator.ContractReadNode.MethodResult.prototype.setError = function(value) {
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
proto.aggregator.ContractReadNode.Output.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.ContractReadNode.Output.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.ContractReadNode.Output} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractReadNode.Output.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.ContractReadNode.Output}
 */
proto.aggregator.ContractReadNode.Output.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.ContractReadNode.Output;
  return proto.aggregator.ContractReadNode.Output.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.ContractReadNode.Output} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.ContractReadNode.Output}
 */
proto.aggregator.ContractReadNode.Output.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setData(value);
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
proto.aggregator.ContractReadNode.Output.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.ContractReadNode.Output.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.ContractReadNode.Output} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.ContractReadNode.Output.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Value data = 1;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.ContractReadNode.Output.prototype.getData = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 1));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.ContractReadNode.Output} returns this
*/
proto.aggregator.ContractReadNode.Output.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.ContractReadNode.Output} returns this
 */
proto.aggregator.ContractReadNode.Output.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ContractReadNode.Output.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Config config = 1;
 * @return {?proto.aggregator.ContractReadNode.Config}
 */
proto.aggregator.ContractReadNode.prototype.getConfig = function() {
  return /** @type{?proto.aggregator.ContractReadNode.Config} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ContractReadNode.Config, 1));
};


/**
 * @param {?proto.aggregator.ContractReadNode.Config|undefined} value
 * @return {!proto.aggregator.ContractReadNode} returns this
*/
proto.aggregator.ContractReadNode.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.ContractReadNode} returns this
 */
proto.aggregator.ContractReadNode.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ContractReadNode.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
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
    config: (f = msg.getConfig()) && proto.aggregator.GraphQLQueryNode.Config.toObject(includeInstance, f)
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
      var value = new proto.aggregator.GraphQLQueryNode.Config;
      reader.readMessage(value,proto.aggregator.GraphQLQueryNode.Config.deserializeBinaryFromReader);
      msg.setConfig(value);
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
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.GraphQLQueryNode.Config.serializeBinaryToWriter
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
proto.aggregator.GraphQLQueryNode.Config.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.GraphQLQueryNode.Config.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.GraphQLQueryNode.Config} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GraphQLQueryNode.Config.toObject = function(includeInstance, msg) {
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
 * @return {!proto.aggregator.GraphQLQueryNode.Config}
 */
proto.aggregator.GraphQLQueryNode.Config.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.GraphQLQueryNode.Config;
  return proto.aggregator.GraphQLQueryNode.Config.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.GraphQLQueryNode.Config} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.GraphQLQueryNode.Config}
 */
proto.aggregator.GraphQLQueryNode.Config.deserializeBinaryFromReader = function(msg, reader) {
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
proto.aggregator.GraphQLQueryNode.Config.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.GraphQLQueryNode.Config.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.GraphQLQueryNode.Config} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GraphQLQueryNode.Config.serializeBinaryToWriter = function(message, writer) {
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
proto.aggregator.GraphQLQueryNode.Config.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GraphQLQueryNode.Config} returns this
 */
proto.aggregator.GraphQLQueryNode.Config.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string query = 2;
 * @return {string}
 */
proto.aggregator.GraphQLQueryNode.Config.prototype.getQuery = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GraphQLQueryNode.Config} returns this
 */
proto.aggregator.GraphQLQueryNode.Config.prototype.setQuery = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * map<string, string> variables = 3;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.aggregator.GraphQLQueryNode.Config.prototype.getVariablesMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 3, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.aggregator.GraphQLQueryNode.Config} returns this
 */
proto.aggregator.GraphQLQueryNode.Config.prototype.clearVariablesMap = function() {
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
proto.aggregator.GraphQLQueryNode.Output.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.GraphQLQueryNode.Output.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.GraphQLQueryNode.Output} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GraphQLQueryNode.Output.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.GraphQLQueryNode.Output}
 */
proto.aggregator.GraphQLQueryNode.Output.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.GraphQLQueryNode.Output;
  return proto.aggregator.GraphQLQueryNode.Output.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.GraphQLQueryNode.Output} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.GraphQLQueryNode.Output}
 */
proto.aggregator.GraphQLQueryNode.Output.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setData(value);
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
proto.aggregator.GraphQLQueryNode.Output.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.GraphQLQueryNode.Output.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.GraphQLQueryNode.Output} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GraphQLQueryNode.Output.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Value data = 1;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.GraphQLQueryNode.Output.prototype.getData = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 1));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.GraphQLQueryNode.Output} returns this
*/
proto.aggregator.GraphQLQueryNode.Output.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.GraphQLQueryNode.Output} returns this
 */
proto.aggregator.GraphQLQueryNode.Output.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.GraphQLQueryNode.Output.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Config config = 1;
 * @return {?proto.aggregator.GraphQLQueryNode.Config}
 */
proto.aggregator.GraphQLQueryNode.prototype.getConfig = function() {
  return /** @type{?proto.aggregator.GraphQLQueryNode.Config} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.GraphQLQueryNode.Config, 1));
};


/**
 * @param {?proto.aggregator.GraphQLQueryNode.Config|undefined} value
 * @return {!proto.aggregator.GraphQLQueryNode} returns this
*/
proto.aggregator.GraphQLQueryNode.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.GraphQLQueryNode} returns this
 */
proto.aggregator.GraphQLQueryNode.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.GraphQLQueryNode.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
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
    config: (f = msg.getConfig()) && proto.aggregator.RestAPINode.Config.toObject(includeInstance, f)
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
      var value = new proto.aggregator.RestAPINode.Config;
      reader.readMessage(value,proto.aggregator.RestAPINode.Config.deserializeBinaryFromReader);
      msg.setConfig(value);
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
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.RestAPINode.Config.serializeBinaryToWriter
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
proto.aggregator.RestAPINode.Config.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.RestAPINode.Config.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.RestAPINode.Config} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.RestAPINode.Config.toObject = function(includeInstance, msg) {
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
 * @return {!proto.aggregator.RestAPINode.Config}
 */
proto.aggregator.RestAPINode.Config.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.RestAPINode.Config;
  return proto.aggregator.RestAPINode.Config.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.RestAPINode.Config} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.RestAPINode.Config}
 */
proto.aggregator.RestAPINode.Config.deserializeBinaryFromReader = function(msg, reader) {
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
proto.aggregator.RestAPINode.Config.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.RestAPINode.Config.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.RestAPINode.Config} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.RestAPINode.Config.serializeBinaryToWriter = function(message, writer) {
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
proto.aggregator.RestAPINode.Config.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.RestAPINode.Config} returns this
 */
proto.aggregator.RestAPINode.Config.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * map<string, string> headers = 2;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.aggregator.RestAPINode.Config.prototype.getHeadersMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 2, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.aggregator.RestAPINode.Config} returns this
 */
proto.aggregator.RestAPINode.Config.prototype.clearHeadersMap = function() {
  this.getHeadersMap().clear();
  return this;};


/**
 * optional string body = 3;
 * @return {string}
 */
proto.aggregator.RestAPINode.Config.prototype.getBody = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.RestAPINode.Config} returns this
 */
proto.aggregator.RestAPINode.Config.prototype.setBody = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string method = 4;
 * @return {string}
 */
proto.aggregator.RestAPINode.Config.prototype.getMethod = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.RestAPINode.Config} returns this
 */
proto.aggregator.RestAPINode.Config.prototype.setMethod = function(value) {
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
proto.aggregator.RestAPINode.Output.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.RestAPINode.Output.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.RestAPINode.Output} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.RestAPINode.Output.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.RestAPINode.Output}
 */
proto.aggregator.RestAPINode.Output.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.RestAPINode.Output;
  return proto.aggregator.RestAPINode.Output.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.RestAPINode.Output} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.RestAPINode.Output}
 */
proto.aggregator.RestAPINode.Output.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setData(value);
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
proto.aggregator.RestAPINode.Output.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.RestAPINode.Output.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.RestAPINode.Output} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.RestAPINode.Output.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Value data = 1;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.RestAPINode.Output.prototype.getData = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 1));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.RestAPINode.Output} returns this
*/
proto.aggregator.RestAPINode.Output.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RestAPINode.Output} returns this
 */
proto.aggregator.RestAPINode.Output.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RestAPINode.Output.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Config config = 1;
 * @return {?proto.aggregator.RestAPINode.Config}
 */
proto.aggregator.RestAPINode.prototype.getConfig = function() {
  return /** @type{?proto.aggregator.RestAPINode.Config} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.RestAPINode.Config, 1));
};


/**
 * @param {?proto.aggregator.RestAPINode.Config|undefined} value
 * @return {!proto.aggregator.RestAPINode} returns this
*/
proto.aggregator.RestAPINode.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RestAPINode} returns this
 */
proto.aggregator.RestAPINode.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RestAPINode.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
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
    config: (f = msg.getConfig()) && proto.aggregator.CustomCodeNode.Config.toObject(includeInstance, f)
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
      var value = new proto.aggregator.CustomCodeNode.Config;
      reader.readMessage(value,proto.aggregator.CustomCodeNode.Config.deserializeBinaryFromReader);
      msg.setConfig(value);
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
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.CustomCodeNode.Config.serializeBinaryToWriter
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
proto.aggregator.CustomCodeNode.Config.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.CustomCodeNode.Config.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.CustomCodeNode.Config} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CustomCodeNode.Config.toObject = function(includeInstance, msg) {
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
 * @return {!proto.aggregator.CustomCodeNode.Config}
 */
proto.aggregator.CustomCodeNode.Config.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.CustomCodeNode.Config;
  return proto.aggregator.CustomCodeNode.Config.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.CustomCodeNode.Config} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.CustomCodeNode.Config}
 */
proto.aggregator.CustomCodeNode.Config.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.aggregator.Lang} */ (reader.readEnum());
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
proto.aggregator.CustomCodeNode.Config.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.CustomCodeNode.Config.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.CustomCodeNode.Config} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CustomCodeNode.Config.serializeBinaryToWriter = function(message, writer) {
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
 * optional Lang lang = 1;
 * @return {!proto.aggregator.Lang}
 */
proto.aggregator.CustomCodeNode.Config.prototype.getLang = function() {
  return /** @type {!proto.aggregator.Lang} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.aggregator.Lang} value
 * @return {!proto.aggregator.CustomCodeNode.Config} returns this
 */
proto.aggregator.CustomCodeNode.Config.prototype.setLang = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional string source = 2;
 * @return {string}
 */
proto.aggregator.CustomCodeNode.Config.prototype.getSource = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.CustomCodeNode.Config} returns this
 */
proto.aggregator.CustomCodeNode.Config.prototype.setSource = function(value) {
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
proto.aggregator.CustomCodeNode.Output.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.CustomCodeNode.Output.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.CustomCodeNode.Output} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CustomCodeNode.Output.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.CustomCodeNode.Output}
 */
proto.aggregator.CustomCodeNode.Output.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.CustomCodeNode.Output;
  return proto.aggregator.CustomCodeNode.Output.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.CustomCodeNode.Output} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.CustomCodeNode.Output}
 */
proto.aggregator.CustomCodeNode.Output.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setData(value);
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
proto.aggregator.CustomCodeNode.Output.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.CustomCodeNode.Output.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.CustomCodeNode.Output} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CustomCodeNode.Output.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Value data = 1;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.CustomCodeNode.Output.prototype.getData = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 1));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.CustomCodeNode.Output} returns this
*/
proto.aggregator.CustomCodeNode.Output.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.CustomCodeNode.Output} returns this
 */
proto.aggregator.CustomCodeNode.Output.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.CustomCodeNode.Output.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Config config = 1;
 * @return {?proto.aggregator.CustomCodeNode.Config}
 */
proto.aggregator.CustomCodeNode.prototype.getConfig = function() {
  return /** @type{?proto.aggregator.CustomCodeNode.Config} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.CustomCodeNode.Config, 1));
};


/**
 * @param {?proto.aggregator.CustomCodeNode.Config|undefined} value
 * @return {!proto.aggregator.CustomCodeNode} returns this
*/
proto.aggregator.CustomCodeNode.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.CustomCodeNode} returns this
 */
proto.aggregator.CustomCodeNode.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.CustomCodeNode.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
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
proto.aggregator.BalanceNode.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.BalanceNode.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.BalanceNode} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BalanceNode.toObject = function(includeInstance, msg) {
  var f, obj = {
    config: (f = msg.getConfig()) && proto.aggregator.BalanceNode.Config.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.BalanceNode}
 */
proto.aggregator.BalanceNode.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.BalanceNode;
  return proto.aggregator.BalanceNode.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.BalanceNode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.BalanceNode}
 */
proto.aggregator.BalanceNode.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.BalanceNode.Config;
      reader.readMessage(value,proto.aggregator.BalanceNode.Config.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.aggregator.BalanceNode.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.BalanceNode.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.BalanceNode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BalanceNode.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.BalanceNode.Config.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.BalanceNode.Config.repeatedFields_ = [6];



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
proto.aggregator.BalanceNode.Config.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.BalanceNode.Config.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.BalanceNode.Config} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BalanceNode.Config.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: jspb.Message.getFieldWithDefault(msg, 1, ""),
    chain: jspb.Message.getFieldWithDefault(msg, 2, ""),
    includeSpam: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    includeZeroBalances: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    minUsdValueCents: jspb.Message.getFieldWithDefault(msg, 5, 0),
    tokenAddressesList: (f = jspb.Message.getRepeatedField(msg, 6)) == null ? undefined : f
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
 * @return {!proto.aggregator.BalanceNode.Config}
 */
proto.aggregator.BalanceNode.Config.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.BalanceNode.Config;
  return proto.aggregator.BalanceNode.Config.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.BalanceNode.Config} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.BalanceNode.Config}
 */
proto.aggregator.BalanceNode.Config.deserializeBinaryFromReader = function(msg, reader) {
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
      msg.setChain(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIncludeSpam(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIncludeZeroBalances(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setMinUsdValueCents(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.addTokenAddresses(value);
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
proto.aggregator.BalanceNode.Config.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.BalanceNode.Config.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.BalanceNode.Config} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BalanceNode.Config.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getChain();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getIncludeSpam();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getIncludeZeroBalances();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getMinUsdValueCents();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getTokenAddressesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      6,
      f
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.aggregator.BalanceNode.Config.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.BalanceNode.Config} returns this
 */
proto.aggregator.BalanceNode.Config.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string chain = 2;
 * @return {string}
 */
proto.aggregator.BalanceNode.Config.prototype.getChain = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.BalanceNode.Config} returns this
 */
proto.aggregator.BalanceNode.Config.prototype.setChain = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool include_spam = 3;
 * @return {boolean}
 */
proto.aggregator.BalanceNode.Config.prototype.getIncludeSpam = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.BalanceNode.Config} returns this
 */
proto.aggregator.BalanceNode.Config.prototype.setIncludeSpam = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional bool include_zero_balances = 4;
 * @return {boolean}
 */
proto.aggregator.BalanceNode.Config.prototype.getIncludeZeroBalances = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.BalanceNode.Config} returns this
 */
proto.aggregator.BalanceNode.Config.prototype.setIncludeZeroBalances = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional int64 min_usd_value_cents = 5;
 * @return {number}
 */
proto.aggregator.BalanceNode.Config.prototype.getMinUsdValueCents = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.BalanceNode.Config} returns this
 */
proto.aggregator.BalanceNode.Config.prototype.setMinUsdValueCents = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * repeated string token_addresses = 6;
 * @return {!Array<string>}
 */
proto.aggregator.BalanceNode.Config.prototype.getTokenAddressesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 6));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.BalanceNode.Config} returns this
 */
proto.aggregator.BalanceNode.Config.prototype.setTokenAddressesList = function(value) {
  return jspb.Message.setField(this, 6, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.BalanceNode.Config} returns this
 */
proto.aggregator.BalanceNode.Config.prototype.addTokenAddresses = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 6, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.BalanceNode.Config} returns this
 */
proto.aggregator.BalanceNode.Config.prototype.clearTokenAddressesList = function() {
  return this.setTokenAddressesList([]);
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
proto.aggregator.BalanceNode.Output.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.BalanceNode.Output.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.BalanceNode.Output} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BalanceNode.Output.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.BalanceNode.Output}
 */
proto.aggregator.BalanceNode.Output.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.BalanceNode.Output;
  return proto.aggregator.BalanceNode.Output.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.BalanceNode.Output} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.BalanceNode.Output}
 */
proto.aggregator.BalanceNode.Output.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setData(value);
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
proto.aggregator.BalanceNode.Output.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.BalanceNode.Output.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.BalanceNode.Output} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BalanceNode.Output.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Value data = 1;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.BalanceNode.Output.prototype.getData = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 1));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.BalanceNode.Output} returns this
*/
proto.aggregator.BalanceNode.Output.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.BalanceNode.Output} returns this
 */
proto.aggregator.BalanceNode.Output.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.BalanceNode.Output.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Config config = 1;
 * @return {?proto.aggregator.BalanceNode.Config}
 */
proto.aggregator.BalanceNode.prototype.getConfig = function() {
  return /** @type{?proto.aggregator.BalanceNode.Config} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.BalanceNode.Config, 1));
};


/**
 * @param {?proto.aggregator.BalanceNode.Config|undefined} value
 * @return {!proto.aggregator.BalanceNode} returns this
*/
proto.aggregator.BalanceNode.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.BalanceNode} returns this
 */
proto.aggregator.BalanceNode.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.BalanceNode.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
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
    config: (f = msg.getConfig()) && proto.aggregator.BranchNode.Config.toObject(includeInstance, f)
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
      var value = new proto.aggregator.BranchNode.Config;
      reader.readMessage(value,proto.aggregator.BranchNode.Config.deserializeBinaryFromReader);
      msg.setConfig(value);
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
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.BranchNode.Config.serializeBinaryToWriter
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
proto.aggregator.BranchNode.Condition.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.BranchNode.Condition.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.BranchNode.Condition} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BranchNode.Condition.toObject = function(includeInstance, msg) {
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
 * @return {!proto.aggregator.BranchNode.Condition}
 */
proto.aggregator.BranchNode.Condition.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.BranchNode.Condition;
  return proto.aggregator.BranchNode.Condition.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.BranchNode.Condition} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.BranchNode.Condition}
 */
proto.aggregator.BranchNode.Condition.deserializeBinaryFromReader = function(msg, reader) {
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
proto.aggregator.BranchNode.Condition.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.BranchNode.Condition.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.BranchNode.Condition} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BranchNode.Condition.serializeBinaryToWriter = function(message, writer) {
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
proto.aggregator.BranchNode.Condition.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.BranchNode.Condition} returns this
 */
proto.aggregator.BranchNode.Condition.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string type = 2;
 * @return {string}
 */
proto.aggregator.BranchNode.Condition.prototype.getType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.BranchNode.Condition} returns this
 */
proto.aggregator.BranchNode.Condition.prototype.setType = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string expression = 3;
 * @return {string}
 */
proto.aggregator.BranchNode.Condition.prototype.getExpression = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.BranchNode.Condition} returns this
 */
proto.aggregator.BranchNode.Condition.prototype.setExpression = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.BranchNode.Config.repeatedFields_ = [1];



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
proto.aggregator.BranchNode.Config.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.BranchNode.Config.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.BranchNode.Config} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BranchNode.Config.toObject = function(includeInstance, msg) {
  var f, obj = {
    conditionsList: jspb.Message.toObjectList(msg.getConditionsList(),
    proto.aggregator.BranchNode.Condition.toObject, includeInstance)
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
 * @return {!proto.aggregator.BranchNode.Config}
 */
proto.aggregator.BranchNode.Config.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.BranchNode.Config;
  return proto.aggregator.BranchNode.Config.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.BranchNode.Config} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.BranchNode.Config}
 */
proto.aggregator.BranchNode.Config.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.BranchNode.Condition;
      reader.readMessage(value,proto.aggregator.BranchNode.Condition.deserializeBinaryFromReader);
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
proto.aggregator.BranchNode.Config.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.BranchNode.Config.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.BranchNode.Config} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BranchNode.Config.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConditionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.aggregator.BranchNode.Condition.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Condition conditions = 1;
 * @return {!Array<!proto.aggregator.BranchNode.Condition>}
 */
proto.aggregator.BranchNode.Config.prototype.getConditionsList = function() {
  return /** @type{!Array<!proto.aggregator.BranchNode.Condition>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.BranchNode.Condition, 1));
};


/**
 * @param {!Array<!proto.aggregator.BranchNode.Condition>} value
 * @return {!proto.aggregator.BranchNode.Config} returns this
*/
proto.aggregator.BranchNode.Config.prototype.setConditionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.aggregator.BranchNode.Condition=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.BranchNode.Condition}
 */
proto.aggregator.BranchNode.Config.prototype.addConditions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.aggregator.BranchNode.Condition, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.BranchNode.Config} returns this
 */
proto.aggregator.BranchNode.Config.prototype.clearConditionsList = function() {
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
proto.aggregator.BranchNode.Output.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.BranchNode.Output.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.BranchNode.Output} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BranchNode.Output.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.BranchNode.Output}
 */
proto.aggregator.BranchNode.Output.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.BranchNode.Output;
  return proto.aggregator.BranchNode.Output.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.BranchNode.Output} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.BranchNode.Output}
 */
proto.aggregator.BranchNode.Output.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setData(value);
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
proto.aggregator.BranchNode.Output.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.BranchNode.Output.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.BranchNode.Output} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.BranchNode.Output.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Value data = 1;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.BranchNode.Output.prototype.getData = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 1));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.BranchNode.Output} returns this
*/
proto.aggregator.BranchNode.Output.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.BranchNode.Output} returns this
 */
proto.aggregator.BranchNode.Output.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.BranchNode.Output.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Config config = 1;
 * @return {?proto.aggregator.BranchNode.Config}
 */
proto.aggregator.BranchNode.prototype.getConfig = function() {
  return /** @type{?proto.aggregator.BranchNode.Config} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.BranchNode.Config, 1));
};


/**
 * @param {?proto.aggregator.BranchNode.Config|undefined} value
 * @return {!proto.aggregator.BranchNode} returns this
*/
proto.aggregator.BranchNode.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.BranchNode} returns this
 */
proto.aggregator.BranchNode.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.BranchNode.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
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
    config: (f = msg.getConfig()) && proto.aggregator.FilterNode.Config.toObject(includeInstance, f)
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
      var value = new proto.aggregator.FilterNode.Config;
      reader.readMessage(value,proto.aggregator.FilterNode.Config.deserializeBinaryFromReader);
      msg.setConfig(value);
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
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.FilterNode.Config.serializeBinaryToWriter
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
proto.aggregator.FilterNode.Config.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.FilterNode.Config.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.FilterNode.Config} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.FilterNode.Config.toObject = function(includeInstance, msg) {
  var f, obj = {
    expression: jspb.Message.getFieldWithDefault(msg, 1, ""),
    inputNodeName: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.aggregator.FilterNode.Config}
 */
proto.aggregator.FilterNode.Config.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.FilterNode.Config;
  return proto.aggregator.FilterNode.Config.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.FilterNode.Config} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.FilterNode.Config}
 */
proto.aggregator.FilterNode.Config.deserializeBinaryFromReader = function(msg, reader) {
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
      msg.setInputNodeName(value);
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
proto.aggregator.FilterNode.Config.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.FilterNode.Config.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.FilterNode.Config} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.FilterNode.Config.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getExpression();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getInputNodeName();
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
proto.aggregator.FilterNode.Config.prototype.getExpression = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.FilterNode.Config} returns this
 */
proto.aggregator.FilterNode.Config.prototype.setExpression = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string input_node_name = 2;
 * @return {string}
 */
proto.aggregator.FilterNode.Config.prototype.getInputNodeName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.FilterNode.Config} returns this
 */
proto.aggregator.FilterNode.Config.prototype.setInputNodeName = function(value) {
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
proto.aggregator.FilterNode.Output.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.FilterNode.Output.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.FilterNode.Output} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.FilterNode.Output.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.FilterNode.Output}
 */
proto.aggregator.FilterNode.Output.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.FilterNode.Output;
  return proto.aggregator.FilterNode.Output.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.FilterNode.Output} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.FilterNode.Output}
 */
proto.aggregator.FilterNode.Output.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setData(value);
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
proto.aggregator.FilterNode.Output.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.FilterNode.Output.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.FilterNode.Output} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.FilterNode.Output.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Value data = 1;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.FilterNode.Output.prototype.getData = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 1));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.FilterNode.Output} returns this
*/
proto.aggregator.FilterNode.Output.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.FilterNode.Output} returns this
 */
proto.aggregator.FilterNode.Output.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.FilterNode.Output.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Config config = 1;
 * @return {?proto.aggregator.FilterNode.Config}
 */
proto.aggregator.FilterNode.prototype.getConfig = function() {
  return /** @type{?proto.aggregator.FilterNode.Config} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FilterNode.Config, 1));
};


/**
 * @param {?proto.aggregator.FilterNode.Config|undefined} value
 * @return {!proto.aggregator.FilterNode} returns this
*/
proto.aggregator.FilterNode.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.FilterNode} returns this
 */
proto.aggregator.FilterNode.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.FilterNode.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
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
    ethTransfer: (f = msg.getEthTransfer()) && proto.aggregator.ETHTransferNode.toObject(includeInstance, f),
    contractWrite: (f = msg.getContractWrite()) && proto.aggregator.ContractWriteNode.toObject(includeInstance, f),
    contractRead: (f = msg.getContractRead()) && proto.aggregator.ContractReadNode.toObject(includeInstance, f),
    graphqlDataQuery: (f = msg.getGraphqlDataQuery()) && proto.aggregator.GraphQLQueryNode.toObject(includeInstance, f),
    restApi: (f = msg.getRestApi()) && proto.aggregator.RestAPINode.toObject(includeInstance, f),
    customCode: (f = msg.getCustomCode()) && proto.aggregator.CustomCodeNode.toObject(includeInstance, f),
    config: (f = msg.getConfig()) && proto.aggregator.LoopNode.Config.toObject(includeInstance, f)
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
    case 1:
      var value = new proto.aggregator.LoopNode.Config;
      reader.readMessage(value,proto.aggregator.LoopNode.Config.deserializeBinaryFromReader);
      msg.setConfig(value);
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
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.LoopNode.Config.serializeBinaryToWriter
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
proto.aggregator.LoopNode.Config.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.LoopNode.Config.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.LoopNode.Config} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.LoopNode.Config.toObject = function(includeInstance, msg) {
  var f, obj = {
    inputNodeName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    iterVal: jspb.Message.getFieldWithDefault(msg, 2, ""),
    iterKey: jspb.Message.getFieldWithDefault(msg, 3, ""),
    executionMode: jspb.Message.getFieldWithDefault(msg, 4, 0)
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
 * @return {!proto.aggregator.LoopNode.Config}
 */
proto.aggregator.LoopNode.Config.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.LoopNode.Config;
  return proto.aggregator.LoopNode.Config.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.LoopNode.Config} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.LoopNode.Config}
 */
proto.aggregator.LoopNode.Config.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setInputNodeName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setIterVal(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setIterKey(value);
      break;
    case 4:
      var value = /** @type {!proto.aggregator.ExecutionMode} */ (reader.readEnum());
      msg.setExecutionMode(value);
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
proto.aggregator.LoopNode.Config.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.LoopNode.Config.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.LoopNode.Config} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.LoopNode.Config.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getInputNodeName();
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
  f = message.getExecutionMode();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
};


/**
 * optional string input_node_name = 1;
 * @return {string}
 */
proto.aggregator.LoopNode.Config.prototype.getInputNodeName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.LoopNode.Config} returns this
 */
proto.aggregator.LoopNode.Config.prototype.setInputNodeName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string iter_val = 2;
 * @return {string}
 */
proto.aggregator.LoopNode.Config.prototype.getIterVal = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.LoopNode.Config} returns this
 */
proto.aggregator.LoopNode.Config.prototype.setIterVal = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string iter_key = 3;
 * @return {string}
 */
proto.aggregator.LoopNode.Config.prototype.getIterKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.LoopNode.Config} returns this
 */
proto.aggregator.LoopNode.Config.prototype.setIterKey = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional ExecutionMode execution_mode = 4;
 * @return {!proto.aggregator.ExecutionMode}
 */
proto.aggregator.LoopNode.Config.prototype.getExecutionMode = function() {
  return /** @type {!proto.aggregator.ExecutionMode} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.aggregator.ExecutionMode} value
 * @return {!proto.aggregator.LoopNode.Config} returns this
 */
proto.aggregator.LoopNode.Config.prototype.setExecutionMode = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
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
proto.aggregator.LoopNode.Output.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.LoopNode.Output.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.LoopNode.Output} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.LoopNode.Output.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.LoopNode.Output}
 */
proto.aggregator.LoopNode.Output.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.LoopNode.Output;
  return proto.aggregator.LoopNode.Output.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.LoopNode.Output} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.LoopNode.Output}
 */
proto.aggregator.LoopNode.Output.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setData(value);
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
proto.aggregator.LoopNode.Output.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.LoopNode.Output.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.LoopNode.Output} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.LoopNode.Output.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.Value data = 1;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.LoopNode.Output.prototype.getData = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 1));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.LoopNode.Output} returns this
*/
proto.aggregator.LoopNode.Output.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.LoopNode.Output} returns this
 */
proto.aggregator.LoopNode.Output.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.LoopNode.Output.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
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


/**
 * optional Config config = 1;
 * @return {?proto.aggregator.LoopNode.Config}
 */
proto.aggregator.LoopNode.prototype.getConfig = function() {
  return /** @type{?proto.aggregator.LoopNode.Config} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.LoopNode.Config, 1));
};


/**
 * @param {?proto.aggregator.LoopNode.Config|undefined} value
 * @return {!proto.aggregator.LoopNode} returns this
*/
proto.aggregator.LoopNode.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.LoopNode} returns this
 */
proto.aggregator.LoopNode.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.LoopNode.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
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
proto.aggregator.TaskNode.oneofGroups_ = [[10,11,12,13,14,15,16,17,18,19]];

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
  CUSTOM_CODE: 18,
  BALANCE: 19
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
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    ethTransfer: (f = msg.getEthTransfer()) && proto.aggregator.ETHTransferNode.toObject(includeInstance, f),
    contractWrite: (f = msg.getContractWrite()) && proto.aggregator.ContractWriteNode.toObject(includeInstance, f),
    contractRead: (f = msg.getContractRead()) && proto.aggregator.ContractReadNode.toObject(includeInstance, f),
    graphqlQuery: (f = msg.getGraphqlQuery()) && proto.aggregator.GraphQLQueryNode.toObject(includeInstance, f),
    restApi: (f = msg.getRestApi()) && proto.aggregator.RestAPINode.toObject(includeInstance, f),
    branch: (f = msg.getBranch()) && proto.aggregator.BranchNode.toObject(includeInstance, f),
    filter: (f = msg.getFilter()) && proto.aggregator.FilterNode.toObject(includeInstance, f),
    loop: (f = msg.getLoop()) && proto.aggregator.LoopNode.toObject(includeInstance, f),
    customCode: (f = msg.getCustomCode()) && proto.aggregator.CustomCodeNode.toObject(includeInstance, f),
    balance: (f = msg.getBalance()) && proto.aggregator.BalanceNode.toObject(includeInstance, f)
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
    case 1:
      var value = /** @type {!proto.aggregator.NodeType} */ (reader.readEnum());
      msg.setType(value);
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
    case 19:
      var value = new proto.aggregator.BalanceNode;
      reader.readMessage(value,proto.aggregator.BalanceNode.deserializeBinaryFromReader);
      msg.setBalance(value);
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
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
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
  f = message.getBalance();
  if (f != null) {
    writer.writeMessage(
      19,
      f,
      proto.aggregator.BalanceNode.serializeBinaryToWriter
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
 * optional NodeType type = 1;
 * @return {!proto.aggregator.NodeType}
 */
proto.aggregator.TaskNode.prototype.getType = function() {
  return /** @type {!proto.aggregator.NodeType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.aggregator.NodeType} value
 * @return {!proto.aggregator.TaskNode} returns this
 */
proto.aggregator.TaskNode.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
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
 * optional BalanceNode balance = 19;
 * @return {?proto.aggregator.BalanceNode}
 */
proto.aggregator.TaskNode.prototype.getBalance = function() {
  return /** @type{?proto.aggregator.BalanceNode} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.BalanceNode, 19));
};


/**
 * @param {?proto.aggregator.BalanceNode|undefined} value
 * @return {!proto.aggregator.TaskNode} returns this
*/
proto.aggregator.TaskNode.prototype.setBalance = function(value) {
  return jspb.Message.setOneofWrapperField(this, 19, proto.aggregator.TaskNode.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TaskNode} returns this
 */
proto.aggregator.TaskNode.prototype.clearBalance = function() {
  return this.setBalance(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TaskNode.prototype.hasBalance = function() {
  return jspb.Message.getField(this, 19) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.Execution.repeatedFields_ = [8];



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
    status: jspb.Message.getFieldWithDefault(msg, 4, 0),
    error: jspb.Message.getFieldWithDefault(msg, 5, ""),
    index: jspb.Message.getFieldWithDefault(msg, 6, 0),
    totalGasCost: jspb.Message.getFieldWithDefault(msg, 7, ""),
    stepsList: jspb.Message.toObjectList(msg.getStepsList(),
    proto.aggregator.Execution.Step.toObject, includeInstance)
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
      var value = /** @type {!proto.aggregator.ExecutionStatus} */ (reader.readEnum());
      msg.setStatus(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setError(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setIndex(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setTotalGasCost(value);
      break;
    case 8:
      var value = new proto.aggregator.Execution.Step;
      reader.readMessage(value,proto.aggregator.Execution.Step.deserializeBinaryFromReader);
      msg.addSteps(value);
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
  f = message.getStatus();
  if (f !== 0.0) {
    writer.writeEnum(
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
  f = message.getIndex();
  if (f !== 0) {
    writer.writeInt64(
      6,
      f
    );
  }
  f = message.getTotalGasCost();
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



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.Execution.Step.repeatedFields_ = [16];

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.aggregator.Execution.Step.oneofGroups_ = [[20,21,22,23,24,3,4,5,6,7,8,9,10,11,30]];

/**
 * @enum {number}
 */
proto.aggregator.Execution.Step.OutputDataCase = {
  OUTPUT_DATA_NOT_SET: 0,
  BLOCK_TRIGGER: 20,
  FIXED_TIME_TRIGGER: 21,
  CRON_TRIGGER: 22,
  EVENT_TRIGGER: 23,
  MANUAL_TRIGGER: 24,
  ETH_TRANSFER: 3,
  GRAPHQL: 4,
  CONTRACT_READ: 5,
  CONTRACT_WRITE: 6,
  CUSTOM_CODE: 7,
  REST_API: 8,
  BRANCH: 9,
  FILTER: 10,
  LOOP: 11,
  BALANCE: 30
};

/**
 * @return {proto.aggregator.Execution.Step.OutputDataCase}
 */
proto.aggregator.Execution.Step.prototype.getOutputDataCase = function() {
  return /** @type {proto.aggregator.Execution.Step.OutputDataCase} */(jspb.Message.computeOneofCase(this, proto.aggregator.Execution.Step.oneofGroups_[0]));
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
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    type: jspb.Message.getFieldWithDefault(msg, 17, ""),
    name: jspb.Message.getFieldWithDefault(msg, 18, ""),
    success: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    error: jspb.Message.getFieldWithDefault(msg, 13, ""),
    errorCode: jspb.Message.getFieldWithDefault(msg, 31, 0),
    log: jspb.Message.getFieldWithDefault(msg, 12, ""),
    inputsList: (f = jspb.Message.getRepeatedField(msg, 16)) == null ? undefined : f,
    config: (f = msg.getConfig()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f),
    metadata: (f = msg.getMetadata()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f),
    executionContext: (f = msg.getExecutionContext()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f),
    gasUsed: jspb.Message.getFieldWithDefault(msg, 27, ""),
    gasPrice: jspb.Message.getFieldWithDefault(msg, 28, ""),
    totalGasCost: jspb.Message.getFieldWithDefault(msg, 29, ""),
    blockTrigger: (f = msg.getBlockTrigger()) && proto.aggregator.BlockTrigger.Output.toObject(includeInstance, f),
    fixedTimeTrigger: (f = msg.getFixedTimeTrigger()) && proto.aggregator.FixedTimeTrigger.Output.toObject(includeInstance, f),
    cronTrigger: (f = msg.getCronTrigger()) && proto.aggregator.CronTrigger.Output.toObject(includeInstance, f),
    eventTrigger: (f = msg.getEventTrigger()) && proto.aggregator.EventTrigger.Output.toObject(includeInstance, f),
    manualTrigger: (f = msg.getManualTrigger()) && proto.aggregator.ManualTrigger.Output.toObject(includeInstance, f),
    ethTransfer: (f = msg.getEthTransfer()) && proto.aggregator.ETHTransferNode.Output.toObject(includeInstance, f),
    graphql: (f = msg.getGraphql()) && proto.aggregator.GraphQLQueryNode.Output.toObject(includeInstance, f),
    contractRead: (f = msg.getContractRead()) && proto.aggregator.ContractReadNode.Output.toObject(includeInstance, f),
    contractWrite: (f = msg.getContractWrite()) && proto.aggregator.ContractWriteNode.Output.toObject(includeInstance, f),
    customCode: (f = msg.getCustomCode()) && proto.aggregator.CustomCodeNode.Output.toObject(includeInstance, f),
    restApi: (f = msg.getRestApi()) && proto.aggregator.RestAPINode.Output.toObject(includeInstance, f),
    branch: (f = msg.getBranch()) && proto.aggregator.BranchNode.Output.toObject(includeInstance, f),
    filter: (f = msg.getFilter()) && proto.aggregator.FilterNode.Output.toObject(includeInstance, f),
    loop: (f = msg.getLoop()) && proto.aggregator.LoopNode.Output.toObject(includeInstance, f),
    balance: (f = msg.getBalance()) && proto.aggregator.BalanceNode.Output.toObject(includeInstance, f),
    startAt: jspb.Message.getFieldWithDefault(msg, 14, 0),
    endAt: jspb.Message.getFieldWithDefault(msg, 15, 0)
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
      msg.setId(value);
      break;
    case 17:
      var value = /** @type {string} */ (reader.readString());
      msg.setType(value);
      break;
    case 18:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 13:
      var value = /** @type {string} */ (reader.readString());
      msg.setError(value);
      break;
    case 31:
      var value = /** @type {!proto.aggregator.ErrorCode} */ (reader.readEnum());
      msg.setErrorCode(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setLog(value);
      break;
    case 16:
      var value = /** @type {string} */ (reader.readString());
      msg.addInputs(value);
      break;
    case 19:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setConfig(value);
      break;
    case 25:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setMetadata(value);
      break;
    case 26:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setExecutionContext(value);
      break;
    case 27:
      var value = /** @type {string} */ (reader.readString());
      msg.setGasUsed(value);
      break;
    case 28:
      var value = /** @type {string} */ (reader.readString());
      msg.setGasPrice(value);
      break;
    case 29:
      var value = /** @type {string} */ (reader.readString());
      msg.setTotalGasCost(value);
      break;
    case 20:
      var value = new proto.aggregator.BlockTrigger.Output;
      reader.readMessage(value,proto.aggregator.BlockTrigger.Output.deserializeBinaryFromReader);
      msg.setBlockTrigger(value);
      break;
    case 21:
      var value = new proto.aggregator.FixedTimeTrigger.Output;
      reader.readMessage(value,proto.aggregator.FixedTimeTrigger.Output.deserializeBinaryFromReader);
      msg.setFixedTimeTrigger(value);
      break;
    case 22:
      var value = new proto.aggregator.CronTrigger.Output;
      reader.readMessage(value,proto.aggregator.CronTrigger.Output.deserializeBinaryFromReader);
      msg.setCronTrigger(value);
      break;
    case 23:
      var value = new proto.aggregator.EventTrigger.Output;
      reader.readMessage(value,proto.aggregator.EventTrigger.Output.deserializeBinaryFromReader);
      msg.setEventTrigger(value);
      break;
    case 24:
      var value = new proto.aggregator.ManualTrigger.Output;
      reader.readMessage(value,proto.aggregator.ManualTrigger.Output.deserializeBinaryFromReader);
      msg.setManualTrigger(value);
      break;
    case 3:
      var value = new proto.aggregator.ETHTransferNode.Output;
      reader.readMessage(value,proto.aggregator.ETHTransferNode.Output.deserializeBinaryFromReader);
      msg.setEthTransfer(value);
      break;
    case 4:
      var value = new proto.aggregator.GraphQLQueryNode.Output;
      reader.readMessage(value,proto.aggregator.GraphQLQueryNode.Output.deserializeBinaryFromReader);
      msg.setGraphql(value);
      break;
    case 5:
      var value = new proto.aggregator.ContractReadNode.Output;
      reader.readMessage(value,proto.aggregator.ContractReadNode.Output.deserializeBinaryFromReader);
      msg.setContractRead(value);
      break;
    case 6:
      var value = new proto.aggregator.ContractWriteNode.Output;
      reader.readMessage(value,proto.aggregator.ContractWriteNode.Output.deserializeBinaryFromReader);
      msg.setContractWrite(value);
      break;
    case 7:
      var value = new proto.aggregator.CustomCodeNode.Output;
      reader.readMessage(value,proto.aggregator.CustomCodeNode.Output.deserializeBinaryFromReader);
      msg.setCustomCode(value);
      break;
    case 8:
      var value = new proto.aggregator.RestAPINode.Output;
      reader.readMessage(value,proto.aggregator.RestAPINode.Output.deserializeBinaryFromReader);
      msg.setRestApi(value);
      break;
    case 9:
      var value = new proto.aggregator.BranchNode.Output;
      reader.readMessage(value,proto.aggregator.BranchNode.Output.deserializeBinaryFromReader);
      msg.setBranch(value);
      break;
    case 10:
      var value = new proto.aggregator.FilterNode.Output;
      reader.readMessage(value,proto.aggregator.FilterNode.Output.deserializeBinaryFromReader);
      msg.setFilter(value);
      break;
    case 11:
      var value = new proto.aggregator.LoopNode.Output;
      reader.readMessage(value,proto.aggregator.LoopNode.Output.deserializeBinaryFromReader);
      msg.setLoop(value);
      break;
    case 30:
      var value = new proto.aggregator.BalanceNode.Output;
      reader.readMessage(value,proto.aggregator.BalanceNode.Output.deserializeBinaryFromReader);
      msg.setBalance(value);
      break;
    case 14:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setStartAt(value);
      break;
    case 15:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEndAt(value);
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
      17,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      18,
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
  f = message.getError();
  if (f.length > 0) {
    writer.writeString(
      13,
      f
    );
  }
  f = message.getErrorCode();
  if (f !== 0.0) {
    writer.writeEnum(
      31,
      f
    );
  }
  f = message.getLog();
  if (f.length > 0) {
    writer.writeString(
      12,
      f
    );
  }
  f = message.getInputsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      16,
      f
    );
  }
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      19,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
  f = message.getMetadata();
  if (f != null) {
    writer.writeMessage(
      25,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
  f = message.getExecutionContext();
  if (f != null) {
    writer.writeMessage(
      26,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
  f = message.getGasUsed();
  if (f.length > 0) {
    writer.writeString(
      27,
      f
    );
  }
  f = message.getGasPrice();
  if (f.length > 0) {
    writer.writeString(
      28,
      f
    );
  }
  f = message.getTotalGasCost();
  if (f.length > 0) {
    writer.writeString(
      29,
      f
    );
  }
  f = message.getBlockTrigger();
  if (f != null) {
    writer.writeMessage(
      20,
      f,
      proto.aggregator.BlockTrigger.Output.serializeBinaryToWriter
    );
  }
  f = message.getFixedTimeTrigger();
  if (f != null) {
    writer.writeMessage(
      21,
      f,
      proto.aggregator.FixedTimeTrigger.Output.serializeBinaryToWriter
    );
  }
  f = message.getCronTrigger();
  if (f != null) {
    writer.writeMessage(
      22,
      f,
      proto.aggregator.CronTrigger.Output.serializeBinaryToWriter
    );
  }
  f = message.getEventTrigger();
  if (f != null) {
    writer.writeMessage(
      23,
      f,
      proto.aggregator.EventTrigger.Output.serializeBinaryToWriter
    );
  }
  f = message.getManualTrigger();
  if (f != null) {
    writer.writeMessage(
      24,
      f,
      proto.aggregator.ManualTrigger.Output.serializeBinaryToWriter
    );
  }
  f = message.getEthTransfer();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.aggregator.ETHTransferNode.Output.serializeBinaryToWriter
    );
  }
  f = message.getGraphql();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.aggregator.GraphQLQueryNode.Output.serializeBinaryToWriter
    );
  }
  f = message.getContractRead();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.aggregator.ContractReadNode.Output.serializeBinaryToWriter
    );
  }
  f = message.getContractWrite();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.aggregator.ContractWriteNode.Output.serializeBinaryToWriter
    );
  }
  f = message.getCustomCode();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.aggregator.CustomCodeNode.Output.serializeBinaryToWriter
    );
  }
  f = message.getRestApi();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.aggregator.RestAPINode.Output.serializeBinaryToWriter
    );
  }
  f = message.getBranch();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.aggregator.BranchNode.Output.serializeBinaryToWriter
    );
  }
  f = message.getFilter();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.aggregator.FilterNode.Output.serializeBinaryToWriter
    );
  }
  f = message.getLoop();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      proto.aggregator.LoopNode.Output.serializeBinaryToWriter
    );
  }
  f = message.getBalance();
  if (f != null) {
    writer.writeMessage(
      30,
      f,
      proto.aggregator.BalanceNode.Output.serializeBinaryToWriter
    );
  }
  f = message.getStartAt();
  if (f !== 0) {
    writer.writeInt64(
      14,
      f
    );
  }
  f = message.getEndAt();
  if (f !== 0) {
    writer.writeInt64(
      15,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.aggregator.Execution.Step.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string type = 17;
 * @return {string}
 */
proto.aggregator.Execution.Step.prototype.getType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 17, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setType = function(value) {
  return jspb.Message.setProto3StringField(this, 17, value);
};


/**
 * optional string name = 18;
 * @return {string}
 */
proto.aggregator.Execution.Step.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 18, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 18, value);
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
 * optional string error = 13;
 * @return {string}
 */
proto.aggregator.Execution.Step.prototype.getError = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 13, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setError = function(value) {
  return jspb.Message.setProto3StringField(this, 13, value);
};


/**
 * optional ErrorCode error_code = 31;
 * @return {!proto.aggregator.ErrorCode}
 */
proto.aggregator.Execution.Step.prototype.getErrorCode = function() {
  return /** @type {!proto.aggregator.ErrorCode} */ (jspb.Message.getFieldWithDefault(this, 31, 0));
};


/**
 * @param {!proto.aggregator.ErrorCode} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setErrorCode = function(value) {
  return jspb.Message.setProto3EnumField(this, 31, value);
};


/**
 * optional string log = 12;
 * @return {string}
 */
proto.aggregator.Execution.Step.prototype.getLog = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setLog = function(value) {
  return jspb.Message.setProto3StringField(this, 12, value);
};


/**
 * repeated string inputs = 16;
 * @return {!Array<string>}
 */
proto.aggregator.Execution.Step.prototype.getInputsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 16));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setInputsList = function(value) {
  return jspb.Message.setField(this, 16, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.addInputs = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 16, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearInputsList = function() {
  return this.setInputsList([]);
};


/**
 * optional google.protobuf.Value config = 19;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.Execution.Step.prototype.getConfig = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 19));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.Execution.Step} returns this
*/
proto.aggregator.Execution.Step.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 19, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 19) != null;
};


/**
 * optional google.protobuf.Value metadata = 25;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.Execution.Step.prototype.getMetadata = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 25));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.Execution.Step} returns this
*/
proto.aggregator.Execution.Step.prototype.setMetadata = function(value) {
  return jspb.Message.setWrapperField(this, 25, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearMetadata = function() {
  return this.setMetadata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.hasMetadata = function() {
  return jspb.Message.getField(this, 25) != null;
};


/**
 * optional google.protobuf.Value execution_context = 26;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.Execution.Step.prototype.getExecutionContext = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 26));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.Execution.Step} returns this
*/
proto.aggregator.Execution.Step.prototype.setExecutionContext = function(value) {
  return jspb.Message.setWrapperField(this, 26, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearExecutionContext = function() {
  return this.setExecutionContext(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.hasExecutionContext = function() {
  return jspb.Message.getField(this, 26) != null;
};


/**
 * optional string gas_used = 27;
 * @return {string}
 */
proto.aggregator.Execution.Step.prototype.getGasUsed = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 27, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setGasUsed = function(value) {
  return jspb.Message.setProto3StringField(this, 27, value);
};


/**
 * optional string gas_price = 28;
 * @return {string}
 */
proto.aggregator.Execution.Step.prototype.getGasPrice = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 28, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setGasPrice = function(value) {
  return jspb.Message.setProto3StringField(this, 28, value);
};


/**
 * optional string total_gas_cost = 29;
 * @return {string}
 */
proto.aggregator.Execution.Step.prototype.getTotalGasCost = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 29, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setTotalGasCost = function(value) {
  return jspb.Message.setProto3StringField(this, 29, value);
};


/**
 * optional BlockTrigger.Output block_trigger = 20;
 * @return {?proto.aggregator.BlockTrigger.Output}
 */
proto.aggregator.Execution.Step.prototype.getBlockTrigger = function() {
  return /** @type{?proto.aggregator.BlockTrigger.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.BlockTrigger.Output, 20));
};


/**
 * @param {?proto.aggregator.BlockTrigger.Output|undefined} value
 * @return {!proto.aggregator.Execution.Step} returns this
*/
proto.aggregator.Execution.Step.prototype.setBlockTrigger = function(value) {
  return jspb.Message.setOneofWrapperField(this, 20, proto.aggregator.Execution.Step.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearBlockTrigger = function() {
  return this.setBlockTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.hasBlockTrigger = function() {
  return jspb.Message.getField(this, 20) != null;
};


/**
 * optional FixedTimeTrigger.Output fixed_time_trigger = 21;
 * @return {?proto.aggregator.FixedTimeTrigger.Output}
 */
proto.aggregator.Execution.Step.prototype.getFixedTimeTrigger = function() {
  return /** @type{?proto.aggregator.FixedTimeTrigger.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FixedTimeTrigger.Output, 21));
};


/**
 * @param {?proto.aggregator.FixedTimeTrigger.Output|undefined} value
 * @return {!proto.aggregator.Execution.Step} returns this
*/
proto.aggregator.Execution.Step.prototype.setFixedTimeTrigger = function(value) {
  return jspb.Message.setOneofWrapperField(this, 21, proto.aggregator.Execution.Step.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearFixedTimeTrigger = function() {
  return this.setFixedTimeTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.hasFixedTimeTrigger = function() {
  return jspb.Message.getField(this, 21) != null;
};


/**
 * optional CronTrigger.Output cron_trigger = 22;
 * @return {?proto.aggregator.CronTrigger.Output}
 */
proto.aggregator.Execution.Step.prototype.getCronTrigger = function() {
  return /** @type{?proto.aggregator.CronTrigger.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.CronTrigger.Output, 22));
};


/**
 * @param {?proto.aggregator.CronTrigger.Output|undefined} value
 * @return {!proto.aggregator.Execution.Step} returns this
*/
proto.aggregator.Execution.Step.prototype.setCronTrigger = function(value) {
  return jspb.Message.setOneofWrapperField(this, 22, proto.aggregator.Execution.Step.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearCronTrigger = function() {
  return this.setCronTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.hasCronTrigger = function() {
  return jspb.Message.getField(this, 22) != null;
};


/**
 * optional EventTrigger.Output event_trigger = 23;
 * @return {?proto.aggregator.EventTrigger.Output}
 */
proto.aggregator.Execution.Step.prototype.getEventTrigger = function() {
  return /** @type{?proto.aggregator.EventTrigger.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.EventTrigger.Output, 23));
};


/**
 * @param {?proto.aggregator.EventTrigger.Output|undefined} value
 * @return {!proto.aggregator.Execution.Step} returns this
*/
proto.aggregator.Execution.Step.prototype.setEventTrigger = function(value) {
  return jspb.Message.setOneofWrapperField(this, 23, proto.aggregator.Execution.Step.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearEventTrigger = function() {
  return this.setEventTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.hasEventTrigger = function() {
  return jspb.Message.getField(this, 23) != null;
};


/**
 * optional ManualTrigger.Output manual_trigger = 24;
 * @return {?proto.aggregator.ManualTrigger.Output}
 */
proto.aggregator.Execution.Step.prototype.getManualTrigger = function() {
  return /** @type{?proto.aggregator.ManualTrigger.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ManualTrigger.Output, 24));
};


/**
 * @param {?proto.aggregator.ManualTrigger.Output|undefined} value
 * @return {!proto.aggregator.Execution.Step} returns this
*/
proto.aggregator.Execution.Step.prototype.setManualTrigger = function(value) {
  return jspb.Message.setOneofWrapperField(this, 24, proto.aggregator.Execution.Step.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearManualTrigger = function() {
  return this.setManualTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.hasManualTrigger = function() {
  return jspb.Message.getField(this, 24) != null;
};


/**
 * optional ETHTransferNode.Output eth_transfer = 3;
 * @return {?proto.aggregator.ETHTransferNode.Output}
 */
proto.aggregator.Execution.Step.prototype.getEthTransfer = function() {
  return /** @type{?proto.aggregator.ETHTransferNode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ETHTransferNode.Output, 3));
};


/**
 * @param {?proto.aggregator.ETHTransferNode.Output|undefined} value
 * @return {!proto.aggregator.Execution.Step} returns this
*/
proto.aggregator.Execution.Step.prototype.setEthTransfer = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.aggregator.Execution.Step.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearEthTransfer = function() {
  return this.setEthTransfer(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.hasEthTransfer = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional GraphQLQueryNode.Output graphql = 4;
 * @return {?proto.aggregator.GraphQLQueryNode.Output}
 */
proto.aggregator.Execution.Step.prototype.getGraphql = function() {
  return /** @type{?proto.aggregator.GraphQLQueryNode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.GraphQLQueryNode.Output, 4));
};


/**
 * @param {?proto.aggregator.GraphQLQueryNode.Output|undefined} value
 * @return {!proto.aggregator.Execution.Step} returns this
*/
proto.aggregator.Execution.Step.prototype.setGraphql = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.aggregator.Execution.Step.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearGraphql = function() {
  return this.setGraphql(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.hasGraphql = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional ContractReadNode.Output contract_read = 5;
 * @return {?proto.aggregator.ContractReadNode.Output}
 */
proto.aggregator.Execution.Step.prototype.getContractRead = function() {
  return /** @type{?proto.aggregator.ContractReadNode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ContractReadNode.Output, 5));
};


/**
 * @param {?proto.aggregator.ContractReadNode.Output|undefined} value
 * @return {!proto.aggregator.Execution.Step} returns this
*/
proto.aggregator.Execution.Step.prototype.setContractRead = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.aggregator.Execution.Step.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearContractRead = function() {
  return this.setContractRead(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.hasContractRead = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional ContractWriteNode.Output contract_write = 6;
 * @return {?proto.aggregator.ContractWriteNode.Output}
 */
proto.aggregator.Execution.Step.prototype.getContractWrite = function() {
  return /** @type{?proto.aggregator.ContractWriteNode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ContractWriteNode.Output, 6));
};


/**
 * @param {?proto.aggregator.ContractWriteNode.Output|undefined} value
 * @return {!proto.aggregator.Execution.Step} returns this
*/
proto.aggregator.Execution.Step.prototype.setContractWrite = function(value) {
  return jspb.Message.setOneofWrapperField(this, 6, proto.aggregator.Execution.Step.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearContractWrite = function() {
  return this.setContractWrite(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.hasContractWrite = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional CustomCodeNode.Output custom_code = 7;
 * @return {?proto.aggregator.CustomCodeNode.Output}
 */
proto.aggregator.Execution.Step.prototype.getCustomCode = function() {
  return /** @type{?proto.aggregator.CustomCodeNode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.CustomCodeNode.Output, 7));
};


/**
 * @param {?proto.aggregator.CustomCodeNode.Output|undefined} value
 * @return {!proto.aggregator.Execution.Step} returns this
*/
proto.aggregator.Execution.Step.prototype.setCustomCode = function(value) {
  return jspb.Message.setOneofWrapperField(this, 7, proto.aggregator.Execution.Step.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearCustomCode = function() {
  return this.setCustomCode(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.hasCustomCode = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional RestAPINode.Output rest_api = 8;
 * @return {?proto.aggregator.RestAPINode.Output}
 */
proto.aggregator.Execution.Step.prototype.getRestApi = function() {
  return /** @type{?proto.aggregator.RestAPINode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.RestAPINode.Output, 8));
};


/**
 * @param {?proto.aggregator.RestAPINode.Output|undefined} value
 * @return {!proto.aggregator.Execution.Step} returns this
*/
proto.aggregator.Execution.Step.prototype.setRestApi = function(value) {
  return jspb.Message.setOneofWrapperField(this, 8, proto.aggregator.Execution.Step.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearRestApi = function() {
  return this.setRestApi(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.hasRestApi = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional BranchNode.Output branch = 9;
 * @return {?proto.aggregator.BranchNode.Output}
 */
proto.aggregator.Execution.Step.prototype.getBranch = function() {
  return /** @type{?proto.aggregator.BranchNode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.BranchNode.Output, 9));
};


/**
 * @param {?proto.aggregator.BranchNode.Output|undefined} value
 * @return {!proto.aggregator.Execution.Step} returns this
*/
proto.aggregator.Execution.Step.prototype.setBranch = function(value) {
  return jspb.Message.setOneofWrapperField(this, 9, proto.aggregator.Execution.Step.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearBranch = function() {
  return this.setBranch(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.hasBranch = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional FilterNode.Output filter = 10;
 * @return {?proto.aggregator.FilterNode.Output}
 */
proto.aggregator.Execution.Step.prototype.getFilter = function() {
  return /** @type{?proto.aggregator.FilterNode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FilterNode.Output, 10));
};


/**
 * @param {?proto.aggregator.FilterNode.Output|undefined} value
 * @return {!proto.aggregator.Execution.Step} returns this
*/
proto.aggregator.Execution.Step.prototype.setFilter = function(value) {
  return jspb.Message.setOneofWrapperField(this, 10, proto.aggregator.Execution.Step.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearFilter = function() {
  return this.setFilter(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.hasFilter = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional LoopNode.Output loop = 11;
 * @return {?proto.aggregator.LoopNode.Output}
 */
proto.aggregator.Execution.Step.prototype.getLoop = function() {
  return /** @type{?proto.aggregator.LoopNode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.LoopNode.Output, 11));
};


/**
 * @param {?proto.aggregator.LoopNode.Output|undefined} value
 * @return {!proto.aggregator.Execution.Step} returns this
*/
proto.aggregator.Execution.Step.prototype.setLoop = function(value) {
  return jspb.Message.setOneofWrapperField(this, 11, proto.aggregator.Execution.Step.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearLoop = function() {
  return this.setLoop(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.hasLoop = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional BalanceNode.Output balance = 30;
 * @return {?proto.aggregator.BalanceNode.Output}
 */
proto.aggregator.Execution.Step.prototype.getBalance = function() {
  return /** @type{?proto.aggregator.BalanceNode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.BalanceNode.Output, 30));
};


/**
 * @param {?proto.aggregator.BalanceNode.Output|undefined} value
 * @return {!proto.aggregator.Execution.Step} returns this
*/
proto.aggregator.Execution.Step.prototype.setBalance = function(value) {
  return jspb.Message.setOneofWrapperField(this, 30, proto.aggregator.Execution.Step.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.clearBalance = function() {
  return this.setBalance(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.Execution.Step.prototype.hasBalance = function() {
  return jspb.Message.getField(this, 30) != null;
};


/**
 * optional int64 start_at = 14;
 * @return {number}
 */
proto.aggregator.Execution.Step.prototype.getStartAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 14, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setStartAt = function(value) {
  return jspb.Message.setProto3IntField(this, 14, value);
};


/**
 * optional int64 end_at = 15;
 * @return {number}
 */
proto.aggregator.Execution.Step.prototype.getEndAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 15, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Execution.Step} returns this
 */
proto.aggregator.Execution.Step.prototype.setEndAt = function(value) {
  return jspb.Message.setProto3IntField(this, 15, value);
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
 * optional ExecutionStatus status = 4;
 * @return {!proto.aggregator.ExecutionStatus}
 */
proto.aggregator.Execution.prototype.getStatus = function() {
  return /** @type {!proto.aggregator.ExecutionStatus} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.aggregator.ExecutionStatus} value
 * @return {!proto.aggregator.Execution} returns this
 */
proto.aggregator.Execution.prototype.setStatus = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
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
 * optional int64 index = 6;
 * @return {number}
 */
proto.aggregator.Execution.prototype.getIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Execution} returns this
 */
proto.aggregator.Execution.prototype.setIndex = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional string total_gas_cost = 7;
 * @return {string}
 */
proto.aggregator.Execution.prototype.getTotalGasCost = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Execution} returns this
 */
proto.aggregator.Execution.prototype.setTotalGasCost = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
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
    executionCount: jspb.Message.getFieldWithDefault(msg, 9, 0),
    lastRanAt: jspb.Message.getFieldWithDefault(msg, 10, 0),
    status: jspb.Message.getFieldWithDefault(msg, 11, 0),
    trigger: (f = msg.getTrigger()) && proto.aggregator.TaskTrigger.toObject(includeInstance, f),
    nodesList: jspb.Message.toObjectList(msg.getNodesList(),
    proto.aggregator.TaskNode.toObject, includeInstance),
    edgesList: jspb.Message.toObjectList(msg.getEdgesList(),
    proto.aggregator.TaskEdge.toObject, includeInstance),
    inputVariablesMap: (f = msg.getInputVariablesMap()) ? f.toObject(includeInstance, proto.google.protobuf.Value.toObject) : []
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
      msg.setExecutionCount(value);
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
    case 15:
      var value = msg.getInputVariablesMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.google.protobuf.Value.deserializeBinaryFromReader, "", new proto.google.protobuf.Value());
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
  f = message.getExecutionCount();
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
  f = message.getInputVariablesMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(15, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.google.protobuf.Value.serializeBinaryToWriter);
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
 * optional int64 execution_count = 9;
 * @return {number}
 */
proto.aggregator.Task.prototype.getExecutionCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Task} returns this
 */
proto.aggregator.Task.prototype.setExecutionCount = function(value) {
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
 * map<string, google.protobuf.Value> input_variables = 15;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.google.protobuf.Value>}
 */
proto.aggregator.Task.prototype.getInputVariablesMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.google.protobuf.Value>} */ (
      jspb.Message.getMapField(this, 15, opt_noLazyCreate,
      proto.google.protobuf.Value));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.aggregator.Task} returns this
 */
proto.aggregator.Task.prototype.clearInputVariablesMap = function() {
  this.getInputVariablesMap().clear();
  return this;};



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
    proto.aggregator.TaskEdge.toObject, includeInstance),
    inputVariablesMap: (f = msg.getInputVariablesMap()) ? f.toObject(includeInstance, proto.google.protobuf.Value.toObject) : []
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
    case 9:
      var value = msg.getInputVariablesMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.google.protobuf.Value.deserializeBinaryFromReader, "", new proto.google.protobuf.Value());
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
  f = message.getInputVariablesMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(9, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.google.protobuf.Value.serializeBinaryToWriter);
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


/**
 * map<string, google.protobuf.Value> input_variables = 9;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.google.protobuf.Value>}
 */
proto.aggregator.CreateTaskReq.prototype.getInputVariablesMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.google.protobuf.Value>} */ (
      jspb.Message.getMapField(this, 9, opt_noLazyCreate,
      proto.google.protobuf.Value));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.aggregator.CreateTaskReq} returns this
 */
proto.aggregator.CreateTaskReq.prototype.clearInputVariablesMap = function() {
  this.getInputVariablesMap().clear();
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
    factory: jspb.Message.getFieldWithDefault(msg, 3, ""),
    isHidden: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
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
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsHidden(value);
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
  f = message.getIsHidden();
  if (f) {
    writer.writeBool(
      4,
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
 * optional bool is_hidden = 4;
 * @return {boolean}
 */
proto.aggregator.SmartWallet.prototype.getIsHidden = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.SmartWallet} returns this
 */
proto.aggregator.SmartWallet.prototype.setIsHidden = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
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
    before: jspb.Message.getFieldWithDefault(msg, 2, ""),
    after: jspb.Message.getFieldWithDefault(msg, 3, ""),
    limit: jspb.Message.getFieldWithDefault(msg, 4, 0),
    includeNodes: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    includeEdges: jspb.Message.getBooleanFieldWithDefault(msg, 6, false)
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
      msg.setBefore(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setAfter(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLimit(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIncludeNodes(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIncludeEdges(value);
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
  f = message.getBefore();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getAfter();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getLimit();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getIncludeNodes();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getIncludeEdges();
  if (f) {
    writer.writeBool(
      6,
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
 * optional string before = 2;
 * @return {string}
 */
proto.aggregator.ListTasksReq.prototype.getBefore = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListTasksReq} returns this
 */
proto.aggregator.ListTasksReq.prototype.setBefore = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string after = 3;
 * @return {string}
 */
proto.aggregator.ListTasksReq.prototype.getAfter = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListTasksReq} returns this
 */
proto.aggregator.ListTasksReq.prototype.setAfter = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int64 limit = 4;
 * @return {number}
 */
proto.aggregator.ListTasksReq.prototype.getLimit = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.ListTasksReq} returns this
 */
proto.aggregator.ListTasksReq.prototype.setLimit = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional bool include_nodes = 5;
 * @return {boolean}
 */
proto.aggregator.ListTasksReq.prototype.getIncludeNodes = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.ListTasksReq} returns this
 */
proto.aggregator.ListTasksReq.prototype.setIncludeNodes = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional bool include_edges = 6;
 * @return {boolean}
 */
proto.aggregator.ListTasksReq.prototype.getIncludeEdges = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.ListTasksReq} returns this
 */
proto.aggregator.ListTasksReq.prototype.setIncludeEdges = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
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
    proto.aggregator.Task.toObject, includeInstance),
    pageInfo: (f = msg.getPageInfo()) && proto.aggregator.PageInfo.toObject(includeInstance, f)
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
      var value = new proto.aggregator.Task;
      reader.readMessage(value,proto.aggregator.Task.deserializeBinaryFromReader);
      msg.addItems(value);
      break;
    case 2:
      var value = new proto.aggregator.PageInfo;
      reader.readMessage(value,proto.aggregator.PageInfo.deserializeBinaryFromReader);
      msg.setPageInfo(value);
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
      proto.aggregator.Task.serializeBinaryToWriter
    );
  }
  f = message.getPageInfo();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.aggregator.PageInfo.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Task items = 1;
 * @return {!Array<!proto.aggregator.Task>}
 */
proto.aggregator.ListTasksResp.prototype.getItemsList = function() {
  return /** @type{!Array<!proto.aggregator.Task>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.Task, 1));
};


/**
 * @param {!Array<!proto.aggregator.Task>} value
 * @return {!proto.aggregator.ListTasksResp} returns this
*/
proto.aggregator.ListTasksResp.prototype.setItemsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.aggregator.Task=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.Task}
 */
proto.aggregator.ListTasksResp.prototype.addItems = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.aggregator.Task, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.ListTasksResp} returns this
 */
proto.aggregator.ListTasksResp.prototype.clearItemsList = function() {
  return this.setItemsList([]);
};


/**
 * optional PageInfo page_info = 2;
 * @return {?proto.aggregator.PageInfo}
 */
proto.aggregator.ListTasksResp.prototype.getPageInfo = function() {
  return /** @type{?proto.aggregator.PageInfo} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.PageInfo, 2));
};


/**
 * @param {?proto.aggregator.PageInfo|undefined} value
 * @return {!proto.aggregator.ListTasksResp} returns this
*/
proto.aggregator.ListTasksResp.prototype.setPageInfo = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.ListTasksResp} returns this
 */
proto.aggregator.ListTasksResp.prototype.clearPageInfo = function() {
  return this.setPageInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ListTasksResp.prototype.hasPageInfo = function() {
  return jspb.Message.getField(this, 2) != null;
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
    before: jspb.Message.getFieldWithDefault(msg, 2, ""),
    after: jspb.Message.getFieldWithDefault(msg, 3, ""),
    limit: jspb.Message.getFieldWithDefault(msg, 4, 0)
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
      msg.setBefore(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setAfter(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLimit(value);
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
  f = message.getBefore();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getAfter();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getLimit();
  if (f !== 0) {
    writer.writeInt64(
      4,
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
 * optional string before = 2;
 * @return {string}
 */
proto.aggregator.ListExecutionsReq.prototype.getBefore = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListExecutionsReq} returns this
 */
proto.aggregator.ListExecutionsReq.prototype.setBefore = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string after = 3;
 * @return {string}
 */
proto.aggregator.ListExecutionsReq.prototype.getAfter = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListExecutionsReq} returns this
 */
proto.aggregator.ListExecutionsReq.prototype.setAfter = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int64 limit = 4;
 * @return {number}
 */
proto.aggregator.ListExecutionsReq.prototype.getLimit = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.ListExecutionsReq} returns this
 */
proto.aggregator.ListExecutionsReq.prototype.setLimit = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
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
    pageInfo: (f = msg.getPageInfo()) && proto.aggregator.PageInfo.toObject(includeInstance, f)
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
      var value = new proto.aggregator.PageInfo;
      reader.readMessage(value,proto.aggregator.PageInfo.deserializeBinaryFromReader);
      msg.setPageInfo(value);
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
  f = message.getPageInfo();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.aggregator.PageInfo.serializeBinaryToWriter
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
 * optional PageInfo page_info = 2;
 * @return {?proto.aggregator.PageInfo}
 */
proto.aggregator.ListExecutionsResp.prototype.getPageInfo = function() {
  return /** @type{?proto.aggregator.PageInfo} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.PageInfo, 2));
};


/**
 * @param {?proto.aggregator.PageInfo|undefined} value
 * @return {!proto.aggregator.ListExecutionsResp} returns this
*/
proto.aggregator.ListExecutionsResp.prototype.setPageInfo = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.ListExecutionsResp} returns this
 */
proto.aggregator.ListExecutionsResp.prototype.clearPageInfo = function() {
  return this.setPageInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ListExecutionsResp.prototype.hasPageInfo = function() {
  return jspb.Message.getField(this, 2) != null;
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
    message: jspb.Message.getFieldWithDefault(msg, 1, ""),
    signature: jspb.Message.getFieldWithDefault(msg, 2, "")
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
      msg.setMessage(value);
      break;
    case 2:
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
  f = message.getMessage();
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
};


/**
 * optional string message = 1;
 * @return {string}
 */
proto.aggregator.GetKeyReq.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GetKeyReq} returns this
 */
proto.aggregator.GetKeyReq.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string signature = 2;
 * @return {string}
 */
proto.aggregator.GetKeyReq.prototype.getSignature = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GetKeyReq} returns this
 */
proto.aggregator.GetKeyReq.prototype.setSignature = function(value) {
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
    address: jspb.Message.getFieldWithDefault(msg, 1, ""),
    key: jspb.Message.getFieldWithDefault(msg, 2, ""),
    message: jspb.Message.getFieldWithDefault(msg, 3, ""),
    expiry: jspb.Message.getFieldWithDefault(msg, 4, 0)
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
      msg.setAddress(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setKey(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setExpiry(value);
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
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getKey();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getExpiry();
  if (f !== 0) {
    writer.writeUint64(
      4,
      f
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.aggregator.KeyResp.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.KeyResp} returns this
 */
proto.aggregator.KeyResp.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string key = 2;
 * @return {string}
 */
proto.aggregator.KeyResp.prototype.getKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.KeyResp} returns this
 */
proto.aggregator.KeyResp.prototype.setKey = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message = 3;
 * @return {string}
 */
proto.aggregator.KeyResp.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.KeyResp} returns this
 */
proto.aggregator.KeyResp.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional uint64 expiry = 4;
 * @return {number}
 */
proto.aggregator.KeyResp.prototype.getExpiry = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.KeyResp} returns this
 */
proto.aggregator.KeyResp.prototype.setExpiry = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
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
    isHidden: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    totalTaskCount: jspb.Message.getFieldWithDefault(msg, 5, 0),
    activeTaskCount: jspb.Message.getFieldWithDefault(msg, 6, 0),
    completedTaskCount: jspb.Message.getFieldWithDefault(msg, 7, 0),
    failedTaskCount: jspb.Message.getFieldWithDefault(msg, 8, 0),
    canceledTaskCount: jspb.Message.getFieldWithDefault(msg, 9, 0)
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
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsHidden(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setTotalTaskCount(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setActiveTaskCount(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setCompletedTaskCount(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setFailedTaskCount(value);
      break;
    case 9:
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
  f = message.getIsHidden();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getTotalTaskCount();
  if (f !== 0) {
    writer.writeUint64(
      5,
      f
    );
  }
  f = message.getActiveTaskCount();
  if (f !== 0) {
    writer.writeUint64(
      6,
      f
    );
  }
  f = message.getCompletedTaskCount();
  if (f !== 0) {
    writer.writeUint64(
      7,
      f
    );
  }
  f = message.getFailedTaskCount();
  if (f !== 0) {
    writer.writeUint64(
      8,
      f
    );
  }
  f = message.getCanceledTaskCount();
  if (f !== 0) {
    writer.writeUint64(
      9,
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
 * optional bool is_hidden = 4;
 * @return {boolean}
 */
proto.aggregator.GetWalletResp.prototype.getIsHidden = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.GetWalletResp} returns this
 */
proto.aggregator.GetWalletResp.prototype.setIsHidden = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional uint64 total_task_count = 5;
 * @return {number}
 */
proto.aggregator.GetWalletResp.prototype.getTotalTaskCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.GetWalletResp} returns this
 */
proto.aggregator.GetWalletResp.prototype.setTotalTaskCount = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional uint64 active_task_count = 6;
 * @return {number}
 */
proto.aggregator.GetWalletResp.prototype.getActiveTaskCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.GetWalletResp} returns this
 */
proto.aggregator.GetWalletResp.prototype.setActiveTaskCount = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional uint64 completed_task_count = 7;
 * @return {number}
 */
proto.aggregator.GetWalletResp.prototype.getCompletedTaskCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.GetWalletResp} returns this
 */
proto.aggregator.GetWalletResp.prototype.setCompletedTaskCount = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional uint64 failed_task_count = 8;
 * @return {number}
 */
proto.aggregator.GetWalletResp.prototype.getFailedTaskCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.GetWalletResp} returns this
 */
proto.aggregator.GetWalletResp.prototype.setFailedTaskCount = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional uint64 canceled_task_count = 9;
 * @return {number}
 */
proto.aggregator.GetWalletResp.prototype.getCanceledTaskCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.GetWalletResp} returns this
 */
proto.aggregator.GetWalletResp.prototype.setCanceledTaskCount = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
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
proto.aggregator.SetWalletReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.SetWalletReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.SetWalletReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.SetWalletReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    salt: jspb.Message.getFieldWithDefault(msg, 1, ""),
    factoryAddress: jspb.Message.getFieldWithDefault(msg, 2, ""),
    isHidden: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
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
 * @return {!proto.aggregator.SetWalletReq}
 */
proto.aggregator.SetWalletReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.SetWalletReq;
  return proto.aggregator.SetWalletReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.SetWalletReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.SetWalletReq}
 */
proto.aggregator.SetWalletReq.deserializeBinaryFromReader = function(msg, reader) {
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
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsHidden(value);
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
proto.aggregator.SetWalletReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.SetWalletReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.SetWalletReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.SetWalletReq.serializeBinaryToWriter = function(message, writer) {
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
  f = message.getIsHidden();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional string salt = 1;
 * @return {string}
 */
proto.aggregator.SetWalletReq.prototype.getSalt = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.SetWalletReq} returns this
 */
proto.aggregator.SetWalletReq.prototype.setSalt = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string factory_address = 2;
 * @return {string}
 */
proto.aggregator.SetWalletReq.prototype.getFactoryAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.SetWalletReq} returns this
 */
proto.aggregator.SetWalletReq.prototype.setFactoryAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool is_hidden = 3;
 * @return {boolean}
 */
proto.aggregator.SetWalletReq.prototype.getIsHidden = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.SetWalletReq} returns this
 */
proto.aggregator.SetWalletReq.prototype.setIsHidden = function(value) {
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
proto.aggregator.WithdrawFundsReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.WithdrawFundsReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.WithdrawFundsReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.WithdrawFundsReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    recipientAddress: jspb.Message.getFieldWithDefault(msg, 1, ""),
    amount: jspb.Message.getFieldWithDefault(msg, 2, ""),
    token: jspb.Message.getFieldWithDefault(msg, 3, ""),
    smartWalletAddress: jspb.Message.getFieldWithDefault(msg, 4, "")
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
 * @return {!proto.aggregator.WithdrawFundsReq}
 */
proto.aggregator.WithdrawFundsReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.WithdrawFundsReq;
  return proto.aggregator.WithdrawFundsReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.WithdrawFundsReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.WithdrawFundsReq}
 */
proto.aggregator.WithdrawFundsReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setRecipientAddress(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setAmount(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setToken(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setSmartWalletAddress(value);
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
proto.aggregator.WithdrawFundsReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.WithdrawFundsReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.WithdrawFundsReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.WithdrawFundsReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRecipientAddress();
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
  f = message.getToken();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getSmartWalletAddress();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string recipient_address = 1;
 * @return {string}
 */
proto.aggregator.WithdrawFundsReq.prototype.getRecipientAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.WithdrawFundsReq} returns this
 */
proto.aggregator.WithdrawFundsReq.prototype.setRecipientAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string amount = 2;
 * @return {string}
 */
proto.aggregator.WithdrawFundsReq.prototype.getAmount = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.WithdrawFundsReq} returns this
 */
proto.aggregator.WithdrawFundsReq.prototype.setAmount = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string token = 3;
 * @return {string}
 */
proto.aggregator.WithdrawFundsReq.prototype.getToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.WithdrawFundsReq} returns this
 */
proto.aggregator.WithdrawFundsReq.prototype.setToken = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string smart_wallet_address = 4;
 * @return {string}
 */
proto.aggregator.WithdrawFundsReq.prototype.getSmartWalletAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.WithdrawFundsReq} returns this
 */
proto.aggregator.WithdrawFundsReq.prototype.setSmartWalletAddress = function(value) {
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
proto.aggregator.WithdrawFundsResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.WithdrawFundsResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.WithdrawFundsResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.WithdrawFundsResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    status: jspb.Message.getFieldWithDefault(msg, 2, ""),
    message: jspb.Message.getFieldWithDefault(msg, 3, ""),
    userOpHash: jspb.Message.getFieldWithDefault(msg, 4, ""),
    transactionHash: jspb.Message.getFieldWithDefault(msg, 5, ""),
    submittedAt: jspb.Message.getFieldWithDefault(msg, 6, 0),
    smartWalletAddress: jspb.Message.getFieldWithDefault(msg, 7, ""),
    recipientAddress: jspb.Message.getFieldWithDefault(msg, 8, ""),
    amount: jspb.Message.getFieldWithDefault(msg, 9, ""),
    token: jspb.Message.getFieldWithDefault(msg, 10, "")
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
 * @return {!proto.aggregator.WithdrawFundsResp}
 */
proto.aggregator.WithdrawFundsResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.WithdrawFundsResp;
  return proto.aggregator.WithdrawFundsResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.WithdrawFundsResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.WithdrawFundsResp}
 */
proto.aggregator.WithdrawFundsResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setStatus(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserOpHash(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setTransactionHash(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setSubmittedAt(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setSmartWalletAddress(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setRecipientAddress(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setAmount(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setToken(value);
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
proto.aggregator.WithdrawFundsResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.WithdrawFundsResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.WithdrawFundsResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.WithdrawFundsResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getStatus();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getUserOpHash();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getTransactionHash();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getSubmittedAt();
  if (f !== 0) {
    writer.writeInt64(
      6,
      f
    );
  }
  f = message.getSmartWalletAddress();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getRecipientAddress();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getAmount();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getToken();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.aggregator.WithdrawFundsResp.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.WithdrawFundsResp} returns this
 */
proto.aggregator.WithdrawFundsResp.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string status = 2;
 * @return {string}
 */
proto.aggregator.WithdrawFundsResp.prototype.getStatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.WithdrawFundsResp} returns this
 */
proto.aggregator.WithdrawFundsResp.prototype.setStatus = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message = 3;
 * @return {string}
 */
proto.aggregator.WithdrawFundsResp.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.WithdrawFundsResp} returns this
 */
proto.aggregator.WithdrawFundsResp.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string user_op_hash = 4;
 * @return {string}
 */
proto.aggregator.WithdrawFundsResp.prototype.getUserOpHash = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.WithdrawFundsResp} returns this
 */
proto.aggregator.WithdrawFundsResp.prototype.setUserOpHash = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string transaction_hash = 5;
 * @return {string}
 */
proto.aggregator.WithdrawFundsResp.prototype.getTransactionHash = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.WithdrawFundsResp} returns this
 */
proto.aggregator.WithdrawFundsResp.prototype.setTransactionHash = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional int64 submitted_at = 6;
 * @return {number}
 */
proto.aggregator.WithdrawFundsResp.prototype.getSubmittedAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.WithdrawFundsResp} returns this
 */
proto.aggregator.WithdrawFundsResp.prototype.setSubmittedAt = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional string smart_wallet_address = 7;
 * @return {string}
 */
proto.aggregator.WithdrawFundsResp.prototype.getSmartWalletAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.WithdrawFundsResp} returns this
 */
proto.aggregator.WithdrawFundsResp.prototype.setSmartWalletAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional string recipient_address = 8;
 * @return {string}
 */
proto.aggregator.WithdrawFundsResp.prototype.getRecipientAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.WithdrawFundsResp} returns this
 */
proto.aggregator.WithdrawFundsResp.prototype.setRecipientAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional string amount = 9;
 * @return {string}
 */
proto.aggregator.WithdrawFundsResp.prototype.getAmount = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.WithdrawFundsResp} returns this
 */
proto.aggregator.WithdrawFundsResp.prototype.setAmount = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};


/**
 * optional string token = 10;
 * @return {string}
 */
proto.aggregator.WithdrawFundsResp.prototype.getToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.WithdrawFundsResp} returns this
 */
proto.aggregator.WithdrawFundsResp.prototype.setToken = function(value) {
  return jspb.Message.setProto3StringField(this, 10, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.aggregator.TriggerTaskReq.oneofGroups_ = [[3,4,5,6,7]];

/**
 * @enum {number}
 */
proto.aggregator.TriggerTaskReq.TriggerOutputCase = {
  TRIGGER_OUTPUT_NOT_SET: 0,
  BLOCK_TRIGGER: 3,
  FIXED_TIME_TRIGGER: 4,
  CRON_TRIGGER: 5,
  EVENT_TRIGGER: 6,
  MANUAL_TRIGGER: 7
};

/**
 * @return {proto.aggregator.TriggerTaskReq.TriggerOutputCase}
 */
proto.aggregator.TriggerTaskReq.prototype.getTriggerOutputCase = function() {
  return /** @type {proto.aggregator.TriggerTaskReq.TriggerOutputCase} */(jspb.Message.computeOneofCase(this, proto.aggregator.TriggerTaskReq.oneofGroups_[0]));
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
proto.aggregator.TriggerTaskReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.TriggerTaskReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.TriggerTaskReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.TriggerTaskReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    taskId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    triggerType: jspb.Message.getFieldWithDefault(msg, 2, 0),
    blockTrigger: (f = msg.getBlockTrigger()) && proto.aggregator.BlockTrigger.Output.toObject(includeInstance, f),
    fixedTimeTrigger: (f = msg.getFixedTimeTrigger()) && proto.aggregator.FixedTimeTrigger.Output.toObject(includeInstance, f),
    cronTrigger: (f = msg.getCronTrigger()) && proto.aggregator.CronTrigger.Output.toObject(includeInstance, f),
    eventTrigger: (f = msg.getEventTrigger()) && proto.aggregator.EventTrigger.Output.toObject(includeInstance, f),
    manualTrigger: (f = msg.getManualTrigger()) && proto.aggregator.ManualTrigger.Output.toObject(includeInstance, f),
    isBlocking: jspb.Message.getBooleanFieldWithDefault(msg, 8, false)
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
 * @return {!proto.aggregator.TriggerTaskReq}
 */
proto.aggregator.TriggerTaskReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.TriggerTaskReq;
  return proto.aggregator.TriggerTaskReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.TriggerTaskReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.TriggerTaskReq}
 */
proto.aggregator.TriggerTaskReq.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {!proto.aggregator.TriggerType} */ (reader.readEnum());
      msg.setTriggerType(value);
      break;
    case 3:
      var value = new proto.aggregator.BlockTrigger.Output;
      reader.readMessage(value,proto.aggregator.BlockTrigger.Output.deserializeBinaryFromReader);
      msg.setBlockTrigger(value);
      break;
    case 4:
      var value = new proto.aggregator.FixedTimeTrigger.Output;
      reader.readMessage(value,proto.aggregator.FixedTimeTrigger.Output.deserializeBinaryFromReader);
      msg.setFixedTimeTrigger(value);
      break;
    case 5:
      var value = new proto.aggregator.CronTrigger.Output;
      reader.readMessage(value,proto.aggregator.CronTrigger.Output.deserializeBinaryFromReader);
      msg.setCronTrigger(value);
      break;
    case 6:
      var value = new proto.aggregator.EventTrigger.Output;
      reader.readMessage(value,proto.aggregator.EventTrigger.Output.deserializeBinaryFromReader);
      msg.setEventTrigger(value);
      break;
    case 7:
      var value = new proto.aggregator.ManualTrigger.Output;
      reader.readMessage(value,proto.aggregator.ManualTrigger.Output.deserializeBinaryFromReader);
      msg.setManualTrigger(value);
      break;
    case 8:
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
proto.aggregator.TriggerTaskReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.TriggerTaskReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.TriggerTaskReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.TriggerTaskReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTaskId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTriggerType();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getBlockTrigger();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.aggregator.BlockTrigger.Output.serializeBinaryToWriter
    );
  }
  f = message.getFixedTimeTrigger();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.aggregator.FixedTimeTrigger.Output.serializeBinaryToWriter
    );
  }
  f = message.getCronTrigger();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.aggregator.CronTrigger.Output.serializeBinaryToWriter
    );
  }
  f = message.getEventTrigger();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.aggregator.EventTrigger.Output.serializeBinaryToWriter
    );
  }
  f = message.getManualTrigger();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.aggregator.ManualTrigger.Output.serializeBinaryToWriter
    );
  }
  f = message.getIsBlocking();
  if (f) {
    writer.writeBool(
      8,
      f
    );
  }
};


/**
 * optional string task_id = 1;
 * @return {string}
 */
proto.aggregator.TriggerTaskReq.prototype.getTaskId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.TriggerTaskReq} returns this
 */
proto.aggregator.TriggerTaskReq.prototype.setTaskId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional TriggerType trigger_type = 2;
 * @return {!proto.aggregator.TriggerType}
 */
proto.aggregator.TriggerTaskReq.prototype.getTriggerType = function() {
  return /** @type {!proto.aggregator.TriggerType} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.aggregator.TriggerType} value
 * @return {!proto.aggregator.TriggerTaskReq} returns this
 */
proto.aggregator.TriggerTaskReq.prototype.setTriggerType = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional BlockTrigger.Output block_trigger = 3;
 * @return {?proto.aggregator.BlockTrigger.Output}
 */
proto.aggregator.TriggerTaskReq.prototype.getBlockTrigger = function() {
  return /** @type{?proto.aggregator.BlockTrigger.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.BlockTrigger.Output, 3));
};


/**
 * @param {?proto.aggregator.BlockTrigger.Output|undefined} value
 * @return {!proto.aggregator.TriggerTaskReq} returns this
*/
proto.aggregator.TriggerTaskReq.prototype.setBlockTrigger = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.aggregator.TriggerTaskReq.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TriggerTaskReq} returns this
 */
proto.aggregator.TriggerTaskReq.prototype.clearBlockTrigger = function() {
  return this.setBlockTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TriggerTaskReq.prototype.hasBlockTrigger = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional FixedTimeTrigger.Output fixed_time_trigger = 4;
 * @return {?proto.aggregator.FixedTimeTrigger.Output}
 */
proto.aggregator.TriggerTaskReq.prototype.getFixedTimeTrigger = function() {
  return /** @type{?proto.aggregator.FixedTimeTrigger.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FixedTimeTrigger.Output, 4));
};


/**
 * @param {?proto.aggregator.FixedTimeTrigger.Output|undefined} value
 * @return {!proto.aggregator.TriggerTaskReq} returns this
*/
proto.aggregator.TriggerTaskReq.prototype.setFixedTimeTrigger = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.aggregator.TriggerTaskReq.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TriggerTaskReq} returns this
 */
proto.aggregator.TriggerTaskReq.prototype.clearFixedTimeTrigger = function() {
  return this.setFixedTimeTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TriggerTaskReq.prototype.hasFixedTimeTrigger = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional CronTrigger.Output cron_trigger = 5;
 * @return {?proto.aggregator.CronTrigger.Output}
 */
proto.aggregator.TriggerTaskReq.prototype.getCronTrigger = function() {
  return /** @type{?proto.aggregator.CronTrigger.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.CronTrigger.Output, 5));
};


/**
 * @param {?proto.aggregator.CronTrigger.Output|undefined} value
 * @return {!proto.aggregator.TriggerTaskReq} returns this
*/
proto.aggregator.TriggerTaskReq.prototype.setCronTrigger = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.aggregator.TriggerTaskReq.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TriggerTaskReq} returns this
 */
proto.aggregator.TriggerTaskReq.prototype.clearCronTrigger = function() {
  return this.setCronTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TriggerTaskReq.prototype.hasCronTrigger = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional EventTrigger.Output event_trigger = 6;
 * @return {?proto.aggregator.EventTrigger.Output}
 */
proto.aggregator.TriggerTaskReq.prototype.getEventTrigger = function() {
  return /** @type{?proto.aggregator.EventTrigger.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.EventTrigger.Output, 6));
};


/**
 * @param {?proto.aggregator.EventTrigger.Output|undefined} value
 * @return {!proto.aggregator.TriggerTaskReq} returns this
*/
proto.aggregator.TriggerTaskReq.prototype.setEventTrigger = function(value) {
  return jspb.Message.setOneofWrapperField(this, 6, proto.aggregator.TriggerTaskReq.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TriggerTaskReq} returns this
 */
proto.aggregator.TriggerTaskReq.prototype.clearEventTrigger = function() {
  return this.setEventTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TriggerTaskReq.prototype.hasEventTrigger = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional ManualTrigger.Output manual_trigger = 7;
 * @return {?proto.aggregator.ManualTrigger.Output}
 */
proto.aggregator.TriggerTaskReq.prototype.getManualTrigger = function() {
  return /** @type{?proto.aggregator.ManualTrigger.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ManualTrigger.Output, 7));
};


/**
 * @param {?proto.aggregator.ManualTrigger.Output|undefined} value
 * @return {!proto.aggregator.TriggerTaskReq} returns this
*/
proto.aggregator.TriggerTaskReq.prototype.setManualTrigger = function(value) {
  return jspb.Message.setOneofWrapperField(this, 7, proto.aggregator.TriggerTaskReq.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.TriggerTaskReq} returns this
 */
proto.aggregator.TriggerTaskReq.prototype.clearManualTrigger = function() {
  return this.setManualTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TriggerTaskReq.prototype.hasManualTrigger = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional bool is_blocking = 8;
 * @return {boolean}
 */
proto.aggregator.TriggerTaskReq.prototype.getIsBlocking = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 8, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.TriggerTaskReq} returns this
 */
proto.aggregator.TriggerTaskReq.prototype.setIsBlocking = function(value) {
  return jspb.Message.setProto3BooleanField(this, 8, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.TriggerTaskResp.repeatedFields_ = [8];



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
proto.aggregator.TriggerTaskResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.TriggerTaskResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.TriggerTaskResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.TriggerTaskResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    executionId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    status: jspb.Message.getFieldWithDefault(msg, 2, 0),
    workflowId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    startAt: jspb.Message.getFieldWithDefault(msg, 4, 0),
    endAt: jspb.Message.getFieldWithDefault(msg, 5, 0),
    error: jspb.Message.getFieldWithDefault(msg, 7, ""),
    stepsList: jspb.Message.toObjectList(msg.getStepsList(),
    proto.aggregator.Execution.Step.toObject, includeInstance)
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
 * @return {!proto.aggregator.TriggerTaskResp}
 */
proto.aggregator.TriggerTaskResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.TriggerTaskResp;
  return proto.aggregator.TriggerTaskResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.TriggerTaskResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.TriggerTaskResp}
 */
proto.aggregator.TriggerTaskResp.deserializeBinaryFromReader = function(msg, reader) {
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
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setWorkflowId(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setStartAt(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEndAt(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setError(value);
      break;
    case 8:
      var value = new proto.aggregator.Execution.Step;
      reader.readMessage(value,proto.aggregator.Execution.Step.deserializeBinaryFromReader);
      msg.addSteps(value);
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
proto.aggregator.TriggerTaskResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.TriggerTaskResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.TriggerTaskResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.TriggerTaskResp.serializeBinaryToWriter = function(message, writer) {
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
  f = message.getWorkflowId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 7));
  if (f != null) {
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


/**
 * optional string execution_id = 1;
 * @return {string}
 */
proto.aggregator.TriggerTaskResp.prototype.getExecutionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.TriggerTaskResp} returns this
 */
proto.aggregator.TriggerTaskResp.prototype.setExecutionId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional ExecutionStatus status = 2;
 * @return {!proto.aggregator.ExecutionStatus}
 */
proto.aggregator.TriggerTaskResp.prototype.getStatus = function() {
  return /** @type {!proto.aggregator.ExecutionStatus} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.aggregator.ExecutionStatus} value
 * @return {!proto.aggregator.TriggerTaskResp} returns this
 */
proto.aggregator.TriggerTaskResp.prototype.setStatus = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional string workflow_id = 3;
 * @return {string}
 */
proto.aggregator.TriggerTaskResp.prototype.getWorkflowId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.TriggerTaskResp} returns this
 */
proto.aggregator.TriggerTaskResp.prototype.setWorkflowId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int64 start_at = 4;
 * @return {number}
 */
proto.aggregator.TriggerTaskResp.prototype.getStartAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.TriggerTaskResp} returns this
 */
proto.aggregator.TriggerTaskResp.prototype.setStartAt = function(value) {
  return jspb.Message.setField(this, 4, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.aggregator.TriggerTaskResp} returns this
 */
proto.aggregator.TriggerTaskResp.prototype.clearStartAt = function() {
  return jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TriggerTaskResp.prototype.hasStartAt = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional int64 end_at = 5;
 * @return {number}
 */
proto.aggregator.TriggerTaskResp.prototype.getEndAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.TriggerTaskResp} returns this
 */
proto.aggregator.TriggerTaskResp.prototype.setEndAt = function(value) {
  return jspb.Message.setField(this, 5, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.aggregator.TriggerTaskResp} returns this
 */
proto.aggregator.TriggerTaskResp.prototype.clearEndAt = function() {
  return jspb.Message.setField(this, 5, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TriggerTaskResp.prototype.hasEndAt = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional string error = 7;
 * @return {string}
 */
proto.aggregator.TriggerTaskResp.prototype.getError = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.TriggerTaskResp} returns this
 */
proto.aggregator.TriggerTaskResp.prototype.setError = function(value) {
  return jspb.Message.setField(this, 7, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.aggregator.TriggerTaskResp} returns this
 */
proto.aggregator.TriggerTaskResp.prototype.clearError = function() {
  return jspb.Message.setField(this, 7, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.TriggerTaskResp.prototype.hasError = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * repeated Execution.Step steps = 8;
 * @return {!Array<!proto.aggregator.Execution.Step>}
 */
proto.aggregator.TriggerTaskResp.prototype.getStepsList = function() {
  return /** @type{!Array<!proto.aggregator.Execution.Step>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.Execution.Step, 8));
};


/**
 * @param {!Array<!proto.aggregator.Execution.Step>} value
 * @return {!proto.aggregator.TriggerTaskResp} returns this
*/
proto.aggregator.TriggerTaskResp.prototype.setStepsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.aggregator.Execution.Step=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.Execution.Step}
 */
proto.aggregator.TriggerTaskResp.prototype.addSteps = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.aggregator.Execution.Step, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.TriggerTaskResp} returns this
 */
proto.aggregator.TriggerTaskResp.prototype.clearStepsList = function() {
  return this.setStepsList([]);
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
    workflowId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    before: jspb.Message.getFieldWithDefault(msg, 2, ""),
    after: jspb.Message.getFieldWithDefault(msg, 3, ""),
    limit: jspb.Message.getFieldWithDefault(msg, 4, 0),
    includeTimestamps: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    includeCreatedBy: jspb.Message.getBooleanFieldWithDefault(msg, 6, false),
    includeDescription: jspb.Message.getBooleanFieldWithDefault(msg, 7, false)
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
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setBefore(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setAfter(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLimit(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIncludeTimestamps(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIncludeCreatedBy(value);
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIncludeDescription(value);
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
  f = message.getBefore();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getAfter();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getLimit();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getIncludeTimestamps();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getIncludeCreatedBy();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
  f = message.getIncludeDescription();
  if (f) {
    writer.writeBool(
      7,
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
 * optional string before = 2;
 * @return {string}
 */
proto.aggregator.ListSecretsReq.prototype.getBefore = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListSecretsReq} returns this
 */
proto.aggregator.ListSecretsReq.prototype.setBefore = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string after = 3;
 * @return {string}
 */
proto.aggregator.ListSecretsReq.prototype.getAfter = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.ListSecretsReq} returns this
 */
proto.aggregator.ListSecretsReq.prototype.setAfter = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int64 limit = 4;
 * @return {number}
 */
proto.aggregator.ListSecretsReq.prototype.getLimit = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.ListSecretsReq} returns this
 */
proto.aggregator.ListSecretsReq.prototype.setLimit = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional bool include_timestamps = 5;
 * @return {boolean}
 */
proto.aggregator.ListSecretsReq.prototype.getIncludeTimestamps = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.ListSecretsReq} returns this
 */
proto.aggregator.ListSecretsReq.prototype.setIncludeTimestamps = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional bool include_created_by = 6;
 * @return {boolean}
 */
proto.aggregator.ListSecretsReq.prototype.getIncludeCreatedBy = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.ListSecretsReq} returns this
 */
proto.aggregator.ListSecretsReq.prototype.setIncludeCreatedBy = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};


/**
 * optional bool include_description = 7;
 * @return {boolean}
 */
proto.aggregator.ListSecretsReq.prototype.getIncludeDescription = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 7, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.ListSecretsReq} returns this
 */
proto.aggregator.ListSecretsReq.prototype.setIncludeDescription = function(value) {
  return jspb.Message.setProto3BooleanField(this, 7, value);
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
proto.aggregator.PageInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.PageInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.PageInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.PageInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    startCursor: jspb.Message.getFieldWithDefault(msg, 1, ""),
    endCursor: jspb.Message.getFieldWithDefault(msg, 2, ""),
    hasPreviousPage: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    hasNextPage: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
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
 * @return {!proto.aggregator.PageInfo}
 */
proto.aggregator.PageInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.PageInfo;
  return proto.aggregator.PageInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.PageInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.PageInfo}
 */
proto.aggregator.PageInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setStartCursor(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setEndCursor(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setHasPreviousPage(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setHasNextPage(value);
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
proto.aggregator.PageInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.PageInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.PageInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.PageInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStartCursor();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getEndCursor();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getHasPreviousPage();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getHasNextPage();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional string start_cursor = 1;
 * @return {string}
 */
proto.aggregator.PageInfo.prototype.getStartCursor = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.PageInfo} returns this
 */
proto.aggregator.PageInfo.prototype.setStartCursor = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string end_cursor = 2;
 * @return {string}
 */
proto.aggregator.PageInfo.prototype.getEndCursor = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.PageInfo} returns this
 */
proto.aggregator.PageInfo.prototype.setEndCursor = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool has_previous_page = 3;
 * @return {boolean}
 */
proto.aggregator.PageInfo.prototype.getHasPreviousPage = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.PageInfo} returns this
 */
proto.aggregator.PageInfo.prototype.setHasPreviousPage = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional bool has_next_page = 4;
 * @return {boolean}
 */
proto.aggregator.PageInfo.prototype.getHasNextPage = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.PageInfo} returns this
 */
proto.aggregator.PageInfo.prototype.setHasNextPage = function(value) {
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
proto.aggregator.Secret.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.Secret.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.Secret} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.Secret.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    scope: jspb.Message.getFieldWithDefault(msg, 2, ""),
    workflowId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    orgId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    createdAt: jspb.Message.getFieldWithDefault(msg, 5, 0),
    updatedAt: jspb.Message.getFieldWithDefault(msg, 6, 0),
    createdBy: jspb.Message.getFieldWithDefault(msg, 7, ""),
    description: jspb.Message.getFieldWithDefault(msg, 8, "")
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
 * @return {!proto.aggregator.Secret}
 */
proto.aggregator.Secret.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.Secret;
  return proto.aggregator.Secret.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.Secret} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.Secret}
 */
proto.aggregator.Secret.deserializeBinaryFromReader = function(msg, reader) {
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
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setWorkflowId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setOrgId(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCreatedAt(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setUpdatedAt(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setCreatedBy(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
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
proto.aggregator.Secret.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.Secret.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.Secret} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.Secret.serializeBinaryToWriter = function(message, writer) {
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
  f = message.getCreatedAt();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getUpdatedAt();
  if (f !== 0) {
    writer.writeInt64(
      6,
      f
    );
  }
  f = message.getCreatedBy();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.aggregator.Secret.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Secret} returns this
 */
proto.aggregator.Secret.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string scope = 2;
 * @return {string}
 */
proto.aggregator.Secret.prototype.getScope = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Secret} returns this
 */
proto.aggregator.Secret.prototype.setScope = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string workflow_id = 3;
 * @return {string}
 */
proto.aggregator.Secret.prototype.getWorkflowId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Secret} returns this
 */
proto.aggregator.Secret.prototype.setWorkflowId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string org_id = 4;
 * @return {string}
 */
proto.aggregator.Secret.prototype.getOrgId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Secret} returns this
 */
proto.aggregator.Secret.prototype.setOrgId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional int64 created_at = 5;
 * @return {number}
 */
proto.aggregator.Secret.prototype.getCreatedAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Secret} returns this
 */
proto.aggregator.Secret.prototype.setCreatedAt = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int64 updated_at = 6;
 * @return {number}
 */
proto.aggregator.Secret.prototype.getUpdatedAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.Secret} returns this
 */
proto.aggregator.Secret.prototype.setUpdatedAt = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional string created_by = 7;
 * @return {string}
 */
proto.aggregator.Secret.prototype.getCreatedBy = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Secret} returns this
 */
proto.aggregator.Secret.prototype.setCreatedBy = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional string description = 8;
 * @return {string}
 */
proto.aggregator.Secret.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.Secret} returns this
 */
proto.aggregator.Secret.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
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
    proto.aggregator.Secret.toObject, includeInstance),
    pageInfo: (f = msg.getPageInfo()) && proto.aggregator.PageInfo.toObject(includeInstance, f)
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
      var value = new proto.aggregator.Secret;
      reader.readMessage(value,proto.aggregator.Secret.deserializeBinaryFromReader);
      msg.addItems(value);
      break;
    case 2:
      var value = new proto.aggregator.PageInfo;
      reader.readMessage(value,proto.aggregator.PageInfo.deserializeBinaryFromReader);
      msg.setPageInfo(value);
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
      proto.aggregator.Secret.serializeBinaryToWriter
    );
  }
  f = message.getPageInfo();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.aggregator.PageInfo.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Secret items = 1;
 * @return {!Array<!proto.aggregator.Secret>}
 */
proto.aggregator.ListSecretsResp.prototype.getItemsList = function() {
  return /** @type{!Array<!proto.aggregator.Secret>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.Secret, 1));
};


/**
 * @param {!Array<!proto.aggregator.Secret>} value
 * @return {!proto.aggregator.ListSecretsResp} returns this
*/
proto.aggregator.ListSecretsResp.prototype.setItemsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.aggregator.Secret=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.Secret}
 */
proto.aggregator.ListSecretsResp.prototype.addItems = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.aggregator.Secret, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.ListSecretsResp} returns this
 */
proto.aggregator.ListSecretsResp.prototype.clearItemsList = function() {
  return this.setItemsList([]);
};


/**
 * optional PageInfo page_info = 2;
 * @return {?proto.aggregator.PageInfo}
 */
proto.aggregator.ListSecretsResp.prototype.getPageInfo = function() {
  return /** @type{?proto.aggregator.PageInfo} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.PageInfo, 2));
};


/**
 * @param {?proto.aggregator.PageInfo|undefined} value
 * @return {!proto.aggregator.ListSecretsResp} returns this
*/
proto.aggregator.ListSecretsResp.prototype.setPageInfo = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.ListSecretsResp} returns this
 */
proto.aggregator.ListSecretsResp.prototype.clearPageInfo = function() {
  return this.setPageInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.ListSecretsResp.prototype.hasPageInfo = function() {
  return jspb.Message.getField(this, 2) != null;
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
proto.aggregator.DeleteSecretResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.DeleteSecretResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.DeleteSecretResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.DeleteSecretResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    status: jspb.Message.getFieldWithDefault(msg, 2, ""),
    message: jspb.Message.getFieldWithDefault(msg, 3, ""),
    deletedAt: jspb.Message.getFieldWithDefault(msg, 4, 0),
    secretName: jspb.Message.getFieldWithDefault(msg, 5, ""),
    scope: jspb.Message.getFieldWithDefault(msg, 6, "")
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
 * @return {!proto.aggregator.DeleteSecretResp}
 */
proto.aggregator.DeleteSecretResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.DeleteSecretResp;
  return proto.aggregator.DeleteSecretResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.DeleteSecretResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.DeleteSecretResp}
 */
proto.aggregator.DeleteSecretResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setStatus(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setDeletedAt(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setSecretName(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setScope(value);
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
proto.aggregator.DeleteSecretResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.DeleteSecretResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.DeleteSecretResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.DeleteSecretResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getStatus();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getDeletedAt();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getSecretName();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getScope();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.aggregator.DeleteSecretResp.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.DeleteSecretResp} returns this
 */
proto.aggregator.DeleteSecretResp.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string status = 2;
 * @return {string}
 */
proto.aggregator.DeleteSecretResp.prototype.getStatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.DeleteSecretResp} returns this
 */
proto.aggregator.DeleteSecretResp.prototype.setStatus = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message = 3;
 * @return {string}
 */
proto.aggregator.DeleteSecretResp.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.DeleteSecretResp} returns this
 */
proto.aggregator.DeleteSecretResp.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int64 deleted_at = 4;
 * @return {number}
 */
proto.aggregator.DeleteSecretResp.prototype.getDeletedAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.DeleteSecretResp} returns this
 */
proto.aggregator.DeleteSecretResp.prototype.setDeletedAt = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional string secret_name = 5;
 * @return {string}
 */
proto.aggregator.DeleteSecretResp.prototype.getSecretName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.DeleteSecretResp} returns this
 */
proto.aggregator.DeleteSecretResp.prototype.setSecretName = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string scope = 6;
 * @return {string}
 */
proto.aggregator.DeleteSecretResp.prototype.getScope = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.DeleteSecretResp} returns this
 */
proto.aggregator.DeleteSecretResp.prototype.setScope = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
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
proto.aggregator.GetSignatureFormatReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.GetSignatureFormatReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.GetSignatureFormatReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetSignatureFormatReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    wallet: jspb.Message.getFieldWithDefault(msg, 1, "")
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
 * @return {!proto.aggregator.GetSignatureFormatReq}
 */
proto.aggregator.GetSignatureFormatReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.GetSignatureFormatReq;
  return proto.aggregator.GetSignatureFormatReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.GetSignatureFormatReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.GetSignatureFormatReq}
 */
proto.aggregator.GetSignatureFormatReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setWallet(value);
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
proto.aggregator.GetSignatureFormatReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.GetSignatureFormatReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.GetSignatureFormatReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetSignatureFormatReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getWallet();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string wallet = 1;
 * @return {string}
 */
proto.aggregator.GetSignatureFormatReq.prototype.getWallet = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GetSignatureFormatReq} returns this
 */
proto.aggregator.GetSignatureFormatReq.prototype.setWallet = function(value) {
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
proto.aggregator.GetSignatureFormatResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.GetSignatureFormatResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.GetSignatureFormatResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetSignatureFormatResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    message: jspb.Message.getFieldWithDefault(msg, 1, "")
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
 * @return {!proto.aggregator.GetSignatureFormatResp}
 */
proto.aggregator.GetSignatureFormatResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.GetSignatureFormatResp;
  return proto.aggregator.GetSignatureFormatResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.GetSignatureFormatResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.GetSignatureFormatResp}
 */
proto.aggregator.GetSignatureFormatResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
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
proto.aggregator.GetSignatureFormatResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.GetSignatureFormatResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.GetSignatureFormatResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetSignatureFormatResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string message = 1;
 * @return {string}
 */
proto.aggregator.GetSignatureFormatResp.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GetSignatureFormatResp} returns this
 */
proto.aggregator.GetSignatureFormatResp.prototype.setMessage = function(value) {
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
proto.aggregator.CreateSecretResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.CreateSecretResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.CreateSecretResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CreateSecretResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    status: jspb.Message.getFieldWithDefault(msg, 2, ""),
    message: jspb.Message.getFieldWithDefault(msg, 3, ""),
    createdAt: jspb.Message.getFieldWithDefault(msg, 4, 0),
    secretName: jspb.Message.getFieldWithDefault(msg, 5, ""),
    scope: jspb.Message.getFieldWithDefault(msg, 6, "")
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
 * @return {!proto.aggregator.CreateSecretResp}
 */
proto.aggregator.CreateSecretResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.CreateSecretResp;
  return proto.aggregator.CreateSecretResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.CreateSecretResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.CreateSecretResp}
 */
proto.aggregator.CreateSecretResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setStatus(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCreatedAt(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setSecretName(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setScope(value);
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
proto.aggregator.CreateSecretResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.CreateSecretResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.CreateSecretResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CreateSecretResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getStatus();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getCreatedAt();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getSecretName();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getScope();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.aggregator.CreateSecretResp.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.CreateSecretResp} returns this
 */
proto.aggregator.CreateSecretResp.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string status = 2;
 * @return {string}
 */
proto.aggregator.CreateSecretResp.prototype.getStatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.CreateSecretResp} returns this
 */
proto.aggregator.CreateSecretResp.prototype.setStatus = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message = 3;
 * @return {string}
 */
proto.aggregator.CreateSecretResp.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.CreateSecretResp} returns this
 */
proto.aggregator.CreateSecretResp.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int64 created_at = 4;
 * @return {number}
 */
proto.aggregator.CreateSecretResp.prototype.getCreatedAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.CreateSecretResp} returns this
 */
proto.aggregator.CreateSecretResp.prototype.setCreatedAt = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional string secret_name = 5;
 * @return {string}
 */
proto.aggregator.CreateSecretResp.prototype.getSecretName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.CreateSecretResp} returns this
 */
proto.aggregator.CreateSecretResp.prototype.setSecretName = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string scope = 6;
 * @return {string}
 */
proto.aggregator.CreateSecretResp.prototype.getScope = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.CreateSecretResp} returns this
 */
proto.aggregator.CreateSecretResp.prototype.setScope = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
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
proto.aggregator.UpdateSecretResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.UpdateSecretResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.UpdateSecretResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.UpdateSecretResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    status: jspb.Message.getFieldWithDefault(msg, 2, ""),
    message: jspb.Message.getFieldWithDefault(msg, 3, ""),
    updatedAt: jspb.Message.getFieldWithDefault(msg, 4, 0),
    secretName: jspb.Message.getFieldWithDefault(msg, 5, ""),
    scope: jspb.Message.getFieldWithDefault(msg, 6, "")
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
 * @return {!proto.aggregator.UpdateSecretResp}
 */
proto.aggregator.UpdateSecretResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.UpdateSecretResp;
  return proto.aggregator.UpdateSecretResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.UpdateSecretResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.UpdateSecretResp}
 */
proto.aggregator.UpdateSecretResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setStatus(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setUpdatedAt(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setSecretName(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setScope(value);
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
proto.aggregator.UpdateSecretResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.UpdateSecretResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.UpdateSecretResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.UpdateSecretResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getStatus();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getUpdatedAt();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getSecretName();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getScope();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.aggregator.UpdateSecretResp.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.UpdateSecretResp} returns this
 */
proto.aggregator.UpdateSecretResp.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string status = 2;
 * @return {string}
 */
proto.aggregator.UpdateSecretResp.prototype.getStatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.UpdateSecretResp} returns this
 */
proto.aggregator.UpdateSecretResp.prototype.setStatus = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message = 3;
 * @return {string}
 */
proto.aggregator.UpdateSecretResp.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.UpdateSecretResp} returns this
 */
proto.aggregator.UpdateSecretResp.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int64 updated_at = 4;
 * @return {number}
 */
proto.aggregator.UpdateSecretResp.prototype.getUpdatedAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.UpdateSecretResp} returns this
 */
proto.aggregator.UpdateSecretResp.prototype.setUpdatedAt = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional string secret_name = 5;
 * @return {string}
 */
proto.aggregator.UpdateSecretResp.prototype.getSecretName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.UpdateSecretResp} returns this
 */
proto.aggregator.UpdateSecretResp.prototype.setSecretName = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string scope = 6;
 * @return {string}
 */
proto.aggregator.UpdateSecretResp.prototype.getScope = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.UpdateSecretResp} returns this
 */
proto.aggregator.UpdateSecretResp.prototype.setScope = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
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
proto.aggregator.DeleteTaskResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.DeleteTaskResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.DeleteTaskResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.DeleteTaskResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    status: jspb.Message.getFieldWithDefault(msg, 2, ""),
    message: jspb.Message.getFieldWithDefault(msg, 3, ""),
    deletedAt: jspb.Message.getFieldWithDefault(msg, 4, 0),
    id: jspb.Message.getFieldWithDefault(msg, 5, ""),
    previousStatus: jspb.Message.getFieldWithDefault(msg, 6, "")
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
 * @return {!proto.aggregator.DeleteTaskResp}
 */
proto.aggregator.DeleteTaskResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.DeleteTaskResp;
  return proto.aggregator.DeleteTaskResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.DeleteTaskResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.DeleteTaskResp}
 */
proto.aggregator.DeleteTaskResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setStatus(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setDeletedAt(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setPreviousStatus(value);
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
proto.aggregator.DeleteTaskResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.DeleteTaskResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.DeleteTaskResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.DeleteTaskResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getStatus();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getDeletedAt();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getPreviousStatus();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.aggregator.DeleteTaskResp.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.DeleteTaskResp} returns this
 */
proto.aggregator.DeleteTaskResp.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string status = 2;
 * @return {string}
 */
proto.aggregator.DeleteTaskResp.prototype.getStatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.DeleteTaskResp} returns this
 */
proto.aggregator.DeleteTaskResp.prototype.setStatus = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message = 3;
 * @return {string}
 */
proto.aggregator.DeleteTaskResp.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.DeleteTaskResp} returns this
 */
proto.aggregator.DeleteTaskResp.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int64 deleted_at = 4;
 * @return {number}
 */
proto.aggregator.DeleteTaskResp.prototype.getDeletedAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.DeleteTaskResp} returns this
 */
proto.aggregator.DeleteTaskResp.prototype.setDeletedAt = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional string id = 5;
 * @return {string}
 */
proto.aggregator.DeleteTaskResp.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.DeleteTaskResp} returns this
 */
proto.aggregator.DeleteTaskResp.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string previous_status = 6;
 * @return {string}
 */
proto.aggregator.DeleteTaskResp.prototype.getPreviousStatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.DeleteTaskResp} returns this
 */
proto.aggregator.DeleteTaskResp.prototype.setPreviousStatus = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
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
proto.aggregator.CancelTaskResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.CancelTaskResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.CancelTaskResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CancelTaskResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    status: jspb.Message.getFieldWithDefault(msg, 2, ""),
    message: jspb.Message.getFieldWithDefault(msg, 3, ""),
    cancelledAt: jspb.Message.getFieldWithDefault(msg, 4, 0),
    id: jspb.Message.getFieldWithDefault(msg, 5, ""),
    previousStatus: jspb.Message.getFieldWithDefault(msg, 6, "")
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
 * @return {!proto.aggregator.CancelTaskResp}
 */
proto.aggregator.CancelTaskResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.CancelTaskResp;
  return proto.aggregator.CancelTaskResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.CancelTaskResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.CancelTaskResp}
 */
proto.aggregator.CancelTaskResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setStatus(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCancelledAt(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setPreviousStatus(value);
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
proto.aggregator.CancelTaskResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.CancelTaskResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.CancelTaskResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.CancelTaskResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getStatus();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getCancelledAt();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getPreviousStatus();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.aggregator.CancelTaskResp.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.CancelTaskResp} returns this
 */
proto.aggregator.CancelTaskResp.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string status = 2;
 * @return {string}
 */
proto.aggregator.CancelTaskResp.prototype.getStatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.CancelTaskResp} returns this
 */
proto.aggregator.CancelTaskResp.prototype.setStatus = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message = 3;
 * @return {string}
 */
proto.aggregator.CancelTaskResp.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.CancelTaskResp} returns this
 */
proto.aggregator.CancelTaskResp.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int64 cancelled_at = 4;
 * @return {number}
 */
proto.aggregator.CancelTaskResp.prototype.getCancelledAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.CancelTaskResp} returns this
 */
proto.aggregator.CancelTaskResp.prototype.setCancelledAt = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional string id = 5;
 * @return {string}
 */
proto.aggregator.CancelTaskResp.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.CancelTaskResp} returns this
 */
proto.aggregator.CancelTaskResp.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string previous_status = 6;
 * @return {string}
 */
proto.aggregator.CancelTaskResp.prototype.getPreviousStatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.CancelTaskResp} returns this
 */
proto.aggregator.CancelTaskResp.prototype.setPreviousStatus = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.GetWorkflowCountReq.repeatedFields_ = [1];



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
proto.aggregator.GetWorkflowCountReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.GetWorkflowCountReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.GetWorkflowCountReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetWorkflowCountReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    addressesList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
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
 * @return {!proto.aggregator.GetWorkflowCountReq}
 */
proto.aggregator.GetWorkflowCountReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.GetWorkflowCountReq;
  return proto.aggregator.GetWorkflowCountReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.GetWorkflowCountReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.GetWorkflowCountReq}
 */
proto.aggregator.GetWorkflowCountReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addAddresses(value);
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
proto.aggregator.GetWorkflowCountReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.GetWorkflowCountReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.GetWorkflowCountReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetWorkflowCountReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddressesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
};


/**
 * repeated string addresses = 1;
 * @return {!Array<string>}
 */
proto.aggregator.GetWorkflowCountReq.prototype.getAddressesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.GetWorkflowCountReq} returns this
 */
proto.aggregator.GetWorkflowCountReq.prototype.setAddressesList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.GetWorkflowCountReq} returns this
 */
proto.aggregator.GetWorkflowCountReq.prototype.addAddresses = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.GetWorkflowCountReq} returns this
 */
proto.aggregator.GetWorkflowCountReq.prototype.clearAddressesList = function() {
  return this.setAddressesList([]);
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
proto.aggregator.GetWorkflowCountResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.GetWorkflowCountResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.GetWorkflowCountResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetWorkflowCountResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    total: jspb.Message.getFieldWithDefault(msg, 1, 0)
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
 * @return {!proto.aggregator.GetWorkflowCountResp}
 */
proto.aggregator.GetWorkflowCountResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.GetWorkflowCountResp;
  return proto.aggregator.GetWorkflowCountResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.GetWorkflowCountResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.GetWorkflowCountResp}
 */
proto.aggregator.GetWorkflowCountResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTotal(value);
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
proto.aggregator.GetWorkflowCountResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.GetWorkflowCountResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.GetWorkflowCountResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetWorkflowCountResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTotal();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
};


/**
 * optional int64 total = 1;
 * @return {number}
 */
proto.aggregator.GetWorkflowCountResp.prototype.getTotal = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.GetWorkflowCountResp} returns this
 */
proto.aggregator.GetWorkflowCountResp.prototype.setTotal = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.GetExecutionCountReq.repeatedFields_ = [1];



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
proto.aggregator.GetExecutionCountReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.GetExecutionCountReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.GetExecutionCountReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetExecutionCountReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    workflowIdsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
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
 * @return {!proto.aggregator.GetExecutionCountReq}
 */
proto.aggregator.GetExecutionCountReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.GetExecutionCountReq;
  return proto.aggregator.GetExecutionCountReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.GetExecutionCountReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.GetExecutionCountReq}
 */
proto.aggregator.GetExecutionCountReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addWorkflowIds(value);
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
proto.aggregator.GetExecutionCountReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.GetExecutionCountReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.GetExecutionCountReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetExecutionCountReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getWorkflowIdsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
};


/**
 * repeated string workflow_ids = 1;
 * @return {!Array<string>}
 */
proto.aggregator.GetExecutionCountReq.prototype.getWorkflowIdsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.GetExecutionCountReq} returns this
 */
proto.aggregator.GetExecutionCountReq.prototype.setWorkflowIdsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.GetExecutionCountReq} returns this
 */
proto.aggregator.GetExecutionCountReq.prototype.addWorkflowIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.GetExecutionCountReq} returns this
 */
proto.aggregator.GetExecutionCountReq.prototype.clearWorkflowIdsList = function() {
  return this.setWorkflowIdsList([]);
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
proto.aggregator.GetExecutionCountResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.GetExecutionCountResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.GetExecutionCountResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetExecutionCountResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    total: jspb.Message.getFieldWithDefault(msg, 1, 0)
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
 * @return {!proto.aggregator.GetExecutionCountResp}
 */
proto.aggregator.GetExecutionCountResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.GetExecutionCountResp;
  return proto.aggregator.GetExecutionCountResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.GetExecutionCountResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.GetExecutionCountResp}
 */
proto.aggregator.GetExecutionCountResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTotal(value);
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
proto.aggregator.GetExecutionCountResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.GetExecutionCountResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.GetExecutionCountResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetExecutionCountResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTotal();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
};


/**
 * optional int64 total = 1;
 * @return {number}
 */
proto.aggregator.GetExecutionCountResp.prototype.getTotal = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.GetExecutionCountResp} returns this
 */
proto.aggregator.GetExecutionCountResp.prototype.setTotal = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.GetExecutionStatsReq.repeatedFields_ = [1];



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
proto.aggregator.GetExecutionStatsReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.GetExecutionStatsReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.GetExecutionStatsReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetExecutionStatsReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    workflowIdsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    days: jspb.Message.getFieldWithDefault(msg, 2, 0)
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
 * @return {!proto.aggregator.GetExecutionStatsReq}
 */
proto.aggregator.GetExecutionStatsReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.GetExecutionStatsReq;
  return proto.aggregator.GetExecutionStatsReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.GetExecutionStatsReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.GetExecutionStatsReq}
 */
proto.aggregator.GetExecutionStatsReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addWorkflowIds(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setDays(value);
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
proto.aggregator.GetExecutionStatsReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.GetExecutionStatsReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.GetExecutionStatsReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetExecutionStatsReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getWorkflowIdsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
  f = message.getDays();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * repeated string workflow_ids = 1;
 * @return {!Array<string>}
 */
proto.aggregator.GetExecutionStatsReq.prototype.getWorkflowIdsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.GetExecutionStatsReq} returns this
 */
proto.aggregator.GetExecutionStatsReq.prototype.setWorkflowIdsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.GetExecutionStatsReq} returns this
 */
proto.aggregator.GetExecutionStatsReq.prototype.addWorkflowIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.GetExecutionStatsReq} returns this
 */
proto.aggregator.GetExecutionStatsReq.prototype.clearWorkflowIdsList = function() {
  return this.setWorkflowIdsList([]);
};


/**
 * optional int64 days = 2;
 * @return {number}
 */
proto.aggregator.GetExecutionStatsReq.prototype.getDays = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.GetExecutionStatsReq} returns this
 */
proto.aggregator.GetExecutionStatsReq.prototype.setDays = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
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
proto.aggregator.GetExecutionStatsResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.GetExecutionStatsResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.GetExecutionStatsResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetExecutionStatsResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    total: jspb.Message.getFieldWithDefault(msg, 1, 0),
    succeeded: jspb.Message.getFieldWithDefault(msg, 2, 0),
    failed: jspb.Message.getFieldWithDefault(msg, 3, 0),
    avgExecutionTime: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0)
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
 * @return {!proto.aggregator.GetExecutionStatsResp}
 */
proto.aggregator.GetExecutionStatsResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.GetExecutionStatsResp;
  return proto.aggregator.GetExecutionStatsResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.GetExecutionStatsResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.GetExecutionStatsResp}
 */
proto.aggregator.GetExecutionStatsResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTotal(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setSucceeded(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFailed(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setAvgExecutionTime(value);
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
proto.aggregator.GetExecutionStatsResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.GetExecutionStatsResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.GetExecutionStatsResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GetExecutionStatsResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTotal();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getSucceeded();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getFailed();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getAvgExecutionTime();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
};


/**
 * optional int64 total = 1;
 * @return {number}
 */
proto.aggregator.GetExecutionStatsResp.prototype.getTotal = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.GetExecutionStatsResp} returns this
 */
proto.aggregator.GetExecutionStatsResp.prototype.setTotal = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 succeeded = 2;
 * @return {number}
 */
proto.aggregator.GetExecutionStatsResp.prototype.getSucceeded = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.GetExecutionStatsResp} returns this
 */
proto.aggregator.GetExecutionStatsResp.prototype.setSucceeded = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int64 failed = 3;
 * @return {number}
 */
proto.aggregator.GetExecutionStatsResp.prototype.getFailed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.GetExecutionStatsResp} returns this
 */
proto.aggregator.GetExecutionStatsResp.prototype.setFailed = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional double avg_execution_time = 4;
 * @return {number}
 */
proto.aggregator.GetExecutionStatsResp.prototype.getAvgExecutionTime = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.GetExecutionStatsResp} returns this
 */
proto.aggregator.GetExecutionStatsResp.prototype.setAvgExecutionTime = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
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
proto.aggregator.RunNodeWithInputsReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.RunNodeWithInputsReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.RunNodeWithInputsReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.RunNodeWithInputsReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    nodeType: jspb.Message.getFieldWithDefault(msg, 1, 0),
    nodeConfigMap: (f = msg.getNodeConfigMap()) ? f.toObject(includeInstance, proto.google.protobuf.Value.toObject) : [],
    inputVariablesMap: (f = msg.getInputVariablesMap()) ? f.toObject(includeInstance, proto.google.protobuf.Value.toObject) : [],
    isSimulated: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
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
 * @return {!proto.aggregator.RunNodeWithInputsReq}
 */
proto.aggregator.RunNodeWithInputsReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.RunNodeWithInputsReq;
  return proto.aggregator.RunNodeWithInputsReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.RunNodeWithInputsReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.RunNodeWithInputsReq}
 */
proto.aggregator.RunNodeWithInputsReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.aggregator.NodeType} */ (reader.readEnum());
      msg.setNodeType(value);
      break;
    case 2:
      var value = msg.getNodeConfigMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.google.protobuf.Value.deserializeBinaryFromReader, "", new proto.google.protobuf.Value());
         });
      break;
    case 3:
      var value = msg.getInputVariablesMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.google.protobuf.Value.deserializeBinaryFromReader, "", new proto.google.protobuf.Value());
         });
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsSimulated(value);
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
proto.aggregator.RunNodeWithInputsReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.RunNodeWithInputsReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.RunNodeWithInputsReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.RunNodeWithInputsReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNodeType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getNodeConfigMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(2, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.google.protobuf.Value.serializeBinaryToWriter);
  }
  f = message.getInputVariablesMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(3, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.google.protobuf.Value.serializeBinaryToWriter);
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional NodeType node_type = 1;
 * @return {!proto.aggregator.NodeType}
 */
proto.aggregator.RunNodeWithInputsReq.prototype.getNodeType = function() {
  return /** @type {!proto.aggregator.NodeType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.aggregator.NodeType} value
 * @return {!proto.aggregator.RunNodeWithInputsReq} returns this
 */
proto.aggregator.RunNodeWithInputsReq.prototype.setNodeType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * map<string, google.protobuf.Value> node_config = 2;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.google.protobuf.Value>}
 */
proto.aggregator.RunNodeWithInputsReq.prototype.getNodeConfigMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.google.protobuf.Value>} */ (
      jspb.Message.getMapField(this, 2, opt_noLazyCreate,
      proto.google.protobuf.Value));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.aggregator.RunNodeWithInputsReq} returns this
 */
proto.aggregator.RunNodeWithInputsReq.prototype.clearNodeConfigMap = function() {
  this.getNodeConfigMap().clear();
  return this;};


/**
 * map<string, google.protobuf.Value> input_variables = 3;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.google.protobuf.Value>}
 */
proto.aggregator.RunNodeWithInputsReq.prototype.getInputVariablesMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.google.protobuf.Value>} */ (
      jspb.Message.getMapField(this, 3, opt_noLazyCreate,
      proto.google.protobuf.Value));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.aggregator.RunNodeWithInputsReq} returns this
 */
proto.aggregator.RunNodeWithInputsReq.prototype.clearInputVariablesMap = function() {
  this.getInputVariablesMap().clear();
  return this;};


/**
 * optional bool is_simulated = 4;
 * @return {boolean}
 */
proto.aggregator.RunNodeWithInputsReq.prototype.getIsSimulated = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.RunNodeWithInputsReq} returns this
 */
proto.aggregator.RunNodeWithInputsReq.prototype.setIsSimulated = function(value) {
  return jspb.Message.setField(this, 4, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.aggregator.RunNodeWithInputsReq} returns this
 */
proto.aggregator.RunNodeWithInputsReq.prototype.clearIsSimulated = function() {
  return jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunNodeWithInputsReq.prototype.hasIsSimulated = function() {
  return jspb.Message.getField(this, 4) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.aggregator.RunNodeWithInputsResp.oneofGroups_ = [[10,11,12,13,14,15,16,17,18,19]];

/**
 * @enum {number}
 */
proto.aggregator.RunNodeWithInputsResp.OutputDataCase = {
  OUTPUT_DATA_NOT_SET: 0,
  ETH_TRANSFER: 10,
  GRAPHQL: 11,
  CONTRACT_READ: 12,
  CONTRACT_WRITE: 13,
  CUSTOM_CODE: 14,
  REST_API: 15,
  BRANCH: 16,
  FILTER: 17,
  LOOP: 18,
  BALANCE: 19
};

/**
 * @return {proto.aggregator.RunNodeWithInputsResp.OutputDataCase}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.getOutputDataCase = function() {
  return /** @type {proto.aggregator.RunNodeWithInputsResp.OutputDataCase} */(jspb.Message.computeOneofCase(this, proto.aggregator.RunNodeWithInputsResp.oneofGroups_[0]));
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
proto.aggregator.RunNodeWithInputsResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.RunNodeWithInputsResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.RunNodeWithInputsResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.RunNodeWithInputsResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    error: jspb.Message.getFieldWithDefault(msg, 3, ""),
    metadata: (f = msg.getMetadata()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f),
    executionContext: (f = msg.getExecutionContext()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f),
    errorCode: jspb.Message.getFieldWithDefault(msg, 7, 0),
    ethTransfer: (f = msg.getEthTransfer()) && proto.aggregator.ETHTransferNode.Output.toObject(includeInstance, f),
    graphql: (f = msg.getGraphql()) && proto.aggregator.GraphQLQueryNode.Output.toObject(includeInstance, f),
    contractRead: (f = msg.getContractRead()) && proto.aggregator.ContractReadNode.Output.toObject(includeInstance, f),
    contractWrite: (f = msg.getContractWrite()) && proto.aggregator.ContractWriteNode.Output.toObject(includeInstance, f),
    customCode: (f = msg.getCustomCode()) && proto.aggregator.CustomCodeNode.Output.toObject(includeInstance, f),
    restApi: (f = msg.getRestApi()) && proto.aggregator.RestAPINode.Output.toObject(includeInstance, f),
    branch: (f = msg.getBranch()) && proto.aggregator.BranchNode.Output.toObject(includeInstance, f),
    filter: (f = msg.getFilter()) && proto.aggregator.FilterNode.Output.toObject(includeInstance, f),
    loop: (f = msg.getLoop()) && proto.aggregator.LoopNode.Output.toObject(includeInstance, f),
    balance: (f = msg.getBalance()) && proto.aggregator.BalanceNode.Output.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.RunNodeWithInputsResp}
 */
proto.aggregator.RunNodeWithInputsResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.RunNodeWithInputsResp;
  return proto.aggregator.RunNodeWithInputsResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.RunNodeWithInputsResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.RunNodeWithInputsResp}
 */
proto.aggregator.RunNodeWithInputsResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setError(value);
      break;
    case 5:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setMetadata(value);
      break;
    case 6:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setExecutionContext(value);
      break;
    case 7:
      var value = /** @type {!proto.aggregator.ErrorCode} */ (reader.readEnum());
      msg.setErrorCode(value);
      break;
    case 10:
      var value = new proto.aggregator.ETHTransferNode.Output;
      reader.readMessage(value,proto.aggregator.ETHTransferNode.Output.deserializeBinaryFromReader);
      msg.setEthTransfer(value);
      break;
    case 11:
      var value = new proto.aggregator.GraphQLQueryNode.Output;
      reader.readMessage(value,proto.aggregator.GraphQLQueryNode.Output.deserializeBinaryFromReader);
      msg.setGraphql(value);
      break;
    case 12:
      var value = new proto.aggregator.ContractReadNode.Output;
      reader.readMessage(value,proto.aggregator.ContractReadNode.Output.deserializeBinaryFromReader);
      msg.setContractRead(value);
      break;
    case 13:
      var value = new proto.aggregator.ContractWriteNode.Output;
      reader.readMessage(value,proto.aggregator.ContractWriteNode.Output.deserializeBinaryFromReader);
      msg.setContractWrite(value);
      break;
    case 14:
      var value = new proto.aggregator.CustomCodeNode.Output;
      reader.readMessage(value,proto.aggregator.CustomCodeNode.Output.deserializeBinaryFromReader);
      msg.setCustomCode(value);
      break;
    case 15:
      var value = new proto.aggregator.RestAPINode.Output;
      reader.readMessage(value,proto.aggregator.RestAPINode.Output.deserializeBinaryFromReader);
      msg.setRestApi(value);
      break;
    case 16:
      var value = new proto.aggregator.BranchNode.Output;
      reader.readMessage(value,proto.aggregator.BranchNode.Output.deserializeBinaryFromReader);
      msg.setBranch(value);
      break;
    case 17:
      var value = new proto.aggregator.FilterNode.Output;
      reader.readMessage(value,proto.aggregator.FilterNode.Output.deserializeBinaryFromReader);
      msg.setFilter(value);
      break;
    case 18:
      var value = new proto.aggregator.LoopNode.Output;
      reader.readMessage(value,proto.aggregator.LoopNode.Output.deserializeBinaryFromReader);
      msg.setLoop(value);
      break;
    case 19:
      var value = new proto.aggregator.BalanceNode.Output;
      reader.readMessage(value,proto.aggregator.BalanceNode.Output.deserializeBinaryFromReader);
      msg.setBalance(value);
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
proto.aggregator.RunNodeWithInputsResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.RunNodeWithInputsResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.RunNodeWithInputsResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.RunNodeWithInputsResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
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
  f = message.getMetadata();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
  f = message.getExecutionContext();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
  f = message.getErrorCode();
  if (f !== 0.0) {
    writer.writeEnum(
      7,
      f
    );
  }
  f = message.getEthTransfer();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.aggregator.ETHTransferNode.Output.serializeBinaryToWriter
    );
  }
  f = message.getGraphql();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      proto.aggregator.GraphQLQueryNode.Output.serializeBinaryToWriter
    );
  }
  f = message.getContractRead();
  if (f != null) {
    writer.writeMessage(
      12,
      f,
      proto.aggregator.ContractReadNode.Output.serializeBinaryToWriter
    );
  }
  f = message.getContractWrite();
  if (f != null) {
    writer.writeMessage(
      13,
      f,
      proto.aggregator.ContractWriteNode.Output.serializeBinaryToWriter
    );
  }
  f = message.getCustomCode();
  if (f != null) {
    writer.writeMessage(
      14,
      f,
      proto.aggregator.CustomCodeNode.Output.serializeBinaryToWriter
    );
  }
  f = message.getRestApi();
  if (f != null) {
    writer.writeMessage(
      15,
      f,
      proto.aggregator.RestAPINode.Output.serializeBinaryToWriter
    );
  }
  f = message.getBranch();
  if (f != null) {
    writer.writeMessage(
      16,
      f,
      proto.aggregator.BranchNode.Output.serializeBinaryToWriter
    );
  }
  f = message.getFilter();
  if (f != null) {
    writer.writeMessage(
      17,
      f,
      proto.aggregator.FilterNode.Output.serializeBinaryToWriter
    );
  }
  f = message.getLoop();
  if (f != null) {
    writer.writeMessage(
      18,
      f,
      proto.aggregator.LoopNode.Output.serializeBinaryToWriter
    );
  }
  f = message.getBalance();
  if (f != null) {
    writer.writeMessage(
      19,
      f,
      proto.aggregator.BalanceNode.Output.serializeBinaryToWriter
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
 */
proto.aggregator.RunNodeWithInputsResp.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string error = 3;
 * @return {string}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.getError = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
 */
proto.aggregator.RunNodeWithInputsResp.prototype.setError = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional google.protobuf.Value metadata = 5;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.getMetadata = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 5));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
*/
proto.aggregator.RunNodeWithInputsResp.prototype.setMetadata = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
 */
proto.aggregator.RunNodeWithInputsResp.prototype.clearMetadata = function() {
  return this.setMetadata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.hasMetadata = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional google.protobuf.Value execution_context = 6;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.getExecutionContext = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 6));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
*/
proto.aggregator.RunNodeWithInputsResp.prototype.setExecutionContext = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
 */
proto.aggregator.RunNodeWithInputsResp.prototype.clearExecutionContext = function() {
  return this.setExecutionContext(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.hasExecutionContext = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional ErrorCode error_code = 7;
 * @return {!proto.aggregator.ErrorCode}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.getErrorCode = function() {
  return /** @type {!proto.aggregator.ErrorCode} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {!proto.aggregator.ErrorCode} value
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
 */
proto.aggregator.RunNodeWithInputsResp.prototype.setErrorCode = function(value) {
  return jspb.Message.setProto3EnumField(this, 7, value);
};


/**
 * optional ETHTransferNode.Output eth_transfer = 10;
 * @return {?proto.aggregator.ETHTransferNode.Output}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.getEthTransfer = function() {
  return /** @type{?proto.aggregator.ETHTransferNode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ETHTransferNode.Output, 10));
};


/**
 * @param {?proto.aggregator.ETHTransferNode.Output|undefined} value
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
*/
proto.aggregator.RunNodeWithInputsResp.prototype.setEthTransfer = function(value) {
  return jspb.Message.setOneofWrapperField(this, 10, proto.aggregator.RunNodeWithInputsResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
 */
proto.aggregator.RunNodeWithInputsResp.prototype.clearEthTransfer = function() {
  return this.setEthTransfer(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.hasEthTransfer = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional GraphQLQueryNode.Output graphql = 11;
 * @return {?proto.aggregator.GraphQLQueryNode.Output}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.getGraphql = function() {
  return /** @type{?proto.aggregator.GraphQLQueryNode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.GraphQLQueryNode.Output, 11));
};


/**
 * @param {?proto.aggregator.GraphQLQueryNode.Output|undefined} value
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
*/
proto.aggregator.RunNodeWithInputsResp.prototype.setGraphql = function(value) {
  return jspb.Message.setOneofWrapperField(this, 11, proto.aggregator.RunNodeWithInputsResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
 */
proto.aggregator.RunNodeWithInputsResp.prototype.clearGraphql = function() {
  return this.setGraphql(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.hasGraphql = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional ContractReadNode.Output contract_read = 12;
 * @return {?proto.aggregator.ContractReadNode.Output}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.getContractRead = function() {
  return /** @type{?proto.aggregator.ContractReadNode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ContractReadNode.Output, 12));
};


/**
 * @param {?proto.aggregator.ContractReadNode.Output|undefined} value
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
*/
proto.aggregator.RunNodeWithInputsResp.prototype.setContractRead = function(value) {
  return jspb.Message.setOneofWrapperField(this, 12, proto.aggregator.RunNodeWithInputsResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
 */
proto.aggregator.RunNodeWithInputsResp.prototype.clearContractRead = function() {
  return this.setContractRead(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.hasContractRead = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * optional ContractWriteNode.Output contract_write = 13;
 * @return {?proto.aggregator.ContractWriteNode.Output}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.getContractWrite = function() {
  return /** @type{?proto.aggregator.ContractWriteNode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ContractWriteNode.Output, 13));
};


/**
 * @param {?proto.aggregator.ContractWriteNode.Output|undefined} value
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
*/
proto.aggregator.RunNodeWithInputsResp.prototype.setContractWrite = function(value) {
  return jspb.Message.setOneofWrapperField(this, 13, proto.aggregator.RunNodeWithInputsResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
 */
proto.aggregator.RunNodeWithInputsResp.prototype.clearContractWrite = function() {
  return this.setContractWrite(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.hasContractWrite = function() {
  return jspb.Message.getField(this, 13) != null;
};


/**
 * optional CustomCodeNode.Output custom_code = 14;
 * @return {?proto.aggregator.CustomCodeNode.Output}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.getCustomCode = function() {
  return /** @type{?proto.aggregator.CustomCodeNode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.CustomCodeNode.Output, 14));
};


/**
 * @param {?proto.aggregator.CustomCodeNode.Output|undefined} value
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
*/
proto.aggregator.RunNodeWithInputsResp.prototype.setCustomCode = function(value) {
  return jspb.Message.setOneofWrapperField(this, 14, proto.aggregator.RunNodeWithInputsResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
 */
proto.aggregator.RunNodeWithInputsResp.prototype.clearCustomCode = function() {
  return this.setCustomCode(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.hasCustomCode = function() {
  return jspb.Message.getField(this, 14) != null;
};


/**
 * optional RestAPINode.Output rest_api = 15;
 * @return {?proto.aggregator.RestAPINode.Output}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.getRestApi = function() {
  return /** @type{?proto.aggregator.RestAPINode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.RestAPINode.Output, 15));
};


/**
 * @param {?proto.aggregator.RestAPINode.Output|undefined} value
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
*/
proto.aggregator.RunNodeWithInputsResp.prototype.setRestApi = function(value) {
  return jspb.Message.setOneofWrapperField(this, 15, proto.aggregator.RunNodeWithInputsResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
 */
proto.aggregator.RunNodeWithInputsResp.prototype.clearRestApi = function() {
  return this.setRestApi(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.hasRestApi = function() {
  return jspb.Message.getField(this, 15) != null;
};


/**
 * optional BranchNode.Output branch = 16;
 * @return {?proto.aggregator.BranchNode.Output}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.getBranch = function() {
  return /** @type{?proto.aggregator.BranchNode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.BranchNode.Output, 16));
};


/**
 * @param {?proto.aggregator.BranchNode.Output|undefined} value
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
*/
proto.aggregator.RunNodeWithInputsResp.prototype.setBranch = function(value) {
  return jspb.Message.setOneofWrapperField(this, 16, proto.aggregator.RunNodeWithInputsResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
 */
proto.aggregator.RunNodeWithInputsResp.prototype.clearBranch = function() {
  return this.setBranch(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.hasBranch = function() {
  return jspb.Message.getField(this, 16) != null;
};


/**
 * optional FilterNode.Output filter = 17;
 * @return {?proto.aggregator.FilterNode.Output}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.getFilter = function() {
  return /** @type{?proto.aggregator.FilterNode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FilterNode.Output, 17));
};


/**
 * @param {?proto.aggregator.FilterNode.Output|undefined} value
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
*/
proto.aggregator.RunNodeWithInputsResp.prototype.setFilter = function(value) {
  return jspb.Message.setOneofWrapperField(this, 17, proto.aggregator.RunNodeWithInputsResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
 */
proto.aggregator.RunNodeWithInputsResp.prototype.clearFilter = function() {
  return this.setFilter(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.hasFilter = function() {
  return jspb.Message.getField(this, 17) != null;
};


/**
 * optional LoopNode.Output loop = 18;
 * @return {?proto.aggregator.LoopNode.Output}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.getLoop = function() {
  return /** @type{?proto.aggregator.LoopNode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.LoopNode.Output, 18));
};


/**
 * @param {?proto.aggregator.LoopNode.Output|undefined} value
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
*/
proto.aggregator.RunNodeWithInputsResp.prototype.setLoop = function(value) {
  return jspb.Message.setOneofWrapperField(this, 18, proto.aggregator.RunNodeWithInputsResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
 */
proto.aggregator.RunNodeWithInputsResp.prototype.clearLoop = function() {
  return this.setLoop(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.hasLoop = function() {
  return jspb.Message.getField(this, 18) != null;
};


/**
 * optional BalanceNode.Output balance = 19;
 * @return {?proto.aggregator.BalanceNode.Output}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.getBalance = function() {
  return /** @type{?proto.aggregator.BalanceNode.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.BalanceNode.Output, 19));
};


/**
 * @param {?proto.aggregator.BalanceNode.Output|undefined} value
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
*/
proto.aggregator.RunNodeWithInputsResp.prototype.setBalance = function(value) {
  return jspb.Message.setOneofWrapperField(this, 19, proto.aggregator.RunNodeWithInputsResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunNodeWithInputsResp} returns this
 */
proto.aggregator.RunNodeWithInputsResp.prototype.clearBalance = function() {
  return this.setBalance(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunNodeWithInputsResp.prototype.hasBalance = function() {
  return jspb.Message.getField(this, 19) != null;
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
proto.aggregator.RunTriggerReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.RunTriggerReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.RunTriggerReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.RunTriggerReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    triggerType: jspb.Message.getFieldWithDefault(msg, 1, 0),
    triggerConfigMap: (f = msg.getTriggerConfigMap()) ? f.toObject(includeInstance, proto.google.protobuf.Value.toObject) : [],
    triggerInputMap: (f = msg.getTriggerInputMap()) ? f.toObject(includeInstance, proto.google.protobuf.Value.toObject) : []
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
 * @return {!proto.aggregator.RunTriggerReq}
 */
proto.aggregator.RunTriggerReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.RunTriggerReq;
  return proto.aggregator.RunTriggerReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.RunTriggerReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.RunTriggerReq}
 */
proto.aggregator.RunTriggerReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.aggregator.TriggerType} */ (reader.readEnum());
      msg.setTriggerType(value);
      break;
    case 2:
      var value = msg.getTriggerConfigMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.google.protobuf.Value.deserializeBinaryFromReader, "", new proto.google.protobuf.Value());
         });
      break;
    case 3:
      var value = msg.getTriggerInputMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.google.protobuf.Value.deserializeBinaryFromReader, "", new proto.google.protobuf.Value());
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
proto.aggregator.RunTriggerReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.RunTriggerReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.RunTriggerReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.RunTriggerReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTriggerType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getTriggerConfigMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(2, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.google.protobuf.Value.serializeBinaryToWriter);
  }
  f = message.getTriggerInputMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(3, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.google.protobuf.Value.serializeBinaryToWriter);
  }
};


/**
 * optional TriggerType trigger_type = 1;
 * @return {!proto.aggregator.TriggerType}
 */
proto.aggregator.RunTriggerReq.prototype.getTriggerType = function() {
  return /** @type {!proto.aggregator.TriggerType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.aggregator.TriggerType} value
 * @return {!proto.aggregator.RunTriggerReq} returns this
 */
proto.aggregator.RunTriggerReq.prototype.setTriggerType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * map<string, google.protobuf.Value> trigger_config = 2;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.google.protobuf.Value>}
 */
proto.aggregator.RunTriggerReq.prototype.getTriggerConfigMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.google.protobuf.Value>} */ (
      jspb.Message.getMapField(this, 2, opt_noLazyCreate,
      proto.google.protobuf.Value));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.aggregator.RunTriggerReq} returns this
 */
proto.aggregator.RunTriggerReq.prototype.clearTriggerConfigMap = function() {
  this.getTriggerConfigMap().clear();
  return this;};


/**
 * map<string, google.protobuf.Value> trigger_input = 3;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.google.protobuf.Value>}
 */
proto.aggregator.RunTriggerReq.prototype.getTriggerInputMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.google.protobuf.Value>} */ (
      jspb.Message.getMapField(this, 3, opt_noLazyCreate,
      proto.google.protobuf.Value));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.aggregator.RunTriggerReq} returns this
 */
proto.aggregator.RunTriggerReq.prototype.clearTriggerInputMap = function() {
  this.getTriggerInputMap().clear();
  return this;};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.aggregator.RunTriggerResp.oneofGroups_ = [[10,11,12,13,14]];

/**
 * @enum {number}
 */
proto.aggregator.RunTriggerResp.OutputDataCase = {
  OUTPUT_DATA_NOT_SET: 0,
  BLOCK_TRIGGER: 10,
  FIXED_TIME_TRIGGER: 11,
  CRON_TRIGGER: 12,
  EVENT_TRIGGER: 13,
  MANUAL_TRIGGER: 14
};

/**
 * @return {proto.aggregator.RunTriggerResp.OutputDataCase}
 */
proto.aggregator.RunTriggerResp.prototype.getOutputDataCase = function() {
  return /** @type {proto.aggregator.RunTriggerResp.OutputDataCase} */(jspb.Message.computeOneofCase(this, proto.aggregator.RunTriggerResp.oneofGroups_[0]));
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
proto.aggregator.RunTriggerResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.RunTriggerResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.RunTriggerResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.RunTriggerResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    error: jspb.Message.getFieldWithDefault(msg, 2, ""),
    metadata: (f = msg.getMetadata()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f),
    executionContext: (f = msg.getExecutionContext()) && google_protobuf_struct_pb.Value.toObject(includeInstance, f),
    errorCode: jspb.Message.getFieldWithDefault(msg, 6, 0),
    blockTrigger: (f = msg.getBlockTrigger()) && proto.aggregator.BlockTrigger.Output.toObject(includeInstance, f),
    fixedTimeTrigger: (f = msg.getFixedTimeTrigger()) && proto.aggregator.FixedTimeTrigger.Output.toObject(includeInstance, f),
    cronTrigger: (f = msg.getCronTrigger()) && proto.aggregator.CronTrigger.Output.toObject(includeInstance, f),
    eventTrigger: (f = msg.getEventTrigger()) && proto.aggregator.EventTrigger.Output.toObject(includeInstance, f),
    manualTrigger: (f = msg.getManualTrigger()) && proto.aggregator.ManualTrigger.Output.toObject(includeInstance, f)
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
 * @return {!proto.aggregator.RunTriggerResp}
 */
proto.aggregator.RunTriggerResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.RunTriggerResp;
  return proto.aggregator.RunTriggerResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.RunTriggerResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.RunTriggerResp}
 */
proto.aggregator.RunTriggerResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setError(value);
      break;
    case 4:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setMetadata(value);
      break;
    case 5:
      var value = new google_protobuf_struct_pb.Value;
      reader.readMessage(value,google_protobuf_struct_pb.Value.deserializeBinaryFromReader);
      msg.setExecutionContext(value);
      break;
    case 6:
      var value = /** @type {!proto.aggregator.ErrorCode} */ (reader.readEnum());
      msg.setErrorCode(value);
      break;
    case 10:
      var value = new proto.aggregator.BlockTrigger.Output;
      reader.readMessage(value,proto.aggregator.BlockTrigger.Output.deserializeBinaryFromReader);
      msg.setBlockTrigger(value);
      break;
    case 11:
      var value = new proto.aggregator.FixedTimeTrigger.Output;
      reader.readMessage(value,proto.aggregator.FixedTimeTrigger.Output.deserializeBinaryFromReader);
      msg.setFixedTimeTrigger(value);
      break;
    case 12:
      var value = new proto.aggregator.CronTrigger.Output;
      reader.readMessage(value,proto.aggregator.CronTrigger.Output.deserializeBinaryFromReader);
      msg.setCronTrigger(value);
      break;
    case 13:
      var value = new proto.aggregator.EventTrigger.Output;
      reader.readMessage(value,proto.aggregator.EventTrigger.Output.deserializeBinaryFromReader);
      msg.setEventTrigger(value);
      break;
    case 14:
      var value = new proto.aggregator.ManualTrigger.Output;
      reader.readMessage(value,proto.aggregator.ManualTrigger.Output.deserializeBinaryFromReader);
      msg.setManualTrigger(value);
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
proto.aggregator.RunTriggerResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.RunTriggerResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.RunTriggerResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.RunTriggerResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getError();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMetadata();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
  f = message.getExecutionContext();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_struct_pb.Value.serializeBinaryToWriter
    );
  }
  f = message.getErrorCode();
  if (f !== 0.0) {
    writer.writeEnum(
      6,
      f
    );
  }
  f = message.getBlockTrigger();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.aggregator.BlockTrigger.Output.serializeBinaryToWriter
    );
  }
  f = message.getFixedTimeTrigger();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      proto.aggregator.FixedTimeTrigger.Output.serializeBinaryToWriter
    );
  }
  f = message.getCronTrigger();
  if (f != null) {
    writer.writeMessage(
      12,
      f,
      proto.aggregator.CronTrigger.Output.serializeBinaryToWriter
    );
  }
  f = message.getEventTrigger();
  if (f != null) {
    writer.writeMessage(
      13,
      f,
      proto.aggregator.EventTrigger.Output.serializeBinaryToWriter
    );
  }
  f = message.getManualTrigger();
  if (f != null) {
    writer.writeMessage(
      14,
      f,
      proto.aggregator.ManualTrigger.Output.serializeBinaryToWriter
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.aggregator.RunTriggerResp.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.RunTriggerResp} returns this
 */
proto.aggregator.RunTriggerResp.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string error = 2;
 * @return {string}
 */
proto.aggregator.RunTriggerResp.prototype.getError = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.RunTriggerResp} returns this
 */
proto.aggregator.RunTriggerResp.prototype.setError = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional google.protobuf.Value metadata = 4;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.RunTriggerResp.prototype.getMetadata = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 4));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.RunTriggerResp} returns this
*/
proto.aggregator.RunTriggerResp.prototype.setMetadata = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunTriggerResp} returns this
 */
proto.aggregator.RunTriggerResp.prototype.clearMetadata = function() {
  return this.setMetadata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunTriggerResp.prototype.hasMetadata = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional google.protobuf.Value execution_context = 5;
 * @return {?proto.google.protobuf.Value}
 */
proto.aggregator.RunTriggerResp.prototype.getExecutionContext = function() {
  return /** @type{?proto.google.protobuf.Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Value, 5));
};


/**
 * @param {?proto.google.protobuf.Value|undefined} value
 * @return {!proto.aggregator.RunTriggerResp} returns this
*/
proto.aggregator.RunTriggerResp.prototype.setExecutionContext = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunTriggerResp} returns this
 */
proto.aggregator.RunTriggerResp.prototype.clearExecutionContext = function() {
  return this.setExecutionContext(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunTriggerResp.prototype.hasExecutionContext = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional ErrorCode error_code = 6;
 * @return {!proto.aggregator.ErrorCode}
 */
proto.aggregator.RunTriggerResp.prototype.getErrorCode = function() {
  return /** @type {!proto.aggregator.ErrorCode} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {!proto.aggregator.ErrorCode} value
 * @return {!proto.aggregator.RunTriggerResp} returns this
 */
proto.aggregator.RunTriggerResp.prototype.setErrorCode = function(value) {
  return jspb.Message.setProto3EnumField(this, 6, value);
};


/**
 * optional BlockTrigger.Output block_trigger = 10;
 * @return {?proto.aggregator.BlockTrigger.Output}
 */
proto.aggregator.RunTriggerResp.prototype.getBlockTrigger = function() {
  return /** @type{?proto.aggregator.BlockTrigger.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.BlockTrigger.Output, 10));
};


/**
 * @param {?proto.aggregator.BlockTrigger.Output|undefined} value
 * @return {!proto.aggregator.RunTriggerResp} returns this
*/
proto.aggregator.RunTriggerResp.prototype.setBlockTrigger = function(value) {
  return jspb.Message.setOneofWrapperField(this, 10, proto.aggregator.RunTriggerResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunTriggerResp} returns this
 */
proto.aggregator.RunTriggerResp.prototype.clearBlockTrigger = function() {
  return this.setBlockTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunTriggerResp.prototype.hasBlockTrigger = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional FixedTimeTrigger.Output fixed_time_trigger = 11;
 * @return {?proto.aggregator.FixedTimeTrigger.Output}
 */
proto.aggregator.RunTriggerResp.prototype.getFixedTimeTrigger = function() {
  return /** @type{?proto.aggregator.FixedTimeTrigger.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FixedTimeTrigger.Output, 11));
};


/**
 * @param {?proto.aggregator.FixedTimeTrigger.Output|undefined} value
 * @return {!proto.aggregator.RunTriggerResp} returns this
*/
proto.aggregator.RunTriggerResp.prototype.setFixedTimeTrigger = function(value) {
  return jspb.Message.setOneofWrapperField(this, 11, proto.aggregator.RunTriggerResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunTriggerResp} returns this
 */
proto.aggregator.RunTriggerResp.prototype.clearFixedTimeTrigger = function() {
  return this.setFixedTimeTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunTriggerResp.prototype.hasFixedTimeTrigger = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional CronTrigger.Output cron_trigger = 12;
 * @return {?proto.aggregator.CronTrigger.Output}
 */
proto.aggregator.RunTriggerResp.prototype.getCronTrigger = function() {
  return /** @type{?proto.aggregator.CronTrigger.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.CronTrigger.Output, 12));
};


/**
 * @param {?proto.aggregator.CronTrigger.Output|undefined} value
 * @return {!proto.aggregator.RunTriggerResp} returns this
*/
proto.aggregator.RunTriggerResp.prototype.setCronTrigger = function(value) {
  return jspb.Message.setOneofWrapperField(this, 12, proto.aggregator.RunTriggerResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunTriggerResp} returns this
 */
proto.aggregator.RunTriggerResp.prototype.clearCronTrigger = function() {
  return this.setCronTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunTriggerResp.prototype.hasCronTrigger = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * optional EventTrigger.Output event_trigger = 13;
 * @return {?proto.aggregator.EventTrigger.Output}
 */
proto.aggregator.RunTriggerResp.prototype.getEventTrigger = function() {
  return /** @type{?proto.aggregator.EventTrigger.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.EventTrigger.Output, 13));
};


/**
 * @param {?proto.aggregator.EventTrigger.Output|undefined} value
 * @return {!proto.aggregator.RunTriggerResp} returns this
*/
proto.aggregator.RunTriggerResp.prototype.setEventTrigger = function(value) {
  return jspb.Message.setOneofWrapperField(this, 13, proto.aggregator.RunTriggerResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunTriggerResp} returns this
 */
proto.aggregator.RunTriggerResp.prototype.clearEventTrigger = function() {
  return this.setEventTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunTriggerResp.prototype.hasEventTrigger = function() {
  return jspb.Message.getField(this, 13) != null;
};


/**
 * optional ManualTrigger.Output manual_trigger = 14;
 * @return {?proto.aggregator.ManualTrigger.Output}
 */
proto.aggregator.RunTriggerResp.prototype.getManualTrigger = function() {
  return /** @type{?proto.aggregator.ManualTrigger.Output} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.ManualTrigger.Output, 14));
};


/**
 * @param {?proto.aggregator.ManualTrigger.Output|undefined} value
 * @return {!proto.aggregator.RunTriggerResp} returns this
*/
proto.aggregator.RunTriggerResp.prototype.setManualTrigger = function(value) {
  return jspb.Message.setOneofWrapperField(this, 14, proto.aggregator.RunTriggerResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.RunTriggerResp} returns this
 */
proto.aggregator.RunTriggerResp.prototype.clearManualTrigger = function() {
  return this.setManualTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.RunTriggerResp.prototype.hasManualTrigger = function() {
  return jspb.Message.getField(this, 14) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.SimulateTaskReq.repeatedFields_ = [2,3];



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
proto.aggregator.SimulateTaskReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.SimulateTaskReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.SimulateTaskReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.SimulateTaskReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    trigger: (f = msg.getTrigger()) && proto.aggregator.TaskTrigger.toObject(includeInstance, f),
    nodesList: jspb.Message.toObjectList(msg.getNodesList(),
    proto.aggregator.TaskNode.toObject, includeInstance),
    edgesList: jspb.Message.toObjectList(msg.getEdgesList(),
    proto.aggregator.TaskEdge.toObject, includeInstance),
    inputVariablesMap: (f = msg.getInputVariablesMap()) ? f.toObject(includeInstance, proto.google.protobuf.Value.toObject) : []
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
 * @return {!proto.aggregator.SimulateTaskReq}
 */
proto.aggregator.SimulateTaskReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.SimulateTaskReq;
  return proto.aggregator.SimulateTaskReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.SimulateTaskReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.SimulateTaskReq}
 */
proto.aggregator.SimulateTaskReq.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.aggregator.TaskNode;
      reader.readMessage(value,proto.aggregator.TaskNode.deserializeBinaryFromReader);
      msg.addNodes(value);
      break;
    case 3:
      var value = new proto.aggregator.TaskEdge;
      reader.readMessage(value,proto.aggregator.TaskEdge.deserializeBinaryFromReader);
      msg.addEdges(value);
      break;
    case 6:
      var value = msg.getInputVariablesMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.google.protobuf.Value.deserializeBinaryFromReader, "", new proto.google.protobuf.Value());
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
proto.aggregator.SimulateTaskReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.SimulateTaskReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.SimulateTaskReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.SimulateTaskReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTrigger();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.TaskTrigger.serializeBinaryToWriter
    );
  }
  f = message.getNodesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.aggregator.TaskNode.serializeBinaryToWriter
    );
  }
  f = message.getEdgesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.aggregator.TaskEdge.serializeBinaryToWriter
    );
  }
  f = message.getInputVariablesMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(6, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.google.protobuf.Value.serializeBinaryToWriter);
  }
};


/**
 * optional TaskTrigger trigger = 1;
 * @return {?proto.aggregator.TaskTrigger}
 */
proto.aggregator.SimulateTaskReq.prototype.getTrigger = function() {
  return /** @type{?proto.aggregator.TaskTrigger} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.TaskTrigger, 1));
};


/**
 * @param {?proto.aggregator.TaskTrigger|undefined} value
 * @return {!proto.aggregator.SimulateTaskReq} returns this
*/
proto.aggregator.SimulateTaskReq.prototype.setTrigger = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.SimulateTaskReq} returns this
 */
proto.aggregator.SimulateTaskReq.prototype.clearTrigger = function() {
  return this.setTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.SimulateTaskReq.prototype.hasTrigger = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated TaskNode nodes = 2;
 * @return {!Array<!proto.aggregator.TaskNode>}
 */
proto.aggregator.SimulateTaskReq.prototype.getNodesList = function() {
  return /** @type{!Array<!proto.aggregator.TaskNode>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.TaskNode, 2));
};


/**
 * @param {!Array<!proto.aggregator.TaskNode>} value
 * @return {!proto.aggregator.SimulateTaskReq} returns this
*/
proto.aggregator.SimulateTaskReq.prototype.setNodesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.aggregator.TaskNode=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.TaskNode}
 */
proto.aggregator.SimulateTaskReq.prototype.addNodes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.aggregator.TaskNode, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.SimulateTaskReq} returns this
 */
proto.aggregator.SimulateTaskReq.prototype.clearNodesList = function() {
  return this.setNodesList([]);
};


/**
 * repeated TaskEdge edges = 3;
 * @return {!Array<!proto.aggregator.TaskEdge>}
 */
proto.aggregator.SimulateTaskReq.prototype.getEdgesList = function() {
  return /** @type{!Array<!proto.aggregator.TaskEdge>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.TaskEdge, 3));
};


/**
 * @param {!Array<!proto.aggregator.TaskEdge>} value
 * @return {!proto.aggregator.SimulateTaskReq} returns this
*/
proto.aggregator.SimulateTaskReq.prototype.setEdgesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.aggregator.TaskEdge=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.TaskEdge}
 */
proto.aggregator.SimulateTaskReq.prototype.addEdges = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.aggregator.TaskEdge, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.SimulateTaskReq} returns this
 */
proto.aggregator.SimulateTaskReq.prototype.clearEdgesList = function() {
  return this.setEdgesList([]);
};


/**
 * map<string, google.protobuf.Value> input_variables = 6;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.google.protobuf.Value>}
 */
proto.aggregator.SimulateTaskReq.prototype.getInputVariablesMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.google.protobuf.Value>} */ (
      jspb.Message.getMapField(this, 6, opt_noLazyCreate,
      proto.google.protobuf.Value));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.aggregator.SimulateTaskReq} returns this
 */
proto.aggregator.SimulateTaskReq.prototype.clearInputVariablesMap = function() {
  this.getInputVariablesMap().clear();
  return this;};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.EstimateFeesReq.repeatedFields_ = [2,3];



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
proto.aggregator.EstimateFeesReq.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.EstimateFeesReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.EstimateFeesReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EstimateFeesReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    trigger: (f = msg.getTrigger()) && proto.aggregator.TaskTrigger.toObject(includeInstance, f),
    nodesList: jspb.Message.toObjectList(msg.getNodesList(),
    proto.aggregator.TaskNode.toObject, includeInstance),
    edgesList: jspb.Message.toObjectList(msg.getEdgesList(),
    proto.aggregator.TaskEdge.toObject, includeInstance),
    createdAt: jspb.Message.getFieldWithDefault(msg, 4, 0),
    expireAt: jspb.Message.getFieldWithDefault(msg, 5, 0),
    maxExecution: jspb.Message.getFieldWithDefault(msg, 6, 0),
    runner: jspb.Message.getFieldWithDefault(msg, 7, ""),
    inputVariablesMap: (f = msg.getInputVariablesMap()) ? f.toObject(includeInstance, proto.google.protobuf.Value.toObject) : []
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
 * @return {!proto.aggregator.EstimateFeesReq}
 */
proto.aggregator.EstimateFeesReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.EstimateFeesReq;
  return proto.aggregator.EstimateFeesReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.EstimateFeesReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.EstimateFeesReq}
 */
proto.aggregator.EstimateFeesReq.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.aggregator.TaskNode;
      reader.readMessage(value,proto.aggregator.TaskNode.deserializeBinaryFromReader);
      msg.addNodes(value);
      break;
    case 3:
      var value = new proto.aggregator.TaskEdge;
      reader.readMessage(value,proto.aggregator.TaskEdge.deserializeBinaryFromReader);
      msg.addEdges(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCreatedAt(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExpireAt(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setMaxExecution(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setRunner(value);
      break;
    case 8:
      var value = msg.getInputVariablesMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.google.protobuf.Value.deserializeBinaryFromReader, "", new proto.google.protobuf.Value());
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
proto.aggregator.EstimateFeesReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.EstimateFeesReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.EstimateFeesReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EstimateFeesReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTrigger();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.TaskTrigger.serializeBinaryToWriter
    );
  }
  f = message.getNodesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.aggregator.TaskNode.serializeBinaryToWriter
    );
  }
  f = message.getEdgesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.aggregator.TaskEdge.serializeBinaryToWriter
    );
  }
  f = message.getCreatedAt();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getExpireAt();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getMaxExecution();
  if (f !== 0) {
    writer.writeInt64(
      6,
      f
    );
  }
  f = message.getRunner();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getInputVariablesMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(8, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.google.protobuf.Value.serializeBinaryToWriter);
  }
};


/**
 * optional TaskTrigger trigger = 1;
 * @return {?proto.aggregator.TaskTrigger}
 */
proto.aggregator.EstimateFeesReq.prototype.getTrigger = function() {
  return /** @type{?proto.aggregator.TaskTrigger} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.TaskTrigger, 1));
};


/**
 * @param {?proto.aggregator.TaskTrigger|undefined} value
 * @return {!proto.aggregator.EstimateFeesReq} returns this
*/
proto.aggregator.EstimateFeesReq.prototype.setTrigger = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.EstimateFeesReq} returns this
 */
proto.aggregator.EstimateFeesReq.prototype.clearTrigger = function() {
  return this.setTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.EstimateFeesReq.prototype.hasTrigger = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated TaskNode nodes = 2;
 * @return {!Array<!proto.aggregator.TaskNode>}
 */
proto.aggregator.EstimateFeesReq.prototype.getNodesList = function() {
  return /** @type{!Array<!proto.aggregator.TaskNode>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.TaskNode, 2));
};


/**
 * @param {!Array<!proto.aggregator.TaskNode>} value
 * @return {!proto.aggregator.EstimateFeesReq} returns this
*/
proto.aggregator.EstimateFeesReq.prototype.setNodesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.aggregator.TaskNode=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.TaskNode}
 */
proto.aggregator.EstimateFeesReq.prototype.addNodes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.aggregator.TaskNode, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.EstimateFeesReq} returns this
 */
proto.aggregator.EstimateFeesReq.prototype.clearNodesList = function() {
  return this.setNodesList([]);
};


/**
 * repeated TaskEdge edges = 3;
 * @return {!Array<!proto.aggregator.TaskEdge>}
 */
proto.aggregator.EstimateFeesReq.prototype.getEdgesList = function() {
  return /** @type{!Array<!proto.aggregator.TaskEdge>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.TaskEdge, 3));
};


/**
 * @param {!Array<!proto.aggregator.TaskEdge>} value
 * @return {!proto.aggregator.EstimateFeesReq} returns this
*/
proto.aggregator.EstimateFeesReq.prototype.setEdgesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.aggregator.TaskEdge=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.TaskEdge}
 */
proto.aggregator.EstimateFeesReq.prototype.addEdges = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.aggregator.TaskEdge, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.EstimateFeesReq} returns this
 */
proto.aggregator.EstimateFeesReq.prototype.clearEdgesList = function() {
  return this.setEdgesList([]);
};


/**
 * optional int64 created_at = 4;
 * @return {number}
 */
proto.aggregator.EstimateFeesReq.prototype.getCreatedAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.EstimateFeesReq} returns this
 */
proto.aggregator.EstimateFeesReq.prototype.setCreatedAt = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int64 expire_at = 5;
 * @return {number}
 */
proto.aggregator.EstimateFeesReq.prototype.getExpireAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.EstimateFeesReq} returns this
 */
proto.aggregator.EstimateFeesReq.prototype.setExpireAt = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int64 max_execution = 6;
 * @return {number}
 */
proto.aggregator.EstimateFeesReq.prototype.getMaxExecution = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.EstimateFeesReq} returns this
 */
proto.aggregator.EstimateFeesReq.prototype.setMaxExecution = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional string runner = 7;
 * @return {string}
 */
proto.aggregator.EstimateFeesReq.prototype.getRunner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.EstimateFeesReq} returns this
 */
proto.aggregator.EstimateFeesReq.prototype.setRunner = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * map<string, google.protobuf.Value> input_variables = 8;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.google.protobuf.Value>}
 */
proto.aggregator.EstimateFeesReq.prototype.getInputVariablesMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.google.protobuf.Value>} */ (
      jspb.Message.getMapField(this, 8, opt_noLazyCreate,
      proto.google.protobuf.Value));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.aggregator.EstimateFeesReq} returns this
 */
proto.aggregator.EstimateFeesReq.prototype.clearInputVariablesMap = function() {
  this.getInputVariablesMap().clear();
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
proto.aggregator.FeeAmount.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.FeeAmount.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.FeeAmount} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.FeeAmount.toObject = function(includeInstance, msg) {
  var f, obj = {
    nativeTokenAmount: jspb.Message.getFieldWithDefault(msg, 1, ""),
    nativeTokenSymbol: jspb.Message.getFieldWithDefault(msg, 2, ""),
    usdAmount: jspb.Message.getFieldWithDefault(msg, 3, ""),
    apTokenAmount: jspb.Message.getFieldWithDefault(msg, 4, "")
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
 * @return {!proto.aggregator.FeeAmount}
 */
proto.aggregator.FeeAmount.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.FeeAmount;
  return proto.aggregator.FeeAmount.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.FeeAmount} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.FeeAmount}
 */
proto.aggregator.FeeAmount.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setNativeTokenAmount(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNativeTokenSymbol(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsdAmount(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setApTokenAmount(value);
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
proto.aggregator.FeeAmount.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.FeeAmount.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.FeeAmount} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.FeeAmount.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNativeTokenAmount();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNativeTokenSymbol();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getUsdAmount();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getApTokenAmount();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string native_token_amount = 1;
 * @return {string}
 */
proto.aggregator.FeeAmount.prototype.getNativeTokenAmount = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.FeeAmount} returns this
 */
proto.aggregator.FeeAmount.prototype.setNativeTokenAmount = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string native_token_symbol = 2;
 * @return {string}
 */
proto.aggregator.FeeAmount.prototype.getNativeTokenSymbol = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.FeeAmount} returns this
 */
proto.aggregator.FeeAmount.prototype.setNativeTokenSymbol = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string usd_amount = 3;
 * @return {string}
 */
proto.aggregator.FeeAmount.prototype.getUsdAmount = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.FeeAmount} returns this
 */
proto.aggregator.FeeAmount.prototype.setUsdAmount = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string ap_token_amount = 4;
 * @return {string}
 */
proto.aggregator.FeeAmount.prototype.getApTokenAmount = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.FeeAmount} returns this
 */
proto.aggregator.FeeAmount.prototype.setApTokenAmount = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.GasFeeBreakdown.repeatedFields_ = [2];



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
proto.aggregator.GasFeeBreakdown.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.GasFeeBreakdown.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.GasFeeBreakdown} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GasFeeBreakdown.toObject = function(includeInstance, msg) {
  var f, obj = {
    totalGasFees: (f = msg.getTotalGasFees()) && proto.aggregator.FeeAmount.toObject(includeInstance, f),
    operationsList: jspb.Message.toObjectList(msg.getOperationsList(),
    proto.aggregator.GasOperationFee.toObject, includeInstance),
    gasPriceGwei: jspb.Message.getFieldWithDefault(msg, 3, ""),
    totalGasUnits: jspb.Message.getFieldWithDefault(msg, 4, ""),
    estimationAccurate: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    estimationMethod: jspb.Message.getFieldWithDefault(msg, 6, "")
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
 * @return {!proto.aggregator.GasFeeBreakdown}
 */
proto.aggregator.GasFeeBreakdown.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.GasFeeBreakdown;
  return proto.aggregator.GasFeeBreakdown.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.GasFeeBreakdown} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.GasFeeBreakdown}
 */
proto.aggregator.GasFeeBreakdown.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.FeeAmount;
      reader.readMessage(value,proto.aggregator.FeeAmount.deserializeBinaryFromReader);
      msg.setTotalGasFees(value);
      break;
    case 2:
      var value = new proto.aggregator.GasOperationFee;
      reader.readMessage(value,proto.aggregator.GasOperationFee.deserializeBinaryFromReader);
      msg.addOperations(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setGasPriceGwei(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setTotalGasUnits(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setEstimationAccurate(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setEstimationMethod(value);
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
proto.aggregator.GasFeeBreakdown.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.GasFeeBreakdown.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.GasFeeBreakdown} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GasFeeBreakdown.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTotalGasFees();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.FeeAmount.serializeBinaryToWriter
    );
  }
  f = message.getOperationsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.aggregator.GasOperationFee.serializeBinaryToWriter
    );
  }
  f = message.getGasPriceGwei();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getTotalGasUnits();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getEstimationAccurate();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getEstimationMethod();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional FeeAmount total_gas_fees = 1;
 * @return {?proto.aggregator.FeeAmount}
 */
proto.aggregator.GasFeeBreakdown.prototype.getTotalGasFees = function() {
  return /** @type{?proto.aggregator.FeeAmount} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FeeAmount, 1));
};


/**
 * @param {?proto.aggregator.FeeAmount|undefined} value
 * @return {!proto.aggregator.GasFeeBreakdown} returns this
*/
proto.aggregator.GasFeeBreakdown.prototype.setTotalGasFees = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.GasFeeBreakdown} returns this
 */
proto.aggregator.GasFeeBreakdown.prototype.clearTotalGasFees = function() {
  return this.setTotalGasFees(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.GasFeeBreakdown.prototype.hasTotalGasFees = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated GasOperationFee operations = 2;
 * @return {!Array<!proto.aggregator.GasOperationFee>}
 */
proto.aggregator.GasFeeBreakdown.prototype.getOperationsList = function() {
  return /** @type{!Array<!proto.aggregator.GasOperationFee>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.GasOperationFee, 2));
};


/**
 * @param {!Array<!proto.aggregator.GasOperationFee>} value
 * @return {!proto.aggregator.GasFeeBreakdown} returns this
*/
proto.aggregator.GasFeeBreakdown.prototype.setOperationsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.aggregator.GasOperationFee=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.GasOperationFee}
 */
proto.aggregator.GasFeeBreakdown.prototype.addOperations = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.aggregator.GasOperationFee, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.GasFeeBreakdown} returns this
 */
proto.aggregator.GasFeeBreakdown.prototype.clearOperationsList = function() {
  return this.setOperationsList([]);
};


/**
 * optional string gas_price_gwei = 3;
 * @return {string}
 */
proto.aggregator.GasFeeBreakdown.prototype.getGasPriceGwei = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GasFeeBreakdown} returns this
 */
proto.aggregator.GasFeeBreakdown.prototype.setGasPriceGwei = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string total_gas_units = 4;
 * @return {string}
 */
proto.aggregator.GasFeeBreakdown.prototype.getTotalGasUnits = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GasFeeBreakdown} returns this
 */
proto.aggregator.GasFeeBreakdown.prototype.setTotalGasUnits = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional bool estimation_accurate = 5;
 * @return {boolean}
 */
proto.aggregator.GasFeeBreakdown.prototype.getEstimationAccurate = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.GasFeeBreakdown} returns this
 */
proto.aggregator.GasFeeBreakdown.prototype.setEstimationAccurate = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional string estimation_method = 6;
 * @return {string}
 */
proto.aggregator.GasFeeBreakdown.prototype.getEstimationMethod = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GasFeeBreakdown} returns this
 */
proto.aggregator.GasFeeBreakdown.prototype.setEstimationMethod = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
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
proto.aggregator.GasOperationFee.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.GasOperationFee.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.GasOperationFee} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GasOperationFee.toObject = function(includeInstance, msg) {
  var f, obj = {
    operationType: jspb.Message.getFieldWithDefault(msg, 1, ""),
    nodeId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    methodName: jspb.Message.getFieldWithDefault(msg, 3, ""),
    fee: (f = msg.getFee()) && proto.aggregator.FeeAmount.toObject(includeInstance, f),
    gasUnits: jspb.Message.getFieldWithDefault(msg, 5, "")
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
 * @return {!proto.aggregator.GasOperationFee}
 */
proto.aggregator.GasOperationFee.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.GasOperationFee;
  return proto.aggregator.GasOperationFee.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.GasOperationFee} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.GasOperationFee}
 */
proto.aggregator.GasOperationFee.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOperationType(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNodeId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setMethodName(value);
      break;
    case 4:
      var value = new proto.aggregator.FeeAmount;
      reader.readMessage(value,proto.aggregator.FeeAmount.deserializeBinaryFromReader);
      msg.setFee(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setGasUnits(value);
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
proto.aggregator.GasOperationFee.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.GasOperationFee.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.GasOperationFee} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.GasOperationFee.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOperationType();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNodeId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMethodName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getFee();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.aggregator.FeeAmount.serializeBinaryToWriter
    );
  }
  f = message.getGasUnits();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional string operation_type = 1;
 * @return {string}
 */
proto.aggregator.GasOperationFee.prototype.getOperationType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GasOperationFee} returns this
 */
proto.aggregator.GasOperationFee.prototype.setOperationType = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string node_id = 2;
 * @return {string}
 */
proto.aggregator.GasOperationFee.prototype.getNodeId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GasOperationFee} returns this
 */
proto.aggregator.GasOperationFee.prototype.setNodeId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string method_name = 3;
 * @return {string}
 */
proto.aggregator.GasOperationFee.prototype.getMethodName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GasOperationFee} returns this
 */
proto.aggregator.GasOperationFee.prototype.setMethodName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional FeeAmount fee = 4;
 * @return {?proto.aggregator.FeeAmount}
 */
proto.aggregator.GasOperationFee.prototype.getFee = function() {
  return /** @type{?proto.aggregator.FeeAmount} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FeeAmount, 4));
};


/**
 * @param {?proto.aggregator.FeeAmount|undefined} value
 * @return {!proto.aggregator.GasOperationFee} returns this
*/
proto.aggregator.GasOperationFee.prototype.setFee = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.GasOperationFee} returns this
 */
proto.aggregator.GasOperationFee.prototype.clearFee = function() {
  return this.setFee(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.GasOperationFee.prototype.hasFee = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional string gas_units = 5;
 * @return {string}
 */
proto.aggregator.GasOperationFee.prototype.getGasUnits = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.GasOperationFee} returns this
 */
proto.aggregator.GasOperationFee.prototype.setGasUnits = function(value) {
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
proto.aggregator.SmartWalletCreationFee.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.SmartWalletCreationFee.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.SmartWalletCreationFee} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.SmartWalletCreationFee.toObject = function(includeInstance, msg) {
  var f, obj = {
    creationRequired: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    creationFee: (f = msg.getCreationFee()) && proto.aggregator.FeeAmount.toObject(includeInstance, f),
    initialFunding: (f = msg.getInitialFunding()) && proto.aggregator.FeeAmount.toObject(includeInstance, f),
    walletAddress: jspb.Message.getFieldWithDefault(msg, 4, "")
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
 * @return {!proto.aggregator.SmartWalletCreationFee}
 */
proto.aggregator.SmartWalletCreationFee.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.SmartWalletCreationFee;
  return proto.aggregator.SmartWalletCreationFee.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.SmartWalletCreationFee} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.SmartWalletCreationFee}
 */
proto.aggregator.SmartWalletCreationFee.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setCreationRequired(value);
      break;
    case 2:
      var value = new proto.aggregator.FeeAmount;
      reader.readMessage(value,proto.aggregator.FeeAmount.deserializeBinaryFromReader);
      msg.setCreationFee(value);
      break;
    case 3:
      var value = new proto.aggregator.FeeAmount;
      reader.readMessage(value,proto.aggregator.FeeAmount.deserializeBinaryFromReader);
      msg.setInitialFunding(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setWalletAddress(value);
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
proto.aggregator.SmartWalletCreationFee.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.SmartWalletCreationFee.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.SmartWalletCreationFee} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.SmartWalletCreationFee.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCreationRequired();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getCreationFee();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.aggregator.FeeAmount.serializeBinaryToWriter
    );
  }
  f = message.getInitialFunding();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.aggregator.FeeAmount.serializeBinaryToWriter
    );
  }
  f = message.getWalletAddress();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional bool creation_required = 1;
 * @return {boolean}
 */
proto.aggregator.SmartWalletCreationFee.prototype.getCreationRequired = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.SmartWalletCreationFee} returns this
 */
proto.aggregator.SmartWalletCreationFee.prototype.setCreationRequired = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional FeeAmount creation_fee = 2;
 * @return {?proto.aggregator.FeeAmount}
 */
proto.aggregator.SmartWalletCreationFee.prototype.getCreationFee = function() {
  return /** @type{?proto.aggregator.FeeAmount} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FeeAmount, 2));
};


/**
 * @param {?proto.aggregator.FeeAmount|undefined} value
 * @return {!proto.aggregator.SmartWalletCreationFee} returns this
*/
proto.aggregator.SmartWalletCreationFee.prototype.setCreationFee = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.SmartWalletCreationFee} returns this
 */
proto.aggregator.SmartWalletCreationFee.prototype.clearCreationFee = function() {
  return this.setCreationFee(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.SmartWalletCreationFee.prototype.hasCreationFee = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional FeeAmount initial_funding = 3;
 * @return {?proto.aggregator.FeeAmount}
 */
proto.aggregator.SmartWalletCreationFee.prototype.getInitialFunding = function() {
  return /** @type{?proto.aggregator.FeeAmount} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FeeAmount, 3));
};


/**
 * @param {?proto.aggregator.FeeAmount|undefined} value
 * @return {!proto.aggregator.SmartWalletCreationFee} returns this
*/
proto.aggregator.SmartWalletCreationFee.prototype.setInitialFunding = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.SmartWalletCreationFee} returns this
 */
proto.aggregator.SmartWalletCreationFee.prototype.clearInitialFunding = function() {
  return this.setInitialFunding(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.SmartWalletCreationFee.prototype.hasInitialFunding = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string wallet_address = 4;
 * @return {string}
 */
proto.aggregator.SmartWalletCreationFee.prototype.getWalletAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.SmartWalletCreationFee} returns this
 */
proto.aggregator.SmartWalletCreationFee.prototype.setWalletAddress = function(value) {
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
proto.aggregator.AutomationFee.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.AutomationFee.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.AutomationFee} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.AutomationFee.toObject = function(includeInstance, msg) {
  var f, obj = {
    baseFee: (f = msg.getBaseFee()) && proto.aggregator.FeeAmount.toObject(includeInstance, f),
    monitoringFee: (f = msg.getMonitoringFee()) && proto.aggregator.FeeAmount.toObject(includeInstance, f),
    executionFee: (f = msg.getExecutionFee()) && proto.aggregator.FeeAmount.toObject(includeInstance, f),
    triggerType: jspb.Message.getFieldWithDefault(msg, 4, ""),
    estimatedExecutions: jspb.Message.getFieldWithDefault(msg, 5, 0),
    durationMinutes: jspb.Message.getFieldWithDefault(msg, 6, 0),
    feeCalculationMethod: jspb.Message.getFieldWithDefault(msg, 7, "")
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
 * @return {!proto.aggregator.AutomationFee}
 */
proto.aggregator.AutomationFee.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.AutomationFee;
  return proto.aggregator.AutomationFee.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.AutomationFee} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.AutomationFee}
 */
proto.aggregator.AutomationFee.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.aggregator.FeeAmount;
      reader.readMessage(value,proto.aggregator.FeeAmount.deserializeBinaryFromReader);
      msg.setBaseFee(value);
      break;
    case 2:
      var value = new proto.aggregator.FeeAmount;
      reader.readMessage(value,proto.aggregator.FeeAmount.deserializeBinaryFromReader);
      msg.setMonitoringFee(value);
      break;
    case 3:
      var value = new proto.aggregator.FeeAmount;
      reader.readMessage(value,proto.aggregator.FeeAmount.deserializeBinaryFromReader);
      msg.setExecutionFee(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setTriggerType(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEstimatedExecutions(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setDurationMinutes(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setFeeCalculationMethod(value);
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
proto.aggregator.AutomationFee.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.AutomationFee.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.AutomationFee} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.AutomationFee.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBaseFee();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.aggregator.FeeAmount.serializeBinaryToWriter
    );
  }
  f = message.getMonitoringFee();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.aggregator.FeeAmount.serializeBinaryToWriter
    );
  }
  f = message.getExecutionFee();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.aggregator.FeeAmount.serializeBinaryToWriter
    );
  }
  f = message.getTriggerType();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getEstimatedExecutions();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getDurationMinutes();
  if (f !== 0) {
    writer.writeInt64(
      6,
      f
    );
  }
  f = message.getFeeCalculationMethod();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
};


/**
 * optional FeeAmount base_fee = 1;
 * @return {?proto.aggregator.FeeAmount}
 */
proto.aggregator.AutomationFee.prototype.getBaseFee = function() {
  return /** @type{?proto.aggregator.FeeAmount} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FeeAmount, 1));
};


/**
 * @param {?proto.aggregator.FeeAmount|undefined} value
 * @return {!proto.aggregator.AutomationFee} returns this
*/
proto.aggregator.AutomationFee.prototype.setBaseFee = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.AutomationFee} returns this
 */
proto.aggregator.AutomationFee.prototype.clearBaseFee = function() {
  return this.setBaseFee(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.AutomationFee.prototype.hasBaseFee = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional FeeAmount monitoring_fee = 2;
 * @return {?proto.aggregator.FeeAmount}
 */
proto.aggregator.AutomationFee.prototype.getMonitoringFee = function() {
  return /** @type{?proto.aggregator.FeeAmount} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FeeAmount, 2));
};


/**
 * @param {?proto.aggregator.FeeAmount|undefined} value
 * @return {!proto.aggregator.AutomationFee} returns this
*/
proto.aggregator.AutomationFee.prototype.setMonitoringFee = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.AutomationFee} returns this
 */
proto.aggregator.AutomationFee.prototype.clearMonitoringFee = function() {
  return this.setMonitoringFee(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.AutomationFee.prototype.hasMonitoringFee = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional FeeAmount execution_fee = 3;
 * @return {?proto.aggregator.FeeAmount}
 */
proto.aggregator.AutomationFee.prototype.getExecutionFee = function() {
  return /** @type{?proto.aggregator.FeeAmount} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FeeAmount, 3));
};


/**
 * @param {?proto.aggregator.FeeAmount|undefined} value
 * @return {!proto.aggregator.AutomationFee} returns this
*/
proto.aggregator.AutomationFee.prototype.setExecutionFee = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.AutomationFee} returns this
 */
proto.aggregator.AutomationFee.prototype.clearExecutionFee = function() {
  return this.setExecutionFee(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.AutomationFee.prototype.hasExecutionFee = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string trigger_type = 4;
 * @return {string}
 */
proto.aggregator.AutomationFee.prototype.getTriggerType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.AutomationFee} returns this
 */
proto.aggregator.AutomationFee.prototype.setTriggerType = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional int64 estimated_executions = 5;
 * @return {number}
 */
proto.aggregator.AutomationFee.prototype.getEstimatedExecutions = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.AutomationFee} returns this
 */
proto.aggregator.AutomationFee.prototype.setEstimatedExecutions = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int64 duration_minutes = 6;
 * @return {number}
 */
proto.aggregator.AutomationFee.prototype.getDurationMinutes = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.AutomationFee} returns this
 */
proto.aggregator.AutomationFee.prototype.setDurationMinutes = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional string fee_calculation_method = 7;
 * @return {string}
 */
proto.aggregator.AutomationFee.prototype.getFeeCalculationMethod = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.AutomationFee} returns this
 */
proto.aggregator.AutomationFee.prototype.setFeeCalculationMethod = function(value) {
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
proto.aggregator.FeeDiscount.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.FeeDiscount.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.FeeDiscount} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.FeeDiscount.toObject = function(includeInstance, msg) {
  var f, obj = {
    discountType: jspb.Message.getFieldWithDefault(msg, 1, ""),
    discountName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    appliesTo: jspb.Message.getFieldWithDefault(msg, 3, ""),
    discountPercentage: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    discountAmount: (f = msg.getDiscountAmount()) && proto.aggregator.FeeAmount.toObject(includeInstance, f),
    expiryDate: jspb.Message.getFieldWithDefault(msg, 6, ""),
    terms: jspb.Message.getFieldWithDefault(msg, 7, "")
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
 * @return {!proto.aggregator.FeeDiscount}
 */
proto.aggregator.FeeDiscount.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.FeeDiscount;
  return proto.aggregator.FeeDiscount.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.FeeDiscount} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.FeeDiscount}
 */
proto.aggregator.FeeDiscount.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setDiscountType(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDiscountName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setAppliesTo(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setDiscountPercentage(value);
      break;
    case 5:
      var value = new proto.aggregator.FeeAmount;
      reader.readMessage(value,proto.aggregator.FeeAmount.deserializeBinaryFromReader);
      msg.setDiscountAmount(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setExpiryDate(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setTerms(value);
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
proto.aggregator.FeeDiscount.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.FeeDiscount.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.FeeDiscount} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.FeeDiscount.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDiscountType();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDiscountName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getAppliesTo();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getDiscountPercentage();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = message.getDiscountAmount();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.aggregator.FeeAmount.serializeBinaryToWriter
    );
  }
  f = message.getExpiryDate();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getTerms();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
};


/**
 * optional string discount_type = 1;
 * @return {string}
 */
proto.aggregator.FeeDiscount.prototype.getDiscountType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.FeeDiscount} returns this
 */
proto.aggregator.FeeDiscount.prototype.setDiscountType = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string discount_name = 2;
 * @return {string}
 */
proto.aggregator.FeeDiscount.prototype.getDiscountName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.FeeDiscount} returns this
 */
proto.aggregator.FeeDiscount.prototype.setDiscountName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string applies_to = 3;
 * @return {string}
 */
proto.aggregator.FeeDiscount.prototype.getAppliesTo = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.FeeDiscount} returns this
 */
proto.aggregator.FeeDiscount.prototype.setAppliesTo = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional float discount_percentage = 4;
 * @return {number}
 */
proto.aggregator.FeeDiscount.prototype.getDiscountPercentage = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.FeeDiscount} returns this
 */
proto.aggregator.FeeDiscount.prototype.setDiscountPercentage = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional FeeAmount discount_amount = 5;
 * @return {?proto.aggregator.FeeAmount}
 */
proto.aggregator.FeeDiscount.prototype.getDiscountAmount = function() {
  return /** @type{?proto.aggregator.FeeAmount} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FeeAmount, 5));
};


/**
 * @param {?proto.aggregator.FeeAmount|undefined} value
 * @return {!proto.aggregator.FeeDiscount} returns this
*/
proto.aggregator.FeeDiscount.prototype.setDiscountAmount = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.FeeDiscount} returns this
 */
proto.aggregator.FeeDiscount.prototype.clearDiscountAmount = function() {
  return this.setDiscountAmount(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.FeeDiscount.prototype.hasDiscountAmount = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional string expiry_date = 6;
 * @return {string}
 */
proto.aggregator.FeeDiscount.prototype.getExpiryDate = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.FeeDiscount} returns this
 */
proto.aggregator.FeeDiscount.prototype.setExpiryDate = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string terms = 7;
 * @return {string}
 */
proto.aggregator.FeeDiscount.prototype.getTerms = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.FeeDiscount} returns this
 */
proto.aggregator.FeeDiscount.prototype.setTerms = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.aggregator.EstimateFeesResp.repeatedFields_ = [8,15,16];



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
proto.aggregator.EstimateFeesResp.prototype.toObject = function(opt_includeInstance) {
  return proto.aggregator.EstimateFeesResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.aggregator.EstimateFeesResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EstimateFeesResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    error: jspb.Message.getFieldWithDefault(msg, 2, ""),
    errorCode: jspb.Message.getFieldWithDefault(msg, 3, 0),
    gasFees: (f = msg.getGasFees()) && proto.aggregator.GasFeeBreakdown.toObject(includeInstance, f),
    automationFees: (f = msg.getAutomationFees()) && proto.aggregator.AutomationFee.toObject(includeInstance, f),
    creationFees: (f = msg.getCreationFees()) && proto.aggregator.SmartWalletCreationFee.toObject(includeInstance, f),
    totalFees: (f = msg.getTotalFees()) && proto.aggregator.FeeAmount.toObject(includeInstance, f),
    discountsList: jspb.Message.toObjectList(msg.getDiscountsList(),
    proto.aggregator.FeeDiscount.toObject, includeInstance),
    totalDiscounts: (f = msg.getTotalDiscounts()) && proto.aggregator.FeeAmount.toObject(includeInstance, f),
    finalTotal: (f = msg.getFinalTotal()) && proto.aggregator.FeeAmount.toObject(includeInstance, f),
    estimatedAt: jspb.Message.getFieldWithDefault(msg, 11, 0),
    chainId: jspb.Message.getFieldWithDefault(msg, 12, ""),
    priceDataSource: jspb.Message.getFieldWithDefault(msg, 13, ""),
    priceDataAgeSeconds: jspb.Message.getFieldWithDefault(msg, 14, 0),
    warningsList: (f = jspb.Message.getRepeatedField(msg, 15)) == null ? undefined : f,
    recommendationsList: (f = jspb.Message.getRepeatedField(msg, 16)) == null ? undefined : f
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
 * @return {!proto.aggregator.EstimateFeesResp}
 */
proto.aggregator.EstimateFeesResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.aggregator.EstimateFeesResp;
  return proto.aggregator.EstimateFeesResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.aggregator.EstimateFeesResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.aggregator.EstimateFeesResp}
 */
proto.aggregator.EstimateFeesResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setError(value);
      break;
    case 3:
      var value = /** @type {!proto.aggregator.ErrorCode} */ (reader.readEnum());
      msg.setErrorCode(value);
      break;
    case 4:
      var value = new proto.aggregator.GasFeeBreakdown;
      reader.readMessage(value,proto.aggregator.GasFeeBreakdown.deserializeBinaryFromReader);
      msg.setGasFees(value);
      break;
    case 5:
      var value = new proto.aggregator.AutomationFee;
      reader.readMessage(value,proto.aggregator.AutomationFee.deserializeBinaryFromReader);
      msg.setAutomationFees(value);
      break;
    case 6:
      var value = new proto.aggregator.SmartWalletCreationFee;
      reader.readMessage(value,proto.aggregator.SmartWalletCreationFee.deserializeBinaryFromReader);
      msg.setCreationFees(value);
      break;
    case 7:
      var value = new proto.aggregator.FeeAmount;
      reader.readMessage(value,proto.aggregator.FeeAmount.deserializeBinaryFromReader);
      msg.setTotalFees(value);
      break;
    case 8:
      var value = new proto.aggregator.FeeDiscount;
      reader.readMessage(value,proto.aggregator.FeeDiscount.deserializeBinaryFromReader);
      msg.addDiscounts(value);
      break;
    case 9:
      var value = new proto.aggregator.FeeAmount;
      reader.readMessage(value,proto.aggregator.FeeAmount.deserializeBinaryFromReader);
      msg.setTotalDiscounts(value);
      break;
    case 10:
      var value = new proto.aggregator.FeeAmount;
      reader.readMessage(value,proto.aggregator.FeeAmount.deserializeBinaryFromReader);
      msg.setFinalTotal(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEstimatedAt(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setChainId(value);
      break;
    case 13:
      var value = /** @type {string} */ (reader.readString());
      msg.setPriceDataSource(value);
      break;
    case 14:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setPriceDataAgeSeconds(value);
      break;
    case 15:
      var value = /** @type {string} */ (reader.readString());
      msg.addWarnings(value);
      break;
    case 16:
      var value = /** @type {string} */ (reader.readString());
      msg.addRecommendations(value);
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
proto.aggregator.EstimateFeesResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.aggregator.EstimateFeesResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.aggregator.EstimateFeesResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.aggregator.EstimateFeesResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getError();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getErrorCode();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getGasFees();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.aggregator.GasFeeBreakdown.serializeBinaryToWriter
    );
  }
  f = message.getAutomationFees();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.aggregator.AutomationFee.serializeBinaryToWriter
    );
  }
  f = message.getCreationFees();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.aggregator.SmartWalletCreationFee.serializeBinaryToWriter
    );
  }
  f = message.getTotalFees();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.aggregator.FeeAmount.serializeBinaryToWriter
    );
  }
  f = message.getDiscountsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.aggregator.FeeDiscount.serializeBinaryToWriter
    );
  }
  f = message.getTotalDiscounts();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.aggregator.FeeAmount.serializeBinaryToWriter
    );
  }
  f = message.getFinalTotal();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.aggregator.FeeAmount.serializeBinaryToWriter
    );
  }
  f = message.getEstimatedAt();
  if (f !== 0) {
    writer.writeInt64(
      11,
      f
    );
  }
  f = message.getChainId();
  if (f.length > 0) {
    writer.writeString(
      12,
      f
    );
  }
  f = message.getPriceDataSource();
  if (f.length > 0) {
    writer.writeString(
      13,
      f
    );
  }
  f = message.getPriceDataAgeSeconds();
  if (f !== 0) {
    writer.writeInt64(
      14,
      f
    );
  }
  f = message.getWarningsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      15,
      f
    );
  }
  f = message.getRecommendationsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      16,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.aggregator.EstimateFeesResp.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string error = 2;
 * @return {string}
 */
proto.aggregator.EstimateFeesResp.prototype.getError = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.setError = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional ErrorCode error_code = 3;
 * @return {!proto.aggregator.ErrorCode}
 */
proto.aggregator.EstimateFeesResp.prototype.getErrorCode = function() {
  return /** @type {!proto.aggregator.ErrorCode} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.aggregator.ErrorCode} value
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.setErrorCode = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional GasFeeBreakdown gas_fees = 4;
 * @return {?proto.aggregator.GasFeeBreakdown}
 */
proto.aggregator.EstimateFeesResp.prototype.getGasFees = function() {
  return /** @type{?proto.aggregator.GasFeeBreakdown} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.GasFeeBreakdown, 4));
};


/**
 * @param {?proto.aggregator.GasFeeBreakdown|undefined} value
 * @return {!proto.aggregator.EstimateFeesResp} returns this
*/
proto.aggregator.EstimateFeesResp.prototype.setGasFees = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.clearGasFees = function() {
  return this.setGasFees(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.EstimateFeesResp.prototype.hasGasFees = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional AutomationFee automation_fees = 5;
 * @return {?proto.aggregator.AutomationFee}
 */
proto.aggregator.EstimateFeesResp.prototype.getAutomationFees = function() {
  return /** @type{?proto.aggregator.AutomationFee} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.AutomationFee, 5));
};


/**
 * @param {?proto.aggregator.AutomationFee|undefined} value
 * @return {!proto.aggregator.EstimateFeesResp} returns this
*/
proto.aggregator.EstimateFeesResp.prototype.setAutomationFees = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.clearAutomationFees = function() {
  return this.setAutomationFees(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.EstimateFeesResp.prototype.hasAutomationFees = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional SmartWalletCreationFee creation_fees = 6;
 * @return {?proto.aggregator.SmartWalletCreationFee}
 */
proto.aggregator.EstimateFeesResp.prototype.getCreationFees = function() {
  return /** @type{?proto.aggregator.SmartWalletCreationFee} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.SmartWalletCreationFee, 6));
};


/**
 * @param {?proto.aggregator.SmartWalletCreationFee|undefined} value
 * @return {!proto.aggregator.EstimateFeesResp} returns this
*/
proto.aggregator.EstimateFeesResp.prototype.setCreationFees = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.clearCreationFees = function() {
  return this.setCreationFees(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.EstimateFeesResp.prototype.hasCreationFees = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional FeeAmount total_fees = 7;
 * @return {?proto.aggregator.FeeAmount}
 */
proto.aggregator.EstimateFeesResp.prototype.getTotalFees = function() {
  return /** @type{?proto.aggregator.FeeAmount} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FeeAmount, 7));
};


/**
 * @param {?proto.aggregator.FeeAmount|undefined} value
 * @return {!proto.aggregator.EstimateFeesResp} returns this
*/
proto.aggregator.EstimateFeesResp.prototype.setTotalFees = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.clearTotalFees = function() {
  return this.setTotalFees(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.EstimateFeesResp.prototype.hasTotalFees = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * repeated FeeDiscount discounts = 8;
 * @return {!Array<!proto.aggregator.FeeDiscount>}
 */
proto.aggregator.EstimateFeesResp.prototype.getDiscountsList = function() {
  return /** @type{!Array<!proto.aggregator.FeeDiscount>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.FeeDiscount, 8));
};


/**
 * @param {!Array<!proto.aggregator.FeeDiscount>} value
 * @return {!proto.aggregator.EstimateFeesResp} returns this
*/
proto.aggregator.EstimateFeesResp.prototype.setDiscountsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.aggregator.FeeDiscount=} opt_value
 * @param {number=} opt_index
 * @return {!proto.aggregator.FeeDiscount}
 */
proto.aggregator.EstimateFeesResp.prototype.addDiscounts = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.aggregator.FeeDiscount, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.clearDiscountsList = function() {
  return this.setDiscountsList([]);
};


/**
 * optional FeeAmount total_discounts = 9;
 * @return {?proto.aggregator.FeeAmount}
 */
proto.aggregator.EstimateFeesResp.prototype.getTotalDiscounts = function() {
  return /** @type{?proto.aggregator.FeeAmount} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FeeAmount, 9));
};


/**
 * @param {?proto.aggregator.FeeAmount|undefined} value
 * @return {!proto.aggregator.EstimateFeesResp} returns this
*/
proto.aggregator.EstimateFeesResp.prototype.setTotalDiscounts = function(value) {
  return jspb.Message.setWrapperField(this, 9, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.clearTotalDiscounts = function() {
  return this.setTotalDiscounts(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.EstimateFeesResp.prototype.hasTotalDiscounts = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional FeeAmount final_total = 10;
 * @return {?proto.aggregator.FeeAmount}
 */
proto.aggregator.EstimateFeesResp.prototype.getFinalTotal = function() {
  return /** @type{?proto.aggregator.FeeAmount} */ (
    jspb.Message.getWrapperField(this, proto.aggregator.FeeAmount, 10));
};


/**
 * @param {?proto.aggregator.FeeAmount|undefined} value
 * @return {!proto.aggregator.EstimateFeesResp} returns this
*/
proto.aggregator.EstimateFeesResp.prototype.setFinalTotal = function(value) {
  return jspb.Message.setWrapperField(this, 10, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.clearFinalTotal = function() {
  return this.setFinalTotal(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.aggregator.EstimateFeesResp.prototype.hasFinalTotal = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional int64 estimated_at = 11;
 * @return {number}
 */
proto.aggregator.EstimateFeesResp.prototype.getEstimatedAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.setEstimatedAt = function(value) {
  return jspb.Message.setProto3IntField(this, 11, value);
};


/**
 * optional string chain_id = 12;
 * @return {string}
 */
proto.aggregator.EstimateFeesResp.prototype.getChainId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.setChainId = function(value) {
  return jspb.Message.setProto3StringField(this, 12, value);
};


/**
 * optional string price_data_source = 13;
 * @return {string}
 */
proto.aggregator.EstimateFeesResp.prototype.getPriceDataSource = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 13, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.setPriceDataSource = function(value) {
  return jspb.Message.setProto3StringField(this, 13, value);
};


/**
 * optional int64 price_data_age_seconds = 14;
 * @return {number}
 */
proto.aggregator.EstimateFeesResp.prototype.getPriceDataAgeSeconds = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 14, 0));
};


/**
 * @param {number} value
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.setPriceDataAgeSeconds = function(value) {
  return jspb.Message.setProto3IntField(this, 14, value);
};


/**
 * repeated string warnings = 15;
 * @return {!Array<string>}
 */
proto.aggregator.EstimateFeesResp.prototype.getWarningsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 15));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.setWarningsList = function(value) {
  return jspb.Message.setField(this, 15, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.addWarnings = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 15, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.clearWarningsList = function() {
  return this.setWarningsList([]);
};


/**
 * repeated string recommendations = 16;
 * @return {!Array<string>}
 */
proto.aggregator.EstimateFeesResp.prototype.getRecommendationsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 16));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.setRecommendationsList = function(value) {
  return jspb.Message.setField(this, 16, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.addRecommendations = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 16, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.aggregator.EstimateFeesResp} returns this
 */
proto.aggregator.EstimateFeesResp.prototype.clearRecommendationsList = function() {
  return this.setRecommendationsList([]);
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
    fieldName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    operator: jspb.Message.getFieldWithDefault(msg, 2, ""),
    value: jspb.Message.getFieldWithDefault(msg, 3, ""),
    fieldType: jspb.Message.getFieldWithDefault(msg, 4, "")
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
      var value = /** @type {string} */ (reader.readString());
      msg.setFieldName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setOperator(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setValue(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setFieldType(value);
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
  f = message.getFieldName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getOperator();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getValue();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getFieldType();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string field_name = 1;
 * @return {string}
 */
proto.aggregator.EventCondition.prototype.getFieldName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.EventCondition} returns this
 */
proto.aggregator.EventCondition.prototype.setFieldName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string operator = 2;
 * @return {string}
 */
proto.aggregator.EventCondition.prototype.getOperator = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.EventCondition} returns this
 */
proto.aggregator.EventCondition.prototype.setOperator = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string value = 3;
 * @return {string}
 */
proto.aggregator.EventCondition.prototype.getValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.EventCondition} returns this
 */
proto.aggregator.EventCondition.prototype.setValue = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string field_type = 4;
 * @return {string}
 */
proto.aggregator.EventCondition.prototype.getFieldType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.aggregator.EventCondition} returns this
 */
proto.aggregator.EventCondition.prototype.setFieldType = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * @enum {number}
 */
proto.aggregator.TriggerType = {
  TRIGGER_TYPE_UNSPECIFIED: 0,
  TRIGGER_TYPE_MANUAL: 1,
  TRIGGER_TYPE_FIXED_TIME: 2,
  TRIGGER_TYPE_CRON: 3,
  TRIGGER_TYPE_BLOCK: 4,
  TRIGGER_TYPE_EVENT: 5
};

/**
 * @enum {number}
 */
proto.aggregator.NodeType = {
  NODE_TYPE_UNSPECIFIED: 0,
  NODE_TYPE_ETH_TRANSFER: 1,
  NODE_TYPE_CONTRACT_WRITE: 2,
  NODE_TYPE_CONTRACT_READ: 3,
  NODE_TYPE_GRAPHQL_QUERY: 4,
  NODE_TYPE_REST_API: 5,
  NODE_TYPE_CUSTOM_CODE: 6,
  NODE_TYPE_BRANCH: 7,
  NODE_TYPE_FILTER: 8,
  NODE_TYPE_LOOP: 9,
  NODE_TYPE_BALANCE: 10
};

/**
 * @enum {number}
 */
proto.aggregator.ExecutionMode = {
  EXECUTION_MODE_SEQUENTIAL: 0,
  EXECUTION_MODE_PARALLEL: 1
};

/**
 * @enum {number}
 */
proto.aggregator.Lang = {
  LANG_UNSPECIFIED: 0,
  LANG_JAVASCRIPT: 1,
  LANG_JSON: 2,
  LANG_GRAPHQL: 3,
  LANG_HANDLEBARS: 4
};

/**
 * @enum {number}
 */
proto.aggregator.ErrorCode = {
  ERROR_CODE_UNSPECIFIED: 0,
  UNAUTHORIZED: 1000,
  FORBIDDEN: 1001,
  INVALID_SIGNATURE: 1002,
  EXPIRED_TOKEN: 1003,
  TASK_NOT_FOUND: 2000,
  EXECUTION_NOT_FOUND: 2001,
  WALLET_NOT_FOUND: 2002,
  SECRET_NOT_FOUND: 2003,
  TOKEN_METADATA_NOT_FOUND: 2004,
  INVALID_REQUEST: 3000,
  INVALID_TRIGGER_CONFIG: 3001,
  INVALID_NODE_CONFIG: 3002,
  INVALID_WORKFLOW: 3003,
  INVALID_ADDRESS: 3004,
  INVALID_SIGNATURE_FORMAT: 3005,
  MISSING_REQUIRED_FIELD: 3006,
  TASK_ALREADY_EXISTS: 4000,
  TASK_ALREADY_COMPLETED: 4001,
  TASK_ALREADY_CANCELLED: 4002,
  EXECUTION_IN_PROGRESS: 4003,
  WALLET_ALREADY_EXISTS: 4004,
  SECRET_ALREADY_EXISTS: 4005,
  RPC_NODE_ERROR: 5000,
  TENDERLY_API_ERROR: 5001,
  TOKEN_LOOKUP_ERROR: 5002,
  SIMULATION_ERROR: 5003,
  STORAGE_UNAVAILABLE: 6000,
  STORAGE_WRITE_ERROR: 6001,
  STORAGE_READ_ERROR: 6002,
  TASK_DATA_CORRUPTED: 6003,
  EXECUTION_ENGINE_ERROR: 6004,
  RATE_LIMIT_EXCEEDED: 7000,
  QUOTA_EXCEEDED: 7001,
  TOO_MANY_REQUESTS: 7002,
  SMART_WALLET_RPC_ERROR: 8000,
  SMART_WALLET_NOT_FOUND: 8001,
  SMART_WALLET_DEPLOYMENT_ERROR: 8002,
  INSUFFICIENT_BALANCE: 8003
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
  EXECUTION_STATUS_UNSPECIFIED: 0,
  EXECUTION_STATUS_PENDING: 1,
  EXECUTION_STATUS_SUCCESS: 2,
  EXECUTION_STATUS_FAILED: 3,
  EXECUTION_STATUS_PARTIAL_SUCCESS: 4
};

goog.object.extend(exports, proto.aggregator);
