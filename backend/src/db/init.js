import mongoose from 'mongoose'

// A function that will initialize the database connection
export async function initDatabase() {
  const DATABASE_URL = process.env.DATABASE_URL

  mongoose.connection.on('open', () => {
    console.log('successfully connected to database', DATABASE_URL)
  })

  try {
    await mongoose.connect(DATABASE_URL)
    console.log('Connected to MongoDB')
    return true // Indicate successful connection
  } catch (error) {
    console.error('Error connecting to database:', error)
    return false // Indicate connection failure
  }
}
