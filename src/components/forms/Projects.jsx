import {
  addProject,
  updateProject,
  removeProject,
} from "@/redux/slices/resumeSlice";
import React from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import { useDispatch, useSelector } from "react-redux";

function Projects({ showError }) {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.resume.resumeData.projects);

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
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-[#f6f6f8] border border-[#e7e7f3] rounded-xl p-8 relative"
          >
            <button
              onClick={() => dispatch(removeProject(proj.id))}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              title="Remove Project"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                  Project Name *
                </label>
                <input
                  value={proj.name || ""}
                  onChange={(e) =>
                    dispatch(
                      updateProject({
                        id: proj.id,
                        field: "name",
                        value: e.target.value,
                      }),
                    )
                  }
                  className={getInputClass(proj.name)}
                  placeholder="e.g. E-commerce Platform"
                  type="text"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                  Role / Contribution (Optional)
                </label>
                <input
                  value={proj.role || ""}
                  onChange={(e) =>
                    dispatch(
                      updateProject({
                        id: proj.id,
                        field: "role",
                        value: e.target.value,
                      }),
                    )
                  }
                  className={getInputClass(proj.role)}
                  placeholder="e.g. Lead Developer"
                  type="text"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                  Technologies Used (Comma Separated)
                </label>
                <input
                  value={proj.technologies || ""}
                  onChange={(e) =>
                    dispatch(
                      updateProject({
                        id: proj.id,
                        field: "technologies",
                        value: e.target.value,
                      }),
                    )
                  }
                  className={getInputClass(proj.technologies)}
                  placeholder="e.g. React, Redux, Node.js"
                  type="text"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                  Link (Optional)
                </label>
                <input
                  value={proj.link || ""}
                  onChange={(e) =>
                    dispatch(
                      updateProject({
                        id: proj.id,
                        field: "link",
                        value: e.target.value,
                      }),
                    )
                  }
                  className={getInputClass(proj.link)}
                  placeholder="https://project-demo.com"
                  type="url"
                />
              </div>

              {/* Dates */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                  Start Date
                </label>
                <input
                  value={proj.startDate || ""}
                  onChange={(e) =>
                    dispatch(
                      updateProject({
                        id: proj.id,
                        field: "startDate",
                        value: e.target.value,
                      }),
                    )
                  }
                  className={getInputClass(proj.startDate)}
                  type="month"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                  End Date
                </label>
                <input
                  value={proj.endDate || ""}
                  disabled={proj.currentlyWorking}
                  onChange={(e) =>
                    dispatch(
                      updateProject({
                        id: proj.id,
                        field: "endDate",
                        value: e.target.value,
                      }),
                    )
                  }
                  className={getInputClass(proj.endDate)}
                  type="month"
                />
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={proj.currentlyWorking || false}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      dispatch(
                        updateProject({
                          id: proj.id,
                          field: "currentlyWorking",
                          value: isChecked,
                        }),
                      );
                      if (isChecked)
                        dispatch(
                          updateProject({
                            id: proj.id,
                            field: "endDate",
                            value: "",
                          }),
                        );
                    }}
                    id={`proj-current-${proj.id}`}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label
                    htmlFor={`proj-current-${proj.id}`}
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    Unfinished / Ongoing
                  </label>
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                  Description
                </label>
                <div className="relative">
                  <ReactQuill
                    theme="snow"
                    value={proj.description || ""}
                    onChange={(value) =>
                      dispatch(
                        updateProject({
                          id: proj.id,
                          field: "description",
                          value: value,
                        }),
                      )
                    }
                    className={`${getInputClass(
                      proj.description,
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
          onClick={() => dispatch(addProject())}
          className=" my-8 text-[#4c4c9a] hover:text-primary transition-colors px-6 py-3 rounded-xl border border-[#e7e7f3] hover:border-primary hover:bg-[#4c4c9a]/10 cursor-pointer"
        >
          + Add Project
        </button>
      </div>
    </div>
  );
}

export default Projects;
