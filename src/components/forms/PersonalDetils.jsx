import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePersonal } from "../../redux/slices/resumeSlice";

function PersonalDetils({ showError }) {
  const dispatch = useDispatch();
  const personal = useSelector((state) => state.resume.resumeData.personal);

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
      {/* <!-- Breadcrumbs --> */}
      <div className="flex items-center gap-2 mb-6">
        <a
          className="text-sm font-medium text-[#4c4c9a] hover:text-primary transition-colors"
          href="#"
        >
          Profile
        </a>
      </div>
      {/* <!-- Progress Bar --> */}
      <div className="flex flex-col gap-2 mb-10">
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold uppercase tracking-wider text-[#4c4c9a]">
            Step 1 of 4
          </p>
          <p className="text-sm font-bold text-primary">25% Complete</p>
        </div>
        <div className="h-2 w-full bg-[#cfcfe7] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4c4c9a] rounded-full transition-all duration-500"
            style={{ width: "25%" }}
          ></div>
        </div>
      </div>
      {/* <!-- Page Heading --> */}
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-4xl font-black tracking-tight">Personal Details</h1>
        <p className="text-[#4c4c9a]"></p>
      </div>

      {/* detils form */}
      <div className="space-y-8 ">
        <div className="bg-[#f6f6f8]  border border-[#e7e7f3] rounded-xl p-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                Full Name
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
                <textarea
                  name="summary"
                  value={personal.summary || ""}
                  onChange={(e) =>
                    dispatch(updatePersonal({ summary: e.target.value }))
                  }
                  className={getInputClass(personal.summary, true)}
                  placeholder="e.g. 5 years of experience in software development"
                  type="text"
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

            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4c4c9a]">
                Photo
              </label>
              <div className="relative">
                <input
                  onChange={handleImageUpload}
                  className={getInputClass()}
                  placeholder="Upload your photo"
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetils;
