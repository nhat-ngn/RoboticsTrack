/**
 * NOTE: no longer the app's source of truth.
 *
 * The site now ships as a static build on GitHub Pages, so all mutable state
 * lives in the browser's localStorage (see src/web/lib/store.ts). These
 * procedures and their tables are kept intact — they still work when running
 * `bun run dev` — for optional future cross-device sync.
 */
import { z } from "zod";
import { inArray } from "drizzle-orm";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";

/**
 * Checkbox state for every checkable item in the plan (week tasks, concepts,
 * robotics milestones, interview milestones). Item ids are stable strings
 * generated from the static content, so rows survive content edits.
 */
export const progress = {
  /** Every ticked item id. The client treats "absent" as not done. */
  list: base.handler(async () => {
    const rows = await db
      .select({ itemId: schema.progress.itemId, done: schema.progress.done })
      .from(schema.progress);
    return rows.filter((r) => r.done).map((r) => r.itemId);
  }),

  toggle: base
    .input(z.object({ itemId: z.string().min(1), done: z.boolean() }))
    .handler(async ({ input }) => {
      await db
        .insert(schema.progress)
        .values({ itemId: input.itemId, done: input.done, updatedAt: new Date() })
        .onConflictDoUpdate({
          target: schema.progress.itemId,
          set: { done: input.done, updatedAt: new Date() },
        });
      return { itemId: input.itemId, done: input.done };
    }),

  /** Tick or untick a whole group at once (a week, a concept module). */
  bulkToggle: base
    .input(
      z.object({
        itemIds: z.array(z.string().min(1)).max(2000),
        done: z.boolean(),
      }),
    )
    .handler(async ({ input }) => {
      if (input.itemIds.length === 0) return { count: 0, done: input.done };
      if (input.done) {
        const now = new Date();
        for (let i = 0; i < input.itemIds.length; i += 100) {
          const chunk = input.itemIds.slice(i, i + 100);
          await db
            .insert(schema.progress)
            .values(chunk.map((itemId) => ({ itemId, done: true, updatedAt: now })))
            .onConflictDoUpdate({
              target: schema.progress.itemId,
              set: { done: true, updatedAt: now },
            });
        }
      } else {
        for (let i = 0; i < input.itemIds.length; i += 100) {
          const chunk = input.itemIds.slice(i, i + 100);
          await db
            .delete(schema.progress)
            .where(inArray(schema.progress.itemId, chunk));
        }
      }
      return { count: input.itemIds.length, done: input.done };
    }),
};
