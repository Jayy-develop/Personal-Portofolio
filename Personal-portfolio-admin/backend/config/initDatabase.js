const { run, all, get, exec } = require('./database');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function initializeDatabase() {
  try {
    console.log('🔧 Initializing SQLite database...');

    // Create tables
    const tables = `
      CREATE TABLE IF NOT EXISTS admin (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        longDescription TEXT,
        image TEXT,
        tags TEXT DEFAULT '[]',
        github TEXT,
        live TEXT,
        featured INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS education (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        institution TEXT NOT NULL,
        description TEXT,
        image TEXT,
        duration TEXT,
        achievement TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS experience (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        description TEXT,
        image TEXT,
        duration TEXT,
        location TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        skills TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS certificates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        issuer TEXT NOT NULL,
        image TEXT,
        credential_url TEXT,
        issued_date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS about (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bio_short TEXT,
        bio_long TEXT,
        location TEXT,
        timezone TEXT,
        email TEXT,
        phone TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await exec(tables);
    console.log('✅ Tables created successfully');

    // Check if admin exists
    const admin = await get('SELECT * FROM admin WHERE username = ?', [process.env.ADMIN_USERNAME || 'admin']);

    if (!admin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
      await run(
        'INSERT INTO admin (username, password) VALUES (?, ?)',
        [process.env.ADMIN_USERNAME || 'admin', hashedPassword]
      );
      console.log('✅ Default admin user created');
      console.log(`   Username: ${process.env.ADMIN_USERNAME || 'admin'}`);
      console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    console.log('\n✅ Database initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;
