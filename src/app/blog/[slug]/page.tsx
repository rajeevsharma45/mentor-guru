import EdTechCompanies from "../../blogs/EdTechCompanies";

const blogComponents = {
  "edtech-companies": EdTechCompanies,
} as const;

export default function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const BlogComponent = blogComponents[params.slug as keyof typeof blogComponents];

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
