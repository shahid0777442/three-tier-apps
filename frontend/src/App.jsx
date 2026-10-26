import { useEffect, useState } from "react";
import { listTasks, addTask, setDone, removeTask } from "./api.js";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const run = async (fn) => {
    setError("");
    try { await fn(); } catch (e) { setError(e.message); }
  };

  useEffect(() => {
    run(async () => setTasks(await listTasks())).finally(() => setLoading(false));
  }, []);

  const onAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    run(async () => {
      const task = await addTask(title);
      setTasks((t) => [task, ...t]);
      setTitle("");
    });
  };

  const onToggle = (task) =>
    run(async () => {
      const updated = await setDone(task._id, !task.done);
      setTasks((t) => t.map((x) => (x._id === updated._id ? updated : x)));
    });

  const onDelete = (id) =>
    run(async () => {
      await removeTask(id);
      setTasks((t) => t.filter((x) => x._id !== id));
    });

  const remaining = tasks.filter((t) => !t.done).length;

  return (
    <main className="wrap">
      <h1>Tasks</h1>
      <p className="count">{loading ? "Loading…" : `${remaining} of ${tasks.length} left to do`}</p>

      <form onSubmit={onAdd} className="add">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs doing?"
          aria-label="New task"
          maxLength={200}
        />
        <button type="submit">Add task</button>
      </form>

      {error && <p role="alert" className="error">{error}</p>}

      {!loading && tasks.length === 0 && <p className="empty">No tasks yet. Add your first one above.</p>}

      <ul>
        {tasks.map((t) => (
          <li key={t._id} className={t.done ? "done" : ""}>
            <label>
              <input type="checkbox" checked={t.done} onChange={() => onToggle(t)} />
              <span>{t.title}</span>
            </label>
            <button className="del" onClick={() => onDelete(t._id)} aria-label={`Delete ${t.title}`}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
