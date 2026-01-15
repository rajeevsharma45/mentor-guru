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
  title: "How to use Internet for Preparation of IAS?",
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
    .filter(blog => blog.slug !== 'how-to-use-internet-for-preparation-of-ias')
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
            <span className="text-gray-700">How to use Internet for Preparation of IAS?</span>
          </nav>

          {/* Title & Meta Info */}
          <header>
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
               How to use Internet for Preparation of IAS?
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
              src="/blogs/how-to-use-internet-for-preparation-of-ias.png"
              alt="Blog banner"
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>

          {/* Blog Body */}
          <article className="prose max-w-none text-gray-800">
           <h2 className="text-2xl font-bold mb-3">Why use Internet for Preparation of IAS?</h2>
            <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <li>
                With the revolution of technology and existing penetration of technology right from  online booking of food to the use of technology to launch missiles technology has not left any stone unturned. This penetration of technology is quite evident in education sector as well. Time has changed and so is the demand of education. 
               </li>
               <li>
                Looking at the prospects of education through use of information and communication technology, this is not quite far away. Use of internet for preparation Civil service examination is new normal among students. Google baba has enormous information that can be utilised for increasing the information of a student. 
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
                <li>Benefits of use of Internet: </li>
                <li>How to utilise maximum benefits of Internet? </li>
                <li>Negative Aspects Associate with Use of Internet:</li>
                <li>Some Frequently Asked Questions:</li>
              </ol>
            )}
          </section>

          <section className="space-y-10 mt-8">
            
            <div>
              <h2 className="text-2xl font-bold mb-3">Benefits of use of Internet:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <h3><strong>Provide level playing field for all students:</strong></h3>
               <li>
                Internet has made sure that every student is on the same level of preparation. Gone are the days where students from all parts of India have to come for one place called Mecca and Medina for preparation of UPSC. By using internet every student can crack any examination provided that he/she know how to cover the topics and what to read and what not to read.
               </li>
               <h3><strong>Free Resources available:</strong></h3>
               <li>
                Internet provides more than enough free material for your preparation. What is needed for you is to read and consolidate your material. There are innumerable numbers of government websites that have benefits at par with text books but limiting resources holds the key in utilising benefits of internet. Some of the helpful websites are:
               </li>
               <ol>I. <a href="https://ncert.nic.in" className="text-red-800">ncert.nic.in</a> – For Downloading NCERT Books.</ol>
               <ol>II. <a href="https://nios.ac.in" className="text-red-800">nios.ac.in</a> – For Downloading NIOS Online Materials.</ol>
               <ol>III. <a href="https://egyankosh.ac.in" className="text-red-800">egyankosh.ac.in</a> – For Downloading IGNOU Books.</ol>
               <ol>IV. <a href="https://yojana.gov.in" className="text-red-800">yojana.gov.in</a> – For Downloading Yojana and Kurukshetra Magazines.</ol>
               <ol>V. <a href="https://pib.nic.in" className="text-red-800">pib.nic.in</a> – For government decisions and updates.</ol>
               <ol>VI. <a href="https://prsindia.org" className="text-red-800">prsindia.org</a> – PRS Website for tracking bills in Parliament.</ol>
               <ol>VII. <a href="https://idsa.in" className="text-red-800">idsa.in</a> – For Defense and Foreign relations.</ol>
               <ol>VIII. <a href="https://gatewayhouse.in" className="text-red-800">gatewayhouse.in</a> – This website will help in tracking Indian Council for Global relations.</ol>
               <ol>IX. <a href="https://envfor.nic.in" className="text-red-800">envfor.nic.in</a> – Ministry of Environment and Forests.</ol>
               <ol>X. <a href="https://mea.gov.in" className="text-red-800">mea.gov.in</a> – Ministry of External Affairs.</ol>
               <ol>XI. <a href="https://indiabudget.nic.in" className="text-red-800">indiabudget.nic.in</a> – To Download Budget and Economic Survey.</ol>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">How to utilise maximum benefits of Internet?</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <h3><strong>Setting specific timing for resources:</strong></h3>
               <li>
                Candidates need to focus and should concentrate while using internet. Students should not get distracted towards social media while surfing for study material. Candidates looking for the study material online should trust some credible resources for their preparation of competitive exams and    should follow certain points that would land them to the right website. While browsing for the material, proper keywords in the search engine hold the key in extracting relevant stuff. Candidates should know how to use the internet effectively in their preparation else they will end up wasting time.
               </li>
               <li>
                Candidates should also set certain time limit while studding any material on internet, by setting some time students can track their studies without wasting too much time and thus can avoid distraction.
               </li>
               <h3><strong>Keeping Dependency on Internet based upon your priorities:</strong></h3>
               <li>
                Using internet for ones preparation should be considered based upon their own availability of timing and depending upon resources availability in offline mode. For e.g. if any candidate is already in job or any candidates living in far flung remote areas ,in this situation candidates are left with no option but to use internet and gadgets for their own prepration.Infact in this situation candidates living in these areas will be benefitted from using internet.
               </li>
               <h3><strong>Clarity of thoughts:</strong></h3>
               <li>
                Students should have clarity of thoughts on what will be they surfing and for what duration of time. They should be aware of what they actually want to search. For example, if a candidate wants to search for a particle topic say nuclear energy, he should be a little more specific about what exactly he wants to know about nuclear energy. This will help the candidate in selection of the right article to understand the crux of that particular topic.
               </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Negative Aspects Associate with Use of Internet:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <h3><strong>Wasting too much time on internet:</strong></h3>
               <li>
                Many a times when candidates start surfing on internet for particular topic they somehow drifted towards subject which is way beyond their need and they end up not only wasting their time but also spoiling the concept of that particular topic.
               </li>
               <li>
                Like I have said earlier, pin pointing of the need of internet for certain topic will help you in developing that particular subject, on the other hand if you developed a habit of replacing the text books by bulky material of internet then you may end up doing more harm than good for yourself in this preparation of examination.
               </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Some Frequently Asked Questions:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <h3><strong>1. Is it necessary to use Internet for clearing this examination?</strong></h3>
               <li>
                Again like I have said earlier, it’s totally your really call .But you can manage without internet provided that you are getting all material in loose sheets format.
               </li>
               <li>
                Internet provides you easy way of resources without paying extra money, so Internet is beneficial for those who are living in far flung areas and those who are doing job.
               </li>
               <h3><strong>2. What to read using Internet?</strong></h3>
               <li>
                You can either cover static or dynamic portion. But most of students tend to cover current topics from internet and this is considered most feasible as well. As far as static portion is considered, you can cover these topics from internet as well but while using these topics students are advised to use software’s like evermore to mark important points and headlines.
               </li>
               <li>
                Students can also give mock test conducted by various institutes online. If you are living at place where you can’t give mock test in offline mode than switching to online mode is more feasible for students. You can also compare yourself in the list of students who has attempted mock tests.
               </li>
               <li>
                At last I will say use internet based upon your requirements and availability of material available in your area. So go for strategy which suits you; no idea is bad or good unless it is implemented on ground to explore the working pattern of that particular idea.
               </li>
               <li>
                Don’t forget that humans are living in 21st century, the era of virtual dominance. Increasing involvement of the World Wide Web in our day to day life is also evident in our preferences for seeking exam guidance. Now, the UPSC aspirants surf the net for their queries rather going through tedious text material. Students are looking for Internet to get answers of all questions related to UPSC Preparation.
               </li>
               <li>
                However, this doesn’t mean that UPSC aspirants have shed away reliance on text materials. They are rather using a clever mix of both the available facilities for UPSC preparation. It’s a known fact that smart work triumphs hard work.
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