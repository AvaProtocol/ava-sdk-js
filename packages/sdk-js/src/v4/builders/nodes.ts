import type { v4 } from "@avaprotocol/types";

/**
 * Typed builders for the Node discriminated union. Same convention
 * as `Triggers`: each builder returns a plain JSON object shaped
 * like `v4.Node` (no class instances).
 *
 *   import { Nodes } from "@avaprotocol/sdk-js";
 *   const node = Nodes.customCode({ id: "step1", name: "step1",
 *     source: "return {ok: true};" });
 *   await client.workflows.create({ trigger, nodes: [node], ... });
 */
export const Nodes = Object.freeze({
  ethTransfer(opts: {
    id: string;
    name: string;
    destination: string;
    amountWei: string;
    chainId: number;
  }): v4.Node {
    return {
      id: opts.id,
      name: opts.name,
      type: "ethTransfer",
      config: {
        destination: opts.destination,
        amount: opts.amountWei,
        chainId: opts.chainId,
      },
    } as v4.Node;
  },

  contractWrite(opts: {
    id: string;
    name: string;
    contractAddress: string;
    contractAbi?: ReadonlyArray<Record<string, unknown>>;
    methodCalls?: Array<{
      methodName: string;
      methodParams?: string[];
      callData?: string;
      applyToFields?: string[];
    }>;
    callData?: string;
    isSimulated?: boolean;
    valueWei?: string;
    gasLimit?: string;
    chainId: number;
  }): v4.Node {
    return {
      id: opts.id,
      name: opts.name,
      type: "contractWrite",
      config: {
        contractAddress: opts.contractAddress,
        ...(opts.contractAbi ? { contractAbi: opts.contractAbi } : {}),
        ...(opts.methodCalls ? { methodCalls: opts.methodCalls } : {}),
        ...(opts.callData ? { callData: opts.callData } : {}),
        ...(opts.isSimulated !== undefined ? { isSimulated: opts.isSimulated } : {}),
        ...(opts.valueWei ? { value: opts.valueWei } : {}),
        ...(opts.gasLimit ? { gasLimit: opts.gasLimit } : {}),
        chainId: opts.chainId,
      },
    } as v4.Node;
  },

  contractRead(opts: {
    id: string;
    name: string;
    contractAddress: string;
    contractAbi?: ReadonlyArray<Record<string, unknown>>;
    methodCalls?: Array<{
      methodName: string;
      methodParams?: string[];
      callData?: string;
      applyToFields?: string[];
    }>;
    chainId: number;
  }): v4.Node {
    return {
      id: opts.id,
      name: opts.name,
      type: "contractRead",
      config: {
        contractAddress: opts.contractAddress,
        ...(opts.contractAbi ? { contractAbi: opts.contractAbi } : {}),
        ...(opts.methodCalls ? { methodCalls: opts.methodCalls } : {}),
        chainId: opts.chainId,
      },
    } as v4.Node;
  },

  graphqlQuery(opts: {
    id: string;
    name: string;
    url: string;
    query: string;
    variables?: Record<string, string>;
  }): v4.Node {
    return {
      id: opts.id,
      name: opts.name,
      type: "graphqlQuery",
      config: {
        url: opts.url,
        query: opts.query,
        ...(opts.variables ? { variables: opts.variables } : {}),
      },
    } as v4.Node;
  },

  restApi(opts: {
    id: string;
    name: string;
    url: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string;
    headers?: Record<string, string>;
    options?: { summarize?: boolean };
  }): v4.Node {
    return {
      id: opts.id,
      name: opts.name,
      type: "restApi",
      config: {
        url: opts.url,
        method: opts.method,
        ...(opts.body ? { body: opts.body } : {}),
        ...(opts.headers ? { headers: opts.headers } : {}),
        ...(opts.options ? { options: opts.options } : {}),
      },
    } as v4.Node;
  },

  branch(opts: {
    id: string;
    name: string;
    conditions: Array<{ id: string; expression: string; type?: "if" | "elseIf" | "else" }>;
  }): v4.Node {
    return {
      id: opts.id,
      name: opts.name,
      type: "branch",
      config: { conditions: opts.conditions },
    } as v4.Node;
  },

  filter(opts: { id: string; name: string; expression: string; inputVariable: string }): v4.Node {
    return {
      id: opts.id,
      name: opts.name,
      type: "filter",
      config: { expression: opts.expression, inputVariable: opts.inputVariable },
    } as v4.Node;
  },

  loop(opts: {
    id: string;
    name: string;
    inputVariable: string;
    iterVar?: string;
    runner: v4.Node;
  }): v4.Node {
    return {
      id: opts.id,
      name: opts.name,
      type: "loop",
      config: {
        inputVariable: opts.inputVariable,
        ...(opts.iterVar ? { iterVar: opts.iterVar } : {}),
        runner: opts.runner,
      },
    } as v4.Node;
  },

  customCode(opts: {
    id: string;
    name: string;
    source: string;
    lang?: v4.Lang;
  }): v4.Node {
    return {
      id: opts.id,
      name: opts.name,
      type: "customCode",
      config: {
        source: opts.source,
        lang: opts.lang ?? "javascript",
      },
    } as v4.Node;
  },

  balance(opts: {
    id: string;
    name: string;
    address: string;
    chain: string;
    includeSpam?: boolean;
    includeZeroBalances?: boolean;
    minUsdValueCents?: number;
  }): v4.Node {
    return {
      id: opts.id,
      name: opts.name,
      type: "balance",
      config: {
        address: opts.address,
        chain: opts.chain,
        ...(opts.includeSpam !== undefined ? { includeSpam: opts.includeSpam } : {}),
        ...(opts.includeZeroBalances !== undefined ? { includeZeroBalances: opts.includeZeroBalances } : {}),
        ...(opts.minUsdValueCents !== undefined ? { minUsdValueCents: opts.minUsdValueCents } : {}),
      },
    } as v4.Node;
  },

  /**
   * Durable-execution pause point. The execution suspends at this node
   * (status `WAITING`, non-terminal) and resumes exactly-once when a wake
   * arrives. Two mutually-exclusive flavors — set **either** `channel` **or**
   * `chainEvent`, never both:
   *
   * - **External-signal (human approval):** `channel: "telegram" | "api"`
   *   (+ optional `approvers` / `prompt`). Resumes via
   *   `client.executions.signal(...)` with an approve/reject decision; the
   *   decision (and any `payload`) becomes this node's output, readable
   *   downstream as `{{<name>.data...}}`.
   * - **Chain-event (cross-chain):** `chainEvent` — a mid-workflow event
   *   watch (same shape as an Event trigger's config). An operator covering
   *   `chainEvent.chainId` resumes the execution when the event fires; the
   *   matched log becomes this node's output. NOT resumed via `signal(...)`.
   *
   * `timeoutSeconds` is a safety bound (0 ⇒ server default, 24h; the wait is
   * never unbounded). On timeout the execution fails.
   *
   * The XOR is enforced server-side too, but is guarded here for a friendly
   * error before the round-trip. The TS overload also makes the two flavors
   * mutually exclusive at compile time.
   */
  await(
    opts: {
      id: string;
      name: string;
      timeoutSeconds?: number;
    } & (
      | { channel: "telegram" | "api"; approvers?: string[]; prompt?: string; chainEvent?: never }
      | { chainEvent: v4.EventTriggerConfig; channel?: never; approvers?: never; prompt?: never }
    ),
  ): v4.Node {
    const hasExternal = "channel" in opts && opts.channel !== undefined;
    const hasChainEvent = "chainEvent" in opts && opts.chainEvent !== undefined;
    if (hasExternal && hasChainEvent) {
      throw new Error(
        "Nodes.await: set either `channel` (external-signal) or `chainEvent` (chain-event), not both",
      );
    }
    if (!hasExternal && !hasChainEvent) {
      throw new Error(
        "Nodes.await: must set either `channel` (external-signal) or `chainEvent` (chain-event)",
      );
    }

    const config: Record<string, unknown> = {
      ...(opts.timeoutSeconds !== undefined ? { timeoutSeconds: opts.timeoutSeconds } : {}),
    };
    if (hasChainEvent) {
      config.chainEvent = opts.chainEvent;
    } else {
      config.channel = opts.channel;
      if (opts.approvers !== undefined) config.approvers = opts.approvers;
      if (opts.prompt !== undefined) config.prompt = opts.prompt;
    }

    return {
      id: opts.id,
      name: opts.name,
      type: "await",
      config,
    } as v4.Node;
  },
});
