"use client"
import React, { useRef, useState } from 'react'
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

    const handleDownload = async () => {
        const element = resumeRef.current;
        if (!element) return;

        setLoading(true);

        try {
            // Use html-to-image instead of html2canvas
            const dataUrl = await toPng(element, { cacheBust: true, backgroundColor: '#ffffff' });

            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // html-to-image returns a dataURL, we can check dimensions from the element
            const imgWidth = element.offsetWidth;
            const imgHeight = element.offsetHeight;

            const componentWidth = pdfWidth;
            const componentHeight = (imgHeight * pdfWidth) / imgWidth;

            pdf.addImage(dataUrl, 'PNG', 0, 0, componentWidth, componentHeight);
            pdf.save('my-resume.pdf');
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className=" flex flex-col  justify-center items-center min-h-screen bg-gray-100">


            {/* <!-- Left Side: Live Preview (Sticky) --> */}
            <section className="flex bg-[#e2e2ec] relative items-start justify-center overflow-y-auto p-12 hide-scrollbar w-full h-full">
                <div ref={resumeRef} className="shadow-2xl">
                    {selectedTemplate === "simple" ? <Simple /> : <Modern />}
                </div>

                <button
                    onClick={handleDownload}
                    disabled={loading}
                    className=" z-50 fixed  right-5 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                    {loading ? (
                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    ) : (
                        <FaDownload />
                    )}
                    {loading ? "Generating..." : "Download PDF"}
                </button>
            </section>
        </main>
    )
}

export default preview