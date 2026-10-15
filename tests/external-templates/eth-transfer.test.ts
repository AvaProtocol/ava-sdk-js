import { randomUUID } from "node:crypto";
import type { Client, v4 } from "@avaprotocol/sdk-js";
import {
  getIsolatedClient,
  getFundedClient,
  getFundedWallet,
  getClient,
} from "../utils/client";
import { signTypedDataWithEthers } from "../utils/sessionGrant";
import { isLocalGateway } from "../utils/stubServer";
import {
  compileExternalTemplate,
  compileExternalTemplateAsync,
  templateTestConfig,
  startTemplateReportServer,
  cleanupTemplateWorkflows,
  TEMPLATE_TEST,
  TEMPLATE_MODE,
  TEMPLATE_STATUS,
  type TemplateReport,
} from "../utils/externalTemplate";

import {
  templateRunBudget,
  TEMPLATE_TIMING,
} from "../utils/templateTestLifecycle";

jest.setTimeout(TEMPLATE_TIMING.jestMs);

describe("External ETH transfer template", () => {
  let client: Client;
  let runner: string;
  let recipient: string;
  let report: Awaited<ReturnType<typeof startTemplateReportServer>>;

  beforeAll(async () => {
    if (!isLocalGateway())
      throw new Error("This suite requires a local Sepolia gateway");
    const isolated = await getIsolatedClient();
    client = isolated.client;
    recipient = isolated.owner;
    runner = (await client.wallets.create({ salt: "0" })).address;
  });
  beforeEach(async () => {
    report = await startTemplateReportServer();
  });
  afterEach(async () => {
    await report?.close();
  });

  test("unfunded simulation skips the transfer and produces the producer's report", async () => {
    const { contract } = templateTestConfig();
    const compiled = compileExternalTemplate({
      runner,
      recipient,
      amountLabel: contract.unfunded.amountLabel,
      notifyUrl: report.url,
      notifyAuthorization: report.authorization,
    });
    const simulated = await client.workflows.simulate({
      ...compiled.simulate,
      authorizationMode: TEMPLATE_MODE.report,
    });
    expect(simulated.status).toBe(TEMPLATE_STATUS.success);
    expect(simulated.steps?.map((step) => step.id)).toContain(
      contract.reportNodeId,
    );
    expect(simulated.steps?.map((step) => step.id)).not.toContain(
      contract.transferNodeId,
    );
    expect(report.reports.length).toBeGreaterThan(0);
    expect(report.reports.at(-1)?.body.executions).toEqual([]);
    expect(report.reports.at(-1)?.body.summary).toContain(
      contract.unfunded.summaryIncludes,
    );
    expect(report.reports.at(-1)?.body.errors).toEqual(
      expect.arrayContaining([
        expect.stringContaining(contract.unfunded.errorIncludes),
      ]),
    );
  });

  test("matches the producer's optional-delivery contract", () => {
    const { contract } = templateTestConfig();
    const compiled = compileExternalTemplate({
      runner,
      recipient,
      amountLabel: TEMPLATE_TEST.amount,
    });
    expect(
      compiled.create.nodes.some((node) => node.id === contract.reportNodeId),
    ).toBe(contract.withoutDeliveryHasReport);
    expect(compiled.create.nodes.map((node) => node.id)).toContain(
      contract.transferNodeId,
    );
  });

  const liveTest = process.env.TEMPLATE_LIVE === "1" ? test : test.skip;
  liveTest(
    "executes a tiny Sepolia transfer and retrieves its stored report",
    async () => {
      const budget = templateRunBudget();
      let cleanup: (() => Promise<void>) | undefined;
      try {
        const { contract } = templateTestConfig();
        const funded = await getFundedClient({
          defaultTimeoutMs: TEMPLATE_TIMING.requestMs,
          fetchImpl: budget.fetchImpl,
        });
        const wallet = await getFundedWallet(
          funded.client,
          process.env.FUNDED_WALLET_SALT ?? "0",
        );
        if (!wallet)
          throw new Error("The funded Sepolia fixture wallet is unavailable");
        const compiled = await compileExternalTemplateAsync(
          {
            runner: wallet.address,
            recipient: funded.owner,
            amountLabel: TEMPLATE_TEST.amount,
            notifyUrl: report.url,
            notifyAuthorization: report.authorization,
          },
          { signal: budget.signal },
        );
        const simulated = await funded.client.workflows.simulate({
          ...compiled.simulate,
          authorizationMode: TEMPLATE_MODE.report,
        });
        expect(simulated.status).toBe(TEMPLATE_STATUS.success);
        const transfer = simulated.steps?.find(
          (step) => step.id === contract.transferNodeId,
        );
        expect(transfer?.success).toBe(true);
        expect(JSON.stringify(transfer?.output)).toContain(
          TEMPLATE_TEST.amountWei,
        );
        const required = simulated.authorization?.required;
        if (!required)
          throw new Error(
            "The transfer simulation did not return its permission requirement",
          );
        expect(
          required.nativeRecipients?.map((address) => address.toLowerCase()),
        ).toContain(funded.owner.toLowerCase());
        // Checked by tsc; Jest's Babel transform does not enforce this assignment.
        const addition: NonNullable<
          Parameters<Client["policies"]["grant"]>[1]["add"]
        > = required;
        // Shared grant additions persist; see tests/README.md before changing scope.
        if (simulated.authorization?.status !== TEMPLATE_STATUS.covered) {
          await funded.client.policies.grant(
            wallet.address,
            {
              chainId: TEMPLATE_TEST.chainId,
              agentLabel: "Ava",
              justification: "External template integration test",
              expiresInSeconds: 7 * 86400,
              add: addition,
            },
            signTypedDataWithEthers(funded.privateKey),
          );
        }
        report.reports.length = 0;
        const ids: string[] = [];
        const name = "external-template-" + randomUUID();
        const cleanupClient = getClient({
          token: funded.client.token,
          defaultTimeoutMs: TEMPLATE_TIMING.cleanupRequestMs,
          fetchImpl: budget.cleanupFetchImpl,
        });
        cleanup = () =>
          cleanupTemplateWorkflows({
            client: cleanupClient,
            ids,
            walletAddress: wallet.address,
            name,
          });
        const workflow = await funded.client.workflows.create({
          ...compiled.create,
          name,
        });
        ids.push(workflow.id);
        const triggered = await funded.client.workflows.trigger(workflow.id, {
          triggerType: TEMPLATE_MODE.manual,
          triggerOutput: { data: {} },
          isBlocking: true,
        });
        expect(triggered.status).toBe(TEMPLATE_STATUS.success);
        expect(triggered.error ?? "").toBe("");
        const execution = await funded.client.executions.retrieve(
          triggered.executionId,
          { workflowId: workflow.id },
        );
        expect(execution.status).toBe(TEMPLATE_STATUS.success);
        const stored = (
          execution as v4.Execution & { summary?: TemplateReport }
        ).summary;
        expect(stored?.body.status).toBe(TEMPLATE_STATUS.success);
        expect(stored?.body.executions).toHaveLength(1);
        expect(stored?.body.executions[0].description).toContain(
          TEMPLATE_TEST.amount + " ETH",
        );
        expect(stored?.body.executions[0].txHash).toMatch(
          /^0x[0-9a-fA-F]{64}$/,
        );
        expect(report.reports.length).toBeGreaterThan(0);
        expect(stored?.subject).toBe(report.reports.at(-1)?.subject);
        expect(stored?.body).toEqual(report.reports.at(-1)?.body);
        const status = await funded.client.executions.getStatus(
          triggered.executionId,
          { workflowId: workflow.id },
        );
        expect(
          (status as typeof status & { summary?: TemplateReport }).summary,
        ).toEqual(stored);
      } finally {
        budget.beginCleanup();
        try {
          await cleanup?.();
        } finally {
          budget.dispose();
        }
      }
    },
  );
});
