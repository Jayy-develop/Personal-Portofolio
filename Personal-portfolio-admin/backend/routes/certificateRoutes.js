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
  db.all('SELECT * FROM certificates ORDER BY created_at DESC', (err, rows) => {
    res.json(rows || []);
  });
});

router.post('/', (req, res) => {
  const { title, issuer, date, description, link, image } = req.body;
  db.run('INSERT INTO certificates (title, issuer, date, description, link, image) VALUES (?, ?, ?, ?, ?, ?)',
    [title, issuer, date, description, link, image], (err) => {
      res.json({ message: 'Certificate added' });
    });
});

export default router;
