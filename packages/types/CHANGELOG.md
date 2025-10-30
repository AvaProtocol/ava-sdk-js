# @avaprotocol/types

## 2.8.3

### Patch Changes

- e1fb04e: chore: define LoopRunnerType type in the types package

## 2.8.2

### Patch Changes

- 9167174: fix: updated runNodeImmediate and runTrigger request inputs to be consistent with simulateWorkflow"

## 2.8.1

### Patch Changes

- b85409c: fix: add options field support to RestAPINode

## 2.8.0

### Minor Changes

- 2e75ba5: feat: update event trigger interface with topics string array, null values, and response field name change

## 2.7.3

### Patch Changes

- 6d542b4: Moved isSimulated from the runNodeWithInputs top-level to inside ContractWrite nodeConfig

## 2.7.2

### Patch Changes

- 80aba7a: Added isSimulated parameter to runNodeWithInputs

## 2.7.1

### Patch Changes

- 4aeb505: Added token_addresses to BalanceNode

## 2.7.0

### Minor Changes

- bc5b6f6: Added BalanceNode and lang to ManualTrigger

## 2.6.1

### Patch Changes

- 7eb5023: Replace inputVariables workflowContext with settings, and fix dev test github actions

## 2.6.0

### Minor Changes

- c74b912: Added fee estimation interface and gas cost to execution.step

## 2.5.4

### Patch Changes

- b13427a: Added new fields to the Execution and Execution.Step protobuf messages for gas usage: gas_used, gas_price, and total_gas_cost; Introduced a new input_variables map field to the Task and CreateTaskReq protobuf messages, and updated the generated JavaScript code to handle serialization, deserialization, and access to these variables.

## 2.5.3

### Patch Changes

- f0d9b2c: Added status code and fixed test failures

## 2.5.2

### Patch Changes

- fa74495: Added ExecuteStatus and index to Execution.Step

## 2.5.1

### Patch Changes

- aacd631: feat: add execution index field and partial success status support

## 2.5.0

### Minor Changes

- 94225ec: Added withdraw request to transfer from bundler

## 2.4.11

### Patch Changes

- 98dfca0: Added executionContext to runNode response

## 2.4.10

### Patch Changes

- 56d89ae: Updated ContractWrite protobuf conversion

## 2.4.9

### Patch Changes

- 83af57c: Updated MethodCallType type definitions

## 2.4.8

### Patch Changes

- 8a767da: Remove input from both TriggerProps and NodeProps

## 2.4.7

### Patch Changes

- 1f8948b: Add specific type of contract event ABI

## 2.4.6

### Patch Changes

- d8706f3: Created ContractABI type

## 2.4.5

### Patch Changes

- df22279: Update triggerWorkflow response to return the result when isBlocking:true

## 2.4.4

### Patch Changes

- 031f401: Update triggerWorkflow for manual trigger and fix template tests

## 2.4.3

### Patch Changes

- fd04f63: Updated the type definitions of contractRead and contractWrite

## 2.4.2

### Patch Changes

- 1cc32a4: Updated applyToField format and return for ContractRead

## 2.4.1

### Patch Changes

- 764a47e: Added methodParams to LoopNode ContractRead runner

## 2.4.0

### Minor Changes

- bf23716: Standardize protobuf interface to use node.config and output.data

## 2.3.1

### Patch Changes

- 6a3d621: Standardize input format of Manual Trigger headers

## 2.3.0

### Minor Changes

- 1c491ad: Added Manual Trigger; update LoopNode and other nodes

## 2.2.17

### Patch Changes

- fa81072: Renovated LoopNode Input parameters

## 2.2.16

### Patch Changes

- 52b44d6: Update Secret and Cancel, Delete Workflow responses

## 2.2.15

### Patch Changes

- 6650be6: Update Cancel and Delete operation response

## 2.2.14

### Patch Changes

- 264c1c8: Renovated ContractRead and ContractWrite

## 2.2.13

### Patch Changes

- 0dfcf69: Added EventCondition, and unified contractAbi to string type

## 2.2.12

### Patch Changes

- 27551e0: Added EventCondition to EventTrigger

## 2.2.11

### Patch Changes

- 272c26e: Fixed types package include protobuf library issue

## 2.2.9

### Patch Changes

- 72339c5: Updated and tested loop functions; test empty data returned

## 2.2.8

### Patch Changes

- 36ac928: Replace the old value getScheduleList to getSchedulesList

## 2.2.7

### Patch Changes

- 31667f8: Fix CustomCodeLang to match enum value

## 2.2.6

### Patch Changes

- 75c7865: Update types to use correct enum value for CustomCode

## 2.2.5

### Patch Changes

- b5b1eff: Convert lang of CustomCode to use protobuf value

## 2.2.4

### Patch Changes

- 9c7c1e0: Updated CronTrigger’s scheduleList to schedules

## 2.2.3

### Patch Changes

- 38ade5e: Update CustomCodeLange

## 2.2.2

### Patch Changes

- 2baed44: pdate CustomCodeLang from Javascript to JavaScript to match server string

## 2.2.1

### Patch Changes

- 07c05b4: Changed CustomCodeLang value from 0 to Javascript

## 2.2.0

### Minor Changes

- c45a2fb: Complete field name standardization and remove backward compatibility

## 2.1.0

### Minor Changes

- 52a1d86: Added timeout option and strategy to the client

## 2.0.2

### Patch Changes

- 8e09a20: Fix the request type of SimulateWorkflow and RunTriggerReq

## 2.0.1

### Patch Changes

- 45212f0: Added GetTokenMetadata function to retrieve whitelist token information

## 2.0.0

### Major Changes

- cfbf435: Migrated type definitions for props into types package

## 1.1.1

### Patch Changes

- 18a2273: Fix types package exported grpc libary; rename simulateTask to simulateWorkflow

## 1.1.0

### Minor Changes

- a7578b6: Added SimulateWorkflow function and updated protobuf

## 1.0.8

### Patch Changes

- 0bd6c9f: Flatten out and removed TriggerReason in Execution

## 1.0.7

### Patch Changes

- ca68e9c: Updated output data to Value type for json and runTrigger logic

## 1.0.6

### Patch Changes

- 491ae98: Added runTrigger method and refactored enums

## 1.0.5

### Patch Changes

- bda8a74: Unified the node type conversion code and values by updating protobuf

## 1.0.4

### Patch Changes

- fa76ec5: Moved node DataType from sdk-js to types pacakge

## 1.0.3

### Patch Changes

- 6e9069f: Make type definitions more consistent

## 1.0.2

### Patch Changes

- b2db42f: Update getSecrets to use general pageInfo

## 1.0.1

### Patch Changes

- a38f8df: Consolidated pagination response and match protobuf of AVS v1.8.2

## 1.0.0

### Major Changes

- cdecf79: Get sign message from server; added wallet isHidden

## 0.9.4

### Patch Changes

- Migrated getKeyRequestMessage to types; Added secret functions

## 0.9.3

### Patch Changes

- Updated Task.memo to Task.name and fixed a build warning in types package

## 0.9.2

### Patch Changes

- Updated with the latest AVS data

## 0.9.1

### Patch Changes

- Initialize types package
