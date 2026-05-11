# AMI Avocats Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the Claude Design prototype bundle into a clean multi-file project at `C:\Users\thoma\iCloudDrive\Travail\Administratif\Site internet\AMI CODE\`.

**Architecture:** React 18 + Babel standalone (no build step). `index.html` loads six `<script type="text/babel">` asset files. All state lives in the App component in `index.html`; components are exposed on `window.*` by each asset file.

**Tech Stack:** React 18.3.1, Babel standalone 7.29.0, Google Fonts, plain HTML/CSS/JS — no bundler, no package.json.

---

## Source files (read-only, do not modify)

```
C:\Users\thoma\.claude\projects\C--Users-thoma-iCloudDrive-Travail-Administratif-Site-internet-AMI-CODE\5cad3e43-40e4-4237-bdd5-959ec8f32bdf\tool-results\design_extracted\test-animation\project\
```

Referred to below as `$SRC`.

## Target directory

```
C:\Users\thoma\iCloudDrive\Travail\Administratif\Site internet\AMI CODE\
```

Referred to below as `$TARGET`.

---

## Task 1: Create `assets/` directory and copy verbatim files

**Files:**
- Create: `$TARGET\assets\themes.js`
- Create: `$TARGET\assets\logos.jsx`
- Create: `$TARGET\assets\hero.jsx`
- Create: `$TARGET\assets\sections.jsx`
- Create: `$TARGET\assets\tweaks.jsx`

- [ ] **Step 1: Create the assets directory**

```powershell
New-Item -ItemType Directory -Force -Path "C:\Users\thoma\iCloudDrive\Travail\Administratif\Site internet\AMI CODE\assets"
```

- [ ] **Step 2: Copy the five verbatim asset files**

```powershell
$SRC = "C:\Users\thoma\.claude\projects\C--Users-thoma-iCloudDrive-Travail-Administratif-Site-internet-AMI-CODE\5cad3e43-40e4-4237-bdd5-959ec8f32bdf\tool-results\design_extracted\test-animation\project\assets"
$TARGET = "C:\Users\thoma\iCloudDrive\Travail\Administratif\Site internet\AMI CODE\assets"

Copy-Item "$SRC\themes.js"    "$TARGET\themes.js"
Copy-Item "$SRC\logos.jsx"    "$TARGET\logos.jsx"
Copy-Item "$SRC\hero.jsx"     "$TARGET\hero.jsx"
Copy-Item "$SRC\sections.jsx" "$TARGET\sections.jsx"
Copy-Item "$SRC\tweaks.jsx"   "$TARGET\tweaks.jsx"
```

- [ ] **Step 3: Verify all five files exist and are non-empty**

```powershell
Get-ChildItem "C:\Users\thoma\iCloudDrive\Travail\Administratif\Site internet\AMI CODE\assets" | Select-Object Name, Length
```

Expected output: five files, all with `Length > 0`:
```
Name          Length
----          ------
hero.jsx      ...
logos.jsx     ...
sections.jsx  ...
themes.js     ...
tweaks.jsx    ...
```

---

## Task 2: Create `assets/shared.jsx` with SectionDots order fix

**Files:**
- Create: `$TARGET\assets\shared.jsx`

The source `shared.jsx` has the SectionDots section list in wrong order (`apropos` before `equipe`), but the App renders Expertises → **Équipe → À propos** → Articles → Contact. Fix only those two lines.

- [ ] **Step 1: Copy shared.jsx from source**

```powershell
$SRC = "C:\Users\thoma\.claude\projects\C--Users-thoma-iCloudDrive-Travail-Administratif-Site-internet-AMI-CODE\5cad3e43-40e4-4237-bdd5-959ec8f32bdf\tool-results\design_extracted\test-animation\project\assets"
Copy-Item "$SRC\shared.jsx" "C:\Users\thoma\iCloudDrive\Travail\Administratif\Site internet\AMI CODE\assets\shared.jsx"
```

- [ ] **Step 2: Fix SectionDots section order**

Open `$TARGET\assets\shared.jsx`. Find the `sections` array inside `SectionDots` (around line 147–154). It currently reads:

```javascript
  const sections = [
    { id: 'top',        label: 'Accueil' },
    { id: 'expertises', label: 'Expertises' },
    { id: 'apropos',    label: 'À propos' },
    { id: 'equipe',     label: 'Équipe' },
    { id: 'articles',   label: 'Articles' },
    { id: 'contact',    label: 'Contact' },
  ];
```

Replace with (swap `apropos` and `equipe`):

```javascript
  const sections = [
    { id: 'top',        label: 'Accueil' },
    { id: 'expertises', label: 'Expertises' },
    { id: 'equipe',     label: 'Équipe' },
    { id: 'apropos',    label: 'À propos' },
    { id: 'articles',   label: 'Articles' },
    { id: 'contact',    label: 'Contact' },
  ];
```

