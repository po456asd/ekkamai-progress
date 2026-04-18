# The Quarter Hotel Ekkamai — Progress Dashboard

**Purpose:** Single-file HTML construction progress dashboard for a hotel project in Ekkamai, Bangkok. Updated weekly by the user (construction consultant) with Claude's help.

---

## Project Location & Deployment

- **Working file (only source of truth):** `C:\Users\White\OneDrive - CMP MANAGEMENT ASIA CO LTD\Team 1 - Documents\White\3.Ekamai Project\WeeklyUpdate\index.html`
- **Git repo:** `https://github.com/po456asd/ekkamai-progress.git` (branch: `main`)
- **Live site:** `https://po456asd.github.io/ekkamai-progress/` (GitHub Pages)
- **Deploy workflow:** Edit `index.html` → `git add` → `git commit` → `git push`. Changes live within ~1 min. User hard-refreshes with **Ctrl+Shift+R** to bust cache.

---

## Tech Stack

- **Single HTML file** — vanilla JS + CSS, no build step, no framework.
- **Chart.js 4.4.1** via CDN for visualizations.
- **Dark gold luxury theme:** CSS custom properties — `--gold`, `--bg`, `--card`, `--border`, `--muted`, etc.
- **Mobile responsive:** media queries at 1100px, 760px.

---

## Buildings & Floors

Two buildings, each with the same floor structure:

- **Building A** (`DATA.A`) and **Building B** (`DATA.B`)
- Floors (top → bottom): `R` (Roof), `8`, `7`, `6`, `5`, `4`, `3`, `2`, `1`, `B` (Basement)
- Roof floor (`R`) has `isRoof: true`; basement has `isBasement: true`.

---

## Progress Tracking Data Model

Each floor object contains these **numeric percentage fields** (0–100):

### Structure (3 sub-categories — averaged)
- `flooring` — พื้น (floor slabs)
- `walls` — เสา/ผนัง (columns/walls)
- `stairs` — บันไดทางหนีไฟ (Fire Exit Stairwell)
- **Computed:** `strVal = round((flooring + walls + stairs) / 3)`

### Architecture
- `arc` — Walls / Finishes
- `skim` — Skim Coating (moved from Interior → Architecture)

### Interior (Furniture/FF&E only — skim coating is NOT here anymore)
- `int` — Furniture / FF&E

### MEP (4 sub-categories — averaged)
- `elec_done`, `elec_test` — Electrical
- `hvac_done`, `hvac_test` — HVAC
- `water_done`, `water_test` — Water / Plumbing
- `fire_done`, `fire_test` — Fire Protection (added to MEP)
- **Computed:** `mep(f) = round((elec_done + hvac_done + water_done + fire_done) / 4)`
- **Computed:** `mepTest(f) = round((elec_test + hvac_test + water_test + fire_test) / 4)`

### Overall
- `overallFloor(f) = round((strVal + arc + int + mep(f)) / 4)`

### Metadata
- `label` — e.g. `"Floor 3"`, `"Roof Floor"`, `"Basement"`
- `spaces` — array of room/zone names
- `isRoof`, `isBasement` — booleans

---

## Current Progress Baselines (as of 2026-04-18)

- **All floors except Roof:** `flooring: 100`, `walls: 100`, `stairs: 0`
- **Roof Floor:** `flooring: 100`, `walls: 0`, `stairs: 0`
- **Fire Exit Stairwell (stairs):** 0% all floors — not started
- **Skim coating (skim):** 0% everywhere — not started
- **Fire Protection (fire_done/fire_test):** 0% — not started
- **Most active floors:** Bldg A FL2 (electrical 75%), Bldg B FL2 (elec 82%, int 20%), Bldg B FL3 (water 85% tested)

---

## Key Functions (in `index.html`)

