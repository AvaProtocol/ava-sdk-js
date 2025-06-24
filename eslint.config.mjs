import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { 
    ignores: [
      "**/dist/**",           // Build output directories
      "**/grpc_codegen/**",   // Generated gRPC code
      "**/*.d.ts",            // TypeScript declaration files
      "**/*_pb.js",           // Protocol buffer generated files
      "**/*_grpc_pb.js"       // gRPC generated files
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
