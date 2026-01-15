"use client";

import type { FC, FormEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { List } from "lucide-react";
import { api } from "~/trpc/react";
import { useSession, signIn } from "next-auth/react";
import { getLatestBlogs } from "~/data/blogMetadata";
import ApplyNowForm from "~/app/_components/ApplyNowForm";
import LatestArticlesSidebar from "~/app/_components/LatestArticlesSidebar";
import { ArrowRight } from "lucide-react";

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
  title: "How to Choose the Right Optional Paper in UPSC CSE Examination?",
  author: "Rajeev Sharma",
  publishedAt: new Date("2025-01-12"),
  views: 9036
};

/* ----------------------------
 * Main Blog Component
 * ---------------------------- */
const BlogPage: FC = () => {
  const [open, setOpen] = useState(true);

  // REPLACE: Get latest articles from metadata
  const latestArticles: LatestArticle[] = getLatestBlogs(3)
    .filter(blog => blog.slug !== 'how-to-choose-the-right-optional-paper-in-upsc-cse-examination')
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
            <Link href="/blogs" className="hover:text-primary">
              Latest Articles
            </Link>{" "}
            &gt;{" "}
            <span className="text-gray-700">How to Choose the Right Optional Paper in UPSC CSE Examination?</span>
          </nav>

          {/* Title & Meta Info */}
          <header>
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
               How to Choose the Right Optional Paper in UPSC CSE Examination?
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-3">
              <span>By Rajeev Sharma</span>
              <span>• 4 weeks ago</span>
              <span>• 29 min read</span>
              <span>👁 9,036</span>
            </div>
          </header>

          {/* Social Buttons */}
          <div className="flex flex-wrap gap-2">
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
                  className="px-3 py-2 bg-primary text-white rounded hover:bg-secondary transition text-sm"
                >
                  Share {s.name}
                </a>
              ));
            })()}
          </div>

          {/* Featured Image */}
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/blogs/how-to-choose-the-right-optional-paper-in-upsc-cse-examination.png"
              alt="Blog banner"
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>

          {/* Blog Body */}
          <article className="prose max-w-none text-gray-800">
           <p className="text-gray-700 mb-3">
            Selecting the right optional subject plays a crucial role in your selection in the UPSC CSE Examination.
           </p>
           <p className="text-gray-700 mb-3">
            Many candidates face the dilemma of how to choose their optional subject. Fortunately, in the new format, General Studies (GS) has gained more significance since UPSC has removed the requirement of two optional subjects, and now candidates need to choose only one. So, don't rush into this decision. Start your GS preparation first and then make your choice after some time. In the four GS papers, you will be familiarised with various optional subjects such as History, Geography, Public Administration, Political Science, and Sociology. This exposure will help you determine your inclination towards a specific subject.
           </p>
          </article>

          {/* Highlights Section */}
          <section className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Highlights</h2>
              <button
                onClick={() => setOpen(!open)}
                className="p-1 border rounded hover:bg-gray-100"
              >
                <List size={18} />
              </button>
            </div>

            {open && (
              <ol className="list-decimal list-inside mt-3 space-y-1 text-sm text-gray-700">
                <li>How to Choose the Right Optional? </li>
                <li>General Rules of Choosing Right Optional</li>
                <li>Some Frequently Asked Questions</li>
                <li>Things that should be avoided in answer writing</li>
              </ol>
            )}
          </section>

          <section className="space-y-10 mt-8">
            
            <div>
              <p className="text-gray-700 mb-3">
                Each subject has its unique demands in terms of thinking approach, writing style, and presentation technique. Your personality should align with the subject you choose.
              </p>
              <p className="text-gray-700 mb-3">
                To choose your optional subject, consider the following fundamental criteria:
              </p>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <li>
                Interest and Understanding: Study GS mains to discover which subject piques your interest the most.
               </li>
               <li>
                Analyse the Syllabus and Past Question Papers of Shortlisted Subjects.
               </li>
               <li>
                Suitability for Writing Style and Presentation Technique: Determine the subject that suits your writing style and presentation technique once you start writing for GS and essays.
               </li>
               <li>
                Expected Thought Pattern for a Specific Subject: You will know this about yourself after your GS preparation.
               </li>
               <li>
                Availability of Study Material.
               </li>
               <li>
                Availability of Guidance.
               </li>
               <li>
                Weightage of the Optional Subject in GS.
               </li>
               <li>
                Undergraduate Background: Some people also consider the length of the curriculum.
               </li>
            </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">General Rules of Choosing Right Optional</h2>
              <p className="text-gray-700 mb-3">
                Avoid selecting a subject in which you lack proficiency. If you are comfortable, choose a subject that you studied at the graduate level. Let your interest guide your choice, not merely your graduate-level study. Don't rely on myths like "this subject gets the most marks because the topper/my friend chose it," etc.
              </p>
              <p className="text-gray-700 mb-3">
                Keep in mind that you may be good at a subject, but if it's been a while since you last touched it, relearning it may become challenging, especially in technical subjects. In such cases, it's advisable to consider a new subject that you can grasp easily.
              </p>
              <p className="text-gray-700 mb-3">
                The choice of the optional subject should be based on the availability of quality study material. Subjects like History, Sociology, Anthropology, Geography, Political Science, Psychology, and Public Administration have extensive study material available.
              </p>
                <p className="text-gray-700 mb-3">
                    Before Selecting optional subjects - analyze the depth of the curriculum. After that, review the previous year's question papers and analyze their trends. This should be done at the beginning, and it will require some time to make the final decision. Once you have made up your mind about choosing your optional subject, stick to it and never regret not choosing any other optional subject.
                </p>
                <p className="text-gray-700 mb-3">
                    Lastly, seek feedback/advice from people who have cleared exams in those optional subjects that they had chosen for the main examination. You should ask them how many marks they scored in both papers of the subject. Additionally, get some suggestions about study material and preparation strategies. Sometimes, such insights are published in competitive magazines, and you will have to study them and develop your thoughts based on them. Besides, you can follow topper's blogs to obtain better information.
                </p>
                <p className="text-gray-700 mb-3">
                    Past Performance: Candidates should analyze the performance of those students who have chosen the subject in previous attempts. By checking the total number of selections and the marks obtained by them, candidates can easily understand the performance trends in optional subjects.
                </p>
                <p className="text-gray-700 mb-3">
                    In conclusion, choosing the right optional subject is a crucial decision that requires thoughtful consideration of your interests, strengths, and the availability of resources. Take your time, explore your options, and select the subject that aligns with your personality and has a suitable environment for your preparation.
                </p>
            </div>


          </section>

          {/* Comments Section */}
          <section className="mt-12 space-y-8">
            <CommentSection slug="edtech-companies" />
          </section>
        </main>

        {/* -------------------- */}
        {/* SIDEBAR */}
        {/* -------------------- */}
        <aside className="space-y-6">
          <ApplyNowForm />
          
          {/* Latest Articles - UPDATED */}
          <LatestArticlesSidebar />
          
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

  if (status === "loading" || isLoading) return <p>Loading comments...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Comments</h2>

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