const express = require('express');
const Todo = require('../models/ToDo');
const router = express.Router();

// POST - Create a new Todo
router.post('/todos', async (req, res) => {
  const { title, text, time, priority } = req.body;

  if (!title || !text || !time || !priority) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newTodo = new Todo({
      title,
      text,
      time,
      priority,
      pinned: false, // Ensure pinned is false by default if not provided
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(400).json({ message: 'Error creating todo', error });
  }
});

// GET - Get all Todos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(400).json({ message: 'Error fetching todos', error });
  }
});

// PUT - Edit a Todo
router.put('/todos/:id', async (req, res) => {
  const { title, text, time, priority } = req.body;

  if (!title || !text || !time || !priority) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, text, time, priority },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(400).json({ message: 'Error updating todo', error });
  }
});

// DELETE - Delete a Todo
router.delete('/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(400).json({ message: 'Error deleting todo', error });
  }
});

// PATCH - Pin/Unpin a Todo
router.patch('/todos/:id/pin', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.pinned = !todo.pinned;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    console.error('Error pinning/unpinning todo:', error);
    res.status(400).json({ message: 'Error pinning/unpinning todo', error });
  }
});

// PATCH - Change Todo Priority
router.patch('/todos/:id/move', async (req, res) => {
  const { priority } = req.body;

  if (!priority) {
    return res.status(400).json({ message: 'Priority field is required' });
  }

  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.priority = priority;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    console.error('Error changing priority:', error);
    res.status(400).json({ message: 'Error changing priority', error });
  }
});

module.exports = router;
