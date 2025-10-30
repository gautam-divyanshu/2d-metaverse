import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/signin');
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate('/dashboard')}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <circle cx="6" cy="6" r="2" fill="currentColor" />
            <circle cx="18" cy="6" r="2" fill="currentColor" />
            <circle cx="6" cy="18" r="2" fill="currentColor" />
            <circle cx="18" cy="18" r="2" fill="currentColor" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <line
              x1="8"
              y1="6"
              x2="10"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="14"
              y1="12"
              x2="16"
              y2="6"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="8"
              y1="18"
              x2="10"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
            />

            <line
              x1="14"
              y1="12"
              x2="16"
              y2="18"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Right section with Username and Create Space Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-900/20 transition-colors"
            title="Sign Out"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 17L21 12L16 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
