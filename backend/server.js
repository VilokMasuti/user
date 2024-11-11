import express from 'express'

import cors from 'cors'
import userRoutes from './routes/userRoutes.js'

import dotenv from 'dotenv'
import connectDB from './db/index.js'
dotenv.config()
const app = express()
app.use(cors())
const PORT = process.env.PORT || 3000


// Middleware
app.use(express.json())

// Connect to MongoDB
connectDB()

// Routes
app.use('/api/users', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
