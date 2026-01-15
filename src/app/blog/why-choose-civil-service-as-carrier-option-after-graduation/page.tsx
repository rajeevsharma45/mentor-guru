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
  title: "Why Choose Civil Service as Carrier Option After Graduation?",
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
    .filter(blog => blog.slug !== 'why-choose-civil-service-as-carrier-option-after-graduation')
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
            <span className="text-gray-700">Why Choose Civil Service as Carrier Option After Graduation?</span>
          </nav>

          {/* Title & Meta Info */}
          <header>
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
               Why Choose Civil Service as Carrier Option After Graduation?
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
              src="/blogs/why-choose-civil-service-as-carrier-option-after-graduation.png"
              alt="Blog banner"
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>

          {/* Blog Body */}
          <article className="prose max-w-none text-gray-800">
           {/* <p className="text-gray-700 mb-3"></p> */}
           <h2 className="text-2xl font-bold mb-3">Role of Civil service at Present context:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <li>
                Civil service of India is called the steel frame of India by late Iron Man, Sardar Vallabh Bhai Patel. If you look at the present context and compare with our long walk since Independence, you will realise that Civil service is indeed our steel frame of Our Country. With the passage of time this steel frame has faced lot of allegation and challenges in the form some unethical practices of individuals in this steel frame. But, no one can deny that bureaucracy has kept our Nation Intact at various turbulence phases of our country.
               </li>
               <li>
                If you want to put in words, Bureaucrats are like old wine, the older they become the greater the experience they will have. Off course, few of you may deny this concept that talent is more important than experience, but you should remember that; when we buy new car in our home, we don’t sell our old car to some Kabadiwallas, on the contrary, we sell our old car to someone who want our car to use it by doing some repairing work. Similarly, Experience can’t be replaced but with passage of time they need some overhauling to give efficient performance in the field and tackle newer challenges in this ever changing world.
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
                <li>Why Students should choose Civil Service as Career Option: </li>
                <li>Some Frequently Asked Questions:</li>
              </ol>
            )}
          </section>

          <section className="space-y-10 mt-8">
            
            <div>
              <h2 className="text-2xl font-bold mb-3">Why Students should choose Civil Service as Career Option</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                 <h3><strong>Impact on Society</strong></h3>
               <li>
                You should choose civil service as carer for yourself; this question needs to be answer by none other than you. Why, I say you should answer this question by yourself because; if you don’t feel some sort of connection and until you become serious serving your community, you will not be a great civil servant.
               </li>
               <li>
                As a civil servant you can do a lot for the people. You will have power, you will have resources and you will have man power to do same radical changes for the society. Take a moment to look back into your past and remember if you have any bitter experience with any people using muscle and power to exploit poor people, and then see yourself at present and then you can decide; why you should choose Civil service as career option for yourself to help people who face many challenges in their daily life.
               </li>
               <h3><strong>Honour for Serving and honour of serving:</strong></h3>
               <li>
                The most important thing will you will get into this job is both honour from people for serving them as well as you will feel honour about yourself for serving needy people. Every day, after day work as a civil servant, when you will hit the bed you will feel a sense of joy and happiness from deep inside you. This feeling can’t be expressed in the words, you feel liberated in this world itself. When you have such momentous feeling inside you every day, you will walk on water and float in the air.
               </li>
               <li>
                What to explain honour?, Honour is explained in best way in my mind is by Late Major Sood ,who got Martyred recently in Jammu and Kashmir during saving hostage Family from grip of terrorists. He said “When you get older, you will realise; the only thing matters, the only thing is that you had courage and honour”.
               </li>
               <h3><strong>Diversity in Job opportunity:</strong></h3>
               <li>
                If you love a job, that provides you so much diversity every single day and you want challenges then Civil services is the job for you. Civil Services provide a range of opportunity of not only serving the people but it take out best from you to deliver the best. 
               </li>
               <li>
                Civil service is not just a mere a job; it is an essence and way of live for Philanthropist mind set persons. In this job you will not feel monogamous, there is lot of challenges in this job and so is the mental tiredness and fatigues. So, you will get the taste of both.
               </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Some Frequently Asked Questions:</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
               <h3><strong>Should Students prepare for this examination with Backup Plan for Career?</strong></h3>
               <li>
                To be honest, students should not think of backup plan as such. If you decided, just give your best in each single sector and components of this examination. Just backup you extinct and you will find yourself in the merit list.
               </li>
               <li>
                The other part, I should talk about is if you are not coming from financially sound background then you should consider creating a base for yourself, because it may help your family as well. What I am trying to say is discuss with your parents and then go for this dream with your all heart and mind in it.
               </li>
               <h3><strong>Should students start preparing for this examination during Graduation year?</strong></h3>
               <li>
                Not necessary that you start putting work for this examination in graduation subject, but off course students can start understanding the demand of examination and the pattern and required skills of this examination.
               </li>
               <li>
                During graduation year, students should start developing a habit of reading newspapers and understanding of International and national events. This will develop a key habit of reading which is catalyst in this examination is ultimately. This examination don’t require to study of 5 year plan for clear this examination, 1 year of dedicated study is more than enough to clear this examination. So , enjoy your college life as well and at the same time work on your personality development, because habit and personality are not being made in one day, one week or one month.
               </li>
               <h3><strong>Should students choose Graduation Subject by keeping in mind of IAS Preparation?</strong></h3>
               <li>
                Like I have said earlier; it is not necessary to give up your college life for the sake of your future. It is not necessary that you have to choose particular subject from Humanities as your option subject for clearing this examination. It is not about what others say, it is about what you want to study. You can clear this examination with any subject mentioned in optional list.
               </li>
               <li>
                You can chose your subject if you like any stream and that liking will ultimately will be fruitful for your success in this examination rather than someone putting you in uncomfortable situation by suggesting you take subject ,which you are not familiar with.
               </li>
               <li>
                Choose subject in graduation which you really want to study and forget about suggestions of others. Just believe in yourself and back you and your abilities and you will clear this examination.
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