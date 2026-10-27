import React, { useEffect, useRef, useState, useCallback } from 'react';
import './CinematicHero.css';

const TOTAL_FRAMES = 240;

// Storytelling beats: concise, punchy, vertically centered
const STORY_BEATS = [
  {
    id: 'intro',
    type: 'centered',
    range: [0, 0.16],
    fadeRange: [0.08, 0.16],
    title: 'Vom rohen Mauerwerk zum Meisterwerk.',
    hint: 'Scrollen zum Entdecken ↓',
  },
  {
    id: 'step1',
    type: 'step',
    range: [0.20, 0.40],
    fadeRange: [0.34, 0.40],
    stepNum: '01',
    title: 'Präzise gedämmt.',
    desc: 'Fugendicht verklebte Dämmplatten für maximale Energieeffizienz.',
  },
  {
    id: 'step2',
    type: 'step',
    range: [0.44, 0.64],
    fadeRange: [0.58, 0.64],
    stepNum: '02',
    title: 'Dauerhaft stabil.',
    desc: 'Tiefenverankerte Dübel und reißfestes Armierungsgewebe gegen Risse.',
  },
  {
    id: 'step3',
    type: 'step',
    range: [0.68, 0.82],
    fadeRange: [0.78, 0.82],
    stepNum: '03',
    title: 'Wetterfest geschützt.',
    desc: 'Widerstandsfähiger Edelputz für jahrzehntelange Witterungsbeständigkeit.',
  },
  {
    id: 'final',
    type: 'final',
    range: [0.82, 1.0],
    fadeRange: [0.82, 0.88],
    eyebrow: 'FACHBETRIEB · INGOLSTADT UND UMGEBUNG',
    titleDark: 'Die Fassade.',
    titleGreen: 'Neu gedacht.',
    lead: 'Wärmedämmung und Fassadensanierung. Präzise geplant. Sauber ausgeführt.',
    cta: {
      text: 'Projekt besprechen',
      href: 'https://www.fassaden-pro.de/kontakt/',
    },
  },
];

