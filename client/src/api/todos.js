// All API calls go through this file.
// The Vite dev proxy forwards /api/* to http://localhost:5001

const BASE_URL = '/api/todos';

// Helper: throws an error with the server's message if response is not OK
async function handleResponse(res) {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export const api = {
  // Fetch all todos
  getAll() {
    return fetch(BASE_URL).then(handleResponse);
  },

  // Create a new todo
  create(title, description) {
    return fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    }).then(handleResponse);
  },

  // Update title and description
  update(id, title, description) {
    return fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    }).then(handleResponse);
  },

  // Toggle done/undone
  toggleDone(id) {
    return fetch(`${BASE_URL}/${id}/done`, {
      method: 'PATCH',
    }).then(handleResponse);
  },

  // Delete a todo
  remove(id) {
    return fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    }).then(handleResponse);
  },
};
