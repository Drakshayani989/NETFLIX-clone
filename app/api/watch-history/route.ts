import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// Get user's watch history (continue watching)
export async function GET() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const { data, error } = await supabase
    .from("watch_history")
    .select(`
      id,
      progress_seconds,
      duration_seconds,
      completed,
      last_watched_at,
      movies (*)
    `)
    .eq("user_id", user.id)
    .eq("completed", false)
    .order("last_watched_at", { ascending: false })
    .limit(10)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}

// Update watch progress
export async function POST(request: Request) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const { movieId, progressSeconds, durationSeconds, completed } = await request.json()
  
  if (!movieId) {
    return NextResponse.json({ error: "Movie ID required" }, { status: 400 })
  }
  
  const { data, error } = await supabase
    .from("watch_history")
    .upsert({
      user_id: user.id,
      movie_id: movieId,
      progress_seconds: progressSeconds || 0,
      duration_seconds: durationSeconds,
      completed: completed || false,
      last_watched_at: new Date().toISOString(),
    }, {
      onConflict: "user_id,movie_id"
    })
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}
