# Project State: Sash's Links (Astro + Tailwind)

## What we built
- Migrated from static HTML/CSS to **Astro + Tailwind**
- Created **4 layout concepts** for preview:
  - `/` — basic (original style preserved)
  - `/terminal/` — **WINNER** — dark terminal aesthetic
  - `/editorial/` — light, magazine-style
  - `/orbit/` — kinetic, animated cards

## Terminal theme (selected)
- Dark background with scanline overlay
- Terminal-style header (`sash@links:~$ ./init.sh`)
- Profile with avatar + pulsing green status dot
- Link cards with staggered entrance animation (expand bottom-left → top-right, 60ms delay each)
- Hover: scale up + green border glow + arrow reveal
- Footer with pulsing session indicator

## Project structure
```
src/
  layouts/Layout.astro        # Base HTML shell
  pages/
    index.astro               # Basic version
    terminal/index.astro      # Selected theme
    editorial/index.astro     # Light editorial
    orbit/index.astro         # Kinetic orbit
```

## Commands
- `npm run dev` — start dev server (port 3000)
- `npm run build` — build static site to `dist/`
- `npm run preview` — preview built site

## Dependencies
- astro ^6.1.3
- @astrojs/tailwind ^6.0.2
- tailwindcss ^3.4.19
- autoprefixer ^10.4.27

## Next steps (pending)
1. Polish terminal theme (hover glow, cursor animation, link categories, better header)
2. Set up GitHub Pages deploy action
3. Clean up unused concept pages (optional)

## All original links preserved
- 15 links total (Discord, GitHub, workupload, Google Sheets, farming-simulator, giants-software, emojipedia, siiimple)
