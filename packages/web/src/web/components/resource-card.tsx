import { ArrowUpRight } from "lucide-react";
import type { Resource } from "../content";
import { TRACK_COLOR, TRACK_SHORT } from "../lib/track";

function Stars({ n }: { n: number }) {
  return (
    <span className="mono text-[11px] tracking-[0.1em]" title={`${n}/5 for this plan`}>
      <span style={{ color: "#C9F24E" }}>{"●".repeat(n)}</span>
      <span className="text-line-strong">{"●".repeat(5 - n)}</span>
    </span>
  );
}

interface ResourceCardProps {
  r: Resource;
  done: boolean;
  onToggle: (id: string, done: boolean) => void;
}

export function ResourceCard({ r, done, onToggle }: ResourceCardProps) {
  return (
    <article className="card p-4 transition-colors duration-150 hover:border-line-strong">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <a
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-start gap-1 text-[15px] font-semibold leading-snug text-fg hover:text-accent"
          >
            {r.title}
            <ArrowUpRight
              size={13}
              className="mt-1 shrink-0 text-faint group-hover:text-accent"
            />
          </a>
          <p className="mono mt-1 text-[11px] text-faint">
            {r.by} · {r.type}
          </p>
        </div>
        <Stars n={r.rating} />
      </div>

      <p className="mt-3 text-[13px] leading-[1.6] text-muted">{r.verdict}</p>

      <div className="mt-3 grid gap-1 border-t border-line pt-3 text-[12px] text-faint sm:grid-cols-2">
        <p>
          <span className="label">effort</span>{" "}
          <span className="mono text-muted">{r.effort}</span>
        </p>
        <p>
          <span className="label">when</span>{" "}
          <span className="mono text-muted">{r.when}</span>
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {r.tracks.map((t) => (
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
        <button
          type="button"
          onClick={() => onToggle(`res-${r.id}`, !done)}
          className="mono shrink-0 rounded-[5px] border px-2 py-1 text-[10.5px] uppercase tracking-[0.1em] transition-colors duration-150"
          style={{
            borderColor: done ? "#C9F24E" : "#2C3235",
            color: done ? "#C9F24E" : "#8A9299",
          }}
        >
          {done ? "started ✓" : "mark started"}
        </button>
      </div>
    </article>
  );
}
