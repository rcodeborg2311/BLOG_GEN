import axios from 'axios'
import * as cheerio from 'cheerio'

export interface BlogContent {
  title: string;
  content: string;
  author?: string;
  date?: string;
}

export async function extractBlogContent(url: string): Promise<BlogContent> {
  try {
    // Fetch the blog page
    const response = await axios.get(url)
    const html = response.data

    // Load the HTML into cheerio
    const $ = cheerio.load(html)

    // Try to find the main content in common blog structures
    const contentSelectors = [
      'article',
      '.post-content',
      '.entry-content',
      'main',
      '.blog-post',
      '.article-content'
    ];

    let content = '';
    let title = '';
    let author = '';
    let date = '';

    // Find title
    title = $('h1').first().text().trim() || 
            $('title').text().trim() || 
            $('meta[property="og:title"]').attr('content') || 
            'Untitled Blog Post';

    // Find author
    author = $('.author').text().trim() || 
             $('.post-author').text().trim() || 
             $('meta[name="author"]').attr('content') || 
             '';

    // Find date
    date = $('.date').text().trim() || 
           $('.post-date').text().trim() || 
           $('time').text().trim() || 
           $('meta[property="article:published_time"]').attr('content') || 
           '';

    // Find content
    for (const selector of contentSelectors) {
      const element = $(selector);
      if (element.length > 0) {
        content = element.text().trim();
        if (content.length > 0) break;
      }
    }

    if (!content) {
      throw new Error('Could not extract blog content');
    }

    return {
      title,
      content,
      author: author || undefined,
      date: date || undefined
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to extract blog content: ${error.message}`);
    }
    throw new Error('Failed to extract blog content: Unknown error');
  }
} 