import * as fs from "node:fs";
import * as path from "node:path";

// The download script is CJS. Babel-jest still exposes module.exports.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { stripAllowContractRecipientDefaults } = require("../../../scripts/openapi-download.js") as {
  stripAllowContractRecipientDefaults: (yaml: string) => { yaml: string; stripped: number };
};

const VENDORED = path.resolve(__dirname, "../../../packages/types/openapi/openapi.yaml");
const GENERATED = path.resolve(__dirname, "../../../packages/types/src/openapi.gen.ts");

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

  test("strips the default wherever it sits among the property's keys", () => {
    const yaml = [
      "allowContractRecipient:",
      "  default: false",
      "  type: boolean",
      "nested:",
      "  allowContractRecipient:",
      "    type: boolean",
      "    description: |",
      "      Omitted means false.",
      "      default: false",
      "    default: false",
      "  after: 1",
      "",
    ].join("\n");

    const out = stripAllowContractRecipientDefaults(yaml);

    expect(out.stripped).toBe(2);
    expect(out.yaml).toBe(
      [
        "allowContractRecipient:",
        "  type: boolean",
        "nested:",
        "  allowContractRecipient:",
        "    type: boolean",
        "    description: |",
        "      Omitted means false.",
        "      default: false",
        "  after: 1",
        "",
      ].join("\n"),
    );
  });

  test("the vendored spec has already had those defaults removed", () => {
    const yaml = fs.readFileSync(VENDORED, "utf8");
    expect(stripAllowContractRecipientDefaults(yaml).stripped).toBe(0);
  });

  // The point of the strip: openapi-typescript makes a field with a default
  // required. Whatever shape the gateway spec takes, the generated field
  // must stay optional, so callers can omit it and get the gateway's false.
  test("allowContractRecipient stays optional in the generated types", () => {
    const generated = fs.readFileSync(GENERATED, "utf8");
    const fields = [...generated.matchAll(/readonly allowContractRecipient(\??):/g)];
    expect(fields.length).toBeGreaterThan(0);
    expect(fields.filter((field) => field[1] !== "?")).toEqual([]);
  });
});
