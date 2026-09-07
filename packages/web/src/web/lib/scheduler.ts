import type { Task, TrackId, Week } from "../content";
import { plannedHours, weeks } from "../content";
import { TRACK_ORDER } from "./track";

/**
 * WEEKLY PLANNER — the scheduling core.
 *
 * Problem: given a set of free time blocks for one week and a backlog of
 * undone plan tasks, choose which tasks to do in which block so the week is
 * as valuable as possible.
 *
 * This is a multiple-knapsack problem, which is NP-hard, so there is no
 * polynomial exact algorithm for the whole week at once. What IS exactly
 * solvable in polynomial time is one block in isolation: that is a 0/1
 * knapsack over the remaining tasks, solved by dynamic programming.
 *
 * The strategy here is therefore "exact per block, greedy across blocks":
 * walk the blocks in chronological order and solve each one optimally
 * against whatever tasks are still unassigned. That is a heuristic for the
 * week as a whole (an early block can selfishly take a task a later block
 * needed more) but it is optimal for each block given its inputs, it runs in
 * milliseconds, and it never produces an invalid schedule.
 *
 * See explainDp() at the bottom for the write-up rendered on the page.
 */

/** Time is discretised into 30-minute units — the whole DP works in units. */
export const UNIT_MIN = 30;
export const DAY_START_H = 6;
export const DAY_END_H = 23;
/** 34 half-hours per day, 06:00 -> 23:00. */
export const UNITS_PER_DAY = ((DAY_END_H - DAY_START_H) * 60) / UNIT_MIN;
export const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const CELL_COUNT = DAY_LABELS.length * UNITS_PER_DAY;

/** Bonus applied to a task matching the block's focus track. */
const FOCUS_BONUS = 1.35;
/** Multiplier for prerequisite tasks — gates should get scheduled first. */
const GATE_BONUS = 1.6;
/** How many weeks ahead still count as urgent. */
const URGENCY_SPAN = 8;
/**
 * Longest single sitting for one task, in units (2h). Tasks longer than this
 * are split into numbered sessions before they reach the DP. Without this a
 * 4h task can never enter a 3h weeknight block, so weeknights came out empty
 * and only the long weekend blocks got filled.
 */
const CHUNK_MAX = 4;

// ---------------------------------------------------------------------------
// Availability grid
// ---------------------------------------------------------------------------

/** A contiguous run of free half-hours on one day. */
export interface Block {
  day: number;
  /** Index of the first free unit within the day (0 = 06:00). */
  startUnit: number;
  /** Length in 30-minute units. */
  units: number;
}

export function emptyCells(): string {
  return "0".repeat(CELL_COUNT);
}

/**
 * A sensible starting week, from the user's stated rhythm: up at 6, lectures
 * 8-18, gym/tennis 18-19, dinner 19-20, then work 20-23 on weekdays; weekends
 * free of lectures. Editable on the page — this is only a starting point.
 */
export function defaultCells(): string {
  const cells: string[] = Array.from({ length: CELL_COUNT }, () => "0");
  const mark = (day: number, fromH: number, toH: number) => {
    const from = Math.round(((fromH - DAY_START_H) * 60) / UNIT_MIN);
    const to = Math.round(((toH - DAY_START_H) * 60) / UNIT_MIN);
    for (let u = Math.max(0, from); u < Math.min(UNITS_PER_DAY, to); u++) {
      cells[day * UNITS_PER_DAY + u] = "1";
    }
  };
  for (let d = 0; d < 5; d++) mark(d, 20, 23);
  for (const d of [5, 6]) {
    mark(d, 9, 12.5);
    mark(d, 14, 18);
    mark(d, 20, 22);
  }
  return cells.join("");
}

export function isFree(cells: string, day: number, unit: number): boolean {
  return cells[day * UNITS_PER_DAY + unit] === "1";
}

export function toggleCell(cells: string, index: number): string {
  const arr = cells.split("");
  arr[index] = arr[index] === "1" ? "0" : "1";
  return arr.join("");
}

export function setCell(cells: string, index: number, on: boolean): string {
  const arr = cells.split("");
  arr[index] = on ? "1" : "0";
  return arr.join("");
}

/** Normalise anything coming out of the database to a valid grid string. */
export function safeCells(raw: string | null | undefined): string {
  if (!raw || raw.length !== CELL_COUNT || /[^01]/.test(raw)) {
    return raw === "" ? emptyCells() : defaultCells();
  }
  return raw;
}

export function totalFreeMinutes(cells: string): number {
  let n = 0;
  for (const c of cells) if (c === "1") n++;
  return n * UNIT_MIN;
}

