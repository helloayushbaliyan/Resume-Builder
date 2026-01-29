"use client"
import React, { useRef, useState, useEffect } from 'react'
import Simple from '@/components/templates/Simple'
import Modern from '@/components/templates/Modern'
import { useSelector } from 'react-redux'
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'
import { FaDownload } from "react-icons/fa";

function preview() {
    const { selectedTemplate } = useSelector((state) => state.resume)
    const resumeRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [scale, setScale] = useState(1);

    // Resume A4 Dimensions
    const A4_WIDTH_MM = 210;
    const A4_HEIGHT_MM = 297;
    const PX_PER_MM = 3.7795275591; // approx 96 DPI
    const A4_WIDTH_PX = Math.floor(A4_WIDTH_MM * PX_PER_MM); // ~794px

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

    const handleDownload = async () => {
        const element = resumeRef.current;
        if (!element) return;

        setLoading(true);

        try {
            const dataUrl = await toPng(element, {
                cacheBust: true,
                backgroundColor: '#ffffff',
                // Force dimensions for PDF quality
                width: A4_WIDTH_PX,
                height: Math.floor(A4_HEIGHT_MM * PX_PER_MM),
                style: {
                    transform: 'scale(1)', // Reset scale for capture
                    transformOrigin: 'top left'
                }
            });

            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Calculate aspect ratio to fit image exactly on PDF page
            const componentHeight = (A4_HEIGHT_MM * pdfWidth) / A4_WIDTH_MM;

            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, componentHeight);
            pdf.save('my-resume.pdf');
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col justify-center items-center min-h-screen bg-gray-100 relative">


            {/* Container for the scaled resume */}
            {/* Container for the scaled resume */}
            <section className="flex bg-[#e2e2ec] relative items-start justify-center overflow-y-auto p-8 hide-scrollbar w-full h-full">
                <div
                    style={{
                        width: `${A4_WIDTH_MM * scale}mm`,
                        height: `${A4_HEIGHT_MM * scale}mm`,
                        marginBottom: '5vh'
                    }}
                >
                    <div
                        ref={resumeRef}
                        style={{
                            transform: `scale(${scale})`,
                            transformOrigin: 'top left',
                            width: `${A4_WIDTH_MM}mm`,
                            minHeight: `${A4_HEIGHT_MM}mm`,
                        }}
                        className="shadow-2xl bg-white"
                    >
                        {selectedTemplate === "simple" ? <Simple /> : <Modern />}
                    </div>
                </div>
            </section>
            <button
                onClick={handleDownload}
                disabled={loading}
                className="z-50 mt-5  flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
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

export default preview