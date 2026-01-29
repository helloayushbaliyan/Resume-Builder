import React from "react";
import { useSelector } from "react-redux";

function Simple() {
  const { personal, experience, education, skills } = useSelector(
    (state) => state.resume.resumeData,
  );

  // Dummy Data
  const dummyPersonal = {
    name: "John Doe",
    role: "Software Engineer",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    location: "New York, USA",
    summary:
      "Passionate software engineer with 5+ years of experience in building scalable web applications. Proficient in JavaScript, React, and Node.js.",
  };

  const dummyExperience = [
    {
      role: "Senior Developer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      startDate: "2020",
      endDate: "Present",
      description:
        "Led a team of developers to build a cloud-based SaaS platform. Improved system performance by 40%.",
    },
    {
      role: "Web Developer",
      company: "Creative Agency",
      location: "New York, NY",
      startDate: "2018",
      endDate: "2020",
      description:
        "Developed responsive websites for various clients. Collaborated with designers to implement UI/UX best practices.",
    },
  ];

  const dummyEducation = [
    {
      school: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      startDate: "2014",
      endDate: "2018",
    },
  ];

  const dummySkills = [
    { skill: "JavaScript" },
    { skill: "React" },
    { skill: "Node.js" },
    { skill: "Python" },
    { skill: "SQL" },
  ];

  // Helper to check if object is empty
  const isEmpty = (obj) => {
    return !obj || Object.keys(obj).filter((k) => obj[k]).length === 0;
  };

  const displayPersonal = isEmpty(personal) ? dummyPersonal : personal;
  const displayExperience =
    !experience || experience.length === 0 ? dummyExperience : experience;
  const displayEducation =
    !education || education.length === 0 ? dummyEducation : education;
  const displaySkills = !skills || skills.length === 0 ? dummySkills : skills;

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
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
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
