"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, FileText, LinkIcon, Laptop, Sparkles, Bot, Palette } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { SeoSettings } from "@/components/seo-settings"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [blogLink, setBlogLink] = useState("")

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setResumeFile(file)
      // Store the file in localStorage for the generate page
      localStorage.setItem('resumeFile', file.name)
    }
  }

  const handleGenerateClick = () => {
    if (resumeFile) {
      router.push('/generate')
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="rounded-lg bg-black p-1">
              <FileText className="h-5 w-5 text-white" />
            </span>
            BlogGen
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Pricing
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Sign In
            </Link>
            <Button>Sign Up</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
                  <Sparkles className="mr-1 h-3 w-3" /> AI-Powered Blog Generator
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Instantly Turn Your Resume and Blog Into a Personal Website
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Create a professional website in minutes by uploading your resume and linking your blog posts.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button 
                  className="w-full rounded-full text-lg py-6" 
                  size="lg"
                  onClick={handleGenerateClick}
                  disabled={!resumeFile}
                >
                  Generate My Blog
                </Button>
              </div>
              <div className="mt-8">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  width={800}
                  height={400}
                  alt="Blog preview"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Upload Your Content</h2>
                  <p className="text-gray-500 md:text-xl">
                    We'll extract all the important information from your resume and blog posts to create a personalized
                    website.
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-4 rounded-xl border bg-gray-50 p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Upload Resume</h3>
                  <p className="text-sm text-gray-500">Upload your resume in PDF format</p>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <FileText className="h-8 w-8 text-gray-400" />
                      <p className="text-sm font-medium">Drag & drop your resume here</p>
                      <p className="text-xs text-gray-500">Supports PDF files up to 10MB</p>
                      <input
                        type="file"
                        id="resume-upload"
                        accept=".pdf"
                        onChange={handleResumeUpload}
                        className="hidden"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => document.getElementById('resume-upload')?.click()}
                      >
                        Browse Files
                      </Button>
                    </div>
                  </div>
                  {resumeFile && (
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">{resumeFile.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setResumeFile(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Paste Blog Links</h3>
                  <p className="text-sm text-gray-500">Add links to your blog posts</p>
                </div>
                <Textarea
                  placeholder="https://yourblog.com/post-1&#10;https://yourblog.com/post-2&#10;https://yourblog.com/post-3"
                  className="min-h-[120px]"
                />
                <Button className="w-full rounded-lg">Continue</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Three Simple Steps</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Our automated process makes it easy to create your personal website in minutes.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3 md:gap-12 lg:gap-16">
                <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
                    <FileText className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">1. Upload Resume</h3>
                  <p className="text-gray-500">
                    Upload your resume PDF to extract your professional experience and skills.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
                    <LinkIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">2. Link Blog</h3>
                  <p className="text-gray-500">Add links to your existing blog posts to showcase your writing.</p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
                    <Laptop className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">3. Auto-Generate Site</h3>
                  <p className="text-gray-500">
                    Our AI combines everything into a beautiful, responsive personal website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">AI-Powered Personalization</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Our AI assistant helps you create a truly personalized blog experience.
                </p>
              </div>

              <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3 md:gap-12">
                <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                    <Bot className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">AI Chat Assistant</h3>
                  <p className="text-gray-500">
                    Chat with our AI to customize your blog and get personalized recommendations.
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                    <Palette className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Smart Customization</h3>
                  <p className="text-gray-500">
                    AI suggests design elements and layouts based on your content and preferences.
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Content Generation</h3>
                  <p className="text-gray-500">
                    Generate professional bios, about pages, and blog posts with AI assistance.
                  </p>
                </div>
              </div>

              <div className="mt-8 w-full max-w-4xl overflow-hidden rounded-lg border shadow-lg">
                <div className="flex items-center gap-2 border-b bg-gray-50 px-4 py-2">
                  <div className="flex gap-1">
                    <div className="h-3 w-3 rounded-full bg-gray-300" />
                    <div className="h-3 w-3 rounded-full bg-gray-300" />
                    <div className="h-3 w-3 rounded-full bg-gray-300" />
                  </div>
                  <div className="flex-1 rounded-md bg-white px-2 py-1 text-xs">AI Chat Assistant</div>
                </div>
                <div className="bg-white p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-lg px-4 py-3 bg-muted max-w-[85%]">
                      <p className="text-sm">
                        Hi there! I'm your AI blog assistant. How would you like to customize your blog today?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 mb-4 flex-row-reverse">
                    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-muted">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div className="rounded-lg px-4 py-3 bg-primary text-primary-foreground max-w-[85%]">
                      <p className="text-sm">I'd like to create a minimalist tech blog with code snippets.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-lg px-4 py-3 bg-muted max-w-[85%]">
                      <p className="text-sm">
                        Great choice! I'll create a clean, minimalist design with syntax highlighting for your code
                        snippets. Would you like a dark mode option as well?
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/generate">
                <Button className="mt-8 rounded-full" size="lg">
                  Try AI Customization <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Built-in SEO Optimization</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Every blog we generate comes with powerful SEO features to help your content rank higher.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-12">
                <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 20V10" />
                      <path d="m18 20-6-6-6 6" />
                      <path d="M8 4h8" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Meta Tags Optimization</h3>
                  <p className="text-gray-500">
                    Automatically generate optimized title tags, meta descriptions, and Open Graph tags.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="m21 11-8-8-8 8" />
                      <path d="M21 16H3" />
                      <path d="M7 20h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Semantic HTML Structure</h3>
                  <p className="text-gray-500">
                    Clean, semantic HTML with proper heading hierarchy and structured data markup.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Keyword Optimization</h3>
                  <p className="text-gray-500">
                    Smart keyword placement in URLs, headings, and content for better search visibility.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 2v8" />
                      <path d="m4.93 10.93 1.41 1.41" />
                      <path d="M2 18h2" />
                      <path d="M20 18h2" />
                      <path d="m19.07 10.93-1.41 1.41" />
                      <path d="M22 22H2" />
                      <path d="m8 22 4-10 4 10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Image Optimization</h3>
                  <p className="text-gray-500">
                    Automatically add alt text, compress images, and implement lazy loading.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
                      <line x1="18" x2="12" y1="9" y2="15" />
                      <line x1="12" x2="18" y1="9" y2="15" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Mobile Optimization</h3>
                  <p className="text-gray-500">
                    Fully responsive design with optimized mobile performance for better search rankings.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 2v4" />
                      <path d="M12 18v4" />
                      <path d="M4.93 4.93l2.83 2.83" />
                      <path d="M16.24 16.24l2.83 2.83" />
                      <path d="M2 12h4" />
                      <path d="M18 12h4" />
                      <path d="M4.93 19.07l2.83-2.83" />
                      <path d="M16.24 7.76l2.83-2.83" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Performance Optimization</h3>
                  <p className="text-gray-500">
                    Fast loading times with optimized code and assets for better user experience and SEO.
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <Button
                  className="rounded-full"
                  size="lg"
                  onClick={() => document.getElementById("seo-settings")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Customize SEO Settings
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <SeoSettings />
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between md:py-12 px-4 md:px-6">
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
