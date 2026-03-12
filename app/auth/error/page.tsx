import Link from "next/link"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="px-6 py-6 md:px-12">
        <Link href="/" className="text-2xl md:text-4xl font-bold text-primary">
          NETFLIX
        </Link>
      </header>
      
      {/* Error Message */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">Authentication Error</h1>
          <p className="text-muted-foreground mb-8">
            Something went wrong during authentication. Please try again or contact support if the problem persists.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/login"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded font-semibold transition-colors"
            >
              Try Again
            </Link>
            <Link 
              href="/"
              className="border border-border hover:bg-muted text-foreground px-8 py-3 rounded font-semibold transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
