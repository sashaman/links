# Session Log: Termlink Project

## Session: 2026-04-11 — FS25 animalFood.xml builder

### Completed

1. **`public/fs25_animalic_food_builder.html`** — Standalone builder: expandable field documentation, animals/food groups (PARALLEL vs SERIAL output rules), mixtures, recipes, live XML, weight-sum warnings, download `animalicFood.xml`, copy, clear, load sample from `samples/animalicFood.xml` with offline fallback.
2. **`public/fs25_animalic_food.html`** — Localized link to the builder (DE/EN/FR) next to the schema pill; `builderLink` key in UI strings.
3. **`FS25_ANIMALIC_FOOD_BUILDER.md`** — Module/project description: purpose, relationship to explorer, technical notes, file list, deployment URL pattern, dated progress log and optional follow-ups.
4. **`PROJECT_STATE.md`** — Product state and Important Files updated to include the builder and pointer to the module doc.
5. **Selectable presets** on the builder (`Starting preset`): dropdown for Animalic / Vanilla / Mittellandkanal / Harterleiten samples plus built-in minimal and starter layouts; **Load preset** confirms before replacing all sections; dropdown-only does not wipe edits.
6. **Builder layout polish**: Visual alignment with explorer section/group styling; **sticky** chrome on each animal/mixture/recipe card; **removed** panel-level sticky section headers (replaced with `.panel-section-head`) after overlap at `top: 0` hurt usability — confirmed much clearer scroll feedback.

### Doc checkpoint (2026-04-11)

- `PROJECT_STATE.md`, `SESSION_LOG.md`, `FS25_ANIMALIC_FOOD_BUILDER.md`, `CONTEXT_CHEATSHEET.md` updated for the builder UX/sticky decision and resume hints.

### Notes

- Builder is English-first for explanatory copy; explorer remains DE-primary with i18n.
- Sample load requires serving over HTTP(S); `file://` shows fallback data until a server is used.

## Session: 2026-04-09 (calculator-heavy iteration)

### Major Work Completed

1. Extended `public/fs25_animalic_food.html` from static analysis view into a dual calculator workflow.
2. Corrected core domain logic:
   - mixer calculator now uses **recipes** (not mixtures).
3. Implemented two calculators:
   - **Bulk goods** calculator (filltype liters)
   - **Bales** calculator (discrete bale actions)
4. Added base FS25 bale capacity catalog and merge path for uploaded bale XMLs.
5. Reworked bulk UX:
   - combined colored segmented rail
   - draggable boundary handles
   - per-filltype lock/unlock with strict lock snapshots
6. Reworked bales UX:
   - empty start state
   - no dropdown dependency
   - mixed-size bales supported simultaneously per ingredient
   - left click add / right click remove token behavior
7. Added strict add gating in bales mode:
   - disallow actions that make valid target recipe unreachable
   - clear disabled visuals + warning status
8. Improved bale readability:
   - explicit round vs square grouping (side-by-side)
   - replaced generic brick icon with bale-style symbols.
9. Promoted validator/status prominence and then narrowed it:
   - styled high-visibility status panel
   - shown in bales mode (hidden in bulk mode to reduce noise)
10. Separated bulk/bale render mutation paths so one mode does not overwrite the other’s intended state.

### Fixes During Iteration

- Lock drift bug fixed by storing and enforcing lock snapshot values.
- “All tokens blocked” issue fixed by feasibility test:
  - now checks “can still reach valid final target mix”, not immediate strict validity only.
- Mineral feed handling clarified:
  - excluded from bale calculator flow
  - retained in bulk/filltype flow.

### Current Behavior Confidence

- Build passes repeatedly after each substantial change.
- No linter issues in `public/fs25_animalic_food.html`.
- User confirmed logic is largely working; remaining work is mostly UX/design polish.

### Remaining Follow-Up (Short List)

1. Further polish bale selector aesthetics and spacing.
2. Re-check edge slider interactions for minor boundary quirks.
3. Optional: replace symbol-based bales with lightweight SVG icons.

## Session: 2026-04-10

### Development workflow doc

1. Added **[DEVELOPMENT_WORKFLOW.md](DEVELOPMENT_WORKFLOW.md)** — suggested order of work after the dual calculator: logic vs UI passes, manual scenario matrix, refactor split, import/export state, design + a11y sweep.
2. Linked that doc from **CONTEXT_CHEATSHEET.md** and **PROJECT_STATE.md** so future sessions find it quickly.

### FS25 explorer — checkpoint (animals / samples / layout)

1. **SERIAL vs PARALLEL** feeding: fixed misleading totals and % stack for SERIAL; SERIAL uses **productionWeight-scoped** row backgrounds (width ∝ weight / max weight per animal); PARALLEL keeps stack bar + aligned band tints + eat line.
2. **Visual polish**: food-group row tints (parallel aligned to bar; serial weight-width); **animal grid** uses **container query** + **1.14fr / 0.86fr** two-column rhythm when the Tiere panel is wide enough.
3. **Samples**: embedded **Mittellandkanal** + **Harterleiten** XML in-page (offline parity with animalic/vanilla); **removed warn status** on embed fallback — `consumeXml` alone sets **ok** with snapshot label.
4. **Reverted** experimental **1/2/3 column** main layout (user feedback); restored **grid** + **grid-two** for mixtures|recipes.
5. **Tooling**: **`scripts/inject-embed-samples.mjs`** to re-sync map sample embeds from `public/samples/`.

### Docs / checkpoint

- **PROJECT_STATE.md**: checkpoint section + sample/sync notes.
- **SESSION_LOG.md**: this block.
- **CONTEXT_CHEATSHEET.md**: FS25 snapshot updated for resume.

### Confidence

- `npm run build` green after changes.
- Next natural focus remains bale calculator UX (per DEVELOPMENT_WORKFLOW.md) unless new FS25 data work lands.
