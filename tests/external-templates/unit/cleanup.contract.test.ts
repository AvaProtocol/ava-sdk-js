import { assertNoLeakedWorkflows } from "../../utils/client";
import type { Client } from "@avaprotocol/sdk-js";
import { cleanupTemplateWorkflows } from "../../utils/externalTemplate";

test("recovers a lost create response by exact name across pages without cancelling other workflows", async () => {
  const list = jest
    .fn()
    .mockResolvedValueOnce({
      data: [{ id: "other", name: "unrelated" }],
      pageInfo: { hasNextPage: true, endCursor: "next" },
    })
    .mockResolvedValueOnce({
      data: [{ id: "created", name: "this-test" }],
      pageInfo: { hasNextPage: false },
    });
  const cancel = jest.fn().mockResolvedValue(undefined);
  const client = { workflows: { list, cancel } } as unknown as Client;
  await cleanupTemplateWorkflows({
    client,
    ids: [],
    walletAddress: "wallet",
    name: "this-test",
  });
  expect(list).toHaveBeenNthCalledWith(2, {
    smartWalletAddress: ["wallet"],
    limit: 100,
    after: "next",
  });
  expect(cancel).toHaveBeenCalledTimes(1);
  expect(cancel).toHaveBeenCalledWith("created");
});

test("cleans known ids without depending on discovery", async () => {
  const list = jest.fn();
  const cancel = jest.fn().mockResolvedValue(undefined);
  const client = { workflows: { list, cancel } } as unknown as Client;
  await cleanupTemplateWorkflows({
    client,
    ids: ["created"],
    walletAddress: "wallet",
    name: "this-test",
  });
  expect(list).not.toHaveBeenCalled();
  expect(cancel).toHaveBeenCalledWith("created");
});

test("retries discovery when a timed-out create becomes visible later", async () => {
  const list = jest
    .fn()
    .mockResolvedValueOnce({ data: [], pageInfo: { hasNextPage: false } })
    .mockResolvedValueOnce({
      data: [{ id: "late", name: "this-test" }],
      pageInfo: { hasNextPage: false },
    });
  const cancel = jest.fn().mockResolvedValue(undefined);
  const client = { workflows: { list, cancel } } as unknown as Client;
  await cleanupTemplateWorkflows({
    client,
    ids: [],
    walletAddress: "wallet",
    name: "this-test",
  });
  expect(list).toHaveBeenCalledTimes(2);
  expect(cancel).toHaveBeenCalledWith("late");
});

test("preserves the primary error and cancels recovered ids when later discovery fails", async () => {
  const list = jest
    .fn()
    .mockResolvedValueOnce({
      data: [{ id: "created", name: "this-test" }],
      pageInfo: { hasNextPage: true, endCursor: "next" },
    })
    .mockRejectedValueOnce(new Error("discovery failed"));
  const cancel = jest.fn().mockResolvedValue(undefined);
  const client = { workflows: { list, cancel } } as unknown as Client;
  const diagnostic = jest.spyOn(console, "error").mockImplementation(() => {});
  try {
    await expect(
      cleanupTemplateWorkflows({
        client,
        ids: [],
        walletAddress: "wallet",
        name: "this-test",
      }),
    ).resolves.toBeUndefined();
    expect(diagnostic).toHaveBeenCalled();
    expect(cancel).toHaveBeenCalledWith("created");
  } finally {
    diagnostic.mockRestore();
  }
});

test("failed cancellation is reported by the suite leak check", async () => {
  const cancel = jest
    .fn()
    .mockRejectedValue(new Error("test cancellation failure"));
  const client = { workflows: { cancel } } as unknown as Client;
  const diagnostic = jest.spyOn(console, "error").mockImplementation(() => {});
  try {
    await cleanupTemplateWorkflows({
      client,
      ids: ["created"],
      walletAddress: "wallet",
      name: "this-test",
    });
    expect(() => assertNoLeakedWorkflows()).toThrow("survived cleanup");
    expect(diagnostic).toHaveBeenCalled();
  } finally {
    diagnostic.mockRestore();
    // Keep this fault-injection case from contaminating unrelated tests.
    try {
      assertNoLeakedWorkflows();
    } catch {
      /* registry is cleared before it throws */
    }
  }
});
