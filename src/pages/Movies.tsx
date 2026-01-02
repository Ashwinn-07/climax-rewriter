import { useEffect, useState, useMemo } from "react";
import { searchMovies, getPopularMovies, TMDBMovie, languageNames, getLanguageName } from "@/lib/tmdb";
import { MovieCard } from "@/components/MovieCard";
import { AdPlaceholder } from "@/components/AdPlaceholder";

export default function Movies() {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch movies
  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      try {
        const response = debouncedQuery
          ? await searchMovies(debouncedQuery, page)
          : await getPopularMovies(page);
        
        setMovies(response.results);
        setTotalPages(Math.min(response.total_pages, 500)); // TMDB limits to 500 pages
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [debouncedQuery, page]);

  // Filter by language (client-side)
  const filteredMovies = useMemo(() => {
    if (!selectedLanguage) return movies;
    return movies.filter((m) => m.original_language === selectedLanguage);
  }, [movies, selectedLanguage]);

  // Get unique languages from current results
  const availableLanguages = useMemo(() => {
    const langs = new Set(movies.map((m) => m.original_language));
    return Array.from(langs).sort((a, b) => 
      getLanguageName(a).localeCompare(getLanguageName(b))
    );
  }, [movies]);

  return (
    <>
      <title>Browse Movies - Anti Climax</title>
      <meta name="description" content="Browse thousands of movies and discover alternate endings written by our community of cinephiles." />

      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold">Browse Movies</h1>
          <p className="mt-2 text-muted-foreground">Find a movie and write your alternate ending</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-dark pl-12"
            />
          </div>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="input-dark sm:w-48"
          >
            <option value="">All Languages</option>
            {availableLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {getLanguageName(lang)}
              </option>
            ))}
          </select>
        </div>

        {/* Ad */}
        <AdPlaceholder size="leaderboard" className="mb-8" />

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="glass-card overflow-hidden animate-pulse">
                <div className="aspect-[2/3] bg-muted" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <p className="text-muted-foreground">No movies found</p>
            {selectedLanguage && (
              <button
                onClick={() => setSelectedLanguage("")}
                className="mt-4 text-primary hover:underline"
              >
                Clear language filter
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}
