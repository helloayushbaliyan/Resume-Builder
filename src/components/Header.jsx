import Image from "next/image";
import React from "react";
import Link from "next/link";

function Header() {
  return (
    <header className="sticky top-0 l z-50 w-full border-b border-solid border-[#e7e7f3] bg-white/80 backdrop-blur-md">
      <div className="container px-4 md:mx-auto h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="size-8 text-[#1617e8]">
            <svg
              fill="currentColor"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">ResumePro</h2>
        </Link>
      </div>
    </header>
  );
}

export default Header;
