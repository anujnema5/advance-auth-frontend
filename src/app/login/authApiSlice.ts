import { apiSlice } from "@/services/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder=> ({
        login: builder.mutation({
            query: (credentials) => ({
                url : '/auth/sign-in',
                method: 'POST',
                body : {...credentials}
            })
        })
    })
})

export const {useLoginMutation} = authApiSlice