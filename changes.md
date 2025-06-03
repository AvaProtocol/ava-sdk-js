diff --git a/grpc_codegen/avs.proto b/grpc_codegen/avs.proto
index c81f65f..1f17633 100644
--- a/grpc_codegen/avs.proto
+++ b/grpc_codegen/avs.proto
@@ -4,7 +4,6 @@ package aggregator;
 option go_package = "./avsproto";
 
 import "google/protobuf/wrappers.proto";
-import "google/protobuf/timestamp.proto";
 import "google/protobuf/any.proto";
 import "google/protobuf/struct.proto";
 
@@ -477,21 +476,31 @@ message TaskNode {
 
 message Execution {
   string id      = 1;
-  // timestamp when execution started (in milliseconds)
-  int64 start_at = 2;
-  // timestamp when execution ended (in milliseconds)
-  int64 end_at   = 3;
+  
+  int64 start_at = 2; // timestamp when execution started (in milliseconds)
+  int64 end_at   = 3; // timestamp when execution ended (in milliseconds)
   bool   success = 4;
   string error   = 5;
 
-  // Flattened from TriggerReason: Use the top-level TriggerType enum for consistency
-  TriggerType trigger_type = 6;
-
   message Step {
-    string node_id = 1;
-    bool   success  = 2;
+    string id = 1;
     
+    // Unified type field - can be trigger type (MANUAL, BLOCK, etc) or node type (CUSTOM_CODE, REST_API, etc)
+    string type = 17;
+    string name = 18;
+    bool success = 2;
+    string error = 13;
+    string log = 12;
+    repeated string inputs = 16;
     oneof output_data {
+      // Trigger outputs
+      BlockTrigger.Output block_trigger = 20;
+      FixedTimeTrigger.Output fixed_time_trigger = 21;
+      CronTrigger.Output cron_trigger = 22;
+      EventTrigger.Output event_trigger = 23;
+      ManualTrigger.Output manual_trigger = 24;
+      
+      // Node outputs  
       ETHTransferNode.Output eth_transfer = 3;
       GraphQLQueryNode.Output graphql = 4;
       ContractReadNode.Output contract_read = 5;
@@ -502,63 +511,14 @@ message Execution {
       FilterNode.Output filter = 10;
       LoopNode.Output loop = 11;
     }
-
-    string log = 12; 
-    string error = 13;
+    
     // timestamp when step started (in milliseconds)
     int64 start_at = 14;
     // timestamp when step ended (in milliseconds)
     int64 end_at = 15;
-
-    // Reference ticket: https://github.com/AvaProtocol/EigenLayer-AVS/issues/151
-    repeated string inputs = 16;
   }
 
   repeated Step steps = 8;
-
-  string trigger_name = 9;
-
-  // Despite the name outputData this is actually the data after we enrich based the metadata at the point where the event is trigger.
-  // Example at the time of triggering a transfer event, the only ifformation we had is ERC20 address, the topics, the from/to and amount, the log id and transaction hash
-  // We then query Etherem RPC to find out more information such as token symbol, token decimal, parse the amount of out event raw data
-  // Reference ticket: https://github.com/AvaProtocol/EigenLayer-AVS/issues/151
-  //  
-  // For transfer event, we had a set of fields
-  // Chris define them here https://avaprotocol.slack.com/archives/D0570FNE0SJ/p1733336982524899
-  // // The selected fields of the response to return to the client
-  //  const FILTERED_FIELDS = [
-  //    "token_name",
-  //    "token_symbol",
-  //    "token_decimals",
-  //    "transaction_hash",
-  //    "address",
-  //    "block_timestamp",
-  //    "block_number",
-  //    "from_address",
-  //    "to_address",
-  //    "value",
-  //    "value_formatted", // Formatted value
-  //    "transaction_index",
-  //    "log_index",
-  //  ];
-  // 
-  // For non transfer event, we just have the raw data
-  // For block event, we had the number at that trigger is meet.
-  // For time trigger, it is the epoch
-  oneof output_data {
-    // For block triggers
-    BlockTrigger.Output block_trigger = 10;
-    
-    // For time triggers
-    FixedTimeTrigger.Output fixed_time_trigger = 11;
-    CronTrigger.Output cron_trigger = 12;
-    
-    // For event triggers
-    EventTrigger.Output event_trigger = 13;
-    
-    // For manual triggers
-    ManualTrigger.Output manual_trigger = 14;
-  }
 }
 
 
@@ -900,6 +860,9 @@ service Aggregator {
   
   // RunTrigger allows executing a single trigger for testing purposes (triggers don't accept inputs)
   rpc RunTrigger(RunTriggerReq) returns (RunTriggerResp);
+  
+  // SimulateTask allows executing a complete task simulation including trigger and all workflow nodes
+  rpc SimulateTask(SimulateTaskReq) returns (Execution);
 }
 
 // Request message for GetWorkflowCount
@@ -1039,3 +1002,14 @@ message Evm {
     string signature = 11;
   }
 }
+
+// Request message for SimulateTask
+message SimulateTaskReq {
+  // Complete task definition for simulation (no need to save to storage first)
+  TaskTrigger trigger = 1; // The trigger configuration
+  repeated TaskNode nodes = 2; // All workflow nodes
+  repeated TaskEdge edges = 3; // All edges connecting the nodes
+  TriggerType trigger_type = 4; // Type of trigger to simulate using the TriggerType enum
+  map<string, google.protobuf.Value> trigger_config = 5; // Configuration for the trigger simulation
+  map<string, google.protobuf.Value> input_variables = 6; // Input variables for the simulation
+}
diff --git a/grpc_codegen/avs_grpc_pb.d.ts b/grpc_codegen/avs_grpc_pb.d.ts
index 05216cc..3352ec9 100644
--- a/grpc_codegen/avs_grpc_pb.d.ts
+++ b/grpc_codegen/avs_grpc_pb.d.ts
@@ -7,7 +7,6 @@
 import * as grpc from "@grpc/grpc-js";
 import * as avs_pb from "./avs_pb";
 import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";
-import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
 import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";
 import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
 
@@ -36,6 +35,7 @@ interface IAggregatorService extends grpc.ServiceDefinition<grpc.UntypedServiceI
     getExecutionStats: IAggregatorService_IGetExecutionStats;
     runNodeWithInputs: IAggregatorService_IRunNodeWithInputs;
     runTrigger: IAggregatorService_IRunTrigger;
+    simulateTask: IAggregatorService_ISimulateTask;
 }
 
 interface IAggregatorService_IGetKey extends grpc.MethodDefinition<avs_pb.GetKeyReq, avs_pb.KeyResp> {
@@ -254,6 +254,15 @@ interface IAggregatorService_IRunTrigger extends grpc.MethodDefinition<avs_pb.Ru
     responseSerialize: grpc.serialize<avs_pb.RunTriggerResp>;
     responseDeserialize: grpc.deserialize<avs_pb.RunTriggerResp>;
 }
+interface IAggregatorService_ISimulateTask extends grpc.MethodDefinition<avs_pb.SimulateTaskReq, avs_pb.Execution> {
+    path: "/aggregator.Aggregator/SimulateTask";
+    requestStream: false;
+    responseStream: false;
+    requestSerialize: grpc.serialize<avs_pb.SimulateTaskReq>;
+    requestDeserialize: grpc.deserialize<avs_pb.SimulateTaskReq>;
+    responseSerialize: grpc.serialize<avs_pb.Execution>;
+    responseDeserialize: grpc.deserialize<avs_pb.Execution>;
+}
 
 export const AggregatorService: IAggregatorService;
 
@@ -282,6 +291,7 @@ export interface IAggregatorServer extends grpc.UntypedServiceImplementation {
     getExecutionStats: grpc.handleUnaryCall<avs_pb.GetExecutionStatsReq, avs_pb.GetExecutionStatsResp>;
     runNodeWithInputs: grpc.handleUnaryCall<avs_pb.RunNodeWithInputsReq, avs_pb.RunNodeWithInputsResp>;
     runTrigger: grpc.handleUnaryCall<avs_pb.RunTriggerReq, avs_pb.RunTriggerResp>;
+    simulateTask: grpc.handleUnaryCall<avs_pb.SimulateTaskReq, avs_pb.Execution>;
 }
 
 export interface IAggregatorClient {
@@ -357,6 +367,9 @@ export interface IAggregatorClient {
     runTrigger(request: avs_pb.RunTriggerReq, callback: (error: grpc.ServiceError | null, response: avs_pb.RunTriggerResp) => void): grpc.ClientUnaryCall;
     runTrigger(request: avs_pb.RunTriggerReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.RunTriggerResp) => void): grpc.ClientUnaryCall;
     runTrigger(request: avs_pb.RunTriggerReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.RunTriggerResp) => void): grpc.ClientUnaryCall;
