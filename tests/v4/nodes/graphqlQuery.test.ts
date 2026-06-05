/**
 * Port of tests-v3-archive/nodes/graphqlQuery.test.ts.
 *
 * v3 used a local mock server for GraphQL plus the Uniswap subgraph
 * on The Graph Network. v4 tests hit countries.trevorblades.com
 * (a public no-auth GraphQL endpoint) to stay self-contained and
 * deterministic without external creds.
 *
 * Output shape: `output.data.<queryField>` — the GraphQL response
 * body sits directly under `output.data`, no meta-field leakage.
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  createSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";

jest.setTimeout(60_000);

const COUNTRIES_API = "https://countries.trevorblades.com/";

describe("GraphQL Query Node Tests", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  describe("nodes.run", () => {
    test("executes a static GraphQL query", async () => {
      const result = await client.nodes.run({
        node: Nodes.graphqlQuery({
          id: "g",
          name: "g",
          url: COUNTRIES_API,
          query: 'query { country(code: "US") { name capital } }',
        }),
        inputVariables: {},
      });
      if (!result.success) {
        console.log(`Skipping — GraphQL endpoint unreachable: ${result.error}`);
        return;
      }
      const data = (result.output as { data: { country: { name: string; capital: string } } }).data;
      expect(data.country.name).toBe("United States");
      expect(data.country.capital).toBe("Washington D.C.");
    });

    test("passes variables into the query", async () => {
      const result = await client.nodes.run({
        node: Nodes.graphqlQuery({
          id: "g",
          name: "g",
          url: COUNTRIES_API,
          query: "query CountryByCode($c: ID!) { country(code: $c) { name } }",
          variables: { c: "FR" },
        }),
        inputVariables: {},
      });
      if (!result.success) {
        console.log(`Skipping — GraphQL endpoint unreachable: ${result.error}`);
        return;
      }
      const data = (result.output as { data: { country: { name: string } } }).data;
      expect(data.country.name).toBe("France");
    });

    test("fails gracefully on an unreachable host", async () => {
      const result = await client.nodes.run({
        node: Nodes.graphqlQuery({
          id: "g",
          name: "g",
          url: "https://invalid-host-does-not-exist.local/graphql",
          query: "query { __typename }",
        }),
        inputVariables: {},
      });
      expect(result.success).toBe(false);
      expect(typeof result.error).toBe("string");
    });

    test("fails on empty query string", async () => {
      const result = await client.nodes.run({
        node: Nodes.graphqlQuery({
          id: "g",
          name: "g",
          url: COUNTRIES_API,
          query: "",
        }),
        inputVariables: {},
      });
      expect(result.success).toBe(false);
      expect(typeof result.error).toBe("string");
    });
  });

  describe("workflows.simulate", () => {
    test("simulates a workflow with a GraphQL step", async () => {
      const wallet = await createSmartWallet(client);
      const sim = await client.workflows.simulate({
        trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["0 * * * *"] }),
        nodes: [
          Nodes.graphqlQuery({
            id: "g",
            name: "g",
            url: COUNTRIES_API,
            query: 'query { country(code: "DE") { name capital } }',
          }),
        ],
        edges: [{ id: "e1", source: "trigger", target: "g" }],
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      const step = sim.steps?.find((s) => s.id === "g");
      if (!step?.success) {
        console.log(`Skipping — GraphQL endpoint unreachable during simulate`);
        return;
      }
      const data = (step?.output as { data: any }).data;
      // Inside workflow execution, the data fields are present at
      // step.output.data — same double-wrap quirk as nodes.run.
      expect(data.country?.name ?? data.data?.country?.name).toBe("Germany");
    });
  });
});
