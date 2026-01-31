"use client";
import React from "react";

/**
 * ResumePage Component
 *
 * A fixed A4-size page container for resume content.
 * Each page maintains exact A4 dimensions (794px × 1123px at 96 DPI).
 *
 * Features:
 * - Exact A4 dimensions for PDF compatibility
 * - Consistent padding for content
 * - Print-friendly with page-break CSS
 * - No overflow clipping - content flows to next page via pagination
 *
 * @param {React.ReactNode} children - Content to render inside the page
 * @param {number} pageNumber - The page number for identification
 * @param {boolean} isLast - Whether this is the last page
 */

// A4 dimensions at 96 DPI
export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1123;
export const PAGE_PADDING_PX = 40; // ~10mm padding
export const USABLE_HEIGHT_PX = A4_HEIGHT_PX - PAGE_PADDING_PX * 2; // ~1043px

function ResumePage({ children, pageNumber = 1, isLast = false }) {
  return (
    <div
      className="resume-page bg-white rounded-sm resume-shadow relative text-[#333]"
      style={{
        width: `${A4_WIDTH_PX}px`,
        minWidth: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        minHeight: `${A4_HEIGHT_PX}px`,
        maxHeight: `${A4_HEIGHT_PX}px`,
        padding: `${PAGE_PADDING_PX}px`,
        boxSizing: "border-box",
        // Prevent content from overflowing visually - pagination handles this
        overflow: "hidden",
        // Print styles
        pageBreakAfter: isLast ? "auto" : "always",
        pageBreakInside: "avoid",
      }}
      data-page-number={pageNumber}
    >
      {children}
    </div>
  );
}

export default ResumePage;
