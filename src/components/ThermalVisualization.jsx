import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ThermalVisualization.css';

const TOTAL_THERMAL_FRAMES = 78;

export default function ThermalVisualization() {
  const sceneRef = useRef(null);
  const canvasRef = useRef(null);

  const framesRef = useRef(new Array(TOTAL_THERMAL_FRAMES));
  const currentTargetIndexRef = useRef(0);
  const lastDrawnIndexRef = useRef(-1);
  const rafIdRef = useRef(null);
  const idleCallbackIdRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Progressive frame loader
  const loadFrame = useCallback((index) => {
    if (index < 0 || index >= TOTAL_THERMAL_FRAMES) return null;
    if (framesRef.current[index]) return framesRef.current[index];

    const img = new Image();
    img.decoding = 'async';
    const numStr = String(index + 1).padStart(3, '0');
    img.src = `/frames/waerme/${numStr}.webp`;

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

  // Frame rendering with nearest-loaded fallback
  const renderFrame = useCallback((targetIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx || canvas.width === 0 || canvas.height === 0) return;

    let img = framesRef.current[targetIdx];
    if (!img || !img.complete || !img.naturalWidth) {
      // Find nearest loaded frame
      let found = -1;
      for (let j = targetIdx; j >= 0; j--) {
        if (framesRef.current[j]?.complete && framesRef.current[j]?.naturalWidth) {
          found = j;
          break;
        }
      }
      if (found === -1) {
        for (let j = targetIdx; j < TOTAL_THERMAL_FRAMES; j++) {
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
    const iw = img.naturalWidth || 720;
    const ih = img.naturalHeight || 1280;

    // Cover mode: fill the entire canvas, centered
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;

    const dx = (cw - dw) * 0.5;
    const dy = (ch - dh) * 0.5;

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

  // Main scroll handler with pinning calculations
  const handleScroll = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const rect = scene.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrollTrack = rect.height - vh;
    if (scrollTrack <= 0) return;

    // Normalized progress 0 to 1
    const p = Math.min(1, Math.max(0, -rect.top / scrollTrack));
    const frameIdx = Math.min(TOTAL_THERMAL_FRAMES - 1, Math.floor(p * TOTAL_THERMAL_FRAMES));
    currentTargetIndexRef.current = frameIdx;

    setScrollProgress(p);

    // Lookahead frame loader
    for (
      let k = Math.max(0, frameIdx - 3);
      k <= Math.min(TOTAL_THERMAL_FRAMES - 1, frameIdx + 8);
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

  // Progressive preloading waves & window event listeners
  useEffect(() => {
    // Wave 1: Immediate first and final frame
    loadFrame(0);
    loadFrame(TOTAL_THERMAL_FRAMES - 1);

    // Wave 2: Staged keyframe distribution
    for (let k = 0; k < TOTAL_THERMAL_FRAMES; k += 6) {
      loadFrame(k);
    }

    // Wave 3: Idle batching
    let idleIdx = 1;
    function preloadIdleBatch() {
      const batchSize = 6;
      let loaded = 0;
      while (idleIdx < TOTAL_THERMAL_FRAMES && loaded < batchSize) {
        if (!framesRef.current[idleIdx]) {
          loadFrame(idleIdx);
          loaded++;
        }
        idleIdx++;
      }
      if (idleIdx < TOTAL_THERMAL_FRAMES) {
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

  return (
    <section
      className="thermal-scene"
      ref={sceneRef}
      id="daemmung"
      aria-label="Wärmebild-Visualisierung der Fassadendämmung"
    >
      <div className="thermal-sticky">
        {/* Left Column: Stable Editorial Content */}
        <div className="thermal-content-col">
          <div className="thermal-content-inner">
            {/* Eyebrow with horizontal dash */}
            <div className="thermal-eyebrow">
              <span className="eyebrow-dash" aria-hidden="true" />
              <span>UNSERE LEISTUNGEN</span>
            </div>

            {/* Main Headline (Mockup Exact Match) */}
            <h2 className="thermal-title">
              Die Wärme<br />
              <span className="thermal-title-highlight">bleibt im Haus.</span>
            </h2>

            {/* Supporting Copy */}
            <p className="thermal-lead">
              Auf dem Wärmebild sieht man es sofort: Ungedämmte Wände geben viel Wärme nach außen ab. Nach der Dämmung bleibt sie drinnen, und die Heizung muss weniger leisten.
            </p>

            {/* Dynamic Heat-loss & Energy Cost Percentage Bar */}
            {(() => {
              const currentPercentage = Math.round(100 - (scrollProgress * 80));
              const currentCost = Math.round(100 - (scrollProgress * 80));
              const currentSavings = 100 - currentCost;

              return (
                <div className="thermal-progress-card" aria-label="Wärmeverlust und Heizkosten-Ersparnis">
                  <div className="progress-card-top">
                    <span className="progress-card-title">Wärmeverlust der Fassade</span>
                    <span
                      className="progress-card-pct"
                      style={{
                        color: currentPercentage > 55 ? '#c9452b' : '#46553b',
                      }}
                    >
                      {currentPercentage}%
                    </span>
                  </div>

                  {/* Percentage Bar reducing on scroll */}
                  <div
                    className="progress-bar-track"
                    role="progressbar"
                    aria-valuenow={currentPercentage}
                    aria-valuemin="20"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${currentPercentage}%`,
                        background:
                          currentPercentage > 60
                            ? 'linear-gradient(90deg, #f59e0b 0%, #e81f3d 100%)'
                            : currentPercentage > 35
                            ? 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)'
                            : 'linear-gradient(90deg, #3b82f6 0%, #556749 100%)',
                      }}
                    />
                  </div>

                  {/* Dynamic Cost under the bar reducing from 100€ to 20€ */}
                  <div className="progress-cost-row">
                    <div className="cost-box">
                      <div className="cost-amount">
                        <span className="cost-number">{currentCost} €</span>
                        <span className="cost-freq">/ m² Heizaufwand</span>
                      </div>
                      <span className="cost-status-tag">
                        {currentPercentage > 65
                          ? 'Ungedämmt (Hoher Verlust)'
                          : currentPercentage > 35
                          ? 'In Sanierung'
                          : 'Optimal gedämmt'}
                      </span>
                    </div>

                    {currentSavings > 0 && (
                      <div className="savings-badge">
                        <span>-{currentSavings} € Ersparnis</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Call to Action Pill Button */}
            <div className="thermal-cta-wrap">
              <a
                className="thermal-btn-cta"
                href="https://www.fassaden-pro.de/kontakt/"
              >
                <span>Mögliche Ersparnis berechnen</span>
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
        </div>

        {/* Right Column: Scroll-Driven Thermal House Visualization */}
        <div className="thermal-visual-col">
          {/* Canvas rendering the 78 video frames */}
          <canvas
            ref={canvasRef}
            className="thermal-canvas"
            aria-label="Scroll-gesteuerte thermische Verwandlung des Wohnhauses"
          />

          {/* Soft Feather Gradient Blend (Ivory to Midnight Blue) */}
          <div className="thermal-feather-overlay" aria-hidden="true" />

          {/* Minimal State Pill (Optional subtle indicator) */}
          <div className="thermal-state-badge">
            <span
              className="state-indicator-dot"
              style={{
                backgroundColor:
                  scrollProgress < 0.25
                    ? '#f59e0b'
                    : scrollProgress < 0.7
                    ? '#d946ef'
                    : '#3b82f6',
              }}
            />
            <span>
              {scrollProgress < 0.25
                ? 'Ungedämmt (Hoher Wärmeverlust)'
                : scrollProgress < 0.75
                ? 'Thermische Optimierung'
                : 'Vollständig gedämmt'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
