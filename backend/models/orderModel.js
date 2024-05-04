import mongoose from 'mongoose'

const shippingAddressSchema = mongoose.Schema({
  contact: {
    type: Number,
    required: true,
    min: 3,
    maxlength: 15,
  },
  fullAddress: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000,
  },
  city: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  postalCode: {
    type: Number,
    default: 0,
    min: 0,
    max: 99999,
  },
  country: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
})

const orderItemsSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  brand: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0,
    max: 999,
  },
  imageUrl: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 2048,
  },
  price: {
    type: Number,
    default: 0.0,
    min: 0.0,
    max: 999999.99,
  },
})

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    itemsPrice: {
      type: Number,
      default: 0.0,
      min: 0.0,
      max: 999999.99,
    },
    taxPrice: {
      type: Number,
      default: 0.0,
      min: 0.0,
      max: 999999.99,
    },
    shippingPrice: {
      type: Number,
      default: 0.0,
      min: 0.0,
      max: 999999.99,
    },
    totalPrice: {
      type: Number,
      default: 0.0,
      min: 0.0,
      max: 999999.99,
    },
    paymentMethod: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    paymentResult: {
      type: String,
      default: 'Pending',
      minlength: 1,
      maxlength: 1000,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    shippingStatus: {
      type: String,
      default: 'Pending',
      minlength: 3,
      maxlength: 50,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    shippingAddress: shippingAddressSchema,
    orderItems: [orderItemsSchema],
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
