import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCertification,
  updateCertification,
  removeCertification,
  addLanguage,
  updateLanguage,
  removeLanguage,
  addReference,
  updateReference,
  removeReference,
} from "../../redux/slices/resumeSlice";
import {
  FiChevronDown as ChevronDown,
  FiChevronUp as ChevronUp,
  FiPlus as Plus,
  FiTrash2 as Trash2,
  FiGlobe as Globe,
  FiAward as Award,
  FiUsers as Users,
} from "react-icons/fi";

function AdditionalDetails({ showError }) {
  const dispatch = useDispatch();
  const { certifications, languages, references } = useSelector(
    (state) => state.resume.resumeData,
  );

  // Helper to toggle section visibility (if meaningful, otherwise just use length check)
  // For this design, we'll check if the array has length > 0 to show the form,
  // otherwise show the "Add" button.

  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getInputClass = (value) => {
    return `w-full bg-white border-2 p-3 rounded-xl text-sm font-medium h-12 focus:ring-primary ${
      showError && !value
        ? "border-red-500 focus:border-red-500"
        : "border-[#e7e7f3] focus:border-primary"
    }`;
  };

  const SectionHeader = ({
    title,
    icon: Icon,
    count,
    onAdd,
    onClear,
    isOpen,
    onToggle,
  }) => (
    <div className="bg-white border border-[#e7e7f3] rounded-xl overflow-hidden mb-4 transition-all hover:shadow-md">
      <div
        className="p-4 flex items-center justify-between cursor-pointer bg-gray-50"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg border border-gray-100 text-primary">
            <Icon size={20} />
          </div>
          <div>
            <h3 className="font-bold text-[#4c4c9a]">{title}</h3>
            <p className="text-xs text-gray-500">{count} items added</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isOpen ? (
            <ChevronUp size={20} className="text-gray-400" />
          ) : (
            <ChevronDown size={20} className="text-gray-400" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="p-4 border-t border-[#e7e7f3] bg-white">
          <div className="flex justify-end gap-3 mb-4">
            {count > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                className="text-red-500 text-xs font-bold uppercase tracking-wider hover:text-red-700"
              >
                Remove Section
              </button>
            )}
          </div>
          {/* The slot for the actual form items */}
        </div>
      )}
    </div>
  );

  return (
    <div className="">
      {/* <!-- Breadcrumbs --> */}
      <div className="flex items-center gap-2 mb-6">
        <a
          className="text-sm font-medium text-[#4c4c9a] hover:text-primary transition-colors"
          href="#"
        >
          Additional Sections
        </a>
      </div>
      {/* <!-- Progress Bar --> */}
      <div className="flex flex-col gap-2 mb-10">
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold uppercase tracking-wider text-[#4c4c9a]">
            Step 5 of 5
          </p>
          <p className="text-sm font-bold text-primary">100% Complete</p>
        </div>
        <div className="h-2 w-full bg-[#cfcfe7] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4c4c9a] rounded-full transition-all duration-500"
            style={{ width: "100%" }}
          ></div>
        </div>
      </div>
      {/* <!-- Page Heading --> */}
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-4xl font-black tracking-tight">Add More Details</h1>
        <p className="text-[#4c4c9a]">Choose sections to add to your resume.</p>
      </div>

      <div className="space-y-6">
        {/* CERTIFICATIONS */}
        <div className="bg-white border border-[#e7e7f3] rounded-xl overflow-hidden shadow-sm">
          <div
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleSection("certifications")}
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                <Award size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  Certifications & Licenses
                </h3>
                <p className="text-sm text-gray-500">
                  Add credentials that back up your expertise.
                </p>
              </div>
            </div>
            {expandedSections["certifications"] ? (
              <ChevronUp className="text-gray-400" />
            ) : (
              <ChevronDown className="text-gray-400" />
            )}
          </div>

          {expandedSections["certifications"] && (
            <div className="p-6 border-t border-[#e7e7f3] bg-gray-50/50">
              {certifications.map((cert, index) => (
                <div
                  key={cert.id}
                  className="mb-6 p-4 bg-white border border-gray-200 rounded-xl relative group"
                >
                  <button
                    onClick={() => dispatch(removeCertification(cert.id))}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                        Certification Name
                      </label>
                      <input
                        value={cert.name || ""}
                        onChange={(e) =>
                          dispatch(
                            updateCertification({
                              id: cert.id,
                              field: "name",
                              value: e.target.value,
                            }),
                          )
                        }
                        className={getInputClass(cert.name)}
                        placeholder="e.g. AWS Certified Solutions Architect"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                        Issuer
                      </label>
                      <input
                        value={cert.issuer || ""}
                        onChange={(e) =>
                          dispatch(
                            updateCertification({
                              id: cert.id,
                              field: "issuer",
                              value: e.target.value,
                            }),
                          )
                        }
                        className={getInputClass(cert.issuer)}
                        placeholder="e.g. Amazon Web Services"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                        Date
                      </label>
                      <input
                        value={cert.date || ""}
                        onChange={(e) =>
                          dispatch(
                            updateCertification({
                              id: cert.id,
                              field: "date",
                              value: e.target.value,
                            }),
                          )
                        }
                        className={getInputClass(cert.date)}
                        placeholder="e.g. 2023"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => dispatch(addCertification())}
                className="flex items-center gap-2 text-primary font-bold text-sm hover:underline"
              >
                <Plus size={18} /> Add Certification
              </button>
            </div>
          )}
        </div>

        {/* LANGUAGES */}
        <div className="bg-white border border-[#e7e7f3] rounded-xl overflow-hidden shadow-sm">
          <div
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleSection("languages")}
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-green-50 text-green-600 rounded-lg">
                <Globe size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Languages</h3>
                <p className="text-sm text-gray-500">
                  Showcase your multilingual skills.
                </p>
              </div>
            </div>
            {expandedSections["languages"] ? (
              <ChevronUp className="text-gray-400" />
            ) : (
              <ChevronDown className="text-gray-400" />
            )}
          </div>

          {expandedSections["languages"] && (
            <div className="p-6 border-t border-[#e7e7f3] bg-gray-50/50">
              {languages.map((lang, index) => (
                <div
                  key={lang.id}
                  className="mb-6 p-4 bg-white border border-gray-200 rounded-xl relative group"
                >
                  <button
                    onClick={() => dispatch(removeLanguage(lang.id))}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                        Language
                      </label>
                      <input
                        value={lang.language || ""}
                        onChange={(e) =>
                          dispatch(
                            updateLanguage({
                              id: lang.id,
                              field: "language",
                              value: e.target.value,
                            }),
                          )
                        }
                        className={getInputClass(lang.language)}
                        placeholder="e.g. English"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                        Proficiency
                      </label>
                      <input
                        value={lang.proficiency || ""}
                        onChange={(e) =>
                          dispatch(
                            updateLanguage({
                              id: lang.id,
                              field: "proficiency",
                              value: e.target.value,
                            }),
                          )
                        }
                        className={getInputClass(lang.proficiency)}
                        placeholder="e.g. Native / Fluent"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => dispatch(addLanguage())}
                className="flex items-center gap-2 text-primary font-bold text-sm hover:underline"
              >
                <Plus size={18} /> Add Language
              </button>
            </div>
          )}
        </div>

        {/* REFERENCES */}
        <div className="bg-white border border-[#e7e7f3] rounded-xl overflow-hidden shadow-sm">
          <div
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleSection("references")}
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg">
                <Users size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">References</h3>
                <p className="text-sm text-gray-500">
                  Add professional references.
                </p>
              </div>
            </div>
            {expandedSections["references"] ? (
              <ChevronUp className="text-gray-400" />
            ) : (
              <ChevronDown className="text-gray-400" />
            )}
          </div>

          {expandedSections["references"] && (
            <div className="p-6 border-t border-[#e7e7f3] bg-gray-50/50">
              {references.map((ref, index) => (
                <div
                  key={ref.id}
                  className="mb-6 p-4 bg-white border border-gray-200 rounded-xl relative group"
                >
                  <button
                    onClick={() => dispatch(removeReference(ref.id))}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                        Name
                      </label>
                      <input
                        value={ref.name || ""}
                        onChange={(e) =>
                          dispatch(
                            updateReference({
                              id: ref.id,
                              field: "name",
                              value: e.target.value,
                            }),
                          )
                        }
                        className={getInputClass(ref.name)}
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                        Position & Company
                      </label>
                      <input
                        value={ref.position || ""}
                        onChange={(e) =>
                          dispatch(
                            updateReference({
                              id: ref.id,
                              field: "position",
                              value: e.target.value,
                            }),
                          )
                        }
                        className={getInputClass(ref.position)}
                        placeholder="e.g. Manager at Tech Co."
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                        Phone
                      </label>
                      <input
                        value={ref.phone || ""}
                        onChange={(e) =>
                          dispatch(
                            updateReference({
                              id: ref.id,
                              field: "phone",
                              value: e.target.value,
                            }),
                          )
                        }
                        className={getInputClass(ref.phone)}
                        placeholder="e.g. +1 555-0123"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                        Email
                      </label>
                      <input
                        value={ref.email || ""}
                        onChange={(e) =>
                          dispatch(
                            updateReference({
                              id: ref.id,
                              field: "email",
                              value: e.target.value,
                            }),
                          )
                        }
                        className={getInputClass(ref.email)}
                        placeholder="e.g. john@example.com"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => dispatch(addReference())}
                className="flex items-center gap-2 text-primary font-bold text-sm hover:underline"
              >
                <Plus size={18} /> Add Reference
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdditionalDetails;
