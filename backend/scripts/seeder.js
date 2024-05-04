import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { connectMongoDB } from '../config/db.js'
import users from '../data/users.js'
import categories from '../data/categories.js'
import products from '../data/products.js'
import Category from '../models/categoryModel.js'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'
import Order from '../models/orderModel.js'

dotenv.config()

connectMongoDB()

async function Seed() {
  try {
    await DestroyData()
    await ImportData()

    console.log('Seeding complete')
    process.exit()
  } catch (error) {
    console.error(`Error: ${error}`)
    process.exit(1)
  }
}

async function ImportData() {
  const createdUsers = await User.insertMany(users)

  const createdCategories = await Category.insertMany(categories)

  const unknownCategoryId = createdCategories[0]._id
  const sampleProducts = products.map((product) => {
    return { category: unknownCategoryId, ...product }
  })

  const createdProducts = await Product.insertMany(sampleProducts)
}

async function DestroyData() {
  await Category.deleteMany()
  await Product.deleteMany()
  await User.deleteMany()
  await Order.deleteMany()
}

Seed()
