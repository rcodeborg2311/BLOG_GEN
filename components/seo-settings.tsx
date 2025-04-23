"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SeoSettings() {
  const [keywords, setKeywords] = useState<string[]>(["blog", "personal website", "portfolio"])
  const [newKeyword, setNewKeyword] = useState("")

  const addKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword])
      setNewKeyword("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  return (
    <Card className="w-full" id="seo-settings">
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
        <CardDescription>Customize how your blog appears in search engines</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic SEO</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="site-title">Site Title</Label>
              <Input id="site-title" placeholder="Your Name - Professional Developer & Writer" />
              <p className="text-xs text-gray-500">
                This appears in search results and browser tabs (50-60 characters recommended)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta-description">Meta Description</Label>
              <Textarea
                id="meta-description"
                placeholder="Professional developer with 5+ years of experience in React and Node.js. Read my blog for insights on web development and technology."
              />
              <p className="text-xs text-gray-500">A brief description of your site (150-160 characters recommended)</p>
            </div>
            <div className="space-y-2">
              <Label>Focus Keywords</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {keywords.map((keyword) => (
                  <div key={keyword} className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm">
                    {keyword}
                    <button
                      onClick={() => removeKeyword(keyword)}
                      className="ml-1 rounded-full bg-gray-200 p-1 hover:bg-gray-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add keyword"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                />
                <Button onClick={addKeyword} type="button" variant="outline">
                  Add
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="advanced" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Canonical URLs</Label>
                  <p className="text-sm text-gray-500">Automatically generate canonical URLs</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Structured Data</Label>
                  <p className="text-sm text-gray-500">Add schema markup for rich search results</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>XML Sitemap</Label>
                  <p className="text-sm text-gray-500">Automatically generate and update sitemap</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Robots.txt</Label>
                  <p className="text-sm text-gray-500">Configure search engine crawling</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="social" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="og-title">Social Media Title</Label>
              <Input id="og-title" placeholder="Your Name - Developer & Writer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="og-description">Social Media Description</Label>
              <Textarea
                id="og-description"
                placeholder="Check out my portfolio and blog for insights on web development and technology."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="og-image">Social Media Image</Label>
              <div className="flex items-center justify-center rounded-lg border border-dashed p-4">
                <div className="flex flex-col items-center gap-1 text-center">
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
                    className="h-8 w-8 text-gray-400"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <p className="text-sm font-medium">Upload an image for social sharing</p>
                  <p className="text-xs text-gray-500">Recommended size: 1200x630 pixels</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save SEO Settings</Button>
      </CardFooter>
    </Card>
  )
}
