# AMI Avocats — Implementation Design

_2026-05-05_

## Overview

Port the Claude Design prototype bundle for AMI Avocats (law firm website) into a clean multi-file project. The prototype is a React/Babel HTML application with 12 themes, 19 logos, and a live theme-switcher.

## Source

Design bundle extracted from: `https://api.anthropic.com/v1/design/h/rUnW8ZkhmWbrOauTheX1_A?open_file=AMI+Avocats.html`

Primary file: `test-animation/project/AMI Avocats.html` (open file at handoff)

## Target Structure

```
AMI CODE/
├── index.html
└── assets/
    ├── themes.js
    ├── shared.jsx
    ├── logos.jsx
    ├── hero.jsx
    ├── sections.jsx
    └── tweaks.jsx
```

## Architecture

Single-page React app rendered via Babel standalone (no build step). All scripts loaded as `<script type="text/babel">`. React 18.3.1 + ReactDOM via unpkg CDN.

### Components

**shared.jsx**
- `Reveal` — IntersectionObserver scroll-in animation (opacity + translateY)
- `PortraitPlaceholder` — diagonal stripe placeholder for lawyer portraits
- `CustomCursor` — dot + lagging ring, grows on hover over links/buttons
- `ScrollProgress` — 2px top bar tracking scroll percentage
- `SectionDots` — fixed left column of dots, one per section, active dot filled orange

**hero.jsx**
- `SplashIntro` — full-screen brand intro, fades out after 2.85s
- `Nav` — transparent header (stays transparent at scroll), logo left + hamburger right; fullscreen overlay menu with serif large links
- `DarkHero`, `SplitHero`, `EditorialHero` — three hero treatments dispatched by `theme.heroTreatment`
- `Hero` — dispatcher wrapping SplashIntro + correct hero variant

**sections.jsx**
- `Expertises` — 6 cards in 3×2 grid, hover inverts bg/fg with orange arrow slide
- `Team` — 3 lawyers (random order per load via Fisher-Yates), portrait placeholder + GlowCard scale on hover
- `About` — animated count-up stats (8+, 200+, 3), triggered by IntersectionObserver
- `Articles` — 3 articles with clip-path slide-in reveal
- `Contact` — two-column: contact info + form with inline confirmation
- `Footer` — 4-column grid with navigation, contact, legal

**logos.jsx** — 19 SVG logo variants, each with `render()` and `compact()` functions

**tweaks.jsx**
- `TweaksPanel` — fixed bottom-right panel (dark, 340px wide), grids of theme swatches + logo list
- `LogoShowcase` — fullscreen overlay showing all logos in 2-column grid for comparison

**themes.js** — 12 theme objects: `{ id, name, bg, bgAlt, fg, fgSoft, accent, accentDeep, line, card, serif, sans, mono, heroTreatment }`

### App (index.html inline Babel script)

State: `themeIdx` (0), `logoIdx` (10), `tweaksOpen`, `showcaseOpen`

Persisted to `localStorage` key `ami-tweaks-v3`.

Section render order: Hero → Expertises → Team → About → Articles → Contact → Footer

Fixed UI overlay elements:
- "Prendre rendez-vous →" CTA (vertical, right side, links to #contact)
- "Univers" + "Voir les logos" buttons (right side column)
- Bottom-left info badge (current theme + logo name)
- TweaksPanel (bottom-right, conditional)
- LogoShowcase (fullscreen, conditional)

Keyboard shortcuts: Shift+←/→ = cycle themes, Shift+↑/↓ = cycle logos

## Design Decisions

### Background color
All section backgrounds use `#ff9600` (orange) as the hardcoded override — intentional per user direction. Theme `bg`/`bgAlt` still apply to hero, card backgrounds inside sections, and the splash intro.

### Theme switcher kept
TweaksPanel and LogoShowcase are retained in the implementation (not stripped as production-only artifacts).

### SectionDots order fix
`shared.jsx` currently lists sections as: top, expertises, **apropos, equipe**, articles, contact — but the render order is: top, expertises, **equipe, apropos**, articles, contact. Fix this in the copy.

### Design-tool artifacts removed from index.html
- `<template id="__bundler_thumbnail">` tag
- iframe messaging: `__activate_edit_mode`, `__deactivate_edit_mode` event listeners
- `window.parent.postMessage` calls
- `/*EDITMODE-BEGIN*/` / `/*EDITMODE-END*/` markers (keep the object, strip markers)

## Content

**Lawyers**: Marwan Tahar (Droit des affaires), Thomas Sadaka (Droit immobilier), Simon Roumégoux (Conseil stratégique) — shuffled each page load

**Expertises** (6 cards):
1. Corporate & M&A
2. Développement immobilier
3. Contentieux
4. Baux & Asset Management
5. Entreprises en difficultés
6. Investissement immobilier

**Articles** (3 placeholder): Droit des affaires / Immobilier / Immobilier

**Contact**: contact@ami-avocats.fr · +33 1 23 45 67 89 · 123 Avenue des Champs-Élysées, 75008 Paris

## Fonts

Google Fonts: Cormorant Garamond, Fraunces, Inter Tight, JetBrains Mono, IBM Plex Mono

## Out of scope

- Real photo assets (portrait placeholders remain)
- Backend/form submission (form shows inline confirmation only)
- Individual article pages
- Mobile responsive breakpoints (prototype is desktop-first)
