'use client'

import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { z } from 'zod'
import { analyzeFormSchema, AnalyzeFormValues, analyzeApiSchema } from '@/src/lib/validation'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import { ResultsDisplay } from '@/src/components/results-display'
import { Alert } from '@/src/components/ui/alert'

async function postAnalyze(form: AnalyzeFormValues) {
  const body = new FormData()
  body.append('resumeFile', form.resumeFile)
  body.append('jobDescription', form.jobDescription)
  const res = await fetch('/api/analyze', { method: 'POST', body, credentials: 'same-origin' })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Request failed')
  }
  const json = await res.json()
  const parsed = analyzeApiSchema.safeParse(json)
  if (!parsed.success) {
    throw new Error('Invalid response format')
  }
  return parsed.data
}

export function AnalyzerForm() {
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState('')

  const mutation = useMutation({
    mutationFn: postAnalyze,
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const validation = analyzeFormSchema.safeParse({ resumeFile: file, jobDescription })
    if (!validation.success) {
      const message = validation.error.issues.map((e) => e.message).join('; ')
      mutation.reset()
      // Surface a readable error via thrown rejection
      mutation.mutateAsync({} as any).catch(() => {})
      alert(message)
      return
    }
    mutation.mutate(validation.data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Resume file (PDF, DOCX, or TXT)</label>
          <Input
            type="file"
            accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Job description</label>
          <Textarea placeholder="Paste the target JD..." value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
        </div>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Analyzing…' : 'Analyze resume'}
        </Button>
      </form>

      <div className="mt-8">
        {mutation.isError && <Alert variant="destructive">{(mutation.error as Error).message || 'Something went wrong'}</Alert>}
        {mutation.isPending && <ResultsDisplay status="loading" />}
        {mutation.isSuccess && <ResultsDisplay status="success" markdown={mutation.data.analysis} />}
      </div>
    </div>
  )
}


