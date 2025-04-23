"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Download, ExternalLink, FileText, Sparkles } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { AiBlogCustomizer } from "@/components/ai-blog-customizer"
import { AiContentGenerator } from "@/components/ai-content-generator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function GenerateBlog() {
  const [generationStep, setGenerationStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if we have the required data
  useEffect(() => {
    const resumeData = localStorage.getItem('resumeFile')
    const blogData = localStorage.getItem('blogContent')

    if (!resumeData || !blogData) {
      setError('Please upload your resume and blog content first')
      return
    }

    setIsGenerating(true)
  }, [])

  // Simulate the generation process
  useEffect(() => {
    if (!isGenerating) return

    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress((prev) => {
          const newProgress = prev + 5

          // Update steps based on progress
          if (newProgress >= 25 && generationStep === 1) {
            setGenerationStep(2)
          } else if (newProgress >= 50 && generationStep === 2) {
            setGenerationStep(3)
          } else if (newProgress >= 75 && generationStep === 3) {
            setGenerationStep(4)
          } else if (newProgress >= 100) {
            setIsGenerating(false)
            setIsComplete(true)
          }

          return newProgress
        })
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [progress, isGenerating, generationStep])

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="border-b bg-white">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <span className="rounded-lg bg-black p-1">
                <FileText className="h-5 w-5 text-white" />
              </span>
              BlogGen
            </Link>
            <nav className="flex gap-4 sm:gap-6">
              <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
                <ArrowLeft className="h-4 w-4 mr-1 inline" />
                Back to Home
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-7xl">
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="text-center">
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back to Home
              </Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="rounded-lg bg-black p-1">
              <FileText className="h-5 w-5 text-white" />
            </span>
            BlogGen
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              <ArrowLeft className="h-4 w-4 mr-1 inline" />
              Back to Home
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {isGenerating ? (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Generating Your Blog</h1>

            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${generationStep >= 1 ? "bg-black text-white" : "border border-gray-200 text-gray-400"}`}
                >
                  {generationStep > 1 ? <Check className="h-4 w-4" /> : "1"}
                </div>
                <div>
                  <h3 className="font-medium">Analyzing Resume</h3>
                  <p className="text-sm text-gray-500">Extracting your skills, experience, and qualifications</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${generationStep >= 2 ? "bg-black text-white" : "border border-gray-200 text-gray-400"}`}
                >
                  {generationStep > 2 ? <Check className="h-4 w-4" /> : "2"}
                </div>
                <div>
                  <h3 className="font-medium">Processing Blog Content</h3>
                  <p className="text-sm text-gray-500">Analyzing your blog content and style</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${generationStep >= 3 ? "bg-black text-white" : "border border-gray-200 text-gray-400"}`}
                >
                  {generationStep > 3 ? <Check className="h-4 w-4" /> : "3"}
                </div>
                <div>
                  <h3 className="font-medium">Generating Content</h3>
                  <p className="text-sm text-gray-500">Creating personalized blog content</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${generationStep >= 4 ? "bg-black text-white" : "border border-gray-200 text-gray-400"}`}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : "4"}
                </div>
                <div>
                  <h3 className="font-medium">Finalizing</h3>
                  <p className="text-sm text-gray-500">Preparing your blog for review</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-center">Your Blog is Ready!</h1>
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Content Generator</TabsTrigger>
                <TabsTrigger value="customizer">Blog Customizer</TabsTrigger>
              </TabsList>
              <TabsContent value="content">
                <AiContentGenerator />
              </TabsContent>
              <TabsContent value="customizer">
                <AiBlogCustomizer />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      <footer className="border-t bg-white mt-auto">
        <div className="container flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <span className="rounded-lg bg-black p-1">
                <FileText className="h-5 w-5 text-white" />
              </span>
              BlogGen
            </Link>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} BlogGen. All rights reserved.</p>
          </div>
          <nav className="flex gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
