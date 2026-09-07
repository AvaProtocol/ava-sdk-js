module.exports = {
  // Smoke tests are pure unit code; the rest of tests/v4 hits a live
  // aggregator over HTTP (docker compose locally, GitHub Actions in CI).
  roots: ["<rootDir>/tests/v4"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    // Resolve workspace packages to their TypeScript source so tests
    // run against the latest code, not the built dist/.
    // Subpath exports must be listed before the root package mapper.
    "^@avaprotocol/sdk-js/partner$": "<rootDir>/packages/sdk-js/src/partner.ts",
    "^@avaprotocol/sdk-js$": "<rootDir>/packages/sdk-js/src/index.ts",
    "^@avaprotocol/types$": "<rootDir>/packages/types/src/index.ts",
  },
  // Register shared jest matchers (e.g. toEqualIgnoreCase) for
  // every spec file without per-file boilerplate.
  setupFilesAfterEnv: ["<rootDir>/tests/utils/matchers.ts"],
};
