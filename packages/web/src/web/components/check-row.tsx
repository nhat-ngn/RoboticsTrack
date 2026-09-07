import { Check, TriangleAlert } from "lucide-react";
import type { TrackId } from "../content";
import { resourceById } from "../content";
import { TRACK_COLOR } from "../lib/track";

interface CheckRowProps {
  id: string;
  text: string;
  done: boolean;
  onToggle: (id: string, done: boolean) => void;
  track?: TrackId;
  gate?: boolean;
  note?: string;
  res?: string[];
}

/**
 * One checkable line. Prerequisite gates are drawn in warn amber with an
 * explicit marker — the user asked to know which items block later material.
 */
export function CheckRow({
  id,
  text,
  done,
  onToggle,
  track,
  gate,
  note,
  res,
}: CheckRowProps) {
  return (
    <div
      className="group flex gap-3 border-b border-line py-2.5 last:border-b-0"
      style={gate && !done ? { borderLeft: "2px solid #FFB454", paddingLeft: 10, marginLeft: -12 } : undefined}
    >
      <button
        type="button"
        onClick={() => onToggle(id, !done)}
        aria-pressed={done}
        aria-label={done ? "Mark not done" : "Mark done"}
        className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-150"
        style={{
          borderColor: done ? "#C9F24E" : gate ? "#4a3a20" : "#2C3235",
          background: done ? "#C9F24E" : "transparent",
        }}
      >
        {done ? <Check size={13} strokeWidth={3} className="text-bg" /> : null}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          {track ? (
            <span
              className="mt-[7px] size-[6px] shrink-0 rounded-full"
              style={{ background: TRACK_COLOR[track] }}
            />
          ) : null}
          <span
            className={`text-[13.5px] leading-[1.55] ${
              done ? "text-faint line-through decoration-line-strong" : "text-fg"
            }`}
          >
            {text}
          </span>
          {gate ? (
            <span
              className="mono inline-flex shrink-0 items-center gap-1 rounded-[4px] px-1.5 py-px text-[9.5px] uppercase tracking-[0.1em]"
              style={{ color: "#FFB454", border: "1px solid #3d3018" }}
              title="Prerequisite — later material depends on this"
            >
              <TriangleAlert size={9} /> gate
            </span>
          ) : null}
        </div>

        {note ? (
          <p className="mt-1 text-[12.5px] leading-[1.5] text-muted">{note}</p>
        ) : null}

        {res && res.length > 0 ? (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {res.map((rid) => {
              const r = resourceById[rid];
              if (!r) return null;
              return (
                <a
                  key={rid}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mono rounded-[4px] border border-line px-1.5 py-px text-[10px] text-faint transition-colors duration-150 hover:border-line-strong hover:text-info"
                  title={`${r.title} — ${r.by}`}
                >
                  {r.title.length > 34 ? `${r.title.slice(0, 32)}…` : r.title}
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
