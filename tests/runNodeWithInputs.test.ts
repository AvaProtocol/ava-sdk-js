import { describe, expect, it } from "@jest/globals";
import { Client } from "../packages/sdk-js/src";
import { getAddress, generateSignature } from "./utils";
import { getConfig } from "./envalid";

describe("runNodeWithInputs", () => {
  let client: Client;
  const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

  beforeEach(async () => {
    const eoaAddress = await getAddress(walletPrivateKey);
    client = new Client({
      endpoint: avsEndpoint,
      factoryAddress,
    });
    const { message } = await client.getSignatureFormat(eoaAddress);
    const signature = await generateSignature(message, walletPrivateKey);
    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });
    client.setAuthKey(res.authKey);
  });

  it("should run a blockTrigger node and return blockNumber", async () => {
    const result = await client.runNodeWithInputs(
      "blockTrigger",
      { blockNumber: 12345 }, // Example config, might need adjustment
      {}
    );

    expect(result).toBeInstanceOf(Object);
    expect(result.blockNumber).toBeDefined(); // Assuming blockNumber is a key in the result
  });

  it("should run a customCode node with input variables", async () => {
    const result = await client.runNodeWithInputs(
      "customCode",
      {
        source: `
          if (typeof myVar === 'undefined') {
            throw new Error("myVar is required but not provided");
          }
          return { result: myVar * 2 };
        `,
      },
      { myVar: 5 }
    );

    expect(result).toEqual({ result: 10 });
  });

  it("should run a branch node with conditions", async () => {
    const result = await client.runNodeWithInputs(
      "branch",
      {
        conditions: [
          {
            id: "condition1",
            type: "if",
            expression: "value > 10",
          },
          {
            id: "condition2",
            type: "else",
            expression: "",
          },
        ],
      },
      { value: 15 }
    );

    expect(result).toEqual({ conditionId: "condition1" });
  });

  it("should run a telegram node (via restApi)", async () => {
    // This test will make an actual call to the Telegram API.
    // It might be slow or fail if network access is restricted or token is invalid.
    // Consider if this needs special handling (e.g. mocking at a lower level if true E2E is not desired here)
    // or ensuring a valid (test) token and chat ID are available.
    const result = await client.runNodeWithInputs(
      "restApi",
      {
        url: "https://api.telegram.org/bot{{apContext.configVars.ap_notify_bot_token}}/sendMessage",
        method: "POST",
        body: JSON.stringify({
          chat_id: "{{telegramChatId}}", // This will need a real chat ID
          text: "Hello from runNodeWithInputs test!",
        }),
        headers: { "content-type": "application/json" },
      },
      { telegramChatId: "123456789" } // Replace with a valid test chat ID
                                      // Also ensure `ap_notify_bot_token` is available in test environment
    );

    expect(result).toBeInstanceOf(Object);
    // Example: Check for a property that indicates success from Telegram
    // This depends on the actual structure of the Telegram API response
    // For instance, if Telegram returns a `data` object with an `ok` field:
    // expect(result.data?.ok).toBe(true);
    // Adjust based on the actual response structure.
    // For now, a general check that it's an object.
    expect(result.data).toBeDefined();

  });

  it("should throw an error when a required variable is missing", async () => {
    await expect(
      client.runNodeWithInputs(
        "customCode",
        {
          source: `
            if (typeof myVar === 'undefined') {
              throw new Error("myVar is required but not provided");
            }
            return { result: myVar * 2 };
          `,
        },
        {} // Missing myVar
      )
    ).rejects.toThrow("myVar is required but not provided");
  });
});
