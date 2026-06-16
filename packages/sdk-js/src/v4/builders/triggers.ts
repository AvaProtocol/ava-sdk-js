import type { v4 } from "@avaprotocol/types";

/**
 * Typed builders for the Trigger discriminated union. Output is a
 * plain JSON object shaped like `v4.Trigger` (no class instances) so
 * it round-trips cleanly across the REST boundary.
 *
 * Conventional usage:
 *
 *   import { Triggers } from "@avaprotocol/sdk-js";
 *   const trigger = Triggers.cron({ name: "every5min", schedule: ["asterisk/5 * * * *"] });
 *   const wf = await client.workflows.create({ trigger, nodes, ... });
 *
 * The builders ARE NOT classes — calling each returns a plain object
 * the REST surface accepts. Keep the same shape on the wire whether
 * SDK callers use the builder or hand-assemble the object.
 */
export const Triggers = Object.freeze({
  block(opts: { name: string; id?: string; interval: number; chainId?: number }): v4.Trigger {
    return {
      type: "block",
      name: opts.name,
      ...(opts.id ? { id: opts.id } : {}),
      // The OpenAPI Trigger schema is a discriminated union — the
      // inline shape below carries the BlockTrigger's `config` slot
      // alongside the discriminator. Both forms (`{type, config}` and
      // the `BlockTrigger.type` enum) survive the wire-level merge
      // oapi-codegen's serializer performs.
      config: { interval: opts.interval, ...(opts.chainId ? { chainId: opts.chainId } : {}) },
    } as v4.Trigger;
  },

  cron(opts: {
    name: string;
    id?: string;
    /** Crontab strings — multiple schedules OR together. */
    schedule: string[];
    timezone?: string;
  }): v4.Trigger {
    return {
      type: "cron",
      name: opts.name,
      ...(opts.id ? { id: opts.id } : {}),
      config: {
        schedules: opts.schedule,
        ...(opts.timezone ? { timezone: opts.timezone } : {}),
      },
    } as v4.Trigger;
  },

  fixedTime(opts: { name: string; id?: string; epochsMs: number[] }): v4.Trigger {
    return {
      type: "fixedTime",
      name: opts.name,
      ...(opts.id ? { id: opts.id } : {}),
      config: { epochs: opts.epochsMs },
    } as v4.Trigger;
  },

  manual(opts: {
    name: string;
    id?: string;
    lang?: v4.Lang;
    /** Payload returned in the trigger output when the workflow is triggered. */
    data?: Record<string, unknown>;
    /** Optional HTTP headers (for webhook-style testing). */
    headers?: Record<string, string>;
    /** Optional URL path params (for webhook-style testing). */
    pathParams?: Record<string, string>;
  }): v4.Trigger {
    return {
      type: "manual",
      name: opts.name,
      ...(opts.id ? { id: opts.id } : {}),
      config: {
        lang: opts.lang ?? "json",
        ...(opts.data !== undefined ? { data: opts.data } : {}),
        ...(opts.headers ? { headers: opts.headers } : {}),
        ...(opts.pathParams ? { pathParams: opts.pathParams } : {}),
      },
    } as v4.Trigger;
  },

  event(opts: {
    name: string;
    id?: string;
    queries: Array<{
      addresses?: string[];
      /** Topic filters; empty string ("") matches any topic at that index. */
      topics?: string[];
      maxEventsPerBlock?: number;
      conditions?: Array<{
        fieldName: string;
        operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains";
        fieldType?: string;
        value: string;
      }>;
    }>;
    chainId?: number;
    cooldownSeconds?: number;
  }): v4.Trigger {
    return {
      type: "event",
      name: opts.name,
      ...(opts.id ? { id: opts.id } : {}),
      config: {
        queries: opts.queries,
        ...(opts.chainId ? { chainId: opts.chainId } : {}),
        ...(opts.cooldownSeconds !== undefined ? { cooldownSeconds: opts.cooldownSeconds } : {}),
      },
    } as v4.Trigger;
  },
});
