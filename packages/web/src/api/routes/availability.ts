/**
 * NOTE: no longer the app's source of truth.
 *
 * The site now ships as a static build on GitHub Pages, so all mutable state
 * lives in the browser's localStorage (see src/web/lib/store.ts). These
 * procedures and their tables are kept intact — they still work when running
 * `bun run dev` — for optional future cross-device sync.
 */
import { z } from "zod";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";

/** 7 days x 34 half-hour units (06:00-23:00) — must match lib/scheduler.ts. */
const CELL_COUNT = 238;

const cellsSchema = z
  .string()
  .length(CELL_COUNT)
  .regex(/^[01]+$/, "cells must be a 0/1 grid");

/**
 * The planner's editable weekly availability. The schedule itself is not
 * stored: it is recomputed in the browser from availability + undone tasks,
 * so it stays correct as tasks get ticked off.
 */
export const availability = {
  list: base.handler(async () => {
    return db
      .select({
        week: schema.availability.week,
        cells: schema.availability.cells,
        targetHours: schema.availability.targetHours,
      })
      .from(schema.availability);
  }),

  set: base
    .input(
      z.object({
        week: z.number().int().min(1).max(105),
        cells: cellsSchema,
        targetHours: z.number().min(0).max(100),
      }),
    )
    .handler(async ({ input }) => {
      await db
        .insert(schema.availability)
        .values({
          week: input.week,
          cells: input.cells,
          targetHours: input.targetHours,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: schema.availability.week,
          set: {
            cells: input.cells,
            targetHours: input.targetHours,
            updatedAt: new Date(),
          },
        });
      return input;
    }),
};
