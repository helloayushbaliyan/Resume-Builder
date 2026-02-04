"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "@/lib/supabase";

function FeedbackForm({ isOpen, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Get user data from Redux
  const personal = useSelector(
    (state) => state.resume?.resumeData?.personal || {},
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Combine Redux data + form data
    const feedbackData = {
      name: personal.name || null,
      role: personal.role || null,
      email: personal.email || null,
      rating: rating || null,
      feedback: feedback || null,
    };

    try {
      // Insert to Supabase
      const { data, error } = await supabase
        .from("feedbacks")
        .insert([feedbackData]);

      if (error) {
        console.error("Supabase error:", error);
      }

      // Show success message
      setSubmitted(true);

      // Call parent submit handler AFTER showing success
      onSubmit(feedbackData);

      // Reset form and close after 2 seconds
      setTimeout(() => {
        // Just reset internal state, don't call onClose (would trigger download again)
        setRating(0);
        setHoveredRating(0);
        setFeedback("");
        setSubmitted(false);
      }, 2000);
    } catch (err) {
      console.error("Submit error:", err);
      // Still show success to user even if there's an error
      setSubmitted(true);

      // Call submit anyway so download happens
      onSubmit(feedbackData);

      setTimeout(() => {
        setRating(0);
        setHoveredRating(0);
        setFeedback("");
        setSubmitted(false);
      }, 2000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset form
    setRating(0);
    setHoveredRating(0);
    setFeedback("");
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative animate-slideUp">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          aria-label="Close feedback form"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Form Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            // Success Message
            <div className="text-center py-8 animate-fadeIn">
              <div className="text-6xl mb-4">❤️</div>
              <h3 className="text-2xl font-black text-[#0d0d1b] mb-2">
                Thank you for your feedback!
              </h3>
              <p className="text-slate-600">
                Your input helps us improve ResumePro.
              </p>
            </div>
          ) : (
            <>
              {/* Greeting Header */}
              <div className="text-center mb-8">
                <div className="text-4xl sm:text-5xl mb-3">🎉</div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0d0d1b] tracking-tight mb-2">
                  Congratulations!
                  <br />
                  Your resume is ready
                </h2>
                <p className="text-slate-600 text-sm">
                  Your feedback helps us improve.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-semibold text-[#0d0d1b] mb-3 text-center">
                    How was your experience?{" "}
                    <span className="text-slate-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1617e8] rounded"
                        disabled={submitting}
                      >
                        <svg
                          className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors ${
                            star <= (hoveredRating || rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300 fill-current"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-center text-sm text-[#1617e8] mt-2 font-medium animate-fadeIn">
                      {rating === 5 && "Excellent! ⭐"}
                      {rating === 4 && "Great! 👍"}
                      {rating === 3 && "Good! 👌"}
                      {rating === 2 && "Thanks for sharing"}
                      {rating === 1 && "We'll do better"}
                    </p>
                  )}
                </div>

                {/* Feedback Description */}
                <div>
                  <label
                    htmlFor="feedback"
                    className="block text-sm font-semibold text-[#0d0d1b] mb-2"
                  >
                    Feedback{" "}
                    <span className="text-slate-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#0d0d1b] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1617e8] focus:border-transparent transition-all resize-none disabled:opacity-50"
                    placeholder="Tell us what you liked or what we can improve"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full px-6 py-4 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg transition-all cursor-pointer ${
                    submitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#1617e8] hover:bg-[#1417d8] hover:shadow-xl active:scale-[0.98]"
                  }`}
                >
                  {submitting ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default FeedbackForm;
