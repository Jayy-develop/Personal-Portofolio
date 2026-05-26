const { all, get, run } = require('../config/database');

// Get all certificates
exports.getAllCertificates = async (req, res) => {
  try {
    const rows = await all('SELECT * FROM certificates ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get certificate by ID
exports.getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await get('SELECT * FROM certificates WHERE id = ?', [id]);
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.json(certificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create certificate
exports.createCertificate = async (req, res) => {
  try {
    const { title, issuer, image, credential_url, issued_date } = req.body;
    
    const result = await run(
      'INSERT INTO certificates (title, issuer, image, credential_url, issued_date) VALUES (?, ?, ?, ?, ?)',
      [title, issuer, image, credential_url, issued_date]
    );
    
    res.status(201).json({ id: result.lastID, message: 'Certificate created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update certificate
exports.updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, issuer, image, credential_url, issued_date } = req.body;
    
    await run(
      'UPDATE certificates SET title = ?, issuer = ?, image = ?, credential_url = ?, issued_date = ? WHERE id = ?',
      [title, issuer, image, credential_url, issued_date, id]
    );
    
    res.json({ message: 'Certificate updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete certificate
exports.deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    await run('DELETE FROM certificates WHERE id = ?', [id]);
    
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
