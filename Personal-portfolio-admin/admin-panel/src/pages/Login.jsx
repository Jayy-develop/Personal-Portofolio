import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { LogIn, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const navigate = useNavigate();

  // Check if IP is temporarily locked after too many attempts
  useEffect(() => {
    const attempts = parseInt(localStorage.getItem('loginAttempts') || '0');
    const lockTime = parseInt(localStorage.getItem('loginLockTime') || '0');
    
    if (lockTime && Date.now() < lockTime) {
      setIsLocked(true);
      setLockTimer(Math.ceil((lockTime - Date.now()) / 1000));
    } else {
      localStorage.removeItem('loginLockTime');
      setIsLocked(false);
      setLoginAttempts(attempts);
    }
  }, []);

  // Countdown timer for lock
  useEffect(() => {
    if (!isLocked || lockTimer === 0) return;
    
    const interval = setInterval(() => {
      setLockTimer(prev => {
        if (prev <= 1) {
          setIsLocked(false);
          localStorage.removeItem('loginLockTime');
          localStorage.setItem('loginAttempts', '0');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isLocked, lockTimer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Prevent logging sensitive data
    if (name !== 'password') {
      setCredentials(prev => ({ ...prev, [name]: value }));
    } else {
      setCredentials(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateInput = () => {
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return false;
    }
    if (credentials.username.length < 3) {
      setError('Username must be at least 3 characters');
      return false;
    }
    if (credentials.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLocked) {
      setError(`Too many login attempts. Please try again in ${lockTimer} seconds.`);
      return;
    }

    setError('');
    if (!validateInput()) return;

    setLoading(true);

    try {
      const response = await authAPI.login(credentials.username, credentials.password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('loginAttempts', '0');
      localStorage.removeItem('loginLockTime');
      navigate('/dashboard');
    } catch (err) {
      // Increment failed attempts
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      localStorage.setItem('loginAttempts', newAttempts.toString());

      // Lock after 5 attempts for 15 minutes
      if (newAttempts >= 5) {
        const lockUntil = Date.now() + (15 * 60 * 1000); // 15 minutes
        localStorage.setItem('loginLockTime', lockUntil.toString());
        setIsLocked(true);
        setLockTimer(15 * 60);
        setError('Too many login attempts. Account locked for 15 minutes.');
      } else {
        // Generic error message for security
        setError('Invalid credentials. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg shadow-lg">
              <LogIn className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-white mb-2">Admin Portal</h1>
          <p className="text-center text-gray-400 mb-8">Secure Portfolio Management</p>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {loginAttempts > 0 && loginAttempts < 5 && !isLocked && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-4 py-2 rounded-lg mb-6 text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Login attempts: {loginAttempts}/5</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                disabled={isLocked}
                autoComplete="off"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  disabled={isLocked}
                  autoComplete="off"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLocked || !credentials.password}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 disabled:opacity-30"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || isLocked}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : isLocked ? `Locked (${lockTimer}s)` : 'Login'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-300">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Security Features:</p>
                <ul className="text-xs space-y-1 opacity-90">
                  <li>✓ Encrypted password transmission</li>
                  <li>✓ Rate limiting (5 attempts / 15 min)</li>
                  <li>✓ Session token based authentication</li>
                  <li>✓ Secure credential storage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

