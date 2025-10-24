import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header className="bg-slate-900 text-white shadow-lg border-b border-slate-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 
            className="text-2xl font-bold cursor-pointer hover:text-blue-400 transition-colors"
            onClick={() => navigate('/dashboard')}
          >
            2D Metaverse
          </h1>
          <nav className="flex gap-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="relative group py-2 text-slate-300 hover:text-white transition-colors"
            >
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300 ease-out"></span>
            </button>
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="relative group py-2 text-slate-300 hover:text-white transition-colors"
              >
                Admin Panel
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300 ease-out"></span>
              </button>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-300">
            {user?.username} {isAdmin && <span className="text-blue-400">(Admin)</span>}
          </span>
          <button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
