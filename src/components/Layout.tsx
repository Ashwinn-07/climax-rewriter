import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  // Landing page renders its own content (with navbar included at top level)
  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col film-grain">
      {/* Unified Navbar */}
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="h-20" />

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
                    to="/why-endings-matter"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Why Endings Matter
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
