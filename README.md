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

### Install Dependencies and Download Proto Files

```bash
npm install # install grpc-tools, etc. as dev dependencies
```

Then, run the following command to regenerate the types:

```bash
# download the latest .proto file from https://github.com/AvaProtocol/EigenLayer-AVS
npm run proto-download

# Generate the TypeScript types and gRPC code based on the downloaded .proto file
npm run gen-protoc

# Build the source files in to ./dist folder
npm run build
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

## Release Process

This repository uses a two-step workflow process for creating new releases:

1. **Record changeset workflow**

   - Go to the "Actions" tab in GitHub, and run the "Record Changeset" workflow
   - Select the version bump type:
     - `patch` for backwards-compatible bug fixes (0.0.x)
     - `minor` for backwards-compatible features (0.x.0)
     - `major` for breaking changes (x.0.0)
   - Examine the Pull Request created by the workflow, and merge it if everything looks correct. This will record any commits before it as a major, minor, or patch.

2. **Create release workflow**
   - Go to the "Actions" tab in GitHub and run the "Create Release" workflow. This will run `npx changeset version` to bump up version in `package.json` based on the recorded changeset files. It will also create a new GitHub Release if the new version is higher than the current version in `package.json`.
3. **Publish to NPM**
   - After the last step, the version number in `package.json` is updated and a git tag with the new version number is created. Now you can publish the production version to NPM using `npm publish`.

### NPM Publishing Dev Versions

The NPM publishing of dev versions can be handled manually, since the test cases reference the dist folder and don’t require a new version on NPM. NPM publish on dev tag is only required for testing the new version in a web app.

1. Publish a dev version and test it in your local environment. The `npm publish` will use the version number in `package.json`, so run `npm version prerelease --preid=dev` first if you need a new version number.

   ```bash
   # Optionally, update version with dev tag in package.json
   npm version prerelease --preid=dev

   # Publish to npm with dev tag
   npm publish --tag dev
   ```

2. Once tested, and a release is created using GitHub Actions, publish the production version to NPM:
   ```bash
   # Publish to npm with latest tag
   npm publish
   ```

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
