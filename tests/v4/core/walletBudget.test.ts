import { APIError, Client, NetworkError } from "@avaprotocol/sdk-js";
import type { v4 } from "@avaprotocol/types";
import path from "node:path";
import ts from "typescript";

const wallet = "0x209eb31c199bEB4c386eF83CF442DE1a00667a1F";
const token = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const id = "01JABCDEF0000000000000000";
const chain = { chainId: 11155111 };
const signature = `0x${"11".repeat(65)}`;
const budget: v4.WalletBudget = {
  chainId: chain.chainId,
  policyId: id,
  status: "active",
  sizing: "budget",
  validUntil: 1810000000000,
  erc20: [
    {
      token,
      amount: "1000000000",
      remaining: "750000000",
      used: "250000000",
      unlimited: false,
    },
  ],
  native: {
    amount: "100000000000000000",
    remaining: "90000000000000000",
    used: "10000000000000000",
    unlimited: false,
  },
  unmeteredPermissions: [],
  retirements: [{ entityId: 7, state: "unverified" }],
  pendingChange: {
    preparationId: id,
    policyId: id,
    state: "submitted",
    reason: "Checking approval resets",
  },
  readAt: 1790000000000,
};
const prepared: v4.PreparedPolicy = {
  policyId: id,
  chainId: chain.chainId,
  entityId: 8,
  sessionSigner: "0x82F2Dd9a552a69f2ceD7Ff2D05c43aB8430158FB",
  deadline: 1790000600,
  validUntil: budget.validUntil,
  preparationId: id,
  state: "prepared",
  isCancel: false,
  budget,
  approvalResets: [{ token, spender: wallet, amount: "1000000000" }],
  unmeteredPermissions: [],
  signing: {
    kind: "owner_operation",
    preparationId: id,
    userOpHash: `0x${"ab".repeat(32)}`,
    maxFeeWei: "5000000000000000",
    expiresAt: 1790000600000,
    signingMethod: "personal_sign",
    entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
    userOp: {
      sender: wallet,
      nonce: "0x10000000000000000",
      callData: "0x1234",
      callGasLimit: "0x10000",
      verificationGasLimit: "0x20000",
      preVerificationGas: "0x1000",
      maxFeePerGas: "0x100",
      maxPriorityFeePerGas: "0x10",
      signature: "0x",
    },
  },
};

