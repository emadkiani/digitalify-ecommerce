import { apiSlice } from './apiSlice'

const PRODUCTS_URL = '/api/products'

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchProducts: builder.query({
      query: ({
        keyword,
        page,
        categoryId,
        minPrice,
        maxPrice,
        sortBy,
        inStock,
      }) => ({
        url: `${PRODUCTS_URL}/search`,
        params: {
          keyword,
          page,
          categoryId,
          minPrice,
          maxPrice,
          sortBy,
          inStock,
        },
      }),
      keepUnusedDataFor: 30,
      providesTags: ['Products'],
    }),
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 30,
      providesTags: ['Products'],
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnsendDataFor: 30,
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: PRODUCTS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      providesTags: ['Product'],
    }),
    getFeaturedProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/featured`,
      }),
      keepUnsendDataFor: 30,
      providesTags: ['Products'],
    }),
  }),
})

export const {
  useSearchProductsQuery,
  useGetFeaturedProductsQuery,
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApiSlice
