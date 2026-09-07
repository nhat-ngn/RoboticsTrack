import {
  INTERVIEW_NOTE,
  interviewMilestones,
  resourceById,
} from "../content";
import { Layout, PageHead } from "../components/layout";
import { SectionHeader } from "../components/section-header";
import { TrackBar } from "../components/track-bar";
import { CheckRow } from "../components/check-row";
import { usePlanProgress } from "../hooks/use-plan-progress";

export default function InterviewPage() {
  const progress = usePlanProgress();
  const ids = interviewMilestones.map((m) => m.id);
  const s = progress.countOf(ids);

  return (
    <Layout>
      <PageHead
        eyebrow="interview fluency · one milestone per phase"
        title="Interview track."
        lede="You asked for fluency, not competence — and those are different skills with different training. Competence is solving the problem; fluency is solving it out loud, under time, while someone watches. This track runs continuously from Phase 2 to the end, because the only thing that produces fluency is repetition spread over years, not a sprint before applications."
      />

      {/* ---------- THE HONEST BIT ---------- */}
      <section className="rise py-10" style={{ animationDelay: "40ms" }}>
        <div className="card p-6">
          <span className="label" style={{ color: "#FFB454" }}>
            read this before the checklist
          </span>
          <p className="mt-3 max-w-[85ch] whitespace-pre-line text-[13.5px] leading-[1.7] text-muted">
            {INTERVIEW_NOTE}
          </p>
          <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
            <TrackBar value={s.pct} color="#7CC7FF" height={3} />
            <span className="mono shrink-0 text-[11px] text-faint">
              {s.done}/{s.total} phases cleared
            </span>
          </div>
        </div>
      </section>

      {/* ---------- MILESTONES ---------- */}
      <section className="rise pb-10" style={{ animationDelay: "80ms" }}>
        <SectionHeader
          label="phase by phase"
          title="What 'ready' means, each time it changes"
        />
        <div className="space-y-3">
          {interviewMilestones.map((m) => (
            <article key={m.id} className="card p-5">
              <div className="flex items-start gap-5">
                <span
                  className="mono shrink-0 text-[22px] font-medium leading-none"
                  style={{
                    color: progress.done.has(m.id) ? "#C9F24E" : "#2C3235",
                  }}
                >
                  P{m.phase}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="text-[16px] font-semibold text-fg">
                      {m.target}
                    </h3>
                    <span className="mono text-[11px] text-faint">{m.window}</span>
                  </div>
                  <p className="mt-2.5 max-w-[80ch] text-[13.5px] leading-[1.65] text-muted">
                    {m.detail}
                  </p>

                  {m.res.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {m.res.map((rid) => {
                        const r = resourceById[rid];
                        if (!r) return null;
                        return (
                          <a
                            key={rid}
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mono rounded-[4px] border border-line px-2 py-1 text-[10.5px] text-faint transition-colors duration-150 hover:border-line-strong hover:text-info"
                          >
                            {r.title}
                          </a>
                        );
                      })}
                    </div>
                  ) : null}

                  <div className="mt-3 border-t border-line pt-1">
                    <CheckRow
                      id={m.id}
                      text="Milestone cleared"
                      done={progress.done.has(m.id)}
                      onToggle={progress.toggle}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
