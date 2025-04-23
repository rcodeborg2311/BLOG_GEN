import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateContent(prompt: string, type: 'bio' | 'about' | 'post' | 'project') {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a professional content writer. Generate ${type} content based on the user's prompt.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    return completion.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('Error generating content:', error)
    throw error
  }
} 