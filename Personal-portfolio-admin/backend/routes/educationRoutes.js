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
  db.all('SELECT * FROM education ORDER BY created_at DESC', (err, rows) => {
    res.json(rows || []);
  });
});

router.post('/', (req, res) => {
  const { school, degree, field, startDate, endDate, description } = req.body;
  db.run('INSERT INTO education (school, degree, field, startDate, endDate, description) VALUES (?, ?, ?, ?, ?, ?)',
    [school, degree, field, startDate, endDate, description], (err) => {
      res.json({ message: 'Education added' });
    });
});

export default router;
