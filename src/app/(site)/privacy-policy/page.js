import React from "react";

// Title: 42 chars, Description: 157 chars
export const metadata = {
    title: "Privacy Policy - Cvee Resume Builder",
    description: "Read our privacy policy to understand how Cvee handles your data. We prioritize your privacy and security while you create your professional resume.",
    alternates: {
        canonical: "/privacy-policy",
    },
};

export default function PrivacyPolicy() {
    return (
        <div className="container px-4 mx-auto py-16 md:py-24 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-slate-900">Privacy Policy</h1>
            <div className="prose prose-slate max-w-none text-slate-600">
                <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

                <p className="mb-6">
                    At ResumePro, we take your privacy seriously. This Privacy Policy
                    explains how we collect, use, and protect your personal information.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-slate-900">Information We Collect</h2>
                <p className="mb-4">
                    We collect information that you voluntarily provide to us when you use
                    our resume builder, including:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Contact information (name, email, phone number)</li>
                    <li>Professional experience and education details</li>
                    <li>Skills and other resume content</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-slate-900">How We Use Your Information</h2>
                <p className="mb-6">
                    We use your information solely for the purpose of:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Generating and managing your resumes</li>
                    <li>Providing customer support</li>
                    <li>Improving our services</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-slate-900">Data Security</h2>
                <p className="mb-6">
                    We implement appropriate technical and organizational measures to
                    protect your personal data against unauthorized access, alteration, or
                    destruction.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-slate-900">Contact Us</h2>
                <p className="mb-6">
                    If you have any questions about this Privacy Policy, please contact us.
                </p>
            </div>
        </div>
    );
}
