// src/components/TodoForm.jsx
import { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ setTodos }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState('low');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTodo = {
      title,
      text,
      time,
      priority,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/todos', newTodo);
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setTitle('');
      setText('');
      setTime('');
      setPriority('low');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-200 rounded-md shadow-md">
      <h2 className="text-xl font-bold">Add Todo</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 w-full border rounded"
        required
      />
      <textarea
        placeholder="Details"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="p-2 w-full border rounded"
        required
      />
      <input
        type="datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="p-2 w-full border rounded"
        required
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="p-2 w-full border rounded"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
