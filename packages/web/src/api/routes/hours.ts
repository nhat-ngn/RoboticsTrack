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

/**
 * Hours actually logged per week and track, compared on the dashboard against
 * the planned budget (math 7, cs 12, ml 4, rob 12).
 */
export const hours = {
  list: base.handler(async () => {
    return db
      .select({
        id: schema.hours.id,
        week: schema.hours.week,
        track: schema.hours.track,
        hours: schema.hours.hours,
      })
      .from(schema.hours);
  }),

  set: base
    .input(
      z.object({
        week: z.number().int().min(1).max(105),
        track: z.enum(["math", "cs", "ml", "rob"]),
        hours: z.number().min(0).max(80),
      }),
    )
    .handler(async ({ input }) => {
      const id = `${input.week}-${input.track}`;
      await db
        .insert(schema.hours)
        .values({
          id,
          week: input.week,
          track: input.track,
          hours: input.hours,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: schema.hours.id,
          set: { hours: input.hours, updatedAt: new Date() },
        });
      return { id, week: input.week, track: input.track, hours: input.hours };
    }),
};
