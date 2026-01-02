const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export interface TMDBMovie {
  id: number;
  title: string;
  original_language: string;
  poster_path: string | null;
  release_date: string;
}

export interface TMDBSearchResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

export const getImageUrl = (
  path: string | null,
  size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" = "w342"
) => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
};

export const createMovieSlug = (id: number, title: string) => {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
  return `${id}-${slug}`;
};

export const extractMovieId = (slug: string): number => {
  const id = parseInt(slug.split("-")[0], 10);
  return isNaN(id) ? 0 : id;
};

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<TMDBSearchResponse> {
  if (!query.trim()) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}&include_adult=false`
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  return response.json();
}

export async function getPopularMovies(
  page: number = 1
): Promise<TMDBSearchResponse> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  return response.json();
}

export async function getMovieById(id: number): Promise<TMDBMovie | null> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function discoverMovies(
  page: number = 1,
  language?: string
): Promise<TMDBSearchResponse> {
  const langParam = language ? `&with_original_language=${language}` : "";

  const response = await fetch(
    `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}${langParam}&page=${page}&include_adult=false`
  );

  if (!response.ok) {
    throw new Error("Failed to discover movies");
  }

  return response.json();
}

// Language names mapping
export const languageNames: Record<string, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  hi: "Hindi",
  ar: "Arabic",
  ru: "Russian",
  nl: "Dutch",
  sv: "Swedish",
  da: "Danish",
  no: "Norwegian",
  fi: "Finnish",
  pl: "Polish",
  tr: "Turkish",
  th: "Thai",
  id: "Indonesian",
  ms: "Malay",
  vi: "Vietnamese",
  tl: "Filipino",
  cs: "Czech",
  hu: "Hungarian",
  ro: "Romanian",
  el: "Greek",
  he: "Hebrew",
  uk: "Ukrainian",
  bn: "Bengali",
  ta: "Tamil",
  te: "Telugu",
  ml: "Malayalam",
  mr: "Marathi",
  pa: "Punjabi",
  gu: "Gujarati",
  kn: "Kannada",
  ur: "Urdu",
  fa: "Persian",
};

export const getLanguageName = (code: string): string => {
  return languageNames[code] || code.toUpperCase();
};
