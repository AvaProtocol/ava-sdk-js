# @avaprotocol/sdk-js

## 3.2.2

### Patch Changes

- 8567ada: fix: `EventCondition.value` is now typed as `string` instead of `Record<string, unknown>`, matching the proto contract and the aggregator's REST decoder. Studio templates (e.g. Uniswap V3 stop-loss) that previously failed with `WORKFLOWS_BAD_TRIGGER: cannot unmarshal string into Go struct field EventCondition.config.queries.conditions.value` now serialize correctly. Re-syncs `packages/types/openapi/openapi.yaml` from EigenLayer-AVS staging (PR #601) and regenerates `openapi.gen.ts`.
- Updated dependencies [8567ada]
- Updated dependencies [8567ada]
  - @avaprotocol/types@3.0.1

## 3.2.1

### Patch Changes

- 3ce791f: `buildAuthMessage` now rejects URIs without an explicit `http:` or `https:` scheme.

  The WHATWG URL parser accepts strings like `localhost:3000` as valid URLs with scheme `localhost`, so the previous validation (`new URL(uri)` inside a try/catch) let bare authority strings through. A signature scoped to a phantom `localhost:` scheme can't be trusted by anything verifying against the real origin — callers passing such values were getting incorrect behavior.

  Existing callers using `http://localhost:3000`, `https://app.example.com`, etc. are unaffected.

## 3.2.0

### Minor Changes

- 8ea2a5b: Extend the catalog re-export surface and bump `@avaprotocol/protocols` to `^0.6.0`.

## 3.1.0

### Minor Changes

- 3b4e2df: fix: `buildAuthMessage`, `signAuthMessage`, and `AuthResource.exchangeWithKey` now require a `uri` parameter (the origin URL the user is authenticating against). This replaces the previously hardcoded `https://app.avaprotocol.org` value so wallet popups display the correct site. The `uri` value is validated as a non-empty, syntactically valid URL at runtime; whitespace-only strings and non-URL values throw immediately.

## 3.0.0

### Major Changes — REST cutover

`@avaprotocol/sdk-js` is now a REST client. The gRPC client surface that powered every 2.x release has been archived; the SDK speaks the OpenAPI-described REST surface (`/api/v1/...`) of the aggregator gateway directly. This is a hard break from 2.x — there is no compat shim.

**What's new in 3.0.0:**

- **REST `Client`** — `import { Client } from "@avaprotocol/sdk-js"` constructs a Bearer-JWT client; resource sub-clients (`client.auth`, `client.workflows`, `client.wallets`, `client.executions`, `client.secrets`, `client.tokens`, `client.nodes`, `client.triggers`, `client.operators`, `client.health`) replace the old gRPC method surface.
- **Position D auth** — `buildAuthMessage({ ownerAddress, chainId, version })` requires the wallet's currently-connected chainId and the gateway version (fetched from `client.health.check()`). The previous silent defaults (`Chains.EigenLayerAuth` / `"v4-sdk"`) are gone. See [studio/docs/AUTH_POSITION_D_MIGRATION.md](https://github.com/AvaProtocol/studio/blob/main/docs/AUTH_POSITION_D_MIGRATION.md) for the migration rationale.
- **Protocol catalog** — `Protocols` re-exports from `@avaprotocol/protocols`. 14 protocols (AAVE v3, Uniswap v3, Chainlink, etc.) across mainnet, Base, Sepolia, Base Sepolia.
- **Typed builders** — `Triggers.cron()`, `Triggers.event()`, `Triggers.block()`, `Triggers.fixedTime()`, `Nodes.contractWrite()`, `Nodes.restApi()`, etc. return discriminated-union-shaped objects so the OpenAPI types validate at compile time.
- **Generated types** — `@avaprotocol/types@^3.0.0` ships the OpenAPI-derived TypeScript types (`components`, `paths`, `v4.*` re-exports) the SDK and consumers can import directly.

**Why 3.0.0 (not 4.0.0):**

The pre-release dev iterations of the REST rewrite (`4.0.0-dev.0` through `4.0.0-dev.3`) used a major version that matched the internal codebase generation tag (`src/v4/` directory). Publishing the stable release as `3.0.0` instead restores npm semver continuity from `2.17.0` — consumers see the expected major bump cadence. The `src/v4/` internal directory name is preserved as a codebase generation tag (the prior gRPC iteration was internally "v3" but published as the 2.x line, and the REST rewrite is "v4" internally regardless of its npm version).

