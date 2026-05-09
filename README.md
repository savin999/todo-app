# TODO App — Full Stack

A full-stack TODO application built with React, Express.js, and MongoDB.

## Architecture

```
todo-app/
├── client/     # React + Vite frontend
└── server/     # Express.js + Mongoose backend
```

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone and set up backend
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm run dev
```

### 2. Set up and run frontend (in a new terminal)
```bash
cd client
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app is running!

## Tech Stack

| Layer     | Technology         |
|-----------|--------------------|
| Frontend  | React 18, Vite     |
| Backend   | Node.js, Express.js|
| Database  | MongoDB, Mongoose  |
| Styling   | Plain CSS          |

## API

| Method | Endpoint            | Description         |
|--------|---------------------|---------------------|
| GET    | /api/todos          | Get all todos       |
| POST   | /api/todos          | Create a todo       |
| PUT    | /api/todos/:id      | Update title/desc   |
| PATCH  | /api/todos/:id/done | Toggle done status  |
| DELETE | /api/todos/:id      | Delete a todo       |

## Key Design Decisions

- **Optimistic UI**: All mutations update the UI immediately and roll back on error, making the app feel fast and responsive.
- **Custom hook**: `useTodos` keeps all server state and data-fetching logic out of components, keeping them clean.
- **API layer**: `src/api/todos.js` centralises all fetch calls — if the base URL changes, you only change one file.
- **Validation**: Happens on both client (fast feedback) and server (security/correctness).
