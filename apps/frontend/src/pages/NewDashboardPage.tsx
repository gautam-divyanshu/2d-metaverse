import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '../components/Header';
import { MapTemplateSelector } from '../components/MapTemplateSelector';
import { Plus, MoreHorizontal, Key } from 'lucide-react';

interface MapSpace {
  id: number;
  name: string;
  dimensions: string;
  ownerId?: number;
  isOwner: boolean;
  thumbnail?: string | null;
  owner?: string;
}

export const NewDashboardPage = () => {
  const { token, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [recentMaps, setRecentMaps] = useState<MapSpace[]>([]);
  const [myMaps, setMyMaps] = useState<MapSpace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'recent' | 'my-maps'>('recent');
  const [showCreateMapModal, setShowCreateMapModal] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showEnterCodeModal, setShowEnterCodeModal] = useState(false);
  const [isCreatingMap, setIsCreatingMap] = useState(false);
  const [enterCode, setEnterCode] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const [newMap, setNewMap] = useState({
    name: '',
    width: 100,
    height: 100,
  });

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
          await Promise.all([fetchRecentMaps(), fetchMyMaps()]);
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    }
  }, [isAuthenticated, user]);

  const fetchRecentMaps = async () => {
    try {
      // Fetch only maps that the user has actually joined
      const joinedMapsResponse = await fetch(
        'http://localhost:3000/api/v1/user/joined-maps',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const recentItems: MapSpace[] = [];

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
    Promise.all([fetchRecentMaps(), fetchMyMaps()]);
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
        await Promise.all([fetchRecentMaps(), fetchMyMaps()]);
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

  const handleEnterWithCode = async () => {
    if (enterCode.trim()) {
      try {
        // Use the access code endpoint to find the map
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
          // Record the visit and navigate to the map
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

  const handleMapClick = (mapId: number, isOwner: boolean) => {
    if (isOwner) {
      // Owner can edit the map
      navigate(`/map/${mapId}/edit`);
    } else {
      // Non-owner can only view/join the map
      navigate(`/map/${mapId}`);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Top Section with Tabs and Buttons */}
        <div className="flex justify-between items-center mb-8">
          {/* Tabs */}
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('recent')}
              className={`pb-2 text-lg font-medium border-b-2 transition-colors ${
                activeTab === 'recent'
                  ? 'text-gray-900 border-gray-900'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setActiveTab('my-maps')}
              className={`pb-2 text-lg font-medium border-b-2 transition-colors ${
                activeTab === 'my-maps'
                  ? 'text-gray-900 border-gray-900'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              My Maps
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setShowEnterCodeModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Key className="w-4 h-4" />
              Enter with Code
            </button>
            <button
              onClick={handleCreateMapClick}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Map
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-300 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Maps Grid */}
            {(activeTab === 'recent' ? recentMaps : myMaps).length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {(activeTab === 'recent' ? recentMaps : myMaps).map((map) => (
                  <div
                    key={map.id}
                    className="group cursor-pointer"
                    onClick={() => handleMapClick(map.id, map.isOwner)}
                  >
                    {/* Map Thumbnail */}
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-3 hover:shadow-lg transition-shadow bg-gray-200">
                      {/* Thumbnail Image or Placeholder */}
                      {map.thumbnail ? (
                        <img
                          src={map.thumbnail}
                          alt={map.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-300 to-yellow-200 flex items-center justify-center">
                          {/* Mock game world with avatars */}
                          <div className="absolute inset-4 bg-yellow-100 rounded-lg border-4"></div>
                        </div>
                      )}

                      {/* OWNER Badge */}
                      {map.isOwner && (
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                          👑 OWNER
                        </div>
                      )}
                    </div>

                    {/* Map Name with More Options */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate flex-1">
                        {map.name}
                      </h3>
                      <button
                        className="p-1 hover:bg-gray-100 rounded transition-colors ml-2 flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('More options for', map.name);
                        }}
                      >
                        <MoreHorizontal className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State - Clean design matching your image */
              <div className="h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p className="text-lg">
                    {activeTab === 'recent' ? 'No recent maps' : 'No maps yet'}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Template Selector for Regular Users */}
      <MapTemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        onTemplateCopied={handleTemplateCopied}
      />

      {/* Create Map Modal */}
      {showCreateMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedTemplate ? 'Create Map from Template' : 'Create New Map'}
            </h3>
            <form onSubmit={handleCreateMap} className="space-y-4">
              {selectedTemplate && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-800">
                    Creating from template #{selectedTemplate}
                  </p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Map Name
                </label>
                <input
                  type="text"
                  value={newMap.name}
                  onChange={(e) =>
                    setNewMap({ ...newMap, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="My Awesome Map"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isTemplate" className="text-sm text-gray-700">
                    Make this map available as a template for other users
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
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingMap}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isCreatingMap ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enter with Code Modal */}
      {showEnterCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Enter with Code
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Access Code
                </label>
                <input
                  type="text"
                  value={enterCode}
                  onChange={(e) => setEnterCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter 8-character access code (e.g. ABC123XY)"
                  maxLength={8}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEnterCodeModal(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEnterWithCode}
                  disabled={!enterCode.trim()}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
