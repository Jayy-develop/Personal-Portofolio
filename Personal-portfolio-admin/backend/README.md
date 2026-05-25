# Portfolio Admin Backend

Backend API untuk Portfolio Admin Panel dengan Node.js + Express + MySQL

## Setup

1. **Install dependencies**
```bash
npm install
```

2. **Setup environment**
```bash
cp .env.example .env
```

Edit `.env` dan sesuaikan:
- DB_HOST, DB_USER, DB_PASSWORD, DB_NAME untuk MySQL
- JWT_SECRET untuk security
- ADMIN_USERNAME dan ADMIN_PASSWORD

3. **Initialize Database**
```bash
node config/initDatabase.js
```

4. **Start server**
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Auth
- `POST /api/auth/login` - Login admin
- `GET /api/auth/me` - Get current admin (protected)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Education
- `GET /api/education` - Get all education
- `GET /api/education/:id` - Get education by ID
- `POST /api/education` - Create education (protected)
- `PUT /api/education/:id` - Update education (protected)
- `DELETE /api/education/:id` - Delete education (protected)

### Experience
- `GET /api/experience` - Get all experience
- `GET /api/experience/:id` - Get experience by ID
- `POST /api/experience` - Create experience (protected)
- `PUT /api/experience/:id` - Update experience (protected)
- `DELETE /api/experience/:id` - Delete experience (protected)

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get skill by ID
- `POST /api/skills` - Create skill (protected)
- `PUT /api/skills/:id` - Update skill (protected)
- `DELETE /api/skills/:id` - Delete skill (protected)

### Certificates
- `GET /api/certificates` - Get all certificates
- `GET /api/certificates/:id` - Get certificate by ID
- `POST /api/certificates` - Create certificate (protected)
- `PUT /api/certificates/:id` - Update certificate (protected)
- `DELETE /api/certificates/:id` - Delete certificate (protected)

### About
- `GET /api/about` - Get about data
- `POST /api/about` - Create/Update about (protected)
- `PUT /api/about` - Create/Update about (protected)

## Default Login
Username: admin
Password: admin123

Change these in .env file
