"use client";

import type { FC, FormEvent } from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { List } from "lucide-react";
import { api } from "~/trpc/react";
import { useSession, signIn } from "next-auth/react";
import ApplyNowForm from "../_components/ApplyNowForm";
import { getLatestBlogs } from "~/data/blogMetadata";
import LatestArticlesSidebar from "../_components/LatestArticlesSidebar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/* ----------------------------
 * Types
 * ---------------------------- */
interface LatestArticle {
  id: number;
  title: string;
  thumbnail: string;
  slug: string;
  date: string;
}

const blog = {
  title: "Top 10 EdTech Companies in India 2026: Leading in Quality Education & Digital Innovation",
  author: "Saumya Sarin",
  publishedAt: new Date("2025-01-05"),
  views: 9036
};

/* ----------------------------
 * Main Blog Component
 * ---------------------------- */
const BlogPage: FC = () => {
  const [open, setOpen] = useState(true);
  
  // Refs for animations
  const breadcrumbRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const highlightsRef = useRef<HTMLElement>(null);
  const companiesRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Breadcrumb fade in from top
      gsap.from(breadcrumbRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power2.out"
      });

      // Header animation with stagger
      gsap.from(headerRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2, 
        ease: "power3.out",
        delay: 0.2
      });

      // Social buttons animation
      gsap.from(socialRef.current?.children || [], {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.6
      });

      // Featured image reveal
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power2.out",
        delay: 0.8
      });

      // Article content fade in
      gsap.from(articleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: articleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Highlights section
      gsap.from(highlightsRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: highlightsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Company sections stagger
      gsap.from(companiesRef.current?.children || [], {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: companiesRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      // Sidebar animation
      gsap.from(sidebarRef.current?.children || [], {
        opacity: 0,
        x: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.4
      });

    });

    return () => ctx.revert();
  }, []);

  const latestArticles: LatestArticle[] = getLatestBlogs(3)
    .filter(blog => blog.slug !== 'edtech-companies')
    .map(blog => ({
      id: blog.id,
      title: blog.title,
      thumbnail: blog.thumbnail,
      slug: blog.slug,
      date: blog.date,
    }));

  return (
    <div className="max-container padding-container py-10 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN BLOG CONTENT */}
        <main className="lg:col-span-2 space-y-6">
          {/* Breadcrumb */}
          <nav ref={breadcrumbRef} className="text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>{" "}
            &gt;{" "}
            <Link href="/blogs" className="hover:text-primary transition-colors">
              Latest Articles
            </Link>{" "}
            &gt;{" "}
            <span className="text-gray-700">Top 10 EdTech Companies...</span>
          </nav>

          {/* Title & Meta Info */}
          <header ref={headerRef}>
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
          <div ref={socialRef} className="flex flex-wrap gap-2">
            {(() => {
              const url = typeof window !== "undefined" ? window.location.href : "";
              const title = blog.title;

              const socials = [
                {
                  name: "Facebook",
                  url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
                },
                {
                  name: "Twitter",
                  url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
                },
                {
                  name: "LinkedIn",
                  url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
                }
              ];

              return socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-primary text-white rounded hover:bg-secondary transition-all duration-300 hover:scale-105 text-sm"
                >
                  Share {s.name}
                </a>
              ));
            })()}
          </div>

          {/* Featured Image */}
          <div ref={imageRef} className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/blogs/edtech-companies.jpg"
              alt="Blog banner"
              width={800}
              height={400}
              className="w-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Blog Body */}
          <article ref={articleRef} className="prose max-w-none text-gray-800">
            <p>
              The EdTech market in India has witnessed stupendous growth in recent years,
              bringing a paradigm shift in the way students consume education...
            </p>
            <h2>Highlights</h2>
            <ul>
              <li>Motion Education</li>
              <li>BYJU's</li>
              <li>ALLEN Career Institute</li>
              <li>Physics Wallah</li>
              <li>Unacademy</li>
            </ul>
          </article>

          {/* Highlights Section */}
          <section ref={highlightsRef} className="border rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Highlights</h2>
              <button
                onClick={() => setOpen(!open)}
                className="p-1 border rounded hover:bg-gray-100 transition-all hover:rotate-180 duration-300"
              >
                <List size={18} />
              </button>
            </div>

            {open && (
              <ol className="list-decimal list-inside mt-3 space-y-1 text-sm text-gray-700">
                <li className="hover:text-primary transition-colors cursor-pointer">List of Top 10 EdTech Companies in India</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Motion Education</li>
                <li className="hover:text-primary transition-colors cursor-pointer">BYJU's</li>
                <li className="hover:text-primary transition-colors cursor-pointer">ALLEN Career Institute</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Physics Wallah</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Unacademy</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Aakash</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Vedantu</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Simplilearn</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Resonance</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Extramarks</li>
                <li className="ml-4 hover:text-primary transition-colors cursor-pointer">Conclusion</li>
                <li className="ml-4 hover:text-primary transition-colors cursor-pointer">FAQs: Top 10 EdTech Companies in India</li>
                <li className="ml-4 hover:text-primary transition-colors cursor-pointer">Comments</li>
              </ol>
            )}
          </section>

          {/* EdTech Companies Section */}
          <section ref={companiesRef} className="space-y-10 mt-8">
            {/* 1. Motion Education */}
            <div id="motion-education" className="border-l-4 border-primary pl-6 hover:border-secondary transition-colors duration-300">
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
                Motion's Mission is to <strong>provide high-quality, accessible education to everyone</strong>,
                empowering students from all backgrounds to succeed via{" "}
                <strong>technology-based marketplace solutions</strong>. The company aims to create a
                democratic learning space that encourages innovations{" "}
                <strong>using digital techniques, complementing traditional learning methods</strong>.
                Utilizing trends from the world of e-learning, Motion is regarded as one of the{" "}
                <strong>top EdTech companies in India</strong>.
              </p>
            </div>

            {/* 2. BYJU's */}
            <div id="byjus" className="border-l-4 border-primary pl-6 hover:border-secondary transition-colors duration-300">
              <h2 className="text-2xl font-bold mb-3">2. BYJU's</h2>
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
                [Add BYJU's description, programs, mission, vision, etc. here just like Motion Education...]
              </p>
            </div>
          </section>

          {/* Comments Section */}
          <section className="mt-12 space-y-8">
            <CommentSection slug="edtech-companies" />
          </section>
        </main>

        {/* SIDEBAR */}
        <aside ref={sidebarRef} className="space-y-6">
          <ApplyNowForm />
          <LatestArticlesSidebar />
          
          {/* Ad Banner */}
          <div className="border rounded-lg p-4 bg-orange-50 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <h2 className="font-bold text-xl text-secondary">Amrit</h2>
            <p className="text-sm">A complete JEE/NEET online prep package</p>
            <p className="text-sm font-semibold mt-2">Starting from ₹2,500/-</p>
            <button className="mt-3 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-all duration-300 hover:scale-105">
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
  const commentsRef = useRef<HTMLDivElement>(null);

  const utils = api.useUtils();
  const { data: comments, isLoading } = api.comments.getBySlug.useQuery({ slug });
  const addComment = api.comments.add.useMutation({
    onSuccess: () => {
      setContent("");
      utils.comments.getBySlug.invalidate({ slug });
    },
  });

  // Animate comments when they load
  useEffect(() => {
    if (comments && comments.length > 0) {
      gsap.from(commentsRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
  }, [comments]);

  if (status === "loading" || isLoading) return <p>Loading comments...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Comments</h2>

      <div ref={commentsRef}>
        {comments?.length ? (
          comments.map((c) => (
            <div key={c.id} className="border rounded-md p-3 bg-gray-50 mb-3 hover:shadow-md transition-shadow duration-300">
              <p className="text-sm text-gray-800">{c.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                {c.author?.name ?? "Anonymous"} • {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No comments yet. Be the first!</p>
        )}
      </div>

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
            className="w-full border px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <button
            type="submit"
            disabled={addComment.isPending}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-all duration-300 hover:scale-105 disabled:opacity-50"
          >
            {addComment.isPending ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gradient-to-br from-gray-50 to-white">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-8 h-8 text-primary" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Join the Conversation
          </h3>
          
          <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
            Share your thoughts and connect with other readers. Log in to leave a comment.
          </p>
          
          <button
            onClick={() => signIn()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-5 h-5" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Log In to Comment
          </button>
        </div>
      )}
    </div>
  );
};