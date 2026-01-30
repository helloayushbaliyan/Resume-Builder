"use client"
import Education from '@/components/forms/Education'
import PersonalDetils from '@/components/forms/PersonalDetils'
import Modern from '@/components/templates/Modern'
import Simple from '@/components/templates/Simple'
import { useCallback, useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextStep, previousStep } from '@/redux/slices/resumeSlice'
import Experiences from '@/components/forms/Experiences'
import Skills from '@/components/forms/Skills'
import { useRouter } from 'next/navigation'

function BuilderClient() {
    const { selectedTemplate, step } = useSelector((state) => state.resume)
    const dispatch = useDispatch()
    const router = useRouter();

    const handleSubmit = useCallback(() => {
        if (step < 4) {
            dispatch(nextStep())
        }
    }, [dispatch, step])

    const handlePrevious = useCallback(() => {
        if (step > 1) {
            dispatch(previousStep())
        }
    }, [dispatch, step])

    const formContainerRef = useRef(null);
    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);

    // Resume A4 Dimensions
    const A4_WIDTH_MM = 210;
    const A4_HEIGHT_MM = 297;
    const PX_PER_MM = 3.7795275591;
    const A4_WIDTH_PX = Math.floor(A4_WIDTH_MM * PX_PER_MM); // ~794px

    // Scroll to top on step change
    useEffect(() => {
        formContainerRef.current?.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [step]);

    // Handle Scaling for Preview Section
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                const padding = 64; // Approx padding for comfortable view
                const availableWidth = containerWidth - padding;

                if (availableWidth < A4_WIDTH_PX) {
                    setScale(availableWidth / A4_WIDTH_PX);
                } else {
                    setScale(1);
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <main className="grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden">

                {/* <!-- Left Side: Live Preview (Sticky) --> */}
                <section
                    ref={containerRef}
                    className="hidden lg:flex bg-[#e2e2ec] items-start justify-center overflow-y-auto p-8 hide-scrollbar"
                >
                    <div
                        style={{
                            width: `${A4_WIDTH_MM * scale}mm`,
                            height: `${A4_HEIGHT_MM * scale}mm`,
                            marginBottom: '2rem'
                        }}
                    >
                        <div
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

                {/* <!-- Right Side: Editor Form --> */}
                {/* <!-- Right Side: Editor Form --> */}
                <section className="flex flex-col h-full bg-white relative overflow-hidden">
                    <div ref={formContainerRef} className="flex-1 overflow-y-auto p-6 md:p-12">
                        {step === 1 && <PersonalDetils key={step} />}
                        {step === 2 && <Education key={step} />}
                        {step === 3 && <Experiences key={step} />}
                        {step === 4 && <Skills key={step} />}
                    </div>

                    {/* <!-- Footer Navigation --> */}
                    <div className="bg-white p-6 border-t border-gray-100 z-10 w-full">
                        <div className="flex justify-between items-center w-full">
                            <button onClick={handlePrevious} className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#4c4c9a] hover:text-[#0d0d1b] transition-colors">
                                <span className={`${step === 1 ? "hidden" : ""}`}>Previous Step</span>
                            </button>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={step === 4 ? () => router.push("/preview") : handleSubmit}
                                    className="flex items-center gap-2 px-8 py-3 bg-[#1617e8] text-white text-sm font-bold rounded-lg"
                                >
                                    {step === 4 ? "Submit" : "Save & Continue"}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default BuilderClient
