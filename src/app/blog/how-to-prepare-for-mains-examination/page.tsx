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
  title: "How to prepare for Mains Examination?",
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
    .filter(blog => blog.slug !== 'how-to-prepare-for-mains-examination')
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
            <span className="text-gray-700">How to prepare for Mains Examination?</span>
          </nav>

          {/* Title & Meta Info */}
          <header>
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
               How to prepare for Mains Examination?
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
              src="/blogs/how-to-prepare-for-mains-examination.png"
              alt="Blog banner"
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>

          {/* Blog Body */}
          <article className="prose max-w-none text-gray-800">
           {/* <p className="text-gray-700 mb-3"></p> */}
           <h2 className="text-2xl font-bold mb-3">Understanding the Dynamics of Mains examination</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <li>
                Mains examination is not about your knowledge unlike of Prelims, in mains not only your knowledge of subject will be tested but the way of approaching the answer and providing solution and revealing the problem will be seen. In mains examination, your copy evaluator will not judge a candidate based upon his/her educational background, his/her financial condition; It will be your art of writing and skill of linking the subject will define your marks in mains examination.
               </li>
               <li>
                With the changing pattern of the UPSC and way of asking question also chaning.Unlike earlier examination of mains in which the majority of question were asked directly from some of reputed books and if a hard work candidate has command on that book ,there were utmost probability of his/her clearing this examination. At present ,if you have seen the  mains question of last 5 years there is heavy weight of the current affair portion in paper one and two specially .However ,these questions can’t be answered solely on current base, these question require linking with static portion to write an effective answer.
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
                <li>Paper wise Approach of Tackling Mains </li>
                <li>Use of Diagram and Flow chart in answer writing</li>
                <li>Some Frequently Asked Questions</li>
                <li>Things that should be avoided in answer writing</li>
              </ol>
            )}
          </section>

          <section className="space-y-10 mt-8">
            
            <div>
              <h2 className="text-2xl font-bold mb-3">Paper wise Approach of Tackling Mains:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                 <h3><strong>Paper I</strong></h3>
               <li>
                On one hand Paper I require a candidate to know about the History and geography of India and world on the other hand it requires you to be updated with current events happenings in and around us especially for art and culture and Geography portion.
               </li>
               <li>
                The most appropriate way to approach Paper I of the GS mains Paper is to understand the topic in broader way.e.g. Why Gupta Age is considered as golden era and why Magadha was the most powerful Mahajanpada of that time.
               </li>
               <li>
                In Art and Culture portion, questions asked by UPSC now a days are more analytical which requires both the factual content and good analysis to answer the why and how. You can answer such questions well only when you understand the historical background in which such art was produced. This is why it’s important that you read NCERT XI Ancient India for it gives you that historical context.
               </li>
               <h3><strong>Paper II</strong></h3>
               <li>
                Looking at the trend in last five years of paper II of GS, you can easily understand that this paper is not about static portion anymore; majority of questions is from current affairs and even that question that looks like of static one is linked to current events of recent times.
               </li>
               <li>
                Lets understand this with and example; suppose a question is being asked about the power tussle between Lt Governor and CM of Delhi. So here you need to highlight the problem at present but at same time you have to reveal the post of Lt Governor post and CM briefly.
               </li>
               <li>
                International relation is all about current events .so, you have to prepare it from News paper and any standard magazine, whatever suits you.
               </li>
               <li>
                Again, social justice is also all about current affairs .so, keep an eye on the current events to prepare for the social justice, you need to prepare well for all the schemes and policies that government is implementing for various section of society.
               </li>
               <h3><strong>Paper III</strong></h3>
               <li>
                Preparation of Paper III can be prepared by current affairs provided your basic knowledge of each topic is clear.so, finish basic books first and make your foundation strong to erect giant building of knowledge on that foundation.
               </li>
               <li>
                For science and technology ,whatever comes in news make good notes of it,e.g. if it is news about Crispr cas9 ;so, here you not only need to know about the crispr cas9 but you have to know about :
               </li>
               <ol className="list-decimal">
                <li>
                    What is Gene Editing?
                </li>
                <li>
                    Benefits associated with gene editing
                </li>
                <li>
                    Impact of gene editing.
                </li>
                <li>
                    Other method of gene editing and these stuffs.
                </li>
               </ol>
               <li>
                For internal security and for Indian economy read any standard books to understand the basic concept of these subjects.
               </li>
               <h3><strong>Paper IV</strong></h3>
               <li>
                Paper IV is 25 percent of basic book knowledge and 75 percent of your own understanding of the situation based on the basic books you have read and clarity of syllabus you have.
               </li>
               <li>
                For first portion of this paper you have to read some moral thinkers and their contribution and when you will solve case study, you have to utilise that information for not only writing good answer of that case study but you have to also develop your own knowledge and understanding of values.
               </li>
               <li>
                The most appropriate way to develop for this paper is first understand each terminologies given in syllabus for e.g.
               </li>
               <ol className="list-decimal">
                <li>
                    What is Empathy?
                </li>
                <li>
                    What is sympathy?
                </li>
                <li>
                    Difference between Attitude and Aptitude.
                </li>
               </ol>
               <li>Knowing of these terminologies is not enough and you have to think of utiliging it in your day to day life. If you have clarity on these terminologies you are most likely to answer well</li>
               <h3><strong>Essay Paper:</strong></h3>
               <li>
                Essay paper is not about your knowledge and disseminating that information on your copy. It is about representation of your approach of skill of pinning down your information in sequence manner supported by some facts and figures.
               </li>
               <li>
                In essay Paper facts and figures play very less role as compare to your art of representation and art of writing it.
               </li>
               <li>
                You can develop this art of representation and writing good answer only by practicing it.so,make good habit of writing one essay in fortnight.
               </li>
               <h3><strong>Optional Paper:</strong></h3>
               <li>
                Optional paper approach is different from mains answer writing. In humanity subject optional questions comes directly and which requires a bit exhaustive studies.
               </li>
               <li>
                For those who are choosing optional subjects other than humanity subjects go for last 5 years question paper to understand the dynamics of question asking pattern and prepare accordingly.
               </li>
               <h3><strong>Compulsory Paper:</strong></h3>
               <li>
                As compulsory paper is qualifying in nature so, before examination just practice some of things like grammar and basic things like ways of answering and approach of writing.
               </li>
               <li>
                These little things will shell you through the mains examination.
               </li>
               <h3><strong>Use of Diagram and Flow chart in answer writing:</strong></h3>
               <li>
                Use diagram and flow chart especially in subjects like Geography. These little things provide you edge over other candidates as your answer will look more catch and soothing to examiner.
               </li>
               <li>
                These flow chart can be savior of you as well .Many a times you will feel in catch 22 situation-on ;whether to attempt all answer in limited time in examination hall ,in these moment you can move ahead by writing just diagram of flow chart so that an examiner may have an insight that you know the question.
               </li>

              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Some Frequently Asked Questions:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <h3><strong>1. Should I write answer in Bullet Point or in Paragraph?</strong></h3>
               <li>
                You can write in paragraph as well, but bullet point will be more appropriate due to:
               </li>
              <li className="flex items-start gap-2">
                <ArrowRight size={14} className="text-primary mt-1" />
                Bullet point reveals the work in more natural way to examiner and he may not have to find the eye catching phrases in your copy
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight size={14} className="text-primary mt-1" />
                Bullet point is to the point in nature as compare to paragraph approach of writing answer.
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight size={14} className="text-primary mt-1" />
                Bullet points are easy to cover and you can cover the whole paper within the time limit.
              </li>
              <h3><strong>2. Should I use black pen or blue pen?</strong></h3>
              <li>
                These questions are very silly questions that I have to answer, tell you one thing your success or failure will not be determined by the pen you will use.
              </li>
              <li>
                You can use any pen either black or blue but remember that you should not use gel pen and you should use only ball pen.
              </li>
              <h3><strong>3. Should I attempt all 20 questions or write 17 to 18 good answers?</strong></h3>
              <li>
                Your any chance of success in mains examination dependence upon the number of question you will attempt, remember that .So, your fist priority should be to attempt all questions ,even if you know nothing about particular question.
              </li>
              <li>
                As it is said that “it is better to have something than nothing”.So,stick with this mantra and write all answers ,you will get something for that answer.But,you should remember that quality of answer should not be lowered in order to complete all answers.
              </li>
              <h3><strong>4. Should I use Quotes in answer writing?</strong></h3>
              <li>
                Quotes give your answer a dynamic view; eye catching phrases are always a good prospect for getting good marks in mains examination.
              </li>
              <li>
                Too much unnecessary quotes can backfire as well so ,use quotes but use it smartly.
              </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Things that should be avoided in answer writing</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                <h3><strong>1. Reflecting biased answer for party:</strong></h3>
                <li>
                  One of most important thing you should avoid is excessive criticism of government policies and also criticizing person and its work.
                </li>
                <li>
                  You should also refrain from writing answer in biased manner, as you are preparing for an administrative post that has to work behind the curtain.SO, your personal vested interest should not hamper the working for people and making chaos in administrative functioning.
                </li>
                <h3><strong>2. Altering the quotes:</strong></h3>
                <li>
                  While quoting in mains answer writing don’t quote in altered manner. It means if know exactly the exact quotation then only you should use it, otherwise these wrong quotes reflect a bad impression about a candidate.e.g. “The Earth has enough for everyone's need, but not enough for everyone's greed.”So,if you alter this quote and write like the Earth can serve everyone need but not everyone greed. These small mistakes are very drastic in marks marking schemes of things.
                </li>
              </ul>
              <strong>At last I would say, no matter how many books you have read and what is your educational background, until and unless your vast reading is not being reflected in your answer writing, examiner is not going to give you marks; remember that .So keep on practicing and write attest two answers daily and find out the possible structure of that answer and improve yourself. In coming times you will see improvement in your answers writing and slowly but surely you will sell through mains examination. Good Luck….</strong>
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