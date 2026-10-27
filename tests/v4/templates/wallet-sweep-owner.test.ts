import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { getAddress } from "ethers";
import { writeFileSync } from "node:fs";
import { getFundedClient } from "../../utils/client";
import { TEST_REST_URL } from "../../utils/env";
import {
  previewWalletSweep,
  SWEEP_CHAIN_ID,
} from "../../../examples/workflows/wallet-sweep";
import type { PreparedWalletSweep } from "../../../examples/workflows/wallet-sweep-execution";

// Explicit live-write opt-in and source selection. Sweeping the shared salt-0
// fixture empties balances other suites need, so never select it implicitly.
// Use a dedicated funded wallet; this test never funds it or grants a session.
// CI's normal template suite only sees a skipped test.
const describeOwner =
  process.env.WALLET_SWEEP_OWNER_EXECUTION === "1" ? describe : describe.skip;
describeOwner(
  "Template: wallet sweep owner execution (local gateway, live Sepolia)",
  () => {
    jest.setTimeout(330_000);

    test("the actual CLI reviews and signs one batch, confirms both transfers and preserves session policies", async () => {
      const baseUrl = TEST_REST_URL();
      expect(["localhost", "127.0.0.1"]).toContain(new URL(baseUrl).hostname);
      if (!process.env.WALLET_SWEEP_OWNER_SOURCE)
        throw new Error(
          "Set WALLET_SWEEP_OWNER_SOURCE to a dedicated funded Sepolia wallet. This test empties its selected balances; do not use the shared CI fixture.",
        );
      const source = getAddress(process.env.WALLET_SWEEP_OWNER_SOURCE);
      const { client, owner, privateKey } = await getFundedClient();
      expect(
        (await client.wallets.list({ chainId: SWEEP_CHAIN_ID })).data.some(
          (wallet) => getAddress(wallet.address) === source,
        ),
      ).toBe(true);
      const options = { source, destination: owner };
      const before = await previewWalletSweep(client, options);
      expect(before.plan.transfers.map((t) => t.symbol)).toEqual([
        "USDC",
        "WETH",
      ]);
      const recipientBefore = await previewWalletSweep(client, {
        source: owner,
        destination: source,
      });
      const policiesBefore = await client.policies.list(source, {
        chainId: SWEEP_CHAIN_ID,
      });
      const nonceBefore = await client.wallets.getNonce(source, {
        chainId: SWEEP_CHAIN_ID,
      });

      const run = await new Promise<{
        result: PreparedWalletSweep & {
          outcome: string;
          status: {
            success: boolean;
            transactionHash: string;
            calls: unknown[];
          };
        };
        stderr: string;
      }>((resolveRun, reject) => {
        const child = spawn(
          process.execPath,
          [
            resolve("node_modules/ts-node/dist/bin.js"),
            "--project",
            "examples/tsconfig.json",
            "examples/wallet-sweep.ts",
            "--source",
            source,
            "--to",
            owner,
            "--execute",
            "--wait-seconds",
            "180",
          ],
          {
            cwd: resolve("."),
            env: {
              ...process.env,
              AVS_REST_URL: baseUrl,
              AVS_API_KEY: "",
              TEST_PRIVATE_KEY: privateKey,
            },
            stdio: ["pipe", "pipe", "pipe"],
          },
        );
        let stdout = "";
        let stderr = "";
        let reviewed = false;
        const timer = setTimeout(() => {
          child.kill("SIGTERM");
          reject(
            new Error(
              `CLI timed out; reconcile the hash in its public review: ${stderr}`,
            ),
          );
        }, 220_000);
        child.stdout.on("data", (chunk) => {
          stdout += String(chunk);
        });
        child.stderr.on("data", (chunk) => {
          stderr += String(chunk);
          if (reviewed || !stderr.includes("Type yes to continue:")) return;
          reviewed = true;
          try {
            const review = JSON.parse(
              stderr
                .slice(0, stderr.indexOf("Sign and submit this sweep?"))
                .trim(),
            );
            expect(review.source.toLowerCase()).toBe(source.toLowerCase());
            expect(review.destination.toLowerCase()).toBe(owner.toLowerCase());
            expect(review.owner.toLowerCase()).toBe(owner.toLowerCase());
            expect(review.chainId).toBe(SWEEP_CHAIN_ID);
            expect(
              review.transfers.map((t: { amountWei: string }) => t.amountWei),
            ).toEqual(before.plan.transfers.map((t) => t.amountWei));
            expect(Number(review.maxGasCostEth)).toBeLessThan(0.001);
            expect(review.userOpHash).toMatch(/^0x[0-9a-fA-F]{64}$/);
            console.info("Owner sweep review", {
              userOpHash: review.userOpHash,
              executionId: review.executionId,
              gasFunding: review.gasFunding,
            });
            child.stdin.end("yes\n");
          } catch (error) {
            child.kill("SIGTERM");
            clearTimeout(timer);
            reject(error);
          }
        });
        child.on("error", (error) => {
          clearTimeout(timer);
          reject(error);
        });
        child.on("close", (code) => {
          clearTimeout(timer);
          try {
            expect(reviewed).toBe(true);
            expect(code).toBe(0);
            resolveRun({ result: JSON.parse(stdout), stderr });
          } catch (error) {
            reject(
              new Error(
                `${String(error)}\nCLI stdout: ${stdout}\nCLI review: ${stderr}`,
              ),
            );
          }
        });
      });
      // Retain unsigned evidence before asserting delayed chain reads. A failed
      // assertion must leave a hash to reconcile, never require another send.
      const proofPath = resolve("logs/wallet-sweep-sdk-owner-live-proof.json");
      const checkpoint = {
        result: run.result,
        before: before.plan,
        recipientBefore: recipientBefore.plan,
        policiesBefore,
        ownerNonceBefore: nonceBefore.nonce,
      };
      writeFileSync(proofPath, JSON.stringify(checkpoint, null, 2) + "\n");
      expect(run.result.outcome).toBe("confirmed");
      expect(run.result.status.success).toBe(true);
      expect(run.result.status.calls).toHaveLength(2);
      expect(run.result.prepared.userOperation.signature).toBe("0x");
      // The bundler can index inclusion before the gateway's RPC serves its
      // post-state. Poll reads only; final assertions still require exact deltas.
      const postState = async () => ({
        after: await previewWalletSweep(client, options),
        recipientAfter: await previewWalletSweep(client, {
          source: owner,
          destination: source,
        }),
        nonceAfter: await client.wallets.getNonce(source, {
          chainId: SWEEP_CHAIN_ID,
        }),
      });
      const expectedNonce = BigInt(nonceBefore.nonce) + 1n;
      const deadline = Date.now() + 60_000;
      let state = await postState();
      const complete = () =>
        state.after.plan.transfers.length === 0 &&
        BigInt(state.nonceAfter.nonce) === expectedNonce &&
        before.plan.transfers.every((token) => {
          const oldBalance =
            recipientBefore.plan.transfers.find(
              (t) => t.symbol === token.symbol,
            )?.amountWei ?? "0";
          const newBalance =
            state.recipientAfter.plan.transfers.find(
              (t) => t.symbol === token.symbol,
            )?.amountWei ?? "0";
          return (
            BigInt(newBalance) - BigInt(oldBalance) === BigInt(token.amountWei)
          );
        });
      while (!complete() && Date.now() < deadline) {
        await new Promise((done) => setTimeout(done, 3_000));
        state = await postState();
      }
      const { after, recipientAfter, nonceAfter } = state;
      expect(after.plan.transfers).toEqual([]);
      expect(after.plan.zeroBalanceTokens).toEqual(["USDC", "WETH"]);
      for (const token of before.plan.transfers) {
        const oldBalance =
          recipientBefore.plan.transfers.find((t) => t.symbol === token.symbol)
            ?.amountWei ?? "0";
        const newBalance = recipientAfter.plan.transfers.find(
          (t) => t.symbol === token.symbol,
        )!.amountWei;
        expect(BigInt(newBalance) - BigInt(oldBalance)).toBe(
          BigInt(token.amountWei),
        );
      }
      expect(
        await client.policies.list(source, { chainId: SWEEP_CHAIN_ID }),
      ).toEqual(policiesBefore);
      expect(BigInt(nonceAfter.nonce)).toBe(expectedNonce);
      const proof = {
        ...checkpoint,
        after: after.plan,
        recipientAfter: recipientAfter.plan,
        policiesUnchanged: true,
        ownerNonceAfter: nonceAfter.nonce,
      };
      writeFileSync(proofPath, JSON.stringify(proof, null, 2) + "\n");
      console.info("Owner sweep passed", {
        userOpHash: run.result.prepared.userOpHash,
        transactionHash: run.result.status.transactionHash,
      });
    });
  },
);
