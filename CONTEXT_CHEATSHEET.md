# Context Cheatsheet (Fast Rehydrate)

## Repo + Deploy

- Repo: `K:/_github/links`
- Live: `https://sashaman.github.io/links/`
- Deploy path: GitHub Actions builds `dist/`
- Must keep Pages source on **GitHub Actions** (not branch/Jekyll mode)

## Key Files

- `src/pages/index.astro` -> terminal homepage + category logic
- `src/layouts/Layout.astro` -> global meta/OG/twitter handling
- `public/fs25_animalic_food.html` -> standalone FS25 explorer app
- `public/fs25_animalic_food_builder.html` -> guided `animalicFood.xml` authoring (see **FS25_ANIMALIC_FOOD_BUILDER.md**)
- `public/preview.png` -> OG image for FS25 page
- `public/img/termlink-og.png` -> OG image for homepage
- `astro.config.mjs` -> `site` + `base: '/links'`
- `DEVELOPMENT_WORKFLOW.md` -> suggested next steps (polish, tests, refactor, a11y)

## Development workflow (summary)

See **[DEVELOPMENT_WORKFLOW.md](DEVELOPMENT_WORKFLOW.md)** for the full suggested order: small UI passes, scenario matrix, split calculator logic, import/export state, then design + a11y sweep.

## Homepage Feature Snapshot

- Supports direct link rows and category rows.
- Category supports per-item behavior:
  - `none`, `swap`, `accordion`, `both`
- Category has per-item timing profile:
  - `snappy`, `balanced`, `dramatic`, `calm`
- Row click path = swap; chevron path = accordion.
- Animations include anti-flash prep classes and staggered row reveal.

## FS25 Explorer Feature Snapshot

- Upload + drag/drop parser for `animalicFood.xml`
- DE/EN/FR language switch + sample picker (**animalic**, **vanilla**, **Mittellandkanal**, **Harterleiten**); all four have **in-page embedded XML** if fetch fails (no scare warning — status stays **ok** with snapshot label)
- Renders animals / food groups / mixtures / recipes
- **PARALLEL** animals: top **stack bar** + narrow aligned row tints; **SERIAL**: **no** stack bar; row tint **width** = `productionWeight / max(weight)` for that animal (left-aligned)
- Tiere panel: **container query** → two-column animal cards with **1.14fr / 0.86fr** when panel ≥ ~520px
- Main layout: full-width animals; **mixtures | recipes** two-column from 920px; full-width calculator (no 1/2/3 column experiment)
- Includes dual calculators (recipe-based):
  - **Bulk goods mode**
  - **Bales mode**
- Re-sync map embeds after editing samples: `node scripts/inject-embed-samples.mjs`
- **Builder** (separate page): documented fields, form edit, validation hints, download/copy XML — module doc **FS25_ANIMALIC_FOOD_BUILDER.md**; **per-card sticky** headers for animals/mixtures/recipes; panel section titles are **static** dividers (no double-`top:0` overlap)

## Calculator Snapshot (Current)

- Core rule source: **recipes**, not mixtures.
- Shared inputs: recipe selection + target liters.

### Bulk goods mode

- Combined colored segmented slider rail.
- Draggable boundaries; constrained by recipe min/max.
- Per-filltype numeric input + lock/unlock button.
- Locked values use snapshot pinning (no drift expected).
- Status panel hidden intentionally in this mode.

### Bales mode

- Starts empty (no default bales).
- Left click token add / right click token remove.
- Mixed bale sizes allowed at same time for same ingredient.
- Round vs Square groups shown side-by-side.
- Tokens disabled when add would make valid target recipe unreachable.
- Prominent validator/status panel shown at top in this mode.

## Known Constraints

- Keep social previews functional:
  - no blocking robots meta for homepage
  - ensure absolute OG image URLs include `/links/` base.
- Keep standalone FS25 page in `public/` (not `src/pages/`) so direct html URL remains stable.

## Data Sources / Domain Notes

- Domain focus: `MIXERWAGON`.
- Base docs/schemas:
  - `K:/_repos/FS25sdk/xml/documentation/fillTypes.html`
  - `K:/_repos/FS25sdk/xml/documentation/bale.html`
  - `K:/_repos/FS25sdk/xml/schema/fillTypes.xsd`
  - `K:/_repos/FS25sdk/xml/schema/bale.xsd`
- Game defaults:
  - `J:/Games/Farming Simulator 25/data/maps/maps_fillTypes.xml`
  - `J:/Games/Farming Simulator 25/data/maps/maps_bales.xml`
- Runtime supports merging additional bale capacities from uploaded bale xml files.

## Current Outstanding Tasks

1. Bale selector visual polish (spacing/iconography simplification).
2. Minor bulk slider edge-case polish.
3. Optional SVG icon pass for bales.

## Quick Resume Prompt

"Resume from `CONTEXT_CHEATSHEET.md` + **PROJECT_STATE.md** (checkpoint **2026-04-10** explorer + **2026-04-11** builder). Explorer: default next focus **bale calculator** UX; bulk slider edge cases optional. Builder: **FS25_ANIMALIC_FOOD_BUILDER.md** + `public/fs25_animalic_food_builder.html` — sticky UX is **per card** only; section heads are `.panel-section-head` (not sticky). Keep `public/samples/*.xml` in sync with embedded map XML when changing Mittelland/Harterleiten (run `node scripts/inject-embed-samples.mjs`)."
