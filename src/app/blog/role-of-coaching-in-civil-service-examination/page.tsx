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
  title: "Role of Coaching in Preparation of Civil Service Examination",
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
    .filter(blog => blog.slug !== 'role-of-coaching-in-civil-service-examination')
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
            <span className="text-gray-700">Role of Coaching in Preparation of Civil Service Examination</span>
          </nav>

          {/* Title & Meta Info */}
          <header>
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
               Role of Coaching in Preparation of Civil Service Examination
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
              src="/blogs/role-of-coaching-in-civil-service-examination.png"
              alt="Blog banner"
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>

          {/* Blog Body */}
          <article className="prose max-w-none text-gray-800">
           {/* <p className="text-gray-700 mb-3"></p> */}
           <h2 className="text-2xl font-bold mb-3">Coaching at Present context?</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <li>
                Coaching at present moment is like creating way for students in hazy and fizzy roads. Due to information and communication technology a lot of material is there in market so students are facing problem of plenty. In these situation students has to pin point their material and consolidate them so that they can revise. When problem of plenty comes into existence then students feel every material circulating in the market is good for them, they start trusting market material instead of their handmade material, this problem gets all the more to the newcomer in the field; who has just started their preparation.
               </li>
               <li>
                Somewhere down the line it can be said that the role of coaching has intensified in last couple of years in the form of more or less online than offline. Students are confused and they need proper guidance for preparation of various competitive examination.
               </li>
              </ul>
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
                <li>Benefits of Coaching: </li>
                <li>Negative Aspects of Coaching from students Angle: </li>
                <li>Some Frequently Asked Questions:</li>
              </ol>
            )}
          </section>

          <section className="space-y-10 mt-8">
            
            <div>
              <h2 className="text-2xl font-bold mb-3">Benefits of Coaching:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                 <h3><strong>Streamlining of Syllabus:</strong></h3>
               <li>
                The most important benefit of coaching is streamlining of syllabus. What coaching provides students is consolidating your material in such way that you can revise your material again and again. This doesn’t mean you have to compromise with your requirement of studding.
               </li>
               <li>
                In preparation for Civil services there is no short cut and there is no respite from hard work. Complete preparation requires systemic planning to begin the preparation and cover every aspect related to the exam such as syllabus, preparation revision time, answer writing practice, and so on. These all things are covered by coaching in timely manner and what students are being expected to their part.
               </li>
               <h3><strong>Motivation for Examination:</strong></h3>
               <li>
                It is funny to hear students part, that coaching provides motivation. It may sound acceptable to many of you that coaching provides motivation. But the truth is motivation comes from inside, answers should come inside, why you are preparing for this examination. When you can answer this question; why you are preparing for this examination, this will be reflected in your preparation as well.
               </li>
               <li>
                Students can expect the faculty of particular coaching to motivate the pupils and ensure they are up to date with the latest syllabus and world events. Some of methods of engaging and interactive classroom are the best way to prepare for the IAS exam. Regular in-class mock tests and interviews encourage students to improve and build on confidence. However, these are all external factors and will not create a sense of belongings inside you until you feel from inside about you. AS it is side that “Teachers can drag you to the river but you have to drink water by themselves”.
               </li>
               <h3><strong>Developing Right Approach and Attitude for Examination:</strong></h3>
               <li>
                Coaching provides a complete package of preparation in which students get; right from proper guidelines and help of teachers to the mock test series and classroom environment for their proper development.
               </li>
               <li>
                Coaching provides a straightforward approach to the students, in which they can develop their approach of tackling various subjects. Coaching also provides information to students what to read and what not to read, which catalyst in preparation of this examination.
               </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Negative Aspects of Coaching from students Angle:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                <h3><strong>Depending too much on Coaching:</strong></h3>
                <li>
                    The most common mistake made by students is depending too much upon coaching for their success. Students quite often forget that; coaching provides a set of guideline that students need to follow in letter and spirit for their success. Coaching is not success in itself, coaching makes students way easy that’s it.
                </li>
                <li>
                    Coaching do its part and students should remember that coaching don’t provide spoon feeding, students who are preparing for this examination is expected to do their part and work on developing their skills which is the essential component of clearing this examination.
                </li>
                <h3><strong>Taking coaching as extension period of College life:</strong></h3>
                <li>
                    Many a times, when students come for coaching they tend to forget that coaching is an additional extension period of collage life. When i say extension period of coaching life it means they become lazy and they take coaching as some sort of vacation. 
                </li>
                <li>
                    When students decide to go for coaching they should put all their heart into their preparation, doing half hearted work will not going to take them anywhere.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Some Frequently Asked Questions:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <h3><strong>Can anyone clear this Examination without Coaching? </strong></h3>
               <li>
                Yes, off course any students can clear this examination and for that matter any examination by themselves, but for that to happen they require proper guidelines and understanding of pattern and demand of the examination.
               </li>
               <li>
                In this situation role of coaching becomes catalyst in providing breakthrough to the students.
               </li>
               <h3><strong>When students must take coaching? </strong></h3>
               <li>
                There is no timeline and framework under which you should go for coaching. When you feel like you are prepared for this battle and get going roaring, you should come in the battle ground. But, I ideally after 12th is the important period based upon your comfort zone and your dedication.
               </li>
               <h3><strong>Which Mode of coaching is good; online vs. Offline? </strong></h3>
               <li>
                Again, like I have said earlier it is up to you. It is totally your call to decide, which mode of coaching are you comfortable in. If you are comfortable to take offline you can join and if you are working and want to prepare at the same time for this examination, you can take online option for your preparation.
               </li>
               <li>
                In my mind online or offline whatever option you choose, ultimately you will get proper guidance for your examination and you can develop a proper approach for this examination.
               </li>
               <h3><strong>Is it necessary to come to Delhi for taking Coaching? </strong></h3>
               <li>
                Absolutely no, gone are the days where students have to come to particular place only for preparation of certain examination. Many institutes provide their same faculty at regional branches of their coaching. 
               </li>
               <li>
                By choosing regional branches as an option for preparation of this examination students can not only save their lot of money on high accommodation and food coast in Delhi but  they can also feel the same kind of similarity in environment like home, this factor can put an extra edge in their preparation.
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