+    simulateTask(request: avs_pb.SimulateTaskReq, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
+    simulateTask(request: avs_pb.SimulateTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
+    simulateTask(request: avs_pb.SimulateTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
 }
 
 export class AggregatorClient extends grpc.Client implements IAggregatorClient {
@@ -433,4 +446,7 @@ export class AggregatorClient extends grpc.Client implements IAggregatorClient {
     public runTrigger(request: avs_pb.RunTriggerReq, callback: (error: grpc.ServiceError | null, response: avs_pb.RunTriggerResp) => void): grpc.ClientUnaryCall;
     public runTrigger(request: avs_pb.RunTriggerReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.RunTriggerResp) => void): grpc.ClientUnaryCall;
     public runTrigger(request: avs_pb.RunTriggerReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.RunTriggerResp) => void): grpc.ClientUnaryCall;
+    public simulateTask(request: avs_pb.SimulateTaskReq, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
+    public simulateTask(request: avs_pb.SimulateTaskReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
+    public simulateTask(request: avs_pb.SimulateTaskReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.Execution) => void): grpc.ClientUnaryCall;
 }
diff --git a/grpc_codegen/avs_grpc_pb.js b/grpc_codegen/avs_grpc_pb.js
index 6aba748..4d2d386 100644
--- a/grpc_codegen/avs_grpc_pb.js
+++ b/grpc_codegen/avs_grpc_pb.js
@@ -4,7 +4,6 @@
 var grpc = require('@grpc/grpc-js');
 var avs_pb = require('./avs_pb.js');
 var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');
-var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
 var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');
 var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js');
 
@@ -393,6 +392,17 @@ function deserialize_aggregator_SetWalletReq(buffer_arg) {
   return avs_pb.SetWalletReq.deserializeBinary(new Uint8Array(buffer_arg));
 }
 
+function serialize_aggregator_SimulateTaskReq(arg) {
+  if (!(arg instanceof avs_pb.SimulateTaskReq)) {
+    throw new Error('Expected argument of type aggregator.SimulateTaskReq');
+  }
+  return Buffer.from(arg.serializeBinary());
+}
+
+function deserialize_aggregator_SimulateTaskReq(buffer_arg) {
+  return avs_pb.SimulateTaskReq.deserializeBinary(new Uint8Array(buffer_arg));
+}
+
 function serialize_aggregator_Task(arg) {
   if (!(arg instanceof avs_pb.Task)) {
     throw new Error('Expected argument of type aggregator.Task');
@@ -729,6 +739,18 @@ runTrigger: {
     responseSerialize: serialize_aggregator_RunTriggerResp,
     responseDeserialize: deserialize_aggregator_RunTriggerResp,
   },
+  // SimulateTask allows executing a complete task simulation including trigger and all workflow nodes
+simulateTask: {
+    path: '/aggregator.Aggregator/SimulateTask',
+    requestStream: false,
+    responseStream: false,
+    requestType: avs_pb.SimulateTaskReq,
+    responseType: avs_pb.Execution,
+    requestSerialize: serialize_aggregator_SimulateTaskReq,
+    requestDeserialize: deserialize_aggregator_SimulateTaskReq,
+    responseSerialize: serialize_aggregator_Execution,
+    responseDeserialize: deserialize_aggregator_Execution,
+  },
 };
 
 exports.AggregatorClient = grpc.makeGenericClientConstructor(AggregatorService, 'Aggregator');
diff --git a/grpc_codegen/avs_pb.d.ts b/grpc_codegen/avs_pb.d.ts
index 79d4641..ac20f0e 100644
--- a/grpc_codegen/avs_pb.d.ts
+++ b/grpc_codegen/avs_pb.d.ts
@@ -6,7 +6,6 @@
 
 import * as jspb from "google-protobuf";
 import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";
-import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
 import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";
 import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
 
@@ -1407,41 +1406,10 @@ export class Execution extends jspb.Message {
     setSuccess(value: boolean): Execution;
     getError(): string;
     setError(value: string): Execution;
-    getTriggerType(): TriggerType;
-    setTriggerType(value: TriggerType): Execution;
     clearStepsList(): void;
     getStepsList(): Array<Execution.Step>;
     setStepsList(value: Array<Execution.Step>): Execution;
     addSteps(value?: Execution.Step, index?: number): Execution.Step;
-    getTriggerName(): string;
-    setTriggerName(value: string): Execution;
-
-    hasBlockTrigger(): boolean;
-    clearBlockTrigger(): void;
-    getBlockTrigger(): BlockTrigger.Output | undefined;
-    setBlockTrigger(value?: BlockTrigger.Output): Execution;
-
-    hasFixedTimeTrigger(): boolean;
-    clearFixedTimeTrigger(): void;
-    getFixedTimeTrigger(): FixedTimeTrigger.Output | undefined;
-    setFixedTimeTrigger(value?: FixedTimeTrigger.Output): Execution;
-
-    hasCronTrigger(): boolean;
-    clearCronTrigger(): void;
-    getCronTrigger(): CronTrigger.Output | undefined;
-    setCronTrigger(value?: CronTrigger.Output): Execution;
-
-    hasEventTrigger(): boolean;
-    clearEventTrigger(): void;
-    getEventTrigger(): EventTrigger.Output | undefined;
-    setEventTrigger(value?: EventTrigger.Output): Execution;
-
-    hasManualTrigger(): boolean;
-    clearManualTrigger(): void;
-    getManualTrigger(): ManualTrigger.Output | undefined;
-    setManualTrigger(value?: ManualTrigger.Output): Execution;
-
-    getOutputDataCase(): Execution.OutputDataCase;
 
     serializeBinary(): Uint8Array;
     toObject(includeInstance?: boolean): Execution.AsObject;
@@ -1460,22 +1428,52 @@ export namespace Execution {
         endAt: number,
         success: boolean,
         error: string,
-        triggerType: TriggerType,
         stepsList: Array<Execution.Step.AsObject>,
-        triggerName: string,
-        blockTrigger?: BlockTrigger.Output.AsObject,
-        fixedTimeTrigger?: FixedTimeTrigger.Output.AsObject,
-        cronTrigger?: CronTrigger.Output.AsObject,
-        eventTrigger?: EventTrigger.Output.AsObject,
-        manualTrigger?: ManualTrigger.Output.AsObject,
     }
 
 
     export class Step extends jspb.Message { 
-        getNodeId(): string;
-        setNodeId(value: string): Step;
+        getId(): string;
+        setId(value: string): Step;
+        getType(): string;
+        setType(value: string): Step;
+        getName(): string;
+        setName(value: string): Step;
         getSuccess(): boolean;
         setSuccess(value: boolean): Step;
+        getError(): string;
+        setError(value: string): Step;
+        getLog(): string;
+        setLog(value: string): Step;
+        clearInputsList(): void;
+        getInputsList(): Array<string>;
+        setInputsList(value: Array<string>): Step;
+        addInputs(value: string, index?: number): string;
+
+        hasBlockTrigger(): boolean;
+        clearBlockTrigger(): void;
+        getBlockTrigger(): BlockTrigger.Output | undefined;
+        setBlockTrigger(value?: BlockTrigger.Output): Step;
+
+        hasFixedTimeTrigger(): boolean;
+        clearFixedTimeTrigger(): void;
+        getFixedTimeTrigger(): FixedTimeTrigger.Output | undefined;
+        setFixedTimeTrigger(value?: FixedTimeTrigger.Output): Step;
+
+        hasCronTrigger(): boolean;
+        clearCronTrigger(): void;
+        getCronTrigger(): CronTrigger.Output | undefined;
+        setCronTrigger(value?: CronTrigger.Output): Step;
+
+        hasEventTrigger(): boolean;
+        clearEventTrigger(): void;
+        getEventTrigger(): EventTrigger.Output | undefined;
+        setEventTrigger(value?: EventTrigger.Output): Step;
+
+        hasManualTrigger(): boolean;
+        clearManualTrigger(): void;
+        getManualTrigger(): ManualTrigger.Output | undefined;
+        setManualTrigger(value?: ManualTrigger.Output): Step;
 
         hasEthTransfer(): boolean;
         clearEthTransfer(): void;
@@ -1521,18 +1519,10 @@ export namespace Execution {
         clearLoop(): void;
         getLoop(): LoopNode.Output | undefined;
         setLoop(value?: LoopNode.Output): Step;
-        getLog(): string;
-        setLog(value: string): Step;
-        getError(): string;
-        setError(value: string): Step;
         getStartAt(): number;
         setStartAt(value: number): Step;
         getEndAt(): number;
         setEndAt(value: number): Step;
-        clearInputsList(): void;
-        getInputsList(): Array<string>;
-        setInputsList(value: Array<string>): Step;
-        addInputs(value: string, index?: number): string;
 
         getOutputDataCase(): Step.OutputDataCase;
 
@@ -1548,8 +1538,18 @@ export namespace Execution {
 
     export namespace Step {
         export type AsObject = {
-            nodeId: string,
+            id: string,
+            type: string,
+            name: string,
             success: boolean,
+            error: string,
+            log: string,
+            inputsList: Array<string>,
+            blockTrigger?: BlockTrigger.Output.AsObject,
+            fixedTimeTrigger?: FixedTimeTrigger.Output.AsObject,
+            cronTrigger?: CronTrigger.Output.AsObject,
+            eventTrigger?: EventTrigger.Output.AsObject,
+            manualTrigger?: ManualTrigger.Output.AsObject,
             ethTransfer?: ETHTransferNode.Output.AsObject,
             graphql?: GraphQLQueryNode.Output.AsObject,
             contractRead?: ContractReadNode.Output.AsObject,
@@ -1559,15 +1559,17 @@ export namespace Execution {
             branch?: BranchNode.Output.AsObject,
             filter?: FilterNode.Output.AsObject,
             loop?: LoopNode.Output.AsObject,
-            log: string,
-            error: string,
             startAt: number,
             endAt: number,
-            inputsList: Array<string>,
         }
 
         export enum OutputDataCase {
             OUTPUT_DATA_NOT_SET = 0,
+            BLOCK_TRIGGER = 20,
+            FIXED_TIME_TRIGGER = 21,
+            CRON_TRIGGER = 22,
+            EVENT_TRIGGER = 23,
+            MANUAL_TRIGGER = 24,
             ETH_TRANSFER = 3,
             GRAPHQL = 4,
             CONTRACT_READ = 5,
@@ -1581,16 +1583,6 @@ export namespace Execution {
 
     }
 
-
-    export enum OutputDataCase {
-        OUTPUT_DATA_NOT_SET = 0,
-        BLOCK_TRIGGER = 10,
-        FIXED_TIME_TRIGGER = 11,
-        CRON_TRIGGER = 12,
-        EVENT_TRIGGER = 13,
-        MANUAL_TRIGGER = 14,
-    }
-
 }
 
 export class Task extends jspb.Message { 
@@ -3020,6 +3012,52 @@ export namespace Evm {
 
 }
 
+export class SimulateTaskReq extends jspb.Message { 
+
+    hasTrigger(): boolean;
+    clearTrigger(): void;
+    getTrigger(): TaskTrigger | undefined;
+    setTrigger(value?: TaskTrigger): SimulateTaskReq;
+    clearNodesList(): void;
+    getNodesList(): Array<TaskNode>;
+    setNodesList(value: Array<TaskNode>): SimulateTaskReq;
+    addNodes(value?: TaskNode, index?: number): TaskNode;
+    clearEdgesList(): void;
+    getEdgesList(): Array<TaskEdge>;
+    setEdgesList(value: Array<TaskEdge>): SimulateTaskReq;
+    addEdges(value?: TaskEdge, index?: number): TaskEdge;
+    getTriggerType(): TriggerType;
+    setTriggerType(value: TriggerType): SimulateTaskReq;
+
+    getTriggerConfigMap(): jspb.Map<string, google_protobuf_struct_pb.Value>;
+    clearTriggerConfigMap(): void;
+
+    getInputVariablesMap(): jspb.Map<string, google_protobuf_struct_pb.Value>;
+    clearInputVariablesMap(): void;
+
+    serializeBinary(): Uint8Array;
+    toObject(includeInstance?: boolean): SimulateTaskReq.AsObject;
+    static toObject(includeInstance: boolean, msg: SimulateTaskReq): SimulateTaskReq.AsObject;
+    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
+    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
+    static serializeBinaryToWriter(message: SimulateTaskReq, writer: jspb.BinaryWriter): void;
+    static deserializeBinary(bytes: Uint8Array): SimulateTaskReq;
+    static deserializeBinaryFromReader(message: SimulateTaskReq, reader: jspb.BinaryReader): SimulateTaskReq;
+}
+
+export namespace SimulateTaskReq {
+    export type AsObject = {
+        trigger?: TaskTrigger.AsObject,
+        nodesList: Array<TaskNode.AsObject>,
+        edgesList: Array<TaskEdge.AsObject>,
+        triggerType: TriggerType,
+
+        triggerConfigMap: Array<[string, google_protobuf_struct_pb.Value.AsObject]>,
+
+        inputVariablesMap: Array<[string, google_protobuf_struct_pb.Value.AsObject]>,
+    }
+}
+
 export enum TriggerType {
     TRIGGER_TYPE_UNSPECIFIED = 0,
     TRIGGER_TYPE_MANUAL = 1,
diff --git a/grpc_codegen/avs_pb.js b/grpc_codegen/avs_pb.js
index fd56198..4ab411f 100644
--- a/grpc_codegen/avs_pb.js
+++ b/grpc_codegen/avs_pb.js
@@ -23,8 +23,6 @@ var global = (function() {
 
 var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');
 goog.object.extend(proto, google_protobuf_wrappers_pb);
-var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
-goog.object.extend(proto, google_protobuf_timestamp_pb);
 var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');
 goog.object.extend(proto, google_protobuf_any_pb);
 var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js');
@@ -66,7 +64,6 @@ goog.exportSymbol('proto.aggregator.Evm.Log', null, global);
 goog.exportSymbol('proto.aggregator.Evm.TransactionReceipt', null, global);
 goog.exportSymbol('proto.aggregator.Evm.UserOp', null, global);
 goog.exportSymbol('proto.aggregator.Execution', null, global);
-goog.exportSymbol('proto.aggregator.Execution.OutputDataCase', null, global);
 goog.exportSymbol('proto.aggregator.Execution.Step', null, global);
 goog.exportSymbol('proto.aggregator.Execution.Step.OutputDataCase', null, global);
 goog.exportSymbol('proto.aggregator.ExecutionReq', null, global);
@@ -125,6 +122,7 @@ goog.exportSymbol('proto.aggregator.RunTriggerResp', null, global);
 goog.exportSymbol('proto.aggregator.RunTriggerResp.OutputDataCase', null, global);
 goog.exportSymbol('proto.aggregator.Secret', null, global);
 goog.exportSymbol('proto.aggregator.SetWalletReq', null, global);
+goog.exportSymbol('proto.aggregator.SimulateTaskReq', null, global);
 goog.exportSymbol('proto.aggregator.SmartWallet', null, global);
 goog.exportSymbol('proto.aggregator.Task', null, global);
 goog.exportSymbol('proto.aggregator.TaskEdge', null, global);
@@ -1177,7 +1175,7 @@ if (goog.DEBUG && !COMPILED) {
  * @constructor
  */
 proto.aggregator.Execution = function(opt_data) {
-  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.Execution.repeatedFields_, proto.aggregator.Execution.oneofGroups_);
+  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.Execution.repeatedFields_, null);
 };
 goog.inherits(proto.aggregator.Execution, jspb.Message);
 if (goog.DEBUG && !COMPILED) {
@@ -2111,6 +2109,27 @@ if (goog.DEBUG && !COMPILED) {
    */
   proto.aggregator.Evm.UserOp.displayName = 'proto.aggregator.Evm.UserOp';
 }
+/**
+ * Generated by JsPbCodeGenerator.
+ * @param {Array=} opt_data Optional initial data array, typically from a
+ * server response, or constructed directly in Javascript. The array is used
+ * in place and becomes part of the constructed object. It is not cloned.
+ * If no data is provided, the constructed object will be empty, but still
+ * valid.
+ * @extends {jspb.Message}
+ * @constructor
+ */
+proto.aggregator.SimulateTaskReq = function(opt_data) {
+  jspb.Message.initialize(this, opt_data, 0, -1, proto.aggregator.SimulateTaskReq.repeatedFields_, null);
+};
+goog.inherits(proto.aggregator.SimulateTaskReq, jspb.Message);
+if (goog.DEBUG && !COMPILED) {
+  /**
+   * @public
+   * @override
+   */
+  proto.aggregator.SimulateTaskReq.displayName = 'proto.aggregator.SimulateTaskReq';
+}
 
 
 
@@ -11587,35 +11606,6 @@ proto.aggregator.TaskNode.prototype.hasCustomCode = function() {
  */
 proto.aggregator.Execution.repeatedFields_ = [8];
 
-/**
- * Oneof group definitions for this message. Each group defines the field
- * numbers belonging to that group. When of these fields' value is set, all
- * other fields in the group are cleared. During deserialization, if multiple
- * fields are encountered for a group, only the last value seen will be kept.
- * @private {!Array<!Array<number>>}
- * @const
- */
-proto.aggregator.Execution.oneofGroups_ = [[10,11,12,13,14]];
-
-/**
- * @enum {number}
- */
-proto.aggregator.Execution.OutputDataCase = {
-  OUTPUT_DATA_NOT_SET: 0,
-  BLOCK_TRIGGER: 10,
-  FIXED_TIME_TRIGGER: 11,
-  CRON_TRIGGER: 12,
-  EVENT_TRIGGER: 13,
-  MANUAL_TRIGGER: 14
-};
-
-/**
- * @return {proto.aggregator.Execution.OutputDataCase}
- */
-proto.aggregator.Execution.prototype.getOutputDataCase = function() {
-  return /** @type {proto.aggregator.Execution.OutputDataCase} */(jspb.Message.computeOneofCase(this, proto.aggregator.Execution.oneofGroups_[0]));
-};
-
 
 
 if (jspb.Message.GENERATE_TO_OBJECT) {
@@ -11652,15 +11642,8 @@ proto.aggregator.Execution.toObject = function(includeInstance, msg) {
     endAt: jspb.Message.getFieldWithDefault(msg, 3, 0),
     success: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
     error: jspb.Message.getFieldWithDefault(msg, 5, ""),
-    triggerType: jspb.Message.getFieldWithDefault(msg, 6, 0),
     stepsList: jspb.Message.toObjectList(msg.getStepsList(),
-    proto.aggregator.Execution.Step.toObject, includeInstance),
-    triggerName: jspb.Message.getFieldWithDefault(msg, 9, ""),
-    blockTrigger: (f = msg.getBlockTrigger()) && proto.aggregator.BlockTrigger.Output.toObject(includeInstance, f),
-    fixedTimeTrigger: (f = msg.getFixedTimeTrigger()) && proto.aggregator.FixedTimeTrigger.Output.toObject(includeInstance, f),
-    cronTrigger: (f = msg.getCronTrigger()) && proto.aggregator.CronTrigger.Output.toObject(includeInstance, f),
-    eventTrigger: (f = msg.getEventTrigger()) && proto.aggregator.EventTrigger.Output.toObject(includeInstance, f),
-    manualTrigger: (f = msg.getManualTrigger()) && proto.aggregator.ManualTrigger.Output.toObject(includeInstance, f)
+    proto.aggregator.Execution.Step.toObject, includeInstance)
   };
 
   if (includeInstance) {
@@ -11717,44 +11700,11 @@ proto.aggregator.Execution.deserializeBinaryFromReader = function(msg, reader) {
       var value = /** @type {string} */ (reader.readString());
       msg.setError(value);
       break;
-    case 6:
-      var value = /** @type {!proto.aggregator.TriggerType} */ (reader.readEnum());
-      msg.setTriggerType(value);
-      break;
     case 8:
       var value = new proto.aggregator.Execution.Step;
       reader.readMessage(value,proto.aggregator.Execution.Step.deserializeBinaryFromReader);
       msg.addSteps(value);
       break;
-    case 9:
-      var value = /** @type {string} */ (reader.readString());
-      msg.setTriggerName(value);
-      break;
-    case 10:
-      var value = new proto.aggregator.BlockTrigger.Output;
-      reader.readMessage(value,proto.aggregator.BlockTrigger.Output.deserializeBinaryFromReader);
-      msg.setBlockTrigger(value);
-      break;
-    case 11:
-      var value = new proto.aggregator.FixedTimeTrigger.Output;
-      reader.readMessage(value,proto.aggregator.FixedTimeTrigger.Output.deserializeBinaryFromReader);
-      msg.setFixedTimeTrigger(value);
-      break;
-    case 12:
-      var value = new proto.aggregator.CronTrigger.Output;
-      reader.readMessage(value,proto.aggregator.CronTrigger.Output.deserializeBinaryFromReader);
-      msg.setCronTrigger(value);
-      break;
-    case 13:
-      var value = new proto.aggregator.EventTrigger.Output;
-      reader.readMessage(value,proto.aggregator.EventTrigger.Output.deserializeBinaryFromReader);
-      msg.setEventTrigger(value);
-      break;
-    case 14:
-      var value = new proto.aggregator.ManualTrigger.Output;
-      reader.readMessage(value,proto.aggregator.ManualTrigger.Output.deserializeBinaryFromReader);
-      msg.setManualTrigger(value);
-      break;
     default:
       reader.skipField();
       break;
@@ -11819,13 +11769,6 @@ proto.aggregator.Execution.serializeBinaryToWriter = function(message, writer) {
       f
     );
   }
-  f = message.getTriggerType();
-  if (f !== 0.0) {
-    writer.writeEnum(
-      6,
-      f
-    );
-  }
   f = message.getStepsList();
   if (f.length > 0) {
     writer.writeRepeatedMessage(
@@ -11834,53 +11777,6 @@ proto.aggregator.Execution.serializeBinaryToWriter = function(message, writer) {
       proto.aggregator.Execution.Step.serializeBinaryToWriter
     );
   }
-  f = message.getTriggerName();
-  if (f.length > 0) {
-    writer.writeString(
-      9,
-      f
-    );
-  }
-  f = message.getBlockTrigger();
-  if (f != null) {
-    writer.writeMessage(
-      10,
-      f,
-      proto.aggregator.BlockTrigger.Output.serializeBinaryToWriter
-    );
-  }
-  f = message.getFixedTimeTrigger();
-  if (f != null) {
-    writer.writeMessage(
-      11,
-      f,
-      proto.aggregator.FixedTimeTrigger.Output.serializeBinaryToWriter
-    );
-  }
-  f = message.getCronTrigger();
-  if (f != null) {
-    writer.writeMessage(
-      12,
-      f,
-      proto.aggregator.CronTrigger.Output.serializeBinaryToWriter
-    );
-  }
-  f = message.getEventTrigger();
-  if (f != null) {
-    writer.writeMessage(
-      13,
-      f,
-      proto.aggregator.EventTrigger.Output.serializeBinaryToWriter
-    );
-  }
-  f = message.getManualTrigger();
-  if (f != null) {
-    writer.writeMessage(
-      14,
-      f,
-      proto.aggregator.ManualTrigger.Output.serializeBinaryToWriter
-    );
-  }
 };
 
 
@@ -11900,13 +11796,18 @@ proto.aggregator.Execution.Step.repeatedFields_ = [16];
  * @private {!Array<!Array<number>>}
  * @const
  */
-proto.aggregator.Execution.Step.oneofGroups_ = [[3,4,5,6,7,8,9,10,11]];
+proto.aggregator.Execution.Step.oneofGroups_ = [[20,21,22,23,24,3,4,5,6,7,8,9,10,11]];
 
 /**
  * @enum {number}
  */
 proto.aggregator.Execution.Step.OutputDataCase = {
   OUTPUT_DATA_NOT_SET: 0,
+  BLOCK_TRIGGER: 20,
+  FIXED_TIME_TRIGGER: 21,
+  CRON_TRIGGER: 22,
+  EVENT_TRIGGER: 23,
+  MANUAL_TRIGGER: 24,
   ETH_TRANSFER: 3,
   GRAPHQL: 4,
   CONTRACT_READ: 5,
@@ -11956,8 +11857,18 @@ proto.aggregator.Execution.Step.prototype.toObject = function(opt_includeInstanc
  */
 proto.aggregator.Execution.Step.toObject = function(includeInstance, msg) {
   var f, obj = {
-    nodeId: jspb.Message.getFieldWithDefault(msg, 1, ""),
+    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
+    type: jspb.Message.getFieldWithDefault(msg, 17, ""),
+    name: jspb.Message.getFieldWithDefault(msg, 18, ""),
     success: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
+    error: jspb.Message.getFieldWithDefault(msg, 13, ""),
+    log: jspb.Message.getFieldWithDefault(msg, 12, ""),
+    inputsList: (f = jspb.Message.getRepeatedField(msg, 16)) == null ? undefined : f,
+    blockTrigger: (f = msg.getBlockTrigger()) && proto.aggregator.BlockTrigger.Output.toObject(includeInstance, f),
+    fixedTimeTrigger: (f = msg.getFixedTimeTrigger()) && proto.aggregator.FixedTimeTrigger.Output.toObject(includeInstance, f),
+    cronTrigger: (f = msg.getCronTrigger()) && proto.aggregator.CronTrigger.Output.toObject(includeInstance, f),
+    eventTrigger: (f = msg.getEventTrigger()) && proto.aggregator.EventTrigger.Output.toObject(includeInstance, f),
+    manualTrigger: (f = msg.getManualTrigger()) && proto.aggregator.ManualTrigger.Output.toObject(includeInstance, f),
     ethTransfer: (f = msg.getEthTransfer()) && proto.aggregator.ETHTransferNode.Output.toObject(includeInstance, f),
     graphql: (f = msg.getGraphql()) && proto.aggregator.GraphQLQueryNode.Output.toObject(includeInstance, f),
     contractRead: (f = msg.getContractRead()) && proto.aggregator.ContractReadNode.Output.toObject(includeInstance, f),
@@ -11967,11 +11878,8 @@ proto.aggregator.Execution.Step.toObject = function(includeInstance, msg) {
     branch: (f = msg.getBranch()) && proto.aggregator.BranchNode.Output.toObject(includeInstance, f),
     filter: (f = msg.getFilter()) && proto.aggregator.FilterNode.Output.toObject(includeInstance, f),
     loop: (f = msg.getLoop()) && proto.aggregator.LoopNode.Output.toObject(includeInstance, f),
-    log: jspb.Message.getFieldWithDefault(msg, 12, ""),
-    error: jspb.Message.getFieldWithDefault(msg, 13, ""),
     startAt: jspb.Message.getFieldWithDefault(msg, 14, 0),
-    endAt: jspb.Message.getFieldWithDefault(msg, 15, 0),
-    inputsList: (f = jspb.Message.getRepeatedField(msg, 16)) == null ? undefined : f
+    endAt: jspb.Message.getFieldWithDefault(msg, 15, 0)
   };
 
   if (includeInstance) {
@@ -12010,12 +11918,57 @@ proto.aggregator.Execution.Step.deserializeBinaryFromReader = function(msg, read
     switch (field) {
     case 1:
       var value = /** @type {string} */ (reader.readString());
-      msg.setNodeId(value);
+      msg.setId(value);
+      break;
+    case 17:
+      var value = /** @type {string} */ (reader.readString());
+      msg.setType(value);
+      break;
+    case 18:
+      var value = /** @type {string} */ (reader.readString());
+      msg.setName(value);
       break;
     case 2:
       var value = /** @type {boolean} */ (reader.readBool());
       msg.setSuccess(value);
       break;
+    case 13:
+      var value = /** @type {string} */ (reader.readString());
+      msg.setError(value);
+      break;
+    case 12:
+      var value = /** @type {string} */ (reader.readString());
+      msg.setLog(value);
+      break;
+    case 16:
+      var value = /** @type {string} */ (reader.readString());
+      msg.addInputs(value);
+      break;
+    case 20:
+      var value = new proto.aggregator.BlockTrigger.Output;
+      reader.readMessage(value,proto.aggregator.BlockTrigger.Output.deserializeBinaryFromReader);
+      msg.setBlockTrigger(value);
+      break;
+    case 21:
+      var value = new proto.aggregator.FixedTimeTrigger.Output;
+      reader.readMessage(value,proto.aggregator.FixedTimeTrigger.Output.deserializeBinaryFromReader);
+      msg.setFixedTimeTrigger(value);
+      break;
+    case 22:
+      var value = new proto.aggregator.CronTrigger.Output;
+      reader.readMessage(value,proto.aggregator.CronTrigger.Output.deserializeBinaryFromReader);
+      msg.setCronTrigger(value);
+      break;
+    case 23:
+      var value = new proto.aggregator.EventTrigger.Output;
+      reader.readMessage(value,proto.aggregator.EventTrigger.Output.deserializeBinaryFromReader);
+      msg.setEventTrigger(value);
+      break;
+    case 24:
+      var value = new proto.aggregator.ManualTrigger.Output;
+      reader.readMessage(value,proto.aggregator.ManualTrigger.Output.deserializeBinaryFromReader);
+      msg.setManualTrigger(value);
+      break;
     case 3:
       var value = new proto.aggregator.ETHTransferNode.Output;
       reader.readMessage(value,proto.aggregator.ETHTransferNode.Output.deserializeBinaryFromReader);
@@ -12061,14 +12014,6 @@ proto.aggregator.Execution.Step.deserializeBinaryFromReader = function(msg, read
       reader.readMessage(value,proto.aggregator.LoopNode.Output.deserializeBinaryFromReader);
       msg.setLoop(value);
       break;
-    case 12:
-      var value = /** @type {string} */ (reader.readString());
-      msg.setLog(value);
-      break;
-    case 13:
-      var value = /** @type {string} */ (reader.readString());
-      msg.setError(value);
-      break;
     case 14:
       var value = /** @type {number} */ (reader.readInt64());
       msg.setStartAt(value);
@@ -12077,10 +12022,6 @@ proto.aggregator.Execution.Step.deserializeBinaryFromReader = function(msg, read
       var value = /** @type {number} */ (reader.readInt64());
       msg.setEndAt(value);
       break;
-    case 16:
-      var value = /** @type {string} */ (reader.readString());
-      msg.addInputs(value);
-      break;
     default:
       reader.skipField();
       break;
@@ -12110,13 +12051,27 @@ proto.aggregator.Execution.Step.prototype.serializeBinary = function() {
  */
 proto.aggregator.Execution.Step.serializeBinaryToWriter = function(message, writer) {
   var f = undefined;
-  f = message.getNodeId();
+  f = message.getId();
   if (f.length > 0) {
     writer.writeString(
       1,
       f
     );
   }
+  f = message.getType();
+  if (f.length > 0) {
+    writer.writeString(
+      17,
+      f
+    );
+  }
+  f = message.getName();
+  if (f.length > 0) {
+    writer.writeString(
+      18,
+      f
+    );
+  }
   f = message.getSuccess();
   if (f) {
     writer.writeBool(
@@ -12124,44 +12079,105 @@ proto.aggregator.Execution.Step.serializeBinaryToWriter = function(message, writ
       f
     );
   }
-  f = message.getEthTransfer();
+  f = message.getError();
+  if (f.length > 0) {
+    writer.writeString(
+      13,
+      f
+    );
+  }
+  f = message.getLog();
+  if (f.length > 0) {
+    writer.writeString(
+      12,
+      f
+    );
+  }
+  f = message.getInputsList();
+  if (f.length > 0) {
+    writer.writeRepeatedString(
+      16,
+      f
+    );
+  }
+  f = message.getBlockTrigger();
   if (f != null) {
     writer.writeMessage(
-      3,
+      20,
       f,
-      proto.aggregator.ETHTransferNode.Output.serializeBinaryToWriter
+      proto.aggregator.BlockTrigger.Output.serializeBinaryToWriter
     );
   }
-  f = message.getGraphql();
+  f = message.getFixedTimeTrigger();
   if (f != null) {
     writer.writeMessage(
-      4,
+      21,
       f,
-      proto.aggregator.GraphQLQueryNode.Output.serializeBinaryToWriter
+      proto.aggregator.FixedTimeTrigger.Output.serializeBinaryToWriter
     );
   }
-  f = message.getContractRead();
+  f = message.getCronTrigger();
   if (f != null) {
     writer.writeMessage(
-      5,
+      22,
       f,
-      proto.aggregator.ContractReadNode.Output.serializeBinaryToWriter
+      proto.aggregator.CronTrigger.Output.serializeBinaryToWriter
     );
   }
-  f = message.getContractWrite();
+  f = message.getEventTrigger();
   if (f != null) {
     writer.writeMessage(
-      6,
+      23,
       f,
-      proto.aggregator.ContractWriteNode.Output.serializeBinaryToWriter
+      proto.aggregator.EventTrigger.Output.serializeBinaryToWriter
     );
   }
-  f = message.getCustomCode();
+  f = message.getManualTrigger();
   if (f != null) {
     writer.writeMessage(
-      7,
+      24,
       f,
-      proto.aggregator.CustomCodeNode.Output.serializeBinaryToWriter
+      proto.aggregator.ManualTrigger.Output.serializeBinaryToWriter
+    );
+  }
+  f = message.getEthTransfer();
+  if (f != null) {
+    writer.writeMessage(
+      3,
+      f,
+      proto.aggregator.ETHTransferNode.Output.serializeBinaryToWriter
+    );
+  }
+  f = message.getGraphql();
+  if (f != null) {
+    writer.writeMessage(
+      4,
+      f,
+      proto.aggregator.GraphQLQueryNode.Output.serializeBinaryToWriter
+    );
+  }
+  f = message.getContractRead();
+  if (f != null) {
+    writer.writeMessage(
+      5,
+      f,
+      proto.aggregator.ContractReadNode.Output.serializeBinaryToWriter
+    );
+  }
+  f = message.getContractWrite();
+  if (f != null) {
+    writer.writeMessage(
+      6,
+      f,
+      proto.aggregator.ContractWriteNode.Output.serializeBinaryToWriter
+    );
+  }
+  f = message.getCustomCode();
+  if (f != null) {
+    writer.writeMessage(
+      7,
+      f,
+      proto.aggregator.CustomCodeNode.Output.serializeBinaryToWriter
     );
   }
   f = message.getRestApi();
@@ -12196,20 +12212,6 @@ proto.aggregator.Execution.Step.serializeBinaryToWriter = function(message, writ
       proto.aggregator.LoopNode.Output.serializeBinaryToWriter
     );
   }
-  f = message.getLog();
-  if (f.length > 0) {
-    writer.writeString(
-      12,
-      f
-    );
-  }
-  f = message.getError();
-  if (f.length > 0) {
-    writer.writeString(
-      13,
-      f
-    );
-  }
   f = message.getStartAt();
   if (f !== 0) {
     writer.writeInt64(
@@ -12224,21 +12226,14 @@ proto.aggregator.Execution.Step.serializeBinaryToWriter = function(message, writ
       f
     );
   }
-  f = message.getInputsList();
-  if (f.length > 0) {
-    writer.writeRepeatedString(
-      16,
-      f
-    );
-  }
 };
 
 
 /**
- * optional string node_id = 1;
+ * optional string id = 1;
  * @return {string}
  */
-proto.aggregator.Execution.Step.prototype.getNodeId = function() {
+proto.aggregator.Execution.Step.prototype.getId = function() {
   return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
 };
 
@@ -12247,11 +12242,47 @@ proto.aggregator.Execution.Step.prototype.getNodeId = function() {
  * @param {string} value
  * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.Step.prototype.setNodeId = function(value) {
+proto.aggregator.Execution.Step.prototype.setId = function(value) {
   return jspb.Message.setProto3StringField(this, 1, value);
 };
 
 
+/**
+ * optional string type = 17;
+ * @return {string}
+ */
+proto.aggregator.Execution.Step.prototype.getType = function() {
+  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 17, ""));
+};
+
+
+/**
+ * @param {string} value
+ * @return {!proto.aggregator.Execution.Step} returns this
+ */
+proto.aggregator.Execution.Step.prototype.setType = function(value) {
+  return jspb.Message.setProto3StringField(this, 17, value);
+};
+
+
+/**
+ * optional string name = 18;
+ * @return {string}
+ */
+proto.aggregator.Execution.Step.prototype.getName = function() {
+  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 18, ""));
+};
+
+
+/**
+ * @param {string} value
+ * @return {!proto.aggregator.Execution.Step} returns this
+ */
+proto.aggregator.Execution.Step.prototype.setName = function(value) {
+  return jspb.Message.setProto3StringField(this, 18, value);
+};
+
+
 /**
  * optional bool success = 2;
  * @return {boolean}
@@ -12271,95 +12302,94 @@ proto.aggregator.Execution.Step.prototype.setSuccess = function(value) {
 
 
 /**
- * optional ETHTransferNode.Output eth_transfer = 3;
- * @return {?proto.aggregator.ETHTransferNode.Output}
+ * optional string error = 13;
+ * @return {string}
  */
-proto.aggregator.Execution.Step.prototype.getEthTransfer = function() {
-  return /** @type{?proto.aggregator.ETHTransferNode.Output} */ (
-    jspb.Message.getWrapperField(this, proto.aggregator.ETHTransferNode.Output, 3));
+proto.aggregator.Execution.Step.prototype.getError = function() {
+  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 13, ""));
 };
 
 
 /**
- * @param {?proto.aggregator.ETHTransferNode.Output|undefined} value
+ * @param {string} value
  * @return {!proto.aggregator.Execution.Step} returns this
-*/
-proto.aggregator.Execution.Step.prototype.setEthTransfer = function(value) {
-  return jspb.Message.setOneofWrapperField(this, 3, proto.aggregator.Execution.Step.oneofGroups_[0], value);
+ */
+proto.aggregator.Execution.Step.prototype.setError = function(value) {
+  return jspb.Message.setProto3StringField(this, 13, value);
 };
 
 
 /**
- * Clears the message field making it undefined.
- * @return {!proto.aggregator.Execution.Step} returns this
+ * optional string log = 12;
+ * @return {string}
  */
-proto.aggregator.Execution.Step.prototype.clearEthTransfer = function() {
-  return this.setEthTransfer(undefined);
+proto.aggregator.Execution.Step.prototype.getLog = function() {
+  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
 };
 
 
 /**
- * Returns whether this field is set.
- * @return {boolean}
+ * @param {string} value
+ * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.Step.prototype.hasEthTransfer = function() {
-  return jspb.Message.getField(this, 3) != null;
+proto.aggregator.Execution.Step.prototype.setLog = function(value) {
+  return jspb.Message.setProto3StringField(this, 12, value);
 };
 
 
 /**
- * optional GraphQLQueryNode.Output graphql = 4;
- * @return {?proto.aggregator.GraphQLQueryNode.Output}
+ * repeated string inputs = 16;
+ * @return {!Array<string>}
  */
-proto.aggregator.Execution.Step.prototype.getGraphql = function() {
-  return /** @type{?proto.aggregator.GraphQLQueryNode.Output} */ (
-    jspb.Message.getWrapperField(this, proto.aggregator.GraphQLQueryNode.Output, 4));
+proto.aggregator.Execution.Step.prototype.getInputsList = function() {
+  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 16));
 };
 
 
 /**
- * @param {?proto.aggregator.GraphQLQueryNode.Output|undefined} value
+ * @param {!Array<string>} value
  * @return {!proto.aggregator.Execution.Step} returns this
-*/
-proto.aggregator.Execution.Step.prototype.setGraphql = function(value) {
-  return jspb.Message.setOneofWrapperField(this, 4, proto.aggregator.Execution.Step.oneofGroups_[0], value);
+ */
+proto.aggregator.Execution.Step.prototype.setInputsList = function(value) {
+  return jspb.Message.setField(this, 16, value || []);
 };
 
 
 /**
- * Clears the message field making it undefined.
+ * @param {string} value
+ * @param {number=} opt_index
  * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.Step.prototype.clearGraphql = function() {
-  return this.setGraphql(undefined);
+proto.aggregator.Execution.Step.prototype.addInputs = function(value, opt_index) {
+  return jspb.Message.addToRepeatedField(this, 16, value, opt_index);
 };
 
 
 /**
- * Returns whether this field is set.
- * @return {boolean}
+ * Clears the list making it empty but non-null.
+ * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.Step.prototype.hasGraphql = function() {
-  return jspb.Message.getField(this, 4) != null;
+proto.aggregator.Execution.Step.prototype.clearInputsList = function() {
+  return this.setInputsList([]);
 };
 
 
 /**
- * optional ContractReadNode.Output contract_read = 5;
- * @return {?proto.aggregator.ContractReadNode.Output}
+ * optional BlockTrigger.Output block_trigger = 20;
+ * @return {?proto.aggregator.BlockTrigger.Output}
  */
-proto.aggregator.Execution.Step.prototype.getContractRead = function() {
-  return /** @type{?proto.aggregator.ContractReadNode.Output} */ (
-    jspb.Message.getWrapperField(this, proto.aggregator.ContractReadNode.Output, 5));
+proto.aggregator.Execution.Step.prototype.getBlockTrigger = function() {
+  return /** @type{?proto.aggregator.BlockTrigger.Output} */ (
+    jspb.Message.getWrapperField(this, proto.aggregator.BlockTrigger.Output, 20));
 };
 
 
 /**
- * @param {?proto.aggregator.ContractReadNode.Output|undefined} value
+ * @param {?proto.aggregator.BlockTrigger.Output|undefined} value
  * @return {!proto.aggregator.Execution.Step} returns this
 */
-proto.aggregator.Execution.Step.prototype.setContractRead = function(value) {
-  return jspb.Message.setOneofWrapperField(this, 5, proto.aggregator.Execution.Step.oneofGroups_[0], value);
+proto.aggregator.Execution.Step.prototype.setBlockTrigger = function(value) {
+  return jspb.Message.setOneofWrapperField(this, 20, proto.aggregator.Execution.Step.oneofGroups_[0], value);
 };
 
 
@@ -12367,8 +12397,8 @@ proto.aggregator.Execution.Step.prototype.setContractRead = function(value) {
  * Clears the message field making it undefined.
  * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.Step.prototype.clearContractRead = function() {
-  return this.setContractRead(undefined);
+proto.aggregator.Execution.Step.prototype.clearBlockTrigger = function() {
+  return this.setBlockTrigger(undefined);
 };
 
 
@@ -12376,27 +12406,27 @@ proto.aggregator.Execution.Step.prototype.clearContractRead = function() {
  * Returns whether this field is set.
  * @return {boolean}
  */
-proto.aggregator.Execution.Step.prototype.hasContractRead = function() {
-  return jspb.Message.getField(this, 5) != null;
+proto.aggregator.Execution.Step.prototype.hasBlockTrigger = function() {
+  return jspb.Message.getField(this, 20) != null;
 };
 
 
 /**
- * optional ContractWriteNode.Output contract_write = 6;
- * @return {?proto.aggregator.ContractWriteNode.Output}
+ * optional FixedTimeTrigger.Output fixed_time_trigger = 21;
+ * @return {?proto.aggregator.FixedTimeTrigger.Output}
  */
-proto.aggregator.Execution.Step.prototype.getContractWrite = function() {
-  return /** @type{?proto.aggregator.ContractWriteNode.Output} */ (
-    jspb.Message.getWrapperField(this, proto.aggregator.ContractWriteNode.Output, 6));
+proto.aggregator.Execution.Step.prototype.getFixedTimeTrigger = function() {
+  return /** @type{?proto.aggregator.FixedTimeTrigger.Output} */ (
+    jspb.Message.getWrapperField(this, proto.aggregator.FixedTimeTrigger.Output, 21));
 };
 
 
 /**
- * @param {?proto.aggregator.ContractWriteNode.Output|undefined} value
+ * @param {?proto.aggregator.FixedTimeTrigger.Output|undefined} value
  * @return {!proto.aggregator.Execution.Step} returns this
 */
-proto.aggregator.Execution.Step.prototype.setContractWrite = function(value) {
-  return jspb.Message.setOneofWrapperField(this, 6, proto.aggregator.Execution.Step.oneofGroups_[0], value);
+proto.aggregator.Execution.Step.prototype.setFixedTimeTrigger = function(value) {
+  return jspb.Message.setOneofWrapperField(this, 21, proto.aggregator.Execution.Step.oneofGroups_[0], value);
 };
 
 
@@ -12404,8 +12434,8 @@ proto.aggregator.Execution.Step.prototype.setContractWrite = function(value) {
  * Clears the message field making it undefined.
  * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.Step.prototype.clearContractWrite = function() {
-  return this.setContractWrite(undefined);
+proto.aggregator.Execution.Step.prototype.clearFixedTimeTrigger = function() {
+  return this.setFixedTimeTrigger(undefined);
 };
 
 
@@ -12413,27 +12443,27 @@ proto.aggregator.Execution.Step.prototype.clearContractWrite = function() {
  * Returns whether this field is set.
  * @return {boolean}
  */
-proto.aggregator.Execution.Step.prototype.hasContractWrite = function() {
-  return jspb.Message.getField(this, 6) != null;
+proto.aggregator.Execution.Step.prototype.hasFixedTimeTrigger = function() {
+  return jspb.Message.getField(this, 21) != null;
 };
 
 
 /**
- * optional CustomCodeNode.Output custom_code = 7;
- * @return {?proto.aggregator.CustomCodeNode.Output}
+ * optional CronTrigger.Output cron_trigger = 22;
+ * @return {?proto.aggregator.CronTrigger.Output}
  */
-proto.aggregator.Execution.Step.prototype.getCustomCode = function() {
-  return /** @type{?proto.aggregator.CustomCodeNode.Output} */ (
-    jspb.Message.getWrapperField(this, proto.aggregator.CustomCodeNode.Output, 7));
+proto.aggregator.Execution.Step.prototype.getCronTrigger = function() {
+  return /** @type{?proto.aggregator.CronTrigger.Output} */ (
+    jspb.Message.getWrapperField(this, proto.aggregator.CronTrigger.Output, 22));
 };
 
 
 /**
- * @param {?proto.aggregator.CustomCodeNode.Output|undefined} value
+ * @param {?proto.aggregator.CronTrigger.Output|undefined} value
  * @return {!proto.aggregator.Execution.Step} returns this
 */
-proto.aggregator.Execution.Step.prototype.setCustomCode = function(value) {
-  return jspb.Message.setOneofWrapperField(this, 7, proto.aggregator.Execution.Step.oneofGroups_[0], value);
+proto.aggregator.Execution.Step.prototype.setCronTrigger = function(value) {
+  return jspb.Message.setOneofWrapperField(this, 22, proto.aggregator.Execution.Step.oneofGroups_[0], value);
 };
 
 
@@ -12441,8 +12471,8 @@ proto.aggregator.Execution.Step.prototype.setCustomCode = function(value) {
  * Clears the message field making it undefined.
  * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.Step.prototype.clearCustomCode = function() {
-  return this.setCustomCode(undefined);
+proto.aggregator.Execution.Step.prototype.clearCronTrigger = function() {
+  return this.setCronTrigger(undefined);
 };
 
 
@@ -12450,27 +12480,27 @@ proto.aggregator.Execution.Step.prototype.clearCustomCode = function() {
  * Returns whether this field is set.
  * @return {boolean}
  */
-proto.aggregator.Execution.Step.prototype.hasCustomCode = function() {
-  return jspb.Message.getField(this, 7) != null;
+proto.aggregator.Execution.Step.prototype.hasCronTrigger = function() {
+  return jspb.Message.getField(this, 22) != null;
 };
 
 
 /**
- * optional RestAPINode.Output rest_api = 8;
- * @return {?proto.aggregator.RestAPINode.Output}
+ * optional EventTrigger.Output event_trigger = 23;
+ * @return {?proto.aggregator.EventTrigger.Output}
  */
-proto.aggregator.Execution.Step.prototype.getRestApi = function() {
-  return /** @type{?proto.aggregator.RestAPINode.Output} */ (
-    jspb.Message.getWrapperField(this, proto.aggregator.RestAPINode.Output, 8));
+proto.aggregator.Execution.Step.prototype.getEventTrigger = function() {
+  return /** @type{?proto.aggregator.EventTrigger.Output} */ (
+    jspb.Message.getWrapperField(this, proto.aggregator.EventTrigger.Output, 23));
 };
 
 
 /**
- * @param {?proto.aggregator.RestAPINode.Output|undefined} value
+ * @param {?proto.aggregator.EventTrigger.Output|undefined} value
  * @return {!proto.aggregator.Execution.Step} returns this
 */
-proto.aggregator.Execution.Step.prototype.setRestApi = function(value) {
-  return jspb.Message.setOneofWrapperField(this, 8, proto.aggregator.Execution.Step.oneofGroups_[0], value);
+proto.aggregator.Execution.Step.prototype.setEventTrigger = function(value) {
+  return jspb.Message.setOneofWrapperField(this, 23, proto.aggregator.Execution.Step.oneofGroups_[0], value);
 };
 
 
@@ -12478,8 +12508,8 @@ proto.aggregator.Execution.Step.prototype.setRestApi = function(value) {
  * Clears the message field making it undefined.
  * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.Step.prototype.clearRestApi = function() {
-  return this.setRestApi(undefined);
+proto.aggregator.Execution.Step.prototype.clearEventTrigger = function() {
+  return this.setEventTrigger(undefined);
 };
 
 
@@ -12487,27 +12517,27 @@ proto.aggregator.Execution.Step.prototype.clearRestApi = function() {
  * Returns whether this field is set.
  * @return {boolean}
  */
-proto.aggregator.Execution.Step.prototype.hasRestApi = function() {
-  return jspb.Message.getField(this, 8) != null;
+proto.aggregator.Execution.Step.prototype.hasEventTrigger = function() {
+  return jspb.Message.getField(this, 23) != null;
 };
 
 
 /**
- * optional BranchNode.Output branch = 9;
- * @return {?proto.aggregator.BranchNode.Output}
+ * optional ManualTrigger.Output manual_trigger = 24;
+ * @return {?proto.aggregator.ManualTrigger.Output}
  */
-proto.aggregator.Execution.Step.prototype.getBranch = function() {
-  return /** @type{?proto.aggregator.BranchNode.Output} */ (
-    jspb.Message.getWrapperField(this, proto.aggregator.BranchNode.Output, 9));
+proto.aggregator.Execution.Step.prototype.getManualTrigger = function() {
+  return /** @type{?proto.aggregator.ManualTrigger.Output} */ (
+    jspb.Message.getWrapperField(this, proto.aggregator.ManualTrigger.Output, 24));
 };
 
 
 /**
- * @param {?proto.aggregator.BranchNode.Output|undefined} value
+ * @param {?proto.aggregator.ManualTrigger.Output|undefined} value
  * @return {!proto.aggregator.Execution.Step} returns this
 */
-proto.aggregator.Execution.Step.prototype.setBranch = function(value) {
-  return jspb.Message.setOneofWrapperField(this, 9, proto.aggregator.Execution.Step.oneofGroups_[0], value);
+proto.aggregator.Execution.Step.prototype.setManualTrigger = function(value) {
+  return jspb.Message.setOneofWrapperField(this, 24, proto.aggregator.Execution.Step.oneofGroups_[0], value);
 };
 
 
@@ -12515,8 +12545,8 @@ proto.aggregator.Execution.Step.prototype.setBranch = function(value) {
  * Clears the message field making it undefined.
  * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.Step.prototype.clearBranch = function() {
-  return this.setBranch(undefined);
+proto.aggregator.Execution.Step.prototype.clearManualTrigger = function() {
+  return this.setManualTrigger(undefined);
 };
 
 
@@ -12524,27 +12554,27 @@ proto.aggregator.Execution.Step.prototype.clearBranch = function() {
  * Returns whether this field is set.
  * @return {boolean}
  */
-proto.aggregator.Execution.Step.prototype.hasBranch = function() {
-  return jspb.Message.getField(this, 9) != null;
+proto.aggregator.Execution.Step.prototype.hasManualTrigger = function() {
+  return jspb.Message.getField(this, 24) != null;
 };
 
 
 /**
- * optional FilterNode.Output filter = 10;
- * @return {?proto.aggregator.FilterNode.Output}
+ * optional ETHTransferNode.Output eth_transfer = 3;
+ * @return {?proto.aggregator.ETHTransferNode.Output}
  */
-proto.aggregator.Execution.Step.prototype.getFilter = function() {
-  return /** @type{?proto.aggregator.FilterNode.Output} */ (
-    jspb.Message.getWrapperField(this, proto.aggregator.FilterNode.Output, 10));
+proto.aggregator.Execution.Step.prototype.getEthTransfer = function() {
+  return /** @type{?proto.aggregator.ETHTransferNode.Output} */ (
+    jspb.Message.getWrapperField(this, proto.aggregator.ETHTransferNode.Output, 3));
 };
 
 
 /**
- * @param {?proto.aggregator.FilterNode.Output|undefined} value
+ * @param {?proto.aggregator.ETHTransferNode.Output|undefined} value
  * @return {!proto.aggregator.Execution.Step} returns this
 */
-proto.aggregator.Execution.Step.prototype.setFilter = function(value) {
-  return jspb.Message.setOneofWrapperField(this, 10, proto.aggregator.Execution.Step.oneofGroups_[0], value);
+proto.aggregator.Execution.Step.prototype.setEthTransfer = function(value) {
+  return jspb.Message.setOneofWrapperField(this, 3, proto.aggregator.Execution.Step.oneofGroups_[0], value);
 };
 
 
@@ -12552,8 +12582,8 @@ proto.aggregator.Execution.Step.prototype.setFilter = function(value) {
  * Clears the message field making it undefined.
  * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.Step.prototype.clearFilter = function() {
-  return this.setFilter(undefined);
+proto.aggregator.Execution.Step.prototype.clearEthTransfer = function() {
+  return this.setEthTransfer(undefined);
 };
 
 
@@ -12561,27 +12591,27 @@ proto.aggregator.Execution.Step.prototype.clearFilter = function() {
  * Returns whether this field is set.
  * @return {boolean}
  */
-proto.aggregator.Execution.Step.prototype.hasFilter = function() {
-  return jspb.Message.getField(this, 10) != null;
+proto.aggregator.Execution.Step.prototype.hasEthTransfer = function() {
+  return jspb.Message.getField(this, 3) != null;
 };
 
 
 /**
- * optional LoopNode.Output loop = 11;
- * @return {?proto.aggregator.LoopNode.Output}
+ * optional GraphQLQueryNode.Output graphql = 4;
+ * @return {?proto.aggregator.GraphQLQueryNode.Output}
  */
-proto.aggregator.Execution.Step.prototype.getLoop = function() {
-  return /** @type{?proto.aggregator.LoopNode.Output} */ (
-    jspb.Message.getWrapperField(this, proto.aggregator.LoopNode.Output, 11));
+proto.aggregator.Execution.Step.prototype.getGraphql = function() {
+  return /** @type{?proto.aggregator.GraphQLQueryNode.Output} */ (
+    jspb.Message.getWrapperField(this, proto.aggregator.GraphQLQueryNode.Output, 4));
 };
 
 
 /**
- * @param {?proto.aggregator.LoopNode.Output|undefined} value
+ * @param {?proto.aggregator.GraphQLQueryNode.Output|undefined} value
  * @return {!proto.aggregator.Execution.Step} returns this
 */
-proto.aggregator.Execution.Step.prototype.setLoop = function(value) {
-  return jspb.Message.setOneofWrapperField(this, 11, proto.aggregator.Execution.Step.oneofGroups_[0], value);
+proto.aggregator.Execution.Step.prototype.setGraphql = function(value) {
+  return jspb.Message.setOneofWrapperField(this, 4, proto.aggregator.Execution.Step.oneofGroups_[0], value);
 };
 
 
@@ -12589,8 +12619,8 @@ proto.aggregator.Execution.Step.prototype.setLoop = function(value) {
  * Clears the message field making it undefined.
  * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.Step.prototype.clearLoop = function() {
-  return this.setLoop(undefined);
+proto.aggregator.Execution.Step.prototype.clearGraphql = function() {
+  return this.setGraphql(undefined);
 };
 
 
@@ -12598,466 +12628,431 @@ proto.aggregator.Execution.Step.prototype.clearLoop = function() {
  * Returns whether this field is set.
  * @return {boolean}
  */
-proto.aggregator.Execution.Step.prototype.hasLoop = function() {
-  return jspb.Message.getField(this, 11) != null;
+proto.aggregator.Execution.Step.prototype.hasGraphql = function() {
+  return jspb.Message.getField(this, 4) != null;
 };
 
 
 /**
- * optional string log = 12;
- * @return {string}
+ * optional ContractReadNode.Output contract_read = 5;
+ * @return {?proto.aggregator.ContractReadNode.Output}
  */
-proto.aggregator.Execution.Step.prototype.getLog = function() {
-  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
+proto.aggregator.Execution.Step.prototype.getContractRead = function() {
+  return /** @type{?proto.aggregator.ContractReadNode.Output} */ (
+    jspb.Message.getWrapperField(this, proto.aggregator.ContractReadNode.Output, 5));
 };
 
 
 /**
- * @param {string} value
+ * @param {?proto.aggregator.ContractReadNode.Output|undefined} value
  * @return {!proto.aggregator.Execution.Step} returns this
- */
-proto.aggregator.Execution.Step.prototype.setLog = function(value) {
-  return jspb.Message.setProto3StringField(this, 12, value);
+*/
+proto.aggregator.Execution.Step.prototype.setContractRead = function(value) {
+  return jspb.Message.setOneofWrapperField(this, 5, proto.aggregator.Execution.Step.oneofGroups_[0], value);
 };
 
 
 /**
- * optional string error = 13;
- * @return {string}
+ * Clears the message field making it undefined.
+ * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.Step.prototype.getError = function() {
-  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 13, ""));
+proto.aggregator.Execution.Step.prototype.clearContractRead = function() {
+  return this.setContractRead(undefined);
 };
 
 
 /**
- * @param {string} value
- * @return {!proto.aggregator.Execution.Step} returns this
+ * Returns whether this field is set.
+ * @return {boolean}
  */
-proto.aggregator.Execution.Step.prototype.setError = function(value) {
-  return jspb.Message.setProto3StringField(this, 13, value);
+proto.aggregator.Execution.Step.prototype.hasContractRead = function() {
+  return jspb.Message.getField(this, 5) != null;
 };
 
 
 /**
- * optional int64 start_at = 14;
- * @return {number}
+ * optional ContractWriteNode.Output contract_write = 6;
+ * @return {?proto.aggregator.ContractWriteNode.Output}
  */
-proto.aggregator.Execution.Step.prototype.getStartAt = function() {
-  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 14, 0));
+proto.aggregator.Execution.Step.prototype.getContractWrite = function() {
+  return /** @type{?proto.aggregator.ContractWriteNode.Output} */ (
+    jspb.Message.getWrapperField(this, proto.aggregator.ContractWriteNode.Output, 6));
 };
 
 
 /**
- * @param {number} value
+ * @param {?proto.aggregator.ContractWriteNode.Output|undefined} value
  * @return {!proto.aggregator.Execution.Step} returns this
- */
-proto.aggregator.Execution.Step.prototype.setStartAt = function(value) {
-  return jspb.Message.setProto3IntField(this, 14, value);
+*/
+proto.aggregator.Execution.Step.prototype.setContractWrite = function(value) {
+  return jspb.Message.setOneofWrapperField(this, 6, proto.aggregator.Execution.Step.oneofGroups_[0], value);
 };
 
 
 /**
- * optional int64 end_at = 15;
- * @return {number}
+ * Clears the message field making it undefined.
+ * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.Step.prototype.getEndAt = function() {
-  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 15, 0));
+proto.aggregator.Execution.Step.prototype.clearContractWrite = function() {
+  return this.setContractWrite(undefined);
 };
 
 
 /**
- * @param {number} value
- * @return {!proto.aggregator.Execution.Step} returns this
+ * Returns whether this field is set.
+ * @return {boolean}
  */
-proto.aggregator.Execution.Step.prototype.setEndAt = function(value) {
-  return jspb.Message.setProto3IntField(this, 15, value);
+proto.aggregator.Execution.Step.prototype.hasContractWrite = function() {
+  return jspb.Message.getField(this, 6) != null;
 };
 
 
 /**
- * repeated string inputs = 16;
- * @return {!Array<string>}
+ * optional CustomCodeNode.Output custom_code = 7;
+ * @return {?proto.aggregator.CustomCodeNode.Output}
  */
-proto.aggregator.Execution.Step.prototype.getInputsList = function() {
-  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 16));
+proto.aggregator.Execution.Step.prototype.getCustomCode = function() {
+  return /** @type{?proto.aggregator.CustomCodeNode.Output} */ (
+    jspb.Message.getWrapperField(this, proto.aggregator.CustomCodeNode.Output, 7));
 };
 
 
 /**
- * @param {!Array<string>} value
+ * @param {?proto.aggregator.CustomCodeNode.Output|undefined} value
  * @return {!proto.aggregator.Execution.Step} returns this
- */
-proto.aggregator.Execution.Step.prototype.setInputsList = function(value) {
-  return jspb.Message.setField(this, 16, value || []);
+*/
+proto.aggregator.Execution.Step.prototype.setCustomCode = function(value) {
+  return jspb.Message.setOneofWrapperField(this, 7, proto.aggregator.Execution.Step.oneofGroups_[0], value);
 };
 
 
 /**
- * @param {string} value
- * @param {number=} opt_index
+ * Clears the message field making it undefined.
  * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.Step.prototype.addInputs = function(value, opt_index) {
-  return jspb.Message.addToRepeatedField(this, 16, value, opt_index);
+proto.aggregator.Execution.Step.prototype.clearCustomCode = function() {
+  return this.setCustomCode(undefined);
 };
 
 
 /**
- * Clears the list making it empty but non-null.
- * @return {!proto.aggregator.Execution.Step} returns this
+ * Returns whether this field is set.
+ * @return {boolean}
  */
-proto.aggregator.Execution.Step.prototype.clearInputsList = function() {
-  return this.setInputsList([]);
+proto.aggregator.Execution.Step.prototype.hasCustomCode = function() {
+  return jspb.Message.getField(this, 7) != null;
 };
 
 
 /**
- * optional string id = 1;
- * @return {string}
+ * optional RestAPINode.Output rest_api = 8;
+ * @return {?proto.aggregator.RestAPINode.Output}
  */
-proto.aggregator.Execution.prototype.getId = function() {
-  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
+proto.aggregator.Execution.Step.prototype.getRestApi = function() {
+  return /** @type{?proto.aggregator.RestAPINode.Output} */ (
+    jspb.Message.getWrapperField(this, proto.aggregator.RestAPINode.Output, 8));
 };
 
 
 /**
- * @param {string} value
- * @return {!proto.aggregator.Execution} returns this
- */
-proto.aggregator.Execution.prototype.setId = function(value) {
-  return jspb.Message.setProto3StringField(this, 1, value);
+ * @param {?proto.aggregator.RestAPINode.Output|undefined} value
+ * @return {!proto.aggregator.Execution.Step} returns this
+*/
+proto.aggregator.Execution.Step.prototype.setRestApi = function(value) {
+  return jspb.Message.setOneofWrapperField(this, 8, proto.aggregator.Execution.Step.oneofGroups_[0], value);
 };
 
 
 /**
- * optional int64 start_at = 2;
- * @return {number}
+ * Clears the message field making it undefined.
+ * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.prototype.getStartAt = function() {
-  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
+proto.aggregator.Execution.Step.prototype.clearRestApi = function() {
+  return this.setRestApi(undefined);
 };
 
 
 /**
- * @param {number} value
- * @return {!proto.aggregator.Execution} returns this
+ * Returns whether this field is set.
+ * @return {boolean}
  */
-proto.aggregator.Execution.prototype.setStartAt = function(value) {
-  return jspb.Message.setProto3IntField(this, 2, value);
+proto.aggregator.Execution.Step.prototype.hasRestApi = function() {
+  return jspb.Message.getField(this, 8) != null;
 };
 
 
 /**
- * optional int64 end_at = 3;
- * @return {number}
+ * optional BranchNode.Output branch = 9;
+ * @return {?proto.aggregator.BranchNode.Output}
  */
-proto.aggregator.Execution.prototype.getEndAt = function() {
-  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
+proto.aggregator.Execution.Step.prototype.getBranch = function() {
+  return /** @type{?proto.aggregator.BranchNode.Output} */ (
+    jspb.Message.getWrapperField(this, proto.aggregator.BranchNode.Output, 9));
 };
 
 
 /**
- * @param {number} value
- * @return {!proto.aggregator.Execution} returns this
- */
-proto.aggregator.Execution.prototype.setEndAt = function(value) {
-  return jspb.Message.setProto3IntField(this, 3, value);
+ * @param {?proto.aggregator.BranchNode.Output|undefined} value
+ * @return {!proto.aggregator.Execution.Step} returns this
+*/
+proto.aggregator.Execution.Step.prototype.setBranch = function(value) {
+  return jspb.Message.setOneofWrapperField(this, 9, proto.aggregator.Execution.Step.oneofGroups_[0], value);
 };
 
 
 /**
- * optional bool success = 4;
- * @return {boolean}
+ * Clears the message field making it undefined.
+ * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.prototype.getSuccess = function() {
-  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
+proto.aggregator.Execution.Step.prototype.clearBranch = function() {
+  return this.setBranch(undefined);
 };
 
 
 /**
- * @param {boolean} value
- * @return {!proto.aggregator.Execution} returns this
+ * Returns whether this field is set.
+ * @return {boolean}
  */
-proto.aggregator.Execution.prototype.setSuccess = function(value) {
-  return jspb.Message.setProto3BooleanField(this, 4, value);
+proto.aggregator.Execution.Step.prototype.hasBranch = function() {
+  return jspb.Message.getField(this, 9) != null;
 };
 
 
 /**
- * optional string error = 5;
- * @return {string}
+ * optional FilterNode.Output filter = 10;
+ * @return {?proto.aggregator.FilterNode.Output}
  */
-proto.aggregator.Execution.prototype.getError = function() {
-  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
+proto.aggregator.Execution.Step.prototype.getFilter = function() {
+  return /** @type{?proto.aggregator.FilterNode.Output} */ (
+    jspb.Message.getWrapperField(this, proto.aggregator.FilterNode.Output, 10));
 };
 
 
 /**
- * @param {string} value
- * @return {!proto.aggregator.Execution} returns this
- */
-proto.aggregator.Execution.prototype.setError = function(value) {
-  return jspb.Message.setProto3StringField(this, 5, value);
+ * @param {?proto.aggregator.FilterNode.Output|undefined} value
+ * @return {!proto.aggregator.Execution.Step} returns this
+*/
+proto.aggregator.Execution.Step.prototype.setFilter = function(value) {
+  return jspb.Message.setOneofWrapperField(this, 10, proto.aggregator.Execution.Step.oneofGroups_[0], value);
 };
 
 
 /**
- * optional TriggerType trigger_type = 6;
- * @return {!proto.aggregator.TriggerType}
+ * Clears the message field making it undefined.
+ * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.prototype.getTriggerType = function() {
-  return /** @type {!proto.aggregator.TriggerType} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
+proto.aggregator.Execution.Step.prototype.clearFilter = function() {
+  return this.setFilter(undefined);
 };
 
 
 /**
- * @param {!proto.aggregator.TriggerType} value
- * @return {!proto.aggregator.Execution} returns this
+ * Returns whether this field is set.
+ * @return {boolean}
  */
-proto.aggregator.Execution.prototype.setTriggerType = function(value) {
-  return jspb.Message.setProto3EnumField(this, 6, value);
+proto.aggregator.Execution.Step.prototype.hasFilter = function() {
+  return jspb.Message.getField(this, 10) != null;
 };
 
 
 /**
- * repeated Step steps = 8;
- * @return {!Array<!proto.aggregator.Execution.Step>}
+ * optional LoopNode.Output loop = 11;
+ * @return {?proto.aggregator.LoopNode.Output}
  */
-proto.aggregator.Execution.prototype.getStepsList = function() {
-  return /** @type{!Array<!proto.aggregator.Execution.Step>} */ (
-    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.Execution.Step, 8));
+proto.aggregator.Execution.Step.prototype.getLoop = function() {
+  return /** @type{?proto.aggregator.LoopNode.Output} */ (
+    jspb.Message.getWrapperField(this, proto.aggregator.LoopNode.Output, 11));
 };
 
 
 /**
- * @param {!Array<!proto.aggregator.Execution.Step>} value
- * @return {!proto.aggregator.Execution} returns this
+ * @param {?proto.aggregator.LoopNode.Output|undefined} value
+ * @return {!proto.aggregator.Execution.Step} returns this
 */
-proto.aggregator.Execution.prototype.setStepsList = function(value) {
-  return jspb.Message.setRepeatedWrapperField(this, 8, value);
+proto.aggregator.Execution.Step.prototype.setLoop = function(value) {
+  return jspb.Message.setOneofWrapperField(this, 11, proto.aggregator.Execution.Step.oneofGroups_[0], value);
 };
 
 
 /**
- * @param {!proto.aggregator.Execution.Step=} opt_value
- * @param {number=} opt_index
- * @return {!proto.aggregator.Execution.Step}
+ * Clears the message field making it undefined.
+ * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.prototype.addSteps = function(opt_value, opt_index) {
-  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.aggregator.Execution.Step, opt_index);
+proto.aggregator.Execution.Step.prototype.clearLoop = function() {
+  return this.setLoop(undefined);
 };
 
 
 /**
- * Clears the list making it empty but non-null.
- * @return {!proto.aggregator.Execution} returns this
+ * Returns whether this field is set.
+ * @return {boolean}
  */
-proto.aggregator.Execution.prototype.clearStepsList = function() {
-  return this.setStepsList([]);
-};
-
-
-/**
- * optional string trigger_name = 9;
- * @return {string}
- */
-proto.aggregator.Execution.prototype.getTriggerName = function() {
-  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
+proto.aggregator.Execution.Step.prototype.hasLoop = function() {
+  return jspb.Message.getField(this, 11) != null;
 };
 
 
 /**
- * @param {string} value
- * @return {!proto.aggregator.Execution} returns this
+ * optional int64 start_at = 14;
+ * @return {number}
  */
-proto.aggregator.Execution.prototype.setTriggerName = function(value) {
-  return jspb.Message.setProto3StringField(this, 9, value);
+proto.aggregator.Execution.Step.prototype.getStartAt = function() {
+  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 14, 0));
 };
 
 
 /**
- * optional BlockTrigger.Output block_trigger = 10;
- * @return {?proto.aggregator.BlockTrigger.Output}
+ * @param {number} value
+ * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.prototype.getBlockTrigger = function() {
-  return /** @type{?proto.aggregator.BlockTrigger.Output} */ (
-    jspb.Message.getWrapperField(this, proto.aggregator.BlockTrigger.Output, 10));
-};
-
-
-/**
- * @param {?proto.aggregator.BlockTrigger.Output|undefined} value
- * @return {!proto.aggregator.Execution} returns this
-*/
-proto.aggregator.Execution.prototype.setBlockTrigger = function(value) {
-  return jspb.Message.setOneofWrapperField(this, 10, proto.aggregator.Execution.oneofGroups_[0], value);
+proto.aggregator.Execution.Step.prototype.setStartAt = function(value) {
+  return jspb.Message.setProto3IntField(this, 14, value);
 };
 
 
 /**
- * Clears the message field making it undefined.
- * @return {!proto.aggregator.Execution} returns this
+ * optional int64 end_at = 15;
+ * @return {number}
  */
-proto.aggregator.Execution.prototype.clearBlockTrigger = function() {
-  return this.setBlockTrigger(undefined);
+proto.aggregator.Execution.Step.prototype.getEndAt = function() {
+  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 15, 0));
 };
 
 
 /**
- * Returns whether this field is set.
- * @return {boolean}
+ * @param {number} value
+ * @return {!proto.aggregator.Execution.Step} returns this
  */
-proto.aggregator.Execution.prototype.hasBlockTrigger = function() {
-  return jspb.Message.getField(this, 10) != null;
+proto.aggregator.Execution.Step.prototype.setEndAt = function(value) {
+  return jspb.Message.setProto3IntField(this, 15, value);
 };
 
 
 /**
- * optional FixedTimeTrigger.Output fixed_time_trigger = 11;
- * @return {?proto.aggregator.FixedTimeTrigger.Output}
+ * optional string id = 1;
+ * @return {string}
  */
-proto.aggregator.Execution.prototype.getFixedTimeTrigger = function() {
-  return /** @type{?proto.aggregator.FixedTimeTrigger.Output} */ (
-    jspb.Message.getWrapperField(this, proto.aggregator.FixedTimeTrigger.Output, 11));
-};
-
-
-/**
- * @param {?proto.aggregator.FixedTimeTrigger.Output|undefined} value
- * @return {!proto.aggregator.Execution} returns this
-*/
-proto.aggregator.Execution.prototype.setFixedTimeTrigger = function(value) {
-  return jspb.Message.setOneofWrapperField(this, 11, proto.aggregator.Execution.oneofGroups_[0], value);
+proto.aggregator.Execution.prototype.getId = function() {
+  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
 };
 
 
 /**
- * Clears the message field making it undefined.
+ * @param {string} value
  * @return {!proto.aggregator.Execution} returns this
  */
-proto.aggregator.Execution.prototype.clearFixedTimeTrigger = function() {
-  return this.setFixedTimeTrigger(undefined);
+proto.aggregator.Execution.prototype.setId = function(value) {
+  return jspb.Message.setProto3StringField(this, 1, value);
 };
 
 
 /**
- * Returns whether this field is set.
- * @return {boolean}
+ * optional int64 start_at = 2;
+ * @return {number}
  */
-proto.aggregator.Execution.prototype.hasFixedTimeTrigger = function() {
-  return jspb.Message.getField(this, 11) != null;
+proto.aggregator.Execution.prototype.getStartAt = function() {
+  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
 };
 
 
 /**
- * optional CronTrigger.Output cron_trigger = 12;
- * @return {?proto.aggregator.CronTrigger.Output}
+ * @param {number} value
+ * @return {!proto.aggregator.Execution} returns this
  */
-proto.aggregator.Execution.prototype.getCronTrigger = function() {
-  return /** @type{?proto.aggregator.CronTrigger.Output} */ (
-    jspb.Message.getWrapperField(this, proto.aggregator.CronTrigger.Output, 12));
+proto.aggregator.Execution.prototype.setStartAt = function(value) {
+  return jspb.Message.setProto3IntField(this, 2, value);
 };
 
 
 /**
- * @param {?proto.aggregator.CronTrigger.Output|undefined} value
- * @return {!proto.aggregator.Execution} returns this
-*/
-proto.aggregator.Execution.prototype.setCronTrigger = function(value) {
-  return jspb.Message.setOneofWrapperField(this, 12, proto.aggregator.Execution.oneofGroups_[0], value);
+ * optional int64 end_at = 3;
+ * @return {number}
+ */
+proto.aggregator.Execution.prototype.getEndAt = function() {
+  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
 };
 
 
 /**
- * Clears the message field making it undefined.
+ * @param {number} value
  * @return {!proto.aggregator.Execution} returns this
  */
-proto.aggregator.Execution.prototype.clearCronTrigger = function() {
-  return this.setCronTrigger(undefined);
+proto.aggregator.Execution.prototype.setEndAt = function(value) {
+  return jspb.Message.setProto3IntField(this, 3, value);
 };
 
 
 /**
- * Returns whether this field is set.
+ * optional bool success = 4;
  * @return {boolean}
  */
-proto.aggregator.Execution.prototype.hasCronTrigger = function() {
-  return jspb.Message.getField(this, 12) != null;
-};
-
-
-/**
- * optional EventTrigger.Output event_trigger = 13;
- * @return {?proto.aggregator.EventTrigger.Output}
- */
-proto.aggregator.Execution.prototype.getEventTrigger = function() {
-  return /** @type{?proto.aggregator.EventTrigger.Output} */ (
-    jspb.Message.getWrapperField(this, proto.aggregator.EventTrigger.Output, 13));
+proto.aggregator.Execution.prototype.getSuccess = function() {
+  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
 };
 
 
 /**
- * @param {?proto.aggregator.EventTrigger.Output|undefined} value
+ * @param {boolean} value
  * @return {!proto.aggregator.Execution} returns this
-*/
-proto.aggregator.Execution.prototype.setEventTrigger = function(value) {
-  return jspb.Message.setOneofWrapperField(this, 13, proto.aggregator.Execution.oneofGroups_[0], value);
+ */
+proto.aggregator.Execution.prototype.setSuccess = function(value) {
+  return jspb.Message.setProto3BooleanField(this, 4, value);
 };
 
 
 /**
- * Clears the message field making it undefined.
- * @return {!proto.aggregator.Execution} returns this
+ * optional string error = 5;
+ * @return {string}
  */
-proto.aggregator.Execution.prototype.clearEventTrigger = function() {
-  return this.setEventTrigger(undefined);
+proto.aggregator.Execution.prototype.getError = function() {
+  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
 };
 
 
 /**
- * Returns whether this field is set.
- * @return {boolean}
+ * @param {string} value
+ * @return {!proto.aggregator.Execution} returns this
  */
-proto.aggregator.Execution.prototype.hasEventTrigger = function() {
-  return jspb.Message.getField(this, 13) != null;
+proto.aggregator.Execution.prototype.setError = function(value) {
+  return jspb.Message.setProto3StringField(this, 5, value);
 };
 
 
 /**
- * optional ManualTrigger.Output manual_trigger = 14;
- * @return {?proto.aggregator.ManualTrigger.Output}
+ * repeated Step steps = 8;
+ * @return {!Array<!proto.aggregator.Execution.Step>}
  */
-proto.aggregator.Execution.prototype.getManualTrigger = function() {
-  return /** @type{?proto.aggregator.ManualTrigger.Output} */ (
-    jspb.Message.getWrapperField(this, proto.aggregator.ManualTrigger.Output, 14));
+proto.aggregator.Execution.prototype.getStepsList = function() {
+  return /** @type{!Array<!proto.aggregator.Execution.Step>} */ (
+    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.Execution.Step, 8));
 };
 
 
 /**
- * @param {?proto.aggregator.ManualTrigger.Output|undefined} value
+ * @param {!Array<!proto.aggregator.Execution.Step>} value
  * @return {!proto.aggregator.Execution} returns this
 */
-proto.aggregator.Execution.prototype.setManualTrigger = function(value) {
-  return jspb.Message.setOneofWrapperField(this, 14, proto.aggregator.Execution.oneofGroups_[0], value);
+proto.aggregator.Execution.prototype.setStepsList = function(value) {
+  return jspb.Message.setRepeatedWrapperField(this, 8, value);
 };
 
 
 /**
- * Clears the message field making it undefined.
- * @return {!proto.aggregator.Execution} returns this
+ * @param {!proto.aggregator.Execution.Step=} opt_value
+ * @param {number=} opt_index
+ * @return {!proto.aggregator.Execution.Step}
  */
-proto.aggregator.Execution.prototype.clearManualTrigger = function() {
-  return this.setManualTrigger(undefined);
+proto.aggregator.Execution.prototype.addSteps = function(opt_value, opt_index) {
+  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.aggregator.Execution.Step, opt_index);
 };
 
 
 /**
- * Returns whether this field is set.
- * @return {boolean}
+ * Clears the list making it empty but non-null.
+ * @return {!proto.aggregator.Execution} returns this
  */
-proto.aggregator.Execution.prototype.hasManualTrigger = function() {
-  return jspb.Message.getField(this, 14) != null;
+proto.aggregator.Execution.prototype.clearStepsList = function() {
+  return this.setStepsList([]);
 };
 
 
@@ -23834,6 +23829,366 @@ proto.aggregator.Evm.UserOp.prototype.setSignature = function(value) {
 };
 
 
+
+/**
+ * List of repeated fields within this message type.
+ * @private {!Array<number>}
+ * @const
+ */
+proto.aggregator.SimulateTaskReq.repeatedFields_ = [2,3];
+
+
+
+if (jspb.Message.GENERATE_TO_OBJECT) {
+/**
+ * Creates an object representation of this proto.
+ * Field names that are reserved in JavaScript and will be renamed to pb_name.
+ * Optional fields that are not set will be set to undefined.
+ * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
+ * For the list of reserved names please see:
+ *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
+ * @param {boolean=} opt_includeInstance Deprecated. whether to include the
+ *     JSPB instance for transitional soy proto support:
+ *     http://goto/soy-param-migration
+ * @return {!Object}
+ */
+proto.aggregator.SimulateTaskReq.prototype.toObject = function(opt_includeInstance) {
+  return proto.aggregator.SimulateTaskReq.toObject(opt_includeInstance, this);
+};
+
+
+/**
+ * Static version of the {@see toObject} method.
+ * @param {boolean|undefined} includeInstance Deprecated. Whether to include
+ *     the JSPB instance for transitional soy proto support:
+ *     http://goto/soy-param-migration
+ * @param {!proto.aggregator.SimulateTaskReq} msg The msg instance to transform.
+ * @return {!Object}
+ * @suppress {unusedLocalVariables} f is only used for nested messages
+ */
+proto.aggregator.SimulateTaskReq.toObject = function(includeInstance, msg) {
+  var f, obj = {
+    trigger: (f = msg.getTrigger()) && proto.aggregator.TaskTrigger.toObject(includeInstance, f),
+    nodesList: jspb.Message.toObjectList(msg.getNodesList(),
+    proto.aggregator.TaskNode.toObject, includeInstance),
+    edgesList: jspb.Message.toObjectList(msg.getEdgesList(),
+    proto.aggregator.TaskEdge.toObject, includeInstance),
+    triggerType: jspb.Message.getFieldWithDefault(msg, 4, 0),
+    triggerConfigMap: (f = msg.getTriggerConfigMap()) ? f.toObject(includeInstance, proto.google.protobuf.Value.toObject) : [],
+    inputVariablesMap: (f = msg.getInputVariablesMap()) ? f.toObject(includeInstance, proto.google.protobuf.Value.toObject) : []
+  };
+
+  if (includeInstance) {
+    obj.$jspbMessageInstance = msg;
+  }
+  return obj;
+};
+}
+
+
+/**
+ * Deserializes binary data (in protobuf wire format).
+ * @param {jspb.ByteSource} bytes The bytes to deserialize.
+ * @return {!proto.aggregator.SimulateTaskReq}
+ */
+proto.aggregator.SimulateTaskReq.deserializeBinary = function(bytes) {
+  var reader = new jspb.BinaryReader(bytes);
+  var msg = new proto.aggregator.SimulateTaskReq;
+  return proto.aggregator.SimulateTaskReq.deserializeBinaryFromReader(msg, reader);
+};
+
+
+/**
+ * Deserializes binary data (in protobuf wire format) from the
+ * given reader into the given message object.
+ * @param {!proto.aggregator.SimulateTaskReq} msg The message object to deserialize into.
+ * @param {!jspb.BinaryReader} reader The BinaryReader to use.
+ * @return {!proto.aggregator.SimulateTaskReq}
+ */
+proto.aggregator.SimulateTaskReq.deserializeBinaryFromReader = function(msg, reader) {
+  while (reader.nextField()) {
+    if (reader.isEndGroup()) {
+      break;
+    }
+    var field = reader.getFieldNumber();
+    switch (field) {
+    case 1:
+      var value = new proto.aggregator.TaskTrigger;
+      reader.readMessage(value,proto.aggregator.TaskTrigger.deserializeBinaryFromReader);
+      msg.setTrigger(value);
+      break;
+    case 2:
+      var value = new proto.aggregator.TaskNode;
+      reader.readMessage(value,proto.aggregator.TaskNode.deserializeBinaryFromReader);
+      msg.addNodes(value);
+      break;
+    case 3:
+      var value = new proto.aggregator.TaskEdge;
+      reader.readMessage(value,proto.aggregator.TaskEdge.deserializeBinaryFromReader);
+      msg.addEdges(value);
+      break;
+    case 4:
+      var value = /** @type {!proto.aggregator.TriggerType} */ (reader.readEnum());
+      msg.setTriggerType(value);
+      break;
+    case 5:
+      var value = msg.getTriggerConfigMap();
+      reader.readMessage(value, function(message, reader) {
+        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.google.protobuf.Value.deserializeBinaryFromReader, "", new proto.google.protobuf.Value());
+         });
+      break;
+    case 6:
+      var value = msg.getInputVariablesMap();
+      reader.readMessage(value, function(message, reader) {
+        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.google.protobuf.Value.deserializeBinaryFromReader, "", new proto.google.protobuf.Value());
+         });
+      break;
+    default:
+      reader.skipField();
+      break;
+    }
+  }
+  return msg;
+};
+
+
+/**
+ * Serializes the message to binary data (in protobuf wire format).
+ * @return {!Uint8Array}
+ */
+proto.aggregator.SimulateTaskReq.prototype.serializeBinary = function() {
+  var writer = new jspb.BinaryWriter();
+  proto.aggregator.SimulateTaskReq.serializeBinaryToWriter(this, writer);
+  return writer.getResultBuffer();
+};
+
+
+/**
+ * Serializes the given message to binary data (in protobuf wire
+ * format), writing to the given BinaryWriter.
+ * @param {!proto.aggregator.SimulateTaskReq} message
+ * @param {!jspb.BinaryWriter} writer
+ * @suppress {unusedLocalVariables} f is only used for nested messages
+ */
+proto.aggregator.SimulateTaskReq.serializeBinaryToWriter = function(message, writer) {
+  var f = undefined;
+  f = message.getTrigger();
+  if (f != null) {
+    writer.writeMessage(
+      1,
+      f,
+      proto.aggregator.TaskTrigger.serializeBinaryToWriter
+    );
+  }
+  f = message.getNodesList();
+  if (f.length > 0) {
+    writer.writeRepeatedMessage(
+      2,
+      f,
+      proto.aggregator.TaskNode.serializeBinaryToWriter
+    );
+  }
+  f = message.getEdgesList();
+  if (f.length > 0) {
+    writer.writeRepeatedMessage(
+      3,
+      f,
+      proto.aggregator.TaskEdge.serializeBinaryToWriter
+    );
+  }
+  f = message.getTriggerType();
+  if (f !== 0.0) {
+    writer.writeEnum(
+      4,
+      f
+    );
+  }
+  f = message.getTriggerConfigMap(true);
+  if (f && f.getLength() > 0) {
+    f.serializeBinary(5, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.google.protobuf.Value.serializeBinaryToWriter);
+  }
+  f = message.getInputVariablesMap(true);
+  if (f && f.getLength() > 0) {
+    f.serializeBinary(6, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.google.protobuf.Value.serializeBinaryToWriter);
+  }
+};
+
+
+/**
+ * optional TaskTrigger trigger = 1;
+ * @return {?proto.aggregator.TaskTrigger}
+ */
+proto.aggregator.SimulateTaskReq.prototype.getTrigger = function() {
+  return /** @type{?proto.aggregator.TaskTrigger} */ (
+    jspb.Message.getWrapperField(this, proto.aggregator.TaskTrigger, 1));
+};
+
+
+/**
+ * @param {?proto.aggregator.TaskTrigger|undefined} value
+ * @return {!proto.aggregator.SimulateTaskReq} returns this
+*/
+proto.aggregator.SimulateTaskReq.prototype.setTrigger = function(value) {
+  return jspb.Message.setWrapperField(this, 1, value);
+};
+
+
+/**
+ * Clears the message field making it undefined.
+ * @return {!proto.aggregator.SimulateTaskReq} returns this
+ */
+proto.aggregator.SimulateTaskReq.prototype.clearTrigger = function() {
+  return this.setTrigger(undefined);
+};
+
+
+/**
+ * Returns whether this field is set.
+ * @return {boolean}
+ */
+proto.aggregator.SimulateTaskReq.prototype.hasTrigger = function() {
+  return jspb.Message.getField(this, 1) != null;
+};
+
+
+/**
+ * repeated TaskNode nodes = 2;
+ * @return {!Array<!proto.aggregator.TaskNode>}
+ */
+proto.aggregator.SimulateTaskReq.prototype.getNodesList = function() {
+  return /** @type{!Array<!proto.aggregator.TaskNode>} */ (
+    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.TaskNode, 2));
+};
+
+
+/**
+ * @param {!Array<!proto.aggregator.TaskNode>} value
+ * @return {!proto.aggregator.SimulateTaskReq} returns this
+*/
+proto.aggregator.SimulateTaskReq.prototype.setNodesList = function(value) {
+  return jspb.Message.setRepeatedWrapperField(this, 2, value);
+};
+
+
+/**
+ * @param {!proto.aggregator.TaskNode=} opt_value
+ * @param {number=} opt_index
+ * @return {!proto.aggregator.TaskNode}
+ */
+proto.aggregator.SimulateTaskReq.prototype.addNodes = function(opt_value, opt_index) {
+  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.aggregator.TaskNode, opt_index);
+};
+
+
+/**
+ * Clears the list making it empty but non-null.
+ * @return {!proto.aggregator.SimulateTaskReq} returns this
+ */
+proto.aggregator.SimulateTaskReq.prototype.clearNodesList = function() {
+  return this.setNodesList([]);
+};
+
+
+/**
+ * repeated TaskEdge edges = 3;
+ * @return {!Array<!proto.aggregator.TaskEdge>}
+ */
+proto.aggregator.SimulateTaskReq.prototype.getEdgesList = function() {
+  return /** @type{!Array<!proto.aggregator.TaskEdge>} */ (
+    jspb.Message.getRepeatedWrapperField(this, proto.aggregator.TaskEdge, 3));
+};
+
+
+/**
+ * @param {!Array<!proto.aggregator.TaskEdge>} value
+ * @return {!proto.aggregator.SimulateTaskReq} returns this
+*/
+proto.aggregator.SimulateTaskReq.prototype.setEdgesList = function(value) {
+  return jspb.Message.setRepeatedWrapperField(this, 3, value);
+};
+
+
+/**
+ * @param {!proto.aggregator.TaskEdge=} opt_value
+ * @param {number=} opt_index
+ * @return {!proto.aggregator.TaskEdge}
+ */
+proto.aggregator.SimulateTaskReq.prototype.addEdges = function(opt_value, opt_index) {
+  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.aggregator.TaskEdge, opt_index);
+};
+
+
+/**
+ * Clears the list making it empty but non-null.
+ * @return {!proto.aggregator.SimulateTaskReq} returns this
+ */
+proto.aggregator.SimulateTaskReq.prototype.clearEdgesList = function() {
+  return this.setEdgesList([]);
+};
+
+
+/**
+ * optional TriggerType trigger_type = 4;
+ * @return {!proto.aggregator.TriggerType}
+ */
+proto.aggregator.SimulateTaskReq.prototype.getTriggerType = function() {
+  return /** @type {!proto.aggregator.TriggerType} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
+};
+
+
+/**
+ * @param {!proto.aggregator.TriggerType} value
+ * @return {!proto.aggregator.SimulateTaskReq} returns this
+ */
+proto.aggregator.SimulateTaskReq.prototype.setTriggerType = function(value) {
+  return jspb.Message.setProto3EnumField(this, 4, value);
+};
+
+
+/**
+ * map<string, google.protobuf.Value> trigger_config = 5;
+ * @param {boolean=} opt_noLazyCreate Do not create the map if
+ * empty, instead returning `undefined`
+ * @return {!jspb.Map<string,!proto.google.protobuf.Value>}
+ */
+proto.aggregator.SimulateTaskReq.prototype.getTriggerConfigMap = function(opt_noLazyCreate) {
+  return /** @type {!jspb.Map<string,!proto.google.protobuf.Value>} */ (
+      jspb.Message.getMapField(this, 5, opt_noLazyCreate,
+      proto.google.protobuf.Value));
+};
+
+
+/**
+ * Clears values from the map. The map will be non-null.
+ * @return {!proto.aggregator.SimulateTaskReq} returns this
+ */
+proto.aggregator.SimulateTaskReq.prototype.clearTriggerConfigMap = function() {
+  this.getTriggerConfigMap().clear();
+  return this;};
+
+
+/**
+ * map<string, google.protobuf.Value> input_variables = 6;
+ * @param {boolean=} opt_noLazyCreate Do not create the map if
+ * empty, instead returning `undefined`
+ * @return {!jspb.Map<string,!proto.google.protobuf.Value>}
+ */
+proto.aggregator.SimulateTaskReq.prototype.getInputVariablesMap = function(opt_noLazyCreate) {
+  return /** @type {!jspb.Map<string,!proto.google.protobuf.Value>} */ (
+      jspb.Message.getMapField(this, 6, opt_noLazyCreate,
+      proto.google.protobuf.Value));
+};
+
+
+/**
+ * Clears values from the map. The map will be non-null.
+ * @return {!proto.aggregator.SimulateTaskReq} returns this
+ */
+proto.aggregator.SimulateTaskReq.prototype.clearInputVariablesMap = function() {
+  this.getInputVariablesMap().clear();
+  return this;};
+
+
 /**
  * @enum {number}
  */
diff --git a/packages/sdk-js/CHANGELOG.md b/packages/sdk-js/CHANGELOG.md
index ee58901..26ba2f8 100644
--- a/packages/sdk-js/CHANGELOG.md
+++ b/packages/sdk-js/CHANGELOG.md
@@ -1,5 +1,16 @@
 # @avaprotocol/sdk-js
 
+## 1.7.0
+
+### Minor Changes
+
+- a7578b6: Added SimulateWorkflow function and updated protobuf
+
+### Patch Changes
+
+- Updated dependencies [a7578b6]
+  - @avaprotocol/types@1.1.0
+
 ## 1.6.8
 
 ### Patch Changes
diff --git a/packages/sdk-js/package.json b/packages/sdk-js/package.json
index 89890fb..ad7ee21 100644
--- a/packages/sdk-js/package.json
+++ b/packages/sdk-js/package.json
@@ -1,6 +1,6 @@
 {
   "name": "@avaprotocol/sdk-js",
-  "version": "1.6.8",
+  "version": "1.7.0",
   "description": "A JavaScript/TypeScript SDK designed to simplify integration with Ava Protocol's AVS",
   "main": "dist/index.js",
   "types": "dist/index.d.ts",
@@ -30,7 +30,7 @@
     "clean": "rm -rf node_modules dist tsconfig.tsbuildinfo"
   },
   "dependencies": {
-    "@avaprotocol/types": "1.0.8",
+    "@avaprotocol/types": "1.1.0",
     "@grpc/grpc-js": "^1.11.3",
     "@grpc/proto-loader": "^0.7.13",
     "dotenv": "^16.4.5",
diff --git a/packages/sdk-js/src/index.ts b/packages/sdk-js/src/index.ts
index 2bd696f..798b81b 100644
--- a/packages/sdk-js/src/index.ts
+++ b/packages/sdk-js/src/index.ts
@@ -28,6 +28,7 @@ import type {
   GetSecretsOptions,
   SecretOptions,
   TriggerDataProps,
+  SimulateTaskRequest,
 } from "@avaprotocol/types";
 
 import {
@@ -1000,6 +1001,69 @@ class Client extends BaseClient {
       triggerId: result.getTriggerId(),
     };
   }
+
+  /**
+   * Simulate a complete task execution including trigger and all workflow nodes
+   * @param {SimulateTaskRequest} params - The parameters for simulating the task
+   * @param {Record<string, any>} params.trigger - The trigger configuration
+   * @param {Array<Record<string, any>>} params.nodes - The workflow nodes
+   * @param {Array<Record<string, any>>} params.edges - The workflow edges
+   * @param {string} params.triggerType - The type of the trigger
+   * @param {Record<string, any>} params.triggerConfig - The trigger configuration
+   * @param {Record<string, any>} params.inputVariables - Input variables for the simulation
+   * @param {RequestOptions} options - Request options
+   * @returns {Promise<Execution>} - The response from simulating the task
+   */
+  async simulateTask(
+    { trigger, nodes, edges, triggerType, triggerConfig = {}, inputVariables = {} }: SimulateTaskRequest,
+    options?: RequestOptions
+  ): Promise<Execution> {
+    // Create the request
+    const request = new avs_pb.SimulateTaskReq();
+
+    // Create SDK trigger object and convert to protobuf
+    const triggerSdk = TriggerFactory.create(trigger as any);
+    request.setTrigger(triggerSdk.toRequest());
+
+    // Create SDK node objects and convert to protobuf
+    const nodeMessages = nodes.map((node: any) => {
+      const nodeSdk = NodeFactory.create(node as any);
+      return nodeSdk.toRequest();
+    });
+    request.setNodesList(nodeMessages);
+
+    // Create SDK edge objects and convert to protobuf
+    const edgeMessages = edges.map((edge: any) => {
+      const edgeSdk = new Edge(edge as any);
+      return edgeSdk.toRequest();
+    });
+    request.setEdgesList(edgeMessages);
+
+    // Convert string triggerType to protobuf enum
+    const protobufTriggerType = TriggerTypeGoConverter.fromGoString(triggerType);
+    request.setTriggerType(protobufTriggerType);
+
+    // Set trigger configuration
+    const triggerConfigMap = request.getTriggerConfigMap();
+    for (const [key, value] of Object.entries(triggerConfig)) {
+      triggerConfigMap.set(key, convertJSValueToProtobuf(value));
+    }
+
+    // Set input variables
+    const inputVarsMap = request.getInputVariablesMap();
+    for (const [key, value] of Object.entries(inputVariables)) {
+      inputVarsMap.set(key, convertJSValueToProtobuf(value));
+    }
+
+    // Send the request directly to the server
+    const result = await this.sendGrpcRequest<
+      avs_pb.Execution,
+      avs_pb.SimulateTaskReq
+    >("simulateTask", request, options);
+
+    // Return the execution directly
+    return Execution.fromResponse(result);
+  }
 }
 
 export * from "./models/node/factory";
@@ -1026,4 +1090,5 @@ export type {
   RunNodeWithInputsResponse,
   RunTriggerRequest,
   RunTriggerResponse,
+  SimulateTaskRequest,
 };
diff --git a/packages/sdk-js/src/models/execution.ts b/packages/sdk-js/src/models/execution.ts
index 3790096..1d546a4 100644
--- a/packages/sdk-js/src/models/execution.ts
+++ b/packages/sdk-js/src/models/execution.ts
@@ -19,16 +19,8 @@ export type OutputDataProps =
 export type ExecutionProps = Omit<
   avs_pb.Execution.AsObject,
   | "stepsList"
-  | "blockTrigger"
-  | "fixedTimeTrigger"
-  | "cronTrigger"
-  | "eventTrigger"
-  | "manualTrigger"
-  | "triggerType" // Exclude protobuf triggerType to override with SDK type
 > & {
-  stepsList: Step[];
-  triggerOutput: OutputDataProps;
-  triggerType: TriggerType; // Use SDK TriggerType instead of protobuf enum
+  steps: Step[];
 };
 
 class Execution implements ExecutionProps {
@@ -37,10 +29,7 @@ class Execution implements ExecutionProps {
   endAt: number;
   success: boolean;
   error: string;
-  stepsList: Step[];
-  triggerName: string;
-  triggerType: TriggerType; // Now using SDK TriggerType enum
-  triggerOutput: OutputDataProps;
+  steps: Step[];
 
   constructor(props: ExecutionProps) {
     this.id = props.id;
@@ -48,68 +37,17 @@ class Execution implements ExecutionProps {
     this.endAt = props.endAt;
     this.success = props.success;
     this.error = props.error;
-    this.stepsList = props.stepsList;
-    this.triggerName = props.triggerName;
-    this.triggerType = props.triggerType;
-    this.triggerOutput = props.triggerOutput;
+    this.steps = props.steps;
   }
 
   static fromResponse(execution: avs_pb.Execution): Execution {
-    const triggerOutputDataType = execution.getOutputDataCase();
-
-    let triggerOutputData: OutputDataProps | undefined;
-
-    switch (triggerOutputDataType) {
-      case avs_pb.Execution.OutputDataCase.BLOCK_TRIGGER:
-        const blockOutput = execution.getBlockTrigger()?.toObject();
-        // Filter to only return blockNumber for block triggers
-        triggerOutputData = blockOutput ? { blockNumber: blockOutput.blockNumber } : undefined;
-        break;
-      case avs_pb.Execution.OutputDataCase.FIXED_TIME_TRIGGER:
-        const fixedTimeOutput = execution.getFixedTimeTrigger()?.toObject();
-        // Updated to use timestamp and timestampIso instead of epoch
-        triggerOutputData = fixedTimeOutput ? { 
-          timestamp: fixedTimeOutput.timestamp, 
-          timestampIso: fixedTimeOutput.timestampIso 
-        } : undefined;
-        break;
-      case avs_pb.Execution.OutputDataCase.CRON_TRIGGER:
-        const cronOutput = execution.getCronTrigger()?.toObject();
-        // Updated to use timestamp and timestampIso instead of epoch (removed scheduleMatched as it doesn't exist)
-        triggerOutputData = cronOutput ? { 
-          timestamp: cronOutput.timestamp, 
-          timestampIso: cronOutput.timestampIso
-        } : undefined;
-        break;
-      case avs_pb.Execution.OutputDataCase.EVENT_TRIGGER:
-        const eventTrigger = execution.getEventTrigger();
-        if (eventTrigger) {
-          if (eventTrigger.hasEvmLog()) {
-            triggerOutputData = eventTrigger.getEvmLog()?.toObject();
-          } else if (eventTrigger.hasTransferLog()) {
-            triggerOutputData = eventTrigger.getTransferLog()?.toObject();
-          }
-        }
-        break;
-      case avs_pb.Execution.OutputDataCase.MANUAL_TRIGGER:
-        const manualOutput = execution.getManualTrigger()?.toObject();
-        triggerOutputData = manualOutput || undefined;
-        break;
-      case avs_pb.Execution.OutputDataCase.OUTPUT_DATA_NOT_SET:
-        triggerOutputData = undefined;
-        break;
-    }
-
     return new Execution({
       id: execution.getId(),
       startAt: execution.getStartAt(),
       endAt: execution.getEndAt(),
       success: execution.getSuccess(),
       error: execution.getError(),
-      triggerName: execution.getTriggerName(),
-      triggerType: TriggerTypeConverter.fromProtobuf(execution.getTriggerType()), // Convert protobuf enum to SDK enum
-      triggerOutput: triggerOutputData,
-      stepsList: execution
+      steps: execution
         .getStepsList()
         .map((step) => Step.fromResponse(step)),
     });
diff --git a/packages/sdk-js/src/models/step.ts b/packages/sdk-js/src/models/step.ts
index c39afeb..5b40541 100644
--- a/packages/sdk-js/src/models/step.ts
+++ b/packages/sdk-js/src/models/step.ts
@@ -1,5 +1,5 @@
 import * as avs_pb from "@/grpc_codegen/avs_pb";
-import { convertProtobufValueToJs } from "../utils";
+import { convertProtobufValueToJs, convertProtobufStepTypeToSdk } from "../utils";
 
 export type StepProps = Omit<
   avs_pb.Execution.Step.AsObject,
@@ -13,6 +13,11 @@ export type StepProps = Omit<
   | "branch"
   | "filter"
   | "loop"
+  | "blockTrigger"
+  | "fixedTimeTrigger"
+  | "cronTrigger"
+  | "eventTrigger"
+  | "manualTrigger"
 > & {
   output: any; // Changed to any to hold converted JS value
 };
@@ -21,24 +26,28 @@ export type StepProps = Omit<
 // export type OutputDataProps = ... (removed)
 
 class Step implements StepProps {
-  nodeId: string;
+  id: string;
+  type: string;
+  name: string;
   success: boolean;
-  log: string;
   error: string;
+  log: string;
+  inputsList: string[];
+  output: any;
   startAt: number;
   endAt: number;
-  inputsList: string[];
-  output: any; // Changed to any
 
   constructor(props: StepProps) {
-    this.nodeId = props.nodeId;
+    this.id = props.id;
+    this.type = props.type;
+    this.name = props.name;
     this.success = props.success;
-    this.log = props.log;
     this.error = props.error;
-    this.startAt = props.startAt;
-    this.endAt = props.endAt;
+    this.log = props.log;
     this.inputsList = props.inputsList;
     this.output = props.output;
+    this.startAt = props.startAt;
+    this.endAt = props.endAt;
   }
 
   static getOutput(step: avs_pb.Execution.Step): any {
@@ -48,24 +57,55 @@ class Step implements StepProps {
     switch (outputDataType) {
       case avs_pb.Execution.Step.OutputDataCase.OUTPUT_DATA_NOT_SET:
         return null;
+      
+      // Trigger outputs
+      case avs_pb.Execution.Step.OutputDataCase.BLOCK_TRIGGER:
+        const blockOutput = step.getBlockTrigger()?.toObject();
+        return blockOutput ? { blockNumber: blockOutput.blockNumber } : undefined;
+      case avs_pb.Execution.Step.OutputDataCase.FIXED_TIME_TRIGGER:
+        const fixedTimeOutput = step.getFixedTimeTrigger()?.toObject();
+        return fixedTimeOutput ? { 
+          timestamp: fixedTimeOutput.timestamp, 
+          timestampIso: fixedTimeOutput.timestampIso 
+        } : undefined;
+      case avs_pb.Execution.Step.OutputDataCase.CRON_TRIGGER:
+        const cronOutput = step.getCronTrigger()?.toObject();
+        return cronOutput ? { 
+          timestamp: cronOutput.timestamp, 
+          timestampIso: cronOutput.timestampIso
+        } : undefined;
+      case avs_pb.Execution.Step.OutputDataCase.EVENT_TRIGGER:
+        const eventTrigger = step.getEventTrigger();
+        if (eventTrigger) {
+          if (eventTrigger.hasEvmLog()) {
+            return eventTrigger.getEvmLog()?.toObject();
+          } else if (eventTrigger.hasTransferLog()) {
+            return eventTrigger.getTransferLog()?.toObject();
+          }
+        }
+        return undefined;
+      case avs_pb.Execution.Step.OutputDataCase.MANUAL_TRIGGER:
+        const manualOutput = step.getManualTrigger()?.toObject();
+        return manualOutput || undefined;
+      
+      // Node outputs
       case avs_pb.Execution.Step.OutputDataCase.ETH_TRANSFER:
-        return step.getEthTransfer()?.toObject(); // Specific structure, not google.protobuf.Value
+        return step.getEthTransfer()?.toObject();
       case avs_pb.Execution.Step.OutputDataCase.GRAPHQL:
         nodeOutputMessage = step.getGraphql();
         return nodeOutputMessage && nodeOutputMessage.hasData()
           ? nodeOutputMessage.getData()
           : undefined;
       case avs_pb.Execution.Step.OutputDataCase.CONTRACT_READ:
-        // ContractReadNode.Output has 'repeated google.protobuf.Value data'
         nodeOutputMessage = step.getContractRead();
         if (nodeOutputMessage) {
           return nodeOutputMessage
             .getDataList()
             .map((val) => convertProtobufValueToJs(val));
         }
-        return []; // Default to empty array if no data
+        return [];
       case avs_pb.Execution.Step.OutputDataCase.CONTRACT_WRITE:
-        return step.getContractWrite()?.toObject(); // Specific structure
+        return step.getContractWrite()?.toObject();
       case avs_pb.Execution.Step.OutputDataCase.CUSTOM_CODE:
         nodeOutputMessage = step.getCustomCode();
         return nodeOutputMessage && nodeOutputMessage.hasData()
@@ -77,14 +117,13 @@ class Step implements StepProps {
           ? nodeOutputMessage.getData()
           : undefined;
       case avs_pb.Execution.Step.OutputDataCase.BRANCH:
-        return step.getBranch()?.toObject(); // Specific structure
+        return step.getBranch()?.toObject();
       case avs_pb.Execution.Step.OutputDataCase.FILTER:
         nodeOutputMessage = step.getFilter();
         return nodeOutputMessage && nodeOutputMessage.hasData()
           ? nodeOutputMessage.getData()
           : undefined;
       case avs_pb.Execution.Step.OutputDataCase.LOOP:
-        // LoopNode.Output has 'string data' - handle as plain string for now
         return step.getLoop()?.getData();
       default:
         console.warn(
@@ -96,14 +135,16 @@ class Step implements StepProps {
 
   static fromResponse(step: avs_pb.Execution.Step): Step {
     return new Step({
-      nodeId: step.getNodeId(),
+      id: step.getId(),
+      type: convertProtobufStepTypeToSdk(step.getType()),
+      name: step.getName(),
       success: step.getSuccess(),
-      log: step.getLog(),
       error: step.getError(),
-      startAt: step.getStartAt(),
-      endAt: step.getEndAt(),
+      log: step.getLog(),
       inputsList: step.getInputsList(),
       output: Step.getOutput(step),
+      startAt: step.getStartAt(),
+      endAt: step.getEndAt(),
     });
   }
 
diff --git a/packages/sdk-js/src/utils.ts b/packages/sdk-js/src/utils.ts
index 88c392a..8c0425c 100644
--- a/packages/sdk-js/src/utils.ts
+++ b/packages/sdk-js/src/utils.ts
@@ -3,6 +3,7 @@ import {
   Struct as ProtobufStruct,
   ListValue as ProtobufListValue 
 } from "google-protobuf/google/protobuf/struct_pb";
+import { TriggerType, NodeType } from "@avaprotocol/types";
 
 /**
  * Convert a protobuf Value to a JavaScript value
@@ -153,3 +154,82 @@ export function convertJSValueToProtobuf(value: any): ProtobufValue {
 
   return protobufValue;
 }
+
+/**
+ * Convert protobuf trigger type string to SDK trigger type string
+ * 
+ * @param protobufType - The protobuf trigger type string (e.g., "TRIGGER_TYPE_MANUAL")
+ * @returns The SDK trigger type string (e.g., "manualTrigger")
+ */
+export function convertProtobufTriggerTypeToSdk(protobufType: string): string {
+  switch (protobufType) {
+    case 'TRIGGER_TYPE_MANUAL':
+      return TriggerType.Manual; // "manualTrigger"
+    case 'TRIGGER_TYPE_FIXED_TIME':
+      return TriggerType.FixedTime; // "fixedTimeTrigger"
+    case 'TRIGGER_TYPE_CRON':
+      return TriggerType.Cron; // "cronTrigger"
+    case 'TRIGGER_TYPE_BLOCK':
+      return TriggerType.Block; // "blockTrigger"
+    case 'TRIGGER_TYPE_EVENT':
+      return TriggerType.Event; // "eventTrigger"
+    case 'TRIGGER_TYPE_UNSPECIFIED':
+      return TriggerType.Unspecified; // "unspecified"
+    default:
+      console.warn(`Unknown trigger type: ${protobufType}, using raw value`);
+      return protobufType; // fallback to raw value
+  }
+}
+
+/**
+ * Convert protobuf node type string to SDK node type string
+ * 
+ * @param protobufType - The protobuf node type string (e.g., "NODE_TYPE_CUSTOM_CODE")
+ * @returns The SDK node type string (e.g., "customCode")
+ */
+export function convertProtobufNodeTypeToSdk(protobufType: string): string {
+  switch (protobufType) {
+    case 'NODE_TYPE_ETH_TRANSFER':
+      return NodeType.ETHTransfer; // "ethTransfer"
+    case 'NODE_TYPE_CONTRACT_WRITE':
+      return NodeType.ContractWrite; // "contractWrite"
+    case 'NODE_TYPE_CONTRACT_READ':
+      return NodeType.ContractRead; // "contractRead"
+    case 'NODE_TYPE_GRAPHQL_QUERY':
+      return NodeType.GraphQLQuery; // "graphql"
+    case 'NODE_TYPE_REST_API':
+      return NodeType.RestAPI; // "restApi"
+    case 'NODE_TYPE_CUSTOM_CODE':
+      return NodeType.CustomCode; // "customCode"
+    case 'NODE_TYPE_BRANCH':
+      return NodeType.Branch; // "branch"
+    case 'NODE_TYPE_FILTER':
+      return NodeType.Filter; // "filter"
+    case 'NODE_TYPE_LOOP':
+      return NodeType.Loop; // "loop"
+    case 'NODE_TYPE_UNSPECIFIED':
+      return NodeType.Unspecified; // "unspecified"
+    default:
+      console.warn(`Unknown node type: ${protobufType}, using raw value`);
+      return protobufType; // fallback to raw value
+  }
+}
+
+/**
+ * Convert protobuf step type string to SDK step type string
+ * 
+ * Automatically detects whether the type is a trigger or node type and converts accordingly.
+ * 
+ * @param protobufType - The protobuf type string (e.g., "TRIGGER_TYPE_MANUAL" or "NODE_TYPE_CUSTOM_CODE")
+ * @returns The SDK type string (e.g., "manualTrigger" or "customCode")
+ */
+export function convertProtobufStepTypeToSdk(protobufType: string): string {
+  if (protobufType.startsWith('TRIGGER_TYPE_')) {
+    return convertProtobufTriggerTypeToSdk(protobufType);
+  } else if (protobufType.startsWith('NODE_TYPE_')) {
+    return convertProtobufNodeTypeToSdk(protobufType);
+  } else {
+    console.warn(`Unknown step type: ${protobufType}, using raw value`);
+    return protobufType; // fallback to raw value
+  }
+}
diff --git a/packages/types/CHANGELOG.md b/packages/types/CHANGELOG.md
index 27dea43..1610cd3 100644
--- a/packages/types/CHANGELOG.md
+++ b/packages/types/CHANGELOG.md
@@ -1,5 +1,11 @@
 # @avaprotocol/types
 
+## 1.1.0
+
+### Minor Changes
+
+- a7578b6: Added SimulateWorkflow function and updated protobuf
+
 ## 1.0.8
 
 ### Patch Changes
diff --git a/packages/types/package.json b/packages/types/package.json
index 371922f..e1c3ba7 100644
--- a/packages/types/package.json
+++ b/packages/types/package.json
@@ -1,6 +1,6 @@
 {
   "name": "@avaprotocol/types",
-  "version": "1.0.8",
+  "version": "1.1.0",
   "description": "Type definitions for Ava Protocol's AVS",
   "main": "dist/index.js",
   "types": "dist/index.d.ts",
diff --git a/packages/types/src/index.ts b/packages/types/src/index.ts
index bb8cfa7..24935b7 100644
--- a/packages/types/src/index.ts
+++ b/packages/types/src/index.ts
@@ -390,6 +390,15 @@ export interface RunTriggerResponse {
   triggerId?: string;
 }
 
+export interface SimulateTaskRequest {
+  trigger: Record<string, any>;
+  nodes: Array<Record<string, any>>;
+  edges: Array<Record<string, any>>;
+  triggerType: string;
+  triggerConfig?: Record<string, any>;
+  inputVariables?: Record<string, any>;
+}
+
 // Re-export protobuf enums for direct use
 export { NodeType as ProtobufNodeType, TriggerType as ProtobufTriggerType } from "@/grpc_codegen/avs_pb";
 
diff --git a/tests/customCode.test.ts b/tests/customCode.test.ts
index e32150b..22b0412 100644
--- a/tests/customCode.test.ts
+++ b/tests/customCode.test.ts
@@ -94,8 +94,8 @@ describe("CustomCode Module Imports Tests", () => {
       expect(executions.items.length).toBe(1);
 
       const matchStep: Step | undefined = _.find(
-        _.first(executions.items)?.stepsList,
-        (step) => step.nodeId === customCodeNodeProps.id
+        _.first(executions.items)?.steps,
+        (step) => step.id === customCodeNodeProps.id
       );
 
       if (_.isUndefined(matchStep)) {
@@ -157,8 +157,8 @@ describe("CustomCode Module Imports Tests", () => {
       expect(executions.items.length).toBe(1);
 
       const matchStep: Step | undefined = _.find(
-        _.first(executions.items)?.stepsList,
-        (step) => step.nodeId === customCodeNodeProps.id
+        _.first(executions.items)?.steps,
+        (step) => step.id === customCodeNodeProps.id
       );
 
       if (_.isUndefined(matchStep)) {
@@ -220,8 +220,8 @@ describe("CustomCode Module Imports Tests", () => {
       expect(executions.items.length).toBe(1);
 
       const matchStep: Step | undefined = _.find(
-        _.first(executions.items)?.stepsList,
-        (step) => step.nodeId === customCodeNodeProps.id
+        _.first(executions.items)?.steps,
+        (step) => step.id === customCodeNodeProps.id
       );
 
       if (_.isUndefined(matchStep)) {
@@ -297,8 +297,8 @@ describe("CustomCode Module Imports Tests", () => {
       expect(executions.items.length).toBe(1);
 
       const matchStep: Step | undefined = _.find(
-        _.first(executions.items)?.stepsList,
-        (step) => step.nodeId === customCodeNodeProps.id
+        _.first(executions.items)?.steps,
+        (step) => step.id === customCodeNodeProps.id
       );
 
       if (_.isUndefined(matchStep)) {
diff --git a/tests/getExecution.test.ts b/tests/getExecution.test.ts
index aa46087..90592a1 100644
--- a/tests/getExecution.test.ts
+++ b/tests/getExecution.test.ts
@@ -1,6 +1,6 @@
 import { describe, beforeAll, test, expect } from "@jest/globals";
 import { Client, TriggerFactory } from "@avaprotocol/sdk-js";
-import { TriggerType, ExecutionStatus } from "@avaprotocol/types";
+import { TriggerType, ExecutionStatus, NodeType } from "@avaprotocol/types";
 import _ from "lodash";
 import {
   getAddress,
@@ -73,11 +73,22 @@ describe("getExecution Tests", () => {
       expect(execution).toBeDefined();
       expect(execution.id).toEqual(triggerResult.executionId);
       expect(execution.success).toBe(true);
-      expect(execution.triggerType).toEqual(TriggerType.Block);
-      expect(execution.triggerOutput).toEqual({
-        blockNumber: blockNumber + 5,
-      });
-      expect(Array.isArray(execution.stepsList)).toBe(true);
+      
+      // The execution contains only node steps, not trigger steps
+      // Trigger data is available as inputs to the nodes (e.g., "blockTrigger.data")
+      expect(execution.steps).toBeDefined();
+      expect(execution.steps.length).toBeGreaterThan(0);
+      
+      // The first step is the ETH transfer node
+      const ethTransferStep = execution.steps[0];
+      expect(ethTransferStep.type).toEqual(NodeType.ETHTransfer);
+      expect(ethTransferStep.name).toEqual("send eth");
+      expect(ethTransferStep.success).toBe(true);
+      
+      // Verify the trigger data is available in the inputs
+      expect(ethTransferStep.inputsList).toContain("blockTrigger.data");
+      
+      expect(Array.isArray(execution.steps)).toBe(true);
     } finally {
       if (workflowId) {
         await client.deleteWorkflow(workflowId);
@@ -151,11 +162,20 @@ describe("getExecution Tests", () => {
 
       const execution = await client.getExecution(workflowId, result.executionId);
       expect(execution.id).toEqual(result.executionId);
-      expect(execution.triggerType).toEqual(TriggerType.Cron);
-      expect(execution.triggerOutput).toEqual({
-        timestamp: (epoch + 60) * 1000,
-        timestampIso: new Date((epoch + 60) * 1000).toISOString(),
-      });
+      
+      // The execution contains only node steps, not trigger steps
+      // Trigger data is available as inputs to the nodes (e.g., "cronTrigger.data")
+      expect(execution.steps).toBeDefined();
+      expect(execution.steps.length).toBeGreaterThan(0);
+      
+      // The first step is the ETH transfer node
+      const ethTransferStep = execution.steps[0];
+      expect(ethTransferStep.type).toEqual(NodeType.ETHTransfer);
+      expect(ethTransferStep.name).toEqual("send eth");
+      expect(ethTransferStep.success).toBe(true);
+      
+      // Verify the trigger data is available in the inputs
+      expect(ethTransferStep.inputsList).toContain("cronTrigger.data");
 
       const executionStatus = await client.getExecutionStatus(workflowId, result.executionId);
       expect(executionStatus).toEqual(ExecutionStatus.EXECUTION_STATUS_COMPLETED);
@@ -209,10 +229,20 @@ describe("getExecution Tests", () => {
       expect(execution).toBeDefined();
       expect(execution.id).toEqual(executionIdFromList);
       expect(execution.success).toBe(true);
-      expect(execution.triggerType).toEqual(TriggerType.Block);
-      expect(execution.triggerOutput).toEqual({
-        blockNumber: blockNumber + 5,
-      });
+      
+      // The execution contains only node steps, not trigger steps
+      // Trigger data is available as inputs to the nodes (e.g., "blockTrigger.data")
+      expect(execution.steps).toBeDefined();
+      expect(execution.steps.length).toBeGreaterThan(0);
+      
+      // The first step is the ETH transfer node
+      const ethTransferStep = execution.steps[0];
+      expect(ethTransferStep.type).toEqual(NodeType.ETHTransfer);
+      expect(ethTransferStep.name).toEqual("send eth");
+      expect(ethTransferStep.success).toBe(true);
+      
+      // Verify the trigger data is available in the inputs
+      expect(ethTransferStep.inputsList).toContain("blockTriggerForGetExecutionsTest.data");
 
       const executionStatus = await client.getExecutionStatus(workflowId, execution.id);
       expect(executionStatus).toEqual(ExecutionStatus.EXECUTION_STATUS_COMPLETED);
diff --git a/tests/secret.test.ts b/tests/secret.test.ts
index f27d0e7..137340d 100644
--- a/tests/secret.test.ts
+++ b/tests/secret.test.ts
@@ -155,8 +155,8 @@ describe("secret Tests", () => {
       expect(executions.items.length).toBe(1);
 
       const matchStep: Step | undefined = _.find(
-        _.first(executions.items)?.stepsList,
-        (step) => step.nodeId === customCodeNodeProps.id
+        _.first(executions.items)?.steps,
+        (step) => step.id === customCodeNodeProps.id
       );
 
       if (_.isUndefined(matchStep)) {
diff --git a/tests/simulateTask.test.ts b/tests/simulateTask.test.ts
new file mode 100644
index 0000000..8569a0e
--- /dev/null
+++ b/tests/simulateTask.test.ts
@@ -0,0 +1,370 @@
+import { describe, beforeAll, test, expect } from "@jest/globals";
+import { Client } from "@avaprotocol/sdk-js";
+import { TriggerType, NodeType } from "@avaprotocol/types";
+import { CustomCodeLangs } from "@avaprotocol/sdk-js";
+import {
+  getAddress,
+  generateSignature,
+  TIMEOUT_DURATION,
+  SaltGlobal,
+  getNextId,
+} from "./utils";
+import { getConfig } from "./envalid";
+import util from "util";
+
+jest.setTimeout(TIMEOUT_DURATION);
+
+const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();
+
+describe("SimulateTask", () => {
+  let eoaAddress: string;
+  let client: Client;
+
+  beforeAll(async () => {
+    eoaAddress = await getAddress(walletPrivateKey);
+    client = new Client({
+      endpoint: avsEndpoint,
+      factoryAddress,
+    });
+
+    const { message } = await client.getSignatureFormat(eoaAddress);
+    const signature = await generateSignature(message, walletPrivateKey);
+    const res = await client.authWithSignature({
+      message: message,
+      signature: signature,
+    });
+
+    client.setAuthKey(res.authKey);
+  });
+
+  describe("Manual Trigger with Custom Code", () => {
+    test("should simulate a manual trigger with custom code successfully", async () => {
+      const triggerId = getNextId();
+      const nodeId = getNextId();
+
+      const trigger = {
+        id: triggerId,
+        name: "manual trigger",
+        type: TriggerType.Manual,
+        data: {},
+      };
+
+      const nodes = [
+        {
+          id: nodeId,
+          name: "custom code",
+          type: NodeType.CustomCode,
+          data: {
+            lang: CustomCodeLangs.JAVASCRIPT,
+            source:
+              "return { message: 'Task executed successfully', timestamp: Date.now() };",
+          },
+        },
+      ];
+
+      const edges = [
+        {
+          id: getNextId(),
+          source: triggerId,
+          target: nodeId,
+        },
+      ];
+
+      const result = await client.simulateTask({
+        trigger,
+        nodes,
+        edges,
+        triggerType: TriggerType.Manual,
+        triggerConfig: {},
+        inputVariables: {},
+      });
+
+      console.log("result", util.inspect(result, { depth: null }));
+
+      expect(result).toBeDefined();
+      expect(result.success).toBe(true);
+      expect(result.steps).toHaveLength(2); // trigger + node
+
+      // Verify unified step structure
+      const triggerStep = result.steps[0];
+      expect(triggerStep.id).toBe(triggerId);
+      expect(triggerStep.type).toBe(TriggerType.Manual);
+      expect(triggerStep.name).toBe("manual trigger");
+
+      const nodeStep = result.steps[1];
+      expect(nodeStep.id).toBe(nodeId);
+      expect(nodeStep.type).toBe(NodeType.CustomCode);
+      expect(nodeStep.name).toBe("custom code");
+    });
+
+    test("should handle simulation with input variables", async () => {
+      const triggerId = getNextId();
+      const nodeId = getNextId();
+
+      const trigger = {
+        id: triggerId,
+        name: "manual trigger",
+        type: TriggerType.Manual,
+        data: {},
+      };
+
+      const nodes = [
+        {
+          id: nodeId,
+          name: "custom code",
+          type: NodeType.CustomCode,
+          data: {
+            lang: CustomCodeLangs.JAVASCRIPT,
+            source: "return { greeting: 'Hello World!', calculated: 42 * 2 };",
+          },
+        },
+      ];
+
+      const edges = [
+        {
+          id: getNextId(),
+          source: triggerId,
+          target: nodeId,
+        },
+      ];
+
+      const result = await client.simulateTask({
+        trigger,
+        nodes,
+        edges,
+        triggerType: TriggerType.Manual,
+        triggerConfig: {},
+        inputVariables: {
+          name: "World",
+          value: 42,
+        },
+      });
+
+      expect(result).toBeDefined();
+      expect(result.success).toBe(true);
+      expect(result.steps).toHaveLength(2); // trigger + node
+
+      // Verify step structure with input variables
+      const triggerStep = result.steps[0];
+      expect(triggerStep.id).toBe(triggerId);
+      expect(triggerStep.type).toBe(TriggerType.Manual);
+
+      const nodeStep = result.steps[1];
+      expect(nodeStep.id).toBe(nodeId);
+      expect(nodeStep.type).toBe(NodeType.CustomCode);
+      expect(nodeStep.success).toBe(true);
+    });
+  });
+
+  describe("Fixed Time Trigger with REST API", () => {
+    test("should simulate a fixed time trigger with REST API call", async () => {
+      const timestamp = Math.floor(Date.now() / 1000) + 60; // 1 minute from now
+      const triggerId = getNextId();
+      const nodeId = getNextId();
+
+      const trigger = {
+        id: triggerId,
+        name: "fixed time trigger",
+        type: TriggerType.FixedTime,
+        data: {
+          config: {
+            timestamp: timestamp,
+          },
+        },
+      };
+
+      const nodes = [
+        {
+          id: nodeId,
+          name: "rest api call",
+          type: NodeType.RestAPI,
+          data: {
+            url: "https://jsonplaceholder.typicode.com/posts/1",
+            method: "GET",
+            headers: {},
+          },
+        },
+      ];
+
+      const edges = [
+        {
+          id: getNextId(),
+          source: triggerId,
+          target: nodeId,
+        },
+      ];
+
+      const result = await client.simulateTask({
+        trigger,
+        nodes,
+        edges,
+        triggerType: TriggerType.FixedTime,
+        triggerConfig: {
+          timestamp: timestamp,
+        },
+        inputVariables: {},
+      });
+
+      expect(result).toBeDefined();
+      expect(result.success).toBe(true);
+      expect(result.steps).toHaveLength(2); // trigger + node
+
+      // Verify unified step structure
+      const triggerStep = result.steps[0];
+      expect(triggerStep.id).toBe(triggerId);
+      expect(triggerStep.type).toBe(TriggerType.FixedTime);
+      expect(triggerStep.name).toBe("fixed time trigger");
+
+      const nodeStep = result.steps[1];
+      expect(nodeStep.id).toBe(nodeId);
+      expect(nodeStep.type).toBe(NodeType.RestAPI);
+      expect(nodeStep.name).toBe("rest api call");
+    });
+  });
+
+  describe("Multi-node Workflow", () => {
+    test("should simulate a workflow with multiple connected nodes", async () => {
+      const triggerId = getNextId();
+      const node1Id = getNextId();
+      const node2Id = getNextId();
+
+      const trigger = {
+        id: triggerId,
+        name: "manual trigger",
+        type: TriggerType.Manual,
+        data: {},
+      };
+
+      const nodes = [
+        {
+          id: node1Id,
+          name: "custom code 1",
+          type: NodeType.CustomCode,
+          data: {
+            lang: CustomCodeLangs.JAVASCRIPT,
+            source: "return { step1: 'completed', data: 'from step 1' };",
+          },
+        },
+        {
+          id: node2Id,
+          name: "custom code 2",
+          type: NodeType.CustomCode,
+          data: {
+            lang: CustomCodeLangs.JAVASCRIPT,
+            source:
+              "return { step2: 'completed', previousData: trigger.data };",
+          },
+        },
+      ];
+
+      const edges = [
+        {
+          id: getNextId(),
+          source: triggerId,
+          target: node1Id,
+        },
+        {
+          id: getNextId(),
+          source: node1Id,
+          target: node2Id,
+        },
+      ];
+
+      const result = await client.simulateTask({
+        trigger,
+        nodes,
+        edges,
+        triggerType: TriggerType.Manual,
+        triggerConfig: {},
+        inputVariables: {},
+      });
+
+      expect(result).toBeDefined();
+      expect(result.success).toBe(true);
+      expect(result.steps).toHaveLength(3); // trigger + 2 nodes
+
+      // Verify all steps have unified structure
+      const triggerStep = result.steps[0];
+      expect(triggerStep.id).toBe(triggerId);
+      expect(triggerStep.type).toBe(TriggerType.Manual);
+      expect(triggerStep.name).toBe("manual trigger");
+
+      const node1Step = result.steps[1];
+      expect(node1Step.id).toBe(node1Id);
+      expect(node1Step.type).toBe(NodeType.CustomCode);
+      expect(node1Step.name).toBe("custom code 1");
+      expect(node1Step.success).toBe(true);
+
+      const node2Step = result.steps[2];
+      expect(node2Step.id).toBe(node2Id);
+      expect(node2Step.type).toBe(NodeType.CustomCode);
+      expect(node2Step.name).toBe("custom code 2");
+      expect(node2Step.success).toBe(true);
+    });
+  });
+
+  describe("Error Handling", () => {
+    test("should handle simulation errors gracefully", async () => {
+      const triggerId = getNextId();
+      const nodeId = getNextId();
+
+      const trigger = {
+        id: triggerId,
+        name: "manual trigger",
+        type: TriggerType.Manual,
+        data: {},
+      };
+
+      const nodes = [
+        {
+          id: nodeId,
+          name: "custom code",
+          type: NodeType.CustomCode,
+          data: {
+            lang: CustomCodeLangs.JAVASCRIPT,
+            source: "throw new Error('Intentional error for testing');",
+          },
+        },
+      ];
+
+      const edges = [
+        {
+          id: getNextId(),
+          source: triggerId,
+          target: nodeId,
+        },
+      ];
+
+      try {
+        const result = await client.simulateTask({
+          trigger,
+          nodes,
+          edges,
+          triggerType: TriggerType.Manual,
+          triggerConfig: {},
+          inputVariables: {},
+        });
+
+        // If we get here, the simulation succeeded despite the error
+        expect(result).toBeDefined();
+        expect(result.success).toBe(false);
+        expect(result.error).toBeDefined();
+
+        // Even failed simulations should have unified step structure
+        expect(result.steps).toHaveLength(2); // trigger + node
+        const triggerStep = result.steps[0];
+        expect(triggerStep.id).toBe(triggerId);
+        expect(triggerStep.type).toBe(TriggerType.Manual);
+
+        const nodeStep = result.steps[1];
+        expect(nodeStep.id).toBe(nodeId);
+        expect(nodeStep.type).toBe(NodeType.CustomCode);
+        expect(nodeStep.success).toBe(false);
+      } catch (error: any) {
+        // The server treats JavaScript errors as simulation failures
+        expect(error).toBeDefined();
+        expect(error.message).toContain("Intentional error for testing");
+      }
+    });
+  });
+});
diff --git a/tests/triggerWorkflow.test.ts b/tests/triggerWorkflow.test.ts
index 456db17..ee99923 100644
--- a/tests/triggerWorkflow.test.ts
+++ b/tests/triggerWorkflow.test.ts
@@ -89,13 +89,6 @@ describe("triggerWorkflow Tests", () => {
       expect(Array.isArray(executions2.items)).toBe(true);
       expect(executions2.items.length).toEqual(1);
       expect(executions2.items[0].success).toEqual(true);
-      expect(executions2.items[0].triggerType).toEqual(
-        TriggerType.Block
-      );
-      expect(executions2.items[0].triggerOutput).toEqual({
-        blockNumber: blockNumber + interval,
-      });
-
       const workflow = await client.getWorkflow(workflowId);
 
       expect(workflow.status).toEqual(WorkflowStatus.Completed);
@@ -147,11 +140,6 @@ describe("triggerWorkflow Tests", () => {
     expect(executions2.items[0].id).toEqual(result.executionId);
     expect(Array.isArray(executions2.items)).toBe(true);
     expect(executions2.items.length).toEqual(1);
-    expect(executions2.items[0].triggerType).toEqual(TriggerType.Cron);
-    expect(executions2.items[0].triggerOutput).toEqual({
-      timestamp: (epoch + 60) * 1000,
-      timestampIso: new Date((epoch + 60) * 1000).toISOString(),
-    });
 
     const workflow = await client.getWorkflow(workflowId);
     expect(workflow.executionCount).toEqual(1);
@@ -206,13 +194,6 @@ describe("triggerWorkflow Tests", () => {
     const workflow = await client.getWorkflow(workflowId);
     expect(workflow.status).toEqual(WorkflowStatus.Completed);
     expect(workflow.executionCount).toEqual(1);
-    expect(executions2.items[0].triggerOutput).toEqual({
-      timestamp: (epoch + 300) * 1000,
-      timestampIso: new Date((epoch + 300) * 1000).toISOString(),
-    });
-    expect(executions2.items[0].triggerType).toEqual(
-      TriggerType.FixedTime
-    );
 
     await client.deleteWorkflow(workflowId);
   });
@@ -267,8 +248,6 @@ describe("triggerWorkflow Tests", () => {
     const workflow = await client.getWorkflow(workflowId);
     expect(workflow.status).toEqual(WorkflowStatus.Completed);
     expect(workflow.executionCount).toEqual(1);
-    expect(executions2.items[0].triggerType).toEqual(TriggerType.Event);
-    expect(executions2.items[0].triggerOutput).toBeDefined();
 
     await client.deleteWorkflow(workflowId);
   });
@@ -313,13 +292,10 @@ describe("triggerWorkflow Tests", () => {
     // The list should now contain one execution, the id from manual trigger should matched
     const execution = await client.getExecution(workflowId, result.executionId);
     expect(execution.id).toEqual(result.executionId);
-    expect(execution.triggerType).toEqual(TriggerType.Cron);
-    expect(execution.triggerOutput).toEqual({
-      timestamp: (epoch + 60) * 1000,
-      timestampIso: new Date((epoch + 60) * 1000).toISOString(),
-    });
-
-    const executionStatus = await client.getExecutionStatus(workflowId, result.executionId);
+    const executionStatus = await client.getExecutionStatus(
+      workflowId,
+      result.executionId
+    );
     expect(executionStatus).toEqual(ExecutionStatus.EXECUTION_STATUS_COMPLETED);
 
     await client.deleteWorkflow(workflowId);
diff --git a/tests/utils.ts b/tests/utils.ts
index 3d3d406..011becd 100644
--- a/tests/utils.ts
+++ b/tests/utils.ts
@@ -246,7 +246,7 @@ export const verifyExecutionStepResults = (
 ): void => {
   // Verify basic properties
   expect(actual).toBeDefined();
-  expect(actual.nodeId).toBe(expected.nodeId);
+  expect(actual.id).toBe(expected.id);
   expect(actual.success).toBe(expected.success);
   expect(actual.log).toBe(expected.log);
   expect(actual.error).toBe(expected.error);
