/**
 * Workflow template helpers — produce minimal valid
 * `v4.CreateWorkflowRequest` payloads that can be CRUD'd in tests
 * without needing a funded smart wallet. One function per template
 * shape; payloads are plain objects from the OpenAPI types.
 */

import { Triggers, Nodes, type v4 } from "@avaprotocol/sdk-js";

/**
 * Default cron + customCode workflow. Used by tests that just need
 * a workflow to exist (CRUD/lifecycle tests). The cron interval is
 * deliberately wide enough that the operator won't fire it during
 * the test window.
 */
export function createFromTemplate(
  smartWalletAddress: string,
  overrides: Partial<v4.CreateWorkflowRequest> = {},
): v4.CreateWorkflowRequest {
  return {
    smartWalletAddress,
    name: overrides.name ?? "test-template",
    maxExecution: 1,
    trigger: Triggers.cron({
      id: "trigger",
      name: "hourly",
      schedule: ["0 * * * *"],
    }),
    nodes: [
      Nodes.customCode({
        id: "step1",
        name: "step1",
        source: "return {ok: true};",
      }),
    ],
    edges: [{ id: "e1", source: "trigger", target: "step1" }],
    inputVariables: {
      settings: {
        name: overrides.name ?? "test-template",
        runner: smartWalletAddress,
      },
    },
    ...overrides,
  };
}

/**
 * Manual-trigger variant — needed by tests that call
 * `client.workflows.trigger()`, since the manual trigger is the
 * only one the engine will fire on demand without operator
 * involvement.
 */
export function createManualFromTemplate(
  smartWalletAddress: string,
  overrides: Partial<v4.CreateWorkflowRequest> = {},
): v4.CreateWorkflowRequest {
  return {
    smartWalletAddress,
    name: overrides.name ?? "test-manual",
    maxExecution: 100,
    trigger: Triggers.manual({
      id: "trigger",
      name: "manualGo",
      lang: "json",
    }),
    nodes: [
      Nodes.customCode({
        id: "step1",
        name: "step1",
        source: "return {ok: true, ts: Date.now()};",
      }),
    ],
    edges: [{ id: "e1", source: "trigger", target: "step1" }],
    inputVariables: {
      settings: {
        name: overrides.name ?? "test-manual",
        runner: smartWalletAddress,
      },
    },
    ...overrides,
  };
}

/**
 * Schedule fields that keep a deployed fund-moving workflow from running.
 *
 * The template deploy tests create real automations on the funded runner,
 * whose grant covers their writes, so a trigger firing between create and
 * cleanup would move real funds, and a submitted UserOp cannot be unsent.
 * Starting a week out, allowing one run and expiring ten minutes later
 * leaves nothing live even when cleanup fails.
 */
export function heldSchedule(): { startAt: number; expiredAt: number; maxExecution: number } {
  const startAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  return { startAt, expiredAt: startAt + 10 * 60 * 1000, maxExecution: 1 };
}
