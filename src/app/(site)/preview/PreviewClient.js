"use client"
import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'
import { FaDownload } from "react-icons/fa";
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
        <main className="flex flex-col items-center min-h-screen bg-gray-100 relative py-6 md:py-8">

            {/* Scrollable Container */}
            <section className="flex  relative items-start justify-center p-4 md:p-8 hide-scrollbar w-full overflow-y-hidden py-20">

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
                            width: 'fit-content', // Allow it to take natural size
                        }}
                    >
                        <ActiveComponent />
                    </div>
                </div>
            </section>

            {/* Download Button */}
            <button
                onClick={handleDownloadClick}
                disabled={loading}
                className="z-50 mt-6 mb-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm md:text-base"
            >
                {loading ? (
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                    <FaDownload />
                )}
                {loading ? "Generating..." : "Download PDF"}
            </button>

            {/* Feedback Form Popup */}
            <FeedbackForm
                isOpen={showFeedback}
                onClose={handleFeedbackClose}
                onSubmit={handleFeedbackSubmit}
            />
        </main>
    )
}

export default PreviewClient
