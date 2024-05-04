import { createSlice } from '@reduxjs/toolkit'

import Cart from '../utils/cartUtils'

const initialCartState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'credit-card' }

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      const cart = new Cart(state, action)

      cart.addItems()
      cart.updateDetails()
      cart.saveToLocalStorage()
    },
    removeFromCart: (state, action) => {
      const cart = new Cart(state, action)

      cart.removeItems()
      cart.updateDetails()
      cart.saveToLocalStorage()
    },
    saveShippingAddress: (state, action) => {
      const cart = new Cart(state, action)

      cart.addShippingAddress()
      cart.saveToLocalStorage()
    },
    savePaymentMethod(state, action) {
      const cart = new Cart(state, action)

      cart.addPaymentMethod()
      cart.saveToLocalStorage()
    },
    clearCartItems: (state, action) => {
      const cart = new Cart(state, action)

      cart.clearItems()
      cart.updateDetails()
      cart.saveToLocalStorage()
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
