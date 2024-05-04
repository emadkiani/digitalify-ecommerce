import calcPrices from './calcPrices'

class Cart {
  constructor(state, action) {
    this.state = state
    this.action = action
  }

  addItems() {
    const { rating, numReviews, reviews, ...item } = this.action.payload

    const addedItem = this.state.cartItems.find((itm) => itm._id === item._id)

    if (addedItem) {
      this.state.cartItems = this.state.cartItems.map((itm) =>
        itm._id === addedItem._id ? item : itm
      )
    } else {
      this.state.cartItems = [...this.state.cartItems, item]
    }
  }

  removeItems() {
    this.state.cartItems = this.state.cartItems.filter(
      (item) => item._id !== this.action.payload
    )
  }

  updateDetails() {
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(
      this.state.cartItems
    )

    this.state.itemsPrice = itemsPrice
    this.state.taxPrice = taxPrice
    this.state.shippingPrice = shippingPrice
    this.state.totalPrice = totalPrice
  }

  addShippingAddress() {
    this.state.shippingAddress = this.action.payload
  }

  addPaymentMethod() {
    this.state.paymentMethod = this.action.payload
  }

  clearItems() {
    this.state.cartItems = []
  }

  saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.state))
  }
}

export default Cart
