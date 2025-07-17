import { describe, test, expect } from "@jest/globals";
import Step from "../../packages/sdk-js/src/models/step";

describe("Step Class Tests", () => {
  describe("fromResponse method - Input Field Handling", () => {
    test("should handle protobuf instance with input field (original error case)", () => {
      // Mock a protobuf instance (as would come from gRPC response)
      const mockProtobufStep = {
        getId: () => "step-1",
        getType: () => "CUSTOM_CODE",
        getName: () => "TestCustomCode",
        getSuccess: () => true,
        getError: () => "",
        getLog: () => "Execution completed",
        getInputsList: () => ["trigger_data", "previous_step_output"],
        getStartAt: () => 1640995200000,
        getEndAt: () => 1640995205000,
        getOutputDataCase: () => 7, // CUSTOM_CODE case
        getCustomCode: () => ({
          hasData: () => true,
          getData: () => ({
            // Mock simple protobuf Value
            kind: "structValue",
            structValue: {
              fields: {
                result: { kind: "stringValue", stringValue: "success" },
                count: { kind: "numberValue", numberValue: 42 }
              }
            }
          })
        }),
        // This is the key part - input field exists as property (not a method!)
        input: {
          // Mock google.protobuf.Value structure as plain object
          kind: "structValue",
          structValue: {
            fields: {
              testParam: { kind: "stringValue", stringValue: "test-value" },
              numParam: { kind: "numberValue", numberValue: 123 },
              boolParam: { kind: "boolValue", boolValue: true }
            }
          }
        }
      };

      // This should NOT throw "hasInput is not a function" error
      expect(() => {
        const step = Step.fromResponse(mockProtobufStep as any);
        expect(step.id).toBe("step-1");
        expect(step.name).toBe("TestCustomCode");
        expect(step.success).toBe(true);
        expect(step.input).toBeDefined();
        console.log("✅ Protobuf instance handled successfully");
      }).not.toThrow();
    });

    test("should handle plain JavaScript object (from .toObject())", () => {
      // Mock a plain JavaScript object (as would come from .toObject() call)
      const mockPlainObjectStep = {
        id: "step-2",
        type: "REST_API",
        name: "TestRestAPI",
        success: true,
        error: "",
        log: "API call completed",
        inputsList: ["api_endpoint", "auth_token"],
        startAt: 1640995200000,
        endAt: 1640995205000,
        // Plain object input (already converted from protobuf)
        input: {
          url: "https://api.example.com/data",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer token123"
          },
          body: {
            query: "test query",
            limit: 10
          }
        },
        // Mock output data
        restApi: {
          data: {
            status: "success",
            results: [1, 2, 3]
          }
        }
        // Note: No getId, getType methods - this is a plain object
      };

      // This should NOT throw any method errors
      expect(() => {
        const step = Step.fromResponse(mockPlainObjectStep as any);
        expect(step.id).toBe("step-2");
        expect(step.name).toBe("TestRestAPI");
        expect(step.success).toBe(true);
        expect(step.input).toBeDefined();
        expect(step.input.url).toBe("https://api.example.com/data");
        expect(step.input.method).toBe("POST");
        expect(step.input.body.query).toBe("test query");
        console.log("✅ Plain object handled successfully");
      }).not.toThrow();
    });

    test("should handle step without input field", () => {
      // Mock a step that has no input data
      const mockStepNoInput = {
        getId: () => "step-3",
        getType: () => "BLOCK_TRIGGER",
        getName: () => "BlockTrigger",
        getSuccess: () => true,
        getError: () => "",
        getLog: () => "Block detected",
        getInputsList: () => [],
        getStartAt: () => 1640995200000,
        getEndAt: () => 1640995205000,
        getOutputDataCase: () => 1, // BLOCK_TRIGGER case
        getBlockTrigger: () => ({
          toObject: () => ({
            blockNumber: 12345678,
            blockHash: "0xabc123...",
            timestamp: 1640995200
          })
        })
        // No input field - this is common for triggers
      };

      expect(() => {
        const step = Step.fromResponse(mockStepNoInput as any);
        expect(step.id).toBe("step-3");
        expect(step.name).toBe("BlockTrigger");
        expect(step.success).toBe(true);
        expect(step.input).toBeUndefined();
        console.log("✅ Step without input handled successfully");
      }).not.toThrow();
    });

    test("should reproduce the original simulateWorkflow error scenario", () => {
      // This reproduces the exact scenario that was failing:
      // simulateWorkflow -> getExecution -> Step.fromResponse -> "hasInput is not a function"
      
      const mockExecutionStepsFromSimulate = [
        // Event trigger step (as plain object from .toObject())
        {
          id: "event-trigger-step",
          type: "EVENT_TRIGGER",
          name: "TransferEvent",
          success: true,
          error: "",
          log: "Event detected successfully",
          inputsList: [],
          startAt: 1640995200000,
          endAt: 1640995201000,
          input: {
            contractAddress: "0x1234567890123456789012345678901234567890",
            eventSignature: "Transfer(address,address,uint256)",
            filterParams: {
              from: "0xabcdef...",
              to: "0x123456..."
            }
          },
          eventTrigger: {
            evmLog: {
              address: "0x1234567890123456789012345678901234567890",
              topics: ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"],
              data: "0x0000000000000000000000000000000000000000000000000de0b6b3a7640000"
            }
          }
        },
        // Custom code node step (as plain object from .toObject())
        {
          id: "custom-code-step",
          type: "CUSTOM_CODE",
          name: "ProcessTransfer",
          success: true,
          error: "",
          log: "Custom code executed successfully",
          inputsList: ["Transfer_Event.output", "Transfer_Event.input"],
          startAt: 1640995201000,
          endAt: 1640995205000,
          input: {
            codeLanguage: "javascript",
            sourceCode: "console.log('Processing transfer...'); return { processed: true };",
            environment: "node18",
            timeout: 30000,
            libraries: ["lodash", "moment"]
          },
          customCode: {
            data: {
              kind: "structValue",
              structValue: {
                fields: {
                  processed: { kind: "boolValue", boolValue: true },
                  timestamp: { kind: "numberValue", numberValue: 1640995205000 }
                }
              }
            }
          }
        }
      ];

      // This was throwing "TypeError: step.hasInput is not a function"
      expect(() => {
        const processedSteps = mockExecutionStepsFromSimulate.map(stepData => {
          // This is the exact call that was failing
          const step = Step.fromResponse(stepData as any);
          return step;
        });

        expect(processedSteps).toHaveLength(2);
        
        // Verify both steps processed correctly
        expect(processedSteps[0].type).toBe("EVENT_TRIGGER");
        expect(processedSteps[0].input).toBeDefined();
        expect(processedSteps[0].input.contractAddress).toBe("0x1234567890123456789012345678901234567890");
        
        expect(processedSteps[1].type).toBe("CUSTOM_CODE");
        expect(processedSteps[1].input).toBeDefined();
        expect(processedSteps[1].input.codeLanguage).toBe("javascript");
        
        console.log("✅ Original error scenario now works!");
      }).not.toThrow();
    });

    test("should handle null/undefined input gracefully", () => {
      const mockStepWithNullInput = {
        getId: () => "step-null",
        getType: () => "ETH_TRANSFER",
        getName: () => "ETHTransfer",
        getSuccess: () => true,
        getError: () => "",
        getLog: () => "Transfer completed",
        getInputsList: () => ["wallet_address", "amount"],
        getStartAt: () => 1640995200000,
        getEndAt: () => 1640995205000,
        getOutputDataCase: () => 3,
        getEthTransfer: () => ({
          toObject: () => ({
            transactionHash: "0xdef456...",
            gasUsed: 21000,
            status: "success"
          })
        }),
        input: null // Explicitly null
      };

      expect(() => {
        const step = Step.fromResponse(mockStepWithNullInput as any);
        expect(step.input).toBeUndefined(); // Should handle null gracefully
        console.log("✅ Null input handled successfully");
      }).not.toThrow();
    });
  });
}); 