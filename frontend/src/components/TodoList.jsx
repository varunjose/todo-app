// src/components/TodoList.jsx
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete, onUpdate }) => {
  // Pinned todos come first
  const sortedTodos = [...todos].sort((a, b) => b.pinned - a.pinned);

  return (
    <div className="space-y-4">
      {sortedTodos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default TodoList;
