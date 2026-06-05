/**
 * @jest-environment node
 *
 * Reproduces: https://github.com/AvaProtocol/avs-infra/support/issues/20260312-withdraw-undefined-success
 *
 * When gRPC-js invokes the callback with (null, undefined) — e.g. during a
 * connection drop — sendGrpcRequest resolves with undefined instead of
 * rejecting.  Every method that calls sendGrpcRequest then crashes with
 * "Cannot read properties of undefined (reading 'getSuccess')" (or similar).
 *
 * The user-visible symptom was:
 *   "Cannot read properties of undefined (reading 'success')"
 * because the SDK's withdrawFunds returned undefined to the caller.
 */

import { describe, test, expect, beforeEach } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";

describe("gRPC undefined response handling (issue #20260312)", () => {
  let client: Client;

  beforeEach(() => {
    // Create a client with a dummy endpoint — we'll mock the rpcClient
    client = new Client({ endpoint: "localhost:0" });
  });

  /**
   * Helper: replace a single gRPC method on the client's rpcClient so that
   * the callback fires with (null, undefined) — simulating a connection drop.
   */
  function stubGrpcMethod(methodName: string) {
    (client as any).rpcClient[methodName] = (
      _request: any,
      _metadata: any,
      callback: (error: any, response: any) => void,
    ) => {
      // Simulate gRPC-js connection-drop edge case
      callback(null, undefined);
      return { cancel: () => {} };
    };
  }

  /**
   * Helper: replace a single gRPC method to return a valid response object
   * with the given getter methods.
   */
  function stubGrpcMethodWithResponse(
    methodName: string,
    getters: Record<string, () => any>,
  ) {
    (client as any).rpcClient[methodName] = (
      _request: any,
      _metadata: any,
      callback: (error: any, response: any) => void,
    ) => {
      callback(null, getters);
      return { cancel: () => {} };
    };
  }

  test("sendGrpcRequest should reject (not resolve) when gRPC returns (null, undefined)", async () => {
    stubGrpcMethod("withdrawFunds");
    (client as any).authKey = "test-key";

    // The bug: sendGrpcRequest resolves with undefined, so withdrawFunds
    // crashes with TypeError on result.getSuccess(). The fix should make
    // sendGrpcRequest reject with a descriptive error instead.
    try {
      await client.withdrawFunds({
        recipientAddress: "0x0000000000000000000000000000000000000001",
        amount: "1000",
        token: "ETH",
        smartWalletAddress: "0x0000000000000000000000000000000000000002",
      });
      // Should never reach here
      fail("Expected withdrawFunds to throw");
    } catch (error: any) {
      // BEFORE fix: TypeError "Cannot read properties of undefined (reading 'getSuccess')"
      // AFTER fix:  Error with message about empty/undefined gRPC response
      //
      // This assertion fails before the fix and passes after:
      expect(error).not.toBeInstanceOf(TypeError);
      expect(error.message).toMatch(/empty response|connection/i);
    }
  });

  test("getWallets should reject with descriptive error, not TypeError", async () => {
    stubGrpcMethod("listWallets");
    (client as any).authKey = "test-key";

    try {
      await client.getWallets();
      fail("Expected getWallets to throw");
    } catch (error: any) {
      expect(error).not.toBeInstanceOf(TypeError);
      expect(error.message).toMatch(/empty response|connection/i);
    }
  });

  test("getWorkflowCount should reject with descriptive error, not TypeError", async () => {
    stubGrpcMethod("getWorkflowCount");
    (client as any).authKey = "test-key";

    try {
      await client.getWorkflowCount(["0x0000000000000000000000000000000000000001"]);
      fail("Expected getWorkflowCount to throw");
    } catch (error: any) {
      expect(error).not.toBeInstanceOf(TypeError);
      expect(error.message).toMatch(/empty response|connection/i);
    }
  });

  test("valid gRPC response still works after the guard is added", async () => {
    stubGrpcMethodWithResponse("withdrawFunds", {
      getSuccess: () => true,
      getStatus: () => "completed",
      getMessage: () => "ok",
      getUserOpHash: () => "0xabc",
      getTransactionHash: () => "0xdef",
      getSubmittedAt: () => 1234567890,
      getSmartWalletAddress: () => "0x0000000000000000000000000000000000000002",
      getRecipientAddress: () => "0x0000000000000000000000000000000000000001",
      getAmount: () => "1000",
      getToken: () => "ETH",
    });
    (client as any).authKey = "test-key";

    const result = await client.withdrawFunds({
      recipientAddress: "0x0000000000000000000000000000000000000001",
      amount: "1000",
      token: "ETH",
      smartWalletAddress: "0x0000000000000000000000000000000000000002",
    });

    expect(result.success).toBe(true);
    expect(result.status).toBe("completed");
    expect(result.transactionHash).toBe("0xdef");
  });
});
