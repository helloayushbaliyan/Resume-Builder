import React from "react";
import { useSelector } from "react-redux";

const Modern = () => {
  const { personal, experience, education, skills } = useSelector(
    (state) => state.resume.resumeData,
  );

  return (
    <div className="w-full max-w-[600px] aspect-[1/1.414] bg-white rounded-sm resume-shadow flex flex-col relative overflow-hidden text-[#333]">
      {/* Header */}
      <div className="bg-[#f0ece6] p-8 flex items-center gap-6">
        {/* Placeholder Avatar */}
        <div className="w-24 h-24 bg-gray-300 rounded-full shrink-0 overflow-hidden">
          {/* If we had an image URL, we would use it here. For now, a placeholder. */}
          <svg
            className="w-full h-full text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-serif font-bold text-[#2d2d2d] mb-1">
            {personal?.name || "Your Name"}
          </h1>
          <p className="text-lg font-medium text-gray-600 mb-3">
            {personal?.role || "Professional Title"}
          </p>
          <div className="text-xs text-gray-500 space-y-1">
            {personal?.location && <p>{personal.location}</p>}
            {personal?.email && <p>{personal.email}</p>}
            {personal?.phone && <p>{personal.phone}</p>}
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left Column (Sidebar) */}
        <div className="w-1/3 bg-white p-6 pr-4 border-r border-gray-100">
          {/* Summary */}
          {personal?.summary && (
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#2d2d2d] mb-3 border-b-2 border-[#2d2d2d] pb-1 w-fit">
                Summary
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed text-justify">
                {personal.summary}
              </p>
            </div>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#2d2d2d] mb-3 border-b-2 border-[#2d2d2d] pb-1 w-fit">
                Skills
              </h3>
              <ul className="space-y-2">
                {skills.map((skill, index) => (
                  <li key={index} className="text-xs text-gray-600">
                    <span className="font-semibold block text-[#444]">
                      {skill.name}
                    </span>
                    {skill.level && (
                      <span className="text-gray-400 text-[10px]">
                        {skill.level}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column (Main Content) */}
        <div className="w-2/3 p-6 pl-6">
          {/* Experience */}
          {experience && experience.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#2d2d2d] mb-5">
                Experience
              </h3>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-sm font-bold text-[#2d2d2d]">
                        {exp.role}
                      </h4>
                      <span className="text-xs text-gray-500 italic">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-600 mb-2">
                      {exp.company}
                      {exp.location && ` - ${exp.location}`}
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#2d2d2d] mb-5">
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-sm font-bold text-[#2d2d2d]">
                        {edu.school}
                      </h4>
                      <span className="text-xs text-gray-500 italic">
                        {edu.startDate} – {edu.endDate}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{edu.degree}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modern;
