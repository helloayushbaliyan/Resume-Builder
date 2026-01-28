import React from "react";

function PersonalDetils() {
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
            style={{ width: "25%" }}
          ></div>
        </div>
      </div>
      {/* <!-- Page Heading --> */}
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-4xl font-black tracking-tight">Personal Details</h1>
        <p className="text-[#4c4c9a]"></p>
      </div>

      {/* detils form */}
      <div className="space-y-8 ">
        <div className="bg-[#f6f6f8]  border border-[#e7e7f3] rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                Full Name
              </label>
              <div className="relative">
                <input
                  className="w-full bg-white border-2 p-3 border-[#e7e7f3] rounded-xl focus:border-primary focus:ring-primary text-sm font-medium h-12"
                  placeholder="e.g. Alexander Hamilton"
                  type="text"
                />
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                Professional Title
              </label>
              <div className="relative">
                <input
                  className="w-full bg-white border-2 p-3 border-[#e7e7f3] rounded-xl focus:border-primary focus:ring-primary text-sm font-medium h-12"
                  placeholder="e.g. Senior Software Engineer"
                  type="text"
                />
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                Description{" "}
              </label>
              <div className="relative">
                <textarea
                  className="w-full h-[150px] resize-none bg-white border-2 p-3 border-[#e7e7f3] rounded-xl focus:border-primary focus:ring-primary text-sm font-medium "
                  placeholder="e.g. 5 years of experience in software development"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                Email Address
              </label>
              <div className="relative">
                <input
                  className="w-full bg-white border-2 p-3 border-[#e7e7f3] rounded-xl focus:border-primary focus:ring-primary text-sm font-medium h-12"
                  placeholder="name@example.com"
                  type="email"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                Phone Number
              </label>
              <div className="relative">
                <input
                  className="w-full bg-white border-2 p-3 border-[#e7e7f3] rounded-xl focus:border-primary focus:ring-primary text-sm font-medium h-12"
                  placeholder="+1 (555) 000-0000"
                  type="tel"
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
                  placeholder="e.g. New York, NY"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Footer Navigation --> */}
        <div className=" bg-white pt-6 flex justify-between">
          <button className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#4c4c9a] hover:text-[#0d0d1b] transition-colors">
            Previous Step
          </button>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-8 py-3 bg-[#1617e8] text-white text-sm font-bold rounded-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-100 transition-all">
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetils;
