import { authFetch } from "../authFetch";
import type { Task } from "../types";

export async function getTasks(): Promise<Task[]> {
  const res = await authFetch("/tasks");
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask(text: string): Promise<Task> {
  const res = await authFetch("/tasks", {
    method: "POST",
    body: JSON.stringify({ text }),
  });

  if (!res.ok) throw new Error("Failed to add task");
  return res.json();
}

export async function deleteTaskApi(id: string): Promise<void> {
  const res = await authFetch(`/tasks/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete task");
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
  const res = await authFetch(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}