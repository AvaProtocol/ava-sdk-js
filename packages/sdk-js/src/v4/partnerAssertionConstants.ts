/**
 * Browser-safe partner-assertion constants (no Node APIs).
 * Safe to import from the root `@avaprotocol/sdk-js` package.
 *
 * Minting lives in `@avaprotocol/sdk-js/partner` (Node-only).
 */

/**
 * Header name for the short-lived Ed25519 partner assertion JWT accepted
 * by the AVS gateway (see EigenLayer-AVS `aggregator/rest/permission.go`).
 */
export const PARTNER_ASSERTION_HEADER = "X-Partner-Assertion";

/**
 * Partner scope for token metadata and preview wallet list/create.
 * Simulate / runNode / runTrigger require a user Bearer JWT instead.
 */
export const PARTNER_SCOPE_READ = "read";
