import { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Aurora from '@/components/landing/Aurora';
import ClickSpark from '@/components/landing/ClickSpark';
import ScrollReveal from '@/components/landing/ScrollReveal';
import Grainient from '@/components/landing/Grainient';
import Navbar from '@/components/Navbar';
import './LandingPage.css';

export default function LandingPage() {
  const appearRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setAppearRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    appearRefs.current[index] = el;
  }, []);



  // Intersection Observer for appear animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    appearRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ClickSpark sparkColor="#00e5ff" sparkSize={12} sparkRadius={20} sparkCount={10} duration={500} extraScale={1.2}>
      <div style={{ background: '#0a0a14', minHeight: '100vh' }}>
        {/* ====== UNIFIED NAVBAR ====== */}
        <Navbar />

        {/* ====== HERO SECTION ====== */}
        <section className="landing-hero">
          <div className="landing-hero-aurora">
            <Aurora
              colorStops={['#3b0764', '#00e5ff', '#c084fc']}
              amplitude={2.5}
              blend={0.6}
              speed={0.5}
            />
          </div>
          <div className="landing-hero-overlay" />

          <div className="landing-hero-content">
            <div className="landing-hero-badge">
              <span>✦</span> A New Way to Experience Cinema
            </div>

            <h1 className="landing-hero-title">
              <span className="landing-gradient-text">Reimagine</span> the Ending,
              <br />
              The Way <span className="landing-gradient-text">You</span> Felt It Should End
            </h1>

            <p className="landing-hero-subtitle">
              Lumière is where cinephiles come together to explore alternate endings,
              rewrite climaxes, and celebrate the art of storytelling, one movie at a time.
            </p>

            <div className="landing-hero-buttons">
              <Link to="/home" className="landing-btn-primary">
                Start Exploring
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/write" className="landing-btn-secondary">
                Write a Climax
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="landing-scroll-indicator">
            <span>Scroll</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* ====== WHAT IS LUMIÈRE ====== */}
        <section className="landing-section">
          <div className="landing-section-inner">
            <div ref={setAppearRef(0)} className="landing-appear">
              <div className="landing-section-label">
                <span>◆</span> About the Platform
              </div>
              <ScrollReveal
                baseOpacity={0.15}
                enableBlur={true}
                blurStrength={6}
                baseRotation={2}
                containerClassName=""
                textClassName=""
              >
                {"Lumière is a community-driven space for film lovers who enjoy reflecting on stories beyond the screen. Here, viewers explore alternate story paths, emotional resolutions, and narrative possibilities that might have unfolded differently."}
              </ScrollReveal>
            </div>

            <div ref={setAppearRef(1)} className="landing-appear landing-stats">
              <div className="landing-stat-card">
                <div className="landing-stat-number">1000+</div>
                <div className="landing-stat-label">Movies to Explore</div>
              </div>
              <div className="landing-stat-card">
                <div className="landing-stat-number">∞</div>
                <div className="landing-stat-label">Alternate Endings</div>
              </div>
              <div className="landing-stat-card">
                <div className="landing-stat-number">Free</div>
                <div className="landing-stat-label">Forever, Always</div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== HOW IT WORKS ====== */}
        <section className="landing-section" style={{ background: 'linear-gradient(180deg, #0a0a14 0%, #0d0d1f 50%, #0a0a14 100%)' }}>
          <div className="landing-section-inner">
            <div ref={setAppearRef(2)} className="landing-appear" style={{ textAlign: 'center' }}>
              <div className="landing-section-label" style={{ justifyContent: 'center' }}>
                <span>◆</span> Simple & Powerful
              </div>
              <h2 className="landing-section-title">How It Works</h2>
              <hr className="landing-divider" style={{ margin: '0 auto 1rem' }} />
              <p className="landing-section-description" style={{ margin: '0 auto' }}>
                Three simple steps to start reimagining cinema
              </p>
            </div>

            <div className="landing-steps">
              <div ref={setAppearRef(3)} className="landing-appear landing-step-card" style={{ transitionDelay: '0.1s' }}>
                <div className="landing-step-number">01</div>
                <h3 className="landing-step-title">Find a Movie</h3>
                <p className="landing-step-desc">
                  Browse thousands of films from all eras and genres. Search for the movie whose 
                  ending left you wanting more... or less.
                </p>
              </div>

              <div ref={setAppearRef(4)} className="landing-appear landing-step-card" style={{ transitionDelay: '0.2s' }}>
                <div className="landing-step-number">02</div>
                <h3 className="landing-step-title">Rewrite the Climax</h3>
                <p className="landing-step-desc">
                  Craft your own alternate ending. Be creative, be bold. Fix what the original 
                  got wrong or explore an entirely new direction.
                </p>
              </div>

              <div ref={setAppearRef(5)} className="landing-appear landing-step-card" style={{ transitionDelay: '0.3s' }}>
                <div className="landing-step-number">03</div>
                <h3 className="landing-step-title">Share & Discuss</h3>
                <p className="landing-step-desc">
                  Publish your ending, vote on others, and join conversations about how stories 
                  could have unfolded differently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== WHY ENDINGS MATTER ====== */}
        <section className="landing-editorial">
          <div className="landing-editorial-inner">
            <div ref={setAppearRef(6)} className="landing-appear">
              <div className="landing-section-label" style={{ justifyContent: 'center' }}>
                <span>◆</span> The Philosophy
              </div>
            </div>
            <ScrollReveal
              baseOpacity={0.12}
              enableBlur={true}
              blurStrength={8}
              baseRotation={1}
              containerClassName=""
              textClassName=""
            >
              {"A film's ending is often the most remembered part of its story. It shapes emotions, defines meaning, and stays with us long after the credits roll. By reimagining endings, we don't dismiss the original. We engage with it more deeply."}
            </ScrollReveal>

            <div ref={setAppearRef(7)} className="landing-appear">
              <p className="landing-editorial-quote">
                "Cinema doesn't end when the credits roll.<br />
                <span>sometimes, that's when the conversation truly begins.</span>"
              </p>
            </div>
          </div>
        </section>

        {/* ====== FEATURES BENTO ====== */}
        <section className="landing-section">
          <div className="landing-section-inner">
            <div ref={setAppearRef(8)} className="landing-appear" style={{ textAlign: 'center' }}>
              <div className="landing-section-label" style={{ justifyContent: 'center' }}>
                <span>◆</span> Why Lumière
              </div>
              <h2 className="landing-section-title">Built for Cinephiles</h2>
              <hr className="landing-divider" style={{ margin: '0 auto 1rem' }} />
            </div>

            <div ref={setAppearRef(9)} className="landing-appear landing-bento">
              <div className="landing-bento-item bento-wide">
                <div className="landing-bento-icon icon-cyan">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <h3 className="landing-bento-title">Community Driven</h3>
                <p className="landing-bento-desc">
                  Every alternate ending is written by fans. Real people, real perspectives, 
                  real creativity. Building a living library of reimagined cinema.
                </p>
              </div>

              <div className="landing-bento-item">
                <div className="landing-bento-icon icon-purple">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                    <line x1="7" y1="2" x2="7" y2="22" />
                    <line x1="17" y1="2" x2="17" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <line x1="2" y1="7" x2="7" y2="7" />
                    <line x1="2" y1="17" x2="7" y2="17" />
                    <line x1="17" y1="7" x2="22" y2="7" />
                    <line x1="17" y1="17" x2="22" y2="17" />
                  </svg>
                </div>
                <h3 className="landing-bento-title">1000+ Movies</h3>
                <p className="landing-bento-desc">
                  A vast catalog of films from all genres waiting for your creative touch.
                </p>
              </div>

              <div className="landing-bento-item">
                <div className="landing-bento-icon icon-emerald">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="landing-bento-title">100% Human</h3>
                <p className="landing-bento-desc">
                  No AI-generated content. Every word comes from the imagination of real cinephiles.
                </p>
              </div>

              <div className="landing-bento-item">
                <div className="landing-bento-icon icon-pink">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </div>
                <h3 className="landing-bento-title">Vote & Discover</h3>
                <p className="landing-bento-desc">
                  See which endings resonate with the community. Upvote the ones you love.
                </p>
              </div>

              <div className="landing-bento-item bento-wide">
                <div className="landing-bento-icon icon-cyan">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                </div>
                <h3 className="landing-bento-title">Free Forever</h3>
                <p className="landing-bento-desc">
                  Lumière is and always will be free. No paywalls, no premium tiers. Just a shared 
                  love of storytelling and creative expression for everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== CTA SECTION ====== */}
        <section className="landing-cta">
          <div className="landing-cta-bg">
            <Grainient
              color1="#a855f7"
              color2="#1a0533"
              color3="#00e5ff"
              timeSpeed={0.15}
              grainAmount={0.08}
              warpAmplitude={60}
              contrast={1.3}
            />
          </div>
          <div className="landing-cta-overlay" />

          <div className="landing-cta-content">
            <div ref={setAppearRef(10)} className="landing-appear">
              <h2 className="landing-cta-title">
                Ready to Rewrite<br />Cinema History?
              </h2>
              <p className="landing-cta-subtitle">
                Join cinephiles who are reshaping stories, one ending at a time.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/auth" className="landing-btn-primary">
                  Get Started Free
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link to="/movies" className="landing-btn-secondary">
                  Browse Movies
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="landing-footer">
          <div className="landing-footer-inner">
            <Link to="/" className="landing-logo" style={{ fontSize: '1.25rem' }}>
              Lumière
            </Link>
            <div className="landing-footer-links">
              <Link to="/home" className="landing-footer-link">Home</Link>
              <Link to="/movies" className="landing-footer-link">Movies</Link>
              <Link to="/about" className="landing-footer-link">About</Link>
              <Link to="/privacy" className="landing-footer-link">Privacy</Link>
              <Link to="/terms" className="landing-footer-link">Terms</Link>
              <Link to="/contact" className="landing-footer-link">Contact</Link>
            </div>
            <p className="landing-footer-copyright">
              © {new Date().getFullYear()} Lumière. Fan-driven, not studio-affiliated.
            </p>
          </div>
        </footer>
      </div>
    </ClickSpark>
  );
}
