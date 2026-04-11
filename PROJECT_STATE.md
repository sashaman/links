# Project State: Termlink + FS25 Explorer

## Current Product State

- Main site is Astro + Tailwind on GitHub Pages at `https://sashaman.github.io/links/`.
- Branding in UI/meta is **Termlink**.
- Homepage (`src/pages/index.astro`) supports category-based terminal navigation with per-category behaviors/timing.
- FS25 explorer (`public/fs25_animalic_food.html`) is a full interactive app (XML parsing + visualizer + calculator modes).
- FS25 **animalFood builder** (`public/fs25_animalic_food_builder.html`) is a separate **authoring** page: documented fields, form-based editing, validation hints, download/copy of `animalicFood.xml`. Module description and progress: **[FS25_ANIMALIC_FOOD_BUILDER.md](FS25_ANIMALIC_FOOD_BUILDER.md)**.

## Deployment + Preview Status

- GitHub Pages must use **GitHub Actions** as source.
- Both pages have independent social cards:
  - `/links/` -> `public/img/termlink-og.png` via `Layout.astro`.
  - `/links/fs25_animalic_food.html` -> `public/og-animal-food-explorer.png` via in-file OG tags.
  - `/links/fs25_animalic_food_builder.html` -> `public/og-animal-food-builder.png` via in-file OG tags.

## Checkpoint: 2026-04-11 — FS25 `fs25_animalic_food_builder.html`

- New **authoring** page with field documentation, PARALLEL/SERIAL XML rules, mixtures/recipes editors, weight-sum warnings, download/copy, sample load from `public/samples/animalicFood.xml`.
- Explorer links to builder (DE/EN/FR). Module write-up: `FS25_ANIMALIC_FOOD_BUILDER.md`.
- **UX / visual (same day)**: Builder cards and food-group rows echo explorer tokens (accent bars, table-style rows, pills). **Sticky** headers stay on **per animal / mixture / recipe** blocks (species + “Food groups” / ingredients cap) so long lists stay oriented; **section** titles (Animals, Mixtures, Recipes) are **static** `.panel-section-head` dividers so they do not stack and overlap stickies at `top: 0`.

## Checkpoint: 2026-04-10 — FS25 `fs25_animalic_food.html`

Stable handoff state for the standalone explorer (animals UI, samples, no misleading SERIAL math).

- **PARALLEL** animals: top stack bar (shares of production mix), aligned **narrow** tint bands on food-group rows (`fg-row--parallel`, 7% mix), eat % + totals + warn if weights ≠ 1.0.
- **SERIAL** animals: **no** top stack bar; each food group uses **left-aligned** tint whose **width** = `productionWeight / max(productionWeight)` in that animal; **opacity** of tint scales with the same norm (stronger than parallel). Footer explains SERIAL semantics (no eatWeight; not a 100% total).
- **Animal card grid**: container query on `.main-panel--animals` — from ~520px panel width, **two columns** with **1.14fr / 0.86fr** (alternating wide/narrow tracks).
- **Samples**: fetch `public/samples/*.xml` when served over HTTP; **embedded fallbacks** for **animalic**, **vanilla**, **Mittellandkanal**, **Harterleiten** (same content as repo samples). Embed path uses normal **ok** status (no yellow “could not fetch” warning). Regenerate map embeds: `node scripts/inject-embed-samples.mjs`.
- **Reverted**: page-level 1/2/3 column control for main panels (restored classic layout: full-width animals, `grid-two` mixtures|recipes ≥920px, full-width calculator).

## FS25 Explorer: Implemented Capabilities

- File handling:
  - upload + drag/drop `animalicFood.xml`
  - sample XML auto-load (four named samples + embed fallbacks)
  - DE/EN/FR runtime language switch
- Data rendering:
  - animals, food groups, mixtures, recipes
  - PARALLEL: stacked bars + percentage labels; SERIAL: weight-based row fills only
  - filltype chips/icons and stronger table styling
- Calculator architecture:
  - Recipe-driven (not mixture-driven) for mixer-wagon logic
  - **Two separated modes**:
    - **Bulk goods**: combined colored segmented slider rail, draggable boundaries, per-filltype input, lock/unlock support
    - **Bales**: token-based interaction with per-size counts
  - Target + recipe constraints integrated throughout

## Bale Calculator (Current UX/Logic)

- Starts empty (no bales prefilled).
- Ingredient rows are grouped by **Round** and **Square** bale classes (with fallback Other).
- Bale interactions:
  - left click token = add bale
  - right click token = remove bale
  - mixed bale sizes allowed simultaneously for one ingredient
- Validation:
  - disables bale additions that would make valid target recipe unreachable
  - top status validator is shown in bales mode (prominent pills + issues + gap suggestions)

## Bulk Calculator (Current UX/Logic)

- Combined slider rail with colored segments per filltype.
- Draggable boundary handles rebalance neighboring sets under min/max constraints.
- Per-filltype lock (snapshot-based) to pin exact values.
- Status panel intentionally hidden in bulk mode (bulk path is constrained by design).

## Known Remaining Polish

- Minor slider UX edge cases may still exist in rare interactions.
- Bale visual design can still be polished further (spacing/icon refinement).

## Important Files

- `public/fs25_animalic_food.html` - primary active work area (explorer + calculators).
- `public/fs25_animalic_food_builder.html` - guided XML authoring for `animalicFood.xml` / `animalFood`.
- `FS25_ANIMALIC_FOOD_BUILDER.md` - module purpose, file map, deployment, progress log for the builder.
- `public/samples/animalicFood.xml`, `animalFood-vanilla.xml`, `animalFood-mittellandkanal.xml`, `animalFood-harterleiten.xml` - must stay in sync with embedded copies in the HTML when those samples change.
- `scripts/inject-embed-samples.mjs` - refreshes Mittelland/Harterleiten embedded XML in the HTML from `public/samples/`.
- `src/layouts/Layout.astro` - global metadata/OG behavior.
- `src/pages/index.astro` - homepage terminal/category behavior.
- `astro.config.mjs` - `site` + `base: '/links'`.
- `DEVELOPMENT_WORKFLOW.md` - suggested ongoing development order (polish, regression matrix, refactor, a11y).
