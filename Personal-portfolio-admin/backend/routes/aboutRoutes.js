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
  db.get('SELECT content FROM about LIMIT 1', (err, row) => {
    res.json(row || { content: '' });
  });
});

router.post('/', (req, res) => {
  const { content } = req.body;
  db.run('UPDATE about SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1', [content], function(err) {
    if (this.changes === 0) {
      db.run('INSERT INTO about (id, content) VALUES (1, ?)', [content], (err) => {
        res.json({ message: 'About updated' });
      });
    } else {
      res.json({ message: 'About updated' });
    }
  });
});

export default router;
