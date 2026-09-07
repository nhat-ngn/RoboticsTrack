# MVA Track — Design

A single-user, dark, minimal web app that holds a 2-year (14 Sep 2026 → 14 Sep 2028) personalized
roadmap toward the M2 MVA (Mathématiques, Vision, Apprentissage): week-by-week plan, concept
checklists with prerequisite gates, a rated resource library, robotics project/budget pages, an
interview tracker, and persisted progress.

Visual direction: laboratory notebook meets terminal. Near-black canvas, hairline borders, dense but
airy typography, one acid accent used only for state (done / active / gate). No gradients, no
shadows, no rounded card soup.

## Brand & Colors

Web only (desktop/mobile not built). CSS variables in `packages/web/src/web/styles.css`.

| Token | Value | Use |
|-------|-------|-----|
| background | #08090A | Page canvas |
| surface | #0E1012 | Cards, panels |
| surface-2 | #141719 | Hover, inset rows |
| border | #1E2225 | Hairlines (1px) |
| border-strong | #2C3235 | Active/hover hairlines |
| foreground | #E9ECEF | Primary text |
| muted | #8A9299 | Secondary text |
| faint | #5C6469 | Tertiary / meta |
| accent | #C9F24E | Progress, checked state, active nav |
| accent-dim | rgba(201,242,78,0.14) | Accent fills |
| info | #7CC7FF | Links to external resources |
| warn | #FFB454 | Prerequisite gates |
| danger | #FF6B6B | Behind schedule |

Track hues (used sparingly, for track identity dots/bars only):
math `#B7A7FF`, cs `#7CC7FF`, ml `#5FE3B1`, robotics `#FF9D5C`.

## Typography

- Display: **Sora** (600/700) — page titles, week numbers, stats.
- Body: **Manrope** (400/500/600) — everything else.
- Mono: **JetBrains Mono** (400/500) — dates, hours, IDs, ratings.
- Loaded from Google Fonts in `styles.css`. Tight display tracking (-0.02em), body line-height 1.6.

## Layout

- Fixed top nav (56px) with logo mark + routes + global progress %.
- Content max-width 1180px, 24px gutters, 12-col mental grid.
- Cards: 1px border, no shadow, radius 10px, `surface` fill.
- Section headers: small-caps mono label + hairline rule spanning the row.
- Motion: staggered fade+rise on page load (CSS keyframes, 40ms steps), 120ms state transitions.

## Pages

- **Dashboard** (`pages/index.tsx`) — current week card, global + per-track progress, time budget vs
  logged hours, next milestones, phase strip.
- **Roadmap** (`pages/roadmap.tsx`) — 8 phases, 104 weeks, expandable week rows with checkboxes.
- **Track** (`pages/track.tsx`, `/track/:id`) — concept mastery list grouped by module, prerequisite
  gates flagged, per-track resources.
- **Resources** (`pages/resources.tsx`) — rated library, filter by track/type.
- **Robotics** (`pages/robotics.tsx`) — 7 builds, BOM tables, €10k budget allocation.
- **MVA** (`pages/mva.tsx`) — MVA course map + admission strategy timeline.
- **Interview** (`pages/interview.tsx`) — coding/system-design milestone tracker.

## Data

- Content is static TypeScript in `src/web/content/` (weeks, concepts, resources, robotics, mva,
  interview) — no CMS, no DB reads for content.
- DB stores only state: `progress(item_id, done, updated_at)` and `hours(week, track, hours)`.
- API: `progress.list/toggle/bulkToggle`, `hours.list/set` (oRPC), no auth — single shared profile.
