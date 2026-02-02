import React from "react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="font-bold text-2xl mb-4 text-black">ResumePro</h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Create professional resumes in minutes. Stand out from the crowd
              and get hired faster.
            </p>
          </div>

          {/* Links Section 1 */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-black">Product</h3>
            <ul className="space-y-3 text-gray-500">
              <li>
                <Link
                  href="/templates"
                  className="hover:text-blue-600 transition-colors"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="hover:text-blue-600 transition-colors"
                >
                  Resume Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Section 2 */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-bold text-lg mb-4 text-black">Support</h3>
            <ul className="space-y-3 text-gray-500">
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-blue-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-blue-600 transition-colors"
                >
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} ResumePro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
