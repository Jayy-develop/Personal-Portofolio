@echo off
echo 🚀 Starting Portfolio Admin System Setup...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%
echo.

REM Setup Backend
echo 📦 Setting up Backend...
cd backend
call npm install
echo ✅ Backend dependencies installed
echo.

REM Initialize Database
echo 🗄️ Initializing SQLite Database...
node config/initDatabase.js
echo.

REM Setup Admin Panel
echo 📦 Setting up Admin Panel...
cd ..\admin-panel
call npm install
echo ✅ Admin Panel dependencies installed
echo.

echo 🎉 Setup Complete!
echo.
echo 📝 Next Steps:
echo.
echo 1. Start Backend (in backend folder):
echo    npm run dev
echo.
echo 2. Start Admin Panel (in admin-panel folder):
echo    npm run dev
echo.
echo 3. Open Admin Panel:
echo    http://localhost:5173
echo.
echo 4. Login with credentials:
echo    Username: admin
echo    Password: admin123
echo.
echo ⚠️  Remember to change the default password!
echo.
pause
