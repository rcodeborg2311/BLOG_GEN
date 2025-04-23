<div align="center">
  <h1>🚧 Blog Generator 🚧</h1>
  <p><em>Under Construction - Coming Soon!</em></p>
  <img src="https://img.shields.io/badge/status-under%20construction-yellow" alt="Status: Under Construction">
  <img src="https://img.shields.io/badge/version-0.1.0-blue" alt="Version: 0.1.0">
</div>

---

A modern web application that helps you generate personalized blog content using AI. Upload your resume and blog content, and let the AI create engaging content tailored to your style and expertise.

## Features

- 📝 Resume Analysis: Upload your resume to extract your skills and experience
- ✍️ Blog Content Generation: Generate personalized blog content based on your expertise
- 🤖 AI-Powered: Uses Groq AI to create high-quality, engaging content
- 🎨 Customizable: Fine-tune the generated content to match your style
- 📱 Responsive Design: Works seamlessly on all devices

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Groq AI API
- Shadcn UI Components

## Prerequisites

- Node.js 18+ and npm
- Groq API key

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/rcodeborg2311/BLOG_GEN.git
cd BLOG_GEN
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Groq API key:
```env
GROQ_API_KEY=your_groq_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Upload your resume (PDF, DOC, or DOCX)
2. Enter your blog URL or generate a sample blog
3. Navigate to the generate page
4. Let the AI analyze your content and generate personalized blog posts
5. Customize the generated content to match your style

## Project Structure

```
BLOG_GEN/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── generate/          # Generate page
│   └── page.tsx           # Home page
├── components/            # React components
├── lib/                   # Utility functions
├── public/                # Static assets
└── styles/                # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Groq AI](https://groq.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Repository

Find the source code on GitHub: [https://github.com/rcodeborg2311/BLOG_GEN](https://github.com/rcodeborg2311/BLOG_GEN) 