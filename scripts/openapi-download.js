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

async function main() {
  const res = await fetch(SPEC_URL);
  if (!res.ok) {
    throw new Error(`GET ${SPEC_URL} → ${res.status} ${res.statusText}`);
  }
  const yaml = await res.text();
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

  const stripped = stripAllowContractRecipientDefaults(yaml);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, stripped.yaml);
  console.log(
    `wrote ${path.relative(process.cwd(), OUT)} from ${SPEC_URL}` +
      (stripped.stripped
        ? ` (stripped ${stripped.stripped} allowContractRecipient default: false)`
        : ""),
  );
}

/**
 * Drop `default: false` under `allowContractRecipient`. openapi-typescript
 * treats that default as required. The gateway still treats an omitted
 * field as false.
 *
 * Line-based, not one fixed shape: the `default:` line is removed wherever
 * it sits among the property's own keys (before or after `type:`, with a
 * `description:` between). Only the property's direct keys count, so text
 * inside a nested block, such as a multi-line description, is left alone.
 */
function stripAllowContractRecipientDefaults(yaml) {
  const out = [];
  let stripped = 0;
  // Indent of the `allowContractRecipient:` key while inside its block, and
  // of its direct keys once the first one is seen.
  let keyIndent = -1;
  let childIndent = -1;
  for (const line of yaml.split("\n")) {
    const trimmed = line.trim();
    const indent = line.length - line.trimStart().length;
    if (keyIndent >= 0 && trimmed !== "") {
      if (indent <= keyIndent) {
        keyIndent = -1;
        childIndent = -1;
      } else {
        if (childIndent < 0) childIndent = indent;
        if (indent === childIndent && /^default:\s*false\s*$/.test(trimmed)) {
          stripped += 1;
          continue;
        }
      }
    }
    if (/^allowContractRecipient:\s*$/.test(trimmed)) {
      keyIndent = indent;
      childIndent = -1;
    }
    out.push(line);
  }
  return { yaml: out.join("\n"), stripped };
}

module.exports = { stripAllowContractRecipientDefaults };

if (require.main === module) {
  main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}
