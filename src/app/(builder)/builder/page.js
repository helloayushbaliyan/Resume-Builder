
import BuilderClient from "./BuilderClient";

// Title: 54 chars, Description: 149 chars
export const metadata = {
    title: "Resume Editor - Customize Your Professional Resume",
    description: "Edit and customize your resume online. Real-time preview, multiple templates, instant PDF download. Create your perfect CV in minutes.",
    alternates: {
        canonical: "/builder",
    },
};

export default function BuilderPage() {
    return <BuilderClient />;
}
