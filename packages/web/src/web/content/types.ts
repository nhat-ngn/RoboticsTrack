export type TrackId = "math" | "cs" | "ml" | "rob";

export type WeekKind = "core" | "break" | "summer";

export interface Track {
  id: TrackId;
  name: string;
  short: string;
  color: string;
  hoursPerWeek: string;
  startLevel: string;
  endGoal: string;
  blurb: string;
}

/** A single checkable task inside a week. */
export interface Task {
  id: string;
  track: TrackId;
  text: string;
  /** true when this task gates later material (prerequisite). */
  gate: boolean;
  res: string[];
}

export interface Week {
  n: number;
  start: string; // ISO Monday
  kind: WeekKind;
  phase: number;
  title: string;
  focus: string;
  tasks: Task[];
  deliverable?: string;
}

export interface Phase {
  id: number;
  name: string;
  window: string;
  weeks: [number, number];
  thesis: string;
  outcomes: string[];
  gates: string[];
}

export type ResourceType =
  | "course"
  | "book"
  | "video"
  | "paper"
  | "repo"
  | "practice"
  | "tool";

export interface Resource {
  id: string;
  title: string;
  by: string;
  type: ResourceType;
  url: string;
  tracks: TrackId[];
  /** 1-5, how good it is for THIS plan (not general fame). */
  rating: number;
  effort: string;
  verdict: string;
  when: string;
}

export interface Concept {
  id: string;
  track: TrackId;
  group: string;
  name: string;
  why: string;
  gate: boolean;
  phase: number;
  res: string[];
}

export interface BomLine {
  item: string;
  qty: string;
  cost: number;
  note: string;
}

export interface RoboticsProject {
  id: string;
  name: string;
  window: string;
  weeks: [number, number];
  status: "club" | "solo" | "club+solo";
  pitch: string;
  skills: string[];
  concepts: string[];
  milestones: { id: string; text: string }[];
  bom: BomLine[];
  budget: number;
  res: string[];
}

export interface MvaCourse {
  name: string;
  teacher: string;
  domain: string;
  prepares: string;
  readyBy: string;
  tracks: TrackId[];
}

export interface InterviewMilestone {
  id: string;
  phase: number;
  window: string;
  target: string;
  detail: string;
  res: string[];
}
