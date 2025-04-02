// src/components/TodoItem.jsx
import { useState } from 'react';
import axios from 'axios';

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isPinned, setIsPinned] = useState(todo.pinned);

  const togglePin = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/todos/${todo._id}/pin`);
      setIsPinned(response.data.pinned);
      onUpdate();
    } catch (error) {
      console.error('Error pinning todo:', error);
    }
  };

  const deleteTodo = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${todo._id}`);
      onDelete(todo._id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md mb-4">
      <h3 className="font-semibold">{todo.title}</h3>
      <p>{todo.text}</p>
      <p className="text-sm text-gray-500">{new Date(todo.time).toLocaleString()}</p>
      <div className="flex justify-between mt-2">
        <button onClick={togglePin} className={`p-2 ${isPinned ? 'bg-green-500' : 'bg-gray-500'} text-white rounded`}>
          {isPinned ? 'Unpin' : 'Pin'}
        </button>
        <button onClick={deleteTodo} className="bg-red-500 text-white p-2 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