- [ ] **Step 3: Verify the fix**

```powershell
Select-String -Path "C:\Users\thoma\iCloudDrive\Travail\Administratif\Site internet\AMI CODE\assets\shared.jsx" -Pattern "equipe|apropos" | Select-Object LineNumber, Line
```

Expected: `equipe` line appears **before** `apropos` line.

---

## Task 3: Create `index.html`

**Files:**
- Create: `$TARGET\index.html`

This is the main entry point. It is based on `AMI Avocats.html` from the source with three categories of changes:
1. Remove the `<template id="__bundler_thumbnail">` block (design-tool artifact)
2. Remove the two `useEffect` calls that post messages to a parent iframe (`__activate_edit_mode`, `window.parent.postMessage`) (design-tool artifact)
3. Strip `/*EDITMODE-BEGIN*/` / `/*EDITMODE-END*/` comment markers from `TWEAK_DEFAULTS` (keep the object)
4. Update `localStorage` key from `ami-tweaks-v2` → `ami-tweaks-v3`
5. Remove `?v=2` version query from `themes.js` script src

Write the following complete file to `$TARGET\index.html`:

- [ ] **Step 1: Write `index.html`**

Write this exact content to `C:\Users\thoma\iCloudDrive\Travail\Administratif\Site internet\AMI CODE\index.html`:

