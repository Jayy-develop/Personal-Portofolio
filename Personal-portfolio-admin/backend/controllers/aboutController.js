const { all, get, run } = require('../config/database');

// Get about data
exports.getAbout = async (req, res) => {
  try {
    const about = await get('SELECT * FROM about LIMIT 1');
    
    if (!about) {
      return res.json({});
    }
    
    res.json(about);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create or update about
exports.saveAbout = async (req, res) => {
  try {
    const { bio_short, bio_long, location, timezone, email, phone } = req.body;
    
    // Check if record exists
    const existing = await get('SELECT id FROM about LIMIT 1');
    
    if (existing) {
      // Update
      await run(
        'UPDATE about SET bio_short = ?, bio_long = ?, location = ?, timezone = ?, email = ?, phone = ? WHERE id = ?',
        [bio_short, bio_long, location, timezone, email, phone, existing.id]
      );
      res.json({ message: 'About updated successfully' });
    } else {
      // Insert
      const result = await run(
        'INSERT INTO about (bio_short, bio_long, location, timezone, email, phone) VALUES (?, ?, ?, ?, ?, ?)',
        [bio_short, bio_long, location, timezone, email, phone]
      );
      res.status(201).json({ id: result.lastID, message: 'About created successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
