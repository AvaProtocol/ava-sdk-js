// Run actual SDK HTTP calls against the companion AVS source without services or funds.
/* eslint-disable @typescript-eslint/no-require-imports -- This Node-only runner works before any TypeScript build. */
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const avs = path.resolve(
  process.env.AVS_SOURCE_DIR || path.join(root, "../EigenLayer-AVS")
);
const fixture = "integration_test/api/sdk_wallet_gateway_test.go";
if (!fs.existsSync(path.join(avs, fixture))) {
  throw new Error(
    `Set AVS_SOURCE_DIR to the AVS checkout containing ${fixture} (global inventory PR #914).`
  );
}
const stamp = new Date().toISOString().replace(/[^0-9]/g, "");
const logs = path.join(root, "logs");
fs.mkdirSync(logs, { recursive: true });
const privateDir = fs.mkdtempSync(path.join(os.tmpdir(), "sdk-wallet-e2e-"));
const stateFile = path.join(privateDir, "gateway.json");
const gatewayLog = path.join(logs, `${stamp}-wallet-inventory-gateway.log`);
const descriptor = fs.openSync(gatewayLog, "w");
const gateway = spawn(
  "go",
  [
    "test",
    "-tags=integration",
    "./integration_test/api",
    "-run",
    "^TestSDKWalletGatewayFixture$",
    "-count=1",
    "-v",
    "-timeout",
    "10m",
  ],
  {
    cwd: avs,
    env: { ...process.env, SDK_WALLET_GATEWAY_STATE_FILE: stateFile },
    stdio: ["ignore", descriptor, descriptor],
    detached: process.platform !== "win32",
  }
);
fs.closeSync(descriptor);
let gatewayExited = false;
let gatewayCode;
const gatewayClosed = new Promise((resolve) =>
  gateway.once("close", (code) => {
    gatewayExited = true;
    gatewayCode = code;
    resolve();
  })
);
gateway.once("error", (error) => {
  console.error(error.message);
  gatewayExited = true;
});
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const inventoryCases = [
  "returns identity metadata and authoritative owner usage",
  "archives salt 0, creates salt 4, and enforces restore capacity",
  "allocates above non-contiguous and large salt history",
  "replays an archived allocation at capacity through a fresh SDK client",
  "preserves archived-only inventory and allocates a new salt",
  "keeps allocation replay keys isolated by authenticated owner",
  "shares identities, usage and replay across supported network hints",
  "rejects allocation without an owner JWT",
  "rejects partner-only allocation before looking up replay keys",
];
const legacyCases = [
  "includes a freshly created custom-salt wallet",
  "returns the same global inventory for chainId and the JWT audience",
  "reads the nonce on chainId, not the JWT audience chain",
  "returns wallets sorted numerically by salt",
];
const cases = [
  ...inventoryCases.map((name) => ({
    file: "tests/v4/core/walletInventory.test.ts",
    name,
  })),
  ...legacyCases.map((name) => ({
    file: "tests/v4/core/wallet.test.ts",
    name,
  })),
];

async function main() {
  let passed = 0;
  try {
    const deadline = Date.now() + 120_000;
    while (!fs.existsSync(stateFile)) {
      if (gatewayExited || Date.now() > deadline)
        throw new Error(`Gateway did not become ready. See ${gatewayLog}`);
      await sleep(100);
    }
    const state = JSON.parse(fs.readFileSync(stateFile, "utf8"));
    const env = {
      ...process.env,
      AVS_REST_URL: state.baseUrl,
      TIGHT_WALLET_CAP: "1",
      MULTICHAIN_TEST: "1",
      PARTNER_ASSERTION_PRIVATE_KEY: state.partnerPrivateKey,
      PARTNER_ASSERTION_ISSUER: state.partnerIssuer,
      PARTNER_ASSERTION_AUDIENCE: state.partnerAudience,
    };
    console.log(
      "SDK -> local AVS HTTP/auth/router/Badger; deterministic address and nonce providers; active limit 3."
    );
    for (const [index, test] of cases.entries()) {
      const prefix = path.join(logs, `${stamp}-wallet-inventory-${index + 1}`);
      const output = fs.openSync(`${prefix}.log`, "w");
      const offset = fs.statSync(gatewayLog).size;
      const pattern = test.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const child = spawn(
        process.execPath,
        [
          path.join(root, "node_modules/jest/bin/jest.js"),
          "--runInBand",
          test.file,
          "--testNamePattern",
          pattern,
          "--json",
          "--outputFile",
          `${prefix}.json`,
        ],
        {
          cwd: root,
          env,
          stdio: ["ignore", output, output],
        }
      );
      fs.closeSync(output);
      const exitCode = await new Promise((resolve, reject) => {
        child.once("error", reject);
        child.once("exit", resolve);
      });
      await sleep(30);
      const requests = fs.readFileSync(gatewayLog).subarray(offset).toString();
      fs.writeFileSync(`${prefix}-gateway.log`, requests);
      if (exitCode !== 0)
        throw new Error(
          `${test.name} failed. See ${prefix}.log and ${prefix}-gateway.log`
        );
      const report = JSON.parse(fs.readFileSync(`${prefix}.json`, "utf8"));
      if (report.numPassedTests !== 1 || report.numFailedTests !== 0)
        throw new Error(
          `Expected exactly one passing case, got ${report.numPassedTests}: ${test.name}`
        );
      if (!requests.includes("SDK_HTTP status="))
        throw new Error(`No HTTP evidence for ${test.name}`);
      if (/SDK_HTTP status=5\d\d/.test(requests))
        throw new Error(`Unexpected gateway 5xx in ${prefix}-gateway.log`);
      passed++;
      console.log(`PASS ${test.name}`);
    }
  } finally {
    fs.writeFileSync(`${stateFile}.stop`, "stop\n");
    await Promise.race([gatewayClosed, sleep(5000)]);
    if (!gatewayExited) {
      if (process.platform === "win32") gateway.kill("SIGTERM");
      else process.kill(-gateway.pid, "SIGTERM");
      await gatewayClosed;
    }
    fs.rmSync(privateDir, { recursive: true, force: true });
  }
  if (gatewayCode !== 0)
    throw new Error(`Gateway did not exit cleanly. See ${gatewayLog}`);
  console.log(
    `Validated ${passed} real SDK-to-gateway cases. Gateway log: ${gatewayLog}`
  );
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
