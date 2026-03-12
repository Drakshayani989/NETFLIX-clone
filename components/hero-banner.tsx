"use client"

import type { Movie } from "@/lib/types"

interface HeroBannerProps {
  movie: Movie
  onAddToList?: (movieId: string) => void
  isInList?: boolean
}

export function HeroBanner({ movie, onAddToList, isInList }: HeroBannerProps) {
  return (
    <div className="relative h-[70vh] md:h-[80vh] w-full">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.backdrop_url || movie.poster_url || "https://via.placeholder.com/1920x1080"})`
        }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12 pb-24 md:pb-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            {movie.title}
          </h1>
          
          <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
            {movie.rating && (
              <span className="border border-muted-foreground px-2 py-0.5">
                {movie.rating}
              </span>
            )}
            {movie.release_year && <span>{movie.release_year}</span>}
            {movie.duration && <span>{movie.duration}</span>}
            {movie.type === "series" && (
              <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-medium">
                Series
              </span>
            )}
          </div>
          
          <p className="text-muted-foreground text-sm md:text-base line-clamp-3 mb-6 max-w-xl">
            {movie.description}
          </p>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-foreground hover:bg-foreground/80 text-background px-6 py-3 rounded font-semibold transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>
            
            {onAddToList && (
              <button 
                onClick={() => onAddToList(movie.id)}
                className="flex items-center gap-2 bg-muted/60 hover:bg-muted text-foreground px-6 py-3 rounded font-semibold transition-colors"
              >
                {isInList ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    In My List
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    My List
                  </>
                )}
              </button>
            )}
            
            <button className="flex items-center gap-2 bg-muted/60 hover:bg-muted text-foreground px-6 py-3 rounded font-semibold transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
