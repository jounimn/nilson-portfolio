# Nilson Lopes — portfolio

Bilingual, person-first portfolio for RPA, data analysis, BI, and automation work. The site is a static project in `site/` and deploys to GitHub Pages through Actions after changes reach `main`.

## Local preview

```sh
npm install
npm run preview
```

Open the local address printed by the preview server. Portuguese is the default; use `?lang=en` for English.

## Bilingual PDF

```sh
npm run export:pdf
```

This exports Portuguese first and English second to `site/downloads/nilson-lopes-portfolio.pdf`. Playwright uses its bundled Chromium by default. To use a local Chromium-compatible browser, set `PORTFOLIO_BROWSER` to its executable path.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` publishes only `site/` on pushes to `main` and on manual dispatch. In repository settings, Pages must use **GitHub Actions** as its build and deployment source.

## Project evidence and media

- The portrait is supplied by Nilson and stored locally in `site/assets/images/nilson-lopes.jpg`.
- Planning Intelligence image: [`website-analytics` dashboard screenshot](https://github.com/jounimn/website-analytics/blob/main/docs/screenshots/dashboard-dark.png). Its public sample is sanitized; organization names and data are fictional.
- The Cog image is a still from the project's own `TeamInAction.gif` in [`jounimn/cog`](https://github.com/jounimn/cog).
- The `df-design` card uses an original CSS graphic. Its project README documents browser measurements across 30 production sites.
- No stock imagery is used. Capabilities and project descriptions avoid claims or metrics not supported by the source material.

The optional decorative wireframe is built with the locally vendored Three.js r170 browser module. Its MIT license is included at `site/assets/vendor/THREE-LICENSE.txt`.
