# Ava SDK for JavaScript/TypeScript

`ava-sdk-js` is the official TypeScript SDK for Ava Protocol's AVS.

> **3.0.0 is a REST-only rewrite.** The 2.x line spoke gRPC; the 3.x line speaks the aggregator gateway's `/api/v1/...` REST API. The `4.0.0-dev.X` versions on npm are pre-release iterations of this rewrite that we ultimately stabilized as `3.0.0` to keep semver continuity from 2.x — see [packages/sdk-js/CHANGELOG.md](./packages/sdk-js/CHANGELOG.md) for the full rationale. The sections below still describe the 2.x gRPC client; an updated quick-start for the 3.x REST client is tracked in a follow-up doc PR.

> **[2.x — archived]** `ava-sdk-js` was a simple, type-safe wrapper around gRPC designed to simplify integration with Ava Protocol's AVS. It enabled developers to interact with Ava Protocol efficiently, whether on the client-side or server-side, and provided full TypeScript support for a seamless development experience.

---

## Archived 2.x documentation

The sections below describe the 2.x gRPC client and are kept for users still on that line. The 3.x REST client documentation is tracked in a follow-up doc PR; in the meantime see the [packages/sdk-js/CHANGELOG.md](./packages/sdk-js/CHANGELOG.md) for what changed between 2.x and 3.x.

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
   # --subject must be the owner EOA address you want this admin key bound to.
   # For local tests, use the wallet derived from TEST_PRIVATE_KEY (default below).
   ./out/ap create-api-key --config ./config/aggregator-base.yaml --role=admin --subject=<OWNER_EOA_ADDRESS>
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

Versioning uses [changesets](https://github.com/changesets/changesets). Do **not** run `yarn version` on `staging` — versions move only on the Version PR.

1. Land the change on `staging` with a changeset (`.changeset/*.md`).
2. Squash-merge `staging` → `main`.
3. The `Release` workflow (`.github/workflows/release.yml`) opens (or updates) a **Version Packages** PR that runs `changeset version` — bumps `packages/*/package.json` and CHANGELOGs. Review and merge it.
4. That merge re-runs the same workflow with no pending changesets and publishes to npm via `changeset publish` (stable → `latest`, pre-release → its identifier).
5. `/sync-main` so `staging` picks up the version bump.

npm auth is [Trusted Publishing](https://docs.npmjs.com/trusted-publishers) (OIDC) — no `NPM_TOKEN`. Configure once per package (`@avaprotocol/sdk-js` and `@avaprotocol/types`): npm package settings → Trusted Publishers → GitHub Actions → repo `AvaProtocol/ava-sdk-js`, workflow `release.yml`.

### Publishing manually (escape hatch)

If you need to publish without the GitHub Action (emergency release from a machine with `npm login`):

```bash
yarn version-packages          # consumes pending changesets
yarn build
npm whoami
yarn release                   # yarn build && changeset publish
```

`scripts/publish-packages.js` remains as a local interactive fallback (`yarn publish` / `yarn publish:dry-run`).

## Contributing

We welcome contributions! Feel free to submit pull requests or open issues for any bugs or feature requests.

## License

This project is licensed under the Apache 2.0 License. See the LICENSE file for more details.
