const { all, get } = require('../config/database');
const fs = require('fs');
const path = require('path');

// Sync admin data to portfolio configs
exports.syncToPortfolio = async (req, res) => {
  try {
    // Get all data from admin database
    const projects = await all('SELECT * FROM projects ORDER BY created_at DESC');
    const education = await all('SELECT * FROM education ORDER BY created_at DESC');
    const experience = await all('SELECT * FROM experience ORDER BY created_at DESC');
    const skills = await all('SELECT * FROM skills');
    const certificates = await all('SELECT * FROM certificates ORDER BY created_at DESC');
    const about = await get('SELECT * FROM about LIMIT 1');

    // Parse JSON fields
    const parsedProjects = projects.map(p => ({
      ...p,
      tags: JSON.parse(p.tags || '[]')
    }));

    const parsedSkills = skills.map(s => ({
      ...s,
      skills: JSON.parse(s.skills || '[]')
    }));

    // Prepare config objects
    const configData = {
      projects: parsedProjects,
      education: education,
      experience: experience,
      skills: parsedSkills,
      certificates: certificates,
      about: about || {}
    };

    // Portfolio config paths
    const portfolioConfigDir = path.join(__dirname, '..', '..', '..', 'src', 'config');

    // Create config files for each category
    if (!fs.existsSync(portfolioConfigDir)) {
      fs.mkdirSync(portfolioConfigDir, { recursive: true });
    }

    // Write projects config
    fs.writeFileSync(
      path.join(portfolioConfigDir, 'projects.js'),
      generateConfigFile('projects', configData.projects)
    );

    // Write education config
    fs.writeFileSync(
      path.join(portfolioConfigDir, 'education.js'),
      generateConfigFile('education', configData.education)
    );

    // Write experience config
    fs.writeFileSync(
      path.join(portfolioConfigDir, 'experience.js'),
      generateConfigFile('experience', configData.experience)
    );

    // Write skills config
    fs.writeFileSync(
      path.join(portfolioConfigDir, 'skills.js'),
      generateConfigFile('skills', configData.skills)
    );

    // Write certificates config
    fs.writeFileSync(
      path.join(portfolioConfigDir, 'certificates.js'),
      generateConfigFile('certificates', configData.certificates)
    );

    res.json({
      message: 'Portfolio synced successfully',
      synced: {
        projects: configData.projects.length,
        education: configData.education.length,
        experience: configData.experience.length,
        skills: configData.skills.length,
        certificates: configData.certificates.length
      }
    });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ message: 'Failed to sync portfolio', error: error.message });
  }
};

// Helper function to generate config file content
function generateConfigFile(name, data) {
  return `// Auto-generated from admin panel\n// Do not edit manually - changes will be lost on next sync\n\nconst ${name} = ${JSON.stringify(data, null, 2)};\n\nexport default ${name};\n`;
}
