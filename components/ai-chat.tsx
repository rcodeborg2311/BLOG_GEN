"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Send, User, Sparkles } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

export function AiChat({ onSuggestionApply }: { onSuggestionApply?: (suggestion: string) => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm your AI blog assistant. I can help you personalize your blog. What kind of content would you like to feature on your profile?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample AI suggestions for blog customization
  const suggestions = [
    "Create a minimalist tech blog with code snippets",
    "Design a travel blog with photo galleries",
    "Generate a professional portfolio with project showcases",
    "Build a personal journal with categorized entries",
    "Make a food blog with recipe collections",
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response (in a real app, this would call the AI API)
    setTimeout(() => {
      // Sample responses based on common queries
      let responseContent = ""
      const userInput = input.toLowerCase()

      if (userInput.includes("portfolio") || userInput.includes("professional")) {
        responseContent =
          "I can help you create a professional portfolio! Would you like to highlight your work experience, projects, or skills? I can suggest a clean layout with sections for each of your major accomplishments."
      } else if (userInput.includes("travel") || userInput.includes("photography")) {
        responseContent =
          "A travel blog sounds perfect! I can design a layout with large image galleries, location tags, and a map integration to show where you've been. Would you like a chronological or destination-based organization?"
      } else if (userInput.includes("tech") || userInput.includes("code")) {
        responseContent =
          "For a tech blog, I recommend a clean design with syntax highlighting for code snippets, dark mode support, and categories for different technologies you write about. Does that sound good?"
      } else if (userInput.includes("personal") || userInput.includes("journal")) {
        responseContent =
          "A personal journal is a great choice! I can create a design with dated entries, mood indicators, and private/public toggles for each post. Would you like to include media galleries too?"
      } else {
        responseContent =
          "Thanks for sharing! Based on what you've told me, I can create a personalized blog that reflects your interests. Would you like me to suggest some layout options or content sections that might work well for you?"
      }

      setMessages((prev) => [...prev, { role: "assistant", content: responseContent }])
      setIsLoading(false)
    }, 1500)
  }

  const applySuggestion = (suggestion: string) => {
    if (onSuggestionApply) {
      onSuggestionApply(suggestion)
    }

    // Add the suggestion as a user message
    setMessages((prev) => [
      ...prev,
      { role: "user", content: `I'd like to: ${suggestion}` },
      {
        role: "assistant",
        content:
          "Great choice! I've applied this template to your blog. You can further customize it in the settings panel or ask me for more specific adjustments.",
      },
    ])
  }

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          AI Blog Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <div className="h-[400px] overflow-y-auto pr-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 mb-4 ${message.role === "assistant" ? "" : "flex-row-reverse"}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border ${
                  message.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <div
                className={`rounded-lg px-4 py-3 max-w-[85%] ${
                  message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 mb-4">
              <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-lg px-4 py-3 bg-muted">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <div className="px-4 py-2">
        <p className="text-sm font-medium mb-2">Quick Templates:</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => applySuggestion(suggestion)}
              className="text-xs"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
      <CardFooter className="pt-0">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Textarea
            placeholder="Ask me how to customize your blog..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[60px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
