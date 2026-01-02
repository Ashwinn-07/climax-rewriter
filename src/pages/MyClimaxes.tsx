import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ClimaxCard } from "@/components/ClimaxCard";
import { createMovieSlug } from "@/lib/tmdb";

interface MyClimax {
  id: string;
  movie_slug: string;
  movie_title: string;
  content: string;
  created_at: string;
  vote_count: number;
}

export default function MyClimaxes() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [climaxes, setClimaxes] = useState<MyClimax[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{ display_name: string } | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth?redirect=/my-climaxes");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    async function loadData() {
      if (!user) return;

      setLoading(true);
      try {
        // Load profile
        const { data: profileData } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("id", user.id)
          .single();

        setProfile(profileData);

        // Load climaxes
        const { data: climaxData, error } = await supabase
          .from("climaxes")
          .select("id, movie_slug, movie_title, content, created_at")
          .eq("author_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Get vote counts
        const climaxIds = climaxData?.map((c) => c.id) || [];
        const { data: votesData } = await supabase
          .from("votes")
          .select("climax_id")
          .in("climax_id", climaxIds);

        const voteCounts: Record<string, number> = {};
        votesData?.forEach((v) => {
          voteCounts[v.climax_id] = (voteCounts[v.climax_id] || 0) + 1;
        });

        setClimaxes(
          climaxData?.map((c) => ({
            ...c,
            vote_count: voteCounts[c.id] || 0,
          })) || []
        );
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ending?")) return;

    try {
      await supabase.from("climaxes").delete().eq("id", id);
      setClimaxes((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="container py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48" />
          <div className="h-4 bg-muted rounded w-64" />
          <div className="space-y-6 mt-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-card p-6">
                <div className="h-4 bg-muted rounded w-1/4 mb-4" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>My Climaxes - Lumiere</title>
      <meta
        name="description"
        content="View and manage your alternate movie endings."
      />

      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold">My Climaxes</h1>
          <p className="mt-2 text-muted-foreground">
            {profile?.display_name || "Your"} alternate endings
          </p>
        </div>

        {climaxes.length === 0 ? (
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
            <h2 className="text-lg font-semibold mb-2">No Endings Yet</h2>
            <p className="text-muted-foreground mb-6">
              You haven't written any alternate endings yet. Start by finding a
              movie!
            </p>
            <Link to="/movies" className="btn-primary">
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {climaxes.map((climax) => (
              <div key={climax.id} className="relative">
                <ClimaxCard
                  id={climax.id}
                  content={climax.content}
                  authorName={profile?.display_name || "You"}
                  authorId={user?.id || ""}
                  createdAt={climax.created_at}
                  voteCount={climax.vote_count}
                  hasVoted={false}
                  movieTitle={climax.movie_title}
                  movieSlug={climax.movie_slug}
                />

                <button
                  onClick={() => handleDelete(climax.id)}
                  className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-destructive transition-colors"
                  title="Delete this ending"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {climaxes.length > 0 && (
          <div className="mt-8 text-center">
            <Link to="/write" className="btn-primary">
              Write Another Ending
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
