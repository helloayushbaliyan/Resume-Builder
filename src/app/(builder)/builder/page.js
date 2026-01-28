import PersonalDetils from '@/components/forms/PersonalDetils'
import Simple from '@/components/templates/Simple'
import React from 'react'

function builder() {
    return (
        <div>
            <main className=" grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden">
                {/* <!-- Left Side: Live Preview (Sticky) --> */}
                <section className="hidden lg:flex  bg-[#e2e2ec] items-start justify-center overflow-y-auto p-12 hide-scrollbar">
                    <Simple />
                </section>
                {/* <!-- Right Side: Editor Form --> */}
                <section className="flex-1 overflow-y-auto relative bg-white p-6 md:p-12">
                    <PersonalDetils />

                </section>
            </main>

        </div>
    )
}

export default builder