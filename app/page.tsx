import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    redirect("/browse")
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/94eb5ad7-10d8-4571-8252-c4c2fd7c4649/US-en-20231030-popsignuptwoweeks-perspective_alpha_website_large.jpg')"
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-6 md:px-12">
          <h1 className="text-2xl md:text-4xl font-bold text-primary">NETFLIX</h1>
          <Link 
            href="/auth/login"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Sign In
          </Link>
        </header>
        
        {/* Hero Section */}
        <main className="flex flex-col items-center justify-center px-6 py-24 md:py-32 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-4xl leading-tight text-balance">
            Unlimited movies, TV shows, and more
          </h2>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            Watch anywhere. Cancel anytime.
          </p>
          <p className="mt-6 text-muted-foreground">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-xl">
            <Link 
              href="/auth/sign-up"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded text-lg font-semibold transition-colors text-center"
            >
              Get Started
            </Link>
          </div>
        </main>
        
        {/* Features Section */}
        <section className="border-t border-border/30 py-16 px-6 md:px-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Watch Everywhere</h3>
              <p className="text-muted-foreground">Stream on your phone, tablet, laptop, and TV.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No Commitments</h3>
              <p className="text-muted-foreground">Cancel anytime. No contracts, no cancellation fees.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Endless Entertainment</h3>
              <p className="text-muted-foreground">Explore thousands of titles across genres.</p>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="border-t border-border/30 py-8 px-6 text-center text-muted-foreground text-sm">
          <p>Netflix Clone - Built with Next.js and Supabase</p>
        </footer>
      </div>
    </div>
  )
}
