#!/usr/bin/env node
/**
 * Post-process TypeDoc output so it slug-routes cleanly on the oak-website
 * MDX renderer:
 *
 *   1. The `export type { v4 } from "@avaprotocol/types"` re-export in
 *      src/v4/index.ts causes TypeDoc to emit the cross-package namespace
 *      under `@avaprotocol/namespaces/v4/type-aliases/*.mdx`. The `@`
 *      prefix doesn't slug-route. Flatten to `types/*.mdx`.
 *   2. Rewrite every link in every generated .mdx so the relocated paths
 *      still resolve. TypeDoc emits relative links keyed off the original
 *      tree depth — after the mv, depths change for some files.
 *   3. Drop the now-empty `@avaprotocol/` parent dir.
 *
 * Output is idempotent: running twice over the same tree is a no-op
 * because the renamed paths no longer contain the legacy prefix.
 */

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "docs-api");
const LEGACY_NAMESPACE = path.join(ROOT, "@avaprotocol", "namespaces", "v4");
const TYPES_TARGET = path.join(ROOT, "types");

if (!fs.existsSync(ROOT)) {
  console.error(`flatten-docs: ${ROOT} not found — run typedoc first`);
  process.exit(1);
}

// 1) Move the v4 namespace tree into ./types
if (fs.existsSync(LEGACY_NAMESPACE)) {
  fs.rmSync(TYPES_TARGET, { recursive: true, force: true });
  // The namespace dir contains an index.mdx and a type-aliases/ subdir.
  // Flatten by moving everything in type-aliases/ + the index to ./types.
  fs.mkdirSync(TYPES_TARGET, { recursive: true });
  const aliasesDir = path.join(LEGACY_NAMESPACE, "type-aliases");
  if (fs.existsSync(aliasesDir)) {
    for (const entry of fs.readdirSync(aliasesDir)) {
      fs.renameSync(path.join(aliasesDir, entry), path.join(TYPES_TARGET, entry));
    }
  }
  const indexPath = path.join(LEGACY_NAMESPACE, "index.mdx");
  if (fs.existsSync(indexPath)) {
    fs.renameSync(indexPath, path.join(TYPES_TARGET, "index.mdx"));
  }
  fs.rmSync(path.join(ROOT, "@avaprotocol"), { recursive: true, force: true });
}

// 2) Rewrite links in every generated file.
const REWRITES = [
  // `@avaprotocol/namespaces/v4/type-aliases/X.mdx` → `types/X.mdx`
  [/@avaprotocol\/namespaces\/v4\/type-aliases\//g, "types/"],
  [/@avaprotocol\/namespaces\/v4\//g, "types/"],
];

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile() && entry.name.endsWith(".mdx")) yield full;
  }
}

let rewritten = 0;
for (const file of walk(ROOT)) {
  const before = fs.readFileSync(file, "utf8");
  let after = before;
  for (const [pattern, replacement] of REWRITES) {
    after = after.replace(pattern, replacement);
  }
  if (after !== before) {
    fs.writeFileSync(file, after);
    rewritten++;
  }
}

console.log(`flatten-docs: rewrote ${rewritten} files; types/ tree at ${path.relative(process.cwd(), TYPES_TARGET)}`);
