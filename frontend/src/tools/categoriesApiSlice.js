import { apiSlice } from './apiSlice'

const CATEGORIES_URL = '/api/categories'

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: CATEGORIES_URL,
      }),
      keepUnsendDataFor: 30,
      providesTags: ['Categories'],
    }),
    getCategoryDetails: builder.query({
      query: (categoryId) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
      }),
      keepUnsendDataFor: 30,
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: CATEGORIES_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}/${data.categoryId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
        method: 'DELETE',
      }),
      providesTags: ['Category'],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetCategoryDetailsQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice
