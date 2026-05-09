# TODO App — Frontend

React.js frontend built with Vite.

## Setup & Run

### 1. Install dependencies
```bash
cd client
npm install
```

### 2. Start the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note**: The backend must be running on port 5001 for the app to work. Vite automatically proxies `/api/*` requests to the backend — no manual CORS setup needed during development.

### 3. Build for production
```bash
npm run build
```

## Features

- View, create, edit, delete TODO items
- Toggle tasks done/undone with a circular checkbox
- Filter by All / Active / Done
- Inline editing — edit in place without leaving the list
- Optimistic UI updates — changes appear instantly, roll back if the server fails
- Loading and error states handled gracefully
- Form validation with inline error messages

## Assumptions & Limitations

- single user app
- Data is not persisted locally; it all comes from the backend API
- Designed for modern browsers (Chrome, Firefox, Safari, Edge)
