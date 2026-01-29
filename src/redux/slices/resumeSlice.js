
"use client";

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    selectedTemplate: 1,
    step: 1,

    resumeData: {
        personal: {},
        education: [
            {
                id: 1,
                school: "",
                degree: "",
                startDate: "",
                endDate: "",
            }
        ],
        experience: [
            {
                id: 1,
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                description: "",
            }
        ],
        skills: [
            {
                id: 1,
                skill: "",
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

        addSkills(state, action) {
            state.resumeData.skills.push({
                id: state.resumeData.skills.length + 1,
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

        resetResume(state) {
            state.resumeData = initialState.resumeData;
            state.step = 1;
            state.selectedTemplate = null;
        },
    }
})


export const { selectTemplate, nextStep, previousStep, updatePersonal, updateEducation, updateExperience, updateSkills, addEducation, addExperience, addSkills, resetResume } = resumeSlice.actions


export default resumeSlice.reducer