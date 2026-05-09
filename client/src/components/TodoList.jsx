import { useState } from 'react';
import TodoItem from './TodoItem';

const FILTERS = ['All', 'Active', 'Done'];

export default function TodoList({ todos, onToggle, onUpdate, onDelete }) {
  const [filter, setFilter] = useState('All');

  const filtered = todos.filter((t) => {
    if (filter === 'Active') return !t.done;
    if (filter === 'Done') return t.done;
    return true;
  });

  const activeCount = todos.filter((t) => !t.done).length;

  return (
    <div>
      {/* Filter tabs */}
      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="todo-count">
        {activeCount} task{activeCount !== 1 ? 's' : ''} remaining
      </p>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>
            {filter === 'All'
              ? 'No tasks yet. Add one above!'
              : `No ${filter.toLowerCase()} tasks.`}
          </p>
        </div>
      ) : (
        <div className="todo-list">
          {filtered.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={onToggle}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
