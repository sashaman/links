# FS25 Animal Food Explorer — Bale Calculator Module (Implementation Record)

This document records **why** the bale calculator was refactored, **what** was taken from an external design reference, **which decisions** were made in conversation, and **how** the result is wired in code. It is the canonical narrative for this feature; high-level project state lives in **[PROJECT_STATE.md](PROJECT_STATE.md)**.

---

## 1. Goal

**Primary goal:** Replace the old **bales-mode** UI in `public/fs25_animalic_food.html` with a clearer **mixer-style** experience: one visual “fill” bar vs target liters, progressive disclosure (focus one recipe ingredient at a time), and the same interaction model as before (whole bales, recipe constraints, catalog from merged base-game + uploaded bale XML).

**Non-goals (explicit):**

- No automatic **solver** (search/apply an “optimal” bale mix). **Decision:** A solver implies a large amount of branching rules and edge-case policy; it was judged not worth the maintenance cost. **Reset** remains as a simple manual clear.
- No change to **`fs25_animalic_food_builder.html`** in this iteration. **Decision:** Scope stays on the explorer only; a dedicated page later is possible if the bale tool grows.

---

## 2. Reference material (“the example”)

Two inputs shaped the design:

1. **External HTML preview** (`preview(2).html` — a saved/exported variant of the explorer with an appended block). It demonstrated:
   - A **dedicated panel** with mixer bar, **focus strip** (one ingredient active), **tokens** with left +1 / right −1, and optional solver UI.
   - **CSS** patterns: dark card, gold accents, `0.18s` transitions, badges for target/recipe state, stacked bar + “free” segment + min/max **percentage bands** drawn on the bar.

2. **Technical spec (German)** describing intended behavior: counter consistency, live mixer proportions, solver (we **dropped** this part), apply, valid/risky/invalid feedback, data from `animalicFood.xml` + bale catalog.

**What we learned from the example:**

- **Good to adopt:** UX story (mixer bar, focus strip, token presentation), visual hierarchy, separation from bulk mode.
- **Not copied verbatim:** The example’s second script used a **stub data model** (e.g. fixed ingredient keys like silage/grass/straw and a hardcoded bale list). **Decision:** The real app already has **`buildMergedBaleCatalog()`**, **`unionBaleOptionsForIngredient`**, **`canStillReachRecipeAtTarget`**, and **`STATE.calc.ingredientConfig` / `baleCounts`**. Reusing that data path avoids duplicate state and keeps behavior identical to the pre-refactor calculator.

---

## 3. Decisions (conversation → implementation)

| Topic | Decision | Because |
|--------|-----------|--------|
| **Solver** | Remove entirely | Too much conditional logic and product ambiguity for marginal gain; user preference. |
| **State** | Keep **one** source: `STATE.calc` | Bale counts only matter in bales mode; bulk liters stay separate. No parallel `selectedCounts` object that could diverge. |
| **Layout** | Replace the old **wide table** (all ingredients × round/square columns) | Table was information-dense but heavy; focus strip reduces clutter and matches step-by-step mixing. Legend + bar recover an “at a glance” view. |
| **Bulk vs bales** | Remain **tab-separated** | Already matched mental model; bulk rail/sliders unchanged, bales get the new module only when that tab is active. |
| **i18n** | All new UI strings via existing **`t()` / `UI`** (DE, EN, FR) | User requirement; tabs, blocked message, module labels, reset, etc. must follow language switch. |
| **Mineral feed** | Same as before: excluded from bale liters vector; **note** in UI when recipe includes it | Preserves existing recipe-feasibility semantics. |
| **Active ingredient** | New **`STATE.calc.activeBaleIngredientIdx`** | Drives focus strip; reset when **recipe** changes; validated on render if index no longer in bale rows. |
| **Blocked add** | Localized status via **`t('calcBaleBlocked')`** | Replaces hardcoded English error string for consistency. |

---

## 4. What was implemented (technical summary)

**In `public/fs25_animalic_food.html`:**

- **CSS:** New block for `.bale-calc-module`, mixer bar/wrap, segments, “free” segment, overlay bands, legend rows, focus buttons, options panel, `.bale-mod-token` / `.bale-mini`, actions. **Removed** obsolete styles for the old table-era bale grid (`.bale-picks`, `.bale-groups-grid`, legacy `.bale-token` layout, etc.).
- **`renderCalculator` (bales branch):** Builds a single **module** HTML string instead of `<table>` rows: header badges (target + recipe ok/open), mixer bar from **`baleRows`**, overlays from each ingredient’s min/max **%**, legend with per-row ok/warn/bad vs **`RECIPE_EPS`**, focus buttons **`data-bale-focus="${idx}"`**, options for **active** row only with **`data-bale-token`** / **`data-bale-allow-add`** (same feasibility checks as before), optional partial line, **Reset** button **`data-bale-reset`**, mineral note when applicable.
- **Events:** Click on focus strip updates **`activeBaleIngredientIdx`** and re-renders; Reset clears **`baleCounts`** and **`count`** for all non-mineral ingredients in the current recipe; existing **click** / **contextmenu** handlers still use **`closest('[data-bale-token]')`** (tokens now use class **`bale-mod-token`**).
- **Strings:** New **`UI`** keys (e.g. `calcTabBulk`, `calcTabBales`, `calcBaleUxTitle`, `calcMixerFree`, `calcRecipeStatusOk` / `Open`, `calcBaleReset`, `calcBaleBlocked`, `calcIssues`, `calcBaleNoAdd`, `calcBaleMineralNote`, `calcBalePickSizes`, …) in **de / en / fr**.

**Unchanged in spirit:**

- Recipe validation (**`recipeFeasible`**, **`recipeViolationLines`**, **`canStillReachRecipeAtTarget`**), gap-filler suggestions, target/headroom pills in **`calc-status`**, bale XML merge, **`getIngredientConfig`** / **`updateCalcIngredient`**.

---

## 5. Files

| File | Role |
|------|------|
| `public/fs25_animalic_food.html` | Implementation |
| `FS25_BALE_CALC_MODULE.md` | This design/decision record |
| `PROJECT_STATE.md` | Project checkpoint + pointer here |
| `CONTEXT_CHEATSHEET.md` | Short snapshot + pointer here |

---

## 6. Possible follow-ups (not committed)

- Further visual polish (segment labels, overlay readability on small widths).
- Optional compact “all ingredients” summary alongside focus mode (if power users miss the old table density).
- Extract bale module markup/logic to a shared script if a **dedicated bale page** is added later.
- Localize **`recipeViolationLines`** internals (some strings still mix fixed wording with percentages).

---

## 7. How to verify quickly

1. Open **`fs25_animalic_food.html`** over HTTP, load a sample, pick a recipe.
2. Switch to **Bales**: mixer bar, legend, focus strip, tokens appear; bulk tab still shows rail/sliders only.
3. Change **DE / EN / FR**: module strings and tabs update.
4. Left/right click tokens; blocked adds show localized message; **Reset** clears counts.

---

*Last updated: 2026-04-12 — bale module tied to explorer (`activeBaleIngredientIdx`, no solver).*
