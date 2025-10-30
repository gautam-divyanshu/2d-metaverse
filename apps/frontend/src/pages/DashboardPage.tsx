import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { MapTemplateSelector } from '../components/MapTemplateSelector';
import {
  Plus,
  MoreHorizontal,
  Key,
  MapPin,
  Clock,
  Search,
  LogOut,
  Grid3X3,
  Crown,
  Globe,
  Shield,
} from 'lucide-react';

interface UserMap {
  id: number;
  name: string;
  dimensions: string;
  ownerId?: number;
  isOwner: boolean;
  thumbnail?: string | null;
  owner?: string;
}

export const NewDashboardPage = () => {
  const { token, isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [recentMaps, setRecentMaps] = useState<UserMap[]>([]);
  const [myMaps, setMyMaps] = useState<UserMap[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<
    'my-maps' | 'templates' | 'explore'
  >('my-maps');
  const [showCreateMapModal, setShowCreateMapModal] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showEnterCodeModal, setShowEnterCodeModal] = useState(false);
  const [isCreatingMap, setIsCreatingMap] = useState(false);
  const [enterCode, setEnterCode] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMap, setNewMap] = useState({ name: '', width: 100, height: 100 });
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [templateMaps, setTemplateMaps] = useState<UserMap[]>([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      const loadData = async () => {
        try {
          await Promise.all([
            fetchRecentMaps(),
            fetchMyMaps(),
            fetchTemplateMaps(),
          ]);
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    }
  }, [isAuthenticated, user]);

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

  const fetchRecentMaps = async () => {
    try {
      const joinedMapsResponse = await fetch(
        'http://localhost:3000/api/v1/user/joined-maps',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const recentItems: UserMap[] = [];

      if (joinedMapsResponse.ok) {
        const joinedData = await joinedMapsResponse.json();
        const formattedMaps = (joinedData.maps || []).map((map: any) => ({
          id: map.id,
          name: map.name || 'Untitled Map',
          dimensions:
            map.dimensions || `${map.width || 100}x${map.height || 100}`,
          ownerId: map.ownerId,
          isOwner: map.isOwner,
          thumbnail: map.thumbnail,
          owner: map.owner,
        }));
        recentItems.push(...formattedMaps);
      }

      setRecentMaps(recentItems);
    } catch (error) {
      console.error('Failed to fetch recent maps:', error);
      setRecentMaps([]);
    }
  };

  const fetchMyMaps = async () => {
    try {
      let endpoint = '';

      if (user?.role === 'admin') {
        endpoint = 'http://localhost:3000/api/v1/admin/maps';
      } else {
        endpoint = 'http://localhost:3000/api/v1/user/owned-maps';
      }

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const mapsArray = data.maps || data || [];
        const formattedMaps = mapsArray.map((map: any) => ({
          id: map.id,
          name: map.name || 'Untitled Map',
          dimensions: map.dimensions || `${map.width}x${map.height}`,
          ownerId: map.ownerId || parseInt(user?.id || '0'),
          isOwner: true,
          thumbnail: map.thumbnail,
          accessCode: map.accessCode,
          isTemplate: map.isTemplate,
        }));
        setMyMaps(formattedMaps);
      } else {
        setMyMaps([]);
      }
    } catch (error) {
      console.error('Failed to fetch my maps:', error);
      setMyMaps([]);
    }
  };

  const fetchTemplateMaps = async () => {
    try {
      // Fetch all template maps from admin endpoint
      const response = await fetch('http://localhost:3000/api/v1/admin/maps', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const mapsArray = data.maps || data || [];
        // Filter only template maps
        const templateMaps = mapsArray
          .filter((map: any) => map.isTemplate === true)
          .map((map: any) => ({
            id: map.id,
            name: map.name || 'Untitled Template',
            dimensions: map.dimensions || `${map.width}x${map.height}`,
            ownerId: map.ownerId,
            isOwner: false, // Templates are not owned by current user
            thumbnail: map.thumbnail,
            accessCode: map.accessCode,
            isTemplate: map.isTemplate,
          }));
        setTemplateMaps(templateMaps);
      } else {
        setTemplateMaps([]);
      }
    } catch (error) {
      console.error('Failed to fetch template maps:', error);
      setTemplateMaps([]);
    }
  };

  const handleEnterWithCode = async () => {
    if (enterCode.trim()) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/map/code/${enterCode.trim()}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const mapData = await response.json();
          await fetch('http://localhost:3000/api/v1/user/visit-map', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ mapId: mapData.id }),
          });

          navigate(`/map/${mapData.id}`);
          setShowEnterCodeModal(false);
          setEnterCode('');
        } else {
          alert('Invalid access code. Please check and try again.');
        }
      } catch (error) {
        console.error('Failed to join map:', error);
        alert('Failed to join map. Please try again.');
      }
    }
  };

  // Updated handleMapClick to ensure maps open in Map View Page, not Editor
  const handleMapClick = (mapId: number) => {
    // Always navigate to map view page, not editor
    navigate(`/map/${mapId}`);
  };

  // Function to handle editing a map (from dropdown)
  const handleEditMap = (mapId: number) => {
    navigate(`/map/${mapId}/edit`);
    setDropdownOpen(null);
  };

  // Function to handle sharing a map (from dropdown)
  const handleShareMap = (map: UserMap) => {
    const shareCode = (map as any).accessCode;
    if (shareCode) {
      navigator.clipboard.writeText(shareCode);
      alert(`Map access code copied to clipboard: ${shareCode}`);
    } else {
      alert('No access code available for this map');
    }
    setDropdownOpen(null);
  };

  // Function to handle deleting a map (from dropdown)
  const handleDeleteMap = async (mapId: number) => {
    if (
      window.confirm(
        'Are you sure you want to delete this map? This action cannot be undone.'
      )
    ) {
      try {
        const endpoint =
          user?.role === 'admin'
            ? `http://localhost:3000/api/v1/admin/map/${mapId}`
            : `http://localhost:3000/api/v1/user/map/${mapId}`;

        const response = await fetch(endpoint, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert('Map deleted successfully');
          // Refresh the maps lists
          await Promise.all([fetchMyMaps(), fetchTemplateMaps()]);
        } else {
          alert('Failed to delete map');
        }
      } catch (error) {
        console.error('Failed to delete map:', error);
        alert('Network error');
      }
    }
    setDropdownOpen(null);
  };

  const handleCreateMapClick = () => {
    if (user?.role === 'admin') {
      // Admins get the direct create modal
      setShowCreateMapModal(true);
    } else {
      // Regular users get template selector first
      setShowTemplateSelector(true);
    }
  };

  const handleTemplateCopied = () => {
    // Refresh the maps lists after a template is copied
    Promise.all([fetchMyMaps(), fetchTemplateMaps()]);
  };

  const handleCreateMap = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingMap(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const isTemplate = formData.get('isTemplate') === 'on';

      const requestBody: any = {
        name: newMap.name,
        dimensions: `${newMap.width}x${newMap.height}`,
        defaultElements: [],
      };

      // Add template info for regular users
      if (selectedTemplate) {
        requestBody.templateId = selectedTemplate;
      }

      // For admin maps: if it's a template, don't add access code
      // If it's not a template, add access code for sharing
      if (user?.role === 'admin') {
        if (isTemplate) {
          // Templates don't need access codes
          requestBody.isTemplate = true;
        } else {
          // Regular admin maps that can be shared
          requestBody.accessCode = Math.random()
            .toString(36)
            .substring(2, 10)
            .toUpperCase();
          requestBody.isTemplate = false;
        }
      } else {
        // Regular user maps always get access codes for sharing
        requestBody.accessCode = Math.random()
          .toString(36)
          .substring(2, 10)
          .toUpperCase();
      }

      const endpoint =
        user?.role === 'admin'
          ? 'http://localhost:3000/api/v1/admin/map'
          : 'http://localhost:3000/api/v1/user/map';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setShowCreateMapModal(false);
        setNewMap({ name: '', width: 100, height: 100 });
        setSelectedTemplate(null);

        // Show different success messages
        if (user?.role === 'admin' && isTemplate) {
          alert(
            `Template created successfully! Users can now use this template.`
          );
        } else {
          alert(
            `Map created successfully! Access code: ${requestBody.accessCode}`
          );
        }

        // Refresh both lists
        await Promise.all([fetchMyMaps(), fetchTemplateMaps()]);
      } else {
        alert('Failed to create map');
      }
    } catch (error) {
      console.error('Failed to create map:', error);
      alert('Network error');
    } finally {
      setIsCreatingMap(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section - Logo/Title and User Profile */}
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-xl font-bold text-white">2D Metaverse</h1>
                <p className="text-sm text-slate-400">
                  Welcome back, {user?.username}!
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
                  <p className="text-xs text-slate-400">
                    {user?.role === 'admin' ? 'Administrator' : 'User'}
                  </p>
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
                  placeholder="Search maps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-64"
                />
              </div>

              <button
                onClick={() => setShowEnterCodeModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
              >
                <Key className="w-4 h-4" />
                Join with Code
              </button>

              <button
                onClick={handleCreateMapClick}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Map
              </button>

              {/* Admin Panel Access (if admin) */}
              {user?.role === 'admin' && (
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

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSection('my-maps')}
                className={`cursor-pointer bg-slate-800 rounded-xl p-6 border-2 transition-all duration-300 ${
                  activeSection === 'my-maps'
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Grid3X3 className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-3xl font-bold text-white">
                      {myMaps.length}
                    </p>
                    <p className="text-slate-400 font-medium">My Maps</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Maps you own and manage
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSection('templates')}
                className={`cursor-pointer bg-slate-800 rounded-xl p-6 border-2 transition-all duration-300 ${
                  activeSection === 'templates'
                    ? 'border-green-500 shadow-lg shadow-green-500/20'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-3xl font-bold text-white">
                      {templateMaps.length}
                    </p>
                    <p className="text-slate-400 font-medium">Templates</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Available map templates
                    </p>
                  </div>
                </div>
              </motion.div>{' '}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSection('explore')}
                className={`cursor-pointer bg-slate-800 rounded-xl p-6 border-2 transition-all duration-300 ${
                  activeSection === 'explore'
                    ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-3xl font-bold text-white">
                      {myMaps.length + recentMaps.length}
                    </p>
                    <p className="text-slate-400 font-medium">Total Maps</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Discover all available maps
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content Section with Animations */}
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {(activeSection === 'templates' ||
                activeSection === 'my-maps' ||
                activeSection === 'explore') && (
                <div>
                  {/* Loading State */}
                  {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="aspect-video bg-slate-700 rounded-lg mb-3"></div>
                          <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {/* Maps Grid */}
                      {(() => {
                        // Get current maps based on active section
                        let currentMaps: UserMap[] = [];
                        if (activeSection === 'templates') {
                          currentMaps = templateMaps;
                        } else if (activeSection === 'my-maps') {
                          currentMaps = myMaps;
                        } else if (activeSection === 'explore') {
                          // For explore, show all unique maps (avoid duplicates)
                          const allMaps = [...myMaps, ...templateMaps];
                          const uniqueMaps = allMaps.filter(
                            (map, index, self) =>
                              index === self.findIndex((m) => m.id === map.id)
                          );
                          currentMaps = uniqueMaps;
                        }

                        // Apply search filter
                        const filteredMaps = currentMaps.filter((map) =>
                          map.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        );

                        return filteredMaps.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10">
                            {filteredMaps.map((map) => (
                              <div key={map.id} className="space-y-3">
                                {/* Map Card - Only contains the image */}
                                <div className="relative">
                                  {/* Owner Badge - Top Left */}
                                  {map.isOwner && (
                                    <div className="absolute top-2 left-2 z-10">
                                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600/90 text-white text-xs rounded-md shadow-lg backdrop-blur-sm">
                                        <Crown className="w-3 h-3" />
                                        Owner
                                      </span>
                                    </div>
                                  )}

                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-slate-800 rounded-lg overflow-hidden border-2 border-slate-600 hover:border-blue-500 transition-all duration-300 cursor-pointer shadow-lg"
                                    onClick={() => handleMapClick(map.id)}
                                  >
                                    {/* Map Preview - Only the image */}
                                    <div className="relative aspect-[1.55] bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
                                      <MapPin className="w-6 h-6 text-slate-400" />
                                    </div>
                                  </motion.div>
                                </div>

                                {/* Map Details - Outside the card */}
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <h3 className="font-medium text-white text-sm truncate mb-0.5">
                                      {map.name}
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                      {map.dimensions}
                                    </p>
                                  </div>

                                  {/* Three Dots Menu - Left bottom position */}
                                  {map.isOwner && (
                                    <div className="relative ml-2">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setDropdownOpen(
                                            dropdownOpen === map.id
                                              ? null
                                              : map.id
                                          );
                                        }}
                                        className="dropdown-button p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                                      >
                                        <MoreHorizontal className="w-4 h-4" />
                                      </button>

                                      {/* Modern Dropdown Menu */}
                                      {dropdownOpen === map.id && (
                                        <motion.div
                                          initial={{
                                            opacity: 0,
                                            scale: 0.95,
                                            y: -5,
                                          }}
                                          animate={{
                                            opacity: 1,
                                            scale: 1,
                                            y: 0,
                                          }}
                                          className="dropdown-menu absolute right-0 top-full mt-1 bg-slate-800 rounded-lg border border-slate-600 shadow-lg z-30 min-w-[140px]"
                                        >
                                          <button
                                            onClick={() =>
                                              handleEditMap(map.id)
                                            }
                                            className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-600 transition-colors rounded-t-lg"
                                          >
                                            Edit Map
                                          </button>
                                          <button
                                            onClick={() => handleShareMap(map)}
                                            className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-600 transition-colors"
                                          >
                                            Share Map
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleDeleteMap(map.id)
                                            }
                                            className="w-full px-3 py-2 text-left text-sm text-red-300 hover:bg-red-900/20 hover:text-red-300 transition-colors rounded-b-lg"
                                          >
                                            Delete Map
                                          </button>
                                        </motion.div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <MapPin className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-white mb-2">
                              {activeSection === 'templates' &&
                                (searchQuery
                                  ? 'No matching templates'
                                  : 'No Templates Available')}
                              {activeSection === 'my-maps' &&
                                (searchQuery
                                  ? 'No matching maps'
                                  : 'No Maps Created Yet')}
                              {activeSection === 'explore' &&
                                (searchQuery
                                  ? 'No matching maps'
                                  : 'Explore Coming Soon')}
                            </h3>
                            <p className="text-slate-400">
                              {activeSection === 'templates' &&
                                (searchQuery
                                  ? 'Try adjusting your search terms'
                                  : 'Template maps will appear here')}
                              {activeSection === 'my-maps' &&
                                (searchQuery
                                  ? 'Try adjusting your search terms'
                                  : 'Create your first map to get started')}
                              {activeSection === 'explore' &&
                                (searchQuery
                                  ? 'Try adjusting your search terms'
                                  : 'Discover amazing maps created by the community')}
                            </p>
                          </div>
                        );
                      })()}
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Template Selector for Regular Users */}
      <MapTemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        onTemplateCopied={handleTemplateCopied}
      />

      {/* Create Map Modal */}
      {showCreateMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-800 rounded-xl max-w-md w-full p-6 border border-slate-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              {selectedTemplate
                ? 'Create Space from Template'
                : 'Create New Space'}
            </h3>
            <form onSubmit={handleCreateMap} className="space-y-4">
              {selectedTemplate && (
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-300">
                    Creating from template #{selectedTemplate}
                  </p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Space Name
                </label>
                <input
                  type="text"
                  value={newMap.name}
                  onChange={(e) =>
                    setNewMap({ ...newMap, name: e.target.value })
                  }
                  className="w-full px-3 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400"
                  placeholder="My Awesome Space"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Width
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={newMap.width}
                    onChange={(e) =>
                      setNewMap({
                        ...newMap,
                        width: parseInt(e.target.value) || 100,
                      })
                    }
                    className="w-full px-3 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                    placeholder="100"
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
                    max="1000"
                    value={newMap.height}
                    onChange={(e) =>
                      setNewMap({
                        ...newMap,
                        height: parseInt(e.target.value) || 100,
                      })
                    }
                    className="w-full px-3 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                    placeholder="100"
                    required
                  />
                </div>
              </div>
              {/* Template checkbox for admins only */}
              {user?.role === 'admin' && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isTemplate"
                    id="isTemplate"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 bg-slate-700 border-slate-600"
                  />
                  <label
                    htmlFor="isTemplate"
                    className="text-sm text-slate-300"
                  >
                    Make this space available as a template for other users
                  </label>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateMapModal(false);
                    setSelectedTemplate(null);
                  }}
                  className="flex-1 py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingMap}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreatingMap ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Enter Code Modal */}
      {showEnterCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-800 rounded-xl max-w-md w-full p-6 border border-slate-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Join with Code
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Access Code
                </label>
                <input
                  type="text"
                  value={enterCode}
                  onChange={(e) => setEnterCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400 font-mono text-center tracking-widest"
                  placeholder="Enter 8-character code"
                  maxLength={8}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEnterCodeModal(false)}
                  className="flex-1 py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEnterWithCode}
                  disabled={!enterCode.trim()}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Join Space
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default NewDashboardPage;
