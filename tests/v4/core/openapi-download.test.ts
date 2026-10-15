import * as fs from "node:fs";
import * as path from "node:path";

// The download script is CJS. Babel-jest still exposes module.exports.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { stripAllowContractRecipientDefaults } = require("../../../scripts/openapi-download.js") as {
  stripAllowContractRecipientDefaults: (yaml: string) => { yaml: string; stripped: number };
};

const VENDORED = path.resolve(__dirname, "../../../packages/types/openapi/openapi.yaml");

describe("openapi-download", () => {
  test("strips allowContractRecipient default: false and leaves other defaults", () => {
    const yaml = [
      "allowContractRecipient:",
      "  type: boolean",
      "  default: false",
      "anotherFlag:",
      "  type: boolean",
      "  default: false",
      "allowContractRecipient:",
      "        type: boolean",
      "        default: false",
      "",
    ].join("\n");

    const out = stripAllowContractRecipientDefaults(yaml);

    expect(out.stripped).toBe(2);
    expect(out.yaml).not.toMatch(/allowContractRecipient:\n[ \t]+type: boolean\n[ \t]+default: false/);
    expect(out.yaml).toContain("anotherFlag:\n  type: boolean\n  default: false");
    expect(out.yaml).toContain("allowContractRecipient:\n  type: boolean\n");
  });

  test("the vendored spec has already had those defaults removed", () => {
    const yaml = fs.readFileSync(VENDORED, "utf8");
    expect(stripAllowContractRecipientDefaults(yaml).stripped).toBe(0);
  });
});
