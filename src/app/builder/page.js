import React from 'react'

function builder() {
    return (
        <div>
            <main className="flex h-[calc(100vh-65px)] overflow-hidden">
                {/* <!-- Left Side: Live Preview (Sticky) --> */}
                <section className="hidden lg:flex w-[45%] bg-[#e2e2ec] items-start justify-center overflow-y-auto p-12 hide-scrollbar">
                    <div className="w-full max-w-[600px] aspect-[1/1.414] bg-white rounded-sm resume-shadow flex flex-col p-10 relative overflow-hidden">
                        {/* <!-- Resume Header Placeholder --> */}
                        <div className="border-b-2 border-primary pb-6 mb-6">
                            <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 w-64 bg-gray-100 rounded"></div>
                        </div>
                        {/* <!-- Work Experience Section Placeholder --> */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-primary text-lg">work</span>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Work Experience</h3>
                            </div>
                            {/* <!-- Experience Entry --> */}
                            <div className="mb-4 border-l-2 border-gray-100 pl-4">
                                <div className="flex justify-between items-start">
                                    <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                                    <div className="h-3 w-20 bg-gray-100 rounded"></div>
                                </div>
                                <div className="h-3 w-24 bg-gray-100 rounded mb-2"></div>
                                <div className="space-y-1">
                                    <div className="h-2 w-full bg-gray-50 rounded"></div>
                                    <div className="h-2 w-[90%] bg-gray-50 rounded"></div>
                                </div>
                            </div>
                            {/* <!-- Live Typing Indicator --> */}
                            <div className="mb-4 border-l-2 border-primary pl-4 relative">
                                <div className="flex justify-between items-start">
                                    <div className="h-4 w-40 bg-primary/10 rounded mb-1 border border-primary/20"></div>
                                    <div className="h-3 w-16 bg-gray-100 rounded"></div>
                                </div>
                                <div className="h-3 w-28 bg-gray-100 rounded mb-2"></div>
                                <div className="space-y-1">
                                    <div className="h-2 w-[95%] bg-primary/5 rounded"></div>
                                    <div className="h-2 w-[40%] bg-primary/5 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Skills Section Placeholder --> */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-primary text-lg">bolt</span>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Core Skills</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <div className="h-5 w-16 bg-primary/10 rounded-full border border-primary/20"></div>
                                <div className="h-5 w-20 bg-primary/10 rounded-full border border-primary/20"></div>
                                <div className="h-5 w-14 bg-primary/10 rounded-full border border-primary/20"></div>
                                <div className="h-5 w-24 bg-gray-100 rounded-full"></div>
                                <div className="h-5 w-16 bg-gray-100 rounded-full"></div>
                            </div>
                        </div>
                        {/* <!-- Watermark --> */}
                        <div className="absolute bottom-4 right-4 text-[10px] text-gray-300 font-bold uppercase tracking-tighter">
                            Built with ResumeBuilder Pro
                        </div>
                    </div>
                </section>
                {/* <!-- Right Side: Editor Form --> */}
                <section className="flex-1 overflow-y-auto bg-white p-6 md:p-12">
                    <div className="max-w-[720px] mx-auto">
                        {/* <!-- Breadcrumbs --> */}
                        <div className="flex items-center gap-2 mb-6">
                            <a className="text-sm font-medium text-[#4c4c9a] hover:text-primary transition-colors" href="#">Profile</a>
                            <span className="material-symbols-outlined text-sm text-[#4c4c9a]">chevron_right</span>
                            <span className="text-sm font-bold text-primary">Experience &amp; Skills</span>
                            <span className="material-symbols-outlined text-sm text-[#4c4c9a]">chevron_right</span>
                            <span className="text-sm font-medium text-[#4c4c9a]">Education</span>
                        </div>
                        {/* <!-- Progress Bar --> */}
                        <div className="flex flex-col gap-2 mb-10">
                            <div className="flex justify-between items-center">
                                <p className="text-sm font-bold uppercase tracking-wider text-[#4c4c9a]">Step 2 of 4</p>
                                <p className="text-sm font-bold text-primary">65% Complete</p>
                            </div>
                            <div className="h-2 w-full bg-[#cfcfe7] rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "65%" }}></div>
                            </div>
                        </div>
                        {/* <!-- Page Heading --> */}
                        <div className="flex flex-col gap-2 mb-10">
                            <h1 className="text-4xl font-black tracking-tight">Work Experience &amp; Skills</h1>
                            <p className="text-[#4c4c9a]">Detail your professional journey and the core competencies that set you apart.</p>
                        </div>
                        {/* <!-- Section: Work Experience --> */}
                        <div className="space-y-6 mb-12">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">business_center</span>
                                    Work Experience
                                </h2>
                                <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                                    <span className="material-symbols-outlined text-sm font-bold">add_circle</span>
                                    Add Experience
                                </button>
                            </div>
                            {/* <!-- Experience Card (Repeatable) --> */}
                            <div className="group relative bg-background-light border border-[#e7e7f3] rounded-xl p-6 transition-all hover:shadow-md">
                                <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                                    <span className="material-symbols-outlined text-[#4c4c9a]">drag_indicator</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">Job Title</label>
                                        <input className="w-full rounded-lg border-[#e7e7f3] focus:border-primary focus:ring-primary text-sm font-medium" type="text" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">Company</label>
                                        <input className="w-full rounded-lg border-[#e7e7f3] focus:border-primary focus:ring-primary text-sm" placeholder="e.g. Google" type="text" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">Start Date</label>
                                        <input className="w-full rounded-lg border-[#e7e7f3] focus:border-primary focus:ring-primary text-sm" type="month" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">End Date</label>
                                        <div className="flex items-center gap-2">
                                            <input className="flex-1 rounded-lg border-[#e7e7f3] bg-[#f0f0f5] text-sm" disabled="" placeholder="Present" type="month" />
                                            <label className="flex items-center gap-1 text-xs font-medium cursor-pointer">
                                                <input className="rounded text-primary focus:ring-primary" type="checkbox" />
                                                Current
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">Description &amp; Key Achievements</label>
                                        <div className="border border-[#e7e7f3] rounded-lg overflow-hidden bg-white">
                                            <div className="flex items-center gap-1 bg-[#f8f8fc] p-2 border-b border-[#e7e7f3]">
                                                <button className="p-1 hover:bg-white rounded transition-colors"><span className="material-symbols-outlined text-sm">format_bold</span></button>
                                                <button className="p-1 hover:bg-white rounded transition-colors"><span className="material-symbols-outlined text-sm">format_italic</span></button>
                                                <button className="p-1 hover:bg-white rounded transition-colors"><span className="material-symbols-outlined text-sm">format_list_bulleted</span></button>
                                                <div className="w-px h-4 bg-[#e7e7f3] mx-1"></div>
                                                <button className="text-[10px] font-bold text-primary flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                                                    <span className="material-symbols-outlined text-[12px]">magic_button</span>
                                                    AI Reword
                                                </button>
                                            </div>
                                            <textarea className="w-full border-none focus:ring-0 text-sm p-4" placeholder="Led the redesign of the mobile app resulting in 20% increase in user retention..." rows="4"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                                    <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
                            </div>
                            {/* <!-- Add Button --> */}
                            <button className="w-full py-4 border-2 border-dashed border-[#cfcfe7]  -xl flex items-center justify-center gap-2 text-[#4c4c9a] font-bold hover:bg-[#f8f8fc] transition-colors">
                                <span className="material-symbols-outlined">add</span>
                                Add Another Position
                            </button>
                        </div>
                        {/* <!-- Section: Skills --> */}
                        <div className="space-y-6 mb-20">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">bolt</span>
                                Technical &amp; Soft Skills
                            </h2>
                            <div className="bg-background-light border border-[#e7e7f3] rounded-xl p-6">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a] mb-3 block">Expertise Tags</label>
                                <div className="flex flex-wrap gap-2 mb-4 p-3 bg-white border border-[#e7e7f3] rounded-lg min-h-[100px] content-start">
                                    {/* <!-- Skill Tag --> */}
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                                        Figma
                                        <span className="material-symbols-outlined text-[14px] cursor-pointer">close</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                                        React Native
                                        <span className="material-symbols-outlined text-[14px] cursor-pointer">close</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                                        UI/UX Design
                                        <span className="material-symbols-outlined text-[14px] cursor-pointer">close</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                                        Project Management
                                        <span className="material-symbols-outlined text-[14px] cursor-pointer">close</span>
                                    </div>
                                    <input className="border-none focus:ring-0 text-sm p-0 ml-1 flex-1 min-w-[150px] bg-transparent" placeholder="Type and press Enter..." type="text" />
                                </div>
                                <p className="text-xs text-[#4c4c9a] italic">Suggested: TypeScript, Agile, Customer Success, Python</p>
                            </div>
                        </div>
                        {/* <!-- Footer Navigation --> */}
                        <div className="sticky bottom-0 bg-white pt-6 pb-8 border-t border-[#e7e7f3] flex items-center justify-between">
                            <button className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#4c4c9a] hover:text-[#0d0d1b] transition-colors">
                                <span className="material-symbols-outlined">arrow_back</span>
                                Previous Step
                            </button>
                            <div className="flex items-center gap-4">
                                <button className="px-6 py-3 text-sm font-bold text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                    Skip for now
                                </button>
                                <button className="flex items-center gap-2 px-8 py-3 bg-primary text-white text-sm font-bold rounded-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-100 transition-all">
                                    Save &amp; Continue
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </div>
    )
}

export default builder