| Function | Line (approx) | Purpose |
|----------|---------------|---------|
| `mep(f)` / `mepTest(f)` | 1330 | Average MEP done/tested % |
| `overallFloor(f)` | 1333 | Overall floor % (structure + arc + int + mep) / 4 |
| `buildingAvg(bld, key)` | 1338 | Building-wide average; handles `'str'`/`'mep'`/`'mep_test'` specially |
| `buildMasterCalendar(mats)` | 1573 | Builds unified master delivery calendar |
| `renderMaterials()` | 1668 | Materials tab — filter bar + master calendar + cards |
| `renderFloorDetail(fk)` | 2037 | Per-floor detail panel with pbars + mep-chip sub-categories |

---

## UI Sections

1. **Header / Navigation tabs** — Overview / Building A / Building B / Materials / Notes
2. **KPI Cards** — Structure / Architecture / Interior / MEP (whole-project % averages)
3. **Floor Matrix Table** — rows = floors, cols = Str / Arc / Int / MEP / Overall (colored bars)
4. **Floor Detail Panel** (click a floor row) — per-category **pbars** with **`mep-chip` sub-category boxes** underneath showing each component's %
5. **Weekly Notes** (data-driven) — `thisWeek`, `lastWeek`, `issues`, `backlog`, `cutoff` date
6. **Master Delivery Calendar** — all 18 suppliers' dates on one calendar, filterable by category, count badge per day, today highlighted green, Sundays red, each month has a border
7. **Material Cards** — 18 suppliers, grouped by category, with delivery timelines (no per-card calendar — replaced by master calendar)

---

## Material Delivery Schedule (18 suppliers)

Stored in `const MATERIALS` (line 1129). Each entry:
```js
{ name, category, supplier, contact, tel, dates: [{ date: "YYYY-MM-DD", qty, note }] }
```

### Current supplier list
| # | Material | Supplier | Category | Key dates (2026) |
|---|----------|----------|----------|------------------|
| 1 | Door Fittings | **Majextic Home Thanawat** (K. Yotchai) | Architecture | May 10, May 30, Jun 1 *(3 rounds — Apr 20 removed)* |
| 2 | Generator Set | CYT (K. Phai) | MEP | May 15 |
| 3 | MDB & EMDB | KT (K. Shetsak) | MEP | May 1 *(may change)* |
| 4 | DB Panel | KT | MEP | May 1 *(may change)* |
| 5 | Consumer Unit | KT | MEP | May 1 *(may change)* |
| 6 | Switch & Outlet | Marvel (K. Neuy) | MEP | Apr 28, May 15, May 23 |
| 7 | RCU & Keycard | Master Control (K. Lin) | MEP | Apr 29, May 15 |
| 8 | Light Fixture | Sahasawat (K. Nee) | MEP | *already in system* |
| 9 | Central Battery & Emergency Downlight | Sahasawat | MEP | Apr 7, Apr 28, May 23 |
| 10 | Emergency & Exit Light | Sahasawat | MEP | Apr 7, Apr 28, May 23 |
| 11 | Computer & Server Network | Phatshat (K. Phat) | MEP | Apr 7, Apr 28, May 23 |
| 12 | WiFi + Digital TV | Phatshat | MEP | (no dates) |
| 13 | CCTV | By Owner (K. Tum) | MEP | (no dates) |
| 14 | Hot Water Pump | Heismann (K. Thatyawutt) | MEP | May 20 |
| 15 | Hot Water Tank | Heismann | MEP | May 20 |
| 16 | Hot Water Return Pump | Heismann | MEP | May 20 |
| 17 | Swimming Pool | Nara (K. Suphaporn) | MEP | (no dates) |
| 18 | Kitchen Equipment | SD Stainless (K. Shinnawattra) | Interior | (no dates) |

### Date conventions
- All dates in **ISO Common Era** (`YYYY-MM-DD`, Gregorian). User sometimes provides Thai Buddhist year (2569) — **convert to CE (2026)** before saving.
- Phone format: `0X-XXX-XXXX` with dashes.

---

## Weekly Notes Structure

