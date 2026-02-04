// Layout for blog post dynamic routes - provides metadata for each post
import { notFound } from "next/navigation";

// Blog post metadata - Title: 50-60 chars, Description: 150-160 chars
const blogArticles = {
    "resume-ats-systems": {
        title: "How ATS Systems Read Resumes - Cvee Blog",
        description: "Learn how applicant tracking systems parse resumes and what affects screening. Practical tips for creating ATS-friendly resumes that get noticed.",
    },
    "resume-formatting": {
        title: "Resume Formatting That Matters - Cvee Blog",
        description: "Discover which formatting choices influence readability and screening decisions. Real hiring patterns and best practices for professional resumes.",
    },
    "career-change-resume": {
        title: "Career Transition Resume Guide - Cvee Blog",
        description: "How to frame experience, skills, and outcomes when changing careers. Effective strategies for resumes that don't match the target role directly.",
    },
    "resume-length": {
        title: "Resume Length Guide: One or Two Pages - Cvee",
        description: "Clear guidance on resume length based on experience level, role expectations, and hiring context. Make informed decisions about your resume format.",
    },
    "skills-section": {
        title: "Making Your Skills Section Useful - Cvee Blog",
        description: "How to present skills effectively in your resume. Support your experience instead of repeating what recruiters already assume about your abilities.",
    },
};

export async function generateMetadata({ params }) {
    const article = blogArticles[params.slug];

    if (!article) {
        return { title: "Article Not Found" };
    }

    return {
        title: article.title,
        description: article.description,
        alternates: {
            canonical: `/blog/${params.slug}`,
        },
    };
}

export default function BlogPostLayout({ children }) {
    return children;
}
