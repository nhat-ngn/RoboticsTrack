/**
 * Tests for the planner's DP. Run: bun run scripts/scheduler.test.ts
 *
 * The important one is optimality: a knapsack that returns a plausible-looking
 * answer is worthless, so packBlock is cross-checked against brute-force
 * subset enumeration on hundreds of random instances.
 */
import type { BacklogItem } from "../packages/web/src/web/lib/scheduler";
import {
  CELL_COUNT,
  UNITS_PER_DAY,
  blocksFromCells,
  buildBacklog,
  buildSchedule,
  defaultCells,
  emptyCells,
  packBlock,
  safeCells,
  totalFreeMinutes,
} from "../packages/web/src/web/lib/scheduler";

let passed = 0;
let failed = 0;

function check(name: string, cond: boolean, detail = "") {
  if (cond) {
    passed++;
  } else {
    failed++;
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

// Deterministic PRNG so a failure is reproducible.
let seed = 12345;
function rnd(n: number): number {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed % n;
}

const TRACKS = ["math", "cs", "ml", "rob"] as const;

function randomItems(n: number): BacklogItem[] {
  return Array.from({ length: n }, (_, i) => {
    const units = 1 + rnd(6);
    return {
      id: `t${i}`,
      track: TRACKS[rnd(4)],
      text: `task ${i}`,
      gate: rnd(3) === 0,
      week: 1 + rnd(5),
      units,
      value: 1 + rnd(50),
    };
  });
}

/** Exact optimum by enumerating every subset — only viable for small n. */
function bruteForce(items: BacklogItem[], capacity: number): number {
  let best = 0;
  const n = items.length;
  for (let mask = 0; mask < 1 << n; mask++) {
    let w = 0;
    let v = 0;
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        w += items[i].units;
        v += items[i].value;
      }
    }
    if (w <= capacity && v > best) best = v;
  }
  return best;
}

console.log("\nscheduler DP tests\n");

// --- 1. packBlock is optimal --------------------------------------------
{
  let worst = 0;
  for (let trial = 0; trial < 300; trial++) {
    const items = randomItems(1 + rnd(12));
    const capacity = 1 + rnd(20);
    const got = packBlock(items, capacity, null);
    const want = bruteForce(items, capacity);
    // focus=null means value() is identity, so the DP value must equal the optimum.
    if (Math.abs(got.value - want) > 1e-9) {
      worst++;
      if (worst < 3) {
        console.log(
          `        n=${items.length} cap=${capacity} dp=${got.value} brute=${want}`,
        );
      }
    }
  }
  check("packBlock matches brute-force optimum on 300 random instances", worst === 0, `${worst} mismatches`);
}

// --- 2. packBlock respects capacity and never reuses an item ------------
{
  let bad = 0;
  for (let trial = 0; trial < 300; trial++) {
    const items = randomItems(1 + rnd(20));
    const capacity = rnd(25);
    const { chosen, used } = packBlock(items, capacity, null);
    const sum = chosen.reduce((a, it) => a + it.units, 0);
    const ids = new Set(chosen.map((it) => it.id));
    if (sum > capacity || sum !== used || ids.size !== chosen.length) bad++;
  }
  check("packBlock never exceeds capacity or duplicates items", bad === 0, `${bad} violations`);
}

// --- 3. reconstruction agrees with the reported value -------------------
{
  let bad = 0;
  for (let trial = 0; trial < 200; trial++) {
    const items = randomItems(1 + rnd(12));
    const capacity = 1 + rnd(18);
    const { chosen, value } = packBlock(items, capacity, null);
    const sum = chosen.reduce((a, it) => a + it.value, 0);
    if (Math.abs(sum - value) > 1e-9) bad++;
  }
  check("chosen set sums to the reported DP value", bad === 0, `${bad} mismatches`);
}

// --- 4. edge cases ------------------------------------------------------
{
  check("empty item list", packBlock([], 10, null).chosen.length === 0);
  check("zero capacity", packBlock(randomItems(5), 0, null).chosen.length === 0);
  const big = packBlock([{ ...randomItems(1)[0], units: 99 }], 4, null);
  check("item larger than capacity is skipped", big.chosen.length === 0);
}

// --- 5. focus bonus actually biases toward one track --------------------
{
  const items: BacklogItem[] = [
    { id: "a", track: "cs", text: "", gate: false, week: 1, units: 2, value: 10 },
    { id: "b", track: "math", text: "", gate: false, week: 1, units: 2, value: 11 },
  ];
  const none = packBlock(items, 2, null);
  const focused = packBlock(items, 2, "cs");
  check("without focus the higher-value task wins", none.chosen[0]?.id === "b");
  check("with cs focus the cs task wins", focused.chosen[0]?.id === "a");
}

