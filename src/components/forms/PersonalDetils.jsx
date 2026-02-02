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
import LinkInput from "./LinkInput";

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
                  <LinkInput
                    key={link.id}
                    value={link.url}
                    name={link.name}
                    onChange={(field, val) =>
                      dispatch(
                        updateSocialLink({ id: link.id, field, value: val }),
                      )
                    }
                    onRemove={() => dispatch(removeSocialLink(link.id))}
                    placeholder="https://linkedin.com/in/..."
                  />
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
