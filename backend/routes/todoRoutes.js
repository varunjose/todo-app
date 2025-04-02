// routes/todoRoutes.js
const express = require('express');
const Todo = require('../models/todoModel'); // Assuming you have a Todo model
const router = express.Router();

// Example: Get all todos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

// Example: Add a new todo
router.post('/todos', async (req, res) => {
  const { title, text, time, priority } = req.body;
  try {
    const newTodo = new Todo({
      title,
      text,
      time,
      priority,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: 'Error adding todo' });
  }
});

// Export the router
module.exports = router;
