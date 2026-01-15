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
  title: "Role of RSTV in Preparation of civil Service Examination",
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
    .filter(blog => blog.slug !== 'role-of-rest-in-preparation-of-civil-service-examination')
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
            <span className="text-gray-700">Role of RSTV in Preparation of civil Service Examination</span>
          </nav>

          {/* Title & Meta Info */}
          <header>
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
               Role of RSTV in Preparation of civil Service Examination
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
              src="/blogs/role-of-rest-in-preparation-of-civil-service-examination.png"
              alt="Blog banner"
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>

          {/* Blog Body */}
          <article className="prose max-w-none text-gray-800">
           {/* <p className="text-gray-700 mb-3"></p> */}
           <h2 className="text-2xl font-bold mb-3">Importance of RSTV at Present context</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <li>
                In this present world of technology, where problem of plenty is in the core of humanity, it is very difficult to choose the best product for us. Looking at the education sector, students are confused more than ever, but here the problem is not the scarcity of resources but on the contrary there is problem of plenty. 
               </li>
               <li>
                In such situation of problem of plenty in education sector and especially for preparation of Civil services examination role of RSTV is irrepressible at this moment. For the preparation of civil services examination students need information that should not be biased and should not be favouring one at the sake of another. RSTV is like “Rambaan” for aspirants preparing for civil services examination.
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
                <li>Benefits of RSTV: </li>
                <li>Some Frequently Asked Questions:</li>
              </ol>
            )}
          </section>

          <section className="space-y-10 mt-8">
            
            <div>
              <h2 className="text-2xl font-bold mb-3">Benefits of RSTV:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                 <h3><strong>Detail analysis with pin-pointing Information:</strong></h3>
               <li>
                RSTV provides detail analysis from range of experts who have knowledge of particular subject. Information provided by experts who come on <strong>“Big Picture”</strong> is pin-pointing and self explanatory in itself for any aspirants. Some of the experts like Commodore Udday Bhashkar for Defence, Mira Shankar of Foreign policy expert provide deep in rotted information for civil servant experts.
               </li>
               <li>
                Rajya Sabha TV segment provide aspirants in-depth coverage of the important national and international affairs that shape India. Rajya Sabha tv covers debates and discussions that offer considerable study material to UPSC civil services aspirants. segment is your go-to resource for:
               </li>
               <ol>1. Subject expert insights on parliamentary affairs.</ol>
               <ol>
                2. Social and cultural issues that grab headlines in the country
               </ol>
               <ol>
                3. Policies of the government and their effectiveness.
               </ol>
               <ol>
                4. Working of multilateral Forum and bilateral relations.
               </ol>
               <ol>
                5. International affairs that have repercussions in India
               </ol>
               <ol>
                6. State of world and Indian economy.
               </ol>
               <h3><strong>Most trusted and authentic News?</strong></h3>
               <li>
                RSTV is most authentic data because it is channel of government. So, aspirants preparing for civil service examination can trust the credential of this channel more than any private channel. Many private channel now a day’s show biased news , so these kind of news shape the same thinking among aspirants, this problem is all the more in those aspirants who have just started their preparation of civil service examination.
               </li>
               <li>
                Legal luminaries and subject expert who come on this platform has very deep knowledge and data they provide is from government sources itself so no one can doubt the authenticity of data .
               </li>
               <h3><strong>Free of Coast Material:</strong></h3>
               <li>
                RSTV is free of coast and almost all segments are available free of coast on RSTV’s YouTube channel. So, aspirants from all around India can have access to this channel and they can take the benefits of this free information.
               </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Some Frequently Asked Questions:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <h3><strong>Should Students skip Newspaper Reading for RSTV?</strong></h3>
               <li>
                Absolutely no, aspirants should never skip newspaper reading. Reading habit will eventually help you in writing good answer in the mains examination. Reading is like feeding to your brain and listening is like saving. So, you need both feeding to your brain that is reading and saving in your brain that is listening to RSTV.
               </li>
               <li>
                Aspirants should also remember that Newspaper and RSTV both cover topics of current scenario. So, you should see both as a source of current topic preparation. Aspirants should read newspaper in the morning, and if same topic is being covered by RSTV then they can watch at 2x speed to see of any further information is provided in the discussion.
               </li>
               <h3><strong>Is it necessary to watch all shows of RSTV?</strong></h3>
               <li>
                Not, necessarily. You don’t have to watch all segment of RSTV. To be more precisely, you should watch only those segments that are helpful for your examination. Although, you will find everything important on RSTV but eventually you have to decide how to utilise your time and confine your needs and requirement of this examination based upon time factor.
               </li>
               <li>
                Here, are some of the segments that civil service aspirants must watch:
               </li>
               <ol>
                1. The Big Picture (National and international issues in English).
               </ol>
               <ol>
                2. World Paranoma on RSTV: (deals with international relations).
               </ol>
               <ol>
                3. Insights on LSTV : (debate and discussion on national and international events).
               </ol>
               <ol>
                4. Security scan (India’s Defence scenario).
               </ol>
               <ol>
                5. Desh Deshantar( National and international issues in Hindi).
               </ol>
               <ol>
                6. Science Monitor( Achievements and updating news of science in and around world).
               </ol>
               <h3><strong>IS it necessary to make notes or students should watch only RSTV Discussion?</strong></h3>
               <li>
                Like, I have said earlier, RSTV provides in depth knowledge in various subjects. So, looking at the civil services preparation point of view you should continuously make notes while watching RSTV’s any segment. Make sure you make notes in your language based upon your thinking ability.
               </li>
               <li>
                So, while watching RSTV make sure you do the things that have been suggested below. If you follow these suggestions in letter and spirit, you will see yourself growing every single day, if not in big leap forward but in bits and pieces, which is the need of an hour for preparation of your examination.
               </li>
               <h3><strong>Points to be noted before watching RSTV:</strong></h3>
               <ol>
                1. You should have notebook to jot down all the important points.
               </ol>
               <ol>
                2. Think on that issue for sometime so that you can add yourself made points.
               </ol>
               <ol>
                3. Trace last year paper's to find where there is questions on that particular issue.
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