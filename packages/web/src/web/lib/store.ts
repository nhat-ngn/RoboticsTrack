/**
 * Local persistence layer.
 *
 * This app used to keep progress in Turso via the oRPC API. It now runs as a
 * fully static build (GitHub Pages), so there is no server to talk to: every
 * tick, logged hour and availability grid lives in this browser's
 * localStorage. The API routes under `src/api/routes/` are still wired up and
 * still work in dev — they are simply no longer the source of truth.
 *
 * Everything here is defensive on purpose: a corrupt or oversized store must
 * degrade to "empty", never crash the page.
 */

const NS = "mva:";

export const KEY_PROGRESS = `${NS}progress`;
export const KEY_HOURS = `${NS}hours`;
export const KEY_AVAILABILITY = `${NS}availability`;

export const STORE_KEYS = [KEY_PROGRESS, KEY_HOURS, KEY_AVAILABILITY] as const;

type Listener = () => void;

const listeners = new Map<string, Set<Listener>>();

function hasStorage(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

/** Read + parse a key, falling back to `fallback` on anything unexpected. */
export function readKey<T>(key: string, fallback: T): T {
  if (!hasStorage()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw) as unknown;
    if (parsed === null || parsed === undefined) return fallback;
    return parsed as T;
  } catch {
    return fallback;
  }
}

/** Write a key and notify subscribers. Silently no-ops if storage is full. */
export function writeKey(key: string, value: unknown): void {
  if (hasStorage()) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Quota exceeded or storage disabled — keep the in-memory state and move on.
    }
  }
  emit(key);
}

export function removeKey(key: string): void {
  if (hasStorage()) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
  emit(key);
}

function emit(key: string): void {
  for (const fn of listeners.get(key) ?? []) fn();
}

/** Subscribe to changes of one key, including writes from other tabs. */
export function subscribeKey(key: string, fn: Listener): () => void {
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  set.add(fn);

  const onStorage = (e: StorageEvent) => {
    if (e.key === null || e.key === key) fn();
  };
  if (typeof window !== "undefined")
    window.addEventListener("storage", onStorage);

  return () => {
    set?.delete(fn);
    if (typeof window !== "undefined")
      window.removeEventListener("storage", onStorage);
  };
}

/* ---------------------------------------------------------------- backup --- */

export interface BackupFile {
  app: "mva-roadmap";
  version: 1;
  exportedAt: string;
  data: Record<string, unknown>;
}

/** Everything this browser knows, as a JSON blob for manual device sync. */
export function exportAll(): BackupFile {
  const data: Record<string, unknown> = {};
  for (const key of STORE_KEYS) data[key] = readKey<unknown>(key, null);
  return {
    app: "mva-roadmap",
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
  };
}

/**
 * Replace local state from a backup file. Returns an error string when the
 * file is not a recognisable export, so the caller can tell the user why.
 */
export function importAll(text: string): string | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return "That file is not valid JSON.";
  }
  if (typeof parsed !== "object" || parsed === null)
    return "That file is not an MVA roadmap backup.";
  const file = parsed as Partial<BackupFile>;
  if (file.app !== "mva-roadmap" || typeof file.data !== "object" || !file.data)
    return "That file is not an MVA roadmap backup.";

  for (const key of STORE_KEYS) {
    const value = (file.data as Record<string, unknown>)[key];
    if (value === null || value === undefined) removeKey(key);
    else writeKey(key, value);
  }
  return null;
}

/** Wipe all app state in this browser. */
export function clearAll(): void {
  for (const key of STORE_KEYS) removeKey(key);
}
