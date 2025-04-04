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
    "^@/sdk-js/(.*)$": "<rootDir>/packages/sdk-js/$1",
    "^@/grpc_codegen/(.*)$": "<rootDir>/grpc_codegen/$1",
    "^@/types/(.*)$": "<rootDir>/packages/types/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/tests/mocks/api.ts"],
};
