
"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedTemplate: 1,
    step: 1,

    resumeData: {
        personal: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 234 567 890",
            role: "Software Engineer",
            summary: "Highly motivated and detail-oriented Software Engineer with 5+ years of experience in developing scalable web applications and working with modern JavaScript frameworks.",
        },
        education: [
            {
                id: 1,
                school: "State University",
                degree: "Bachelor of Science in Computer Science",
                city: "New York, NY",
                startDate: "2015",
                endDate: "2019",
            }
        ],
        experience: [
            {
                id: 1,
                company: "Tech Innovations Inc.",
                position: "Senior Frontend Developer",
                city: "San Francisco, CA",
                startDate: "2020",
                endDate: "Present",
                description: "Lead developer for the core product dashboard, improving performance by 40%.",
            }
        ],
        skills: ["JavaScript", "React", "Redux", "Node.js", "Tailwind CSS", "TypeScript"],
        projects: [
            {
                id: 1,
                name: "E-commerce Platform",
                description: "Built a full-stack e-commerce solution with integrated payment gateways.",
                link: "https://github.com/johndoe/ecommerce",
            }
        ],
    },
};



const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {
        selectTemplate(staet, action) {
            staet.selectedTemplate = action.payload
        },
        nextStep(staet, action) {
            staet.step = staet.step + 1
        },
        previousStep(staet, action) {
            staet.step = staet.step - 1
        },
        updatePersonal(state, action) {
            state.resumeData.personal = { ...state.resumeData.personal, ...action.payload }
        }
    }
})


export const { selectTemplate, nextStep, previousStep, updatePersonal } = resumeSlice.actions


export default resumeSlice.reducer