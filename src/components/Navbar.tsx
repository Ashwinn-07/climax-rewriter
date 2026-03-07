import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import './Navbar.css';

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: '/home', label: 'Home' },
  { href: '/movies', label: 'Movies' },
  { href: '/about', label: 'About' },
  { href: '/why-endings-matter', label: 'Why Endings Matter' },
];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-body">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            Lumière
          </Link>

          {/* Center links */}
          <nav className="navbar-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`navbar-link ${isActive(link.href) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="navbar-actions">
            {user ? (
              <>
                <Link
                  to="/write"
                  className={`navbar-link ${isActive('/write') ? 'active' : ''}`}
                >
                  Write
                </Link>
                <Link
                  to="/my-climaxes"
                  className={`navbar-link ${isActive('/my-climaxes') ? 'active' : ''}`}
                >
                  My Climaxes
                </Link>
                <button onClick={signOut} className="navbar-ghost">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" className="navbar-link">
                  Sign In
                </Link>
                {isLanding && (
                  <Link to="/home" className="navbar-cta">
                    Explore Now →
                  </Link>
                )}
                {!isLanding && (
                  <Link to="/write" className="navbar-cta">
                    Write a Climax
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div className={`navbar-mobile-overlay ${mobileOpen ? 'open' : ''}`}>
        <button className="navbar-mobile-close" onClick={() => setMobileOpen(false)}>✕</button>
        {NAV_LINKS.map((link) => (
          <Link key={link.href} to={link.href} onClick={() => setMobileOpen(false)}>
            {link.label}
          </Link>
        ))}
        {user ? (
          <>
            <Link to="/write" onClick={() => setMobileOpen(false)}>Write a Climax</Link>
            <Link to="/my-climaxes" onClick={() => setMobileOpen(false)}>My Climaxes</Link>
            <button
              className="navbar-mobile-link-btn"
              onClick={() => { signOut(); setMobileOpen(false); }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/auth" onClick={() => setMobileOpen(false)}>Sign In</Link>
            <Link to="/write" onClick={() => setMobileOpen(false)}>Write a Climax</Link>
          </>
        )}
      </div>
    </>
  );
}
