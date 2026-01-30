"use client";
import { templates } from "@/data/templateData";
import { selectTemplate, resetResume } from "@/redux/slices/resumeSlice";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";

function Templates() {

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetResume());
  }, [dispatch]);

  const handleTemplate = (template) => {
    dispatch(selectTemplate(template));
    router.push('/builder');

  }

  return (
    <div className="container mx-auto mt-20 p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-black tracking-tight mb-3">
            Select Your Template
          </h2>
          <p className="text-lg text-gray-600 ">
            Choose from our collection of professional,{" "}
            <span className="text-primary font-semibold">
              100% ATS-friendly
            </span>{" "}
            designs tested by hiring managers.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-bold">
          <svg
            className="w-6 h-6 text-green-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M11.644 3.066a1 1 0 0 1 .712 0l7 2.666A1 1 0 0 1 20 6.68a17.694 17.694 0 0 1-2.023 7.98 17.406 17.406 0 0 1-5.402 6.158 1 1 0 0 1-1.15 0 17.405 17.405 0 0 1-5.403-6.157A17.695 17.695 0 0 1 4 6.68a1 1 0 0 1 .644-.949l7-2.666Zm4.014 7.187a1 1 0 0 0-1.316-1.506l-3.296 2.884-.839-.838a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.366.046l4-3.5Z"
              clipRule="evenodd"
            />
          </svg>
          ATS Optimized
        </div>
      </div>

      {/* <!-- Template Grid --> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8  mt-8">
        {/* <!-- Card 1 --> */}
        {templates.map((template) => (
          <div key={template.id} className="group flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-xl   dark:bg-white/5  shadow-sm group-hover:shadow-xl transition-all duration-300 border border-transparent group-hover:border-primary/30">
              <div
                className="relative w-full aspect-[3/4.2] rounded-lg bg-cover bg-center overflow-hidden"
              >

                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  className="object-cover"
                />
                {/* Overlay Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div>
                    <button onClick={() => handleTemplate(template.id)}
                      className="bg-[#1E1E1E] text-white px-6 py-3 rounded-lg font-bold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Use Template
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Templates;
