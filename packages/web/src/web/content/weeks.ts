import type { RawWeek } from "./raw";
import type { Phase, Task, TrackId, Week, WeekKind } from "./types";
import { weeksP1 } from "./weeks-p1";
import { weeksP2 } from "./weeks-p2";
import { weeksP3 } from "./weeks-p3";

/** Monday of week 1. */
export const PLAN_START = "2026-09-14";
/** Monday of week 105 — the last week of the plan. */
export const PLAN_END = "2028-09-11";
export const TOTAL_WEEKS = 105;

/** French Zone C school holidays that fall inside the plan (2 weeks each). */
const BREAK_WEEKS = new Set([
  6, 7, 15, 16, 24, 25, 32, 33, 59, 60, 67, 68, 76, 77, 84, 85,
]);

/** Summer — treated as optional / light sprint weeks. */
const SUMMER_WEEKS = new Set<number>([
  43, 44, 45, 46, 47, 48, 49, 50, 51, 95, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105,
]);

const PHASE_RANGES: [number, number][] = [
  [1, 7],
  [8, 16],
  [17, 25],
  [26, 33],
  [34, 51],
  [52, 68],
  [69, 85],
  [86, 105],
];

const DAY = 86_400_000;
const START_MS = Date.UTC(2026, 8, 14);

export function weekStart(n: number): string {
  return new Date(START_MS + (n - 1) * 7 * DAY).toISOString().slice(0, 10);
}

export function weekKind(n: number): WeekKind {
  if (BREAK_WEEKS.has(n)) return "break";
  if (SUMMER_WEEKS.has(n)) return "summer";
  return "core";
}

export function phaseOf(n: number): number {
  const i = PHASE_RANGES.findIndex(([a, b]) => n >= a && n <= b);
  return i === -1 ? 8 : i + 1;
}

const RES_SUFFIX = /\s*@([a-z0-9-]+(?:,[a-z0-9-]+)*)\s*$/;

function parseTask(raw: string, n: number, track: TrackId, i: number): Task {
  let text = raw.trim();
  let gate = false;
  if (text.startsWith("!")) {
    gate = true;
    text = text.slice(1).trim();
  }
  let res: string[] = [];
  const m = text.match(RES_SUFFIX);
  if (m) {
    res = m[1].split(",");
    text = text.slice(0, m.index).trim();
  }
  return { id: `w${n}-${track}-${i + 1}`, track, text, gate, res };
}

const TRACK_ORDER: TrackId[] = ["math", "cs", "ml", "rob"];

function build(raw: RawWeek[]): Week[] {
  return raw.map(([n, title, focus, tasks, deliverable]) => {
    const list: Task[] = [];
    for (const track of TRACK_ORDER) {
      const items = tasks[track];
      if (!items) continue;
      items.forEach((t, i) => list.push(parseTask(t, n, track, i)));
    }
    return {
      n,
      start: weekStart(n),
      kind: weekKind(n),
      phase: phaseOf(n),
      title,
      focus,
      tasks: list,
      deliverable,
    };
  });
}

export const weeks: Week[] = build([...weeksP1, ...weeksP2, ...weeksP3]);

export const weekByN = new Map<number, Week>(weeks.map((w) => [w.n, w]));

export const allTaskIds: string[] = weeks.flatMap((w) =>
  w.tasks.map((t) => t.id),
);

export function tasksForTrack(track: TrackId): Task[] {
  return weeks.flatMap((w) => w.tasks.filter((t) => t.track === track));
}

/** The week the given date falls in, clamped to the plan's range. */
export function currentWeekN(today: Date = new Date()): number {
  const ms = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const n = Math.floor((ms - START_MS) / (7 * DAY)) + 1;
  if (n < 1) return 1;
  if (n > TOTAL_WEEKS) return TOTAL_WEEKS;
  return n;
}

/** True when the plan has not started yet — the dashboard says so explicitly. */
export function planStarted(today: Date = new Date()): boolean {
  return today.getTime() >= START_MS;
}

