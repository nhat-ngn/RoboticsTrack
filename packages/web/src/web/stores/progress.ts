import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { KEY_PROGRESS, readKey, subscribeKey, writeKey } from "../lib/store";

/**
 * Progress is stored in this browser's localStorage — see `lib/store.ts`.
 * The hook signatures are unchanged from the old server-backed version, so
 * pages and components do not care where the data lives.
 */
const progressKey = ["local", "progress"] as const;

function readIds(): string[] {
  const raw = readKey<unknown>(KEY_PROGRESS, []);
  if (!Array.isArray(raw)) return [];
  return raw.filter((v): v is string => typeof v === "string");
}

/** Re-read the store when another tab (or an import) changes it. */
function useProgressSync() {
  const queryClient = useQueryClient();
  useEffect(
    () =>
      subscribeKey(KEY_PROGRESS, () => {
        queryClient.invalidateQueries({ queryKey: progressKey });
      }),
    [queryClient],
  );
}

/** All ticked item ids, exposed as a Set for O(1) lookups in long checklists. */
export function useProgress() {
  useProgressSync();
  return useQuery({
    queryKey: progressKey,
    queryFn: readIds,
    staleTime: 30_000,
    select: (ids: string[]) => new Set(ids),
  });
}

export function useToggleItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, done }: { itemId: string; done: boolean }) => {
      const list = readIds();
      const next = done
        ? list.includes(itemId)
          ? list
          : [...list, itemId]
        : list.filter((id) => id !== itemId);
      writeKey(KEY_PROGRESS, next);
      return Promise.resolve(next);
    },
    onMutate: ({ itemId, done }) => {
      queryClient.setQueryData<string[]>(progressKey, (old) => {
        const list = old ?? [];
        if (done) return list.includes(itemId) ? list : [...list, itemId];
        return list.filter((id) => id !== itemId);
      });
    },
    onSuccess: (next) => queryClient.setQueryData<string[]>(progressKey, next),
  });
}

export function useBulkToggle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemIds, done }: { itemIds: string[]; done: boolean }) => {
      const list = readIds();
      let next: string[];
      if (done) next = Array.from(new Set([...list, ...itemIds]));
      else {
        const drop = new Set(itemIds);
        next = list.filter((id) => !drop.has(id));
      }
      writeKey(KEY_PROGRESS, next);
      return Promise.resolve(next);
    },
    onMutate: ({ itemIds, done }) => {
      queryClient.setQueryData<string[]>(progressKey, (old) => {
        const list = old ?? [];
        if (done) return Array.from(new Set([...list, ...itemIds]));
        const drop = new Set(itemIds);
        return list.filter((id) => !drop.has(id));
      });
    },
    onSuccess: (next) => queryClient.setQueryData<string[]>(progressKey, next),
  });
}
