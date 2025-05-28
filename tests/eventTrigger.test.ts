import { describe, test, expect } from "@jest/globals";
import { TriggerFactory } from "@avaprotocol/sdk-js";
import { TriggerType } from "@avaprotocol/types";

describe("EventTrigger Tests", () => {
  describe("toRequest() error handling", () => {
    test("should throw error when config is missing", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          // Missing config property
        } as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Config is missing for event trigger"
      );
    });

    test("should throw error when config is null", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          config: null,
        } as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Config is missing for event trigger"
      );
    });

    test("should throw error when config is undefined", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          config: undefined,
        } as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Config is missing for event trigger"
      );
    });

    test("should throw error when expression is undefined", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          config: {
            expression: undefined,
            matcherList: [],
          },
        } as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Expression is undefined for event"
      );
    });

    test("should throw error when expression is missing", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          config: {
            // Missing expression property
            matcherList: [],
          },
        } as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Expression is undefined for event"
      );
    });

    test("should succeed with minimal valid config", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          config: {
            expression: "trigger1.data.topics[0] == '0x123'",
            matcherList: [],
          },
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request).toBeDefined();
      expect(request.getEvent()).toBeDefined();
      expect(request.getEvent()!.getConfig()).toBeDefined();
      expect(request.getEvent()!.getConfig()!.getExpression()).toBe(
        "trigger1.data.topics[0] == '0x123'"
      );
    });

    test("should succeed with config including matcherList", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          config: {
            expression: "trigger1.data.topics[0] == '0x123'",
            matcherList: [
              {
                type: "topics",
                valueList: [
                  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                  "",
                  "0x06DBb141d8275d9eDb8a7446F037D20E215188ff",
                ],
              },
            ],
          },
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request).toBeDefined();
      expect(request.getEvent()).toBeDefined();
      expect(request.getEvent()!.getConfig()).toBeDefined();
      expect(request.getEvent()!.getConfig()!.getExpression()).toBe(
        "trigger1.data.topics[0] == '0x123'"
      );
      expect(request.getEvent()!.getConfig()!.getMatcherList()).toHaveLength(1);
    });

    test("should handle empty matcherList", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          config: {
            expression: "trigger1.data.topics[0] == '0x123'",
            matcherList: [],
          },
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request.getEvent()!.getConfig()!.getMatcherList()).toHaveLength(0);
    });

    test("should handle null matcherList", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          config: {
            expression: "trigger1.data.topics[0] == '0x123'",
            matcherList: null,
          },
        } as any,
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request.getEvent()!.getConfig()!.getMatcherList()).toHaveLength(0);
    });

    test("should handle undefined matcherList", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          config: {
            expression: "trigger1.data.topics[0] == '0x123'",
            matcherList: undefined,
          },
        } as any,
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request.getEvent()!.getConfig()!.getMatcherList()).toHaveLength(0);
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