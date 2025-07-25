# @avaprotocol/sdk-js

## 2.6.2

### Patch Changes

- 1cc32a4: Updated applyToField format and return for ContractRead
- Updated dependencies [1cc32a4]
  - @avaprotocol/types@2.4.2

## 2.6.1

### Patch Changes

- 764a47e: Added methodParams to LoopNode ContractRead runner
- Updated dependencies [764a47e]
  - @avaprotocol/types@2.4.1

## 2.6.0

### Minor Changes

- bf23716: Standardize protobuf interface to use node.config and output.data

### Patch Changes

- Updated dependencies [bf23716]
  - @avaprotocol/types@2.4.0

## 2.5.1

### Patch Changes

- 6a3d621: Standardize input format of Manual Trigger headers
- Updated dependencies [6a3d621]
  - @avaprotocol/types@2.3.1

## 2.5.0

### Minor Changes

- 1c491ad: Added Manual Trigger; update LoopNode and other nodes

### Patch Changes

- Updated dependencies [1c491ad]
  - @avaprotocol/types@2.3.0

## 2.4.4

### Patch Changes

- fa81072: Renovated LoopNode Input parameters
- Updated dependencies [fa81072]
  - @avaprotocol/types@2.2.17

## 2.4.3

### Patch Changes

- 52b44d6: Update Secret and Cancel, Delete Workflow responses
- Updated dependencies [52b44d6]
  - @avaprotocol/types@2.2.16

## 2.4.2

### Patch Changes

- 6650be6: Update Cancel and Delete operation response
- Updated dependencies [6650be6]
  - @avaprotocol/types@2.2.15

## 2.4.1

### Patch Changes

- 264c1c8: Renovated ContractRead and ContractWrite
- Updated dependencies [264c1c8]
  - @avaprotocol/types@2.2.14

## 2.4.0

### Minor Changes

- 60181d0: Added EventCondition, and unified contractAbi to string type

## 2.3.17

### Patch Changes

- 0dfcf69: Added EventCondition, and unified contractAbi to string type
- Updated dependencies [0dfcf69]
  - @avaprotocol/types@2.2.13

## 2.3.16

### Patch Changes

- 27551e0: Added EventCondition to EventTrigger
- Updated dependencies [27551e0]
  - @avaprotocol/types@2.2.12

## 2.3.15

### Patch Changes

- 567e1ab: Fixed nodes data not serialized for deploy problem

## 2.3.14

### Patch Changes

- ba5ec8f: Fix input is not correctly entered into eventTrigger issue

## 2.3.13

### Patch Changes

- 272c26e: Fixed types package include protobuf library issue
- Updated dependencies [272c26e]
  - @avaprotocol/types@2.2.11

## 2.3.12

### Patch Changes

- 0a0c764: Use new release proces

## 2.3.11

### Patch Changes

- 8ebfb1e: Update the RunNodeWithInputsResponse type dependency

## 2.3.10

### Patch Changes

- 72339c5: Updated and tested loop functions; test empty data returned
- Updated dependencies [72339c5]
  - @avaprotocol/types@2.2.9

## 2.3.9

### Patch Changes

- 42b23c8: Fixed contract read Step Output;added data validity check to block and cron

## 2.3.8

### Patch Changes

- 36ac928: Replace the old value getScheduleList to getSchedulesList
- Updated dependencies [36ac928]
  - @avaprotocol/types@2.2.8

## 2.3.7

### Patch Changes

- 31667f8: Fix CustomCodeLang to match enum value
- Updated dependencies [31667f8]
  - @avaprotocol/types@2.2.7

## 2.3.6

### Patch Changes

- Updated dependencies [75c7865]
  - @avaprotocol/types@2.2.6

## 2.3.5

### Patch Changes

- b5b1eff: Convert lang of CustomCode to use protobuf value
- Updated dependencies [b5b1eff]
  - @avaprotocol/types@2.2.5

## 2.3.4

### Patch Changes

- 9c7c1e0: Updated CronTrigger’s scheduleList to schedules
- Updated dependencies [9c7c1e0]
  - @avaprotocol/types@2.2.4

## 2.3.3

### Patch Changes

- Updated dependencies [38ade5e]
  - @avaprotocol/types@2.2.3

## 2.3.2

### Patch Changes

- Updated dependencies [2baed44]
  - @avaprotocol/types@2.2.2

## 2.3.1

### Patch Changes

- Updated dependencies [07c05b4]
  - @avaprotocol/types@2.2.1

## 2.3.0

### Minor Changes

- c45a2fb: Complete field name standardization and remove backward compatibility

### Patch Changes

- Updated dependencies [c45a2fb]
  - @avaprotocol/types@2.2.0

