import { Client, type v4 } from "@avaprotocol/sdk-js";
import { Wallet, getBytes } from "ethers";
import publicFixture from "./fixtures/wallet-sweep-owner-prepared.json";
import {
  executePreparedWalletSweep,
  ownerOperationHash,
  prepareWalletSweep,
  validateWalletSweepPreparation,
  waitForWalletSweep,
  type PreparedWalletSweep,
} from "../../examples/workflows/wallet-sweep-execution";

const signer = Wallet.createRandom(); // Throwaway offline signer, never funded.
function fixture(): PreparedWalletSweep {
  const sweep = JSON.parse(JSON.stringify(publicFixture));
  sweep.prepared.owner = signer.address;
  sweep.prepared.expiresAt = Date.now() + 60_000;
  return sweep;
}

type Wire = {
  path: string;
  method: string;
  body?: Record<string, unknown>;
  authorization?: string;
};
function clientFixture(
  sweep = fixture(),
  options: {
    submit?: "timeout" | "refused" | "wrong hash";
    status?: "missing" | "failed" | "incomplete" | "timeout" | "unauthorized";
  } = {},
) {
  const requests: Wire[] = [];
  const status = {
    userOpHash: sweep.prepared.userOpHash,
    sender: sweep.plan.source,
    executionStatus: "confirmed",
    success: true,
    transactionHash: "0x" + "a".repeat(64),
    // Different JSON property ordering is immaterial to receipt validation.
    calls: sweep.prepared.calls.map((c) => ({
      to: c.to,
      value: c.value,
      data: c.data,
      selector: c.selector,
    })),
  };
  const client = new Client({
    baseUrl: "http://gateway.invalid/api/v1",
    token: "offline-test-jwt",
    fetchImpl: async (url, init) => {
      const path = new URL(String(url)).pathname;
      requests.push({
        path: String(url).replace("http://gateway.invalid/api/v1", ""),
        method: init?.method ?? "GET",
        body: init?.body ? JSON.parse(String(init.body)) : undefined,
        authorization: (init?.headers as Record<string, string>).Authorization,
      });
      if (path.endsWith("workflows:simulate"))
        return Response.json({
          id: "preview",
          workflowId: "",
          startAt: 1,
          status: "success",
          steps: sweep.plan.transfers.map((t, i) => ({
            id: `balance${i}`,
            type: "contractRead",
            success: true,
            output: { data: { balanceOf: t.amountWei } },
          })),
        });
      if (path.endsWith("workflows:prepare"))
        return Response.json(sweep.prepared);
      if (path.endsWith(":submit")) {
        if (options.submit === "timeout")
          throw new Error("response lost after acceptance");
        if (options.submit === "refused")
          return Response.json(
            {
              title: "Prepare again",
              status: 412,
              code: "OWNER_EXECUTION_PREPARE_REQUIRED",
            },
            { status: 412 },
          );
        return Response.json({
          executionId: sweep.prepared.execution.id,
          userOpHash:
            options.submit === "wrong hash"
              ? "0x" + "b".repeat(64)
              : sweep.prepared.userOpHash,
          chainId: 11155111,
          submissionState: "submitted",
        });
      }
      if (path.includes("/userops/")) {
        if (options.status === "unauthorized")
          return Response.json({ title: "Unauthorized" }, { status: 401 });
        if (options.status === "missing")
          return Response.json(
            { title: "Not found", status: 404 },
            { status: 404 },
          );
        if (options.status === "timeout")
          throw new Error("receipt RPC unavailable");
        if (options.status === "failed")
          return Response.json({
            ...status,
            executionStatus: "failed",
            success: false,
          });
        if (options.status === "incomplete")
          return Response.json({ ...status, success: undefined });
        return Response.json(status);
      }
      throw new Error(`Unexpected request ${path}`);
    },
  });
  return { client, requests };
}

