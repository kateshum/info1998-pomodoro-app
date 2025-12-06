import { useState, useEffect } from 'react';
import { Plus, Trash2, Pencil, Check, X } from 'lucide-react';
import type { User, Task } from '../types';

import {
  getTasks,
  createTask,
  deleteTaskApi,
  updateTask,
} from '../api/tasks';

interface TasksPageProps {
  user: User | null;
  setUser: (user: User) => void;
}

function TasksPage({ user }: TasksPageProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
  if (!user) return; 

  const loadTasks = async () => {
    try {
      const backendTasks = await getTasks();
      setTasks(backendTasks);
    } catch (error) {
      console.error(error);
    }
  };

  loadTasks();
}, [user]);

  const addTask = async () => {
    if (!newTaskText.trim()) return;

    try {
      const created = await createTask(newTaskText);
      setTasks(prev => [...prev, created]);
      setNewTaskText('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTaskApi(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const saveEdit = async () => {
    if (!editingId) return;

    try {
      const updated = await updateTask(editingId, { text: editingText });
      setTasks(prev =>
        prev.map(t => (t.id === editingId ? updated : t))
      );
      setEditingId(null);
      setEditingText('');
    } catch (error) {
      console.error(error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const toggleCompleted = async (task: Task) => {
    try {
      const updated = await updateTask(task.id, {
        completed: !task.completed,
      });
      setTasks(prev =>
        prev.map(t => (t.id === task.id ? updated : t))
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return <p>Please log in to view your todos.</p>;
  }

  return (
    <div className="tasks-page">

      <div className="card">
        <h2 className="card-title">My Tasks</h2>
        <div className="add-task">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a new task..."
          />
          <button onClick={addTask}>
            <Plus size={20} /> Add
          </button>
        </div>
      </div>

      <div className="card">
        {tasks.length === 0 ? (
          <p className="empty-text">No tasks yet. Add one above!</p>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <div key={task.id} className="task-item">

                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(task)}
                />

                {editingId === task.id ? (
                  <input
                    className="edit-input"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  <span className={task.completed ? "completed" : ""}>
                    {task.text}
                  </span>
                )}

                <div className="task-buttons">

                  {editingId === task.id ? (
                    <>
                      <button onClick={saveEdit}>
                        <Check size={18} />
                      </button>
                      <button onClick={cancelEdit}>
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEditing(task)}>
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDeleteTask(task.id)}>
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}

                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TasksPage;
