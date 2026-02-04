"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

// FAQ Data organized by category
const faqCategories = [
  {
    id: "usage",
    title: "Getting Started",
    questions: [
      {
        q: "Is this resume builder really free?",
        a: "Yes. You can create, preview, and download your resume without paying anything. There are no trial limits, watermarks, or locked features."
      },
      {
        q: "Do I need to sign up or create an account?",
        a: "No. You can use the resume builder instantly without creating an account. We intentionally removed signups to keep the experience fast and frictionless."
      },
      {
        q: "Can I start using it immediately?",
        a: "Yes. Choose a template, add your content, and download your resume right away. There's nothing to set up before you begin."
      },
      {
        q: "Who is this resume builder for?",
        a: "It's designed for professionals, developers, designers, students, and freshers who want a clean, professional resume without unnecessary complexity."
      }
    ]
  },
  {
    id: "templates",
    title: "Templates & Quality",
    questions: [
      {
        q: "Are the templates ATS-friendly?",
        a: "Yes. All templates follow clean formatting and structure that works well with most applicant tracking systems. No complex layouts, no hidden elements."
      },
      {
        q: "How many templates are available?",
        a: "We focus on quality over quantity. Each template is designed to be adaptable across roles and experience levels rather than offering dozens of minor variations."
      },
      {
        q: "Can I customize the content freely?",
        a: "Yes. You can edit all sections of your resume and tailor the content to your role or experience."
      },
      {
        q: "Are these templates suitable for experienced professionals?",
        a: "Yes. The templates are intentionally neutral, structured, and professional, suitable for both early-career and experienced roles."
      }
    ]
  },
  {
    id: "download",
    title: "Download & Export",
    questions: [
      {
        q: "What format can I download my resume in?",
        a: "You can download your resume as a high-quality PDF, ready to submit or share."
      },
      {
        q: "Will the downloaded PDF look the same as the preview?",
        a: "Yes. The preview shows exactly how your resume will appear in the final PDF. What you see is what you download."
      },
      {
        q: "Are there watermarks on the resume?",
        a: "No. Downloaded resumes do not contain watermarks or branding."
      },
      {
        q: "Can I download multiple times?",
        a: "Yes. You can download your resume as many times as you need."
      }
    ]
  },
  {
    id: "privacy",
    title: "Privacy & Data",
    questions: [
      {
        q: "Is my resume data stored anywhere?",
        a: "Your resume content is handled locally during your session. We do not require accounts, and we do not force you to upload personal information to use the builder."
      },
      {
        q: "Do you sell or share user data?",
        a: "No. We do not sell or share resume data."
      },
      {
        q: "Why don't you require login?",
        a: "Because we believe basic tools like resume creation should be accessible without barriers. Removing login improves speed, privacy, and usability."
      }
    ]
  },
  {
    id: "limitations",
    title: "Good to Know",
    questions: [
      {
        q: "Can I edit my resume later?",
        a: "You can continue editing during your session. If you want to revisit later, we recommend saving a copy of your resume content or downloaded PDF."
      },
      {
        q: "Does this work on mobile devices?",
        a: "Yes. The builder works on mobile and tablet devices, though editing is most comfortable on larger screens."
      },
      {
        q: "Does this replace professional resume writing services?",
        a: "No. This tool helps you create a clean, professional resume, but content quality still depends on what you write."
      }
    ]
  }
];

// Accordion Item Component
function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-start justify-between gap-4 text-left group cursor-pointer rounded-md"
        aria-expanded={isOpen}
      >
        <span className="text-[17px] font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
          {question}
        </span>
        <span className="flex-shrink-0 mt-1">
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ease-out ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-out ${
          isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-[16px] text-gray-600 leading-relaxed pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
}

// FAQ Category Section Component
function FAQCategory({ category, openItems, toggleItem }) {
  return (
    <div className="space-y-2">
      <h2 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider mb-4">
        {category.title}
      </h2>
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200 px-6">
        {category.questions.map((item, index) => (
          <AccordionItem
            key={`${category.id}-${index}`}
            question={item.q}
            answer={item.a}
            isOpen={openItems[`${category.id}-${index}`]}
            onToggle={() => toggleItem(`${category.id}-${index}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const toggleItem = (key) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Subtle decorative element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-30"></div>

        <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-3xl relative z-10">
          <div
            className={`space-y-6 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-[44px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.02em] text-gray-900">
              Frequently asked questions
            </h1>
            <p className="text-[19px] md:text-[21px] text-gray-600 leading-relaxed max-w-2xl">
              Clear answers about how the resume builder works, what&apos;s free, and what happens to your data.
            </p>
            <p className="text-[15px] text-gray-500">
              No accounts. No hidden paywalls. No surprises.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 md:py-16">
        <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-3xl">
          <div
            className={`space-y-12 transition-all duration-700 ease-out delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {faqCategories.map((category) => (
              <FAQCategory
                key={category.id}
                category={category}
                openItems={openItems}
                toggleItem={toggleItem}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-2xl">
          <div
            className={`text-center space-y-8 transition-all duration-700 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="space-y-4">
              <h2 className="text-[28px] md:text-[36px] font-bold text-gray-900">
                Still have questions?
              </h2>
              <p className="text-[17px] text-gray-600 leading-relaxed">
                You don&apos;t need to understand everything before you start. Most users create their resume in minutes.
              </p>
            </div>

            <Link
              href="/templates"
              className="inline-block px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white text-[17px] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Create your resume
            </Link>

            <p className="text-[14px] text-gray-500">
              Free to use. No account required.
            </p>
          </div>
        </div>
      </section>

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
