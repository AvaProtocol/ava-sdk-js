/**
 * fetch wrapper that retries gateway rate-limit responses.
 *
 * Production keeps the gateway's default limiter (10 req/s, burst 50), and
 * even with `--runInBand` the live suites can exceed it, which surfaces as
 * `429 RATE_LIMITED` ("Try again in 1s."). Honour `Retry-After` and retry a
 * few times instead of failing the test. The backoff respects the request's
 * AbortSignal, so a transport timeout that expires mid-wait rejects at once
 * instead of sitting out the delay and fetching again.
 */
export function fetchWithRateLimitRetry(
  base: typeof fetch = globalThis.fetch,
  maxRetries = 3,
): typeof fetch {
  return async (input, init) => {
    for (let attempt = 0; ; attempt++) {
      const res = await base(input, init);
      if (res.status !== 429 || attempt >= maxRetries) {
        return res;
      }
      // Drain the body so the connection can be reused before we retry.
      await res.text().catch(() => undefined);
      const header = Number(res.headers.get("retry-after"));
      const seconds = Number.isFinite(header) && header > 0 ? header : 1;
      await sleepUnlessAborted(seconds * 1000, init?.signal);
    }
  };
}

/** Resolve after `ms`, or reject as soon as `signal` aborts. */
export function sleepUnlessAborted(
  ms: number,
  signal?: AbortSignal | null,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(abortReason(signal));
      return;
    }
    const onAbort = () => {
      clearTimeout(timer);
      reject(abortReason(signal));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

function abortReason(signal: AbortSignal): unknown {
  return signal.reason instanceof Error
    ? signal.reason
    : new DOMException("The operation was aborted.", "AbortError");
}
