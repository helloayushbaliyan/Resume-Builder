
"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedTemplate: null,
    step: 1,

    resumeData: {
        personal: {
            name: "",
            email: "",
            phone: "",
            role: "",
            summary: "",
        },
        education: [],
        experience: [],
        skills: [],
        projects: [],
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