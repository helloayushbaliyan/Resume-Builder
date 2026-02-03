import Simple from "@/components/templates/Simple";
import Modern from "@/components/templates/Modern";
import Creative from "@/components/templates/Creative";
import Elegant from "@/components/templates/Elegant";
import Professional from "@/components/templates/Professional";

export const templates = [
    {
        id: "template-simple",
        name: "simple",
        component: Simple,
        description: "Structured &amp; Reliable. Best for Finance and Law.",
        image: "/images/simple-template.png",
        hasPhoto: false, // Simple template doesn't have a photo
    },
    {
        id: "template-modern",
        name: "modern",
        component: Modern,
        description: "Structured &amp; Reliable. Best for Finance and Law.",
        image: "/images/modern-template.png",
        hasPhoto: true, // Modern has photo in header
    },
    {
        id: "template-creative",
        name: "creative",
        component: Creative,
        description: "Bold & Professional. High impact design.",
        image: "/images/creative-template.png",
        hasPhoto: true, // Creative has photo in sidebar
    },
    {
        id: "template-elegant",
        name: "elegant",
        component: Elegant,
        description: "Sophisticated & polished. Ideal for executives.",
        image: "/images/elegant-template.png",
        hasPhoto: true, // Elegant has photo in header
    },
    {
        id: "template-professional",
        name: "professional",
        component: Professional,
        description: "Clean & modern. Perfect for tech professionals.",
        image: "/images/professional-template-1.png",
        hasPhoto: false, // Professional template doesn't have a photo
    }
];

