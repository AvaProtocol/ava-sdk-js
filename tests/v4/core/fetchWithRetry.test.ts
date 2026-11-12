/**
 * Unit tests for the rate-limit-aware fetch used by the live test client.
 * No network: `base` is a stub.
 */
import { fetchWithRateLimitRetry } from "../../utils/fetchWithRetry";

function response(status: number, retryAfter?: string): Response {
  return new Response(status === 429 ? '{"code":"RATE_LIMITED"}' : "{}", {
    status,
    headers: retryAfter ? { "retry-after": retryAfter } : {},
  });
}

describe("fetchWithRateLimitRetry", () => {
  test("retries a 429 after Retry-After and returns the next response", async () => {
    const calls: number[] = [];
    const base: typeof fetch = async () => {
      calls.push(Date.now());
      return calls.length === 1 ? response(429, "1") : response(200);
    };
    const res = await fetchWithRateLimitRetry(base, 3)("https://x/y");
    expect(res.status).toBe(200);
    expect(calls).toHaveLength(2);
    expect(calls[1] - calls[0]).toBeGreaterThanOrEqual(900);
  });

  test("gives up after maxRetries and returns the last 429", async () => {
    let n = 0;
    const base: typeof fetch = async () => {
      n += 1;
      return response(429, "0");
    };
    const res = await fetchWithRateLimitRetry(base, 2)("https://x/y");
    expect(res.status).toBe(429);
    expect(n).toBe(3);
  });

  test("rejects promptly when the signal aborts during the backoff", async () => {
    let n = 0;
    const base: typeof fetch = async () => {
      n += 1;
      return response(429, "30");
    };
    const controller = new AbortController();
    const started = Date.now();
    const pending = fetchWithRateLimitRetry(base, 3)("https://x/y", {
      signal: controller.signal,
    });
    setTimeout(() => controller.abort(), 50);
    await expect(pending).rejects.toMatchObject({ name: "AbortError" });
    expect(Date.now() - started).toBeLessThan(5_000);
    expect(n).toBe(1);
  });
});
