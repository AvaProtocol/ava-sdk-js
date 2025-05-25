import { describe, expect, it, jest } from "@jest/globals";
import { Client } from "../packages/sdk-js/src";
import { getTestClient } from "./utils";

describe("runNodeWithInputs", () => {
  let client: Client;

  beforeEach(async () => {
    client = await getTestClient();
  });

  it("should run a blockTrigger node and return blockNumber", async () => {
    const mockResponse = {
      getSuccess: jest.fn().mockReturnValue(true),
      getError: jest.fn().mockReturnValue(""),
      getResult: jest.fn().mockReturnValue({
        getFieldsMap: jest.fn().mockReturnValue(
          new Map([
            [
              "blockNumber",
              {
                hasNumberValue: jest.fn().mockReturnValue(true),
                getNumberValue: jest.fn().mockReturnValue(12345),
                hasStringValue: jest.fn().mockReturnValue(false),
                hasBoolValue: jest.fn().mockReturnValue(false),
                hasNullValue: jest.fn().mockReturnValue(false),
                hasListValue: jest.fn().mockReturnValue(false),
                hasStructValue: jest.fn().mockReturnValue(false),
              },
            ],
          ])
        ),
      }),
    };

    client.sendGrpcRequest = jest.fn().mockResolvedValue(mockResponse);

    const result = await client.runNodeWithInputs(
      "blockTrigger",
      { blockNumber: 12345 },
      {}
    );

    expect(result).toEqual({ blockNumber: 12345 });
    expect(client.sendGrpcRequest).toHaveBeenCalledWith(
      "runNodeWithInputs",
      expect.objectContaining({
        getNodeType: expect.any(Function),
        getNodeConfig: expect.any(Function),
        getInputVariables: expect.any(Function),
      }),
      undefined
    );
  });

  it("should run a customCode node with input variables", async () => {
    const mockResponse = {
      getSuccess: jest.fn().mockReturnValue(true),
      getError: jest.fn().mockReturnValue(""),
      getResult: jest.fn().mockReturnValue({
        getFieldsMap: jest.fn().mockReturnValue(
          new Map([
            [
              "result",
              {
                hasNumberValue: jest.fn().mockReturnValue(true),
                getNumberValue: jest.fn().mockReturnValue(10),
                hasStringValue: jest.fn().mockReturnValue(false),
                hasBoolValue: jest.fn().mockReturnValue(false),
                hasNullValue: jest.fn().mockReturnValue(false),
                hasListValue: jest.fn().mockReturnValue(false),
                hasStructValue: jest.fn().mockReturnValue(false),
              },
            ],
          ])
        ),
      }),
    };

    client.sendGrpcRequest = jest.fn().mockResolvedValue(mockResponse);

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
    const mockResponse = {
      getSuccess: jest.fn().mockReturnValue(true),
      getError: jest.fn().mockReturnValue(""),
      getResult: jest.fn().mockReturnValue({
        getFieldsMap: jest.fn().mockReturnValue(
          new Map([
            [
              "conditionId",
              {
                hasStringValue: jest.fn().mockReturnValue(true),
                getStringValue: jest.fn().mockReturnValue("condition1"),
                hasNumberValue: jest.fn().mockReturnValue(false),
                hasBoolValue: jest.fn().mockReturnValue(false),
                hasNullValue: jest.fn().mockReturnValue(false),
                hasListValue: jest.fn().mockReturnValue(false),
                hasStructValue: jest.fn().mockReturnValue(false),
              },
            ],
          ])
        ),
      }),
    };

    client.sendGrpcRequest = jest.fn().mockResolvedValue(mockResponse);

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
    const mockResponse = {
      getSuccess: jest.fn().mockReturnValue(true),
      getError: jest.fn().mockReturnValue(""),
      getResult: jest.fn().mockReturnValue({
        getFieldsMap: jest.fn().mockReturnValue(
          new Map([
            [
              "data",
              {
                hasStructValue: jest.fn().mockReturnValue(true),
                getStructValue: jest.fn().mockReturnValue({
                  getFieldsMap: jest.fn().mockReturnValue(
                    new Map([
                      [
                        "ok",
                        {
                          hasBoolValue: jest.fn().mockReturnValue(true),
                          getBoolValue: jest.fn().mockReturnValue(true),
                          hasStringValue: jest.fn().mockReturnValue(false),
                          hasNumberValue: jest.fn().mockReturnValue(false),
                          hasNullValue: jest.fn().mockReturnValue(false),
                          hasListValue: jest.fn().mockReturnValue(false),
                          hasStructValue: jest.fn().mockReturnValue(false),
                        },
                      ],
                    ])
                  ),
                }),
                hasStringValue: jest.fn().mockReturnValue(false),
                hasNumberValue: jest.fn().mockReturnValue(false),
                hasBoolValue: jest.fn().mockReturnValue(false),
                hasNullValue: jest.fn().mockReturnValue(false),
                hasListValue: jest.fn().mockReturnValue(false),
              },
            ],
          ])
        ),
      }),
    };

    client.sendGrpcRequest = jest.fn().mockResolvedValue(mockResponse);

    const result = await client.runNodeWithInputs(
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
      { telegramChatId: "123456789" }
    );

    expect(result).toEqual({ data: { ok: true } });
  });

  it("should throw an error when a required variable is missing", async () => {
    const mockResponse = {
      getSuccess: jest.fn().mockReturnValue(false),
      getError: jest.fn().mockReturnValue("myVar is required but not provided"),
      getResult: jest.fn().mockReturnValue(null),
    };

    client.sendGrpcRequest = jest.fn().mockResolvedValue(mockResponse);

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
