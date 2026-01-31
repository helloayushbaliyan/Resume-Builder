"use client"
import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'
import { FaDownload } from "react-icons/fa";
import { templates } from '@/data/templateData'
import { A4_WIDTH_PX, A4_HEIGHT_PX } from '@/components/layout/ResumePage'

/**
 * PreviewClient Component
 * 
 * Displays the resume preview and handles PDF export.
 * Supports multi-page resumes by capturing each page separately
 * and combining them into a single PDF document.
 */

function PreviewClient() {
    const { selectedTemplate } = useSelector((state) => state.resume)
    const resumeRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [scale, setScale] = useState(1);

    // Resume A4 Dimensions in mm
    const A4_WIDTH_MM = 210;
    const A4_HEIGHT_MM = 297;

    useEffect(() => {
        const handleResize = () => {
            const margin = 40; // Space around the resume
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

    /**
     * Handles multi-page PDF download
     * Captures each .resume-page element separately and adds to PDF
     */
    const handleDownload = async () => {
        const container = resumeRef.current;
        if (!container) return;

        setLoading(true);

        try {
            // Find all resume pages within the container
            const pages = container.querySelectorAll('.resume-page');

            if (pages.length === 0) {
                console.error("No resume pages found");
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

    return (
        <main className="flex flex-col justify-center items-center min-h-screen bg-gray-100 relative py-8">

            {/* Container for the scaled resume */}
            <section className="flex bg-[#e2e2ec] relative items-start justify-center overflow-y-auto p-8 hide-scrollbar w-full flex-1">
                <div
                    ref={resumeRef}
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'top center',
                        marginBottom: '2rem',
                    }}
                >
                    {/* Template renders multiple pages internally */}
                    <ActiveComponent />
                </div>
            </section>

            {/* Download Button */}
            <button
                onClick={handleDownload}
                disabled={loading}
                className="z-50 mt-5 mb-5 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
                {loading ? (
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                    <FaDownload />
                )}
                {loading ? "Generating..." : "Download PDF"}
            </button>
        </main>
    )
}

export default PreviewClient
