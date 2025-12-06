import { signInWithGoogle } from '../firebase';
import type { User } from '../types';

interface LoginButtonProps {
  setUser: (user: User) => void;
}

function LoginButton({ setUser }: LoginButtonProps) {
  const handleLogin = async () => {
    try {
      const firebaseUser = await signInWithGoogle();

      localStorage.setItem("token", firebaseUser.token);

      const user: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'Anonymous',
        email: firebaseUser.email || '',
        token: firebaseUser.token,
        settings: {
          focusDuration: 25,
          breakDuration: 5,
        },
      };

      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleLogin}>Login with Google</button>;
}

export default LoginButton;
