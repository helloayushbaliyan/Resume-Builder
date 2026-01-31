import React from "react";
import { useSelector } from "react-redux";

const Elegant = () => {
  const {
    personal,
    experience,
    education,
    skills,
    certifications,
    languages,
    references,
  } = useSelector((state) => state.resume.resumeData);

  const displayPersonal = personal || {};
  const displayExperience = experience || [];
  const displayEducation = education || [];
  const displaySkills = skills || [];
  const displayCertifications = certifications || [];
  const displayLanguages = languages || [];
  const displayReferences = references || [];

  return (
    <div className="w-[210mm] min-w-[210mm] aspect-[1/1.414] bg-white flex flex-col overflow-hidden text-[#333] shadow-lg font-sans relative">
      {/* Header Section */}
      <div className="bg-[#484848] text-white h-52 flex items-center print:bg-[#484848] relative">
        {/* Profile Details Container */}
        <div className="flex w-full h-full">
          {/* Photo Area (Left 33%) */}
          <div className="w-[33%] h-full flex items-center justify-center relative">
            <div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden shadow-md bg-gray-200 z-10">
              {displayPersonal.photo ? (
                <img
                  className="w-full h-full object-cover"
                  src={displayPersonal.photo}
                  alt="photo"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center p-2">
                  No Photo
                </div>
              )}
            </div>
          </div>

          {/* Name & Title (Right 67%) */}
          <div className="w-[67%] flex flex-col justify-center px-8">
            <h1 className="text-5xl font-bold uppercase tracking-wide mb-1 leading-none">
              {displayPersonal.name || "Richard Wilson"}
            </h1>
            <p className="text-xl font-light tracking-widest uppercase opacity-90">
              {displayPersonal.role || "Marketing Manager"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Sidebar (33%) */}
        <div className="w-[33%] pl-8 pr-4 py-8 border-r border-gray-100/50">
          {/* Contact */}
          {(displayPersonal.phone ||
            displayPersonal.email ||
            displayPersonal.location) && (
            <div className="mb-8">
              <h3 className="text-base font-bold uppercase tracking-wider text-[#484848] mb-4 border-b pb-1 border-gray-300">
                Contact
              </h3>
              <div className="space-y-3 text-sm text-gray-600 font-medium">
                {displayPersonal.phone && (
                  <div className="flex flex-col">
                    <span className="font-bold text-[#484848] text-xs uppercase mb-0.5">
                      Phone:
                    </span>
                    <span>{displayPersonal.phone}</span>
                  </div>
                )}
                {displayPersonal.email && (
                  <div className="flex flex-col">
                    <span className="font-bold text-[#484848] text-xs uppercase mb-0.5">
                      E-Mail:
                    </span>
                    <span className="break-all">{displayPersonal.email}</span>
                  </div>
                )}
                {displayPersonal.location && (
                  <div className="flex flex-col">
                    <span className="font-bold text-[#484848] text-xs uppercase mb-0.5">
                      Address:
                    </span>
                    <span>{displayPersonal.location}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Education */}
          {displayEducation && displayEducation.length > 0 && (
            <div className="mb-8">
              <h3 className="text-base font-bold uppercase tracking-wider text-[#484848] mb-4 border-b pb-1 border-gray-300">
                Education
              </h3>
              <div className="space-y-4">
                {displayEducation.map((edu, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    <p className="font-bold text-[#484848] leading-tight mb-0.5">
                      {edu.degree}
                    </p>
                    <p className="text-[#484848] font-medium mb-0.5">
                      {edu.school}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {edu.startDate} -{" "}
                      {edu.currentlyStudying ? "Present" : edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {displaySkills && displaySkills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-base font-bold uppercase tracking-wider text-[#484848] mb-4 border-b pb-1 border-gray-300">
                Skills
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                {displaySkills.map((skill, index) => (
                  <div key={index} className="block">
                    <span className="font-medium">{skill.skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {displayLanguages && displayLanguages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-base font-bold uppercase tracking-wider text-[#484848] mb-4 border-b pb-1 border-gray-300">
                Language
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {displayLanguages.map((lang, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#484848] rounded-full"></span>
                    <span className="font-medium">{lang.language}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Content (67%) */}
        <div className="w-[67%] px-8 py-8">
          {/* About Me */}
          {displayPersonal.summary && (
            <div className="mb-10">
              <h3 className="text-base font-bold uppercase tracking-wider text-[#484848] mb-4 border-b pb-1 border-gray-300">
                About Me
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed text-justify">
                {displayPersonal.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {displayExperience && displayExperience.length > 0 && (
            <div className="mb-10">
              <h3 className="text-base font-bold uppercase tracking-wider text-[#484848] mb-4 border-b pb-1 border-gray-300">
                Experience
              </h3>
              <div className="space-y-6">
                {displayExperience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-base font-bold text-[#484848]">
                        {exp.position}
                      </h4>
                      <span className="text-sm font-medium text-[#484848]">
                        {exp.startDate} –{" "}
                        {exp.currentlyWorking ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-500 mb-2 italic">
                      {exp.company} | {exp.location}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed text-justify">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications - Moved to right col as per flow, or keep here if it fits */}
          {displayCertifications && displayCertifications.length > 0 && (
            <div className="mb-10">
              <h3 className="text-base font-bold uppercase tracking-wider text-[#484848] mb-4 border-b pb-1 border-gray-300">
                Certifications
              </h3>
              <div className="space-y-3">
                {displayCertifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-start"
                  >
                    <div className="mb-1 sm:mb-0">
                      <h4 className="text-sm font-bold text-[#484848]">
                        {cert.name}
                      </h4>
                      <p className="text-xs text-gray-600 italic">
                        {cert.issuer}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {cert.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {displayReferences && displayReferences.length > 0 && (
            <div>
              <h3 className="text-base font-bold uppercase tracking-wider text-[#484848] mb-4 border-b pb-1 border-gray-300">
                References
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {displayReferences.map((ref, index) => (
                  <div key={index}>
                    <h4 className="text-sm font-bold text-[#484848]">
                      {ref.name}
                    </h4>
                    <p className="text-xs text-gray-600 font-semibold mb-1">
                      {ref.position}
                    </p>
                    <div className="text-xs text-gray-500 space-y-0.5">
                      {ref.phone && (
                        <div className="block">
                          <span className="font-bold">Phone: </span>
                          <span>{ref.phone}</span>
                        </div>
                      )}
                      {ref.email && (
                        <div className="block">
                          <span className="font-bold">Email: </span>
                          <span>{ref.email}</span>
                        </div>
                      )}
                    </div>
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

export default Elegant;
