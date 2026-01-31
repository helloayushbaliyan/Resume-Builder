"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { USABLE_HEIGHT_PX } from "@/components/layout/ResumePage";

/**
 * usePagination Hook
 * 
 * A custom React hook that handles automatic pagination of resume content.
 * It measures the real DOM height of each section and distributes them
 * across multiple pages using a bin-packing algorithm.
 * 
 * How it works:
 * 1. Sections are rendered in a hidden measurement container
 * 2. Each section's height is measured using offsetHeight
 * 3. Sections are distributed to pages based on available space
 * 4. Returns paginated arrays ready for rendering
 * 
 * @param {Array} sections - Array of section objects with type and content
 * @param {Object} dependencies - Object of values that trigger re-pagination when changed
 * @returns {Object} { pages, measureRef, isReady }
 */

// Section gap between items on the same page
const SECTION_GAP = 24; // 24px gap between sections

export function usePagination(sections, dependencies = {}) {
    const [pages, setPages] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const measureContainerRef = useRef(null);
    const sectionRefs = useRef({});

    // Create a dependency string for useEffect
    const depString = JSON.stringify(dependencies);

    /**
     * Measures all sections and returns their heights
     */
    const measureSections = useCallback(() => {
        const measurements = [];

        sections.forEach((section, index) => {
            const key = `${section.type}-${index}`;
            const element = sectionRefs.current[key];

            if (element) {
                measurements.push({
                    ...section,
                    key,
                    height: element.offsetHeight,
                });
            }
        });

        return measurements;
    }, [sections]);

    /**
     * Bin-packing algorithm to distribute sections across pages
     * Respects page height constraints and never splits a section
     */
    const paginateSections = useCallback((measuredSections) => {
        if (measuredSections.length === 0) {
            return [[]];
        }

        const paginatedPages = [];
        let currentPage = [];
        let currentPageHeight = 0;
        const maxHeight = USABLE_HEIGHT_PX;

        for (const section of measuredSections) {
            const sectionHeight = section.height;
            const gapHeight = currentPage.length > 0 ? SECTION_GAP : 0;
            const totalRequired = sectionHeight + gapHeight;

            // Check if section fits on current page
            if (currentPageHeight + totalRequired <= maxHeight) {
                currentPage.push(section);
                currentPageHeight += totalRequired;
            } else {
                // Section doesn't fit - start a new page
                if (currentPage.length > 0) {
                    paginatedPages.push(currentPage);
                }
                currentPage = [section];
                currentPageHeight = sectionHeight;
            }
        }

        // Don't forget the last page
        if (currentPage.length > 0) {
            paginatedPages.push(currentPage);
        }

        return paginatedPages.length > 0 ? paginatedPages : [[]];
    }, []);

    /**
     * Main pagination effect
     * Runs whenever sections or dependencies change
     */
    useEffect(() => {
        // Use requestAnimationFrame to ensure DOM is painted
        const timeoutId = setTimeout(() => {
            requestAnimationFrame(() => {
                const measured = measureSections();
                const paginated = paginateSections(measured);
                setPages(paginated);
                setIsReady(true);
            });
        }, 50); // Small delay to ensure all content is rendered

        return () => clearTimeout(timeoutId);
    }, [sections, depString, measureSections, paginateSections]);

    /**
     * Register a section ref for measurement
     */
    const registerRef = useCallback((key, element) => {
        if (element) {
            sectionRefs.current[key] = element;
        }
    }, []);

    return {
        pages,
        isReady,
        measureContainerRef,
        registerRef,
    };
}

export default usePagination;
