import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'
import Category from '../models/categoryModel.js'
import { addDecimals } from '../utils/calcPrices.js'

const searchProducts = asyncHandler(async (req, res) => {
  const pageSize = 6
  const page = Number(req.query.page) || 1

  let search = {}

  if (req.query.keyword) {
    search = {
      $or: [
        { name: { $regex: req.query.keyword, $options: 'i' } },
        { brand: { $regex: req.query.keyword, $options: 'i' } },
        { description: { $regex: req.query.keyword, $options: 'i' } },
      ],
    }
  }

  if (req.query.categoryId) {
    search.category = await Category.findById(req.query.categoryId)
  }

  if (+req.query.minPrice > 0 || +req.query.maxPrice > 0) {
    search.price = {}
    if (+req.query.minPrice > 0) {
      search.price.$gte = parseFloat(+req.query.minPrice)
    }
    if (+req.query.maxPrice > 0) {
      search.price.$lte = parseFloat(+req.query.maxPrice)
    }
  }

  if (req.query.inStock === 'on') {
    search.countInStock = { $gt: 0 }
  }

  const count = await Product.countDocuments({ ...search })

  const pages = Math.ceil(count / pageSize)

  let sortCriteria = {}
  if (req.query.sortBy === 'asc') {
    sortCriteria = { price: -1 }
  } else if (req.query.sortBy === 'desc') {
    sortCriteria = { price: 1 }
  } else {
    sortCriteria = {}
  }

  const products = await Product.find({ ...search })
    .sort(sortCriteria)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate('category', 'name')

  res.status(200).json({ products, page, pages })
})

const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ featured: true }).populate(
    'category',
    'name'
  )

  res.status(200).json(products)
})

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .sort({ countInStock: -1 })
    .populate('category', 'name')

  res.status(200).json(products)
})

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    'category',
    'name'
  )

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  res.status(200).json(product)
})

const createProduct = asyncHandler(async (req, res) => {
  const {
    categoryId,
    brand,
    name,
    price,
    salePrice,
    description,
    countInStock,
    featured,
    images,
  } = req.body

  const product = new Product({
    user: req.user._id,
    category: categoryId,
    name,
    price: addDecimals(price),
    salePrice: addDecimals(salePrice),
    brand,
    description,
    countInStock,
    featured,
    images,
  })

  const addedProduct = await product.save()

  if (!addedProduct) {
    res.status(400)
    throw new Error('Product not added')
  }

  res.status(201).json(addedProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
  const {
    categoryId,
    brand,
    name,
    price,
    salePrice,
    description,
    countInStock,
    featured,
    images,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  product.user = req.user._id
  product.category = categoryId
  product.brand = brand
  product.name = name
  product.price = addDecimals(price)
  product.salePrice = addDecimals(salePrice)
  product.description = description
  product.countInStock = countInStock
  product.featured = featured
  product.images = images

  const updatedProduct = await product.save()

  if (!updatedProduct) {
    res.status(404)
    throw new Error('Product not updated')
  }

  res.status(201).json(updatedProduct)
})

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error('Product not found!')
  }

  await Product.deleteOne({ _id: product._id })

  res.status(200).json({ message: 'Product removed' })
})

export {
  searchProducts,
  getFeaturedProducts,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
