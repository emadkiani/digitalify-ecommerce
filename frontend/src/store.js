import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './tools/apiSlice'
import cartSliceReducer from './tools/cartSlice'
import authSliceReducer from './tools/authSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

export default store
