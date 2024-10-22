# Ava SDK for JavaScript/TypeScript

`ava-sdk-js` is a simple, type-safe wrapper around gRPC designed to simplify integration with Ava Protocol’s AVS. It enables developers to interact with Ava Protocol efficiently, whether on the client-side or server-side, and provides full TypeScript support for a seamless development experience.

## Features

- Type-Safe SDK: Automatically generated TypeScript types from gRPC protocol buffers ensure type safety and reduce errors during development.
- Seamless Integration: Works in both Node.js and browser environments, optimized for frameworks like Next.js.
- Easy to Use: Abstracts the complexity of gRPC with a simple JavaScript/TypeScript API.
- Efficient Communication: Leverages gRPC for fast, efficient communication with Ava Protocol’s AVS (Actively Validated Services).

## Installation

To install `ava-sdk-js`, use npm:

```bash
npm install ava-sdk-js
```

Or with Yarn:

```bash
yarn add ava-sdk-js
```

## Getting Started

Here’s a quick example of how to use the SDK to get started with Ava Protocol:

```typescript
import { AvaSDK } from "ava-sdk-js";
```

## Development

### Regenerating gRPC Types

In the case of `.proto` files at https://github.com/AvaProtocol/EigenLayer-AVS/blob/main/protobuf/avs.proto changes, the gRPC types needs to be regenerated.Before regenerating the types from the protocol buffers, ensure that `grpc_tools_node_protoc` is installed globally on your system. You can install it using npm:

```bash
npm install -g grpc-tools
```

Then, run the following command to regenerate the types:

```bash
npm run gen-protoc
```

This will automatically download the latest `.proto` file from https://github.com/AvaProtocol/EigenLayer-AVS and generate the updated TypeScript types and gRPC code, ensuring that all changes are reflected in the SDK.

## Contributing

We welcome contributions! Feel free to submit pull requests or open issues for any bugs or feature requests.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
