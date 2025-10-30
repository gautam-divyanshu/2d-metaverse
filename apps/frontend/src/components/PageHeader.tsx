import { useNavigate } from 'react-router-dom';
import { Search, Plus, LogOut, ArrowLeft, Shield, Key } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  showBackButton?: boolean;
  showJoinWithCode?: boolean;
  onJoinWithCode?: () => void;
  showCreateButton?: boolean;
  createButtonText?: string;
  onCreateClick?: () => void;
  showAdminPanelButton?: boolean;
}

export const PageHeader = ({
  title,
  subtitle,
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search...',
  showBackButton = false,
  showJoinWithCode = false,
  onJoinWithCode,
  showCreateButton = false,
  createButtonText = 'Create',
  onCreateClick,
  showAdminPanelButton = false,
}: PageHeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Back Button, Logo/Title and User Profile */}
        <div className="flex items-center gap-6">
          {showBackButton && (
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div>
            <h1 className="text-xl font-bold text-white">{title}</h1>
            {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
          </div>

          {/* User Profile */}
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-3 px-3 py-2 bg-slate-700/50 rounded-lg border border-slate-600 hover:bg-slate-700/70 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-white">{user?.username}</p>
              <p className="text-xs text-slate-400">
                {user?.role === 'admin' ? 'Administrator' : 'User'}
              </p>
            </div>
          </button>
        </div>

        {/* Right Section - Search, Actions and Sign Out */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-64"
            />
          </div>

          {showJoinWithCode && (
            <button
              onClick={onJoinWithCode}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              <Key className="w-4 h-4" />
              Join with Code
            </button>
          )}

          {showCreateButton && (
            <button
              onClick={onCreateClick}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              {createButtonText}
            </button>
          )}

          {/* Admin Panel Access (if admin) */}
          {showAdminPanelButton && user?.role === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
              title="Admin Panel"
            >
              <Shield className="w-5 h-5" />
            </button>
          )}

          {/* Sign Out Button */}
          <button
            onClick={() => logout()}
            className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-900/20 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
