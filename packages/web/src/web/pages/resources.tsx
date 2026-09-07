import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { resources } from "../content";
import type { ResourceType, TrackId } from "../content";
import { Layout, PageHead } from "../components/layout";
import { SectionHeader } from "../components/section-header";
import { ResourceCard } from "../components/resource-card";
import { usePlanProgress } from "../hooks/use-plan-progress";
import { TRACK_COLOR, TRACK_SHORT, TRACK_ORDER } from "../lib/track";

const TYPES: ResourceType[] = [
  "course",
  "book",
  "video",
  "paper",
  "repo",
  "practice",
  "tool",
];

export default function ResourcesPage() {
  const progress = usePlanProgress();
  const [q, setQ] = useState("");
  const [track, setTrack] = useState<TrackId | "all">("all");
  const [type, setType] = useState<ResourceType | "all">("all");
  const [minRating, setMinRating] = useState(0);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return resources
      .filter((r) => (track === "all" ? true : r.tracks.includes(track)))
      .filter((r) => (type === "all" ? true : r.type === type))
      .filter((r) => r.rating >= minRating)
      .filter((r) =>
        needle === ""
          ? true
          : `${r.title} ${r.by} ${r.verdict} ${r.when}`
              .toLowerCase()
              .includes(needle),
      )
      .sort((a, b) => b.rating - a.rating || a.title.localeCompare(b.title));
  }, [q, track, type, minRating]);

  const chip = (active: boolean) =>
    `mono rounded-[5px] border px-2.5 py-1 text-[11px] transition-colors duration-150 ${
      active ? "text-bg" : "text-muted hover:text-fg"
    }`;

  return (
    <Layout>
      <PageHead
        eyebrow={`${resources.length} entries · rated for this plan, not for fame`}
        title="Resource library."
        lede="Every rating answers one question only: how useful is this to you, starting from prépa maths, weak code and zero ML, aiming at MVA in September 2028? That is why some famous things score 3 and some obscure things score 5. Where two resources overlap, the verdict says which one to actually use and why the other is still listed."
      />

      {/* ---------- FILTERS ---------- */}
      <section className="rise py-8" style={{ animationDelay: "40ms" }}>
        <div className="card p-4">
          <div className="flex items-center gap-2.5 border-b border-line pb-3">
            <Search size={15} className="shrink-0 text-faint" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search title, author, verdict…"
              aria-label="Search the resource library"
              className="w-full bg-transparent text-[13.5px] text-fg outline-none placeholder:text-faint"
            />
            <span className="mono shrink-0 text-[11px] text-faint">
              {list.length}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setTrack("all")}
              className={chip(track === "all")}
              style={{
                background: track === "all" ? "#E9ECEF" : "transparent",
                borderColor: track === "all" ? "#E9ECEF" : "#1E2225",
              }}
            >
              all tracks
            </button>
            {TRACK_ORDER.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTrack(t)}
                className={chip(track === t)}
                style={{
                  background: track === t ? TRACK_COLOR[t] : "transparent",
                  borderColor: track === t ? TRACK_COLOR[t] : "#1E2225",
                }}
              >
                {TRACK_SHORT[t]}
              </button>
            ))}
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setType("all")}
              className={chip(type === "all")}
              style={{
                background: type === "all" ? "#E9ECEF" : "transparent",
                borderColor: type === "all" ? "#E9ECEF" : "#1E2225",
              }}
            >
              all types
            </button>
            {TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={chip(type === t)}
                style={{
                  background: type === t ? "#E9ECEF" : "transparent",
                  borderColor: type === t ? "#E9ECEF" : "#1E2225",
                }}
              >
                {t}
              </button>
            ))}
            <span className="mx-1 w-px bg-line" />
            {[0, 4, 5].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setMinRating(r)}
                className={chip(minRating === r)}
                style={{
                  background: minRating === r ? "#C9F24E" : "transparent",
                  borderColor: minRating === r ? "#C9F24E" : "#1E2225",
                }}
              >
                {r === 0 ? "any rating" : `${r}+ only`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- LIST ---------- */}
      <section className="rise pb-10" style={{ animationDelay: "80ms" }}>
        <SectionHeader
          label="the library"
          right={`${progress.countOf(resources.map((r) => `res-${r.id}`)).done} marked started`}
        />
        {list.length === 0 ? (
          <p className="card p-8 text-center text-[13.5px] text-muted">
            Nothing matches those filters.
          </p>
        ) : (
          <div className="grid gap-3 lg:grid-cols-2">
            {list.map((r) => (
              <ResourceCard
                key={r.id}
                r={r}
                done={progress.done.has(`res-${r.id}`)}
                onToggle={progress.toggle}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
