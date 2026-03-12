export interface Movie {
  id: string
  title: string
  description: string | null
  release_year: number | null
  rating: string | null
  duration: string | null
  genre: string[] | null
  poster_url: string | null
  backdrop_url: string | null
  trailer_url: string | null
  type: "movie" | "series"
  is_featured: boolean
  created_at: string
}

export interface Profile {
  id: string
  display_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface WatchlistItem {
  id: string
  added_at: string
  movies: Movie
}

export interface WatchHistoryItem {
  id: string
  progress_seconds: number
  duration_seconds: number | null
  completed: boolean
  last_watched_at: string
  movies: Movie
}
