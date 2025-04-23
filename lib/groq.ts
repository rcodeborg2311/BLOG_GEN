import { Groq } from 'groq-sdk'

const fallbackContent = {
  bio: "John Doe is a passionate software engineer with 5+ years of experience in web development. Specializing in React and Node.js, John has worked on numerous projects ranging from small business websites to large-scale enterprise applications.",
  about: "Welcome to my blog! I'm a software engineer who loves sharing knowledge about web development, programming, and technology. Through this blog, I aim to help others learn and grow in their tech journey.",
  post: "In this post, we'll explore the fundamentals of React hooks and how they've revolutionized the way we write React components. We'll cover useState, useEffect, and custom hooks with practical examples.",
  project: "Project Name: E-commerce Platform\n\nA full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration."
}

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
})

interface ContentContext {
  resumeData?: string;
  blogData?: string;
  prompt?: string;
}

export async function generateContent(context: ContentContext, type: 'bio' | 'about' | 'post' | 'project') {
  try {
    // Only use Groq if we have an API key
    if (process.env.GROQ_API_KEY) {
      const systemPrompt = `You are a professional content writer. Generate ${type} content based on the following context:
${context.resumeData ? `Resume Information:\n${context.resumeData}\n` : ''}
${context.blogData ? `Blog Content:\n${context.blogData}\n` : ''}
${context.prompt ? `User Prompt:\n${context.prompt}\n` : ''}

Make the content engaging, professional, and well-structured. Ensure it reflects the person's experience and writing style.`

      const completion = await groq.chat.completions.create({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: `Generate a ${type} that incorporates the provided information and maintains a professional tone.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      })

      const generatedContent = completion.choices[0]?.message?.content
      if (generatedContent) {
        return generatedContent
      }
    }

    // Fallback to sample content if no API key or generation failed
    console.warn('Using fallback content. Please set GROQ_API_KEY in .env for AI-generated content.')
    return fallbackContent[type]
  } catch (error) {
    console.error('Error generating content with Groq:', error)
    return fallbackContent[type]
  }
} 