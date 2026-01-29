
import BuilderClient from "./BuilderClient";

export const metadata = {
    title: "Resume Editor",
    description: "Edit and customize your professional resume. Real-time preview and multiple templates available.",
};

export default function BuilderPage() {
    return <BuilderClient />;
}