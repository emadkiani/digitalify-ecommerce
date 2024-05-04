import asyncHandler from '../middleware/asyncHandler.js'
import Category from '../models/categoryModel.js'

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({})

  res.status(200).json(categories)
})

const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    res.status(404)
    throw new Error('Category not found')
  }

  res.status(200).json(category)
})

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body

  const category = new Category({
    name,
  })

  const addedCategory = await category.save()

  if (!addedCategory) {
    res.status(400)
    throw new Error('Category not added')
  }

  res.status(201).json(addedCategory)
})

const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body

  const category = await Category.findById(req.params.id)

  if (!category) {
    res.status(404)
    throw new Error('Category not found')
  }

  category.name = name

  const updatedCategory = await category.save()

  if (!updatedCategory) {
    res.status(404)
    throw new Error('Category not updated')
  }

  res.status(201).json(updatedCategory)
})

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    res.status(400)
    throw new Error('Category not found')
  }

  await Category.deleteOne({ _id: req.params.id })

  res.status(200).json({ message: 'Category removed' })
})

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
}
