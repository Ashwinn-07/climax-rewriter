import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getMovieById,
  TMDBMovie,
  getImageUrl,
  extractMovieId,
  getLanguageName,
  createMovieSlug,
} from "@/lib/tmdb";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ClimaxCard } from "@/components/ClimaxCard";
import { AdPlaceholder } from "@/components/AdPlaceholder";

interface ClimaxWithVotes {
  id: string;
  content: string;
  author_id: string;
  created_at: string;
  author_name: string;
  vote_count: number;
  has_voted: boolean;
}

export default function Movie() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [movie, setMovie] = useState<TMDBMovie | null>(null);
  const [climaxes, setClimaxes] = useState<ClimaxWithVotes[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"latest" | "votes">("votes");

  const loadClimaxes = async (movieSlug: string) => {
    const { data: climaxData, error } = await supabase
      .from("climaxes")
      .select("id, content, author_id, created_at")
      .eq("movie_slug", movieSlug);

    if (error || !climaxData) return [];

    // Get vote counts and author profiles
    const climaxIds = climaxData.map((c) => c.id);
    const authorIds = [...new Set(climaxData.map((c) => c.author_id))];

    const [votesResponse, profilesResponse, userVotesResponse] =
      await Promise.all([
        supabase.from("votes").select("climax_id").in("climax_id", climaxIds),
        supabase
          .from("profiles")
          .select("id, display_name")
          .in("id", authorIds),
        user
          ? supabase
              .from("votes")
              .select("climax_id")
              .eq("user_id", user.id)
              .in("climax_id", climaxIds)
          : Promise.resolve({ data: [] }),
      ]);

    const voteCounts: Record<string, number> = {};
    votesResponse.data?.forEach((v) => {
      voteCounts[v.climax_id] = (voteCounts[v.climax_id] || 0) + 1;
    });

    const profiles: Record<string, string> = {};
    profilesResponse.data?.forEach((p) => {
      profiles[p.id] = p.display_name;
    });
    console.log(profilesResponse.data);

    const userVotes = new Set(userVotesResponse.data?.map((v) => v.climax_id));

    return climaxData.map((c) => ({
      id: c.id,
      content: c.content,
      author_id: c.author_id,
      created_at: c.created_at,
      author_name: profiles[c.author_id] || "Anonymous",
      vote_count: voteCounts[c.id] || 0,
      has_voted: userVotes.has(c.id),
    }));
  };

  useEffect(() => {
    async function loadData() {
      if (!slug) return;

      setLoading(true);
      try {
        const movieId = extractMovieId(slug);
        const movieData = await getMovieById(movieId);
        setMovie(movieData);

        if (movieData) {
          const climaxData = await loadClimaxes(slug);
          setClimaxes(climaxData);
        }
      } catch (error) {
        console.error("Error loading movie:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug, user]);

  const sortedClimaxes = [...climaxes].sort((a, b) => {
    if (sortBy === "votes") {
      return b.vote_count - a.vote_count;
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  if (loading) {
    return (
      <div className="container py-12">
        <div className="animate-pulse">
          <div className="flex gap-8">
            <div className="w-48 aspect-[2/3] bg-muted rounded-lg shrink-0 hidden md:block" />
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-1/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">Movie Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The movie you're looking for doesn't exist.
        </p>
        <Link to="/movies" className="btn-primary">
          Browse Movies
        </Link>
      </div>
    );
  }

  const posterUrl = getImageUrl(movie.poster_path, "w500");
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  return (
    <>
      <title>{movie.title} - Alternate Endings | Lumiere</title>
      <meta
        name="description"
        content={`Read and share alternate endings for ${movie.title}. Discover how other cinephiles would have ended this film.`}
      />

      <div className="container py-8 md:py-12">
        {/* Movie Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {posterUrl && (
            <div className="w-48 shrink-0 mx-auto md:mx-0">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full rounded-lg glass-card"
              />
            </div>
          )}

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-serif font-bold">
              {movie.title}
            </h1>
            <div className="mt-3 flex items-center justify-center md:justify-start gap-3 text-muted-foreground">
              {year && <span>{year}</span>}
              {year && (
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              )}
              <span>{getLanguageName(movie.original_language)}</span>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Link
                to={`/write?movie=${movie.id}&title=${encodeURIComponent(
                  movie.title
                )}`}
                className="btn-primary"
              >
                Write Your Ending
              </Link>
              <span className="text-sm text-muted-foreground">
                {climaxes.length} alternate{" "}
                {climaxes.length === 1 ? "ending" : "endings"}
              </span>
            </div>
          </div>
        </div>

        {/* Ad */}
        {/* <AdPlaceholder size="leaderboard" className="mb-8" /> */}

        {/* Climaxes Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-bold">Alternate Endings</h2>

            {climaxes.length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "latest" | "votes")
                  }
                  className="input-dark py-2 text-sm"
                >
                  <option value="votes">Most Voted</option>
                  <option value="latest">Latest</option>
                </select>
              </div>
            )}
          </div>

          {sortedClimaxes.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <svg
                className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <h3 className="text-lg font-semibold mb-2">
                This movie hasn’t been reimagined yet by the community.
              </h3>
              <p className="text-muted-foreground mb-6">
                Be the first to write an alternate ending for this movie!
              </p>
              <Link
                to={`/write?movie=${movie.id}&title=${encodeURIComponent(
                  movie.title
                )}`}
                className="btn-primary"
              >
                Write the First Ending
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedClimaxes.map((climax) => (
                <ClimaxCard
                  key={climax.id}
                  id={climax.id}
                  content={climax.content}
                  authorName={climax.author_name}
                  authorId={climax.author_id}
                  createdAt={climax.created_at}
                  voteCount={climax.vote_count}
                  hasVoted={climax.has_voted}
                  onVoteChange={() =>
                    slug && loadClimaxes(slug).then(setClimaxes)
                  }
                />
              ))}
            </div>
          )}
        </section>

        {/* Bottom Ad */}
        {/* <AdPlaceholder size="rectangle" className="mt-12 max-w-md mx-auto" /> */}
      </div>
    </>
  );
}
