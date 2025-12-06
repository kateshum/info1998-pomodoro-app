import { useState } from 'react';
import type { User, Page } from './types';
import Navbar from './components/Navbar';
import TimerPage from './pages/TimerPage';
import SettingsPage from './pages/SettingsPage';
import TasksPage from './pages/TaskPage';
import './App.css';

export default function PomodoroApp() {
  const [page, setPage] = useState<Page>('timer');
  const [user, setUser] = useState<User | null>(null);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #7c3aed, #ec4899, #f87171)',
      }}
    >
      <Navbar page={page} setPage={setPage} user={user} setUser={setUser} />

      <main className="page-container">
        {page === 'timer' && <TimerPage user={user} setUser={setUser} />}
        {page === 'tasks' && <TasksPage user={user} setUser={setUser} />}
        {page === 'settings' && <SettingsPage user={user} setUser={setUser} />}
      </main>
    </div>
  );
}
