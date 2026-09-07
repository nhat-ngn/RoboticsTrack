import { Link } from "wouter";
import { BackupCard } from "../components/backup-card";
import { ArrowRight } from "lucide-react";
import {
  PLAN_START,
  TOTAL_WEEKS,
  currentWeekN,
  phases,
  plannedHours,
  planStarted,
  tracks,
  weekByN,
} from "../content";
import { Layout, PageHead } from "../components/layout";
import { SectionHeader } from "../components/section-header";
import { ProgressRing } from "../components/progress-ring";
import { TrackBar } from "../components/track-bar";
import { WeekCard } from "../components/week-card";
import { HoursPanel } from "../components/hours-panel";
import { usePlanProgress } from "../hooks/use-plan-progress";
import { TRACK_COLOR, fmtDate } from "../lib/track";

const DAY = 86_400_000;

function daysUntilStart(): number {
  const [y, m, d] = PLAN_START.split("-").map(Number);
  const start = Date.UTC(y, m - 1, d);
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.ceil((start - today) / DAY);
}

export default function Index() {
  const progress = usePlanProgress();
  const started = planStarted();
  const weekN = started ? currentWeekN() : 1;
  const week = weekByN.get(weekN);
  const untilStart = daysUntilStart();

  return (
    <Layout>
      <PageHead
        eyebrow="two-year plan · engineering school → M2 MVA"
        title="From freshman to master level, in 105 weeks."
        lede="A single plan for four tracks that refuse to stay separate: the maths you are already good at, the code you are not, the machine learning you have never touched, and the robots you build twelve hours a week anyway. Everything below is ordered by prerequisite, not by enthusiasm. Tick things off — progress is saved in this browser, and the backup card at the bottom moves it between your machines."
      />

      {/* ---------- STATUS ---------- */}
      <section className="rise py-10" style={{ animationDelay: "40ms" }}>
        <div className="grid gap-5 lg:grid-cols-[auto_1fr]">
          <div className="card flex items-center gap-6 p-6">
            <ProgressRing value={progress.overall.pct} size={112} label="overall" />
            <div>
              <p className="mono text-[11px] text-faint">
                {progress.overall.done} / {progress.overall.total} items
              </p>
              <p className="mt-2 max-w-[26ch] text-[13px] leading-[1.55] text-muted">
                Week tasks, concepts, robotics milestones and interview gates —
                everything that can be finished.
              </p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <span className="label">
                  {started ? "current position" : "not started yet"}
                </span>
                <p className="mt-2 text-[22px] font-semibold leading-tight text-fg">
                  {started ? (
                    <>
                      Week {weekN} of {TOTAL_WEEKS} · Phase {week?.phase}
                    </>
                  ) : (
                    <>
                      Week 1 begins in {untilStart}{" "}
                      {untilStart === 1 ? "day" : "days"}
                    </>
                  )}
                </p>
                <p className="mono mt-1.5 text-[11px] text-faint">
                  {started
                    ? `${week?.title ?? ""}`
                    : `first Monday: ${fmtDate(PLAN_START)}`}
                </p>
              </div>
              <Link
                to="/roadmap"
                className="mono inline-flex items-center gap-1.5 rounded-[5px] border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] text-muted transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                open roadmap <ArrowRight size={12} />
              </Link>
            </div>

            <div className="mt-6 space-y-3.5">
              {tracks.map((t) => {
                const s = progress.byTrack[t.id];
                return (
                  <Link key={t.id} to={`/track/${t.id}`} className="block group">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="flex items-center gap-2 text-[13px] text-fg">
                        <span
                          className="size-[6px] rounded-full"
                          style={{ background: TRACK_COLOR[t.id] }}
                        />
                        {t.name}
                      </span>
                      <span className="mono text-[11px] text-faint">
                        {s.done}/{s.total} · {t.hoursPerWeek}/wk ·{" "}
                        <span className="text-muted">{s.pct}%</span>
                      </span>
                    </div>
                    <div className="mt-1.5">
                      <TrackBar value={s.pct} color={TRACK_COLOR[t.id]} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- THIS WEEK ---------- */}
      <section className="rise py-6" style={{ animationDelay: "80ms" }}>
        <SectionHeader
          label={started ? "this week" : "first week"}
          right={`${TOTAL_WEEKS - weekN} weeks left`}
        />
        {!started ? (
          <p className="mb-4 max-w-[80ch] text-[13.5px] leading-[1.6] text-muted">
            The plan is anchored to Monday {fmtDate(PLAN_START)}. Nothing is late
            and nothing is missed yet — but Phase 1 is deliberately the easiest
            block in two years, so starting a week early costs you nothing.
          </p>
        ) : null}
        {week ? (
          <WeekCard
            week={week}
            doneIds={progress.done}
            onToggle={progress.toggle}
            onToggleMany={progress.toggleMany}
            defaultOpen
            current={started}
          />
        ) : null}
      </section>

      {/* ---------- TIME BUDGET ---------- */}
      <section className="rise py-6" style={{ animationDelay: "120ms" }}>
        <SectionHeader
          label="time budget"
          title="Planned versus what you actually did"
          right={`${Object.values(plannedHours).reduce((a, b) => a + b, 0)} h/week planned`}
        />
        <p className="mb-5 max-w-[80ch] text-[13.5px] leading-[1.6] text-muted">
          35 hours a week on top of an engineering school course load is the
          honest number this plan asks for, and roughly 12 of them you already
          spend in the robotics club. Log what you really did — the gap between
          the two rows is the only early-warning signal that matters.
        </p>
        <HoursPanel week={weekN} />
      </section>

      {/* ---------- PHASES ---------- */}
      <section className="rise py-6" style={{ animationDelay: "160ms" }}>
        <SectionHeader
          label="eight phases"
          title="The shape of two years"
          right="tap a phase to open it"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {phases.map((p) => {
            const pp = progress.phasePct(p.id);
            const isNow = started && week && week.phase === p.id;
            return (
              <Link
                key={p.id}
                to={`/roadmap#phase-${p.id}`}
                className="card p-4 transition-colors duration-150 hover:border-line-strong"
                style={isNow ? { borderColor: "#C9F24E55" } : undefined}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="mono text-[11px] text-faint">
                    P{p.id} · W{p.weeks[0]}–{p.weeks[1]}
                  </span>
                  <span className="mono text-[11px] text-muted">{pp}%</span>
                </div>
                <h3 className="mt-2 text-[15px] font-semibold text-fg">
                  {p.name}
                </h3>
                <p className="mono mt-1 text-[11px] text-faint">{p.window}</p>
                <div className="mt-3">
                  <TrackBar value={pp} color="#C9F24E" height={3} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ---------- ELSEWHERE ---------- */}
      <section className="rise py-6" style={{ animationDelay: "200ms" }}>
        <SectionHeader label="the rest of the plan" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              to: "/robotics",
              t: "Robotics builds",
              d: "Seven machines, milestone by milestone, with a €10 000 bill of materials that actually adds up.",
            },
            {
              to: "/resources",
              t: "Resource library",
              d: "80 books, courses and repos rated for this plan specifically — including the ones I tell you to skip.",
            },
            {
              to: "/interview",
              t: "Interview track",
              d: "Where your code stops being embarrassing, phase by phase, with a blunt assessment of when.",
            },
            {
              to: "/mva",
              t: "MVA course map",
              d: "The real 2026 catalogue, mapped to the weeks that make each course survivable.",
            },
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="card group p-4 transition-colors duration-150 hover:border-line-strong"
            >
              <h3 className="flex items-center gap-1.5 text-[14px] font-semibold text-fg group-hover:text-accent">
                {c.t}
                <ArrowRight size={13} className="text-faint group-hover:text-accent" />
              </h3>
              <p className="mt-2 text-[12.5px] leading-[1.55] text-muted">{c.d}</p>
            </Link>
          ))}
        </div>
      </section>

      <BackupCard />
    </Layout>
  );
}
