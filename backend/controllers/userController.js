import asyncHandler from '../middleware/asyncHandler.js'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const enteredEmail = String(email).trim().toLowerCase().split(' ').join('')
  const enteredPassword = String(password).trim().split(' ').join('')

  const user = await User.findOne({ email: enteredEmail })

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (!(await user.matchPassword(enteredPassword))) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  generateToken(res, user._id)

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  })
})

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const enteredName = String(name).trim()
  const enteredEmail = String(email).trim().toLowerCase().split(' ').join('')
  const enteredPassword = String(password).trim().split(' ').join('')

  const user = await User.findOne({ email: enteredEmail })

  if (user) {
    res.status(400)
    throw new Error('User already exists')
  }

  const registeredUser = await User.create({
    name: enteredName,
    email: enteredEmail,
    password: enteredPassword,
  })

  if (!registeredUser) {
    res.status(400)
    throw new Error('Invalid user data')
  }

  generateToken(res, registeredUser._id)

  res.status(201).json({
    _id: registeredUser._id,
    name: registeredUser.name,
    email: registeredUser.email,
    role: registeredUser.role,
  })
})

const logoutUser = asyncHandler((req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({ message: 'Logged out successfully' })
})

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  })
})

const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body
  const enteredName = String(name).trim()
  const enteredEmail = String(email).trim().toLowerCase().split(' ').join('')

  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  user.name = enteredName
  user.email = enteredEmail

  const updatedUser = await user.save()

  if (!updatedUser) {
    res.status(400)
    throw new Error('Invalid input')
  }

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
  })
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})

  res.json(users)
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  })
})

const updateUser = asyncHandler(async (req, res) => {
  const { name, email, role } = req.body

  const enteredName = String(name).trim()
  const enteredEmail = String(email).trim().toLowerCase().split(' ').join('')
  const enteredRole = String(role).trim().toLowerCase().split(' ').join('')

  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  user.name = enteredName
  user.email = enteredEmail
  user.role = enteredRole

  const updatedUser = await user.save()

  if (!updatedUser) {
    res.status(401)
    throw new Error('Invalid input')
  }

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  })
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  await User.deleteOne({ _id: user._id })

  res.json({ message: 'User removed' })
})

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
}
