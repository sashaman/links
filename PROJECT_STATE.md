# Project State: Sash's Links

## What it is
- Astro + Tailwind static link page (terminal theme)
- Deployed to GitHub Pages: https://sashaman.github.io/links/

## Tech stack
- Astro 5.x
- @astrojs/tailwind 5.x
- Tailwind CSS 3.x
- Zero JS runtime

## Project structure
```
links/
├── .github/workflows/deploy.yml   # GitHub Pages auto-deploy on push to master
├── .gitignore                     # node_modules/, dist/, .astro/
├── astro.config.mjs               # site + base: /links
├── tailwind.config.mjs
├── package.json
├── public/img/                    # Static assets (avatar, favicon)
│   ├── aoum.png
│   ├── emojipedia-symbol.png
│   └── favicon.ico
└── src/
    ├── layouts/Layout.astro       # Base HTML shell
    └── pages/index.astro          # Terminal theme (root page)
```

## Commands
- `npm run dev` — dev server (port 3000)
- `npm run build` — static build to dist/
- `npm run preview` — preview built site

## Key details
- Asset paths use `import.meta.env.BASE_URL` for correct `/links/` prefix
- 15 links (Discord, GitHub repos, workupload files, Google Sheets, FS community sites)
- Terminal aesthetic: dark bg, scanline overlay, green accents, staggered card animations

## Removed
- Old static HTML/CSS (index.html, style.css)
- Concept pages (editorial, orbit) — terminal is the only theme
- Duplicate terminal subpage — now only at root
