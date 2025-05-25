import { Client } from "../packages/sdk-js/src";

/**
 * This example demonstrates how to use the runNodeWithInputs method
 * to execute different types of nodes with input variables.
 */
async function runExamples() {
  const client = new Client({
    endpoint: process.env.AVS_ENDPOINT || "localhost:50051",
  });

  if (process.env.API_KEY) {
    await client.authWithAPIKey({
      message: "Authentication request",
      apiKey: process.env.API_KEY
    });
  }

  try {
    console.log("Running BlockTrigger node example...");
    const blockTriggerResult = await client.runNodeWithInputs(
      "blockTrigger",
      { blockNumber: 12345 },
      {}
    );
    console.log("BlockTrigger Result:", blockTriggerResult);

    console.log("\nRunning CustomCode node example...");
    const customCodeResult = await client.runNodeWithInputs(
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
    console.log("CustomCode Result:", customCodeResult);

    console.log("\nRunning Branch node example...");
    const branchResult = await client.runNodeWithInputs(
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
    console.log("Branch Result:", branchResult);

    console.log("\nRunning Telegram node example...");
    const telegramResult = await client.runNodeWithInputs(
      "restApi",
      {
        url: "https://api.telegram.org/bot{{apContext.configVars.ap_notify_bot_token}}/sendMessage",
        method: "POST",
        body: JSON.stringify({
          chat_id: "{{telegramChatId}}",
          text: "Hello from runNodeWithInputs!",
        }),
        headers: { "content-type": "application/json" },
      },
      { telegramChatId: "your-chat-id" }
    );
    console.log("Telegram Result:", telegramResult);

    console.log("\nRunning error handling example...");
    try {
      await client.runNodeWithInputs(
        "customCode",
        {
          source: `
            if (typeof requiredVar === 'undefined') {
              throw new Error("requiredVar is required but not provided");
            }
            return { result: requiredVar };
          `,
        },
        {} // Missing requiredVar
      );
    } catch (error) {
      console.error("Error caught successfully:", (error as Error).message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

if (require.main === module) {
  runExamples().catch(console.error);
}
