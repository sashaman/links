# Module: FS25 animalFood.xml Builder

Companion to the **Animal Food Explorer** (`public/fs25_animalic_food.html`). This module is a **standalone, documented form** that produces a valid `animalicFood.xml` (or any `animalFood`-shaped document) for FS25 modding.

## Purpose

- Explain **what each XML field does** (expandable help next to concepts).
- Let modders **edit animals, food groups, mixtures, and recipes** without hand-editing XML first.
- **Validate** common mistakes (parallel weight sums, mixture ingredient weights).
- **Export**: download as `animalicFood.xml`, copy to clipboard, or reload from the repo sample.

## Relationship to Other Parts of the Repo

| Piece | Role |
|--------|------|
| `public/fs25_animalic_food.html` | **Read-only analysis**: upload/sample, charts, DE/EN/FR, mixer calculators. |
| `public/fs25_animalic_food_builder.html` | **Authoring**: guided fields → generated XML. |
| `public/samples/animalicFood.xml` | Reference sample; builder fetches it on load and via “Load Animalic sample”. |

Cross-links: explorer shows a language-specific link to the builder (schema pill area); builder links back to the explorer.

## Technical Notes

- **Single static HTML file** (no build step): same palette/typography family as the explorer for visual consistency.
- **SERIAL** consumption: `eatWeight` is omitted on `<foodGroup>` in output (matches vanilla-style patterns).
- **PARALLEL** consumption: both `productionWeight` and `eatWeight` are written; UI warns if sums drift from ~1.0.
- **Schema URL**: dropdown for Giants `animalFood.xsd` versions (default FS25 1.17.0.0).
- **Offline / file://**: the default **FS25_Animalic** preset tries `fetch` first when served over HTTP, then falls back to an **embedded** copy of `public/samples/animalicFood.xml` (keep embed and file in sync when editing the sample). Other presets still require HTTP.

## Files

| Path | Responsibility |
|------|----------------|
| `public/fs25_animalic_food_builder.html` | Full UI, field help, XML generation, download/copy; embedded Animalic XML; fill-type selects with auto `$l10n_fillTypeGroup_*` / `$l10n_fillType_*` (see in-file `FILLTYPE_META`). |
| `public/fs25_animalic_food.html` | `builderLink` i18n strings + `<a id="builder-link">` in title meta. |

## Deployment

Served like any other `public/` asset on GitHub Pages, e.g.:

`https://sashaman.github.io/links/fs25_animalic_food_builder.html`

Open Graph / Twitter meta tags point at `https://sashaman.github.io/links/og-animal-food-builder.png` (same `public/` folder as the explorer’s `og-animal-food-explorer.png`; each HTML file uses its own image URL).

Requires HTTP(S) for sample fetch; local static server recommended during development.

## Progress Log

### 2026-04-11

- New page `fs25_animalic_food_builder.html` with sections: root/schema, animals + food groups, mixtures, recipes, output.
- Inline documentation via `<details>` blocks for major attributes and concepts (PARALLEL vs SERIAL, mixture vs recipe).
- Live XML preview, download `animalicFood.xml`, clipboard copy, clear.
- **Starting preset**: dropdown (Animalic, Vanilla, Mittellandkanal, Harterleiten repo samples + built-in minimal blank + built-in “one row per section”) and **Load preset** (confirms before replace; changing the dropdown alone does not overwrite the form).
- Built-in presets work offline; **Animalic** also works offline via embedded XML matching `samples/animalicFood.xml`. Other samples need HTTP(S). First load uses preset **Animalic**; if fetch fails, embedded Animalic is used (not the minimal starter).
- Explorer integration: localized builder link (DE/EN/FR).
- Module description and repo progress docs added (this file + `PROJECT_STATE.md` + `SESSION_LOG.md`).
- **Layout / sticky UX**: Cards use explorer-like grouping (accent bars, row chrome). Each **animal** (and mixture/recipe **editor-card**) keeps a **sticky** header band (title + key controls + “Food groups” / ingredients label) while scrolling that card’s rows. Major **panel** headings use a non-sticky `.panel-section-head` so they never compete with card stickies at the viewport top.

### Possible follow-ups (not committed)

- Localized OG `title`/`description` per UI language (optional; currently English in meta).
- Import existing XML into the form (parse + populate state) for round-tripping with the explorer.
- Align builder UI language with explorer (DE/EN/FR toggle) if usage justifies the extra strings.
