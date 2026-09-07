import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { MVA_NOTE, mvaCourses, mvaShortlist } from "../content";
import type { TrackId } from "../content";
import { Layout, PageHead } from "../components/layout";
import { SectionHeader } from "../components/section-header";
import { TRACK_COLOR, TRACK_SHORT, TRACK_ORDER } from "../lib/track";

export default function MvaPage() {
  const [track, setTrack] = useState<TrackId | "all">("all");
  const shortlist = new Set(mvaShortlist);
  const list = mvaCourses.filter((c) =>
    track === "all" ? true : c.tracks.includes(track),
  );

  return (
    <Layout>
      <PageHead
        eyebrow="M2 MVA · ENS Paris-Saclay · target September 2028"
        title="Course map."
        lede="Taken from the real MVA catalogue rather than from memory, and mapped backwards: for each course, which blocks of this plan make it sittable and the week after which you meet its prerequisites. MVA asks for 8 validated modules; the eight starred below are the shortlist that matches a vision-plus-robot-learning profile, and every one of them is reachable if Phases 1 to 7 actually happen."
      />

      <section className="rise py-10" style={{ animationDelay: "40ms" }}>
        <div className="card p-6">
          <span className="label" style={{ color: "#C9F24E" }}>
            how to use this page
          </span>
          <p className="mt-3 max-w-[85ch] whitespace-pre-line text-[13.5px] leading-[1.7] text-muted">
            {MVA_NOTE}
          </p>
          <a
            href="https://www.master-mva.com/cours-1er-semestre/"
            target="_blank"
            rel="noreferrer"
            className="mono mt-4 inline-flex items-center gap-1.5 rounded-[5px] border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] text-muted transition-colors duration-150 hover:border-accent hover:text-accent"
          >
            official catalogue <ArrowUpRight size={12} />
          </a>
        </div>
      </section>

      <section className="rise pb-10" style={{ animationDelay: "80ms" }}>
        <SectionHeader
          label="courses"
          title="Twenty courses, eight you need"
          right={`${list.length} shown`}
        />

        <div className="mb-5 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setTrack("all")}
            className="mono rounded-[5px] border px-2.5 py-1 text-[11px] transition-colors duration-150"
            style={{
              background: track === "all" ? "#E9ECEF" : "transparent",
              borderColor: track === "all" ? "#E9ECEF" : "#1E2225",
              color: track === "all" ? "#08090A" : "#8A9299",
            }}
          >
            all
          </button>
          {TRACK_ORDER.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTrack(t)}
              className="mono rounded-[5px] border px-2.5 py-1 text-[11px] transition-colors duration-150"
              style={{
                background: track === t ? TRACK_COLOR[t] : "transparent",
                borderColor: track === t ? TRACK_COLOR[t] : "#1E2225",
                color: track === t ? "#08090A" : "#8A9299",
              }}
            >
              {TRACK_SHORT[t]}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {list.map((c) => {
            const starred = shortlist.has(c.name);
            return (
              <article
                key={c.name}
                className="card p-5"
                style={starred ? { borderColor: "#3f4a1e" } : undefined}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="flex items-baseline gap-2 text-[15.5px] font-semibold leading-snug text-fg">
                    {starred ? (
                      <span className="mono text-[11px]" style={{ color: "#C9F24E" }}>
                        ★
                      </span>
                    ) : null}
                    {c.name}
                  </h3>
                  <span className="mono text-[11px] text-faint">{c.domain}</span>
                </div>
                <p className="mono mt-1 text-[11px] text-faint">{c.teacher}</p>

                <p className="mt-3 max-w-[80ch] text-[13px] leading-[1.6] text-muted">
                  {c.prepares}
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {c.tracks.map((t) => (
                      <span
                        key={t}
                        className="mono rounded-[4px] px-1.5 py-px text-[10px]"
                        style={{
                          color: TRACK_COLOR[t],
                          border: `1px solid ${TRACK_COLOR[t]}33`,
                        }}
                      >
                        {TRACK_SHORT[t]}
                      </span>
                    ))}
                  </div>
                  <span className="mono text-[11px]" style={{ color: "#C9F24E" }}>
                    ready by {c.readyBy}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
