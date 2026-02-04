import Simple from "@/components/templates/Simple";
import Modern from "@/components/templates/Modern";
import Creative from "@/components/templates/Creative";
import Elegant from "@/components/templates/Elegant";
import Professional from "@/components/templates/Professional";

export const templates = [
    {
        id: 1,
        name: "Professional",
        component: Professional,
        category: "Modern",
        description: "Clean, modern layout perfect for tech and corporate roles",
        image: "/images/professional-template-1.png",
        hasPhoto: false,
    },
    {
        id: 2,
        name: "Modern",
        component: Modern,
        category: "Modern",
        description: "Contemporary design with clear hierarchy for all industries",
        image: "/images/modern-template.png",
        hasPhoto: true,
    },
    {
        id: 3,
        name: "Elegant",
        component: Elegant,
        category: "Executive",
        description: "Sophisticated and polished, ideal for senior positions",
        image: "/images/elegant-template.png",
        hasPhoto: true,
    },
    {
        id: 4,
        name: "Creative",
        component: Creative,
        category: "Modern",
        description: "Bold professional design with strong visual impact",
        image: "/images/creative-template.png",
        hasPhoto: true,
    },
    {
        id: 5,
        name: "Simple",
        component: Simple,
        category: "Minimal",
        description: "Structured and reliable, perfect for traditional fields",
        image: "/images/simple-template.png",
        hasPhoto: false,
    }
];

