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
  title: "Common Mistakes that should be avoided during Civil Services Preparation",
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
    .filter(blog => blog.slug !== 'common-mistakes-during-upsc-preparation')
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
            <span className="text-gray-700">Common Mistakes that should be avoided during Civil Services Preparation</span>
          </nav>

          {/* Title & Meta Info */}
          <header>
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
               Common Mistakes that should be avoided during Civil Services Preparation
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
              src="/blogs/common-mistakes-during-upsc-preparation.png"
              alt="Blog banner"
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>

          {/* Blog Body */}
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
                <li>Some common mistakes of Students: </li>
                <li>1. Lack of Knowledge about Demand of Exam: </li>
                <li>2. Lack of strategy:</li>
                <li>3. Wasting time on Unnecessary things:</li>
                <li>Some Frequently Asked Questions:</li>
                <li>1. Aspirants need to study a lot for this exam:</li>
                <li>2. Will joining a test series takes care of the Answer Writing?</li>
                <li>3. Should students go for Perfect Strategy?</li>
              </ol>
            )}
          </section>
          
          <article className="prose max-w-none text-gray-800">
            <h2 className="text-2xl font-bold mb-3">Some common mistakes of Students:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                <h3><strong>Lack of Knowledge about Demand of Exam:</strong></h3>
              <li>
                Involving themselves that is nothing but only Waste of time e.g. on online forums, debating and discussing  on irrelevant issues which have no bearing on your UPSC preparation, and trying to impress random people with your ‘gyaan’.  This is nothing but, waste of time for all aspirants.
              </li>
              <li>
                Reading newspaper like reading story or textbook and equating that there would be direct questions asked from everywhere. On an average daily list, only 20 to 30% of the newspaper from  (The Hindu/ Indian Express) is relevant ,adding to this are  couple of editorials, some national/international news, and something from Economy page. The rest should be avoided by aspirants, as you will end reading only newspaper throughout the day.
              </li>
              <li>
                Lack of understanding of syllabus and not reading the syllabus properly and trying to cover entire books page by page and cover to cover. These small mistakes lead to improving one subject and some topics, and negating or sometimes complete lack of awareness of others.
              </li>
            </ul>
            <div className="rounded-lg overflow-hidden">
                        <Image
                          src="/blog-feature.jpg"
                          alt="Blog banner"
                          width={400}
                          height={400}
                          className="w-full object-cover"
                        />
                      </div>
                      <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                <h3><strong>Lack of strategy:</strong></h3>
              <li>
                Following strategy of successful aspirants from every perspective e.g. how many hours they sleep? What they eat? What movies they watch? Which software toppers use for taking notes, etc. One way and the only way to get into the final merit list is to be ‘unique’. Copy successful people, and you will be out of the race for sure. Just take good stuffs and hints from toppers strategies, and prepare yours by analysing things which will suit you.
              </li>
              <li>
                Spending too much time to insignificant technical stuffs e.g. Should I use One Note or Ever note for taking notes? Should I take abc or xyz test series? Should I join coaching that my friend is attending? And bla ,bla,bla.
              </li>
              <li>
                Spending too much time on internet and trying to become a scholar on some topics/ subjects, without focusing on the whole syllabus.
              </li>
              <li>
                Involving them in stuffs that are not fruitful at all. Thinking about which schemes and policies to implement when they become IAS? , what kind of perks officers get? What kinds of spouse to get marry in the future? Dreaming is good but that should not come for the sake of process, which will ultimately get you to the dream.
              </li>
              <h3><strong>Wasting time on Unnecessary things:</strong></h3>
              <li>
                Developing a habit of buying unnecessary number of books, which are coming in the market everyday and filling up the cupboard thinking you are studying and trying to impressing people who visit your room or house. Later, getting trapped into how to cover the syllabus and what to read and what not to read? By the number of books you bought and not really doing anything with them.
              </li>
              <li>
                Not knowing the crux and demand of the examination, Reading too much stuff, cramming your head with irrelevant information/facts/data, and not practicing enough answer writing.
              </li>

            </ul>
          </article>


          <section className="space-y-10 mt-8">
            
            <div>
              <h2 className="text-2xl font-bold mb-3">Some Frequently Asked Questions:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                <h3><strong>Aspirants need to study a lot for this exam:</strong></h3>
                <li>
                    WRONG! ABSOLUTELY WRONG! Aspirants should keep them away from such things, this nothing but waste of time. Aspirants need common understanding of a wide variety of issues. Not a deep understanding of any issue (here I am talking of GS, not Optional). I have seen candidates study much less and crack the exam in one or two attempts. Broader understanding is required than deeper understanding. Let me demonstrate. Take the XAXA report on tribal’s for example. Person ABC reads the entire report (takes 5-6 days) and feels immensely satisfied (Between, people ABC is me). Person XYZ notes down important points of XAXA report on the website and reads only that and jots it down in notebook for revision.
                </li>
                 <h3><strong>Will joining a test series takes care of the Answer Writing?</strong></h3>
                <li>
                    This is nothing but illusion of aspirants. Why? Aspirants should take test series as way to improve the quantity and quality of your answers. If aspirants giving mock test series in Delhi, it can take care of the quantity factor, but not the quality factor. Because coaching institutes enroll too many students and hence the quality of checking suffers. Personal guidance is obviously impossible. They do not have enough time to provide quality feedback meaningful comments that will actually help in improving your answers.
                </li>
                <li>
                    You will have to do self assessment of your answers. What aspirants can do is reading your own answers after a few days interval of the time of the test. Get it checked by your friends. Find someone who has gotten good marks in UPSC and mail them a few answers. Follow answers posted on some of websites that you feel are better than yours. Aspirants should note down the flaws and feedback that is being provided at the back of each answer sheet. Aspirants should read their previous test for at least half an hour before the next test. Make sure you don’t do the same mistake. Random imagination also helps; aspirants can take 2-3 random questions and imagine framing our answer and how you will write the answer so as not to repeat your mistakes.
                </li>
                <li>
                    Work on these things immediately before each and every test. Approaching any test series in “sab chalega” attitude, non analytical manner is a waste of time. In a nutshell, the mantra is to do practising and practising and keep on improving day by day. The flaws in your answer writing are due to lack of practising and like any bad habit will take time to be weeded out.
                </li>
                <h3><strong>Should students go for Perfect Strategy?</strong></h3>
                <li>
                    There is nothing called perfection in this world. You have to scratch the surface from where you are? Aspirants love to gather all the tips, wisdom available with successful candidates, coaching classes and other UPSC Baba’s. Going through this attitude gives aspirants satisfaction deep inside and they feels satisfying to gather as many tips as we can. 
                </li>
                <li>
                    No two people are alike. One man’s meat is another man’s poison. The same goes for women. # Gender Equality. The point is the person giving you tips has a different approach, a different intelligence level and a different perspective of things. Do not blindly follow all tips. Use the filter of reason or logic and follow only those which is working for you, take it as trial and do mistakes, you can only learn from mistakes. Every aspirant is unique and knowing yourself better than anyone else is going to help you in coming in merit list. So feel free to accept, reject or modify any tips including mine. I have wasted at least two years due to blindly following wrong (for me) advice from well-meaning people. Do not repeat this mistake. 
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