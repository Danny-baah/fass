import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update <head> with preloads and CSS variables
old_head = """<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&display=swap" rel="stylesheet">
<style>
:root{
  --blue:#003796; --blue-ink:#003796; --btn-bg:#003796; --btn-fg:#ffffff;"""

new_head = """<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..850&display=swap" rel="stylesheet">
<link rel="preload" as="image" href="frames/hero/001.webp" type="image/webp">
<link rel="preload" as="image" href="frames/hero/240.webp" type="image/webp">
<style>
:root{
  --sage:#5f7045; --sage-dark:#4f6037; --sage-light:#748956;
  --charcoal:#1b2628; --charcoal-soft:#2c3538;
  --blue:#5f7045; --blue-ink:#5f7045; --btn-bg:#5f7045; --btn-fg:#ffffff;"""

assert old_head in content, "old_head not found"
content = content.replace(old_head, new_head, 1)

# 2. Add hero styles
hero_css = """
/* ==========================================================================
   CINEMATIC SCROLL HERO STYLES (Mockup Exact Match)
   ========================================================================== */
.hero-scene {
  position: relative;
  height: 400vh; /* Smooth cinematic scrub distance */
  width: 100%;
  background: #dedede;
}

.hero-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  width: 100%;
  overflow: hidden;
  z-index: 30;
  background: #dedede;
}

.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0;
  transform: translateY(18px);
  will-change: opacity, transform;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
}

.hero-header {
  max-width: 1380px;
  width: 100%;
  margin: 0 auto;
  padding: clamp(1.4rem, 3.2vw, 2.4rem) clamp(1.25rem, 4.5vw, 3.5rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.hero-brand {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  text-decoration: none;
  pointer-events: auto;
}

.hero-roof {
  display: block;
  overflow: visible;
}

.hero-brand-text {
  font-family: 'Archivo', system-ui, sans-serif;
  font-stretch: 84%;
  font-weight: 850;
  font-size: clamp(1.35rem, 2.1vw, 1.7rem);
  letter-spacing: -0.015em;
  line-height: 1;
}

.hero-brand-text .brand-dark {
  color: #1b2628;
}

.hero-brand-text .brand-green {
  color: #5f7045;
  margin-left: 0.28rem;
}

.hero-nav {
  display: flex;
  align-items: center;
  gap: clamp(1.8rem, 2.8vw, 3.2rem);
  margin-left: auto;
  margin-right: clamp(1.5rem, 2.5vw, 3rem);
}

.hero-nav a {
  color: #242b2e;
  text-decoration: none;
  font-size: 1.02rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: color 0.18s ease;
  pointer-events: auto;
}

.hero-nav a:hover {
  color: #5f7045;
}

.hero-header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hero-btn-top {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: #5f7045;
  color: #ffffff !important;
  text-decoration: none;
  font-weight: 650;
  font-size: 0.98rem;
  padding: 0.65rem 1.45rem;
  border-radius: 6px;
  transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  pointer-events: auto;
  box-shadow: 0 4px 14px rgba(95, 112, 69, 0.25);
  white-space: nowrap;
}

.hero-btn-top:hover {
  background: #4f6037;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(95, 112, 69, 0.35);
}

.btn-arrow {
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.hero-btn-top:hover .btn-arrow,
.hero-btn-main:hover .btn-arrow {
  transform: translateX(4px);
}

.hero-body {
  max-width: 1380px;
  width: 100%;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4.5vw, 3.5rem) clamp(3rem, 7vw, 6rem);
  flex: 1;
  display: flex;
  align-items: center;
}

.hero-copy-wrap {
  max-width: 36rem;
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 1.8vw, 1.5rem);
}

.hero-eyebrow {
  color: #5f7045;
  font-size: clamp(0.82rem, 1.05vw, 0.95rem);
  font-weight: 780;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-title {
  font-family: 'Archivo', system-ui, sans-serif;
  font-stretch: 80%;
  font-weight: 850;
  line-height: 1.04;
  letter-spacing: -0.02em;
  font-size: clamp(2.8rem, 5.8vw, 4.8rem);
  margin: 0;
}

.hero-title .title-dark {
  color: #1b2628;
}

.hero-title .title-green {
  color: #5f7045;
}

.hero-lead {
  font-size: clamp(1.1rem, 1.6vw, 1.28rem);
  line-height: 1.5;
  color: #434c52;
  font-weight: 500;
  margin: 0;
}

.hero-cta-wrap {
  margin-top: 0.35rem;
}

.hero-btn-main {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  background: #5f7045;
  color: #ffffff !important;
  text-decoration: none;
  font-weight: 650;
  font-size: 1.08rem;
  padding: 0.85rem 1.95rem;
  border-radius: 6px;
  transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  pointer-events: auto;
  box-shadow: 0 6px 22px rgba(95, 112, 69, 0.28);
}

.hero-btn-main:hover {
  background: #4f6037;
  transform: translateY(-1px);
  box-shadow: 0 8px 28px rgba(95, 112, 69, 0.38);
}

/* Scroll Cue */
.hero-scroll-cue {
  position: absolute;
  bottom: clamp(1.2rem, 3.2vh, 2.2rem);
  left: 50%;
  transform: translateX(-50%);
  z-index: 25;
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.cue-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 1.25rem;
  border-radius: 999px;
  background: rgba(27, 38, 40, 0.82);
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 650;
  letter-spacing: 0.02em;
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.cue-bounce {
  animation: cueDown 1.7s ease-in-out infinite;
}

@keyframes cueDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(5px); }
}

/* Mobile Hamburger & Drawer */
.hero-menu-toggle {
  display: none;
}

.hero-mobile-drawer {
  position: fixed;
  inset: 0;
  background: rgba(15, 20, 22, 0.95);
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem 2rem;
}

.hero-mobile-drawer.open {
  opacity: 1;
  pointer-events: auto;
}

.hero-drawer-inner {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 24rem;
  margin: 0 auto;
  width: 100%;
}

.hero-drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.drawer-link {
  color: #ECEEF0;
  text-decoration: none;
  font-size: 1.45rem;
  font-weight: 700;
  font-stretch: 80%;
  transition: color 0.15s ease;
}

.drawer-link:hover {
  color: #748956;
}

.drawer-link.tel {
  font-size: 1.15rem;
  color: #A3AAB1;
}

.drawer-btn {
  width: 100%;
  justify-content: center;
}

/* Global Head Smooth Slide-in when leaving hero */
#globalHead {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--surface);
  border-bottom: 1px solid var(--line);
  height: var(--head);
  transform: translateY(-100%);
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

#globalHead.visible {
  transform: translateY(0);
  pointer-events: auto;
}

/* Responsive adjustments */
@media (max-width: 900px) {
  .hero-nav {
    display: none;
  }
  .hero-btn-top {
    display: none;
  }
  .hero-menu-toggle {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 38px;
    height: 38px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 6px;
    pointer-events: auto;
  }
  .hero-menu-toggle .bar {
    width: 100%;
    height: 2.5px;
    background: #1b2628;
    border-radius: 2px;
    transition: all 0.25s ease;
  }
  .hero-menu-toggle.open .bar {
    background: #ffffff;
  }
  .hero-menu-toggle.open .bar:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }
  .hero-menu-toggle.open .bar:nth-child(2) {
    opacity: 0;
  }
  .hero-menu-toggle.open .bar:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }

  .hero-copy-wrap {
    max-width: 100%;
    background: rgba(243, 244, 245, 0.88);
    -webkit-backdrop-filter: blur(18px);
    backdrop-filter: blur(18px);
    padding: 1.4rem 1.3rem;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow: 0 10px 36px rgba(0, 0, 0, 0.09);
  }
  .hero-body {
    align-items: flex-end;
    padding-bottom: clamp(1.8rem, 4vh, 2.8rem);
  }
}
"""

