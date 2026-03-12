"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { MovieCard } from "@/components/movie-card"
import { createClient } from "@/lib/supabase/client"
import type { Profile, WatchlistItem, Movie } from "@/lib/types"

interface ProfileContentProps {
  profile: Profile
  watchlist: WatchlistItem[]
  userEmail: string
}

export function ProfileContent({ profile, watchlist: initialWatchlist, userEmail }: ProfileContentProps) {
  const [watchlist, setWatchlist] = useState(initialWatchlist)
  const [displayName, setDisplayName] = useState(profile.display_name || "")
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  
  const handleRemoveFromList = async (movieId: string) => {
    await supabase
      .from("watchlist")
      .delete()
      .eq("movie_id", movieId)
    
    setWatchlist(prev => prev.filter(item => item.movies?.id !== movieId))
    router.refresh()
  }
  
  const handleUpdateProfile = async () => {
    setSaving(true)
    
    await supabase
      .from("profiles")
      .upsert({
        id: profile.id,
        display_name: displayName,
        updated_at: new Date().toISOString(),
      })
    
    setSaving(false)
    setIsEditing(false)
    router.refresh()
  }
  
  const myListMovies = watchlist.map(item => item.movies).filter(Boolean) as Movie[]

  return (
    <div className="min-h-screen bg-background">
      <Navbar userEmail={userEmail} />
      
      <main className="pt-24 pb-16 px-4 md:px-12">
        {/* Profile Header */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-12">
            {/* Avatar */}
            <div className="relative">
              <img
                src={profile.avatar_url || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
                alt={profile.display_name || "Profile"}
                className="w-32 h-32 rounded-lg"
              />
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Display name"
                    className="w-full max-w-xs px-4 py-2 bg-muted border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <div className="flex gap-2 justify-center md:justify-start">
                    <button
                      onClick={handleUpdateProfile}
                      disabled={saving}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false)
                        setDisplayName(profile.display_name || "")
                      }}
                      className="px-4 py-2 border border-border text-foreground rounded font-medium hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {profile.display_name || "User"}
                  </h1>
                  <p className="text-muted-foreground mb-4">{userEmail}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 border border-border text-foreground rounded font-medium hover:bg-muted transition-colors"
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-muted/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-foreground mb-1">
                {myListMovies.length}
              </div>
              <div className="text-sm text-muted-foreground">In My List</div>
            </div>
            <div className="bg-muted/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-foreground mb-1">
                {myListMovies.filter(m => m.type === "movie").length}
              </div>
              <div className="text-sm text-muted-foreground">Movies</div>
            </div>
            <div className="bg-muted/30 rounded-lg p-6 text-center col-span-2 md:col-span-1">
              <div className="text-3xl font-bold text-foreground mb-1">
                {myListMovies.filter(m => m.type === "series").length}
              </div>
              <div className="text-sm text-muted-foreground">TV Shows</div>
            </div>
          </div>
        </div>
        
        {/* My List Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              My List
            </h2>
            <Link 
              href="/browse"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse more
            </Link>
          </div>
          
          {myListMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {myListMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isInList={true}
                  onRemoveFromList={handleRemoveFromList}
                  onAddToList={() => {}}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-muted/30 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Your list is empty</h3>
              <p className="text-muted-foreground mb-6">
                Add movies and TV shows to your list to watch them later.
              </p>
              <Link 
                href="/browse"
                className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded font-semibold transition-colors"
              >
                Browse Content
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
