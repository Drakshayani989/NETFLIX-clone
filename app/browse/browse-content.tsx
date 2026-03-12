"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { HeroBanner } from "@/components/hero-banner"
import { MovieRow } from "@/components/movie-row"
import { createClient } from "@/lib/supabase/client"
import type { Movie, WatchlistItem } from "@/lib/types"

interface BrowseContentProps {
  movies: Movie[]
  featuredMovies: Movie[]
  watchlist: WatchlistItem[]
  userEmail: string
  currentType?: string
  currentGenre?: string
}

export function BrowseContent({ 
  movies, 
  featuredMovies, 
  watchlist: initialWatchlist,
  userEmail,
  currentType,
}: BrowseContentProps) {
  const [watchlist, setWatchlist] = useState(initialWatchlist)
  const router = useRouter()
  const supabase = createClient()
  
  // Get watchlist movie IDs
  const watchlistIds = useMemo(() => 
    watchlist.map(item => item.movies?.id).filter(Boolean) as string[], 
    [watchlist]
  )
  
  // Featured movie for hero banner
  const heroMovie = featuredMovies[0] || movies[0]
  
  // Categorize movies
  const tvShows = useMemo(() => 
    movies.filter(m => m.type === "series"), 
    [movies]
  )
  
  const moviesList = useMemo(() => 
    movies.filter(m => m.type === "movie"), 
    [movies]
  )
  
  // Get unique genres
  const genres = useMemo(() => {
    const allGenres = movies.flatMap(m => m.genre || [])
    return [...new Set(allGenres)]
  }, [movies])
  
  // Group movies by genre
  const moviesByGenre = useMemo(() => {
    const grouped: Record<string, Movie[]> = {}
    genres.forEach(genre => {
      grouped[genre] = movies.filter(m => m.genre?.includes(genre))
    })
    return grouped
  }, [movies, genres])
  
  // My List movies
  const myListMovies = useMemo(() => 
    watchlist.map(item => item.movies).filter(Boolean) as Movie[],
    [watchlist]
  )
  
  const handleAddToList = async (movieId: string) => {
    const { data, error } = await supabase
      .from("watchlist")
      .insert({ movie_id: movieId })
      .select(`
        id,
        added_at,
        movies (*)
      `)
      .single()
    
    if (!error && data) {
      setWatchlist(prev => [data as WatchlistItem, ...prev])
    }
    
    router.refresh()
  }
  
  const handleRemoveFromList = async (movieId: string) => {
    await supabase
      .from("watchlist")
      .delete()
      .eq("movie_id", movieId)
    
    setWatchlist(prev => prev.filter(item => item.movies?.id !== movieId))
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar userEmail={userEmail} />
      
      {/* Hero Banner */}
      {heroMovie && (
        <HeroBanner 
          movie={heroMovie}
          onAddToList={watchlistIds.includes(heroMovie.id) ? () => handleRemoveFromList(heroMovie.id) : () => handleAddToList(heroMovie.id)}
          isInList={watchlistIds.includes(heroMovie.id)}
        />
      )}
      
      {/* Content Rows */}
      <div className="-mt-20 relative z-10 pb-16">
        {/* My List */}
        {myListMovies.length > 0 && (
          <MovieRow
            title="My List"
            movies={myListMovies}
            watchlistIds={watchlistIds}
            onAddToList={handleAddToList}
            onRemoveFromList={handleRemoveFromList}
          />
        )}
        
        {/* Featured */}
        {!currentType && featuredMovies.length > 0 && (
          <MovieRow
            title="Featured"
            movies={featuredMovies}
            watchlistIds={watchlistIds}
            onAddToList={handleAddToList}
            onRemoveFromList={handleRemoveFromList}
          />
        )}
        
        {/* TV Shows */}
        {(!currentType || currentType === "series") && tvShows.length > 0 && (
          <MovieRow
            title="TV Shows"
            movies={tvShows}
            watchlistIds={watchlistIds}
            onAddToList={handleAddToList}
            onRemoveFromList={handleRemoveFromList}
          />
        )}
        
        {/* Movies */}
        {(!currentType || currentType === "movie") && moviesList.length > 0 && (
          <MovieRow
            title="Movies"
            movies={moviesList}
            watchlistIds={watchlistIds}
            onAddToList={handleAddToList}
            onRemoveFromList={handleRemoveFromList}
          />
        )}
        
        {/* Genre Rows */}
        {genres.slice(0, 5).map(genre => (
          moviesByGenre[genre]?.length > 0 && (
            <MovieRow
              key={genre}
              title={genre}
              movies={moviesByGenre[genre]}
              watchlistIds={watchlistIds}
              onAddToList={handleAddToList}
              onRemoveFromList={handleRemoveFromList}
            />
          )
        ))}
      </div>
    </div>
  )
}
