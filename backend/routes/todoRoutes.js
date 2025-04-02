const express = require('express');
const Todo = require('../models/ToDo');
const router = express.Router();

// POST - Create a new Todo
router.post('/todos', async (req, res) => {
  const { title, text, time, priority } = req.body;

  try {
    const newTodo = new Todo({
      title,
      text,
      time,
      priority
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: 'Error creating todo', error });
  }
});

// GET - Get all Todos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching todos', error });
  }
});

// PUT - Edit a Todo
router.put('/todos/:id', async (req, res) => {
  const { title, text, time, priority } = req.body;
  
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, text, time, priority },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: 'Error updating todo', error });
  }
});

// DELETE - Delete a Todo
router.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting todo', error });
  }
});

// PATCH - Pin/Unpin a Todo
router.patch('/todos/:id/pin', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.pinned = !todo.pinned;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: 'Error pinning/unpinning todo', error });
  }
});

// PATCH - Change Todo Priority
router.patch('/todos/:id/move', async (req, res) => {
  const { priority } = req.body;

  try {
    const todo = await Todo.findById(req.params.id);
    todo.priority = priority;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: 'Error changing priority', error });
  }
});

module.exports = router;
