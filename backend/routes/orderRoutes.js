import express from 'express'

import {
  getUserOrders,
  getUserOrderById,
  createOrder,
  payOrder,
  getOrders,
  getOrderById,
  updateOrderPaymentStatus,
  updateOrderShippingStatus,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

const router = express.Router()

router.route('/').post(protect, createOrder).get(protect, admin, getOrders)
router.route('/user').get(protect, getUserOrders)
router.route('/user/:id').get(protect, checkObjectId, getUserOrderById)
router.route('/user/:id/pay').put(protect, checkObjectId, payOrder)
router.route('/:id').get(protect, admin, checkObjectId, getOrderById)
router
  .route('/:id/payment')
  .put(protect, admin, checkObjectId, updateOrderPaymentStatus)
router
  .route('/:id/shipping')
  .put(protect, admin, checkObjectId, updateOrderShippingStatus)

export default router
