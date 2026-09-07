import type { Track } from "./types";

/**
 * The four tracks, described with the levels and budgets you actually gave —
 * not idealised ones. Every scheduling decision in this plan comes from here.
 */
export const tracks: Track[] = [
  {
    id: "math",
    name: "Mathematics",
    short: "Math",
    color: "#B7A7FF",
    hoursPerWeek: "6-8 h",
    startLevel:
      "Very strong foundations from prépa (Polytechnique-level). 14/20 in X analysis, 13/20 in X algebra. Weak specifically in optimization and calcul différentiel.",
    endGoal:
      "Sit an MVA optimization or learning-theory exam without special preparation. Boyd, Nocedal, Vershynin and Bach all usable from memory, and the gap between abstract proof work and real projects closed.",
    blurb:
      "The one track where you start ahead — so it gets the smallest budget and the sharpest targeting. Two named weaknesses get repaired in Phase 1 (differentials) and Phase 2 (convexity), then the track climbs through numerical optimization, statistics, high-dimensional probability and learning theory. Nothing here is study-for-its-own-sake: every block is a prerequisite for a course you want at MVA or a system you are building.",
  },
  {
    id: "cs",
    name: "Computer Science & Vision",
    short: "CS / CV",
    color: "#7CC7FF",
    hoursPerWeek: "12 h",
    startLevel:
      "Weakest track and the one you need most. Prépa algorithmics (Dijkstra, kNN, k-means, sorting, data structures, graph traversal), OCaml, some Python and C++, almost no project experience.",
    endGoal:
      "Master-level computer vision (multiple-view geometry, SLAM, learned vision) plus genuine interview fluency — algorithms, systems, and ML system design, spoken out loud under time pressure.",
    blurb:
      "Biggest budget, because the gap is biggest and because everything else depends on it: you cannot do robot learning, SLAM or research engineering without shipping code. The track runs three threads simultaneously — algorithms and interview practice from 6.006/6.046 onward, systems from CS:APP, and vision from classical filtering through two-view geometry, SfM, SLAM and CS336-grade ML systems. The measurable output is public repositories with benchmarks, not completed lectures.",
  },
  {
    id: "ml",
    name: "Machine Learning, DL & RL",
    short: "ML / RL",
    color: "#5FE3B1",
    hoursPerWeek: "4 h",
    startLevel:
      "Zero experience. No frameworks, no training loops, no models.",
    endGoal:
      "Understand transformers well enough to write one from a blank file, build and fine-tune models from scratch, and embed learned policies in your own robots.",
    blurb:
      "You asked for one 4-hour session every one to two weeks. That holds for Phases 1-2, then the track becomes weekly from Phase 3 — a deliberate deviation, because starting from zero and reaching MVA level in transformers, deep RL and robot learning does not fit a fortnightly cadence. The compensation is that from Phase 5 onward almost every ML session runs on your own robot data, so the hours count twice.",
  },
  {
    id: "rob",
    name: "Robotics",
    short: "Robotics",
    color: "#FF9D5C",
    hoursPerWeek: "12+ h",
    startLevel:
      "Committed club member with 12+ hours a week and a full-vision autonomous racing car already in progress as a first-year school project.",
    endGoal:
      "Seven serious builds with measured results: racing car, 6-DOF arm, tendon-driven hand, morphing-wing glider, quadruped, autonomous drone, and one research platform — all under a €10 000 budget.",
    blurb:
      "This track needs no motivation from a plan, so its job here is sequencing and theory coupling: every build lands in the phase where the maths and code that make it non-trivial have just been learned. Dynamics before the arm, estimation before SLAM, RL before the quadruped's learned gait, sim-to-real before the drone's onboard policy. The hardware is also the portfolio and the research platform — the same robots produce the datasets your ML track trains on.",
  },
];

export const trackById = new Map(tracks.map((t) => [t.id, t]));

/** Planned weekly hours per track, used by the time-budget dashboard. */
export const plannedHours: Record<string, number> = {
  math: 7,
  cs: 12,
  ml: 4,
  rob: 12,
};
