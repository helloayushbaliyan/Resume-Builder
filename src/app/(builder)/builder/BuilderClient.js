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
    const { selectedTemplate, step, resumeData } = useSelector((state) => state.resume)
    const dispatch = useDispatch()
    const router = useRouter();

    const [error, setError] = useState("");

    const validateCurrentStep = useCallback(() => {
        setError(""); // Clear previous errors
        switch (step) {
            case 1: // Personal Details
                const { name, email, phone, role, location } = resumeData.personal || {};
                if (!name || !email || !phone || !role || !location) {
                    setError("Please fill in all required fields (Name, Email, Phone, Role, Location).");
                    return false;
                }
                return true;
            case 2: // Education
                if (!resumeData.education || resumeData.education.length === 0) {
                    setError("Please add at least one education entry.");
                    return false;
                }
                for (const edu of resumeData.education) {
                    if (!edu.school || !edu.degree || !edu.startDate || !edu.endDate) {
                        setError("Please fill in all fields for each education entry.");
                        return false;
                    }
                }
                return true;
            case 3: // Experience
                if (!resumeData.experience || resumeData.experience.length === 0) {
                    // Ensure at least one experience is added
                    setError("Please add at least one work experience.");
                    return false;
                }
                for (const exp of resumeData.experience) {
                    if (!exp.company || !exp.position || !exp.startDate || !exp.endDate || !exp.description) {
                        setError("Please fill in all fields for each experience entry.");
                        return false;
                    }
                }
                return true;
            case 4: // Skills
                if (!resumeData.skills || resumeData.skills.length === 0) {
                    setError("Please add at least one skill.");
                    return false;
                }
                for (const skill of resumeData.skills) {
                    if (!skill.skill) {
                        setError("Please ensure all skills are filled out.");
                        return false;
                    }
                }
                return true;
            default:
                return true;
        }
    }, [step, resumeData]);

    const handleSubmit = useCallback(() => {
        if (validateCurrentStep()) {
            if (step < 4) {
                dispatch(nextStep())
            }
        }
    }, [dispatch, step, validateCurrentStep])

    const handlePrevious = useCallback(() => {
        setError(""); // Clear error when going back
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

    // Scroll to top on step change and clear error
    useEffect(() => {
        formContainerRef.current?.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        setError("");
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

    const handleFinalSubmit = () => {
        if (validateCurrentStep()) {
            router.push("/preview");
        }
    };

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
                        <div className="flex flex-col gap-2 w-full">
                            {error && (
                                <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100 mb-2">
                                    {error}
                                </div>
                            )}
                            <div className="flex justify-between items-center w-full">
                                <button onClick={handlePrevious} className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#4c4c9a] hover:text-[#0d0d1b] transition-colors">
                                    <span className={`${step === 1 ? "hidden" : ""}`}>Previous Step</span>
                                </button>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={step === 4 ? handleFinalSubmit : handleSubmit}
                                        className="flex items-center gap-2 px-8 py-3 bg-[#1617e8] text-white text-sm font-bold rounded-lg hover:bg-[#1617e8]/90 transition-colors"
                                    >
                                        {step === 4 ? "Submit" : "Save & Continue"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default BuilderClient
