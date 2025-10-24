import dynamic from "next/dynamic";

interface BlogPageProps {
  params: { slug: string };
}

// ✅ Map each slug to its corresponding blog component file
const blogComponents: Record<string, React.ComponentType> = {
  "edtech-companies": dynamic(() => import("../blogs/EdTechCompanies")),
  // Add more blogs here later:
  // "jee-preparation-2026": dynamic(() => import("../../blogs/JeePreparation")),
  // "neet-chemistry-notes-2026": dynamic(() => import("../../blogs/NeetChemistryNotes")),
};

export default function BlogPage({ params }: BlogPageProps) {
  const { slug } = params;
  const BlogComponent = blogComponents[slug];

  if (!BlogComponent) {
    return (
      <div className="max-container py-20 text-center text-gray-600">
        <h1 className="text-2xl font-bold mb-4">404 - Blog Not Found</h1>
        <p>The article you’re looking for doesn’t exist or is coming soon.</p>
      </div>
    );
  }

  return <BlogComponent />;
}
