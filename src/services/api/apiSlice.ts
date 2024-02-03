import { setCredentials, logOut } from "@/app/login/authslice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8500/api',
    credentials: 'include',
    prepareHeaders: (headers, {getState}: {getState : any})=> {
        const token = getState().auth.token

        if(token) {
            headers.set('Authorization', `Bearer ${token}` )
        }

        return headers
    }
})

const baseQueryWithReauth = async(args : any, api : any, extraOptions : any)=> {
    let result = await baseQuery(args, api, extraOptions)

    if(result.error?.status === 401) {
        console.log("Access token expired");
        
        console.log("Sending refresh token");
        // SEND THE REFRESH TOKEN

        const refreshResult = await baseQuery({url : '/auth/refresh-token', method : 'POST'}, api, extraOptions)

        if(refreshResult?.data) {
            const user = api.getState().auth.user;
            // STORE THE TOKEN

            api.dispatch(setCredentials({...refreshResult, user}))

            // RETRY THE ORIGINAL QUERY WITH NEW ACCESS TOKEN
            result = await baseQuery(args, api, extraOptions)
            
        } else {
            api.dispatch(logOut())
            window.location.href = '/login'
        }
        
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder=>({})
})