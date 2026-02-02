import React from "react";

export const metadata = {
    title: "About Us - ResumePro",
    description: "Learn more about ResumePro and our mission to help job seekers.",
};

export default function AboutUs() {
    return (
        <div className="container px-4 mx-auto py-16 md:py-24 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-slate-900">About Us</h1>
            <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                    ResumePro is dedicated to helping job seekers create professional,
                    ATS-friendly resumes with ease. Our goal is to simplify the job
                    application process and empower you to land your dream job.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-slate-900">Our Mission</h2>
                <p className="mb-6 text-slate-600">
                    We believe that a great resume shouldn't be hard to build. We provide
                    expert-designed templates and intuitive tools to help you showcase your
                    skills and experience effectively.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-slate-900">What We Offer</h2>
                <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-2">
                    <li>Professional, ATS-optimized resume templates</li>
                    <li>Easy-to-use builder interface</li>
                    <li>Real-time preview and customization</li>
                    <li>Instant PDF downloads</li>
                </ul>
            </div>
        </div>
    );
}