The `4.0.0-dev.X` versions remain on npm under the `dev` dist-tag for anyone who pinned them during the rewrite; they're functionally equivalent to the 3.0.0 release minus the Position D auth changes (round 1 of the breaking SDK changes).

## 2.17.0

### Minor Changes

- bfb7974: Replace `ExecutionStatus.PartialSuccess` with clear SUCCESS/FAILED/ERROR semantics.

  **Breaking:** `ExecutionStatus.PartialSuccess` is removed. Use `ExecutionStatus.Failed` for step failures and `ExecutionStatus.Error` for system-level failures. Branch-skip workflows now return `ExecutionStatus.Success`.

  Legacy proto value 4 (former PARTIAL_SUCCESS) is mapped to `Failed` automatically — no data migration needed.

### Patch Changes

- d46e755: fix: consolidate conversion functions like convertProtobufExecutionStatus
- Updated dependencies [bfb7974]
- Updated dependencies [d46e755]
  - @avaprotocol/types@2.13.0

## 2.16.0

### Minor Changes

- 44f1764: Document the new `value` / `valueFormatted` field semantics for ERC-20 Transfer event triggers and document that `MethodCallType.applyToFields: ["Transfer.value"]` is no longer needed (and should not be used) for Transfer events. The `applyToFields` field itself is **not** deprecated — it remains the correct mechanism for non-Transfer cases like Chainlink `AnswerUpdated.current`, ERC-20 `totalSupply`, and other contract read fields where shared enrichment does not pre-compute a formatted value.

  **Breaking change in trigger output (originates from EigenLayer-AVS PR #509):**

  - `EventTrigger` output `data.value` is now the **raw uint256 base-units string** for ERC-20 `Transfer` events (e.g. `"1500000"` for 1.5 USDC). Previously this field held the decimal-formatted amount when token metadata was available.
  - `data.valueFormatted` is the new field for the **decimal-applied display string** (e.g. `"1.5"`).
  - SDK consumers that read `data.value` for display **must migrate to `data.valueFormatted`**. Code that does math/encoding on `data.value` (e.g. ERC-20 transfer calldata generation) is unchanged or now more correct.

  **Guidance change (not a type-level deprecation):**

  - `MethodCallType.applyToFields: ["Transfer.value"]` is no longer needed for ERC-20 Transfer events — the operator's shared event enrichment now always publishes `valueFormatted` for Transfer events when token decimals are known, making the opt-in mechanism redundant and potentially double-formatting. **`applyToFields` itself is not deprecated** — it remains valid (and required) for non-Transfer use cases.

  **Updates in this release:**

  - `packages/types/src/shared.ts` — `MethodCallType.applyToFields` JSDoc clarified with an `@remarks` block explaining the Transfer-specific guidance. No `@deprecated` tag (which would incorrectly strikethrough the 30+ legitimate non-Transfer usages across `contractRead.test.ts`, `loopNode.test.ts`, Chainlink/Uniswap templates, etc.).
  - `packages/sdk-js/README.md` — new "Event trigger output: `value` vs `valueFormatted`" section.
  - `examples/example.ts` — comment on the `scheduleMonitorTransfer` ContractWrite step explaining when to use `data.value` vs `data.valueFormatted`.
  - Test fixtures and assertions in `tests/triggers/eventTrigger.test.ts`, `tests/templates/telegram-alert-on-transfer.test.ts`, and `tests/executions/stepInput.test.ts` updated to use the new field semantics.

  No production SDK code reads `transferData.value` directly, so there is no API surface break — this is a documentation and consumer-guidance release.

### Patch Changes

- bb0b404: Address PR review feedback on the Transfer field semantics alignment (companion to the previous changeset, `transfer-value-semantics.md`).

  **Bug fix in `examples/example.ts`** — the `scheduleMonitorTransfer` ContractWrite calldata template was using `Number(demoTriggerName.data.value).toString(16)` to encode the ERC-20 transfer amount. With `data.value` now being raw uint256 base units (per EigenLayer-AVS PR #509), the `Number(...)` cast silently loses precision for any token amount above JavaScript's safe-integer range (~9e15 — about 9 ETH or 9,000,000,000 USDC), producing incorrect transfer calldata. Switched to `BigInt(...)` which is integer-safe.

  **Test determinism fix in `tests/executions/stepInput.test.ts`** — the previous attempt added an `if (eventData.valueFormatted) { ... } else { decode rawData }` fallback in the CustomCode snippet. That violated the test determinism rule (CLAUDE.md) because it allowed the test to pass via two different code paths and would have hidden a future regression that drops `valueFormatted` from the simulator output. The CustomCode snippet now reads `eventData.valueFormatted` directly. As a side effect, this also removes a `parseInt(rawValue, 16)` precision-loss path that would have silently truncated large amounts on the fallback branch.

  **Documentation polish** — `packages/sdk-js/README.md` previously said "Breaking change in v1.x" but `@avaprotocol/sdk-js` is currently v2.x. Replaced with version-agnostic wording: "Breaking change in operator output (EigenLayer-AVS PR #509)".

  **Comment alignment** — two inline comments in the Transfer event tests still used the word "deprecated", which contradicted the deliberate `@remarks`-not-`@deprecated` decision in the previous changeset. Updated to "is no longer needed for Transfer events" and explicitly noted the field is still valid for non-Transfer cases (Chainlink AnswerUpdated, ERC-20 totalSupply, etc.).

  No SDK API surface changes. No new tests added beyond the determinism cleanup. The semantic regex assertions added in the previous PR continue to pin the `value` / `valueFormatted` contract.

- Updated dependencies [44f1764]
  - @avaprotocol/types@2.12.0

## 2.15.0

### Minor Changes

- 11d46a3: eat: update SDK for new fee proto (Fee/NodeCOGS/ValueFee)

### Patch Changes

- Updated dependencies [11d46a3]
  - @avaprotocol/types@2.11.0

## 2.14.2

### Patch Changes

- 87715a5: fix: guard sendGrpcRequest against undefined gRPC response

## 2.14.1

### Patch Changes

- fix: update protobuf codegen to use inputVariable (renamed from inputNodeName) for LoopNode and FilterNode configs. Add loop ETHTransfer/GraphQL runner tests and strengthen from-field assertions.
- Updated dependencies
  - @avaprotocol/types@2.10.1

## 2.14.0

### Minor Changes

- e636c25: feat: template variables for Loop/Filter nodes, settings validation, secrets fix

## 2.13.0

### Minor Changes

- 0d52ded: refactor: migrated workflow.name to inputVariables.settings.name in deployed workflow creation

### Patch Changes

- Updated dependencies [0d52ded]
  - @avaprotocol/types@2.10.0

## 2.12.3

### Patch Changes

- 1961cd5: fix: protobuf was not built and updated problem

## 2.12.2

### Patch Changes

- 1d8a1e8: fix: getAutomationFee is not a function in execution proble

## 2.12.1

### Patch Changes

- a6f7b8d: fix: resolve getAutomationFee function not found problem

## 2.12.0

### Minor Changes

- 3c9a303: add automationFee to Execution model for getExecution/getExecutions responses

## 2.11.1

### Patch Changes

- ee62aee: fix: added cooldownSeconds to EventTrigger
- Updated dependencies [ee62aee]
  - @avaprotocol/types@2.9.1

## 2.11.0

### Minor Changes

- d37afb0: Allow to set enabled/disabled to workflow; rename from active status and remove cancelWorkflow

### Patch Changes

- Updated dependencies [d37afb0]
  - @avaprotocol/types@2.9.0

## 2.10.4

### Patch Changes

- 363c57a: fix: updated tokenMetadata to use id instead address
- Updated dependencies [363c57a]
  - @avaprotocol/types@2.8.4

## 2.10.3

### Patch Changes

- e1fb04e: chore: define LoopRunnerType type in the types package
- Updated dependencies [e1fb04e]
  - @avaprotocol/types@2.8.3

## 2.10.2

### Patch Changes

- 9167174: fix: updated runNodeImmediate and runTrigger request inputs to be consistent with simulateWorkflow"
- Updated dependencies [9167174]
  - @avaprotocol/types@2.8.2

## 2.10.1

### Patch Changes

- b85409c: fix: add options field support to RestAPINode
- Updated dependencies [b85409c]
  - @avaprotocol/types@2.8.1

## 2.10.0

### Minor Changes

- 2e75ba5: feat: update event trigger interface with topics string array, null values, and response field name change

### Patch Changes

- Updated dependencies [2e75ba5]
  - @avaprotocol/types@2.8.0

## 2.9.3

### Patch Changes

- 6d542b4: Moved isSimulated from the runNodeWithInputs top-level to inside ContractWrite nodeConfig
- Updated dependencies [6d542b4]
  - @avaprotocol/types@2.7.3

## 2.9.2

### Patch Changes

- 80aba7a: Added isSimulated parameter to runNodeWithInputs
- Updated dependencies [80aba7a]
  - @avaprotocol/types@2.7.2

## 2.9.1

### Patch Changes

- 4aeb505: Added token_addresses to BalanceNode
- Updated dependencies [4aeb505]
  - @avaprotocol/types@2.7.1

## 2.9.0

### Minor Changes

- bc5b6f6: Added BalanceNode and lang to ManualTrigger

### Patch Changes

- Updated dependencies [bc5b6f6]
  - @avaprotocol/types@2.7.0

## 2.8.1

### Patch Changes

- 7eb5023: Replace inputVariables workflowContext with settings, and fix dev test github actions
- Updated dependencies [7eb5023]
  - @avaprotocol/types@2.6.1

## 2.8.0

### Minor Changes

- c74b912: Added fee estimation interface and gas cost to execution.step

### Patch Changes

- Updated dependencies [c74b912]
  - @avaprotocol/types@2.6.0

## 2.7.4

### Patch Changes

- b13427a: Added new fields to the Execution and Execution.Step protobuf messages for gas usage: gas_used, gas_price, and total_gas_cost; Introduced a new input_variables map field to the Task and CreateTaskReq protobuf messages, and updated the generated JavaScript code to handle serialization, deserialization, and access to these variables.
- Updated dependencies [b13427a]
  - @avaprotocol/types@2.5.4

## 2.7.3

### Patch Changes

- f0d9b2c: Added status code and fixed test failures
- Updated dependencies [f0d9b2c]
  - @avaprotocol/types@2.5.3

## 2.7.2

### Patch Changes

- fa74495: Added ExecuteStatus and index to Execution.Step
- Updated dependencies [fa74495]
  - @avaprotocol/types@2.5.2

## 2.7.1

### Patch Changes

- aacd631: feat: add execution index field and partial success status support
- Updated dependencies [aacd631]
  - @avaprotocol/types@2.5.1

## 2.7.0

### Minor Changes

- 94225ec: Added withdraw request to transfer from bundler

### Patch Changes

- Updated dependencies [94225ec]
  - @avaprotocol/types@2.5.0

## 2.6.13

### Patch Changes

- 98dfca0: Added executionContext to runNode response
- Updated dependencies [98dfca0]
  - @avaprotocol/types@2.4.11

## 2.6.12

### Patch Changes

- 56d89ae: Updated ContractWrite protobuf conversion
- Updated dependencies [56d89ae]
  - @avaprotocol/types@2.4.10

## 2.6.11

### Patch Changes

- 9261ba8: Update response of ContractWriteNode to fix metadata

## 2.6.10

### Patch Changes

- c0afaa3: Fix BranchNode runNodeImmediately response format

## 2.6.9

### Patch Changes

- 83af57c: Updated MethodCallType type definitions
- Updated dependencies [83af57c]
  - @avaprotocol/types@2.4.9

## 2.6.8

### Patch Changes

- 8a767da: Remove input from both TriggerProps and NodeProps
- Updated dependencies [8a767da]
  - @avaprotocol/types@2.4.8

## 2.6.7

### Patch Changes

- Updated dependencies [1f8948b]
  - @avaprotocol/types@2.4.7

## 2.6.6

### Patch Changes

- d8706f3: Created ContractABI type
- Updated dependencies [d8706f3]
  - @avaprotocol/types@2.4.6

## 2.6.5

### Patch Changes

- df22279: Update triggerWorkflow response to return the result when isBlocking:true
- Updated dependencies [df22279]
  - @avaprotocol/types@2.4.5

## 2.6.4

### Patch Changes

- 031f401: Update triggerWorkflow for manual trigger and fix template tests
- Updated dependencies [031f401]
  - @avaprotocol/types@2.4.4

## 2.6.3

### Patch Changes

- fd04f63: Updated the type definitions of contractRead and contractWrite
- Updated dependencies [fd04f63]
  - @avaprotocol/types@2.4.3

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
