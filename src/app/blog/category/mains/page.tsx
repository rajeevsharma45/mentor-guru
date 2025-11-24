"use client"

import type { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


interface Blog {
    id: number;
    slug: string;
    title: string;
    thumbnail: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    excerpt: string;
}


const blogs: Blog[] = [
    {
        id: 1,
        slug: "mains-stategy-2026",
        title: "UPSC Mains Strategy 2026: Smart Approach with PYQ Analysis",
        thumbnail: "/thumb-1.jpg",
        author: "Saumya Sarin",
        date: "Oct 10 2025",
        readTime: "10 min read",
        category: "mains",
        excerpt: "A concise guide to UPSC Mains strategy...",
    },
    {
        id: 2,
        slug: "mains-stategy-2026",
        title: "UPSC Mains Strategy 2026: Smart Approach with PYQ Analysis",
        thumbnail: "/thumb-1.jpg",
        author: "Saumya Sarin",
        date: "Oct 11 2025",
        readTime: "10 min read",
        category: "mains",
        excerpt: "A concise guide to UPSC Mains strategy...",
    },
]

const mainsBlogs = blogs.filter((b) => b.category === 'mains');

const MainsPage: FC = () => {
    const router = useRouter();

    return (
        <div className='max-container padding-container py-10 mt-10'>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <main className="lg:col-span-2 space-y-8">
                    {/* Categories Section */}
                    <section>
                        <h2 className='text-lg font-semibold mb-4 border-l-4 border-primary pl-2'>
                            Categories
                        </h2>
                        <div className='flex flex-wrap gap-3'>
                            {[
                { name: "Prelims", slug: "prelims" },
                { name: "Mains", slug: "mains" },
                { name: "Interview", slug: "interview" },
                { name: "Optional", slug: "optional" },
                { name: "General Question", slug: "general-questions" },
                { name: "Current Affairs", slug: "current-affairs" },
                            ].map((cat, idx) => {
                                const isActive = cat.slug === 'mains';
                                return(
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
                                )
                            })
                            }
                        </div>
                    </section>

                    <h1 className='text-xl font-bold mt-4'>Mains Article</h1>

                    <section>
                        <div className='grid gap-6 sm:grid-cols-2'>
                            {mainsBlogs.map((blog) => (
                                <div
                                key={blog.id}
                                    className='border rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer'
                                    onClick={() => router.push(`/blog/${blog.slug}`)}
                                    >
                                    <Image 
                                    src={blog.thumbnail}
                                    alt={blog.title}
                                    width={500}
                                    height={300}
                                    className='w-full h-40 object-cover'
                                    />
                                    <div className='p-3'>
                                        <div className='font-semibold text-gray-800 hover:text-primary text-sm'>
                                            {blog.title}
                                        </div>
                                        <p className='text-xs text-gray-600 mt-1 line-clamp-2'>
                                            {blog.excerpt}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {mainsBlogs.length === 0 && (
                <p className="text-gray-600">No articles available yet.</p>
              )}
                        </div>
                    </section>
                </main>
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
    )
}



export default MainsPage