# Portfolio Admin System - SQLite Setup Guide

## 🎯 Overview
This is a complete admin panel system for managing your portfolio website. The system now uses SQLite database for easy deployment without requiring MySQL servers.

**Features:**
- Admin authentication with JWT
- Manage Projects, Education, Experience, Skills, Certificates, and About sections
- **Direct sync to portfolio** - Push all changes directly to your portfolio website
- SQLite database - No external database server required
- One-click portfolio updates

## 🚀 Quick Start

### Prerequisites
- Node.js v14+ installed
- npm or yarn

### Installation & Setup

#### 1. Backend Setup

```bash
cd backend
npm install
```

#### 2. Initialize Database

```bash
# Create SQLite database and tables
node config/initDatabase.js
```

You should see:
```
✅ Tables created successfully
✅ Default admin user created
   Username: admin
   Password: admin123
```

#### 3. Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

Server will run on `http://localhost:5000`

#### 4. Admin Panel Setup

```bash
cd ../admin-panel
npm install
npm run dev
```

Admin panel will run on `http://localhost:5173`

## 📋 Default Credentials

```
Username: admin
Password: admin123
```

**⚠️ Change these credentials immediately after first login!**

## 🔄 How It Works

### Architecture
```
┌─────────────────────────────────────┐
│  Admin Panel (React Frontend)        │
│  - Dashboard                         │
│  - Projects, Education, etc.         │
│  - Sync to Portfolio Button          │
└────────────┬────────────────────────┘
             │ API Calls
             ↓
┌─────────────────────────────────────┐
│  Backend Server (Express)            │
│  - JWT Authentication                │
│  - CRUD Operations                   │
│  - Portfolio Sync Endpoint           │
└────────────┬────────────────────────┘
             │ (Sync)
             ↓
┌─────────────────────────────────────┐
│  SQLite Database (portfolio.db)      │
│  - Projects, Education, etc.         │
└─────────────────────────────────────┘
             │ (Generate)
             ↓
┌─────────────────────────────────────┐
│  Portfolio Config Files              │
│  - projects.js                       │
│  - education.js                      │
│  - experience.js                     │
│  - skills.js                         │
│  - certificates.js                   │
└─────────────────────────────────────┘
```

### Sync Flow

1. **Add/Edit Data** in Admin Panel
2. **Save to Database** via API
3. **Click "Sync to Portfolio"** button
4. **Auto-generate Config Files** in portfolio/src/config/
5. **Portfolio Site** picks up new data automatically

## 🛠️ Environment Configuration

### Backend (.env)

```
# Database Configuration (SQLite)
DB_PATH=./portfolio.db

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret
JWT_SECRET=your_secure_secret_key_here_change_in_production

# Admin Credentials (default)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Admin Panel (.env)

```
VITE_API_URL=http://localhost:5000/api
```

## 📱 API Endpoints

### Authentication
- `POST /api/auth/login` - Login with credentials
- `GET /api/auth/me` - Get current admin info

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Education
- `GET /api/education` - Get all education entries
- `POST /api/education` - Create education entry
- `PUT /api/education/:id` - Update education entry
- `DELETE /api/education/:id` - Delete education entry

### Experience
- `GET /api/experience` - Get all experience entries
- `POST /api/experience` - Create experience entry
- `PUT /api/experience/:id` - Update experience entry
- `DELETE /api/experience/:id` - Delete experience entry

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill category
- `PUT /api/skills/:id` - Update skill category
- `DELETE /api/skills/:id` - Delete skill category

### Certificates
- `GET /api/certificates` - Get all certificates
- `POST /api/certificates` - Create certificate
- `PUT /api/certificates/:id` - Update certificate
- `DELETE /api/certificates/:id` - Delete certificate

### About
- `GET /api/about` - Get about section
- `POST /api/about` - Save about section

### Sync (Protected - Requires Auth)
- `POST /api/sync/portfolio` - Sync all data to portfolio config files

## 💾 Database Schema

### Tables
1. **admin** - Admin users
2. **projects** - Portfolio projects
3. **education** - Education history
4. **experience** - Work experience
5. **skills** - Skills by category
6. **certificates** - Certifications
7. **about** - Portfolio about section

All tables have timestamps for tracking creation and updates.

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected routes (sync endpoint requires authentication)
- CORS enabled for frontend
- Input validation on all endpoints

## 📝 Changing Admin Password

To change the admin password:

1. Update the `ADMIN_PASSWORD` in `.env`
2. Run the init script again:
   ```bash
   node config/initDatabase.js
   ```

Or manually update the password in the admin panel (feature to be added).

## 🐛 Troubleshooting

### Database Issues
```bash
# Reset database (deletes all data)
rm portfolio.db
node config/initDatabase.js
```

### Port Already in Use
```bash
# Change PORT in backend/.env or kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### CORS Issues
- Make sure backend is running on port 5000
- Check `VITE_API_URL` in admin-panel/.env

### Sync Not Working
- Verify authentication token is stored in localStorage
- Check that portfolio config directory exists
- Ensure backend has write permissions to portfolio directory

## 📦 Deployment

### Production Checklist
- [ ] Change `JWT_SECRET` to a strong key
- [ ] Change `ADMIN_USERNAME` and `ADMIN_PASSWORD`
- [ ] Set `NODE_ENV=production`
- [ ] Use environment variables (not .env file)
- [ ] Enable HTTPS in production
- [ ] Set proper CORS origins
- [ ] Back up SQLite database regularly

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

## 🤝 Support

If you encounter issues:
1. Check the console logs
2. Verify all dependencies are installed
3. Ensure ports 5000 and 5173 are available
4. Check file permissions in the project directory
