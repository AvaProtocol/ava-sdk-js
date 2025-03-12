# Ava SDK for JavaScript/TypeScript

`ava-sdk-js` is a simple, type-safe wrapper around gRPC designed to simplify integration with Ava Protocol’s AVS. It enables developers to interact with Ava Protocol efficiently, whether on the client-side or server-side, and provides full TypeScript support for a seamless development experience.

## Features

- Type-Safe SDK: Automatically generated TypeScript types from gRPC protocol buffers ensure type safety and reduce errors during development.
- Seamless Integration: Works in both Node.js and browser environments, optimized for frameworks like Next.js.
- User-friendly: Simplifies the intricacies of gRPC with an intuitive JavaScript/Typescript interface.
- Efficient Communication: Leverages gRPC for fast, efficient communication with Ava Protocol’s AVS (Actively Validated Services).

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

Here’s a quick example of how to use the SDK to get started with Ava Protocol:

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
yarn run gen-protoc

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
   > export AVS_BUILD_VERSION=git-commit-hash-123
   > docker compose up -d --pull always
   > ```

4. Generate a test API key for the local tests with the following command. It will automatically save the output to the `TEST_API_KEY` variable in `.env.test`.

   ```bash
   npm run gen-apikey

   # or if not using docker, run the following command in ./EigenLayer-AVS/out
   ./out/ap create-api-key --role=admin --subject=apikey
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

### Releasing a new version for development

Once a package is ready for a new version, we first publish a dev version and test it in local environment.

1. Run `npm version prerelease --preid=dev` under either `packages/sdk-js` or `packages/types` to update the version in `package.json`.
2. Run `npm publish --tag dev` under either `packages/sdk-js` or `packages/types` to publish the new dev version to NPM. Most importantly, this **bumps up version number** in `package.json` of `packages/types`.
3. If the `types` package has a new version, since it is depended on by `sdk-js`, we need to make sure `sdk-js` can build with the new version.

   1. `yarn run clean` **at the root folder** to remove existing node_modules folder and yarn.lock file.
   2. Run `yarn install` under the root folder to re-install the dependencies. You should see a prompt asking the version of `@avaprotocol/types` to install. Choose the new version you just created in step 1.
   3. Run `yarn build` under the root folder to build all packages.
   4. Run `yarn run test` under the root folder to run all tests.

### Publishing to NPM

Once the dev version is tested and ready to be published to NPM, `changeset` can be used to create a new release for NPM.

1. **Record changeset workflow**

   - Go to the "Actions" tab in GitHub, and run the "Record Changeset" workflow
   - Select the version bump type:
     - `patch` for backwards-compatible bug fixes (0.0.x)
     - `minor` for backwards-compatible features (0.x.0)
     - `major` for breaking changes (x.0.0)
   - Examine the Pull Request created by the workflow, and merge it if everything looks correct. This will record any commits before it as a major, minor, or patch.

2. **Create release workflow**
   There are two ways to create a release:
   - Manually create a release in the GitHub UI. This will run `npx changeset version` to bump up version in `package.json` based on the recorded changeset files. It will also create a new GitHub Release if the new version is higher than the current version in `package.json`.
   - Automatically create a release when a PR is merged. This will run `npx changeset version` to bump up version in `package.json` based on the recorded changeset files. It will also create a new GitHub Release if the new version is higher than the current version in `package.json`.
3. **Publish to NPM**
   - After the last step, the version number in `package.json` is updated and a git tag with the new version number is created. Now you can publish the production version to NPM using `npm publish`.

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
