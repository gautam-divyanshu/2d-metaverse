import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LogOut, Plus, Users, Globe, Settings } from 'lucide-react'

interface User {
  id: string
  username: string
  role: string
}

export const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      navigate('/signin')
      return
    }
    
    try {
      setUser(JSON.parse(userData))
    } catch (err) {
      console.error('Failed to parse user data:', err)
      navigate('/signin')
    }
  }, [navigate])

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Globe className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">MetaVerse Dashboard</h1>
                <p className="text-white/70">Welcome back, {user.username}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">
                {user.role}
              </span>
              <button
                onClick={handleSignOut}
                className="btn-secondary flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass-effect p-6 text-left transition-all duration-200 hover:bg-white/10"
              >
                <Plus className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Create Space</h3>
                <p className="text-white/70">Build a new virtual environment for collaboration</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass-effect p-6 text-left transition-all duration-200 hover:bg-white/10"
              >
                <Users className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Join Space</h3>
                <p className="text-white/70">Enter an existing space with an invite code</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass-effect p-6 text-left transition-all duration-200 hover:bg-white/10"
              >
                <Globe className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Explore</h3>
                <p className="text-white/70">Discover public spaces and communities</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass-effect p-6 text-left transition-all duration-200 hover:bg-white/10"
              >
                <Settings className="w-12 h-12 text-orange-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Settings</h3>
                <p className="text-white/70">Customize your profile and preferences</p>
              </motion.button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="glass-effect p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="text-white/70 text-sm">
                  No recent activity yet. Start by creating or joining a space!
                </div>
              </div>
            </div>

            {/* My Spaces */}
            <div className="glass-effect p-6">
              <h3 className="text-xl font-semibold text-white mb-4">My Spaces</h3>
              <div className="space-y-3">
                <div className="text-white/70 text-sm">
                  You haven't created any spaces yet. Create your first space to get started!
                </div>
                <button className="btn-primary w-full text-sm">
                  Create First Space
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="glass-effect p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/70">Spaces Created</span>
                  <span className="text-white font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Spaces Visited</span>
                  <span className="text-white font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Total Time</span>
                  <span className="text-white font-semibold">0h</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}