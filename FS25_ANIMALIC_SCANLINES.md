# FS25 animalic pages — CRT scanline background

## Request

- Align the **standalone** explorer and builder (`public/fs25_animalic_food.html`, `public/fs25_animalic_food_builder.html`) with the **Termlink homepage**: a **full-viewport** background that reads as **horizontal scanlines** (alternating brighter/darker lines), not as large tinted panels or ruled margins only.

## Solution

- **Source of truth:** `src/pages/index.astro` — a **fixed** full-screen layer (`inset: 0`, `pointer-events: none`, `z-index: 50`) with **`opacity: 0.03`** and  
  `repeating-linear-gradient(…, transparent 0 2px, #00ff00 2px 4px)` (2px clear, 2px green, repeat).
- **Animalic HTML pages:** the same pattern on **`body::after`**; **`body`** keeps only the existing **olive radial** fill. Tunables on `:root`: **`--scanline-color`** (default `#00ff00`), **`--scanline-opacity`** (default `0.03`).
- **Cards** (`.top`, `.panel`) stay **solid** surfaces; the scanline is a **single viewport overlay** on top of everything, matching Termlink.

## Watchouts

- This effect is **not** a wide-period horizontal “notebook rule” baked into `body` or `.panel` — that is a different look and diverges from index.
- Avoid **full-bleed dividers** on **transparent `<section>`** wrappers between rounded cards; that produces a floating stripe between blocks.
- **`pointer-events: none`** on the overlay is required so inputs and buttons stay usable.
- **`z-index: 50`** matches index; any modal or overlay that must sit above the film needs **`z-index` above 50** (e.g. `60+`).
- On very green pages the default **3%** film can feel quiet — increase **`--scanline-opacity`** slightly, or use a softer green in **`--scanline-color`** for an olive CRT read.
