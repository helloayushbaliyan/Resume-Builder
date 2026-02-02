import React from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import { useDispatch, useSelector } from "react-redux";
import {
  updatePersonal,
  addSocialLink,
  updateSocialLink,
  removeSocialLink,
} from "../../redux/slices/resumeSlice";
import { templates } from "@/data/templateData";

function PersonalDetils({ showError }) {
  const dispatch = useDispatch();
  const personal = useSelector((state) => state.resume.resumeData.personal);
  const selectedTemplate = useSelector(
    (state) => state.resume.selectedTemplate,
  );

  // Check if the current template supports photos
  const currentTemplate =
    templates.find((t) => t.id === selectedTemplate) || templates[0];
  const showPhotoUpload = currentTemplate?.hasPhoto;

  const getInputClass = (value, isTextArea = false) => {
    const baseClass = isTextArea
      ? "w-full h-[150px] resize-none bg-white border-2 p-3 rounded-xl text-sm font-medium"
      : "w-full bg-white border-2 p-3 rounded-xl text-sm font-medium h-12";

    return `${baseClass} focus:ring-primary ${
      showError && !value
        ? "border-red-500 focus:border-red-500"
        : "border-[#e7e7f3] focus:border-primary"
    }`;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(updatePersonal({ photo: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="">
      {/* detils form */}
      <div className="space-y-8 ">
        <div className="bg-[#f6f6f8]  border border-[#e7e7f3] rounded-xl p-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  name="name"
                  value={personal.name || ""}
                  onChange={(e) =>
                    dispatch(updatePersonal({ name: e.target.value }))
                  }
                  className={getInputClass(personal.name)}
                  placeholder="e.g. Alexander Hamilton"
                  type="text"
                />
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                Professional Title
              </label>
              <div className="relative">
                <input
                  name="role"
                  value={personal.role || ""}
                  onChange={(e) =>
                    dispatch(updatePersonal({ role: e.target.value }))
                  }
                  className={getInputClass(personal.role)}
                  placeholder="e.g. Senior Software Engineer"
                  type="text"
                />
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                Description{" "}
              </label>
              <div className="relative">
                <ReactQuill
                  theme="snow"
                  value={personal.summary || ""}
                  onChange={(value) =>
                    dispatch(updatePersonal({ summary: value }))
                  }
                  className="bg-white rounded-xl [&_.ql-editor]:min-h-[150px]"
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["clean"],
                    ],
                    clipboard: {
                      matchVisual: false,
                    },
                  }}
                  formats={["bold", "italic", "underline", "strike", "list"]}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                Email Address
              </label>
              <div className="relative">
                <input
                  name="email"
                  value={personal.email || ""}
                  onChange={(e) =>
                    dispatch(updatePersonal({ email: e.target.value }))
                  }
                  className={getInputClass(personal.email)}
                  placeholder="name@example.com"
                  type="email"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                Phone Number
              </label>
              <div className="relative">
                <input
                  name="phone"
                  value={personal.phone || ""}
                  onChange={(e) =>
                    dispatch(updatePersonal({ phone: e.target.value }))
                  }
                  className={getInputClass(personal.phone)}
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                />
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                Location
              </label>
              <div className="relative">
                <input
                  name="location"
                  value={personal.location || ""}
                  onChange={(e) =>
                    dispatch(updatePersonal({ location: e.target.value }))
                  }
                  className={getInputClass(personal.location)}
                  placeholder="e.g. New York, NY"
                  type="text"
                />
              </div>
            </div>

            {/* Photo upload - only show for templates with photos */}
            {showPhotoUpload && (
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                  Photo
                </label>
                <div className="relative">
                  <input
                    onChange={handleImageUpload}
                    className={
                      "w-full bg-white border-2 p-3 border-gray-200 active:border-primary focus:border-primary rounded-xl text-sm font-medium h-12 "
                    }
                    placeholder="Upload your photo"
                    type="file"
                    accept="image/*"
                  />
                </div>
              </div>
            )}

            {/* Social Links Section */}
            <div className="md:col-span-2 flex flex-col gap-3 mt-4">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                Social Links / Websites
              </label>
              <div className="space-y-3">
                {personal.socialLinks?.map((link) => (
                  <div key={link.id} className="flex items-center gap-2">
                    <div className="flex-1">
                      <input
                        type="url"
                        value={link.url || ""}
                        onChange={(e) =>
                          dispatch(
                            updateSocialLink({
                              id: link.id,
                              field: "url",
                              value: e.target.value,
                            }),
                          )
                        }
                        placeholder="https://linkedin.com/in/..."
                        className="w-full bg-white border-2 border-[#e7e7f3] focus:border-primary p-3 rounded-xl text-sm font-medium h-12 outline-none transition-colors"
                      />
                    </div>
                    <button
                      onClick={() => dispatch(removeSocialLink(link.id))}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      type="button"
                      title="Remove Link"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => dispatch(addSocialLink())}
                className="text-sm text-primary font-bold hover:underline flex items-center gap-1 w-fit"
              >
                + Add Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetils;
