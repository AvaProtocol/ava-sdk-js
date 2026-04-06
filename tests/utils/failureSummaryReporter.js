/**
 * Custom Jest reporter that prints a clear summary of failed tests at the end.
 * Works alongside --silent to keep output clean while surfacing failures.
 */
class FailureSummaryReporter {
  constructor(globalConfig) {
    this._globalConfig = globalConfig;
  }

  onRunComplete(_contexts, results) {
    const { testResults } = results;
    const failures = [];

    for (const suite of testResults) {
      for (const test of suite.testResults) {
        if (test.status === "failed") {
          failures.push({
            suitePath: suite.testFilePath.replace(process.cwd() + "/", ""),
            testName: test.ancestorTitles.concat(test.title).join(" > "),
            messages: test.failureMessages,
          });
        }
      }
    }

    if (failures.length === 0) return;

    console.log("\n" + "=".repeat(80));
    console.log(`FAILURE SUMMARY: ${failures.length} test(s) failed`);
    console.log("=".repeat(80));

    failures.forEach((f, i) => {
      console.log(`\n${i + 1}) ${f.suitePath}`);
      console.log(`   ${f.testName}`);
      // Print first failure message, trimmed
      if (f.messages.length > 0) {
        const msg = f.messages[0]
          .split("\n")
          .slice(0, 10)
          .map((line) => `   ${line}`)
          .join("\n");
        console.log(msg);
      }
    });

    console.log("\n" + "=".repeat(80) + "\n");
  }
}

module.exports = FailureSummaryReporter;
