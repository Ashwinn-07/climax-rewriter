import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/movies", label: "Movies" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col film-grain">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-background/80 border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-3xl font-serif font-bold tracking-tight text-gradient">
              Lumiere
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors link-underline ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to="/write"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Write
              </Link>
            ) : null}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/40 transition"
              aria-label="Open menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <Link
                    to="/my-climaxes"
                    className={`text-sm font-medium ${
                      isActive("/my-climaxes")
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    My Climaxes
                  </Link>
                  <button onClick={signOut} className="btn-ghost text-sm">
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border/50 bg-background/95 backdrop-blur">
            <div className="container py-4 space-y-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium"
              >
                Home
              </Link>

              <Link
                to="/movies"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium"
              >
                Movies
              </Link>

              {user && (
                <Link
                  to="/my-climaxes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium"
                >
                  My Climaxes
                </Link>
              )}

              {!user ? (
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium"
                >
                  Sign in
                </Link>
              ) : (
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="block text-sm font-medium text-left"
                >
                  Sign out
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link
                to="/"
                className="text-3xl font-serif font-bold text-gradient"
              >
                Lumiere
              </Link>
              <p className="mt-3 text-sm text-muted-foreground max-w-sm">
                Reimagine the Ending The Way You Felt It Should End
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/movies"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Browse Movies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/write"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Write a Climax
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Lumiere. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Lumiere is a fan-driven platform and is not affiliated with any
              movie studio.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
