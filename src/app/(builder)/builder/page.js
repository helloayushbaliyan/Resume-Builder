"use client"
import Education from '@/components/forms/Education'
import PersonalDetils from '@/components/forms/PersonalDetils'
import Modern from '@/components/templates/Modern'
import Simple from '@/components/templates/Simple'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextStep, previousStep } from '@/redux/slices/resumeSlice'
import Experiences from '@/components/forms/Experiences'
import Skills from '@/components/forms/Skills'
import { useEffect, useRef } from 'react'
function builder() {


    const { selectedTemplate, step } = useSelector((state) => state.resume)
    const dispatch = useDispatch()
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

    useEffect(() => {
        formContainerRef.current?.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [step]);

    return (
        <div>
            <main className=" grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden">
                {/* <!-- Left Side: Live Preview (Sticky) --> */}
                <section className="hidden lg:flex  bg-[#e2e2ec] items-start justify-center overflow-y-auto p-12 hide-scrollbar">
                    {selectedTemplate === "simple" ? <Simple /> : <Modern />}
                </section>
                {/* <!-- Right Side: Editor Form --> */}
                <section ref={formContainerRef}
                    className="flex-1 overflow-y-auto relative bg-white p-6 md:p-12">
                    {step === 1 && <PersonalDetils key={step} />}
                    {step === 2 && <Education key={step} />}
                    {step === 3 && <Experiences key={step} />}
                    {step === 4 && <Skills key={step} />}


                    {/* <!-- Footer Navigation --> */}
                    <div className=" bg-white pt-6 flex justify-between">
                        <button onClick={handlePrevious} className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#4c4c9a] hover:text-[#0d0d1b] transition-colors">
                            Previous Step
                        </button>
                        <div className="flex items-center gap-4">
                            <button onClick={handleSubmit} className="flex items-center gap-2 px-8 py-3 bg-[#1617e8] text-white text-sm font-bold rounded-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-100 transition-all">
                                Save & Continue
                            </button>
                        </div>
                    </div>



                </section>
            </main>

        </div>
    )
}

export default builder