```html
<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AMI Avocats</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #000; }
  body { font-family: "Inter Tight", sans-serif; }
  ::selection { background: #E5651A; color: #fff; }
  a { color: inherit; }
  button { font-family: inherit; }
  html { scroll-behavior: smooth; }
  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #00000033; border-radius: 5px; }
</style>
<style>
  #ami-bg-paths { position:fixed; inset:0; z-index:1; pointer-events:none; overflow:hidden; }
  #ami-bg-paths svg { position:absolute; top:0; left:0; width:100%; height:100%; }
  @keyframes ami-path-travel { from { stroke-dashoffset:2; } to { stroke-dashoffset:0; } }
</style>
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
<script src="assets/themes.js"></script>
<script type="text/babel" src="assets/shared.jsx"></script>
<script type="text/babel" src="assets/logos.jsx"></script>
<script type="text/babel" src="assets/hero.jsx"></script>
<script type="text/babel" src="assets/sections.jsx"></script>
<script type="text/babel" src="assets/tweaks.jsx"></script>
</head>
<body>
<div id="ami-bg-paths"></div>
<script>
(function(){
  var NS='http://www.w3.org/2000/svg';
  var c=document.getElementById('ami-bg-paths');
  function make(pos){
    var svg=document.createElementNS(NS,'svg');
    svg.setAttribute('viewBox','-420 -200 1150 1150');
    svg.setAttribute('preserveAspectRatio','none');
    svg.setAttribute('fill','none');
    for(var i=0;i<36;i++){
      var x0=-(380-i*5*pos),y0=-(189+i*6),x1=-(312-i*5*pos),y1=216-i*6,
          x2=152-i*5*pos,y2=343-i*6,x3=616-i*5*pos,y3=470-i*6,
          x4=684-i*5*pos,y4=875-i*6;
      var p=document.createElementNS(NS,'path');
      p.setAttribute('d','M'+x0+' '+y0+'C'+x0+' '+y0+' '+x1+' '+y1+' '+x2+' '+y2+'C'+x3+' '+y3+' '+x4+' '+y4+' '+x4+' '+y4);
      p.setAttribute('pathLength','1');
      p.setAttribute('fill','none');
      p.setAttribute('stroke','rgb(148,103,189)');
      p.setAttribute('stroke-width',0.5+i*0.03);
      p.setAttribute('stroke-opacity',0.08+i*0.022);
      p.style.strokeDasharray='1';
      p.style.strokeDashoffset='2';
      p.style.animation='ami-path-travel '+(20+i%11)+'s linear '+(-i*1.3)+'s infinite';
      svg.appendChild(p);
    }
    return svg;
  }
  c.appendChild(make(1));
  c.appendChild(make(-1));
})();
</script>
<div id="root"></div>

<script type="text/babel" data-presets="react">
const TWEAK_DEFAULTS = {
  "themeIdx": 0,
  "logoIdx": 10
};

const App = () => {
  const [themeIdx, setThemeIdx] = React.useState(TWEAK_DEFAULTS.themeIdx);
  const [logoIdx, setLogoIdx] = React.useState(TWEAK_DEFAULTS.logoIdx);
  const [tweaksOpen, setTweaksOpen] = React.useState(false);
  const [showcaseOpen, setShowcaseOpen] = React.useState(false);

  const theme = window.AMI_THEMES[themeIdx];
  const logo = window.LOGO_VARIANTS[logoIdx];

  React.useEffect(() => {
    const saved = localStorage.getItem('ami-tweaks-v3');
    if (saved) {
      try {
        const { themeIdx: ti, logoIdx: li } = JSON.parse(saved);
        if (typeof ti === 'number') setThemeIdx(ti);
        if (typeof li === 'number') setLogoIdx(li);
      } catch(e) {}
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('ami-tweaks-v3', JSON.stringify({ themeIdx, logoIdx }));
  }, [themeIdx, logoIdx]);

  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowRight' && e.shiftKey) setThemeIdx(i => (i + 1) % window.AMI_THEMES.length);
      if (e.key === 'ArrowLeft' && e.shiftKey) setThemeIdx(i => (i - 1 + window.AMI_THEMES.length) % window.AMI_THEMES.length);
      if (e.key === 'ArrowUp' && e.shiftKey) setLogoIdx(i => (i - 1 + window.LOGO_VARIANTS.length) % window.LOGO_VARIANTS.length);
      if (e.key === 'ArrowDown' && e.shiftKey) setLogoIdx(i => (i + 1) % window.LOGO_VARIANTS.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div style={{ background: theme.bg, color: theme.fg, minHeight: '100vh', transition: 'background 500ms ease, color 500ms ease' }}>
      <CustomCursor theme={theme} />
      <ScrollProgress theme={theme} />
      <SectionDots theme={theme} />
      <Nav theme={theme} logo={logo} />
      <Hero theme={theme} logo={logo} />
      <Expertises theme={theme} />
      <Team theme={theme} />
      <About theme={theme} />
      <Articles theme={theme} />
      <Contact theme={theme} />
      <Footer theme={theme} logo={logo} />

      <a href="#contact" style={{
        position: 'fixed', right: 0, bottom: 80,
        zIndex: 39,
        padding: '12px 10px',
        background: theme.accent,
        color: '#fff',
        fontFamily: theme.mono,
        fontSize: 10,
        letterSpacing: 2.5,
        textTransform: 'uppercase',
        textDecoration: 'none',
        writingMode: 'vertical-rl',
        boxShadow: `-4px 0 20px ${theme.accent}44`,
        transition: 'background 200ms',
      }}
        onMouseEnter={e => e.currentTarget.style.background = theme.accentDeep}
        onMouseLeave={e => e.currentTarget.style.background = theme.accent}
      >Prendre rendez-vous →</a>

      <div style={{
        position: 'fixed', top: '50%', right: 16, transform: 'translateY(-50%)',
        zIndex: 40, display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <button onClick={() => setTweaksOpen(o => !o)} style={{
          padding: '14px 10px', background: theme.fg, color: theme.bg,
          border: 'none', cursor: 'pointer', fontFamily: theme.mono, fontSize: 10,
          letterSpacing: 2, textTransform: 'uppercase', writingMode: 'vertical-rl',
        }}>Univers</button>
        <button onClick={() => setShowcaseOpen(true)} style={{
          padding: '14px 10px', background: theme.accent, color: '#fff',
          border: 'none', cursor: 'pointer', fontFamily: theme.mono, fontSize: 10,
          letterSpacing: 2, textTransform: 'uppercase', writingMode: 'vertical-rl',
        }}>Voir les logos</button>
      </div>

      <div style={{
        position: 'fixed', bottom: 16, left: 16, zIndex: 40,
        padding: '10px 14px', background: theme.fg, color: theme.bg,
        fontFamily: theme.mono, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
        display: 'flex', gap: 12, alignItems: 'center',
      }}>
        <span>Univers · {theme.name}</span>
        <span style={{ opacity: .4 }}>·</span>
        <span>Logo · {logo.name}</span>
      </div>

      <TweaksPanel
        themeIdx={themeIdx}
        setThemeIdx={setThemeIdx}
        logoIdx={logoIdx}
        setLogoIdx={setLogoIdx}
        visible={tweaksOpen}
        onClose={() => setTweaksOpen(false)}
      />
      <LogoShowcase
        theme={theme}
        logos={window.LOGO_VARIANTS}
        logoIdx={logoIdx}
        setLogoIdx={setLogoIdx}
        visible={showcaseOpen}
        onClose={() => setShowcaseOpen(false)}
      />
    </div>
  );
};

const mount = () => {
  if (!window.AMI_THEMES || !window.LOGO_VARIANTS || !window.Nav || !window.Hero || !window.About || !window.TweaksPanel || !window.CustomCursor || !window.ScrollProgress || !window.SectionDots) {
    return setTimeout(mount, 50);
  }
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
};
mount();
</script>
</body>
</html>
```

- [ ] **Step 2: Verify index.html exists and the template tag is gone**

