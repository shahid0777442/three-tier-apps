# Three-tier Tasks app (React + Node.js + MongoDB)

| Tier         | Tech                     | Folder    | Port  |
|--------------|--------------------------|-----------|-------|
| Presentation | React 18 + Vite          | `frontend/` | 5173  |
| Logic        | Node.js + Express        | `backend/` | 5000  |
| Data         | MongoDB (via Mongoose)   | Docker    | 27017 |

The browser only talks to the React dev server; Vite proxies `/api/*` to Express, and only Express talks to MongoDB.

## Run it

1. Start MongoDB (or point `MONGO_URI` at your own instance / Atlas):
   ```bash
   docker compose up -d
   ```
2. Start the backend:
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```
3. Start the frontend (new terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. Open http://localhost:5173

## API

| Method | Path             | Body            | Description         |
|--------|------------------|-----------------|---------------------|
| GET    | `/api/tasks`     |                 | List tasks          |
| POST   | `/api/tasks`     | `{ title }`     | Create a task       |
| PATCH  | `/api/tasks/:id` | `{ done }`      | Update a task       |
| DELETE | `/api/tasks/:id` |                 | Delete a task       |
| GET    | `/api/health`    |                 | Health check        |
