// src/components/TodoList.jsx
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete, onUpdate }) => {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default TodoList;
