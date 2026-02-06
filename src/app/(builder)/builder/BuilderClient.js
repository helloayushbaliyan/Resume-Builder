"use client"
import Education from '@/components/forms/Education'
import PersonalDetils from '@/components/forms/PersonalDetils'
import AdditionalDetails from '@/components/forms/AdditionalDetails'
import { useCallback, useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextStep, previousStep } from '@/redux/slices/resumeSlice'
import Experiences from '@/components/forms/Experiences'
import Projects from '@/components/forms/Projects'
import Skills from '@/components/forms/Skills'
import { useRouter } from 'next/navigation'
import { templates } from '@/data/templateData'
import NavigationGuard from '@/components/helper/NavigationGuard'

function BuilderClient() {
    const { selectedTemplate, step, resumeData } = useSelector((state) => state.resume)
    const dispatch = useDispatch()
    const router = useRouter();


    const [error, setError] = useState("");
    const [showErrors, setShowErrors] = useState(false);

    const formContainerRef = useRef(null);
    const containerRef = useRef(null);
    const resumeRef = useRef(null);
    const [scale, setScale] = useState(1);

    // Dynamic Step Configuration
    const STEPS = [
        {
            id: 'personal',
            label: 'Personal Details',
            component: PersonalDetils,
            description: "Get started with the basics.",
        },
        {
            id: 'education',
            label: 'Education',
            component: Education,
            description: "Add your educational background.",
        },
        {
            id: 'experience',
            label: 'Work Experience',
            component: Experiences,
            description: "Tell us about your professional history.",
        },
        {
            id: 'projects',
            label: 'Projects',
            component: Projects,
            description: "Showcase your work and side projects.",
        },
        {
            id: 'skills',
            label: 'Skills',
            component: Skills,
            description: "Highlight your key skills and expertise.",
        },
        {
            id: 'additional',
            label: 'Additional Details',
            component: AdditionalDetails,
            description: "Languages, Certifications, and more.",
        }
    ];

    const currentStepIndex = step - 1;
    const currentStepConfig = STEPS[currentStepIndex];
    const totalSteps = STEPS.length;
    const progressPercentage = Math.round((step / totalSteps) * 100);

    const validateCurrentStep = useCallback(() => {
        setError(""); // Clear previous errors

        const isQuillEmpty = (value) => {
            if (!value) return true;
            return value.replace(/<(.|\n)*?>/g, "").trim().length === 0;
        };

        // We can eventually move this validation logic to the step config object itself for full dynamism
        switch (step) {
            case 1: // Personal Details
                const { name, email, phone, role, location, summary } = resumeData.personal || {};

                // Basic validation, summary not strictly required by some, but good to have
                // User requirement said "mark fields as required", I'll enforce basic ones
                if (!name || !email || !phone || !role || !location || isQuillEmpty(summary)) {
                    setError("Please fill in all required fields marked with *.");
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
                        setError("Please fill in required fields for education.");
                        return false;
                    }
                }
                return true;
            case 3: // Experience
                // Optional
                for (const exp of resumeData.experience) {
                    if (
                        !exp.company ||
                        !exp.position ||
                        !exp.startDate ||
                        (!exp.endDate && !exp.currentlyWorking)
                    ) {
                        setError("Please fill in required fields for experience.");
                        return false;
                    }
                }
                return true;
            case 4: // Projects
                // Optional
                for (const proj of resumeData.projects) {
                    if (!proj.name || !proj.role || isQuillEmpty(proj.description)) {
                        setError("Please fill in required fields for projects (Name, Role, Description).");
                        return false;
                    }
                }
                return true;
            case 5: // Skills
                if (resumeData.skills.length > 0) {
                    // Check for empty strings if any
                }
                return true;
            default:
                return true;
        }
    }, [step, resumeData, setError]);

    const scrollToTop = useCallback(() => {
        if (formContainerRef.current) {
            formContainerRef.current.scrollTop = 0;
        }
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    const handleSubmit = useCallback(() => {
        if (validateCurrentStep()) {
            if (step < totalSteps) {
                dispatch(nextStep())
            }
        } else {
            setShowErrors(true);
            scrollToTop();
        }
    }, [dispatch, step, validateCurrentStep, totalSteps, scrollToTop])

    const handlePrevious = useCallback(() => {
        setError(""); // Clear error when going back
        setShowErrors(false);
        if (step > 1) {
            dispatch(previousStep())
        }
    }, [dispatch, step])



    // Resume A4 Dimensions
    const A4_WIDTH_MM = 210;
    const PX_PER_MM = 3.7795275591;
    const A4_WIDTH_PX = Math.floor(A4_WIDTH_MM * PX_PER_MM); // ~794px
    const A4_HEIGHT_PX = 1123; // Standard A4 height in pixels

    const [containerDimensions, setContainerDimensions] = useState({ width: A4_WIDTH_PX, height: A4_HEIGHT_PX });

    // Scroll to top on step change and clear error
    useEffect(() => {
        scrollToTop();
        setError("");
        setShowErrors(false);
    }, [step, scrollToTop]);

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
    }, [selectedTemplate]);

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

    // Calculate wrapper dimensions based on content size and current scale
    const wrapperWidth = containerDimensions.width * scale;
    const wrapperHeight = containerDimensions.height * scale;

    const CurrentFormCallback = currentStepConfig?.component;

    return (
        <div>
            <main className="grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden">

                {/* <-- Left Side: Live Preview (Sticky) --> */}
                <section
                    ref={containerRef}
                    className="hidden lg:flex bg-[#e2e2ec] items-start justify-center overflow-x-hidden lg:overflow-y-auto p-8 hide-scrollbar"
                >
                    {/* Sizing Wrapper */}
                    <div
                        style={{
                            width: wrapperWidth,
                            height: wrapperHeight, // This is dynamic based on content now
                            position: 'relative',
                            marginBottom: '2rem',
                        }}
                    >
                        {/* Scaled Content */}
                        <div
                            ref={resumeRef}
                            style={{
                                transform: `scale(${scale})`,
                                transformOrigin: 'top left',
                                width: 'fit-content',
                            }}
                        >
                            {/* Template renders its own pages now */}
                            {ActiveComponent ? <ActiveComponent /> : <div className="text-gray-500">Loading template...</div>}
                        </div>
                    </div>
                </section>

                {/* <!-- Right Side: Editor Form --> */}
                <section className="flex flex-col h-full bg-white relative overflow-hidden">
                    <div ref={formContainerRef} className="flex-1 overflow-y-auto p-6 md:p-12 hide-scrollbar">

                        {/* Centralized Progress Bar & Header */}
                        <div className="">
                            {/* Breadcrumbs (Static for now, or dynamic?) "Profile" was hardcoded */}
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-sm font-medium text-[#4c4c9a]">Resume / {currentStepConfig?.label}</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="flex flex-col gap-2 mb-10">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-bold uppercase tracking-wider text-[#4c4c9a]">
                                        Step {step} of {totalSteps}
                                    </p>
                                    <p className="text-sm font-bold text-primary">{progressPercentage}% Complete</p>
                                </div>
                                <div className="h-2 w-full bg-[#cfcfe7] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#4c4c9a] rounded-full transition-all duration-500"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Page Heading (If not in component, we can put it here too? 
                                 Original forms had their own H1s. The plan says "Refactor steps and progress bar".
                                 I'll leave the H1s in the components for now to avoid massive refactor of content, 
                                 or I can move them here. 
                                 Moving them here is cleaner for "Dynamic Steps". 
                                 Let's move the header here too.
                             */}
                            <div className="flex flex-col gap-2 mb-10">
                                <h1 className="text-4xl font-black tracking-tight">{currentStepConfig?.label}</h1>
                                <p className="text-[#4c4c9a]">{currentStepConfig?.description}</p>
                            </div>

                        </div>

                        {/* Dynamic Component Render */}
                        {CurrentFormCallback && <CurrentFormCallback key={step} showError={showErrors} />}

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
                                <button onClick={handlePrevious} className={`flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#4c4c9a] hover:text-[#0d0d1b] transition-colors ${step === 1 ? "opacity-50 cursor-not-allowed" : ""}`} disabled={step === 1}>
                                    Previous Step
                                </button>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={step === totalSteps ? handleFinalSubmit : handleSubmit}
                                        className="flex items-center gap-2 px-8 py-3 bg-[#1617e8] text-white text-sm font-bold rounded-lg hover:bg-[#1617e8]/90 transition-colors"
                                    >
                                        {step === totalSteps ? "Submit" : "Save & Continue"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <NavigationGuard /> */}
            </main>
        </div>
    )
}

export default BuilderClient