/** Collapse the grid into contiguous blocks, in chronological order. */
export function blocksFromCells(cells: string): Block[] {
  const out: Block[] = [];
  for (let day = 0; day < DAY_LABELS.length; day++) {
    let run = 0;
    for (let u = 0; u <= UNITS_PER_DAY; u++) {
      const free = u < UNITS_PER_DAY && isFree(cells, day, u);
      if (free) {
        run++;
      } else if (run > 0) {
        out.push({ day, startUnit: u - run, units: run });
        run = 0;
      }
    }
  }
  return out;
}

export function unitToClock(unit: number): string {
  const mins = DAY_START_H * 60 + unit * UNIT_MIN;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function blockLabel(b: Block): string {
  return `${unitToClock(b.startUnit)}-${unitToClock(b.startUnit + b.units)}`;
}

// ---------------------------------------------------------------------------
// Backlog: turning plan tasks into schedulable items
// ---------------------------------------------------------------------------

export interface BacklogItem {
  /** Unique per session: the task id, suffixed with #part when it was split. */
  id: string;
  /** The plan task this session belongs to — the id used for progress ticks. */
  taskId: string;
  /** 1-based session number and total sessions for this task. */
  part: number;
  parts: number;
  track: TrackId;
  text: string;
  gate: boolean;
  week: number;
  /** Duration in 30-minute units. */
  units: number;
  /** Scheduling value — higher means "get this done sooner". */
  value: number;
}

/**
 * Split a task's total duration into sessions of at most CHUNK_MAX units,
 * as evenly as possible (5 units -> 3+2, not 4+1).
 */
export function chunkUnits(total: number): number[] {
  const parts = Math.ceil(total / CHUNK_MAX);
  if (parts <= 1) return [total];
  const base = Math.floor(total / parts);
  let rem = total % parts;
  const out: number[] = [];
  for (let i = 0; i < parts; i++) {
    out.push(base + (rem > 0 ? 1 : 0));
    if (rem > 0) rem--;
  }
  return out;
}

/**
 * Tasks carry no duration in the content files, so it is derived: each track's
 * weekly hour budget is split across that track's tasks in that week, rounded
 * to the nearest half hour and clamped to 0.5-4h. A week whose tasks all get
 * scheduled therefore consumes roughly that week's planned budget.
 */
export function taskUnits(task: Task, week: Week): number {
  const sameTrack = week.tasks.filter((t) => t.track === task.track).length;
  if (sameTrack === 0) return 1;
  const minutes = (plannedHours[task.track] * 60) / sameTrack;
  const units = Math.round(minutes / UNIT_MIN);
  return Math.min(8, Math.max(1, units));
}

function itemValue(units: number, gate: boolean, weeksAhead: number): number {
  const urgency =
    1 + (Math.max(0, URGENCY_SPAN - weeksAhead) / URGENCY_SPAN) * 0.6;
  return units * urgency * (gate ? GATE_BONUS : 1);
}

/**
 * The next `targetMinutes` worth of undone work, in plan order, plus headroom
 * so the DP has genuine choices rather than a forced packing.
 */
export function buildBacklog(
  done: Set<string>,
  targetMinutes: number,
  fromWeek = 1,
): BacklogItem[] {
  const budget = targetMinutes * 1.6;
  const out: BacklogItem[] = [];
  let minutes = 0;
  for (const w of weeks) {
    if (w.n < fromWeek) continue;
    for (const t of w.tasks) {
      if (done.has(t.id)) continue;
      const sessions = chunkUnits(taskUnits(t, w));
      sessions.forEach((units, i) => {
        out.push({
          id: sessions.length > 1 ? `${t.id}#${i + 1}` : t.id,
          taskId: t.id,
          part: i + 1,
          parts: sessions.length,
          track: t.track,
          text: t.text,
          gate: t.gate,
          week: w.n,
          units,
          value: itemValue(units, t.gate, w.n - fromWeek),
        });
        minutes += units * UNIT_MIN;
      });
    }
    if (minutes >= budget) break;
  }
  return out;
}

// ---------------------------------------------------------------------------
// The dynamic program: 0/1 knapsack for a single block
// ---------------------------------------------------------------------------

/**
 * Exact 0/1 knapsack over `items` for a block of `capacity` units.
 *
 *   dp[i][c] = best value using only items 0..i-1 within capacity c
 *   dp[i][c] = max( dp[i-1][c],                              // skip item i-1
 *                   dp[i-1][c - w_i] + v_i )                 // take it
 *
 * O(n * capacity) time and memory. `focus` scales the value of matching-track
 * items so a block tends to come out single-track instead of four ten-minute
 * context switches.
 *
 * Exported for the unit tests in scripts/scheduler.test.ts.
 */
export function packBlock(
  items: BacklogItem[],
  capacity: number,
  focus: TrackId | null,
): { chosen: BacklogItem[]; value: number; used: number } {
  const n = items.length;
  if (n === 0 || capacity <= 0) return { chosen: [], value: 0, used: 0 };

  const val = (it: BacklogItem) =>
    it.value * (focus && it.track === focus ? FOCUS_BONUS : 1);

  const width = capacity + 1;
  const dp = new Float64Array((n + 1) * width);
  const take = new Uint8Array((n + 1) * width);

  for (let i = 1; i <= n; i++) {
    const it = items[i - 1];
    const w = it.units;
    const v = val(it);
    for (let c = 0; c <= capacity; c++) {
      const skip = dp[(i - 1) * width + c];
      let best = skip;
      let took = 0;
      if (w <= c) {
        const cand = dp[(i - 1) * width + (c - w)] + v;
        if (cand > best) {
          best = cand;
          took = 1;
        }
      }
      dp[i * width + c] = best;
      take[i * width + c] = took;
    }
  }

  // Walk the decisions back to recover which items were actually chosen.
  const chosen: BacklogItem[] = [];
  let c = capacity;
  for (let i = n; i >= 1; i--) {
    if (take[i * width + c] === 1) {
      const it = items[i - 1];
      chosen.push(it);
      c -= it.units;
    }
  }
  chosen.reverse();
  const used = chosen.reduce((a, it) => a + it.units, 0);
  return { chosen, value: dp[n * width + capacity], used };
}

export interface ScheduledBlock extends Block {
  items: BacklogItem[];
  focus: TrackId | null;
  usedUnits: number;
}

export interface Schedule {
  blocks: ScheduledBlock[];
  /** Backlog items that did not fit anywhere. */
  leftover: BacklogItem[];
  scheduledMinutes: number;
  freeMinutes: number;
  byTrack: Record<TrackId, number>;
}

/**
 * Each track's share of the week, in minutes, scaled so the four quotas add up
 * to the time actually available. With 34h free and budgets of 7/12/4/12 the
 * quotas land near the planned budgets themselves.
 */
export function trackQuotas(freeMinutes: number): Record<TrackId, number> {
  const totalPlanned = TRACK_ORDER.reduce((a, t) => a + plannedHours[t], 0);
  const out = { math: 0, cs: 0, ml: 0, rob: 0 } as Record<TrackId, number>;
  for (const t of TRACK_ORDER) {
    out[t] = (plannedHours[t] / totalPlanned) * freeMinutes;
  }
  return out;
}

/**
 * How much a track's items are still worth, given how much of its quota it has
 * already eaten this week. Full value until the quota is gone, then down to
 * 0.2× — enough that an over-quota task still beats leaving a block empty, but
 * not enough to outbid a track that has not been touched yet.
 *
 * Without this the schedule was pathological: value is roughly proportional to
 * duration, so most packings tie, ties resolve toward whichever item the DP
 * saw first, and that is plan order — math, cs, ml, rob. Robotics came out
 * with a flat zero hours every week despite being the biggest budget.
 */
function quotaWeight(used: number, quota: number): number {
  if (quota <= 0) return 0.2;
  const left = Math.max(0, quota - used) / quota;
  return 0.2 + 0.8 * left;
}

/**
 * Fill the week. Blocks are processed in chronological order; each one is
 * solved exactly by packBlock against the still-unassigned items, trying every
 * focus track (plus no focus) and keeping whichever scores best. Between
 * blocks, item values are re-weighted by how much of each track's weekly quota
 * is left, which keeps the four tracks roughly in their planned proportions.
 */
export function buildSchedule(
  cells: string,
  backlog: BacklogItem[],
): Schedule {
  const blocks = blocksFromCells(cells);
  const remaining = new Map(backlog.map((it) => [it.id, it]));
  const out: ScheduledBlock[] = [];
  const byTrack: Record<TrackId, number> = { math: 0, cs: 0, ml: 0, rob: 0 };
  let scheduledMinutes = 0;
  const quotas = trackQuotas(totalFreeMinutes(cells));

  for (const b of blocks) {
    // Re-weight against the quota still outstanding for each track.
    const pool = [...remaining.values()].map((it) => ({
      ...it,
      value: it.value * quotaWeight(byTrack[it.track], quotas[it.track]),
    }));
    const focuses: (TrackId | null)[] = [null, ...TRACK_ORDER];
    let best: { chosen: BacklogItem[]; value: number; used: number } | null =
      null;
    let bestFocus: TrackId | null = null;

    for (const focus of focuses) {
      const r = packBlock(pool, b.units, focus);
      if (
        !best ||
        r.value > best.value ||
        (r.value === best.value && r.used > best.used)
      ) {
        best = r;
        bestFocus = focus;
      }
    }

    const chosen = best?.chosen ?? [];
    for (const it of chosen) {
      remaining.delete(it.id);
      byTrack[it.track] += it.units * UNIT_MIN;
      scheduledMinutes += it.units * UNIT_MIN;
    }
    out.push({
      ...b,
      items: chosen,
      focus: chosen.length > 0 ? bestFocus : null,
      usedUnits: best?.used ?? 0,
    });
  }

  const leftover = [...remaining.values()].map((it) => ({ ...it }));
  tidySessions(out, leftover);

  return {
    blocks: out,
    leftover,
    scheduledMinutes,
    freeMinutes: totalFreeMinutes(cells),
    byTrack,
  };
}

/**
 * Cosmetic pass over the finished schedule — it changes no assignments, only
 * how they read.
 *
 * Two things go wrong otherwise. The DP treats a task's sessions as
 * independent items, so both halves of one task can land in the same block and
 * render as the same line twice; those are merged back into one sitting. And
 * because sessions are picked by value rather than in order, a task's
 * "session 2/2" could be scheduled on Monday with "session 1/2" on Friday, so
 * they are renumbered in the order you will actually sit down and do them.
 */
function tidySessions(blocks: ScheduledBlock[], leftover: BacklogItem[]): void {
  for (const b of blocks) {
    const merged = new Map<string, BacklogItem>();
    for (const it of b.items) {
      const prev = merged.get(it.taskId);
      if (prev) prev.units += it.units;
      else merged.set(it.taskId, { ...it });
    }
    b.items = [...merged.values()];
  }

  const total = new Map<string, number>();
  const bump = (id: string) => total.set(id, (total.get(id) ?? 0) + 1);
  for (const b of blocks) for (const it of b.items) bump(it.taskId);
  for (const it of leftover) bump(it.taskId);

  const seen = new Map<string, number>();
  const number = (it: BacklogItem) => {
    const n = (seen.get(it.taskId) ?? 0) + 1;
    seen.set(it.taskId, n);
    it.part = n;
    it.parts = total.get(it.taskId) ?? 1;
  };
  for (const b of blocks) for (const it of b.items) number(it);
  for (const it of leftover) number(it);
}

export function fmtMinutes(m: number): string {
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (h === 0) return `${r}min`;
  return r === 0 ? `${h}h` : `${h}h${String(r).padStart(2, "0")}`;
}

/** Rendered on the planner page — this is also a CS exercise, so show the work. */
export const DP_NOTE = {
  problem:
    "You have a set of free blocks this week and a backlog of tasks with estimated durations and priorities. Choose what goes where to maximise the value of the week.",
  hardness:
    "Packing many items into many bins is multiple knapsack, which is NP-hard — no known polynomial exact algorithm. But one block in isolation is a plain 0/1 knapsack, and that is solvable exactly by DP in O(n·C).",
  recurrence:
    "dp[i][c] = max(dp[i-1][c], dp[i-1][c-w_i] + v_i)  — best value using the first i tasks within capacity c. Answer at dp[n][C]; walk the take-flags backwards to recover the chosen set.",
  strategy:
    "Blocks are processed in chronological order and each is solved exactly against whatever is still unassigned. Optimal per block, greedy across blocks: an early block can take a task a later one needed more, so the week is a good schedule, not a provably optimal one.",
  sessions:
    "Durations are derived by splitting each track's weekly budget across that track's tasks in that week. Anything longer than 2h is cut into numbered sessions before the DP sees it — otherwise a 4h task can never enter a 3h weeknight block, and weeknights come out empty while the weekend does all the work.",
  values:
    "v = duration × urgency × gate bonus. Urgency decays over 8 weeks, gates score 1.6×, and a block gets a 1.35× bonus for tasks matching its focus track — that is what makes blocks come out single-track instead of four context switches.",
  quotas:
    "Between blocks each track's items are re-weighted by how much of its weekly quota is left (full value down to 0.2× once spent). Value is roughly proportional to duration, so most packings tie and ties resolve toward whatever the DP saw first — plan order. Before this, robotics scored a flat zero hours every week despite having the largest budget.",
  complexity:
    "O(B · 5 · n · C) overall: B blocks, 5 focus options, n backlog items, C units of capacity. With ~15 blocks, ~40 items and ≤34 units that is well under a millisecond.",
  exercise:
    "Worth extending: make it exact with DP over a bitmask of blocks (feasible for ≤20 blocks), add task dependencies so a gate must precede its dependents, or treat it as bin packing with First-Fit-Decreasing and compare the 11/9 approximation bound against what this produces.",
};
