import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  BUDGET_NOTE,
  ROBOTICS_BUDGET_CAP,
  resourceById,
  roboticsProjects,
  roboticsTotal,
} from "../content";
import type { RoboticsProject } from "../content";
import { Layout, PageHead } from "../components/layout";
import { SectionHeader } from "../components/section-header";
import { TrackBar } from "../components/track-bar";
import { CheckRow } from "../components/check-row";
import { usePlanProgress } from "../hooks/use-plan-progress";

const ROB = "#FF9D5C";

const STATUS_LABEL: Record<RoboticsProject["status"], string> = {
  club: "club project",
  solo: "solo build",
  "club+solo": "club + solo",
};

function ProjectCard({ p }: { p: RoboticsProject }) {
  const progress = usePlanProgress();
  const [open, setOpen] = useState(false);
  const ids = p.milestones.map((m) => m.id);
  const s = progress.countOf(ids);

  return (
    <article className="card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full p-5 text-left transition-colors duration-150 hover:bg-surface2"
      >
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-[17px] font-semibold text-fg">{p.name}</h3>
              <span className="mono rounded-[4px] border border-line px-1.5 py-px text-[9.5px] uppercase tracking-[0.1em] text-faint">
                {STATUS_LABEL[p.status]}
              </span>
            </div>
            <p className="mono mt-1.5 text-[11px] text-faint">
              {p.window} · €{p.budget.toLocaleString("en-US")}
            </p>
            <p className="mt-3 max-w-[75ch] text-[13.5px] leading-[1.65] text-muted">
              {p.pitch}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <TrackBar value={s.pct} color={ROB} height={3} />
              <span className="mono shrink-0 text-[11px] text-faint">
                {s.done}/{s.total}
              </span>
            </div>
          </div>
          <ChevronDown
            size={17}
            className="mt-1 shrink-0 text-faint transition-transform duration-150"
            style={{ transform: open ? "rotate(180deg)" : undefined }}
          />
        </div>
      </button>

      {open ? (
        <div className="border-t border-line p-5">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <span className="label" style={{ color: ROB }}>
                milestones
              </span>
              <div className="mt-2">
                {p.milestones.map((m) => (
                  <CheckRow
                    key={m.id}
                    id={m.id}
                    text={m.text}
                    done={progress.done.has(m.id)}
                    onToggle={progress.toggle}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <span className="label">skills it forces</span>
                <ul className="mt-2 space-y-1.5">
                  {p.skills.map((k) => (
                    <li
                      key={k}
                      className="flex gap-2.5 text-[12.5px] leading-[1.55] text-fg"
                    >
                      <span className="mt-[7px] size-[5px] shrink-0 rounded-full" style={{ background: ROB }} />
                      {k}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="label">theory it lands on</span>
                <ul className="mt-2 space-y-1.5">
                  {p.concepts.map((k) => (
                    <li
                      key={k}
                      className="flex gap-2.5 text-[12.5px] leading-[1.55] text-muted"
                    >
                      <span className="mt-[7px] size-[5px] shrink-0 rounded-full bg-line-strong" />
                      {k}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* BOM */}
          <div className="mt-6">
            <div className="flex items-center gap-4">
              <span className="label">bill of materials</span>
              <div className="hairline flex-1" />
              <span className="mono text-[11px] text-muted">
                €{p.budget.toLocaleString("en-US")}
              </span>
            </div>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line">
                    <th className="label pb-2 font-normal">item</th>
                    <th className="label pb-2 font-normal">qty</th>
                    <th className="label pb-2 text-right font-normal">cost</th>
                    <th className="label pb-2 font-normal">note</th>
                  </tr>
                </thead>
                <tbody>
                  {p.bom.map((b) => (
                    <tr key={b.item} className="border-b border-line last:border-b-0">
                      <td className="py-2 pr-3 text-[12.5px] text-fg">{b.item}</td>
                      <td className="mono py-2 pr-3 text-[11.5px] text-faint">
                        {b.qty}
                      </td>
                      <td className="mono py-2 pr-3 text-right text-[11.5px]"
                          style={{ color: b.cost === 0 ? "#5C6469" : "#E9ECEF" }}>
                        {b.cost === 0 ? "—" : `€${b.cost}`}
                      </td>
                      <td className="py-2 text-[12px] leading-[1.45] text-muted">
                        {b.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {p.res.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
              {p.res.map((rid) => {
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
        </div>
      ) : null}
    </article>
  );
}

export default function RoboticsPage() {
  const progress = usePlanProgress();
  const allIds = roboticsProjects.flatMap((p) => p.milestones.map((m) => m.id));
  const s = progress.countOf(allIds);
  const spentPct = Math.round((roboticsTotal / ROBOTICS_BUDGET_CAP) * 100);

  return (
    <Layout>
      <PageHead
        eyebrow="seven builds · 12+ h per week · €10 000 cap"
        title="Robotics."
        lede="You do not need motivation here, so this page does the two jobs a plan can actually do: sequence the builds so each one lands right after the maths that makes it non-trivial, and keep the money honest. Every build below is also a portfolio artefact and a data source for the ML track — the same robots produce the datasets you train on."
      />

      {/* ---------- BUDGET ---------- */}
      <section className="rise py-10" style={{ animationDelay: "40ms" }}>
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="card p-6">
            <div className="flex items-baseline justify-between gap-3">
              <span className="label">budget</span>
              <span className="mono text-[11px] text-faint">
                {spentPct}% allocated
              </span>
            </div>
            <p className="mt-3 text-[28px] font-semibold leading-none text-fg">
              €{roboticsTotal.toLocaleString("en-US")}
              <span className="mono ml-2 text-[13px] font-normal text-faint">
                / €{ROBOTICS_BUDGET_CAP.toLocaleString("en-US")}
              </span>
            </p>
            <div className="mt-4">
              <TrackBar value={spentPct} color={ROB} height={4} />
            </div>
            <div className="mt-5 space-y-2 border-t border-line pt-4">
              {roboticsProjects.map((p) => (
                <div key={p.id} className="flex items-baseline justify-between gap-3">
                  <span className="text-[12.5px] text-muted">{p.name}</span>
                  <span className="mono text-[11.5px] text-fg">
                    €{p.budget.toLocaleString("en-US")}
                  </span>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-3 border-t border-line pt-2">
                <span className="text-[12.5px] text-faint">unallocated slack</span>
                <span className="mono text-[11.5px]" style={{ color: "#C9F24E" }}>
                  €{(ROBOTICS_BUDGET_CAP - roboticsTotal).toLocaleString("en-US")}
                </span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <span className="label">why the money sits where it sits</span>
            <p className="mt-3 whitespace-pre-line text-[13.5px] leading-[1.7] text-muted">
              {BUDGET_NOTE}
            </p>
            <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
              <TrackBar value={s.pct} color={ROB} height={3} />
              <span className="mono shrink-0 text-[11px] text-faint">
                {s.done}/{s.total} milestones
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PROJECTS ---------- */}
      <section className="rise pb-10" style={{ animationDelay: "80ms" }}>
        <SectionHeader
          label="the builds"
          title="Sequenced, not listed"
          right="tap to open milestones + BOM"
        />
        <div className="space-y-3">
          {roboticsProjects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
