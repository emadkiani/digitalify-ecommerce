import { createSlice } from '@reduxjs/toolkit'

import {
  addItemsToCart,
  removeItemsFromCart,
  saveUserShippingAddress,
  saveUserPaymentMethod,
  clearUserCartItems,
} from '../utils/cartUtils'

const initialCartState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'credit-card' }

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      addItemsToCart(state, action)
    },
    removeFromCart: (state, action) => {
      removeItemsFromCart(state, action)
    },
    saveShippingAddress: (state, action) => {
      saveUserShippingAddress(state, action)
    },
    savePaymentMethod(state, action) {
      saveUserPaymentMethod(state, action)
    },
    clearCartItems: (state, action) => {
      clearUserCartItems(state, action)
    },
    resetCart: (state) => (state = initialCartState),
  },
})

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions

export default cartSlice.reducer
