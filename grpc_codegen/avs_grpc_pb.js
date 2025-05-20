// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var avs_pb = require('./avs_pb.js');
var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');
var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js');

function serialize_aggregator_CreateOrUpdateSecretReq(arg) {
  if (!(arg instanceof avs_pb.CreateOrUpdateSecretReq)) {
    throw new Error('Expected argument of type aggregator.CreateOrUpdateSecretReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_CreateOrUpdateSecretReq(buffer_arg) {
  return avs_pb.CreateOrUpdateSecretReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_CreateTaskReq(arg) {
  if (!(arg instanceof avs_pb.CreateTaskReq)) {
    throw new Error('Expected argument of type aggregator.CreateTaskReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_CreateTaskReq(buffer_arg) {
  return avs_pb.CreateTaskReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_CreateTaskResp(arg) {
  if (!(arg instanceof avs_pb.CreateTaskResp)) {
    throw new Error('Expected argument of type aggregator.CreateTaskResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_CreateTaskResp(buffer_arg) {
  return avs_pb.CreateTaskResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_DeleteSecretReq(arg) {
  if (!(arg instanceof avs_pb.DeleteSecretReq)) {
    throw new Error('Expected argument of type aggregator.DeleteSecretReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_DeleteSecretReq(buffer_arg) {
  return avs_pb.DeleteSecretReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_Execution(arg) {
  if (!(arg instanceof avs_pb.Execution)) {
    throw new Error('Expected argument of type aggregator.Execution');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_Execution(buffer_arg) {
  return avs_pb.Execution.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_ExecutionReq(arg) {
  if (!(arg instanceof avs_pb.ExecutionReq)) {
    throw new Error('Expected argument of type aggregator.ExecutionReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_ExecutionReq(buffer_arg) {
  return avs_pb.ExecutionReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_ExecutionStatusResp(arg) {
  if (!(arg instanceof avs_pb.ExecutionStatusResp)) {
    throw new Error('Expected argument of type aggregator.ExecutionStatusResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_ExecutionStatusResp(buffer_arg) {
  return avs_pb.ExecutionStatusResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_GetExecutionCountReq(arg) {
  if (!(arg instanceof avs_pb.GetExecutionCountReq)) {
    throw new Error('Expected argument of type aggregator.GetExecutionCountReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_GetExecutionCountReq(buffer_arg) {
  return avs_pb.GetExecutionCountReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_GetExecutionCountResp(arg) {
  if (!(arg instanceof avs_pb.GetExecutionCountResp)) {
    throw new Error('Expected argument of type aggregator.GetExecutionCountResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_GetExecutionCountResp(buffer_arg) {
  return avs_pb.GetExecutionCountResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_GetExecutionStatsReq(arg) {
  if (!(arg instanceof avs_pb.GetExecutionStatsReq)) {
    throw new Error('Expected argument of type aggregator.GetExecutionStatsReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_GetExecutionStatsReq(buffer_arg) {
  return avs_pb.GetExecutionStatsReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_GetExecutionStatsResp(arg) {
  if (!(arg instanceof avs_pb.GetExecutionStatsResp)) {
    throw new Error('Expected argument of type aggregator.GetExecutionStatsResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_GetExecutionStatsResp(buffer_arg) {
  return avs_pb.GetExecutionStatsResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_GetKeyReq(arg) {
  if (!(arg instanceof avs_pb.GetKeyReq)) {
    throw new Error('Expected argument of type aggregator.GetKeyReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_GetKeyReq(buffer_arg) {
  return avs_pb.GetKeyReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_GetSignatureFormatReq(arg) {
  if (!(arg instanceof avs_pb.GetSignatureFormatReq)) {
    throw new Error('Expected argument of type aggregator.GetSignatureFormatReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_GetSignatureFormatReq(buffer_arg) {
  return avs_pb.GetSignatureFormatReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_GetSignatureFormatResp(arg) {
  if (!(arg instanceof avs_pb.GetSignatureFormatResp)) {
    throw new Error('Expected argument of type aggregator.GetSignatureFormatResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_GetSignatureFormatResp(buffer_arg) {
  return avs_pb.GetSignatureFormatResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_GetWalletReq(arg) {
  if (!(arg instanceof avs_pb.GetWalletReq)) {
    throw new Error('Expected argument of type aggregator.GetWalletReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_GetWalletReq(buffer_arg) {
  return avs_pb.GetWalletReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_GetWalletResp(arg) {
  if (!(arg instanceof avs_pb.GetWalletResp)) {
    throw new Error('Expected argument of type aggregator.GetWalletResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_GetWalletResp(buffer_arg) {
  return avs_pb.GetWalletResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_GetWorkflowCountReq(arg) {
  if (!(arg instanceof avs_pb.GetWorkflowCountReq)) {
    throw new Error('Expected argument of type aggregator.GetWorkflowCountReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_GetWorkflowCountReq(buffer_arg) {
  return avs_pb.GetWorkflowCountReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_GetWorkflowCountResp(arg) {
  if (!(arg instanceof avs_pb.GetWorkflowCountResp)) {
    throw new Error('Expected argument of type aggregator.GetWorkflowCountResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_GetWorkflowCountResp(buffer_arg) {
  return avs_pb.GetWorkflowCountResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_IdReq(arg) {
  if (!(arg instanceof avs_pb.IdReq)) {
    throw new Error('Expected argument of type aggregator.IdReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_IdReq(buffer_arg) {
  return avs_pb.IdReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_KeyResp(arg) {
  if (!(arg instanceof avs_pb.KeyResp)) {
    throw new Error('Expected argument of type aggregator.KeyResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_KeyResp(buffer_arg) {
  return avs_pb.KeyResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_ListExecutionsReq(arg) {
  if (!(arg instanceof avs_pb.ListExecutionsReq)) {
    throw new Error('Expected argument of type aggregator.ListExecutionsReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_ListExecutionsReq(buffer_arg) {
  return avs_pb.ListExecutionsReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_ListExecutionsResp(arg) {
  if (!(arg instanceof avs_pb.ListExecutionsResp)) {
    throw new Error('Expected argument of type aggregator.ListExecutionsResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_ListExecutionsResp(buffer_arg) {
  return avs_pb.ListExecutionsResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_ListSecretsReq(arg) {
  if (!(arg instanceof avs_pb.ListSecretsReq)) {
    throw new Error('Expected argument of type aggregator.ListSecretsReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_ListSecretsReq(buffer_arg) {
  return avs_pb.ListSecretsReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_ListSecretsResp(arg) {
  if (!(arg instanceof avs_pb.ListSecretsResp)) {
    throw new Error('Expected argument of type aggregator.ListSecretsResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_ListSecretsResp(buffer_arg) {
  return avs_pb.ListSecretsResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_ListTasksReq(arg) {
  if (!(arg instanceof avs_pb.ListTasksReq)) {
    throw new Error('Expected argument of type aggregator.ListTasksReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_ListTasksReq(buffer_arg) {
  return avs_pb.ListTasksReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_ListTasksResp(arg) {
  if (!(arg instanceof avs_pb.ListTasksResp)) {
    throw new Error('Expected argument of type aggregator.ListTasksResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_ListTasksResp(buffer_arg) {
  return avs_pb.ListTasksResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_ListWalletReq(arg) {
  if (!(arg instanceof avs_pb.ListWalletReq)) {
    throw new Error('Expected argument of type aggregator.ListWalletReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_ListWalletReq(buffer_arg) {
  return avs_pb.ListWalletReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_ListWalletResp(arg) {
  if (!(arg instanceof avs_pb.ListWalletResp)) {
    throw new Error('Expected argument of type aggregator.ListWalletResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_ListWalletResp(buffer_arg) {
  return avs_pb.ListWalletResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_NonceRequest(arg) {
  if (!(arg instanceof avs_pb.NonceRequest)) {
    throw new Error('Expected argument of type aggregator.NonceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_NonceRequest(buffer_arg) {
  return avs_pb.NonceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_NonceResp(arg) {
  if (!(arg instanceof avs_pb.NonceResp)) {
    throw new Error('Expected argument of type aggregator.NonceResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_NonceResp(buffer_arg) {
  return avs_pb.NonceResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_Task(arg) {
  if (!(arg instanceof avs_pb.Task)) {
    throw new Error('Expected argument of type aggregator.Task');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_Task(buffer_arg) {
  return avs_pb.Task.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_UserTriggerTaskReq(arg) {
  if (!(arg instanceof avs_pb.UserTriggerTaskReq)) {
    throw new Error('Expected argument of type aggregator.UserTriggerTaskReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_UserTriggerTaskReq(buffer_arg) {
  return avs_pb.UserTriggerTaskReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_aggregator_UserTriggerTaskResp(arg) {
  if (!(arg instanceof avs_pb.UserTriggerTaskResp)) {
    throw new Error('Expected argument of type aggregator.UserTriggerTaskResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_aggregator_UserTriggerTaskResp(buffer_arg) {
  return avs_pb.UserTriggerTaskResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_google_protobuf_BoolValue(arg) {
  if (!(arg instanceof google_protobuf_wrappers_pb.BoolValue)) {
    throw new Error('Expected argument of type google.protobuf.BoolValue');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_BoolValue(buffer_arg) {
  return google_protobuf_wrappers_pb.BoolValue.deserializeBinary(new Uint8Array(buffer_arg));
}


var AggregatorService = exports.AggregatorService = {
  // Exchange for an Auth Key to authenticate in subsequent request
getKey: {
    path: '/aggregator.Aggregator/GetKey',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.GetKeyReq,
    responseType: avs_pb.KeyResp,
    requestSerialize: serialize_aggregator_GetKeyReq,
    requestDeserialize: deserialize_aggregator_GetKeyReq,
    responseSerialize: serialize_aggregator_KeyResp,
    responseDeserialize: deserialize_aggregator_KeyResp,
  },
  // Get the signature format template used for authentication
getSignatureFormat: {
    path: '/aggregator.Aggregator/GetSignatureFormat',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.GetSignatureFormatReq,
    responseType: avs_pb.GetSignatureFormatResp,
    requestSerialize: serialize_aggregator_GetSignatureFormatReq,
    requestDeserialize: deserialize_aggregator_GetSignatureFormatReq,
    responseSerialize: serialize_aggregator_GetSignatureFormatResp,
    responseDeserialize: deserialize_aggregator_GetSignatureFormatResp,
  },
  // Smart Acccount Operation
getNonce: {
    path: '/aggregator.Aggregator/GetNonce',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.NonceRequest,
    responseType: avs_pb.NonceResp,
    requestSerialize: serialize_aggregator_NonceRequest,
    requestDeserialize: deserialize_aggregator_NonceRequest,
    responseSerialize: serialize_aggregator_NonceResp,
    responseDeserialize: deserialize_aggregator_NonceResp,
  },
  getWallet: {
    path: '/aggregator.Aggregator/GetWallet',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.GetWalletReq,
    responseType: avs_pb.GetWalletResp,
    requestSerialize: serialize_aggregator_GetWalletReq,
    requestDeserialize: deserialize_aggregator_GetWalletReq,
    responseSerialize: serialize_aggregator_GetWalletResp,
    responseDeserialize: deserialize_aggregator_GetWalletResp,
  },
  listWallets: {
    path: '/aggregator.Aggregator/ListWallets',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.ListWalletReq,
    responseType: avs_pb.ListWalletResp,
    requestSerialize: serialize_aggregator_ListWalletReq,
    requestDeserialize: deserialize_aggregator_ListWalletReq,
    responseSerialize: serialize_aggregator_ListWalletResp,
    responseDeserialize: deserialize_aggregator_ListWalletResp,
  },
  // Task Management Operation
createTask: {
    path: '/aggregator.Aggregator/CreateTask',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.CreateTaskReq,
    responseType: avs_pb.CreateTaskResp,
    requestSerialize: serialize_aggregator_CreateTaskReq,
    requestDeserialize: deserialize_aggregator_CreateTaskReq,
    responseSerialize: serialize_aggregator_CreateTaskResp,
    responseDeserialize: deserialize_aggregator_CreateTaskResp,
  },
  listTasks: {
    path: '/aggregator.Aggregator/ListTasks',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.ListTasksReq,
    responseType: avs_pb.ListTasksResp,
    requestSerialize: serialize_aggregator_ListTasksReq,
    requestDeserialize: deserialize_aggregator_ListTasksReq,
    responseSerialize: serialize_aggregator_ListTasksResp,
    responseDeserialize: deserialize_aggregator_ListTasksResp,
  },
  getTask: {
    path: '/aggregator.Aggregator/GetTask',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.IdReq,
    responseType: avs_pb.Task,
    requestSerialize: serialize_aggregator_IdReq,
    requestDeserialize: deserialize_aggregator_IdReq,
    responseSerialize: serialize_aggregator_Task,
    responseDeserialize: deserialize_aggregator_Task,
  },
  listExecutions: {
    path: '/aggregator.Aggregator/ListExecutions',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.ListExecutionsReq,
    responseType: avs_pb.ListExecutionsResp,
    requestSerialize: serialize_aggregator_ListExecutionsReq,
    requestDeserialize: deserialize_aggregator_ListExecutionsReq,
    responseSerialize: serialize_aggregator_ListExecutionsResp,
    responseDeserialize: deserialize_aggregator_ListExecutionsResp,
  },
  getExecution: {
    path: '/aggregator.Aggregator/GetExecution',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.ExecutionReq,
    responseType: avs_pb.Execution,
    requestSerialize: serialize_aggregator_ExecutionReq,
    requestDeserialize: deserialize_aggregator_ExecutionReq,
    responseSerialize: serialize_aggregator_Execution,
    responseDeserialize: deserialize_aggregator_Execution,
  },
  getExecutionStatus: {
    path: '/aggregator.Aggregator/GetExecutionStatus',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.ExecutionReq,
    responseType: avs_pb.ExecutionStatusResp,
    requestSerialize: serialize_aggregator_ExecutionReq,
    requestDeserialize: deserialize_aggregator_ExecutionReq,
    responseSerialize: serialize_aggregator_ExecutionStatusResp,
    responseDeserialize: deserialize_aggregator_ExecutionStatusResp,
  },
  cancelTask: {
    path: '/aggregator.Aggregator/CancelTask',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.IdReq,
    responseType: google_protobuf_wrappers_pb.BoolValue,
    requestSerialize: serialize_aggregator_IdReq,
    requestDeserialize: deserialize_aggregator_IdReq,
    responseSerialize: serialize_google_protobuf_BoolValue,
    responseDeserialize: deserialize_google_protobuf_BoolValue,
  },
  deleteTask: {
    path: '/aggregator.Aggregator/DeleteTask',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.IdReq,
    responseType: google_protobuf_wrappers_pb.BoolValue,
    requestSerialize: serialize_aggregator_IdReq,
    requestDeserialize: deserialize_aggregator_IdReq,
    responseSerialize: serialize_google_protobuf_BoolValue,
    responseDeserialize: deserialize_google_protobuf_BoolValue,
  },
  triggerTask: {
    path: '/aggregator.Aggregator/TriggerTask',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.UserTriggerTaskReq,
    responseType: avs_pb.UserTriggerTaskResp,
    requestSerialize: serialize_aggregator_UserTriggerTaskReq,
    requestDeserialize: deserialize_aggregator_UserTriggerTaskReq,
    responseSerialize: serialize_aggregator_UserTriggerTaskResp,
    responseDeserialize: deserialize_aggregator_UserTriggerTaskResp,
  },
  // CreateSecret allow you to define a secret to be used in your tasks. The secret can be used with a special syntax of ${{secrets.name }}.
// You can decide whether to grant secret to a single workflow or many workflow, or all of your workflow
// By default, your secret is available across all of your tasks.
createSecret: {
    path: '/aggregator.Aggregator/CreateSecret',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.CreateOrUpdateSecretReq,
    responseType: google_protobuf_wrappers_pb.BoolValue,
    requestSerialize: serialize_aggregator_CreateOrUpdateSecretReq,
    requestDeserialize: deserialize_aggregator_CreateOrUpdateSecretReq,
    responseSerialize: serialize_google_protobuf_BoolValue,
    responseDeserialize: deserialize_google_protobuf_BoolValue,
  },
  deleteSecret: {
    path: '/aggregator.Aggregator/DeleteSecret',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.DeleteSecretReq,
    responseType: google_protobuf_wrappers_pb.BoolValue,
    requestSerialize: serialize_aggregator_DeleteSecretReq,
    requestDeserialize: deserialize_aggregator_DeleteSecretReq,
    responseSerialize: serialize_google_protobuf_BoolValue,
    responseDeserialize: deserialize_google_protobuf_BoolValue,
  },
  // Return all secrets belong to this user. Currently we don't support any fine tune or filter yet.
// Only secret names and config data are returned. The secret value aren't returned.
listSecrets: {
    path: '/aggregator.Aggregator/ListSecrets',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.ListSecretsReq,
    responseType: avs_pb.ListSecretsResp,
    requestSerialize: serialize_aggregator_ListSecretsReq,
    requestDeserialize: deserialize_aggregator_ListSecretsReq,
    responseSerialize: serialize_aggregator_ListSecretsResp,
    responseDeserialize: deserialize_aggregator_ListSecretsResp,
  },
  // For simplicity, currently only the user who create the secrets can update its value, or update its permission.
// The current implementation is also limited, update is an override action, not an appending action. So when updating, you need to pass the whole payload
updateSecret: {
    path: '/aggregator.Aggregator/UpdateSecret',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.CreateOrUpdateSecretReq,
    responseType: google_protobuf_wrappers_pb.BoolValue,
    requestSerialize: serialize_aggregator_CreateOrUpdateSecretReq,
    requestDeserialize: deserialize_aggregator_CreateOrUpdateSecretReq,
    responseSerialize: serialize_google_protobuf_BoolValue,
    responseDeserialize: deserialize_google_protobuf_BoolValue,
  },
  // The spec of these 2 RPCs are based on the following issue:
// Reference: https://github.com/AvaProtocol/EigenLayer-AVS/issues/150
// GetWorkflowCount returns the total count of workflows for the given eoa addresses or a list of smart wallet addresses belongs to the eoa in the auth key
// When passing a list of smart wallet addresses, we will return the total count of workflows belongs to all of them
// If the smart wallet address is not found in our system, we will ignore it and not count towards the total
// if smart wallet address doesn't belong to the eoa in the auth key, we will also ignore it and not count towards the total
getWorkflowCount: {
    path: '/aggregator.Aggregator/GetWorkflowCount',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.GetWorkflowCountReq,
    responseType: avs_pb.GetWorkflowCountResp,
    requestSerialize: serialize_aggregator_GetWorkflowCountReq,
    requestDeserialize: deserialize_aggregator_GetWorkflowCountReq,
    responseSerialize: serialize_aggregator_GetWorkflowCountResp,
    responseDeserialize: deserialize_aggregator_GetWorkflowCountResp,
  },
  // GetExecutionCount returns the total number of executions for specified workflow IDs or all workflows linked to the EOA in the auth key.
// If no workflow IDs are provided, it counts executions for all workflows of the EOA.
// Workflow IDs not found in the system are ignored.
// Workflow IDs not linked to the EOA in the auth key are also ignored.
getExecutionCount: {
    path: '/aggregator.Aggregator/GetExecutionCount',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.GetExecutionCountReq,
    responseType: avs_pb.GetExecutionCountResp,
    requestSerialize: serialize_aggregator_GetExecutionCountReq,
    requestDeserialize: deserialize_aggregator_GetExecutionCountReq,
    responseSerialize: serialize_aggregator_GetExecutionCountResp,
    responseDeserialize: deserialize_aggregator_GetExecutionCountResp,
  },
  // GetExecutionStats returns execution statistics for a specified time period
// It counts total executions, successful executions, and failed executions
// If no workflow IDs are provided, it counts for all workflows of the authenticated user
getExecutionStats: {
    path: '/aggregator.Aggregator/GetExecutionStats',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.GetExecutionStatsReq,
    responseType: avs_pb.GetExecutionStatsResp,
    requestSerialize: serialize_aggregator_GetExecutionStatsReq,
    requestDeserialize: deserialize_aggregator_GetExecutionStatsReq,
    responseSerialize: serialize_aggregator_GetExecutionStatsResp,
    responseDeserialize: deserialize_aggregator_GetExecutionStatsResp,
  },
};

exports.AggregatorClient = grpc.makeGenericClientConstructor(AggregatorService, 'Aggregator');
