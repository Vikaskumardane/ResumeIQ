import { z } from 'zod'

export const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'] as const
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024

export const analyzeFormSchema = z.object({
  resumeFile: z 
    .instanceof(File)
    .refine((f) => ACCEPTED_FILE_TYPES.includes(f.type as any), 'Unsupported file type')
    .refine((f) => f.size <= MAX_FILE_SIZE_BYTES, 'File too large (max 5MB)'),
  jobDescription: z.string().min(20, 'Please paste a meaningful job description'),
})

export type AnalyzeFormValues = z.infer<typeof analyzeFormSchema>

export const analyzeApiSchema = z.object({
  analysis: z.string().min(1),
})


