// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import TodoForm from '../components/ToDoForm';
import TodoList from '../components/TodoList';
import axios from 'axios';

// Use the environment variable for the API URL or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const HomePage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${API_URL}/todos`);
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="fixed w-full top-0 left-0 bg-green-500 text-white p-4">
        <h1 className="text-3xl font-bold">
          <i className='bx bx-list-check'></i> Todo List
        </h1>
        <p className="text-white">Manage your tasks efficiently</p>
      </section>

      <div className="container mt-20 mx-auto p-6">
        <TodoForm setTodos={setTodos} />
        <TodoList todos={todos} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default HomePage;
