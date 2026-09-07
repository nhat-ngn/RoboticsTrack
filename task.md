# MVA Roadmap — build scratchpad

App: /home/user/mva-roadmap · web port 4200 (fixed in __ports.cjs)

## Done
- [x] design.md (dark "lab notebook meets terminal", locked)
- [x] styles.css rewritten — tokens: bg/surface/surface2/line/line-strong/fg/muted/faint/accent/info/warn/danger + math/cs/ml/robotics hues. Fonts Sora/Manrope/JetBrains Mono. Utilities: .card .label .mono .hairline .rise .grain
- [x] content/: types, resources (80), raw, weeks-p1/p2/p3, weeks (105), tracks, mva (20), interview (8), robotics (7 projects, €9757), concepts (248)
- [x] content/index.ts (composition only)
- [x] Sanity script PASSES: 105 weeks, 551 tasks, 248 concepts, 80 res, 53 milestones, 74 task gates, 146 concept gates. All @res ids resolve. kinds: 69 core/16 break/20 summer
- [x] db schema: progress(item_id pk, done, updated_at), hours(id pk "week-track", week, track, hours, updated_at) — db:push applied
- [x] api routes: progress.ts (list/toggle/bulkToggle), hours.ts (list/set); composed in src/api/index.ts
- [x] queries/progress.ts (useProgress -> Set, useToggleItem, useBulkToggle, optimistic), queries/hours.ts (useHours, useSetHours, optimistic)

- [x] lib/track.ts (TRACK_COLOR/ORDER/SHORT, pct, fmtDate, fmtRange)
- [x] hooks/use-plan-progress.ts (overall/byTrack/phasePct/weekPct/countOf/toggle/toggleMany)
- [x] components/: section-header, progress-ring, track-bar, check-row, resource-card, week-card, hours-panel, nav, layout(+PageHead)
- [x] pages/index.tsx (dashboard), pages/roadmap.tsx

- [x] pages/track.tsx (/track/:id — concept checklists by module), resources.tsx, robotics.tsx, mva.tsx, interview.tsx
- [x] app.tsx routes (AgentFeedback + RunableBadge preserved)
- [x] lint 0/0 · typecheck 3/3 · build green
- [x] Visual QA: all 7 routes screenshotted at 1400x1100 + mobile 430px. Console clean (no errors/warnings).
- [x] Interaction verified live: tick task -> persists to DB -> survives reload (3/860, Math 2/212, week 3/8). Hours input commits on blur -> row "1-math" = 6.5, 0.5 rounding correct. All test data reset to empty.

## Planner (/planner) — weekly availability + DP packing
- [x] lib/scheduler.ts — pure core: 238-cell grid (7d x 34 half-hours, 06:00-23:00), blocksFromCells, buildBacklog, packBlock (exact 0/1 knapsack), buildSchedule, DP_NOTE
- [x] availability table (week PK, cells, targetHours) + routes/availability.ts (list/set upsert) + queries/availability.ts + db:push applied
- [x] components/availability-grid.tsx — click OR drag to paint, track-tinted overlay of the computed schedule
- [x] pages/planner.tsx — week nav, target hours, stats, per-track bars vs plannedHours, grid, day-by-day schedule, leftover list, DP write-up. Debounced autosave (700ms).
- [x] scripts/scheduler.test.ts — 34 checks incl. packBlock vs brute-force subset enumeration on 300 random instances. Run: `bun run scripts/scheduler.test.ts`
- [x] scripts/reset-test-data.ts — wipes progress/availability/hours after QA
- [x] Verified live: paint persists (Mon 10:00 -> DB -> survives reload), tick from planner writes plain task id `w1-cs-1` (NOT a session id), all test data reset to zero

### Bugs found and fixed during planner QA
1. **app.tsx rendered `<Route component={PlannerPage}>` with no import** — undefined identifier at the top of the tree blanked EVERY route, not just /planner. Whole app was down.
2. **`availability` imported in api/index.ts but never added to the router** — every planner save would have 404'd.
3. **Tasks were unsplittable 3.5-4h blobs vs 3h weeknight blocks** — nothing fit on weeknights: 44% utilisation, ml+rob got 0h. Fixed with CHUNK_MAX=4 units (2h) sessions -> 88%.
4. **Track starvation**: value is ~proportional to duration so most packings tie, and ties resolved toward plan order (math, cs, ml, rob) — robotics got a flat 0h every week. Fixed with per-track quota re-weighting between blocks (full value -> 0.2x once quota spent).
5. **Both sessions of one task landing in the same block** rendered as a duplicated line; **sessions numbered out of order** (Mon "2/2", Fri "1/2"). Fixed by tidySessions() post-pass: merge within a block, renumber chronologically.
- Result: 34h free -> 30h scheduled (88%), math 8/7 · cs 12/12 · ml 4/4 · rob 6/12

