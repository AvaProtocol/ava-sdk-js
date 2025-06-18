# @avaprotocol/types

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
