'use client'

import { useState } from 'react'
import { Button } from '@/src/components/ui/button'

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }
  return (
    <Button type="button" onClick={onCopy} className="h-9 px-3">
      {copied ? 'Copied' : label}
    </Button>
  )
}


