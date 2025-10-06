import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { AnalyzerForm } from '@/src/components/analyzer-form'

export default async function AnalyzerPage() {
  const user = await currentUser()
  if (!user) {
    redirect('/sign-in')
  }
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Resume Analyzer</h1>
      <p className="mt-2 text-sm text-foreground/70">Upload your resume and paste the target job description.</p>
      <div className="mt-6">
        <AnalyzerForm />
      </div>
    </main>
  )
}


