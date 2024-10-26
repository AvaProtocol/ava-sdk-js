module.exports = {
  roots: ["<rootDir>/tests"], // Points to the `tests` folder
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"], // Matches test files
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