Stored in `const NOTES` object. Updated each week by user. Shape:
```js
{
  cutoff: "2026-04-14",                 // "as of" date
  thisWeek: [ "...", "..." ],            // bullet list of this week's progress
  lastWeek: [ "...", "..." ],            // prev week's (previous thisWeek)
  issues:   [ "..." ],                   // unresolved problems
  backlog:  [ { since: "YYYY-MM-DD", item: "..." } ]  // long-standing issues
}
```

**Weekly update flow:** move current `thisWeek` → `lastWeek`, write new `thisWeek`, update `cutoff`, add/remove `issues` and `backlog` as needed.

---

## Major Architectural Decisions (chronological)

1. **Initial build** — single-file HTML dashboard, GitHub Pages hosting.
2. **Materials tab** — 17 suppliers with individual mini-calendars per card.
3. **Unified Master Delivery Calendar** — replaced per-card calendars with one filterable master calendar showing count badges per day. Filter bar dynamically regenerates calendar + cards.
4. **Today's date highlight** — green background on current day.
5. **Click-day popup** — clicking a calendar day shows all suppliers delivering that day.
6. **Month borders** — each month in the master calendar now wrapped in a bordered box.
7. **Structure split into 3 sub-categories** — flooring / walls / stairs (was single `str` field). Fire Exit Stairwell added at 0%.
8. **Fire Protection added as 4th MEP category** — was 3 (elec/hvac/water), now 4 (+ fire).
9. **Skim coating moved** Interior → Architecture. Interior = Furniture/FF&E only.
10. **Sub-category chip boxes** under every main category pbar (same style as existing `mep-chip`) — shows per-sub-category % breakdown.
11. **Door Fittings supplier** — Placeholder → Majextic Home Thanawat (K. Yotchai, 02-721-4194-5). Apr 20 date removed; 3 rounds remain.

---

## CSS Patterns / Conventions

- Main container: `.card` with `border-radius: 14px`, `var(--border)` border, `var(--card)` background.
- Progress bars: `.pbar-item` (wrapper) → `.pbar-row` (label + %) → `.pbar-track` + `.pbar-fill` (animated width). Fill uses `data-w` attribute + JS to animate from 0%.
- Sub-category chips: `.mep-sub` (flex container) → `.mep-chip` (`.mc-label` + `.mc-val` + optional `.mc-tested`). Used under Structure, Architecture, Interior, MEP pbars.
- Calendar: `.cal-strip` (wrapper) → `.cal-month` (with border) → `.cal-grid` → `.cal-day` (individual day cell). Delivery days get `.has-delivery` class + optional `.mat-mc-count` badge.
- Matrix table: colored bar cells via `matBar(val, key)` helper returns `<div class="mat-bar ...">`.

---

## Common Pitfalls

1. **Always read `index.html` first** — it's large (>2200 lines). Use `Grep` to locate edits, never scan from top.
2. **Hard refresh after push** — `Ctrl+Shift+R` to bust GitHub Pages cache.
3. **Variable scope** — `strVal`, `mepVal`, `mepTestVal` are computed **twice**: once in `renderFloorDetail()` (line ~2041) and once inside the **matrix tbody map** (line ~2204). Both places must be updated together when data model changes.
4. **Thai Buddhist year** — user sometimes writes 2569, means 2026 CE. Always confirm.
5. **"may change" dates** — user accepts them as-is; don't skip placeholder dates.
6. **Phone formatting** — normalize to `0X-XXX-XXXX` with dashes.
7. **Commits** — user wants meaningful commit messages describing the "why"; always push after commit.
8. **CLAUDE.md (this file)** — summary for context restoration in fresh chats. Keep it up to date after major decisions.

---

## How to Resume Work in a Fresh Chat

1. User uploads this file → Claude reads it top-to-bottom.
2. User describes the next change.
3. Claude uses `Grep` to locate the relevant line(s) in `index.html`.
4. Claude uses `Read` on a narrow range → `Edit` or `Write` → `git add && git commit && git push`.
5. User hard-refreshes the GitHub Pages URL and verifies.
