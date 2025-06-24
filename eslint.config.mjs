import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { 
    ignores: [
      "**/dist/**",
      "**/grpc_codegen/**",
      "**/*.d.ts",
      "**/*_pb.js",
      "**/*_grpc_pb.js"
    ]
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "max-len": ["error", { code: 256, ignoreUrls: true }],
    },
  },
];
