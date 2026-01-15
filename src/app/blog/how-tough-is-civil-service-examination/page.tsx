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
  title: "How Tough is Civil Service Examination?",
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
    .filter(blog => blog.slug !== 'how-tough-is-civil-service-examination')
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
            <span className="text-gray-700">How Tough is Civil Service Examination?</span>
          </nav>

          {/* Title & Meta Info */}
          <header>
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
               How Tough is Civil Service Examination?
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
              src="/blogs/how-tough-is-civil-service-examination.png"
              alt="Blog banner"
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>

          {/* Blog Body */}
          <article className="prose max-w-none text-gray-800">
           <p className="text-gray-700 mb-3">
            This is certainly not true. Cracking any examination requires right strategy and approach. Indeed, it is true to some extent that the Civil Services Exam has a very long process and it takes whole out of an aspirant as this examination is the marathon, but it does not mean that the exam is toughest and can’t be cracked.
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
                <li>Why Civil Service Examination is Considered Toughest? </li>
                <li>Some of the Myths that add fuel in Making Civil service examination Toughest: </li>
                <li>Things that Matters in Clearing this Examination:</li>
              </ol>
            )}
          </section>

          <section className="space-y-10 mt-8">
            
            <div>
              <h2 className="text-2xl font-bold mb-3">Why Civil Service Examination is Considered Toughest?</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <li>
                <strong>Giant Syllabus:</strong> Preparation of civil service examination requires covering vast number of subjects; number of topics that an aspirant will have to cover can exhaust any student. It is humbling and frightening at the same time.
               </li>
               <li>
                <strong>Cut throat Competition:</strong> Every year a million people apply for the prelims examination. Only a thousand get selected. Need I say more?
               </li>
               <li>
                <strong>Testing at various parameters:</strong> Aspirants are tested on a wide range of skills ranging from reading, writing, time management, comprehension, aptitude, logical reasoning, language, personality etc. Aspirants need to be an all-rounder and have a rounded personality to be in the merit list.
               </li>
               <li>
                <strong>Role of Luck to some extent:</strong> To some extent every aspirant requires tiny little luck .every aspirant requires some sort of luck to stand a chance. In this examination one single mark counts that can determine your selection, same marks the subject in which you score can determine your selection in the merit list.
               </li>
               <li>
                <strong>Test of your Grit and Determination:</strong> These examination tests an aspirant at every little expect to take best candidates out. If a person is fighting against odds like this, unless he/she really have the grit and determination to see the end, no one can win any battle.
               </li>
               <li>
                <strong>Difficult Pattern:</strong> If you compared civil service examination to another exam, this examination process is rigid. There are many exams, where a candidate has to clear the stages one by one. Even if they fail in any stage, they just have to reappear for the same. Even if you fail in the Main exam or interview, you have to start from the very first stage, which is considered as a difficult part for candidates.
               </li>
               <li>
                <strong>Success ratio is low:</strong> This examination has very low success rate, lakhs of aspirants appear at first stag that is at pre stage and the success rate is very low. Chances of getting into services are very less unless you work smartly and you have grit and determination to get success. This examination is not only test of the intelligence but also an extensive range of skills.
               </li>
               <li>
                <strong>Unpredictable:</strong> Of course, the UPSC is unpredictable but far from uncertainty. They may ask questions from anywhere but keep in mind, anywhere from the UPSC syllabus. All these factors go on to make or mar an aspirant. Hence many perceive it as tough.
               </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Some of the Myths that add fuel in Making Civil service examination Toughest:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <h3><strong>IAS aspirants need to study for 15-17 hours a day:</strong></h3>
               <li>
                This is the biggest myth among the IAS aspirants. Most of the aspirants believe that in order to get selection in the IAS Exam, the IAS aspirant’s needs to study for 15- 17 hours daily. 9 out of 10 teachers related to the IAS Classes will suggest every aspirant to study for 8 hours in a day and that is more than enough to crack the IAS Exam.
               </li>
               <h3><strong>IAS aspirants should be Sharvaygyani:</strong></h3>
               <li>
                It is a popular perception that an IAS aspirant must know everything about everything. This is nothing but myth.
               </li>
               <li>
                As UPSC has defined its syllabus in a very simple language and every aspirant has to follow that syllabus during the preparation. 
               </li>
               <li>
                Various subject and topics are decided, keeping in mind the importance to our nation and society. There are certain standard books through which every aspirant has to cover the UPSC syllabus. So, in the nutshell, aspirant can cover the syllabus through standard books, news events. 
               </li>
               <h3><strong>Aspirant  need to have good academics:</strong></h3>
               <li>
                This is again nothing but myth that one needs to be topper throughout his academics, there are many persons who were an average student during their academics have cleared this examination. So it does not make any difference whether one had glorified and successful academics.  The basic demand of this examination is marks in this exam only hence there is nothing called marks of your academics.
               </li>
                <h3><strong>Have to read dozens of books for IAS Exam:</strong></h3>
                <li>
                    Every aspirant has to cover the required syllabus that is it .This exam tests the conceptual clarity of the topics and the clarity of expression because only by applying the concepts and principles, the pragmatic solution can be achieved to the problems. 
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Things that Matters in Clearing this Examination:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <li>
                Most important fact about this examination and competition is that; it is one of the competitions where aspirant from most mediocre academic background make it to the final list and the most talented with academic excellence people too succumb if they lack the ability to carry the momentum to compete. Every  Aspirant should have below qualities:
               </li>
               <li>
                <strong>Understanding the competition:</strong> students as now have to go for smartness in this preparation. Only those students clear this examination, who understands the requirements of the competition. Always remember that it is you who has to compete with yourself. If you know yourself you can reduce efforts and reduce the duration of your preparation; if you know the competition in and out.
               </li>
               <li>
                <strong>Role of Perseverance:</strong> Not every student is lucky enough to sneak into this service in one go. Many a times, many of students have to stay in the preparation for a while since this competition requires dedicated efforts. If you see the pattern, even if you clear this examination in one go, the entire duration of the exam from prelims to interview till final results takes around 1 year. 
               </li>
               <li>
                <strong>Living the process:</strong> If any aspirant is enjoying the process of this journey and he/she is living the competition. Your chance of selection will be more compare to those students who takes this preparation as burden and think about result than process.
               </li>
               <li>
                    <strong>Importance of basics:</strong> In the age of technology, where the problem of plenty is at the core and .it is important for a student to choose the study material wisely. Stick to basic source like NCERT initially then go for standard books to improve the information.
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