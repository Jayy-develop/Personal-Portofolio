const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { get } = require('../config/database');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    const admin = await get('SELECT * FROM admin WHERE username = ?', [username]);

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET || 'your_secret_key_here_change_in_production',
      { expiresIn: '7d' }
    );

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCurrentAdmin = async (req, res) => {
  try {
    res.json({ admin: req.admin });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
