import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/todos';

// This hook keeps all todo state + server communication in one place.
// Components just call the returned functions and read the state.
export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all todos on mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAll();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Optimistic create: add a temporary todo immediately, replace with real one on success
  const createTodo = useCallback(async (title, description) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticTodo = {
      _id: tempId,
      title,
      description,
      done: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((prev) => [optimisticTodo, ...prev]);

    try {
      const created = await api.create(title, description);
      // Replace the temp item with the real one from the server
      setTodos((prev) => prev.map((t) => (t._id === tempId ? created : t)));
    } catch (err) {
      // Rollback on failure
      setTodos((prev) => prev.filter((t) => t._id !== tempId));
      throw err; // Re-throw so the form can show the error
    }
  }, []);

  // Optimistic toggle
  const toggleDone = useCallback(async (id) => {
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, done: !t.done } : t))
    );

    try {
      const updated = await api.toggleDone(id);
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      // Rollback
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, done: !t.done } : t))
      );
      throw err;
    }
  }, []);

  // Optimistic update
  const updateTodo = useCallback(async (id, title, description) => {
    const previous = todos.find((t) => t._id === id);
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, title, description } : t))
    );

    try {
      const updated = await api.update(id, title, description);
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      // Rollback
      setTodos((prev) => prev.map((t) => (t._id === id ? previous : t)));
      throw err;
    }
  }, [todos]);

  // Optimistic delete
  const deleteTodo = useCallback(async (id) => {
    const previous = todos.find((t) => t._id === id);
    setTodos((prev) => prev.filter((t) => t._id !== id));

    try {
      await api.remove(id);
    } catch (err) {
      // Rollback
      setTodos((prev) => {
        const index = todos.findIndex((t) => t._id === id);
        const next = [...prev];
        next.splice(index, 0, previous);
        return next;
      });
      throw err;
    }
  }, [todos]);

  return {
    todos,
    loading,
    error,
    createTodo,
    toggleDone,
    updateTodo,
    deleteTodo,
  };
}
