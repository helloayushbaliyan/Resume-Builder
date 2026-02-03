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
import { MapPin, Mail, Phone, Link as LinkIcon } from "lucide-react";

/**
 * Modern Resume Template with Automatic Multi-Page Pagination
 *
 * Two-column layout with header and sidebar. Content dynamically
 * flows to additional pages when it exceeds A4 height.
 */

const SECTION_GAP = 24;

// ============================================================================
// SECTION COMPONENTS
// ============================================================================

/**
 * Header Section - Photo and personal info
 */
const HeaderSection = React.forwardRef(({ personal }, ref) => (
  <div ref={ref} className="bg-[#f0ece6] p-8 flex items-center gap-6">
    <div className="w-32 h-32 bg-gray-300 rounded-full shrink-0 overflow-hidden">
      {personal.photo ? (
        <img
          className="w-full h-full object-cover object-center"
          src={personal.photo}
          alt="photo"
        />
      ) : (
        <svg
          className="w-full h-full text-gray-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </div>
    <div className="flex-1">
      <h1 className="text-3xl font-serif font-bold text-[#2d2d2d] mb-1">
        {personal.name || "Your Name"}
      </h1>
      <p className="text-lg font-medium text-gray-600 mb-3">
        {personal.role || "Professional Title"}
      </p>
      <div className="text-xs text-gray-500 space-y-1">
        {personal.location && (
          <div className="flex items-center gap-2">
            <MapPin size={12} className="shrink-0" />
            <p>{personal.location}</p>
          </div>
        )}
        {personal.email && (
          <div className="flex items-center gap-2">
            <Mail size={12} className="shrink-0" />
            <p>{personal.email}</p>
          </div>
        )}
        {personal.phone && (
          <div className="flex items-center gap-2">
            <Phone size={12} className="shrink-0" />
            <p>{personal.phone}</p>
          </div>
        )}
        {personal.socialLinks?.map((link, index) => (
          <div key={link.id || index} className="flex items-center gap-2">
            <LinkIcon size={12} className="shrink-0" />
            <span className="text-[#2d2d2d] break-all">
              {link.url.replace(/^https?:\/\/(www\.)?/, "")}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
));
HeaderSection.displayName = "HeaderSection";

/**
 * Summary Section (Sidebar)
 */
const SummarySection = React.forwardRef(({ summary }, ref) => {
  if (!summary) return null;
  return (
    <div ref={ref} className="mb-8">
      <h3 className="text-xs font-bold uppercase tracking-widest text-[#2d2d2d] mb-3 border-b-2 border-[#2d2d2d] pb-1 w-fit">
        Summary
      </h3>
      <div
        className="text-xs text-gray-600 leading-relaxed text-justify [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 wrap-break-word whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
    </div>
  );
});
SummarySection.displayName = "SummarySection";

/**
 * Skills Section (Sidebar)
 */
const SkillsSection = React.forwardRef(({ skills }, ref) => {
  if (!skills || skills.length === 0) return null;
  return (
    <div ref={ref} className="mb-8">
      <h3 className="text-xs font-bold uppercase tracking-widest text-[#2d2d2d] mb-3 border-b-2 border-[#2d2d2d] pb-1 w-fit">
        Skills
      </h3>
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="text-xs list-disc list-inside font-semibold text-gray-600"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
});
SkillsSection.displayName = "SkillsSection";

/**
 * Languages Section (Sidebar)
 */
const LanguagesSection = React.forwardRef(({ languages }, ref) => {
  if (!languages || languages.length === 0) return null;
  return (
    <div ref={ref} className="mb-8">
      <h3 className="text-xs font-bold uppercase tracking-widest text-[#2d2d2d] mb-3 border-b-2 border-[#2d2d2d] pb-1 w-fit">
        Languages
      </h3>
      <ul className="space-y-2">
        {languages.map((lang, index) => (
          <li key={index} className="text-xs text-gray-600">
            <span className="font-semibold block text-[#2d2d2d]">
              {lang.language}
            </span>
            <span className="text-gray-500 text-[10px]">
              {lang.proficiency}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
});
LanguagesSection.displayName = "LanguagesSection";

/**
 * Experience Header
 */
const ExperienceHeader = React.forwardRef((props, ref) => (
  <div ref={ref} className="mb-5">
    <h3 className="text-sm font-bold uppercase tracking-widest text-[#2d2d2d]">
      Experience
    </h3>
  </div>
));
ExperienceHeader.displayName = "ExperienceHeader";

/**
 * Single Experience Item
 */
const ExperienceItem = React.forwardRef(({ exp, isFirst }, ref) => (
  <div ref={ref} className={!isFirst ? "mt-6" : ""}>
    <div className="mb-3">
      <div className="flex justify-between items-baseline">
        <h4 className="text-lg font-bold text-[#2d2d2d]">{exp.company}</h4>
        <span className="text-xs text-gray-500 italic">
          {formatDateRange(exp.startDate, exp.endDate, exp.currentlyWorking)}
        </span>
      </div>
      <h4 className="text-sm text-[#2d2d2d]">{exp.position}</h4>
    </div>
    <div
      className="text-xs text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 wrap-break-word whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: exp.description }}
    />
  </div>
));
ExperienceItem.displayName = "ExperienceItem";

/**
 * Projects Header
 */
const ProjectsHeader = React.forwardRef((props, ref) => (
  <div ref={ref} className="mb-5">
    <h3 className="text-sm font-bold uppercase tracking-widest text-[#2d2d2d]">
      Projects
    </h3>
  </div>
));
ProjectsHeader.displayName = "ProjectsHeader";

/**
 * Single Project Item
 */
const ProjectItem = React.forwardRef(({ proj, isFirst }, ref) => (
  <div ref={ref} className={!isFirst ? "mt-6" : ""}>
    <div className="mb-3">
      <div className="flex justify-between items-baseline">
        <h4 className="text-lg font-bold text-[#2d2d2d]">
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
        <span className="text-xs text-gray-500 italic">
          {formatDateRange(proj.startDate, proj.endDate, proj.currentlyWorking)}
        </span>
      </div>
      <h4 className="text-sm text-[#2d2d2d]">{proj.role}</h4>
    </div>
    <div
      className="text-xs text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 wrap-break-word whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: proj.description }}
    />
  </div>
));
ProjectItem.displayName = "ProjectItem";

/**
 * Education Header
 */
const EducationHeader = React.forwardRef((props, ref) => (
  <div ref={ref} className="mb-5 mt-8">
    <h3 className="text-sm font-bold uppercase tracking-widest text-[#2d2d2d]">
      Education
    </h3>
  </div>
));
EducationHeader.displayName = "EducationHeader";

/**
 * Single Education Item
 */
const EducationItem = React.forwardRef(({ edu, isFirst }, ref) => (
  <div ref={ref} className={!isFirst ? "mt-4" : ""}>
    <div className="flex justify-between items-baseline mb-1">
      <h4 className="text-lg font-bold text-[#2d2d2d]">{edu.school}</h4>
      <span className="text-xs text-gray-500 italic">
        {formatDateRange(edu.startDate, edu.endDate, edu.currentlyStudying)}
      </span>
    </div>
    <h4 className="text-sm text-[#2d2d2d]">{edu.degree}</h4>
  </div>
));
EducationItem.displayName = "EducationItem";

/**
 * Certifications Section
 */
const CertificationsSection = React.forwardRef(({ certifications }, ref) => {
  if (!certifications || certifications.length === 0) return null;
  return (
    <div ref={ref} className="mb-8 mt-8">
      <h3 className="text-sm font-bold uppercase tracking-widest text-[#2d2d2d] mb-5">
        Certifications
      </h3>
      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <div key={index}>
            <div className="flex justify-between items-baseline mb-1">
              <h4 className="text-base font-bold text-[#2d2d2d]">
                {cert.name}
              </h4>
              <span className="text-xs text-gray-500 italic">{cert.date}</span>
            </div>
            <p className="text-xs text-gray-600 italic">{cert.issuer}</p>
          </div>
        ))}
      </div>
    </div>
  );
});
CertificationsSection.displayName = "CertificationsSection";

/**
 * References Section
 */
const ReferencesSection = React.forwardRef(({ references }, ref) => {
  if (!references || references.length === 0) return null;
  return (
    <div ref={ref} className="mt-8">
      <h3 className="text-sm font-bold uppercase tracking-widest text-[#2d2d2d] mb-5">
        References
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {references.map((refItem, index) => (
          <div key={index}>
            <h4 className="text-sm font-bold text-[#2d2d2d]">{refItem.name}</h4>
            <p className="text-xs text-gray-600">{refItem.position}</p>
            <p className="text-xs text-gray-500 mt-1">{refItem.email}</p>
            <p className="text-xs text-gray-500">{refItem.phone}</p>
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

const Modern = () => {
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

  // State for pagination
  const [pages, setPages] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const measureContainerRef = useRef(null);
  const sectionRefs = useRef({});

  /**
   * Build sections array for main content (right column)
   */
  const mainSections = useMemo(() => {
    const result = [];

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
    displayProjects,
    displayEducation,
    displayCertifications,
    displayReferences,
  ]);

  const registerRef = useCallback((key, element) => {
    if (element) {
      sectionRefs.current[key] = element;
    }
  }, []);

  const renderSectionForMeasurement = (section) => {
    const { type, key, content } = section;
    switch (type) {
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

  // State for tracking remaining sections that need full-width measurement
  const [remainingSectionsToMeasure, setRemainingSectionsToMeasure] = useState(
    [],
  );
  const sectionRefsFullWidth = useRef({});

  /**
   * Register refs for full-width measurement (Page 2+)
   */
  const registerRefFullWidth = useCallback((key, element) => {
    if (element) sectionRefsFullWidth.current[key] = element;
  }, []);

  /**
   * TWO-PHASE PAGINATION EFFECT
   *
   * Phase 1: Measure all sections at 67% width, fill Page 1
   * Phase 2: Re-measure remaining sections at 100% width, fill Pages 2+
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        // PHASE 1: Measure all sections at 67% width (Page 1 content area)
        const measurements67 = mainSections.map((section) => {
          const element = sectionRefs.current[section.key];
          return { ...section, height: element ? element.offsetHeight : 0 };
        });

        // Fill Page 1 using 67% width measurements
        // Account for header (~180px) on Page 1
        const HEADER_HEIGHT = 180;
        const firstPageMaxHeight = USABLE_HEIGHT_PX - HEADER_HEIGHT - 48; // 48px for padding
        const page1Sections = [];
        let page1Height = 0;

        for (let i = 0; i < measurements67.length; i++) {
          const section = measurements67[i];
          const gapHeight = page1Sections.length > 0 ? SECTION_GAP : 0;
          const totalRequired = section.height + gapHeight;

          if (page1Height + totalRequired <= firstPageMaxHeight) {
            page1Sections.push(section);
            page1Height += totalRequired;
          } else {
            // Page 1 is full, stop here
            break;
          }
        }

        // Determine which sections didn't fit on Page 1
        const remainingSections = mainSections.slice(page1Sections.length);

        if (remainingSections.length > 0) {
          // Trigger Phase 2 measurement
          setRemainingSectionsToMeasure(remainingSections);
        } else {
          // All content fits on Page 1
          setPages([page1Sections]);
          setIsReady(true);
        }
      });
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [mainSections]);

  /**
   * PHASE 2: Measure remaining sections at 100% width and paginate Pages 2+
   */
  useEffect(() => {
    if (remainingSectionsToMeasure.length === 0) return;

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        // Measure remaining sections at 100% width
        const measurements100 = remainingSectionsToMeasure.map((section) => {
          const element = sectionRefsFullWidth.current[section.key];
          return { ...section, height: element ? element.offsetHeight : 0 };
        });

        // Get Page 1 sections (already measured at 67% width)
        const measurements67 = mainSections
          .slice(0, mainSections.length - remainingSectionsToMeasure.length)
          .map((section) => {
            const element = sectionRefs.current[section.key];
            return { ...section, height: element ? element.offsetHeight : 0 };
          });

        const HEADER_HEIGHT = 180;
        const firstPageMaxHeight = USABLE_HEIGHT_PX - HEADER_HEIGHT - 48;
        const page1Sections = [];
        let page1Height = 0;

        for (const section of measurements67) {
          const gapHeight = page1Sections.length > 0 ? SECTION_GAP : 0;
          const totalRequired = section.height + gapHeight;

          if (page1Height + totalRequired <= firstPageMaxHeight) {
            page1Sections.push(section);
            page1Height += totalRequired;
          } else {
            break;
          }
        }

        // Paginate remaining sections (100% width) across Pages 2+
        const additionalPages = [];
        let currentPage = [];
        let currentPageHeight = 0;
        const maxHeight = USABLE_HEIGHT_PX - 48; // No header on pages 2+

        for (const section of measurements100) {
          const gapHeight = currentPage.length > 0 ? SECTION_GAP : 0;
          const totalRequired = section.height + gapHeight;

          if (currentPageHeight + totalRequired <= maxHeight) {
            currentPage.push(section);
            currentPageHeight += totalRequired;
          } else {
            // Start new page
            if (currentPage.length > 0) {
              additionalPages.push(currentPage);
            }
            currentPage = [section];
            currentPageHeight = section.height;
          }
        }

        // Add final page
        if (currentPage.length > 0) {
          additionalPages.push(currentPage);
        }

        // Combine: Page 1 + Pages 2+
        const allPages = [page1Sections, ...additionalPages];
        setPages(allPages);
        setIsReady(true);
      });
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [remainingSectionsToMeasure, mainSections]);

  return (
    <>
      {/* Hidden measurement container for Page 1 (67% width) */}
      <div
        ref={measureContainerRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          width: `${(A4_WIDTH_PX - PAGE_PADDING_PX * 2) * 0.67}px`, // 2/3 width for main content
          padding: 0,
          margin: 0,
        }}
        aria-hidden="true"
      >
        {mainSections.map(renderSectionForMeasurement)}
      </div>

      {/* Hidden measurement container for Pages 2+ (100% width) */}
      <div
        style={{
          position: "absolute",
          visibility: "hidden",
          width: `${A4_WIDTH_PX - PAGE_PADDING_PX * 2}px`,
          padding: 0,
          margin: 0,
        }}
        aria-hidden="true"
      >
        {remainingSectionsToMeasure.map((section) => {
          const { type, key, content } = section;
          switch (type) {
            case "experience-header":
              return (
                <ExperienceHeader
                  key={key}
                  ref={(el) => registerRefFullWidth(key, el)}
                />
              );
            case "experience-item":
              return (
                <ExperienceItem
                  key={key}
                  ref={(el) => registerRefFullWidth(key, el)}
                  exp={content.exp}
                  isFirst={content.isFirst}
                />
              );
            case "projects-header":
              return (
                <ProjectsHeader
                  key={key}
                  ref={(el) => registerRefFullWidth(key, el)}
                />
              );
            case "project-item":
              return (
                <ProjectItem
                  key={key}
                  ref={(el) => registerRefFullWidth(key, el)}
                  proj={content.proj}
                  isFirst={content.isFirst}
                />
              );
            case "education-header":
              return (
                <EducationHeader
                  key={key}
                  ref={(el) => registerRefFullWidth(key, el)}
                />
              );
            case "education-item":
              return (
                <EducationItem
                  key={key}
                  ref={(el) => registerRefFullWidth(key, el)}
                  edu={content.edu}
                  isFirst={content.isFirst}
                />
              );
            case "certifications":
              return (
                <CertificationsSection
                  key={key}
                  ref={(el) => registerRefFullWidth(key, el)}
                  certifications={content.certifications}
                />
              );
            case "references":
              return (
                <ReferencesSection
                  key={key}
                  ref={(el) => registerRefFullWidth(key, el)}
                  references={content.references}
                />
              );
            default:
              return null;
          }
        })}
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
              {pageIndex === 0 ? (
                // Page 1: Two-column layout with header and sidebar
                <div className="flex flex-col min-h-[1123px] -m-10">
                  <HeaderSection personal={displayPersonal} />
                  <div className="flex flex-1">
                    {/* Sidebar - only on Page 1 */}
                    <div className="w-1/3 bg-[#f0ece6] p-6 pr-4 border-r border-gray-100">
                      <SummarySection summary={displayPersonal.summary} />
                      <SkillsSection skills={displaySkills} />
                      <LanguagesSection languages={displayLanguages} />
                    </div>
                    {/* Main Content - 67% width on Page 1 */}
                    <div className="w-2/3 p-6">
                      {pageSections.map(renderSection)}
                    </div>
                  </div>
                </div>
              ) : (
                // Pages 2+: Full-width layout
                <div className="-m-10 p-6">
                  {pageSections.map(renderSection)}
                </div>
              )}
            </ResumePage>
          ))
        ) : (
          <ResumePage pageNumber={1} isLast={true}>
            <div className="flex flex-col min-h-[1123px] -m-10">
              <HeaderSection personal={displayPersonal} />
              <div className="flex flex-1">
                <div className="w-1/3 bg-[#f0ece6] p-6 pr-4 border-r border-gray-100">
                  <SummarySection summary={displayPersonal.summary} />
                  <SkillsSection skills={displaySkills} />
                  <LanguagesSection languages={displayLanguages} />
                </div>
                <div className="w-2/3 p-6">
                  {mainSections.map(renderSection)}
                </div>
              </div>
            </div>
          </ResumePage>
        )}
      </div>
    </>
  );
};

export default Modern;
