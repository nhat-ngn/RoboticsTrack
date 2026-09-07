import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Week } from "../content";
import { trackById } from "../content";
import { TRACK_COLOR, TRACK_ORDER, fmtRange, pct } from "../lib/track";
import { CheckRow } from "./check-row";

const KIND_LABEL: Record<Week["kind"], string> = {
  core: "",
  break: "school holiday · light",
  summer: "summer · optional",
};

interface WeekCardProps {
  week: Week;
  doneIds: Set<string>;
  onToggle: (id: string, done: boolean) => void;
  onToggleMany: (ids: string[], done: boolean) => void;
  defaultOpen?: boolean;
  current?: boolean;
}

export function WeekCard({
  week,
  doneIds,
  onToggle,
  onToggleMany,
  defaultOpen = false,
  current = false,
}: WeekCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const total = week.tasks.length;
  const done = week.tasks.filter((t) => doneIds.has(t.id)).length;
  const p = pct(done, total);
  const complete = total > 0 && done === total;

  return (
    <section
      className="card overflow-hidden"
      style={current ? { borderColor: "#C9F24E55" } : undefined}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-4 p-4 text-left transition-colors duration-150 hover:bg-surface2"
      >
        <div className="w-[52px] shrink-0">
          <div
            className="mono text-[19px] font-medium leading-none"
            style={{ color: complete ? "#C9F24E" : current ? "#E9ECEF" : "#5C6469" }}
          >
            {String(week.n).padStart(2, "0")}
          </div>
          <div className="label mt-1.5 leading-none">week</div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[15px] font-semibold leading-snug text-fg">
              {week.title}
            </h3>
            {current ? (
              <span className="mono rounded-[4px] px-1.5 py-px text-[9.5px] uppercase tracking-[0.1em] text-accent" style={{ border: "1px solid #3f4a1e" }}>
                now
              </span>
            ) : null}
            {week.kind !== "core" ? (
              <span className="mono rounded-[4px] border border-line px-1.5 py-px text-[9.5px] uppercase tracking-[0.1em] text-faint">
                {KIND_LABEL[week.kind]}
              </span>
            ) : null}
          </div>
          <p className="mono mt-1 text-[11px] text-faint">{fmtRange(week.start)}</p>
          <p className="mt-2 text-[13px] leading-[1.55] text-muted">{week.focus}</p>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-[3px] flex-1 gap-[2px] overflow-hidden rounded-full">
              {TRACK_ORDER.map((t) => {
                const n = week.tasks.filter((x) => x.track === t).length;
                if (n === 0) return null;
                const d = week.tasks.filter(
                  (x) => x.track === t && doneIds.has(x.id),
                ).length;
                return (
                  <div
                    key={t}
                    className="h-full overflow-hidden rounded-full bg-line"
                    style={{ flex: n }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct(d, n)}%`,
                        background: TRACK_COLOR[t],
                        transition: "width 300ms ease",
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <span className="mono shrink-0 text-[11px] text-faint">
              {done}/{total}
            </span>
          </div>
        </div>

        <ChevronDown
          size={16}
          className="mt-1 shrink-0 text-faint transition-transform duration-150"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        />
      </button>

      {open ? (
        <div className="border-t border-line bg-surface2/40 px-4 pb-4 pt-1">
          {TRACK_ORDER.map((t) => {
            const items = week.tasks.filter((x) => x.track === t);
            if (items.length === 0) return null;
            const track = trackById.get(t);
            return (
              <div key={t} className="mt-3">
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className="size-[6px] rounded-full"
                    style={{ background: TRACK_COLOR[t] }}
                  />
                  <span className="label" style={{ color: TRACK_COLOR[t] }}>
                    {track?.short ?? t}
                  </span>
                  <div className="hairline flex-1" />
                </div>
                {items.map((task) => (
                  <CheckRow
                    key={task.id}
                    id={task.id}
                    text={task.text}
                    done={doneIds.has(task.id)}
                    onToggle={onToggle}
                    gate={task.gate}
                    res={task.res}
                  />
                ))}
              </div>
            );
          })}

          {week.deliverable ? (
            <div
              className="mt-4 rounded-[8px] border p-3"
              style={{ borderColor: "#2C3235", background: "#0b0d0e" }}
            >
              <span className="label" style={{ color: "#C9F24E" }}>
                deliverable
              </span>
              <p className="mt-1 text-[13px] leading-[1.55] text-fg">
                {week.deliverable}
              </p>
            </div>
          ) : null}

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => onToggleMany(week.tasks.map((t) => t.id), true)}
              className="mono rounded-[5px] border border-line px-2.5 py-1 text-[10.5px] uppercase tracking-[0.1em] text-muted transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              tick week
            </button>
            <button
              type="button"
              onClick={() => onToggleMany(week.tasks.map((t) => t.id), false)}
              className="mono rounded-[5px] border border-line px-2.5 py-1 text-[10.5px] uppercase tracking-[0.1em] text-faint transition-colors duration-150 hover:border-line-strong hover:text-muted"
            >
              clear
            </button>
            <span className="mono ml-auto self-center text-[11px] text-faint">
              {p}%
            </span>
          </div>
        </div>
      ) : null}
    </section>
  );
}
