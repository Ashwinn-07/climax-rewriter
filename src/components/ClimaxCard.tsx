import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface ClimaxCardProps {
  id: string;
  content: string;
  authorName: string;
  authorId: string;
  createdAt: string;
  voteCount: number;
  hasVoted: boolean;
  movieTitle?: string;
  movieSlug?: string;
  onVoteChange?: () => void;
}

export function ClimaxCard({
  id,
  content,
  authorName,
  authorId,
  createdAt,
  voteCount,
  hasVoted,
  movieTitle,
  movieSlug,
  onVoteChange,
}: ClimaxCardProps) {
  const { user } = useAuth();
  const [isVoting, setIsVoting] = useState(false);
  const [localVoteCount, setLocalVoteCount] = useState(voteCount);
  const [localHasVoted, setLocalHasVoted] = useState(hasVoted);

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleVote = async () => {
    if (!user) return;
    if (isVoting) return;

    setIsVoting(true);

    try {
      if (localHasVoted) {
        // Remove vote
        await supabase
          .from("votes")
          .delete()
          .eq("climax_id", id)
          .eq("user_id", user.id);
        
        setLocalVoteCount((prev) => prev - 1);
        setLocalHasVoted(false);
      } else {
        // Add vote
        await supabase
          .from("votes")
          .insert({ climax_id: id, user_id: user.id });
        
        setLocalVoteCount((prev) => prev + 1);
        setLocalHasVoted(true);
      }
      
      onVoteChange?.();
    } catch (error) {
      console.error("Vote error:", error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <article className="glass-card p-6 animate-fade-in">
      {movieTitle && movieSlug && (
        <Link 
          to={`/movie/${movieSlug}`}
          className="inline-block text-xs font-medium text-primary hover:text-primary/80 transition-colors mb-3"
        >
          {movieTitle}
        </Link>
      )}

      <div className="prose prose-invert max-w-none">
        <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-sm font-medium">
            {authorName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium">{authorName}</p>
            <p className="text-xs text-muted-foreground">{formattedDate}</p>
          </div>
        </div>

        <button
          onClick={handleVote}
          disabled={!user || isVoting}
          className={`vote-btn ${localHasVoted ? "voted" : ""} ${!user ? "opacity-50 cursor-not-allowed" : ""}`}
          title={user ? (localHasVoted ? "Remove vote" : "Vote for this ending") : "Sign in to vote"}
        >
          <svg
            className={`w-5 h-5 transition-transform ${isVoting ? "animate-pulse" : ""} ${localHasVoted ? "scale-110" : ""}`}
            fill={localHasVoted ? "currentColor" : "none"}
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
          <span className="text-sm font-medium">{localVoteCount}</span>
        </button>
      </div>
    </article>
  );
}
