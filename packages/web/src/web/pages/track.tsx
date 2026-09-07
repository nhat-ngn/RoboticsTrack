import { useParams } from "wouter";
import { Link } from "wouter";
import {
  conceptGroups,
  plannedHours,
  resourceById,
  tracks,
  trackById,
} from "../content";
import type { TrackId } from "../content";
import { Layout, PageHead } from "../components/layout";
import { SectionHeader } from "../components/section-header";
import { ProgressRing } from "../components/progress-ring";
import { TrackBar } from "../components/track-bar";
import { CheckRow } from "../components/check-row";
import { usePlanProgress } from "../hooks/use-plan-progress";
import { TRACK_COLOR } from "../lib/track";

const VALID: TrackId[] = ["math", "cs", "ml", "rob"];

export default function TrackPage() {
  const { id } = useParams<{ id: string }>();
  const progress = usePlanProgress();
  const trackId = (VALID.includes(id as TrackId) ? id : "math") as TrackId;
  const track = trackById.get(trackId);
  const groups = conceptGroups(trackId);
  const color = TRACK_COLOR[trackId];

  if (!track) return null;

  const conceptIds = groups.flatMap((g) => g.items.map((c) => c.id));
  const conceptStats = progress.countOf(conceptIds);
  const trackStats = progress.byTrack[trackId];
  const gateCount = groups.flatMap((g) => g.items).filter((c) => c.gate).length;

  return (
    <Layout>
      <PageHead
        eyebrow={`track · ${plannedHours[trackId]} h per week · 105 weeks`}
        title={track.name}
        lede={track.blurb}
      />

      {/* ---------- WHERE YOU STAND ---------- */}
      <section className="rise py-10" style={{ animationDelay: "40ms" }}>
        <div className="grid gap-5 lg:grid-cols-[auto_1fr]">
          <div className="card flex items-center gap-6 p-6">
            <ProgressRing
              value={trackStats.pct}
              size={104}
              color={color}
              label="track"
            />
            <div>
              <p className="mono text-[11px] text-faint">
                {trackStats.done} / {trackStats.total}
              </p>
              <p className="mt-2 max-w-[22ch] text-[13px] leading-[1.55] text-muted">
                Week tasks and concepts combined.
              </p>
            </div>
          </div>

          <div className="card grid gap-6 p-6 sm:grid-cols-2">
            <div>
              <span className="label">where you start</span>
              <p className="mt-2.5 text-[13.5px] leading-[1.6] text-muted">
                {track.startLevel}
              </p>
            </div>
            <div>
              <span className="label" style={{ color }}>
                where you finish
              </span>
              <p className="mt-2.5 text-[13.5px] leading-[1.6] text-fg">
                {track.endGoal}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tracks
            .filter((t) => t.id !== trackId)
            .map((t) => (
              <Link
                key={t.id}
                to={`/track/${t.id}`}
                className="mono rounded-[5px] border border-line px-2.5 py-1.5 text-[11px] text-muted transition-colors duration-150 hover:border-line-strong hover:text-fg"
              >
                <span
                  className="mr-2 inline-block size-[6px] rounded-full align-middle"
                  style={{ background: TRACK_COLOR[t.id] }}
                />
                {t.short} · {progress.byTrack[t.id].pct}%
              </Link>
            ))}
        </div>
      </section>

      {/* ---------- CONCEPTS ---------- */}
      <section className="rise py-6" style={{ animationDelay: "80ms" }}>
        <SectionHeader
          label="concept checklist"
          title="Everything this track requires you to actually know"
          right={`${conceptStats.done}/${conceptStats.total} · ${gateCount} gates`}
        />
        <p className="mb-6 max-w-[80ch] text-[13.5px] leading-[1.6] text-muted">
          Ordered by dependency, grouped by module. Tick a concept only when you
          could explain it to someone else without notes — that is the standard
          MVA exams and technical interviews both apply. Amber entries are
          prerequisites: everything after them assumes them silently.
        </p>

        <div className="space-y-5">
          {groups.map((g, gi) => {
            const ids = g.items.map((c) => c.id);
            const s = progress.countOf(ids);
            return (
              <div key={g.group} className="card p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-3">
                    <span className="mono text-[11px] text-faint">
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[15.5px] font-semibold text-fg">
                      {g.group}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="mono text-[11px] text-faint">
                      {s.done}/{s.total}
                    </span>
                    <button
                      type="button"
                      onClick={() => progress.toggleMany(ids, s.done !== s.total)}
                      className="mono rounded-[5px] border border-line px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-faint transition-colors duration-150 hover:border-line-strong hover:text-muted"
                    >
                      {s.done === s.total ? "clear" : "tick all"}
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <TrackBar value={s.pct} color={color} height={3} />
                </div>

                <div className="mt-4">
                  {g.items.map((c) => (
                    <CheckRow
                      key={c.id}
                      id={c.id}
                      text={c.name}
                      note={c.why}
                      done={progress.done.has(c.id)}
                      onToggle={progress.toggle}
                      gate={c.gate}
                      res={c.res}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- KEY RESOURCES ---------- */}
      <section className="rise py-6" style={{ animationDelay: "120ms" }}>
        <SectionHeader
          label="core resources for this track"
          right={<Link to="/resources">full library →</Link>}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(resourceById)
            .filter((r) => r.tracks.includes(trackId) && r.rating >= 4)
            .slice(0, 9)
            .map((r) => (
              <a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="card p-3.5 transition-colors duration-150 hover:border-line-strong"
              >
                <p className="text-[13.5px] font-semibold leading-snug text-fg">
                  {r.title}
                </p>
                <p className="mono mt-1 text-[10.5px] text-faint">
                  {r.by} · {r.type} · {"●".repeat(r.rating)}
                </p>
                <p className="mt-2 text-[12px] leading-[1.5] text-muted">
                  {r.when}
                </p>
              </a>
            ))}
        </div>
      </section>
    </Layout>
  );
}
