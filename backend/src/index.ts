import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import taskRoutes from './routes/tasks';

const serviceAccount = require('../service_account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const app = express();
const PORT = parseInt(process.env.PORT || '5001', 10);

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174',
    'https://info1998-pomodoro-app.vercel.app',
  ],
  credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => res.send('Pomodoro API is running'));
app.use('/tasks', taskRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});