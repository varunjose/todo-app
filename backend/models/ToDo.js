// models/todoModel.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: String,
  text: String,
  time: Date,
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  pinned: { type: Boolean, default: false },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
