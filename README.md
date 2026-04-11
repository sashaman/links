# Sash’s Termlink

Personal **link-in-bio** page in a terminal / CRT style. **Termlink** is just the label for this site (terminal + links)—not affiliated with [Linktree](https://linktr.ee/)® or any other service.

**For context:** “Link-in-bio” pages are widely associated with products like **Linktree**; people often call the pattern “linktree-style.” This repo is independent. An earlier static version drew layout ideas from [LinkFree](https://github.com/michaelbarney/LinkFree) (Michael Barney’s link-in-bio template collection); the current stack is Astro + Tailwind.

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

- **`public/fs25_animalic_food.html`** — Interactive explorer (nutrition groups, calculators, DE/EN/FR), linked from the Giants mod hub on your next update.
- **`public/fs25_animalic_food_builder.html`** — Guided `animalFood.xml` editor (sibling page, own OG tags).
- **`public/og-animal-food-explorer.png`** — `1200×630` (or similar) Open Graph / Twitter image for the **explorer** page (Discord embeds).
- **`public/og-animal-food-builder.png`** — Same role for the **builder** page.

**Live URLs** (after deploy):

- Explorer: `https://sashaman.github.io/links/fs25_animalic_food.html` → `https://sashaman.github.io/links/og-animal-food-explorer.png`
- Builder: `https://sashaman.github.io/links/fs25_animalic_food_builder.html` → `https://sashaman.github.io/links/og-animal-food-builder.png`

These files live under **`public/`** so Astro copies them into `dist/` and the GitHub Pages workflow actually publishes them. If you only kept them in the repo root, they would not be included in the `dist/` artifact.

**Naming:** `og-<topic>.png` keeps social preview assets obvious next to other `public/` files. If Discord caches an old thumbnail after you replace an image, bump a query on the URL in the HTML meta tags (e.g. `og-animal-food-builder.png?v=2`).

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
│   ├── fs25_animalic_food.html       # FS25 explorer (OG → og-animal-food-explorer.png)
│   ├── fs25_animalic_food_builder.html
│   ├── og-animal-food-explorer.png   # Discord / social embed (explorer)
│   ├── og-animal-food-builder.png    # Discord / social embed (builder)
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
