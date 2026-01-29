
"use client"
import React from 'react'
import Simple from '@/components/templates/Simple'
import Modern from '@/components/templates/Modern'
import { useSelector } from 'react-redux'
function preview() {
    const { selectedTemplate, step } = useSelector((state) => state.resume)
    return (
        <main className=" flex justify-center items-center">
            {/* <!-- Left Side: Live Preview (Sticky) --> */}
            <section className="hidden lg:flex  bg-[#e2e2ec] items-start justify-center overflow-y-auto p-12 hide-scrollbar">
                {selectedTemplate === "simple" ? <Simple /> : <Modern />}
            </section>
        </main>
    )
}

export default preview