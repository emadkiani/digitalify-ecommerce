import { apiSlice } from './apiSlice'

const ORDERS_URL = '/api/orders'

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/user`,
      }),
      keepUnsendDataFor: 30,
    }),
    getUserOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/user/${orderId}`,
      }),
      keepUnsendDataFor: 30,
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: data,
      }),
    }),
    payOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/user/${data.orderId}/pay`,
        method: 'PUT',
        body: data,
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnsendDataFor: 30,
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnsendDataFor: 30,
    }),
    shippingOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/${data.orderId}/shipping`,
        method: 'PUT',
        body: data,
      }),
    }),
    paymentOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/${data.orderId}/payment`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

export const {
  useCreateOrderMutation,
  useGetUserOrderDetailsQuery,
  useGetUserOrdersQuery,
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useShippingOrderMutation,
  usePaymentOrderMutation,
  usePayOrderMutation,
} = ordersApiSlice
