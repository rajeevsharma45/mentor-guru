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
  title: "How to Make Notes for UPSC",
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
    .filter(blog => blog.slug !== 'how-to-make-notes-for-upsc')
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
            <span className="text-gray-700">How to Make Notes for UPSC</span>
          </nav>

          {/* Title & Meta Info */}
          <header>
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
              How to Make Notes for UPSC
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
              src="/blogs/How to Make Notes for UPSC.jpg"
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
                <li>Learning is first step of notes Making</li>
                <li>Reading less analyzing more </li>
                <li>Making notes in own words</li>
                <li>Confining notes as small as Possible</li>
                <li>Some frequently asked Questions</li>
                <li>Article source: The Times of India</li>
              </ol>
            )}
          </section>

          <article className="prose max-w-none text-gray-800">
            <h2 className="text-2xl font-bold mb-3">Learning is first step of notes Making</h2>
            
            <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
              <li>Quite often you will see students go for notes making in one go and without understanding the exact meaning of notes making and importance of notes making. Notes making is quite often confused with writing everything down on pen and paper or on digital software. The very exact meaning of notes making is to write down things, which you can forget and things which can be revised in quick succession of time.</li>
              <li>Notes making is an art where you read things and use those information smartly in pinning down that information in crispy and precise manner so that you can remember those things.</li>
              <li>Before note making you should collect information, information is the key in note making .When you will know the topics ,even in lightest of manner it will help you in note making.So.the mantra of note making is go for information collection in initial stage and later on you can disseminate that information  in note making.</li>
            </ul>
          </article>


          <section className="space-y-10 mt-8">
            
            <div>
              <h2 className="text-2xl font-bold mb-3">Reading less analyzing more </h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                <strong>Visualising things to remember studied matter:</strong>
                <li>One of the common problems that are found in students is that they forgot, what they have read within span of few times. You don’t have to worry about these things much, as although it is quite natural that you will forget the studied things but revising time and again holds the key in this examination.</li>
                <li>Civil service examination is not about bookish knowledge and it go beyond your limited knowledge of book. So ,keep on expanding your knowledge ,not by book alone but analyzing the things in practicality that is understanding the concept in more natural way.E.g Delhi government implement Odd Even scheme in November every year .In this case  understand that ,is Delhi pollution is solely responsible for pollution in Delhi or neighboring states also contributes in Air pollution in Delhi. You should also understand which air is injurious for health and their source of emergence.</li>
              </ul>
            </div>

            
            <div>
              <h2 className="text-2xl font-bold mb-3">Making notes in own words</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                <h3><strong>Make rough Diagram or Flow chart.</strong></h3>
                <li>
                  Making rough diagram and flow chart is not only beneficial in notes making point of view but, this same flow chart can be utilised in mains answer writing to get edge ahead as compare to other students.
                </li>
                <li>
                  Making diagram or flow chart is beneficial in terms of answer writing; when due to crisis of time you may have to go for depict relevant information on your copy. These little things can also fetch you good marks.
                </li>
              </ul>
              <h2 className="text-2xl font-bold mb-3">Confining notes as small as Possible</h2>
              <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                <strong>1. Make precise and crispy points.</strong>
                <li>
                  Make notes in as much as possible in crispy and precise way. Write notes in to the point like; when, how and where format. Sticking to the point is most important in notes making as you may end up filling your note book with irrelevant information ,which may not have much use, In nutshell you may end up making another voluminous note for yourself before the exam ,Which may not have much use of yours.
                </li>
                <li>
                  One linear notes is far more superior as compare to writing down whole things on notebook and increasing the work of yours by increasing the material.So,try to stick with the information and read as if you have to carry that information whole till your death.
                </li>
                <h3><strong>Liner Notes and Pattern notes</strong></h3>
                <li>
                  Making notes from voluminous study material is nothing but gigantic task. There are different methods of making notes and one should decide which method suits you the best. There are two types of making notes; one is the 'Linear Notes' the other is 'Pattern Notes'.
                </li>
                <h4><strong>1. Pattern Notes: </strong></h4>
                <li>
                  In pattern notes making each topic at the center of the page and each line radiating from it should represent a branch of the main idea. Each point is written as briefly as possible using a key word or a phrase. This is an appropriate method to adopt because it is more flexible and one can add extra information at any point of time.
                </li>
                <li>
                  Pattern notes making is beneficial as you can see the entire pattern at one go without actually turning the pages. You can indicate the links between different topics more easily. it is useful from one's memory point of view as one can keep jotting down the points as and when they crop in the mind.
                </li>
                <li>
                  Pattern notes are much easier to remember the content of the notes. This patter help in revision much faster as only brief key words are being used to make notes.
                </li>
                <li>
                  The disadvantage of pattern notes making is if there are too many facts and too much of information, your notes becomes messy and overcrowded. Using key words can remind of basic ideas but when it comes to remembering details, this method cannot be sufficient alone.
                </li>
                <li>
                  So the best method of making good notes is to use a combination of both Linear and Pattern methods and evolve your own unique pattern of making notes that may help you in your last minute revisions.
                </li>
                <h4><strong>1. Linear Notes: </strong></h4>
                <li>
                  In Linear notes method you condense the material you have read and jot down the most important points using headings and sub headings. This is a best method make notes after reading a book newspaper or a magazine. Here one has to avoid copying a lot of material and lot of care has to be taken while condensing the contents. The right way is to use loose sheets of paper to make notes on a given topic as it is easier to keep adding information through additional sheets. 
                </li>
                <li>
                  Notes can be made by using colors, block letters, boxes and highlighters. This will help you in arranging the notes in sequence and grabbing the attention to the actual contents and they would make it much easier for quick recall of the important points of a topic.
                </li>
                <h2 className="text-2xl font-bold mb-3">Some frequently asked Questions</h2>
                 <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                  <h3><strong>1. Is it necessary for note making?</strong></h3>
                  <li>
                    Not really, it varies from person to person .This is not something mandatory for clearing the examination. You can still clear this examination without making notes, however notes making eases the preparation hard work.
                  </li>
                  <li>
                    If you don’t want to make notes, you can choose other way of highlighting of text, make important word bold if you are making notes online.
                    </li> 
                    <h3><strong>Is it necessary to make notes for static portion?</strong></h3> 
                    <li>
                      For longer subjects it is mandatory to make notes .e.g. History, Geography and current affairs, as these subjects are voluminous and you need to revise it again and again. The only you can revise them when you have collected the information at one place.
                    </li> 
                      <li>
                        Choose what you want, whether you want to make notes or not, even if you want the later one it will not have any major impact on your success. It depends upon you that what suits you; it is you who will decide your success or failure. Neither this article or tips goanna help you neither is I. so, work on yourself  of what you want rather than taking tips from others and implementing it on trial basis.
                      </li>  
                      <h3><strong>3. What should note consists of?</strong></h3> 
                      <li>
                        Your notes should ask the questions what? Why? How? When? Where? Examples? Benefits? Cons? Suggestions? Data? Committees? Schemes? Alternatives to the phrase of syllabus in question.
                        </li>  
                        <li>
                          Your notes consist of information that you have read and the information that you have collected din more precise manner and crispy manner. It means that your notes should be in your words and the pattern of your notes should be like asking questions from you.
                          </li> 
                          <li>
                            Your notes should also consist of diagram and flow chart wherever it is necessary and it should in linear form which should follow the pattern.
                            </li>     
                            <h3><strong>4. Should I make notes online or offline?</strong></h3>   
                            <li>
                              Again, like I have said earlier above it is totally your call to decide whether you want to make notes online or go for offline. The most convenient you feel in which you should adopt that method. No matter where you make notes but you should remember that you have to revise multiple times. So, keeping that thing in the mind you should decide the things which are more suitable to you.
                            </li>
                            <h3><strong>5. How to make notes from NCERT?</strong></h3> 
                            <li>
                              NCERT Is basic book, yet it is the foundation stone for your civil services preparation so, don’t take NCERT lightly and read it as for just fun. Take NCERT with sincerity and understand each and every concept of NCERT and utilize your reading in your own example by understanding the crux of the material.
                            </li>
                            <li>
                              Understand this through an example suppose you have read ;difference between GDP and NDP SO, here write down what GDP includes .e.g. Goods services produced within boundary of territory of a country within limited period of time, In NDP You can write in your note book NDP=GDP-Depreciation.
                            </li>
                            <h3><strong>6. How to make notes from News Paper?</strong></h3>
                            <li>
                              When you read newspaper daily, understand the whole dynamics first then write it down the important points in your own language. Let’s understand this concept through an example; read the article given below, which is taken from The Times of India:
                            </li>
                            <div className="rounded-lg overflow-hidden">
                                        <Image
                                          src="/blog-feature.jpg"
                                          alt="Blog banner"
                                          width={400}
                                          height={400}
                                          className="w-full object-cover"
                                        />
                                      </div>
                                       <h4><strong>Article source: The Times of India</strong></h4>
                                       <li>
                                        Above article is about Universal Basic Income, in which writer is depicting broader picture of UBI merging it with rural distress;so,her your notes making should be like this:
                                       </li>
                                       <ol>1. What is UBI?</ol>
                                       <ol>2. Reasons for emergence of UBI concept?</ol>
                                       <ol>3. Reasons for Agrarian distress?</ol>
                                       <ol>4. Government policies (short term/long term) to tackle this problem.</ol>
                                       <ol>5. Benefits and Negative aspects associated with UBI.</ol>
                                       <ol>6. Above article also mention about Rythu Bandhu scheme of Andhra Pradesh, so goggle it and know about it and write it down in your note book.</ol>
                 </ul>
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