import Simple from "@/components/templates/Simple";
import Modern from "@/components/templates/Modern";
import Creative from "@/components/templates/Creative";
import Elegant from "@/components/templates/Elegant";
import { nanoid } from "@reduxjs/toolkit";
export const templates = [
    {
        id: nanoid(),
        name: "simple",
        component: Simple,
        description: "Structured &amp; Reliable. Best for Finance and Law.",
        image:
            "/images/simple-template.png",
    },
    {
        id: nanoid(),
        name: "modern",
        component: Modern,
        description: "Structured &amp; Reliable. Best for Finance and Law.",
        image:
            "/images/modern-template.png",
    },
    {
        id: nanoid(),
        name: "creative",
        component: Creative,
        description: "Bold & Professional. High impact design.",
        image: "/images/creative-template.png", // logic to add image later
    },
    {
        id: nanoid(),
        name: "elegant",
        component: Elegant,
        description: "Sophisticated & polished. Ideal for executives.",
        image: "/images/elegant-template.png",
    }
];
