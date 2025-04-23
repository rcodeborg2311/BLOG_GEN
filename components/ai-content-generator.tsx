"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, FileText, ImageIcon, Type, Check } from "lucide-react"

type ContentType = "bio" | "post" | "about" | "project"

interface GeneratedContent {
  type: ContentType
  title: string
  content: string
  isGenerating: boolean
  isGenerated: boolean
}

export function AiContentGenerator() {
  const [contentPrompt, setContentPrompt] = useState("")
  const [resumeData, setResumeData] = useState<string>("")
  const [blogData, setBlogData] = useState<string>("")
  const [generatedContents, setGeneratedContents] = useState<GeneratedContent[]>([
    { type: "bio", title: "Professional Bio", content: "", isGenerating: false, isGenerated: false },
    { type: "about", title: "About Me Page", content: "", isGenerating: false, isGenerated: false },
    { type: "post", title: "Sample Blog Post", content: "", isGenerating: false, isGenerated: false },
    { type: "project", title: "Project Description", content: "", isGenerating: false, isGenerated: false },
  ])

  useEffect(() => {
    // Get resume data from localStorage
    const storedResume = localStorage.getItem('resumeFile')
    if (storedResume) {
      setResumeData(storedResume)
    }

    // Get blog data from localStorage
    const storedBlog = localStorage.getItem('blogContent')
    if (storedBlog) {
      setBlogData(storedBlog)
    }
  }, [])

  const generateContentForType = async (type: ContentType) => {
    try {
      // Update state to show generation in progress
      setGeneratedContents((prev) =>
        prev.map((item) => (item.type === type ? { ...item, isGenerating: true, isGenerated: false } : item)),
      )

      // Call the API route
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          context: {
            resumeData,
            blogData,
            prompt: contentPrompt
          },
          type
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const { content } = await response.json()

      setGeneratedContents((prev) =>
        prev.map((item) => {
          if (item.type !== type) return item

          return {
            ...item,
            content,
            isGenerating: false,
            isGenerated: true,
          }
        }),
      )
    } catch (error) {
      console.error("Error generating content:", error)
      // Reset generation state on error
      setGeneratedContents((prev) =>
        prev.map((item) => (item.type === type ? { ...item, isGenerating: false, isGenerated: false } : item)),
      )
    }
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 justify-center">
          <Sparkles className="h-5 w-5" />
          AI Content Generator
        </h2>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg text-center">Generate Content for Your Blog</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-center">What topics are you interested in?</label>
                <Textarea
                  placeholder="e.g., web development, travel photography, machine learning, cooking, etc."
                  value={contentPrompt}
                  onChange={(e) => setContentPrompt(e.target.value)}
                  className="min-h-[100px] w-full"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={() => {
                generateContentForType("bio")
                generateContentForType("about")
                generateContentForType("post")
                generateContentForType("project")
              }}
              size="lg"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate All Content
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {generatedContents.map((content) => (
          <Card key={content.type} className="relative">
            <CardHeader>
              <CardTitle className="text-lg">{content.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {content.isGenerating ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : content.isGenerated ? (
                <div className="prose max-w-none">
                  {content.content}
                </div>
              ) : (
                <div className="text-center text-gray-500 h-32 flex items-center justify-center">
                  Content will be generated here
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function User(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
