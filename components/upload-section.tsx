"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Link as LinkIcon, Sparkles } from "lucide-react"
import { extractBlogContent, BlogContent } from "@/lib/blog-extractor"
import { generateSampleBlog } from "@/lib/sample-blog-generator"

interface UploadSectionProps {
  onResumeUpload: (file: File) => void
  onBlogLinkProcessed: (content: BlogContent) => void
  onReady: (isReady: boolean) => void
}

export function UploadSection({ onResumeUpload, onBlogLinkProcessed, onReady }: UploadSectionProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [blogLink, setBlogLink] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setResumeFile(file)
      onResumeUpload(file)
      checkReadyState(file, blogLink)
    }
  }

  const handleBlogLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!blogLink) return

    setIsProcessing(true)
    try {
      const blogContent = await extractBlogContent(blogLink)
      onBlogLinkProcessed(blogContent)
      checkReadyState(resumeFile, blogLink)
    } catch (error) {
      console.error("Error processing blog link:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleGenerateSample = () => {
    const sampleBlog = generateSampleBlog()
    onBlogLinkProcessed(sampleBlog)
    checkReadyState(resumeFile, "sample")
  }

  const checkReadyState = (resume: File | null, blog: string) => {
    onReady(!!resume && !!blog)
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="resume" className="text-lg font-medium">
          Upload Your Resume
        </Label>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => document.getElementById('resume')?.click()}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Browse Files
            </Button>
            <Input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              className="hidden"
            />
          </div>
          {resumeFile && (
            <span className="text-sm text-gray-500">
              {resumeFile.name}
            </span>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="blog" className="text-lg font-medium">
          Enter Your Blog URL or Generate Sample
        </Label>
        <div className="mt-2 space-y-4">
          <form onSubmit={handleBlogLinkSubmit} className="flex items-center gap-4">
            <Input
              id="blog"
              type="url"
              placeholder="https://your-blog.com"
              value={blogLink}
              onChange={(e) => setBlogLink(e.target.value)}
              className="w-full max-w-sm"
            />
            <Button type="submit" disabled={!blogLink || isProcessing}>
              {isProcessing ? "Processing..." : "Process Blog"}
            </Button>
          </form>
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <Button
            variant="outline"
            onClick={handleGenerateSample}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Generate Sample Blog
          </Button>
        </div>
      </div>
    </div>
  )
} 