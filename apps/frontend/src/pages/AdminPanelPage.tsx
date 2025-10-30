import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Globe,
  Users,
  Plus,
  LogOut,
  Search,
  Palette,
  Eye,
  Edit3,
  ArrowLeft,
  MoreHorizontal,
} from 'lucide-react';

interface AdminElement {
  id: number;
  width: number;
  height: number;
  imageUrl: string;
  isStatic: boolean;
}

interface AdminAvatar {
  id: number;
  name: string;
  imageUrl: string;
}

interface AdminSpace {
  id: number;
  name: string;
  dimensions: string;
  ownerId: number;
}

export const AdminPanelPage = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'elements' | 'avatars' | 'spaces'>(
    'elements'
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Resource state
  const [elements, setElements] = useState<AdminElement[]>([]);
  const [avatars, setAvatars] = useState<AdminAvatar[]>([]);
  const [spaces, setSpaces] = useState<AdminSpace[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Element Form State
  const [elementForm, setElementForm] = useState({
    imageUrl: '',
    width: 1,
    height: 1,
    static: false,
  });

  // Avatar Form State
  const [avatarForm, setAvatarForm] = useState({
    name: '',
    imageUrl: '',
  });

  // Space Form State
  const [spaceForm, setSpaceForm] = useState({
    name: '',
    width: 20,
    height: 20,
  });

  // Fetch admin's resources
  const fetchResources = async () => {
    setIsLoading(true);
    try {
      const [elementsRes, avatarsRes, spacesRes] = await Promise.all([
        fetch('http://localhost:3000/api/v1/admin/elements', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('http://localhost:3000/api/v1/admin/avatars', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('http://localhost:3000/api/v1/space/all', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (elementsRes.ok) {
        const elementsData = await elementsRes.json();
        setElements(elementsData);
      }

      if (avatarsRes.ok) {
        const avatarsData = await avatarsRes.json();
        setAvatars(avatarsData);
      }

      if (spacesRes.ok) {
        const spacesData = await spacesRes.json();
        setSpaces(spacesData.spaces || []);
      }
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen !== null) {
        const target = event.target as HTMLElement;
        const dropdown = target.closest('.dropdown-menu');
        const button = target.closest('.dropdown-button');

        if (!dropdown && !button) {
          setDropdownOpen(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleCreateElement = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const response = await fetch(
        'http://localhost:3000/api/v1/admin/element',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(elementForm),
        }
      );

      if (response.ok) {
        alert('Element created successfully!');
        setShowCreateModal(false);
        setElementForm({ imageUrl: '', width: 1, height: 1, static: false });
        fetchResources(); // Refresh the list
      } else {
        alert('Failed to create element');
      }
    } catch (error) {
      console.error('Error creating element:', error);
      alert('Network error');
    } finally {
      setIsCreating(false);
    }
  };

  const handleCreateAvatar = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const response = await fetch(
        'http://localhost:3000/api/v1/admin/avatar',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(avatarForm),
        }
      );

      if (response.ok) {
        alert('Avatar created successfully!');
        setShowCreateModal(false);
        setAvatarForm({ name: '', imageUrl: '' });
        fetchResources(); // Refresh the list
      } else {
        alert('Failed to create avatar');
      }
    } catch (error) {
      console.error('Error creating avatar:', error);
      alert('Network error');
    } finally {
      setIsCreating(false);
    }
  };

  const handleCreateSpace = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const response = await fetch('http://localhost:3000/api/v1/space', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: spaceForm.name,
          dimensions: `${spaceForm.width}x${spaceForm.height}`,
        }),
      });

      if (response.ok) {
        alert('Space created successfully!');
        setShowCreateModal(false);
        setSpaceForm({ name: '', width: 20, height: 20 });
        fetchResources(); // Refresh the list
      } else {
        alert('Failed to create space');
      }
    } catch (error) {
      console.error('Error creating space:', error);
      alert('Network error');
    } finally {
      setIsCreating(false);
    }
  };

  // Handler functions for space actions
  const handleSpaceClick = (spaceId: number) => {
    navigate(`/space/${spaceId}`);
  };

  const handleEditSpace = (spaceId: number) => {
    navigate(`/space/${spaceId}/edit`);
    setDropdownOpen(null);
  };

  const handleShareSpace = (space: AdminSpace) => {
    const shareUrl = `${window.location.origin}/space/${space.id}`;
    navigator.clipboard.writeText(shareUrl);
    alert(`Space URL copied to clipboard: ${shareUrl}`);
    setDropdownOpen(null);
  };

  const handleDeleteSpace = async (spaceId: number) => {
    if (
      window.confirm(
        'Are you sure you want to delete this space? This action cannot be undone.'
      )
    ) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/space/${spaceId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          alert('Space deleted successfully!');
          fetchResources(); // Refresh the list
        } else {
          alert('Failed to delete space');
        }
      } catch (error) {
        console.error('Error deleting space:', error);
        alert('Network error');
      }
    }
    setDropdownOpen(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Main Content Area */}
      <div className="flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section - Back Button, Title and User Profile */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div>
                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                <p className="text-sm text-slate-400">
                  {activeTab === 'elements' &&
                    'Manage space elements and assets'}
                  {activeTab === 'avatars' && 'Create and manage user avatars'}
                  {activeTab === 'spaces' &&
                    'Oversee all spaces in the metaverse'}
                </p>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-3 px-3 py-2 bg-slate-700/50 rounded-lg border border-slate-600">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">
                    {user?.username}
                  </p>
                  <p className="text-xs text-slate-400">Administrator</p>
                </div>
              </div>
            </div>

            {/* Right Section - Search, Actions and Sign Out */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-64"
                />
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create{' '}
                {activeTab === 'elements'
                  ? 'Element'
                  : activeTab === 'avatars'
                    ? 'Avatar'
                    : 'Space'}
              </button>

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

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {(() => {
              const filteredElements = elements.filter(
                (element) =>
                  `Element ${element.id}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  element.isStatic
                    .toString()
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              );
              const filteredAvatars = avatars.filter((avatar) =>
                avatar.name.toLowerCase().includes(searchQuery.toLowerCase())
              );
              const filteredSpaces = spaces.filter(
                (space) =>
                  space.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  space.dimensions
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              );

              return (
                <>
                  <div
                    className="bg-slate-800 rounded-xl p-4 border border-slate-700 cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => setActiveTab('elements')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Palette className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">
                          {searchQuery
                            ? filteredElements.length
                            : elements.length}
                        </p>
                        <p className="text-sm text-slate-400">Elements</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-slate-800 rounded-xl p-4 border border-slate-700 cursor-pointer hover:border-green-500 transition-colors"
                    onClick={() => setActiveTab('avatars')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">
                          {searchQuery
                            ? filteredAvatars.length
                            : avatars.length}
                        </p>
                        <p className="text-sm text-slate-400">Avatars</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-slate-800 rounded-xl p-4 border border-slate-700 cursor-pointer hover:border-purple-500 transition-colors"
                    onClick={() => setActiveTab('spaces')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">
                          {searchQuery ? filteredSpaces.length : spaces.length}
                        </p>
                        <p className="text-sm text-slate-400">Spaces</p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>

          {/* Content Section */}
          <div className="bg-slate-800 rounded-xl border border-slate-700">
            <div className="p-6 border-b border-slate-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">
                  {activeTab === 'elements' && 'Space Elements'}
                  {activeTab === 'avatars' && 'User Avatars'}
                  {activeTab === 'spaces' && 'Spaces'}
                </h3>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add New
                </button>
              </div>
            </div>

            <div className="p-6">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-square bg-slate-700 rounded-lg mb-3"></div>
                      <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {/* Elements Tab */}
                  {activeTab === 'elements' && (
                    <>
                      {(() => {
                        const filteredElements = elements.filter(
                          (element) =>
                            `Element ${element.id}`
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                            element.isStatic
                              .toString()
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                        );
                        return filteredElements.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                            {filteredElements.map((element) => (
                              <motion.div
                                key={element.id}
                                whileHover={{ scale: 1.02 }}
                                className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-colors"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-white font-medium">
                                    Element #{element.id}
                                  </span>
                                  <span
                                    className={`px-2 py-1 text-xs rounded ${
                                      element.isStatic
                                        ? 'bg-red-500/20 text-red-300'
                                        : 'bg-green-500/20 text-green-300'
                                    }`}
                                  >
                                    {element.isStatic ? 'Static' : 'Walkable'}
                                  </span>
                                </div>
                                <p className="text-slate-300 text-sm mb-2">
                                  Size: {element.width}x{element.height}
                                </p>
                                {element.imageUrl && (
                                  <div className="aspect-square bg-slate-600 rounded-lg mb-3 overflow-hidden">
                                    <img
                                      src={element.imageUrl}
                                      alt={`Element ${element.id}`}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        (
                                          e.target as HTMLImageElement
                                        ).style.display = 'none';
                                      }}
                                    />
                                  </div>
                                )}
                                <div className="flex gap-2">
                                  <button className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-slate-600 text-slate-300 rounded-lg hover:bg-slate-500 transition-colors text-sm">
                                    <Eye className="w-4 h-4" />
                                    View
                                  </button>
                                  <button className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                    <Edit3 className="w-4 h-4" />
                                    Edit
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <Palette className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                            <p className="text-slate-400 mb-2">
                              {searchQuery
                                ? 'No matching elements'
                                : 'No elements found'}
                            </p>
                            <button
                              onClick={() => setShowCreateModal(true)}
                              className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                              {searchQuery
                                ? 'Try adjusting your search terms'
                                : 'Create your first element'}
                            </button>
                          </div>
                        );
                      })()}
                    </>
                  )}

                  {/* Avatars Tab */}
                  {activeTab === 'avatars' && (
                    <>
                      {(() => {
                        const filteredAvatars = avatars.filter((avatar) =>
                          avatar.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        );
                        return filteredAvatars.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {filteredAvatars.map((avatar) => (
                              <motion.div
                                key={avatar.id}
                                whileHover={{ scale: 1.02 }}
                                className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-colors text-center"
                              >
                                <div className="aspect-square bg-slate-600 rounded-lg mb-3 overflow-hidden">
                                  <img
                                    src={avatar.imageUrl}
                                    alt={avatar.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (
                                        e.target as HTMLImageElement
                                      ).style.display = 'none';
                                    }}
                                  />
                                </div>
                                <h4 className="text-white font-medium mb-1">
                                  {avatar.name}
                                </h4>
                                <p className="text-slate-400 text-sm mb-3">
                                  ID: {avatar.id}
                                </p>
                                <div className="flex gap-2">
                                  <button className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-slate-600 text-slate-300 rounded-lg hover:bg-slate-500 transition-colors text-sm">
                                    <Eye className="w-4 h-4" />
                                    View
                                  </button>
                                  <button className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                    <Edit3 className="w-4 h-4" />
                                    Edit
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                            <p className="text-slate-400 mb-2">
                              {searchQuery
                                ? 'No matching avatars'
                                : 'No avatars found'}
                            </p>
                            <button
                              onClick={() => setShowCreateModal(true)}
                              className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                              {searchQuery
                                ? 'Try adjusting your search terms'
                                : 'Create your first avatar'}
                            </button>
                          </div>
                        );
                      })()}
                    </>
                  )}

                  {/* Spaces Tab */}
                  {activeTab === 'spaces' && (
                    <>
                      {(() => {
                        const filteredSpaces = spaces.filter(
                          (space) =>
                            space.name
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                            space.dimensions
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                        );
                        return filteredSpaces.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10">
                            {filteredSpaces.map((space) => (
                              <motion.div
                                key={space.id}
                                whileHover={{ scale: 1.02 }}
                                className="group cursor-pointer relative"
                                onClick={() => handleSpaceClick(space.id)}
                              >
                                {/* Space Thumbnail */}
                                <div className="relative aspect-[1.55] rounded-xl overflow-hidden mb-3 bg-slate-700">
                                  <div className="w-full h-full bg-gradient-to-br from-purple-600 to-slate-800 flex items-center justify-center">
                                    <Globe className="w-10 h-10 text-slate-400" />
                                  </div>
                                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="bg-white/20 rounded-full p-3">
                                      <Eye className="w-6 h-6 text-white" />
                                    </div>
                                  </div>
                                </div>

                                {/* Space Info */}
                                <div className="flex items-start justify-between">
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-medium truncate mb-1">
                                      {space.name}
                                    </h3>
                                    <p className="text-slate-400 text-sm">
                                      {space.dimensions}
                                    </p>
                                  </div>
                                  <div className="relative">
                                    <button
                                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors ml-2 dropdown-button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setDropdownOpen(
                                          dropdownOpen === space.id
                                            ? null
                                            : space.id
                                        );
                                      }}
                                    >
                                      <MoreHorizontal className="w-4 h-4 text-slate-400" />
                                    </button>
                                    {dropdownOpen === space.id && (
                                      <motion.div
                                        initial={{
                                          opacity: 0,
                                          scale: 0.95,
                                          y: 5,
                                        }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        className="dropdown-menu absolute right-0 bottom-full mb-1 bg-slate-700 rounded-lg border border-slate-600 shadow-lg z-30 min-w-[140px]"
                                      >
                                        <button
                                          onClick={() =>
                                            handleEditSpace(space.id)
                                          }
                                          className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-600 transition-colors rounded-t-lg"
                                        >
                                          Edit
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleShareSpace(space)
                                          }
                                          className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-600 transition-colors"
                                        >
                                          Share
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleDeleteSpace(space.id)
                                          }
                                          className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors rounded-b-lg"
                                        >
                                          Delete
                                        </button>
                                      </motion.div>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <Globe className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                            <p className="text-slate-400 mb-2">
                              {searchQuery
                                ? 'No matching spaces'
                                : 'No spaces found'}
                            </p>
                            <button
                              onClick={() => setShowCreateModal(true)}
                              className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                              {searchQuery
                                ? 'Try adjusting your search terms'
                                : 'Create your first space'}
                            </button>
                          </div>
                        );
                      })()}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Create Modal - Keep existing modal functionality */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-800 rounded-xl max-w-md w-full p-6 border border-slate-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Create{' '}
              {activeTab === 'elements'
                ? 'Element'
                : activeTab === 'avatars'
                  ? 'Avatar'
                  : 'Space'}
            </h3>
            {/* Render form based on active tab */}
            {activeTab === 'elements' && (
              <form onSubmit={handleCreateElement} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={elementForm.imageUrl}
                    onChange={(e) =>
                      setElementForm({
                        ...elementForm,
                        imageUrl: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.png"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Width
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={elementForm.width}
                      onChange={(e) =>
                        setElementForm({
                          ...elementForm,
                          width: parseInt(e.target.value) || 1,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Height
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={elementForm.height}
                      onChange={(e) =>
                        setElementForm({
                          ...elementForm,
                          height: parseInt(e.target.value) || 1,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={elementForm.static}
                    onChange={(e) =>
                      setElementForm({
                        ...elementForm,
                        static: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                    id="isStatic"
                  />
                  <label
                    htmlFor="isStatic"
                    className="ml-2 text-sm text-slate-300"
                  >
                    Is Static
                  </label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-2 px-4 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="flex-1 py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isCreating ? 'Creating...' : 'Create Element'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'avatars' && (
              <form onSubmit={handleCreateAvatar} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Avatar Name
                  </label>
                  <input
                    type="text"
                    value={avatarForm.name}
                    onChange={(e) =>
                      setAvatarForm({ ...avatarForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 'Hero Knight'"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={avatarForm.imageUrl}
                    onChange={(e) =>
                      setAvatarForm({ ...avatarForm, imageUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/avatar.png"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-2 px-4 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="flex-1 py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isCreating ? 'Creating...' : 'Create Avatar'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'spaces' && (
              <form onSubmit={handleCreateSpace} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Space Name
                  </label>
                  <input
                    type="text"
                    value={spaceForm.name}
                    onChange={(e) =>
                      setSpaceForm({ ...spaceForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 'Community Hall'"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Width
                    </label>
                    <input
                      type="number"
                      min="10"
                      value={spaceForm.width}
                      onChange={(e) =>
                        setSpaceForm({
                          ...spaceForm,
                          width: parseInt(e.target.value) || 20,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Height
                    </label>
                    <input
                      type="number"
                      min="10"
                      value={spaceForm.height}
                      onChange={(e) =>
                        setSpaceForm({
                          ...spaceForm,
                          height: parseInt(e.target.value) || 20,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-2 px-4 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="flex-1 py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isCreating ? 'Creating...' : 'Create Space'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};
export default AdminPanelPage;
