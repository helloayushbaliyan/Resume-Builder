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
 * Elegant Resume Template with Automatic Multi-Page Pagination
 *
 * Dark header with photo, two-column layout below.
 * Content dynamically flows to additional pages when it exceeds A4 height.
 */

const SECTION_GAP = 24;

// ============================================================================
// HEADER SECTION
// ============================================================================

const HeaderSection = React.forwardRef(({ personal }, ref) => (
  <div
    ref={ref}
    className="bg-[#484848] text-white h-52 flex items-center print:bg-[#484848] relative"
  >
    <div className="flex w-full h-full">
      {/* Photo Area */}
      <div className="w-[33%] h-full flex items-center justify-center relative">
        <div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden shadow-md bg-gray-200 z-10">
          {personal.photo ? (
            <img
              className="w-full h-full object-cover"
              src={personal.photo}
              alt="photo"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center p-2">
              No Photo
            </div>
          )}
        </div>
      </div>

      {/* Name & Title */}
      <div className="w-[67%] flex flex-col justify-center px-8">
        <h1 className="text-5xl font-bold uppercase tracking-wide mb-1 leading-none">
          {personal.name || "Richard Wilson"}
        </h1>
        <p className="text-xl font-light tracking-widest uppercase opacity-90">
          {personal.role || "Marketing Manager"}
        </p>
      </div>
    </div>
  </div>
));
HeaderSection.displayName = "HeaderSection";

// ============================================================================
// LEFT SIDEBAR SECTIONS
// ============================================================================

