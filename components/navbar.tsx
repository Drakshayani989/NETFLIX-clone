"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

interface NavbarProps {
  userEmail?: string
}

export function Navbar({ userEmail }: NavbarProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Handle scroll effect
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 0)
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? "bg-background" : "bg-gradient-to-b from-black/80 to-transparent"}`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        {/* Logo and Nav Links */}
        <div className="flex items-center gap-8">
          <Link href="/browse" className="text-xl md:text-2xl font-bold text-primary">
            NETFLIX
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/browse" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
              Home
            </Link>
            <Link href="/browse?type=series" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              TV Shows
            </Link>
            <Link href="/browse?type=movie" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Movies
            </Link>
            <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              My List
            </Link>
          </div>
        </div>
        
        {/* User Menu */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
                alt="Profile"
                className="w-8 h-8 rounded"
              />
              <svg 
                className={`w-4 h-4 text-foreground transition-transform ${showDropdown ? "rotate-180" : ""}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-background/95 border border-border rounded shadow-lg py-2">
                <div className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                  {userEmail}
                </div>
                <Link 
                  href="/profile"
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
