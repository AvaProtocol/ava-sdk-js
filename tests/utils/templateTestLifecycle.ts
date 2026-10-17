export const TEMPLATE_TIMING = {
  jestMs: 360_000,
  runMs: 355_000,
  cleanupMs: 45_000,
  requestMs: 120_000,
  cleanupRequestMs: 10_000,
} as const;

/** A single deadline covers all work requests, with a separate cleanup reserve. */
export function templateRunBudget(
  options: { totalMs?: number; cleanupMs?: number } = {},
) {
  const totalMs = options.totalMs ?? TEMPLATE_TIMING.runMs;
  const cleanupMs = options.cleanupMs ?? TEMPLATE_TIMING.cleanupMs;
  if (
    !Number.isFinite(totalMs) ||
    !Number.isFinite(cleanupMs) ||
    cleanupMs <= 0 ||
    totalMs <= cleanupMs
  ) {
    throw new Error("The run budget must exceed its positive cleanup reserve");
  }
  const deadline = Date.now() + totalMs;
  const work = new AbortController();
  const cleanup = new AbortController();
  const workTimer = setTimeout(() => work.abort(), totalMs - cleanupMs);
  let cleanupTimer: ReturnType<typeof setTimeout> | undefined;
  let cleaning = false;
  const scopedFetch =
    (signal: AbortSignal): typeof fetch =>
    (input, init) =>
      fetch(input, {
        ...init,
        signal: AbortSignal.any([
          signal,
          ...(init?.signal ? [init.signal] : []),
        ]),
      });
  return {
    signal: work.signal,
    fetchImpl: scopedFetch(work.signal),
    cleanupFetchImpl: scopedFetch(cleanup.signal),
    beginCleanup() {
      if (cleaning) return;
      cleaning = true;
      clearTimeout(workTimer);
      work.abort();
      cleanupTimer = setTimeout(
        () => cleanup.abort(),
        Math.max(0, Math.min(cleanupMs, deadline - Date.now())),
      );
    },
    dispose() {
      clearTimeout(workTimer);
      clearTimeout(cleanupTimer);
      work.abort();
      cleanup.abort();
    },
  };
}
