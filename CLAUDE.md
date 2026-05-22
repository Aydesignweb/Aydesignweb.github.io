# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AY. Design** — Portfolio website for a graphic design studio (Arabic/English). Hosted on GitHub Pages at `aydesignweb.github.io`.

- **Stack:** Pure HTML5 + CSS3 + Vanilla JS (no framework, no build step)
- **Hosting:** GitHub Pages (push to `main` → live instantly)
- **Analytics:** Google Analytics 4 — ID: `G-KF85L0KXWX`
- **Contact form:** FormSubmit.co (no backend needed)
- **WhatsApp:** `+966595074317`

## Deployment

```bash
# No build step — just push to main
git add .
git commit -m "..."
git push
# Live at https://aydesignweb.github.io/ in ~30 seconds
```

To preview locally:
```bash
# Any static server works
npx serve .
# or
python3 -m http.server 8080
```

## Directory Structure

```
index.html          → Single-page portfolio (all sections inline)
faq.html            → FAQ page
sitemap.xml         → Manual sitemap (update when adding pages)
robots.txt          → Crawl rules
ay-logo.png         → Brand logo (nav + footer)
logo.mp4            → Animated logo loop (used in about section)
images/             → Project screenshots and portfolio images
services/           → 6 service detail pages (HTML)
  brand-identity.html, social-media.html, print-design.html,
  presentations.html, ai-design.html, web-design.html
articles/           → 6 editorial/SEO article pages (HTML)
  brand-identity.html, social-media-design.html, print-design.html,
  presentation-design.html, ai-design.html, choosing-design-studio.html
  article.css       → Shared stylesheet for all article pages
  shared.js         → Shared JS for articles (breadcrumb, nav)
```

## Architecture

### index.html
All CSS lives in a single `<style>` block in `<head>`. All JS lives at the bottom before `</body>`. There are no external `.css` or `.js` files for the homepage — everything is inline for performance.

**Page sections (in order):**
1. `#hero` — full-viewport hero with rotating Arabic/English text
2. Marquee ticker — scrolling service names
3. `#about` — about section with animated logo video
4. Stats bar — black background, 4 counters
5. Philosophy quote
6. `#articles` — 3-column article cards (expandable inline)
7. `#services` — dark background 3×2 grid, each card is `<a>` linking to `/services/*.html`
8. `#work` — masonry portfolio grid with filterable tabs
9. Clients marquee
10. `#contact` — split layout with FormSubmit form
11. Footer

### Design System (CSS Variables)
```css
--black: #0a0a0a
--white: #f5f5f3
--gray:  #e8e8e6
--mid:   #9a9a9a   /* muted text */
--red:   #c0392b   /* accent / italic highlight */
```

**Typography:**
- Display/serif: `Cormorant Garamond` (300–500 weight, often italic)
- UI/body: `Raleway` (100–400 weight)
- Labels/tags: `9px`, `letter-spacing: 3–6px`, `text-transform: uppercase`

### Built-in Mockup Classes
CSS-only device frames used in the portfolio grid — no images needed:
- `.mockup-laptop` + `.mockup-screen` → laptop frame
- `.mockup-phone` + `.mockup-phone-screen` → phone frame
- `.mockup-tablet` + `.mockup-tablet-screen` → tablet frame
- `.mockup-print` → tilted paper/print mockup (`rotate(-1.5deg)`)

Card layout variants: `.layout-single`, `.layout-phone-duo`, `.layout-angled`, `.layout-dark-phone`, `.layout-print-angle`

### Portfolio Filtering
Filter tabs (`.ftab`) set `data-filter` attributes; JS toggles `.hidden` on `.proj-card` elements based on their `data-cat` attribute. Active tab gets `.active` class.

### Scroll Reveal
Elements with class `.rv` start `opacity:0; transform:translateY(28px)`. An `IntersectionObserver` adds `.in` when they enter the viewport. Delay modifiers: `.d1`–`.d5`.

### Language Toggle
A `lang-btn` button toggles `data-lang="ar"|"en"` on `<body>`. All bilingual elements carry `data-ar="..."` and `data-en="..."` attributes; JS swaps `textContent` on toggle and saves to `localStorage`. Direction flips between `rtl`/`ltr`.

## Service & Article Pages

Both follow the same template pattern:
- `<link rel="canonical">` pointing to `https://aydesignweb.github.io/services/[slug].html`
- `BreadcrumbList` JSON-LD schema
- Visual breadcrumb nav rendered after `<nav>`
- Internal link to related article before `</main>`
- `article.css` (articles only) for shared styling

**When adding a new service or article page:**
1. Copy an existing page and update content + schema
2. Add the URL to `sitemap.xml`
3. Link it from `index.html` (service card or article card)

## SEO Conventions

- `<link rel="canonical">` on every page
- `hreflang="ar"` only (no `?lang=en` alternate — language is JS-only, no real separate URL)
- Schema types in use: `ProfessionalService`, `WebSite`, `BreadcrumbList`, `FAQPage`, `Article`
- `sitemap.xml` is **manual** — update it whenever a page is added or removed

## Do NOT
- Do NOT add `hreflang="en"` pointing to `?lang=en` — this causes Google Search Console "Alternate page with proper canonical tag" errors
- Do NOT split CSS/JS into separate files for `index.html` — keep inline for performance
- Do NOT use a framework or bundler — this is intentionally zero-dependency
- Do NOT display the owner's email publicly — use WhatsApp link only (`wa.me/966595074317`)
- Do NOT change the GA ID (`G-KF85L0KXWX`)
- Do NOT commit `tmp-*.png` files — these are temporary Canva upload assets and must be deleted after use
- Do NOT add `aspect-ratio` to `.about-photo` container — the logo video is landscape and will letterbox
- Do NOT modify `sitemap.xml` URLs without verifying the canonical `<link>` on the corresponding HTML page matches

---

## Changelog

<!-- Auto-updated by Stop hook at session end. Newest entry first. -->

| Date | Summary |
|------|---------|
| 2026-05-18 | Initial CLAUDE.md created. Fixed service cards 04-06 as anchor links, removed hreflang="en" / ?lang=en causing GSC canonical errors, added BreadcrumbList JSON-LD + visual breadcrumbs + internal links to all 12 service/article pages, fixed project names (مكتب رئيس للمحاماة, Zerofatty), removed email from FAQ, replaced about-section photo with logo.mp4 video loop, added ay-logo.png to nav + footer. |
