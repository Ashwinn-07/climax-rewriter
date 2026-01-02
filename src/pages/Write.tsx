import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  searchMovies,
  getMovieById,
  TMDBMovie,
  getImageUrl,
  createMovieSlug,
} from "@/lib/tmdb";

const MIN_WORDS = 50;
const MAX_WORDS = 500;
const AUTOSAVE_KEY = "antiClimax_draft";

export default function Write() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | null>(null);
  const [movieSearch, setMovieSearch] = useState("");
  const [movieResults, setMovieResults] = useState<TMDBMovie[]>([]);
  const [searchingMovies, setSearchingMovies] = useState(false);
  const [showMovieDropdown, setShowMovieDropdown] = useState(false);

  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Get word count
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const isValidLength = wordCount >= MIN_WORDS && wordCount <= MAX_WORDS;

  // Load draft from localStorage
  useEffect(() => {
    const draft = localStorage.getItem(AUTOSAVE_KEY);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (parsed.content) setContent(parsed.content);
        if (parsed.movieId && !searchParams.get("movie")) {
          getMovieById(parsed.movieId).then((movie) => {
            if (movie) setSelectedMovie(movie);
          });
        }
      } catch (e) {
        console.error("Error loading draft:", e);
      }
    }
  }, []);

  // Load movie from URL params
  useEffect(() => {
    const movieId = searchParams.get("movie");
    const movieTitle = searchParams.get("title");

    if (movieId && movieTitle) {
      getMovieById(parseInt(movieId, 10)).then((movie) => {
        if (movie) setSelectedMovie(movie);
      });
    }
  }, [searchParams]);

  // Autosave draft
  useEffect(() => {
    const timer = setTimeout(() => {
      if (content || selectedMovie) {
        localStorage.setItem(
          AUTOSAVE_KEY,
          JSON.stringify({
            content,
            movieId: selectedMovie?.id,
          })
        );
        setLastSaved(new Date());
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [content, selectedMovie]);

  // Search movies
  useEffect(() => {
    if (!movieSearch.trim()) {
      setMovieResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setSearchingMovies(true);
      try {
        const response = await searchMovies(movieSearch);
        setMovieResults(response.results.slice(0, 5));
      } catch (error) {
        console.error("Error searching movies:", error);
      } finally {
        setSearchingMovies(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [movieSearch]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth?redirect=/write");
    }
  }, [user, authLoading, navigate]);

  const handleSelectMovie = (movie: TMDBMovie) => {
    setSelectedMovie(movie);
    setMovieSearch("");
    setShowMovieDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedMovie) {
      setError("Please select a movie");
      return;
    }

    if (!isValidLength) {
      setError(
        `Your ending must be between ${MIN_WORDS} and ${MAX_WORDS} words`
      );
      return;
    }

    if (!user) {
      navigate("/auth?redirect=/write");
      return;
    }

    setSubmitting(true);

    try {
      const movieSlug = createMovieSlug(selectedMovie.id, selectedMovie.title);

      const { error: insertError } = await supabase.from("climaxes").insert({
        movie_slug: movieSlug,
        movie_title: selectedMovie.title,
        content: content.trim(),
        author_id: user.id,
      });

      if (insertError) throw insertError;

      // Clear draft
      localStorage.removeItem(AUTOSAVE_KEY);

      // Navigate to movie page
      navigate(`/movie/${movieSlug}`);
    } catch (err: any) {
      console.error("Error submitting:", err);
      setError(err.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="container py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mx-auto mb-4" />
          <div className="h-4 bg-muted rounded w-64 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <>
      <title>Write an Alternate Ending - Lumiere</title>
      <meta
        name="description"
        content="Write your own alternate ending for a movie. Share your vision of how the story should have ended."
      />

      <div className="container max-w-2xl py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold">Write Your Ending</h1>
          <p className="mt-2 text-muted-foreground">
            Share your alternate climax for a movie or TV show
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Movie Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Select a Movie
            </label>

            {selectedMovie ? (
              <div className="glass-card p-4 flex items-center gap-4">
                {selectedMovie.poster_path && (
                  <img
                    src={getImageUrl(selectedMovie.poster_path, "w92") || ""}
                    alt={selectedMovie.title}
                    className="w-12 h-18 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium">{selectedMovie.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedMovie.release_date
                      ? new Date(selectedMovie.release_date).getFullYear()
                      : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedMovie(null)}
                  className="btn-ghost text-sm"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="text"
                  value={movieSearch}
                  onChange={(e) => {
                    setMovieSearch(e.target.value);
                    setShowMovieDropdown(true);
                  }}
                  onFocus={() => setShowMovieDropdown(true)}
                  placeholder="Search for a movie..."
                  className="input-dark"
                />

                {showMovieDropdown &&
                  (movieResults.length > 0 || searchingMovies) && (
                    <div className="absolute z-10 w-full mt-2 glass-card overflow-hidden">
                      {searchingMovies ? (
                        <div className="p-4 text-center text-muted-foreground">
                          Searching...
                        </div>
                      ) : (
                        movieResults.map((movie) => (
                          <button
                            key={movie.id}
                            type="button"
                            onClick={() => handleSelectMovie(movie)}
                            className="w-full p-3 flex items-center gap-3 hover:bg-secondary transition-colors text-left"
                          >
                            {movie.poster_path ? (
                              <img
                                src={
                                  getImageUrl(movie.poster_path, "w92") || ""
                                }
                                alt={movie.title}
                                className="w-10 h-15 object-cover rounded"
                              />
                            ) : (
                              <div className="w-10 h-15 bg-muted rounded flex items-center justify-center">
                                <svg
                                  className="w-5 h-5 text-muted-foreground"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4"
                                  />
                                </svg>
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-sm">
                                {movie.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {movie.release_date
                                  ? new Date(movie.release_date).getFullYear()
                                  : ""}
                              </p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">
                Your Alternate Ending
              </label>
              <span
                className={`text-xs ${
                  wordCount < MIN_WORDS
                    ? "text-muted-foreground"
                    : wordCount > MAX_WORDS
                    ? "text-destructive"
                    : "text-primary"
                }`}
              >
                {wordCount} / {MAX_WORDS} words
              </span>
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your alternate ending here. Be creative! Describe how you would have ended the story differently..."
              rows={12}
              className="input-dark resize-none"
            />

            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                Minimum {MIN_WORDS} words required
              </p>
              {lastSaved && (
                <p className="text-xs text-muted-foreground">
                  Draft saved {lastSaved.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem(AUTOSAVE_KEY);
                setContent("");
                setSelectedMovie(null);
              }}
              className="btn-ghost text-sm text-muted-foreground"
            >
              Clear Draft
            </button>

            <button
              type="submit"
              disabled={submitting || !selectedMovie || !isValidLength}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Publishing..." : "Publish Ending"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
