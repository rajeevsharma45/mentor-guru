// src/app/blog/page.tsx (the main blog listing page)

import Link from "next/link";

export default function BlogListingPage() {
  const blogPosts = [
    {
      slug: "edtech-companies",
      title: "Top EdTech Companies",
      description: "Explore the leading educational technology companies.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}