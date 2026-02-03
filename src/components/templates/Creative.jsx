"use client";
import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import ResumePage, {
  A4_WIDTH_PX,
  USABLE_HEIGHT_PX,
  PAGE_PADDING_PX,
} from "@/components/layout/ResumePage";
import { MapPin, Mail, Phone, Link as LinkIcon } from "lucide-react";

/**
 * Creative Resume Template with Automatic Multi-Page Pagination
 *
 * Two-column layout with dark sidebar. Content dynamically
 * flows to additional pages when it exceeds A4 height.
 */

const SECTION_GAP = 24;

// ============================================================================
// SECTION COMPONENTS - LEFT SIDEBAR (Dark)
// ============================================================================

const PhotoSection = React.forwardRef(({ photo }, ref) => (
  <div className="">
    {photo ? (
      <div
        ref={ref}
        className="w-32 h-32 mx-auto bg-gray-400 rounded-full mb-12 overflow-hidden border-4 border-[#3e4b5e] shrink-0"
      >
        {photo ? (
          <img
            className="w-full h-full object-cover object-center"
            src={photo}
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
    ) : null}
  </div>
));
PhotoSection.displayName = "PhotoSection";

const ContactSection = React.forwardRef(({ personal }, ref) => (
  <div ref={ref} className="w-full mb-12">
    <h3 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-gray-500/50 pb-2 text-white">
      Contact
    </h3>
    <div className="space-y-4 text-sm font-light text-gray-300">
      {personal.phone && (
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <Phone size={14} />
          </div>
          <div>
            <p className="font-bold text-white text-xs uppercase mb-0.5 opacity-80">
              Phone
            </p>
            <p>{personal.phone}</p>
          </div>
        </div>
      )}
      {personal.email && (
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <Mail size={14} />
          </div>
          <div>
            <p className="font-bold text-white text-xs uppercase mb-0.5 opacity-80">
              Email
            </p>
            <p className="break-all">{personal.email}</p>
          </div>
        </div>
      )}
      {personal.location && (
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <MapPin size={14} />
          </div>
          <div>
            <p className="font-bold text-white text-xs uppercase mb-0.5 opacity-80">
              Address
            </p>
            <p>{personal.location}</p>
          </div>
        </div>
      )}
      {personal.socialLinks?.length > 0 && (
        <div className="pt-2 border-t border-gray-500/30 mt-2">
          {personal.socialLinks.map((link, index) => (
            <div
              key={link.id || index}
              className="flex items-start gap-3 mb-3 last:mb-0"
            >
              <div className="mt-1">
                <LinkIcon size={14} />
              </div>
              <div>
                <span className="break-all text-white transition-colors">
                  {link.url.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
));
ContactSection.displayName = "ContactSection";

const ExpertiseSection = React.forwardRef(({ skills }, ref) => {
  if (!skills || skills.length === 0) return null;
  return (
    <div ref={ref} className="w-full mb-10">
      <h3 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-gray-500/50 pb-2 text-white">
        Expertise
      </h3>
      <ul className="space-y-2 text-sm font-light text-gray-300">
        {skills.map((skill, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
});
ExpertiseSection.displayName = "ExpertiseSection";

const SidebarLanguagesSection = React.forwardRef(({ languages }, ref) => {
  if (!languages || languages.length === 0) return null;
  return (
    <div ref={ref} className="w-full mb-10">
      <h3 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-gray-500/50 pb-2 text-white">
        Languages
      </h3>
      <ul className="space-y-2 text-sm font-light text-gray-300">
        {languages.map((lang, index) => (
          <li key={index}>
            <div className="flex justify-between items-baseline">
              <span className="font-semibold text-white">{lang.language}</span>
              <span className="text-xs opacity-80">{lang.proficiency}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});
SidebarLanguagesSection.displayName = "SidebarLanguagesSection";

// ============================================================================
// SECTION COMPONENTS - RIGHT CONTENT (Light)
// ============================================================================

const HeaderSection = React.forwardRef(({ personal }, ref) => (
  <div ref={ref} className="mb-12">
    <h1 className="text-4xl font-extrabold text-[#2e3b4e] mb-2 uppercase tracking-wide leading-none">
      {personal.name || "Your Name"}
    </h1>
    <p className="text-lg text-gray-500 uppercase tracking-[0.2em] font-medium mb-6">
      {personal.role || "Professional Title"}
    </p>
    {personal.summary && (
      <div
        className="text-sm text-gray-600 leading-relaxed text-justify [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 wrap-break-word [&_li]:text-left"
        dangerouslySetInnerHTML={{ __html: personal.summary }}
      />
    )}
  </div>
));
HeaderSection.displayName = "HeaderSection";

const ExperienceHeader = React.forwardRef((props, ref) => (
  <div ref={ref} className="mb-6">
    <h3 className="text-xl font-bold text-[#2e3b4e] mb-2">Experience</h3>
    <div className="w-10 h-1 bg-[#2e3b4e]"></div>
  </div>
));
ExperienceHeader.displayName = "ExperienceHeader";

const ExperienceItem = React.forwardRef(({ exp, isFirst }, ref) => (
  <div ref={ref} className={`flex gap-6 ${!isFirst ? "mt-6" : ""}`}>
    <div className="w-24 text-xs font-bold text-gray-400 flex flex-col items-center shrink-0 pt-1">
      <span className="whitespace-nowrap">{exp.startDate}</span>
      <div className="h-full w-px bg-gray-300 my-1"></div>
      <span className="whitespace-nowrap">
        {exp.currentlyWorking ? "Present" : exp.endDate}
      </span>
    </div>
    <div className="pb-4 flex-1 min-w-0">
      <h4 className="text-lg font-bold text-[#2e3b4e] leading-snug">
        {exp.position}
      </h4>
      <p className="text-sm font-medium text-gray-500 italic mb-2">
        {exp.company}
      </p>
      <div
        className="text-sm text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 wrap-break-word [&_li]:text-left"
        dangerouslySetInnerHTML={{ __html: exp.description }}
      />
    </div>
  </div>
));
ExperienceItem.displayName = "ExperienceItem";

const ProjectsHeader = React.forwardRef((props, ref) => (
  <div ref={ref} className="mb-6 mt-10">
    <h3 className="text-xl font-bold text-[#2e3b4e] mb-2">Projects</h3>
    <div className="w-10 h-1 bg-[#2e3b4e]"></div>
  </div>
));
ProjectsHeader.displayName = "ProjectsHeader";

const ProjectItem = React.forwardRef(({ proj, isFirst }, ref) => (
  <div ref={ref} className={`flex gap-6 ${!isFirst ? "mt-6" : ""}`}>
    <div className="w-24 text-xs font-bold text-gray-400 flex flex-col items-center shrink-0 pt-1">
      <span className="whitespace-nowrap">{proj.startDate}</span>
      <div className="h-full w-px bg-gray-300 my-1"></div>
      <span className="whitespace-nowrap">
        {proj.currentlyWorking ? "Present" : proj.endDate}
      </span>
    </div>
    <div className="pb-4 flex-1 min-w-0">
      <h4 className="text-lg font-bold text-[#2e3b4e] leading-snug">
        {proj.name}
        {proj.link && (
          <a
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-xs font-normal text-blue-600 hover:underline"
          >
            [Link]
          </a>
        )}
      </h4>
      <p className="text-sm font-medium text-gray-500 italic mb-2">
        {proj.role}
      </p>
      <div
        className="text-sm text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 wrap-break-word [&_li]:text-left"
        dangerouslySetInnerHTML={{ __html: proj.description }}
      />
    </div>
  </div>
));
ProjectItem.displayName = "ProjectItem";

const EducationHeader = React.forwardRef((props, ref) => (
  <div ref={ref} className="mb-6 mt-10">
    <h3 className="text-xl font-bold text-[#2e3b4e] mb-2">Education</h3>
    <div className="w-10 h-1 bg-[#2e3b4e]"></div>
  </div>
));
EducationHeader.displayName = "EducationHeader";

const EducationItem = React.forwardRef(({ edu, isFirst }, ref) => (
  <div ref={ref} className={`flex gap-6 ${!isFirst ? "mt-6" : ""}`}>
    <div className="w-24 text-xs font-bold text-gray-400 flex flex-col items-center shrink-0 pt-1">
      <span className="whitespace-nowrap">{edu.startDate}</span>
      <div className="h-full w-px bg-gray-300 my-1"></div>
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
));
EducationItem.displayName = "EducationItem";

const CertificationsSection = React.forwardRef(({ certifications }, ref) => {
  if (!certifications || certifications.length === 0) return null;
  return (
    <div ref={ref} className="mt-10">
      <h3 className="text-xl font-bold text-[#2e3b4e] mb-2">Certifications</h3>
      <div className="w-10 h-1 bg-[#2e3b4e] mb-6"></div>
      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <div key={index} className="flex gap-6">
            <div className="w-24 text-xs font-bold text-gray-400 flex flex-col items-center shrink-0 pt-1">
              <span className="whitespace-nowrap">{cert.date}</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#2e3b4e] leading-snug">
                {cert.name}
              </h4>
              <p className="text-sm text-gray-600 italic">{cert.issuer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
CertificationsSection.displayName = "CertificationsSection";

const ReferencesSection = React.forwardRef(({ references }, ref) => {
  if (!references || references.length === 0) return null;
  return (
    <div ref={ref} className="mt-10">
      <h3 className="text-xl font-bold text-[#2e3b4e] mb-2">References</h3>
      <div className="w-10 h-1 bg-[#2e3b4e] mb-6"></div>
      <div className="grid grid-cols-2 gap-6">
        {references.map((refItem, index) => (
          <div key={index}>
            <h4 className="text-lg font-bold text-[#2e3b4e] leading-snug">
              {refItem.name}
            </h4>
            <p className="text-sm font-medium text-gray-500 italic mb-1">
              {refItem.position}
            </p>
            <p className="text-sm text-gray-600">{refItem.email}</p>
            <p className="text-sm text-gray-600">{refItem.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
});
ReferencesSection.displayName = "ReferencesSection";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const Creative = () => {
  const {
    personal,
    experience,
    projects,
    education,
    skills,
    certifications,
    languages,
    references,
  } = useSelector((state) => state.resume.resumeData);

  const displayPersonal = personal || {};
  const displayExperience = experience || [];
  const displayProjects = projects || [];
  const displayEducation = education || [];
  const displaySkills = skills || [];
  const displayCertifications = certifications || [];
  const displayLanguages = languages || [];
  const displayReferences = references || [];

  const [pages, setPages] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const measureContainerRef = useRef(null);
  const sectionRefs = useRef({});

  const mainSections = useMemo(() => {
    const result = [];

    // Header (name, role, summary)
    result.push({
      type: "header",
      key: "header",
      content: { personal: displayPersonal },
    });

    // Experience
    if (displayExperience.length > 0) {
      result.push({
        type: "experience-header",
        key: "experience-header",
        content: {},
      });
      displayExperience.forEach((exp, index) => {
        result.push({
          type: "experience-item",
          key: `experience-${index}`,
          content: { exp, isFirst: index === 0 },
        });
      });
    }

    // Projects
    if (displayProjects.length > 0) {
      result.push({
        type: "projects-header",
        key: "projects-header",
        content: {},
      });
      displayProjects.forEach((proj, index) => {
        result.push({
          type: "project-item",
          key: `project-${index}`,
          content: { proj, isFirst: index === 0 },
        });
      });
    }

    // Education
    if (displayEducation.length > 0) {
      result.push({
        type: "education-header",
        key: "education-header",
        content: {},
      });
      displayEducation.forEach((edu, index) => {
        result.push({
          type: "education-item",
          key: `education-${index}`,
          content: { edu, isFirst: index === 0 },
        });
      });
    }

    // Certifications
    if (displayCertifications.length > 0) {
      result.push({
        type: "certifications",
        key: "certifications",
        content: { certifications: displayCertifications },
      });
    }

    // References
    if (displayReferences.length > 0) {
      result.push({
        type: "references",
        key: "references",
        content: { references: displayReferences },
      });
    }

    return result;
  }, [
    displayPersonal,
    displayExperience,
    displayProjects, // Ensure projects is included
    displayEducation,
    displayCertifications,
    displayReferences,
  ]);

  const registerRef = useCallback((key, element) => {
    if (element) sectionRefs.current[key] = element;
  }, []);

  const renderSectionForMeasurement = (section) => {
    const { type, key, content } = section;
    switch (type) {
      case "header":
        return (
          <HeaderSection
            key={key}
            ref={(el) => registerRef(key, el)}
            personal={content.personal}
          />
        );
      case "experience-header":
        return (
          <ExperienceHeader key={key} ref={(el) => registerRef(key, el)} />
        );
      case "experience-item":
        return (
          <ExperienceItem
            key={key}
            ref={(el) => registerRef(key, el)}
            exp={content.exp}
            isFirst={content.isFirst}
          />
        );
      case "projects-header":
        return <ProjectsHeader key={key} ref={(el) => registerRef(key, el)} />;
      case "project-item":
        return (
          <ProjectItem
            key={key}
            ref={(el) => registerRef(key, el)}
            proj={content.proj}
            isFirst={content.isFirst}
          />
        );
      case "education-header":
        return <EducationHeader key={key} ref={(el) => registerRef(key, el)} />;
      case "education-item":
        return (
          <EducationItem
            key={key}
            ref={(el) => registerRef(key, el)}
            edu={content.edu}
            isFirst={content.isFirst}
          />
        );
      case "certifications":
        return (
          <CertificationsSection
            key={key}
            ref={(el) => registerRef(key, el)}
            certifications={content.certifications}
          />
        );
      case "references":
        return (
          <ReferencesSection
            key={key}
            ref={(el) => registerRef(key, el)}
            references={content.references}
          />
        );
      default:
        return null;
    }
  };

  const renderSection = (section) => {
    const { type, key, content } = section;
    switch (type) {
      case "header":
        return <HeaderSection key={key} personal={content.personal} />;
      case "experience-header":
        return <ExperienceHeader key={key} />;
      case "experience-item":
        return (
          <ExperienceItem
            key={key}
            exp={content.exp}
            isFirst={content.isFirst}
          />
        );
      case "projects-header":
        return <ProjectsHeader key={key} />;
      case "project-item":
        return (
          <ProjectItem
            key={key}
            proj={content.proj}
            isFirst={content.isFirst}
          />
        );
      case "education-header":
        return <EducationHeader key={key} />;
      case "education-item":
        return (
          <EducationItem
            key={key}
            edu={content.edu}
            isFirst={content.isFirst}
          />
        );
      case "certifications":
        return (
          <CertificationsSection
            key={key}
            certifications={content.certifications}
          />
        );
      case "references":
        return <ReferencesSection key={key} references={content.references} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        const measurements = mainSections.map((section) => {
          const element = sectionRefs.current[section.key];
          return { ...section, height: element ? element.offsetHeight : 0 };
        });

        const pageHeight = USABLE_HEIGHT_PX - 64; // Account for padding
        const paginatedPages = [];
        let currentPage = [];
        let currentPageHeight = 0;

        for (const section of measurements) {
          const gapHeight = currentPage.length > 0 ? SECTION_GAP : 0;
          const totalRequired = section.height + gapHeight;

          if (currentPageHeight + totalRequired <= pageHeight) {
            currentPage.push(section);
            currentPageHeight += totalRequired;
          } else {
            if (currentPage.length > 0) paginatedPages.push(currentPage);
            currentPage = [section];
            currentPageHeight = section.height;
          }
        }

        if (currentPage.length > 0) paginatedPages.push(currentPage);
        setPages(paginatedPages.length > 0 ? paginatedPages : [[]]);
        setIsReady(true);
      });
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [mainSections]);

  return (
    <>
      {/* Hidden measurement container */}
      <div
        ref={measureContainerRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          width: `${(A4_WIDTH_PX - PAGE_PADDING_PX * 2) * 0.65}px`,
          padding: 0,
          margin: 0,
        }}
        aria-hidden="true"
      >
        {mainSections.map(renderSectionForMeasurement)}
      </div>

      {/* Rendered pages */}
      <div
        className="resume-pages-container flex flex-col"
        style={{ gap: "32px" }}
      >
        {isReady ? (
          pages.map((pageSections, pageIndex) => (
            <ResumePage
              key={pageIndex}
              pageNumber={pageIndex + 1}
              isLast={pageIndex === pages.length - 1}
            >
              <div className="flex flex-row min-h-[1123px] -m-10">
                {/* Left Sidebar - only on first page */}
                {pageIndex === 0 && (
                  <div className="w-[35%] bg-[#2e3b4e] text-white p-8 flex flex-col pt-12">
                    <PhotoSection photo={displayPersonal.photo} />
                    <ContactSection personal={displayPersonal} />
                    <ExpertiseSection skills={displaySkills} />
                    <SidebarLanguagesSection languages={displayLanguages} />
                  </div>
                )}

                {/* Right Content */}
                <div
                  className={`${pageIndex === 0 ? "w-[65%]" : "w-full"} bg-white p-10 flex flex-col pt-16`}
                >
                  {pageSections.map(renderSection)}
                </div>
              </div>
            </ResumePage>
          ))
        ) : (
          <ResumePage pageNumber={1} isLast={true}>
            <div className="flex flex-row min-h-[1123px] -m-10">
              <div className="w-[35%] bg-[#2e3b4e] text-white p-8 flex flex-col pt-12">
                <PhotoSection photo={displayPersonal.photo} />
                <ContactSection personal={displayPersonal} />
                <ExpertiseSection skills={displaySkills} />
                <SidebarLanguagesSection languages={displayLanguages} />
              </div>
              <div className="w-[65%] bg-white p-10 flex flex-col pt-16">
                {mainSections.map(renderSection)}
              </div>
            </div>
          </ResumePage>
        )}
      </div>
    </>
  );
};

export default Creative;