describe("wallet budget handoff", () => {
  let fetchImpl: jest.Mock<Promise<Response>, Parameters<typeof fetch>>;
  let client: Client;

  beforeEach(() => {
    fetchImpl = jest.fn();
    client = new Client({
      baseUrl: "https://gateway.test/api/v1",
      token: "owner-jwt",
      fetchImpl,
    });
  });

  function reply(value: unknown, status = 200): void {
    fetchImpl.mockResolvedValueOnce(
      new Response(JSON.stringify(value), {
        status,
        headers: {
          "Content-Type": status < 400 ? "application/json" : "application/problem+json",
        },
      }),
    );
  }

  function request(index = 0) {
    const [url, init] = fetchImpl.mock.calls[index];
    return { url: new URL(String(url)), init: init! };
  }

  test("published declarations require the chain and signature-only submission", () => {
    const program = ts.createProgram(
      [path.resolve(__dirname, "../fixtures/wallet-budget-consumer.ts")],
      {
        strict: true,
        noEmit: true,
        skipLibCheck: true,
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
      },
    );
    const errors = ts
      .getPreEmitDiagnostics(program)
      .map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
    expect(errors).toEqual([]);
  }, 15000);

  test("reads the chosen chain's real remainders without hiding unknown retirement health", async () => {
    reply(budget);
    await expect(client.wallets.getBudget(wallet, chain)).resolves.toEqual(budget);
    const { url, init } = request();
    expect(url.pathname).toBe(`/api/v1/wallets/${wallet}/budget`);
    expect(url.search).toBe("?chainId=11155111");
    expect(init.method).toBe("GET");
    expect(init.body).toBeUndefined();
    expect(init.headers).toMatchObject({ Authorization: "Bearer owner-jwt" });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  test("does not substitute saved totals when the remainder read fails", async () => {
    reply(
      {
        code: "BUDGET_READ_UNAVAILABLE",
        title: "Budget read unavailable",
        detail: "Token remainder read failed",
      },
      503,
    );
    await expect(client.wallets.getBudget(wallet, chain)).rejects.toMatchObject({
      status: 503,
      code: "BUDGET_READ_UNAVAILABLE",
      message: "Token remainder read failed",
    });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  test("prepare forwards totals, additions and trusted discovery without creating a signature", async () => {
    const input: v4.PreparePolicyRequest = {
      ...chain,
      agentLabel: "Budget test",
      // Omitting startNewTotals and expiresInSeconds is valid for an addition.
      budget: {
        validUntil: budget.validUntil,
        erc20: [{ token, amount: "1000000000" }],
      },
      add: { allowedActions: [{ target: token, selectors: ["0xa9059cbb"] }] },
      approvalDiscovery: {
        owner: wallet,
        wallet,
        chainId: chain.chainId,
        source: "moralis",
        fetchedAt: 1790000000000,
        complete: true,
        candidates: [],
        allowedContracts: [token],
        signature,
      },
    };
    reply(prepared);
    await expect(client.policies.prepare(wallet, input)).resolves.toEqual(prepared);
    const { url, init } = request();
    expect(url.pathname).toBe(`/api/v1/wallets/${wallet}/policies:prepare`);
    expect(JSON.parse(init.body as string)).toEqual(input);
    expect(input.budget?.startNewTotals).toBeUndefined();
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  test.each<v4.BudgetChangeState>([
    "prepared",
    "submitting",
    "submitted",
    "rejected",
    "active",
    "reverted",
    "unsent",
    "superseded",
  ])("recovers %s without changing its meaning or broadcasting", async (state) => {
    const recovered = {
      ...prepared,
      state,
      reason: "Original change reason",
      isCancel: state === "active",
    };
    reply(recovered);
    await expect(client.policies.getPreparation(wallet, id, chain)).resolves.toEqual(recovered);
    const { url, init } = request();
    expect(url.pathname).toBe(`/api/v1/wallets/${wallet}/policies/preparations/${id}`);
    expect(url.search).toBe("?chainId=11155111");
    expect(init.method).toBe("GET");
    expect(init.body).toBeUndefined();
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  test("signature-only submit cannot forward replacement operation fields", async () => {
    reply({ ...prepared, state: "submitted" });
    const malicious: v4.SubmitBudgetPreparationRequest & Record<string, unknown> = {
      signature,
      userOp: { nonce: "0x2", callData: "0xbad" },
      chainId: 1,
      preparationId: "other",
    };
    const result = await client.policies.submitPreparation(wallet, id, malicious, chain);
    const { url, init } = request();
    expect(url.pathname).toBe(`/api/v1/wallets/${wallet}/policies/preparations/${id}:submit`);
    expect(url.search).toBe("?chainId=11155111");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string)).toEqual({ signature });
    expect(result.state).toBe("submitted");
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  test("a lost submit reply never prepares or broadcasts a second operation", async () => {
    fetchImpl.mockRejectedValueOnce(new Error("connection lost after send"));
    await expect(
      client.policies.submitPreparation(wallet, id, { signature }, chain),
    ).rejects.toBeInstanceOf(NetworkError);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    reply({
      ...prepared,
      state: "submitting",
      reason: "Broadcast outcome unknown",
    });
    const result = await client.policies.getPreparation(wallet, id, chain);
    expect(result.signing?.userOpHash).toBe(prepared.signing?.userOpHash);
    expect(request(1).init.method).toBe("GET");
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  test("cancel only prepares a new signing review, and a successful cancel remains distinguishable", async () => {
    const cancelId = "01JCANCEL0000000000000000";
    const cancel = { ...prepared, preparationId: cancelId, isCancel: true };
    reply(cancel);
    await expect(client.policies.prepareCancel(wallet, id, chain)).resolves.toEqual(cancel);
    const { url, init } = request();
    expect(url.pathname).toBe(`/api/v1/wallets/${wallet}/policies/preparations/${id}:cancel`);
    expect(url.search).toBe("?chainId=11155111");
    expect(init.method).toBe("POST");
    expect(init.body).toBeUndefined();
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    reply({ ...cancel, state: "active" });
    const settled = await client.policies.getPreparation(wallet, cancelId, chain);
    expect(settled).toMatchObject({ state: "active", isCancel: true });
  });

  test("encodes wallet and preparation identifiers as single path segments", async () => {
    reply(prepared);
    await client.policies.getPreparation("wallet/one", "review?chainId=1", chain);
    expect(request().url.pathname).toBe(
      "/api/v1/wallets/wallet%2Fone/policies/preparations/review%3FchainId%3D1",
    );
    expect(request().url.search).toBe("?chainId=11155111");
  });

  test.each([404, 409, 429, 503])(
    "preserves HTTP %s and problem details without automatic retry",
    async (status) => {
      reply(
        {
          code: "BUDGET_CHANGING",
          title: "Runs paused",
          detail: "Waiting for the held nonce",
        },
        status,
      );
      const result = client.policies.submitPreparation(wallet, id, { signature }, chain);
      await expect(result).rejects.toBeInstanceOf(APIError);
      await expect(result).rejects.toMatchObject({
        status,
        code: "BUDGET_CHANGING",
        message: "Waiting for the held nonce",
      });
      expect(fetchImpl).toHaveBeenCalledTimes(1);
    },
  );

  test.each([false, true, undefined])(
    "preserves the gateway send boundary (%s) without inferring or retrying",
    async (submissionStarted) => {
      const problem: v4.Problem = {
        type: "about:blank",
        title: "Budget couldn't be submitted",
        status: 503,
        code: "BUDGET_READ_UNAVAILABLE",
        ...(submissionStarted === undefined ? {} : { submissionStarted }),
      };
      reply(problem, 503);
      const failure = await client.policies
        .submitPreparation(wallet, id, { signature }, chain)
        .catch((error: unknown) => error);
      expect(failure).toBeInstanceOf(APIError);
      expect((failure as APIError).problem).toStrictEqual(problem);
      expect(fetchImpl).toHaveBeenCalledTimes(1);
    },
  );

  test("exposes the observed owner delegate in a structured refusal", async () => {
    const problem: v4.Problem = {
      type: "about:blank",
      title: "Owner wallet account setup is not supported",
      status: 409,
      code: "EOA_DELEGATION_MISSING",
      ownerDelegate: wallet,
    };
    reply(problem, 409);
    const result = client.policies.prepare(wallet, { ...chain, agentLabel: "Sweep", budget: {} });
    await expect(result).rejects.toMatchObject({
      status: 409,
      code: "EOA_DELEGATION_MISSING",
      problem,
    });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  test("legacy grant refuses a budget response before prompting or submitting", async () => {
    reply({ ...prepared, typedData: { legacy: "must not sign" } });
    const sign = jest.fn();
    await expect(
      client.policies.grant(wallet, { ...chain, agentLabel: "Later Skill" }, sign),
    ).rejects.toThrow("submitPreparation");
    expect(sign).not.toHaveBeenCalled();
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  test("legacy grant refuses an absent signing payload before calling the signer", async () => {
    reply({ ...prepared, signing: undefined, preparationId: undefined });
    const sign = jest.fn();
    await expect(
      client.policies.grant(wallet, { ...chain, agentLabel: "Malformed response" }, sign),
    ).rejects.toThrow("no legacy typed-data payload");
    expect(sign).not.toHaveBeenCalled();
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  test.each([false, true])(
    "legacy grant preserves delegated-recipient acknowledgements (merged: %s)",
    async (merged) => {
      const acknowledgement: v4.DelegatedNativeRecipient = { recipient: wallet, delegate: token };
      const typedData = { domain: { chainId: chain.chainId }, message: { nonce: "0x1" } };
      const legacy = {
        ...prepared,
        signing: undefined,
        preparationId: undefined,
        budget: undefined,
        typedData,
        delegatedNativeRecipients: [acknowledgement],
      };
      reply(legacy);
      reply({ id, status: "pending", supersededPolicyIds: [] });
      const input: v4.PreparePolicyRequest = {
        ...chain,
        agentLabel: "Legacy permission",
        expiresInSeconds: 3600,
        delegatedNativeRecipients: merged
          ? [{ recipient: wallet, delegate: wallet }]
          : [acknowledgement],
        ...(merged ? { add: { nativeRecipients: [wallet], nativeSpendCap: { amount: "1" } } } : {}),
      };
      const sign = jest.fn().mockResolvedValue(signature);
      await client.policies.grant(wallet, input, sign);
      expect(sign).toHaveBeenCalledWith(typedData);
      expect(JSON.parse(request(1).init.body as string).delegatedNativeRecipients).toEqual([
        acknowledgement,
      ]);
      expect(fetchImpl).toHaveBeenCalledTimes(2);
    },
  );
});
