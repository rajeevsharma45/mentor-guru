import dynamic from "next/dynamic";
import type { ComponentType } from "react";

// Slug → component mapping (UNCHANGED)
const blogComponents: Record<string, ComponentType> = {
  "edtech-companies": dynamic(() => import("../../blogs/EdTechCompanies")),
};

export default async function BlogPage({ params }: any) {
  const { slug } = params;
  const BlogComponent = blogComponents[slug];

  if (!BlogComponent) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center text-gray-600">
        <h1 className="text-3xl font-bold mb-4">404 - Blog Not Found</h1>
        <p>The blog you’re looking for doesn’t exist or is coming soon.</p>
      </div>
    );
  }

  return <BlogComponent />;
}
