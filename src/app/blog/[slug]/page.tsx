import dynamic from "next/dynamic";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

// ✅ Map slug values to the corresponding components
const blogComponents: Record<string, React.ComponentType> = {
  "edtech-companies": dynamic(() => import("../../blogs/EdTechCompanies")),
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const BlogComponent = blogComponents[slug];

  if (!BlogComponent) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center text-gray-600">
        <h1 className="text-3xl font-bold mb-4">404 - Blog Not Found</h1>
        <p>The blog you&apos;re looking for doesn&apos;t exist or is coming soon.</p>
      </div>
    );
  }

  return <BlogComponent />;
}