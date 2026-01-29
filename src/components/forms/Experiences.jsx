import { addExperience, updateExperience } from "@/redux/slices/resumeSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Experiences() {
  const dispatch = useDispatch();
  const experience = useSelector((state) => state.resume.resumeData.experience);
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
            Step 3 of 4
          </p>
          <p className="text-sm font-bold text-primary">50% Complete</p>
        </div>
        <div className="h-2 w-full bg-[#cfcfe7] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4c4c9a] rounded-full transition-all duration-500"
            style={{ width: "75%" }}
          ></div>
        </div>
      </div>
      {/* <!-- Page Heading --> */}
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-4xl font-black tracking-tight">Work Experience</h1>
        <p className="text-[#4c4c9a]">
          Add your professional experience to your resume.
        </p>
      </div>

      <div className="space-y-8">
        {experience.map((exp) => (
          <div
            key={exp.id}
            className="bg-[#f6f6f8] border border-[#e7e7f3] rounded-xl p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                  Company Name
                </label>
                <div className="relative">
                  <input
                    value={exp.company}
                    onChange={(e) =>
                      dispatch(
                        updateExperience({
                          id: exp.id,
                          field: "company",
                          value: e.target.value,
                        }),
                      )
                    }
                    className="w-full bg-white border-2 p-3 border-[#e7e7f3] rounded-xl focus:border-primary focus:ring-primary text-sm font-medium h-12"
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
                    value={exp.position}
                    onChange={(e) =>
                      dispatch(
                        updateExperience({
                          id: exp.id,
                          field: "position",
                          value: e.target.value,
                        }),
                      )
                    }
                    className="w-full bg-white border-2 p-3 border-[#e7e7f3] rounded-xl focus:border-primary focus:ring-primary text-sm font-medium h-12"
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
                    value={exp.startDate}
                    onChange={(e) =>
                      dispatch(
                        updateExperience({
                          id: exp.id,
                          field: "startDate",
                          value: e.target.value,
                        }),
                      )
                    }
                    className="w-full bg-white border-2 p-3 border-[#e7e7f3] rounded-xl focus:border-primary focus:ring-primary text-sm font-medium h-12"
                    placeholder="MM/YYYY"
                    type="month"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                  End Date (or Present)
                </label>
                <div className="relative">
                  <input
                    value={exp.endDate}
                    onChange={(e) =>
                      dispatch(
                        updateExperience({
                          id: exp.id,
                          field: "endDate",
                          value: e.target.value,
                        }),
                      )
                    }
                    className="w-full bg-white border-2 p-3 border-[#e7e7f3] rounded-xl focus:border-primary focus:ring-primary text-sm font-medium h-12"
                    placeholder="MM/YYYY"
                    type="month"
                  />
                </div>
              </div>
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                  Key Responsibilities & Achievements
                </label>
                <div className="relative">
                  <textarea
                    value={exp.description}
                    onChange={(e) =>
                      dispatch(
                        updateExperience({
                          id: exp.id,
                          field: "description",
                          value: e.target.value,
                        }),
                      )
                    }
                    className="w-full h-[150px] resize-none bg-white border-2 p-3 border-[#e7e7f3] rounded-xl focus:border-primary focus:ring-primary text-sm font-medium"
                    placeholder="e.g. Led a team of 5 to develop a cloud-based infrastructure..."
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
