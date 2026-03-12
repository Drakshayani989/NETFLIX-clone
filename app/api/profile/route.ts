import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// Get user profile
export async function GET() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()
  
  if (error) {
    // Profile might not exist yet, return user email as fallback
    return NextResponse.json({
      id: user.id,
      display_name: user.email?.split("@")[0],
      avatar_url: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
    })
  }
  
  return NextResponse.json(data)
}

// Update user profile
export async function PATCH(request: Request) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const updates = await request.json()
  
  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}
