import { useRef, useState } from "react";
import { Download, RotateCcw, Upload } from "lucide-react";
import { clearAll, exportAll, importAll } from "../lib/store";
import { SectionHeader } from "./section-header";

/**
 * Manual device sync. The site is static, so progress never leaves this
 * browser — this card is the only way to move it to another machine.
 */
export function BackupCard() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(
    null,
  );

  const onExport = () => {
    const blob = new Blob([JSON.stringify(exportAll(), null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mva-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMsg({ kind: "ok", text: "Exported. Keep the file with your notes." });
  };

  const onImport = async (file: File) => {
    const err = importAll(await file.text());
    if (err) setMsg({ kind: "err", text: err });
    else setMsg({ kind: "ok", text: "Imported. This browser now matches the file." });
  };

  const onReset = () => {
    if (!window.confirm("Erase all progress in this browser? This cannot be undone."))
      return;
    clearAll();
    setMsg({ kind: "ok", text: "Cleared. Everything is back to zero." });
  };

  return (
    <section className="rise py-6" style={{ animationDelay: "240ms" }}>
      <SectionHeader label="backup / sync" />
      <div className="card p-4">
        <p className="max-w-[70ch] text-[12.5px] leading-[1.6] text-muted">
          Your ticks, logged hours and availability grids are stored in{" "}
          <span className="text-fg">this browser only</span> — no account, no
          server, nothing to go down. That also means nothing syncs on its own:
          to move state between your desktop and laptop, export here and import
          there.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onExport}
            className="mono flex items-center gap-1.5 border border-line-strong px-3 py-1.5 text-[11px] text-fg transition-colors duration-150 hover:border-accent hover:text-accent"
          >
            <Download size={12} /> export json
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mono flex items-center gap-1.5 border border-line-strong px-3 py-1.5 text-[11px] text-fg transition-colors duration-150 hover:border-accent hover:text-accent"
          >
            <Upload size={12} /> import json
          </button>
          <button
            type="button"
            onClick={onReset}
            className="mono flex items-center gap-1.5 border border-line px-3 py-1.5 text-[11px] text-faint transition-colors duration-150 hover:border-danger hover:text-danger"
          >
            <RotateCcw size={12} /> reset
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            aria-label="Import a progress backup file"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void onImport(f);
              e.target.value = "";
            }}
          />
        </div>
        {msg ? (
          <p
            className={`mono mt-3 text-[11px] ${
              msg.kind === "ok" ? "text-accent" : "text-danger"
            }`}
          >
            {msg.text}
          </p>
        ) : null}
      </div>
    </section>
  );
}