## 2.2.0

### Minor Changes

- 52a1d86: Added timeout option and strategy to the client

### Patch Changes

- Updated dependencies [52a1d86]
  - @avaprotocol/types@2.1.0

## 2.1.1

### Patch Changes

- ef05955: Updated the request interface of ContractRead

## 2.1.0

### Minor Changes

- 2fe0498: Update interface of event trigger to use queries

## 2.0.4

### Patch Changes

- cd87ed8: Change API response from Execution to ExecutionProps

## 2.0.3

### Patch Changes

- 3bbdc95: Updated runTrigger with EventTrigger output

## 2.0.2

### Patch Changes

- 8e09a20: Fix the request type of SimulateWorkflow and RunTriggerReq
- Updated dependencies [8e09a20]
  - @avaprotocol/types@2.0.2

## 2.0.1

### Patch Changes

- 45212f0: Added GetTokenMetadata function to retrieve whitelist token information
- Updated dependencies [45212f0]
  - @avaprotocol/types@2.0.1

## 2.0.0

### Major Changes

- cfbf435: Migrated type definitions for props into types package

### Patch Changes

- Updated dependencies [cfbf435]
  - @avaprotocol/types@2.0.0

## 1.7.1

### Patch Changes

- 18a2273: Fix types package exported grpc libary; rename simulateTask to simulateWorkflow
- Updated dependencies [18a2273]
  - @avaprotocol/types@1.1.1

## 1.7.0

### Minor Changes

- a7578b6: Added SimulateWorkflow function and updated protobuf

### Patch Changes

- Updated dependencies [a7578b6]
  - @avaprotocol/types@1.1.0

## 1.6.8

### Patch Changes

- 0bd6c9f: Flatten out and removed TriggerReason in Execution
- Updated dependencies [0bd6c9f]
  - @avaprotocol/types@1.0.8

## 1.6.7

### Patch Changes

- ca68e9c: Updated output data to Value type for json and runTrigger logic
- Updated dependencies [ca68e9c]
  - @avaprotocol/types@1.0.7

## 1.6.6

### Patch Changes

- 491ae98: Added runTrigger method and refactored enums
- Updated dependencies [491ae98]
  - @avaprotocol/types@1.0.6

## 1.6.5

### Patch Changes

- bda8a74: Unified the node type conversion code and values by updating protobuf
- Updated dependencies [bda8a74]
  - @avaprotocol/types@1.0.5

## 1.6.4

### Patch Changes

- fa76ec5: Moved node DataType from sdk-js to types pacakge
- Updated dependencies [fa76ec5]
  - @avaprotocol/types@1.0.4

## 1.6.3

### Patch Changes

- 6e9069f: Make type definitions more consistent
- Updated dependencies [6e9069f]
  - @avaprotocol/types@1.0.3

## 1.6.2

### Patch Changes

- b2db42f: Update getSecrets to use general pageInfo
- Updated dependencies [b2db42f]
  - @avaprotocol/types@1.0.2

## 1.6.1

### Patch Changes

- f6ba804: Added eventTrigger tests

## 1.6.0

### Minor Changes

- a38f8df: Consolidated pagination response and match protobuf of AVS v1.8.2

### Patch Changes

- Updated dependencies [a38f8df]
  - @avaprotocol/types@1.0.1

## 1.5.0

### Minor Changes

- cdecf79: Get sign message from server; added wallet isHidden

### Patch Changes

- Updated dependencies [cdecf79]
  - @avaprotocol/types@1.0.0

## 1.4.0

### Minor Changes

- 5a4bad7: Added getWorkflowCount and getExecutionCount methods
- 4769b3c: Added Output and Step properties to Execution response

### Patch Changes

- ba9b001: Sync to the latest grpc_codegen and remove step.outputdata that caused build error

## 1.3.8

### Patch Changes

- Made Client a regular export instead of default

## 1.3.7

### Patch Changes

- Added Secret and TriggerReason

## 1.3.6

### Patch Changes

- Fix the build file problem in 1.3.5

## 1.3.5

### Patch Changes

- b04cca3: Improved secret related code and tests

## 1.3.4

### Patch Changes

- Migrated getKeyRequestMessage to types; Added secret functions
- Updated dependencies
  - @avaprotocol/types@0.9.4

## 1.3.3

### Patch Changes

- update the new auth method and trigger matcher array

## 1.3.2

### Patch Changes

- Updated Task.memo to Task.name and fixed a build warning in types package
- Updated dependencies
  - @avaprotocol/types@0.9.3

## 1.3.1

### Patch Changes

- Update reference to types

## 1.3.0

### Minor Changes

- Initialize types package
