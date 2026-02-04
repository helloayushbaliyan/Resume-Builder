import React from "react";

function ReviewCard({ rating, quote, name, title }) {
  return (
    <div className="h-full flex flex-col gap-5 p-7 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:shadow-[0_2px_16px_rgba(0,0,0,0.08)] transition-all duration-200">
      {/* Star Rating */}
      <div className="flex gap-1">
        {[...Array(rating)].map((_, index) => (
          <svg
            key={index}
            className="w-4 h-4 text-[#111827] fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="flex-1">
        <p className="text-[#374151] text-[15px] leading-relaxed">
          {quote}
        </p>
      </blockquote>

      {/* Author Info */}
      <div className="flex flex-col gap-0.5 pt-2 border-t border-[#F3F4F6]">
        <p className="text-[#111827] font-medium text-[15px]">{name}</p>
        <p className="text-[#9CA3AF] text-[13px] uppercase tracking-wide font-medium">
          {title}
        </p>
      </div>
    </div>
  );
}

export default ReviewCard;
