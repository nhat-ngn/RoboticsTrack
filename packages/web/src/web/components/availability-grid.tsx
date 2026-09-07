import { useEffect, useRef, useState } from "react";
import type { TrackId } from "../content";
import { TRACK_COLOR } from "../lib/track";
import {
  DAY_LABELS,
  UNITS_PER_DAY,
  isFree,
  setCell,
  unitToClock,
} from "../lib/scheduler";

interface AvailabilityGridProps {
  cells: string;
  onChange: (cells: string) => void;
  /** cell index -> track that got scheduled there, for the tinted overlay. */
  overlay?: Map<number, TrackId>;
}

/**
 * Click or drag to mark free half-hours. Rows are time (06:00-23:00), columns
 * are days — the layout of an actual timetable rather than a list of pickers.
 */
export function AvailabilityGrid({
  cells,
  onChange,
  overlay,
}: AvailabilityGridProps) {
  // Painting: mousedown decides whether this drag turns cells on or off, then
  // every cell entered takes that value. Without the fixed direction a drag
  // over a mixed selection just flickers.
  const painting = useRef<boolean | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const stop = () => {
      painting.current = null;
      setDragging(false);
    };
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, []);

  const apply = (index: number, on: boolean) => {
    if (cells[index] === (on ? "1" : "0")) return;
    onChange(setCell(cells, index, on));
  };

  const start = (index: number) => {
    const on = cells[index] !== "1";
    painting.current = on;
    setDragging(true);
    apply(index, on);
  };

  const enter = (index: number) => {
    if (painting.current === null) return;
    apply(index, painting.current);
  };

  return (
    <div className="select-none">
      <div className="flex gap-1">
        <div className="w-11 shrink-0" />
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="mono flex-1 pb-1.5 text-center text-[10.5px] tracking-[0.12em] text-faint uppercase"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        {Array.from({ length: UNITS_PER_DAY }, (_, u) => {
          const onHour = u % 2 === 0;
          return (
            <div key={u} className="flex items-stretch gap-1">
              <div className="mono w-11 shrink-0 pr-1 text-right text-[10px] leading-[14px] text-faint">
                {onHour ? unitToClock(u) : ""}
              </div>
              {DAY_LABELS.map((day, d) => {
                const index = d * UNITS_PER_DAY + u;
                const free = isFree(cells, d, u);
                const track = overlay?.get(index);
                const bg = track
                  ? `${TRACK_COLOR[track]}44`
                  : free
                    ? "#1d2a12"
                    : "transparent";
                return (
                  <button
                    key={day}
                    type="button"
                    aria-pressed={free}
                    aria-label={`${day} ${unitToClock(u)} ${
                      free ? "free" : "busy"
                    }`}
                    onMouseDown={() => start(index)}
                    onMouseEnter={() => enter(index)}
                    onFocus={() => {
                      if (dragging) enter(index);
                    }}
                    className="h-[14px] flex-1 border-r border-b transition-colors duration-100 hover:brightness-150"
                    style={{
                      background: bg,
                      borderRightColor: "#15181a",
                      borderBottomColor: onHour ? "#15181a" : "#0f1113",
                      borderLeft: free ? `2px solid ${
                        track ? TRACK_COLOR[track] : "#4d6b28"
                      }` : "2px solid transparent",
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
