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
  title: "How to Prepare for Civil Services examination after 12th?",
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
    .filter(blog => blog.slug !== 'how-to-prepare-for-civil-services-examination-after-12th')
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
            <span className="text-gray-700">How to Prepare for Civil Services examination after 12th?</span>
          </nav>

          {/* Title & Meta Info */}
          <header>
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
               How to Prepare for Civil Services examination after 12th?
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
              src="/blogs/how-to-prepare-for-civil-services-examination-after-12th.png"
              alt="Blog banner"
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>

          {/* Blog Body */}
          <article className="prose max-w-none text-gray-800">
            <p className="text-gray-700 mb-3">
                First things first, after 12th Aspirants need to first enrol themselves for a graduation program, as it is the minimum qualification for IAS preparation. After 12th aspirants should choose a subject, which can further help you in preparing for IAS. Subjects like these will help you to prepare for IAS and will also give an extra edge in preparation. BA Public Policy & Administration with embedded civil services is a good option; aspirants can take subjects like Political science, Economics, Geography, History or any subject based upon his/her choices.
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
                <li>Understand UPSC exam structure </li>
                <li>Make newspaper reading a habit: </li>
                <li>Be thorough with your NCERT Books:</li>
                <li>Finish your optional subject:</li>
                <li>Read books about India</li>
                <li>Some Frequently Asked Questions:</li>
              </ol>
            )}
          </section>

          <section className="space-y-10 mt-8">
            
            <div>
              <h2 className="text-2xl font-bold mb-3">Understand UPSC exam structure:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <li>
                After 12th , if any aspirant is ready to take civil service as career option, aspirants should start understanding exam pattern and structure of the examination.
               </li>
               <li>
                Aspirants may refer articles of our Coaching Website. Aspirants should take  UPSC Syllabus and previous question papers of IAS of both  Prelims and Mains as priority , so that you will get a clear idea about the areas from which questions are normally asked and the pattern and requirement of this examination.
               </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Make newspaper reading a habit:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <li>
                Develop the habit of newspaper reading; particularly editorials and extracting that information in crispy way. Aspirants should start Reading the Hindu/ The Indian Express in college years. You may also start listening to All India Radio news analysis and Rajya Sabha TV discussions (E.g.: Big Picture).
               </li>
               <li>
                Reading is something you can’t develop in one or two days, this problem is all the more for those aspirants who are coming from non-humanities background. So, develop this good habit of reading Newspaper and collecting key points from that reading.
               </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Be thorough with your NCERT Books:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <h3><strong>Luxurious living:</strong></h3>
               <li>
                After ending of your college life, students are expected to be adult to some extent and have sense of say in matters of National Importance. What does that mean to school students? Aspirants should focus on his/he’s college studies texts! It’s the basis. Be a good student. Think and ponder over what is stated in your textbooks. Develop writing practice. Those Students who are from science background may collect humanities textbooks (NCERT) from website whose link is provided on our coaching website and start reading them whenever time permits. Priority subjects should be: History, Geography, Economy and Polity related NCERT texts.
               </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Finish your optional subject:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <li>
                If any aspirants has made his/her mind for this examination and aspirant is  in a position to decide on the optional subject after analyzing UPSC syllabus and previous question papers ,start to collect materials on the same. Try to finish optional subject at first hand, as this will definitely give you an extra edge in this examination.
               </li>
               <li>
                Preparation of optional subject requires different strategy and planning than preparation of GS subjects. In optional, you have to write detail of every aspect. So, aspirant should prioritise finishing of optional subject to surge ahead in this marathon running.
               </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Read books about India</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <li>
                Aspirants should develop a good habit of switching to books from Face book and should read books related to India written by visionary authors. These kinds of books are not specialized texts for Civil Service Exam but Reading these types of books will widen your horizon of thinking and provide a clear picture on the past, present, and future of India. A good understanding on the problems of India with their right solutions can be of great help when you frame answers in Civil Services Mains General Studies and Essay paper.
               </li>
               <li>
                Aspirants can read books like; India after Gandhi, A wonder that was India and books like wings of fire of Late President Dr Kalam for Motivation. Read many books as you can, there is no harm in reading books.
               </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Some Frequently Asked Questions:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                <h3><strong>After 12th should students have Backup Plan?</strong></h3>
               <ol>1. Not necessary to have a backup plan.  Although, UPSC exam is one of the toughest exams but if you work hard with dedication you will clear this examination. </ol>
               <ol>
                2. Go for 3 year graduation course that you can pursue along with your preparation for UPSC.
               </ol>
               <ol>
                3. You'll have 3 years to prepare so divided your time and make a routine. Make an elaborate idea , like in 1.5 years you'll complete the course next 1.5 years will be revision (revise again and again).
               </ol>
               <ol>
                4. Initially start with studying for an hour or two and then increase this time.
               </ol>
               <ol>
                5. Make notes, charts, flash cards anything that'll help you learn things. Try to understand every topic and not to simply mug up everything.
               </ol>
               <h3><strong>Should Aspirants develop a good Habit?</strong></h3>
               <ol>
                1. Follow your hobby, and better yourself in it, this thing not only will help you in examination point of view but also in reducing the extra burden and anxiety in you.
               </ol>
               <ol>
                2. Develop reading habit. Read as many novels/books as you can. You can even set a rational and practical number of targets every month to complete 2 or 3 of them.
               </ol>
               <ol>
                3. Read with emotions, visualize and feel what you read.
               </ol>
               <ol>
                4. Travel places, observe people, learn to question why?
               </ol>
               <ol>
                5. Try to know yourself, your limitations and strengths, your interest areas.
               </ol>
               <ol>
                6. Try to be the best form of yourself both physically and mentally.
               </ol>
               <ol>
                7. Never detach yourself from your dream it should always be there at the center. Lastly, learn about 'ekagrata' and 'samarpan' and train yourself to inculcate as much of it as you can.
               </ol>
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