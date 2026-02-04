"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Sample blog content - in production, this would come from a CMS or markdown files
const blogArticles = {
  "resume-ats-systems": {
    title: "How applicant tracking systems read resumes",
    date: "January 28, 2026",
    readTime: "5 min read",
    introduction:
        "Most companies use applicant tracking systems to filter resumes before a human sees them. Understanding how these systems work helps you write resumes that pass the initial screening.",
    content: [
      {
        type: "section",
        heading: "What ATS software actually does",
        paragraphs: [
          "Applicant tracking systems scan resumes to extract structured information such as job titles, dates, skills, and education. They are not evaluating quality or intent. They are identifying patterns and matching them against job requirements.",
          "Popular systems like Workday, Greenhouse, and Lever differ slightly, but all follow the same core process: parse the document, normalize the data, and rank candidates based on relevance."
        ]
      },
      {
        type: "section",
        heading: "Formatting that works with ATS",
        paragraphs: [
          "Use standard section headings such as Experience, Education, and Skills. These labels are reliably recognized by parsing engines. Creative alternatives can reduce accuracy.",
          "Avoid complex layouts. Multi-column designs, text boxes, and graphics often break the parsing logic. Simple structure leads to more reliable extraction.",
          "Use PDFs with selectable text or standard Word documents. Image-based resumes cannot be parsed correctly."
        ]
      },
      {
        type: "section",
        heading: "Keywords and relevance",
        paragraphs: [
          "Incorporate relevant terms from the job description naturally within your experience. Avoid keyword stuffing. If your experience aligns, the right words will appear organically.",
          "When applicable, include both acronyms and full terms. Some systems index one but not the other."
        ]
      },
      {
        type: "section",
        heading: "What this means for your resume",
        paragraphs: [
          "Clear structure improves both system parsing and human readability. Templates that prioritize clarity work for both audiences.",
          "ATS compatibility does not require sacrificing professionalism. It simply requires restraint."
        ]
      }
    ],
    closing:
        "Clean structure benefits both automated systems and human reviewers. When in doubt, clarity is the safest choice.",
    relatedArticles: [
      { title: "Resume formatting that actually matters", slug: "resume-formatting" },
      { title: "Making the skills section actually useful", slug: "skills-section" }
    ]
  },

  "resume-formatting": {
    title: "Resume formatting that actually matters",
    date: "January 20, 2026",
    readTime: "4 min read",
    introduction:
        "Formatting determines how easily your resume can be scanned and understood. Good formatting removes friction. Poor formatting creates it.",
    content: [
      {
        type: "section",
        heading: "Why formatting matters",
        paragraphs: [
          "Recruiters often spend only a few seconds scanning a resume initially. Clear structure helps them locate key information without effort.",
          "Formatting is not about creativity. It is about hierarchy, spacing, and consistency."
        ]
      },
      {
        type: "section",
        heading: "Typography fundamentals",
        paragraphs: [
          "Choose a professional font and keep body text between 10 and 12 points. Headings should be slightly larger, not dramatically different.",
          "Consistency matters more than style. Spacing, alignment, and font usage should remain uniform throughout the document."
        ]
      },
      {
        type: "section",
        heading: "Layout structure",
        paragraphs: [
          "Place your name and contact details at the top. Make them easy to find.",
          "Use conventional section order unless you have a strong reason to change it. Familiarity reduces cognitive load."
        ]
      }
    ],
    closing:
        "The best formatting goes unnoticed. It supports the content without drawing attention to itself.",
    relatedArticles: [
      { title: "How applicant tracking systems read resumes", slug: "resume-ats-systems" },
      { title: "One page or two: resume length guidance", slug: "resume-length" }
    ]
  },

  "career-change-resume": {
    title: "Writing a resume during a career transition",
    date: "January 15, 2026",
    readTime: "6 min read",
    introduction:
        "Changing careers can make resume writing feel uncertain. The goal is not to hide your past, but to translate it clearly.",
    content: [
      {
        type: "section",
        heading: "Focus on transferable skills",
        paragraphs: [
          "Most roles share core skills such as problem solving, communication, and ownership. Highlight these explicitly within your experience.",
          "Avoid assuming the reader will connect the dots. Make the relevance clear."
        ]
      },
      {
        type: "section",
        heading: "Reframe experience, don’t erase it",
        paragraphs: [
          "Your previous roles provide context and credibility. Adjust how you describe them rather than removing them entirely.",
          "Focus on outcomes and responsibilities that align with the role you are targeting."
        ]
      },
      {
        type: "section",
        heading: "Adjust your summary",
        paragraphs: [
          "Use the summary section to explain your direction clearly. One or two sentences can provide valuable framing.",
          "Clarity here reduces confusion later in the review process."
        ]
      }
    ],
    closing:
        "Career transitions are common. A well-framed resume helps reviewers understand where you are going, not just where you have been.",
    relatedArticles: [
      { title: "Making the skills section actually useful", slug: "skills-section" },
      { title: "Resume formatting that actually matters", slug: "resume-formatting" }
    ]
  },

  "resume-length": {
    title: "One page or two: guidance on resume length",
    date: "January 10, 2026",
    readTime: "4 min read",
    introduction:
        "Resume length is less about rules and more about relevance. The right length depends on what you need to communicate.",
    content: [
      {
        type: "section",
        heading: "When one page is enough",
        paragraphs: [
          "Early-career professionals and students often benefit from a single-page resume.",
          "If you can clearly communicate your experience without cutting important information, shorter is better."
        ]
      },
      {
        type: "section",
        heading: "When two pages make sense",
        paragraphs: [
          "Experienced professionals may need additional space to show progression, leadership, and impact.",
          "Additional length should add clarity, not repetition."
        ]
      },
      {
        type: "section",
        heading: "What matters more than length",
        paragraphs: [
          "Relevance matters more than page count.",
          "Remove outdated or low-impact information before worrying about fitting a page limit."
        ]
      }
    ],
    closing:
        "Use the space you need, but make every line earn its place.",
    relatedArticles: [
      { title: "Resume formatting that actually matters", slug: "resume-formatting" },
      { title: "Writing a resume during a career transition", slug: "career-change-resume" }
    ]
  },

  "skills-section": {
    title: "Making the skills section actually useful",
    date: "January 5, 2026",
    readTime: "5 min read",
    introduction:
        "A skills section should support your experience, not replace it. Done well, it adds clarity. Done poorly, it adds noise.",
    content: [
      {
        type: "section",
        heading: "Why skills sections often fail",
        paragraphs: [
          "Long, generic lists do not communicate proficiency.",
          "Recruiters look for evidence, not claims."
        ]
      },
      {
        type: "section",
        heading: "How to choose what to include",
        paragraphs: [
          "List skills that are directly relevant to the role.",
          "Remove anything you cannot support with experience."
        ]
      },
      {
        type: "section",
        heading: "Integrating skills with experience",
        paragraphs: [
          "The strongest skills are reinforced within your work history.",
          "Use the skills section as a summary, not the main proof."
        ]
      }
    ],
    closing:
        "A focused skills section helps reviewers understand your strengths quickly and accurately.",
    relatedArticles: [
      { title: "How applicant tracking systems read resumes", slug: "resume-ats-systems" },
      { title: "Writing a resume during a career transition", slug: "career-change-resume" }
    ]
  }
};


