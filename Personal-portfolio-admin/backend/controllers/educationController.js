const { all, get, run } = require('../config/database');

// Get education
exports.getAllEducation = async (req, res) => {
  try {
    const rows = await all('SELECT * FROM education ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get education by ID
exports.getEducationById = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await get('SELECT * FROM education WHERE id = ?', [id]);
    
    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }
    res.json(education);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create education
exports.createEducation = async (req, res) => {
  try {
    const { title, institution, description, image, duration, achievement } = req.body;
    
    const result = await run(
      'INSERT INTO education (title, institution, description, image, duration, achievement) VALUES (?, ?, ?, ?, ?, ?)',
      [title, institution, description, image, duration, achievement]
    );
    
    res.status(201).json({ id: result.lastID, message: 'Education created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update education
exports.updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, institution, description, image, duration, achievement } = req.body;
    
    await run(
      'UPDATE education SET title = ?, institution = ?, description = ?, image = ?, duration = ?, achievement = ? WHERE id = ?',
      [title, institution, description, image, duration, achievement, id]
    );
    
    res.json({ message: 'Education updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete education
exports.deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    await run('DELETE FROM education WHERE id = ?', [id]);
    
    res.json({ message: 'Education deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
