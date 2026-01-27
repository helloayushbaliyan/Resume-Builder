import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="font-bold text-2xl mb-4 text-black">Resume</h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Create professional resumes in minutes. Stand out from the crowd
              and get hired faster.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<FaFacebookF />} />
              <SocialIcon icon={<FaTwitter />} />
              <SocialIcon icon={<FaLinkedinIn />} />
              <SocialIcon icon={<FaInstagram />} />
            </div>
          </div>

          {/* Links Section 1 */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-black">Product</h3>
            <ul className="space-y-3 text-gray-500">
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  Examples
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Section 2 */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-black">Support</h3>
            <ul className="space-y-3 text-gray-500">
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-black">Stay Updated</h3>
            <p className="text-gray-500 mb-4">
              Subscribe to our newsletter for the latest tips and updates.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors w-full"
              />
              <button className="bg-[#1617e8] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Resume Builder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }) {
  return (
    <a
      href="#"
      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#1617e8] hover:text-white transition-all duration-300"
    >
      {icon}
    </a>
  );
}

export default Footer;
