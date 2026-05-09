import { useState } from 'react';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function validate(title) {
  if (!title.trim()) return 'Title is required';
  if (title.trim().length > 200) return 'Title is too long (max 200 characters)';
  return null;
}

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description || '');
  const [titleError, setTitleError] = useState('');
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState('');

  const handleToggle = async () => {
    try {
      setActionError('');
      await onToggle(todo._id);
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this task?')) return;
    try {
      setActionError('');
      await onDelete(todo._id);
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleEditStart = () => {
    setEditTitle(todo.title);
    setEditDesc(todo.description || '');
    setTitleError('');
    setActionError('');
    setEditing(true);
  };

  const handleEditCancel = () => {
    setEditing(false);
    setTitleError('');
  };

  const handleSave = async () => {
    const err = validate(editTitle);
    if (err) {
      setTitleError(err);
      return;
    }

    setSaving(true);
    setActionError('');
    try {
      await onUpdate(todo._id, editTitle.trim(), editDesc.trim());
      setEditing(false);
    } catch (err) {
      setActionError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`todo-item ${todo.done ? 'done' : ''}`}>
      <div className="todo-main">
        {/* Checkbox toggle button */}
        <button
          className="todo-checkbox"
          onClick={handleToggle}
          title={todo.done ? 'Mark as undone' : 'Mark as done'}
        >
          {todo.done && '✓'}
        </button>

        {/* Content */}
        <div className="todo-content">
          <p className="todo-title">{todo.title}</p>
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
          <p className="todo-meta">{formatDate(todo.createdAt)}</p>
        </div>

        {/* Action buttons */}
        <div className="todo-actions">
          <button className="btn-icon" onClick={handleEditStart} title="Edit">
            Edit
          </button>
          <button
            className="btn-icon danger"
            onClick={handleDelete}
            title="Delete"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Error from toggle/delete */}
      {actionError && <p className="field-error" style={{ marginTop: 8 }}>{actionError}</p>}

      {/* Inline edit form */}
      {editing && (
        <div className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
              if (titleError) setTitleError('');
            }}
            className={titleError ? 'error' : ''}
            placeholder="Title *"
            maxLength={200}
            disabled={saving}
          />
          {titleError && <p className="field-error">{titleError}</p>}

          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            placeholder="Description (optional)"
            rows={2}
            maxLength={1000}
            disabled={saving}
          />

          <div className="edit-actions">
            <button className="btn-save" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button className="btn-cancel" onClick={handleEditCancel} disabled={saving}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
