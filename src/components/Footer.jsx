import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-[#E5E7EB]">
      <div className="container px-6 md:px-8 lg:px-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="#">
              <img src="/logo.png" alt="Cvee Logo" className="w-24" />
              </div>
            </div>
            <p className="text-[#6B7280] text-[15px] leading-relaxed max-w-[360px]">
              Cvee helps you create clean, professional resumes without unnecessary complexity.
              Free to use, with no sign-up required.
            </p>
          </div>

          {/* Links Section */}
          <div className="col-span-1 md:col-span-7 grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-[15px] mb-4 text-[#111827]">Important Links</h3>
              <ul className="space-y-3 text-[#6B7280] text-[14px]">
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-[#111827] transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-[#111827] transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="hover:text-[#111827] transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-[15px] mb-4 text-[#111827]">Legal Information</h3>
              <ul className="space-y-3 text-[#6B7280] text-[14px]">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-[#111827] transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="hover:text-[#111827] transition-colors"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E5E7EB] pt-8">
          <p className="text-[#9CA3AF] text-[14px]">
            © {new Date().getFullYear()} Cvee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
