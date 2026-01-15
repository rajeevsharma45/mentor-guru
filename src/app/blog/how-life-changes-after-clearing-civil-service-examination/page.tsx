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
  title: "How life Changes after Clearing Civil Service Examination?",
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
    .filter(blog => blog.slug !== 'how-life-changes-after-clearing-civil-service-examination')
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
            <span className="text-gray-700">How life Changes after Clearing Civil Service Examination?</span>
          </nav>

          {/* Title & Meta Info */}
          <header>
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
               How life Changes after Clearing Civil Service Examination?
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
              src="/blogs/how-life-changes-after-clearing-civil-service-examination.png"
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
                <li>What Changes come for an Individual? </li>
                <li>1. From  an Aspirant to Civil servant: </li>
                <li>2. Feeling of Family:</li>
                <li>3. Love from Society:</li>
                <li>Changes from Personal Suffering:</li>
                <li>Changes that come as Responsible Civil Servant:</li>
                <li>1. Marathon  working hours:</li>
                <li>2. Work stress:</li>
                <li>Some Good Things as Being a Civil Servant:</li>
                <li>1. Luxurious living:</li>
                <li>2. Work-life balance?</li>
              </ol>
            )}
          </section>
          
          <article className="prose max-w-none text-gray-800">
            <h2 className="text-2xl font-bold mb-3">What Changes come for an Individual?</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                <h3><strong>From  an Aspirant to Civil servant:</strong></h3>
              <li>
                The feeling of accomplishment and of responsibility! Clearing this examination will mean from an aspirant to Civil Servant .You will feel pride. At the same time there will be feeling of liberation and confidence with a little anxiety about future prospects .However, everyone should take this as an exam which has been cleared to serve the people and help them out of various problems .The realisation that it’s just the start, the real job starts now will keep you on the track and prepared you for next assignment.
              </li>
              <li>
                After clearing this examination, a mixture of emotions will come at the same time. You will feel happy, blessed, lucky, and anxious at the same time. You will also feel like you are the fortunate one  , there might be more deserving candidates still trying their best to get through.
              </li>
              <h3><strong>Feeling of Family:</strong></h3>
              <li>
                Clearing this examination will bring immense pleasure for your family. They all will feel immensely proud of you. Your parents will be felicitated wherever you go. Seeing your parents proud and happy and knowing that you are the reason, is one feeling that cannot be expressed in words!
              </li>
              <h3><strong>Love from Society:</strong></h3>
              <li>
                At last, you get inner peace and satisfaction and those thinking of “Log kaya Kahenge” subsided.  Those who once criticized you will be seen saying that they always knew you would succeed. 
              </li>
              <li>
                You will be amazed by reaction from society and you even start doubting yourself, whether you are worthy of this, after all what you have done is just cleared an exam. 
              </li>
              <h3><strong></strong></h3>
              
              <h3><strong>Marathon  working hours:</strong></h3>
              <li>
                Officers have to sit sometimes like 12 hours on a stretch. It is really tiring and irritating many a times; working hours are unusually long that begin at 9:30 am and stretch to 9 or 10pm. This hour may go few hours more in situations like disasters, elections and other major events.
              </li>
              <li>
                The IAS officer also writes about the time when all the District Magistrates (DM) in his state sometimes have to  stayed awake to clear pending files like reviewing of candidates nomination papers , who have filled  nominations for gram panchayat elections.
              </li>
              <li>
                t times of emergency situations like earthquakes and floods, the officer has to worked more than 100 hours a week.
              </li>
              <h3><strong>Work stress:</strong></h3>
              <li>
                If not all most of the MPs and MLAs are 'unreasonable.' There only work is to be in the limelight of public doing anything .These kinds of characters are usually in all districts from MLAs upward.
              </li>
              <li>
                Other problems for officers is dealing with subordinates, whom officers can’t recruit, select, transfers or punish, this is nothing sort of herculean task to deal with them.
              </li>
              <li>
                Most stressful aspects of work, the officer say is dealing with several morchas and "aggressive groups demanding anything and everything."
              </li>
              <h3><strong>Some Good Things as Being a Civil Servant:</strong></h3>
              <li>

              </li>
            </ul>
          </article>


          <section className="space-y-10 mt-8">
            
            <div>
              <h2 className="text-2xl font-bold mb-3">Changes from Personal Suffering:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                <li>
                Vanishing fear of writing this examination once again and reappearing in this examination led to the rest as successful candidates. You will be satisfied too.
              </li>
              <li>
                The most important thing is that your fear of not knowing some news, events and some facts gets subsided to some extent now it doesn't matter whether you know something or not.
              </li>
              <li>
                Cracking this examination gives a tag to call yourself intelligent (which you may not be). But aspirants start following you like you are nothing sort of Mother Teresa or Kailash satyarthi who has given immense power to the most vulnerable section of society.
              </li>
              <li>
                After clearing this examination, you will get the opportunity to meet so many new people both through virtual means like social media platforms, or through direct interaction.
              </li>
              <li>
                After cracking this examination, you will have your own time at least to some extent to pursue your hobbies. 
              </li>
              <li>
                You should always remember that clearing this examination is not the end, in fact this is the beginning to serve the people in the best possible way. Whatever changes you face by the hype created by people around you; you should remember that these changes are the external changes. Keep yourself grounded and prepare yourself for the next battle.
              </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Changes that come as Responsible Civil Servant:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <li>
                If you love doing new things in your job everyday then this job is the most appropriate one for you. However it takes a huge toll on your body and mind as well. As a civil servant you will barely get time for your vacation and spending quality time with family and near and dear ones.
               </li>
               <li>
                Every civil servant has to remember that, they can get the leave only when the situation permits them, in this job there is nothing called government notified holidays for civil servants. There is nothing called weekend off. Out of 52 Sundays per year, you will barely get 5 to 10 off. 
               </li>
               <h3><strong>Marathon  working hours:</strong></h3>
               <li>
                Officers have to sit sometimes like 12 hours on a stretch. It is really tiring and irritating many a times; working hours are unusually long that begin at 9:30 am and stretch to 9 or 10pm. This hour may go few hours more in situations like disasters, elections and other major events.
               </li>
               <li>
                The IAS officer also writes about the time when all the District Magistrates (DM) in his state sometimes have to  stayed awake to clear pending files like reviewing of candidates nomination papers , who have filled  nominations for gram panchayat elections.
               </li>
               <li>
                At times of emergency situations like earthquakes and floods, the officer has to worked more than 100 hours a week.
               </li>
               <h3><strong>Work stress:</strong></h3>
               <li>
                If not all most of the MPs and MLAs are 'unreasonable.' There only work is to be in the limelight of public doing anything .These kinds of characters are usually in all districts from MLAs upward.
               </li>
               <li>
                Other problems for officers is dealing with subordinates, whom officers can’t recruit, select, transfers or punish, this is nothing sort of herculean task to deal with them.
               </li>
               <li>
                Most stressful aspects of work, the officer say is dealing with several morchas and "aggressive groups demanding anything and everything."
               </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Some Good Things as Being a Civil Servant:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <h3><strong>Luxurious living:</strong></h3>
               <li>
                The standout benefits of perks you enjoy; is a good house. However, these little perks are enjoyed by family and not by an IAS officer; who goes there only to sleep.
               </li>
               <li>
                For personal safety for IAS a body guard is made available to them only when one is either a DM, Divisional Commissioner or Chief Secretary. So that sums up around 5 to 6 years of an IAS officer's career. Bearing this time lag, any officer has to take care of themselves, no such facility even if you are equally vulnerable.
               </li>
               <h3><strong>Work-life balance?</strong></h3>
               <li>
                The most difficult aspect of being a Civil servant is paucity of time for your family. AS a civil servant your number one priority is to serve the people. So, officers have to learn to balance between public vs. private life to become a good civil servant.
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