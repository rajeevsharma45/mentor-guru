// src/data/blogMetadata.ts

export interface BlogMetadata {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  views: number;
  isFeatured?: boolean;
}
 
export const BLOG_CATEGORIES = [
  { name: "Prelims", slug: "prelims" },
  { name: "Mains", slug: "mains" },
  { name: "Interview", slug: "interview" },
  { name: "Optional", slug: "optional" },
  { name: "General Question", slug: "general-questions" },
  { name: "Current Affairs", slug: "current-affairs" },
] as const;

export const ALL_BLOGS_METADATA: BlogMetadata[] = [
  {
    id: 1,
    slug: "how-to-make-notes-for-upsc",
    title: "How to make Notes for UPSC?",
    excerpt: "Learn the art of effective note-making for UPSC preparation. Discover techniques that help you retain information better...",
    thumbnail: "/blogs/How to Make Notes for UPSC.jpg",
    author: "Ravi Kumar",
    date: "Jan 10, 2026",
    readTime: "5 min read",
    category: "general-questions",
    views: 1250,
    isFeatured: true,
  },
  {
    id: 2,
    slug: "starting-upsc-preparation",
    title: "Starting UPSC Preparation",
    excerpt: "Complete beginner's guide to starting your UPSC journey. Learn about syllabus, books, strategy, and first steps...",
    thumbnail: "/blogs/starting-upsc-preparation.jpg",
    author: "Priya Sharma",
    date: "Jan 8, 2026",
    readTime: "6 min read",
    category: "general-questions",
    views: 2100,
  },
  {
    id: 3,
    slug: "problems-faced-during-upsc-mains",
    title: "Problems Faced by Aspirants during UPSC CSE Mains Preparation",
    excerpt: "Detailed analysis of common challenges faced during UPSC Mains preparation and effective solutions...",
    thumbnail: "/blogs/problems-faced-during-upsc-mains.jpg",
    author: "Dr. Rajesh Verma",
    date: "Jan 5, 2026",
    readTime: "12 min read",
    category: "mains",
    views: 3450,
  },
  {
    id: 4,
    slug: "edtech-companies",
    title: "Top 10 EdTech Companies in India 2026",
    excerpt: "Discover India's top EdTech companies revolutionizing the education landscape with innovation and digital excellence...",
    thumbnail: "/blogs/edtech-companies.jpg",
    author: "Saumya Sarin",
    date: "Oct 1, 2025",
    readTime: "29 min read",
    category: "current-affairs",
    views: 9036,
  },
];

// Helper functions
export const getFeaturedBlog = (): BlogMetadata | undefined => {
  return ALL_BLOGS_METADATA.find(blog => blog.isFeatured) || ALL_BLOGS_METADATA[0];
};

export const getBlogsByCategory = (categorySlug: string): BlogMetadata[] => {
  return ALL_BLOGS_METADATA.filter(blog => blog.category === categorySlug);
};

export const getLatestBlogs = (limit?: number): BlogMetadata[] => {
  const sorted = [...ALL_BLOGS_METADATA].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
};

export const getBlogMetadataBySlug = (slug: string): BlogMetadata | undefined => {
  return ALL_BLOGS_METADATA.find(blog => blog.slug === slug);
};

export const getCategoryName = (slug: string): string => {
  return BLOG_CATEGORIES.find(cat => cat.slug === slug)?.name || slug;
};