import React from "react";

function Simple() {
  return (
    <div className="w-full max-w-[600px] aspect-[1/1.414] bg-white rounded-sm resume-shadow flex flex-col p-10 relative overflow-hidden">
      {/* <!-- Resume Header Placeholder --> */}
      <div className="border-b-2 border-primary pb-6 mb-6">
        <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-64 bg-gray-100 rounded"></div>
      </div>
      {/* <!-- Work Experience Section Placeholder --> */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary text-lg">
            work
          </span>
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
            Work Experience
          </h3>
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
          <span className="material-symbols-outlined text-primary text-lg">
            bolt
          </span>
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
            Core Skills
          </h3>
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
  );
}

export default Simple;
