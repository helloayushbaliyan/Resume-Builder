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
import { formatDateRange } from "@/utils/dateFormatter";

/**
 * Professional Resume Template with Automatic Multi-Page Pagination
 *
 * Clean, professional design with:
 * - Name and contact info in header with blue links
 * - Summary section
 * - Professional Experience
 * - Projects
 * - Education
 * - Skills (categorized)
 */

const SECTION_GAP = 20;

// ============================================================================
// SECTION COMPONENTS
// ============================================================================

/**
 * Header Section
 */
const HeaderSection = React.forwardRef(({ personal }, ref) => (
  <div ref={ref} className="border-b border-black pb-2 mb-3">
    <h1 className="text-2xl font-bold text-center mb-1">
      {personal.name || "William Daniel"}
    </h1>
    <div className="flex justify-center items-center flex-wrap gap-2 text-[10px] text-blue-600">
      {personal.location && (
        <>
          <span>{personal.location}</span>
          <span>|</span>
        </>
      )}
      {personal.phone && (
        <>
          <span>{personal.phone}</span>
          <span>|</span>
        </>
      )}
      {personal.email && (
        <>
          <a href={`mailto:${personal.email}`} className="hover:underline">
            {personal.email}
          </a>
          <span>|</span>
        </>
      )}
      {personal.socialLinks?.map((link, index) => (
        <React.Fragment key={link.id || index}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {link.name || link.url.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
          {index < personal.socialLinks.length - 1 && <span>|</span>}
        </React.Fragment>
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
    <div ref={ref} className="mb-4">
      <h2 className="text-sm font-bold uppercase border-b border-black mb-2">
        SUMMARY
      </h2>
      <div
        className="text-[10px] leading-relaxed text-justify [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 wrap-break-word whitespace-pre-wrap"
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
  <div ref={ref} className="mb-2">
    <h2 className="text-sm font-bold uppercase border-b border-black">
      Professional Experience
    </h2>
  </div>
));
ExperienceHeader.displayName = "ExperienceHeader";

/**
 * Single Experience Item
 */
const ExperienceItem = React.forwardRef(({ exp, isFirst }, ref) => (
  <div ref={ref} className={`${!isFirst ? "mt-3" : ""}`}>
    <div className="flex justify-between items-baseline mb-0.5">
      <h3 className="text-xs font-bold">{exp.role || exp.position}</h3>
      <span className="text-[10px] font-bold whitespace-nowrap">
        {formatDateRange(exp.startDate, exp.endDate, exp.currentlyWorking)},{" "}
        {exp.location}
      </span>
    </div>
    <div className="mb-1">
      <span className="text-xs font-bold">{exp.company}</span>
    </div>
    <div
      className="text-[10px] leading-relaxed [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 wrap-break-word whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: exp.description }}
    />
  </div>
));
ExperienceItem.displayName = "ExperienceItem";

/**
 * Projects Section Header
 */
const ProjectsHeader = React.forwardRef((props, ref) => (
  <div ref={ref} className="mb-2">
    <h2 className="text-sm font-bold uppercase border-b border-black">
      Projects
    </h2>
  </div>
));
ProjectsHeader.displayName = "ProjectsHeader";

/**
 * Single Project Item
 */
const ProjectItem = React.forwardRef(({ proj, isFirst }, ref) => (
  <div ref={ref} className={`${!isFirst ? "mt-3" : ""}`}>
    <div className="mb-1">
      <h3 className="text-xs font-bold inline">
        {proj.name}
        {proj.link && (
          <a
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-[10px] font-normal text-blue-600 hover:underline"
          >
            [Link]
          </a>
        )}
      </h3>
      <span className="text-xs font-bold"> – {proj.role}</span>
    </div>
    <div
      className="text-[10px] leading-relaxed [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 wrap-break-word whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: proj.description }}
    />
  </div>
));
ProjectItem.displayName = "ProjectItem";

/**
 * Education Section Header
 */
const EducationHeader = React.forwardRef((props, ref) => (
  <div ref={ref} className="mb-2">
    <h2 className="text-sm font-bold uppercase border-b border-black">
      Education
    </h2>
  </div>
));
EducationHeader.displayName = "EducationHeader";

/**
 * Single Education Item
 */
const EducationItem = React.forwardRef(({ edu, isFirst }, ref) => (
  <div ref={ref} className={`${!isFirst ? "mt-2" : ""}`}>
    <h3 className="text-xs font-bold">{edu.degree}</h3>
    <div className="flex justify-between items-baseline">
      <span className="text-[10px] italic">{edu.school}</span>
      <span className="text-[10px] whitespace-nowrap">
        {formatDateRange(edu.startDate, edu.endDate, edu.currentlyStudying)}
      </span>
    </div>
  </div>
));
EducationItem.displayName = "EducationItem";

/**
 * Skills Section
 */
const SkillsSection = React.forwardRef(({ skills }, ref) => {
  if (!skills || skills.length === 0) return null;

  return (
    <div ref={ref} className="mb-4">
      <h2 className="text-sm font-bold uppercase border-b border-black mb-2">
        Skills
      </h2>
      <ul className="list-disc list-inside text-[10px] leading-relaxed space-y-0.5">
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
});
SkillsSection.displayName = "SkillsSection";

/**
 * Certifications Section
 */
const CertificationsSection = React.forwardRef(({ certifications }, ref) => {
  if (!certifications || certifications.length === 0) return null;
  return (
    <div ref={ref} className="mb-4">
      <h2 className="text-sm font-bold uppercase border-b border-black mb-2">
        Certifications
      </h2>
      <div className="space-y-2">
        {certifications.map((cert, index) => (
          <div key={index} className="flex justify-between items-start">
            <div>
              <h4 className="text-xs font-bold">{cert.name}</h4>
              <p className="text-[10px] italic">{cert.issuer}</p>
            </div>
            <span className="text-[10px] whitespace-nowrap">{cert.date}</span>
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
    <div ref={ref} className="mb-4">
      <h2 className="text-sm font-bold uppercase border-b border-black mb-2">
        Languages
      </h2>
      <div className="text-[10px]">
        {languages.map((lang, index) => (
          <span key={index}>
            <span className="font-bold">{lang.language}</span>
            {lang.proficiency && ` (${lang.proficiency})`}
            {index < languages.length - 1 && ", "}
          </span>
        ))}
      </div>
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
    <div ref={ref} className="mb-4">
      <h2 className="text-sm font-bold uppercase border-b border-black mb-2">
        References
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {references.map((refItem, index) => (
          <div key={index}>
            <h4 className="text-xs font-bold">{refItem.name}</h4>
            <p className="text-[10px] italic">{refItem.position}</p>
            <p className="text-[10px]">{refItem.email}</p>
            <p className="text-[10px]">{refItem.phone}</p>
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

function Professional() {
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

    // Skills as single section
    if (displaySkills.length > 0) {
      result.push({
        type: "skills",
        key: "skills",
        content: { skills: displaySkills },
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
      case "skills":
        return (
          <SkillsSection
            key={key}
            ref={(el) => registerRef(key, el)}
            skills={content.skills}
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
      case "skills":
        return <SkillsSection key={key} skills={content.skills} />;
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
      {/* Hidden measurement container */}
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

      {/* Rendered pages */}
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

export default Professional;
