import express from 'express'
import authRoutes from './routes/auth.routes.js'
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.use(errorMiddleware);

export default app