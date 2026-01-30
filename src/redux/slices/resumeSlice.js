
"use client";

import { createSlice, nanoid } from "@reduxjs/toolkit";



const initialState = {
    selectedTemplate: 1,
    step: 1,

    resumeData: {
        personal: {},
        education: [],
        experience: [],
        skills: [],
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
                id: nanoid(),
                school: "",
                degree: "",
                startDate: "",
                endDate: "",
                currentlyStudying: false,
            })
        },
        updateEducation(state, action) {
            const { id, field, value } = action.payload;
            const edu = state.resumeData.education.find((e) => e.id === id);
            if (edu) {
                edu[field] = value;
            }
        },
        removeEducation(state, action) {
            state.resumeData.education = state.resumeData.education.filter(edu => edu.id !== action.payload);
        },
        addExperience(state, action) {
            state.resumeData.experience.push({
                id: nanoid(),
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                description: "",
                currentlyWorking: false,
            })
        },

        updateExperience(state, action) {
            const { id, field, value } = action.payload;
            const exp = state.resumeData.experience.find((e) => e.id === id);
            if (exp) {
                exp[field] = value;
            }
        },
        removeExperience(state, action) {
            state.resumeData.experience = state.resumeData.experience.filter(exp => exp.id !== action.payload);
        },

        addSkills(state, action) {
            state.resumeData.skills.push({
                id: nanoid(),
                skill: "",
            })
        },
        updateSkills(state, action) {
            const { id, field, value } = action.payload;
            const skill = state.resumeData.skills.find((e) => e.id === id);
            if (skill) {
                skill[field] = value;
            }
        },
        removeSkills(state, action) {
            state.resumeData.skills = state.resumeData.skills.filter(skill => skill.id !== action.payload);
        },

        resetResume(state) {
            state.resumeData = initialState.resumeData;
            state.step = 1;
            state.selectedTemplate = null;
        },
    }
})


export const { selectTemplate, nextStep, previousStep, updatePersonal, updateEducation, removeEducation, updateExperience, removeExperience, updateSkills, addEducation, addExperience, addSkills, removeSkills, resetResume } = resumeSlice.actions


export default resumeSlice.reducer