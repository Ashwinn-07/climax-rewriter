import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();
  const location = useLocation();

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
            <span className="text-xl font-serif font-bold tracking-tight text-gradient">
              Anti Climax
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

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to="/my-climaxes"
                  className={`text-sm font-medium transition-colors ${
                    isActive("/my-climaxes")
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  My Climaxes
                </Link>
                <Link to="/write" className="btn-primary text-sm">
                  Write
                </Link>
                <button
                  onClick={signOut}
                  className="btn-ghost text-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/auth" className="btn-primary text-sm">
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center gap-6 px-6 pb-3 overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium whitespace-nowrap transition-colors ${
                isActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link to="/" className="text-xl font-serif font-bold text-gradient">
                Anti Climax
              </Link>
              <p className="mt-3 text-sm text-muted-foreground max-w-sm">
                Rewrite the endings that Hollywood got wrong. Share your alternate climaxes 
                with fellow cinephiles.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/movies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Browse Movies
                  </Link>
                </li>
                <li>
                  <Link to="/write" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Write a Climax
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Anti Climax. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Movie data powered by TMDB
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
