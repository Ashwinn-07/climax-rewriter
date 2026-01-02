import { Link } from "react-router-dom";
import { TMDBMovie, getImageUrl, createMovieSlug, getLanguageName } from "@/lib/tmdb";

interface MovieCardProps {
  movie: TMDBMovie;
  climaxCount?: number;
}

export function MovieCard({ movie, climaxCount }: MovieCardProps) {
  const posterUrl = getImageUrl(movie.poster_path, "w342");
  const slug = createMovieSlug(movie.id, movie.title);
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : null;

  return (
    <Link
      to={`/movie/${slug}`}
      className="group block glass-card overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:glow-cyan"
    >
      <div className="aspect-[2/3] relative overflow-hidden bg-muted">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-muted-foreground/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          {year && <span>{year}</span>}
          {year && <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />}
          <span>{getLanguageName(movie.original_language)}</span>
        </div>

        {climaxCount !== undefined && (
          <div className="mt-3 flex items-center gap-1.5 text-xs">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span className="text-primary font-medium">{climaxCount} alternate {climaxCount === 1 ? 'ending' : 'endings'}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