// --- 6. availability grid ------------------------------------------------
{
  check("emptyCells has the right length", emptyCells().length === CELL_COUNT);
  check("defaultCells has the right length", defaultCells().length === CELL_COUNT);
  check("empty grid yields no blocks", blocksFromCells(emptyCells()).length === 0);
  check("empty grid has zero free minutes", totalFreeMinutes(emptyCells()) === 0);

  const d = defaultCells();
  const free = totalFreeMinutes(d);
  check("default rhythm is a plausible week (25-45h)", free >= 25 * 60 && free <= 45 * 60, `${free / 60}h`);

  // One run of 4 units on Tuesday, nothing else.
  const cells = emptyCells().split("");
  for (let u = 5; u < 9; u++) cells[UNITS_PER_DAY + u] = "1";
  const blocks = blocksFromCells(cells.join(""));
  check("single run is found as one block", blocks.length === 1);
  check("block has correct day/start/length", blocks[0]?.day === 1 && blocks[0]?.startUnit === 5 && blocks[0]?.units === 4);

  // A run touching the end of the day must still be closed.
  const tail = emptyCells().split("");
  for (let u = UNITS_PER_DAY - 3; u < UNITS_PER_DAY; u++) tail[u] = "1";
  const tailBlocks = blocksFromCells(tail.join(""));
  check("run at end of day is closed", tailBlocks.length === 1 && tailBlocks[0].units === 3);

  check("safeCells repairs garbage", safeCells("nonsense").length === CELL_COUNT);
  check("safeCells repairs wrong length", safeCells("1010").length === CELL_COUNT);
  check("safeCells preserves a valid grid", safeCells(d) === d);
}

// --- 7. full schedule invariants ----------------------------------------
{
  const backlog = buildBacklog(new Set<string>(), 30 * 60, 1);
  check("backlog is non-empty", backlog.length > 0, `${backlog.length}`);
  check("backlog ids are unique", new Set(backlog.map((i) => i.id)).size === backlog.length);
  check("every backlog item has positive duration", backlog.every((i) => i.units >= 1));

  const s = buildSchedule(defaultCells(), backlog);
  const assigned = s.blocks.flatMap((b) => b.items);
  check("no task scheduled twice", new Set(assigned.map((i) => i.id)).size === assigned.length);
  // Sessions of one task that land in the same block are merged into a single
  // sitting, so item counts do not survive scheduling — total time does.
  const backlogUnits = backlog.reduce((a, i) => a + i.units, 0);
  const assignedUnits = assigned.reduce((a, i) => a + i.units, 0);
  const leftoverUnits = s.leftover.reduce((a, i) => a + i.units, 0);
  check(
    "assigned + leftover = backlog (total time is conserved)",
    assignedUnits + leftoverUnits === backlogUnits,
    `${assignedUnits}+${leftoverUnits} vs ${backlogUnits}`,
  );
  check(
    "every backlog task appears somewhere in the schedule",
    new Set([...assigned, ...s.leftover].map((i) => i.taskId)).size ===
      new Set(backlog.map((i) => i.taskId)).size,
  );
  check(
    "no task appears twice within one block",
    s.blocks.every(
      (b) => new Set(b.items.map((i) => i.taskId)).size === b.items.length,
    ),
  );
  check(
    "sessions of a task are numbered in the order they are scheduled",
    (() => {
      const seen = new Map<string, number>();
      for (const b of s.blocks) {
        for (const it of b.items) {
          const expected = (seen.get(it.taskId) ?? 0) + 1;
          seen.set(it.taskId, expected);
          if (it.part !== expected) return false;
        }
      }
      return true;
    })(),
  );
  check("no block overflows its capacity", s.blocks.every((b) => b.usedUnits <= b.units));
  check(
    "block usage matches its items",
    s.blocks.every((b) => b.usedUnits === b.items.reduce((a, i) => a + i.units, 0)),
  );
  check("scheduled minutes never exceed free minutes", s.scheduledMinutes <= s.freeMinutes);
  check(
    "per-track totals sum to scheduled minutes",
    TRACKS.reduce((a, t) => a + s.byTrack[t], 0) === s.scheduledMinutes,
  );
  check("empty availability schedules nothing", buildSchedule(emptyCells(), backlog).scheduledMinutes === 0);

  // Done tasks must never be scheduled.
  const someDone = new Set(backlog.slice(0, 5).map((i) => i.id));
  const b2 = buildBacklog(someDone, 30 * 60, 1);
  // Items are sessions now, so ids can be "w1-cs-2#1" — the plan task id to
  // compare against progress is taskId.
  check("completed tasks are excluded from the backlog", b2.every((i) => !someDone.has(i.taskId)));
  check(
    "session ids are unique and every session maps to a real task id",
    new Set(b2.map((i) => i.id)).size === b2.length &&
      b2.every((i) => i.id === i.taskId || i.id.startsWith(`${i.taskId}#`)),
  );

  const util = Math.round((s.scheduledMinutes / s.freeMinutes) * 100);
  console.log(
    `\n  default week: ${s.freeMinutes / 60}h free, ${
      s.scheduledMinutes / 60
    }h scheduled (${util}%), ${s.leftover.length} left over`,
  );
  console.log(
    `  per track: ${TRACKS.map((t) => `${t} ${s.byTrack[t] / 60}h`).join(" · ")}`,
  );
}

console.log(`\n${failed === 0 ? "ALL PASS" : "FAILURES"} — ${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
