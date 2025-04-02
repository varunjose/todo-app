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
      setTime(new Date());
      setPriority('low');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 ">
      <div className='flex items-center space-x-0 '><DotLottieReact
      src="https://lottie.host/c3402948-1ee3-488f-941b-aa3ca4d9970e/tscAhf0BUo.lottie"
      loop
      autoplay
      style={{ width: '100px', height: '50px', margin: '0'}}
    /><h2 className="text-[25px] font-bold">Add an Event</h2></div>
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
      <DatePicker
        selected={time}
        onChange={(date) => setTime(date)}
        showTimeSelect
        dateFormat="Pp"
        className="p-2 w-full border rounded"
        required
        placeholderText="Select Date and Time"
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
