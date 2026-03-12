import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// Get user's watchlist
export async function GET() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const { data, error } = await supabase
    .from("watchlist")
    .select(`
      id,
      added_at,
      movies (*)
    `)
    .eq("user_id", user.id)
    .order("added_at", { ascending: false })
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}

// Add to watchlist
export async function POST(request: Request) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const { movieId } = await request.json()
  
  if (!movieId) {
    return NextResponse.json({ error: "Movie ID required" }, { status: 400 })
  }
  
  const { data, error } = await supabase
    .from("watchlist")
    .insert({
      user_id: user.id,
      movie_id: movieId,
    })
    .select()
    .single()
  
  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Already in watchlist" }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data, { status: 201 })
}

// Remove from watchlist
export async function DELETE(request: Request) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const { movieId } = await request.json()
  
  if (!movieId) {
    return NextResponse.json({ error: "Movie ID required" }, { status: 400 })
  }
  
  const { error } = await supabase
    .from("watchlist")
    .delete()
    .eq("user_id", user.id)
    .eq("movie_id", movieId)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ success: true })
}
