#!/bin/bash

echo "🚀 Starting Portfolio Admin System Setup..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend
npm install
echo "✅ Backend dependencies installed"
echo ""

# Initialize Database
echo "🗄️  Initializing SQLite Database..."
node config/initDatabase.js
echo ""

# Setup Admin Panel
echo "📦 Setting up Admin Panel..."
cd ../admin-panel
npm install
echo "✅ Admin Panel dependencies installed"
echo ""

echo "🎉 Setup Complete!"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Start Backend (in backend folder):"
echo "   npm run dev"
echo ""
echo "2. Start Admin Panel (in admin-panel folder):"
echo "   npm run dev"
echo ""
echo "3. Open Admin Panel:"
echo "   http://localhost:5173"
echo ""
echo "4. Login with credentials:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "⚠️  Remember to change the default password!"
