import { createSlice } from "@reduxjs/toolkit";
import jwt from 'jsonwebtoken'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null
    },

    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload
            console.log(action.payload);

            state.user = user
            state.token = accessToken
        },


        logOut: (state) => {
            state.user = null,
                state.token = null
        },


        setNewToken: (state, action) => {
            const { accessToken } = action.payload
            const user = jwt.decode(accessToken) as any;
            
            state.user = user;
            state.token = accessToken
        }
    }
})


export const { setCredentials, logOut, setNewToken } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state: any) => state.auth.user
export const selectCurrentToken = (state: any) => state.auth.token