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
  isFeatured?: boolean; // Optional: for manual control
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
    excerpt: "Learn the art of effective note-making for UPSC preparation...",
    thumbnail: "/blogs/How to Make Notes for UPSC.jpg",
    author: "Ravi Kumar",
    date: "2026-01-10",
    readTime: "5 min read",
    category: "general-questions",
    views: 1250,
  },
  {
    id: 2,
    slug: "starting-upsc-preparation",
    title: "Starting UPSC Preparation",
    excerpt: "Complete beginner's guide to starting your UPSC journey...",
    thumbnail: "/blogs/starting-upsc-preparation.jpg",
    author: "Priya Sharma",
    date: "2026-01-08",
    readTime: "6 min read",
    category: "general-questions",
    views: 2100,
  },
  {
    id: 3,
    slug: "problems-faced-during-upsc-mains",
    title: "Problems Faced by Aspirants during UPSC CSE Mains Preparation",
    excerpt: "Detailed analysis of common challenges...",
    thumbnail: "/blogs/problems-faced-during-upsc-mains.jpg",
    author: "Dr. Rajesh Verma",
    date: "2026-01-05",
    readTime: "12 min read",
    category: "mains",
    views: 3450,
  },
  {
    id: 4,
    slug: "edtech-companies",
    title: "Top 10 EdTech Companies in India 2026",
    excerpt: "Discover India's top EdTech companies...",
    thumbnail: "/blogs/edtech-companies.jpg",
    author: "Saumya Sarin",
    date: "2025-10-01",
    readTime: "29 min read",
    category: "current-affairs",
    views: 9036,
  },
  {
    id: 5,
    slug: "common-mistakes-during-upsc-preparation",
    title: "Common Mistakes that should be avoided during Civil Services Preparation",
    excerpt: "Some common mistakes of Students...",
    thumbnail: "/blogs/common-mistakes-during-upsc-preparation.png",
    author: "Rajeev Sharma",
    date: "2025-10-12",
    readTime: "5 min read",
    category: "general-questions",
    views: 9036,
  },
  {
    id: 6,
    slug: "how-life-changes-after-clearing-civil-service-examination",
    title: "How life Changes after Clearing Civil Service Examination?",
    excerpt: "What Changes come for an Individual?...",
    thumbnail: "/blogs/how-life-changes-after-clearing-civil-service-examination.png",
    author: "Rajeev Sharma",
    date: "2025-10-12",
    readTime: "5 min read",
    category: "general-questions",
    views: 9036,
  },
  {
    id: 7,
    slug: "how-to-prepare-for-civil-services-examination-after-12th",
    title: "How to Prepare for Civil Services examination after 12th?",
    excerpt: "What Changes come for an Individual?...",
    thumbnail: "/blogs/how-to-prepare-for-civil-services-examination-after-12th.png",
    author: "Rajeev Sharma",
    date: "2025-10-12",
    readTime: "5 min read",
    category: "general-questions",
    views: 9036,
  },
  {
    id: 8,
    slug: "how-to-use-internet-for-preparation-of-ias",
    title: "How to use Internet for Preparation of IAS",
    excerpt: "Why use Internet for Preparation of IAS?...",
    thumbnail: "/blogs/how-to-use-internet-for-preparation-of-ias.png",
    author: "Rajeev Sharma",
    date: "2025-10-12",
    readTime: "5 min read",
    category: "general-questions",
    views: 9036,
  },
  {
    id: 9,
    slug: "how-tough-is-civil-service-examination",
    title: "How Tough is Civil Service Examination?",
    excerpt: "Why use Internet for Preparation of IAS?...",
    thumbnail: "/blogs/how-tough-is-civil-service-examination.png",
    author: "Rajeev Sharma",
    date: "2025-10-12",
    readTime: "5 min read",
    category: "general-questions",
    views: 9036,
  },
  {
    id: 10,
    slug: "importance-of-magazines-in-civil-service-examination",
    title: "Importance of magazines in the preparation of Civil Service Examination",
    excerpt: "Why use Internet for Preparation of IAS?...",
    thumbnail: "/blogs/importance-of-magazines-in-civil-service-examination.png",
    author: "Rajeev Sharma",
    date: "2026-01-12",
    readTime: "5 min read",
    category: "general-questions",
    views: 9036,
  },
  {
    id: 11,
    slug: "role-of-coaching-in-civil-service-examination",
    title: "Role of Coaching in Preparation of Civil Service Examination",
    excerpt: "Coaching at Present context?...",
    thumbnail: "/blogs/role-of-coaching-in-civil-service-examination.png",
    author: "Rajeev Sharma",
    date: "2026-01-13",
    readTime: "5 min read",
    category: "general-questions",
    views: 9036,
  },
   {
    id: 12,
    slug: "role-of-rest-in-preparation-of-civil-service-examination",
    title: "Role of RSTV in Preparation of civil Service Examination",
    excerpt: "Importance of RSTV at Present context...",
    thumbnail: "/blogs/role-of-rest-in-preparation-of-civil-service-examination.png",
    author: "Rajeev Sharma",
    date: "2026-01-13",
    readTime: "5 min read",
    category: "general-questions",
    views: 9036,
  },
   {
    id: 13,
    slug: "why-choose-civil-service-as-carrier-option-after-graduation",
    title: "Why Choose Civil Service as Carrier Option After Graduation?",
    excerpt: "Importance of RSTV at Present context...",
    thumbnail: "/blogs/why-choose-civil-service-as-carrier-option-after-graduation.png",
    author: "Rajeev Sharma",
    date: "2026-01-13",
    readTime: "5 min read",
    category: "general-questions",
    views: 9036,
  },
   {
    id: 14,
    slug: "how-to-prepare-for-mains-examination",
    title: "How to prepare for Mains Examination?",
    excerpt: "Understanding the Dynamics of Mains examination...",
    thumbnail: "/blogs/how-to-prepare-for-mains-examination.png",
    author: "Rajeev Sharma",
    date: "2026-01-13",
    readTime: "5 min read",
    category: "mains",
    views: 9036,
  },
  {
    id: 15,
    slug: "how-to-choose-the-right-optional-paper-in-upsc-cse-examination",
    title: "How to Choose the Right Optional Paper in UPSC CSE Examination?",
    excerpt: "Selecting the right optional subject plays a crucial role in your selection in the UPSC CSE Examination....",
    thumbnail: "/blogs/how-to-choose-the-right-optional-paper-in-upsc-cse-examination.png",
    author: "Rajeev Sharma",
    date: "2026-01-14",
    readTime: "5 min read",
    category: "optional",
    views: 9036,
  },
];

// Helper functions
export const getFeaturedBlog = (): BlogMetadata | undefined => {
  // Option 1: Automatic - Always show latest blog as featured
  return getLatestBlogs(1)[0];
  
  // Option 2: Manual - Use isFeatured flag (comment out line above, uncomment below)
  // return ALL_BLOGS_METADATA.find(blog => blog.isFeatured) || getLatestBlogs(1)[0];
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

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};