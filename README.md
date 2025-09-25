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

This guide explains how to properly publish packages from the ava-sdk-js monorepo while handling workspace dependencies correctly.

### The Problem

When publishing npm packages from a monorepo with workspace dependencies, the `workspace:*` references don't get resolved to actual version numbers. This causes the published packages to have invalid dependency references that npm cannot resolve.

### Solutions

We've implemented two solutions to handle this issue:

#### 1. Automatic Prepare Script (For Development/Quick Publishing)

Each package has a `prepare` script that automatically resolves workspace dependencies before publishing:

```bash
# The prepare script runs automatically when you run npm publish
npm publish
```

The prepare script:
- Replaces `workspace:*` dependencies with actual version numbers (e.g., `^2.2.9`)
- Runs automatically during `npm publish`
- Restores the original `workspace:*` references after publishing

#### 2. Changesets Release (For Production Releases)

For production releases with proper versioning and changelog generation:

```bash
# 1. Create a changeset (if you haven't already)
yarn changeset

# 2. Run the release process
yarn release
```

The release script:
- Checks for changesets
- Builds all packages
- Updates workspace dependencies to actual versions
- Versions packages using changesets
- Publishes to npm
- Restores workspace dependencies
- Generates changelogs

### Publishing Workflow

#### For Development/Quick Publishing

1. **Build the packages:**
   ```bash
   yarn build
   ```

2. **Publish using the prepare script:**
   ```bash
   cd packages/sdk-js
   npm publish
   ```

   The prepare script will automatically:
   - Replace `"@avaprotocol/types": "workspace:*"` with `"@avaprotocol/types": "^2.2.9"`
   - Publish the package with resolved dependencies
   - Restore the original workspace references

#### For Production Releases

1. **Create a changeset:**
   ```bash
   yarn changeset
   ```
   Follow the prompts to select packages and describe changes.

2. **Run the release process:**
   ```bash
   yarn release
   ```

   This will:
   - Build all packages
   - Update workspace dependencies to actual versions
   - Version packages according to changesets
   - Publish to npm
   - Restore workspace dependencies
   - Generates changelogs

### Releasing a new version for development

Once a package is ready for a new version, we first publish a dev version and test it in local environment.

#### Automated Dev Publishing (Recommended)

```bash
# Full automated dev publishing workflow
npm run publish:dev

# Preview what would be published without actually doing it
npm run publish:dev:dry-run

# Advanced options for specific scenarios
npm run publish:dev -- --skip-tests    # Skip tests (faster but less safe)
npm run publish:dev -- --skip-clean    # Skip dependency cleanup (faster)
npm run publish:dev -- --types-only    # Only publish types (when SDK has compatibility issues)
npm run publish:dev -- --help          # Show all available options
```

#### Manual Dev Publishing (Legacy)

If you prefer manual control, you can still follow the individual steps:

1. Run `yarn version --prerelease --preid dev` under either `packages/sdk-js` or `packages/types` to update the version in `package.json`.
2. Run `npm publish --tag dev` under either `packages/sdk-js` or `packages/types` to publish the new dev version to NPM. Most importantly, this **bumps up version number** in `package.json` of `packages/types`.
3. If the `types` package has a new version, since it is depended on by `sdk-js`, we need to make sure `sdk-js` can build with the new version.

   1. `yarn run clean` **at the root folder** to remove existing node_modules folder and yarn.lock file.
   2. Run `yarn install` under the root folder to re-install the dependencies. You should see a prompt asking the version of `@avaprotocol/types` to install. Choose the new version you just created in step 1.
   3. Run `yarn build` under the root folder to build all packages.
   4. Run `yarn run test` under the root folder to run all tests.

#### Handling Build Order Issues

When the types package has breaking changes (like removed exports), the SDK may fail to build after dependency updates. The script provides several solutions:

**Option 1: Types-only publishing** (Recommended for breaking changes)
```bash
npm run publish:dev -- --types-only
```
This publishes only the types package, allowing you to fix SDK compatibility issues separately.

**Option 2: Skip dependency cleanup** (When types haven't changed)
```bash
npm run publish:dev -- --skip-clean
```
This avoids updating dependencies, useful when you're only making SDK changes.

**Option 3: Manual fix workflow**
1. Run `npm run publish:dev` and let it fail at the build step
2. Fix the SDK imports to match the new types exports
3. Run `yarn build` to verify the fix
4. Manually publish the SDK: `cd packages/sdk-js && npm publish --tag dev`

#### Installing Dev Versions

After publishing dev versions, you can install them in your projects:

```bash
# Install the latest dev version of the SDK
npm install @avaprotocol/ava-sdk-js@dev
npm install @avaprotocol/types@dev

# Or install specific dev versions
npm install @avaprotocol/ava-sdk-js@1.2.3-dev.0
npm install @avaprotocol/types@1.2.3-dev.0
```

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

### Verification

After publishing, you can verify that the packages were published correctly:

1. Check the published package.json on npm:
   ```bash
   npm view @avaprotocol/sdk-js dependencies
   ```

2. The dependencies should show actual version numbers, not `workspace:*`:
   ```json
   {
     '@avaprotocol/types': '^2.2.9',
     '@grpc/grpc-js': '^1.11.3',
     // ... other dependencies
   }
   ```

### Troubleshooting

#### Workspace Dependencies Not Resolved

If you see `workspace:*` in the published package:

1. Make sure you're using one of the provided publishing methods
2. Check that the prepare script is running correctly
3. Verify that the dependent package versions are correct

#### Build Errors

If you encounter build errors:

1. Clean and rebuild:
   ```bash
   yarn clean
   yarn build
   ```

2. Check that all dependencies are properly installed:
   ```bash
   yarn install
   ```

#### Publishing Errors

If publishing fails:

1. Check that you're logged into npm:
   ```bash
   npm whoami
   ```

2. Verify package versions are correct
3. Check that the package name and scope are correct

### Best Practices

1. **Use `npm publish` for development** - The prepare script handles workspace dependencies automatically
2. **Use `yarn release` for production** - Proper versioning and changelog generation
3. **Test the build process** before publishing
4. **Verify published packages** after release
5. **Keep workspace dependencies in sync** during development

### Script Details

#### prepare-package.js
- Automatically runs during `npm publish`
- Replaces `workspace:*` with actual versions
- Restores original references after publishing

#### release.js
- Production release script
- Works with changesets for versioning
- Handles the complete release workflow
- Generates changelogs automatically

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
