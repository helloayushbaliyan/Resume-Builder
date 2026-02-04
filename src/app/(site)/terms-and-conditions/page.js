import React from "react";
import TermsAndConditions from "@/components/legal/TermsAndConditions";

// Title: 50 chars, Description: 155 chars
export const metadata = {
    title: "Terms and Conditions - Cvee Resume Builder",
    description: "Read the terms and conditions for using Cvee resume builder. Understand your rights and responsibilities when creating your professional resume.",
    alternates: {
        canonical: "/terms-and-conditions",
    },
};

export default function TermsConditions() {
    return (
        <div className="container px-4 mx-auto py-16 md:py-24 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-slate-900">Terms and Conditions</h1>
            <div className="prose prose-slate max-w-none text-slate-600">
                <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

                <p className="mb-6">
                    Please read these Terms and Conditions carefully before using the ResumePro website.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-slate-900">1. Acceptance of Terms</h2>
                <p className="mb-6">
                    By accessing or using our service, you agree to be bound by these
                    Terms. If you disagree with any part of the terms, then you may not
                    access the service.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-slate-900">2. Use of Service</h2>
                <p className="mb-6">
                    Our service conducts resume building. You are responsible for the
                    accuracy of the information you provide. You agree not to use the
                    service for any illegal or unauthorized purpose.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-slate-900">3. Intellectual Property</h2>
                <p className="mb-6">
                    The service and its original content, features, and functionality are
                    and will remain the exclusive property of ResumePro and its licensors.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-slate-900">4. Termination</h2>
                <p className="mb-6">
                    We may terminate or suspend access to our service immediately, without
                    prior notice or liability, for any reason whatsoever, including without
                    limitation if you breach the Terms.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-slate-900">5. Changes</h2>
                <p className="mb-6">
                    We reserve the right, at our sole discretion, to modify or replace
                    these Terms at any time.
                </p>
            </div>
        </div>
    );
}
