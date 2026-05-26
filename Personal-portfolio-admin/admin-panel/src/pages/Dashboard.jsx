import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { LogOut, RefreshCw } from 'lucide-react';

export default function Dashboard() {
  const [admin, setAdmin] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await authAPI.getCurrentAdmin();
        setAdmin(response.data.admin);
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/');
      }
    };
    
    fetchAdmin();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSync = async () => {
    setSyncing(true);
    setSyncMessage('');
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${baseUrl}/sync/portfolio`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSyncMessage(`✅ Synced successfully!\n${data.message}\nProjects: ${data.synced.projects}, Education: ${data.synced.education}, Experience: ${data.synced.experience}`);
      } else {
        setSyncMessage('❌ Failed to sync portfolio');
      }
    } catch (error) {
      setSyncMessage('❌ Error syncing portfolio: ' + error.message);
    } finally {
      setSyncing(false);
      setTimeout(() => setSyncMessage(''), 5000);
    }
  };

  const menuItems = [
    { title: 'Projects', path: '/projects', description: 'Manage your projects' },
    { title: 'Education', path: '/education', description: 'Manage education info' },
    { title: 'Experience', path: '/experience', description: 'Manage work experience' },
    { title: 'Skills', path: '/skills', description: 'Manage skills & expertise' },
    { title: 'Certificates', path: '/certificates', description: 'Manage certificates' },
    { title: 'About', path: '/about', description: 'Manage about section' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-gray-400">Welcome, <span className="text-blue-400 font-semibold">{admin?.username}</span></p>
        </div>

        {/* Sync Section */}
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Sync to Portfolio</h3>
              <p className="text-gray-400">Push all changes to the portfolio website</p>
            </div>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg transition"
            >
              <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Syncing...' : 'Sync Now'}
            </button>
          </div>
          {syncMessage && (
            <div className="mt-4 p-4 bg-gray-700 rounded text-sm text-white whitespace-pre-line">
              {syncMessage}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 p-6 rounded-lg transition transform hover:scale-105"
            >
              <h2 className="text-xl font-bold text-white mb-2">{item.title}</h2>
              <p className="text-gray-400">{item.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
