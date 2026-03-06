"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const posts: {
  title: string;
  date: string;
  image: string;
  alt: string;
  slug: string;
}[] = [
  {
    title: "Shipping faster with ProChat’s ProKit engine",
    date: "Feb 2026",
    image: "/opengraph-image.png",
    alt: "ProChat ProKit preview",
    slug: "prochat-prokit-shipping",
  },
  {
    title: "Stack guardrails for Next.js + Prisma + Clerk + Stripe",
    date: "Jan 2026",
    image: "/opengraph-image.png",
    alt: "ProChat stack guardrails",
    slug: "prochat-stack-guardrails",
  },
  {
    title: "How ProChat uses n8n for SaaS automations",
    date: "Dec 2025",
    image: "/opengraph-image.png",
    alt: "ProChat n8n automations",
    slug: "prochat-n8n-automations",
  },
];

const BlogCard = () => {
  const [visiblePosts, setVisiblePosts] = useState(6);

  const loadMore = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 6);
  };
  return (
    <div className="mt-[100px] mb-[40px]">
      <div className="container mx-auto p-8 px-20  md:w-[80%] ">
        <h1 className="text-4xl font-bold text-center mb-14">
          The ProChat Blog
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {posts.slice(0, visiblePosts).map((post, index) => (
            <Link
              href={`/blog/${post.slug}`}
              key={index}
              className="bg-white dark:bg-surface rounded-xl overflow-hidden shadow-lg dark:border border-solid border-border hover:border-border-strong transition-all duration-500 transform hover:scale-105 ease-in-out"
            >
              <Image
                src={post.image}
                alt={post.alt}
                className="object-cover"
                width={500}
                height={156}
              />
              <div className="p-4">
                <h2 className=" font-normal text-[16px] dark:text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-400">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
        {visiblePosts < posts.length && (
          <div className="flex justify-center">
            <button
              className="bg-primary hover:bg-secondary w-32 rounded-lg text-primary-foreground font-semibold py-3 mt-12 transition-colors"
              onClick={loadMore}
            >
              See more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
