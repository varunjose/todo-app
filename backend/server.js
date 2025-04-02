const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todoRoutes');

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware for CORS
const corsOptions = {
  origin: ['https://varunjose.github.io', 'https://todo-app-ftb6.onrender.com'], // Add more origins if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Middleware for parsing JSON requests
app.use(express.json());

// MongoDB Atlas Connection URI (replace with your URI)
const dbURI = process.env.MONGO_URI || 'mongodb+srv://varunjosemadanu:HzR6wX7Y0tKJuyhq@todo.rqyf6bt.mongodb.net/?retryWrites=true&w=majority&appName=ToDo';

// Connect to MongoDB
mongoose.connect(dbURI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api', todoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
