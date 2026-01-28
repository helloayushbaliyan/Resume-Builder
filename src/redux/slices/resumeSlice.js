
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
        }
    }
})


export const { selectTemplate } = resumeSlice.actions


export default resumeSlice.reducer