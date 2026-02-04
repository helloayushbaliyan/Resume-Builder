"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState({});

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

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-30"></div>

        <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-4xl relative z-10">
          <div
            data-animate
            id="hero"
            className={`text-center space-y-6 transition-all duration-1000 ${
              isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-[48px] md:text-[64px] font-semibold leading-[1.1] tracking-[-0.02em] text-gray-900">
              A resume builder that
              <br />
              respects your time
            </h1>
            <p className="text-[20px] md:text-[22px] text-gray-600 leading-relaxed max-w-2xl mx-auto">
              We built a professional resume tool that works instantly, requires no account, and stays completely free.
            </p>
            <p className="text-[16px] text-gray-500">
              No signup walls. No paywalls. No unnecessary friction.
            </p>
          </div>
        </div>
      </section>

      {/* Why We Built This */}
      <section className="py-20 md:py-28">
        <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-3xl">
          <div
            data-animate
            id="why"
            className={`space-y-12 transition-all duration-1000 delay-100 ${
              isVisible.why ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="space-y-4">
              <h2 className="text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] text-gray-900">
                Why we built this
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>

            <div className="space-y-6 text-[17px] md:text-[18px] text-gray-600 leading-relaxed">
              <p>
                Most resume builders make a simple task unnecessarily complicated. They ask for accounts before you&apos;ve seen a single template. They hide basic features behind paywalls. They use aggressive popups and dark patterns to push upgrades.
              </p>
              <p>
                We thought this approach missed the point. Creating a resume should be straightforward. You should be able to pick a template, fill in your information, and download a PDF. Immediately.
              </p>
              <p>
                So we built a tool that does exactly that. No registration forms. No credit cards. No artificial limitations. Just professional templates and a clean interface that gets out of your way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-4xl">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>

      {/* Product Philosophy */}
      <section className="py-20 md:py-28">
        <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-3xl">
          <div
            data-animate
            id="philosophy"
            className={`space-y-12 transition-all duration-1000 delay-100 ${
              isVisible.philosophy ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="space-y-4">
              <h2 className="text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] text-gray-900">
                How we think about product
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
            </div>

            <div className="grid gap-8 md:gap-10">
              <div className="space-y-3">
                <h3 className="text-[20px] font-semibold text-gray-900">Clarity over cleverness</h3>
                <p className="text-[17px] text-gray-600 leading-relaxed">
                  We prioritize clear interfaces and straightforward workflows. No hidden features, no confusing navigation, no unnecessary steps.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-[20px] font-semibold text-gray-900">Quality over quantity</h3>
                <p className="text-[17px] text-gray-600 leading-relaxed">
                  Every template is designed by professionals and tested with actual hiring managers. We&apos;d rather have five excellent options than fifty mediocre ones.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-[20px] font-semibold text-gray-900">Access over gatekeeping</h3>
                <p className="text-[17px] text-gray-600 leading-relaxed">
                  Good tools shouldn&apos;t require permission. We remove barriers instead of creating them. No accounts, no trials, no premium tiers.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-[20px] font-semibold text-gray-900">Performance over features</h3>
                <p className="text-[17px] text-gray-600 leading-relaxed">
                  We focus on doing the core task exceptionally well. Fast loading, instant exports, reliable formatting. The basics matter more than novelty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-4xl">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>

      {/* Who This Is For */}
      <section className="py-20 md:py-28">
        <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-3xl">
          <div
            data-animate
            id="audience"
            className={`space-y-12 transition-all duration-1000 delay-100 ${
              isVisible.audience ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="space-y-4">
              <h2 className="text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] text-gray-900">
                Who this is for
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
            </div>

            <div className="space-y-6 text-[17px] md:text-[18px] text-gray-600 leading-relaxed">
              <p>
                This tool is built for professionals who need a resume quickly and don&#39;t want to deal with unnecessary complexity. Developers looking for their next role. Designers updating their portfolio documents. Students applying for internships. Career changers preparing applications.
              </p>
              <p>
                It works best for people who value efficiency and quality over hand-holding. If you know what you want to say and just need a clean template to say it in, this will serve you well.
              </p>
              <p>
                We don&#39;t claim this is for everyone. It&#39;s for people who appreciate tools that do their job without drama.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-4xl">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>

      {/* What Makes It Different */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-3xl">
          <div
            data-animate
            id="different"
            className={`space-y-12 transition-all duration-1000 delay-100 ${
              isVisible.different ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="space-y-4">
              <h2 className="text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] text-gray-900">
                What makes this different
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                <div className="space-y-2">
                  <h3 className="text-[18px] font-semibold text-gray-900">No account theater</h3>
                  <p className="text-[17px] text-gray-600 leading-relaxed">
                    You don&#39;t need to create an account to use this tool. Not now, not later, not ever. We store nothing about you because we don&apos;t need to.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
                <div className="space-y-2">
                  <h3 className="text-[18px] font-semibold text-gray-900">Honest about what&#39;s free</h3>
                  <p className="text-[17px] text-gray-600 leading-relaxed">
                    Everything is free. Not &#34;free trial&#34; or &#34;free plan with limits.&#34; The entire product, all templates, all features. We don&apos;t have a business model that depends on frustrating you into paying.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
                <div className="space-y-2">
                  <h3 className="text-[18px] font-semibold text-gray-900">Respects your workflow</h3>
                  <p className="text-[17px] text-gray-600 leading-relaxed">
                    No popups asking for feedback. No emails requesting upgrades. No notifications. We let you work without interruption and assume you&apos;re capable of finding what you need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Transparency */}
      <section className="py-20 md:py-28">
        <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-3xl">
          <div
            data-animate
            id="trust"
            className={`space-y-12 transition-all duration-1000 delay-100 ${
              isVisible.trust ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="space-y-4">
              <h2 className="text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] text-gray-900">
                Trust and transparency
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
            </div>

            <div className="space-y-8">
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                <div className="space-y-4">
                  <h3 className="text-[20px] font-semibold text-gray-900">Your data</h3>
                  <p className="text-[17px] text-gray-700 leading-relaxed">
                    Your resume content stays in your browser. We don&apos;t store it on servers. We don&apos;t sync it to clouds. When you export a PDF, the processing happens locally. When you close the tab, your data is gone from our end.
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                <div className="space-y-4">
                  <h3 className="text-[20px] font-semibold text-gray-900">No hidden costs</h3>
                  <p className="text-[17px] text-gray-700 leading-relaxed">
                    There is no premium version. There are no additional features to unlock. There are no usage limits. This is the complete product, and it costs nothing.
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                <div className="space-y-4">
                  <h3 className="text-[20px] font-semibold text-gray-900">Why it&apos;s free</h3>
                  <p className="text-[17px] text-gray-700 leading-relaxed">
                    We believe useful tools should be accessible. This project exists because we wanted to build something well and make it available for everyone to use. That&apos;s the entire reasoning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-6 md:px-8 lg:px-12 mx-auto max-w-2xl">
          <div
            data-animate
            id="closing"
            className={`text-center space-y-8 transition-all duration-1000 delay-100 ${
              isVisible.closing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="space-y-4">
              <p className="text-[20px] md:text-[22px] text-gray-600 leading-relaxed">
                If this approach makes sense to you, the tool is ready to use. No signup, no delays.
              </p>
            </div>

            <Link
              href="/templates"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[17px] font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-200"
            >
              Create your resume
            </Link>

            <p className="text-[15px] text-gray-500 pt-2">
              Free to use. No account required.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
