import {useState} from 'react'; 
import type { User } from '../types'; 

interface SettingsPageProps {
  user: User | null;
  setUser: (user: User) => void;
}

function SettingsPage({ user, setUser }: SettingsPageProps) {
  const [focusDuration, setFocusDuration] = useState(user?.settings.focusDuration || 25);
  const [breakDuration, setBreakDuration] = useState(user?.settings.breakDuration || 5);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

if (!user) {
    return <p>Please log in to view settings.</p>;
  }

  const handleSave = () => {
    setUser({
      ...user,
      name,
      email,
      settings: {
        focusDuration,
        breakDuration,
      },
    });
    alert('Settings saved! ✓');
  };

  return (
    <div className="settings-page">
      <div className="settings-card">
        <h1 className="settings-title">Settings</h1>

        <div className="section">
          <h2 className="section-title">Timer Durations</h2>

          <label className="range-label">
            <div className="range-header">
              <span>Focus Duration</span>
              <span className="focus-value">{focusDuration} min</span>
            </div>
            <input
              type="range"
              min={5}
              max={60}
              step={5}
              value={focusDuration}
              onChange={(e) => setFocusDuration(Number(e.target.value))}
              className="range-input focus"
            />
          </label>

          <label className="range-label">
            <div className="range-header">
              <span>Break Duration</span>
              <span className="break-value">{breakDuration} min</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              value={breakDuration}
              onChange={(e) => setBreakDuration(Number(e.target.value))}
              className="range-input break"
            />
          </label>
        </div>

        <div className="section account-section">
          <h2 className="section-title">Account</h2>

          <label className="input-label">
            <span>Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-input"
            />
          </label>

          <label className="input-label">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-input"
            />
          </label>
        </div>

        <button className="save-btn" onClick={handleSave}>
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default SettingsPage; 