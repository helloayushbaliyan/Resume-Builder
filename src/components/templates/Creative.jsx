import React from "react";
import { useSelector } from "react-redux";

const Creative = () => {
  const { personal, experience, education, skills } = useSelector(
    (state) => state.resume.resumeData,
  );

  const displayPersonal = personal || {};
  const displayExperience = experience || [];
  const displayEducation = education || [];
  const displaySkills = skills || [];

  return (
    <div className="w-[210mm] min-w-[210mm] aspect-[1/1.414] bg-white flex flex-row overflow-hidden text-[#333] shadow-lg font-sans">
      {/* Left Column (Dark Sidebar) */}
      <div className="w-[35%] bg-[#2e3b4e] text-white p-8 flex flex-col pt-12">
        {/* Photo */}
        <div className="w-32 h-32 mx-auto bg-gray-400 rounded-full mb-12 overflow-hidden border-4 border-[#3e4b5e] shrink-0">
          {displayPersonal.photo ? (
            <img
              className="w-full h-full object-cover object-center"
              src={displayPersonal.photo}
              alt="photo"
            />
          ) : (
            <svg
              className="w-full h-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 0 018 0z" />
            </svg>
          )}
        </div>

        {/* Contact Section */}
        <div className="w-full mb-12">
          <h3 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-gray-500/50 pb-2 text-white">
            Contact
          </h3>
          <div className="space-y-4 text-sm font-light text-gray-300">
            {displayPersonal.phone && (
              <div>
                <p className="font-bold text-white text-xs uppercase mb-0.5 opacity-80">
                  Phone
                </p>
                <p>{displayPersonal.phone}</p>
              </div>
            )}
            {displayPersonal.email && (
              <div>
                <p className="font-bold text-white text-xs uppercase mb-0.5 opacity-80">
                  Email
                </p>
                <p className="break-all">{displayPersonal.email}</p>
              </div>
            )}
            {displayPersonal.location && (
              <div>
                <p className="font-bold text-white text-xs uppercase mb-0.5 opacity-80">
                  Address
                </p>
                <p>{displayPersonal.location}</p>
              </div>
            )}
          </div>
        </div>

        {/* Expertise / Skills Section */}
        {displaySkills && displaySkills.length > 0 && (
          <div className="w-full mb-10">
            <h3 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-gray-500/50 pb-2 text-white">
              Expertise
            </h3>
            <ul className="space-y-2 text-sm font-light text-gray-300">
              {displaySkills.map((skill, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span>
                  {skill.skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Column (Light Content) */}
      <div className="w-[65%] bg-white p-10 flex flex-col pt-16">
        {/* Header (Name & Role) */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-[#2e3b4e] mb-2 uppercase tracking-wide leading-none">
            {displayPersonal.name || "Your Name"}
          </h1>
          <p className="text-lg text-gray-500 uppercase tracking-[0.2em] font-medium mb-6">
            {displayPersonal.role || "Professional Title"}
          </p>
          {/* Summary */}
          {displayPersonal.summary && (
            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              {displayPersonal.summary}
            </p>
          )}
        </div>

        {/* Experience Section */}
        {displayExperience && displayExperience.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold text-[#2e3b4e] mb-2">
              Experience
            </h3>
            <div className="w-10 h-1 bg-[#2e3b4e] mb-6"></div>

            <div className="space-y-6">
              {displayExperience.map((exp, index) => (
                <div key={index} className="flex gap-6">
                  <div className="w-24 text-xs font-bold text-gray-400 flex flex-col items-center shrink-0 pt-1">
                    <span className="whitespace-nowrap">{exp.startDate}</span>
                    <div className="h-full w-[1px] bg-gray-300 my-1"></div>
                    <span className="whitespace-nowrap">
                      {exp.currentlyWorking ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="pb-4">
                    <h4 className="text-lg font-bold text-[#2e3b4e] leading-snug">
                      {exp.position}
                    </h4>
                    <p className="text-sm font-medium text-gray-500 italic mb-2">
                      {exp.company}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {displayEducation && displayEducation.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-[#2e3b4e] mb-2">Education</h3>
            <div className="w-10 h-1 bg-[#2e3b4e] mb-6"></div>

            <div className="space-y-6">
              {displayEducation.map((edu, index) => (
                <div key={index} className="flex gap-6">
                  <div className="w-24 text-xs font-bold text-gray-400 flex flex-col items-center shrink-0 pt-1">
                    <span className="whitespace-nowrap">{edu.startDate}</span>
                    <div className="h-full w-[1px] bg-gray-300 my-1"></div>
                    <span className="whitespace-nowrap">
                      {edu.currentlyStudying ? "Present" : edu.endDate}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#2e3b4e] leading-snug">
                      {edu.degree}
                    </h4>
                    <p className="text-sm text-gray-600 italic">{edu.school}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Creative;
