import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'

import { connectMongoDB } from './config/db.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

const port = process.env.PORT || 5000

connectMongoDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('uploads/'))
app.use(cookieParser())

app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use(notFound)
app.use(errorHandler)

app.listen(port, () =>
  console.log(
    `server is running, mode: ${process.env.NODE_ENV} & port: ${port}`
  )
)
