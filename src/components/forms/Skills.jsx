import {
  addSkills,
  updateSkills,
  removeSkills,
} from "@/redux/slices/resumeSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Skills({ showError }) {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.resume.resumeData.skills);
  console.log(skills);

  const getInputClass = (value) => {
    return `w-full bg-white border-2 p-3 rounded-xl text-sm font-medium h-12 focus:ring-primary ${
      showError && !value
        ? "border-red-500 focus:border-red-500"
        : "border-[#e7e7f3] focus:border-primary"
    }`;
  };

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
            Step 4 of 4
          </p>
          <p className="text-sm font-bold text-primary">80% Complete</p>
        </div>
        <div className="h-2 w-full bg-[#cfcfe7] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4c4c9a] rounded-full transition-all duration-500"
            style={{ width: "80%" }}
          ></div>
        </div>
      </div>
      {/* <!-- Page Heading --> */}
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-4xl font-black tracking-tight">Skills</h1>
        <p className="text-[#4c4c9a]">
          Add your technical and professional skills to your resume.
        </p>
      </div>
      <div className="space-y-8">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-[#f6f6f8] border border-[#e7e7f3] rounded-xl p-8 relative"
          >
            {skills.length > 0 && (
              <button
                onClick={() => dispatch(removeSkills(skill.id))}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                title="Remove Skill"
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
                  Skill
                </label>
                <div className="relative">
                  <input
                    value={skill.skill}
                    onChange={(e) =>
                      dispatch(
                        updateSkills({
                          id: skill.id,
                          field: "skill",
                          value: e.target.value,
                        }),
                      )
                    }
                    className={getInputClass(skill.skill)}
                    placeholder="e.g. JavaScript, Project Management, UI Design"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => dispatch(addSkills())}
          className=" my-8 text-[#4c4c9a] hover:text-primary transition-colors px-6 py-3 rounded-xl border border-[#e7e7f3] hover:border-primary hover:bg-[#4c4c9a]/10 cursor-pointer"
        >
          + Add Skill
        </button>
      </div>
    </div>
  );
}

export default Skills;
