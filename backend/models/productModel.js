import mongoose from 'mongoose'

const imagesSchem = mongoose.Schema({
  url: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 2048,
  },
})

const productSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    brand: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10000,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0.0,
      min: 0.0,
      max: 5.0,
    },
    numReviews: {
      type: Number,
      default: 0,
      min: 0.0,
      max: 999999.99,
    },
    price: {
      type: Number,
      default: 0.0,
      min: 0.0,
      max: 999999.99,
    },
    salePrice: {
      type: Number,
      default: 0.0,
      min: 0.0,
      max: 999999.99,
    },
    countInStock: {
      type: Number,
      default: 0,
      min: 0,
      max: 999,
    },
    images: [imagesSchem],
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
