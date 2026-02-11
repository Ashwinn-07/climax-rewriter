import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPopularMovies, TMDBMovie } from "@/lib/tmdb";
import { MovieCard } from "@/components/MovieCard";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { supabase } from "@/integrations/supabase/client";

interface RecentClimax {
  id: string;
  content: string;
  movie_slug: string;
  movie_title: string;
  created_at: string;
}

export default function Index() {
  const [featuredMovies, setFeaturedMovies] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [climaxCounts, setClimaxCounts] = useState<Record<string, number>>({});
  const [recentClimaxes, setRecentClimaxes] = useState<RecentClimax[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [moviesResponse, climaxesResponse, recentClimaxesResponse] =
          await Promise.all([
            getPopularMovies(),
            supabase.from("climaxes").select("movie_slug"),
            supabase
              .from("climaxes")
              .select("id, content, movie_slug, movie_title, created_at")
              .order("created_at", { ascending: false })
              .limit(6),
          ]);

        setRecentClimaxes(recentClimaxesResponse.data || []);

        setFeaturedMovies(moviesResponse.results.slice(0, 8));

        // Count climaxes per movie
        const counts: Record<string, number> = {};
        climaxesResponse.data?.forEach((c) => {
          counts[c.movie_slug] = (counts[c.movie_slug] || 0) + 1;
        });
        setClimaxCounts(counts);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <>
      {/* SEO Meta */}
      <title>Lumiere - Rewrite Movie Endings | Alternate Climaxes</title>
      <meta
        name="description"
        content="Share and discover alternate endings for your favorite movies and TV shows. Join cinephiles in rewriting the climaxes Hollywood got wrong."
      />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="container relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight animate-fade-in-up">
            <span className="text-gradient">Reimagine</span> the Ending
            <br />
            <span className="text-foreground/80">
              The Way You Felt It Should End
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up stagger-1">
            Share your alternate climaxes for movies and TV shows. Join a
            community of cinephiles who love exploring how stories could end
            differently.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-2">
            <Link to="/movies" className="btn-primary text-base px-8 py-4">
              Browse Movies
            </Link>
            <Link to="/write" className="btn-secondary text-base px-8 py-4">
              Write a Climax
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 flex items-center justify-center gap-10 animate-fade-in-up stagger-3">
            <div className="text-center">
              <p className="text-3xl font-serif font-bold text-gradient">
                1000+
              </p>
              <p className="text-sm text-muted-foreground mt-1">Movies</p>
            </div>
            <div className="w-px h-10 bg-border/50" />
            <div className="text-center">
              <p className="text-3xl font-serif font-bold text-gradient">
                User
              </p>
              <p className="text-sm text-muted-foreground mt-1">Climaxes</p>
            </div>
            <div className="w-px h-10 bg-border/50" />
            <div className="text-center">
              <p className="text-3xl font-serif font-bold text-gradient">
                Free
              </p>
              <p className="text-sm text-muted-foreground mt-1">To Join</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div> */}
      </section>

      {/* Intro Editorial Section */}
      <section className="container py-10 max-w-3xl">
        <div className="border-l-4 border-primary/40 pl-5">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Lumiere is a community-driven space for film lovers who enjoy
            reflecting on stories beyond the screen. Here, viewers explore
            alternate story paths, emotional resolutions, and narrative
            possibilities that might have unfolded differently. By reimagining
            key moments, especially endings, Lumiere celebrates the personal
            connection audiences form with cinema.
          </p>
        </div>
      </section>

      {/* Ad Banner */}
      {/* <section className="container py-8">
        <AdPlaceholder size="leaderboard" />
      </section> */}

      {/* Featured Movies */}
      <section className="container py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold">
              Featured Movies
            </h2>
            <p className="mt-2 text-muted-foreground">
              Popular films waiting for your alternate ending
            </p>
          </div>
          <Link
            to="/movies"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View All
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card overflow-hidden animate-pulse">
                <div className="aspect-[2/3] bg-muted" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredMovies.map((movie, index) => (
              <div
                key={movie.id}
                className={`animate-fade-in-up stagger-${(index % 4) + 1}`}
              >
                <MovieCard
                  movie={movie}
                  climaxCount={
                    climaxCounts[
                      `${movie.id}-${movie.title
                        .toLowerCase()
                        .replace(/[^a-z0-9\s-]/g, "")
                        .replace(/\s+/g, "-")}`
                    ] || 0
                  }
                />
              </div>
            ))}
          </div>
        )}

        <Link
          to="/movies"
          className="sm:hidden flex items-center justify-center gap-2 mt-8 text-sm font-medium text-primary"
        >
          View All Movies
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </section>

      {/* Latest Community Endings */}
      {recentClimaxes.length > 0 && (
        <section className="container py-16 border-t border-border/50">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
            Latest Community Endings
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {recentClimaxes.map((climax) => (
              <Link
                key={climax.id}
                to={`/movie/${climax.movie_slug}`}
                className="block glass-card p-6 hover:border-primary/40 transition-colors h-full"
              >
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                  {climax.movie_title}
                </p>

                <p className="text-foreground line-clamp-4 leading-relaxed">
                  {climax.content}
                </p>

                <p className="mt-4 text-sm text-primary hover:underline">
                  Read full ending →
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* How it Works */}
      <section className="container py-16 border-t border-border/50">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-6 text-center animate-fade-in-up stagger-1">
            <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                className="w-7 h-7 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Find a Movie</h3>
            <p className="text-sm text-muted-foreground">
              Browse thousands of movies and find one with an ending that didn't
              satisfy you.
            </p>
          </div>

          <div className="glass-card p-6 text-center animate-fade-in-up stagger-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                className="w-7 h-7 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Write Your Climax</h3>
            <p className="text-sm text-muted-foreground">
              Craft your own alternate ending. Be creative,fix what it got
              wrong.
            </p>
          </div>

          <div className="glass-card p-6 text-center animate-fade-in-up stagger-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                className="w-7 h-7 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Get Votes</h3>
            <p className="text-sm text-muted-foreground">
              Share with the community and see if others agree your ending is
              better.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="container py-16">
        <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden"> */}
      {/* Glow effects */}
      {/* <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              Ready to Rewrite Cinema History?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join thousands of cinephiles sharing their alternate visions for beloved films.
            </p>
            <Link to="/auth" className="btn-primary text-base px-8 py-4 animate-pulse-glow">
              Get Started Free
            </Link>
          </div> */}
      {/* </div>
      </section> */}

      {/* Bottom Ad */}
      {/* <section className="container pb-16">
        <AdPlaceholder size="rectangle" className="max-w-md mx-auto" />
      </section> */}
    </>
  );
}
