import { describe, test, expect } from "@jest/globals";
import { TriggerFactory } from "@avaprotocol/sdk-js";
import { TriggerType } from "@avaprotocol/types";

describe("EventTrigger Tests", () => {
  describe("toRequest() error handling", () => {
    test("should throw error when queriesList is missing", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          // Missing queriesList property
        } as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Queries array is required for event"
      );
    });

    test("should throw error when queriesList is null", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          queriesList: null,
        } as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Queries array is required for event"
      );
    });

    test("should throw error when queriesList is empty", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          queriesList: [],
        },
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Queries array is required for event"
      );
    });

    test("should succeed with minimal valid config", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          queriesList: [
            {
              addressesList: ["0xA0b86a33E6441e6067ec0da4Cc2C8ae77d85e7b1"],
              topicsList: [
                {
                  valuesList: [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
                  ]
                }
              ],
            }
          ],
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request).toBeDefined();
      expect(request.getEvent()).toBeDefined();
      expect(request.getEvent()!.getConfig()).toBeDefined();
      expect(request.getEvent()!.getConfig()!.getQueriesList()).toHaveLength(1);
    });

    test("should succeed with complex query including topics and addresses", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          queriesList: [
            {
              addressesList: ["0xA0b86a33E6441e6067ec0da4Cc2C8ae77d85e7b1"],
              topicsList: [
                {
                  valuesList: [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                    null,
                    "0x06DBb141d8275d9eDb8a7446F037D20E215188ff",
                  ]
                }
              ],
              maxEventsPerBlock: 100,
            }
          ],
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request).toBeDefined();
      expect(request.getEvent()).toBeDefined();
      expect(request.getEvent()!.getConfig()).toBeDefined();
      expect(request.getEvent()!.getConfig()!.getQueriesList()).toHaveLength(1);
      
      const query = request.getEvent()!.getConfig()!.getQueriesList()[0];
      expect(query.getAddressesList()).toEqual(["0xA0b86a33E6441e6067ec0da4Cc2C8ae77d85e7b1"]);
      expect(query.getTopicsList()).toHaveLength(1);
      expect(query.getMaxEventsPerBlock()).toBe(100);
    });

    test("should handle multiple queries for FROM-OR-TO scenario", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          queriesList: [
            {
              // Query 1: Transfer FROM specific address
              addressesList: ["0xA0b86a33E6441e6067ec0da4Cc2C8ae77d85e7b1"],
              topicsList: [
                {
                  valuesList: [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                    "0x06DBb141d8275d9eDb8a7446F037D20E215188ff", // FROM
                    null // Any TO
                  ]
                }
              ],
              maxEventsPerBlock: 50,
            },
            {
              // Query 2: Transfer TO specific address
              addressesList: ["0xA0b86a33E6441e6067ec0da4Cc2C8ae77d85e7b1"],
              topicsList: [
                {
                  valuesList: [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                    null, // Any FROM
                    "0x06DBb141d8275d9eDb8a7446F037D20E215188ff" // TO
                  ]
                }
              ],
              maxEventsPerBlock: 50,
            }
          ],
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request.getEvent()!.getConfig()!.getQueriesList()).toHaveLength(2);
    });

    test("should handle empty addressesList", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          queriesList: [
            {
              addressesList: [],
              topicsList: [
                {
                  valuesList: [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
                  ]
                }
              ],
            }
          ],
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      const query = request.getEvent()!.getConfig()!.getQueriesList()[0];
      expect(query.getAddressesList()).toEqual([]);
    });

    test("should handle empty topicsList", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          queriesList: [
            {
              addressesList: ["0xA0b86a33E6441e6067ec0da4Cc2C8ae77d85e7b1"],
              topicsList: [],
            }
          ],
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      const query = request.getEvent()!.getConfig()!.getQueriesList()[0];
      expect(query.getTopicsList()).toEqual([]);
    });
  });

  describe("data validation edge cases", () => {
    test("should throw error when trigger data is completely missing", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: undefined as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Trigger data is missing for event"
      );
    });

    test("should throw error when trigger data is null", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: null as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Trigger data is missing for event"
      );
    });
  });
}); 