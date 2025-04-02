// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import TodoForm from '../components/ToDoForm';
import TodoList from '../components/TodoList';
import axios from 'axios';

const HomePage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const handleUpdate = () => {
    // This will re-fetch the todos
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="title mb-6 bg-green-500 text-white p-4">
        <h1 className="text-3xl font-bold"><i class='bx bx-list-check'></i>Todo List</h1>
        <p className="text-white">Manage your tasks efficiently</p>
      </section>

      <div className="container mx-auto p-6 ">
        <TodoForm setTodos={setTodos} />
        <TodoList todos={todos} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default HomePage;
