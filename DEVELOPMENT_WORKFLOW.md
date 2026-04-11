# Suggested development workflow (Termlink + FS25 explorer)

This document captures a practical order of work after the dual calculator (bulk + bales) landed in `public/fs25_animalic_food.html`. Use it to avoid mixing logic changes with UI polish in the same pass.

## 1. Freeze logic, polish UI in small passes

- **Rule:** One pass = one concern (either logic *or* visuals, not both).
- **Bale selector pass:** spacing, density, icon consistency, mobile layout only.
- **Bulk slider pass:** micro-interactions, handle hit areas, legend clarity only.

Avoid bundling “fix edge case + redesign tokens” in a single PR or session.

## 2. Scenario test matrix (manual regression)

Maintain a short checklist (can live in this file or a `docs/calc-scenarios.md`) with 4–6 cases:

- Easy recipe + comfortable target liters.
- Edge case: one ingredient at min band, others flexible.
- Near capacity: total liters close to target.
- Impossible or “no valid add” states (expect disabled tokens + clear messaging).
- Locks: pin one filltype, drag others; verify no drift.
- Mode switch: configure bales, switch to bulk and back; state stays isolated.

Run through after any calculator logic change.

## 3. Separate calculator internals from page script (refactor)

When ready for maintainability:

- Extract **pure** pieces: parse helpers, recipe feasibility, `rebalanceWithLocks`, bale add gating, catalog merge.
- Keep a **thin** render layer that maps state → HTML.
- Benefit: easier debugging, tests, and future features without a 1800+ line single file.

## 4. Import / export calculator state

- Serialize: selected recipe, target liters, bulk liters + locks, bale counts per size per ingredient.
- JSON download/upload or copy-paste.
- Useful for testing, sharing setups, and support when reporting bugs.

## 5. Design language pass (single sweep)

After logic feels stable:

- Unify paddings, type scale, token sizes, status panel hierarchy.
- Mobile: scrollable bale groups, touch-friendly targets.
- **Accessibility:** keyboard focus on tokens (or explicit +/-), ARIA labels, `prefers-reduced-motion` where motion exists.

## 6. Optional follow-ups

- Replace emoji bale symbols with small inline SVGs if you want a more “product” look.
- Automated tests: feasibility helpers as unit-testable pure functions (if you add a test runner).

## Quick order summary

1. UI polish (bales) → 2. UI polish (bulk) → 3. scenario matrix as habit → 4. refactor split → 5. import/export → 6. a11y + design sweep.

---

*Last aligned with project state: dual calculator, recipe-based mixer logic, bulk vs bales mode separation.*
