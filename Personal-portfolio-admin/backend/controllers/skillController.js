const { all, get, run } = require('../config/database');

// Get all skills
exports.getAllSkills = async (req, res) => {
  try {
    const rows = await all('SELECT * FROM skills');
    
    // Parse JSON fields
    const parsed = rows.map(row => ({
      ...row,
      skills: JSON.parse(row.skills || '[]')
    }));
    
    res.json(parsed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get skill by ID
exports.getSkillById = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await get('SELECT * FROM skills WHERE id = ?', [id]);
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    skill.skills = JSON.parse(skill.skills || '[]');
    res.json(skill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create skill category
exports.createSkill = async (req, res) => {
  try {
    const { category, skills } = req.body;
    
    const result = await run(
      'INSERT INTO skills (category, skills) VALUES (?, ?)',
      [category, JSON.stringify(skills || [])]
    );
    
    res.status(201).json({ id: result.lastID, message: 'Skill category created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update skill
exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, skills } = req.body;
    
    await run(
      'UPDATE skills SET category = ?, skills = ? WHERE id = ?',
      [category, JSON.stringify(skills || []), id]
    );
    
    res.json({ message: 'Skill updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete skill
exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    await run('DELETE FROM skills WHERE id = ?', [id]);
    
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
