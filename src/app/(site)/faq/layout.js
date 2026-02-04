// Layout wrapper for FAQ page to add metadata
// Title: 60 chars, Description: 159 chars
export const metadata = {
    title: "FAQ - Resume Builder Questions Answered | Cvee",
    description: "Common questions about our free resume builder. Learn about templates, ATS compatibility, privacy, downloads, and creating professional resumes online.",
    alternates: {
        canonical: "/faq",
    },
};

export default function FAQLayout({ children }) {
    return children;
}
