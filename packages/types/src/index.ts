// @avaprotocol/types v4 — type definitions for the REST API.
//
// All types are generated from `openapi/openapi.yaml` (vendored copy
// of the engine's spec). The hand-curated aliases in `v4.ts` are
// promoted to top-level here so callers can `import type { Workflow }
// from "@avaprotocol/types"` without indirection.
//
// The legacy v3 type bag (Workflow class shape, Trigger/Node enums,
// gRPC-derived API types) has been removed alongside the SDK's gRPC
// surface. Callers still on v3 should pin
// `@avaprotocol/types@^2` until they migrate.

export * from "./v4";

// Re-exported as a namespace too, for the `import { v4 } from
// "@avaprotocol/types"` pattern some downstream consumers documented
// during the migration window.
export * as v4 from "./v4";

// Generated path/operation/component types in case callers want to
// reach the raw openapi-typescript output (e.g., to build a fully
// typed alternate client).
export type { paths, operations, components } from "./openapi.gen";
