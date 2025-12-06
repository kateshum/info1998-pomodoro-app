export interface User {
  token: string;
  id: string;
  name: string;
  email: string;
  settings: {
    focusDuration: number;
    breakDuration: number;

  };
}

export interface Task {
  id: string;
  text: string;
  completed: boolean; 
}

export type Page = 'timer' | 'tasks' | 'settings'; 