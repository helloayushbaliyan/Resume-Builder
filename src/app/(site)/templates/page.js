"use client";
import { templates } from "@/data/templateData";
import { selectTemplate, resetResume } from "@/redux/slices/resumeSlice";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";

function Templates() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("All");
  const [isVisible, setIsVisible] = useState({});

  const categories = [
    { id: "All", label: "All templates" },
    { id: "Modern", label: "Modern" },
    { id: "Minimal", label: "Minimal" },
    { id: "Executive", label: "Executive" },
    { id: "Fresher", label: "Fresher" },
  ];

  // Featured template IDs - customize based on your template data
  const featuredTemplateIds = [1, 2];

  useEffect(() => {
    dispatch(resetResume());
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleTemplate = (template) => {
    dispatch(selectTemplate(template));
    router.push("/builder");
  };

  const filteredTemplates = activeCategory === "All"
    ? templates
    : templates.filter(t => t.category === activeCategory);

  const featuredTemplates = templates.filter(t =>
    featuredTemplateIds.includes(t.id)
  );

  const regularTemplates = filteredTemplates.filter(t =>
    !featuredTemplateIds.includes(t.id)
  );

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-30"></div>

        <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
              </span>
              <span className="text-[13px] font-medium text-blue-900">No account needed</span>
            </div>

            <h1 className="text-[44px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.02em] text-gray-900">
              Choose your template
            </h1>
            <p className="text-[19px] md:text-[21px] text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Professional designs optimized for applicant tracking systems. Pick a template and start editing immediately.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-[15px] text-gray-600">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>ATS-friendly</span>
              </div>
              <div className="flex items-center gap-2 text-[15px] text-gray-600">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Completely free</span>
              </div>
              <div className="flex items-center gap-2 text-[15px] text-gray-600">
                <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Instant start</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4">
        <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-6xl">
          <div className="flex items-center justify-center overflow-x-auto">
            <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-gray-100">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative px-5 py-2.5 rounded-lg text-[15px] font-medium transition-all duration-200 whitespace-nowrap ${
                    activeCategory === category.id
                      ? "text-gray-900 bg-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {category.label}
                  {activeCategory === category.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      {activeCategory === "All" && featuredTemplates.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-6xl">
            <div
              data-animate
              id="featured"
              className={`space-y-10 transition-all duration-1000 ${
                isVisible.featured ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                  <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-[13px] font-semibold text-amber-900">Recommended</span>
                </div>
                <h2 className="text-[32px] md:text-[40px] font-bold tracking-[-0.02em] text-gray-900">
                  Popular with hiring managers
                </h2>
                <p className="text-[17px] text-gray-600 leading-relaxed max-w-2xl">
                  These templates consistently perform well in applicant tracking systems and get positive feedback from recruiters.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredTemplates.map((template, index) => (
                  <div
                    key={template.id}
                    className="group relative"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-white border-2 border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-2xl transition-all duration-300">
                      <div className="relative aspect-[3/4] bg-gray-50">
                        <Image
                          src={template.image}
                          alt={template.name}
                          fill
                          className="object-cover"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* CTA */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <button
                            onClick={() => handleTemplate(template.id)}
                            className="px-8 py-4 bg-white text-gray-900 text-[17px] font-semibold rounded-xl shadow-2xl hover:scale-105 transition-transform duration-200 cursor-pointer"
                          >
                            Use this template
                          </button>
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <h3 className="text-[20px] font-semibold text-gray-900">{template.name}</h3>
                        <p className="text-[15px] text-gray-600 leading-relaxed">
                          {template.description || "Clean, professional layout suitable for all industries"}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[13px] font-medium">
                            ATS-friendly
                          </span>
                          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[13px] font-medium">
                            One page
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Template Gallery */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-6xl">
          <div
            data-animate
            id="gallery"
            className={`space-y-10 transition-all duration-1000 delay-100 ${
              isVisible.gallery ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="space-y-2">
              <h2 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] text-gray-900">
                {activeCategory === "All" ? "All templates" : `${activeCategory} templates`}
              </h2>
              <p className="text-[16px] text-gray-600">
                {filteredTemplates.length} professional {filteredTemplates.length === 1 ? "template" : "templates"} to choose from
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularTemplates.map((template, index) => (
                <div
                  key={template.id}
                  className="group"
                  style={{
                    animation: isVisible.gallery ? `fadeInUp 0.6s ease-out ${index * 50}ms both` : "none",
                  }}
                >
                  <div className="relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="relative aspect-[3/4] bg-gray-50">
                      <Image
                        src={template.image}
                        alt={template.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* CTA */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={() => handleTemplate(template.id)}
                          className="px-6 py-3 bg-white text-gray-900 text-[15px] font-semibold rounded-lg shadow-xl hover:scale-105 transition-transform duration-200"
                        >
                          Use template
                        </button>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="text-[17px] font-semibold text-gray-900">{template.name}</h3>
                      <p className="text-[14px] text-gray-600 line-clamp-2">
                        {template.description || "Professional and ATS-optimized"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selection Helper */}
      <section className="py-16 md:py-20">
        <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-4xl">
          <div
            data-animate
            id="helper"
            className={`transition-all duration-1000 delay-100 ${
              isVisible.helper ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-blue-100">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900">
                    Not sure which to choose?
                  </h2>
                  <p className="text-[16px] text-gray-600 leading-relaxed">
                    Here are some quick suggestions based on common use cases
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border border-white shadow-sm">
                    <div className="space-y-2">
                      <h3 className="text-[17px] font-semibold text-gray-900">First job or internship</h3>
                      <p className="text-[14px] text-gray-600 leading-relaxed">
                        Try our Minimal or Fresher templates. They emphasize skills and education clearly.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border border-white shadow-sm">
                    <div className="space-y-2">
                      <h3 className="text-[17px] font-semibold text-gray-900">Mid to senior level</h3>
                      <p className="text-[14px] text-gray-600 leading-relaxed">
                        Modern or Executive templates showcase extensive experience effectively.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border border-white shadow-sm">
                    <div className="space-y-2">
                      <h3 className="text-[17px] font-semibold text-gray-900">Career change</h3>
                      <p className="text-[14px] text-gray-600 leading-relaxed">
                        Modern templates help highlight transferable skills and relevant experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Reassurance */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-3xl">
          <div
            data-animate
            id="quality"
            className={`text-center space-y-8 transition-all duration-1000 delay-100 ${
              isVisible.quality ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="space-y-3">
              <h2 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] text-gray-900">
                Designed for results
              </h2>
              <p className="text-[17px] text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Every template is created with careful attention to typography, spacing, and structure. We test each design to ensure it works with major applicant tracking systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-[16px] font-semibold text-gray-900">ATS-tested</h3>
                <p className="text-[14px] text-gray-600">
                  Verified compatibility with major screening systems
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-[16px] font-semibold text-gray-900">Professional design</h3>
                <p className="text-[14px] text-gray-600">
                  Clean layouts with proper hierarchy and spacing
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-[16px] font-semibold text-gray-900">Instant export</h3>
                <p className="text-[14px] text-gray-600">
                  Download high-quality PDFs ready to send
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2ek0zNiAzNGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

        <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-3xl relative z-10">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-[36px] md:text-[48px] font-bold text-white leading-tight">
                Ready to start?
              </h2>
              <p className="text-[19px] text-blue-100 leading-relaxed">
                Pick any template above and begin building your resume. No account, no delays.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-10 py-5 bg-white text-indigo-600 text-[18px] font-bold rounded-xl shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-200"
              >
                Browse templates
              </button>
            </div>

            <p className="text-[15px] text-blue-200 pt-2">
              Free forever. All features included.
            </p>
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


export default Templates;
