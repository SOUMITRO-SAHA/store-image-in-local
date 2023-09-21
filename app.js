import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import imageRoutes from './routes/image.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view

// Initialized the environment variable
dotenv.config();
const app = express();

// Making the Upload Folder Public:
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// routes
app.use(imageRoutes);

export default app;
