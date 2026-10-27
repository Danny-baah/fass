import React from 'react';
import './AboutSection.css';

export default function AboutSection() {
  return (
    <section className="about-section" id="ueber-uns" aria-label="Über Fassaden Pro">
      <div className="about-container">
        {/* Left Column: Asymmetrical Architectural Image Grid */}
        <div className="about-gallery">
          {/* Main Top House Photo */}
          <div className="gallery-main-wrap">
            <img
              src="/images/about/facade-house.jpg"
              alt="Moderne Fassadendämmung und Sanierung an einem Einfamilienhaus in Ingolstadt"
              className="gallery-img gallery-img-main"
              loading="lazy"
            />
            {/* Location Pill Badge matching mockup */}
            <div className="gallery-badge">
              INGOLSTADT + UMGEBUNG
            </div>
          </div>

          {/* Bottom Dual Detail Photos */}
          <div className="gallery-sub-row">
            <div className="gallery-sub-wrap">
              <img
                src="/images/about/facade-texture.jpg"
                alt="Detailaufnahme: Makellose Putzstruktur und sauberer Fensterbankanschluss"
                className="gallery-img gallery-img-sub"
                loading="lazy"
              />
            </div>
            <div className="gallery-sub-wrap">
              <img
                src="/images/about/facade-perspective.jpg"
                alt="Architekturperspektive: Zeitlose weiße Fassade mit schwarzen Fensterrahmen"
                className="gallery-img gallery-img-sub"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Craftsmanship Copy */}
        <div className="about-content">
          <div className="about-content-inner">
            {/* Eyebrow */}
            <div className="about-eyebrow">
              ÜBER FASSADEN PRO
            </div>

            {/* Main Title */}
            <h2 className="about-title">
              Gutes Handwerk.<br />
              Fassaden, die<br />
              <span className="about-title-highlight">Bestand haben.</span>
            </h2>

            {/* Lead Description */}
            <p className="about-lead">
              Wir verbinden klare Beratung, sorgfältige Planung und saubere Ausführung – von der ersten Begehung bis zur Abnahme.
            </p>

            {/* Feature List with Dividers */}
            <div className="about-features">
              {/* Feature 1 */}
              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                    <circle cx="8" cy="12" r="0.9" fill="currentColor" />
                    <circle cx="12" cy="12" r="0.9" fill="currentColor" />
                    <circle cx="16" cy="12" r="0.9" fill="currentColor" />
                  </svg>
                </div>
                <div className="feature-text">
                  <h3 className="feature-title">Klare Absprachen</h3>
                  <p className="feature-desc">Direkte Kommunikation und transparente Prozesse.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="feature-text">
                  <h3 className="feature-title">Sorgfältige Ausführung</h3>
                  <p className="feature-desc">Saubere Arbeit, hochwertige Materialien und ein Auge fürs Detail.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="feature-text">
                  <h3 className="feature-title">Regional in Ingolstadt und Umgebung</h3>
                  <p className="feature-desc">Zuverlässig, persönlich und immer in Ihrer Nähe.</p>
                </div>
              </div>
            </div>

            {/* Bottom Underlined Link CTA */}
            <div className="about-cta-wrap">
              <a href="https://www.fassaden-pro.de/#sanierung" className="about-link">
                <span>Lernen Sie uns kennen</span>
                <svg className="about-link-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
