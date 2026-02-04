"use client"
import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'
import { templates } from '@/data/templateData'
import { A4_WIDTH_PX, A4_HEIGHT_PX } from '@/components/layout/ResumePage'
import FeedbackForm from '@/components/FeedbackForm'

/**
 * PreviewClient Component
 * 
 * Displays the resume preview and handles PDF export.
 * Uses a responsive scaling strategy with dynamic height measurement
 * to ensure perfect layout on all screen sizes.
 */

function PreviewClient() {
    const { selectedTemplate } = useSelector((state) => state.resume)
    const resumeRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [scale, setScale] = useState(1);
    const [containerDimensions, setContainerDimensions] = useState({ width: A4_WIDTH_PX, height: A4_HEIGHT_PX });
    const [showFeedback, setShowFeedback] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Trigger entrance animation after mount
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Handle Window Resize to determine Scale Factor
    useEffect(() => {
        const handleResize = () => {
            const margin = 32; // 16px padding on each side (mobile)
            const availableWidth = window.innerWidth - margin;

            // If screen is smaller than A4 Width, scale down
            if (availableWidth < A4_WIDTH_PX) {
                setScale(availableWidth / A4_WIDTH_PX);
            } else {
                setScale(1);
            }
        };

        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Observer to measure the actual content size
    useEffect(() => {
        const element = resumeRef.current;
        if (!element) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                // Update container dimensions based on the unscaled content size
                setContainerDimensions({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height
                });
            }
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, [selectedTemplate]); // Re-attach if template changes (though ref stays same usually)


    /**
     * Handle download button click - show feedback form first
     */
    const handleDownloadClick = () => {
        setShowFeedback(true);
    };

    /**
     * Handle feedback form submission
     */
    const handleFeedbackSubmit = async (feedbackData) => {
        setShowFeedback(false);
        await performDownload();
    };

    /**
     * Handle feedback form close
     */
    const handleFeedbackClose = async () => {
        setShowFeedback(false);
        await performDownload();
    };

    /**
     * Handles multi-page PDF download
     * Captures each .resume-page element separately and adds to PDF
     */
    const performDownload = async () => {
        const container = resumeRef.current;
        if (!container) return;

        setLoading(true);

        try {
            // Find all resume pages within the container
            const pages = container.querySelectorAll('.resume-page');

            if (pages.length === 0) {
                alert("No pages found to export");
                setLoading(false);
                return;
            }

            // Create PDF document
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Capture each page and add to PDF
            for (let i = 0; i < pages.length; i++) {
                const page = pages[i];

                // Capture the page as PNG
                const dataUrl = await toPng(page, {
                    cacheBust: true,
                    backgroundColor: '#ffffff',
                    width: A4_WIDTH_PX,
                    height: A4_HEIGHT_PX,
                    style: {
                        transform: 'scale(1)',
                        transformOrigin: 'top left'
                    },
                    pixelRatio: 2 // Higher quality
                });

                // Add new page for pages after the first
                if (i > 0) {
                    pdf.addPage();
                }

                // Add image to current PDF page
                pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            }

            // Save the PDF
            pdf.save('my-resume.pdf');

        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Get the active template component
    const activeTemplate = templates.find((t) => t.id === selectedTemplate)
    const ActiveComponent = activeTemplate ? activeTemplate.component : templates[0]?.component;

    // Calculate wrapper dimensions based on content size and current scale
    const wrapperWidth = containerDimensions.width * scale;
    const wrapperHeight = containerDimensions.height * scale;

    return (
        <main className="relative min-h-screen overflow-hidden">
            {/* Layered Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/40 via-transparent to-transparent"></div>

            {/* Subtle grid pattern for depth */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            ></div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center min-h-screen py-12 md:py-16 lg:py-20">

                {/* Header area - subtle breathing room */}
                <div className="w-full max-w-4xl mx-auto px-6 mb-8 md:mb-12">
                    <div
                        className={`text-center transition-all duration-700 ease-out ${
                            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                    >
                        <p className="text-[15px] text-gray-500 font-medium">
                            Review your resume before downloading
                        </p>
                    </div>
                </div>

                {/* Resume Preview Stage */}
                <section
                    className={`relative flex items-start justify-center w-full px-4 md:px-8 transition-all duration-700 ease-out delay-150 ${
                        isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.98]'
                    }`}
                >
                    {/* Canvas/Stage wrapper - creates the premium framing */}
                    <div className="relative group">
                        {/* Outer glow effect */}
                        <div className="absolute -inset-4 bg-gradient-to-b from-gray-200/50 via-gray-100/30 to-gray-200/50 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                        {/* Main frame */}
                        <div className="relative bg-white rounded-xl shadow-[0_4px_40px_rgba(0,0,0,0.08)] border border-gray-200/80 p-3 md:p-4 transition-shadow duration-300 hover:shadow-[0_8px_50px_rgba(0,0,0,0.12)]">
                            {/* Inner border accent */}
                            <div className="absolute inset-3 md:inset-4 border border-gray-100 rounded-lg pointer-events-none"></div>

                            {/*
                                Sizing Wrapper
                                This div enforces the visual size in the DOM, preventing extra whitespace.
                            */}
                            <div
                                style={{
                                    width: wrapperWidth,
                                    height: wrapperHeight,
                                    position: 'relative'
                                }}
                            >
                                {/*
                                    Scaled Content
                                    Origin Top-Left ensures it aligns perfectly with the sizing wrapper.
                                */}
                                <div
                                    ref={resumeRef}
                                    style={{
                                        transform: `scale(${scale})`,
                                        transformOrigin: 'top left',
                                        width: 'fit-content',
                                    }}
                                >
                                    <ActiveComponent />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Download Action Area */}
                <div
                    className={`flex flex-col items-center mt-10 md:mt-14 mb-8 transition-all duration-700 ease-out delay-300 ${
                        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                >
                    <button
                        onClick={handleDownloadClick}
                        disabled={loading}
                        className="group relative flex items-center gap-3 bg-gray-900 hover:bg-gray-800 active:bg-gray-950 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg cursor-pointer"
                    >
                        {/* Button glow on hover */}
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                        <span className="relative flex items-center gap-3">
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                <svg
                                    className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            )}
                            <span className="text-[16px] font-semibold">
                                {loading ? "Preparing download..." : "Download PDF"}
                            </span>
                        </span>
                    </button>

                    {/* Reassuring microcopy */}
                    <p className="mt-4 text-[13px] text-gray-400 font-medium">
                        High-quality PDF · Print-ready · ATS-compatible
                    </p>
                </div>
            </div>

            {/* Feedback Form Popup */}
            <FeedbackForm
                isOpen={showFeedback}
                onClose={handleFeedbackClose}
                onSubmit={handleFeedbackSubmit}
            />

            {/* Reduced motion styles */}
            <style jsx>{`
                @media (prefers-reduced-motion: reduce) {
                    * {
                        transition-duration: 0.01ms !important;
                        animation-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </main>
    )
}

export default PreviewClient
