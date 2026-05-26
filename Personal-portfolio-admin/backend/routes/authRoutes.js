import express from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = process.env.DB_PATH || path.join(__dirname, '../portfolio.db');
const db = new sqlite3.Database(dbPath);

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'portfolio_admin_secret_key_2024';

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  db.get('SELECT * FROM admin WHERE username = ?', [username], (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!row) return res.status(401).json({ error: 'Invalid credentials' });
    
    const passwordMatch = bcryptjs.compareSync(password, row.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ id: row.id, username: row.username }, JWT_SECRET);
    res.json({ token, message: 'Login successful' });
  });
});

// Get current admin
router.get('/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ id: decoded.id, username: decoded.username });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
