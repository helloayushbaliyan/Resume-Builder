import {
  addExperience,
  updateExperience,
  removeExperience,
} from "@/redux/slices/resumeSlice";
import React from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import { useDispatch, useSelector } from "react-redux";

function Experiences({ showError }) {
  const dispatch = useDispatch();
  const experience = useSelector((state) => state.resume.resumeData.experience);

  const isQuillEmpty = (value) => {
    if (!value) return true;
    return value.replace(/<(.|\n)*?>/g, "").trim().length === 0;
  };

  const getInputClass = (value, isTextArea = false) => {
    const baseClass = isTextArea
      ? "w-full resize-none bg-white border-2 rounded-xl text-sm font-medium flex flex-col"
      : "w-full bg-white border-2 p-3 rounded-xl text-sm font-medium h-12";

    // For Text Area (Quill), we want specific height handling
    const heightClass = isTextArea ? "h-[200px]" : "";

    const isInvalid = showError && (isTextArea ? isQuillEmpty(value) : !value);

    return `${baseClass} ${heightClass} focus:ring-primary ${
      isInvalid
        ? "border-red-500 focus:border-red-500"
        : "border-[#e7e7f3] focus:border-primary"
    }`;
  };

  return (
    <div className="">
      <div className="space-y-8">
        {experience.map((exp) => (
          <div
            key={exp.id}
            className="bg-[#f6f6f8] border border-[#e7e7f3] rounded-xl p-8 relative"
          >
            {experience.length > 0 && (
              <button
                onClick={() => dispatch(removeExperience(exp.id))}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                title="Remove Experience"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    value={exp.company || ""}
                    onChange={(e) =>
                      dispatch(
                        updateExperience({
                          id: exp.id,
                          field: "company",
                          value: e.target.value,
                        }),
                      )
                    }
                    className={getInputClass(exp.company)}
                    placeholder="e.g. Google"
                    type="text"
                  />
                </div>
              </div>
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                  Job Title
                </label>
                <div className="relative">
                  <input
                    value={exp.position || ""}
                    onChange={(e) =>
                      dispatch(
                        updateExperience({
                          id: exp.id,
                          field: "position",
                          value: e.target.value,
                        }),
                      )
                    }
                    className={getInputClass(exp.position)}
                    placeholder="e.g. Senior Software Engineer"
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
                    value={exp.startDate || ""}
                    onChange={(e) =>
                      dispatch(
                        updateExperience({
                          id: exp.id,
                          field: "startDate",
                          value: e.target.value,
                        }),
                      )
                    }
                    className={getInputClass(exp.startDate)}
                    placeholder="MM/YYYY"
                    type="month"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                  End Date
                </label>
                <div className="relative">
                  <input
                    value={exp.endDate || ""}
                    disabled={exp.currentlyWorking}
                    onChange={(e) =>
                      dispatch(
                        updateExperience({
                          id: exp.id,
                          field: "endDate",
                          value: e.target.value,
                        }),
                      )
                    }
                    className={getInputClass(exp.endDate)}
                    placeholder="MM/YYYY"
                    type="month"
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={exp.currentlyWorking || false}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      dispatch(
                        updateExperience({
                          id: exp.id,
                          field: "currentlyWorking",
                          value: isChecked,
                        }),
                      );
                      if (isChecked) {
                        dispatch(
                          updateExperience({
                            id: exp.id,
                            field: "endDate",
                            value: "",
                          }),
                        );
                      }
                    }}
                    id={`currentlyWorking-${exp.id}`}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label
                    htmlFor={`currentlyWorking-${exp.id}`}
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    I currently work here
                  </label>
                </div>
              </div>
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                  Key Responsibilities & Achievements
                </label>
                <div className="relative">
                  <ReactQuill
                    theme="snow"
                    value={exp.description || ""}
                    onChange={(value) =>
                      dispatch(
                        updateExperience({
                          id: exp.id,
                          field: "description",
                          value: value,
                        }),
                      )
                    }
                    className={`${getInputClass(
                      exp.description,
                      true,
                    )} [&_.ql-toolbar]:border-none [&_.ql-container]:border-none`}
                    modules={{
                      toolbar: [
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["clean"],
                      ],
                      clipboard: {
                        matchVisual: false,
                      },
                    }}
                    formats={["bold", "italic", "underline", "strike", "list"]}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => dispatch(addExperience())}
          className=" my-8 text-[#4c4c9a] hover:text-primary transition-colors px-6 py-3 rounded-xl border border-[#e7e7f3] hover:border-primary hover:bg-[#4c4c9a]/10 cursor-pointer"
        >
          + Add Experience
        </button>
      </div>
    </div>
  );
}

export default Experiences;
