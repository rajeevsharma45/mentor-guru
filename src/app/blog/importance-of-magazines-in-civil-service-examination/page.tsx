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
  title: "Importance of magazines in the preparation of Civil Service Examination",
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
    .filter(blog => blog.slug !== 'importance-of-magazines-in-civil-service-examination')
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
            <span className="text-gray-700">Importance of magazines in the preparation of Civil Service Examination</span>
          </nav>

          {/* Title & Meta Info */}
          <header>
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
               Importance of magazines in the preparation of Civil Service Examination
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
              src="/blogs/importance-of-magazines-in-civil-service-examination.png"
              alt="Blog banner"
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>

          {/* Blog Body */}
          <article className="prose max-w-none text-gray-800">
           <p className="text-gray-700 mb-3">
            There is limited time available during the preparation of this examination; there is hardly time to read subject dedicated magazines. But, there is option of selective reading from these magazines. Aspirants should remember that different magazines serve different purposes for different people. E.g. Aspirants should not read Kurukshetra if one has not Geography optional, but every aspirant should read selective articles from these magazines.
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
                <li>Some of the important Magazines to Read: </li>
                <li>Which Magazines should be Avoided? </li>
                <li>Benefits of Magazines:</li>
              </ol>
            )}
          </section>

          <section className="space-y-10 mt-8">
            
            <div>
              <h2 className="text-2xl font-bold mb-3">Some of the important Magazines to Read:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <li>
               <strong>1. Yojana:</strong> Yojana is one magazine you can’t miss. This magazine incorporates articles from serving bureaucrats and diplomats and it covers most of the “official” policies and issues ,which has immense value in the preparation of civil services examination. Aspirants should read these articles on selective basis, Irrespective of what their optional is. But there is no need to read it from cover to cover. Just read important articles. Also you should skip the case studies as they are too detailed and not relevant for UPSC CSE.
               </li>
               <li>
                <strong>2. Kurukshetra:</strong> If your optional is Geography then you need to read Kurukshetra. 	Kurukshetra magazine incorporates latest data and articles about Indian agriculture, food security, disasters etc.So, basically this magazine covers rural issues and how and what policies are functioning to tackle these rural problems. Kurukshetra is relevant for paper 2 of Geography optional and while writing some of the mains answer of GS from Geography. But skip the case studies. Also be selective.
               </li>
               <li>
                <strong>3. Economic & Political Weekly:</strong> Only relevant if you have Economics as optional. This magazine incorporates deep and well researched article about the new emerging economic trends in and around India. Need to skip the political part though. Also be very selective.
               </li>
               <li>
                <strong>4. The Economist:</strong> Read if you have free time. This magazine is very important to develop a global point of view and for understanding global scenario. But it is difficult to get and the subscription is very costly.
               </li>
               <li>
                <strong>5. Science Reporter:</strong> You can read it selectively to cover Science & Tech. All aspirants should go through this magazine, whether those are from science background or not.
               </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Which Magazines should be Avoided?</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                <li>
                    Avoid magazines like ABC and XYZ, these type of magazines which are so old they do not get updated according to their demand of examination and somehow they maintain their resistivity along. These types of magazines are not much important and they add no value to the preparation. Given below, are some of the tips about ways of covering magazines.
                </li>
               <h3><strong>Factual part:</strong></h3>
               <li>
                While reading magazines aspirants should keep in mind; Schemes / Conventions / Treaties / Agreement / Institution. Approach like this will not only help in tackling prelims questions but writing good answers in mains as well. Aspirants need to revise this first reading into effective way and use it in answers or recall the nuances in Prelims paper. Aspirants should be agile always and should take stock of the ministry under which a particular scheme is implemented or what are the various targets/parts of a particular scheme.
               </li>
               <h3><strong>Conceptual part :</strong></h3>
               <li>
                In conceptual part aspirants should focus on the issues which are in news? Rerasons for coming in news? What challenges it possess? Possible solution? Any lacunae?  And Why  and how  government should respond ?
               </li>
               <li>
                Aspirants can make notes if they want. Aspirants should take down these points and  should make crispy notes , they can use highlighter to mark these things, if they are making online notes. 
               </li>
               <li>
                P.S. – Aspirants should note that Government doesn't need any scholar and specialist at least in large section of bureaucracy. They want informed bureaucrats, who have practical knowledge, who can assess development of various policies and  damage and come up with practical solutions depending on cost-benefit analysis.
               </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Benefits of Magazines:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <li>
                First and foremost thing government run websites are the authentic information and reliable date for current affairs for IAS exams.
               </li>
               <li>
                Government run schemes are brought to you by subject specialists from diverse fields of education. These people come from prominent institutions and universities and possess Masters and PhDs in Social work, International Relations, Public Policy. Some have past work experience in government departments, NGOs, social sector etc. Some of the major benefits of Magazines are:
               </li>
               <h3><strong>Systematic Categorization:</strong></h3>
               <li>
                Categorization of issues in systematic way and in syllabus wise. A step like this makes it easier for students to understand the nature of news in quite easy way and it connect well with aspirants according to UPSC syllabus.
               </li>
               <h3><strong>Develop a Balanced Approach:</strong></h3>
               <li>
                Good magazine helps its readers (aspirants) to develop an impartial orientation towards facts and events with an immaculate approach. These help Students to develop a well balanced approach.
               </li>
               <h3><strong>Short Span of Time:</strong></h3>
               <li>
                Important words mentioned and mind map approach gives an extra edge followed to design topics allows readers to revise issues in short span of time, in short Magazines reduce your work and provides kind of spoon feeding to their aspirants.
               </li>
               <h3><strong>Well Researched:</strong></h3>
               <li>
                Magazine provides diverse perspectives on a topic; these magazines are customised for Civil Service aspirants. All issues are In-depth, thoroughly researched and analysed.
               </li>
               <h3><strong>Exhaustive Coverage:</strong></h3>
               <li>
                Exhaustive coverage of Authentic sources from Newspapers like The Hindu, The Indian Express, Live Mint.
               </li>
               <li>
                Current Affairs is the most important sections for the preparation of competitive Exams. The reason being it can be prepared with ease and it is less time consuming. Just a little attention on this section can be the deciding factor in your selection. However, Current Affairs should demand only a little bit of your attention and no more. The Current Affairs preparation should not hamper your preparation of other sections.
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