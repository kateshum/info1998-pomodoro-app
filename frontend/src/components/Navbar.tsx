import type { User, Page } from '../types';
import { Clock, ListTodo, Settings } from 'lucide-react';
import { signInWithGoogle } from '../firebase';
import { useState } from 'react';

type NavbarProps = {
  page: Page;
  setPage: (p: Page) => void;
  user: User | null;
  setUser: (user: User) => void;
};

const Navbar = ({ page, setPage, user, setUser }: NavbarProps) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const login = async () => {
    if (isLoggingIn) return;
    
    setIsLoggingIn(true);
    try {
      const firebaseUser = await signInWithGoogle();
      
      localStorage.setItem("token", firebaseUser.token);
      
      setUser({
        token: firebaseUser.token,
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'Anonymous',
        email: firebaseUser.email || '',
        settings: { focusDuration: 25, breakDuration: 5 },
      });
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">🍅 {user ? user.name : 'Guest'}'s Pomodoro</h1>

        <div className="navbar-buttons">
          <button onClick={() => setPage('timer')} className={page === 'timer' ? 'active' : ''}>
            <Clock size={18} /> Timer
          </button>
          <button onClick={() => setPage('tasks')} className={page === 'tasks' ? 'active' : ''}>
            <ListTodo size={18} /> Tasks
          </button>
          <button onClick={() => setPage('settings')} className={page === 'settings' ? 'active' : ''}>
            <Settings size={18} /> Settings
          </button>
        </div>

        <div className="navbar-user">
          {user ? (
            <span>Welcome, {user.name}</span>
          ) : (
            <button onClick={login} disabled={isLoggingIn}>
              {isLoggingIn ? 'Logging in...' : 'Login with Google'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;