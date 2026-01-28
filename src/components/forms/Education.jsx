import React from "react";

function Education() {
  return (
    <div className="">
      {/* <!-- Breadcrumbs --> */}
      <div className="flex items-center gap-2 mb-6">
        <a
          className="text-sm font-medium text-[#4c4c9a] hover:text-primary transition-colors"
          href="#"
        >
          Profile
        </a>
      </div>
      {/* <!-- Progress Bar --> */}
      <div className="flex flex-col gap-2 mb-10">
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold uppercase tracking-wider text-[#4c4c9a]">
            Step 1 of 4
          </p>
          <p className="text-sm font-bold text-primary">25% Complete</p>
        </div>
        <div className="h-2 w-full bg-[#cfcfe7] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4c4c9a] rounded-full transition-all duration-500"
            style={{ width: "50%" }}
          ></div>
        </div>
      </div>
      {/* <!-- Page Heading --> */}
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-4xl font-black tracking-tight">Education</h1>
        <p className="text-[#4c4c9a]">
          Add your educational background to your resume.
        </p>
      </div>
      <div className="space-y-8">
        <div className="bg-[#f6f6f8] border border-[#e7e7f3] rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                School / University
              </label>
              <div className="relative">
                <input
                  className="w-full bg-white border-2 p-3 border-[#e7e7f3] rounded-xl focus:border-primary focus:ring-primary text-sm font-medium h-12"
                  placeholder="e.g. Harvard University"
                  type="text"
                />
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                Degree / Field of Study
              </label>
              <div className="relative">
                <input
                  className="w-full bg-white border-2 p-3 border-[#e7e7f3] rounded-xl focus:border-primary focus:ring-primary text-sm font-medium h-12"
                  placeholder="e.g. Bachelor of Science in Computer Science"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                Start Date
              </label>
              <div className="relative">
                <input
                  className="w-full bg-white border-2 p-3 border-[#e7e7f3] rounded-xl focus:border-primary focus:ring-primary text-sm font-medium h-12"
                  placeholder="MM/YYYY"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                End Date (or Expected)
              </label>
              <div className="relative">
                <input
                  className="w-full bg-white border-2 p-3 border-[#e7e7f3] rounded-xl focus:border-primary focus:ring-primary text-sm font-medium h-12"
                  placeholder="MM/YYYY"
                  type="text"
                />
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                Location
              </label>
              <div className="relative">
                <input
                  className="w-full bg-white border-2 p-3 border-[#e7e7f3] rounded-xl focus:border-primary focus:ring-primary text-sm font-medium h-12"
                  placeholder="e.g. Cambridge, MA"
                  type="text"
                />
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                Description / Achievements
              </label>
              <div className="relative">
                <textarea
                  className="w-full h-[150px] resize-none bg-white border-2 p-3 border-[#e7e7f3] rounded-xl focus:border-primary focus:ring-primary text-sm font-medium"
                  placeholder="e.g. Graduated with honors, GPA 3.8/4.0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
