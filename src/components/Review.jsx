"use client";

import React, { useState, useEffect, useCallback } from "react";
import ReviewCard from "./ReviewCard";
import { fetchApprovedFeedbacks } from "@/lib/feedbackService";

function Review() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDefaultTestimonials = useCallback(() => [
    {
      rating: 5,
      quote:
        "Clean templates that actually look professional. Used it for my software engineering applications and got consistent interview callbacks.",
      name: "Sarah Chen",
      title: "SOFTWARE ENGINEER",
    },
    {
      rating: 5,
      quote:
        "Finally, a resume builder that doesn't feel like it's trying to upsell me. Simple, fast, and the PDF quality is excellent.",
      name: "Michael Rodriguez",
      title: "PRODUCT MANAGER",
    },
    {
      rating: 5,
      quote:
        "The ATS-friendly formatting made a noticeable difference. My resume started getting past the screening stage consistently.",
      name: "Emily Thompson",
      title: "MARKETING LEAD",
    },
  ], []);

  useEffect(() => {
    async function loadFeedbacks() {
      const data = await fetchApprovedFeedbacks(6); // Fetch up to 6 approved feedbacks

      if (data && data.length > 0) {
        // Transform Supabase data to match ReviewCard props
        const transformedData = data.map((item) => ({
          rating: item.rating || 5,
          quote: item.feedback || "Great experience with ResumePro!",
          name: item.name || "Anonymous User",
          title: item.role || "PROFESSIONAL",
        }));
        setFeedbacks(transformedData);
      } else {
        // Use default testimonials if no approved feedbacks
        setFeedbacks(getDefaultTestimonials());
      }

      setLoading(false);
    }

    loadFeedbacks();
  }, [getDefaultTestimonials]);

  return (
    <section className="container px-6 md:px-8 lg:px-12 mx-auto py-24 md:py-32">
      <div className="flex flex-col gap-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] text-[#111827]">
            Trusted by professionals
          </h2>
          <p className="text-[17px] text-[#6B7280] leading-relaxed">
            Used by job seekers across industries to create resumes that get results.
          </p>
        </div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-[#111827] border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map((testimonial, index) => (
              <ReviewCard
                key={index}
                rating={testimonial.rating}
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Review;
