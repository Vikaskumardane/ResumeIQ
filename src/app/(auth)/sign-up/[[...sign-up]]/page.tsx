import { SignUp } from '@clerk/nextjs'

export const dynamic = 'force-static'

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <SignUp
        afterSignUpUrl="/analyzer"
        signInUrl="/sign-in"
        redirectUrl="/analyzer"
      />
    </main>
  )
}