export default function CinematicHero() {
  const sceneRef = useRef(null);
  const canvasRef = useRef(null);

  const framesRef = useRef(new Array(TOTAL_FRAMES));
  const currentTargetIndexRef = useRef(0);
  const lastDrawnIndexRef = useRef(-1);
  const rafIdRef = useRef(null);
  const idleCallbackIdRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Progressive frame loader
  const loadFrame = useCallback((index) => {
    if (index < 0 || index >= TOTAL_FRAMES) return null;
    if (framesRef.current[index]) return framesRef.current[index];

    const img = new Image();
    img.decoding = 'async';
    const numStr = String(index + 1).padStart(3, '0');
    img.src = `/frames/hero/${numStr}.webp`;

    img.onload = () => {
      if (
        index === currentTargetIndexRef.current ||
        (lastDrawnIndexRef.current === -1 && index === 0)
      ) {
        renderFrame(currentTargetIndexRef.current);
      }
    };

    framesRef.current[index] = img;
    return img;
  }, []);

  // Frame rendering with nearest loaded fallback
  const renderFrame = useCallback((targetIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx || canvas.width === 0 || canvas.height === 0) return;

    let img = framesRef.current[targetIdx];
    if (!img || !img.complete || !img.naturalWidth) {
      let found = -1;
      for (let j = targetIdx; j >= 0; j--) {
        if (framesRef.current[j]?.complete && framesRef.current[j]?.naturalWidth) {
          found = j;
          break;
        }
      }
      if (found === -1) {
        for (let j = targetIdx; j < TOTAL_FRAMES; j++) {
          if (framesRef.current[j]?.complete && framesRef.current[j]?.naturalWidth) {
            found = j;
            break;
          }
        }
      }
      if (found !== -1) {
        img = framesRef.current[found];
      } else {
        return;
      }
    }

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 848;
    const ih = img.naturalHeight || 464;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;

    const isWide = cw / ch > 1.35;
    const alignX = isWide ? 0.52 : 0.5;
    const alignY = 0.5;
    const dx = (cw - dw) * alignX;
    const dy = (ch - dh) * alignY;

    ctx.drawImage(img, dx, dy, dw, dh);
    lastDrawnIndexRef.current = targetIdx;
  }, []);

  // Sharp rendering on Retina/high-DPI screens
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      lastDrawnIndexRef.current = -1;
      renderFrame(currentTargetIndexRef.current);
    }
  }, [renderFrame]);

  // Main scroll handler
  const handleScroll = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const rect = scene.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrollTrack = rect.height - vh;
    if (scrollTrack <= 0) return;

    const p = Math.min(1, Math.max(0, -rect.top / scrollTrack));
    const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(p * TOTAL_FRAMES));
    currentTargetIndexRef.current = frameIdx;

    setScrollProgress(p);

    // Lookahead frame loader
    for (
      let k = Math.max(0, frameIdx - 3);
      k <= Math.min(TOTAL_FRAMES - 1, frameIdx + 14);
      k++
    ) {
      loadFrame(k);
    }

    renderFrame(frameIdx);
  }, [loadFrame, renderFrame]);

  const onScroll = useCallback(() => {
    if (rafIdRef.current) return;
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      handleScroll();
    });
  }, [handleScroll]);

  // Preloading & listeners
  useEffect(() => {
    loadFrame(0);
    loadFrame(TOTAL_FRAMES - 1);

    for (let k = 0; k < TOTAL_FRAMES; k += 10) {
      loadFrame(k);
    }

    let idleIdx = 1;
    function preloadIdleBatch() {
      const batchSize = 6;
      let loaded = 0;
      while (idleIdx < TOTAL_FRAMES && loaded < batchSize) {
        if (!framesRef.current[idleIdx]) {
          loadFrame(idleIdx);
          loaded++;
        }
        idleIdx++;
      }
      if (idleIdx < TOTAL_FRAMES) {
        if ('requestIdleCallback' in window) {
          idleCallbackIdRef.current = requestIdleCallback(preloadIdleBatch);
        } else {
          idleCallbackIdRef.current = setTimeout(preloadIdleBatch, 30);
        }
      }
    }
    const timer = setTimeout(preloadIdleBatch, 80);

    resizeCanvas();
    handleScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });

    return () => {
      clearTimeout(timer);
      if (idleCallbackIdRef.current) {
        if ('cancelIdleCallback' in window) {
          cancelIdleCallback(idleCallbackIdRef.current);
        } else {
          clearTimeout(idleCallbackIdRef.current);
        }
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [loadFrame, resizeCanvas, handleScroll, onScroll]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  // Compute opacity & transform for each beat
  const getBeatStyle = (beat) => {
    const [start, end] = beat.range;
    const p = scrollProgress;

    // Fully out of range
    if (p < start || p > end) {
      return { opacity: 0, pointerEvents: 'none', visibility: 'hidden' };
    }

    // Centered intro at scroll = 0
    if (beat.id === 'intro') {
      if (p <= beat.fadeRange[0]) {
        return { opacity: 1, transform: 'translate(-50%, -50%)', pointerEvents: 'auto' };
      }
      const fadeProg = (p - beat.fadeRange[0]) / (beat.fadeRange[1] - beat.fadeRange[0]);
      const alpha = Math.max(0, 1 - fadeProg);
      return {
        opacity: alpha.toFixed(3),
        transform: `translate(-50%, calc(-50% - ${fadeProg * 18}px))`,
        pointerEvents: alpha > 0.4 ? 'auto' : 'none',
      };
    }

    // Final hero layout (reveals at ~82% and stays)
    if (beat.id === 'final') {
      const fadeInProg = Math.min(1, Math.max(0, (p - beat.fadeRange[0]) / (beat.fadeRange[1] - beat.fadeRange[0])));
      return {
        opacity: fadeInProg.toFixed(3),
        transform: `translateY(${((1 - fadeInProg) * 16).toFixed(1)}px)`,
        pointerEvents: fadeInProg > 0.4 ? 'auto' : 'none',
      };
    }

    // Intermediate concise step beats (fade-in, hold, fade-out)
    const fadeInEnd = start + 0.04;
    const fadeOutStart = beat.fadeRange[0];
    const fadeOutEnd = beat.fadeRange[1];

    if (p < fadeInEnd) {
      const t = (p - start) / (fadeInEnd - start);
      return {
        opacity: t.toFixed(3),
        transform: `translateY(${((1 - t) * 14).toFixed(1)}px)`,
        pointerEvents: t > 0.4 ? 'auto' : 'none',
      };
    } else if (p <= fadeOutStart) {
      return { opacity: 1, transform: 'translateY(0)', pointerEvents: 'auto' };
    } else {
      const t = (p - fadeOutStart) / (fadeOutEnd - fadeOutStart);
      const alpha = Math.max(0, 1 - t);
      return {
        opacity: alpha.toFixed(3),
        transform: `translateY(${(-14 * t).toFixed(1)}px)`,
        pointerEvents: alpha > 0.4 ? 'auto' : 'none',
      };
    }
  };

  return (
    <section className="hero-scene" ref={sceneRef} aria-label="Fassaden Pro Hero">
      <div className="hero-sticky">
        {/* Render Canvas */}
        <canvas
          ref={canvasRef}
          className="hero-canvas"
          aria-label="Cinematische 3D-Verwandlung der Fassadendämmung"
        />

        {/* Global Navigation - Clean & Persistent */}
        <header className="hero-header">
          <a
            className="hero-brand"
            href="https://www.fassaden-pro.de/"
            aria-label="Fassaden Pro GmbH Startseite"
          >
            <svg
              className="hero-roof"
              width="34"
              height="16"
              viewBox="0 0 34 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 14L17 2L32 14"
                stroke="#5f7045"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="hero-brand-text">
              <span className="brand-dark">FASSADEN</span>
              <span className="brand-green">PRO</span>
            </div>
          </a>

          <nav className="hero-nav" aria-label="Hero Hauptnavigation">
            <a href="https://www.fassaden-pro.de/#daemmung">Leistungen</a>
            <a href="https://www.fassaden-pro.de/referenzen/">Referenzen</a>
            <a href="#ueber-uns">Über uns</a>
            <a href="https://www.fassaden-pro.de/#kontakt">Kontakt</a>
          </nav>

          <div className="hero-header-right">
            <a
              className="hero-btn-top"
              href="https://www.fassaden-pro.de/kontakt/"
            >
              <span>Angebot anfordern</span>
              <svg
                className="btn-arrow"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <button
              className={`hero-menu-toggle ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={menuOpen}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </header>

        {/* 1. STARTING TEXT: Centered Vertically AND Horizontally */}
        <div
          className="story-intro-centered"
          style={getBeatStyle(STORY_BEATS[0])}
        >
          <h1 className="intro-title">{STORY_BEATS[0].title}</h1>
          <div className="intro-scroll-hint">
            <span className="hint-arrow">↓</span>
            <span>Scrollen zum Entdecken</span>
          </div>
        </div>

        {/* 2. STORYTELLING & FINAL BEATS: Vertically Centered */}
        <div className="hero-story-container">
          {/* Intermediate Steps: Punchy, No Clutter */}
          {STORY_BEATS.filter((b) => b.type === 'step').map((beat) => (
            <div
              key={beat.id}
              className="story-beat-card"
              style={getBeatStyle(beat)}
            >
              <div className="beat-step-pill">{beat.stepNum}</div>
              <h2 className="beat-title">{beat.title}</h2>
              <p className="beat-desc">{beat.desc}</p>
            </div>
          ))}

          {/* Final Hero: Mockup Exact Match */}
          {(() => {
            const finalBeat = STORY_BEATS.find((b) => b.type === 'final');
            return (
              <div
                key={finalBeat.id}
                className="story-final-card"
                style={getBeatStyle(finalBeat)}
              >
                <div className="final-eyebrow">{finalBeat.eyebrow}</div>
                <h1 className="final-title">
                  <span className="title-dark">{finalBeat.titleDark}</span>
                  <br />
                  <span className="title-green">{finalBeat.titleGreen}</span>
                </h1>
                <p className="final-lead">{finalBeat.lead}</p>
                <div className="hero-cta-wrap">
                  <a className="hero-btn-main" href={finalBeat.cta.href}>
                    <span>{finalBeat.cta.text}</span>
                    <svg
                      className="btn-arrow"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Minimal Progress Indicator (Bottom Right) */}
        <div className="hero-progress-pill">
          <span className="step-label">
            {scrollProgress < 0.18
              ? 'Start'
              : scrollProgress < 0.42
              ? '01 · Dämmung'
              : scrollProgress < 0.66
              ? '02 · Armierung'
              : scrollProgress < 0.82
              ? '03 · Putz'
              : 'Fertigstellung'}
          </span>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`hero-mobile-drawer ${menuOpen ? 'open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <div className="hero-drawer-inner">
            <nav className="hero-drawer-nav">
              <a
                href="https://www.fassaden-pro.de/#daemmung"
                className="drawer-link"
                onClick={() => setMenuOpen(false)}
              >
                Leistungen
              </a>
              <a
                href="https://www.fassaden-pro.de/referenzen/"
                className="drawer-link"
                onClick={() => setMenuOpen(false)}
              >
                Referenzen
              </a>
              <a
                href="#ueber-uns"
                className="drawer-link"
                onClick={() => setMenuOpen(false)}
              >
                Über uns
              </a>
              <a
                href="https://www.fassaden-pro.de/#kontakt"
                className="drawer-link"
                onClick={() => setMenuOpen(false)}
              >
                Kontakt
              </a>
              <a href="tel:+4917624375915" className="drawer-link tel">
                0176 24375915
              </a>
            </nav>
            <div className="hero-drawer-footer">
              <a
                className="hero-btn-main drawer-btn"
                href="https://www.fassaden-pro.de/kontakt/"
                onClick={() => setMenuOpen(false)}
              >
                <span>Angebot anfordern</span>
                <svg
                  className="btn-arrow"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
