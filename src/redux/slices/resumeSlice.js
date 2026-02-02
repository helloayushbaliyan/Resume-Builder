
"use client";

import { createSlice, nanoid } from "@reduxjs/toolkit";



const initialState = {
    selectedTemplate: null,
    step: 1,

    resumeData: {
        personal: {},
        education: [],
        experience: [],
        skills: [],
        certifications: [],
        languages: [],
        references: [],
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
            const skill = action.payload;
            if (skill && !state.resumeData.skills.includes(skill)) {
                state.resumeData.skills.push(skill);
            }
        },
        // Removed updateSkills as strings are immutable - user should remove and re-add or we could implement index-based update if needed but not required for tag input
        removeSkills(state, action) {
            state.resumeData.skills = state.resumeData.skills.filter(s => s !== action.payload);
        },

        // Certifications
        addCertification(state, action) {
            state.resumeData.certifications.push({
                id: nanoid(),
                name: "",
                issuer: "",
                date: "",
            });
        },
        updateCertification(state, action) {
            const { id, field, value } = action.payload;
            const cert = state.resumeData.certifications.find((c) => c.id === id);
            if (cert) cert[field] = value;
        },
        removeCertification(state, action) {
            state.resumeData.certifications = state.resumeData.certifications.filter((c) => c.id !== action.payload);
        },

        // Languages
        addLanguage(state, action) {
            state.resumeData.languages.push({
                id: nanoid(),
                language: "",
                proficiency: "", // e.g., Fluent, Native, Intermediate
            });
        },
        updateLanguage(state, action) {
            const { id, field, value } = action.payload;
            const lang = state.resumeData.languages.find((l) => l.id === id);
            if (lang) lang[field] = value;
        },
        removeLanguage(state, action) {
            state.resumeData.languages = state.resumeData.languages.filter((l) => l.id !== action.payload);
        },

        // References
        addReference(state, action) {
            state.resumeData.references.push({
                id: nanoid(),
                name: "",
                position: null,
                phone: "",
                email: "",
            });
        },
        updateReference(state, action) {
            const { id, field, value } = action.payload;
            const ref = state.resumeData.references.find((r) => r.id === id);
            if (ref) ref[field] = value;
        },
        removeReference(state, action) {
            state.resumeData.references = state.resumeData.references.filter((r) => r.id !== action.payload);
        },

        resetResume(state) {
            state.resumeData = initialState.resumeData;
            state.step = 1;
            state.selectedTemplate = null;
        },
    }
})


export const {
    selectTemplate,
    nextStep,
    previousStep,
    updatePersonal,
    updateEducation,
    removeEducation,
    updateExperience,
    removeExperience,
    // updateSkills, // Removed
    addEducation,
    addExperience,
    addSkills,
    removeSkills,
    resetResume,
    addCertification,
    updateCertification,
    removeCertification,
    addLanguage,
    updateLanguage,
    removeLanguage,
    addReference,
    updateReference,
    removeReference
} = resumeSlice.actions


export default resumeSlice.reducer