import type { InterviewMilestone } from "./types";

/**
 * You asked for interview fluency, not just competence. Fluency is a separate
 * trainable skill: timed, spoken, and reviewed on recording. This is the
 * cadence, phase by phase — it never stops once it starts.
 */
export const interviewMilestones: InterviewMilestone[] = [
  {
    id: "iv-p1",
    phase: 1,
    window: "Sep — Oct 2026",
    target: "Baseline and vocabulary",
    detail:
      "No mock interviews yet — you would only be practising confusion. Instead: finish the 6.006 asymptotics block, then solve 20 easy problems with written complexity analysis for each. The habit to build now is stating the invariant and the complexity before writing code. Track your solve time; you need the baseline to see improvement later.",
    res: ["mit6006", "neetcode", "cses"],
  },
  {
    id: "iv-p2",
    phase: 2,
    window: "Nov 2026 — Jan 2027",
    target: "Pattern coverage, untimed",
    detail:
      "Work the NeetCode 150 by category rather than by list: two pointers, sliding window, binary search, trees, heaps, backtracking, graphs, DP. Untimed but written properly, with tests. Target 60 problems done and CSES around 90. Start speaking aloud on every problem now — the transition from silent solving to narrated solving is the part everyone leaves too late.",
    res: ["neetcode", "cses", "cph"],
  },
  {
    id: "iv-p3",
    phase: 3,
    window: "Jan — Mar 2027",
    target: "Timed mediums",
    detail:
      "45-minute timed blocks: one medium, spoken, with clarifying questions asked out loud first. Two per week. Add 6.046 material (flows, NP-hardness, approximation) so you can talk about why a problem is hard rather than only how to solve it. Success criterion: 80% of mediums solved inside 25 minutes with a correct complexity statement.",
    res: ["mit6046", "neetcode", "epi"],
  },
  {
    id: "iv-p4",
    phase: 4,
    window: "Mar — May 2027",
    target: "First hards, first ML questions",
    detail:
      "Weekly set of two mediums plus one hard in 90 minutes. Start the ML side: derive backprop, explain attention, explain bias-variance on a whiteboard, all from memory. This is also when you record yourself for the first time and watch it — expect to hate it and to learn more from that hour than from ten solved problems.",
    res: ["neetcode", "epi", "ml-interviews"],
  },
  {
    id: "iv-p5",
    phase: 5,
    window: "May — Sep 2027",
    target: "Project deep-dives",
    detail:
      "You now have real projects, so the hardest interview question becomes 'walk me through this'. Write and rehearse a 5-minute and a 15-minute version for the racing car, the arm, and the SfM pipeline: problem, alternatives considered, what you measured, what failed, what you would change. Keep two coding sessions a week; CSES to 160.",
    res: ["ml-interviews", "neetcode", "cses"],
  },
  {
    id: "iv-p6",
    phase: 6,
    window: "Sep 2027 — Jan 2028",
    target: "Systems and C++ depth",
    detail:
      "CS:APP makes systems questions answerable: cache behaviour, virtual memory, race conditions, why your code is slow at the hardware level. Add C++-specific questions (move semantics, RAII, undefined behaviour). One mock per fortnight with a real human, one hard problem per week. CSES to 180.",
    res: ["csapp", "effective-cpp", "neetcode", "epi"],
  },
  {
    id: "iv-p7",
    phase: 7,
    window: "Jan — Apr 2028",
    target: "ML system design and full loops",
    detail:
      "Two complete four-hour loop simulations (W82 and W92): two algorithm rounds, one ML system design, one research deep-dive. Design practice comes from DDIA plus your CS336 experience — training platforms, feature stores, robot-fleet telemetry, inference serving with real latency numbers. Review every recording and fix verbal habits explicitly.",
    res: ["sysdesign", "ddia", "ml-interviews", "cs336"],
  },
  {
    id: "iv-p8",
    phase: 8,
    window: "May — Sep 2028",
    target: "Fluency, not preparation",
    detail:
      "Loops three and four with real humans (club seniors, alumni, lab PhD students). Behavioural and project answers written and rehearsed for all seven robots. The bar is no longer 'can I solve it' but 'am I unbothered' — relaxed, asking good questions, comfortable saying I do not know and then reasoning to an answer. That is the state you asked for.",
    res: ["ml-interviews", "neetcode", "epi"],
  },
];

export const INTERVIEW_NOTE =
  "Honest assessment: your maths will interview well immediately and your code will not, for about a year. The fix is volume plus narration plus recording — there is no shortcut, and reading solutions feels like progress while producing none. Two sessions a week for 100 weeks beats any four-week grind.";
