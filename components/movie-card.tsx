"use client"

import { useState } from "react"
import type { Movie } from "@/lib/types"

interface MovieCardProps {
  movie: Movie
  onAddToList?: (movieId: string) => void
  onRemoveFromList?: (movieId: string) => void
  isInList?: boolean
}

export function MovieCard({ movie, onAddToList, onRemoveFromList, isInList = false }: MovieCardProps) {
  const [showInfo, setShowInfo] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative flex-shrink-0 w-[160px] md:w-[200px] group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setShowInfo(false)
      }}
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] rounded overflow-hidden bg-muted">
        <img
          src={movie.poster_url || "https://via.placeholder.com/200x300?text=No+Image"}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-3">
            <h3 className="text-sm font-semibold text-foreground line-clamp-2">{movie.title}</h3>
            
            <div className="flex items-center gap-2 mt-2">
              <button 
                className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center hover:bg-foreground/80 transition-colors"
                title="Play"
              >
                <svg className="w-4 h-4 text-background" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              
              {onAddToList && onRemoveFromList && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    isInList ? onRemoveFromList(movie.id) : onAddToList(movie.id)
                  }}
                  className="w-8 h-8 rounded-full border-2 border-muted-foreground flex items-center justify-center hover:border-foreground transition-colors"
                  title={isInList ? "Remove from My List" : "Add to My List"}
                >
                  {isInList ? (
                    <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </button>
              )}
              
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setShowInfo(!showInfo)
                }}
                className="w-8 h-8 rounded-full border-2 border-muted-foreground flex items-center justify-center hover:border-foreground transition-colors ml-auto"
                title="More Info"
              >
                <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              {movie.rating && <span className="border border-muted-foreground px-1">{movie.rating}</span>}
              {movie.release_year && <span>{movie.release_year}</span>}
              {movie.duration && <span>{movie.duration}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
