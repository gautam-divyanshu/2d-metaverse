import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LandingPage } from './pages/LandingPage'
import { SignInPage } from './pages/SignInPage'
import { SignUpPage } from './pages/SignUpPage'
import { DashboardPage } from './pages/DashboardPage'
import { SpaceViewPage } from './pages/SpaceViewPage'
import { SpaceEditorPage } from './pages/SpaceEditorPage'
import { MapViewPage } from './pages/MapViewPage'
import { MapEditorPage } from './pages/MapEditorPage'
import { AdminPanelPage } from './pages/AdminPanelPage'
import { ProfilePage } from './pages/ProfilePage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/space/:spaceId" 
              element={
                <ProtectedRoute>
                  <SpaceViewPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/space/:spaceId/edit" 
              element={
                <ProtectedRoute>
                  <SpaceEditorPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/map/:mapId" 
              element={
                <ProtectedRoute>
                  <MapViewPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/map/:mapId/edit" 
              element={
                <ProtectedRoute>
                  <MapEditorPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly>
                  <AdminPanelPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App