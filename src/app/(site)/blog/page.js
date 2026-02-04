"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

// Blog posts data - curated, high-quality content only
const blogPosts = [
  {
    id: "resume-ats-systems",
    title: "How applicant tracking systems read resumes",
    excerpt: "A practical look at how ATS software parses resumes, and what actually affects whether your resume is seen by a recruiter.",
    date: "January 28, 2026",
    readTime: "5 min read",
    featured: true,
    slug: "resume-ats-systems"
  },
  {
    id: "resume-formatting",
    title: "Resume formatting that actually matters",
    excerpt: "Which formatting choices influence readability and screening decisions, based on real hiring and review patterns.",
    date: "January 20, 2026",
    readTime: "4 min read",
    featured: false,
    slug: "resume-formatting"
  },
  {
    id: "career-change-resume",
    title: "Writing a resume during a career transition",
    excerpt: "How to frame experience, skills, and outcomes when your background does not directly match the role you are targeting.",
    date: "January 15, 2026",
    readTime: "6 min read",
    featured: false,
    slug: "career-change-resume"
  },
  {
    id: "resume-length",
    title: "One page or two: guidance on resume length",
    excerpt: "Clear guidance on resume length, based on experience level, role expectations, and hiring context.",
    date: "January 10, 2026",
    readTime: "4 min read",
    featured: false,
    slug: "resume-length"
  },
  {
    id: "skills-section",
    title: "Making the skills section actually useful",
    excerpt: "How to present skills in a way that supports your experience instead of repeating what recruiters already assume.",
    date: "January 5, 2026",
    readTime: "5 min read",
    featured: false,
    slug: "skills-section"
  }
];


function BlogCard({ post, index, featured = false }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block ${featured ? "md:col-span-2" : ""}`}
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`
      }}
    >
      <article className={`h-full p-8 md:p-10 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 ${featured ? "hover:-translate-y-1" : "hover:-translate-y-0.5"}`}>
        {featured && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 mb-4">
            <span className="text-[13px] font-semibold text-blue-900">Featured</span>
          </div>
        )}

        <h2 className={`font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors ${featured ? "text-[32px] md:text-[40px] leading-tight" : "text-[24px] md:text-[28px] leading-tight"}`}>
          {post.title}
        </h2>

        <p className={`text-gray-600 leading-relaxed mb-6 ${featured ? "text-[18px]" : "text-[16px]"}`}>
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4 text-[14px] text-gray-500">
          <time dateTime={post.date}>{post.date}</time>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-30"></div>

        <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-4xl relative z-10">
          <div
            className={`space-y-6 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-[44px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.02em] text-gray-900">
              Resume guidance
            </h1>
            <p className="text-[19px] md:text-[21px] text-gray-600 leading-relaxed max-w-2xl">
              Practical advice on resume writing, formatting, and job applications. No fluff, no clickbait.
            </p>
            <p className="text-[15px] text-gray-500">
              Clear, actionable guidance based on real hiring feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-12 md:py-16">
          <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-6xl">
            <div
              className={`transition-all duration-700 ease-out delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <BlogCard post={featuredPost} index={0} featured={true} />
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-6xl">
          <div
            className={`transition-all duration-700 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {regularPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index + 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Keyframes for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
