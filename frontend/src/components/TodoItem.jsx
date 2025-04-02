import { useState } from 'react';
import axios from 'axios';

// Use the environment variable for the API URL or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const priorityColors = {
  low: 'bg-green-300',
  medium: 'bg-yellow-300',
  high: 'bg-red-300',
};

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isPinned, setIsPinned] = useState(todo.pinned);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editText, setEditText] = useState(todo.text);
  const [error, setError] = useState(null); // State for error handling

  const togglePin = async () => {
    try {
      const response = await axios.patch(`${API_URL}/todos/${todo._id}/pin`, {
        pinned: !isPinned,
      });
      setIsPinned(response.data.pinned);
      onUpdate();
    } catch (error) {
      console.error('Error pinning todo:', error);
    }
  };

  const deleteTodo = async () => {
    try {
      await axios.delete(`${API_URL}/todos/${todo._id}`);
      onDelete(todo._id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const updateTodo = async () => {
    if (!editTitle || !editText) {
      setError('Title and details cannot be empty!');
      return;
    }

    try {
      const response = await axios.patch(`${API_URL}/todos/${todo._id}`, {
        title: editTitle,
        text: editText,
        time: new Date().toISOString(), // Update the time if necessary
      });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Failed to update todo. Please try again.');
    }
  };

  return (
    <div className={`p-4 bg-white shadow-md rounded-md mb-4 relative ${priorityColors[todo.priority] || 'bg-gray-300'}`}>
      {isPinned && <div className="absolute top-0 right-0 m-2 text-white bg-blue-600 p-1 rounded">📌 Pinned</div>}
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="p-2 w-full mb-2 border rounded"
            aria-label="Edit Title"
          />
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="p-2 w-full h-24 border rounded"
            aria-label="Edit Details"
          />
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <div className="flex justify-end space-x-2 mt-2">
            <button onClick={updateTodo} className="bg-blue-500 text-white p-2 rounded" disabled={!editTitle || !editText}>Save</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="font-semibold">{todo.title}</h3>
          <p>{todo.text}</p>
          <p className="text-sm text-gray-500">{new Date(todo.time).toLocaleString()}</p>
          <span className={`inline-block mt-2 px-2 py-1 text-sm font-semibold text-white rounded ${priorityColors[todo.priority] || 'bg-gray-500'}`}>
            {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
          </span>
          <div className="flex justify-between mt-2 space-x-2">
            <button onClick={togglePin} className={`p-2 ${isPinned ? 'bg-green-500' : 'bg-gray-500'} text-white rounded`} aria-label="Pin/Unpin Todo">
              {isPinned ? 'Unpin' : 'Pin'}
            </button>
            <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-2 rounded" aria-label="Edit Todo">
              Edit
            </button>
            <button onClick={deleteTodo} className="bg-red-500 text-white p-2 rounded" aria-label="Delete Todo">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
