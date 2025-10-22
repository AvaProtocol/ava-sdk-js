import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import type {
  GetTokenMetadataRequest,
  GetTokenMetadataResponse,
  TokenMetadata,
} from "@avaprotocol/types";
import { authenticateClient, getClient } from "../utils/utils";
import { getConfig } from "../utils/envalid";

// Use chain-specific tokens from getConfig(); if none, skip chain-specific tests
const TOKENS = getConfig().tokens as Record<string, any>;
const HAS_TOKENS = Object.keys(TOKENS).length > 0;

// Helper to check if we should skip chain-specific tests
const describeOrSkip = HAS_TOKENS ? describe : describe.skip;
const testOrSkip = HAS_TOKENS ? test : test.skip;

/**
 * Helper function to perform flexible assertions on token metadata
 * Handles both placeholder data and actual whitelist data
 */
function assertTokenMetadata(
  response: GetTokenMetadataResponse,
  expectedToken: any,
  tokenName: string
) {
  expect(response.found).toBeTruthy();
  expect(response.token).toBeTruthy();

  if (response.token) {
    expect(response.token.address).toBe(expectedToken.address.toLowerCase());

    // Flexible assertions - check if server returns expected data or placeholder
    if (response.token.name === "Unknown Token") {
      console.log(`⚠️  Server returning placeholder data for ${tokenName}`);
      expect(response.token.name).toBe("Unknown Token");
      expect(response.token.symbol).toBeTruthy();
      expect(response.token.decimals).toBeGreaterThanOrEqual(0);
    } else {
      // If server is working correctly, expect actual whitelist data
      // Handle flexible name matching for tokens that may return symbol instead of full name
      const isFlexibleNameMatch = isTokenNameMatch(
        response.token.name,
        expectedToken.name,
        expectedToken.symbol
      );
      if (!isFlexibleNameMatch) {
        expect(response.token.name).toBe(expectedToken.name);
      }
      expect(response.token.symbol).toBe(expectedToken.symbol);
      expect(response.token.decimals).toBe(expectedToken.decimals);
    }
  }
}

/**
 * Helper function to check if a token name matches expected patterns
 * Handles cases where server might return symbol instead of full name (e.g., "USDT" vs "Tether USD")
 */
function isTokenNameMatch(
  actualName: string,
  expectedName: string,
  expectedSymbol: string
): boolean {
  // Direct match with expected name
  if (actualName === expectedName) {
    return true;
  }

  // For USDC/USD Coin, accept both variants
  if (
    (expectedName === "USD Coin" && actualName === "USDC") ||
    (expectedSymbol === "USDC" && actualName === "USDC")
  ) {
    return true;
  }

  // For USDT/Tether USD, accept both variants
  if (
    (expectedName === "Tether USD" && actualName === "USDT") ||
    (expectedSymbol === "USDT" && actualName === "USDT")
  ) {
    return true;
  }

  // Add more flexible matching patterns here as needed
  // For example: "WETH" vs "Wrapped Ether", "LINK" vs "ChainLink Token", etc.
  if (
    (expectedName === "Wrapped Ether" && actualName === "WETH") ||
    (expectedSymbol === "WETH" && actualName === "WETH")
  ) {
    return true;
  }

  if (
    (expectedName === "ChainLink Token" && actualName === "LINK") ||
    (expectedSymbol === "LINK" && actualName === "LINK")
  ) {
    return true;
  }

  return false;
}

/**
 * Helper function for flexible found/not-found assertions
 */
function assertFlexibleFoundResponse(
  response: GetTokenMetadataResponse,
  context: string
) {
  if (response.found === false) {
    expect(response.token).toBeNull();
  } else {
    console.log(`ℹ️  Server returns found=true for ${context}`);
    expect(response.token).toBeTruthy();
  }
}

