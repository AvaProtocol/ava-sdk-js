# Ava SDK for JavaScript/TypeScript

`@avaprotocol/types` is the TypeScript types for the `@avaprotocol/sdk-js` library and is intended to be used on the client side of a web app to interpret data.

## Installation

To install `@avaprotocol/types`, run the following command:

```bash
npm install @avaprotocol/types
```

Or with Yarn:

```bash
yarn add @avaprotocol/types
```

## Getting Started

Here’s a quick example of how to use the types library to get started with Ava Protocol:

```typescript
import { ExecutionErrorCode, type ExecutionStep } from "@avaprotocol/types";

function needsConfirmationCheck(step: ExecutionStep): boolean {
  return step.errorCode === ExecutionErrorCode.USER_OP_CONFIRMATION_UNRESOLVED;
}
```

## Contributing

We welcome contributions! Feel free to submit pull requests or open issues for any bugs or feature requests.

## License

This project is licensed under the Apache 2.0 License. See the LICENSE file for more details.

## Workflow write outcomes (REST v4)

`ExecutionStep.errorCode` is an open string. `ExecutionErrorCode` exports these
known values; the numbers in parentheses are the gateway's protobuf values,
not the strings returned over REST:

- `USER_OP_CONFIRMATION_UNRESOLVED` (4006): submitted, outcome unknown. Check the
  stored `userOpHash` before retrying; a failed workflow does not prove no funds moved.
- `USER_OP_EXECUTION_REVERTED` (4007): confirmed UserOperation or outer transaction revert.
- `WRITE_PREREQUISITE_FAILED` (4008): this dependent write was never submitted.

Metadata has four shapes, selected by node type and outcome:

| Step | `metadata` shape | Relevant fields |
| --- | --- | --- |
| Native transfer | Flat object | `userOpHash`, `transactionHash`, `receiptStatus` (`pending`, `confirmed`, `failed`), optional `revertData` |
| Contract write | `{ results: [...] }` | Each method retains `methodName`, `success`, `error`, and `receipt` with operation/transaction hashes, `status`, `executionStatus`, optional `revertData` |
| Write loop | `{ confirmationOutcomes: [...] }` when an iteration has a confirmation failure | Each outcome has `id`, `error`, `errorCode`, and its original `metadata`; contract iteration metadata is the internal results array, native metadata is flat. Other loop metadata may coexist. |
| Skipped write | `{ skipped: true, prerequisiteNodeId, prerequisiteError }` | No transaction or gas was submitted for this step; the original prerequisite retains its receipt. |

For contract writes, `receipt.status` describes the **outer Ethereum transaction**.
An inner UserOperation can revert while the outer receipt has `status: "0x1"`.
Use step `success`, `errorCode`, and receipt `executionStatus` to determine whether
that action succeeded. Pending hashes stay available after an unresolved outcome.
Reports and independent branches continue after a skipped write.
