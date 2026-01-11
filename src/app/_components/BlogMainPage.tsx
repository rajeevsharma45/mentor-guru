"use client";

import type { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ApplyNowForm from "./ApplyNowForm";
import { 
  ALL_BLOGS_METADATA, 
  BLOG_CATEGORIES, 
  getFeaturedBlog, 
  getLatestBlogs,
  type BlogMetadata 
} from "~/data/blogMetadata";

// --------------------
// Sub-Components
// --------------------
interface Category {
  name: string;
  slug: string;
}

const CategoryButtons: FC<{ categories: readonly Category[]; onCategoryClick: (slug: string) => void }> = ({
  categories,
  onCategoryClick,
}) => (
  <section>
    <h2 className="text-lg font-semibold mb-4 border-l-4 border-primary pl-2">
      Categories
    </h2>
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onCategoryClick(cat.slug)}
          className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium bg-white hover:bg-primary hover:text-white transition"
        >
          {cat.name}
        </button>
      ))}
    </div>
  </section>
);

const FeaturedBlog: FC<{ blog: BlogMetadata; onClick: () => void }> = ({ blog, onClick }) => (
  <div
    className="relative rounded-lg overflow-hidden cursor-pointer"
    onClick={onClick}
    role="link"
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
  >
    <Image
      src={blog.thumbnail}
      alt={blog.title}
      width={900}
      height={500}
      className="w-full h-64 object-cover lg:h-96"
    />
    <div className="absolute inset-0 bg-black/50 flex items-end">
      <div className="p-4">
        <span className="text-white text-xl lg:text-2xl font-bold hover:underline">
          {blog.title}
        </span>
      </div>
    </div>
  </div>
);

const BlogCard: FC<{ blog: BlogMetadata; onClick: () => void }> = ({ blog, onClick }) => (
  <div
    className="border rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer"
    onClick={onClick}
    role="link"
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
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
      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{blog.excerpt}</p>
    </div>
  </div>
);

interface Course {
  id: number;
  title: string;
  duration: string;
  price: string;
  slug: string;
  image: string;
}

const UPSC_COURSES: Course[] = [
  { id: 1, title: "Moksha Plus-2027", duration: "16 months from the date of Purchase", price: "₹24,999", slug: "moksha-2027", image: "/courses/moksha-plus-2027.jpg" },
  { id: 2, title: "Prelims Nirvana-2026", duration: "Till May 31, 2026", price: "₹4,999", slug: "prelims-nirvana-2026", image: "/courses/Prelims Nirvana.jpg" },
  { id: 3, title: "Mains-Warrior", duration: "Till Mains", price: "₹2999", slug: "pyq-based", image: "/courses/PYQ-Based.jpg" },
  { id: 4, title: "Anthropology Advance 2027", duration: "Till Mains", price: "₹12,999", slug: "anthropology-advance-2026", image: "/courses/Anthropology Optional.jpg" },
  { id: 5, title: "PMains Warrior", duration: "Till Mains 2026", price: "₹12,999", slug: "psir-2026", image: "/courses/Mains-Warrior.jpg" },
];

const UPSCCourses: FC<{ courses: Course[]; onCourseClick: (slug: string) => void }> = ({
  courses,
  onCourseClick,
}) => (
  <div>
    <h2 className="text-lg font-semibold mb-3 border-l-4 border-primary pl-2">
      Popular UPSC Courses
    </h2>
    <ul className="space-y-3">
      {courses.map((course) => (
        <li 
          key={course.id} 
          className="border rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer"
          onClick={() => onCourseClick(course.slug)}
        >
          <Image
            src={course.image}
            alt={course.title}
            width={600}
            height={400}
            className="w-full object-cover"
          />
          <div className="p-3">
            <h3 className="text-sm font-semibold text-gray-800 hover:text-primary">
              {course.title}
            </h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">{course.duration}</span>
              <span className="text-sm font-bold text-primary">{course.price}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

// --------------------
// Main Component
// --------------------
const BlogMainPage: FC = () => {
  const router = useRouter();
  
  // Get data from centralized metadata
  const featuredBlog = getFeaturedBlog();
  const latestBlogs = getLatestBlogs().slice(1, 5); // Skip featured, get next 4

  const handleBlogClick = (slug: string) => router.push(`/blog/${slug}`);
  const handleCategoryClick = (slug: string) => router.push(`/blog/category/${slug}`);
  const handleCourseClick = (slug: string) => router.push(`/courses/${slug}`);

  return (
    <div className="max-container padding-container py-10 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <main className="lg:col-span-2 space-y-8">
          <CategoryButtons 
            categories={BLOG_CATEGORIES} 
            onCategoryClick={handleCategoryClick} 
          />

          {featuredBlog && (
            <FeaturedBlog 
              blog={featuredBlog} 
              onClick={() => handleBlogClick(featuredBlog.slug)} 
            />
          )}

          <section>
            <h2 className="text-lg font-semibold mb-4 border-l-4 border-primary pl-2">
              Latest Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {latestBlogs.map((blog) => (
                <BlogCard 
                  key={blog.id} 
                  blog={blog} 
                  onClick={() => handleBlogClick(blog.slug)} 
                />
              ))}
            </div>
          </section>
        </main>

        {/* Sidebar */}
        <aside className="space-y-6">
          <ApplyNowForm />
          <UPSCCourses courses={UPSC_COURSES} onCourseClick={handleCourseClick} />
        </aside>
      </div>
    </div>
  );
};

export default BlogMainPage;