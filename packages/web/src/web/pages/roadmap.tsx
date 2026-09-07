import { useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import {
  currentWeekN,
  phases,
  planStarted,
  weeksInPhase,
} from "../content";
import { Layout, PageHead } from "../components/layout";
import { SectionHeader } from "../components/section-header";
import { TrackBar } from "../components/track-bar";
import { WeekCard } from "../components/week-card";
import { usePlanProgress } from "../hooks/use-plan-progress";

function PhaseBlock({
  phaseId,
  openByDefault,
}: {
  phaseId: number;
  openByDefault: boolean;
}) {
  const progress = usePlanProgress();
  const [open, setOpen] = useState(openByDefault);
  const phase = phases.find((p) => p.id === phaseId);
  const weeks = weeksInPhase(phaseId);
  const started = planStarted();
  const nowWeek = started ? currentWeekN() : 0;
  if (!phase) return null;

  const p = progress.phasePct(phaseId);
  const ids = weeks.flatMap((w) => w.tasks.map((t) => t.id));

  return (
    <section id={`phase-${phase.id}`} className="scroll-mt-20 py-8">
      <div className="card overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full p-5 text-left transition-colors duration-150 hover:bg-surface2 sm:p-6"
        >
          <div className="flex items-start gap-5">
            <span
              className="mono shrink-0 text-[28px] font-medium leading-none"
              style={{ color: p === 100 ? "#C9F24E" : "#2C3235" }}
            >
              {String(phase.id).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="text-[19px] font-semibold text-fg sm:text-[21px]">
                  {phase.name}
                </h2>
                <span className="mono text-[11px] text-faint">
                  {phase.window} · W{phase.weeks[0]}–{phase.weeks[1]}
                </span>
              </div>
              <p className="mt-3 max-w-[75ch] text-[13.5px] leading-[1.65] text-muted">
                {phase.thesis}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <TrackBar value={p} color="#C9F24E" height={3} />
                <span className="mono shrink-0 text-[11px] text-faint">{p}%</span>
              </div>
            </div>
            <ChevronDown
              size={18}
              className="mt-1 shrink-0 text-faint transition-transform duration-150"
              style={{ transform: open ? "rotate(180deg)" : undefined }}
            />
          </div>
        </button>

        <div className="grid gap-6 border-t border-line p-5 sm:grid-cols-2 sm:p-6">
          <div>
            <span className="label">what you walk out with</span>
            <ul className="mt-3 space-y-2">
              {phase.outcomes.map((o) => (
                <li key={o} className="flex gap-2.5 text-[13px] leading-[1.55] text-fg">
                  <span className="mt-[7px] size-[5px] shrink-0 rounded-full bg-accent" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="label" style={{ color: "#FFB454" }}>
              prerequisite gates
            </span>
            <ul className="mt-3 space-y-2">
              {phase.gates.map((g) => (
                <li
                  key={g}
                  className="flex gap-2.5 text-[13px] leading-[1.55] text-muted"
                >
                  <span
                    className="mt-[7px] size-[5px] shrink-0 rounded-full"
                    style={{ background: "#FFB454" }}
                  />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {open ? (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between gap-3 px-1">
            <span className="mono text-[11px] text-faint">
              {weeks.length} weeks
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => progress.toggleMany(ids, true)}
                className="mono rounded-[5px] border border-line px-2.5 py-1 text-[10.5px] uppercase tracking-[0.1em] text-muted transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                tick phase
              </button>
              <button
                type="button"
                onClick={() => progress.toggleMany(ids, false)}
                className="mono rounded-[5px] border border-line px-2.5 py-1 text-[10.5px] uppercase tracking-[0.1em] text-faint transition-colors duration-150 hover:border-line-strong hover:text-muted"
              >
                clear
              </button>
            </div>
          </div>
          {weeks.map((w) => (
            <WeekCard
              key={w.n}
              week={w}
              doneIds={progress.done}
              onToggle={progress.toggle}
              onToggleMany={progress.toggleMany}
              current={w.n === nowWeek}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default function RoadmapPage() {
  const started = planStarted();
  const nowPhase = started
    ? (phases.find(
        (p) => currentWeekN() >= p.weeks[0] && currentWeekN() <= p.weeks[1],
      )?.id ?? 1)
    : 1;

  return (
    <Layout>
      <PageHead
        eyebrow="week by week · 105 weeks · 8 phases"
        title="The roadmap."
        lede="Ordered strictly by prerequisite: nothing appears before the thing that makes it comprehensible. School holidays (French Zone C) become lighter project weeks rather than empty ones, and the two summers are marked optional — if you do nothing in August 2027 the plan still works, it just gets tighter afterwards. Amber items are gates: skip one and everything downstream of it becomes memorisation instead of understanding."
      />

      <div className="rise py-6" style={{ animationDelay: "40ms" }}>
        <SectionHeader
          label="how to read this"
          right={<span className="inline-flex items-center gap-1.5"><Filter size={11} /> tap a phase to expand its weeks</span>}
        />
        <div className="grid gap-3 text-[12.5px] leading-[1.55] text-muted sm:grid-cols-3">
          <p className="card p-3.5">
            <span className="label">week rows</span>
            <br />
            Each week lists tasks per track. Tick them as you finish; the coloured
            segments show per-track completion for that week.
          </p>
          <p className="card p-3.5">
            <span className="label" style={{ color: "#FFB454" }}>
              gate items
            </span>
            <br />
            Amber left border and a "gate" tag. These are prerequisites — later
            weeks assume them silently.
          </p>
          <p className="card p-3.5">
            <span className="label" style={{ color: "#C9F24E" }}>
              deliverables
            </span>
            <br />
            Some weeks end with something you can show: a repo, a benchmark, a
            robot doing a thing. Those are the portfolio.
          </p>
        </div>
      </div>

      {phases.map((p) => (
        <PhaseBlock key={p.id} phaseId={p.id} openByDefault={p.id === nowPhase} />
      ))}
    </Layout>
  );
}
