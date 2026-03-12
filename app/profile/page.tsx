import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProfileContent } from "./profile-content"
import type { WatchlistItem, Profile } from "@/lib/types"

export default async function ProfilePage() {
  const supabase = await createClient()
  
  // Check authentication
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login")
  }
  
  // Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()
  
  // Fetch user's watchlist
  const { data: watchlist } = await supabase
    .from("watchlist")
    .select(`
      id,
      added_at,
      movies (*)
    `)
    .eq("user_id", user.id)
    .order("added_at", { ascending: false })
  
  const userProfile: Profile = profile || {
    id: user.id,
    display_name: user.email?.split("@")[0] || "User",
    avatar_url: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
    created_at: user.created_at,
    updated_at: user.created_at,
  }
  
  return (
    <ProfileContent
      profile={userProfile}
      watchlist={(watchlist as WatchlistItem[]) || []}
      userEmail={user.email || ""}
    />
  )
}
