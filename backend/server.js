
import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './db/index.js'

// Load environment variables from a .env file
dotenv.config()

// Create an instance of the Express application
const app = express()

// Use CORS middleware to allow requests from different origins
app.use(cors())

// Set the port for the server to listen on, default to 3000 if not provided in the environment variables
const PORT = process.env.PORT || 5000

// Resolve the absolute path to the current directory
const __dirname = path.resolve()

// Middleware to parse incoming requests with JSON payloads
app.use(express.json())

// Connect to MongoDB database using the custom connectDB function
connectDB()

// Set up routing for user-related API endpoints
app.use('/api/users', userRoutes)

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve the frontend build files (static assets) from the 'dist' folder
  app.use(express.static(path.join(__dirname, '/frontend/dist')))

  // Catch-all route to send the 'index.html' file for any unmatched requests (used for Single Page Applications)
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`) // Log a message when the server starts successfully
})