export const phases: Phase[] = [
  {
    id: 1,
    name: "Repair & tooling",
    window: "Sep — Oct 2026",
    weeks: [1, 7],
    thesis:
      "Nothing here is intellectually hard, and that is the point. You have strong abstract maths and almost no shipped code. Seven weeks fixing the two things that actually block you: calcul différentiel, and a professional toolchain (shell, git, C++ build, ROS 2, Python env).",
    outcomes: [
      "Differential calculus repaired — differentials, Jacobians, IFT, no gaps",
      "Missing Semester done; every project under version control from week 1",
      "6.006 first third: asymptotics, data structures, sorting, hashing",
      "C++ CMake/debugger/sanitizer workflow you use by reflex",
      "ROS 2 fundamentals and a working racing-car simulator loop",
    ],
    gates: [
      "Differential as a linear map — gates all of optimization",
      "Git + shell fluency — gates every project that follows",
      "Asymptotic analysis — gates 6.046 and every interview",
    ],
  },
  {
    id: 2,
    name: "Convexity, ROS 2, nets from scratch",
    window: "Nov 2026 — Jan 2027",
    weeks: [8, 16],
    thesis:
      "Boyd starts. This is the single highest-leverage book in the plan for MVA, and you asked for it specifically. In parallel the CS track moves to algorithms proper, and the ML track starts where it must: writing backpropagation by hand, not calling a framework.",
    outcomes: [
      "Boyd ch.1-5: convex sets, functions, problems, duality — with exercises",
      "6.006 finished; graph algorithms and DP genuinely fluent",
      "Karpathy Zero-to-Hero: micrograd and a char-level model written from nothing",
      "ROS 2 packages of your own: nodes, TF, launch files, rosbag analysis",
    ],
    gates: [
      "Convex sets & functions — gates all of Boyd and MVA optimization",
      "Lagrange duality & KKT — gates SVMs, MPC, interior point, everything",
      "Backpropagation by hand — gates every DL topic in the plan",
    ],
  },
  {
    id: 3,
    name: "DL core, classical vision, estimation",
    window: "Jan — Mar 2027",
    weeks: [17, 25],
    thesis:
      "Three tracks come online at once. Deep learning becomes weekly rather than fortnightly, because your zero-experience start is the biggest gap relative to MVA's assumptions. Vision starts classical (features, stereo, filters) so you understand what learning replaced.",
    outcomes: [
      "Boyd ch.9-11: unconstrained, equality-constrained and interior-point methods",
      "6.046: divide & conquer, greedy, flows, NP-completeness, approximation",
      "CNNs, training dynamics, regularization, optimization for DL",
      "Classical CV: filtering, features, stereo, calibration, tracking",
      "State estimation: Bayes filters and a Kalman filter you wrote yourself",
    ],
    gates: [
      "Boyd duality applied numerically — gates MPC and SLAM backends",
      "CNN internals and training — gates all vision-learning work",
      "Probabilistic state estimation — gates SLAM and robot autonomy",
    ],
  },
  {
    id: 4,
    name: "Depth: statistics, systems, dynamics",
    window: "Mar — May 2027",
    weeks: [26, 33],
    thesis:
      "Consolidation phase, ending in a hard self-assessment. You should finish year one able to sit an MVA optimization exam, write a transformer from a blank file, and point at three pieces of hardware that move.",
    outcomes: [
      "First transformer written from scratch, twice, once without references",
      "Interview cadence established: timed sets, spoken solutions, recorded",
      "Glider airframe designed, built and instrumented",
      "Honest year-1 grade on an MVA past exam",
    ],
    gates: [
      "Attention mechanics — gates CS336, VLAs, everything modern",
      "Year-1 self-assessment — determines what Phase 5 has to repair",
    ],
  },
  {
    id: 5,
    name: "Transformers, geometry, dynamics",
    window: "May — Sep 2027",
    weeks: [34, 51],
    thesis:
      "Numerical linear algebra and Nocedal give you the computational half of optimization that MVA assumes and most students never learn. Vision becomes geometric (two-view, SfM, bundle adjustment). The summer is a hardware sprint: the 6-DOF arm and the tendon hand, then your first learned policy on your own data.",
    outcomes: [
      "SVD/QR/CG/eigen-solvers understood and implemented, not invoked",
      "Nocedal: line search, trust region, BFGS/L-BFGS, LM, SQP — all coded",
      "Two-view geometry, SfM and bundle adjustment built from scratch",
      "6-DOF arm and 10-servo tendon hand operational under one ROS 2 stack",
      "ACT and diffusion policies trained on your own teleoperation dataset",
    ],
    gates: [
      "SVD and least-squares conditioning — gates SfM, BA, PCA, low-rank ML",
      "Autodiff derived from the chain rule on a DAG — gates CS336",
      "Rigid-body dynamics (mass matrix, Newton-Euler) — gates control and MPC",
      "A teleop dataset you own — gates all robot-learning work after this",
    ],
  },
  {
    id: 6,
    name: "Master-level: SLAM, RL, systems",
    window: "Sep 2027 — Jan 2028",
    weeks: [52, 68],
    thesis:
      "Year two starts at master level. Statistics and minimum-viable measure theory (MVA assumes both), CS:APP for the systems layer you have never seen, Sutton & Barto end to end, and multiple-view geometry rigorously enough to write your own SLAM. The quadruped is the hardware spine.",
    outcomes: [
      "18.650 statistics + concentration inequalities with proofs",
      "CS:APP with the labs — bits to virtual memory to concurrency",
      "Twelve RL algorithms implemented from scratch, DP through SAC",
      "Your own stereo SLAM with loop closure, benchmarked against ORB-SLAM3",
      "Quadruped walking on hardware with MPC and learned policies compared",
    ],
    gates: [
      "MLE, asymptotics and testing — gates learning theory and paper reading",
      "Measure theory minimum — gates Vershynin and MVA probability courses",
      "Concentration inequalities — gates all generalization theory",
      "Bellman equations and policy gradients — gates CS285",
    ],
  },
  {
    id: 7,
    name: "CS336, CS285, high-dimensional probability",
    window: "Jan — Apr 2028",
    weeks: [69, 85],
    thesis:
      "The hardest phase. Vershynin is the mathematical core of modern learning theory; CS336 is the most demanding engineering course in the plan (tokenizer to DPO, plus Triton and distributed training); CS285 is deep RL at Berkeley's level. Robotics narrows to sim-to-real and dexterous manipulation.",
    outcomes: [
      "Vershynin ch.1-10: sub-gaussian tails through chaining and sparse recovery",
      "A language model you built end to end, with a scaling-law fit",
      "CS285 completed with offline RL and model-based methods implemented",
      "Bach's learning theory: ERM, kernels, Rademacher complexity, SGD analysis",
      "Sim-to-real measured, not hand-waved: Isaac policies on real hardware",
      "A research proposal with two reproduced baselines and an eval harness",
    ],
    gates: [
      "Sub-gaussian concentration and chaining — gates Bach's theory chapters",
      "A working transformer trained by you — gates all CS336 assignments",
      "Reproduced baselines — gates any credible research claim in Phase 8",
    ],
  },
  {
    id: 8,
    name: "Research, revision, MVA readiness",
    window: "May — Sep 2028",
    weeks: [86, 105],
    thesis:
      "Coursework becomes maintenance and the output becomes research. One paper-grade result with error bars, a portfolio a lab will actually read, an MVA prerequisite audit backed by evidence, and spaced revision passes so two years of work is retrievable under exam pressure.",
    outcomes: [
      "A written paper with two results, five seeds, and honest limitations",
      "Five public repositories with benchmarks and reproduction scripts",
      "MVA course-by-course prerequisite audit with evidence per course",
      "Four full interview loops passed, recorded and reviewed",
      "Complete revision passes over optimization, probability, theory, vision, DL",
    ],
    gates: [
      "Statistically honest evaluation — gates the paper being worth sending",
      "MVA prerequisite audit — determines the final gap-filling work",
    ],
  },
];

export const phaseById = new Map<number, Phase>(phases.map((p) => [p.id, p]));

export function weeksInPhase(id: number): Week[] {
  return weeks.filter((w) => w.phase === id);
}
