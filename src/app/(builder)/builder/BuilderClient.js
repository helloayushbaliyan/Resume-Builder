"use client"
import Education from '@/components/forms/Education'
import PersonalDetils from '@/components/forms/PersonalDetils'
import AdditionalDetails from '@/components/forms/AdditionalDetails'
import { useCallback, useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextStep, previousStep } from '@/redux/slices/resumeSlice'
import Experiences from '@/components/forms/Experiences'
import Skills from '@/components/forms/Skills'
import { useRouter } from 'next/navigation'
import { templates } from '@/data/templateData'

function BuilderClient() {
    const { selectedTemplate, step, resumeData } = useSelector((state) => state.resume)
    const dispatch = useDispatch()
    const router = useRouter();


    const [error, setError] = useState("");
    const [showErrors, setShowErrors] = useState(false);

    const validateCurrentStep = useCallback(() => {
        setError(""); // Clear previous errors
        switch (step) {
            case 1: // Personal Details
                const { name, email, phone, role, location, summary } = resumeData.personal || {};
                if (!name || !email || !phone || !role || !location || !summary) {
                    setError("Please fill in all required fields (Name, Email, Phone, Role, Location, Summary).");
                    return false;
                }
                return true;
            case 2: // Education
                if (!resumeData.education || resumeData.education.length === 0) {
                    setError("Please add at least one education entry.");
                    return false;
                }
                for (const edu of resumeData.education) {
                    if (
                        !edu.school ||
                        !edu.degree ||
                        !edu.startDate ||
                        (!edu.endDate && !edu.currentlyStudying)
                    ) {
                        setError("Please fill in all fields for each education entry.");
                        return false;
                    }
                }
                return true;
            case 3: // Experience
                if (!resumeData.experience || resumeData.experience.length === 0) {
                    return true;
                }
                for (const exp of resumeData.experience) {
                    if (
                        !exp.company ||
                        !exp.position ||
                        !exp.startDate ||
                        (!exp.description) ||
                        (!exp.endDate && !exp.currentlyWorking)
                    ) {
                        setError("Please fill in all fields for each experience entry.");
                        return false;
                    }
                }
                return true;
            case 4: // Skills
                if (!resumeData.skills || resumeData.skills.length === 0) {
                    return true;
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
    }, [step, resumeData, setError]);

    const handleSubmit = useCallback(() => {
        if (validateCurrentStep()) {
            if (step < 5) {
                dispatch(nextStep())
            }
        } else {
            setShowErrors(true);
        }
    }, [dispatch, step, validateCurrentStep])

    const handlePrevious = useCallback(() => {
        setError(""); // Clear error when going back
        setShowErrors(false);
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
        setShowErrors(false);
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
        } else {
            setShowErrors(true);
        }
    };


    // Resolve the selected template (ID or string fallback)
    const activeTemplate = templates.find((t) => t.id === selectedTemplate) || templates[0];

    const ActiveComponent = activeTemplate?.component;

    return (
        <div>
            <main className="grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden">

                {/* <-- Left Side: Live Preview (Sticky) --> */}
                {/* Supports multiple A4 pages stacked vertically */}
                <section
                    ref={containerRef}
                    className="hidden lg:flex bg-[#e2e2ec] items-start justify-center overflow-y-auto p-8 hide-scrollbar"
                >
                    <div
                        style={{
                            // Container scales to fit, but allows vertical scrolling for multiple pages
                            transform: `scale(${scale})`,
                            transformOrigin: 'top center',
                            marginBottom: '2rem',
                            paddingBottom: '2rem',
                        }}
                    >
                        {/* Template renders its own pages now - no fixed height wrapper */}
                        {ActiveComponent ? <ActiveComponent /> : <div className="text-gray-500">Loading template...</div>}
                    </div>
                </section>

                {/* <!-- Right Side: Editor Form --> */}
                {/* <!-- Right Side: Editor Form --> */}
                <section className="flex flex-col h-full bg-white relative overflow-hidden">
                    <div ref={formContainerRef} className="flex-1 overflow-y-auto p-6 md:p-12">
                        {step === 1 && <PersonalDetils key={step} showError={showErrors} />}
                        {step === 2 && <Education key={step} showError={showErrors} />}
                        {step === 3 && <Experiences key={step} showError={showErrors} />}
                        {step === 4 && <Skills key={step} showError={showErrors} />}
                        {step === 5 && <AdditionalDetails key={step} showError={showErrors} />}
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
                                        onClick={step === 5 ? handleFinalSubmit : handleSubmit}
                                        className="flex items-center gap-2 px-8 py-3 bg-[#1617e8] text-white text-sm font-bold rounded-lg hover:bg-[#1617e8]/90 transition-colors"
                                    >
                                        {step === 5 ? "Submit" : "Save & Continue"}
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
