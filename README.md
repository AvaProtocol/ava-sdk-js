# Ava SDK for JavaScript/TypeScript

`ava-sdk-js` is a simple, type-safe wrapper around gRPC designed to simplify integration with Ava Protocol's AVS. It enables developers to interact with Ava Protocol efficiently, whether on the client-side or server-side, and provides full TypeScript support for a seamless development experience.

## Features

- Type-Safe SDK: Automatically generated TypeScript types from gRPC protocol buffers ensure type safety and reduce errors during development.
- Seamless Integration: Works in both Node.js and browser environments, optimized for frameworks like Next.js.
- User-friendly: Simplifies the intricacies of gRPC with an intuitive JavaScript/Typescript interface.
- Efficient Communication: Leverages gRPC for fast, efficient communication with Ava Protocol's AVS (Actively Validated Services).

## Installation

To install `ava-sdk-js`, run the following command:

```bash
npm install ava-sdk-js
```

Or with Yarn:

```bash
yarn add ava-sdk-js
```

## Getting Started

Here's a quick example of how to use the SDK to get started with Ava Protocol:

```typescript
import { AvaSDK } from "ava-sdk-js";
```

## Development

### Install Dependencies and Download Protobuf Files

```bash
yarn # install grpc-tools, etc. as dev dependencies
```

Then, run the following command to regenerate the types:

```bash
# download the latest .proto file from https://github.com/AvaProtocol/EigenLayer-AVS
yarn run proto-download

# Generate the TypeScript types and gRPC code based on the downloaded .proto file
yarn run protoc-gen

# Build the source files in to ./dist folder
yarn run build
```

### Running Tests

To ensure the SDK is functioning correctly, we have a comprehensive test suite. Follow these steps to run the tests:

1. Make sure all dependencies are installed, and build the project. Tests are run against the files in the `/dist` folder
   ```bash
   npm install
   npm run build
   ```
2. Before running the e2e tests, make sure to configure the required environment variables in your `.env.test` file, based on the `.env.example` file.

3. Bring up a locally environment for aggregator

   ```bash
   docker compose up -d --pull always
   ```

   > By default the above command will pull the docker image of the latest commit on the `main` branch of https://github.com/AvaProtocol/EigenLayer-AVS. Alternatively, we could also run tests against a specific commit with the below command.
   >
   > ```
   > export DOCKER_IMAGE_TAG=image_tag_on_docker_hub
   > docker compose up -d --pull always
   > ```

4. Generate a test API key for the local tests with the following command. It will automatically save the output to the `TEST_API_KEY` variable in `.env.test`.

   ```bash
   npm run gen-apikey

   # or if not using docker, run the following command in ./EigenLayer-AVS/out
   ./out/ap create-api-key --config ./config/aggregator-base.yaml --role=admin --subject=apikey
   ```

5. Run the test command with env variables set in `.env.test`.

   ```bash
   # Run all tests
   npm test

   # or, run a specific test
   npm run test:select -- <authWithSignature>
   ```

   > Note: In order to individually test `cancelTask` or `deleteTask`, `createTask` test needs to run first.

   > ```bash
   > npm run test:select -- "createTask|cancelTask"
   > ```

   This will execute all unit and integration tests. Make sure all tests pass in local dev environment before submitting a pull request or deploying changes.

### Running Tests with Docker

To run tests with Docker (replicating the GitHub Actions workflow), use the following command:

```bash
yarn test:docker
```

This script will:
1. Pull the Docker container defined in docker-compose.yml
2. Set up parameters and environment variables
3. Run the tests

To run specific tests, you can pass a test name pattern:

```bash
yarn test:docker "authWithSignature"
```

Make sure to set the following environment variables in your `.env.test` file:
- `TEST_PRIVATE_KEY`: A valid Ethereum private key for testing
- `CHAIN_ENDPOINT`: A valid Ethereum RPC endpoint (e.g., Infura, Alchemy)

## Release Process

This section describes the simplified release process for the ava-sdk-js monorepo, matching the typical developer workflow:

### Release Process (Simplified)

1. **Commit your changes:**
   ```bash
   git add packages/sdk-js/src/
   git commit -m "fix: getAutomationFee is not a function in execution problem"
   git push
   ```

2. **Build all packages:**
   ```bash
   yarn build
   ```

3. **Create a changeset:**
   ```bash
   yarn run changeset
   # Follow the prompts to select packages and describe the change
   ```

4. **Version packages:**
   ```bash
   yarn run version
   # This runs 'changeset version' to update package.json files
   git push
   ```

5. **Publish to npm:**
   ```bash
   npm run publish
   # This runs the publish-packages.js script to publish all packages
   ```

**Note:**
- The `npm run publish` script handles protobuf regeneration and publishing. If you see errors related to missing binaries (like `protoc`), ensure all dev dependencies are installed and your environment is set up correctly.
- For troubleshooting, see the Troubleshooting section below.

## Contributing

We welcome contributions! Feel free to submit pull requests or open issues for any bugs or feature requests.

## License

This project is licensed under the Apache 2.0 License. See the LICENSE file for more details.
