# Person-First Bilingual Portfolio Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` to implement this plan task by task. Steps use checkbox syntax for tracking.

**Goal:** Build Nilson's bilingual portfolio as a person-first website in the approved dark navy, blue, cyan, and ASCII direction, and provide a bilingual PDF.

**Architecture:** A static site under `site/` with semantic HTML, a focused stylesheet, and small JavaScript modules for locale switching and an optional WebGL wireframe. The page works with JavaScript disabled, respects reduced motion, and displays a static fallback if WebGL is unavailable. A separate editorial document under `site/pdf/` uses the same copy and media but its own three-page A4 composition per language. A Playwright export script renders both locale views and combines them into one bilingual PDF. GitHub Actions deploys only `site/` to GitHub Pages after changes reach `main`.

**Tech Stack:** HTML, CSS, browser JavaScript modules, Three.js r170 for the high-tier wireframe, Playwright for PDF export.

**MCP Servers:** No MCP servers recommended. Local Playwright is sufficient to inspect the rendered site and produce the PDF.

**Spec:** Approved page structure and copy in [PR #2](https://github.com/jounimn/nilson-portfolio/pull/2), `design/portfolio-identity-revision.md` on `feature/portfolio-personal-introduction`. The approved palette was updated to blue/cyan after review.

## Global Constraints

- The website is one page in Portuguese and English, with a visible language switch.
- The hero introduces Nilson personally and uses his uploaded 400 × 400 portrait.
- Use only Nilson's own project evidence and no stock imagery.
- Do not position customer service as an expertise.
- Focus capabilities on RPA, data analysis, BI, and automation.
- The visual ground is `#081321`, blue signal is `#58a6ff`, and cyan is `#91dcff`.
- The High tier uses a data-lineage wireframe, with reduced-motion and no-WebGL fallbacks.
- The final artifact contains a dedicated PDF layout in Portuguese followed by English, with three A4 pages per language.
- GitHub Actions publishes the `site/` directory to GitHub Pages on pushes to `main` and manual workflow dispatch.
- All changes remain on a feature branch and are delivered in a PR targeting `main`.

## Review Focus

- PT-BR and EN language states stay complete, including nav, project copy, alt text, document title, and PDF content.
- The uploaded photo remains a local asset and renders at its native/near-native size.
- The Planning Intelligence image is labelled as a sanitized sample with fictional organization data.
- No employment claims, project metrics, email address, or credentials are invented.
- Reduced motion and unavailable WebGL leave the hero understandable and visually complete.
- Desktop, mobile, both locales, and print/PDF layouts have no clipping or horizontal overflow.

---

### Task 1: Prepare original assets and reproducible project setup

**Files:**
- Create: `site/assets/images/nilson-lopes.jpg`
- Create: `site/assets/images/planning-intelligence.png`
- Create: `site/assets/images/cog-demo.webp`
- Create: `site/assets/vendor/THREE-LICENSE.txt`
- Create: `package.json`
- Create: `package-lock.json`
- Modify: `.gitignore`

**Interfaces:**
- Supplies local image paths for `index.html` and the pinned local Three.js r170 module.
- `package.json` exposes `npm run export:pdf` for the final handout.

- [x] Copy Nilson's supplied portrait to the asset directory and confirm it is a 400 × 400 JPEG.
- [x] Fetch the sanitized dashboard screenshot and one Cog UI capture from Nilson's public repositories; record their source URLs and the fictional-data note in the site README.
- [x] Add the pinned Playwright PDF export dependency and Three.js r170 browser module with its MIT notice.
- [x] Add generated output (`node_modules/` and temporary capture files) to `.gitignore`.

### Task 2: Build the bilingual portfolio surface

**Files:**
- Create: `site/index.html`
- Create: `site/styles.css`
- Create: `site/scripts/portfolio.js`
- Create: `site/scripts/copy.js`

**Interfaces:**
- `scripts/copy.js` exports the complete `pt` and `en` copy dictionaries.
- `scripts/portfolio.js` initializes from `?lang=pt|en`, applies locale strings, updates `<html lang>`, and handles the language toggle and current URL.

- [x] Build the person-first hero with portrait, approved intro, focus areas, project and LinkedIn actions.
- [x] Add selected projects with real source links and supplied repository imagery, followed by the professional arc, capabilities, and contact close.
- [x] Add accessible navigation, language control, icon labels, and metadata; keep every important statement available without JavaScript.
- [x] Add responsive blue/cyan styling, reduced-motion defaults, and print layout.

### Task 3: Add High-tier wireframe motion with safe fallbacks

**Files:**
- Create: `site/scripts/wireframe.js`
- Create: `site/assets/vendor/three.module.min.js`

**Interfaces:**
- The module draws a poster frame when motion is reduced or export mode is active, animates only while in view and visible, and reveals the static SVG fallback after WebGL failure or context loss.

- [x] Build the intersecting icosahedron and cube line models in Three.js r170.
- [x] Add resize handling, visibility/intersection pause, WebGL context-loss fallback, and reduced-motion switching.
- [x] Keep the canvas decorative and outside the screen-reader tree; the ASCII and copy remain available as static content.

### Task 4: Export the bilingual PDF and finish project documentation

**Files:**
- Create: `scripts/export-pdf.mjs`
- Create: `site/pdf/index.html`
- Create: `site/pdf/styles.css`
- Modify: `site/scripts/copy.js`
- Create: `site/downloads/nilson-lopes-portfolio.pdf`
- Modify: `README.md`

**Interfaces:**
- `npm run export:pdf` launches the local site, renders the dedicated `site/pdf/` document with `?lang=pt` and `?lang=en`, validates three A4 pages per language, then combines the pages in PT-first order.

- [x] Build an editorial PDF composition with a profile page, selected work page, and capabilities/contact page for each language.
- [x] Export one PDF containing the Portuguese version followed by the English version; keep the contact email clickable.
- [x] Document local preview, PDF regeneration, image sourcing, motion tier, and the sanitized sample limitation.
- [x] Inspect the page at desktop and mobile sizes in both locales, inspect the reduced-motion/no-WebGL states, and render every PDF page to verify layout and text.

### Task 5: Deploy the static site with GitHub Actions

**Files:**
- Create: `.github/workflows/deploy-pages.yml`

**Interfaces:**
- On pushes to `main` or manual dispatch, upload only `site/` as the Pages artifact and deploy it to the `github-pages` environment.

- [x] Configure the workflow with the minimal `pages: write` and `id-token: write` deployment permissions.
- [x] Use the official `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, and `actions/deploy-pages@v4` actions.
- [x] Enable GitHub Pages with Actions as the source for this repository; the first deployment completed after the site PR landed on `main`.