describe("owner-signed wallet sweep (offline)", () => {
  test("v0.7 hashing matches the independently confirmed Sepolia operation", () => {
    expect(ownerOperationHash(publicFixture.prepared.userOperation)).toBe(
      "0xd5970d7a3ed0f15bc17d90b380b0691ab5e92757056f569468c11d360e8404da",
    );
  });

  test("thin methods use user-JWT routes and submit sends only the signature", async () => {
    const sweep = fixture();
    const { client, requests } = clientFixture(sweep);
    await client.workflows.prepare({
      chainId: 11155111,
      trigger: {
        id: "start",
        name: "start",
        type: "manual",
        config: { lang: "json", data: {} },
      },
      nodes: [],
      inputVariables: {},
    });
    await client.executions.submit("id/with?reserved", {
      signature: "0x1234",
      userOperation: { callData: "0xevil" },
    } as v4.SubmitExecutionRequest);
    expect(requests.map((r) => [r.path, r.method])).toEqual([
      ["/workflows:prepare", "POST"],
      ["/executions/id%2Fwith%3Freserved:submit", "POST"],
    ]);
    expect(
      requests.every((r) => r.authorization === "Bearer offline-test-jwt"),
    ).toBe(true);
    expect(requests[1].body).toEqual({ signature: "0x1234" });
  });

  test("prepares the compiled workflow without simulation-only or scheduling fields", async () => {
    const sweep = fixture();
    const { client, requests } = clientFixture(sweep);
    const result = await prepareWalletSweep(client, {
      source: sweep.plan.source,
      destination: sweep.plan.destination,
    });
    expect(result.prepared.userOpHash).toBe(sweep.prepared.userOpHash);
    expect(requests.map((r) => r.path)).toEqual([
      "/workflows:simulate",
      "/workflows:prepare",
    ]);
    expect(Object.keys(requests[1].body!).sort()).toEqual([
      "chainId",
      "edges",
      "inputVariables",
      "nodes",
      "trigger",
    ]);
  });

  test("reviews, signs raw bytes once, submits once and confirms the same two calls", async () => {
    const sweep = fixture();
    const original = JSON.stringify(sweep);
    const { client, requests } = clientFixture(sweep);
    const signMessage = jest.fn((message: Uint8Array) =>
      signer.signMessage(message),
    );
    const result = await executePreparedWalletSweep(client, sweep, {
      signer: { address: signer.address, signMessage },
      review: async () => true,
      timeoutMs: 0,
    });
    expect(result.outcome).toBe("confirmed");
    expect(signMessage).toHaveBeenCalledTimes(1);
    expect(signMessage).toHaveBeenCalledWith(
      getBytes(sweep.prepared.userOpHash),
    );
    expect(requests.map((r) => [r.path, r.method])).toEqual([
      [`/executions/${sweep.prepared.execution.id}:submit`, "POST"],
      [`/userops/${sweep.prepared.userOpHash}?chainId=11155111`, "GET"],
    ]);
    expect(Object.keys(requests[0].body!)).toEqual(["signature"]);
    expect(JSON.stringify(sweep)).toBe(original);
    expect(JSON.stringify(result)).not.toContain(
      String(requests[0].body!.signature),
    );
  });

  test("review cancellation sends nothing and never requests a wallet signature", async () => {
    const sweep = fixture();
    const { client, requests } = clientFixture(sweep);
    const signMessage = jest.fn();
    const result = await executePreparedWalletSweep(client, sweep, {
      signer: { address: signer.address, signMessage },
      review: async () => false,
    });
    expect(result.outcome).toBe("cancelled");
    expect(signMessage).not.toHaveBeenCalled();
    expect(requests).toEqual([]);
  });

  test("review must return an explicit boolean true", async () => {
    const sweep = fixture();
    const { client, requests } = clientFixture(sweep);
    const signMessage = jest.fn();
    const result = await executePreparedWalletSweep(client, sweep, {
      signer: { address: signer.address, signMessage },
      review: async () => "no" as unknown as boolean,
    });
    expect(result.outcome).toBe("cancelled");
    expect(signMessage).not.toHaveBeenCalled();
    expect(requests).toEqual([]);
  });

  test("editing the review copy cannot change the operation subsequently signed", async () => {
    const sweep = fixture();
    const { client } = clientFixture(sweep);
    const signMessage = jest.fn((message: Uint8Array) =>
      signer.signMessage(message),
    );
    const result = await executePreparedWalletSweep(client, sweep, {
      signer: { address: signer.address, signMessage },
      review: async (copy) => {
        (copy.prepared as { userOpHash: string }).userOpHash =
          "0x" + "b".repeat(64);
        copy.plan.transfers[0].amountWei = "1";
        return true;
      },
      timeoutMs: 0,
    });
    expect(result.outcome).toBe("confirmed");
    expect(signMessage).toHaveBeenCalledWith(
      getBytes(sweep.prepared.userOpHash),
    );
  });

  test.each([
    "chain",
    "entrypoint",
    "source",
    "owner",
    "destination",
    "amount",
    "calldata",
    "hash",
    "fee",
    "nonce",
    "signature",
    "funding",
    "maximum",
    "factory",
  ])(
    "refuses changed %s before review, signing or submission",
    async (change) => {
      const sweep = JSON.parse(JSON.stringify(fixture()));
      const p = sweep.prepared;
      switch (change) {
        case "chain":
          p.chainId = 1;
          break;
        case "entrypoint":
          p.entryPoint = sweep.plan.source;
          break;
        case "source":
          p.userOperation.sender = sweep.plan.destination;
          break;
        case "owner":
          p.owner = sweep.plan.source;
          break;
        case "destination":
          sweep.plan.destination = signer.address;
          break;
        case "amount":
          sweep.plan.transfers[0].amountWei = "1";
          break;
        case "calldata":
          p.userOperation.callData += "00";
          break;
        case "hash":
          p.userOpHash = "0x" + "b".repeat(64);
          break;
        case "fee":
          p.userOperation.maxFeePerGas = "0x1";
          break;
        case "nonce":
          p.userOperation.nonce = "0x0";
          break;
        case "signature":
          p.userOperation.signature = "0x1234";
          break;
        case "funding":
          p.gasFunding = "sponsored";
          break;
        case "maximum":
          p.maxGasCostWei = "1";
          break;
        case "factory":
          p.userOperation.factory = sweep.plan.source;
          break;
      }
      const { client, requests } = clientFixture();
      const signMessage = jest.fn();
      const review = jest.fn(async () => true);
      await expect(
        executePreparedWalletSweep(client, sweep, {
          signer: { address: signer.address, signMessage },
          review,
        }),
      ).rejects.toThrow();
      expect(review).not.toHaveBeenCalled();
      expect(signMessage).not.toHaveBeenCalled();
      expect(requests).toEqual([]);
    },
  );

  test("a hex-text signature is refused before submit", async () => {
    const sweep = fixture();
    const { client, requests } = clientFixture(sweep);
    await expect(
      executePreparedWalletSweep(client, sweep, {
        signer: {
          address: signer.address,
          signMessage: async () =>
            signer.signMessage(sweep.prepared.userOpHash),
        },
        review: async () => true,
      }),
    ).rejects.toThrow(/Signature/);
    expect(requests).toEqual([]);
  });

  test("expiry during review is checked again before signing", async () => {
    const sweep = fixture();
    const { client, requests } = clientFixture(sweep);
    const signMessage = jest.fn();
    try {
      await expect(
        executePreparedWalletSweep(client, sweep, {
          signer: { address: signer.address, signMessage },
          review: async () => {
            jest
              .spyOn(Date, "now")
              .mockReturnValue(sweep.prepared.expiresAt + 1);
            return true;
          },
        }),
      ).rejects.toThrow(/expired/);
      expect(signMessage).not.toHaveBeenCalled();
      expect(requests).toEqual([]);
    } finally {
      jest.restoreAllMocks();
    }
  });

  test("expiry while the wallet signs prevents submission", async () => {
    const sweep = fixture();
    const { client, requests } = clientFixture(sweep);
    try {
      await expect(
        executePreparedWalletSweep(client, sweep, {
          signer: {
            address: signer.address,
            signMessage: async (message) => {
              const signature = await signer.signMessage(message);
              jest
                .spyOn(Date, "now")
                .mockReturnValue(sweep.prepared.expiresAt + 1);
              return signature;
            },
          },
          review: async () => true,
        }),
      ).rejects.toThrow(/expired/);
      expect(requests).toEqual([]);
    } finally {
      jest.restoreAllMocks();
    }
  });

  test.each(["timeout", "wrong hash"] as const)(
    "uncertain submit (%s) polls the prepared hash and never prepares or sends again",
    async (submit) => {
      const sweep = fixture();
      const { client, requests } = clientFixture(sweep, {
        submit,
        status: "missing",
      });
      const result = await executePreparedWalletSweep(client, sweep, {
        signer,
        review: async () => true,
        timeoutMs: 0,
      });
      expect(result.outcome).toBe("unresolved");
      if (result.outcome === "cancelled")
        throw new Error("Unexpected cancellation");
      expect(result.submissionError).toMatch(/uncertain/);
      expect(requests.filter((r) => r.method === "POST")).toHaveLength(1);
      expect(requests[1].path).toBe(
        `/userops/${sweep.prepared.userOpHash}?chainId=11155111`,
      );
    },
  );

  test("a known refusal requires caller action and never silently prepares a replacement", async () => {
    const sweep = fixture();
    const { client, requests } = clientFixture(sweep, { submit: "refused" });
    await expect(
      executePreparedWalletSweep(client, sweep, {
        signer,
        review: async () => true,
        timeoutMs: 0,
      }),
    ).rejects.toMatchObject({
      userOpHash: sweep.prepared.userOpHash,
      executionId: sweep.prepared.execution.id,
      chainId: 11155111,
    });
    expect(requests).toHaveLength(1);
  });

  test("a status authorization failure retains the prepared hash for reconciliation", async () => {
    const sweep = fixture();
    const { client, requests } = clientFixture(sweep, {
      status: "unauthorized",
    });
    await expect(
      executePreparedWalletSweep(client, sweep, {
        signer,
        review: async () => true,
        timeoutMs: 0,
      }),
    ).rejects.toMatchObject({
      userOpHash: sweep.prepared.userOpHash,
      executionId: sweep.prepared.execution.id,
      chainId: 11155111,
    });
    expect(requests.map((r) => r.method)).toEqual(["POST", "GET"]);
  });

  test.each(["missing", "incomplete", "timeout"] as const)(
    "status %s stays unresolved instead of claiming success or sending",
    async (status) => {
      const sweep = fixture();
      const { client, requests } = clientFixture(sweep, { status });
      expect(
        (
          await waitForWalletSweep(client, sweep.prepared.userOpHash, {
            timeoutMs: 0,
          })
        ).outcome,
      ).toBe("unresolved");
      expect(requests).toHaveLength(1);
      expect(requests[0].method).toBe("GET");
    },
  );

  test("an observed on-chain failure is terminal", async () => {
    const sweep = fixture();
    const { client } = clientFixture(sweep, { status: "failed" });
    expect(
      (
        await waitForWalletSweep(client, sweep.prepared.userOpHash, {
          timeoutMs: 0,
        })
      ).outcome,
    ).toBe("failed");
  });

  test("invalid polling options fail before signing", async () => {
    const sweep = fixture();
    const { client, requests } = clientFixture(sweep);
    const signMessage = jest.fn();
    await expect(
      executePreparedWalletSweep(client, sweep, {
        signer: { address: signer.address, signMessage },
        review: async () => true,
        timeoutMs: -1,
      }),
    ).rejects.toThrow(/polling/);
    expect(signMessage).not.toHaveBeenCalled();
    expect(requests).toEqual([]);
  });

  test("validates unsigned deployment/sponsorship fields rather than ignoring them", () => {
    const sweep = fixture();
    const bad = JSON.parse(JSON.stringify(sweep));
    bad.prepared.userOperation.paymasterData = "0x1234";
    expect(() => validateWalletSweepPreparation(bad)).toThrow(/inconsistent/);
  });
});
