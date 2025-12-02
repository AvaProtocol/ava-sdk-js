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
import { WorkflowStatus, TriggerType } from "@avaprotocol/types";

// Check conditions such as workflow status
if (workflow.status === WorkflowStatus.Enabled) {
  // ...
  // your logic here
  // ...
}
```

## Contributing

We welcome contributions! Feel free to submit pull requests or open issues for any bugs or feature requests.

## License

This project is licensed under the Apache 2.0 License. See the LICENSE file for more details.
