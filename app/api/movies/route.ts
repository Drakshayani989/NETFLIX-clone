import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") // 'movie' | 'series' | null (all)
  const genre = searchParams.get("genre")
  const featured = searchParams.get("featured")
  const search = searchParams.get("search")
  
  const supabase = await createClient()
  
  let query = supabase.from("movies").select("*")
  
  if (type) {
    query = query.eq("type", type)
  }
  
  if (genre) {
    query = query.contains("genre", [genre])
  }
  
  if (featured === "true") {
    query = query.eq("is_featured", true)
  }
  
  if (search) {
    query = query.ilike("title", `%${search}%`)
  }
  
  const { data, error } = await query.order("created_at", { ascending: false })
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}
