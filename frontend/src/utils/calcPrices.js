const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

const calcPrices = (orderItems) => {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + (item.salePrice * 100 * item.quantity) / 100,
    0
  )

  const shippingPrice = itemsPrice > 500 ? 0 : 15

  const taxPrice = 0.09 * itemsPrice

  const totalPrice = itemsPrice + shippingPrice + taxPrice

  return {
    itemsPrice: addDecimals(itemsPrice),
    taxPrice: addDecimals(taxPrice),
    shippingPrice: addDecimals(shippingPrice),
    totalPrice: addDecimals(totalPrice),
  }
}

export default calcPrices
