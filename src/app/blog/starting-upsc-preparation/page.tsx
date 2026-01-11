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
  title: "How to Start UPSC Preparation",
  author: "Saumya Sarin",
  publishedAt: new Date("2025-01-05"),
  views: 9036
};

/* ----------------------------
 * Main Blog Component
 * ---------------------------- */
const BlogPage: FC = () => {
  const [open, setOpen] = useState(true);

  // REPLACE: Get latest articles from metadata
  const latestArticles: LatestArticle[] = getLatestBlogs(3)
    .filter(blog => blog.slug !== 'how-to-start-upsc-preparation')
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
            <span className="text-gray-700">How to Start UPSC Preparation</span>
          </nav>

          {/* Title & Meta Info */}
          <header>
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
               Starting UPSC Preparation
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-3">
              <span>By Saumya Sarin</span>
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
              src="/blogs/starting-upsc-preparation.jpg"
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
                <li>Mental Aspect:</li>
                <li>Right strategy /Guidance: </li>
                <li>Scheduling/Prioritising things:</li>
                <li>Busting Myths about UPSC:</li>
              </ol>
            )}
          </section>

          <article className="prose max-w-none text-gray-800">
            <h2 className="text-2xl font-bold mb-3">Mental Aspect</h2>
            <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
              <li>
                Before starting of the preparation mental aspect of the mind comes into the existence as you may be taking big decision in terms of some of you may be stating the preparation just after the completion of graduation and leaving behind your ruminative package and some of you may 
              </li>
              <li>
                The most important thing before going for this decision is to analyze every aspect of the this preparation as it is not sure shot that candidate may get success in one go and in many times this process becomes lethargic due to your continuous repeation of your fault and you may get success in 3 to 4 attempts.
              </li>
              <li>
                Discussing with seniors and those who have prepared for this examination will also provide you an overall insight of the examination and it will help you in taking good decision at right time.
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
          </article>


          <section className="space-y-10 mt-8">
            
            <div>
              <h2 className="text-2xl font-bold mb-3">Right strategy /Guidance </h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                <li>
                  Right Strategy and guidance play a very important factor in the selection of the examination. Strategy is like make or break factor that will determine your chances of selection in this examination.
                </li>
                <h3><strong>Visualising things to remember studied matter:</strong></h3>
                <li>
                  As beginner of UPSC, the only priority should be to finish the NCERT first.NCERT is not only the book to develop you basic knowledge and understanding of issues related to different subjects but you should also remember that NCERT plays a key role in developing the very basic fundamental concept of idea along with it now a day’s UPSC has started to ask questions from these NCERT Books.
                </li>
                <li>
                  NCERT provides Aspirants basic concepts and theories from NCERT textbooks.
                  </li>
                  <li>
                    NCERT books provide the information very coherently. Moreover, they are reliable too as the source is the government itself.
                    </li>       
                    <li>
                      These NCERT books are undoubtedly the best books to begin your IAS preparation with. Apart from the NCERTs, you should also follow a few other advanced textbooks
                      </li> 
                      <h3><strong>Reading Daily Newspaper:</strong></h3>   
                      <li>
                        News paper is like Bible/Koran/Geeta for not only beginners but to every aspirant to develop the very basic understanding of the day to day happening around you and continuously improve these knowledge to use these things by interlinking  of these topics in answer writhing.
                        </li>
                  <li>
                    With the increasing weightage of current affairs question in prelims every year. Regular newspaper reading is a must for preparing for Prelims. It will help you stay updated with the current affairs. Inculcate the habit of jotting down all the important pieces of information you gather through the newspaper or the news.
                    </li> 
                    <h3><strong>Sticking with discipline factor:</strong></h3>  
                    <li>
                      Discipline is not something that will fetch you success by following it wholeheartedly but one thing is very sure that by sticking with discipline it makes things done. Discipline is like homeopathic medicine it will take time to produce result, while following you goanna face pain, irritation but, as the time will progress you will see different changes inside you. These changes will be your behavior, your personality your way of talking, your way of understanding of the topics that you have read.
                      </li>
                      <h3><strong>Gain experience not shared in books:</strong></h3>  
                      <li>
                        Experience is a very expensive asset, yet it's crucial to for your success. Explore the entire question that you confront from day to day basis, once you will develop this habit of asking the question, you will not be confined to book to write many answers of mains examination that is otherwise is Achilles hill for many students.
                        </li>
                    <li>
                      Some of the questions that you should ask yourself daily:
                    </li>
                    <ol>1. Are you maintaining focus without finding that your mind wanders?</ol>
                    <ol>2. Are you allowing yourself moments of silence and solitude on a regular basis?</ol>
                    <ol>3. Do you believe in your ability that will facilitate you taking the steps you need to reach your full potential?</ol>
                    <ol>4. Do you control the influence of your inner critic by actively evaluating what it says to you?</ol>
                    <ol>5. Do you have strong willpower?</ol>
                    <ol>6. Do you find it easy to build new habits or break old habits?</ol>
              </ul>
            </div>

            
            <div>
              <h2 className="text-2xl font-bold mb-3">Scheduling/Prioritising things</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                <h3><strong>Daily,weely,Monthly schedule:</strong></h3>
                <li>
                  Make proper schedule by prioritizing the things, for instance you will finish this subject or chapter by this much time or week. Our Brain do not act in proper way until and unless it is being commanded in clear way. This clarity will come when you male proper schedule by writing it down on paper.
                </li>
                <li>
                  The mool mantra is Revise, Revise, and Revise! Studying is important, but so is the revision. Preparing for the UPSC will require you to remember a lot of information which is nothing less of a herculean task. So, how will you ensure that you retain all that you’ve studied? The answer is simple revision! This is even more important for static subjects which have a definite syllabus
                </li>
                <li>
                  By adopting these techniques it should be helpful for you maintain a well-balanced schedule for both the Prelims and Mains. But as Swami Vivekananda said, make this exam your goal and let the passion for becoming a Civil Service Officer run deep into your veins! All the best!
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Busting Myths about UPSC</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                <h3><strong>1. What is the right time to start preparing for UPSC Civil Services Examination? </strong></h3>
                <li>
                  There is no hard and fast rule of timing to prepare for this examination .But ,if you have right guidance and you know the demand of this examination you can crack this examination in one go as well. However, starting the preparation as early as possible is being suggested to understand the whole dynamics of this examination and preparing oneself for every section of the examination can be taken care of.
                </li>
                <li>
                  Willingness to outwork and outlearn everyone should be the most important ingredient of an aspirant mindset. This mindset attitude will help you in going extra mile, when things are not going well and you feel drained from inside.
                </li>
                <h3><strong>2. What should be my day-to-day preparation strategy?</strong></h3>
                <li>
                  As a beginner you should ideally give 7 to 8 hours depending upon the work ethic in starting time. This daily schedule should comprise of daily reading of News paper followed by the subject you are preparing and optional subject. You can bifurcate the timing of the both portion according to the need of your subject.
                </li>
                <li>
                  It should be remember that, atleast one day should be given in a week for the revision so that apart from incorporating new information on daily basis you can collect the information in sequence to utilise it properly before the exact battle day.
                </li>
                <h3><strong>3. How to tame mental tiredness and boredom?</strong></h3>
                <li>
                  Felling mental tiredness and lethargic is quite common in every aspirant and you neither should nor worry about these things. As a human being mood swings and you will feel; why I am preparing for this examination and what I will get by doing such hard work and making your near and dear ones suffer as well in case your family depends upon you.
                </li>
                <li>
                  The most appropriate advice will be to not think about result too much and think about the process rather than thinking all the time about result. As it is said that” think about the journey rather than destination”. By doing developing thought process like that you can develop a good habit of positive thinking, which can play a crucial role in defining your career.
                </li>
                <li>
                  You can also go out for movie with your friends from time to time or you can spend some quality time with your family. These little things play very important role in changing the mode and once again you can start studding with 2x energy.
                </li>
                <h3><strong>4. What should I do to stop dithering and delaying my priorities in regarding with Civil Services Examination preparation? </strong></h3>
                <li>
                  The only thing you can do is discipline, discipline and discipline.But, this discipline will come when you will be crystal clear in your thought process as to why you are preparing for this examination and how far have you come in this process. As it is being said that think about a day at time and piece by piece and drop by drop you will reach the place where you want to be.
                </li>
                <li>
                  In terms of priortising the things think like; what is more important your dream or any work that will drift you away from your dream so, keep yourself agile all the time in learning new things and developing new habits that can be helpful for your dream. 
                </li>
                <h3><strong>5. Reading Wide range of Books </strong></h3>
                <li>
                  The more books you read, the higher is your probability of sailing through. Absolutely no. CSE is not a test of knowledge but application of things you already know. One must better read one book four times than four books one time.
                </li>
                <h3><strong>6. Becoming Monk during preparation </strong></h3>
                <li>
                  You need to be a monk when preparing. No, you only need to be self disciplined. You don't have to go in hibernation. All you need is self control. People who love you actually are your spring boards to bounce back when you feel low. My mother, partner and two friends were very instrumental in my success. Yes you should not socialise that often as it distracts but some unwinding only eases the stress.
                </li>
                <h3><strong>7. Only highly intelligent students with an excellent academic record are successful at the CSE </strong></h3>
                <li>
                  How does one measure intelligence? Can we call someone highly intelligent just because he/she scores 100% in Mathematics or Physics at the 10th Class level? Or do we call a student who has consistently secured a first division intelligent? The fact is, the notion of intelligence is susceptible to varied definitions.
                </li>
                <li>
                  However that may be, a survey conducted a few years back indicated that most of the successful aspirants had secured only a second division in graduation. So while a high academic score is a definite asset, a second or a third division in no way hits your chances. You may yet prove yourself.
                </li>
                <strong>At last I would say that “your limitation is only your imagination” and any success don’t come by remaining their in your comfort zone. So, go and grab this opportunity that you have got and make your parents, teachers proud on you, go and get the success as the world is yours. Like in the words of Swami Vivekananda “Arise awake and stop not till the goal is reached”. Good luck……</strong>
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