```powershell
$content = Get-Content "C:\Users\thoma\iCloudDrive\Travail\Administratif\Site internet\AMI CODE\index.html" -Raw
if ($content -match '__bundler_thumbnail') { Write-Host "FAIL: template tag still present" }
elseif ($content -match 'ami-tweaks-v3') { Write-Host "PASS: index.html clean" }
else { Write-Host "FAIL: localStorage key not updated" }
```

Expected output: `PASS: index.html clean`

- [ ] **Step 3: Verify editmode artifacts are absent**

```powershell
$content = Get-Content "C:\Users\thoma\iCloudDrive\Travail\Administratif\Site internet\AMI CODE\index.html" -Raw
if ($content -match '__activate_edit_mode|EDITMODE-BEGIN|window\.parent\.postMessage') {
  Write-Host "FAIL: editmode artifacts found"
} else {
  Write-Host "PASS: no editmode artifacts"
}
```

Expected output: `PASS: no editmode artifacts`

---

## Task 4: Open in browser and verify

- [ ] **Step 1: Open index.html in the default browser**

```powershell
Start-Process "C:\Users\thoma\iCloudDrive\Travail\Administratif\Site internet\AMI CODE\index.html"
```

> **Note:** The `<script type="text/babel" src="...">` tags require the page to be served over HTTP (not `file://`) because browsers block cross-origin script loads from the filesystem. If the page shows blank or console errors about CORS/script loading, serve it with a local dev server:
>
> ```powershell
> # If Python is available:
> cd "C:\Users\thoma\iCloudDrive\Travail\Administratif\Site internet\AMI CODE"
> python -m http.server 8080
> # Then open: http://localhost:8080
> ```
>
> Or with Node.js `npx serve`:
> ```powershell
> cd "C:\Users\thoma\iCloudDrive\Travail\Administratif\Site internet\AMI CODE"
> npx serve .
> ```

- [ ] **Step 2: Visual checklist**

With the page open, verify each of the following:

| Check | Expected |
|-------|----------|
| Splash screen | AMI + line + avocats in orange fades in, then fades out after ~2.5s |
| Hero | Full-viewport orange (#ff9600) background, giant "AMI avocats" with parallax on scroll |
| Nav | Transparent, logo top-left, 3-line hamburger top-right |
| Hamburger | Click opens fullscreen overlay with 5 nav links in large serif; links turn orange+italic on hover |
| Expertises section | Orange background, 6 cards in 3×2 grid; hover inverts bg/text, orange arrow slides in |
| Équipe section | Orange background, 3 lawyer portraits (random order), names + roles |
| À propos section | Orange background, animated count-up numbers (8+, 200+, 3) when scrolled into view |
| Articles section | Orange background, 3 article cards with clip-path reveal on scroll |
| Contact section | Orange background, two-column: contact info + form |
| Footer | Orange background, 4-column grid |
| CTA | Vertical "Prendre rendez-vous →" bar on right edge |
| Univers button | Right side, click opens TweaksPanel (dark, bottom-right); 12 theme swatches visible |
| Voir les logos | Right side, click opens LogoShowcase fullscreen; 19 logos in 2-column grid |
| Bottom badge | Fixed bottom-left: "Univers · Ambre · Logo · Empilement typographique" |
| Keyboard | Shift+→ cycles themes; Shift+↓ cycles logos |
| Section dots | 6 dots fixed left, active dot fills orange as sections scroll into view |
| Scroll bar | 2px orange line at very top of viewport, fills as you scroll |
| Custom cursor | Small orange dot + lagging ring follows mouse; ring grows on links |

- [ ] **Step 3: Check browser console for errors**

Open DevTools (F12 → Console). Expected: no errors. A Babel warning about `data-plugins` or source maps is acceptable and non-blocking.

If you see a CORS error about loading `assets/*.jsx`, the page must be served over HTTP — see the note in Step 1.

---

## Self-Review

### Spec coverage check

| Spec requirement | Task |
|---|---|
| Multi-file project structure | Task 1 |
| themes.js verbatim copy | Task 1 |
| logos.jsx verbatim copy | Task 1 |
| hero.jsx verbatim copy | Task 1 |
| sections.jsx verbatim copy (with #ff9600) | Task 1 |
| tweaks.jsx verbatim copy | Task 1 |
| shared.jsx with SectionDots fix | Task 2 |
| index.html cleaned of template tag | Task 3 |
| index.html cleaned of editmode artifacts | Task 3 |
| localStorage key → ami-tweaks-v3 | Task 3 |
| themes.js?v=2 → themes.js | Task 3 |
| TweaksPanel kept | Task 3 (kept in App) |
| LogoShowcase kept | Task 3 (kept in App) |
| #ff9600 backgrounds kept | Task 1 (sections.jsx verbatim) |
| Default themeIdx: 0, logoIdx: 10 | Task 3 |
| Browser verification | Task 4 |

All spec requirements covered. No gaps found.
