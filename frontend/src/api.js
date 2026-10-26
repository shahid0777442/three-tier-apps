async function request(path, options = {}) {
  const res = await fetch(`/api/tasks${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.status === 204 ? null : res.json();
}

export const listTasks = () => request("");
export const addTask = (title) => request("", { method: "POST", body: JSON.stringify({ title }) });
export const setDone = (id, done) => request(`/${id}`, { method: "PATCH", body: JSON.stringify({ done }) });
export const removeTask = (id) => request(`/${id}`, { method: "DELETE" });
