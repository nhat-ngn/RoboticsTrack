interface SectionHeaderProps {
  label: string;
  title?: string;
  right?: React.ReactNode;
}

/** Small-caps mono label with a hairline rule running to the right edge. */
export function SectionHeader({ label, title, right }: SectionHeaderProps) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-4">
        <span className="label whitespace-nowrap">{label}</span>
        <div className="hairline flex-1" />
        {right ? <div className="mono text-[11px] text-faint">{right}</div> : null}
      </div>
      {title ? (
        <h2 className="mt-3 text-xl font-semibold text-fg sm:text-2xl">{title}</h2>
      ) : null}
    </div>
  );
}
