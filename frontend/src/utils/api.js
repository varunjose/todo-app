import axios from 'axios';

// Use the environment variable for the API URL or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const fetchTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
};

export const addTodo = async (newTodo) => {
  try {
    const response = await axios.post(`${API_URL}/todos`, newTodo);
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    return null;
  }
};

export const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await axios.put(`${API_URL}/todos/${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    return null;
  }
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_URL}/todos/${id}`);
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

export const togglePinTodo = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}/todos/${id}/pin`);
    return response.data;
  } catch (error) {
    console.error('Error pinning todo:', error);
    return null;
  }
};

export const changePriority = async (id, priority) => {
  try {
    const response = await axios.patch(`${API_URL}/todos/${id}/move`, { priority });
    return response.data;
  } catch (error) {
    console.error('Error changing priority:', error);
    return null;
  }
};
