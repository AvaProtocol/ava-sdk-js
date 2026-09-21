#!/usr/bin/env node
/**
 * Pull EigenLayer-AVS staging OpenAPI, then apply the one local patch
 * `openapi-typescript` needs. Server facts (GET 7702 is missing|delegated,
 * never pending) live on the gateway spec — merge that first so a raw
 * download does not silently lose them.
 *
 * Local patch: drop `default: false` on `allowContractRecipient`. The
 * gateway still defaults omitted to false; the YAML default makes
 * openapi-typescript emit a required field.
 */
const fs = require("node:fs");
const path = require("node:path");

const SPEC_URL =
  process.env.OPENAPI_SPEC_URL ||
  "https://raw.githubusercontent.com/AvaProtocol/EigenLayer-AVS/staging/api/openapi.yaml";
const OUT = path.join(__dirname, "..", "packages/types/openapi/openapi.yaml");

const ALLOW_CONTRACT_DEFAULT = new RegExp(
  String.raw`(allowContractRecipient:\n[ \t]+type: boolean\n)[ \t]+default: false\n`,
  "g",
);

async function main() {
  const res = await fetch(SPEC_URL);
  if (!res.ok) {
    throw new Error(`GET ${SPEC_URL} → ${res.status} ${res.statusText}`);
  }
  let yaml = await res.text();
  if (!yaml.includes("openapi:")) {
    throw new Error(`GET ${SPEC_URL} did not return an OpenAPI document`);
  }

  if (!/GET returns `missing` or `delegated` only/.test(yaml)) {
    console.warn(
      "warning: gateway spec does not say GET 7702 status is missing|delegated, never pending.\n" +
        "  Merge AvaProtocol/EigenLayer-AVS#805 (or equivalent) before relying on yarn openapi-download;\n" +
        "  otherwise the next client will rediscover the 202-polling bug.",
    );
  }

  const n = [...yaml.matchAll(ALLOW_CONTRACT_DEFAULT)].length;
  yaml = yaml.replace(ALLOW_CONTRACT_DEFAULT, "$1");
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, yaml);
  console.log(
    `wrote ${path.relative(process.cwd(), OUT)} from ${SPEC_URL}` +
      (n ? ` (stripped ${n} allowContractRecipient default: false)` : ""),
  );
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
