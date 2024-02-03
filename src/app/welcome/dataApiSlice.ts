import { apiSlice } from "@/services/api/apiSlice";

export const dataApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        getData: builder.query({
            query: (url)=> url,
        })
    })
})

export const {useGetDataQuery} = dataApiSlice;