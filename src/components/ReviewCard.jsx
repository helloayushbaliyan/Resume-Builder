import React from "react";

function ReviewCard({ rating, quote, name, title }) {
  return (
    <div className="relative group h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1617e8]/5 to-transparent rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
      <div className="relative h-full flex flex-col gap-6 p-8 rounded-2xl border border-[#e7e7f3] bg-white hover:shadow-2xl hover:border-[#1617e8]/30 transition-all duration-300">
        {/* Decorative Quote Mark */}
        <div className="absolute top-4 right-4 text-[#1617e8]/10 text-8xl font-serif leading-none select-none">
          "
        </div>

        {/* Star Rating */}
        <div className="flex gap-1 relative z-10">
          {[...Array(rating)].map((_, index) => (
            <svg
              key={index}
              className="w-5 h-5 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="relative z-10 flex-1">
          <p className="text-[#0d0d1b] text-lg leading-relaxed italic">
            "{quote}"
          </p>
        </blockquote>

        {/* Author Info */}
        <div className="relative z-10 flex flex-col gap-1">
          <p className="text-[#0d0d1b] font-bold text-xl">{name}</p>
          <p className="text-slate-500 text-sm uppercase tracking-wider font-medium">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