# Insert hero styles before </style>
content = content.replace("</style>", hero_css + "\n</style>", 1)

# 3. Insert Hero HTML and update global header
hero_html = """<!-- CINEMATIC SCROLL HERO -->
<section class="hero-scene" id="heroScene" aria-label="Fassaden Pro Hero">
  <div class="hero-sticky" id="heroSticky">
    <canvas id="heroCanvas" class="hero-canvas" aria-label="Cinematische 3D-Verwandlung der Fassadendämmung"></canvas>

    <!-- Final Hero Overlay (Matches Mockup Reference) -->
    <div class="hero-overlay" id="heroOverlay">
      <!-- Desktop & Mobile Top Bar -->
      <header class="hero-header" id="heroHeader">
        <a class="hero-brand" href="https://www.fassaden-pro.de/" aria-label="Fassaden Pro GmbH Startseite">
          <svg class="hero-roof" width="34" height="16" viewBox="0 0 34 16" fill="none" aria-hidden="true">
            <path d="M2 14L17 2L32 14" stroke="#5f7045" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="hero-brand-text">
            <span class="brand-dark">FASSADEN</span><span class="brand-green">PRO</span>
          </div>
        </a>

        <nav class="hero-nav" aria-label="Hero Hauptnavigation">
          <a href="#daemmung">Leistungen</a>
          <a href="https://www.fassaden-pro.de/referenzen/">Referenzen</a>
          <a href="#sanierung">Über uns</a>
          <a href="#kontakt">Kontakt</a>
        </nav>

        <div class="hero-header-right">
          <a class="hero-btn-top" href="https://www.fassaden-pro.de/kontakt/">
            <span>Angebot anfordern</span>
            <svg class="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <button class="hero-menu-toggle" id="heroMenuToggle" aria-label="Menü öffnen" aria-expanded="false">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>
        </div>
      </header>

      <!-- Main Copy Block -->
      <div class="hero-body">
        <div class="hero-copy-wrap">
          <div class="hero-eyebrow">FACHBETRIEB · INGOLSTADT UND UMGEBUNG</div>
          <h1 class="hero-title">
            <span class="title-dark">Die Fassade.</span><br>
            <span class="title-green">Neu gedacht.</span>
          </h1>
          <p class="hero-lead">
            Wärmedämmung und Fassadensanierung.<br>
            Präzise geplant. Sauber ausgeführt.
          </p>
          <div class="hero-cta-wrap">
            <a class="hero-btn-main" href="https://www.fassaden-pro.de/kontakt/">
              <span>Projekt besprechen</span>
              <svg class="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div class="hero-mobile-drawer" id="heroMobileDrawer" aria-hidden="true">
        <div class="hero-drawer-inner">
          <nav class="hero-drawer-nav">
            <a href="#daemmung" class="drawer-link">Leistungen</a>
            <a href="https://www.fassaden-pro.de/referenzen/" class="drawer-link">Referenzen</a>
            <a href="#sanierung" class="drawer-link">Über uns</a>
            <a href="#kontakt" class="drawer-link">Kontakt</a>
            <a href="tel:+4917624375915" class="drawer-link tel">0176 24375915</a>
          </nav>
          <div class="hero-drawer-footer">
            <a class="hero-btn-main drawer-btn" href="https://www.fassaden-pro.de/kontakt/">
              <span>Angebot anfordern</span>
              <svg class="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Initial Scroll Cue -->
    <div class="hero-scroll-cue" id="heroScrollCue">
      <div class="cue-pill">
        <svg class="cue-bounce" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
        <span>Scrollen für Verwandlung</span>
      </div>
    </div>
  </div>
</section>

<header class="head" id="globalHead">
  <div class="head-in">
    <a class="brand" href="https://www.fassaden-pro.de/" aria-label="Fassaden Pro GmbH, zur Startseite">
      <svg width="28" height="14" viewBox="0 0 34 16" fill="none" aria-hidden="true">
        <path d="M2 14L17 2L32 14" stroke="#5f7045" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span style="font-family:'Archivo',sans-serif;font-weight:850;font-stretch:82%">
        <span style="color:#1b2628">FASSADEN</span><span style="color:#5f7045;margin-left:3px">PRO</span>
      </span>
    </a>
    <nav class="nav" aria-label="Hauptnavigation">
      <a href="#daemmung">Leistungen</a>
      <a href="https://www.fassaden-pro.de/referenzen/">Referenzen</a>
      <a href="#sanierung">Über uns</a>
      <a href="#kontakt">Kontakt</a>
    </nav>
    <a class="tel" href="tel:+4917624375915">0176 24375915</a>
    <a class="btn hero-btn-top" style="padding:.5rem 1.15rem;min-height:38px;box-shadow:none" href="https://www.fassaden-pro.de/kontakt/">
      <span>Angebot anfordern</span>
      <svg class="btn-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
  </div>
</header>
"""

