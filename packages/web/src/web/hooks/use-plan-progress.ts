import { useMemo } from "react";
import type { TrackId } from "../content";
import {
  concepts,
  interviewMilestones,
  roboticsProjects,
  weeks,
} from "../content";
import { useBulkToggle, useProgress, useToggleItem } from "../stores/progress";
import { TRACK_ORDER, pct } from "../lib/track";

/** Every id that counts toward the global percentage. */
const TASK_IDS = weeks.flatMap((w) => w.tasks.map((t) => t.id));
const CONCEPT_IDS = concepts.map((c) => c.id);
const MILESTONE_IDS = roboticsProjects.flatMap((p) =>
  p.milestones.map((m) => m.id),
);
const INTERVIEW_IDS = interviewMilestones.map((m) => m.id);

const ALL_IDS = [
  ...TASK_IDS,
  ...CONCEPT_IDS,
  ...MILESTONE_IDS,
  ...INTERVIEW_IDS,
];

/** Ids per track: week tasks + concepts of that track. */
const TRACK_IDS: Record<TrackId, string[]> = {
  math: [],
  cs: [],
  ml: [],
  rob: [],
};
for (const w of weeks) for (const t of w.tasks) TRACK_IDS[t.track].push(t.id);
for (const c of concepts) TRACK_IDS[c.track].push(c.id);
for (const p of roboticsProjects) for (const m of p.milestones) TRACK_IDS.rob.push(m.id);

export interface PlanProgress {
  ready: boolean;
  done: Set<string>;
  overall: { done: number; total: number; pct: number };
  byTrack: Record<TrackId, { done: number; total: number; pct: number }>;
  phasePct: (phaseId: number) => number;
  weekPct: (n: number) => number;
  countOf: (ids: string[]) => { done: number; total: number; pct: number };
  toggle: (id: string, done: boolean) => void;
  toggleMany: (ids: string[], done: boolean) => void;
}

/** Stable empty set so the memo below is not invalidated on every render. */
const EMPTY = new Set<string>();

export function usePlanProgress(): PlanProgress {
  const query = useProgress();
  const toggleItem = useToggleItem();
  const bulk = useBulkToggle();
  const done = query.data ?? EMPTY;
  const loading = query.isLoading;
  const mutateOne = toggleItem.mutate;
  const mutateMany = bulk.mutate;

  return useMemo(() => {
    const countOf = (ids: string[]) => {
      const d = ids.reduce((a, id) => a + (done.has(id) ? 1 : 0), 0);
      return { done: d, total: ids.length, pct: pct(d, ids.length) };
    };

    const byTrack = {} as Record<
      TrackId,
      { done: number; total: number; pct: number }
    >;
    for (const t of TRACK_ORDER) byTrack[t] = countOf(TRACK_IDS[t]);

    return {
      ready: !loading,
      done,
      overall: countOf(ALL_IDS),
      byTrack,
      countOf,
      phasePct: (phaseId: number) =>
        countOf(
          weeks
            .filter((w) => w.phase === phaseId)
            .flatMap((w) => w.tasks.map((t) => t.id)),
        ).pct,
      weekPct: (n: number) =>
        countOf(weeks.find((w) => w.n === n)?.tasks.map((t) => t.id) ?? []).pct,
      toggle: (id: string, next: boolean) =>
        mutateOne({ itemId: id, done: next }),
      toggleMany: (ids: string[], next: boolean) =>
        mutateMany({ itemIds: ids, done: next }),
    };
  }, [done, loading, mutateOne, mutateMany]);
}
