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
  const [inputValue, setInputValue] = React.useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedInput = inputValue.trim();
      if (trimmedInput) {
        dispatch(addSkills(trimmedInput));
        setInputValue("");
      }
    } else if (e.key === "Backspace" && !inputValue && skills.length > 0) {
      dispatch(removeSkills(skills[skills.length - 1]));
    }
  };

  const removeSkill = (skillToRemove) => {
    dispatch(removeSkills(skillToRemove));
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
          Add your technical and professional skills to your resume. Press Enter
          to add a skill.
        </p>
      </div>

      <div
        className={`bg-white border-2 rounded-xl p-3 flex flex-wrap gap-2 min-h-[48px] focus-within:ring-primary focus-within:border-primary ${
          showError && skills.length === 0
            ? "border-red-500 focus-within:border-red-500"
            : "border-[#e7e7f3] focus-within:border-primary"
        }`}
      >
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-[#f0f0f5] text-[#4c4c9a] px-3 py-1.5 rounded-full text-sm font-medium"
          >
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(skill)}
              className="hover:text-red-500 transition-colors focus:outline-none"
              aria-label={`Remove ${skill}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-sm font-medium min-w-[150px] h-9"
          placeholder="Type a skill and press Enter..."
        />
      </div>
    </div>
  );
}

export default Skills;
