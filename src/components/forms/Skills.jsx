import { addSkills, updateSkills } from "@/redux/slices/resumeSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Skills() {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.resume.resumeData.skills);
  console.log(skills);
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
          <p className="text-sm font-bold text-primary">100% Complete</p>
        </div>
        <div className="h-2 w-full bg-[#cfcfe7] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4c4c9a] rounded-full transition-all duration-500"
            style={{ width: "100%" }}
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
            className="bg-[#f6f6f8] border border-[#e7e7f3] rounded-xl p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                  Skill
                </label>
                <div className="relative">
                  <input
                    onChange={(e) =>
                      dispatch(
                        updateSkills({
                          id: skill.id,
                          field: "skill",
                          value: e.target.value,
                        }),
                      )
                    }
                    className="w-full bg-white border-2 p-3 border-[#e7e7f3] rounded-xl focus:border-primary focus:ring-primary text-sm font-medium h-12"
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
