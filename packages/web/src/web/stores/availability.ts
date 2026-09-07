import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { KEY_AVAILABILITY, readKey, subscribeKey, writeKey } from "../lib/store";

export interface AvailabilityRow {
  week: number;
  cells: string;
  targetHours: number;
}

/** Availability grids live in this browser's localStorage — see `lib/store.ts`. */
const availabilityKey = ["local", "availability"] as const;

function isRow(v: unknown): v is AvailabilityRow {
  if (typeof v !== "object" || v === null) return false;
  const r = v as Partial<AvailabilityRow>;
  return (
    typeof r.week === "number" &&
    typeof r.cells === "string" &&
    typeof r.targetHours === "number"
  );
}

function readRows(): AvailabilityRow[] {
  const raw = readKey<unknown>(KEY_AVAILABILITY, []);
  if (!Array.isArray(raw)) return [];
  return raw.filter(isRow);
}

export function useAvailability() {
  const queryClient = useQueryClient();
  useEffect(
    () =>
      subscribeKey(KEY_AVAILABILITY, () => {
        queryClient.invalidateQueries({ queryKey: availabilityKey });
      }),
    [queryClient],
  );
  return useQuery({
    queryKey: availabilityKey,
    queryFn: readRows,
    staleTime: 30_000,
  });
}

export function useSetAvailability() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      week,
      cells,
      targetHours,
    }: {
      week: number;
      cells: string;
      targetHours: number;
    }) => {
      const next = readRows().filter((r) => r.week !== week);
      next.push({ week, cells, targetHours });
      writeKey(KEY_AVAILABILITY, next);
      return Promise.resolve(next);
    },
    onMutate: ({ week, cells, targetHours }) => {
      queryClient.setQueryData<AvailabilityRow[]>(availabilityKey, (old) => {
        const next = (old ?? []).filter((r) => r.week !== week);
        next.push({ week, cells, targetHours });
        return next;
      });
    },
    onSuccess: (next) =>
      queryClient.setQueryData<AvailabilityRow[]>(availabilityKey, next),
  });
}