# Replace existing <header class="head">...</header>
old_header_pattern = re.compile(r'<header class="head">.*?</header>', re.DOTALL)
assert old_header_pattern.search(content), "old_header not found"
content = old_header_pattern.sub(hero_html, content, count=1)

# 4. Change h1 in #daemmung to h2 to preserve canonical single h1 in hero
content = content.replace('<h1 id="h-wdvs">Fassadendämmung in Ingolstadt. Schicht für Schicht.</h1>', '<h2 id="h-wdvs">Fassadendämmung in Ingolstadt. Schicht für Schicht.</h2>', 1)

# 5. Add Hero Controller Script
hero_script = """
  /* ==========================================================================
     CINEMATIC SCROLL HERO CONTROLLER (240 Optimized Frames)
     ========================================================================== */
  const HERO_FRAMES_COUNT = 240;
  const heroFrames = new Array(HERO_FRAMES_COUNT);
  const heroCanvas = document.getElementById('heroCanvas');
  const heroScene = document.getElementById('heroScene');
  const heroOverlay = document.getElementById('heroOverlay');
  const heroScrollCue = document.getElementById('heroScrollCue');
  const globalHead = document.getElementById('globalHead');
  const heroMenuToggle = document.getElementById('heroMenuToggle');
  const heroMobileDrawer = document.getElementById('heroMobileDrawer');
  const heroCtx = heroCanvas ? heroCanvas.getContext('2d') : null;

  let currentTargetIndex = 0;
  let lastDrawnIndex = -1;

  function loadHeroFrame(index) {
    if (index < 0 || index >= HERO_FRAMES_COUNT) return null;
    if (heroFrames[index]) return heroFrames[index];
    const img = new Image();
    img.decoding = 'async';
    const numStr = String(index + 1).padStart(3, '0');
    img.src = `frames/hero/${numStr}.webp`;
    img.onload = () => {
      if (index === currentTargetIndex || (lastDrawnIndex === -1 && index === 0)) {
        renderHeroFrame(currentTargetIndex);
      }
    };
    heroFrames[index] = img;
    return img;
  }

  // Wave 1: Immediate load of frame 0 (start) and 239 (end)
  loadHeroFrame(0);
  loadHeroFrame(HERO_FRAMES_COUNT - 1);

  // Wave 2: Staged keyframe distribution
  for (let k = 0; k < HERO_FRAMES_COUNT; k += 10) {
    loadHeroFrame(k);
  }

  // Wave 3: Idle background loading
  let idleIdx = 1;
  function preloadIdleBatch() {
    const batchSize = 6;
    let loadedCount = 0;
    while (idleIdx < HERO_FRAMES_COUNT && loadedCount < batchSize) {
      if (!heroFrames[idleIdx]) {
        loadHeroFrame(idleIdx);
        loadedCount++;
      }
      idleIdx++;
    }
    if (idleIdx < HERO_FRAMES_COUNT) {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(preloadIdleBatch);
      } else {
        setTimeout(preloadIdleBatch, 25);
      }
    }
  }
  setTimeout(preloadIdleBatch, 80);

  function resizeHeroCanvas() {
    if (!heroCanvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = heroCanvas.getBoundingClientRect();
    const w = Math.round(r.width * dpr);
    const h = Math.round(r.height * dpr);
    if (heroCanvas.width !== w || heroCanvas.height !== h) {
      heroCanvas.width = w;
      heroCanvas.height = h;
      lastDrawnIndex = -1;
      renderHeroFrame(currentTargetIndex);
    }
  }

  function renderHeroFrame(targetIdx) {
    if (!heroCtx || !heroCanvas || heroCanvas.width === 0 || heroCanvas.height === 0) return;

    let img = heroFrames[targetIdx];
    if (!img || !img.complete || !img.naturalWidth) {
      // Find nearest loaded frame backward then forward
      let found = -1;
      for (let j = targetIdx; j >= 0; j--) {
        if (heroFrames[j] && heroFrames[j].complete && heroFrames[j].naturalWidth) {
          found = j;
          break;
        }
      }
      if (found === -1) {
        for (let j = targetIdx; j < HERO_FRAMES_COUNT; j++) {
          if (heroFrames[j] && heroFrames[j].complete && heroFrames[j].naturalWidth) {
            found = j;
            break;
          }
        }
      }
      if (found !== -1) {
        img = heroFrames[found];
      } else {
        return;
      }
    }

    const cw = heroCanvas.width;
    const ch = heroCanvas.height;
    const iw = img.naturalWidth || 848;
    const ih = img.naturalHeight || 464;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;

    // Aspect ratio cover with center-right bias for wide viewports
    const isWide = (cw / ch) > 1.35;
    const alignX = isWide ? 0.52 : 0.5;
    const alignY = 0.5;
    const dx = (cw - dw) * alignX;
    const dy = (ch - dh) * alignY;

    heroCtx.drawImage(img, dx, dy, dw, dh);
    lastDrawnIndex = targetIdx;
  }

  function updateHeroScroll() {
    if (!heroScene) return;
    const r = heroScene.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrollTrack = r.height - vh;
    if (scrollTrack <= 0) return;

    // Normalized progress 0 to 1
    const p = Math.min(1, Math.max(0, -r.top / scrollTrack));

    // Target frame mapping
    const frameIdx = Math.min(HERO_FRAMES_COUNT - 1, Math.floor(p * HERO_FRAMES_COUNT));
    currentTargetIndex = frameIdx;

    // Dynamic lookahead preloading
    for (let k = Math.max(0, frameIdx - 3); k <= Math.min(HERO_FRAMES_COUNT - 1, frameIdx + 12); k++) {
      loadHeroFrame(k);
    }

    renderHeroFrame(frameIdx);

    // Final Hero Overlay transition
    if (heroOverlay) {
      if (reduce) {
        heroOverlay.style.opacity = '1';
        heroOverlay.style.transform = 'none';
        heroOverlay.style.pointerEvents = 'auto';
      } else if (p < 0.70) {
        heroOverlay.style.opacity = '0';
        heroOverlay.style.transform = 'translateY(22px)';
        heroOverlay.style.pointerEvents = 'none';
      } else {
        const t = Math.min(1, Math.max(0, (p - 0.70) / 0.24));
        heroOverlay.style.opacity = t.toFixed(3);
        heroOverlay.style.transform = `translateY(${((1 - t) * 18).toFixed(1)}px)`;
        heroOverlay.style.pointerEvents = t > 0.6 ? 'auto' : 'none';
      }
    }

    // Scroll Cue visibility
    if (heroScrollCue) {
      if (reduce) {
        heroScrollCue.style.display = 'none';
      } else if (p < 0.04) {
        const cueAlpha = 1 - (p / 0.04);
        heroScrollCue.style.opacity = cueAlpha.toFixed(2);
        heroScrollCue.style.pointerEvents = cueAlpha > 0.5 ? 'auto' : 'none';
      } else {
        heroScrollCue.style.opacity = '0';
        heroScrollCue.style.pointerEvents = 'none';
      }
    }

    // Global Head visibility when passing the hero scene
    if (globalHead) {
      if (r.bottom <= 0) {
        globalHead.classList.add('visible');
      } else {
        globalHead.classList.remove('visible');
      }
    }
  }

  // Mobile menu drawer
  if (heroMenuToggle && heroMobileDrawer) {
    heroMenuToggle.addEventListener('click', () => {
      const isOpen = heroMobileDrawer.classList.toggle('open');
      heroMenuToggle.classList.toggle('open', isOpen);
      heroMenuToggle.setAttribute('aria-expanded', String(isOpen));
      heroMobileDrawer.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    heroMobileDrawer.querySelectorAll('.drawer-link, .drawer-btn').forEach(l => {
      l.addEventListener('click', () => {
        heroMobileDrawer.classList.remove('open');
        heroMenuToggle.classList.remove('open');
        heroMenuToggle.setAttribute('aria-expanded', 'false');
        heroMobileDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && heroMobileDrawer.classList.contains('open')) {
        heroMobileDrawer.classList.remove('open');
        heroMenuToggle.classList.remove('open');
        heroMenuToggle.setAttribute('aria-expanded', 'false');
        heroMobileDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  resizeHeroCanvas();
  updateHeroScroll();
  window.addEventListener('resize', () => {
    resizeHeroCanvas();
    updateHeroScroll();
  }, { passive: true });
"""

# Insert hero script inside the (function(){ ... })(); block
content = content.replace("tick();", "tick();\n" + hero_script, 1)

# Also ensure tick() calls updateHeroScroll()
content = content.replace("scenes.forEach(render);", "scenes.forEach(render); updateHeroScroll();", 1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("index.html updated successfully!")
