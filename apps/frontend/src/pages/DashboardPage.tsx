import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Plus, Globe, Settings, MapPin, Trash2 } from 'lucide-react';

interface PublicSpace {
  id: number
  name: string
  thumbnail: string | null
  dimensions: string
  owner: string
}

interface Map {
  id: number
  name: string
  dimensions: string
  ownerId?: number
}

interface PublicMap {
  id: number
  name: string
  dimensions: string
}

export const DashboardPage = () => {
  const { token, isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [publicSpaces, setPublicSpaces] = useState<PublicSpace[]>([])
  const [myMaps, setMyMaps] = useState<Map[]>([])
  const [publicMaps, setPublicMaps] = useState<PublicMap[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'join-spaces' | 'my-maps' | 'join-maps'>(
    'join-spaces'
  )

  const [showCreateMapModal, setShowCreateMapModal] = useState(false)
  const [isCreatingMap, setIsCreatingMap] = useState(false)

  const [newMap, setNewMap] = useState({
    name: '',
    width: 100,
    height: 100
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin', { replace: true })
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (isAuthenticated) {
      console.log('User info:', user)
      console.log('User role:', user?.role)
      console.log('Is admin:', user?.role === 'admin')
      
      const loadData = async () => {
        try {
          if (user?.role === 'admin') {
            await fetchMyMaps()
          }
          await fetchPublicSpaces()
          await fetchPublicMaps()
        } finally {
          setIsLoading(false)
        }
      }
      
      loadData()
    }
  }, [isAuthenticated, user])

  const fetchPublicSpaces = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/space/public', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log('Public spaces data:', data)
        setPublicSpaces(data.spaces || [])
      } else {
        console.error('Failed to fetch public spaces:', response.status)
      }
    } catch (error) {
      console.error('Failed to fetch public spaces:', error)
    }
  }

  const fetchMyMaps = async () => {
    // Only admins can have maps
    if (user?.role !== 'admin') {
      return
    }
    
    try {
      const response = await fetch('http://localhost:3000/api/v1/admin/maps', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        const formattedMaps = data.map((map: any) => ({
          ...map,
          dimensions: `${map.width}x${map.height}`
        }))
        setMyMaps(formattedMaps)
      }
    } catch (error) {
      console.error('Failed to fetch my maps:', error)
    }
  }

  const fetchPublicMaps = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/maps', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log('Public maps data:', data)
        setPublicMaps(data.maps || [])
      } else {
        console.error('Failed to fetch public maps:', response.status)
      }
    } catch (error) {
      console.error('Failed to fetch public maps:', error)
    }
  }

  const handleCreateMap = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreatingMap(true)

    try {
      const response = await fetch('http://localhost:3000/api/v1/admin/map', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newMap.name,
          dimensions: `${newMap.width}x${newMap.height}`,
          defaultElements: []
        })
      })

      if (response.ok) {
        setShowCreateMapModal(false)
        setNewMap({ name: '', width: 100, height: 100 })
        fetchMyMaps()
      }
    } catch (error) {
      console.error('Failed to create map:', error)
    } finally {
      setIsCreatingMap(false)
    }
  }

  const handleJoinSpace = (spaceId: number) => {
    navigate(`/space/${spaceId}`)
  }

  const handleSpaceSettings = (spaceId: number) => {
    navigate(`/space/${spaceId}/edit`)
  }

  const handleDeleteSpace = async (spaceId: number) => {
    if (!confirm('Are you sure you want to delete this space?')) {
      return
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/space/${spaceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        alert('Space deleted successfully!')
        // Refresh the public spaces list
        fetchPublicSpaces()
      } else {
        alert('Failed to delete space')
      }
    } catch (error) {
      console.error('Error deleting space:', error)
      alert('Network error')
    }
  }

  const handleDeleteMap = async (mapId: number) => {
    if (!confirm('Are you sure you want to delete this map?')) {
      return
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/admin/map/${mapId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        alert('Map deleted successfully!')
        // Refresh the my maps list
        fetchMyMaps()
      } else {
        alert('Failed to delete map')
      }
    } catch (error) {
      console.error('Error deleting map:', error)
      alert('Network error')
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-white">2D Metaverse</h1>
              <nav className="flex gap-6">
                <button className="text-slate-300 hover:text-white font-medium transition-colors">
                  Dashboard
                </button>
                {user?.role === 'admin' && (
                  <button 
                    onClick={() => navigate('/admin')}
                    className="text-slate-300 hover:text-white font-medium transition-colors"
                  >
                    Admin Panel
                  </button>
                )}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-300">
                {user?.username}
                {user?.role === 'admin' && (
                  <span className="ml-2 px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
                    Admin
                  </span>
                )}
              </span>
              <button
                onClick={() => {
                  logout()
                  navigate('/signin')
                }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.username}!
          </h2>
          <p className="text-slate-400">
            {user?.role === 'admin' 
              ? 'Manage your virtual spaces or join public communities'
              : 'Explore and join amazing virtual spaces created by the community'
            }
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-slate-800 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('join-spaces')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              activeTab === 'join-spaces'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 inline mr-2" />
            {user?.role === 'admin' ? 'Join Spaces' : 'Public Spaces'}
          </button>
          {user?.role === 'admin' && (
            <button
              onClick={() => setActiveTab('my-maps')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'my-maps'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4 inline mr-2" />
              My Maps
            </button>
          )}
          <button
            onClick={() => setActiveTab('join-maps')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              activeTab === 'join-maps'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4 inline mr-2" />
            Public Maps
          </button>
        </div>

        {/* Content */}
        {activeTab === 'join-spaces' ? (
          <div>
            {/* Join Spaces Header */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Public Spaces</h3>
              <p className="text-slate-400">Join spaces created by other users</p>
            </div>

            {/* Public Spaces Grid */}
            {publicSpaces.length === 0 ? (
              <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700">
                <Globe className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No public spaces available</h3>
                <p className="text-slate-400">Be the first to create a space that others can join!</p>

              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publicSpaces.map((space) => (
                  <div key={space.id} className="bg-slate-800 rounded-xl border border-slate-700 hover:shadow-lg transition-shadow">
                    <div className="h-32 bg-gradient-to-br from-cyan-900 to-blue-900 rounded-t-xl flex items-center justify-center">
                      <Globe className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-white mb-1">{space.name}</h4>
                      <p className="text-sm text-slate-400 mb-1">by {space.owner}</p>
                      <p className="text-sm text-slate-400 mb-4">Size: {space.dimensions}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleJoinSpace(space.id)}
                          className={`${user?.role === 'admin' ? 'flex-1' : 'w-full'} bg-cyan-600 text-white py-2 px-3 rounded-lg hover:bg-cyan-700 transition-colors text-sm`}
                        >
                          Join Space
                        </button>
                        {user?.role === 'admin' && (
                          <>
                            <button
                              onClick={() => handleSpaceSettings(space.id)}
                              className="p-2 text-slate-400 hover:text-white border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors"
                              title="Settings"
                            >
                              <Settings className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSpace(space.id)}
                              className="p-2 text-slate-400 hover:text-red-400 border border-slate-600 rounded-lg hover:bg-red-900/20 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (activeTab === 'my-maps' && user?.role === 'admin') ? (
          <div>
            {/* My Maps Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Your Maps</h3>
              {user?.role === 'admin' && (
                <button
                  onClick={() => setShowCreateMapModal(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create Map
                </button>
              )}
            </div>

            {/* My Maps Grid */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="text-slate-400 mt-4">Loading your maps...</p>
              </div>
            ) : myMaps.length === 0 ? (
              <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700">
                <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No maps yet</h3>
                <p className="text-slate-400 mb-6">Create your first map template to get started</p>
                <button
                  onClick={() => navigate('/admin')}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create Your First Map
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myMaps.map((map) => (
                  <div key={map.id} className="bg-slate-800 rounded-xl border border-slate-700 hover:shadow-lg transition-shadow">
                    <div className="h-32 bg-gradient-to-br from-purple-900 to-pink-900 rounded-t-xl flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-purple-400" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-white mb-1">{map.name}</h4>
                      <p className="text-sm text-slate-400 mb-4">Size: {map.dimensions}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/map/${map.id}`)}
                          className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                        >
                          Enter
                        </button>
                        <button
                          onClick={() => navigate(`/map/${map.id}/edit`)}
                          className="p-2 text-slate-400 hover:text-white border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors"
                          title="Edit Map"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMap(map.id)}
                          className="p-2 text-slate-400 hover:text-red-400 border border-slate-600 rounded-lg hover:bg-red-900/20 transition-colors"
                          title="Delete Map"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Join Maps Header */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Public Maps</h3>
              <p className="text-slate-400">Explore map templates created by other users</p>
            </div>

            {/* Public Maps Grid */}
            {publicMaps.length === 0 ? (
              <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700">
                <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No public maps available</h3>
                <p className="text-slate-400">Be the first to create a map template that others can explore!</p>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => navigate('/admin')}
                    className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Create Public Map
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publicMaps.map((map) => (
                  <div key={map.id} className="bg-slate-800 rounded-xl border border-slate-700 hover:shadow-lg transition-shadow">
                    <div className="h-32 bg-gradient-to-br from-pink-900 to-purple-900 rounded-t-xl flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-pink-400" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-white mb-1">{map.name}</h4>
                      <p className="text-sm text-slate-400 mb-4">Size: {map.dimensions}</p>
                      <button
                        onClick={() => navigate(`/map/${map.id}`)}
                        className="w-full bg-pink-600 text-white py-2 px-3 rounded-lg hover:bg-pink-700 transition-colors text-sm"
                      >
                        Explore Map
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Map Modal */}
      {showCreateMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div className="bg-slate-800 rounded-xl max-w-md w-full p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Create New Map</h3>
            <form onSubmit={handleCreateMap} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Map Name
                </label>
                <input
                  type="text"
                  value={newMap.name}
                  onChange={(e) => setNewMap({ ...newMap, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-700 text-white placeholder-slate-400"
                  placeholder="My Awesome Map"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Width
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={newMap.width}
                    onChange={(e) => setNewMap({ ...newMap, width: parseInt(e.target.value) || 100 })}
                    className="w-full px-3 py-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-700 text-white placeholder-slate-400"
                    placeholder="100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Height
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={newMap.height}
                    onChange={(e) => setNewMap({ ...newMap, height: parseInt(e.target.value) || 100 })}
                    className="w-full px-3 py-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-700 text-white placeholder-slate-400"
                    placeholder="100"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateMapModal(false)}
                  className="flex-1 py-2 px-4 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingMap}
                  className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {isCreatingMap ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}