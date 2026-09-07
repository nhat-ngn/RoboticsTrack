import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * NOTE: since the site moved to a static GitHub Pages build, these tables are
 * no longer the app's source of truth — progress, hours and availability now
 * live in the browser's localStorage (src/web/lib/store.ts). The schema is kept
 * for local dev and for optional future cross-device sync.
 */

/**
 * The curriculum itself is static TypeScript in src/web/content/ — the database
 * stores only mutable state: which checkboxes are ticked and how many hours were
 * actually logged per week and track. There is no login: this is one person's
 * roadmap, so state is global — there is nothing to scope to a user.
 */

/** One row per ticked item. item_id is a stable content id (task / concept / milestone). */
export const progress = sqliteTable("progress", {
  itemId: text("item_id").primaryKey(),
  done: integer("done", { mode: "boolean" }).notNull().default(true),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

/**
 * Editable weekly availability for the planner, one row per plan week.
 * `cells` is a 238-character "0"/"1" grid: 7 days x 34 half-hours (06:00-23:00),
 * day-major. `targetHours` is how much work to try to fit that week.
 */
export const availability = sqliteTable("availability", {
  week: integer("week").primaryKey(),
  cells: text("cells").notNull(),
  targetHours: real("target_hours").notNull().default(30),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

/** Hours actually spent, keyed by "<week>-<track>" so a set is an upsert. */
export const hours = sqliteTable("hours", {
  id: text("id").primaryKey(),
  week: integer("week").notNull(),
  track: text("track").notNull(),
  hours: real("hours").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
