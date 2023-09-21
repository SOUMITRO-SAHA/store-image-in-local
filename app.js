import dotenv from 'dotenv';
import express from 'express';
import imageRoutes from './routes/image.routes.js';

// view

// Initialized the environment variable
dotenv.config();
const app = express();

// routes
app.use(imageRoutes);

export default app;
