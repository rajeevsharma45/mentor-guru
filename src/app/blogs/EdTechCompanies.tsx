"use client";

import type { FC, FormEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { List } from "lucide-react";
import { api } from "~/trpc/react";
import { useSession, signIn } from "next-auth/react";

/* ----------------------------
 * Types
 * ---------------------------- */
interface LatestArticle {
  id: number;
  title: string;
  thumbnail: string;
  timeAgo: string;
}

interface ApplyFormData {
  name: string;
  email: string;
  mobile: string;
  classLevel: string;
  course: string;
}

/* ----------------------------
 * Dummy Data
 * ---------------------------- */
const latestArticles: LatestArticle[] = [
  {
    id: 1,
    title: "CBSE Class 12th Board Exam Preparation Tips 2026",
    thumbnail: "/thumb-1.jpg",
    timeAgo: "45 min ago",
  },
  {
    id: 2,
    title: "NEET Sample Papers 2026 with Solution",
    thumbnail: "/thumb-2.jpg",
    timeAgo: "2 hours ago",
  },
  {
    id: 3,
    title: "CBSE Class 10 Board Exams To Be Conducted Twice a Year",
    thumbnail: "/thumb-3.jpg",
    timeAgo: "2 days ago",
  },
];

/* ----------------------------
 * Main Blog Component
 * ---------------------------- */
const BlogPage: FC = () => {
  const [open, setOpen] = useState(true);

  // Handle sidebar form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: ApplyFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      mobile: formData.get("mobile") as string,
      classLevel: formData.get("classLevel") as string,
      course: formData.get("course") as string,
    };
    console.log("Form Submitted: ", data);
    alert("Form submitted successfully!");
  };

  return (
    <div className="max-container padding-container py-10 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* -------------------- */}
        {/* MAIN BLOG CONTENT */}
        {/* -------------------- */}
        <main className="lg:col-span-2 space-y-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>{" "}
            &gt;{" "}
            <Link href="/blog" className="hover:text-primary">
              Latest Articles
            </Link>{" "}
            &gt;{" "}
            <span className="text-gray-700">Top 10 EdTech Companies...</span>
          </nav>

          {/* Title & Meta Info */}
          <header>
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
              Top 10 EdTech Companies in India 2026: Leading in Quality Education & Digital Innovation
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-3">
              <span>By Saumya Sarin</span>
              <span>• 4 weeks ago</span>
              <span>• 29 min read</span>
              <span>👁 9,036</span>
            </div>
          </header>

          {/* Social Buttons */}
          <div className="flex flex-wrap gap-2">
            {["Facebook", "Twitter", "LinkedIn"].map((platform) => (
              <button
                key={platform}
                className="px-3 py-2 bg-primary text-white rounded hover:bg-secondary transition text-sm"
              >
                Share {platform}
              </button>
            ))}
          </div>

          {/* Featured Image */}
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/blog-feature.jpg"
              alt="Blog banner"
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>

          {/* Blog Body */}
          <article className="prose max-w-none text-gray-800">
            <p>
              The EdTech market in India has witnessed stupendous growth in recent years,
              bringing a paradigm shift in the way students consume education...
            </p>
            <h2>Highlights</h2>
            <ul>
              <li>Motion Education</li>
              <li>BYJU’s</li>
              <li>ALLEN Career Institute</li>
              <li>Physics Wallah</li>
              <li>Unacademy</li>
            </ul>
          </article>

          {/* Highlights Section */}
          <section className="border rounded-lg p-4 bg-gray-50">
  {/* Header with toggle */}
  <div className="flex items-center justify-between">
    <h2 className="text-lg font-semibold">Highlights</h2>
    <button
      onClick={() => setOpen(!open)}
      className="p-1 border rounded hover:bg-gray-100"
    >
      <List size={18} />
    </button>
  </div>

  {/* Content */}
  {open && (
    <ol className="list-decimal list-inside mt-3 space-y-1 text-sm text-gray-700">
      <li>List of Top 10 EdTech Companies in India</li>
      <li>Motion Education</li>
      <li>BYJU’s</li>
      <li>ALLEN Career Institute</li>
      <li>Physics Wallah</li>
      <li>Unacademy</li>
      <li>Aakash</li>
      <li>Vedantu</li>
      <li>Simplilearn</li>
      <li>Resonance</li>
      <li>Extramarks</li>
      <li className="ml-4">Conclusion</li>
      <li className="ml-4">FAQs: Top 10 EdTech Companies in India</li>
      <li className="ml-4">Comments</li>
    </ol>
  )}
</section>

{/* -------------------- */} 
{/* EdTech Companies Section */} 
{/* -------------------- */}
<section className="space-y-10 mt-8">
  {/* 1. Motion Education */}
  <div id="motion-education">
    <h2 className="text-2xl font-bold mb-3">1. Motion Education</h2>
    <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
      <li>
        <strong>Website:</strong>{" "}
        <a href="https://motion.ac.in" target="_blank" className="text-primary hover:underline">
          motion.ac.in
        </a>
      </li>
      <li>
        <strong>Headquarters:</strong> Kota, Rajasthan, India
      </li>
      <li>
        <strong>Established Year:</strong> 2007
      </li>
    </ul>
    <p className="text-gray-700 mb-3">
      One of the <strong>top edtech companies in India</strong>, Motion believes in providing
      holistic learning solutions to students preparing for different competitive exams.
      Synergizing <strong>advanced e-learning technologies</strong>, Motion focuses on providing
      an <strong>in-depth and engaging learning experience</strong> with a deep-rooted dedication
      to digital education in India.
    </p>
    <p className="text-gray-700 mb-3">
      Some of the programs include – <em>Anushasan Course, Amrit Course</em>, and many others all
      designed to provide a <strong>planned, interactive, and goal-driven education</strong> to
      students. Moreover, through <strong>scholarship tests and lottery programs</strong>, Motion
      provides financial support in terms of free <strong>courses, scholarships, and accommodation</strong> support.
    </p>
    <p className="text-gray-700 mb-3">
      Motion uses <strong>advanced digital tools and AI-based learning modules</strong> to tailor
      education for every individual to increase student performance and participation.
    </p>

    <h3 className="text-xl font-semibold mt-4 mb-2">Mission & Vision</h3>
    <p className="text-gray-700">
      Motion’s Mission is to <strong>provide high-quality, accessible education to everyone</strong>,
      empowering students from all backgrounds to succeed via{" "}
      <strong>technology-based marketplace solutions</strong>. The company aims to create a
      democratic learning space that encourages innovations{" "}
      <strong>using digital techniques, complementing traditional learning methods</strong>.
      Utilizing trends from the world of e-learning, Motion is regarded as one of the{" "}
      <strong>top EdTech companies in India</strong>.
    </p>
  </div>

  {/* 2. BYJU’s (example skeleton for next one) */}
  <div id="byjus">
    <h2 className="text-2xl font-bold mb-3">2. BYJU’s</h2>
    <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
      <li>
        <strong>Website:</strong>{" "}
        <a href="https://byjus.com" target="_blank" className="text-primary hover:underline">
          byjus.com
        </a>
      </li>
      <li>
        <strong>Headquarters:</strong> Bengaluru, Karnataka, India
      </li>
      <li>
        <strong>Established Year:</strong> 2011
      </li>
    </ul>
    <p className="text-gray-700">
      [Add BYJU’s description, programs, mission, vision, etc. here just like Motion Education...]
    </p>
  </div>
</section>

          {/* ✅ Comments Section */}
          <section className="mt-12 space-y-8">
            <CommentSection slug="edtech-companies" />
          </section>
        </main>

        {/* -------------------- */}
        {/* SIDEBAR */}
        {/* -------------------- */}
        <aside className="space-y-6">
          {/* Apply Now Form */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <h2 className="text-lg font-semibold mb-3">Apply Now</h2>
                      <form className="space-y-3" onSubmit={handleSubmit}>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          className="w-full border px-3 py-2 rounded-md"
                          required
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          className="w-full border px-3 py-2 rounded-md"
                          required
                        />
                        <input
                          type="text"
                          name="mobile"
                          placeholder="Your Mobile No."
                          className="w-full border px-3 py-2 rounded-md"
                          required
                        />
          
                        <select name="classLevel" className="w-full border px-3 py-2 rounded-md" required>
                          <option value="">Select Class</option>
                          <option value="Class 10">Class 10</option>
                          <option value="Class 12">Class 12</option>
                        </select>
          
                        <select name="course" className="w-full border px-3 py-2 rounded-md" required>
                          <option value="">Select Course</option>
                          <option value="NEET">NEET</option>
                          <option value="JEE">JEE</option>
                        </select>
          
                        <button
                          type="submit"
                          className="w-full bg-secondary text-white py-2 rounded-md hover:bg-primary transition"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
          
                    {/* Latest Articles */}
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Latest</h2>
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
                              <button
                                onClick={() =>
                                  (window.location.href =
                                    article.id === 1 ? "/blog/edtech-companies" : `/blog/${article.id}`)
                                }
                                className="text-sm font-medium hover:text-primary text-left"
                              >
                                {article.title}
                              </button>
                              <p className="text-xs text-gray-500">{article.timeAgo}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
          
                    {/* Ad Banner */}
                    <div className="border rounded-lg p-4 bg-orange-50 text-center">
                      <h2 className="font-bold text-xl text-secondary">Amrit</h2>
                      <p className="text-sm">A complete JEE/NEET online prep package</p>
                      <p className="text-sm font-semibold mt-2">Starting from ₹2,500/-</p>
                      <button className="mt-3 px-4 py-2 bg-primary text-white rounded-md">
                        Join Now
                      </button>
                    </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPage;

/* ----------------------------
 * Comment Section Subcomponent
 * ---------------------------- */
const CommentSection = ({ slug }: { slug: string }) => {
  const { data: session, status } = useSession();
  const [content, setContent] = useState("");

  const utils = api.useUtils();
  const { data: comments, isLoading } = api.comments.getBySlug.useQuery({ slug });
  const addComment = api.comments.add.useMutation({
    onSuccess: () => {
      setContent("");
      utils.comments.getBySlug.invalidate({ slug });
    },
  });

  // While session or comments loading
  if (status === "loading" || isLoading) return <p>Loading comments...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Comments</h2>

      {/* Existing Comments */}
      {comments?.length ? (
        comments.map((c) => (
          <div key={c.id} className="border rounded-md p-3 bg-gray-50">
            <p className="text-sm text-gray-800">{c.content}</p>
            <p className="text-xs text-gray-500 mt-1">
              {c.author?.name ?? "Anonymous"} • {new Date(c.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No comments yet. Be the first!</p>
      )}

      {/* Comment Input */}
      {session ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!content.trim()) return;
            addComment.mutate({ slug, content });
          }}
          className="space-y-2"
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your comment..."
            className="w-full border px-3 py-2 rounded-md text-sm"
          />
          <button
            type="submit"
            disabled={addComment.isPending}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition"
          >
            {addComment.isPending ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <div className="text-sm text-gray-700">
          Please{" "}
          <button
            onClick={() => signIn()}
            className="text-primary underline hover:text-secondary"
          >
            log in
          </button>{" "}
          to post a comment.
        </div>
      )}
    </div>
  );
};
