import type { Client } from "@avaprotocol/sdk-js";
import { cleanupTemplateWorkflows } from "../utils/externalTemplate";

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
