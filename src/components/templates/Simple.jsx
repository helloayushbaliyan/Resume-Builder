import React from "react";
import { useSelector } from "react-redux";

function Simple() {
  const { personal, experience, education, skills } = useSelector(
    (state) => state.resume.resumeData,
  );

  return (
    <div className="w-full max-w-[600px] aspect-[1/1.414] bg-white rounded-sm resume-shadow flex flex-col p-10 relative overflow-hidden text-[#333]">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-5 mb-5">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-1">
          {personal?.name || "Your Name"}
        </h1>
        <p className="text-lg font-medium text-gray-600 mb-2">
          {personal?.role || "Professional Title"}
        </p>
        <div className="flex justify-center items-center gap-3 text-xs text-gray-500 font-medium">
          {personal?.location && <span>{personal.location}</span>}
          {personal?.email && (
            <>
              {personal.location && <span>•</span>}
              <span>{personal.email}</span>
            </>
          )}
          {personal?.phone && (
            <>
              {(personal.location || personal.email) && <span>•</span>}
              <span>{personal.phone}</span>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {personal?.summary && (
        <div className="mb-6 section">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 text-center">
            Summary
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed text-justify">
            {personal.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6 section">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-1 text-center">
            Experience
          </h3>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-sm font-bold text-gray-800">
                    {exp.role}
                  </h4>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-gray-600 italic">
                    {exp.company}
                  </span>
                  <span className="text-xs text-gray-400">{exp.location}</span>
                </div>
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
        <div className="mb-6 section">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-1 text-center">
            Education
          </h3>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-gray-800">
                    {edu.school}
                  </h4>
                  <p className="text-xs text-gray-600 italic">{edu.degree}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="section">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-100 pb-1 text-center">
            Skills
          </h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {skills.map((skill, index) => (
              <li
                key={index}
                className="text-xs list-disc list-inside text-gray-700"
              >
                <span className="font-semibold">{skill.skill}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Simple;
