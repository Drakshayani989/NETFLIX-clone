import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { BrowseContent } from "./browse-content"
import type { Movie, WatchlistItem } from "@/lib/types"

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; genre?: string }>
}) {
  const { type, genre } = await searchParams
  const supabase = await createClient()
  
  // Check authentication
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login")
  }
  
  // Fetch all movies
  let moviesQuery = supabase.from("movies").select("*")
  
  if (type) {
    moviesQuery = moviesQuery.eq("type", type)
  }
  
  if (genre) {
    moviesQuery = moviesQuery.contains("genre", [genre])
  }
  
  const { data: movies } = await moviesQuery.order("created_at", { ascending: false })
  
  // Fetch featured movies
  const { data: featuredMovies } = await supabase
    .from("movies")
    .select("*")
    .eq("is_featured", true)
    .limit(5)
  
  // Fetch user's watchlist
  const { data: watchlist } = await supabase
    .from("watchlist")
    .select(`
      id,
      added_at,
      movies (*)
    `)
    .eq("user_id", user.id)
  
  return (
    <BrowseContent
      movies={(movies as Movie[]) || []}
      featuredMovies={(featuredMovies as Movie[]) || []}
      watchlist={(watchlist as WatchlistItem[]) || []}
      userEmail={user.email || ""}
      currentType={type}
      currentGenre={genre}
    />
  )
}
