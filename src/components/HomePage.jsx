"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetResume } from "@/redux/slices/resumeSlice";
import Review from "./Review";

function HomePage() {
  const dispatch = useDispatch();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(resetResume());
    setIsVisible(true);
  }, [dispatch]);

  // Subtle parallax effect for hero preview
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative container px-6 md:px-8 lg:px-12 mx-auto pt-12 pb-12 md:pt-16 md:pb-32 lg:pt-16 lg:pb-24 overflow-hidden">
        {/* Subtle animated gradient background */}
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100 via-indigo-50 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-50 via-blue-50 to-transparent rounded-full blur-3xl animate-pulse-slower"></div>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left Column - Content */}
          <div className="flex flex-col gap-8 lg:gap-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 w-fit animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[13px] font-medium text-blue-900">Free. No signup required</span>
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-5">
              <h1 className="text-[48px] md:text-[60px] lg:text-[72px] font-bold leading-[1.05] tracking-[-0.03em] text-gray-900">
                Your next role
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  starts here
                </span>
              </h1>
              <p className="text-[19px] md:text-[21px] text-gray-600 leading-relaxed max-w-[540px]">
                Create a professional resume in minutes. ATS-friendly templates designed by hiring experts. Download instantly as PDF.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/templates"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[17px] font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-200 text-center overflow-hidden"
              >
                <span className="relative z-10">Create my resume</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="/templates"
                className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 text-[17px] font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200 text-center shadow-sm"
              >
                Browse templates
              </Link>
            </div>

            {/* Proof Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-sm">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[14px] font-medium text-gray-700">ATS-ready</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-sm">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-[14px] font-medium text-gray-700">PDF in 1 click</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-sm">
                <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <span className="text-[14px] font-medium text-gray-700">Curated templates</span>
              </div>
            </div>
          </div>

          {/* Right Column - Preview Stack with Parallax */}
          <div
            className="relative h-[600px] hidden lg:block"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            {/* Floating cards with stagger effect */}
            <div className="absolute top-0 left-[10%] w-[320px] animate-float-slow">
              <div className="rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden transform rotate-[-4deg] hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-white p-8">
                  <div className="space-y-4">
                    <div className="h-3 bg-gradient-to-r from-blue-200 to-blue-100 rounded w-2/3"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    <div className="space-y-2 pt-4">
                      <div className="h-2 bg-gray-100 rounded"></div>
                      <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                      <div className="h-2 bg-gray-100 rounded w-4/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-[80px] right-[5%] w-[320px] animate-float-medium">
              <div className="rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden transform rotate-[6deg] hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer">
                <div className="aspect-[3/4] bg-gradient-to-br from-indigo-50 to-white p-8">
                  <div className="space-y-4">
                    <div className="h-3 bg-gradient-to-r from-indigo-200 to-indigo-100 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                    <div className="space-y-2 pt-4">
                      <div className="h-2 bg-gray-100 rounded"></div>
                      <div className="h-2 bg-gray-100 rounded w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-[60px] left-[15%] w-[280px] animate-float-fast">
              <div className="rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden transform rotate-[2deg] hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer">
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-50 to-white p-6">
                  <div className="space-y-3">
                    <div className="h-3 bg-gradient-to-r from-purple-200 to-purple-100 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-200 rounded w-2/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Simple template preview */}
          <div className="hidden grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-white"></div>
            </div>
            <div className="aspect-[3/4] rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-white"></div>
            </div>
          </div>
        </div>
      </section>


      {/* Social Proof Strip */}
      <section className="border-y border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50 py-12">
        <div className="container px-6 md:px-8 lg:px-12 mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-[32px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">500+</div>
              <div className="text-[14px] text-gray-600 font-medium">Resumes created</div>
            </div>
            <div className="w-px h-12 bg-gray-200 hidden md:block"></div>
            <div className="text-center">
              <div className="text-[32px] font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">100%</div>
              <div className="text-[14px] text-gray-600 font-medium">Free forever</div>
            </div>
            <div className="w-px h-12 bg-gray-200 hidden md:block"></div>
            <div className="text-center">
              <div className="text-[32px] font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">0</div>
              <div className="text-[14px] text-gray-600 font-medium">Signups needed</div>
            </div>
            <div className="w-px h-12 bg-gray-200 hidden md:block"></div>
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <div className="text-[14px] text-gray-600 font-medium">Rated excellent</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-8 md:py-8 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-2xl opacity-50"></div>

        <div className="container px-6 md:px-8 lg:px-12 mx-auto relative z-10">
          <div className="flex flex-col gap-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-[40px] md:text-[52px] font-bold tracking-[-0.02em] text-gray-900">
                Everything you need to get hired
              </h2>
              <p className="text-[18px] text-gray-600 leading-relaxed">
                Professional tools designed to help you stand out and land your dream role
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature Card 1 */}
              <div className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-semibold text-gray-900 mb-2">ATS Optimized</h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed">Pass automated screening systems with properly formatted templates</p>
                  </div>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-semibold text-gray-900 mb-2">Instant Export</h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed">Download your resume as a high-quality PDF in one click</p>
                  </div>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-200">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-semibold text-gray-900 mb-2">Expert Designs</h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed">Templates crafted by hiring professionals and designers</p>
                  </div>
                </div>
              </div>

              {/* Feature Card 4 */}
              <div className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-green-300 hover:shadow-xl hover:shadow-green-100/50 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-200">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-semibold text-gray-900 mb-2">Privacy First</h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed">Your data stays private. No account or email required</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* How It Works */}
      <section className="py-8 md:py-8 bg-white">
        <div className="container px-6 md:px-8 lg:px-12 mx-auto">
          <div className="flex flex-col gap-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-[40px] md:text-[52px] font-bold tracking-[-0.02em] text-gray-900">
                Three steps to your perfect resume
              </h2>
              <p className="text-[18px] text-gray-600 leading-relaxed">
                Start creating your professional resume in under 5 minutes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connection lines for desktop */}
              <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200"></div>

              {/* Step 1 */}
              <div className="relative flex flex-col items-center text-center gap-6 p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[28px] font-bold shadow-xl shadow-blue-200 z-10 relative">
                    1
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-[22px] font-semibold text-gray-900">Choose a template</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed">Browse our curated collection and pick the style that fits your role</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-center text-center gap-6 p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[28px] font-bold shadow-xl shadow-indigo-200 z-10 relative">
                    2
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-[22px] font-semibold text-gray-900">Fill in your details</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed">Add your experience, skills, and education in our simple builder</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-center text-center gap-6 p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-[28px] font-bold shadow-xl shadow-purple-200 z-10 relative">
                    3
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-[22px] font-semibold text-gray-900">Download as PDF</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed">Get your professional resume instantly and start applying</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Review />

      {/* Final CTA Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2ek0zNiAzNGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

        <div className="container px-6 md:px-8 lg:px-12 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <h2 className="text-[44px] md:text-[56px] font-bold tracking-[-0.02em] text-white leading-tight">
                Ready to create your resume?
              </h2>
              <p className="text-[20px] text-blue-100 leading-relaxed max-w-2xl mx-auto">
                Join thousands of professionals. No signup required. Start building in seconds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/templates"
                className="group relative px-10 py-5 bg-white text-indigo-600 text-[18px] font-bold rounded-xl shadow-2xl hover:shadow-white/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-center overflow-hidden"
              >
                <span className="relative z-10">Create my resume</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-blue-100 text-[15px]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Free forever · No credit card · No account needed</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
