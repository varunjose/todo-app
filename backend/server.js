const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todoRoutes');

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// MongoDB Atlas Connection URI (replace with your URI)
const dbURI = process.env.MONGO_URI || 'mongodb+srv://varunjosemadanu:HzR6wX7Y0tKJuyhq@todo.rqyf6bt.mongodb.net/?retryWrites=true&w=majority&appName=ToDo';

mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api', todoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


