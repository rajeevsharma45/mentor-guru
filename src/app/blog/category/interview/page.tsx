"use client"

import type { FC } from 'react';
import { useRouter } from 'next/navigation';

interface Blog {
    id: number;
    slug: string;
    title: string;
    thumbnail: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    excerpt: string;
}



const blogs: Blog[] = [
    {
        id: 1,
        slug: "Interview-preparation-2026",
        title: "Interview Oreparation 2026: Tips and Strategies",
        thumbnail: "/thumb-1.jpg",
        author: "Saumya Sarin",
        date: "Oct 10 2025",
        readTime: "10 min read",
        category: "mains",
        excerpt: "A concise guide to UPSC Mains strategy...",
    },
    {
       id: 2,
        slug: "mains-stategy-2026",
        title: "Intervier for 2027",
        thumbnail: "/thumb-1.jpg",
        author: "Saumya Sarin",
        date: "Oct 11 2025",
        readTime: "10 min read",
        category: "mains",
        excerpt: "A concise guide to UPSC Mains strategy...",
    },
]

const interviewBlogs = blogs.filter((b) => b.category === 'interview');

const InterviewPage: FC = () => {
    const router = useRouter();
    return (
        <div>
            {interviewBlogs.length === 0 ? (
                <p>No interview blogs found.</p>
            ) : (
                <ul>
                    {interviewBlogs.map((b) => (
                        <li key={b.id}>
                            <h2>{b.title}</h2>
                            <p>{b.excerpt}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default InterviewPage;