export default function BlogArticle() {
  const params = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  const article = blogArticles[params?.slug] || blogArticles["resume-ats-systems"];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setReadProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Progress indicator */}
      <div className="fixed top-16 left-0 right-0 h-0.5 bg-gray-100 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        ></div>
      </div>

      {/* Article Header */}
      <header className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-30"></div>

        <div className="container px-6 md:px-8 mx-auto max-w-3xl relative z-10">
          <div
            className={`space-y-6 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Breadcrumb */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[15px] text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to articles
            </Link>

            <h1 className="text-[44px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.02em] text-gray-900">
              {article.title}
            </h1>

            <p className="text-[19px] md:text-[21px] text-gray-600 leading-relaxed">
              {article.introduction}
            </p>

            <div className="flex items-center gap-4 text-[14px] text-gray-500 pt-2">
              <time dateTime={article.date}>{article.date}</time>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-12 md:py-16">
        <div className="container px-6 md:px-8 mx-auto max-w-2xl">
          <div
            className={`prose prose-lg max-w-none transition-all duration-700 ease-out delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {article.content.map((section, index) => (
              <section key={index} className="mb-12">
                <h2 className="text-[28px] md:text-[32px] font-bold text-gray-900 mb-6 leading-tight">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-[17px] text-gray-700 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            {/* Closing paragraph */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <p className="text-[18px] text-gray-700 leading-relaxed">
                {article.closing}
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-6 md:px-8 mx-auto max-w-2xl">
          <div
            className={`text-center space-y-6 transition-all duration-700 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-[17px] text-gray-600">
              Ready to create your resume?
            </p>
            <Link
              href="/templates"
              className="inline-block px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white text-[17px] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Choose a template
            </Link>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <section className="py-16 md:py-20 border-t border-gray-200">
          <div className="container px-6 md:px-8 mx-auto max-w-4xl">
            <div
              className={`space-y-8 transition-all duration-700 ease-out delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900">
                Related articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {article.relatedArticles.map((related, index) => (
                  <Link
                    key={index}
                    href={`/blog/${related.slug}`}
                    className="group block p-6 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="text-[18px] font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {related.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reduced motion styles */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
