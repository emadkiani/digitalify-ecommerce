import express from 'express'

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoriesController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

const router = express.Router()

router.route('/').get(getCategories).post(protect, admin, createCategory)
router
  .route('/:id')
  .get(checkObjectId, getCategoryById)
  .put(protect, admin, checkObjectId, updateCategory)
  .delete(protect, admin, checkObjectId, deleteCategory)

export default router
