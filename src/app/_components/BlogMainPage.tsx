"use client";

import type { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// --------------------
// Dummy Blog Data
// --------------------
interface Blog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  author: string;
  date: string;
  readTime: string;
}

const blogs: Blog[] = [
  {
    id: 1,
    slug: "edtech-companies",
    title:
      "Top 10 EdTech Companies in India 2026: Leading in Quality Education & Digital Innovation",
    excerpt:
      "Discover India's top EdTech companies revolutionizing the education landscape with innovation and digital excellence...",
    thumbnail: "/thumb-1.jpg",
    author: "Saumya Sarin",
    date: "Oct 1, 2025",
    readTime: "8 min read",
  },
  {
    id: 2,
    slug: "jee-preparation-2026",
    title:
      "JEE Main Preparation 2026: Study Plan, Time Table, Best Books",
    excerpt:
      "Step-by-step guide for JEE Main 2026 preparation with toppers’ strategies and book recommendations...",
    thumbnail: "/thumb-2.jpg",
    author: "Ravi Sharma",
    date: "Sep 25, 2025",
    readTime: "10 min read",
  },
  {
    id: 3,
    slug: "neet-chemistry-notes-2026",
    title: "NEET Chemistry Chapter-wise Notes 2026",
    excerpt:
      "Download NEET chemistry chapter notes with solved examples and important PYQs...",
    thumbnail: "/thumb-3.jpg",
    author: "Himanshu Goyal",
    date: "Sep 20, 2025",
    readTime: "6 min read",
  },
  {
    id: 4,
    slug: "cbse-date-sheet-2026",
    title: "CBSE Class 12 Date Sheet 2026 Released",
    excerpt:
      "CBSE has officially released the 2026 board exam timetable. Check important updates and exam tips...",
    thumbnail: "/thumb-4.jpg",
    author: "Saumya Sarin",
    date: "Sep 15, 2025",
    readTime: "5 min read",
  },
];

// --------------------
// Component
// --------------------
const BlogMainPage: FC = () => {
  const router = useRouter();
  const [featured, ...rest] = blogs;

  return (
    <div className="max-container padding-container py-10 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* -------------------- */}
        {/* Main Content */}
        {/* -------------------- */}
        <main className="lg:col-span-2 space-y-8">

          {/* Categories Section */}
<section>
  <h2 className="text-lg font-semibold mb-4 border-l-4 border-primary pl-2">
    Categories
  </h2>

  <div className="flex flex-wrap gap-3">
    {[
      { name: "Prelims", slug: "prelims" },
      { name: "Mains", slug: "mains" },
      { name: "Interview", slug: "interview" },
      { name: "Optional", slug: "optional" },
      { name: "General Question", slug: "general-questions" },
      { name: "Current Affairs", slug: "current-affairs" },
    ].map((cat, idx) => (
      <button
        key={idx}
        onClick={() => router.push(`/blog/category/${cat.slug}`)}
        className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium bg-white hover:bg-primary hover:text-white transition"
      >
        {cat.name}
      </button>
    ))}
  </div>
</section>

          {/* Featured Blog */}
          {featured ? (
            <div
              className="relative rounded-lg overflow-hidden cursor-pointer"
              onClick={() => router.push(`/blog/${featured.slug}`)}
              role="link"
              tabIndex={0}
            >
              <Image
                src={featured.thumbnail}
                alt={featured.title}
                width={900}
                height={500}
                className="w-full h-64 object-cover lg:h-96"
              />
              <div className="absolute inset-0 bg-black/50 flex items-end">
                <div className="p-4">
                  <span className="text-white text-xl lg:text-2xl font-bold hover:underline">
                    {featured.title}
                  </span>
                </div>
              </div>
            </div>
          ) : null}

          {/* Latest Articles */}
          <section>
            <h2 className="text-lg font-semibold mb-4 border-l-4 border-primary pl-2">
              Latest Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.map((blog) => (
                <div
                  key={blog.id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer"
                  onClick={() => router.push(`/blog/${blog.slug}`)}
                  role="link"
                  tabIndex={0}
                >
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    width={500}
                    height={300}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3">
                    <div className="font-semibold text-gray-800 hover:text-primary text-sm">{blog.title}</div>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* -------------------- */}
        {/* Sidebar */}
        {/* -------------------- */}
        <aside className="space-y-6">
          {/* Apply Now Form */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h2 className="text-lg font-semibold mb-3 border-l-4 border-primary pl-2">
              Apply Now
            </h2>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border px-3 py-2 rounded-md"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border px-3 py-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Your Mobile No."
                className="w-full border px-3 py-2 rounded-md"
              />

              <select className="w-full border px-3 py-2 rounded-md">
                <option value="">No. of Attempts</option>
                <option value="Class 10">0</option>
                <option value="Class 12">1</option>
                <option value="Class 12">2</option>
                <option value="Class 12">3</option>
              </select>

              <select className="w-full border px-3 py-2 rounded-md">
                <option value="">Select Course</option>
                <option value="NEET">Moksha Plus-2026</option>
                <option value="JEE">Moksha Plus-2027</option>
                <option value="JEE">Anthropology Beginner 2026</option>
                <option value="JEE">Anthropology Advance 2026</option>
                <option value="JEE">Prelims Nirvana-2026</option>
                <option value="JEE">PYQ-Based Mains Revision Course</option>
                <option value="JEE">PSIR Plus-2026</option>
                <option value="JEE">Sociology Plus-2026</option>
                <option value="JEE">Geography Plus-2026</option>
                <option value="JEE">Mains-Warrior</option>
                <option value="JEE">Samarth Answer Writing 2026</option>
                <option value="JEE">Prelims Kaushal 2026</option>
                <option value="JEE">Anthropology Mains Crash Course</option>
              </select>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Trending Articles */}
          <div>
            <h2 className="text-lg font-semibold mb-3 border-l-4 border-primary pl-2">
              Trending
            </h2>
            <ul className="space-y-4">
              {blogs.map((blog) => (
                <li key={blog.id} className="flex gap-3">
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    width={80}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <button
                      onClick={() => router.push(`/blog/${blog.slug}`)}
                      className="text-sm font-medium hover:text-primary text-left"
                    >
                      {blog.title}
                    </button>
                    <p className="text-xs text-gray-500">
                      {blog.author} • {blog.date}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogMainPage;
