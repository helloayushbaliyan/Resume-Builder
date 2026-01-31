import React from "react";
import { useSelector } from "react-redux";

function Simple() {
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
    <div className="w-[210mm] min-w-[210mm] aspect-[1/1.414] bg-white rounded-sm resume-shadow flex flex-col p-10 relative overflow-hidden text-[#333]">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-5 mb-5">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-1">
          {displayPersonal.name || "Your Name"}
        </h1>
        <p className="text-lg font-medium text-gray-600 mb-2">
          {displayPersonal.role || "Professional Title"}
        </p>
        <div className="flex justify-center items-center gap-3 text-xs text-gray-500 font-medium">
          {displayPersonal.location && <span>{displayPersonal.location}</span>}
          {displayPersonal.email && (
            <>
              {displayPersonal.location && <span>•</span>}
              <span>{displayPersonal.email}</span>
            </>
          )}
          {displayPersonal.phone && (
            <>
              {(displayPersonal.location || displayPersonal.email) && (
                <span>•</span>
              )}
              <span>{displayPersonal.phone}</span>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {displayPersonal.summary && (
        <div className="mb-6 section">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 text-center">
            Summary
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed text-justify">
            {displayPersonal.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {displayExperience && displayExperience.length > 0 && (
        <div className="mb-6 section">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-1 text-center">
            Experience
          </h3>
          <div className="space-y-4">
            {displayExperience.map((exp, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-sm font-bold text-gray-800">
                    {exp.role || exp.position}
                  </h4>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {exp.startDate} –{" "}
                    {exp.currentlyWorking ? "Present" : exp.endDate}
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
      {displayEducation && displayEducation.length > 0 && (
        <div className="mb-6 section">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-1 text-center">
            Education
          </h3>
          <div className="space-y-3">
            {displayEducation.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-gray-800">
                    {edu.school}
                  </h4>
                  <p className="text-xs text-gray-600 italic">{edu.degree}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {edu.startDate} –{" "}
                  {edu.currentlyStudying ? "Present" : edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {displayCertifications.length > 0 && (
        <div className="mb-6 section">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-1 text-center">
            Certifications
          </h3>
          <div className="space-y-3">
            {displayCertifications.map((cert, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-gray-800">
                    {cert.name}
                  </h4>
                  <p className="text-xs text-gray-600 italic">{cert.issuer}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {displayLanguages.length > 0 && (
        <div className="mb-6 section">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-1 text-center">
            Languages
          </h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {displayLanguages.map((lang, index) => (
              <li
                key={index}
                className="text-xs list-disc list-inside text-gray-700"
              >
                <span className="font-semibold">{lang.language}</span>
                {lang.proficiency && (
                  <span className="text-gray-500 text-[10px] ml-2">
                    ({lang.proficiency})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* References */}
      {displayReferences.length > 0 && (
        <div className="mb-6 section">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-1 text-center">
            References
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {displayReferences.map((ref, index) => (
              <div key={index}>
                <h4 className="text-sm font-bold text-gray-800">{ref.name}</h4>
                <p className="text-xs text-gray-600 italic">{ref.position}</p>
                <p className="text-xs text-gray-500 mt-1">{ref.email}</p>
                <p className="text-xs text-gray-500">{ref.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills (Rendered last or before references) */}
      {displaySkills && displaySkills.length > 0 && (
        <div className="section">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-100 pb-1 text-center">
            Skills
          </h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {displaySkills.map((skill, index) => (
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
