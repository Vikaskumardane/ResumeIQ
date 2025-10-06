import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { ParsingError, ValidationError, AiError, AuthError } from '@/src/lib/errors'
import { getOpenAI } from '@/src/lib/ai'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const formSchema = z.object({
  resumeFile: z.instanceof(Blob),
  jobDescription: z.string().min(20),
})

async function readFileToText(file: File): Promise<string> {
  const type = file.type
  const buffer = Buffer.from(await file.arrayBuffer())
  if (type === 'application/pdf') {
    try {
      const { default: pdfParse } = await import('pdf-parse')
      const result = await pdfParse(buffer)
      if (!result.text?.trim()) throw new ParsingError('Empty PDF text')
      return result.text
    } catch (e) {
      throw new ParsingError('Failed to parse PDF')
    }
  }
  if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    try {
      // Minimal docx text fallback: many docx files include readable text segments
      // For production-grade parsing, integrate a dedicated docx text extractor.
      const text = buffer.toString('utf8')
      if (!text.trim()) throw new ParsingError('Empty DOCX text')
      return text
    } catch (e) {
      throw new ParsingError('Failed to parse DOCX')
    }
  }
  if (type === 'text/plain') {
    return buffer.toString('utf8')
  }
  throw new ValidationError('Unsupported file type')
}

export async function POST(req: NextRequest) {
//   const { userId } = auth()
//   if (!userId) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

  const formData = await req.formData()
  const resumeFile = formData.get('resumeFile')
  const jobDescription = formData.get('jobDescription')

  if (!(resumeFile instanceof File) || typeof jobDescription !== 'string') {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const parsed = formSchema.safeParse({ resumeFile, jobDescription })
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 })
  }

  let resumeText = ''
  try {
    resumeText = await readFileToText(resumeFile)
  } catch (e: any) {
    if (e instanceof ValidationError) {
      return NextResponse.json({ error: e.message }, { status: 400 })
    }
    if (e instanceof ParsingError) {
      return NextResponse.json({ error: e.message }, { status: 422 })
    }
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 })
  }

  const prompt = `You are an expert resume reviewer and career coach. Your task is to provide a comprehensive, actionable review of a user's resume against a target job description, formatted in Markdown.

JOB DESCRIPTION:
---
${parsed.data.jobDescription}
---

RESUME TEXT:
---
${resumeText}
---

Generate a detailed feedback report using the following Markdown structure:

## Overall Fit Analysis
Provide a "Fit Score" from 1-10 and a 2-3 sentence summary explaining the score based on the alignment between the resume and job description.

## ✅ Strengths
- Identify 2-3 specific strengths of the resume in relation to the job.

## 🟡 Areas for Improvement
- Identify 2-3 specific weaknesses or gaps in the resume.

## 💡 Actionable Suggestions
1.  Provide a numbered list of concrete steps for improvement.
2.  For at least two bullet points from the resume, provide a "Before" and "After" example of how to rewrite it to be more impactful and tailored to the job description.`

  try {
    const client = getOpenAI()
    const completion = await client.chat.completions.create({
      model: 'deepseek/deepseek-chat-v3.1:free',
      messages: [
        { role: 'system', content: 'You are a precise and helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.2,
    })
    const content = completion.choices?.[0]?.message?.content?.trim() || ''
    if (!content) {
      return NextResponse.json({ error: 'Empty response from model' }, { status: 502 })
    }
    return NextResponse.json({ analysis: content })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'AI request failed' }, { status: 502 })
  }
}


