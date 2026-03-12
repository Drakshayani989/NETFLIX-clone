import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="px-6 py-6 md:px-12">
        <Link href="/" className="text-2xl md:text-4xl font-bold text-primary">
          NETFLIX
        </Link>
      </header>
      
      {/* Success Message */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">Check your email</h1>
          <p className="text-muted-foreground mb-8">
            We&apos;ve sent you a confirmation link. Please check your email and click the link to activate your account.
          </p>
          
          <Link 
            href="/auth/login"
            className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded font-semibold transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </main>
    </div>
  )
}
