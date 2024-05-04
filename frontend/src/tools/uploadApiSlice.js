import { apiSlice } from './apiSlice'

export const uploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useUploadImageMutation } = uploadApiSlice
