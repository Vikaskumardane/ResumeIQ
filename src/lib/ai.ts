import OpenAI from 'openai'

export function getOpenAI() {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    throw new Error('Missing OPENROUTER_API_KEY')
  }
  const referer = process.env.OPENROUTER_SITE_URL
  const title = process.env.OPENROUTER_SITE_NAME
  return new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey,
    defaultHeaders: {
      ...(referer ? { 'HTTP-Referer': referer } : {}),
      ...(title ? { 'X-Title': title } : {}),
    },
  })
}


