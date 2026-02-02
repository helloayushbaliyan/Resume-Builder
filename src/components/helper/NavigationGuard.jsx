"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function NavigationGuard() {
  const resumeData = useSelector((state) => state.resume.resumeData);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Basic check: if resumeData exists (it always does), warn.
      const hasData =
        resumeData.personal?.name ||
        resumeData.personal?.email ||
        resumeData.experience?.length > 0 ||
        resumeData.education?.length > 0 ||
        resumeData.skills?.length > 0;

      if (hasData) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [resumeData]);

  // Handle client-side navigation (Back button)
  useEffect(() => {
    const hasData =
      resumeData.personal?.name ||
      resumeData.personal?.email ||
      resumeData.experience?.length > 0 ||
      resumeData.education?.length > 0 ||
      resumeData.skills?.length > 0;

    if (!hasData) return;

    const handlePopState = (event) => {
      // Prevent default simply by pushing state back if user cancels navigation (simulated by confirm)
      // Note: We cannot strictly "prevent" popstate, but we can undo it or warn.
      // A common trick is purely relying on browser confirm, but that's sync.
      // Better UX: Show custom modal? For now, we use window.confirm as a clear blocker.
      if (
        !window.confirm(
          "You have unsaved changes. Are you sure you want to leave?",
        )
      ) {
        // If user stays, we need to correct the history if checking popstate implies they moved.
        // Actually, popstate fires after move. So they ARE back.
        // pushing state forward again might re-render.
        // Simplest mitigation: Just warn. Strict blocking is hard.
        window.history.pushState(null, "", window.location.href);
      }
    };

    // Push a dummy state so 'Back' has something to pop if we want to trap?
    // No, that's too invasive for this task.
    // Just listening to popstate isn't enough to BLOCK, but it can Warn and Redirect back.

    // Actually, simplest fix for "Alert not showing": Next.js doesn't trigger beforeunload on back.
    // Adding window.confirm in popstate is the standard "best effort".

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [resumeData]);

  return null;
}
