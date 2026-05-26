module.exports = {
  // The mock-server / globalSetup / failureSummaryReporter from the
  // v3 test rig are not used by v4 tests — the v4 smoke suite is
  // pure unit code and the integration tests (when added) hit a
  // live aggregator over HTTP.
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
    "^@avaprotocol/sdk-js$": "<rootDir>/packages/sdk-js/src/index.ts",
    "^@avaprotocol/types$": "<rootDir>/packages/types/src/index.ts",
  },
};
