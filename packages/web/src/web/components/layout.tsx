import { Nav } from "./nav";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <main className="mx-auto max-w-[1180px] px-5 pb-24 pt-14">{children}</main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-2 px-5 py-6">
          <span className="mono text-[11px] text-faint">
            14 Sep 2026 → 14 Sep 2028 · 105 weeks · 4 tracks
          </span>
          <span className="mono text-[11px] text-faint">
            built for one person, one target: M2 MVA
          </span>
        </div>
      </footer>
    </div>
  );
}

/** Page title block used at the top of every page. */
export function PageHead({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="rise border-b border-line py-10" style={{ animationDelay: "0ms" }}>
      <span className="label">{eyebrow}</span>
      <h1 className="mt-3 text-[30px] font-bold leading-[1.1] text-fg sm:text-[40px]">
        {title}
      </h1>
      {lede ? (
        <p className="mt-4 max-w-[70ch] text-[14.5px] leading-[1.65] text-muted">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
