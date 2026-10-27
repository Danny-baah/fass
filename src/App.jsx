import React, { useEffect, useState } from 'react';
import CinematicHero from './components/CinematicHero';
import AboutSection from './components/AboutSection';
import ThermalVisualization from './components/ThermalVisualization';
import FacadeRenovation from './components/FacadeRenovation';
import SiteFooter from './components/SiteFooter';

export default function App() {
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('.hero-scene');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        // If bottom of hero is at or near top of viewport, we are in the next sections
        setIsPastHero(rect.bottom <= 80);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="site-wrapper">
      {/* Persistent Sticky Header for sections below hero */}
      <header className={`global-nav-header ${isPastHero ? 'visible' : ''}`} aria-label="Hauptnavigation">
        <div className="global-nav-inner">
          <a
            className="global-nav-brand"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Fassaden Pro GmbH Startseite"
          >
            <svg
              width="32"
              height="15"
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
            <div className="global-brand-text">
              <span className="brand-dark">FASSADEN</span>
              <span className="brand-green">PRO</span>
            </div>
          </a>

          <nav className="global-nav-links" aria-label="Hauptmenü">
            <a href="#ueber-uns">Über uns</a>
            <a href="#daemmung">Wärmedämmung</a>
            <a href="#sanierung">Fassadensanierung</a>
            <a href="https://www.fassaden-pro.de/referenzen/">Referenzen</a>
            <a href="#kontakt">Kontakt</a>
          </nav>

          <div className="global-nav-right">
            <a className="global-tel" href="tel:+4917624375915">0176 24375915</a>
            <a
              className="global-btn-cta"
              href="https://www.fassaden-pro.de/kontakt/"
            >
              <span>Angebot anfordern</span>
              <svg
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
          </div>
        </div>
      </header>

      <main>
        {/* Section 1: Cinematic Scroll Storytelling Hero */}
        <CinematicHero />

        {/* Section 2: Craftsmanship & About Section */}
        <AboutSection />

        {/* Section 3: Cinematic Scroll-Driven Thermal Visualization */}
        <ThermalVisualization />

        {/* Section 4: Cinematic Façade Renovation + Interactive Color Customizer */}
        <FacadeRenovation />
      </main>

      {/* Modern Architectural Footer */}
      <SiteFooter />
    </div>
  );
}
