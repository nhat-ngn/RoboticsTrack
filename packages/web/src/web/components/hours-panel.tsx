import { useState } from "react";
import { plannedHours, tracks } from "../content";
import type { TrackId } from "../content";
import { useHours, useSetHours } from "../stores/hours";
import { TRACK_COLOR } from "../lib/track";

interface HoursPanelProps {
  week: number;
}

/**
 * Planned versus logged hours for one week. Planned comes from the static
 * budget (7/12/4/12); logged is the only number the user types in this app.
 */
export function HoursPanel({ week }: HoursPanelProps) {
  const hours = useHours();
  const setHours = useSetHours();
  const [draft, setDraft] = useState<Record<string, string>>({});

  const logged = (t: TrackId) =>
    hours.data?.find((r) => r.week === week && r.track === t)?.hours ?? 0;

  const plannedTotal = tracks.reduce((a, t) => a + plannedHours[t.id], 0);
  const loggedTotal = tracks.reduce((a, t) => a + logged(t.id), 0);

  const commit = (t: TrackId, raw: string) => {
    const v = Number(raw.replace(",", "."));
    if (Number.isFinite(v) && v >= 0 && v <= 80) {
      setHours.mutate({ week, track: t, hours: Math.round(v * 2) / 2 });
    }
    setDraft((d) => {
      const next = { ...d };
      delete next[t];
      return next;
    });
  };

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="label">week {week} · hours</span>
        <span className="mono text-[11px] text-faint">
          logged{" "}
          <span
            style={{
              color: loggedTotal >= plannedTotal * 0.8 ? "#C9F24E" : "#8A9299",
            }}
          >
            {loggedTotal}
          </span>{" "}
          / planned {plannedTotal} h
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {tracks.map((t) => {
          const planned = plannedHours[t.id];
          const actual = logged(t.id);
          const max = Math.max(planned, actual, 1);
          return (
            <div key={t.id}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="flex items-center gap-2 text-[13px] text-fg">
                  <span
                    className="size-[6px] rounded-full"
                    style={{ background: TRACK_COLOR[t.id] }}
                  />
                  {t.short}
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={80}
                    step={0.5}
                    inputMode="decimal"
                    aria-label={`Hours logged for ${t.short} in week ${week}`}
                    value={draft[t.id] ?? (actual || "")}
                    placeholder="0"
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, [t.id]: e.target.value }))
                    }
                    onBlur={(e) => commit(t.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                    className="mono w-16 rounded-[5px] border border-line bg-surface2 px-2 py-1 text-right text-[12px] text-fg outline-none transition-colors duration-150 focus:border-line-strong"
                  />
                  <span className="mono text-[11px] text-faint">
                    / {planned} h
                  </span>
                </div>
              </div>

              <div className="mt-2 space-y-[3px]">
                <div className="h-[3px] w-full overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(planned / max) * 100}%`,
                      background: "#2C3235",
                    }}
                  />
                </div>
                <div className="h-[3px] w-full overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(actual / max) * 100}%`,
                      background: TRACK_COLOR[t.id],
                      transition: "width 300ms ease",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 border-t border-line pt-3 text-[12px] leading-[1.55] text-faint">
        Upper bar is planned, lower bar is you. Two consecutive weeks under
        budget on CS is the failure mode to watch — it is the track with the
        biggest gap and the least intrinsic pull.
      </p>
    </div>
  );
}
