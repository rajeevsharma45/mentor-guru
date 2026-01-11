// src/app/_components/LatestArticlesSidebar.tsx
"use client";

import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { getLatestBlogs } from "~/data/blogMetadata";

interface LatestArticlesSidebarProps {
  currentSlug?: string; // Optional: to exclude current blog from list
  limit?: number; // Optional: number of articles to show (default: 3)
}

const LatestArticlesSidebar: FC<LatestArticlesSidebarProps> = ({ 
  currentSlug, 
  limit = 3 
}) => {
  // Get latest blogs from metadata and filter out current blog if provided
  const latestArticles = getLatestBlogs(limit + 1) // Get one extra in case we need to filter
    .filter(blog => !currentSlug || blog.slug !== currentSlug)
    .slice(0, limit); // Take only the number we need

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 border-l-4 border-primary pl-2">
        Latest Articles
      </h2>
      <ul className="space-y-3">
        {latestArticles.map((article) => (
          <li key={article.id} className="flex gap-3">
            <Image
              src={article.thumbnail}
              alt={article.title}
              width={80}
              height={60}
              className="rounded-md object-cover"
            />
            <div>
              <Link
                href={`/blog/${article.slug}`}
                className="text-sm font-medium hover:text-primary line-clamp-2"
              >
                {article.title}
              </Link>
              <p className="text-xs text-gray-500">{article.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestArticlesSidebar;