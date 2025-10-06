import { SignIn } from '@clerk/nextjs'

export const dynamic = 'force-static'

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <SignIn
        afterSignInUrl="/analyzer"
        signUpUrl="/sign-up"
        redirectUrl="/analyzer"
      />
    </main>
  )
}


