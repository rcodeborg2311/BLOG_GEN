import { NextResponse } from 'next/server'
import { generateContent } from '@/lib/groq'

export async function POST(request: Request) {
  try {
    const { context, type } = await request.json()

    if (!context || !type) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const content = await generateContent(context, type)
    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error in generate API route:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
} 