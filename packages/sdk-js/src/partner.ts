/**
 * Node-only entry: partner assertion minting.
 *
 *   import { mintPartnerAssertion } from "@avaprotocol/sdk-js/partner";
 *
 * Do not import this entry from browser/client bundles.
 */

export {
  mintPartnerAssertion,
  partnerAssertionHeaders,
  PARTNER_ASSERTION_HEADER,
  PARTNER_SCOPE_READ,
  type MintPartnerAssertionInput,
} from "./v4/partnerAssertion";
