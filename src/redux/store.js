import { configureStore } from "@reduxjs/toolkit";
import resumeSlice from "./slices/resumeSlice";

export default configureStore({
    reducer: {
        resume: resumeSlice,
    },
});