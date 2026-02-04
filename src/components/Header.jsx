"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Templates", href: "/templates" },
    { name: "About Us", href: "/about-us" },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    const closeMenu = () => {
      setIsMenuOpen(false);
    };
    closeMenu();
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E7EB] bg-white/95 backdrop-blur-sm">
      <div className="container px-6 md:px-8 lg:px-12 mx-auto h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:opacity-70 transition-opacity z-50"
        >
          <div className="size-7 text-[#111827]">
             <img src="/logo.png" alt="Cvee Logo" className="cvee__logo" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-[15px] font-medium transition-colors duration-150 ${
                  isActive(link.href)
                    ? "bg-[#F3F4F6] text-[#111827]"
                    : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Trust Cue Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            <span className="text-[12px] font-medium text-blue-900">Free. No signup</span>
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          ref={buttonRef}
          className="md:hidden z-50 p-2 rounded-md hover:bg-[#F9FAFB] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E5E7EB]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`block h-0.5 w-full bg-[#374151] transition-all duration-300 ease-in-out ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-[#374151] transition-all duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-[#374151] transition-all duration-300 ease-in-out ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>

        {/* Mobile Dropdown Menu */}
        <div
          ref={menuRef}
          className={`fixed top-16 left-0 right-0 bg-white/98 backdrop-blur-sm border-b border-[#E5E7EB] md:hidden transition-all duration-300 ease-in-out transform ${
            isMenuOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-4 invisible"
          }`}
        >
          <nav className="container px-6 py-5 flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-md text-[15px] font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-[#F3F4F6] text-[#111827]"
                    : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]"
                } ${
                  isMenuOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 40}ms` : "0ms",
                }}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/10 z-40 md:hidden"
            style={{ top: "64px" }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
