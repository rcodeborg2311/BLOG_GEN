"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AiChat } from "@/components/ai-chat"
import { Sparkles, Palette, Layout, Type } from "lucide-react"
import { ImageIcon } from "lucide-react"

type BlogTheme = {
  name: string
  primaryColor: string
  fontStyle: string
  layout: string
}

const predefinedThemes: BlogTheme[] = [
  { name: "Minimalist", primaryColor: "bg-gray-900", fontStyle: "Modern Sans", layout: "Standard" },
  { name: "Creative", primaryColor: "bg-purple-600", fontStyle: "Classic Serif", layout: "Portfolio" },
  { name: "Professional", primaryColor: "bg-blue-600", fontStyle: "Modern Sans", layout: "Standard" },
  { name: "Vibrant", primaryColor: "bg-green-600", fontStyle: "Modern Sans", layout: "Minimal" },
  { name: "Elegant", primaryColor: "bg-red-600", fontStyle: "Classic Serif", layout: "Portfolio" },
]

export function AiBlogCustomizer() {
  const [activeTheme, setActiveTheme] = useState<BlogTheme>(predefinedThemes[0])
  const [customizations, setCustomizations] = useState<Record<string, string>>({
    headerStyle: "Standard",
    footerStyle: "Simple",
    blogLayout: "Grid",
    colorScheme: "Light",
  })

  const handleSuggestionApply = (suggestion: string) => {
    // Apply a theme based on the suggestion
    if (suggestion.includes("minimalist") || suggestion.includes("tech")) {
      setActiveTheme(predefinedThemes[0])
    } else if (suggestion.includes("travel")) {
      setActiveTheme(predefinedThemes[3])
    } else if (suggestion.includes("professional") || suggestion.includes("portfolio")) {
      setActiveTheme(predefinedThemes[2])
    } else if (suggestion.includes("food") || suggestion.includes("recipe")) {
      setActiveTheme(predefinedThemes[4])
    } else if (suggestion.includes("journal")) {
      setActiveTheme(predefinedThemes[1])
    }

    // Update customizations based on suggestion
    const newCustomizations = { ...customizations }

    if (suggestion.includes("photo") || suggestion.includes("gallery")) {
      newCustomizations.blogLayout = "Gallery"
    }

    if (suggestion.includes("project") || suggestion.includes("showcase")) {
      newCustomizations.blogLayout = "Portfolio"
    }

    if (suggestion.includes("minimalist")) {
      newCustomizations.headerStyle = "Minimal"
      newCustomizations.footerStyle = "Minimal"
    }

    setCustomizations(newCustomizations)
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          AI-Powered Customization
        </h2>
        <AiChat onSuggestionApply={handleSuggestionApply} />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Preview & Settings</h2>
        <Tabs defaultValue="theme">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="theme">
              <Palette className="h-4 w-4 mr-2" />
              Theme
            </TabsTrigger>
            <TabsTrigger value="layout">
              <Layout className="h-4 w-4 mr-2" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="content">
              <Type className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="theme" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {predefinedThemes.map((theme) => (
                <Card
                  key={theme.name}
                  className={`cursor-pointer transition-all ${activeTheme.name === theme.name ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setActiveTheme(theme)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${theme.primaryColor}`}></div>
                      <div>
                        <p className="font-medium">{theme.name}</p>
                        <p className="text-xs text-gray-500">
                          {theme.fontStyle}, {theme.layout}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Primary Color</h3>
              <div className="flex gap-2">
                {["bg-black", "bg-blue-600", "bg-green-600", "bg-purple-600", "bg-red-600"].map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full ${color} ${activeTheme.primaryColor === color ? "ring-2 ring-offset-2" : ""}`}
                    onClick={() => setActiveTheme({ ...activeTheme, primaryColor: color })}
                    aria-label={`Select ${color} as primary color`}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Header Style</h3>
              <div className="grid grid-cols-3 gap-2">
                {["Standard", "Minimal", "Hero"].map((style) => (
                  <Button
                    key={style}
                    variant={customizations.headerStyle === style ? "default" : "outline"}
                    onClick={() => setCustomizations({ ...customizations, headerStyle: style })}
                    className="h-auto py-2"
                  >
                    {style}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Blog Layout</h3>
              <div className="grid grid-cols-3 gap-2">
                {["Grid", "List", "Gallery", "Portfolio"].map((layout) => (
                  <Button
                    key={layout}
                    variant={customizations.blogLayout === layout ? "default" : "outline"}
                    onClick={() => setCustomizations({ ...customizations, blogLayout: layout })}
                    className="h-auto py-2"
                  >
                    {layout}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Footer Style</h3>
              <div className="grid grid-cols-3 gap-2">
                {["Simple", "Detailed", "Minimal"].map((style) => (
                  <Button
                    key={style}
                    variant={customizations.footerStyle === style ? "default" : "outline"}
                    onClick={() => setCustomizations({ ...customizations, footerStyle: style })}
                    className="h-auto py-2"
                  >
                    {style}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Color Scheme</h3>
              <div className="grid grid-cols-2 gap-2">
                {["Light", "Dark", "Auto"].map((scheme) => (
                  <Button
                    key={scheme}
                    variant={customizations.colorScheme === scheme ? "default" : "outline"}
                    onClick={() => setCustomizations({ ...customizations, colorScheme: scheme })}
                  >
                    {scheme}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">AI-Generated Content Suggestions</h3>
              <div className="space-y-2">
                <Card>
                  <CardContent className="p-3 flex items-center gap-3">
                    <ImageIcon className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Generate profile image</p>
                      <p className="text-xs text-gray-500">Create an AI avatar based on your description</p>
                    </div>
                    <Button size="sm" className="ml-auto">
                      Generate
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3 flex items-center gap-3">
                    <Type className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Generate bio</p>
                      <p className="text-xs text-gray-500">Create a professional bio from your resume</p>
                    </div>
                    <Button size="sm" className="ml-auto">
                      Generate
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3 flex items-center gap-3">
                    <Layout className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Generate blog post ideas</p>
                      <p className="text-xs text-gray-500">Get content suggestions based on your interests</p>
                    </div>
                    <Button size="sm" className="ml-auto">
                      Generate
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Live Preview</h3>
          <div className="border rounded-lg overflow-hidden">
            <div className={`p-4 ${activeTheme.primaryColor} text-white`}>
              <p className="font-bold">Header: {customizations.headerStyle}</p>
            </div>
            <div className="p-4 bg-gray-50">
              <p className="text-center text-sm text-gray-500">Blog Layout: {customizations.blogLayout}</p>
              <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg mt-2">
                <p className="text-gray-400">Content Preview</p>
              </div>
            </div>
            <div className="p-2 bg-gray-100 text-center text-xs text-gray-500">
              Footer: {customizations.footerStyle}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
