import { useState } from 'react';

// Simple validation rules
function validate(title) {
  if (!title.trim()) return 'Title is required';
  if (title.trim().length > 200) return 'Title is too long (max 200 characters)';
  return null;
}

export default function AddTodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before sending
    const err = validate(title);
    if (err) {
      setTitleError(err);
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      await onAdd(title.trim(), description.trim());
      // Clear form on success
      setTitle('');
      setDescription('');
      setTitleError('');
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (titleError) setTitleError(''); // Clear error as user types
  };

  return (
    <div className="add-form">
      <h2>New Task</h2>

      {submitError && <div className="error-banner">{submitError}</div>}

      <div className="form-field">
        <input
          type="text"
          placeholder="What needs to be done? *"
          value={title}
          onChange={handleTitleChange}
          className={titleError ? 'error' : ''}
          disabled={submitting}
          maxLength={200}
        />
        {titleError && <p className="field-error">{titleError}</p>}
      </div>

      <div className="form-field">
        <textarea
          placeholder="Add a description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          disabled={submitting}
          maxLength={1000}
        />
      </div>

      <button
        className="btn-primary"
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? 'Adding…' : '+ Add Task'}
      </button>
    </div>
  );
}
