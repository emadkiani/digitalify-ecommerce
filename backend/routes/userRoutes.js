import express from 'express'
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router.route('/').get(protect, admin, getUsers)
router
  .route('/:id')
  .get(protect, admin, checkObjectId, getUserById)
  .put(protect, admin, checkObjectId, updateUser)
  .delete(protect, admin, checkObjectId, deleteUser)

export default router
