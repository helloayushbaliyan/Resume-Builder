import React from "react";
import ReviewCard from "./ReviewCard";

function Review() {
  const testimonials = [
    {
      rating: 5,
      quote:
        "ResumePro transformed my job search! The templates are professional and the builder is incredibly easy to use. I got 3 interview calls within a week of updating my resume.",
      name: "Sarah Johnson",
      title: "SOFTWARE ENGINEER, TECH CORP",
    },
    {
      rating: 5,
      quote:
        "The ATS-optimized templates made all the difference. My resume finally started getting past the screening bots. Landed my dream job within a month!",
      name: "Michael Chen",
      title: "PRODUCT MANAGER, STARTUP",
    },
    {
      rating: 5,
      quote:
        "Professional, clean, and modern designs. The PDF export quality is exceptional. Best free resume builder I've used. Highly recommend to anyone job hunting.",
      name: "Emily Rodriguez",
      title: "MARKETING DIRECTOR, AGENCY",
    },
  ];

  return (
    <section className="container px-4 md:mx-auto py-20">
      <div className="flex flex-col gap-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-[#1617e8] text-sm font-bold uppercase tracking-widest">
            <span className="text-[#1617e8]">//</span>
            <span>TESTIMONIALS</span>
          </div>
          <h2 className="text-3xl md:text-[48px] font-black tracking-tight text-[#0d0d1b] leading-tight">
            What Our Users Say.
          </h2>
          <p className="text-slate-600 text-lg max-w-[720px] mx-auto">
            Join thousands of job seekers who've successfully landed their dream
            roles with ResumePro.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <ReviewCard
              key={index}
              rating={testimonial.rating}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Review;
