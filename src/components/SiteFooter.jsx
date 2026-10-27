import React from 'react';
import './SiteFooter.css';

export default function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" id="kontakt">
      {/* Upper Main Footer */}
      <div className="footer-main">
        {/* Decorative House Image on the Right */}
        <div className="footer-house-bg" aria-hidden="true">
          <img
            src="/images/footer-house.webp"
            alt=""
            className="footer-house-img"
          />
        </div>

        <div className="footer-container">
          {/* Column 1: Brand, Tagline, Mission & Social Links */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand-header">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
                className="footer-logo-link"
                aria-label="Fassaden Pro Startseite"
              >
                <img
                  src="/images/footer-logo-mark.png"
                  alt="Fassaden Pro Logo"
                  className="footer-logo-mark"
                />
                <div className="footer-logo-text-wrap">
                  <div className="footer-brand-title">
                    <span className="brand-dark">FASSADEN</span>{' '}
                    <span className="brand-green">PRO</span>
                  </div>
                  <div className="footer-brand-tagline">
                    FASSADE. WERT. ZUKUNFT.
                  </div>
                </div>
              </a>
            </div>

            <p className="footer-brand-desc">
              Ihr Partner für professionelle Fassadenarbeiten, Sanierung und dauerhaften Schutz – für ein schönes und modernes Zuhause.
            </p>

            {/* Social Media Icons */}
            <div className="footer-social-row" aria-label="Soziale Medien">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="YouTube"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="footer-col-divider" aria-hidden="true" />

          {/* Column 2: Leistungen */}
          <div className="footer-col footer-col-links">
            <h3 className="footer-heading">Leistungen</h3>
            <ul className="footer-nav-list">
              <li>
                <a href="#sanierung">Fassadensanierung</a>
              </li>
              <li>
                <a href="#daemmung">Wärmedämmung</a>
              </li>
              <li>
                <a href="#sanierung">Fassadenanstrich</a>
              </li>
              <li>
                <a href="#sanierung">Putzausbesserung</a>
              </li>
              <li>
                <a href="https://www.fassaden-pro.de/referenzen/">Referenzen</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Unternehmen */}
          <div className="footer-col footer-col-links">
            <h3 className="footer-heading">Unternehmen</h3>
            <ul className="footer-nav-list">
              <li>
                <a href="#ueber-uns">Über uns</a>
              </li>
              <li>
                <a href="#ueber-uns">Unser Prozess</a>
              </li>
              <li>
                <a href="#daemmung">Qualität</a>
              </li>
              <li>
                <a href="https://www.fassaden-pro.de/">Karriere</a>
              </li>
              <li>
                <a href="https://www.fassaden-pro.de/kontakt/">Kontakt</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontakt */}
          <div className="footer-col footer-col-contact">
            <h3 className="footer-heading">Kontakt</h3>
            <div className="footer-contact-items">
              {/* Phone */}
              <a href="tel:+49123456789" className="contact-item-row">
                <div className="contact-badge" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-item-text">
                  <span className="contact-primary">+49 123 456789</span>
                  <span className="contact-secondary">Mo – Fr, 8:00 – 17:00 Uhr</span>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:info@fassaden-pro.de" className="contact-item-row">
                <div className="contact-badge" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="contact-item-text">
                  <span className="contact-primary">info@fassaden-pro.de</span>
                  <span className="contact-secondary">Wir freuen uns auf Ihre Anfrage</span>
                </div>
              </a>

              {/* Address */}
              <div className="contact-item-row">
                <div className="contact-badge" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-item-text">
                  <span className="contact-primary">Musterstraße 12</span>
                  <span className="contact-secondary">12345 Musterstadt, Deutschland</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-inner">
          <div className="footer-copyright">
            © 2024 Fassaden Pro. Alle Rechte vorbehalten.
          </div>

          <div className="footer-bottom-right">
            <nav className="footer-legal-links" aria-label="Rechtliche Hinweise">
              <a href="https://www.fassaden-pro.de/datenschutz/">Datenschutz</a>
              <span className="legal-divider" aria-hidden="true">|</span>
              <a href="https://www.fassaden-pro.de/impressum/">Impressum</a>
              <span className="legal-divider" aria-hidden="true">|</span>
              <a href="https://www.fassaden-pro.de/">AGB</a>
            </nav>

            {/* Floating Back to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="scroll-top-btn"
              aria-label="Nach oben scrollen"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
