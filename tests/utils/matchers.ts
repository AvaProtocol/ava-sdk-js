/**
 * Shared jest matcher extensions for v4 test suites.
 *
 * Importing this file once (via jest's setupFilesAfterEach or a
 * top-level `import "../../utils/matchers"` in a spec) registers
 * the matchers globally for the test process.
 *
 * Defined here so individual spec files don't each re-declare the
 * same `Matchers<R>` namespace augmentation — TS complains about
 * duplicate global declarations otherwise.
 */

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      /** Compare two strings case-insensitively (useful for 0x addresses). */
      toEqualIgnoreCase(expected: string): R;
    }
  }
}

expect.extend({
  toEqualIgnoreCase(received: unknown, expected: string) {
    const actual = String(received ?? "").toLowerCase();
    const want = expected.toLowerCase();
    return {
      pass: actual === want,
      message: () =>
        actual === want
          ? `expected ${actual} not to equal (case-insensitive) ${want}`
          : `expected ${actual} to equal (case-insensitive) ${want}`,
    };
  },
});

// Re-export an empty object so this file is treated as a module
// rather than a script (required for `declare global` to work).
export {};
