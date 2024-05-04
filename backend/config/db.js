import mongoose from 'mongoose'

const connectMongoDB = async () => {
  try {
    const mongoDB = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`mongodb connection: ${mongoDB.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export { connectMongoDB }
