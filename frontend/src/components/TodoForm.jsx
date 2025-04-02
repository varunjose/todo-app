import { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import 'boxicons';

const TodoForm = ({ setTodos }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [time, setTime] = useState(new Date());
  const [priority, setPriority] = useState('low');
  const [showAnimation, setShowAnimation] = useState(false);

  // Use the environment variable for API URL or default to localhost
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAnimation(true);  // Show the animation once on click

    const newTodo = {
      title,
      text,
      time,
      priority,
    };

    try {
      const response = await axios.post(`${API_URL}/todos`, newTodo);
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setTitle('');
      setText('');
      setTime(new Date());
      setPriority('low');
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setTimeout(() => setShowAnimation(false), 1000);  // Hide after 1 second
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className='flex items-center mb-4'>
        <DotLottieReact
          src="https://lottie.host/a40c265d-04c4-45c7-98d5-f2ffe2ca3cfa/VJZOJfyPtj.lottie"
          loop
          autoplay
          style={{ width: '100px', height: '50px', margin: '0' }}
        />
        <h2 className="text-[25px] font-bold">Add an Event</h2>
      </div>
      <label className="flex mb-2 text-[15px] font-bold">Enter Title</label>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 w-7/12 border rounded"
        required
      />
      <label className="flex mb-2 text-[15px] font-bold">Enter Details</label>
      <textarea
        placeholder="Details"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="p-2 w-7/12 h-52 resize-none border rounded"
        required
      />
      <div className="w-full">
        <label className="flex mb-2 text-[15px] font-bold">Select Date and Time</label>
        <DatePicker
          selected={time}
          onChange={(date) => setTime(date)}
          showTimeSelect
          dateFormat="Pp"
          className="p-2 w-full border rounded"
          required
          placeholderText="Select Date and Time"
        />
      </div>
      <label className="flex mb-2 text-[15px] font-bold">Select Priority</label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="p-2 w-7/12 border rounded"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <div className="flex items-center space-x-2">
        <button type="submit" className="bg-blue-500 text-white p-2 w-44 rounded self-start">
          Add Todo
        </button>
        {showAnimation && (
           <DotLottieReact
           src="https://lottie.host/1fec80bf-79e9-43a4-9409-64a29cb418eb/fNJuLq7LJQ.lottie"
           loop={false}
           autoplay
            style={{ width: '40px', height: '40px' }}
          />
        )}
      </div>
    </form>
  );
};

export default TodoForm;