## Next
- [ ] Open question for user: hosting option A (static + localStorage on GH Pages, recommended) / B (static + hosted API) / C (deploy whole stack) — not yet chosen
- [ ] Optional polish if user asks: dashboard hero density, /roadmap expanded-phase scroll weight (up to 18 week cards), loading state while useProgress fetches (progress.ready exists, currently unused)
- [ ] Robotics lands at 6h vs its 12h budget — the week only has 34 free hours against a 35h plan, so something has to give. Revisit if the user's real timetable frees more weekend time.

## QA notes / tooling gotchas
- CheckRow checkbox is `button[aria-pressed]`, NOT input[type=checkbox]
- HoursPanel commits on onBlur only — synthetic input events do nothing unless the element is really focused; use mb click + mb type
- `mb shot --width` resizes ONLY for the screenshot; the live viewport stays desktop, so clicks after a mobile shot land on desktop coords
- `mb logs` streams forever — always wrap: `timeout 6 mb logs`
- rpc curl: `-d '{"json":null}'` with plain single quotes (no backslash escaping)

## Rules to not forget
- Task ids `w{n}-{track}-{i}` are DB keys — never renumber
- planStarted() false until 2026-09-14 → dashboard must say "starts in X days", not fake week 1
- No shadows/gradients/rounded-card soup. Accent only for state.
- index.ts = composition only. Assets only in packages/web/public/.

## Static / GitHub Pages conversion (option A, user's choice)
- [x] lib/store.ts — localStorage layer under `mva:` prefix, pub/sub + cross-tab `storage` events, defensive reads (corrupt JSON / quota / no-window all degrade to empty), exportAll/importAll/clearAll
- [x] queries/{progress,hours,availability}.ts REWRITTEN against the store and MOVED to stores/ — lint rule `web-query-files-build-on-typed-client` requires everything in queries/ to import the oRPC client, and these no longer talk to the API. Exported hook names + return shapes unchanged, so hours-panel / planner / use-plan-progress needed only an import path change.
- [x] vite base "./" (relative assets) + wouter `useHashLocation` in app.tsx — works at any repo name/subpath/file://, deep links never 404
- [x] components/backup-card.tsx on the dashboard — export/import/reset JSON for manual desktop<->laptop sync
- [x] API routes + drizzle schema KEPT, marked in-file as no longer the source of truth (still work under `bun run dev`; basis for future sync). Nothing deleted.
- [x] .github/workflows/deploy.yml — bun install, tsc, build:web, 404.html fallback, actions/deploy-pages
- [x] git init + initial commit (135 files; .env correctly ignored)
- [x] README §4 + §5 rewritten (were factually wrong: claimed server-side storage and offered 3 hosting options)

### Bugs / traps found during this conversion
6. **Dashboard lede still said "progress is saved server-side, so it follows you across devices"** — false after the switch. Fixed.
7. **`.gitignore` had `scripts/`, so `!scripts/scheduler.test.ts` could never match** — git does not descend into an excluded directory. Changed to `scripts/*` + negations; the test suite is now in the repo.
8. **Grid cells paint on `mousedown`, not `click`** — a synthetic `element.click()` silently does nothing. Availability QA must use real mouse events (`mb click x y`). Not an app bug, but it looks like one.

### Verified after conversion
- lint 0/0 · typecheck 3/3 · build green (795 kB) · scheduler tests 34/34 · sanity ALL PASS
- All 10 hash routes render (`/#/`, `/#/roadmap`, `/#/planner`, 3 track pages, robotics, resources, interview, mva)
- Tick a concept -> `mva:progress` = ["c-math-1-1"] -> survives reload (aria-pressed=true)
- Paint Mon 10:00 -> `mva:availability` cell[8]=1, 69 free cells -> survives reload
- Export/import round-trip: cleared storage, imported the file via the real file input, both stores restored + UI updated via the subscribe->invalidate path
- Bad file (`{"hello":1}`) rejected with a message, existing state left intact
- dist/index.html emits `./assets/...` (relative), confirming base "./"
