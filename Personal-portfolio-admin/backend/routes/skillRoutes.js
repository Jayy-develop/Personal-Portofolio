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
  db.all('SELECT * FROM skills ORDER BY category', (err, rows) => {
    res.json(rows || []);
  });
});

router.post('/', (req, res) => {
  const { name, category, proficiency } = req.body;
  db.run('INSERT INTO skills (name, category, proficiency) VALUES (?, ?, ?)',
    [name, category, proficiency], (err) => {
      res.json({ message: 'Skill added' });
    });
});

export default router;
