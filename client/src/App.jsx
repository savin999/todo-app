import { useTodos } from './hooks/useTodos';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

export default function App() {
  const { todos, loading, error, createTodo, toggleDone, updateTodo, deleteTodo } = useTodos();

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title"> Tasks</h1>
        <p className="app-subtitle">Stay on top of what matters.</p>
      </header>

      <AddTodoForm onAdd={createTodo} />

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading tasks…</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>⚠ Could not load tasks: {error}</p>
          <p style={{ marginTop: 8, fontSize: '0.85rem' }}>
            Make sure the backend is running at localhost:5000
          </p>
        </div>
      ) : (
        <TodoList
          todos={todos}
          onToggle={toggleDone}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      )}
    </div>
  );
}
