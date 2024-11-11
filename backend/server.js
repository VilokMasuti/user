import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './db/index.js';

// Load environment variables from a .env file
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(express.json());

// 🛠️ CORS Configuration
// Allow requests from your frontend domain
const allowedOrigins = ['https://user-1-8xhn.onrender.com'];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies if needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Set up routing for user-related API endpoints
app.use('/api/users', userRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // Connect to MongoDB database using the custom connectDB function
  connectDB();
});
