import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from './config/app.js';

/**
 * Express Application Setup
 */
const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Hippocrates Dental API is running',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// API Routes (будут добавлены позже)
app.get('/api/v1', (req, res) => {
  res.json({
    success: true,
    message: 'Hippocrates Dental API v1.0',
    endpoints: {
      health: '/health',
      api: '/api/v1',
      auth: '/api/v1/auth',
      clinics: '/api/v1/clinics',
      users: '/api/v1/users',
      patients: '/api/v1/patients',
      appointments: '/api/v1/appointments',
      public: '/api/v1/public',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
    },
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: message,
      ...(config.nodeEnv === 'development' && { stack: err.stack }),
    },
  });
});

export default app;

