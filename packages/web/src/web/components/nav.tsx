import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { usePlanProgress } from "../hooks/use-plan-progress";

const ROUTES: { to: string; label: string }[] = [
  { to: "/", label: "Dashboard" },
  { to: "/roadmap", label: "Roadmap" },
  { to: "/planner", label: "Planner" },
  { to: "/track/math", label: "Math" },
  { to: "/track/cs", label: "CS / CV" },
  { to: "/track/ml", label: "ML / RL" },
  { to: "/robotics", label: "Robotics" },
  { to: "/resources", label: "Resources" },
  { to: "/interview", label: "Interviews" },
  { to: "/mva", label: "MVA" },
];

export function Nav() {
  const [loc] = useLocation();
  const [open, setOpen] = useState(false);
  const progress = usePlanProgress();

  const isActive = (to: string) =>
    to === "/" ? loc === "/" : loc.startsWith(to);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1180px] items-center gap-6 px-5">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <span
            className="flex size-6 items-center justify-center rounded-[5px] border"
            style={{ borderColor: "#3f4a1e" }}
          >
            <span className="mono text-[10px] font-medium text-accent">M</span>
          </span>
          <span className="mono hidden text-[12px] tracking-[0.14em] text-fg sm:inline">
            MVA/2028
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {ROUTES.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className={`rounded-[5px] px-2.5 py-1.5 text-[12.5px] transition-colors duration-150 ${
                isActive(r.to)
                  ? "bg-surface2 text-fg"
                  : "text-muted hover:text-fg"
              }`}
            >
              {r.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <div className="hidden items-center gap-2 sm:flex">
            <div className="h-[3px] w-16 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-accent"
                style={{
                  width: `${progress.overall.pct}%`,
                  transition: "width 400ms ease",
                }}
              />
            </div>
            <span className="mono text-[11px] text-muted">
              {progress.overall.pct}%
            </span>
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="text-muted transition-colors hover:text-fg lg:hidden"
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-b border-line bg-bg lg:hidden">
          <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-1 px-4 py-3">
            {ROUTES.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                onClick={() => setOpen(false)}
                className={`rounded-[5px] px-3 py-2 text-[13px] ${
                  isActive(r.to) ? "bg-surface2 text-fg" : "text-muted"
                }`}
              >
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
