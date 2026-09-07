import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, Eraser, Copy } from "lucide-react";
import type { TrackId } from "../content";
import { currentWeekN, plannedHours, weekByN, TOTAL_WEEKS } from "../content";
import { Layout, PageHead } from "../components/layout";
import { SectionHeader } from "../components/section-header";
import { TrackBar } from "../components/track-bar";
import { CheckRow } from "../components/check-row";
import { AvailabilityGrid } from "../components/availability-grid";
import { usePlanProgress } from "../hooks/use-plan-progress";
import { useAvailability, useSetAvailability } from "../stores/availability";
import { TRACK_COLOR, TRACK_ORDER, TRACK_SHORT, fmtRange, pct } from "../lib/track";
import {
  DAY_LABELS,
  DP_NOTE,
  UNITS_PER_DAY,
  blockLabel,
  buildBacklog,
  buildSchedule,
  defaultCells,
  emptyCells,
  fmtMinutes,
  safeCells,
  totalFreeMinutes,
} from "../lib/scheduler";

export default function PlannerPage() {
  const progress = usePlanProgress();
  const rows = useAvailability();
  const save = useSetAvailability();
  const saveMut = save.mutate;

  const [week, setWeek] = useState(() => currentWeekN());
  const [target, setTarget] = useState(30);
  const [cells, setCells] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const stored = useMemo(
    () => rows.data?.find((r) => r.week === week),
    [rows.data, week],
  );

  // Load the stored grid for this week; fall back to the default rhythm.
  useEffect(() => {
    setCells(stored ? safeCells(stored.cells) : defaultCells());
    setTarget(stored?.targetHours ?? 30);
    setTouched(false);
  }, [stored, week]);

  // Debounced autosave — a drag across the grid fires dozens of changes and
  // each one should not become a database write.
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!touched || cells === null) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      saveMut({ week, cells, targetHours: target });
    }, 700);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [cells, target, week, touched, saveMut]);

  const update = (next: string) => {
    setCells(next);
    setTouched(true);
  };

  const grid = cells ?? emptyCells();

  const backlog = useMemo(
    () => buildBacklog(progress.done, target * 60, week),
    [progress.done, target, week],
  );

  const schedule = useMemo(() => buildSchedule(grid, backlog), [grid, backlog]);

  /**
   * Leftover is a list of sessions, so a task split in two can appear twice.
   * Collapse back to one row per task, summing the unscheduled duration.
   */
  const leftoverTasks = useMemo(() => {
    const byTask = new Map<string, (typeof schedule.leftover)[number]>();
    for (const it of schedule.leftover) {
      const prev = byTask.get(it.taskId);
      if (prev) prev.units += it.units;
      else byTask.set(it.taskId, { ...it });
    }
    return [...byTask.values()];
  }, [schedule]);

  // Tint each scheduled half-hour with its task's track colour.
  const overlay = useMemo(() => {
    const map = new Map<number, TrackId>();
    for (const b of schedule.blocks) {
      let u = b.startUnit;
      for (const it of b.items) {
        for (let k = 0; k < it.units; k++) {
          map.set(b.day * UNITS_PER_DAY + u, it.track);
          u++;
        }
      }
    }
    return map;
  }, [schedule]);

  const w = weekByN.get(week);
  const freeMin = totalFreeMinutes(grid);
  const util = pct(schedule.scheduledMinutes, Math.max(1, freeMin));
  const plannedTotal = TRACK_ORDER.reduce((a, t) => a + plannedHours[t], 0);

  const prevWeekRow = rows.data?.find((r) => r.week === week - 1);

  return (
    <Layout>
      <PageHead
        eyebrow="weekly planner · availability + dp packing"
        title="Fit the work into the week you actually have."
        lede="Your timetable is not fixed yet, and a schedule you cannot follow is worse than none — so nothing here is written to a calendar. Instead: mark the hours you are genuinely free this week, and the planner takes your next block of undone work and packs it into those hours by priority, with gates first and one track per block. Update the grid each week as your real timetable settles. The packer is a dynamic program, written up at the bottom of this page, because it is also a decent CS exercise."
      />

      {/* ---------- WEEK CONTROLS ---------- */}
      <section className="rise py-10" style={{ animationDelay: "40ms" }}>
        <div className="card p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous week"
                onClick={() => setWeek((n) => Math.max(1, n - 1))}
                className="flex size-7 items-center justify-center rounded-[5px] border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <ChevronLeft size={14} />
              </button>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="mono text-[11px] text-faint">WEEK</span>
                  <span className="text-[17px] font-semibold text-fg">
                    {week}
                  </span>
                  {w ? (
                    <span
                      className="mono text-[10px] tracking-[0.1em] uppercase"
                      style={{
                        color: w.kind === "core" ? "#5C6469" : "#FFB454",
                      }}
                    >
                      {w.kind}
                    </span>
                  ) : null}
                </div>
                <div className="mono mt-0.5 text-[11px] text-faint">
                  {w ? fmtRange(w.start) : ""}
                </div>
              </div>
              <button
                type="button"
                aria-label="Next week"
                onClick={() => setWeek((n) => Math.min(TOTAL_WEEKS, n + 1))}
                className="flex size-7 items-center justify-center rounded-[5px] border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="mono flex items-center gap-2 text-[11px] text-faint">
                target
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  aria-label="Target work hours this week"
                  value={target}
                  onChange={(e) => {
                    setTarget(Number(e.target.value) || 0);
                    setTouched(true);
                  }}
                  className="mono w-14 rounded-[5px] border border-line bg-surface2 px-2 py-1 text-right text-[12px] text-fg outline-none focus:border-line-strong"
                />
                h
              </label>
              <button
                type="button"
                onClick={() => update(defaultCells())}
                className="mono flex items-center gap-1.5 rounded-[5px] border border-line px-2.5 py-1.5 text-[10.5px] tracking-[0.08em] text-muted uppercase transition-colors hover:border-line-strong hover:text-fg"
              >
                <RotateCcw size={11} /> default
              </button>
              {prevWeekRow ? (
                <button
                  type="button"
                  onClick={() => update(safeCells(prevWeekRow.cells))}
                  className="mono flex items-center gap-1.5 rounded-[5px] border border-line px-2.5 py-1.5 text-[10.5px] tracking-[0.08em] text-muted uppercase transition-colors hover:border-line-strong hover:text-fg"
                >
                  <Copy size={11} /> copy w{week - 1}
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => update(emptyCells())}
                className="mono flex items-center gap-1.5 rounded-[5px] border border-line px-2.5 py-1.5 text-[10.5px] tracking-[0.08em] text-muted uppercase transition-colors hover:border-line-strong hover:text-fg"
              >
                <Eraser size={11} /> clear
              </button>
            </div>
          </div>

          {/* stats */}
          <div className="mt-5 grid gap-4 border-t border-line pt-4 sm:grid-cols-4">
            <Stat label="free this week" value={fmtMinutes(freeMin)} />
            <Stat
              label="scheduled"
              value={fmtMinutes(schedule.scheduledMinutes)}
              accent
            />
            <Stat label="utilisation" value={`${util}%`} />
            <Stat label="did not fit" value={`${leftoverTasks.length} tasks`} />
          </div>

          <div className="mt-5 space-y-2.5 border-t border-line pt-4">
            {TRACK_ORDER.map((t) => {
              const mins = schedule.byTrack[t];
              const planned = plannedHours[t] * 60;
              return (
                <div key={t} className="flex items-center gap-3">
                  <span className="flex w-24 shrink-0 items-center gap-2 text-[12.5px] text-fg">
                    <span
                      className="size-[6px] rounded-full"
                      style={{ background: TRACK_COLOR[t] }}
                    />
                    {TRACK_SHORT[t]}
                  </span>
                  <TrackBar
                    value={pct(mins, Math.max(planned, mins, 1))}
                    color={TRACK_COLOR[t]}
                    height={3}
                  />
                  <span className="mono w-24 shrink-0 text-right text-[11px] text-faint">
                    {fmtMinutes(mins)} / {plannedHours[t]}h
                  </span>
                </div>
              );
            })}
            <div className="mono pt-1 text-right text-[10.5px] text-faint">
              plan budget {plannedTotal}h/wk · robotics club time included
            </div>
          </div>
        </div>
      </section>

      {/* ---------- THE GRID ---------- */}
      <section className="rise pb-10" style={{ animationDelay: "80ms" }}>
        <SectionHeader
          label="your week"
          title="Mark the hours you are free"
          right={
            save.isPending ? "saving…" : touched ? "saved" : "click or drag"
          }
        />
        <div className="card overflow-x-auto p-5">
          <div className="min-w-[560px]">
            <AvailabilityGrid
              cells={grid}
              onChange={update}
              overlay={overlay}
            />
          </div>
          <p className="mt-4 max-w-[80ch] text-[12.5px] leading-[1.6] text-faint">
            Green is free time you have not filled; a coloured bar is work the
            packer assigned, tinted by track. Drag to paint several half-hours
            at once. Changes save automatically per week, so you can plan a
            heavy week and a light one differently.
          </p>
        </div>
      </section>

      {/* ---------- THE SCHEDULE ---------- */}
      <section className="rise pb-10" style={{ animationDelay: "120ms" }}>
        <SectionHeader
          label="the plan for this week"
          title="What to do, when"
          right={`${schedule.blocks.filter((b) => b.items.length > 0).length} blocks used`}
        />

        {freeMin === 0 ? (
          <div className="card p-6">
            <p className="text-[13.5px] text-muted">
              No free time marked yet. Paint some half-hours in the grid above,
              or hit <span className="mono text-fg">default</span> to start from
              the rhythm you described (weekdays 20:00-23:00, weekends looser).
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {DAY_LABELS.map((day, d) => {
              const dayBlocks = schedule.blocks.filter(
                (b) => b.day === d && b.items.length > 0,
              );
              if (dayBlocks.length === 0) return null;
              const dayMin = dayBlocks.reduce(
                (a, b) => a + b.usedUnits * 30,
                0,
              );
              return (
                <article key={day} className="card p-5">
                  <div className="flex items-baseline justify-between gap-3 border-b border-line pb-3">
                    <h3 className="text-[15px] font-semibold text-fg">{day}</h3>
                    <span className="mono text-[11px] text-faint">
                      {fmtMinutes(dayMin)}
                    </span>
                  </div>
                  <div className="mt-3 space-y-4">
                    {dayBlocks.map((b) => (
                      <div key={`${b.day}-${b.startUnit}`}>
                        <div className="flex items-center gap-3">
                          <span className="mono text-[11px] text-muted">
                            {blockLabel(b)}
                          </span>
                          {b.focus ? (
                            <span
                              className="mono rounded-[4px] px-1.5 py-0.5 text-[9.5px] tracking-[0.1em] uppercase"
                              style={{
                                color: TRACK_COLOR[b.focus],
                                background: `${TRACK_COLOR[b.focus]}18`,
                              }}
                            >
                              {TRACK_SHORT[b.focus]}
                            </span>
                          ) : null}
                          <div className="hairline flex-1" />
                          <span className="mono text-[10.5px] text-faint">
                            {b.usedUnits * 30}/{b.units * 30} min
                          </span>
                        </div>
                        <div className="mt-1.5">
                          {b.items.map((it) => (
                            <CheckRow
                              key={it.id}
                              id={it.taskId}
                              text={it.text}
                              done={progress.done.has(it.taskId)}
                              onToggle={progress.toggle}
                              track={it.track}
                              gate={it.gate}
                              note={`W${it.week} · ${fmtMinutes(it.units * 30)}${
                                it.parts > 1
                                  ? ` · session ${it.part}/${it.parts}`
                                  : ""
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ---------- LEFTOVER ---------- */}
      {schedule.leftover.length > 0 ? (
        <section className="rise pb-10" style={{ animationDelay: "160ms" }}>
          <SectionHeader
            label="did not fit"
            title="Next in line"
            right={`${fmtMinutes(
              schedule.leftover.reduce((a, it) => a + it.units * 30, 0),
            )} of backlog`}
          />
          <div className="card p-5">
            <p className="mb-3 max-w-[80ch] text-[12.5px] leading-[1.6] text-faint">
              Pulled from the backlog but left unscheduled — either the week is
              full or these lost on priority. They come first next week. If the
              same gate keeps landing here, your free hours are the problem, not
              your ordering.
            </p>
            {leftoverTasks.slice(0, 12).map((it) => (
              <CheckRow
                key={it.taskId}
                id={it.taskId}
                text={it.text}
                done={progress.done.has(it.taskId)}
                onToggle={progress.toggle}
                track={it.track}
                gate={it.gate}
                note={`W${it.week} · ${fmtMinutes(it.units * 30)}`}
              />
            ))}
            {leftoverTasks.length > 12 ? (
              <div className="mono pt-3 text-[11px] text-faint">
                + {leftoverTasks.length - 12} more
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ---------- THE CS PROJECT ---------- */}
      <section className="rise pb-16" style={{ animationDelay: "200ms" }}>
        <SectionHeader
          label="how the packer works"
          title="This is also the exercise"
          right="dynamic programming"
        />
        <div className="card p-6">
          <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
            <Note title="the problem" body={DP_NOTE.problem} />
            <Note title="why it is hard" body={DP_NOTE.hardness} />
            <Note title="the recurrence" body={DP_NOTE.recurrence} mono />
            <Note title="strategy" body={DP_NOTE.strategy} />
            <Note title="the value function" body={DP_NOTE.values} />
            <Note title="complexity" body={DP_NOTE.complexity} />
          </div>
          <div className="mt-6 border-t border-line pt-5">
            <span className="label" style={{ color: "#C9F24E" }}>
              extend it yourself
            </span>
            <p className="mt-2.5 max-w-[85ch] text-[13.5px] leading-[1.7] text-muted">
              {DP_NOTE.exercise}
            </p>
            <p className="mono mt-3 text-[11px] text-faint">
              source: packages/web/src/web/lib/scheduler.ts · tests:
              scripts/scheduler.test.ts
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="label">{label}</div>
      <div
        className="mt-1.5 text-[19px] font-semibold"
        style={{ color: accent ? "#C9F24E" : "#E9ECEF" }}
      >
        {value}
      </div>
    </div>
  );
}

function Note({
  title,
  body,
  mono,
}: {
  title: string;
  body: string;
  mono?: boolean;
}) {
  return (
    <div>
      <span className="label">{title}</span>
      <p
        className={`mt-2 text-[13px] leading-[1.7] text-muted ${
          mono ? "mono text-[11.5px] leading-[1.8]" : ""
        }`}
      >
        {body}
      </p>
    </div>
  );
}
