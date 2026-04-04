# Project State: Sash's Links

## What it is

- Astro + Tailwind static link page (terminal theme); branded **Termlink** in UI/OG (see README for **Linktree** / **LinkFree** named only as category & lineage references)
- Optional static HTML + assets in `public/` (FS25 mod info page, social images)
- Deployed to GitHub Pages: [https://sashaman.github.io/links/](https://sashaman.github.io/links/)

## Tech stack

- Astro 5.x
- @astrojs/tailwind 5.x
- Tailwind CSS 3.x
- Zero JS runtime on the Termlink (homepage) page

## Project structure

```
links/
├── .github/workflows/deploy.yml   # Build dist/ → GitHub Pages (must be Pages “Source”)
├── .gitignore
├── LICENSE                        # ISC
├── README.md
├── astro.config.mjs               # site + base: /links
├── tailwind.config.mjs
├── package.json
├── public/
│   ├── fs25_animalic_food.html    # FS25 mod hub (own OG → preview.png)
│   ├── preview.png                # FS25 Discord/social image
│   └── img/
│       ├── aoum.png, favicon.ico, emojipedia-symbol.png
│       └── termlink-og.png        # OG image for /links/ (Discord card)
└── src/
    ├── layouts/Layout.astro       # Shell + Open Graph / Twitter / theme-color
    └── pages/index.astro          # Terminal Termlink page + Layout SEO props
```

## Commands

- `npm run dev` — dev server
- `npm run build` — static build to `dist/`
- `npm run preview` — serve `dist/` locally

## Key details

- `**import.meta.env.BASE_URL**` for in-page assets; Layout builds **absolute** `og:image` / canonical URLs using `site` + base
- **Do not** use `noindex,nofollow` on the homepage if you want Discord/social link previews
- **GitHub Pages**: Repository **Settings → Pages → Build and deployment → Source** must be **GitHub Actions**. If set to “Deploy from a branch”, GitHub can serve `README.md` as the site — no `dist/`, no `_astro` CSS, static `public/` copies missing → broken layout and 404s for built-only paths
- 15 links; terminal UI (scanlines, green accents, staggered animations)

## Removed / superseded

- Old static HTML/CSS at repo root; concept Astro themes (orbit, editorial); duplicate `/terminal/` route
- Old README template (termlinks/MNMLSM only)

