# Admin Panel Portfolio

Admin panel untuk manage portfolio data dengan full CRUD operations.

## Setup

1. **Install dependencies**
```bash
npm install
```

2. **Setup environment**
```bash
cp .env.example .env
```

Edit `.env` dan sesuaikan API URL jika berbeda dari default.

3. **Start development server**
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## Features

- ✅ Login authentication
- ✅ Manage Projects
- ✅ Manage Education
- ✅ Manage Experience  
- ✅ Manage Skills
- ✅ Manage Certificates
- ✅ Manage About Section

## Usage

1. Login dengan credentials default (check backend README)
2. Klik pada menu item untuk manage data
3. Gunakan tombol Add/Edit/Delete untuk CRUD operations
4. Semua perubahan akan tersimpan di database MySQL

## Build for Production

```bash
npm run build
```

Output akan berada di folder `dist/`
