import { useState, useEffect } from 'react'; 
import { RotateCcw, Play, Pause } from 'lucide-react';
import type { User } from '../types'; 

interface TimerPageProps {
  user: User | null;
  setUser: (user: User) => void;
}

const TimerPage = ({ user }: TimerPageProps) => {
  const [isBreak, setIsBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const duration = user
    ? isBreak
      ? user.settings.breakDuration * 60
      : user.settings.focusDuration * 60
    : 0;

  useEffect(() => {
    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTimeLeft(0);
      setIsRunning(false);
      return;
    }
    setTimeLeft(duration);
    setIsRunning(false);
  }, [user, isBreak, duration]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const id = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    if (!user) return;
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!user) {
    return <p>Please log in to view the timer.</p>;
  }

  return (
    <div className="timer-page">
      <div className={`timer-card ${isBreak ? 'break' : 'focus'}`}>
        <div className="break-toggle">
          <button onClick={() => setIsBreak(!isBreak)}>
            {isBreak ? '☕ Break Time' : '🎯 Focus Time'}
          </button>
        </div>

        <div className="timer-display">
          <div className="time-text">{formatTime(timeLeft)}</div>

          <div className="controls">
            <button onClick={toggleTimer}>
              {isRunning ? <><Pause size={20} /> Pause</> : <><Play size={20} /> Start</>}
            </button>
            <button onClick={resetTimer}>
              <RotateCcw size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerPage;