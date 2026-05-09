# TODO App — Backend

Express.js + MongoDB backend for the TODO app.

## Setup & Run

### 1. Install dependencies
```bash
cd server
npm install
```

### 2. Configure environment variables
```bash
cp .env.example .env
```
Then open `.env` and set your MongoDB connection string.

### 3. MongoDB Connection

**Option A — Local MongoDB:**
Make sure MongoDB is installed and running, then use:
```
MONGODB_URI=mongodb://localhost:27017/todoapp
```

**Option B — MongoDB Atlas (Cloud, recommended):**
1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and create a free account
2. Create a new cluster (free tier is fine)
3. Click "Connect" → "Connect your application"
4. Copy the connection string and replace `<username>` and `<password>` with your credentials
5. Set it in `.env`:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority
```

### 4. Start the server

Development (auto-restarts on file changes):
```bash
npm run dev
```

Production:
```bash
npm start
```

The server will run at **http://localhost:5000**

## API Endpoints

| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| GET    | /api/todos            | Get all todos         |
| POST   | /api/todos            | Create a new todo     |
| PUT    | /api/todos/:id        | Update title/desc     |
| PATCH  | /api/todos/:id/done   | Toggle done status    |
| DELETE | /api/todos/:id        | Delete a todo         |

## Assumptions & Limitations

- No authentication — all todos are shared (single-user app)
- Title is required; description is optional
- Todos are returned newest-first
