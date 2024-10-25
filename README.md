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

1. Make sure all dependencies are installed, and build the project. Tests are run against the files in the `/dist` folder
   ```bash
   npm install
   npm run build
   ```
2. Before running the e2e tests, make sure to configure the required environment variables in your `.env.test` file, based on the `.env.example` file.

3. Run the test command. This will test the SDK against test server, configured in `.env.test`.

   ```bash
   # Run all tests
   npm test

   # or, run a specific test
   npm run test:select -- <authWithSignature>
   ```

4. In order to individually test `cancelTask` or `deleteTask`, `createTask` test needs to run first.
   ```bash
   npm run test:select -- "createTask|cancelTask"
   ```

This will execute all unit and integration tests. Make sure all tests pass before submitting a pull request or deploying changes.

## Version Management

This project uses [Changesets](https://github.com/changesets/changesets) to manage versions and changelogs. To contribute changes:

1. Make your changes to the codebase.
2. Run `npm run changeset` to create a new changeset.
3. Follow the prompts to describe your changes.
4. Commit the generated changeset file along with your changes.

To release a new version:

1. Run `npm run version` to update package versions and changelogs.
2. Review and commit the changes.
3. Run `npm run release` to publish the new version to npm.

For more detailed information on using Changesets, refer to the [Changesets documentation](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md).


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

