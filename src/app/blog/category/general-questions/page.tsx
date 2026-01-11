"use client";

import { getBlogsByCategory } from "~/data/blogMetadata";
import Image from "next/image";
import Link from "next/link";

export default function GeneralQuestionsPage() {
  const blogs = getBlogsByCategory("general-questions");

  return (
    <div className="max-container padding-container py-10 mt-10">
      <div className="mb-8">
        <Link href="/blogs" className="text-primary hover:underline mb-4 inline-block">
          ← Back to All Blogs
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">General Questions</h1>
        <p className="text-gray-600">{blogs.length} articles in this category</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.slug}`} className="block">
            <div className="border rounded-lg overflow-hidden hover:shadow-md transition">
              <Image 
                src={blog.thumbnail} 
                alt={blog.title} 
                width={500} 
                height={300} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 hover:text-primary mb-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">{blog.excerpt}</p>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>{blog.author}</span>
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}