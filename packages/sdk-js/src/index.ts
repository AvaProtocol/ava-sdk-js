// @avaprotocol/sdk-js v4 — REST client for Ava Protocol's aggregator.
//
// The v3 gRPC surface has been removed; everything ships out of the
// v4 module. Top-level re-exports mirror what was previously under
// `import { v4 } from "@avaprotocol/sdk-js"` so consumers can import
// `Client`, `Chains`, `Triggers`, `Nodes`, etc. directly.
//
// @example
//   import { Client, Triggers, Nodes } from "@avaprotocol/sdk-js";
//   const client = new Client({ baseUrl: process.env.AVS_REST_URL! });
//   await client.auth.exchangeWithKey(process.env.TEST_PRIVATE_KEY!);
//
//   const wf = await client.workflows.create({
//     smartWalletAddress,
//     trigger: Triggers.cron({ name: "every5min", schedule: ["*/5 * * * *"] }),
//     nodes: [Nodes.customCode({ id: "step1", name: "step1", source: "return {ok:true};" })],
//     edges: [{ id: "e1", source: "trigger", target: "step1" }],
//     inputVariables: { settings: { name: "demo", runner: smartWalletAddress } },
//   });
//
//   for await (const evt of client.executions.stream(execId, { workflowId: wf.id })) {
//     console.log(evt.status);
//   }

export * from "./v4";
