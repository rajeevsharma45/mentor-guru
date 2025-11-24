"use client";

import type { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// --------------------
// Dummy Blog Data (Filter for this Category)
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
  category: string;
}

const blogs: Blog[] = [
  {
    id: 1,
    slug: "prelims-strategy-2026",
    title: "UPSC Prelims Strategy 2026: Smart Approach with PYQ Analysis",
    excerpt:
      "Learn the most effective strategy for UPSC Prelims with subject weightage, PYQ insights, and revision roadmap...",
    thumbnail: "/thumb-1.jpg",
    author: "Saumya Sarin",
    date: "Oct 10, 2025",
    readTime: "7 min read",
    category: "prelims",
  },
  {
    id: 2,
    slug: "prelims-study-plan",
    title: "Prelims 120-Day Study Plan for Working Professionals",
    excerpt:
      "A concise but powerful 120-day plan tailored for aspirants who are preparing while working...",
    thumbnail: "/thumb-2.jpg",
    author: "Ravi Singh",
    date: "Sep 28, 2025",
    readTime: "6 min read",
    category: "prelims",
  },
];

// Filter only Prelims blogs
const prelimsBlogs = blogs.filter((b) => b.category === "prelims");

// --------------------
// Component
// --------------------
const PrelimsPage: FC = () => {
  const router = useRouter();

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
              ].map((cat, idx) => {
                const isActive = cat.slug === "prelims"; // highlight condition

                return (
                  <button
                    key={idx}
                    onClick={() => router.push(`/blog/category/${cat.slug}`)}
                    className={`px-4 py-2 rounded-md border text-sm font-medium transition
                      ${
                        isActive
                          ? "bg-primary text-white border-primary"
                          : "bg-white border-gray-300 hover:bg-primary hover:text-white"
                      }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Page Heading */}
          <h1 className="text-xl font-bold mt-4">Prelims Articles</h1>

          {/* Blog Grid */}
          <section>
            <div className="grid gap-6 sm:grid-cols-2">
              {prelimsBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer"
                  onClick={() => router.push(`/blog/${blog.slug}`)}
                >
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    width={500}
                    height={300}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3">
                    <div className="font-semibold text-gray-800 hover:text-primary text-sm">
                      {blog.title}
                    </div>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>
              ))}

              {prelimsBlogs.length === 0 && (
                <p className="text-gray-600">No articles available yet.</p>
              )}
            </div>
          </section>
        </main>

        {/* -------------------- */}
        {/* Sidebar (Same as Main Page) */}
        {/* -------------------- */}
        <aside className="space-y-6">
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
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>

              <select className="w-full border px-3 py-2 rounded-md">
                <option value="">Select Course</option>
                <option value="Moksha">Moksha Plus-2026</option>
                <option value="Anthro-B">Anthropology Beginner 2026</option>
                <option value="Anthro-A">Anthropology Advance 2026</option>
                <option value="Prelims">Prelims Kaushal 2026</option>
              </select>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md"
              >
                Submit
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3 border-l-4 border-primary pl-2">
              Trending
            </h2>
            <p className="text-gray-600 text-sm">Coming soon...</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PrelimsPage;
