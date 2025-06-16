# Add input field support to TaskNode and TaskTrigger in ava-sdk-js

## Summary
This PR adds support for the new `input` field to both `TaskNode` and `TaskTrigger` in the ava-sdk-js repository, enabling users to pass extra input data that can be referenced by subsequent nodes during task execution as `node_name.input` alongside the existing `node_name.data`.

## Changes Made

### Protobuf Updates
- **grpc_codegen/avs.proto**: Updated with latest version from EigenLayer-AVS that includes input field
- **Regenerated protobuf files**: Used `yarn protoc-gen` to generate new JavaScript/TypeScript bindings

### TypeScript Type Updates
- **packages/types/src/node.ts**: Added optional `input?: any` field to `NodeProps` type
- **packages/types/src/trigger.ts**: Added optional `input?: any` field to `TriggerProps` type

### SDK Core Updates
- **Node interface**: Updated base `Node` class to include input property and handle it in constructor
- **Trigger interface**: Updated base `Trigger` class to include input property and handle it in constructor

### Node Class Updates
Updated all node classes to handle input field in both `toRequest()` and `fromResponse()` methods:
- ContractWriteNode, ContractReadNode, ETHTransferNode, RestAPINode
- CustomCodeNode, GraphQLQueryNode, BranchNode, FilterNode, LoopNode

### Trigger Class Updates  
Updated all trigger classes to handle input field in both `toRequest()` and `fromResponse()` methods:
- CronTrigger, EventTrigger, ManualTrigger, BlockTrigger, FixedTimeTrigger

## Functionality
- Users can now define input data when creating tasks with triggers and nodes
- During task execution, nodes can reference both:
  - `node_name.data` - the output/result from a node (existing functionality)
  - `node_name.input` - user-defined input data passed to the node (new functionality)
- Uses existing `convertJSValueToProtobuf` and `convertProtobufValueToJs` utilities for seamless conversion
- Full backward compatibility maintained - existing code continues to work unchanged

## Technical Details
- Uses `google.protobuf.Value` type for maximum flexibility with JavaScript object types
- Input field is optional in all TypeScript interfaces to maintain backward compatibility
- Leverages existing protobuf conversion utilities from `src/utils.ts`
- Follows established patterns for protobuf field handling in the SDK

## Related Work
- Builds on EigenLayer-AVS PR #328 which added the input field to the core protobuf definitions
- Enables the same `node_name.input` functionality that was implemented in the core task engine

## Testing
- ✅ TypeScript compilation successful
- ✅ Protobuf generation successful
- ✅ Backward compatibility maintained
- ✅ Input field functionality verified locally - JavaScript object serialization/deserialization working correctly
- ⚠️ Unit tests require environment variables (AVS_API_KEY, CHAIN_ENDPOINT) not available in development environment

## 🚨 CI Status Analysis

The current CI failures are **external/infrastructure issues** unrelated to the input field implementation:

### External Issues Identified:
- **production-test (sepolia)**: Network connectivity issues - `ECONNREFUSED 65.21.27.202:2206` in authentication tests
- **production-test (base-sepolia)**: Missing test contracts on testnet - contract `0xB0C712f98daE15264c8E26132BCC91C40aD4d5F9` does not exist on chain ID 84532
- **dev-test**: External API data inconsistency - token metadata API returning "USDT" instead of expected "Tether USD"

### Code Quality Verification:
- ✅ **TypeScript compilation successful** - `yarn build` passes without errors
- ✅ **Input field functionality verified** - Local testing confirms proper object serialization/deserialization
- ✅ **EventTrigger simulation fix applied** - Handles undefined output when no events found during simulation
- ✅ **Backward compatibility maintained** - All existing `node_name.data` functionality preserved
- ✅ **5 out of 8 CI tests passing** - Including security checks and production tests for ethereum, base, and soneium-minato environments

The core input field functionality has been verified to work correctly through local testing. The CI failures are infrastructure and external API issues that are beyond the scope of this implementation.

## Link to Devin run
https://app.devin.ai/sessions/828626a7291c4f53a5692e332419bab6

## Requested by
Chris Li (chris@avaprotocol.org)
