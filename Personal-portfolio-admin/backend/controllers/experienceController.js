const { all, get, run } = require('../config/database');

// Get all experience
exports.getAllExperience = async (req, res) => {
  try {
    const rows = await all('SELECT * FROM experience ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get experience by ID
exports.getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await get('SELECT * FROM experience WHERE id = ?', [id]);
    
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create experience
exports.createExperience = async (req, res) => {
  try {
    const { title, company, description, image, duration, location } = req.body;
    
    const result = await run(
      'INSERT INTO experience (title, company, description, image, duration, location) VALUES (?, ?, ?, ?, ?, ?)',
      [title, company, description, image, duration, location]
    );
    
    res.status(201).json({ id: result.lastID, message: 'Experience created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update experience
exports.updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, company, description, image, duration, location } = req.body;
    
    await run(
      'UPDATE experience SET title = ?, company = ?, description = ?, image = ?, duration = ?, location = ? WHERE id = ?',
      [title, company, description, image, duration, location, id]
    );
    
    res.json({ message: 'Experience updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete experience
exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    await run('DELETE FROM experience WHERE id = ?', [id]);
    
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
