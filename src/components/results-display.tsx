import ReactMarkdown from 'react-markdown'
import { Skeleton } from '@/src/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { CopyButton } from '@/src/components/copy-button'
import clsx from 'clsx'

type Props =
  | { status: 'loading' }
  | { status: 'error'; message?: string }
  | { status: 'success'; markdown: string }

export function ResultsDisplay(props: Props) {
  if (props.status === 'loading') {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    )
  }
  if (props.status === 'error') {
    return <div className="text-red-600 text-sm">{props.message || 'Failed to load analysis.'}</div>
  }

  const scoreMatch = props.markdown.match(/Fit Score"?\s*from\s*1-10[^\n]*\n([\s\S]*?)(?=##|$)/i)
  const extracted = {
    scoreBlock: scoreMatch?.[1]?.trim(),
  }

  return (
    <div className="space-y-6">
      <Card className="border-violet-200/40">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>AI Analysis</CardTitle>
          <CopyButton text={props.markdown} label="Copy Markdown" />
        </CardHeader>
        <CardContent>
          {/* Highlight score summary if present */}
          {extracted.scoreBlock && (
            <div className="mb-4 rounded-lg border p-4 bg-gradient-to-b from-violet-50/40 to-transparent dark:from-violet-400/5">
              <div className="text-sm font-medium">Overall Fit Summary</div>
              <p className="text-sm text-foreground/70 mt-1 whitespace-pre-line">{extracted.scoreBlock}</p>
            </div>
          )}

          <article className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{props.markdown}</ReactMarkdown>
          </article>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { title: 'Copy All', desc: 'Copy the full report as Markdown', action: () => navigator.clipboard.writeText(props.markdown) },
          { title: 'Download .md', desc: 'Save the report as a Markdown file', action: () => downloadMarkdown(props.markdown) },
          { title: 'Start Over', desc: 'Upload a new resume and JD', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        ].map((a) => (
          <Card key={a.title} className="transition-transform hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle className="text-base">{a.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-foreground/70">{a.desc}</div>
              <button onClick={a.action as any} className="mt-3 text-sm underline">Do it</button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function downloadMarkdown(markdown: string) {
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'resumeiq-analysis.md'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}