const ContactSection = React.forwardRef(({ personal }, ref) => {
  if (!personal.phone && !personal.email && !personal.location) return null;
  return (
    <div ref={ref} className="mb-8">
      <h3 className="text-base font-bold uppercase tracking-wider text-[#484848] mb-4 border-b pb-1 border-gray-300">
        Contact
      </h3>
      <div className="space-y-3 text-sm text-gray-600 font-medium">
        {personal.phone && (
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-[#484848]">
              <Phone size={14} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#484848] text-xs uppercase mb-0.5">
                Phone:
              </span>
              <span>{personal.phone}</span>
            </div>
          </div>
        )}
        {personal.email && (
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-[#484848]">
              <Mail size={14} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#484848] text-xs uppercase mb-0.5">
                E-Mail:
              </span>
              <span className="break-all">{personal.email}</span>
            </div>
          </div>
        )}
        {personal.location && (
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-[#484848]">
              <MapPin size={14} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#484848] text-xs uppercase mb-0.5">
                Address:
              </span>
              <span>{personal.location}</span>
            </div>
          </div>
        )}
        {personal.socialLinks?.length > 0 && (
          <div className="pt-2 border-t border-gray-300 mt-2">
            {personal.socialLinks.map((link, index) => (
              <div
                key={link.id || index}
                className="flex items-start gap-3 mb-2 last:mb-0"
              >
                <div className="mt-0.5 text-[#484848]">
                  <LinkIcon size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="break-all text-[#484848] transition-colors">
                    {link.url.replace(/^https?:\/\/(www\.)?/, "")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
ContactSection.displayName = "ContactSection";

const SidebarEducationSection = React.forwardRef(({ education }, ref) => {
  if (!education || education.length === 0) return null;
  return (
    <div ref={ref} className="mb-8">
      <h3 className="text-base font-bold uppercase tracking-wider text-[#484848] mb-4 border-b pb-1 border-gray-300">
        Education
      </h3>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="text-sm text-gray-600">
            <p className="font-bold text-[#484848] leading-tight mb-0.5">
              {edu.degree}
            </p>
            <p className="text-[#484848] font-medium mb-0.5">{edu.school}</p>
            <p className="text-gray-500 text-xs">
              {edu.startDate} -{" "}
              {edu.currentlyStudying ? "Present" : edu.endDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});
SidebarEducationSection.displayName = "SidebarEducationSection";

const SkillsSection = React.forwardRef(({ skills }, ref) => {
  if (!skills || skills.length === 0) return null;
  return (
    <div ref={ref} className="mb-8">
      <h3 className="text-base font-bold uppercase tracking-wider text-[#484848] mb-4 border-b pb-1 border-gray-300">
        Skills
      </h3>
      <div className="space-y-2 text-sm text-gray-600">
        {skills.map((skill, index) => (
          <div key={index} className="block">
            <span className="font-medium">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
SkillsSection.displayName = "SkillsSection";

const LanguagesSection = React.forwardRef(({ languages }, ref) => {
  if (!languages || languages.length === 0) return null;
  return (
    <div ref={ref} className="mb-8">
      <h3 className="text-base font-bold uppercase tracking-wider text-[#484848] mb-4 border-b pb-1 border-gray-300">
        Language
      </h3>
      <ul className="space-y-2 text-sm text-gray-600">
        {languages.map((lang, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#484848] rounded-full"></span>
            <span className="font-medium">{lang.language}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});
LanguagesSection.displayName = "LanguagesSection";

// ============================================================================
// RIGHT CONTENT SECTIONS
// ============================================================================

const AboutSection = React.forwardRef(({ summary }, ref) => {
  if (!summary) return null;
  return (
    <div ref={ref} className="mb-10">
      <h3 className="text-base font-bold uppercase tracking-wider text-[#484848] mb-4 border-b pb-1 border-gray-300">
        About Me
      </h3>
      <div
        className="text-sm text-gray-600 leading-relaxed text-justify [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 wrap-break-word [&_li]:text-left"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
    </div>
  );
});
AboutSection.displayName = "AboutSection";

const ExperienceHeader = React.forwardRef((props, ref) => (
  <div ref={ref} className="mb-4">
    <h3 className="text-base font-bold uppercase tracking-wider text-[#484848] border-b pb-1 border-gray-300">
      Experience
    </h3>
  </div>
));
ExperienceHeader.displayName = "ExperienceHeader";

const ExperienceItem = React.forwardRef(({ exp, isFirst }, ref) => (
  <div ref={ref} className={!isFirst ? "mt-6" : ""}>
    <div className="flex justify-between items-baseline mb-1">
      <h4 className="text-base font-bold text-[#484848]">{exp.position}</h4>
      <span className="text-sm font-medium text-[#484848]">
        {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
      </span>
    </div>
    <p className="text-sm font-medium text-gray-500 mb-2 italic">
      {exp.company} | {exp.location}
    </p>
    <div
      className="text-sm text-gray-600 leading-relaxed text-justify [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 wrap-break-word [&_li]:text-left"
      dangerouslySetInnerHTML={{ __html: exp.description }}
    />
  </div>
));
ExperienceItem.displayName = "ExperienceItem";

const CertificationsSection = React.forwardRef(({ certifications }, ref) => {
  if (!certifications || certifications.length === 0) return null;
  return (
    <div ref={ref} className="mb-10 mt-10">
      <h3 className="text-base font-bold uppercase tracking-wider text-[#484848] mb-4 border-b pb-1 border-gray-300">
        Certifications
      </h3>
      <div className="space-y-3">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-start"
          >
            <div className="mb-1 sm:mb-0">
              <h4 className="text-sm font-bold text-[#484848]">{cert.name}</h4>
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

const ReferencesSection = React.forwardRef(({ references }, ref) => {
  if (!references || references.length === 0) return null;
  return (
    <div ref={ref} className="mt-10">
      <h3 className="text-base font-bold uppercase tracking-wider text-[#484848] mb-4 border-b pb-1 border-gray-300">
        References
      </h3>
      <div className="grid grid-cols-2 gap-6">
        {references.map((refItem, index) => (
          <div key={index}>
            <h4 className="text-sm font-bold text-[#484848]">{refItem.name}</h4>
            <p className="text-xs text-gray-600 font-semibold mb-1">
              {refItem.position}
            </p>
            <div className="text-xs text-gray-500 space-y-0.5">
              {refItem.phone && (
                <div className="block">
                  <span className="font-bold">Phone: </span>
                  <span>{refItem.phone}</span>
                </div>
              )}
              {refItem.email && (
                <div className="block">
                  <span className="font-bold">Email: </span>
                  <span>{refItem.email}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
ReferencesSection.displayName = "ReferencesSection";

/**
 * Projects Header
 */
const ProjectsHeader = React.forwardRef((props, ref) => (
  <div ref={ref} className="mb-4">
    <h3 className="text-base font-bold uppercase tracking-wider text-[#484848] border-b pb-1 border-gray-300">
      Projects
    </h3>
  </div>
));
ProjectsHeader.displayName = "ProjectsHeader";

/**
 * Single Project Item
 */
const ProjectItem = React.forwardRef(({ proj, isFirst }, ref) => (
  <div ref={ref} className={!isFirst ? "mt-5" : ""}>
    <div className="flex justify-between items-baseline mb-1">
      <h4 className="text-base font-bold text-[#2d2d2d]">
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
      <span className="text-xs text-gray-500 font-medium">
        {proj.startDate} – {proj.currentlyWorking ? "Present" : proj.endDate}
      </span>
    </div>
    <div className="text-sm font-semibold text-gray-600 mb-2">{proj.role}</div>
    <div
      className="text-xs text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 wrap-break-word [&_li]:text-left"
      dangerouslySetInnerHTML={{ __html: proj.description }}
    />
  </div>
));
ProjectItem.displayName = "ProjectItem";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const Elegant = () => {
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

    // About Me
    if (displayPersonal.summary) {
      result.push({
        type: "about",
        key: "about",
        content: { summary: displayPersonal.summary },
      });
    }

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
    if (element) sectionRefs.current[key] = element;
  }, []);

  const renderSectionForMeasurement = (section) => {
    const { type, key, content } = section;
    switch (type) {
      case "about":
        return (
          <AboutSection
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
      case "about":
        return <AboutSection key={key} summary={content.summary} />;
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
        // Account for header (208px) on Page 1
        const HEADER_HEIGHT = 208;
        const firstPageMaxHeight = USABLE_HEIGHT_PX - HEADER_HEIGHT - 32;
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

        const HEADER_HEIGHT = 208;
        const firstPageMaxHeight = USABLE_HEIGHT_PX - HEADER_HEIGHT - 32;
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
        const maxHeight = USABLE_HEIGHT_PX - 32; // No header on pages 2+

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
          width: `${(A4_WIDTH_PX - PAGE_PADDING_PX * 2) * 0.67}px`,
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
            case "about":
              return (
                <AboutSection
                  key={key}
                  ref={(el) => registerRefFullWidth(key, el)}
                  summary={content.summary}
                />
              );
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
                    {/* Left Sidebar - only on Page 1 */}
                    <div className="w-[33%] pl-8 pr-4 py-8 border-r border-gray-100/50">
                      <ContactSection personal={displayPersonal} />
                      <SidebarEducationSection education={displayEducation} />
                      <SkillsSection skills={displaySkills} />
                      <LanguagesSection languages={displayLanguages} />
                    </div>
                    {/* Right Content - 67% width on Page 1 */}
                    <div className="w-[67%] px-8 py-8">
                      {pageSections.map(renderSection)}
                    </div>
                  </div>
                </div>
              ) : (
                // Pages 2+: Full-width layout
                <div className="-m-10 px-8 py-8">
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
                <div className="w-[33%] pl-8 pr-4 py-8 border-r border-gray-100/50">
                  <ContactSection personal={displayPersonal} />
                  <SidebarEducationSection education={displayEducation} />
                  <SkillsSection skills={displaySkills} />
                  <LanguagesSection languages={displayLanguages} />
                </div>
                <div className="w-[67%] px-8 py-8">
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

export default Elegant;
