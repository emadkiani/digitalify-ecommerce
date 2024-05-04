import express from 'express'

import {
  searchProducts,
  getFeaturedProducts,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

const router = express.Router()

router.route('/search').get(searchProducts)
router.route('/featured').get(getFeaturedProducts)
router.route('/').get(getProducts).post(protect, admin, createProduct)
router
  .route('/:id')
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct)

export default router
