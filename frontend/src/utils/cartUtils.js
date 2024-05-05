import { calcPrices } from './calcPrices'

const addItems = (state, action) => {
  const { rating, numReviews, reviews, ...item } = action.payload

  const addedItem = state.cartItems.find((itm) => itm._id === item._id)

  if (addedItem) {
    state.cartItems = state.cartItems.map((itm) =>
      itm._id === addedItem._id ? item : itm
    )
  } else {
    state.cartItems = [...state.cartItems, item]
  }
}

const removeItems = (state, action) => {
  state.cartItems = state.cartItems.filter(
    (item) => item._id !== action.payload
  )
}

const updateDetails = (state, action) => {
  const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(
    state.cartItems
  )

  state.itemsPrice = itemsPrice
  state.taxPrice = taxPrice
  state.shippingPrice = shippingPrice
  state.totalPrice = totalPrice
}

const addShippingAddress = (state, action) => {
  state.shippingAddress = action.payload
}

const addPaymentMethod = (state, action) => {
  state.paymentMethod = action.payload
}

const clearItems = (state, action) => {
  state.cartItems = []
}

const saveToLocalStorage = (state, action) => {
  localStorage.setItem('cart', JSON.stringify(state))
}

export const addItemsToCart = (state, action) => {
  addItems(state, action)
  updateDetails(state, action)
  saveToLocalStorage(state, action)
}

export const removeItemsFromCart = (state, action) => {
  removeItems(state, action)
  updateDetails(state, action)
  saveToLocalStorage(state, action)
}

export const saveUserShippingAddress = (state, action) => {
  addShippingAddress(state, action)
  saveToLocalStorage(state, action)
}

export const saveUserPaymentMethod = (state, action) => {
  addPaymentMethod(state, action)
  saveToLocalStorage(state, action)
}

export const clearUserCartItems = (state, action) => {
  clearItems(state, action)
  updateDetails(state, action)
  saveToLocalStorage(state, action)
}
