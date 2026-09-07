// Composition only — the plan's content lives in the sibling files.
// Static TypeScript is the source of truth for the curriculum; the database
// stores nothing but checkbox state and logged hours.

export type {
  BomLine,
  Concept,
  InterviewMilestone,
  MvaCourse,
  Phase,
  Resource,
  ResourceType,
  RoboticsProject,
  Task,
  Track,
  TrackId,
  Week,
  WeekKind,
} from "./types";

export {
  PLAN_END,
  PLAN_START,
  TOTAL_WEEKS,
  allTaskIds,
  currentWeekN,
  phaseById,
  phaseOf,
  phases,
  planStarted,
  tasksForTrack,
  weekByN,
  weekKind,
  weekStart,
  weeks,
  weeksInPhase,
} from "./weeks";

export { plannedHours, trackById, tracks } from "./tracks";

export { resourceById, resources } from "./resources";

export {
  conceptGroups,
  concepts,
  conceptsByTrack,
  gateConcepts,
} from "./concepts";

export {
  BUDGET_NOTE,
  ROBOTICS_BUDGET_CAP,
  roboticsProjects,
  roboticsTotal,
} from "./robotics";

export { MVA_NOTE, mvaCourses, mvaShortlist } from "./mva";

export { INTERVIEW_NOTE, interviewMilestones } from "./interview";
