import React, { useState, useRef, useCallback, useEffect } from 'react';
import './FacadeRenovation.css';

// 7 authentic color options for the finished facade
const COLOR_SWATCHES = [
  { id: 'ivory', name: 'Warmes Ivory', hex: '#ebe9dc', file: '/images/fliederstrasse/fliederstrasse_ivory.webp' },
  { id: 'cremeweiss', name: 'Cremeweiß', hex: '#e8e0cf', file: '/images/fliederstrasse/fliederstrasse_cremeweiss.webp' },
  { id: 'sandbeige', name: 'Sandbeige', hex: '#c6beb2', file: '/images/fliederstrasse/fliederstrasse_sandbeige.webp' },
  { id: 'salbeigruen', name: 'Salbeigrün', hex: '#708774', file: '/images/fliederstrasse/fliederstrasse_salbeigruen.webp' },
  { id: 'taubenblau', name: 'Taubenblau', hex: '#6e818f', file: '/images/fliederstrasse/fliederstrasse_taubenblau.webp' },
  { id: 'terrakotta', name: 'Terrakotta', hex: '#b98166', file: '/images/fliederstrasse/fliederstrasse_terrakotta.webp' },
  { id: 'anthrazit', name: 'Anthrazit', hex: '#525658', file: '/images/fliederstrasse/fliederstrasse_anthrazit.webp' },
];

export default function FacadeRenovation() {
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50); // Initial 50/50 split
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [activeColor, setActiveColor] = useState(COLOR_SWATCHES[0]);

  // Preload all color swatches & before image
  useEffect(() => {
    COLOR_SWATCHES.forEach((swatch) => {
      const img = new Image();
      img.src = swatch.file;
    });
    const beforeImg = new Image();
    beforeImg.src = '/images/fliederstrasse/fliederstrasse_vorher.webp';
  }, []);

  // Update slider position from clientX
  const updateSlider = useCallback((clientX) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const pct = Math.round((x / rect.width) * 1000) / 10;
    setSliderPos(pct);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setHasInteracted(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateSlider(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Pointer capture release safety
      }
    }
  };

  const handleKeyDown = (e) => {
    setHasInteracted(true);
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPos(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPos(100);
    }
  };

  return (
    <section
      className="renovation-section"
      id="sanierung"
      aria-label="Fassadensanierung: Vorher und Nachher Vergleich"
    >
      <div className="renovation-wrapper">
        {/* Left Column: Editorial Information & Craftsmanship Benefits */}
        <div className="renovation-info-col">
          <div className="renovation-eyebrow">
            <span className="eyebrow-dash" aria-hidden="true" />
            <span>Vorher & Nachher · Ingolstadt</span>
          </div>

          <h2 className="renovation-title">
            Vom Rohbau zur<br />
            <span className="renovation-title-highlight">perfekten Fassade.</span>
          </h2>

          <p className="renovation-lead">
            Vom Gerüstaufbau über die fachgerechte Dämmung bis hin zum vollendeten
            Schlussanstrich – erleben Sie den Unterschied in bester Handwerksqualität.
          </p>

          <div className="renovation-benefits">
            <div className="benefit-item">
              <div className="benefit-badge" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l16 16M4 20L20 4" />
                </svg>
              </div>
              <div className="benefit-text">
                <h3 className="benefit-title">Fachgerechtes Gerüst & Vorbereitung</h3>
                <p className="benefit-desc">Sichere Rüstung und präzise Schadensprüfung am Objekt.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-badge" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="7" rx="2" />
                  <path d="M6 10v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4M12 16v6" />
                </svg>
              </div>
              <div className="benefit-text">
                <h3 className="benefit-title">Zugelassene WDVS-Systeme</h3>
                <p className="benefit-desc">Zertifizierte Dämm- und Putzaufbauten von Sto und Knauf.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-badge" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div className="benefit-text">
                <h3 className="benefit-title">Werterhalt & Farbharmonie</h3>
                <p className="benefit-desc">Jahrzehntelanger Witterungsschutz und moderne Ästhetik.</p>
              </div>
            </div>
          </div>

          <div className="renovation-cta-wrap">
            <a
              className="renovation-btn-cta"
              href="https://www.fassaden-pro.de/kontakt/"
            >
              <span>Jetzt Beratung anfragen</span>
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

        {/* Right Column: Direct Interactive Before/After Visualizer & Color Swatches */}
        <div className="renovation-visual-col">
          {/* Visualizer Frame */}
          <div
            className={`comparison-container ${isDragging ? 'dragging' : ''}`}
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            role="slider"
            aria-label="Vorher-Nachher Fassadenvergleich Schieberegler"
            aria-valuenow={Math.round(sliderPos)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            {/* Vorher Layer: Construction / Scaffolding ("Im Bau") from fassaden-pro.de */}
            <div className="comparison-layer layer-vorher">
              <img
                src="/images/fliederstrasse/fliederstrasse_vorher.webp"
                alt="Im Bau: Wohnhausfassade mit Gerüst und Vorbereitungsarbeiten in Ingolstadt"
                className="comparison-img"
                draggable="false"
              />
            </div>

            {/* Nachher Layer: Finished Building ("Fertiggestellt") with active Color */}
            <div
              className="comparison-layer layer-nachher"
              style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
            >
              <img
                src={activeColor.file}
                alt={`Fertiggestellt: Modern gedämmte und sanierte Wohnhausfassade in ${activeColor.name}`}
                className="comparison-img"
                draggable="false"
              />
            </div>

            {/* Draggable Divider Line & Central Handle */}
            <div
              className="comparison-divider"
              style={{ left: `${sliderPos}%` }}
              aria-hidden="true"
            >
              <div className="divider-line" />
              <div className={`divider-handle ${!hasInteracted ? 'pulse-hint' : ''}`}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="arrow-left"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="arrow-right"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>
          </div>


          {/* Color Palette Bar directly underneath the comparison */}
          <div className="renovation-customizer-bar">
            <div className="customizer-text">
              <span className="customizer-eyebrow">Fassadenfarben</span>
              <h3 className="customizer-heading">Wählen Sie Ihren Stil.</h3>
            </div>

            <div className="swatches-group">
              <div
                className="swatches-row"
                role="radiogroup"
                aria-label="Fassadenfarbe für Fertigstellung wählen"
              >
                {COLOR_SWATCHES.map((swatch) => {
                  const isSelected = activeColor.id === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`swatch-btn ${isSelected ? 'active' : ''}`}
                      style={{ backgroundColor: swatch.hex }}
                      onClick={() => setActiveColor(swatch)}
                      title={`${swatch.name} auswählen`}
                    >
                      <span className="sr-only">{swatch.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Color Name */}
              <div className="active-color-label">
                Farbton: <span className="active-color-name">{activeColor.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
