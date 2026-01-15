import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); // Try root first
dotenv.config(); // Fallback to local

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import algorithmRoutes from './routes/algorithms';
import userRoutes from './routes/users';

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/algorithms', algorithmRoutes);
app.use('/api/users', userRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
