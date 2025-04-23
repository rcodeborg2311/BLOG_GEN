import { BlogContent } from './blog-extractor';

const sampleTitles = [
  "The Future of AI in Everyday Life",
  "Sustainable Living: Small Changes, Big Impact",
  "Digital Nomad Lifestyle: Pros and Cons",
  "The Art of Mindful Productivity",
  "Exploring the World of Web Development"
];

const sampleAuthors = [
  "Alex Johnson",
  "Sarah Chen",
  "Michael Brown",
  "Emma Wilson",
  "David Lee"
];

const sampleContent = [
  `In today's rapidly evolving technological landscape, artificial intelligence is becoming increasingly integrated into our daily lives. From smart assistants to predictive algorithms, AI is transforming how we interact with technology. This blog explores the current state of AI applications and what we can expect in the coming years.`,

  `Sustainability isn't just a buzzword—it's a lifestyle choice that can make a significant difference. In this post, we'll explore practical ways to reduce your environmental footprint, from simple daily habits to larger lifestyle changes that can contribute to a healthier planet.`,

  `The digital nomad lifestyle has gained popularity in recent years, offering the freedom to work from anywhere in the world. But is it all sunshine and beaches? Let's dive into the realities of this lifestyle, including its challenges and rewards.`,

  `Productivity isn't about doing more—it's about doing what matters most. In this article, we'll explore mindfulness techniques that can help you focus on your priorities and achieve more meaningful results in both your personal and professional life.`,

  `Web development is an ever-changing field that offers endless opportunities for creativity and problem-solving. Whether you're a beginner or an experienced developer, there's always something new to learn. Join us as we explore the latest trends and best practices in web development.`
];

export function generateSampleBlog(): BlogContent {
  const randomIndex = Math.floor(Math.random() * sampleTitles.length);
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));

  return {
    title: sampleTitles[randomIndex],
    content: sampleContent[randomIndex],
    author: sampleAuthors[randomIndex],
    date: date.toISOString().split('T')[0]
  };
} 