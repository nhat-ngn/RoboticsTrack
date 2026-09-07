import type { TrackId } from "../content";

export const TRACK_COLOR: Record<TrackId, string> = {
  math: "#B7A7FF",
  cs: "#7CC7FF",
  ml: "#5FE3B1",
  rob: "#FF9D5C",
};

export const TRACK_ORDER: TrackId[] = ["math", "cs", "ml", "rob"];

export const TRACK_SHORT: Record<TrackId, string> = {
  math: "Math",
  cs: "CS / CV",
  ml: "ML / RL",
  rob: "Robotics",
};

export function pct(done: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((done / total) * 100);
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "14 Sep 2026" from an ISO date, without pulling in a date library. */
export function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function fmtRange(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const end = new Date(Date.UTC(y, m - 1, d + 6));
  const a = `${d} ${MONTHS[m - 1]}`;
  const b = `${end.getUTCDate()} ${MONTHS[end.getUTCMonth()]}`;
  return `${a} — ${b} ${end.getUTCFullYear()}`;
}
