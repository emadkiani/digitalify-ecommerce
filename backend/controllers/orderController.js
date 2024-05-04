import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import calcPrices from '../utils/calcPrices.js'

const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  })

  res.status(200).json(orders)
})

const getUserOrderById = asyncHandler(async (req, res) => {
  const orderAndUserInfo = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (!orderAndUserInfo) {
    res.status(404)
    throw new Error('Order not found')
  }

  if (!orderAndUserInfo.user._id.equals(req.user._id)) {
    res.status(404)
    throw new Error('Not user order')
  }

  res.status(200).json(orderAndUserInfo)
})

const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, paymentMethod, shippingAddress } = req.body

  if (orderItems?.length === 0) {
    res.status(400)
    throw new Error('No order items')
  }

  const userOrderItems = []

  for (let orderItem of orderItems) {
    const product = await Product.findById(orderItem._id)

    if (!product) {
      res.status(404)
      throw new Error('Product not found')
    }

    if (orderItem.quantity > product.countInStock) {
      res.status(400)
      throw new Error('Product out of stock')
    }

    product.countInStock = product.countInStock - orderItem.quantity

    if (product.countInStock < 0) {
      res.status(400)
      throw new Error('Product out of stock')
    }

    await product.save()

    userOrderItems.push({
      product: product._id,
      brand: product.brand,
      name: product.name,
      quantity: orderItem.quantity,
      imageUrl: product.images[0].url,
      price: product.salePrice,
    })
  }

  const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
    calcPrices(userOrderItems)

  const order = new Order({
    user: req.user._id,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    shippingAddress,
    orderItems: userOrderItems,
  })

  const addedOrder = await order.save()

  if (!addedOrder) {
    res.status(400)
    throw new Error('Order not added!')
  }

  res.status(201).json(addedOrder)
})

const payOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error('Order not found!')
  }

  order.isPaid = true
  order.paymentResult = 'Success'
  order.paidAt = Date.now()

  const updatedOrder = await order.save()

  if (!updatedOrder) {
    res.status(404)
    throw new Error('Order not payed')
  }

  res.status(200).json(updatedOrder)
})

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .sort({ createdAt: -1 })
    .populate('user', 'id name email')

  res.status(200).json(orders)
})

const getOrderById = asyncHandler(async (req, res) => {
  const orderAndUserInfo = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (!orderAndUserInfo) {
    res.status(404)
    throw new Error('Order not found!')
  }

  res.status(200).json(orderAndUserInfo)
})

const updateOrderPaymentStatus = asyncHandler(async (req, res) => {
  const { isPaid, message } = req.body
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error('Order not found!')
  }

  order.isPaid = isPaid
  order.paymentResult = message

  if (isPaid) {
    order.paidAt = Date.now()
  }

  const updatedOrder = await order.save()

  if (!updatedOrder) {
    res.status(404)
    throw new Error('Order payment not updated')
  }

  res.status(200).json(updatedOrder)
})

const updateOrderShippingStatus = asyncHandler(async (req, res) => {
  const { isDelivered, message } = req.body

  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }

  order.isDelivered = isDelivered
  order.shippingStatus = message

  if (isDelivered) {
    order.deliveredAt = Date.now()
  }

  const updatedOrder = await order.save()

  if (!updatedOrder) {
    res.status(404)
    throw new Error('Order shipping not updated')
  }

  res.status(200).json(updatedOrder)
})

export {
  getUserOrders,
  getUserOrderById,
  createOrder,
  payOrder,
  getOrders,
  getOrderById,
  updateOrderPaymentStatus,
  updateOrderShippingStatus,
}
