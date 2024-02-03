import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from '@/app/login/authslice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware),

    devTools: true
})