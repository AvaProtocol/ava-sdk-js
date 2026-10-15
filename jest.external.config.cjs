// External producer fixtures stay in their source repository.
module.exports = {
  ...require("./jest.config.cjs"),
  roots: ["<rootDir>/tests/external-templates"],
};
