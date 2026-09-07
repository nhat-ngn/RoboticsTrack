import type { TrackId } from "./types";

/**
 * Authoring format for a week. Compact on purpose — the week files are the
 * longest content in the app and a tuple keeps them readable.
 *
 *   [n, title, focus, tasks, deliverable?]
 *
 * Inside a task string:
 *   "!"  prefix  → this task is a prerequisite gate for later material
 *   "@a,b" suffix → resource ids from resources.ts
 */
export type RawWeek = [
  n: number,
  title: string,
  focus: string,
  tasks: Partial<Record<TrackId, string[]>>,
  deliverable?: string,
];
