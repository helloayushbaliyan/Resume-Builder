
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
            },
        ],
        skills: ["JavaScript", "React", "Redux", "Node.js", "Tailwind CSS", "TypeScript"],
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
        },
        addEducation(state, action) {
            state.resumeData.education.push({
                id: state.resumeData.education.length + 1,
                school: "",
                degree: "",
                startDate: "",
                endDate: "",
            })
        },
        updateEducation(state, action) {
            const { id, field, value } = action.payload;
            const edu = state.resumeData.education.find((e) => e.id === id);
            if (edu) {
                edu[field] = value;
            }
        },
        addExperience(state, action) {
            state.resumeData.experience.push({
                id: state.resumeData.experience.length + 1,
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                description: "",
            })
        },

        updateExperience(state, action) {
            const { id, field, value } = action.payload;
            const exp = state.resumeData.experience.find((e) => e.id === id);
            if (exp) {
                exp[field] = value;
            }
        },

        updateSkills(state, action) {
            state.resumeData.skills = { ...state.resumeData.skills, ...action.payload }
        }
    }
})


export const { selectTemplate, nextStep, previousStep, updatePersonal, updateEducation, updateExperience, updateSkills, addEducation, addExperience } = resumeSlice.actions


export default resumeSlice.reducer