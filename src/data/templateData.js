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
        description: "A structured, clean layout designed for clarity and consistency in professional and technical roles.",
        image: "/images/professional-template-1.png",
        hasPhoto: false,
    },
    {
        id: 2,
        name: "Modern",
        component: Modern,
        category: "Modern",
        description: "A contemporary design with clear hierarchy, suitable across industries and experience levels.",
        image: "/images/modern-template.png",
        hasPhoto: true,
    },
    {
        id: 3,
        name: "Elegant",
        component: Elegant,
        category: "Executive",
        description: "A refined, understated layout suited for senior, leadership, and executive positions.",
        image: "/images/elegant-template.png",
        hasPhoto: true,
    },
    {
        id: 4,
        name: "Creative",
        component: Creative,
        category: "Modern",
        description: "A visually distinctive layout that balances personality with professional structure.",
        image: "/images/creative-template.png",
        hasPhoto: true,
    },
    {
        id: 5,
        name: "Simple",
        component: Simple,
        category: "Fresher",
        description: "A straightforward, no-frills layout ideal for students, freshers, and early career roles.",
        image: "/images/simple-template.png",
        hasPhoto: false,
    }
];
