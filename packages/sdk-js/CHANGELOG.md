# @avaprotocol/sdk-js

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
