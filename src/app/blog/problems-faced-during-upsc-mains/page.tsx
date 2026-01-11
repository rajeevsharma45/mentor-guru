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
  title: "Problems Faced by Aspirants during UPSC CSE Mains Preparation",
  author: "Saumya Sarin",
  publishedAt: new Date("2025-01-05"),
  views: 9036
};

/* ----------------------------
 * Main Blog Component
 * ---------------------------- */
const BlogPage: FC = () => {
  const [open, setOpen] = useState(true);

  // REPLACE: Get latest articles from metadata
  const latestArticles: LatestArticle[] = getLatestBlogs(3)
    .filter(blog => blog.slug !== 'problems-faced-during-upsc-mains')
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
            <span className="text-gray-700">Problems Faced by Aspirants during UPSC CSE Mains Preparation</span>
          </nav>

          {/* Title & Meta Info */}
          <header>
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
               Problems Faced by Aspirants during UPSC CSE Mains Preparation
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
              src="/blogs/problems-faced-during-upsc-mains.jpg"
              alt="Blog banner"
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>

          {/* Blog Body */}
          <article className="prose max-w-none text-gray-800">
            <p className="text-gray-700 mb-3">
              On a general basis, we can categorize Students writing Mains in two broader categories - (a) Aspirants Writing Mains on a continuous basis but are not able to clear mains, (b) Students writing mains for the very first time. 
            </p>
            <p className="text-gray-700 mb-3">
              <u>In this article, we are going to provide insight related to the preparation strategy for mains for both types of categories of students:</u>
            </p>
            <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
              <strong>First Timers</strong>
              <li>
                An aspirant in his/her first attempt faces major problems like how to start preparation, what is the booklist, what should be the approach to read NCERTs, how to read newspapers, how to make notes, etc. 
              </li>
              <strong>Veterans</strong>
              <li>
                Whereas, an aspirant in his/her second or third attempt faces problems like how to improve answer writing, how to make notes, what content should be referred for value-addition, etc. 
              </li>
            </ul>
            <h2>Highlights</h2>
            <div className="rounded-lg overflow-hidden">
                        <Image
                          src="/blog-feature.jpg"
                          alt="Blog banner"
                          width={400}
                          height={400}
                          className="w-full object-cover"
                        />
                      </div>
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
                <li>Problems Faced by Aspirants </li>
                <li>1. Lack of information on subjects and topics </li>
                <li>2. Lack of understanding of the exam</li>
                <li>3. Lack of guidance for the correct sources</li>
                <li>4. Lack of awareness of knowing the weightage</li>
                <li>5. Lack of awareness of knowing the weightage</li>
                <li>6. Lack of action plan for revision</li>
                <li>7. Lack of knowledge in choosing an optional subject</li>
                <li>Why Mentorship is Important?</li>
                <li>Some Frequently Asked Questions:</li>
              </ol>
            )}
          </section>


          <section className="space-y-10 mt-8">
            
            <div>
              <h2 className="text-2xl font-bold mb-3">Problems Faced by Aspirants: </h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                <h3><strong>1. Lack of plan to cover the syllabus:</strong></h3>
                <p className="text-gray-700 mb-3">
                  The objective to cover the syllabus of the UPSC-CSE is to develop an understanding. After understanding an aspirant needs to learn to develop synergy between the static and current affairs. This was reflected in the PYQs of the UPSC. Students have their own constraints in terms of time and availability to understand the syllabus. Hence, a mentor helps students to evolve a plan to cover the syllabus. 
                </p>
                      <h3><strong>2. Lack of information on subjects and topics:</strong></h3>   
                      <p className="text-gray-700 mb-3">
                        As it is General Studies, whose questions are general; answers are general; hence, its preparation should also be general. However, the addition of day-to-day data or news makes it difficult for the aspirant to make sense of subjects and topics. Therefore, a mentor helps the students not just to understand but also to make 100% utilization of information on subjects and topics. 
                      </p>
                    <h3><strong>3. Lack of understanding of the exam:</strong></h3>  
                    <p className="text-gray-700 mb-3">
                      It is imperative to understand the approach of this examination. For example, UPSC in its examination wants an aspirant to make them understand his/her understanding of the topics/events. Hence, a mentor helps students to make their understanding more understandable i.e., you need to explain your understanding to UPSC.
                    </p>
                      <h3><strong>Lack of guidance for the correct sources:</strong></h3>  
                      <p className="text-gray-700 mb-3">
                        Many aspirants carry a wrong approach with respect to the sources they refer to. They lack the clarity and edge of the topics. For example, an aspirant considers the newspaper as a material that he/she is bound to read. Whereas, a mentor helps the student to read the newspaper as value-additive material. 
                      </p>
                    <h3><strong>Lack of awareness of knowing the weightage:</strong></h3> 
                    <p className="text-gray-700 mb-3">
                      Referring to PYQs helps students know the question pattern and weightage of the subjects. However, many aspirants refer PYQs as any other mock test. Therefore, a mentor helps the student to go through the PYQs with an appropriate approach to understand the demand of the UPSC and also the weightage and prepare accordingly. 
                    </p>
                    <h3><strong>Lack of action plan for revision:</strong></h3>
                    <p className="text-gray-700 mb-3">
                      Revision and recall are important aspects of this examination. Students majorly lack the approach to revising the vast syllabus of the UPSC in a timely manner. Hence, a mentor guides the student toward preparing an action plan for revising the important sources and topics.
                    </p>
                    <h3><strong>Lack of knowledge in choosing an optional subject:</strong></h3>
                    <p className="text-gray-700 mb-3">
                      Many of the unsuccessful aspirants take the wrong optional subject. As one pass or fails the Mains Examination based upon his/her optional subject. A mentor usually helps narrow down the decision-making towards choosing an optional subject.
                    </p>
              </ul>
            </div>

            
            <div>
              <h2 className="text-2xl font-bold mb-3">Why Mentorship is Important?</h2>
             <p className="text-gray-700 mb-3">
              A mentor helps the student to understand the approach required to clear this examination. Like, how to start, how to read the newspaper, how to make notes, how to improve answer writing, and how to understand the syllabus.
            </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Some Frequently Asked Questions:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                <h3><strong>1. Should I Join Full fledged Course or a Crash Course type course with answer writing?</strong></h3>
                <li>
                  UPSC-CSE requires timely guidance. Hence, it is imperative that a student should enroll in a full-fledged course. This will help students to improve their preparation strategy at every evolving step.
                </li>
                <h3><strong>2. Is it feasible to cover the Mains syllabus within 4 months?</strong></h3>
                <li>
                  With proper guidance from a mentor, one can cover the entire syllabus of the Mains Examination. This may include, answer writing practice, note-making, value-addition, understanding of the syllabus, and connectivity with the current events
                </li>
                <h3><strong>3. Should I join the test series?</strong></h3>
                <li>
                  Yes, the test series is an important part of this examination. The test series will help the student to improve their answer writing skills by considering the feedback of an Evaluator.
                </li>
                <li>
                  The most appropriate advice will be to not think about result too much and think about the process rather than thinking all the time about result. As it is said that” think about the journey rather than destination”. By doing developing thought process like that you can develop a good habit of positive thinking, which can play a crucial role in defining your career.
                </li>
                <h3><strong>4. Should I revise my notes? </strong></h3>
                <li>
                  Revision and recall is one of the important features of this examination. One should revise his/her notes at regular intervals. 
                </li>
              </ul>
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