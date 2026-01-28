
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

console.log(initialState);


const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {
        setTemplate(staet, action) {
            staet.selectedTemplate = action.payload
        }
    }
})


export const { setTemplate } = resumeSlice.actions


export default resumeSlice.reducer