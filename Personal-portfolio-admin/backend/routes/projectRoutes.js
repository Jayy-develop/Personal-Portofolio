import express from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../portfolio.db');
const db = new sqlite3.Database(dbPath);

const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM projects ORDER BY created_at DESC', (err, rows) => {
    res.json(rows || []);
  });
});

router.post('/', (req, res) => {
  const { title, description, image, technologies, link } = req.body;
  db.run('INSERT INTO projects (title, description, image, technologies, link) VALUES (?, ?, ?, ?, ?)',
    [title, description, image, technologies, link], (err) => {
      res.json({ message: 'Project created' });
    });
});

export default router;