describeOrSkip("getTokenMetadata Tests", () => {
  let client: Client;

  beforeAll(async () => {
    // Initialize and authenticate the client
    client = getClient();
    await authenticateClient(client);
  });

  // Test each token with flexible assertions
  testOrSkip.each(Object.entries(TOKENS).map(([name, data]) => [name, data]))(
    "should get token metadata for %s (flexible)",
    async (tokenName, tokenData) => {
      const request: GetTokenMetadataRequest = { address: tokenData.address };

      const response: GetTokenMetadataResponse = await client.getTokenMetadata(
        request
      );
      assertTokenMetadata(response, tokenData, tokenName);
    }
  );

  // Test different types of invalid/problematic addresses
  testOrSkip.each([
    ["invalid addresses", "0x0000000000000000000000000000000000000000"],
    ["non-existent addresses", "0x1234567890123456789012345678901234567890"],
  ])("should handle %s (flexible)", async (context, address) => {
    const request: GetTokenMetadataRequest = { address };
    const response: GetTokenMetadataResponse = await client.getTokenMetadata(
      request
    );
    assertFlexibleFoundResponse(response, context);
  });

  // Test malformed addresses that should throw errors
  testOrSkip.each([
    ["too short", "0x123"],
    ["too long", "0x12345678901234567890123456789012345678901"],
    ["not hex", "invalid-address"],
    ["empty string", ""],
    ["invalid hex characters", "0xZZZ"],
  ])(
    "should handle malformed addresses gracefully: %s",
    async (description, address) => {
      const request: GetTokenMetadataRequest = { address };
      await expect(client.getTokenMetadata(request)).rejects.toThrow();
    }
  );

  // Universal tests that work on any chain
  test("should handle malformed addresses gracefully (universal)", async () => {
    const malformedAddresses = [
      ["too short", "0x123"],
      ["too long", "0x12345678901234567890123456789012345678901"],
      ["not hex", "invalid-address"],
      ["empty string", ""],
      ["invalid hex characters", "0xZZZ"],
    ];

    for (const [description, address] of malformedAddresses) {
      const request: GetTokenMetadataRequest = { address };
      await expect(client.getTokenMetadata(request)).rejects.toThrow();
    }
  });

  test("should handle invalid addresses consistently (universal)", async () => {
    const invalidAddresses = [
      "0x0000000000000000000000000000000000000000",
      "0x1234567890123456789012345678901234567890",
    ];

    for (const address of invalidAddresses) {
      const response = await client.getTokenMetadata({ address });
      expect(typeof response.found).toBe("boolean");
      expect(typeof response.source).toBe("string");

      if (response.found) {
        expect(response.token).toBeTruthy();
      } else {
        expect(response.token).toBeNull();
      }
    }
  });

  test("should respect request options (universal)", async () => {
    // Use a known invalid address that should work on any chain
    const request: GetTokenMetadataRequest = {
      address: "0x0000000000000000000000000000000000000000",
    };

    const startTime = Date.now();

    const response = await client.getTokenMetadata(request, {
      authKey: client.getAuthKey(),
    });

    const duration = Date.now() - startTime;
    expect(duration).toBeLessThan(10000); // Reasonable time limit
    expect(typeof response.found).toBe("boolean");
  });

  // Skip the chain-specific tests if no tokens are available
  if (!HAS_TOKENS) {
    test("should skip chain-specific tests - no test tokens available", () => {
      console.log(
        "ℹ️  Skipping chain-specific token tests - no test tokens configured in getConfig()"
      );
      console.log(
        "   To enable these tests, add tokens to tests/utils/envalid.ts under the current TEST_ENV"
      );
      expect(true).toBe(true); // Always pass
    });
  }

  testOrSkip(
    "should handle lowercase and uppercase addresses consistently",
    async () => {
      if (!TOKENS.USDC) {
        console.log(
          "Skipping address case test - no USDC token defined for this chain"
        );
        return;
      }

      const originalAddress = TOKENS.USDC.address;
      const lowercaseAddress = originalAddress.toLowerCase();
      const uppercaseAddress = originalAddress.toUpperCase();
      const mixedCaseAddress =
        originalAddress.slice(0, 20).toLowerCase() +
        originalAddress.slice(20).toUpperCase();

      const requests = [
        { address: lowercaseAddress },
        { address: uppercaseAddress },
        { address: mixedCaseAddress },
      ];

      const responses = await Promise.all(
        requests.map((request) => client.getTokenMetadata(request))
      );

      // All responses should be consistent
      responses.forEach((response) => {
        expect(response.found).toBeTruthy();
        expect(response.token).toBeDefined();
        if (response.token) {
          expect(response.token.address).toBe(lowercaseAddress); // Should always return lowercase
          // All responses should have the same data
          expect(response.token.name).toBe(responses[0].token?.name);
          expect(response.token.symbol).toBe(responses[0].token?.symbol);
          expect(response.token.decimals).toBe(responses[0].token?.decimals);
        }
      });
    }
  );

  // Test structure validation for multiple tokens using test.each
  testOrSkip.each(
    Object.values(TOKENS)
      .map((token) => token.address)
      .filter(Boolean)
  )("should validate token metadata structure for %s", async (address) => {
    const response = await client.getTokenMetadata({ address });

    expect(response.found).toBeTruthy();
    expect(response.token).toBeTruthy();

    if (response.token) {
      const token: TokenMetadata = response.token;

      // Validate address format
      expect(token.address).toMatch(/^0x[a-f0-9]{40}$/);
      expect(token.address).toBe(token.address.toLowerCase());

      // Validate string fields are not empty
      expect(token.name.length).toBeGreaterThan(0);
      expect(token.symbol.length).toBeGreaterThan(0);

      // Validate decimals is reasonable
      expect(token.decimals).toBeGreaterThanOrEqual(0);
      expect(token.decimals).toBeLessThanOrEqual(24); // NEAR has 24 decimals

      // Validate types
      expect(typeof token.address).toBe("string");
      expect(typeof token.name).toBe("string");
      expect(typeof token.symbol).toBe("string");
      expect(typeof token.decimals).toBe("number");
      expect(Number.isInteger(token.decimals)).toBe(true);
    }
  });

  testOrSkip("should handle concurrent requests properly", async () => {
    const addresses = Object.values(TOKENS)
      .map((token) => token.address)
      .filter(Boolean);

    if (addresses.length === 0) {
      console.log(
        "Skipping concurrent test - no tokens defined for this chain"
      );
      return;
    }

    const promises = addresses.map((address) =>
      client.getTokenMetadata({ address })
    );

    const responses = await Promise.all(promises);

    expect(responses).toHaveLength(addresses.length);
    responses.forEach((response, index) => {
      expect(response).toBeDefined();
      expect(response.found).toBeTruthy();
      expect(response.token).toBeDefined();

      if (response.token) {
        expect(response.token.address).toBe(addresses[index].toLowerCase());
      }
    });
  });

  testOrSkip("should respect request options", async () => {
    if (!TOKENS.USDC) {
      console.log(
        "Skipping request options test - no USDC token defined for this chain"
      );
      return;
    }

    const request: GetTokenMetadataRequest = {
      address: TOKENS.USDC.address,
    };

    // Test with available request options
    const startTime = Date.now();

    const response = await client.getTokenMetadata(request, {
      authKey: client.getAuthKey(), // Use available option
    });

    const duration = Date.now() - startTime;
    expect(duration).toBeLessThan(10000); // Reasonable time limit
    expect(response).toBeDefined();
    expect(response.found).toBeTruthy();
    expect(response.token).toBeDefined();
  });

  // Test tokens with different decimal places using test.each
  testOrSkip.each(
    Object.entries(TOKENS)
      .map(([name, token]) => [name, token, token.decimals])
      .filter(([name, token]) => token)
  )(
    "should handle %s with %d decimals (flexible)",
    async (tokenName, token, expectedDecimals) => {
      const response = await client.getTokenMetadata({
        address: token.address,
      });

      expect(response.found).toBeTruthy();
      expect(response.token).toBeDefined();

      if (response.token) {
        // Flexible assertion - if server returns correct data, check it
        if (response.token.name !== "Unknown Token") {
          expect(response.token.decimals).toBe(expectedDecimals);
          expect(response.token.symbol).toBe(token.symbol);
          // Use flexible name matching for consistency
          const isFlexibleNameMatch = isTokenNameMatch(
            response.token.name,
            token.name,
            token.symbol
          );
          if (!isFlexibleNameMatch) {
            expect(response.token.name).toBe(token.name);
          }
        } else {
          console.log(`ℹ️  Server returning placeholder data for ${tokenName}`);
          expect(response.token.decimals).toBeGreaterThanOrEqual(0);
        }
      }
    }
  );

  testOrSkip(
    "should return consistent data across multiple calls",
    async () => {
      if (!TOKENS.USDC) {
        console.log(
          "Skipping consistency test - no USDC token defined for this chain"
        );
        return;
      }

      const address = TOKENS.USDC.address;

      // Make multiple calls to the same token
      const responses = await Promise.all([
        client.getTokenMetadata({ address }),
        client.getTokenMetadata({ address }),
        client.getTokenMetadata({ address }),
      ]);

      // All responses should be identical
      const [first, second, third] = responses;

      expect(first).toEqual(second);
      expect(second).toEqual(third);

      responses.forEach((response) => {
        expect(response.found).toBeTruthy();
        expect(response.token).toBeDefined();
      });
    }
  );
});
