const { all, get, run } = require('../config/database');

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const rows = await all('SELECT * FROM projects ORDER BY created_at DESC');
    
    // Parse JSON tags
    const projects = rows.map(p => ({
      ...p,
      tags: JSON.parse(p.tags || '[]')
    }));
    
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await get('SELECT * FROM projects WHERE id = ?', [id]);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    project.tags = JSON.parse(project.tags || '[]');
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create project
exports.createProject = async (req, res) => {
  try {
    const { title, description, longDescription, image, tags, github, live, featured } = req.body;
    
    const result = await run(
      'INSERT INTO projects (title, description, longDescription, image, tags, github, live, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, longDescription, image, JSON.stringify(tags || []), github, live, featured ? 1 : 0]
    );
    
    res.status(201).json({ id: result.lastID, message: 'Project created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, longDescription, image, tags, github, live, featured } = req.body;
    
    await run(
      'UPDATE projects SET title = ?, description = ?, longDescription = ?, image = ?, tags = ?, github = ?, live = ?, featured = ? WHERE id = ?',
      [title, description, longDescription, image, JSON.stringify(tags || []), github, live, featured ? 1 : 0, id]
    );
    
    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await run('DELETE FROM projects WHERE id = ?', [id]);
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
