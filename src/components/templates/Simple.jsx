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

/**
 * Simple Resume Template with Automatic Multi-Page Pagination
 *
 * This template implements a production-ready pagination system that:
 * 1. Measures each section's real DOM height
 * 2. Distributes sections across multiple A4 pages
 * 3. Never clips or hides content
 * 4. Supports unlimited pages dynamically
 *
 * Compatible with PDF export via react-to-print, html2pdf, jsPDF
 */

// Section gap between items
const SECTION_GAP = 24;

// ============================================================================
// SECTION COMPONENTS
// Each section is extracted as a separate component for measurement
// ============================================================================

/**
 * Header Section - Always appears first on Page 1
 */
import { MapPin, Mail, Phone, Globe, Link as LinkIcon } from "lucide-react";

/**
 * Header Section - Always appears first on Page 1
 */
const HeaderSection = React.forwardRef(({ personal }, ref) => (
  <div ref={ref} className="text-center border-b-2 border-gray-300 pb-5 mb-5">
    <h1 className="text-3xl font-bold uppercase tracking-wide mb-1">
      {personal.name || "Your Name"}
    </h1>
    <p className="text-lg font-medium text-gray-600 mb-2">
      {personal.role || "Professional Title"}
    </p>
    <div className="flex justify-center items-center gap-3 text-xs text-gray-500 font-medium flex-wrap">
      {personal.location && (
        <div className="flex items-center gap-1">
          <MapPin size={12} />
          <span>{personal.location}</span>
        </div>
      )}
      {personal.email && (
        <div className="flex items-center gap-1">
          {personal.location && <span className="text-gray-300">•</span>}
          <Mail size={12} />
          <span>{personal.email}</span>
        </div>
      )}
      {personal.phone && (
        <div className="flex items-center gap-1">
          {(personal.location || personal.email) && (
            <span className="text-gray-300">•</span>
          )}
          <Phone size={12} />
          <span>{personal.phone}</span>
        </div>
      )}
      {personal.socialLinks?.map((link, index) => (
        <div key={link.id || index} className="flex items-center gap-1">
          <span className="text-gray-300">•</span>
          <LinkIcon size={12} />
          <span className="break-all">
            {link.url.replace(/^https?:\/\/(www\.)?/, "")}
          </span>
        </div>
      ))}
    </div>
  </div>
));
HeaderSection.displayName = "HeaderSection";

/**
 * Summary Section
 */
const SummarySection = React.forwardRef(({ summary }, ref) => {
  if (!summary) return null;
  return (
    <div ref={ref} className="mb-6 section">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 text-center">
        Summary
      </h3>
      <div
        className="text-sm text-gray-700 leading-relaxed text-justify [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 wrap-break-word whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
    </div>
  );
});
SummarySection.displayName = "SummarySection";

/**
 * Experience Section Header
 */
const ExperienceHeader = React.forwardRef((props, ref) => (
  <div ref={ref} className="mb-4">
    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-1 text-center">
      Experience
    </h3>
  </div>
));
ExperienceHeader.displayName = "ExperienceHeader";

/**
 * Single Experience Item - Each item can move to a new page independently
 */
