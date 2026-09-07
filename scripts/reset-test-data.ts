/**
 * Wipes the mutable state tables so the roadmap starts from a genuine zero.
 * Used after browser QA to clear anything ticked or painted while testing.
 *
 * Run: bun run scripts/reset-test-data.ts
 */
import { db } from "../packages/web/src/api/database";
import * as schema from "../packages/web/src/api/database/schema";

await db.delete(schema.progress);
await db.delete(schema.availability);
await db.delete(schema.hours);

const [p, a, h] = await Promise.all([
  db.select().from(schema.progress),
  db.select().from(schema.availability),
  db.select().from(schema.hours),
]);

console.log(
  `cleared — progress: ${p.length} rows, availability: ${a.length} rows, hours: ${h.length} rows`,
);
