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
npm install # install grpc-tools, etc. as dev dependencies
```

Then, run the following command to regenerate the types:

```bash
# download the latest .proto file from https://github.com/AvaProtocol/EigenLayer-AVS
npm run proto-download 

# Generate the TypeScript types and gRPC code based on the downloaded .proto file
npm run gen-protoc 
```

> Important: the last line of the `grpc_codegen/avs_pb.js` needs to be manually added after the `gen-protoc` command. These type definitions must be exported; otherwise they will be undefined in the SDK. For example: `export const { Task, CreateTaskReq, CreateTaskResp, GetKeyReq, KeyResp, UpdateChecksReq, UpdateChecksResp, AddressResp, AddressRequest } = proto.aggregator;`

### Running Tests

To ensure the SDK is functioning correctly, we have a comprehensive test suite. Follow these steps to run the tests:

1. Make sure all dependencies are installed:
   ```bash
   npm install
   ```

2. Run the test command. This will test the SDK against mockup responses.
   ```bash
   npm test
   ```
   
3. To test the SDK against the live AVS on Ethereum Mainnet, you can run the following command:
   ```bash
   npm run test:e2e
   ```

   Before running the e2e tests, make sure to configure the required TEST values in your `.env` file:

   ```
   TEST_JWT_TOKEN=your_TEST_JWT_TOKEN_here
   TEST_OWNER=your_test_owner_here
   ```

   Replace `your_TEST_JWT_TOKEN_here` with a valid JWT API key and `your_test_owner_here` with the appropriate owner address for testing.

This will execute all unit and integration tests. Make sure all tests pass before submitting a pull request or deploying changes.

### Utility Scripts

To generate the key request message for signing, you can run the following command:

```bash
npm run build # Make sure to build the project first

export TEST_MNEMONIC=<your_mnemonic> && node scripts/signMessage.js
```

## Contributing

We welcome contributions! Feel free to submit pull requests or open issues for any bugs or feature requests.

## License

This project is licensed under the Apache 2.0 License. See the LICENSE file for more details.
