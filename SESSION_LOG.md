# Session Log: Sash's Links

## Current session: 2026-04-04

### What was done
1. Set terminal theme as root homepage (was at /terminal/)
2. Created .gitignore (node_modules/, dist/, .astro/)
3. Set up GitHub Actions deploy workflow (.github/workflows/deploy.yml)
4. Fixed Astro 6 → 5 downgrade (tailwind plugin incompatibility)
5. Moved static assets from img/ to public/img/ (Astro requirement)
6. Fixed asset paths with import.meta.env.BASE_URL for /links base path
7. Updated site title to "Sash's Linktree"
8. Cleaned up: removed old static HTML/CSS, concept pages, preview images

### Issues encountered
- **npm ci failed on CI**: @astrojs/tailwind@6 requires Astro 3-5, we had Astro 6 → downgraded
- **Images 404 on GitHub Pages**: static assets must live in public/ folder for Astro
- **Wrong asset URLs**: absolute paths (/img/...) ignored base path → used import.meta.env.BASE_URL
- **Missing slash in paths**: `${BASE_URL}img/` produced `/linksimg/` → fixed to `${BASE_URL}/img/`

### Final state
- Clean working tree, deployed successfully
- Live at: https://sashaman.github.io/links/
- 15 links, terminal theme, auto-deploys on push to master
