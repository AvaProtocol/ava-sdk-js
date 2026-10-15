import { templateRunBudget } from "../../utils/templateTestLifecycle";

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

function pendingFetch() {
  return jest.spyOn(globalThis, "fetch").mockImplementation(
    (_input, init) =>
      new Promise((_accept, reject) => {
        const signal = init!.signal!;
        if (signal.aborted) reject(new Error("aborted"));
        else
          signal.addEventListener("abort", () => reject(new Error("aborted")), {
            once: true,
          });
      }),
  );
}

test("one work deadline spans successive requests and preserves a separate bounded cleanup phase", async () => {
  const fetch = pendingFetch();
  fetch.mockResolvedValueOnce(new Response("{}"));
  const budget = templateRunBudget({ totalMs: 10000, cleanupMs: 3000 });
  try {
    await budget.fetchImpl("http://example.invalid/first");
    await jest.advanceTimersByTimeAsync(4000);
    const work = budget
      .fetchImpl("http://example.invalid/second")
      .catch((error: Error) => error.message);
    await jest.advanceTimersByTimeAsync(3000);
    expect(await work).toBe("aborted");
    budget.beginCleanup();
    const cleanup = budget
      .cleanupFetchImpl("http://example.invalid/cleanup")
      .catch((error: Error) => error.message);
    const signal = fetch.mock.calls.at(-1)![1]!.signal!;
    await jest.advanceTimersByTimeAsync(2999);
    expect(signal.aborted).toBe(false);
    await jest.advanceTimersByTimeAsync(1);
    expect(await cleanup).toBe("aborted");
  } finally {
    budget.dispose();
  }
});

test("preserves the SDK request cancellation signal and bounds cleanup even after a fast work phase", async () => {
  const fetch = pendingFetch();
  const budget = templateRunBudget({ totalMs: 10000, cleanupMs: 3000 });
  try {
    const sdkRequest = new AbortController();
    const work = budget
      .fetchImpl("http://example.invalid/work", { signal: sdkRequest.signal })
      .catch((error: Error) => error.message);
    sdkRequest.abort();
    expect(await work).toBe("aborted");
    expect(budget.signal.aborted).toBe(false);
    budget.beginCleanup();
    const cleanup = budget
      .cleanupFetchImpl("http://example.invalid/cleanup")
      .catch((error: Error) => error.message);
    await jest.advanceTimersByTimeAsync(3000);
    expect(await cleanup).toBe("aborted");
    expect(fetch.mock.calls.at(-1)![1]!.signal!.aborted).toBe(true);
  } finally {
    budget.dispose();
  }
});
