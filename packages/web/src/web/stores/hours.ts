import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { KEY_HOURS, readKey, subscribeKey, writeKey } from "../lib/store";

export interface HoursRow {
  id: string;
  week: number;
  track: string;
  hours: number;
}

/** Logged hours live in this browser's localStorage — see `lib/store.ts`. */
const hoursKey = ["local", "hours"] as const;

function isRow(v: unknown): v is HoursRow {
  if (typeof v !== "object" || v === null) return false;
  const r = v as Partial<HoursRow>;
  return (
    typeof r.id === "string" &&
    typeof r.week === "number" &&
    typeof r.track === "string" &&
    typeof r.hours === "number"
  );
}

function readRows(): HoursRow[] {
  const raw = readKey<unknown>(KEY_HOURS, []);
  if (!Array.isArray(raw)) return [];
  return raw.filter(isRow);
}

export function useHours() {
  const queryClient = useQueryClient();
  useEffect(
    () =>
      subscribeKey(KEY_HOURS, () => {
        queryClient.invalidateQueries({ queryKey: hoursKey });
      }),
    [queryClient],
  );
  return useQuery({
    queryKey: hoursKey,
    queryFn: readRows,
    staleTime: 30_000,
  });
}

export function useSetHours() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      week,
      track,
      hours,
    }: {
      week: number;
      track: string;
      hours: number;
    }) => {
      const id = `${week}-${track}`;
      const next = readRows().filter((r) => r.id !== id);
      next.push({ id, week, track, hours });
      writeKey(KEY_HOURS, next);
      return Promise.resolve(next);
    },
    onMutate: ({ week, track, hours }) => {
      const id = `${week}-${track}`;
      queryClient.setQueryData<HoursRow[]>(hoursKey, (old) => {
        const next = (old ?? []).filter((r) => r.id !== id);
        next.push({ id, week, track, hours });
        return next;
      });
    },
    onSuccess: (next) => queryClient.setQueryData<HoursRow[]>(hoursKey, next),
  });
}
