module.exports = {
  roots: ["<rootDir>/tests"], // Points to the `tests` folder
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"], // Matches test files
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    // Map workspace packages to their TypeScript source files for testing
    // This ensures tests run against the latest source code instead of built/published versions
    "^@avaprotocol/sdk-js$": "<rootDir>/packages/sdk-js/src/index.ts",
    "^@avaprotocol/types$": "<rootDir>/packages/types/src/index.ts",
    // Legacy mappings for internal imports
    "^@/sdk-js/(.*)$": "<rootDir>/packages/sdk-js/$1",
    "^@/grpc_codegen/(.*)$": "<rootDir>/grpc_codegen/$1",
    "^@/types/(.*)$": "<rootDir>/packages/types/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/tests/mocks/api.ts"],
};
