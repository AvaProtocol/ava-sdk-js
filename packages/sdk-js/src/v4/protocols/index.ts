// Protocol catalog re-export.
//
// Address/ABI/topic data lives in the standalone
// `@avaprotocol/protocols` package — the SDK ships a thin re-export
// so consumers don't have to install a second package and the
// existing `import { Protocols } from "@avaprotocol/sdk-js"` surface
// keeps working.
//
// Update `@avaprotocol/protocols` (https://github.com/AvaProtocol/protocols)
// when a new protocol address lands or a new chain comes online;
// bumping `@avaprotocol/protocols` minor version + republishing this
// SDK package picks it up automatically.

export { Protocols, type AbiFragment, type AddressByChain } from "@avaprotocol/protocols";
