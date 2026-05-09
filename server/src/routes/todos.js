const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET /api/todos — Get all todos (newest first)
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST /api/todos — Create a new todo
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    // Basic validation
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo = new Todo({ title: title.trim(), description: description?.trim() });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    // Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT /api/todos/:id — Update title and/or description
router.put('/:id', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: title.trim(), description: description?.trim() ?? '' },
      { new: true, runValidators: true } // return the updated doc, run schema validators
    );

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid todo ID' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// PATCH /api/todos/:id/done — Toggle done status
router.patch('/:id/done', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.done = !todo.done; // Toggle
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid todo ID' });
    }
    res.status(500).json({ error: 'Failed to toggle todo status' });
  }
});

// DELETE /api/todos/:id — Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid todo ID' });
    }
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

module.exports = router;
