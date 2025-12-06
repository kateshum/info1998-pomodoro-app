import { Router } from 'express';
import { Task } from '../../types/task';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

const tasks: Task[] = [];

router.get('/', authenticate, (req: AuthRequest, res) => {
  const userTasks = tasks.filter(task => task.userId === req.userId);
  res.json(userTasks);
});

router.post('/', authenticate, (req: AuthRequest, res) => {
  const { text } = req.body;  

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Task text is required" });
  }

  const newTask: Task = {
    id: Date.now().toString(),
    text,                     
    completed: false,
    userId: req.userId!,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put('/:id', authenticate, (req: AuthRequest, res) => {
  const { id } = req.params;
  const { text, completed } = req.body; 

  const task = tasks.find(t => t.id === id && t.userId === req.userId);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  if (text !== undefined) task.text = text; 
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

router.delete('/:id', authenticate, (req: AuthRequest, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id && t.userId === req.userId);

  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  const deleted = tasks.splice(index, 1);
  res.json(deleted[0]);
});

export default router;
