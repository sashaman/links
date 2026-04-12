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

- **CSS:** `.bale-calc-module`, `.bale-mod-section` / `.bale-mod-h` / `.bale-mod-hint`, mixer bar (container queries), segments (stacked label + %), in-segment overlays, **`.bale-legend-chip`** / **`.bale-legend-status`**, focus buttons, **`.bale-options-lane`** grid, `.bale-mod-token` / `.bale-mini`, actions. **Removed** obsolete table-era bale grid styles.
- **`renderCalculator` (bales branch):** Builds a single **module** HTML string instead of `<table>` rows: **three sections** (preview → breakdown → pick bales), header badges (target + recipe ok/open), mixer bar from **`baleRows`**, **per-segment** `.bale-mixer-overlay` inside each colored slice (same width as liters/target — recipe band only in `title` / legend, not a second horizontal scale), legend with per-row status from **liter distance** to the recipe band at the current mix total (violations: **L over max / L under min**; soft: **near max / near min** with a neutral mid-band), chip outline matches severity, **`data-bale-focus`** rows, focus pill strip, options for **active** row only with **`data-bale-token`** / **`data-bale-allow-add`**, **CSS grid** for bale size tokens, **Reset**, mineral note when applicable.
- **Events:** Click on focus strip **or glance chips** updates **`activeBaleIngredientIdx`** and re-renders; Reset clears **`baleCounts`** / **`count`** for non-mineral rows; **click** / **contextmenu** on **`closest('[data-bale-token]')`** (class **`bale-mod-token`**).
- **Strings:** **`UI`** keys in **de / en / fr**, including **`calcViolationLine`** with **`{{name}}` / `{{pct}}` / `{{mn}}` / `{{mx}}`** placeholders via **`tpl()`** for status violations.
- **Helpers:** **`tpl(key, vars)`** for placeholder substitution; **`shortMixerSegLabel()`** for narrow segment text.
- **Responsive:** **`container-type: inline-size`** on the mixer wrap — below **~640px** width the mixer becomes a **vertical stack** (muted **↕** hint on the left, `bale-mixer-vaxis-hint`, for quick visual orientation). On the **horizontal** bar, slices with **tank share &lt; ~0.18%** use **`bale-mixer-seg--bar-micro`** (`display: none`) so label chrome does not paint as hairline slivers; they still appear in the **vertical** stack. **every** recipe ingredient gets a row; **0 L** rows are **ghost** (tinted, dashed, semi-transparent). **flex-grow** matches **liters ÷ capacity** for filled rows (same as horizontal width %); empty slots use a **small** flex share when the rest of the mix has volume, or **equal** shares when the wagon is still empty. A full-width **frei** row appears only when there is **some** fill but not full; when **nothing** is loaded, horizontal mode shows that **frei** strip only (ghost rows are `display:none` wide). Legend status **text** hides under ~640px (dot remains).
- **Concurrency:** All logic stays in the main document (no Web Workers). A multi-agent or worker split was not used: the work is DOM templating and light arithmetic, and the page is intentionally a single portable HTML file.

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

## 6. Follow-ups from the MVP doc — what happened

| Original idea | Outcome |
|----------------|---------|
| Segment labels + recipe band hint | **Done:** overlays sit **inside** each segment (accent top edge + tooltip); mix % stays on the segment; recipe min–max % stays in legend / `title`. |
| Compact “all ingredients” summary beside focus | **Done:** **glance chips** under the legend (L + actual mix %), same focus binding as the pill strip. |
| Localize **`recipeViolationLines`** | **Done:** **`calcViolationLine`** + **`tpl()`** per language. |
| Extract shared script / dedicated page | **Open:** only if the bale UI is duplicated or grows large enough to warrant a second URL or importable module. |

---

## 7. How to verify quickly

1. Open **`fs25_animalic_food.html`** over HTTP, load a sample, pick a recipe.
2. Switch to **Bales**: three sections (preview bar, breakdown with legend + chips, pick bales); bulk tab unchanged.
3. Change **DE / EN / FR**: module strings, section headings, and violation lines follow the language.
4. Click a **legend row** (ingredient chip) or **focus** pill; bale tokens update for that ingredient.
5. Left/right click tokens; blocked adds show localized message; **Reset** clears counts.
6. Narrow the viewport: mixer bar stays usable; legend status sentences may hide while dots + legend bands remain.

---

*Last updated: 2026-04-12 — sectioned module, glance chips, localized violations, responsive mixer (no Workers).*
