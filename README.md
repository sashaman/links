# Sash’s Linktree

Personal link-in-bio page: a **terminal / CRT–style** layout built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/), shipped as static HTML.

**Live site:** [https://sashaman.github.io/links/](https://sashaman.github.io/links/)

No client-side JavaScript is required for the page itself (static markup and CSS).

## Stack

| Piece | Role |
|--------|------|
| Astro 5 | Static site generator |
| `@astrojs/tailwind` | Tailwind integration |
| Tailwind CSS 3 | Styling |
| GitHub Actions | Build and deploy to GitHub Pages |

## Local development

```bash
npm install
npm run dev
```

Open the URL Astro prints (default is often `http://localhost:4321/`).

```bash
npm run build    # output in dist/
npm run preview  # serve dist/ locally
```

## Editing content

1. **Links and labels** — `src/pages/index.astro`  
   Edit the `links` array (`href` + `label`).

2. **Title** — same file, `<Layout title="…">`, and/or `Layout.astro` for global tweaks.

3. **Avatar and favicon** — files under `public/img/` (e.g. `aoum.png`, `favicon.ico`).  
   Paths in code use `` `${import.meta.env.BASE_URL}/img/...` `` so they work with the GitHub Pages **base path** (`/links`).

4. **GitHub username** — `src/pages/index.astro` (e.g. `@sashaman`, profile block, terminal header).

## FS25 mod info page

Standalone HTML for the mod [FS25 Tierernährung (Animalic Food)](https://www.farming-simulator.com/mod.php?mod_id=337612&title=fs2025):

- **`public/fs25_animalic_food.html`** — German info page (nutrition groups, PARALLEL mode, etc.), linked from the Giants mod hub on your next update.
- **`public/preview.png`** — `1200×630` (or similar) image referenced by Open Graph / Twitter meta tags so Discord and other platforms show a rich embed.

**Live URLs** (after deploy):

- Page: `https://sashaman.github.io/links/fs25_animalic_food.html`
- Embed image: `https://sashaman.github.io/links/preview.png`

These files live under **`public/`** so Astro copies them into `dist/` and the GitHub Pages workflow actually publishes them. If you only kept them in the repo root, they would not be included in the `dist/` artifact.

If you change the preview image, Discord may cache the old thumbnail for a while; bumping a query on the image URL (e.g. `preview.png?v=2`) in the HTML meta tags can force a refresh after you redeploy.

## GitHub Pages

- **`astro.config.mjs`** sets `site` and `base: '/links'` so assets and routes match `https://sashaman.github.io/links/`.
- **`.github/workflows/deploy.yml`** runs on pushes to `master`: `npm ci`, `npm run build`, deploy `dist/` via GitHub Pages.

Repository settings must have Pages using **GitHub Actions** as the source.

## Project layout

```
links/
├── .github/workflows/deploy.yml
├── .gitignore
├── LICENSE               # ISC — use this exact name so GitHub shows the license badge
├── README.md             # overview (this file)
├── astro.config.mjs
├── package.json
├── public/
│   ├── fs25_animalic_food.html  # FS25 mod info (OG tags → preview.png)
│   ├── preview.png              # Discord / social embed image
│   └── img/                     # avatar, favicon, …
├── src/
│   ├── layouts/Layout.astro
│   └── pages/index.astro
└── tailwind.config.mjs
```

## Third-party notices

This repo **uses** (does not bundle their source into the license file):

| Component | License (typical) | Notes |
|-----------|-------------------|--------|
| [Astro](https://github.com/withastro/astro) | MIT | Build tool |
| [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) | MIT | CSS framework |
| [Fira Sans](https://fonts.google.com/specimen/Fira+Sans) (via Google Fonts) | [SIL Open Font License 1.1](https://scripts.sil.org/OFL) | Webfont in `Layout.astro` |

Your **own** HTML/CSS/Astro in this repository is licensed under the terms in [`LICENSE`](LICENSE). Dependency licenses live in each package’s `node_modules/<package>/LICENSE` (or equivalent) after `npm install`.

## License

Full ISC text: [`LICENSE`](LICENSE) at the repo root. `package.json` has `"license": "ISC"` (SPDX id) so registries and tools stay in sync with that file.