const ExperienceItem = React.forwardRef(({ exp, isFirst }, ref) => (
  <div ref={ref} className={`flex flex-col ${!isFirst ? "mt-4" : ""}`}>
    <div className="flex justify-between items-baseline mb-1">
      <h4 className="text-sm font-bold text-gray-800">
        {exp.role || exp.position}
      </h4>
      <span className="text-xs text-gray-500 whitespace-nowrap">
        {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
      </span>
    </div>
    <div className="flex justify-between items-center mb-2">
      <span className="text-xs font-semibold text-gray-600 italic">
        {exp.company}
      </span>
      <span className="text-xs text-gray-400">{exp.location}</span>
    </div>
    <div
      className="text-xs text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 wrap-break-word whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: exp.description }}
    />
  </div>
));
ExperienceItem.displayName = "ExperienceItem";

/**
 * Projects Section Header
 */
const ProjectsHeader = React.forwardRef((props, ref) => (
  <div ref={ref} className="mb-4">
    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-1 text-center">
      Projects
    </h3>
  </div>
));
ProjectsHeader.displayName = "ProjectsHeader";

/**
 * Single Project Item
 */
const ProjectItem = React.forwardRef(({ proj, isFirst }, ref) => (
  <div ref={ref} className={`flex flex-col ${!isFirst ? "mt-4" : ""}`}>
    <div className="flex justify-between items-baseline mb-1">
      <h4 className="text-sm font-bold text-gray-800">
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
      <span className="text-xs text-gray-500 whitespace-nowrap">
        {proj.startDate} – {proj.currentlyWorking ? "Present" : proj.endDate}
      </span>
    </div>
    <div className="flex justify-between items-center mb-2">
      <span className="text-xs font-semibold text-gray-600 italic">
        {proj.role}
      </span>
    </div>
    <div
      className="text-xs text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 wrap-break-word whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: proj.description }}
    />
  </div>
));
ProjectItem.displayName = "ProjectItem";

/**
 * Education Section Header
 */
const EducationHeader = React.forwardRef((props, ref) => (
  <div ref={ref} className="mb-4">
    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-1 text-center">
      Education
    </h3>
  </div>
));
EducationHeader.displayName = "EducationHeader";

/**
 * Single Education Item
 */
const EducationItem = React.forwardRef(({ edu, isFirst }, ref) => (
  <div
    ref={ref}
    className={`flex justify-between items-start ${!isFirst ? "mt-3" : ""}`}
  >
    <div>
      <h4 className="text-sm font-bold text-gray-800">{edu.school}</h4>
      <p className="text-xs text-gray-600 italic">{edu.degree}</p>
    </div>
    <span className="text-xs text-gray-500 whitespace-nowrap">
      {edu.startDate} – {edu.currentlyStudying ? "Present" : edu.endDate}
    </span>
  </div>
));
EducationItem.displayName = "EducationItem";

/**
 * Certifications Section
 */
const CertificationsSection = React.forwardRef(({ certifications }, ref) => {
  if (!certifications || certifications.length === 0) return null;
  return (
    <div ref={ref} className="mb-6 section">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-1 text-center">
        Certifications
      </h3>
      <div className="space-y-3">
        {certifications.map((cert, index) => (
          <div key={index} className="flex justify-between items-start">
            <div>
              <h4 className="text-sm font-bold text-gray-800">{cert.name}</h4>
              <p className="text-xs text-gray-600 italic">{cert.issuer}</p>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {cert.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});
CertificationsSection.displayName = "CertificationsSection";

/**
 * Languages Section
 */
const LanguagesSection = React.forwardRef(({ languages }, ref) => {
  if (!languages || languages.length === 0) return null;
  return (
    <div ref={ref} className="mb-6 section">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-1 text-center">
        Languages
      </h3>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
        {languages.map((lang, index) => (
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
  );
});
LanguagesSection.displayName = "LanguagesSection";

/**
 * References Section
 */
const ReferencesSection = React.forwardRef(({ references }, ref) => {
  if (!references || references.length === 0) return null;
  return (
    <div ref={ref} className="mb-6 section">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-1 text-center">
        References
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {references.map((refItem, index) => (
          <div key={index}>
            <h4 className="text-sm font-bold text-gray-800">{refItem.name}</h4>
            <p className="text-xs text-gray-600 italic">{refItem.position}</p>
            <p className="text-xs text-gray-500 mt-1">{refItem.email}</p>
            <p className="text-xs text-gray-500">{refItem.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
});
ReferencesSection.displayName = "ReferencesSection";

/**
 * Skills Section
 */
const SkillsSection = React.forwardRef(({ skills }, ref) => {
  if (!skills || skills.length === 0) return null;
  return (
    <div ref={ref} className="section">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-100 pb-1 text-center">
        Skills
      </h3>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="text-xs list-disc list-inside text-gray-700"
          >
            <span className="font-semibold">{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});
SkillsSection.displayName = "SkillsSection";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

function Simple() {
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

  // Fallback to empty values
  const displayPersonal = personal || {};
  const displayExperience = experience || [];
  const displayProjects = projects || [];
  const displayEducation = education || [];
  const displaySkills = skills || [];
  const displayCertifications = certifications || [];
  const displayLanguages = languages || [];
  const displayReferences = references || [];

  // State for pagination
  const [pages, setPages] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const measureContainerRef = useRef(null);
  const sectionRefs = useRef({});

  /**
   * Build the sections array for measurement
   * Each section is an object with type, content, and key
   */
  const sections = useMemo(() => {
    const result = [];

    // Header is always first
    result.push({
      type: "header",
      key: "header",
      content: { personal: displayPersonal },
    });

    // Summary
    if (displayPersonal.summary) {
      result.push({
        type: "summary",
        key: "summary",
        content: { summary: displayPersonal.summary },
      });
    }

    // Experience - split into header + individual items
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

    // Education - split into header + individual items
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

    // Projects - split into header + individual items
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

    // Certifications as single section
    if (displayCertifications.length > 0) {
      result.push({
        type: "certifications",
        key: "certifications",
        content: { certifications: displayCertifications },
      });
    }

    // Languages as single section
    if (displayLanguages.length > 0) {
      result.push({
        type: "languages",
        key: "languages",
        content: { languages: displayLanguages },
      });
    }

    // References as single section
    if (displayReferences.length > 0) {
      result.push({
        type: "references",
        key: "references",
        content: { references: displayReferences },
      });
    }

    // Skills as single section
    if (displaySkills.length > 0) {
      result.push({
        type: "skills",
        key: "skills",
        content: { skills: displaySkills },
      });
    }

    return result;
  }, [
    displayPersonal,
    displayExperience,
    displayProjects,
    displayEducation,
    displaySkills,
    displayCertifications,
    displayLanguages,
    displayReferences,
  ]);

  /**
   * Register a ref for a section
   */
  const registerRef = useCallback((key, element) => {
    if (element) {
      sectionRefs.current[key] = element;
    }
  }, []);

  /**
   * Render a section for measurement (hidden container)
   */
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
      case "summary":
        return (
          <SummarySection
            key={key}
            ref={(el) => registerRef(key, el)}
            summary={content.summary}
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
      case "languages":
        return (
          <LanguagesSection
            key={key}
            ref={(el) => registerRef(key, el)}
            languages={content.languages}
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
      case "skills":
        return (
          <SkillsSection
            key={key}
            ref={(el) => registerRef(key, el)}
            skills={content.skills}
          />
        );
      default:
        return null;
    }
  };

  /**
   * Render a section for final display
   */
  const renderSection = (section) => {
    const { type, key, content } = section;

    switch (type) {
      case "header":
        return <HeaderSection key={key} personal={content.personal} />;
      case "summary":
        return <SummarySection key={key} summary={content.summary} />;
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
      case "languages":
        return <LanguagesSection key={key} languages={content.languages} />;
      case "references":
        return <ReferencesSection key={key} references={content.references} />;
      case "skills":
        return <SkillsSection key={key} skills={content.skills} />;
      default:
        return null;
    }
  };

  /**
   * Pagination effect - measures sections and distributes to pages
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        // Measure all sections
        const measurements = sections.map((section) => {
          const element = sectionRefs.current[section.key];
          return {
            ...section,
            height: element ? element.offsetHeight : 0,
          };
        });

        // Bin-packing algorithm to distribute sections
        const paginatedPages = [];
        let currentPage = [];
        let currentPageHeight = 0;
        const maxHeight = USABLE_HEIGHT_PX;

        for (const section of measurements) {
          const sectionHeight = section.height;
          const gapHeight = currentPage.length > 0 ? SECTION_GAP : 0;
          const totalRequired = sectionHeight + gapHeight;

          if (currentPageHeight + totalRequired <= maxHeight) {
            currentPage.push(section);
            currentPageHeight += totalRequired;
          } else {
            // Start new page
            if (currentPage.length > 0) {
              paginatedPages.push(currentPage);
            }
            currentPage = [section];
            currentPageHeight = sectionHeight;
          }
        }

        // Add final page
        if (currentPage.length > 0) {
          paginatedPages.push(currentPage);
        }

        setPages(paginatedPages.length > 0 ? paginatedPages : [[]]);
        setIsReady(true);
      });
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [sections]);

  return (
    <>
      {/* Hidden measurement container - required for DOM height calculation */}
      <div
        ref={measureContainerRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          width: `${A4_WIDTH_PX - PAGE_PADDING_PX * 2}px`,
          padding: 0,
          margin: 0,
        }}
        aria-hidden="true"
      >
        {sections.map(renderSectionForMeasurement)}
      </div>

      {/* Rendered pages - stacked vertically with gap for visual separation */}
      <div
        className="resume-pages-container flex flex-col"
        style={{ gap: "32px" }}
        data-page-count={isReady ? pages.length : 1}
      >
        {isReady ? (
          pages.map((pageSections, pageIndex) => (
            <ResumePage
              key={pageIndex}
              pageNumber={pageIndex + 1}
              isLast={pageIndex === pages.length - 1}
            >
              <div className="flex flex-col h-full">
                {pageSections.map(renderSection)}
              </div>
            </ResumePage>
          ))
        ) : (
          // Initial render while measuring
          <ResumePage pageNumber={1} isLast={true}>
            <div className="flex flex-col h-full">
              {sections.map(renderSection)}
            </div>
          </ResumePage>
        )}
      </div>
    </>
  );
}

export default Simple;
